/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       王禹展(wyuzhan@163.com)
 * @description:  新建商品库容器（编辑回显也适用）
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Tabs, Button, message} from 'jdcloudui';
const TabPane = Tabs.TabPane;

/* **********  自定义组件  ********** */
import * as configs from './components-GoodsLibrary-AddLibrary-AddLibraryWrap';
const {
  BaseInformation,
  SalesSpecifications,
  SalesInformation,
  AdminInformation,
  GoodsImage,
  SkuImage,
  SpecificationsParameter,
  ProductsIntroduction,
  OtherInformation
} = configs;

import {
  API_LIBRARY_ITEM_PUBLISH,
  API_LIBRARY_ITEM_SAVE,
  API_LIBRARY_ITEMBY_EDIT_1,
  API_LIBRARY_ITEMBY_EDIT_2,
  API_SAVE_ITEM_BY_LIBRARY,
} from '../API';
import '../style/style.css';
import {connect} from 'react-redux';
import {setParamete, submitData} from '../parameters_redux';
import {bindActionCreators} from 'redux';

@connect(
  state => ({params: state.Params,libraryGoodsEdit: state.libraryGoodsEditInfo}),
  dispatch => bindActionCreators({setParamete, submitData}, dispatch)
)
class AddLibraryWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitState: false, // 商品的发布或保存状态，是否正在发布、保存中
      // checkState: false, // 参数校验状态，为true才可以发布

    };
    this.saveUrl = null; // 商品保存时，请求的后端地址
    this.publishUrl = null; // 商品发布时，请求的后端地址
    this.id = null; //  商品id 就是itemId
    this.type = null; // 是否是从店铺商品管理页面跳转过来的（1：是）
  }

  componentWillMount() {
    // 查询所有运营人员，此处不用传递查询参数，因为网管会自动把参数拼上去
    // this.props.getOperatorInfo();
    // 查询商品发布人员，此处不用传递查询参数，因为网管会自动把参数拼上去
    // this.props.getPublisherInfo();
    this.location = typeof window !== 'undefined' ? window.location.href : '';
    // 根据跳转过来的路径获取itemId
    this.id = this.getUrlParam(this.location, 'itemId');
    this.type = this.getUrlParam(this.location, 'type');
    if (this.id) {
      if(this.type){
        this.publishUrl = API_LIBRARY_ITEMBY_EDIT_2; //从店铺商品管理页进入时的编辑发布接口
      } else {
        this.publishUrl = API_LIBRARY_ITEMBY_EDIT_1;// 平台标准库编辑发布产品
      }
      this.saveUrl = API_SAVE_ITEM_BY_LIBRARY;// 平台标准库编辑保存产品
    }else {
      this.publishUrl = API_LIBRARY_ITEM_PUBLISH;// 平台标准库发布产品
      this.saveUrl = API_LIBRARY_ITEM_SAVE;// 平台标准库保存产品
    }
  }
  // 公用的校验方法 ，校验 商品名称、平台分类
  commonCheck() {
     // 校验平台分类
    if (!this.props.params.cid) {
      message.error('分类数据无效，请从新选择平台分类');
      return false;
    }
    let publishItemParams = this.props.params;
    // 校验商品名称
    if (publishItemParams.itemName === null || publishItemParams.itemName === undefined || publishItemParams.itemName === '') {
      message.error('商品名称不能为空');
      return false;
      // 校验是否为终极类目
    } else if (publishItemParams.cid === null || publishItemParams.cid === undefined || publishItemParams.cid === '') {
      message.error('平台分类不能为空，并且平台分类需选择至终级类目');
      return false;
    }else if (!publishItemParams.operatorId) {
      message.error('商品运营人员不能为空！');
      return false;
    }else if (!publishItemParams.publishuserId) {
      message.error('商品发布者不能为空！');
      return false;
    }else if (!publishItemParams.itemImgInfos || (publishItemParams.itemImgInfos && JSON.parse(publishItemParams.itemImgInfos).length === 0)) {
      message.error('至少上传一张商品图片！');
      return false;
    }
    return true;
  }

  // 页面点击发布按钮，调用的商品发布方法
  publish=()=> {
    let publishItemParams = this.getParams(this.props.params);
    console.log(publishItemParams);

    if (publishItemParams.brandName && publishItemParams.brandName.length > 20) {
      message.error('品牌名称最多20个字符');
      return false;
    // } else if (publishItemParams.brandName && !/[\u4e00-\u9fa5]/.test(publishItemParams.brandName)) {
    //   message.error('品牌名称至少有一个是中文字符');
    //   return false;
    } else if (publishItemParams.itemImgInfos === null || publishItemParams.itemImgInfos === undefined || publishItemParams.itemImgInfos === '' || publishItemParams.itemImgInfos.length <= 0) {
      message.error('请您上传商品图片(至少一张)');
      return false;
    }
    publishItemParams.brandName = null;
    // 调用公共校验方法（校验商品名称、平台分类）
    const commonCheckState = this.commonCheck();
    // 如果公共校验没通过，则直接返回false，让程序停止向下执行
    if (!commonCheckState) {
      return false;
    }
    // 设置商品id
    if (this.id) {
      publishItemParams.id = this.id;
    }
    // 清楚无用数据
    if (publishItemParams.skuUnit) {
      delete publishItemParams.skuUnit;
    }
    // 清楚无用数据
    if (publishItemParams.data) {
      delete publishItemParams.data;
    }
    // 发布时，向后端传递的参数
    let param = {
      plarformId: 2,
      userId: -1,
      itemPublishParamsVo: JSON.stringify(publishItemParams)
    };
    // 设置表单提交状态
    this.setState({
      submitState: true
    });
    // 请求后端的商品发布接口
    this.props.submitData(param, this.publishUrl).then(
      (result) => {
        if (result.code == 0) {
          // 如果发布成功，则跳转至平台标准库列表
          message.success('商品发布成功！');
          window.location.href = '/operating-item-view/goodslibrary/goodslibrary';
        } else {
          this.setState({
            submitState: false // 如果发布失败，将表单提交状态设置为false
          });
          // 如果后端有展示信息，优先使用后端的
          if (result.msg) {
            message.error(result.msg);
          } else {
            message.error('商品发布失败！');
          }
        }
      }, (error) => {
      this.setState({
        submitState: false, // 如果发布失败，将表单提交状态设置为false
      });
      message.error('商品发布失败！');
    });
  }

  getParams = (_data) => {
    const data = JSON.parse(JSON.stringify(_data));
    let itemPublishSkuParamsVo = data && data.itemPublishSkuParamsVo && data.itemPublishSkuParamsVo.length > 0 ? data.itemPublishSkuParamsVo : [];
    itemPublishSkuParamsVo = itemPublishSkuParamsVo.map(item => {
      let saleAttributes = item.saleAttributes ? JSON.parse(item.saleAttributes) : null;
      if(saleAttributes) {
        saleAttributes = saleAttributes.map(_item => {
          delete _item.aName;
          delete _item.vName;
          delete _item.desc;
          return _item;
        });
        item.saleAttributes = JSON.stringify(saleAttributes);
      } else {
        item.saleAttributes = null;
      }
      return item;
    });
    data.itemPublishSkuParamsVo = itemPublishSkuParamsVo;
    data.itemImgInfos = data.itemImgInfos ? JSON.parse(data.itemImgInfos).length === 0 ? null : data.itemImgInfos : null;
    return data;
  };

  // 页面上点击保存按钮，会调用的方法
  save=()=> {
    let publishItemParams = this.getParams(this.props.params);
    console.log(publishItemParams);

    if (!publishItemParams.brandId){
      publishItemParams.brandId = -1
    }
    // 校验商品名称
    if (publishItemParams.itemName === null || publishItemParams.itemName === undefined || publishItemParams.itemName === '') {
      message.error('商品名称不能为空');
      return false;
    }

    // 校验是否为终极类目
    if (publishItemParams.cid === null || publishItemParams.cid === undefined || publishItemParams.cid === '') {
      message.error('平台分类不能为空，并且平台分类需选择至终级类目');
      return false;
    }

    if (this.id) {
      publishItemParams.id = this.id;
    }
    // 清楚无用数据
    if (publishItemParams.skuUnit) {
      delete publishItemParams.skuUnit;
    }
    // 清楚无用数据
    if (publishItemParams.data) {
      delete publishItemParams.data;
    }
    // 保存时，向后端传递的参数
    let param = {
      plarformId: 2,
      userId: -1,
      itemPublishParamsVo: JSON.stringify(publishItemParams)
    };
    this.setState({
      submitState: true
    });
    this.props.submitData(param, this.saveUrl).then(
      (result) => {
        if (result.code == 0) {
          // 如果保存成功，则跳转至平台标准库列表
          window.location.href = '/operating-item-view/goodslibrary/goodslibrary'
          if (typeof window !== 'undefined') {
            message.success('商品保存成功！');
          }
        } else {
          if (result.msg) {
            message.error(result.msg);
          } else {
            message.error('商品保存失败！');
          }
        }
        this.setState({
          submitState: false
        });
      }, (error) => {
      this.setState({
        submitState : false
      });
      message.error('商品保存失败！');
    }
    );
  }

  cancel=(e)=> {
    e.preventDefault();
    window.location.href = '/operating-item-view/goodslibrary/goodslibrary';
  }

  getUrlParam(url, name) {
    const pattern = new RegExp('[?&]' + name + '\=([^&]+)', 'g');
    const matcher = pattern.exec(url);
    let items = null;
    if (matcher !== null) {
      try {
        items = decodeURIComponent(decodeURIComponent(matcher[1]));
      } catch (e) {
        try {
          items = decodeURIComponent(matcher[1]);
        } catch (e) {
          items = matcher[1];
        }
      }
    }
    return items;
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" animated={false}>
          {/* *****  基础信息  *****  */}
          <TabPane tab={<span><i className="text-red">*</i>基础信息</span>} key="1">
            {/*  基础信息  */}
            <BaseInformation type={this.type}/>
            {/*  销售规格  */}
            <SalesSpecifications type={this.type}/>
            {/*  销售信息  */}
            <SalesInformation />
            {/*  管理员信息  */}
            <AdminInformation />
          </TabPane>
          {/* *****  商品图片  *****  */}
          <TabPane tab={<span><i className="text-red">*</i>商品图片</span>} key="2">
            {/*  商品图片  */}
            <GoodsImage />
            {/*  SKU图片  */}
            <SkuImage />
          </TabPane>
          {/* *****  规格参数  *****  */}
          <TabPane tab={<span>规格参数</span>} key="3">
            <SpecificationsParameter />
          </TabPane>
          {/* *****  商品介绍  *****  */}
          <TabPane tab={<span>商品介绍</span>} key="4">
            <ProductsIntroduction editStatus={this.props.editStatus}/>
          </TabPane>
          {/* *****  其它设置  *****  */}
          <TabPane tab={<span><i className="text-red">*</i>其它设置</span>} key="5">
            {/*<FreightInfo />*/}
            {/*<SalesMethod />*/}
            {/*<AfterHelp />*/}
            {/*<Preferential />*/}
            <OtherInformation editStatus={this.props.editStatus} />
          </TabPane>
        </Tabs>
        {/* *****  发布/保存/取消  *****  */}
        <div className="pt15 mt15 f-tac admin-btn-group-border-top">
          <Button type="primary" className="mr10" onClick={this.publish} loading={this.state.submitState}
                  disabled={this.state.submitState}>发布</Button>
          {this.type || this.props.params.storeStatus==30?null:
            <Button type="primary" className="mr10" onClick={this.save} loading={this.state.submitState}
                    disabled={this.state.submitState}>保存</Button>
          }
          <Button onClick={this.cancel} disabled={this.state.submitState}>取消</Button>
        </div>
      </div>
    );
  }
}

export default AddLibraryWrap;
