/**
 * @file 发布商品-供货信息Table组件
 */
import React, { Component } from 'react';
import {
  Form, Button, Layout, Modal, Checkbox, Table, Col, Row,
  Popover, Radio, InputNumber, message, Input, Icon
} from 'jdcloudui';
import RegionPriceEdit from '../../../RegionPriceEditRelease/v1.0.0/view';
import RegionPriceDetail from './RegionPriceDetail';
import styles from './style/style.less';

const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item

let uuid = 0;
@Form.create()

export default class SupplyInfoTable extends Component {
  constructor(props) {
    super(props);
    this.regionalArr = [];
    this.countContent = (
      <span>
        <span>常规备货:</span>
        <InputNumber min={0}
          onChange = {this.changeCount}
          style = {{width: '100px', marginLeft: '8px'}}>
        </InputNumber>
        <Button type="primary" ghost 
                onClick={this.changeAllCount}
                style = {{marginLeft: '8px'}}>设置</Button>
      </span>);
          this.priceContent = (
            <span>
              <span>供货价:</span>
              <InputNumber min={0}
                onChange = {this.changePrice}
                onBlur = {(e)=>this.changeBPrice(e)}
                style = {{width: '100px', marginLeft: '8px'}}>
              </InputNumber>
              <Button type="primary" ghost 
                      onClick={this.changeAllPrice}
                      style = {{marginLeft: '8px'}}>设置</Button>
            </span>);
    this.columns = [
      {
        title: <span>常规备货</span>,
        dataIndex: 'inventory',
        key: 'inventory',
        render: (text, record, index) => (
          <div>
            {!record.supplyStatus ?
              <span style={{ color: '#bbb', float: 'left', marginRight: '5px', marginTop: '4px' }}>常规备货</span>
              : <span style={{ float: 'left', marginRight: '5px', marginTop: '4px' }}>常规备货</span>}
            <InputNumber disabled={!record.supplyStatus}
              onChange={(e) => { this.changeECount(index, e) }}
              value={this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] ?
                this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].inventory : ''}
              style={{ width: '100px', float: 'left' }}></InputNumber>
          </div>
        )
      },
      {
        title: <span>供货价</span>,
        dataIndex: 'sprice',
        key: 'sprice',
        render: (text, record, index) => (
          <div>
            {!record.supplyStatus ?
              <span style={{ color: '#bbb', float: 'left', marginRight: '5px', marginTop: '4px' }}>供货价</span>
              : <span style={{ float: 'left', marginRight: '5px', marginTop: '4px' }}>供货价</span>}
            <InputNumber min={0.01}
              disabled={!record.supplyStatus}
              onChange={(e) => this.changeESprice(e, index)}
              onBlur={(e) => this.changeBESprice(e, index)}
              value={this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] &&
                this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList ?
                this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList[0].supplyPrice : ''}
              style={{ width: '100px', float: 'left' }}></InputNumber>

            <span className="outSprice">
              {!record.supplyStatus ?
                <span className="tableSprice" style={{ color: '#bbb' }}>设置地域价</span>
                : <span style={{ float: 'left', marginRight: '5px', marginTop: '4px' }}>
                  <RegionPriceEdit
                    edit={this.props.edit}
                    index={index}
                    type={this.props.type}
                    itemTmplPublishVo={this.props.itemTmplPublishVo}
                    updateItemTmplAction={this.props.updateItemTmplAction}
                    getRegionalPrice={this.props.getRegionalPrice}
                    regionalArr={this.regionalArr}
                  >
                  </RegionPriceEdit>
                </span>}
            </span>
            <span className="outSprice">
              {!record.supplyStatus ?
                <span className="tableView" style={{ color: '#bbb' }}>查看</span>
                : <span style={{ float: 'left', marginRight: '5px', marginTop: '4px' }}>
                  <RegionPriceDetail
                    index={index}
                    type={this.props.type}
                    itemTmplPublishVo={this.props.itemTmplPublishVo}
                    updateItemTmplAction={this.props.updateItemTmplAction}
                    getRegionalPrice={this.props.getRegionalPrice}
                    regionalArr={this.regionalArr}
                  >
                  </RegionPriceDetail>
                </span>}
            </span>
          </div>
        )
      },
      {
        title: '供货量',
        dataIndex: 'count',
        key: 'count',
        render: (record, index) => 0
      },
      {
        title: '供货情况',
        dataIndex: 'supplyStatus',
        key: 'supplyStatus',
        render: (text, record, index) => {
          return (
            <RadioGroup onChange={(e) => this.radioChange(index, e)}
              value={text}>
              <Radio value={0}>暂无供应</Radio>
              <Radio value={1}>正常供应</Radio>
            </RadioGroup>
          );
        }
      },
    ];
    this.columnsSku = [
      {
        title: 'SKU信息',
        dataIndex: 'attributes',
        key: 'attributes',
        width: 200,
        render: (data) => {
          var context = '';
          (data || []).forEach((item) => {
            context += item.vName + ' ';
          });
          return (<span>{context}</span>);
        }
      },
      {
        title: (<span>
          <span>常规备货</span>
            <Popover content={this.countContent} >
                <span style = {{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置全部</span>
            </Popover>
          </span>
        ),
        dataIndex: 'inventory',
        key: 'inventory',
        render: (text, record, index) => (
          <div>
            {!record.supplyStatus ?
              <span style={{ color: '#bbb', float: 'left', marginRight: '5px', marginTop: '4px' }}>常规备货</span>
              : <span style={{ float: 'left', marginRight: '5px', marginTop: '4px' }}>常规备货</span>}
            <InputNumber disabled={!record.supplyStatus}
              onChange={(e) => { this.changeECount(index, e) }}
              value={this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] ?
                this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].inventory : ''}
              style={{ width: '100px', float: 'left' }}></InputNumber>
          </div>
        )
      },
      {
        title:(<span>
          <span>供货价</span>
            <Popover content={this.priceContent} >
                <span style = {{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置全部</span>
            </Popover>
          </span>
        ), 
        //<span>供货价</span>,
        dataIndex: 'sprice',
        key: 'sprice',
        render: (text, record, index) => (
          <div>
            {!record.supplyStatus ?
              <span style={{ color: '#bbb', float: 'left', marginRight: '5px', marginTop: '4px' }}>供货价</span>
              : <span style={{ float: 'left', marginRight: '5px', marginTop: '4px' }}>供货价</span>}
            <InputNumber min={0.01}
              disabled={!record.supplyStatus}
              onChange={(e) => this.changeESprice(e, index)}
              onBlur={(e) => this.changeBESprice(e, index)}
              value={this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] &&
                this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList ?
                this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList[0].supplyPrice : ''}
              style={{ width: '100px', float: 'left' }}></InputNumber>

            <span className="outSprice">
              {!record.supplyStatus ?
                <span className="tableSprice" style={{ color: '#bbb' }}>设置地域价</span>
                : <span style={{ float: 'left', marginRight: '5px', marginTop: '4px' }}>
                  <RegionPriceEdit
                    edit={this.props.edit}
                    index={index}
                    type={this.props.type}
                    itemTmplPublishVo={this.props.itemTmplPublishVo}
                    updateItemTmplAction={this.props.updateItemTmplAction}
                    getRegionalPrice={this.props.getRegionalPrice}
                    regionalArr={this.regionalArr}
                  >
                  </RegionPriceEdit>
                </span>}
            </span>
            <span className="outSprice">
              {!record.supplyStatus ?
                <span className="tableView" style={{ color: '#bbb' }}>查看</span>
                : <span style={{ float: 'left', marginRight: '5px', marginTop: '4px' }}>
                  <RegionPriceDetail
                    index={index}
                    itemTmplPublishVo={this.props.itemTmplPublishVo}
                    updateItemTmplAction={this.props.updateItemTmplAction}
                    getRegionalPrice={this.props.getRegionalPrice}
                    regionalArr={this.regionalArr}
                  >
                  </RegionPriceDetail>
                </span>}
            </span>
          </div>
        )
      },
      {
        title: '供货量',
        dataIndex: 'count',
        key: 'count',
        render: (record, index) => 0
      },
      {
        title: '供货情况',
        dataIndex: 'supplyStatus',
        key: 'supplyStatus',
        render: (text, record, index) => {
          console.log(text)
          return (
            <RadioGroup onChange={(e) => this.radioChange(index, e)}
              value={text}>
              <Radio value={0}>暂无供应</Radio>
              <Radio value={1}>正常供应</Radio>
            </RadioGroup>
          );
        }
      },
    ];
    this.initdata = [{
      key: 0,
      count: 0,
      totalPrice: null,//供货价
      inventory: null,//销量
      attributes: [],
    }];
    this.state = {
      addressDATA: [],
      checkedList: [],
      afterChecked: [],
      optionsList: [],
      regionalList: [],
      initdata: this.initdata,
      inventory: {},
      supplyPrice: {},
      visible: false,
      visiblePop: {},
      visibleView: {},
      column: this.columns,
      modalKey: null,
      allcount:null,
    };
    this.lastKey = 0;
  }

  componentDidMount() {
    this.initColumns(this.props.itemTmplPublishVo);
  }
  componentWillReceiveProps(nextProps) {
    this.initColumns(nextProps.itemTmplPublishVo)
    if (nextProps.regionalData.loaded) {
      if (nextProps.regionalData.data.code == 0) {
        let regionalDATA = []
        for (var i in nextProps.regionalData.data.data) {
          if (nextProps.regionalData.data.data[i]) {
            regionalDATA = nextProps.regionalData.data.data[i];
          }
        }
        this.regionalArr = regionalDATA;
      }
    }
  }
  // 去掉停用的数据


  initColumns(itemTmplPublishVo) {
    const preSkuPriceVoList = itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList;
    let column = this.columnsSku;
    // 没有选择销售规格
    if(preSkuPriceVoList.length == 1 && preSkuPriceVoList[0].attributes == null  || preSkuPriceVoList[0].attributes.length == 0){
      column = this.columns;
    }
    preSkuPriceVoList.map((item,index)=>{
      if(!item.areaPriceList.length){
        preSkuPriceVoList.splice(index,1)
      }
    })
    console.log(preSkuPriceVoList)
    this.setState({
      column: column,
      initdata: preSkuPriceVoList
    });
  }

  // 备货及供货价方法
  changeECount = (index, value) => {
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    console.log('changed', value);
    console.log('index', index);
    let num;
    if (value || value == 0) {
      num = value;
    }
    num = parseInt(num);
    if (num != 0 && !num) {
      num = null;
    }
    if (itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index]) {
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].inventory = num;
    } else {
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] = {};
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].inventory = num;
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].supplyStatus = 1;
    }
    this.state.inventory[index] = num;
    this.setState({
      inventory: this.state.inventory
    });
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  changeESprice = (value, index) => {
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    let num;
    num = value;
    if (itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index]) {
      //itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList=[{}],
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList[0].supplyPrice = num;
    } else {
      // itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList[0].supplyPrice = num;
      // itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].supplyStatus = 1;
    }
    //  this.state.supplyPrice[index]=num;
    // this.setState({
    //   supplyPrice: itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].supplyPrice
    // });
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  changeBESprice = (e, index) => {
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    let num = 0;
    num = e.target.value;
    if (num) {
      num = new Number(num);
      num = +num.toFixed(2);
    }
    itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList[0].supplyPrice = num;
    // this.state.supplyPrice[index]=num;
    // this.setState({
    //   supplyPrice: itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].supplyPrice
    // });
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  radioChange = (index, e) => {
    console.log('ind', index, e)
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    if (itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index]) {
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].supplyStatus = e.target.value;
    } else {
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] = {};
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].supplyStatus = e.target.value;
    }
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  changeCount=(e)=>{
    let number = e;
    if(typeof number != 'number' && e.indexOf('.') == e.length - 1 && count <= 1){
      number = e;
    }else{
      number = parseInt(e);
    }
    if(!number){
      number = 0;
    }
		console.log(number, '更改全部供货价常规备货');
		this.setState({
			allcount: number
		});
  }

  changeAllCount=()=>{
    console.log('2222')
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));

    itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.map(item=>{
      item.inventory = this.state.allcount;
    })
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  changePrice=(e)=>{

  }
  changeBPrice=(e)=>{
    let num = 0;
    num = e.target.value;
    if (num) {
      num = new Number(num);
      num = +num.toFixed(2);
    }
    this.setState({
      allPrice:num
    })
  }

  changeAllPrice=()=>{
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));

    itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.map(item=>{
      item.areaPriceList[0].supplyPrice = this.state.allPrice
    })
    
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  setClassName=(record,index)=>{
    console.log(this.props.itemTmplPublishVo)
    let rules = null
  this.props.itemTmplPublishVo.itemTmplSkuVoList.map(statusItem=>{
    //this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.map((skuItem,skuIndex)=>{         
      if(statusItem.skuStatus == 0){
        let statusItemArr = [];
        let skuItemArr = [];
        statusItem.attributes.map((aidItem,aidIndex)=>{
          statusItemArr.push(aidItem.aid,aidItem.vid)
        })
        this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].attributes.map((preaidItem,preaidIndex)=>{
          skuItemArr.push(preaidItem.aid,preaidItem.vid)
        })
console.log(JSON.stringify(statusItemArr),JSON.stringify(skuItemArr),JSON.stringify(statusItemArr)==JSON.stringify(skuItemArr))
        if(JSON.stringify(statusItemArr) == JSON.stringify(skuItemArr)){
          rules = styles.red
        }
          // this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].attributes.map(preaidItem=>{
          //   console.log(aidItem.aid == preaidItem.aid && aidItem.vid == preaidItem.vid)
          //   if(aidItem.aid == preaidItem.aid && aidItem.vid == preaidItem.vid){
          //     rules = styles.red
          //     return;
          //     console.log(rules)
          //   }
          // })

      }
    })
   // })
    console.log(rules)
      return rules
  }

  render() {
    console.log(this.props, "---")
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <div>
        <div>
          <div className="rHeaderTtle rMarginBottom"><h2 >供货信息</h2></div>
          <div className="ui-ct">
            <Table
              columns={this.state.column}
              dataSource={this.state.initdata}
              pagination={false}
              className="rTable"
              rowClassName={this.setClassName}
              style={{ background: 'white' }} />
          </div>
        </div>
      </div>
    );
  }
}
