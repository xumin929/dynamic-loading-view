/**
 * @file 其他设置--售后说明
 */
import React, { Component } from 'react';
import { Table, Checkbox, message,Radio,InputNumber } from 'jdcloudui';
import './style/index.css';

const RadioGroup = Radio.Group;

export default class OtherAftersaleStatement extends Component {
  constructor(props) {
    super(props);
    this.state={
      initialDay: 7,
      initialresetDay: this.props.itemTmplPublishVo.afterSaleVo.changeDuration || 8,
      initialMonth: this.props.itemTmplPublishVo.afterSaleVo.repaireDuration || 3,
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  // 退货
  refundRadioChange=(e)=>{
    console.log('radio checked', e.target.value);
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.afterSaleVo.refundService = e.target.value;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  dayChange=(value)=>{
    console.log('changed', value);
    let num = 0;
    if (value) {
      num = value;
    }
    num = parseInt(num);
    if (!num) {
      num = 0;
    }
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.afterSaleVo.refundDuration = num;
    this.setState({
      initialDay: itemTmplPublishVo.afterSaleVo.refundDuration
    });
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  // 换货
  resetRadioChange=(e)=>{
    console.log('radio checked', e.target.value);
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.afterSaleVo.changeService = e.target.value;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  resetDayChange=(value)=>{
    console.log('changed', value);
    let num = 0;
    if (value) {
      num = value;
    }
    num = parseInt(num);
    if (!num) {
      num = 0;
    }
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.afterSaleVo.changeDuration = num;
    this.setState({
      initialresetDay: itemTmplPublishVo.afterSaleVo.changeDuration
    });
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  // 质保
  resetMonthChange=(value)=>{
    console.log('changed', value);
    let num = 0;
    if (value) {
      num = value;
    }
    num = parseInt(num);
    if (!num) {
      num = 0;
    }
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.afterSaleVo.repaireDuration = num;
    this.setState({
      initialMonth: itemTmplPublishVo.afterSaleVo.repaireDuration
    });
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }


  render() {
    return (
      <div>
          <h3 className = 'h3-title'>售后说明</h3>
          <div>
            <div className = 'otherMt202'>
              <span className='statement smallColor smaillest'>退货:</span>
              {this.props.type ==1 ?
                <RadioGroup
                    value={this.props.itemTmplPublishVo.afterSaleVo.refundService || 1}
                    onChange={this.refundRadioChange}>
                  <Radio className='otherMt202' value={1}>特殊商品，一经签收非质量问题不予退货</Radio><br/>
                  <Radio className='otherMt202' value={2}>确认收货后
                    <InputNumber min={0} className = 'ml10'
                      value={this.props.itemTmplPublishVo.afterSaleVo.refundDuration || 7}
                      onChange={this.dayChange}
                      //value={this.state.initialDay}
                    />
                      日内可与卖家协商退货，可能需要扣除部分货款作为卖家的损失</Radio><br/>
                </RadioGroup> :
                    <RadioGroup
                        value={this.props.itemTmplPublishVo.afterSaleVo.refundService || 2}
                        onChange={this.refundRadioChange}>
                    <Radio className='otherMt202' value={1}>特殊商品，一经签收非质量问题不予退货</Radio><br/>
                    <Radio className='otherMt202' value={2}>确认收货后
                      <InputNumber min={0} className = 'ml10'
                        value={this.props.itemTmplPublishVo.afterSaleVo.refundDuration || 7}
                        onChange={this.dayChange}
                        //value={this.state.initialDay}
                      />
                        日内可与卖家协商退货，可能需要扣除部分货款作为卖家的损失</Radio><br/>
                  </RadioGroup>
              }
            </div>
            <div className = 'otherMt202'>
              <span className='statement smallColor smaillest'>换货:</span>
              {this.props.type ==1 ?
                <RadioGroup
                  value={this.props.itemTmplPublishVo.afterSaleVo.changeService||1}
                  onChange={this.resetRadioChange}>
                  <Radio className='otherMt202' value={1}>特殊商品，一经签收非质量问题不予退货</Radio><br/>
                  <Radio className='otherMt202' value={2}>确认收货后
                    <InputNumber min={0} className = 'ml10'
                      value={this.props.itemTmplPublishVo.afterSaleVo.changeDuration || 7}
                      onChange={this.resetDayChange}
                      //value={this.state.initialresetDay}
                    />
                       日内可与卖家协商换货，换货过程中可能会产生一些额外费用</Radio><br/>
                </RadioGroup> :
                  this.props.type ==2 ?
                    <RadioGroup
                      value={this.props.itemTmplPublishVo.afterSaleVo.changeService||2}
                      onChange={this.resetRadioChange}>
                    <Radio className='otherMt202' value={1}>特殊商品，一经签收非质量问题不予退货</Radio><br/>
                    <Radio className='otherMt202' value={2}>确认收货后
                      <InputNumber min={0} className = 'ml10'
                        value={this.props.itemTmplPublishVo.afterSaleVo.changeDuration || 7}
                        onChange={this.resetDayChange}
                        //value={this.state.initialresetDay}
                      />
                        日内可与卖家协商换货，换货过程中可能会产生一些额外费用</Radio><br/>
                  </RadioGroup> :
                      <RadioGroup
                        value={this.props.itemTmplPublishVo.afterSaleVo.changeService||2}
                        onChange={this.resetRadioChange}>
                      <Radio className='otherMt202' value={1}>特殊商品，一经签收非质量问题不予退货</Radio><br/>
                      <Radio className='otherMt202' value={2}>确认收货后
                        <InputNumber min={0} className = 'ml10'
                          value={this.props.itemTmplPublishVo.afterSaleVo.changeDuration || 15}
                          onChange={this.resetDayChange}
                          //value={this.state.initialresetDay}
                        />
                          日内可与卖家协商换货，换货过程中可能会产生一些额外费用</Radio><br/>
                    </RadioGroup>
              }
            </div>
            <div className = 'otherMt202'>
              <span className='statement smallColor smaillest'>质保:</span>
              <div>
                <span className='otherMt202'>质保期限
                {this.props.type == 3 ?
                  <InputNumber min={0} className = 'ml10'
                    value={this.props.itemTmplPublishVo.afterSaleVo.repaireDuration || 3}
                    onChange={this.resetMonthChange}
                    //value={this.state.initialMonth}
                  /> :
                      <InputNumber min={0} className = 'ml10'
                        value={this.props.itemTmplPublishVo.afterSaleVo.repaireDuration || 3}
                        onChange={this.resetMonthChange}
                        //value={this.state.initialMonth}
                      />
                  }
                 个月</span><br/>
                <span className='otherMt202 smallColor'>如有任何售后问题请尽量在质保期内联系卖家协商处理，超过质保期卖家不保证受理，请知悉！</span>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
