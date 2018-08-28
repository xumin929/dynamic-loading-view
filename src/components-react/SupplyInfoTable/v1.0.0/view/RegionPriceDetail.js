/**
 * Created by huangxiao3 on 2017/3/20.
 * 店铺发布和编辑商品时的地域价查看组件
 */

import React, {Component} from 'react';
import { Modal, Button, Form, Input, Icon, Row, Col,Popover, Checkbox } from 'jdcloudui';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import BaseComponent  from '../../Common/BaseComponent';
import styles from './style/RegionPriceDetail.less';


export default class RegionPriceDetail extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      visiblePop:{},
    };
    this.sourceData=[];
    this.totalPrice='';
  }

//  componentWillReceiveProps(){
//     this.sourceData = this.regionDataTransform();
//  }


  regionDataTransform(){
    console.log('--------------regionData')
    let priceList = this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].areaPriceList || [];
    var result = [];
    var price = '';
    var areaStr = '';
    if(priceList.length>0){
      for(var j in priceList){
        if(priceList[j].areaId==0 || priceList[j].areaId=='0'){
          priceList.splice(j,1);
        }
      }
    }

    if(priceList.length>0){
      price =priceList[0].supplyPrice;
      for(var k in priceList){
        if(price===priceList[k].supplyPrice){
          price = priceList[k].supplyPrice;
          areaStr = areaStr+priceList[k].areaName+' ';
        }else{
          result.push({price:price,areaStr:areaStr});
          price = priceList[k].supplyPrice;
          areaStr = priceList[k].areaName+' ';
        }
      }
      result.push({price:price,areaStr:areaStr});
    }
    return result;
  }


  //from areaList
  skuParamListTransform(){
    var sourceData = this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index] ? 
                    this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].areaPriceList:[];
    console.log('------------------areaList')
    console.log(sourceData)
    var result =[];
    var price = '';
    var areaStr = '';
    for(var k in sourceData){
      let areaNames = sourceData[k] && sourceData[k].areaName &&sourceData[k].areaName.split(',') || [];
      areaStr='';
      for(let i = 0;i<areaNames.length;++i){
        if(areaNames[i]!='全国'){
          areaStr+=areaNames[i]+' ';
        }else{
          this.totalPrice = sourceData[k].supplyPrice;
        }
      }
      if(areaStr!=''){
          console.log('area')
        price = sourceData[k].supplyPrice;
        result.push({price:price,areaStr:areaStr});
      }
    }
    console.log(result)
    return result;
  }

  createAreaDom(){
    console.log('----------展示地域价')
    console.log(this.sourceData)
    var sourceData = this.sourceData;
    var result = sourceData.map((k)=>{
      return (
        <div>
          <div className="pt10 pb10 pl15 pr15">
            {k.areaStr}
          </div>
          <div className={styles.areaBody}>
            <div className="pt10 pb10 pl10 pr15">
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

  showArea(k){
    this.state.visiblePop[k]=true
    this.setState({
      visiblePop:this.state.visiblePop
    })
  }

  handleVisibleChange = (visible) => {
      console.log(visible)
    this.setState({ visible });
  }

  render() {


     // this.sourceData = this.regionDataTransform();
      console.log(this.sourceData)
     this.sourceData = this.skuParamListTransform();

    // let showAreaPrice = false;
    // if(this.sourceData && this.sourceData.length>0){
     let showAreaPrice = true;
  //  }

    let source = (
      <div style={{width:'300px'}}>
        <div>
          <div>
              <span className="f-fwb f-fs14">
              全国统一价
              </span>
          </div>
          <div>
              <span className={styles.regionPriceTitle} style={{paddingTop:'10px'}}>
                供货价：
              </span>
            <span className={styles.regionPriceCol}>
                ￥{this.props.totalPrice?this.props.totalPrice:this.totalPrice}
              </span>
          </div>
        </div>
        <div>
          <div className="pb10 pt20 f-fwb">
              <span className={styles.regionTitleText}>
                地域价
              </span>
          </div>
          {showAreaPrice &&
          <div className={styles.regionPriceBody}>
            {showAreaPrice && this.createAreaDom()}
          </div>
          }
        </div>
        {/*<div style={{float:'right',marginTop:'10px'}}>
          <Button type="primary" onClick={()=>this.handleCancel()}>确定</Button>
        </div>*/}
      </div>
    )

    return (
      <Popover
        title='查看地域价'
        trigger="click"
        content={source}
        onVisibleChange={this.handleVisibleChange}
      >
        <a  className='ml10 text-link'>
          查看
        </a>
      </Popover>
    );
  }
}