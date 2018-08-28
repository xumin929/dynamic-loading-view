/**
 * @file 其他设置--销售方式
 */
import React, { Component } from 'react';
import { Table, Checkbox, message,Radio,InputNumber } from 'jdcloudui';
import './style/index.css';

const RadioGroup = Radio.Group;

export default class OtherSaleMode extends Component {
  constructor(props) {
    super(props);
    this.state={
      initialTime: 1,
      initialDay: this.props.itemTmplPublishVo.saleInfoVo.deliveryCycle
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  radioChange=(e)=>{
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    console.log('radio checked', e.target.value);
    itemTmplPublishVo.saleInfoVo.saleType = e.target.value;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  // 最小起订量
  numberChange=(value)=>{
    console.log('changed', value);
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    let num = 0;
    if (value) {
      num = value;
    }
    num = parseInt(num);
    if (!num) {
      num = 1;
    }
    itemTmplPublishVo.saleInfoVo.initialMount = num;
    this.setState({
      initialTime: itemTmplPublishVo.saleInfoVo.initialMount
    });
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  // 预计出货日
  dayChange=(value)=>{
    console.log('changed', value);
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    let num = 0;
    if (value) {
      num = value;
    }
    num = parseInt(num);
    if (!num) {
      num = 1;
    }
    itemTmplPublishVo.saleInfoVo.deliveryCycle = num;
    this.setState({
      initialDay: itemTmplPublishVo.saleInfoVo.deliveryCycle
    });
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  render() {

    return (
      <div>
          <h3 className = 'h3-title'>销售方式</h3>
          <div>
            <div className = 'otherMt202'>
              <span className='smallColor smaillest'>最小起订量:</span>
              {this.props.type == 1 ? <span className='marginL5'>按单品</span> :
                  this.props.type == 2 ? <Radio defaultChecked >按单品</Radio> :
                  <RadioGroup
                     value={this.props.itemTmplPublishVo.saleInfoVo.saleType||1}
                     onChange={this.radioChange}>
                    <Radio value={1}>按单品</Radio>
                    <Radio value={2}>按总量</Radio>
                  </RadioGroup>
              }
              <span className='line32'>订购大于等于
              <InputNumber min={1} className = 'ml10'
                  value={this.props.itemTmplPublishVo.saleInfoVo.initialMount || 1}
                  onChange={this.numberChange}
                  //value={this.state.initialTime}
                />
				    	（计量单位）方可订购
				      </span>
            </div>
            <div>
              <span className='smallColor smaillest'>预计出货日:</span>
              <span>
                {this.props.type == 1 ? <InputNumber className = 'ml10'
                                        value={this.props.itemTmplPublishVo.saleInfoVo.deliveryCycle || 3}
                                        onChange={this.dayChange}
                                        //value={this.state.initialDay}
                                      /> :
                  this.props.type == 2 ? <InputNumber className = 'ml10'
                                          value={this.props.itemTmplPublishVo.saleInfoVo.deliveryCycle || 3}
                                          onChange={this.dayChange}
                                          //value={this.state.initialDay}
                      /> :
                  <InputNumber className = 'ml10'
                    value={this.props.itemTmplPublishVo.saleInfoVo.deliveryCycle || 1}
                    onChange={this.dayChange}
                    //value={this.state.initialDay}
                  />
                }
				    	 天
				      </span>
            </div>
          </div>
      </div>
    );
  }
}
