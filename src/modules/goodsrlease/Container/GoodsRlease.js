/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布
 ****************************************************************/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {Layout, Tabs, Breadcrumb, Button, Modal, message} from 'jdcloudui';
import GoodsBasic from '../../../components-react/GoodsRlease/GoodsBasic'
import GoodsIntroduction from '../../../components-react/GoodsRlease/GoodsIntroduction'
import GoodsOther from '../../../components-react/GoodsRlease/GoodsOther'
import GoodsPicWrapper from '../../../components-react/GoodsRlease/GoodsPicWrapper'
import GoodsSpec from '../../../components-react/GoodsRlease/GoodsSpec'
import {getDomain} from 'jdcloudecc/reducer/domain';
import * as funcs from '../../../components-react/GoodsRlease/redux';
import {editGoodsInfo} from '../../editgoods/Container/redux';
import {API_BUSINESSITEMPUBLISH, API_BUSINESSITEMSAVE, API_PUBLISHITEMBYEDIT, API_SAVEITEMBYBUSINESS, API_SAVEITEMBYAUDIT, API_SYNC_GOODS_TO_LIBRARY} from './API';
import {provideHooks} from "redial";
const {Footer} = Layout;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

@connect(
  state => ({
    goodsRlease: state.goodsRlease,
  }),
  dispatch => bindActionCreators({...funcs, editGoodsInfo}, dispatch)
)
@provideHooks({
    fetch: async ({ store: { dispatch, getState } }) => {
        await dispatch(getDomain()).catch(() => null);
        console.log("get data async from server")
    }
})
export default class GoodsRlease extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      errMSG: '',
      checkStatus: {},
      checksArray: [],
      randomAttribute: 0.1,
      ifupdate: false,
      submitVisible: false,
      submit: false,
      saveInfo: false,
      type: null,
      tabKey: null,
      itemId: null,
      syncStatus: false
    };
    this.initSale = true;
    this.initBrand = true;
    this.url = '';
    this.location = '';
    this.preUrl = '';
    this.saveUrl = '';// 保存的URL
    this.edit = '';// 从哪过来的编辑
    this.syncGoodsLibraryUrl = '';// 同步商品到平台标准库
    this.id = null;
    this.ifUse = true; //是否可以保存发布
    this.ifCategory = false;
    this.ifCategoryErrorVal = true;
    this.checkStatus = {
      val: null,
      ifcheckd: true,
      parentId: null
    };
    this.checkesArray = [];
    this.ifcheckdStatus = true;
    this.ifupdate = false;
    this.submitStatus = false;
    this.deleteCa = false;
    this.operatorId = null;
    this.initGetOpreatorId = true;
    this.editType = 0;
  }

  callback(key) {
    this.setState({tabKey: key});
  }

  ifCategoryError(val) {
    this.ifCategoryErrorVal = val;
  }

  componentWillMount() {
    let param = {
      platformId: 2,
      cid: 1000152
    }
    let param2 = {
      platformId: 2
    }
    if (this.initSale && this.initBrand) {
      this.props.getOperatorInfo(param2);
      this.props.getPublisherInfo();

    } else {
    }
    this.location = typeof window !== 'undefined' ? window.location.href : "";
    this.preUrl = typeof document !== 'undefined' ? document.referrer : "";
    let edit = this.getUrlParam(this.location, 'edit');
    this.editType = edit
    this.id = this.getUrlParam(this.location, 'itemId');
    let type = this.getUrlParam(this.location, 'type');
    this.setState({
      type
    });
    // let edit = 1;
    this.edit = edit;
    this.url = API_BUSINESSITEMPUBLISH;// 运营商发布产品
    this.saveUrl = API_BUSINESSITEMSAVE;// 运营商保存产品
    this.syncGoodsLibraryUrl = API_SYNC_GOODS_TO_LIBRARY;// 同步商品到平台标准库的后端接口
    if (edit == 1) {
      this.url = API_PUBLISHITEMBYEDIT; // 商品编辑 发布
      this.saveUrl = API_SAVEITEMBYBUSINESS; // 商品编辑 保存
    } else if (edit == 2) {
      this.url = API_SAVEITEMBYAUDIT; // 审核编辑保存
    } else if (edit == 3) {
      this.url = API_SYNC_GOODS_TO_LIBRARY; //
    } else {
      this.url = API_BUSINESSITEMPUBLISH; // 运营商发布产品
      this.saveUrl = API_BUSINESSITEMSAVE; // 运营商保存产品
    }
  }

  detailParams(data) {
    let keys = [];
    if (data && data.length) {
      keys = data.map((item, index) => {
        let newItem = JSON.parse(item);
        return newItem.attributes
      });
    } else {
    }
    let param = {
      keys: JSON.stringify(keys)
    };
    return param;
  }

  detailCacheParams(data) {
    let params = [];
    if (data && data.length) {
      params = data.map((item, index) => {
        if (Object.prototype.toString.call(item) == "[object Object]") {
          return item.attributes
        }
        else {
          return item;
        }
      });
    } else {
    }
    let param = {
      keys: JSON.stringify(params)
    };
    return param;
  }

  perfectInfo() {
    if (!this.ifCategoryErrorVal) {
      message.error('分类数据无效，请从新选择平台分类');
      this.ifUse = false;
      return false;
    } else {
    }
    let itemPulishVO = this.props.goodsRlease.itemPulishVO;
    itemPulishVO.operatorId = this.operatorId;
    if (itemPulishVO.itemName == null || itemPulishVO.itemName == undefined || itemPulishVO.itemName == '') {
      message.error('商品名称不能为空');
      this.ifUse = false;
      return false;
    } else if (itemPulishVO.cid == null || itemPulishVO.cid == undefined || itemPulishVO.cid == '') {
      message.error('平台分类不能为空或者请选择平台分类到终级类目');
      return false;
      this.ifUse = false;
    } else if (itemPulishVO.itemPictureVoList == null || itemPulishVO.itemPictureVoList == undefined || itemPulishVO.itemPictureVoList == [] || itemPulishVO.itemPictureVoList.length <= 0) {
      message.error('请您上传商品图片(至少一张)');
      this.ifUse = false;
      return false;
    }/*else if(itemPulishVO.itemSkuPictureVoList.length != itemPulishVO.itemSkuVoList.length){
     this.info('请您上传商品图片下的SKU图片（每个SKU至少一张）');
     this.ifUse = false;
     }*/ else {
      this.ifUse = true;
    }
    if (!itemPulishVO.operatorId) {
      message.error('商品运营人员不能为空');
      this.ifUse = false;
      return false;
    } else {
      this.ifUse = true;
    }
  }

  info(msg) {
    if (!msg) {
      msg = '商品保存失败';
    } else {
    }
    Modal.info({
      title: '',
      content: (
        <div>
          <p>{msg}</p>
        </div>
      ),
      onOk() {
      },
    });
  }

  submit() {
    // 当是审核的时候 url = '/itemPublish/API_SAVEITEMBYAUDIT';
    let itemPulishVO = this.props.goodsRlease.itemPulishVO;
    console.log(itemPulishVO);
    if (itemPulishVO.brandName && itemPulishVO.brandName.length > 20) {
      message.error("品牌名称最多20个字符");
      return false;
    // } else if (itemPulishVO.brandName && !/[\u4e00-\u9fa5]/.test(itemPulishVO.brandName)) {
    //   message.error("品牌名称至少有一个是中文字符");
    //   return false;
    }
    if(itemPulishVO.channelArr.length==0){
      message.error("至少选择一个适用渠道");
      return false;
    }
    this.perfectInfo();
    if (this.id) {
      itemPulishVO.id = this.id;
    }
    if (this.ifUse) {
      if (this.props.goodsRlease.publisher && this.props.goodsRlease.publisher.data && this.props.goodsRlease.publisher.data.username) {
        itemPulishVO.publishuserId = this.props.goodsRlease.publisher.data.userId;
      }
      if (itemPulishVO && itemPulishVO.itemSaleInfoVo && !itemPulishVO.itemSaleInfoVo.deliveryCycle) {
        message.error('请填写交货周期');
        return false;
      }
      if (itemPulishVO && itemPulishVO.itemSaleInfoVo && !itemPulishVO.itemSaleInfoVo.initialMount) {
        message.error('请填写起订数量');
        return false;
      }
      if (itemPulishVO && itemPulishVO.itemSaleInfoVo && !itemPulishVO.itemAfterSaleVo.repaireDuration && itemPulishVO.itemAfterSaleVo.repaireDuration != 0) {
        message.error('请填写质保时长');
        return false;
      }
      if (itemPulishVO && itemPulishVO.itemSaleInfoVo && itemPulishVO.itemAfterSaleVo.changeService == 2 && !itemPulishVO.itemAfterSaleVo.changeDuration) {
        message.error('请填写换货时长');
        return false;
      }
      if (itemPulishVO && itemPulishVO.itemSaleInfoVo && itemPulishVO.itemAfterSaleVo.refundService == 2 && !itemPulishVO.itemAfterSaleVo.refundDuration) {
        message.error('请填写退货时长');
        return false;
      }
      let param = {
        platformId: 2,
        userId: -1,
        itemPublishVo: JSON.stringify(itemPulishVO)
      }
      this.setState({
        submit: true
      });
      //暂时先干掉 测试一下
      this.props.release(param, this.url).then(
        (result) => {
          if (result.code == 0) {
            message.success('商品发布成功！');
            if (this.editType == 3) {
              message.success('加入商品库成功！');
              this.clearCahe(true, this.props.editType);
            }else {
              if(this.props.editData && (this.props.editData.storeStatus == 20 || this.props.editData.storeStatus == 30)) {
                window.location.href = '/operating-item-view/item-base';
              }else{
                let dataArr = JSON.parse(param.itemPublishVo);
                dataArr.id = result.data;
                param.itemPublishVo = JSON.stringify(dataArr);
                this.confirmModel(param, this.syncGoodsLibraryUrl);
              }
            }
          } else {
            this.setState({
              submit: false
            });
            this.submitStatus = false;
            if (result.msg) {
              message.error(result.msg);
            } else {
              message.error('商品发布失败！');
            }
          }
        },
        (error) => {
          this.setState({
            submit: false,
          });
          message.error('商品发布失败！');
        }
      );
    }
  }

  clearCahe(style, type) {
    console.log(type)
    let cacheParams = this.detailCacheParams([...this.props.goodsRlease.saleMessage, ...this.props.goodsRlease.singleImgKeys]);
    if(cacheParams.keys.length==1 && cacheParams.keys[0]==null){
      console.log('无销售属性商品')
    } else {
      this.props.deleteCacheTable(cacheParams).then(
        (result) => {
          this.deleteCa = true;
          if (typeof window !== 'undefined') {
            if (type == 3) {
              window.location.href = '/operating-item-view/goodsmanage?return=1';
            } else {
              window.location.href = '/operating-item-view/item-base';
            }
          }
        },
        (error) => {
          message.error('清空缓存列表出错');
        }
      );
    }
  }

  confirmModel(params, url) {
    let _this = this;
    confirm({
      title: '确定同步该商品到标准库吗？',
      // content: '确定发布该商品吗？',
      onOk: () => this.syncGoodsLibrary(params, url, _this),
      onCancel() {
        console.log('Cancel');
        _this.clearCahe(true, _this.props.editType);
      }
    });
  }

  // 同步到标准库
  syncGoodsLibrary(params, url, _this) {
    _this.props.syncLibrary(params, url).then(
      (result) =>{
        if (result.code == 0) {
          message.success('同步到标准库成功！');
        }else {
          // 如果后端有展示信息，优先使用后端的
          if (result.msg) {
            message.error(result.msg);
          } else {
            message.error('同步到标准库失败！');
          }
        }
        _this.clearCahe(true, _this.props.editType);
      }
    );
  }

  save() {
    let itemPulishVO = this.props.goodsRlease.itemPulishVO;
    //this.perfectInfo();
    if (this.id) {
      itemPulishVO.id = this.id;
    }
    if (itemPulishVO.itemName == null || itemPulishVO.itemName == undefined || itemPulishVO.itemName == '') {
      message.error('商品名称不能为空');
      this.ifUse = false;
      return false;
    }
    if(itemPulishVO.channelArr.length==0){
      message.error("至少选择一个适用渠道");
      return false;
    }
    if (itemPulishVO.cid == null || itemPulishVO.cid == undefined || itemPulishVO.cid == '') {
      message.error('平台分类不能为空或者请选择平台分类到终级类目');
      return false;
    }
    // if(this.ifUse){
    if (this.props.goodsRlease.publisher && this.props.goodsRlease.publisher.data && this.props.goodsRlease.publisher.data.username) {
      itemPulishVO.publishuserId = this.props.goodsRlease.publisher.data.userId;
    }
    let param = {
      platformId: 2,
      userId: -1,
      itemPublishVo: JSON.stringify(itemPulishVO)
    }
    this.setState({
      saveInfo: true
    });
    this.props.release(param, this.saveUrl).then(
      (result) => {
        if (result.code == 0) {
          this.clearCahe();
          if (typeof window !== 'undefined') {
            //window.location.href = '/operating-item-view/item-base';
            message.success('商品保存成功');
            this.setState({
              saveInfo: false
            });
            let itemId = this.getUrlParam(this.location, 'itemId');
            let param = {
              platformId: 2,
              itemId: itemId
            }
            if (itemId) {
              this.props.editGoodsInfo(param).then(
                (result) => {
                  let param2 = {
                    // platformId: 2,
                    cid: this.props.editData.cid,
                  }
                  let brandParam = {
                    // platformId: 2,
                    cid: this.props.editData.cid,
                    itemId: itemId
                  }
                  this.props.getSaleInfo(brandParam, 1);
                  this.props.getBrandInfo(brandParam, 1);
                  this.props.findCategory(brandParam);
                  this.props.getUnitInfo(param2);
                  let param3 = {
                    //platformId: 2,
                    categoryId: this.props.editData.cid,
                    itemId: itemId
                  }
                  this.props.brandSearchByCid(param3, true);
                },
                (error) => {
                }
              );
            }
            //this.location.reload();
            //history.go(0)
          } else {
          }
        } else {
          this.setState({
            saveInfo: false
          });
          if (result.msg) {
            message.error(result.msg);
          } else {
            message.error('商品保存失败');
          }
        }
      },
      (error) => {
        this.setState({
          saveInfo: false
        });
        message.error('商品保存失败');
      }
    );
    // }else{}
  }

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

  //将判断否刷新初始化
  handleIfupdateBack = () => {
    this.ifupdate = false;
    // this.setState({itemSkuVoList:false})
  }

  checkedId(val, ifcheckd, attrId) {
    this.ifupdate = true;
    // this.setState({ifupdate:true})
    this.ifcheckdStatus = true;
    this.checkStatus = {
      val: val,
      ifcheckd: ifcheckd,
      parentId: attrId
    };
    this.setState({
      checkStatus: {
        val: val,
        ifcheckd: ifcheckd,
        parentId: attrId
      }
    });
  }

  setChecksArray(val) {
    this.setState({
      checksArray: val,
      //randomAttribute: Math.random()
    });
    this.checkesArray = val;
    this.ifcheckdStatus = false;
  }

  cancel(e) {
    if (this.props.editType == 3) {
      window.location.href = '/operating-item-view/goodsmanage?reutrn=1';
    } else {
      e.preventDefault();
      //window.location.href = this.preUrl;
      this.clearCahe();
    }
  }

  changeOperators(value) {
    this.operatorId = value;
  }

  render() {
    if (this.props.editGoods && this.props.editData && this.props.editData.operatorId && this.initGetOpreatorId) {
      this.operatorId = this.props.editData.operatorId;
      this.initGetOpreatorId = false;
    } else {
    }
    return (
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item >首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>商品发布</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">商品发布</div>
          <div className="ui-bd">
            <Tabs defaultActiveKey='1' onChange={::this.callback} style={{background: 'white'}} animated={false}>
              <TabPane tab={<span><i style={{color: '#f04134'}}>*</i>基础信息</span>} key='1'>
                <GoodsBasic changeOperators={(value) => {
                  this.changeOperators(value)
                }} itemId={this.id} type={this.state.type}
                            checkedId={(val, ifcheckd, attrId) => this.checkedId(val, ifcheckd, attrId)}
                            ifCategoryError={(val) => this.ifCategoryError(val)}
                            editGoods={this.props.editGoods}></GoodsBasic>
              </TabPane>
              <TabPane tab={<span><i style={{color: '#f04134'}}>*</i>商品图片</span>} key='2'>
                <GoodsPicWrapper editGoods={this.props.editGoods} ifupdate={this.ifupdate}
                                 handleIfupdateBack={() => this.handleIfupdateBack()}></GoodsPicWrapper>
              </TabPane>
              <TabPane tab="规格参数" key='3'>
                <GoodsSpec key={this.state.tabKey} ifcheckdStatus={this.ifcheckdStatus} checkesArray={this.checkesArray}
                           setChecksArray={(val) => this.setChecksArray(val)} checksStatus={this.state.checksArray}
                           checkStatus={this.checkStatus} editGoods={this.props.editGoods}></GoodsSpec>
              </TabPane>
              <TabPane tab="商品介绍" key='4'>
                <GoodsIntroduction editGoods={this.props.editGoods}></GoodsIntroduction>
              </TabPane>
              <TabPane tab={<span><i style={{color: '#f04134'}}>*</i>其它设置</span>} key='5'>
                <GoodsOther editGoods={this.props.editGoods}></GoodsOther>
              </TabPane>
            </Tabs>
            <Footer style={{background: 'white', textAlign: 'center ', padding: '20px 50px'}}>
              <Button type="primary" size='large' onClick={::this.submit} loading={this.state.submit}
                      disabled={this.state.saveInfo}>发布</Button>
              {this.edit != 2 && this.props.editType != 3 &&
              <Button size='large' loading={this.state.saveInfo} style={{marginLeft: '10px'}} type="primary"
                      disabled={this.state.submit} onClick={::this.save}>保存</Button>}
              <Button size='large' onClick={::this.cancel} style={{marginLeft: '10px'}}
                      disabled={this.state.submit || this.state.saveInfo}>取消</Button>
            </Footer>
          </div>
        </div>
      </div>
    );
  }
}
