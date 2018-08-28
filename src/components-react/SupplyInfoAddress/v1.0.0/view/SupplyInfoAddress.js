/**
 * @file 发布商品-供货信息Tab组件
 */
import React, { Component } from 'react';
import { Tabs,Button,Layout,Modal,Checkbox,Table,Popover,Radio,InputNumber } from 'jdcloudui';
import index from 'jdcloudui/lib/cascader';

const TabPane = Tabs.TabPane;
const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

export default class ReleaseSupplyInfo extends Component {
  constructor(props){
    super(props);
    this.state={
      uid:Math.random(),
      addressDATA:[],
      checkedList:[],
      afterChecked: [],
      optionsList:[],
    }
    this.addressDATA=[];
  }

  componentWillMount(){
    console.log(10)
    this.props.getAddressInfo({type:1})
  }

  componentWillReceiveProps(next){
    let nextProps= JSON.parse(JSON.stringify(next));
    console.log(nextProps)
    if(nextProps.addressData.loaded){
      if(nextProps.addressData.data.code==0){
        let addressDATA = nextProps.addressData.data.data.result || [];
        this.creatAddress(addressDATA,nextProps)
      }
    }
  }

  // 选择发货地
  creatAddress(data,nextProps){
    let address = []
    data.map(item=>{
      address.push({
        label: item.addressName,
        value:item.addressName,
        id:item.id,
      })
    })

    if(nextProps.itemTmplPublishVo.itemPerfectVo.placeDeliveryId){
      let arrValue=[]
      nextProps.itemTmplPublishVo.itemPerfectVo.placeDeliveryId.map(item=>{
        address.map(item1=>{
          if(item==item1.id){
            arrValue.push(item1.value)
          }
        })
      })
      this.setState({
        checkedList:arrValue,
        afterChecked:arrValue
      })
    }
    this.addressDATA = address
  }

  showModal = () => {
    this.setState({
        visible: true,
        uid:Math.random()
    });
  }
  handleOk = (e) => {
    this.state.afterChecked = this.state.checkedList
    console.log(this.state.afterChecked)
    this.creatAddressId(this.state.afterChecked)
    this.setState({
      visible:false
    });
  }

  deleteItem=(item)=>{
    let num = this.state.afterChecked.indexOf(item)
    this.state.afterChecked.splice(num,1);
    this.creatAddressId(this.state.afterChecked)
    this.setState({
      afterChecked:this.state.afterChecked,
      checkedList:this.state.afterChecked
    })
  }

  handleCancel = (e) => {
    this.state.checkedList = this.state.afterChecked;
    this.setState({
        visible: false,
    });
  }

  addressChange=(checkedValues)=>{
    console.log('aa',checkedValues)
    this.setState({
      checkedList:checkedValues
    }) 
  }
  // 获取发货地id
  creatAddressId(recived){
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    let addressId = [];
    recived.map(item=>{
      this.addressDATA.map((item1,index)=>{
        if(item == item1.value){
          addressId.push(`${item1.id}`)
        }
      })
    })
    itemTmplPublishVo.itemPerfectVo.placeDeliveryId = addressId;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }
  
  render() {
    console.log(this.props.itemTmplPublishVo.itemPerfectVo.placeDeliveryId)
    this.state.optionsList = this.state.afterChecked.map((item,index)=>
    <div key={index} className='sale-area'>{item}<a className="sale-area-a" onClick={()=>this.deleteItem(item)}>-</a></div>)
    return (
      <div>
        <div>
        <div className="rHeaderTtle"><h2>发货地</h2></div>
          <div className="rAdress">
                <Button type="primary" onClick={this.showModal}>选择发货地</Button>
                <Modal title="选择发货地" mashClosable={false} visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    width={'600px'}
                    className="ui-shop"
                    key={this.state.uid}
                >
                    <CheckboxGroup 
                        options={this.addressDATA}
                        value={this.state.checkedList}
                        //defaultValue={["101704"]}
                        onChange={this.addressChange} />
                </Modal>
            </div>
            <Layout className="rLayout">
              <Content className="rContent">
                {this.state.optionsList}
              </Content>
            </Layout>
        </div>
      </div>
    );
  }
}
