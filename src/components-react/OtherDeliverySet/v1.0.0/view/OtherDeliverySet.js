/**
 * @file 其他设置--配送设置
 */
import React, { Component } from 'react';
import {Checkbox, message,Radio,InputNumber,Input,Select,Modal } from 'jdcloudui';
import './style/index.css';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
const Option = Select.Option;
const confirm = Modal.confirm;

export default class OtherDeliverySet extends Component {
  constructor(props) {
    super(props);
    this.state={
      deliveryData:[],
      selectValue : this.props.itemTmplPublishVo.freightTmplVo.tmplId||'',
      checked:false
    };
  }
  componentWillMount(){
    this.props.getDeliverySet();
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.DeliveryData.loaded){
      if(nextProps.DeliveryData.data.code==0){
        let deliveryDATA = nextProps.DeliveryData.data.data.shopFareTemplateForItemVo;
        console.log(deliveryDATA)
        if(deliveryDATA){
          if(!this.state.deliveryData.length){
            if(!this.props.itemTmplPublishVo.freightTmplVo.tmplId){
              deliveryDATA.map(item=>{
                if(item.templateType == 1){
                  this.selectChange(item.id)
                }
              })
            } else {
              this.selectChange(this.props.itemTmplPublishVo.freightTmplVo.tmplId)
            }
          }
          this.setState({
            deliveryData:deliveryDATA
          })
        } else {
          this.setState({
            checked:true,
            selectValue:0,
            deliveryData:[{id:0,fareName:'未设置'}]
          })
        }
      }
    }
  }
  deliveryClick=()=>{
    console.log(11)
    this.props.getDeliverySet().then(res=>{
      if(res.code==0){
        if(!res.data.shopFareTemplateForItemVo){
          this.showConfirm();
        }
      }
    });
  }

  showConfirm = () => {
    confirm({
      title: '提示',
      content: '当前店铺未设置运费模板，是否立即前往设置？',
      onOk: () => {window.open('/item-shop-view/freightCostTemplate');},
      onCancel() {},
    });
  };

  onChange=(e)=>{
    console.log(e.target.checked)
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    if(!e.target.checked){
      itemTmplPublishVo.freightTmplVo.homeDelivery = 0;
    } else {
      itemTmplPublishVo.freightTmplVo.homeDelivery = 1;
    }

    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  selectChange=(value)=> {
    console.log(`Selected: ${value}`);
    this.setState({
      selectValue:value
    })
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.freightTmplVo.tmplId = value;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  render() {
    console.log(this.props.type)
    console.log(this.props.itemTmplPublishVo)
    return (
      <div> 
          <h3 className = 'h3-title'>配送设置</h3>
          <div>
            <div className = 'otherMt202'>
              <span className='smallColor smaillest'>商品运费模板:</span>
              <span onClick={this.deliveryClick}>
              <Select style={{width:200}}
                  onChange={this.selectChange} 
                 // onFocus={this.selectFocus}
                  value={this.state.selectValue} >
                {this.state.deliveryData.map(item=><Option value={item.id}>{item.fareName}</Option>)}
              </Select>
              </span>
              <Checkbox className='delivery-check'
                        disabled ={this.state.checked}
                        checked={Boolean(this.props.itemTmplPublishVo.freightTmplVo.homeDelivery)} 
                        onChange={this.onChange}>支持同城配送</Checkbox>
            </div>
          </div>
      </div>
    );
  }
}
