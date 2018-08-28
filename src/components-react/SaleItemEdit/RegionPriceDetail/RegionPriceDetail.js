/**
 * Created by huangxiao3 on 2017/2/28.
 */

import React from 'react';
import { Popover} from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  BaseComponent  from '../../Common/BaseComponent';
import {queryInitialData} from './redux';
import styles from './style/RegionPriceDetailTable.less';
import './style/RegionPriceDetailTable.css';

@connect(
  state => ({RegionPriceDetail:state.regionPriceDetail}),
  dispatch => bindActionCreators({queryInitialData}, dispatch)
)
export default class RegionPriceDetail extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
    };
    this.sourceData=[];
  }

  //设置地域价窗口:展示
  showModal(){
    if(this.props.sourceData){
      this.sourceData = this.regionDataTransform();
      this.setState({
        visible: true,
      });
    }else{
      this.props.queryInitialData({
        itemId:this.props.itemId,
        skuId:this.props.skuId,
        priceType:this.props.priceType,
        platformId:this.platformId
      }).then(
        (result)=>{
          this.sourceData = this.ajaxDataTransform();
          this.setState({
            visible: true,
          });
        }
      );
    }

  }

  regionDataTransform(){
    let priceList = this.props.sourceData && this.props.sourceData.priceList;
    var result = [];
    var price = '';
    var areaStr = '';
    if(priceList && priceList.length>0){
      if(this.props.priceType===1 || this.props.priceType==='1' ){
        price =priceList[0].marketPrice;
        for(var k in priceList){
          if(price===priceList[k].marketPrice){
            price = priceList[k].marketPrice;
            areaStr = areaStr+priceList[k].areaName+'    ';
          }else{
            result.push({price:price,areaStr:areaStr});
            price = priceList[k].marketPrice;
            areaStr = priceList[k].areaName+'    ';
          }
        }
        result.push({price:price,areaStr:areaStr});
      }else{
        price =priceList[0].costPrice;
        for(var k in priceList){
          if(price===priceList[k].costPrice){
            price = priceList[k].costPrice;
            areaStr = areaStr+priceList[k].areaName;
          }else{
            result.push({price:price,areaStr:areaStr});
            price = priceList[k].costPrice;
            areaStr = priceList[k].areaName+'    ';
          }
        }
        result.push({price:price,areaStr:areaStr});
      }
    }
    return result;
  }

  ajaxDataTransform(){
    var sourceData = this.props.RegionPriceDetail && this.props.RegionPriceDetail.data;
    var result =[];
    var price = '';
    var areaStr = '';
    if(this.props.priceType===1 || this.props.priceType==='1' ){
      for(var k in sourceData){
        price = sourceData[k].marketPrice;
        for(var j in sourceData[k].tradeItemSkuPriceList){
          areaStr = areaStr+sourceData[k].tradeItemSkuPriceList[j].areaName+' ';
        }
        result.push({price:price,areaStr:areaStr});
        price = '';
        areaStr = '';
      }
    }else{
      for(var k in sourceData){
        price = sourceData[k].costPrice;
        for(var j in sourceData[k].tradeItemSkuPriceList){
          areaStr = areaStr+sourceData[k].tradeItemSkuPriceList[j].areaName+' ';
        }
        result.push({price:price,areaStr:areaStr});
        price = '';
        areaStr = '';
      }
    }
    return result;
  }

  createAreaPriceDom(){
    var sourceData = this.sourceData;
    var result = sourceData.map((k)=>{
      return (
        <div>
          <div style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'15px',paddingRigth:'15px'}}>
            {k.areaStr}
          </div>
          <div style={{backgroundColor:'#f7f7f7',height:'40px'}}>
            <div style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'10px',paddingRight:'15px'}}>
              <span className={styles.regionPriceTitle}>供货价：</span>
              <span className={styles.regionPrice}>￥{k.price}</span>
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
    let showAreaPrice = false;
    if(this.sourceData && this.sourceData.length>0){
      showAreaPrice = true;
    }
    let source = (
      <div style={{width:'300px'}} className="regionPriceDetail">
        <div>
          <div>
              <span style={{fontWeight:'bold',fontSize:'14px'}}>
              全国统一价
              </span>
          </div>
          <div>
            <span className={styles.regionPriceTitle} style={{paddingTop:'10px'}}>
              供货价：
            </span>
            <span className={styles.regionPrice}>
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
          <div className={styles.regionPriceBody}>
            {showAreaPrice && this.createAreaPriceDom()}
          </div>
        </div>

      </div>
    )



    return (
        <Popover
          title='查看地域价'
          trigger="click"
          content={source}
          scroll={{ y: 300 }}
          >
          <a className="ml5" style={{color:'#009afe'}} onClick={()=>this.showModal()}>
            查看
          </a>
        </Popover>
    );
  }
}
