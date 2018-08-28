/**
 * Created by huangxiao3 on 2017/3/15.
 */
import React from 'react';
import { Button, Popover } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  BaseComponent  from '../../Common/BaseComponent';
import {queryAreaSupplyerPrice} from './redux';
import styles from './style/AreaSupplyerPrice.css';


@connect(
  state => ({AreaSupplyerPrice:state.areaSupplyerPrice}),
  dispatch => bindActionCreators({queryAreaSupplyerPrice}, dispatch)
)
export default class AreaSupplyerPrice extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
    };
  }

  showPop(){
    this.props.queryAreaSupplyerPrice({platformId:2,itemId:this.props.itemId,skuId:this.props.skuId}).then(
      (result)=>{
        this.setState({visible:true});
      }
    );
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  createUnitTr(sourceData){
    let areaName =sourceData && sourceData.areaName && sourceData.areaName;
    let rowSpanNum =sourceData && sourceData.areaSupplySellerList &&　sourceData.areaSupplySellerList.length;
    let tdList = sourceData && sourceData.areaSupplySellerList &&　sourceData.areaSupplySellerList;
    var flagNum=1;
    var flag = false;
    let result = tdList && tdList.map((k)=>{
      var supplyPrice = k.supplyPrice;
      if(k.areaId===0 || k.areaId==='0'){
        supplyPrice = '(全国价)'+k.supplyPrice;
      }
      if(flagNum===1) {
        flag = true;
        ++flagNum;
      }else{
        flag=false;
      }
      return(
        <tr>
          {
            flag && <td rowSpan={rowSpanNum} className={styles.t75}>
            {areaName}
            </td>
          }
          <td className={styles.t96}>
            {k.supplySellerName==null?'':k.supplySellerName}
          </td>
          <td className={styles.t120}>
            {supplyPrice}
          </td>
        </tr>
      );

    });
    return result;
  }


  createSaleAreaPrice(){
    let sourceData = this.props.AreaSupplyerPrice.data && this.props.AreaSupplyerPrice.data.data;
    let result = sourceData && sourceData.map((k)=>{
      return this.createUnitTr(k);
    });
    return (
      <div className="areaSupplyer">
        <table>
          {result}
        </table>
        <div className="popButton">
          <Button type="primary" size="small" onClick={()=>this.handleCancel()}>确定</Button>
        </div>
      </div>
    );
  }

  getState(){
    if(!this.props.parentVisable && this.state.visible){
      this.setState({visible:false});
    }
  }


  render() {
    this.getState();
    return (
        <Popover
          content={this.createSaleAreaPrice()}
          trigger="hover"
          placement="rightTop"
          visible={this.state.visible}
        >
          <a onClick={()=>this.showPop()}>查看可销售区域价格</a>
        </Popover>
    );
  }
}
