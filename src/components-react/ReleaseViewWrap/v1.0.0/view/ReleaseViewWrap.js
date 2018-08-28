
/**
 * @author chenyanhua
 * @dateTime 20180724
 * @file 发布商品 Tab 组件
 */
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Tabs, Spin, message } from 'jdcloudui';

// 基础信息 tab
import ReleaseBasicInfo from '../../../ReleaseBasicInfo/v1.0.0/view';
// 商品图片 tab
/*  平台  */
import ReleasePlatformGoodsImage from '../../../ReleasePlatformGoodsImage/v1.0.0/view/index';
/*  供应商 店铺  */
import ReleaseShopGoodsImage from '../../../ReleaseShopGoodsImage/v1.0.0/view/index';

// 其他设置 tab
import ReleaseOtherConfig from '../../../ReleaseOtherConfig/v1.0.0/view';
// 价格及库存 tab
import ReleasePriceAndStock from '../../../ReleasePriceAndStock/v1.0.0/view';
// 供货信息 tab
import ReleaseSupplyInfo from '../../../ReleaseSupplyInfo/v1.0.0/view';

// 按钮组件
import ReleaseBtns from '../../../ReleaseBtns/v.1.0.0/view'

import styles from './style/index.less';

// import ReleaseURLConfig from './ReleaseURLConfig';

const TabPane = Tabs.TabPane;

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.pastDelay) {
    return <div style={{ 'height': '800px', 'paddingTop': '200px', 'textAlign': 'center' }}><Spin size="large" /></div>;
  } else {
    return null;
  }
}
export default class ReleaseViewWrap extends Component {
  constructor(props, context) {
    super(props);
    // 店铺时，销售信息表格列是否需要根据模板进行列的校验
    const calcRule = this.getTempCalcRule(props);

    this.state = {
      dyComLoading: false, // 是否正在加载动态组件
      components: [],
      calcRule: calcRule,
      activeKey: 'basicinfo' //当前选择的tabs
    };

    this.ifSave = true; //判断是否展示保存按钮，默认展示
    this.ifValid = false; //是否是已生效商品，默认未生效
    this.itemId = '';
    this.location = '';
    this.edit = false; //编辑状态
    this.saleAttributeData = []; //保存销售规格接口数据
    this.itemTmplPublishVo = {}; //保存回显的总数据
    this.cid = null; //保存选中的cid
    this.templateId = null; //保存取到的TemplateId
    this.hasChannel = false; //判断是否加载了渠道组件
    this.newType = false; //是否是从供货申请审核页面进入的编辑页
    this.cidChangedTimes = 0; // 类目变化了几次
  }

  componentDidMount() {
    this.location = typeof window !== 'undefined' ? window.location.href : "";
    this.itemId = this.getUrlParam(this.location,'itemId');
    this.getItemStatus();
    // 如果是编辑，获取编辑数据源
    if(this.edit){
      this.props.getItemInfoAction(this.props.type,{itemId:this.itemId});
    }

    // 如果是店铺的话，查询其他设置/配送设置/运费模板
    if(this.props.type == '3'){
      this.props.queryDeliveryFareTemplate();
    }
  }

