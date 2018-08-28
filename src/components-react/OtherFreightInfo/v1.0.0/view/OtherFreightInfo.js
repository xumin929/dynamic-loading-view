/**
 * @file 其他设置--运费信息
 */
import React, { Component } from 'react';
import { Table, Checkbox, message,Radio } from 'jdcloudui';
import './style/index.css';

const RadioGroup = Radio.Group;

export default class OtherFreightInfo extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  radioChange=(e)=>{
    console.log(e.target.value)
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.deliveryInfoVo.deliveryType = e.target.value;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  onChange=(e)=>{
    console.log(e.target.checked)
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    if(!e.target.checked){
      itemTmplPublishVo.deliveryInfoVo.homeDelivery = 0;
    } else {
      itemTmplPublishVo.deliveryInfoVo.homeDelivery = 1;
    }

    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  render() {
    return (
      <div>
          <h3 className = 'h3-title'>运费信息</h3>
          <div>
            <RadioGroup
              value={this.props.itemTmplPublishVo.deliveryInfoVo.deliveryType||1}
              onChange={this.radioChange}>
              <Radio className='otherMt202' value={1}>商品价格已包含运费<span className='smallColor'>（选择此项时请记得将运费分摊至商品单价里)</span></Radio><br/>
              <Radio className='otherMt202' value={2}>选择合适的物流公司运输，运费到付<span className='smallColor'>（不需要在产品单价里加运费，买家根据实际费用支付）</span></Radio><br/>
            </RadioGroup>
            <br/>
            <Checkbox
               defaultChecked={Boolean(this.props.itemTmplPublishVo.deliveryInfoVo.homeDelivery)}
               className='otherMt202' onChange={this.onChange}>同城可送货上门</Checkbox>
          </div>
      </div>
    );
  }
}
