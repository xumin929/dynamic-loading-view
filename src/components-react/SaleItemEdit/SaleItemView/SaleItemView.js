/**
 * Created by huangxiao3 on 2017/2/27.
 */

import React from 'react';
import {connect} from 'react-redux';
import { Breadcrumb } from 'jdcloudui';
import {bindActionCreators} from 'redux';
import {querySaleItem} from './redux';
import SaleItemBaseInfo from '../SaleItemBaseInfo/SaleItemBaseInfo';
import SaleItemPriceList from '../SaleItemPriceList/SaleItemPriceList';
import  BaseComponent  from '../../Common/BaseComponent';
import {Loading} from 'jdcloudecc/components';

@connect(
  state => ({SaleItemEdit:state.saleItemEdit}),
  dispatch => bindActionCreators({querySaleItem}, dispatch)
)
export default class SaleItemView extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.location=null;
  }
  /**
   * 初始化页面
   */
  componentWillMount() {
    /*let itemId = this.props.params.itemId;*/
    this.location = typeof window !== 'undefined' ? window.location.href : "";
    var itemId = this.getUrlParam(this.location, 'itemId');
    if (itemId) {
      this.props.querySaleItem({
        platformId:this.platformId,
        itemId:itemId
      });
    }
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

  render() {
    this.location = typeof window !== 'undefined' ? window.location.href : "";
    return (
      <div className="ui-container ui-platform">
        <Loading loaded = {this.props.SaleItemEdit.loaded}>
        </Loading>
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>销售商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>销售商品编辑</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">销售商品编辑</div>
          <div className="ui-bd">
            <SaleItemBaseInfo  SaleItemBaseInfo={this.props.SaleItemEdit.data && this.props.SaleItemEdit.data.data} />
            <SaleItemPriceList
              SaleItemPriceListData={this.props.SaleItemEdit.data && this.props.SaleItemEdit.data.data}
              itemId={this.getUrlParam(this.location,'itemId')}
              sellerId={this.getUrlParam(this.location,'sellerId')}
              shopId={this.getUrlParam(this.location,'shopId')}
              code={this.props.SaleItemEdit.code}
              pageNum={this.getUrlParam(this.location,'pageNum')}
            />
          </div>
        </div>
      </div>
    );
  }
}