  componentWillReceiveProps(nextProps){
    //根据cid查询templateId
    // 更换了类目（即cid变化）
    if(nextProps.saveParamsRedux.itemTmplPublishVo && nextProps.saveParamsRedux.itemTmplPublishVo.cid && nextProps.saveParamsRedux.itemTmplPublishVo.cid != this.cid){
      if(this.cid){
        this.cidChangedTimes = this.cidChangedTimes+1;
      }
      this.cid = nextProps.saveParamsRedux.itemTmplPublishVo.cid;
      const tmplParams = {cid:this.cid};
      this.setState({
        dyComLoading: true
      });
      // 重新获取模板id
      this.props.queryGetTemplateId(tmplParams,this.props.type).then((res)=>{
        if(res.code == 0){
          this.templateId = res.data;
          // 加载动态tab组件，参数templateId
          this.loadDyComponents(this.templateId);
        } else {
          if(res.data){
            message.error(res.data,2)
          } else {
            message.error('获取该类目下的模板失败',2)
          }
        }
      })
      const attrParams = {
        cid : this.cid,
        itemId : this.itemId,
      };
      // 获取销售规格数据源
      this.props.getSaleAttributeAction(this.props.type, this.edit, attrParams);
    }

    //编辑时：接口返回的回显数据，存储于this.itemTmplPublishVo，并将回显数据根据组件需要进行组装拼接
    if(nextProps.itemInfoRedux && nextProps.itemInfoRedux.data && nextProps.itemInfoRedux.data.data && nextProps.itemInfoRedux.data.data != this.itemTmplPublishVo){
      this.itemTmplPublishVo = nextProps.itemInfoRedux.data.data; // 回显数据
      /** 将回显的数据做处理，方便组件使用 */
      if(this.itemTmplPublishVo.itemPicpdfVoList){
        // 其他设置内，上传组件需要传递uid
        this.itemTmplPublishVo.itemPicpdfVoList.map((item,index)=>{
          item.uid = index
        })
      }
      //供货信息或价格及库存数据为null时拼接一条数据
      if(this.props.type == '2' || this.props.type == '3'){
        if(this.itemTmplPublishVo.itemPerfectVo && this.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList && this.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.length > 0){
          this.itemTmplPublishVo.itemTmplSkuVoList.map(statusItem=>{
          this.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.map((skuItem,skuIndex)=>{         
                if(skuItem.skuId == statusItem.id){
                  if(skuItem && skuItem.areaPriceList == null){
                    skuItem.areaPriceList = [{'areaId': 0, 'areaName': "全国", 'areaNumber': 1, 'supplyPrice': null}]
                  } 
                 if(skuItem && skuItem.areaPriceList.length == 0){
                  skuItem.areaPriceList = [{'areaId': 0, 'areaName': "全国", 'areaNumber': 1, 'supplyPrice': null}]
                 }
                }
            })
          })
        } else {
          message.error('获取供货信息失败',2)
          this.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[0] = {}
          this.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[0].areaPriceList = [{'areaId': 0, 'areaName': "全国", 'areaNumber': 1, 'supplyPrice': null}]
        }
      }

      // 销售信息组件，处理扩展列
      if(this.itemTmplPublishVo.itemTmplSkuVoList){
        this.itemTmplPublishVo.itemTmplSkuVoList.map((item,index)=>{
          let extendSkuFields = item.extendSkuFields;
          if(extendSkuFields && extendSkuFields.length>0){
            extendSkuFields.map((_item,_index)=>{
              item[`extendSkuFields_${_item.label}`] = {label:_item.label,value:_item.value}
            })
          }
        })
      }
      // 将回显的数据存进redux
      this.props.saveParamsAction(this.itemTmplPublishVo);
    }

    // 销售规格接口返回的数据，存储于this.saleAttributeData
    if(nextProps.saleAttributeRedux && nextProps.saleAttributeRedux.data && nextProps.saleAttributeRedux.data.data && nextProps.saleAttributeRedux.data.data!=this.saleAttributeData){
      this.saleAttributeData = nextProps.saleAttributeRedux.data.data;
      let checkedAttributes = this.itemTmplPublishVo && this.itemTmplPublishVo.checkedAttributes ? this.itemTmplPublishVo.checkedAttributes : [];
      
      let saleAttributeData = [];
       // 如果更换了类目，则销售规格均是未选中状态，否则添加checked = true的字段
      if(this.cidChangedTimes > 0){
        saleAttributeData = this.saleAttributeData;
      } else {
         // 拼接 checked = true 的销售规格数据源
         saleAttributeData = this.initDataSourceWithCheckedAttr(checkedAttributes,this.saleAttributeData);
      }
      
      //将拼接后的数据存进redux
      this.props.saveSkuListAction(saleAttributeData);
    }

    // 店铺时，销售信息表格列是否需要根据模板进行列的校验
    const calcRule = this.getTempCalcRule(nextProps);
    this.setState({
      calcRule: calcRule
    });
  }

