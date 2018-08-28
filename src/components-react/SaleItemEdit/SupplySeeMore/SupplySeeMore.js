/**
 * Created by huangxiao3 on 2017/3/16.
 */

import React from 'react';
import { Modal, Button } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  BaseComponent  from '../../Common/BaseComponent';
import {queryAreaSupplyPrice} from './redux';
import style from './style/SupplySeeMore.less';

@connect(
  state => ({SupplySeeMore:state.supplySeeMore}),
  dispatch => bindActionCreators({queryAreaSupplyPrice}, dispatch)
)
export default class SupplySeeMore extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
    };
    this.sourceData=[];
  }

  //设置地域价窗口:展示
  showModal(){
    this.props.queryAreaSupplyPrice({
      itemId:this.props.itemId,//66
      skuId:this.props.skuId,//1005803
      platformId:this.platformId,
      supplySellerId:this.props.supplySellerId,//112
    }).then(
      (result)=>{
        this.setState({
          visible: true,
        });
      }
    );
  }

  //生成 "销售范围" 数据
  createAreaData(){
    var sourceData = this.props.SupplySeeMore && this.props.SupplySeeMore.data;
    var result='';
    for(var i in sourceData){
      for(var j in sourceData[i].areaSupplySellerList){
        result += sourceData[i].areaSupplySellerList[j].areaName;
        result += ' ';
      }
    }
    /*result = result.replace(/\,/g," ");*/
    return (
      <div style={{marginTop:'10px',marginBottom:'10px'}}>
        {result}
      </div>
    );
  }

  //生成 "区域价" 数据
  createAreaPriceDom(){
    var sourceData = this.props.SupplySeeMore && this.props.SupplySeeMore.data;
    var result = sourceData && sourceData.map((k)=>{
        var areaName='';
        for(let i in k.areaSupplySellerList){
          if(k.areaSupplySellerList[i].areaId!=0){
            areaName += k.areaSupplySellerList[i].areaName;
            areaName += ' ';
          }
        }
      return (
        <div>
          <div style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'15px',paddingRigth:'15px'}}>
            {areaName}
          </div>
          <div style={{backgroundColor:'#f7f7f7',height:'40px'}}>
            <div style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'10px',paddingRight:'15px'}}>
              <span className={style.regionPriceTitle}>供货价：</span>
              <span className={style.regionPrice}>￥{k.supplyPrice}</span>
            </div>
          </div>
        </div>
      );
    });
    return result;
  }


  //设置地域价窗口：关闭
  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  render() {

    let source = (
      <div>
        <div>
          <div>
            <span style={{fontWeight:'bold',fontSize:'14px'}}>
              全国统一价
            </span>
          </div>
          <div>
            <span className={style.regionPriceTitle} style={{paddingTop:'10px'}}>
              供货价：
            </span>
            <span className='regionPrice'>
              ￥{this.props.totalPrice}
            </span>
          </div>
        </div>
        <div>
          <div style={{paddingBottom:'10px',paddingTop:'20px',fontWeight:'bold'}}>
              <span style={{fontSize:'14px',color:'f3cfcf'}}>
                地域价
              </span>
          </div>
          <div className={style.regionPriceBody}>
            {this.createAreaPriceDom()}
          </div>
        </div>
      </div>
    )

    return (
        <span>
      <a className="fr mr10" onClick={()=>this.showModal()}>查看</a>
        <Modal
          title={`${this.props.title}地域价`}
          visible={this.state.visible}
          onOk={()=>this.handleCancel()}
          onCancel={()=>this.handleCancel()}
          width={'400px'}
          footer={[
            <Button key="submit" type="primary" size="large" onClick={()=>this.handleCancel()}>确 定</Button>
          ]}
          maskClosable={false}
        >
          {source}
        </Modal>
        </span>
    );
  }
}
