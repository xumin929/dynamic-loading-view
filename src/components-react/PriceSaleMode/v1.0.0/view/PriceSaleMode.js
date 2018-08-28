/**
 * @file 发布商品-供货信息Tab组件
 */
import React, { Component } from 'react';
import {Radio } from 'jdcloudui';
const RadioGroup = Radio.Group;

export default class ReleaseSupplyInfo extends Component {
  constructor(props){
    super(props);
  }

  radioChange=(e)=>{
    console.log(e.target.value)
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.itemPerfectVo.salePriceType = e.target.value;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  render() {
    return (
      <div>
        <div className="rHeaderTtle"><h2>销售方式</h2></div>
        <div className='priceLeft'>
            <RadioGroup
              value={this.props.itemTmplPublishVo.itemPerfectVo.salePriceType||1}
              onChange={this.radioChange}>
              <Radio value={1}>正常销售</Radio>
              <Radio value={2}>询价模式</Radio>
            </RadioGroup>
        </div>
      </div>
    );
  }
}
