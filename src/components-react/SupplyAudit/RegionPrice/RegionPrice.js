/**
 * Created by huangxiao3 on 2017/2/28.
 */

import React from 'react';
import { Modal, Button} from 'jdcloudui';
import  BaseComponent  from '../../Common/BaseComponent';
import styles from './style/RegionPrice.less';

export default class RegionPrice extends BaseComponent {

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
    }
  }

  regionDataTransform(){
    let priceList = this.props.sourceData;
    var result = [];
    var price = '';
    var areaStr = [];
    if(priceList && priceList.length>0){
      price =priceList[0].supplyPrice;
      for(var k in priceList){
        if(priceList[k].areaId!='0'){
          if(price===priceList[k].supplyPrice){
            price = priceList[k].supplyPrice;
            areaStr.push(priceList[k].areaName);
          }else{
            result.push({price:price,areaStr:areaStr});
            price = priceList[k].supplyPrice;
            areaStr = [];
            areaStr.push(priceList[k].areaName);
          }
        }
      }
      if(price!='' && areaStr!=''){
        result.push({price:price,areaStr:areaStr});
      }
    }
    return result;
  }

  createAreaPriceDom(){
    var sourceData = this.sourceData;

    var result = sourceData.map((k)=>{
      let areaStr = k.areaStr;
      let result=[];
      let tmp = [];
      for(let i in areaStr){
        let unit = (<span style={{marginRight:'10px'}}>{areaStr[i]}</span>)
        tmp.push(unit)
        if((parseInt(i)+1)%4 == 0){
          result.push(tmp);
          tmp=[];
        }
      }
      if(tmp && tmp.length && tmp.length>0){
        result.push(tmp);
      }
      return (
        <div>
          <div style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'15px',paddingRigth:'15px'}}>
            {result}
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
      <div>
        <div>
          <div style={{marginBottom:'10px'}}>
              <span style={{fontWeight:'bold',fontSize:'14px'}}>
              全国统一价
              </span>
          </div>
          <div>
            <span className={styles.regionPriceTitle} style={{paddingTop:'10px',paddingLeft:'10px'}}>
              供货价：
            </span>
            <span className={styles.regionPrice}>
                {this.props.supplyPrice != '' ? this.props.supplyPrice : ''}
              </span>
          </div>
        </div>
        <div>
          <div style={{paddingBottom:'10px',paddingTop:'20px',fontWeight:'bold'}}>
              <span style={{fontSize:'14px',color:'f3cfcf'}}>
                地域价
              </span>
          </div>
          {
            showAreaPrice &&
            <div className={styles.regionPriceBody}>
              {showAreaPrice && this.createAreaPriceDom()}
            </div>
          }
        </div>
        {/*<div style={{float:'right',marginTop:'10px'}}>
          <Button type="primary" onClick={()=>this.handleCancel()}>关闭</Button>
        </div>*/}
      </div>
    )
    return (
        <div>
            <a className="ml10 text-link" onClick={()=>this.showModal()}>
            {this.props.supplyPrice != '' ? this.props.supplyPrice : ''}</a>
            <Modal
                key={Math.random()}
                title='查看地域价'
                visible={this.state.visible}
                maskClosable={false}
                width={300}
                onCancel={()=>this.handleCancel()}
                footer={[
                    <Button key="submit" type="primary" size="large" onClick={()=>this.handleCancel()}>关 闭</Button>
                ]}
            >
                {source}
            </Modal>
        </div>
    );
  }
}
