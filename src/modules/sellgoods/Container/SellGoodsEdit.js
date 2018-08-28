/**
 * author:suyunxia
 * date:2017-02-17
**/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Breadcrumb } from 'jdcloudui';
import SellGoodsEditBox from '../../../components-react/SellGoods/SellGoodsEditBox/SellGoodsEditBox';
import styles from './style/sellGoodsEdit.less';
import {bindActionCreators} from 'redux';
import {getSellGoodsData} from './redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

@connect(
  state => ({sellGoodsEdit:state.sellGoodsEdit}),
  dispatch => bindActionCreators({getSellGoodsData}, dispatch)
)
@withRouter
export default class SellGoodsEdit extends Component {
   constructor(props,context) {
      super(props,context);
      this.platformId = 2;
      this.specification = [];
      this.skuList = [];
  }
   /**
   * 初始化页面
   */
  componentWillMount() {
    let {search} = this.props.location;
    let itemId = queryString.parse(search) && queryString.parse(search).itemId;
    this.props.getSellGoodsData(this.platformId,itemId);
  }

  createDom() {
    if(this.props.sellGoodsEdit.goodsData){

      let goodsData = {
           "id": null,
           "platformId": null,
           "sellerId": null,
           "skuId": null,
           "shopId": null,
           "supplySellerId": null,
           "supplyShopId": null,
           "operatorId": null,
           "itemName": "saveitemTest",
           "cid": null,
           "brandId": null,
           "unit": "捆",
           "origin": null,
           "ad": null,
           "categoryAttributes": null,
           "specAttributes": null,
           "saleStatus": null,
           "packingList": null,
           "describeUrl": null,
           "created": null,
           "modified": null,
           "shopCid": null,
           "listingTime": null,
           "delistingTime": null,
           "operator": null,
           "addSource": null,
           "storeStatus": null,
           "yn": null,
           "skuType": null,
           "attributes": null,
           "modelCode": null,
           "barCode": null,
           "productCode": null,
           "skuStatus": null,
           "weight": null,
           "pictureUrl": null,
           "altImages": null,
           "sortNumber": null,
           "maxMarketPrice": null,
           "minMarketPrice": null,
           "maxCostPrice": null,
           "minCostPrice": null,
           "copyStatus": null,
           "cname1": "111",
           "cname2": "安防/消防",
           "cname3": "消防",
           "cname4": "number4",
           "itemSkuInfoList": [
               {
                   "id": null,
                   "skuType": null,
                   "attributes": null,
                   "skuId": 1005803,
                   "pictureUrl": null,
                   "altImages": null,
                   "priceType": null,
                   "marketPrice": 200,
                   "costPrice": 8,
                   "areaName": "山西",
                   "areaId": "2",
                   "areaNumber": 0,
                   "supplyPrice": null,
                   "inventory": null,
                   "avgSupplyPrice": 10.33,
                   "shopItemSkuPriceList": [
                       {
                           "id": null,
                           "platformId": 2,
                           "itemId": 66,
                           "skuId": 1005803,
                           "sellerId": 1,
                           "shopId": 0,
                           "supplyPrice": 10.33,
                           "areaName": "北京，南京，上海",
                           "areaId": "0",
                           "areaNumber": 0,
                           "supplyStatus": 1,
                           "created": null,
                           "modified": null,
                           "yn": null
                       }
                   ]
               },
               {
                   "id": null,
                   "skuType": 1,
                   "attributes": null,
                   "skuId": 1005818,
                   "pictureUrl": null,
                   "altImages": null,
                   "priceType": null,
                   "marketPrice": 400,
                   "costPrice": null,
                   "areaName": "河北",
                   "areaId": "2",
                   "areaNumber": 0,
                   "supplyPrice": null,
                   "inventory": null,
                   "avgSupplyPrice": 78,
                   "shopItemSkuPriceList": [
                       {
                           "id": null,
                           "platformId": 2,
                           "itemId": 66,
                           "skuId": 1005818,
                           "sellerId": 1,
                           "shopId": 0,
                           "supplyPrice": 78,
                           "areaName": "北a京，南京，上海",
                           "areaId": "0",
                           "areaNumber": 0,
                           "supplyStatus": 1,
                           "created": null,
                           "modified": null,
                           "yn": null
                       }
                   ]
               }
           ],
           "brandName": "海澜之家"
      }

      this.skuList = goodsData.itemSkuInfoList

      console.log(goodsData);
      this.specification = [
        <h6>规格参数</h6>,
        <p><label>平台分类 ：</label>{goodsData.cname1} > {goodsData.cname2} > {goodsData.cname3}  {goodsData.cname4 ? ">" : ""} {goodsData.cname4}</p>,
        <p><label>商品名称 ：</label>{goodsData.itemName}</p>,
        <p><label>品牌 ：</label>{goodsData.brandName}</p>,
        <p><label>计量单位 ：</label>{goodsData.unit}</p>
      ]

    }
  }

  render() {
      // this.props.sellGoodsEdit.loaded && this.createDom();
      this.createDom();
      return (
         <div className="ui-container">
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
               <div className={styles.sellGoodsHead}>
                 {this.specification}
               </div>
               <SellGoodsEditBox data={this.skuList} />
             </div>
            </div>
         </div>
       )
   }
}
