/**
 * @file 其他设置--优惠支持
 */
import React, { Component } from 'react';
import { Table, Checkbox, message,Radio,InputNumber } from 'jdcloudui';
import './style/index.css';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

export default class OtherFavourable extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  cashChange = (e) => {
    console.log('checked = ', e.target.checked);
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    if(e.target.checked) {
      itemTmplPublishVo.couponSupportVo.cashCouponSupport = 1;
    } else {
      itemTmplPublishVo.couponSupportVo.cashCouponSupport = 0;
    };
    
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  meetChange = (e) => {
    console.log('checked = ', e.target.checked);
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    if(e.target.checked) {
      itemTmplPublishVo.couponSupportVo.meetCouponSupport = 1;
    } else {
      itemTmplPublishVo.couponSupportVo.meetCouponSupport = 0;
    };
    
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  vipChange=(e)=>{
    console.log('radio checked', e.target.value);
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.couponSupportVo.vipDiscountSupport = e.target.value;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  render() {
    return (
      <div> 
          <h3 className = 'h3-title'>优惠支持</h3>
          <div>
            <div className = 'otherMt202'>
              <span className='smallColor smaillest'>可用优惠券:</span>
                <Checkbox
                   defaultChecked={this.props.itemTmplPublishVo.couponSupportVo?Boolean(this.props.itemTmplPublishVo.couponSupportVo.cashCouponSupport):null}  
                   onChange={this.cashChange}>代金券</Checkbox>
                <Checkbox
                   defaultChecked={this.props.itemTmplPublishVo.couponSupportVo?Boolean(this.props.itemTmplPublishVo.couponSupportVo.meetCouponSupport):null}  
                   onChange={this.meetChange}>满减券</Checkbox>
            </div>
            <div className = 'otherMt202 mlgroup'>
              <span className='smallColor smaillest'>会员折扣:</span>
              <RadioGroup
                 value={this.props.itemTmplPublishVo.couponSupportVo?this.props.itemTmplPublishVo.couponSupportVo.vipDiscountSupport:null} 
                 onChange={this.vipChange}>
                <Radio  value={1}>支持</Radio>
                <Radio  value={0}>不支持</Radio>
              </RadioGroup>
            </div>
          </div>
      </div>
    );
  }
}
