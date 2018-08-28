/**
 * Created by huangxiao3 on 2017/2/27.
 */
import React from 'react';
import './style/SaleItemEdit.css';
import  BaseComponent  from '../../Common/BaseComponent';

export default class SaleItemBaseInfo extends BaseComponent {
  constructor(props,context) {
    super(props,context);
  }

  createData(){
     var sourceData = this.props.SaleItemBaseInfo;
    return (
      <div>
        <h6>规格参数</h6>
        <p><label>平台分类：</label>{sourceData && sourceData.cname1} > {sourceData && sourceData.cname2} > {sourceData && sourceData.cname3}  {sourceData && sourceData.cname4 ? ">" : ""} {sourceData && sourceData.cname4}</p>
        <p><label>商品名称：</label>{sourceData && sourceData.itemName && sourceData.itemName!='null' ?sourceData.itemName:'无' }</p>
        <p><label>品牌：</label>{sourceData && sourceData.brandName && sourceData.brandName!='null' ?sourceData.brandName:'无'}</p>
      </div>
    );
  }

  render() {
    return (
      <div className='sellGoodsHead'>
        {this.createData()}
      </div>
    );
  }
}
