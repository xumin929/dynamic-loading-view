/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布
 ****************************************************************/
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { editGoodsInfo } from './redux';
import GoodsRlease from '../../goodsrlease/Container/GoodsRlease';
import {getDomain} from 'jdcloudecc/reducer/domain';
import * as func from '../../../components-react/GoodsRlease/redux';
import {brandSearch, brandSearchByCid} from '../../../components-react/GoodsRlease/BrandSelect/redux';
import {Loading}  from 'jdcloudecc/components';
import {provideHooks} from "redial";
import { withRouter } from 'react-router';
import queryString from 'query-string';

@connect(
  state => ({
    goodsEdit: state.goodsEdit,
    goodsRlease: state.goodsRlease,
  }),
 dispatch => bindActionCreators({...func, brandSearch, brandSearchByCid, editGoodsInfo}, dispatch)
)
@provideHooks({
    fetch: async ({ store: { dispatch, getState } }) => {
        await dispatch(getDomain()).catch(() => null);
        console.log("get data async from server")
    }
})
@withRouter
export default class EditGoods extends Component{
  constructor(props, context) {
    super(props, context);
    this.location = '';
    this.rules1 = false;
    this.rules2 = false;
    this.rules3 = false;
    this.rules4 = false;
    this.rules5 = false;
    this.state = {
      rules1: false,
      rules2: false,
      rules3: false,
      rules4: false,
      rules5: false,
    };
  }
 componentWillMount(){
  this.location = typeof window !== 'undefined' ? window.location.href : "";
  let itemId =  this.getUrlParam(this.location, 'itemId');
  let param = {
    platformId: 2,
    itemId: itemId
  }

  this.props.editGoodsInfo(param).then(
          (result)=>{
            console.log(this.props.goodsEdit)
            console.log(this.props.goodsEdit.editGoods)
            let shopId = result.data.shopId;
            console.log(shopId)
             let param2 = {
              // platformId: 2,
              cid: this.props.goodsEdit.editGoods.cid,
              shopId: shopId,
              }
              let brandParam = {
              // platformId: 2,
              cid: this.props.goodsEdit.editGoods.cid,
              itemId: itemId
              }
            this.props.getSaleInfo(brandParam, 1).then(
               (result)=>{
                  this.setState({
                    rules1: true
                  });
                },
                (error)=>{
                  this.setState({
                    rules1: true
                  });
                }
              );
            this.props.getBrandInfo(brandParam, 1).then(
              (result)=>{
                  this.setState({
                    rules2: true
                  });
                },
                (error)=>{
                  this.setState({
                    rules2: true
                  });
                }
              );
            this.props.findCategory(brandParam).then(
              (result)=>{
                   this.setState({
                      rules3: true
                    });
                },
                (error)=>{
                  this.setState({
                      rules3: true
                    });
                }
              );
            this.props.getUnitInfo(param2).then(
              (result)=>{
                  this.setState({
                      rules4: true
                    });
                },
                (error)=>{
                  this.setState({
                      rules4: true
                    });
                });
            let param3 = {
              //platformId: 2,
              categoryId: this.props.goodsEdit.editGoods.cid,
              itemId: itemId
            }
            this.props.brandSearchByCid(param3, itemId).then(
              (result)=>{
                  this.setState({
                      rules5: true
                    });
                },
                (error)=>{
                  this.setState({
                      rules5: true
                    });
                });
            this.detailCacheData(result.data.itemSkuVoList);
          },
          (error)=>{}
  );
  }
  /**
  * @param {array} [] [销售信息表]
  * @return  array
  * description: 处理存储临时表的参数
  */
  detailCacheData(data){
    let params = [];
    if(data && data.length){
    params = data.map((item, index) => {
      return{
        key: item.attributes,
        value: item
      }
    });
    }else{}
    let params2 = {
      content: JSON.stringify(params)
    };
    this.props.postCacheTable(params2);
    return params;
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
    const editData = this.props.goodsEdit.editGoods;
    let {search} = this.props.location;
    let edit = queryString.parse(search) && queryString.parse(search).edit;
    return (
      <div style = {{overflow: 'hidden', position: 'relative'}}>
        <Loading loaded = {this.props.goodsEdit && this.props.goodsEdit.loaded && this.state.rules1 && this.state.rules2 && this.state.rules3 && this.state.rules4 && this.state.rules5}>
        </Loading>
        <GoodsRlease editGoods = {true} editData = {editData} brandSearchByCid={this.props.brandSearchByCid} editType={edit}></GoodsRlease>
      </div>
    );
  }
}