  /**
   * 动态加载组件
   * @param templateId 模板Id
   */
  loadDyComponents = (templateId)=>{
    this.props.loadTabComponents({templateId: templateId}).then((result) => {
      let data = result && result.data || {};
      let releaseSaleSpecification_index = -1; // 返回数据里是否有销售规格组件
      let releaseSaleInfo_index = -1; // 返回数据里是否有销售信息组件
      let shopCategory_index = -1; // 返回数据里是否有店铺分类组件
      let secondCategory_index = -1; // 返回数据里是否有第二分类组件
      if(!data[`HOOK_BASIC_INFO_${templateId}`]){
        data[`HOOK_BASIC_INFO_${templateId}`] = [];
      }
      // 销售规格组件内带销售信息组件，如果重复，排除掉销售信息组件
      data[`HOOK_BASIC_INFO_${templateId}`].map((item, index)=>{
        if(item.signature == 'ReleaseChannel'){
          this.hasChannel = true;
        }
        if(item.signature == 'BasicShopCategory'){
          shopCategory_index = index;
        }
        if(item.signature == 'BasicSecondCategory'){
          secondCategory_index = index;
        }
        if(item.signature == 'ReleaseSaleSpecification'){
          releaseSaleSpecification_index = index;
        }
        if(item.signature == 'ReleaseSaleInfo'){
          releaseSaleInfo_index = index;
        }
      });

      let releaseSaleSpecification_com = {
        componentName: "商品发布/编辑-基础信息/销售规格",
        config: "{}",
        moduleConfig: "{}",
        signature: "ReleaseSaleSpecification",
        version: "v1.0.0"
      }
      
      let releaseSaleInfo_com = {
        componentName: "商品发布/编辑-基础信息/销售信息",
        config: "{}",
        moduleConfig: "{}",
        signature: "ReleaseSaleInfo",
        version: "v1.0.0"
      };

      // 有销售规格， 没有销售信息，在销售规格后面添加销售信息
      if(releaseSaleSpecification_index >=0 && releaseSaleInfo_index<0){

        data[`HOOK_BASIC_INFO_${templateId}`].splice(releaseSaleSpecification_index+1, 0, releaseSaleInfo_com);
      
      } else if(releaseSaleSpecification_index <0 && releaseSaleInfo_index >=0){
        
        // 没有销售规格，有销售信息，在销售信息前面添加销售规格
        data[`HOOK_BASIC_INFO_${templateId}`].splice(releaseSaleInfo_index, 0, releaseSaleSpecification_com);
      
      } else if(releaseSaleSpecification_index <0 && releaseSaleInfo_index <0){

        // 既没有销售规格，也没有销售信息
        data[`HOOK_BASIC_INFO_${templateId}`].push(releaseSaleSpecification_com);
        data[`HOOK_BASIC_INFO_${templateId}`].push(releaseSaleInfo_com);
      }

      //非店铺页面排除掉店铺分类组件
      if(this.props.type != 3 && shopCategory_index >= 0){
        data[`HOOK_BASIC_INFO_${templateId}`].splice(shopCategory_index,1);
      }
      // 店铺页面排除掉第二分类
      if(this.props.type == 3 && secondCategory_index >= 0){
        data[`HOOK_BASIC_INFO_${templateId}`].splice(secondCategory_index,1);
      }
      // 添加管理员信息组件，该组件一直存在
      data[`HOOK_BASIC_INFO_${templateId}`].push({
        componentName: "商品发布/编辑-基础信息/管理员信息组件",
        config: "{}",
        moduleConfig: "{}",
        signature: "AdminInformation",
        version: "v1.0.0"
      });
      const components = this.loadInstance(data);
      this.setState({
        dyComLoading: false,
        components: components
      });
    },
      (error) => {
        console.log(error)
      }
    );
  }

  /**
   * 店铺时，根据总数据源中的freightTmplVo.tmplId 和 运费模板数据源
   * 找出销售信息组件哪个列需要进行校验：按体积，按重量，按件数
   */
  getTempCalcRule = (props)=>{
    let calcRule = undefined;
    if(props.type=='3'){
      const tempDS = props.tempRedux && props.tempRedux.data || [];
      const itemTmplPublishVo = props.saveParamsRedux && props.saveParamsRedux.itemTmplPublishVo || {};
      const tmplId = itemTmplPublishVo.freightTmplVo && itemTmplPublishVo.freightTmplVo.tmplId || undefined;
      tempDS.forEach((item)=>{
        if(item.id == tmplId){
          calcRule = item.calcRule;
          return false;
        }
      });
    }
    return calcRule;
  }

  //更新销售规格数据的方法
  updateSaleAttributeAction = (data)=>{
    this.props.saveSkuListAction(data);
  }

  //获取拼接后销售规格数据
  // getNewSaleAttributeAction = () =>{
  //   return this.props.saveSkuListRedux.skuListData;
  // }

  //获取当前已保存数据
  getParamsAction = ()=>{
    return this.props.saveParamsRedux
  }

  //更新总数据的方法
  updateItemTmplAction = (data)=>{
    this.props.saveParamsAction(data)
  }

