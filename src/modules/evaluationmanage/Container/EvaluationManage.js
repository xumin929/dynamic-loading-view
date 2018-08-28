/****************************************************************
 * author:LiuYang
 * date:2017-05-04
 * description:评价管理//jira.jd.com/secure/attachment/174793/1a61abd6eeb0513b32df79022de9d6e.png
 ****************************************************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Layout, Menu, Icon, Switch, Dropdown, Tabs, Breadcrumb, Button, Modal,message} from 'jdcloudui';
import {queryList, confirmReply, queryShopNamesListFromComment} from '../../../components-react/EvaluationManage/redux';
import Query from '../../../components-react/EvaluationManage/Query/Query';
import ReplyTable from '../../../components-react/EvaluationManage/ReplyTable/ReplyTable';
import {getDomain} from 'jdcloudecc/reducer/domain';

import { provideHooks } from 'redial';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
      await dispatch(getDomain()).catch(() => null);
      console.log("get data async from server")
  }
})

@connect(
  state => ({
    EvaluationManage: state.EvaluationManage
  }),
  dispatch => bindActionCreators({queryList, confirmReply, queryShopNamesListFromComment}, dispatch)
)
export default class EvaluationManage extends Component{
  constructor(props, context) {
    super(props, context);
    this.params = {};
    this.state={
      loadingStatus: false
    }
  }
  changeQuery(val){
    console.log(val,'拿回来的参数');
    if(val.status == 0){
        val.status = null;
    }else{}
    let param = {
      'buyerName': val.userName ? val.userName : null,
      'orderNo': val.submitTimeStart ? val.submitTimeStart : null,
      'itemName': val.itemName ? val.itemName : null,
      'shopId': val.shopId ? val.shopId : null,
      'shopName': val.shopName != '' ? val.shopName : null,
      'itemQualityScore': val.status ? val.status : null,
      'isdisplay': val.isdisplay == -1 ? null : val.isdisplay,
      'commentTimeBegin':val.dateStart == '' ? null : val.dateStart,
      'commentTimeEnd':val.dateEnd == '' ? null : val.dateEnd,
      'skuId': val.SKUNumber ? val.SKUNumber : null,
      'itemId': val.shopNumber ? val.shopNumber : null,
      'pageNum': 1,
      'pageSize': 10,
    };
    this.params = param;
    this.setState({
      loadingStatus: true
    });
    this.props.queryList(param).then(
      (result)=>{
        this.setState({
          loadingStatus: false
        });
        if(+this.props.EvaluationManage.replyList.code !== 0 && this.props.EvaluationManage.replyList.code != undefined){
          message.error('评价列表更新失败');
        }else{}
      },
      (error)=>{
        this.setState({
          loadingStatus: false
        });
        message.error('评价列表更新失败');
      }
    );
  }
  componentWillMount(){
    this.setState({
      loadingStatus: true
    });
    let params = {
        pageNum: 1,
        pageSize: 10,
      };
    this.props.queryList(params).then(
      (result)=>{
        this.setState({
          loadingStatus: false
        });
        if(+result.code != 0){
          message.error('评价列表更新失败');
        }else{}
      },
      (error)=>{
        this.setState({
          loadingStatus: false
        });
        message.error('评价列表更新失败');
      }
    );
  }
  render() {
      const data = this.props.EvaluationManage.ListFrom && this.props.EvaluationManage.ListFrom.data ? this.props.EvaluationManage.ListFrom.data : [];
      console.log(data);
      return (
        <div className="ui-container ui-platform">
          <div className="ui-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item >首页</Breadcrumb.Item>
              <Breadcrumb.Item>商品管理</Breadcrumb.Item>
              <Breadcrumb.Item>商品评价</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ui-ct">
            <div className="ui-hd">商品评价</div>
            <div className="ui-bd">
              <Query changeQuery = {(val) => {::this.changeQuery(val)}} dataArr={data} />
              <ReplyTable loadingStatus = {this.state.loadingStatus} params = {this.params} style={{marginTop:'20px'}}  query = {(val) => {this.changeQuery(val)}}/>
            </div>
          </div>
      </div>
      );
  }
}