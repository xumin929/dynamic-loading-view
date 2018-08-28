/**
 * @file 发布商品-价格及库存Tab组件
 */
import React, { Component } from 'react';
import { Tabs } from 'jdcloudui';
import PriceSaleMode from '../../../PriceSaleMode/v1.0.0/view';
import PriceStockTable from '../../../PriceStockTable/v1.0.0/view';
import './price.css';

export default class ReleasePriceAndStock extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div>
        <PriceSaleMode 
          itemTmplPublishVo={this.props.itemTmplPublishVo}
          updateItemTmplAction = {this.props.updateItemTmplAction}/>
        <PriceStockTable
          edit={this.props.edit}
          type={this.props.type} 
          itemTmplPublishVo={this.props.itemTmplPublishVo}
          updateItemTmplAction = {this.props.updateItemTmplAction}/>
      </div>
    );
  }
}