  loadInstance(components) {
    var that = this;
    var instances = {};
    components && Object.keys(components).map((hook) => {
      components[hook].map((value) => {
        if (value["signature"]) {
          let props = {};
          //处理config-->json.parse
          props = JSON.parse(value['config']);
          //处理moduleConfig-->json.parse,eval
          let sourceModuleProps = JSON.parse(value['moduleConfig']);
          //合并config
          props = Object.assign(props ? props : {}, sourceModuleProps ? sourceModuleProps : {});

          var Ins = Loadable({
            loader: () => import('../../..' + '/' + value["signature"] + '/' + value["version"] + '/view/index').then(object => object.default),
            loading: Loading,
            delay: 300,
            render(loaded) {
              let Component = loaded;
              return <Component
                {...props}
                components = {that.state.components}
                type={that.props.type}
                key={`tabs_${value["signature"]}`}
                ifSave={that.ifSave}
                ifValid={that.ifValid}
                itemId={that.itemId}
                edit={that.edit}
                getSaleAttributeAction={that.props.getSaleAttributeAction}  //请求销售规格接口的方法
                saleAttributeData={that.props.saveSkuListRedux && that.props.saveSkuListRedux.skuListData || []}  //拼接后的销售规格数据
                updateSaleAttributeAction={that.updateSaleAttributeAction} //更新销售规格数据的方法
                updateItemTmplAction={that.updateItemTmplAction} //更新总数据的方法
                itemTmplPublishVo={that.props.saveParamsRedux && that.props.saveParamsRedux.itemTmplPublishVo} //当前已保存的总数据
              />;
            }
          });
          // debugger;
          instances[hook] = instances[hook] || [];
          if(hook.indexOf('HOOK_TABS')>=0){
            instances[hook].push({ tabTitle: props.tabTitle || '无用Tab测试', Com: Ins });
          } else {
            instances[hook].push(Ins);
          }
        }
      });
    });
    return instances;
  }

  //获取url传递的参数
  getUrlParam(url, name) {
    var pattern = new RegExp('[?&]' + name + '\=([^&]+)', 'g');
    var matcher = pattern.exec(url);
    var items = null;
    if (matcher !== null) {
      try {
        items = decodeURIComponent(decodeURIComponent(matcher[1]));
      }
      catch (e) {
        try {
          items = decodeURIComponent(matcher[1]);
        }
        catch (e) {
          items = matcher[1];
        }
      }
    }
    return items;
  }

  //获取该商品的状态值
  getItemStatus = ()=>{
    let ifPublish = false;//发布状态，默认未发布
    let ifPass = false;//审核状态，默认未审核或未通过
    const supplyStatus = this.getUrlParam(this.location,'supplyStatus');
    const itemStatus = this.getUrlParam(this.location,'itemStatus');
    const storeStatus = this.getUrlParam(this.location,'storeStatus');
    this.newType = this.getUrlParam(this.location,'newType');
    if(itemStatus){//店铺编辑
      this.edit = true;
      if(itemStatus != 100){//已发布
        ifPublish = true;
        if(itemStatus != 70){//审核通过
          ifPass = true;
        }
      }
    } else if(supplyStatus){//供应商编辑
      this.edit = true;
      if(supplyStatus != 10){//已发布
        ifPublish = true;
        if(supplyStatus != 30){//审核通过
          ifPass = true;
        }
      }
    } else if(storeStatus){//平台编辑
      this.edit = true;
      if(storeStatus != 10){//已发布
        ifPublish = true;
      }
      ifPass = true;//平台发布的商品无需审核
    }
    this.ifSave = !ifPublish; //未发布时展示保存按钮
    if(ifPublish && ifPass){ //未发布或已驳回状态是未生效数据，已发布并且审核通过则是已生效数据
      this.ifValid = true;
    }
  }

  // 重新构造销售规格数据源，添加上是否checked
  initDataSourceWithCheckedAttr = (checkedAttr, dataSource)=>{
    var new_checkedAttr = {};
    checkedAttr.forEach((item) => {
      new_checkedAttr[item.attrId] = item.attrValueIds;
    });
    dataSource.forEach((item) => {
      (new_checkedAttr[item.attrId] || []).forEach((checkedValueId)=>{
        item.platformCategoryAttributeValues.forEach((valueItem)=>{
          if(valueItem.attrValueId == checkedValueId){
            valueItem.checked = true;
          }
        })
      });
    });
    return dataSource;
  }

