/**
 * @file 发布商品-供货信息Tab组件
 */
import React, { Component } from 'react';
import { Tabs,Button,Layout,Modal,Checkbox,Table,Popover,Radio,InputNumber } from 'jdcloudui';
import './supply.css';

import SupplyInfoTable from '../../../SupplyInfoTable/v1.0.0/view';
import SupplyInfoAddress from '../../../SupplyInfoAddress/v1.0.0/view';

const TabPane = Tabs.TabPane;
const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

export default class ReleaseSupplyInfo extends Component {
  constructor(props){
    super(props);
    this.state={
      addressDATA:[],
      checkedList:[],
      afterChecked: [],
      optionsList:[],
    }
  }


  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    // if(nextProps.addressData.loaded){
    //   if(nextProps.addressData.data.code==0){
    //     let addressDATA = nextProps.addressData.data.data.result || [];
    //     this.creatAddress(addressDATA)
    //   }
    // }
  }


  
  render() {
    return (
      <div>
        <SupplyInfoAddress 
          itemTmplPublishVo={this.props.itemTmplPublishVo}
          updateItemTmplAction = {this.props.updateItemTmplAction}/>
        <SupplyInfoTable
          edit={this.props.edit}
          type={this.props.type} 
          itemTmplPublishVo={this.props.itemTmplPublishVo}
          updateItemTmplAction = {this.props.updateItemTmplAction}/>
      </div>
    );
  }
}
