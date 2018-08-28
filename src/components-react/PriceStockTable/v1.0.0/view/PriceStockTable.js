/**
 * @file 发布商品-价格及库存Table组件
 */
import React, { Component } from 'react';
import { Form,Button,Layout,Modal,Checkbox,Table,Col,Row,
         Popover,Radio,InputNumber,message,Input,Icon } from 'jdcloudui';

import RegionPriceEdit from '../../../RegionPriceEditRelease/v1.0.0/view';
import PriceModal from './PriceModal';
import styles from './style.less';

const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item

let uuid = 0;
@Form.create()

export default class PriceStockTable extends Component {
  constructor(props){
    super(props);
    this.countContent = (
      <span>
        <span>设置库存:</span>
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
              <span>设置价格:</span>
              <InputNumber min={0}
                // onChange = {this.changePrice}
                onBlur = {(e)=>this.changeBPrice(e)}
                style = {{width: '100px', marginLeft: '8px'}}>
              </InputNumber>
              <Button type="primary" ghost 
                      onClick={this.changeAllPrice}
                      style = {{marginLeft: '8px'}}>设置</Button>
            </span>);
    this.columns = [
    { title: <span>设置价格</span>,
      dataIndex: 'sprice',
      key: 'sprice',
      render:(text,record, index) =>(
        <div>
         <span style = {{float: 'left',marginRight: '5px', marginTop: '4px'}}>全国价</span>
              <InputNumber min={0.01}
                          disabled = {record.disabled}
                          onChange = {(e)=>this.changeESprice(e,index)}
                          onBlur = {(e)=>this.changeBESprice(e,index)}
                          value = {this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] && 
                            this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList ?
                              this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList[0].supplyPrice:null}
                          style = {{width: '100px', float: 'left'}}></InputNumber>
          <span className="outSprice">
           <span style = {{float: 'left',marginRight: '5px', marginTop: '4px'}}>
              <RegionPriceEdit
                              edit={this.props.edit}
                              index={index}
                              itemTmplPublishVo={this.props.itemTmplPublishVo}
                              updateItemTmplAction = {this.props.updateItemTmplAction}
                              type={this.props.type}
                              regionalArr={this.regionalArr}
                                >
                              </RegionPriceEdit>
                </span>
         </span>
        </div>
        )
    },
    { title:<span>设置库存</span>,
      dataIndex: 'inventory',
      key: 'inventory',
      render:(text,record, index) =>(
        <div>
          <span style = {{float: 'left',marginRight: '5px', marginTop: '4px'}}>库存</span>
            <InputNumber disabled = {record.disabled} 
                        onChange = {(e) => {this.changeECount(index, e)}}
                        value = {this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] ? 
                          this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].inventory : ''}
                         style = {{width: '100px', float: 'left'}}></InputNumber>
        </div>
    )
  }
  ];
  this.columnsSku = [
    { title: 'SKU信息',
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
      { title: (<span>
        <span>设置价格</span>
          <Popover content={this.priceContent} >
              <span style = {{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置全部</span>
          </Popover>
        </span>
      ), 
        dataIndex: 'sprice',
        key: 'sprice',
        render:(text,record, index) =>(
          <div>
            <span style = {{float: 'left',marginRight: '5px', marginTop: '4px'}}>全国价</span>
                <InputNumber min={0.01}
                            disabled = {record.disabled}
                            onChange = {(e)=>this.changeESprice(e,index)}
                            onBlur = {(e)=>this.changeBESprice(e,index)}
                            value = {this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] && 
                              this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList ?
                                this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].areaPriceList[0].supplyPrice:null}
                            style = {{width: '100px', float: 'left'}}></InputNumber>
  
            <span className="outSprice">
               <span style = {{float: 'left',marginRight: '5px', marginTop: '4px'}}>
                <RegionPriceEdit
                                edit={this.props.edit}
                                index={index}
                                itemTmplPublishVo={this.props.itemTmplPublishVo}
                                updateItemTmplAction = {this.props.updateItemTmplAction}
                                type={this.props.type}
                                regionalArr={this.regionalArr}
                                  >
                                </RegionPriceEdit>
                  </span>
           </span>
          </div>
          )
      },
      { title:(<span>
        <span>设置库存</span>
          <Popover content={this.countContent} >
              <span style = {{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置全部</span>
          </Popover>
        </span>
      ),
        dataIndex: 'inventory',
        key: 'inventory',
        render:(text,record, index) =>(
          <div>
            <span style = {{float: 'left',marginRight: '5px', marginTop: '4px'}}>库存</span>
              <InputNumber disabled = {record.disabled} 
                          onChange = {(e) => {this.changeECount(index, e)}}
                          value = {this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] ? 
                            this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].inventory : ''}
                           style = {{width: '100px', float: 'left'}}></InputNumber>
          </div>
      )
    },
];
this.initdata=[{
  key: 0,
  count: 0,
  totalPrice: null,//供货价
  inventory: null,//销量
  attributes: [],
  ifchecked: 1
}],
this.state={
  addressDATA:[],
  checkedList:[],
  afterChecked: [],
  optionsList:[],
  regionalList:[],
  initdata:this.initdata,
  inventory:{},
  supplyPrice:{},
  visible:false,
  visiblePop:{},
  visibleView:{},
  column:this.columns,
  modalKey:null,
  priceList: [],//分组价
  PriceData:[],
};
    this.lastKey = 0;
    this.record = {};
  }

  componentDidMount(){
    console.log(this.props.type)
    this.props.getRegionalPriceStock()
    this.initColumns(this.props.itemTmplPublishVo);

    //初始化保存分组价数据
    let PriceData = [];
    let preSkuPriceVoList = this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList;
    preSkuPriceVoList.map((skuItem,skuIndex)=>{
      PriceData.push(skuItem.labelPriceList)
      this.setState({PriceData})
    })

    if(this.props.type == 3){
      //店铺分销功能——查询分组价是否显示接口
      let param = {};
      this.props.queryShopInfo(param).then(
        result => {
          if(result.code == 0 && result.data && result.data.length > 0) {
            const html =  {
              title: '设置分组价',
              key: 'actionPrice',
              width: 100,
              render:(record, index) => {
                return(
                  <div>
                    {record.disabled ?
                      (<span style={{color: '#bbb', float: 'left',marginRight: '5px', marginTop: '4px'}}>
                        {record.isPrice?'查看':'添加'}
                        </span>)
                      : (
                        <a href="javascript:void(0);" onClick={() => this.handleModal(true, record)} style={{float: 'left',marginRight: '5px', marginTop: '4px'}}>
                          {record.isPrice?'查看':'添加'}
                        </a>
                    )}
                  </div>
                );
              }
            };
  
            const html2 =  {
              title: (
                <a href="javascript:void(0);" onClick={() => this.handleModal(true, {}, true)}>设置分组价</a>
              ),
              key: 'actionPrice',
              width: 100,
              render:(record, index) => {
                return(
                  <div>
                    {record.disabled ?
                      (<span style={{color: '#bbb', float: 'left',marginRight: '5px', marginTop: '4px'}}>
                        {record.isPrice?'查看':'添加'}
                        </span>)
                      : (
                        <a href="javascript:void(0);" onClick={() => this.handleModal(true, record)} style={{float: 'left',marginRight: '5px', marginTop: '4px'}}>
                          {record.isPrice?'查看':'添加'}
                        </a>
                      )}
                  </div>
                );
              }
            };
            this.columns.splice(-1, 0, html);
            this.columnsSku.splice(-1, 0, html2);
            this.setState({
              priceList: result.data
            });
          }
        }
      )
    }
  }
  componentWillReceiveProps(nextProps){
    this.initColumns(nextProps.itemTmplPublishVo)
    if(nextProps.priceStockData.loaded){
      if(nextProps.priceStockData.data.code==0){
        let regionalDATA = []
        for (var i in nextProps.priceStockData.data.data){
          if(nextProps.priceStockData.data.data[i]){
            regionalDATA = nextProps.priceStockData.data.data[i]
          }
        }
        this.regionalArr = regionalDATA
      }
    }
  }

  initColumns(itemTmplPublishVo) {
    const preSkuPriceVoList = itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList;
    preSkuPriceVoList.map((item,index)=>{
      item.key = index
    })
    let column = this.columnsSku;
    // 没有选择销售规格
    // console.log(preSkuPriceVoList.length)
    // console.log(preSkuPriceVoList[0].attributes)
    if(preSkuPriceVoList.length == 1 && preSkuPriceVoList[0].attributes == null || preSkuPriceVoList[0].attributes.length == 0){
      // console.log('attri')
      column = this.columns;
    }
    // console.log(preSkuPriceVoList)
    this.setState({
      column: column,
      initdata: preSkuPriceVoList
    });
  }

    changeECount=(index,value)=>{
      let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
      // console.log('changed', value);
      // console.log('index', index);
      let num;
      if (value || value == 0) {
        num = value;
      }  
      num = parseInt(num);
      if (num != 0 && !num) {
        num = null;
      }
      if(itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index]){
        itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].inventory = num;
      } else {
        itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index] = {};
        itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].inventory = num;
        itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index].supplyStatus = 1;
      }    
      this.state.inventory[index]=num;
      this.setState({
        inventory:this.state.inventory
      });
      this.props.updateItemTmplAction(itemTmplPublishVo);
    }
  
    changeESprice=(value,index)=>{
      let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
      let num;
        num = value;
        if(itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index]){
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
  
    changeBESprice=(e,index)=>{
      let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
      let num = 0;
      num = e.target.value;
      if(num){
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
  
    radioChange=(index,e)=>{
      // console.log('ind',index,e)
      let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
      if(itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[index]){
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
      // console.log(number, '更改全部供货价常规备货');
      this.setState({
        allcount: number
      });
    }
  
    changeAllCount=()=>{
      // console.log('2222')
      let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
  
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.map(item=>{
        item.inventory = this.state.allcount;
      })
      this.props.updateItemTmplAction(itemTmplPublishVo);
    }
  
    // changePrice=(e)=>{
  
    // }
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
      // console.log(this.props.itemTmplPublishVo)
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
      // console.log(rules)
        return rules
    }

    //分组价弹窗
    /** 
     * action: 打开/关闭弹窗
     * type: 设置分组价
     * record: 某一条的数据
     * */
    handleModal = (action, record, type) => {
          this.record = record;
          console.log(this.record)
          // const {PriceData} = this.state;
          // if(record.isPrice){
          //   console.log('设置过分组价')
          //   console.log(PriceData)
          // } else {
          //   console.log('未设置过分组价')
          //   console.log(PriceData)
          // }
          this.setState({
            visible: action
          });
    };

    //保存分组价
    handleOk = (type) => {
      console.log('-----------保存分组价-----------')
      let {PriceData} = this.state;
      console.log(PriceData)
      let key = this.record.key;
      let num = this.record.isPrice;
      console.log(key)
      console.log(num)
      let itemTmplPublishVo = this.props.itemTmplPublishVo;
      let preSkuPriceVoList = itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList;
  
      let PriceArr = [];
      if(type) {
        console.log('批量设置分组价')
        PriceArr = PriceData['999a'] && PriceData['999a'].filter(_item => _item && _item.labelPrice) || [];
        console.log(PriceArr)
        PriceData = [];
        PriceData['999a'] = PriceArr;
        this.setState({PriceData})
        preSkuPriceVoList.map((item, index) => {
          item.labelPriceList = PriceArr;
          item.isPrice = 1;
        });
      } else {
        PriceArr = PriceData[key] && PriceData[key].filter(item => item && item.labelPrice) || [];
        preSkuPriceVoList[key].labelPriceList = PriceArr;
        preSkuPriceVoList[key].isPrice = 1;
      }
      // console.log(PriceData)
      // console.log(preSkuPriceVoList);
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList = preSkuPriceVoList;
      console.log(itemTmplPublishVo)
      this.props.updateItemTmplAction(itemTmplPublishVo);
      this.handleModal(false, {});
    };

    //修改分组价
    /**
     * index: 某个sku分组价中的分销商tabs的下标
     * data: 该分销商tabs对应的数据 (data = {labelId,labelPrice,labelName})
     * record: 该sku的数据
     */
    changeActionPrice = (index, data, record) => {
      console.log('修改分组价')
      let {PriceData} = this.state;
      PriceData[(record.key || record.key === 0) ? record.key : '999a'] = PriceData[(record.key || record.key === 0) ? record.key : '999a'] || [];
      if(PriceData[(record.key || record.key === 0) ? record.key : '999a'].length > 0) {
        let type = false;
        PriceData[(record.key || record.key === 0) ? record.key : '999a'].map(item => {
          if(item.labelId === data.labelId) {
            type = true;
            item.labelPrice = data.labelPrice;
          }
        });
        if(!type) {
          PriceData[(record.key || record.key === 0) ? record.key : '999a'].push(data);
        }
      } else {
        PriceData[(record.key || record.key === 0) ? record.key : '999a'].push(data);
      }
      // if(record.key !== 0 && !record.key) {
      //   this.data.map(item => {
      //     PriceData[item.key] = PriceData['999a'];
      //   });
      // }
      console.log(PriceData);
      this.setState({
        PriceData
      });
    };

  render() {
    console.log(this.props.itemTmplPublishVo)
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('keys', {initialValue: []});
    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 21},
    };

    //分组价查看回显数据
    let data = [];
    if(this.record.key == undefined || this.state.PriceData[this.record.key] == undefined){
      if(this.state.PriceData['999a']){
        data = this.state.PriceData['999a']
      }
    } else {
      data = this.state.PriceData[this.record.key]
    }
    return (
      <div>
        <div>
          <div className="rHeaderTtle rMarginBottom"><h2 >价格及库存</h2></div>
          <div className="ui-ct">
            <Table 
              columns={this.state.column}
              dataSource={this.state.initdata}
              pagination = {false}
              className="rTable"
              rowClassName={this.setClassName}
              style = {{background: 'white'}}/>
              {
                this.state.visible ? (
                  <PriceModal
                    data={data}
                    visible={this.state.visible}
                    record={this.record}
                    priceList={this.state.priceList}
                    handleOk={this.handleOk}
                    changePrice={this.changeActionPrice}
                    handleModal={this.handleModal}
                  />
                ) : null
              }
          </div>
        </div>
      </div>
    );
  }
}
