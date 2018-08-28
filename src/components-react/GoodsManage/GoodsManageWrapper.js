/* *********************************************
* @author: GuoRuiGuang
* @creatdDate: 20171114
* @description: 平台店铺商品管理
* *********************************************/
import React, { Component, PropTypes } from 'react';
import { Breadcrumb,message,Spin } from 'jdcloudui';

import GoodsManageSearch from './Search/GoodsManageSearch';
import GoodsManageGrid from './Grid/GoodsManageGrid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchGoods } from './redux/search_goods';
import { rejectOrLockItem } from './redux/reject_lock';
import { batchShelves } from './redux/batch_shelves';
import { passItem } from './redux/pass_item';
import { searchBrand } from './redux/search_brand';
import {searchPrice} from './redux/search_price';
import * as domain from 'jdcloudecc/reducer/domain';
import {queryBrand} from '../../components-react/Common/BrandSelectBasic/redux';

@connect(
  state => ({
    goodsManage: {
      ...state.search_goods
    },
    brand: {
      ...state.search_brand
    },
    price:{
      ...state.search_price
    },
    brandData: state.brand
  }),
dispatch => bindActionCreators({ queryBrand,searchGoods, rejectOrLockItem, batchShelves, passItem, searchBrand, searchPrice, ...domain }, dispatch)
)


export default class GoodsManageWrapper extends Component {
    constructor(props) {
        super(props);
        this.params = {
            pageNum: 1,
            pageSize: 10,
            shopItemInfoVo: {
                platformId:null,
                itemId:null,
                itemName:null,
                skuId:null,
                cId:null,
                shopName:null,
                itemStatus:null,
                brandId:null
            }
        };
        this.state={
            key:new Date()
        }
    }

    componentWillMount() {
        console.log(Object.keys(this.props.paramsData).length)
        this.params = Object.keys(this.props.paramsData).length ? JSON.parse(this.props.paramsData) : this.params;
        this.queryGoodsList(this.params);
    }

    //请求列表信息
    queryGoodsList = (param) => {
        let data = {...this.params};
        data.shopItemInfoVo =JSON.stringify(data.shopItemInfoVo);
        this.props.searchGoods(data).then((res) => {
            if (res.code != '0') {
                message.error(res.msg, 2)
            } else { }
        })
    }

    //条件搜索
    onSearchClick = (param) => {
        this.params.shopItemInfoVo = param;
        this.queryGoodsList(this.params);
    }

    //分页搜索
    onPaginationSearch = (param) => {
        this.params.pageNum = param;
        this.queryGoodsList(this.params);
    }

    //搜索品牌
    onSearchBrand = (param) =>{
        this.props.searchBrand(param).then((res)=>{
            if(res.code != '1'){
                message.error(res.msg,1)
            }else{}
        })
    }

    //根据skuId查询全国价格
    onSearchPrice = (shopId,skuId) =>{
        let param = {
            shopId: shopId,
            skuId: skuId
        }
        this.props.searchPrice(param).then((res)=>{
            if(res.code != '0'){
                message.error(res.msg,1)
            }else{}
        })
    }

    //批量驳回/锁定
    onRejectOrLock = (arr,type,text) => {
        let param = {
            saleStatus: type,
            itemId: arr,
            reason: text
        }
        this.props.rejectOrLockItem(param).then((res) => {
            if(res.code == 0){
                message.success(res.msg,1);
                this.queryGoodsList(this.params);
            }else{
                message.error(res.msg,1)
            }
        })
    }

    //下架商品
    onBatchShelves = (arr,type,text) =>{
        let param = {
            saleStatus: type,
            itemId: arr,
            reason: text
        }
        this.props.batchShelves(param).then((res)=>{
            if(res.code == 0){
                message.success(res.msg,1);
                this.queryGoodsList(this.params);
            }else{
                message.error(res.msg,1)
            }
        })
    }

    //通过
    onPassItem = (arr) => {
        this.props.passItem({itemId: arr}).then((res)=>{
            if(res.code == 0){
                message.success(res.msg,1);
                this.queryGoodsList(this.params);
            }else{
                message.error(res.msg,1)
            }
        })
    }

    handleReset = () => {
        this.setState({
            key:new Date()
        })
        
    }

    render() {
        const MainDomain = this.props.getMainDomain()
        console.log(MainDomain)
        let paramsData = this.params;
        return (
            <div>
                <GoodsManageSearch
                    queryBrand={this.props.queryBrand}
                    handleReset={this.handleReset}
                    key={this.state.key}
                    handleSearchClick={this.onSearchClick}
                    onSearchBrand={this.onSearchBrand}
                    brand = {this.props.brand && this.props.brand.loaded && this.props.brand.data.data}
                    brandData = {this.props.brandData && this.props.brandData.data && this.props.brandData.data.data}
                />
                <Spin spinning={this.props.goodsManage.loading}>
                    <GoodsManageGrid
                        pagination={this.props.goodsManage && this.props.goodsManage.loaded && this.props.goodsManage.data.data}
                        data={this.props.goodsManage && this.props.goodsManage.loaded && this.props.goodsManage.data.data && this.props.goodsManage.data.data.result}
                        onPaginationSearch={this.onPaginationSearch}
                        onRejectOrLock = {this.onRejectOrLock}
                        onBatchShelves = {this.onBatchShelves}
                        onPassItem = {this.onPassItem}
                        onSearchPrice = {this.onSearchPrice}
                        price = {this.props.price}
                        paramsData = {paramsData}
                        host={MainDomain}
                    />
                </Spin>    
            </div>
        );
    }
}