  onTabClick=(e)=>{
    if(this.cid){
      this.setState({activeKey:e})
    } else {
      message.error("请先选择平台分类！")
    }
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="basicinfo" animated={false} onTabClick={this.onTabClick} activeKey={this.state.activeKey}>
          <TabPane tab={<span className={styles.tabIcon}><i>*</i>基础信息</span>} key='basicinfo'>
            <ReleaseBasicInfo
              components = { this.state.components }
              ifSave={this.ifSave}
              dyComLoading={this.state.dyComLoading}
              ifValid={this.ifValid}
              templateId={this.templateId}
              type={this.props.type}
              saleAttributeData={this.props.saveSkuListRedux && this.props.saveSkuListRedux.skuListData || []}  //拼接后的销售规格数据
              updateSaleAttributeAction={this.updateSaleAttributeAction} //更新销售规格数据的方法
              updateItemTmplAction={this.updateItemTmplAction} //更新总数据的方法
              itemTmplPublishVo={this.props.saveParamsRedux && this.props.saveParamsRedux.itemTmplPublishVo} // 发布、保存、编辑，总数据源
            />
          </TabPane>
          <TabPane tab={<span className={styles.tabIcon}><i>*</i>商品图片</span>} key='image'>
              {
                this.props.type == '1'?
                    <ReleasePlatformGoodsImage
                        saleAttributeData={this.props.saveSkuListRedux && this.props.saveSkuListRedux.skuListData || []}  //拼接后的销售规格数据
                        updateItemTmplAction={this.updateItemTmplAction} //更新总数据的方法
                        itemTmplPublishVo={this.props.saveParamsRedux && this.props.saveParamsRedux.itemTmplPublishVo} //当前已保存的总数据
                    />:
                    <ReleaseShopGoodsImage
                        saleAttributeData={this.props.saveSkuListRedux && this.props.saveSkuListRedux.skuListData || []}  //拼接后的销售规格数据
                        updateItemTmplAction={this.updateItemTmplAction} //更新总数据的方法
                        itemTmplPublishVo={this.props.saveParamsRedux && this.props.saveParamsRedux.itemTmplPublishVo} //当前已保存的总数据
                    />
              }
          </TabPane>
          {
            /* 动态加载tab组件 */
            (this.state.components[`HOOK_TABS_${this.templateId}`] || []).map((item, i) => {
              let Com = item.Com;
              return (
                <TabPane tab={item.tabTitle} key={`tab_${i}`}>
                  <Com />
                </TabPane>
              )
            })
          }
          <TabPane tab={<span className={styles.tabIcon}><i>*</i>其他设置</span>} key='other'>
            <ReleaseOtherConfig 
                type={this.props.type}
                itemTmplPublishVo = {this.props.saveParamsRedux && this.props.saveParamsRedux.itemTmplPublishVo} //当前已保存的总数据
                updateItemTmplAction = {this.updateItemTmplAction}
            />
          </TabPane>
          {this.props.type == 3?
            <TabPane tab={<span className={styles.tabIcon}><i>*</i>价格及库存</span>} key='priceAndStock'>
              <ReleasePriceAndStock
                edit={this.edit}  
                type={this.props.type}               
                itemTmplPublishVo = {this.props.saveParamsRedux && this.props.saveParamsRedux.itemTmplPublishVo} //当前已保存的总数据
                updateItemTmplAction = {this.updateItemTmplAction}/>
            </TabPane> 
          :null}
          {this.props.type == 2?
            <TabPane tab={<span className={styles.tabIcon}><i>*</i>供货信息</span>} key='supplyInfo'>
              <ReleaseSupplyInfo
                edit={this.edit} 
                type={this.props.type}
                itemTmplPublishVo = {this.props.saveParamsRedux && this.props.saveParamsRedux.itemTmplPublishVo} //当前已保存的总数据
                updateItemTmplAction = {this.updateItemTmplAction}/>
            </TabPane>
          :null}
        </Tabs>
        <ReleaseBtns
          ifSave={this.ifSave}
          ifValid={this.ifValid}
          itemId={this.itemId}
          edit={this.edit}
          type={this.newType?'0':this.props.type}
          calcRule={this.state.calcRule} // 店铺时，根据该字段判断销售信息表格校验列
          updateItemTmplAction = {this.updateItemTmplAction} //更新总数据的方法
          itemTmplPublishVo = {this.props.saveParamsRedux && this.props.saveParamsRedux.itemTmplPublishVo} //当前已保存的总数据
          hasChannel = {this.hasChannel} //是否加载了渠道组件
        />
      </div>
    )
  }
}
