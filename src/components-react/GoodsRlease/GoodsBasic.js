/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布-基本信息
 ****************************************************************/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Form, Input, Select, Table, Modal, Button, Checkbox, InputNumber, message, Popover, Radio} from 'jdcloudui';
import CategoryCascade from '../../components-react/Common/PlatformCategory/CategoryCascade';
import BrandSelect from '../GoodsRlease/BrandSelect/BrandSelect';
import {brandSearch, brandSearchByCid, clearData} from '../GoodsRlease/BrandSelect/redux'; //品牌
import * as goodsFunc from './redux';
import reducer from '../Common/PlatformCategory/reducer';

//进行组件隔离
import ApiClient from '../../helpers/ApiClient';
// import createStore from '../../redux/create';
import {browserHistory} from 'react-router';
// import useScroll from 'scroll-behavior/lib/useStandardScroll';

import {createStore} from 'redux/create';
import createBrowserHistory from 'history/createBrowserHistory';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
import styles from './style/GoodsBasic.css';

@connect(
  state => ({
    goodsRlease: state.goodsRlease,
    brandSelect: state.brandSelect,
    goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({...goodsFunc, brandSearch, brandSearchByCid, clearData}, dispatch)
)
@Form.create()
export default class GoodsBasic extends Component {
  constructor(props, context) {
    super(props, context);
    //this.store = createStore(reducer);
    this.initSaleData = [];//初始销售规格信息
    this.checkedCount = {}; // 一共选择了多少行
    this.state = {
      checkedList: [],
      initFirst: true, // 是否第一次渲染
      ifAddBrand: false,
      error: false,
      errorMSG: '',
      saleData: [], //销售规格表格
      saleMessageData: [{
        key: 0,
        message: '',
        ifstop: false,
        Model: '',
        Number: '',
        Code: '',
        Weight: null,
        weightUnit: 'g',
        attributes: null,
        skuUnit: null
        //action: <span style = {{cursor: 'pointer'}} key = {z } onClick = {() => {this.changeStatus(z);}}>启动</span>
      }], //销售信息表格
      currentIndex: 0,
      index: 0,
      ifhavedata: false,
      ifhavedata2: false,
      ifBrandNameCh: true, //中文品牌名称符合校验规则
      ifBrandNameEn: true, //英文品牌名称符合校验规则
      selectCid: '',
      labels: false,
      options: [],
      PublicModelCode: '',
      PublicProductNumber: '',
      PublicProductCode: '',
      PublicProductWeight: 0,
      PublicProductUnit: 'g',
      brandSelectStatus: '-1',
      clearAll: false,
      selectKeys: [],
      key: -1
    };
    this.name = '';
    this.cid = ''; //第一平台分类
    this.secondCid = ''; //第二平台分类
    this.handleOk = true;
    this.plainOptions = [];
    this.saleColumns = [{
      title: '属性名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%'
    }, {
      title: '属性值',
      dataIndex: 'value',
      key: 'value',
      width: '80%'
    }];
    this.saleData = [];
    this.initSaleMessageData = [{
      key: 0,
      message: '',
      ifstop: false,
      Model: '',
      Number: '',
      Code: '',
      Weight: null,
      weightUnit: 'g',
      attributes: null,
      skuUnit: null
    }];
    this.countContent = (
      <span>
	    		<span style={{float: 'left'}}>型号:</span>
	    		<Input size='large' maxLength="50" onChange={::this.changePublicModelCode}
                 style={{width: '100px', float: 'left', marginTop: '-5px', marginLeft: '8px'}}></Input>
	    		<span onClick={::this.changeEveryModelCode} style={{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置</span>
    		</span>);
    this.productNumberContent = (
      <span>
	    		<span style={{float: 'left'}}>物料号:</span>
	    		<Input size='large' maxLength="30" onChange={::this.changePublicProductNumber}
                 style={{width: '100px', float: 'left', marginTop: '-5px', marginLeft: '8px'}}></Input>
	    		<span onClick={::this.changeEveryProductNumber}
                style={{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置</span>
    		</span>);
    this.productCodeContent = (
      <span>
	    		<span style={{float: 'left'}}>商品条码:</span>
	    		<Input size='large' maxLength="30" onChange={::this.changePublicProductCode}
                 style={{width: '100px', float: 'left', marginTop: '-5px', marginLeft: '8px'}}></Input>
	    		<span onClick={::this.changeEveryProductCode}
                style={{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置</span>
    		</span>);
    this.productCodeWeight = (
      <span>
	    		<span style={{float: 'left'}}>商品毛重:</span>
	    		<InputNumber
            min={0}
            defaultValue={null}
            onChange={::this.changePublicProductWeight}
            size='large'
            onBlur={::this.allWeight}
            style={{width: '100px', float: 'left', marginTop: '-5px', marginLeft: '8px', marginRight: '8px'}}>
	    		</InputNumber>
				 <RadioGroup defaultValue={'g'} onChange={::this.changePublicProductUnit}>
				 	<Radio value="g">g</Radio>
        			<Radio value="kg">kg</Radio>
				 </RadioGroup>
				 <span onClick={::this.changeEveryProductWeight}
               style={{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置</span>
    		</span>);
    this.unitContent = (
      <span>
	    		<span style={{float: 'left'}}>单位:</span>
	    		<Select className={styles.inputname}
                  placeholder="请选择"
                  size="large"
                  onChange={::this.handleSelectmeasuring}
                  style={{width: '68px'}}
                  notFoundContent={'请选择'}>
		              {this.props.goodsRlease.unitData && this.getOptions(this.props.goodsRlease.unitData)}
		        </Select>
	    		<span onClick={::this.changeEveryProductCode}
                style={{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置</span>
    		</span>);
    this.saleMessage = [{
      title: '商品信息',
      dataIndex: 'message',
      key: 'message',
      width: '15%',
      render: (text, record) => (
        record.ifstop ?
          <span style={{color: '#999'}}>{record.message}</span>
          : <span>{record.message}</span>
      ),
    }, {
      title: (<span>
	                <span>型号</span>
	                  <Popover content={this.countContent}>
	                      <span style={{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置全部</span>
	                  </Popover>
	                </span>
      ),
      key: 'model',
      width: '15%',
      render: (text, record) => (
        <Input size='large' value={record.Model} defaultValue={record.Model} maxLength="50" type="text"
               disabled={record.ifstop} onChange={(e) => {
          this.changeModel(text, record, e);
        }}/>
      ),
    }, {
      title: (<span>
	                <span>物料号</span>
	                  <Popover content={this.productNumberContent}>
	                      <span style={{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置全部</span>
	                  </Popover>
	                </span>
      ),
      key: 'productNumber',
      width: '15%',
      render: (text, record) => (
        <Input size='large' value={record.Number} defaultValue={record.Number} maxLength="30" type="text"
               disabled={record.ifstop} onChange={(e) => {
          this.changeNumber(text, record, e);
        }}/>
      ),
    }, {
      title: (<span>
	                <span>商品条码</span>
	                  <Popover content={this.productCodeContent}>
	                      <span style={{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置全部</span>
	                  </Popover>
	                </span>
      ),
      key: 'productCode',
      width: '15%',
      render: (text, record) => (
        <Input value={record.Code} size='large' defaultValue={record.Code} maxLength="30" type="text"
               disabled={record.ifstop} onChange={(e) => {
          this.changeCode(text, record, e);
        }}/>
      ),
    }, {
      title: (<span>
	                <span>商品毛重</span>
	                  <Popover content={this.productCodeWeight} style={{height: '80px'}}>
	                      <span style={{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置全部</span>
	                  </Popover>
	                </span>
      ),
      key: 'productWeight',
      width: '7%',
      colSpan: 2,
      render: (text, record) => (
        <InputNumber
          value={(record.Weight)}
          defaultValue={null}
          min={0}
          type="text"
          disabled={record.ifstop}
          size='large'
          onBlur={(value) => {
            this.changeWeight(value, text, record);
          }}
          onChange={(value) => {
            this.changeWeightVal(value, record);
          }}/>
      ),
    }, {
      title: '',
      key: 'weightUnit',
      colSpan: 0,
      render: (text, record) => (
        <Select value={record.weightUnit} size='large' className={styles.inputname} style={{width: '50px'}}
                disabled={record.ifstop} defaultValue={record.weightUnit ? record.weightUnit : 'g'} placeholder="请选择计量单位"
                onChange={(e) => {
                  this.changeUnit(text, record, e);
                }}>
          <Option value="g">g</Option>
          <Option value="kg">kg</Option>
        </Select>
      )
    }, {
      title: (<span>
		                <span>单位</span>
          {/*<Popover content={this.unitContent} style = {{height: '80px'}}>
           <span style = {{marginLeft: '8px', color: '#49a9ee', cursor: 'pointer'}}>设置全部</span>
           </Popover>*/}
		                </span>
      ),
      key: 'skuUnit',
      render: (text, record) => (
        <Select className={styles.inputname}
                defaultValue={null}
                value={record.skuUnit ? record.skuUnit : null}
                placeholder="请选择"
                allowClear={true}
                size="large"
                onChange={(e) => {
                  this.handleSelectmeasuring(text, record, e)
                }}
                disabled={record.ifstop}
                style={{width: '68px'}}
                notFoundContent={'请选择'}>
          {this.props.goodsRlease.unitData && this.getOptions(this.props.goodsRlease.unitData)}
        </Select>
      )
    }, {
      title: '操作',
      key: 'newaction',
      width: '10%',
      render: (text, record) => (
        record.ifstop ?
          <span style={{cursor: 'pointer', color: 'rgb(73, 169, 238)'}} onClick={() => {
            this.changeStatus(text, record);
          }}>启动</span>
          : <span style={{cursor: 'pointer', color: 'rgb(73, 169, 238)'}} onClick={() => {
          this.changeStatus(text, record);
        }}>停用</span>
      ),
    }
    ];
    this.initSaleMessage = [{
      title: '型号',
      key: 'model',
      render: (text, record) => (
        <Input size='large' value={record.Model} defaultValue={record.Model} maxLength="50" type="text"
               disabled={record.ifstop} onChange={(e) => {
          this.changeModel(text, record, e);
        }}/>
      ),
    }, {
      title: '物料号',
      key: 'productNumber',
      render: (text, record) => (
        <Input size='large' value={record.Number} defaultValue={record.Number} maxLength={30} type="text"
               disabled={record.ifstop} onChange={(e) => {
          this.changeNumber(text, record, e);
        }}/>
      ),
    }, {
      title: '商品条码',
      key: 'productCode',
      render: (text, record) => (
        <Input size='large' value={record.Code} defaultValue={record.Code} maxLength={30} type="text"
               disabled={record.ifstop} onChange={(e) => {
          this.changeCode(text, record, e);
        }}/>
      ),
    }, {
      title: '商品毛重',
      key: 'productWeight',
      colSpan: 2,
      width: '7%',
      render: (text, record) => (
        <InputNumber
          value={(record.Weight)}
          defaultValue={null}
          min={0}
          type="text"
          disabled={record.ifstop}
          size='large'
          onBlur={(value) => {
            this.changeWeight(value, text, record);
          }}
          onChange={(value) => {
            this.changeWeightVal(value, record);
          }}/>
      ),
    }, {
      title: '',
      key: 'weightUnit',
      colSpan: 0,
      render: (text, record) => (
        record.weightUnit ?
          <Select size='large' className={styles.inputname} style={{width: '50px'}} disabled={record.ifstop}
                  value={record.weightUnit} placeholder="请选择计量单位" onChange={(e) => {
            this.changeUnit(text, record, e);
          }}>
            <Option value="g">g</Option>
            <Option value="kg">kg</Option>
          </Select>
          : <Select size='large' className={styles.inputname} style={{width: '50px'}} disabled={record.ifstop}
                    value={record.weightUnit} defaultValue={'g'} placeholder="请选择计量单位" onChange={(e) => {
          this.changeUnit(text, record, e);
        }}>
          <Option value="g">g</Option>
          <Option value="kg">kg</Option>
        </Select>
      )
    }, {
      title: '单位',
      key: 'skuUnit',
      render: (text, record) => (
        <Select className={styles.inputname}
                value={record.skuUnit}
                placeholder="请选择"
                allowClear={true}
                size="large"
                onChange={(e) => {
                  this.handleSelectmeasuring(text, record, e)
                }}
                disabled={record.ifstop}
                style={{width: '68px'}}
                notFoundContent={'请选择'}>
          {this.props.goodsRlease.unitData && this.getOptions(this.props.goodsRlease.unitData)}
        </Select>
      )
    }
    ];
    this.saleMessageData = [{
      key: 0,
      message: '',
      ifstop: false,
      Model: '',
      Number: '',
      Code: '',
      Weight: null,
      weightUnit: 'g',
      attributes: null,
      skuUnit: null
      //action: <span style = {{cursor: 'pointer'}} key = {z } onClick = {() => {this.changeStatus(z);}}>启动</span>
    }];
    this.addbrand = [];
    this.firstCid = '';
    this.secondCid = '';
    this.detailData = [];//处理过的数据
    this.init = true;
    this.itemPulishVO = [];
    this.currentIndex = 0;
    this.record = {};
    this.checkedList = [];
    this.checkedList2 = [];
    this.ifhavedata = false;
    this.initd = true;
    this.edit = {};
    this.errorMSG = '';
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
    this.selectCid = '';//平台分类的cid
    this.name = false; //判断错误名称是否为空
    // this.ifBrandName = false; //判断品牌其它名称是否为空
    this.channel = false; //判断渠道是否为空
    this.defaultChannelValue = [1,6]; //渠道默认选中的内容
    this.firstLoad = true;
    this.options = [];
    this.initindustry = true;
    this.industryData = [];
    this.labels = [];
    this.newarr = [];
    this.editChecks = [];
    this.initCid = '';
    this.changeWeightIndexVal = [];
    this.initCheckOptionsArray = [];
    this.initCheckOptions = true;
    this.ifdis = false;
    this.checkedParams = [];
    this.ifcategory = false;
    this.firstCheck = true;
    this.PublicModelCode = null;
    this.PublicProductNumber = null;
    this.PublicProductCode = null;
    this.PublicProductWeight = null;
    this.PublicProductUnit = 'g';
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.rowSelection.selectedRowKeys = selectedRowKeys;
        this.setState({
          selectKeys: selectedRowKeys
        });
        this.selectKeys = selectedRowKeys;
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
      selectedRowKeys: this.selectKeys,
    };
    this.saleMSGIndex = true;
    //组件隔离
    const client = new ApiClient();
    // FIXME 临时注释处理....
    // const _browserHistory = useScroll(() => browserHistory)();
    // this.store1 = createStore(_browserHistory, client, {}, reducer);
    // this.store2 = createStore(_browserHistory, client, {}, reducer);

      // const history = createBrowserHistory();
      this.store1 = createStore({createBrowserHistory, data:{}, helpers: { ...client },persistConfig:null, reducer});
      this.store2 = createStore({createBrowserHistory, data:{}, helpers: { ...client },persistConfig:null, reducer});
  }

  /**
   * @return  null
   * description: 销售信息全选功能
   */
  allSeletct() {

    let array = this.allKeys(this.state.saleMessageData);
    this.setState({
      selectKeys: array
    });
    this.selectKeys = array;
    this.rowSelection.selectedRowKeys = array;
  }

  /**
   * @return  null
   * description: 销售信息反选功能
   */
  notSeletct() {
    let array = this.allKeys(this.state.saleMessageData);
    if (this.selectKeys && this.selectKeys.length > 0) {
      this.selectKeys.map((item, index) => {
        array.splice(array.indexOf(item), 1);
      });
    } else {
    }
    this.rowSelection.selectedRowKeys = array;
    this.setState({
      selectKeys: array
    });
    this.selectKeys = array;
  }

  /**
   * @return  null
   * description: 批量停用
   */
  batchStopOrStart(status, range) {
    if (this.selectKeys && this.selectKeys.length) {
      this.selectKeys.map((item, index) => {
        this.changeStatus(status, this.state.saleMessageData[item], range);
      });
    } else {
    }
  }

  batchStop() {
    return this.batchStopOrStart(false);
  }

  batchStart() {
    return this.batchStopOrStart(true, 'all');
  }

  /**
   * @param {array} [] [销售信息表]
   * @return  array
   * description: 批量启用
   */
  allKeys(tableData) {
    let array = [];
    tableData.map((item, index) => {
      array[index] = item.key;
    });
    return array;
  }

  /**
   * @param {array} [] [销售信息表]
   * @return  array
   * description: 处理存储临时表的参数
   */
  detailCacheData(data) {
    let params = [];
    if (data && data.length) {
      params = data.map((item, index) => {
        /*params[item.attributes] = item*/
        return {
          key: item.attributes,
          value: item
        }
      });
    } else {
    }
    let params2 = {
      content: JSON.stringify(params)
    };
    //无销售属性的商品不向缓存中存数据
    if(data.length==1 && data[0].attributes==null){
      return
    } else {
      this.props.postCacheTable(params2);
    }
    return params;
  }

  changeEveryModelCode() { //改变所有型号
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData.map((item, index) => {
      if (!item.ifstop) {
        item.Model = this.PublicModelCode;
        this.itemPulishVO.itemSkuVoList[index].modelCode = this.PublicModelCode;
      } else {
      }
    })
    setTimeout(() => {
      this.setState({saleMessageData: saleMessageData});
    }, 0);
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  changeEveryProductNumber() { //改变所有物料号
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData.map((item, index) => {
      if (!item.ifstop) {
        item.Number = this.PublicProductNumber;
        this.itemPulishVO.itemSkuVoList[index].productCode = this.PublicProductNumber;
      } else {
      }
    })
    setTimeout(() => {
      this.setState({saleMessageData: saleMessageData});
    }, 0);
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  changeEveryProductCode() { //改变有条码
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData.map((item, index) => {
      if (!item.ifstop) {
        item.Code = this.PublicProductCode;
        this.itemPulishVO.itemSkuVoList[index].barCode = this.PublicProductCode;
      } else {
      }
    })
    setTimeout(() => {
      this.setState({saleMessageData: saleMessageData});
    }, 0);
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  changeEveryProductWeight() { //改变所有重量
    let num = this.PublicProductWeight;
    let newnum = this.PublicProductWeight;
    if (this.PublicProductWeight) {
      if (this.PublicProductUnit == 'g') {
        newnum = (+num).toFixed(0);
        if ((+num).toString().indexOf('.') !== -1) {
          message.error('单位为g时商品毛重不能为小数');
        } else {
        }
      } else {
        newnum = (+num).toFixed(3);
      }
    } else {
    }
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData.map((item, index) => {
      if (!item.ifstop) {
        saleMessageData[index].Weight = newnum;
        this.itemPulishVO.itemSkuVoList[index].weight = newnum;
        saleMessageData[index].weightUnit = this.PublicProductUnit;
        this.itemPulishVO.itemSkuVoList[index].weightUnit = this.PublicProductUnit;
        this.changeWeightIndexVal[index] = newnum;
      } else {
      }
    })
    setTimeout(() => {
      this.setState({saleMessageData: saleMessageData});
    }, 0);
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  changePublicModelCode(e) { //改变型号
    this.setState({
      PublicModelCode: e.target.value
    });
    this.PublicModelCode = e.target.value;
  }

  changePublicProductNumber(e) { //改变物料号
    this.setState({
      PublicProductNumber: e.target.value
    });
    this.PublicProductNumber = e.target.value;
  }

  changePublicProductCode(e) { //改变商品条码
    this.setState({
      PublicProductCode: e.target.value
    });
    this.PublicProductCode = e.target.value;
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  changePublicProductWeight(e) { //改变商品毛重
    /*let count = this.getCount(e);*/
    let number = e;
    /*if((typeof e != 'number') && (typeof e =='string') && (e.indexOf('.') == e.length - 1) && (count <= 1)){
     number = e;
     }else{
     number = parseFloat(e);
     }
     if(number && count == 1){
     number = e;
     }else{}
     if(!number){
     number = 0;
     }else{}*/
    this.setState({
      PublicProductWeight: number
    });
    this.PublicProductWeight = number;
  }

  allWeight(e) {
    let value = e.target.value;
    //let count = this.getCount(value);
    let number = value;
    /*if((typeof value != 'number') && (typeof value =='string')&&(value.indexOf('.') == value.length - 1) && (count <= 1)){
     number = value;
     }else if(typeof value != 'number'){
     number = 0;
     }
     if(!number){
     number = 0;
     }else{}*/
    this.setState({
      PublicProductWeight: number,
      //  key: Math.random()
    });
    this.PublicProductWeight = number;
  }

  changePublicProductUnit(e) { //更改商品毛重单位
    this.setState({
      PublicProductUnit: e.target.value
    });
    this.PublicProductUnit = e.target.value;
  }

  ifCategory(val) {
    this.props.ifCategoryError(val);
  }

  changeGoodsName(e) {
    this.itemPulishVO.itemName = e.target.value;
    this.props.uploadPrams(this.itemPulishVO);
    let value = this.Trim(e.target.value, null);
    if (value == '') {
      //alert('输入名称不能为空');
      this.name = true;
    } else {
      this.name = false;
    }
  }

  Trim(str, is_global)    //去除字符串空格
  {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global) {
      if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
      }
    }
    return result;
  }

  changeStatus(text, record, range) {
    let saleMessageData = [...this.state.saleMessageData];
    if (range) {
      saleMessageData[record.key].ifstop = false;
      this.itemPulishVO.itemSkuVoList[record.key].skuStatus = 1;
      this.props.uploadPrams(this.itemPulishVO);
      return false;
    } else {
    }
    if (record.ifstop == false || (typeof text == 'boolean' && text == false)) {
      saleMessageData[record.key].ifstop = true;
      this.itemPulishVO.itemSkuVoList[record.key].skuStatus = 0;
      this.props.uploadPrams(this.itemPulishVO);
    } else {
      saleMessageData[record.key].ifstop = false;
      this.itemPulishVO.itemSkuVoList[record.key].skuStatus = 1;
      this.props.uploadPrams(this.itemPulishVO);
    }
    this.setState({
      saleMessageData
    });
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  changeModel(text, record, e) {// 改变型号
    if (+this.state.saleMessageData.length === 1 && !this.state.saleMessageData[0].attributes && !this.ifdis) {
      this.initSaleMessageData[0].Model = e.target.value;
    } else {
    }
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData[record.key].Model = e.target.value;
    this.itemPulishVO.itemSkuVoList[record.key].Model = e.target.value;
    setTimeout(() => {
      this.setState({saleMessageData: saleMessageData});
    }, 0);

    this.itemPulishVO.itemSkuVoList[record.key].modelCode = e.target.value;
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  changeNumber(text, record, e) {// 改变物料号
    if (+this.state.saleMessageData.length === 1 && !this.state.saleMessageData[0].attributes && !this.ifdis) {
      this.initSaleMessageData[0].Number = e.target.value;
    } else {
    }
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData[record.key].Number = e.target.value;
    this.itemPulishVO.itemSkuVoList[record.key].productCode = e.target.value;
    setTimeout(() => {
      this.setState({saleMessageData: saleMessageData});
    }, 0);
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  changeCode(text, record, e) {// 改变商品条码
    if (+this.state.saleMessageData.length === 1 && !this.state.saleMessageData[0].attributes && !this.ifdis) {
      this.initSaleMessageData[0].Code = e.target.value;
    } else {
    }
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData[record.key].Code = e.target.value;
    this.itemPulishVO.itemSkuVoList[record.key].barCode = e.target.value;
    setTimeout(() => {
      this.setState({saleMessageData: saleMessageData});
    }, 0);
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  changeWeight(value, text, record) {// 改变商品毛重
    //let num = new Number(this.changeWeightIndexVal[record.key]);
    let newnum = this.changeWeightIndexVal[record.key];
    /*if(this.changeWeightIndexVal[record.key] == null || this.changeWeightIndexVal[record.key] == 'null'){
     newnum = null;
     }else{*/
    let num = this.changeWeightIndexVal[record.key];
    if (newnum) {
      if (record.weightUnit == 'g') {
        newnum = +num.toFixed(0);
        if (+num.toString().indexOf('.') !== -1) {
          message.error('单位为g时商品毛重不能为小数');
        } else {
        }
      } else {
        newnum = +num.toFixed(3);
      }
    } else {
    }
    //}*/
    if (+this.state.saleMessageData.length === 1 && !this.state.saleMessageData[0].attributes && !this.ifdis) {
      this.initSaleMessageData[0].Weight = newnum;
    } else {
    }
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData[record.key].Weight = newnum;
    this.itemPulishVO.itemSkuVoList[record.key].weight = newnum;
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    setTimeout(() => {
      this.setState({saleMessageData: saleMessageData});
    }, 0);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  getCount(val, str) {
    let count = 0;
    if (val && val.length) {
      for (let i = 0; i < val.length; i++) {
        if (val[i] == '.') {
          ++count;
        } else {
        }
      }
    } else {
    }
    return count;
  }

  changeWeightVal(value, record) {
    let number = value;
    /*let count = this.getCount(value);
     if(value == null || value == 'null'){
     number = null;
     }else{
     number = parseFloat(value);
     if((number || (number == 0)) && count == 1){
     number = value;
     }else{}
     if(!number){
     number = 0;
     }else{}
     }*/
    this.changeWeightIndexVal[record.key] = number;
    if (+this.state.saleMessageData.length === 1 && !this.state.saleMessageData[0].attributes && !this.ifdis) {
      this.initSaleMessageData[0].Weight = number;
    } else {
    }
    this.changeWeightIndexVal[record.key] = number;
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData[record.key].Weight = number;
    this.itemPulishVO.itemSkuVoList[record.key].weight = number;
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    setTimeout(() => {
      this.setState({saleMessageData: saleMessageData});
    }, 0);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  changeUnit(text, record, e) { //改变商品单位
    let weight = record.Weight;
    //let num = new Number(record.Weight);
    if (weight) {
      if (e == 'g') {
        weight *= 1000;
      } else {
        weight = weight / 1000;
      }
    } else {
    }
    if (+this.state.saleMessageData.length === 1 && !this.state.saleMessageData[0].attributes && !this.ifdis) {
      this.initSaleMessageData[0].weightUnit = e;
      this.initSaleMessageData[0].Weight = weight;
    } else {
    }
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData[record.key].weightUnit = e;
    saleMessageData[record.key].Weight = weight;
    this.itemPulishVO.itemSkuVoList[record.key].weightUnit = e;
    this.itemPulishVO.itemSkuVoList[record.key].weight = weight;
    this.setState({
      saleMessageData
    });
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  handleSelectmeasuring(text, record, e) { //改变计量单位
    let saleMessageData = [...this.state.saleMessageData];
    saleMessageData[record.key].skuUnit = e;

    if (+this.state.saleMessageData.length === 1 && !this.state.saleMessageData[0].attributes && !this.ifdis) {
      this.initSaleMessageData[0].skuUnit = e;
    } else {
    }

    this.itemPulishVO.itemSkuVoList[record.key].skuUnit = e;
    this.setState({
      saleMessageData
    });
    this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageData, this.itemPulishVO.itemSkuVoList);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  handleCategoryChange(value, ifchange) { // 更改平台分类
    if (!value.cid) {
      this.firstCid = null;
      this.itemPulishVO.cid = null;
      this.props.clearAllData();
      this.props.clearData();
      this.itemPulishVO.itemSkuVoList = [{//最后的SKU信息
        "platformId": 2,
        "sellerId": -1,
        "shopId": -1,
        "attributes": null,
        "modelCode": '',//商品型号
        "barCode": '',//商品条形码
        "productCode": '', //物料号
        "weight": null, //商品毛重
        "skuStatus": 1,// sku 状态,1:有效;0:无效
        "weightUnit": 'g',
        skuUnit: null
      }];
      this.itemPulishVO.categoryAttributes = '';
      this.itemPulishVO.brandId = null;
      this.itemPulishVO.weightUnit = null;
      this.itemPulishVO.itemSkuPictureVoList = [];
      this.setState({
        brandSelectStatus: Math.random(),
        clearAll: true,
        saleMessageData: [{
          key: 0,
          message: '',
          ifstop: false,
          Model: '',
          Number: '',
          Code: '',
          Weight: null,
          weightUnit: 'g',
          attributes: null,
          skuUnit: null
        }]
      });
      this.saleMessageData = [{
        key: 0,
        message: '',
        ifstop: false,
        Model: '',
        Number: '',
        Code: '',
        Weight: null,
        weightUnit: 'g',
        attributes: null,
        skuUnit: null
      }];
      this.init = true;
      this.props.uploadPrams(this.itemPulishVO);
      return false;
    } else {
    }
    if (!value.ifHasLeaf) {
      this.firstCid = null;
      this.itemPulishVO.cid = null;
      this.props.clearAllData();
      this.props.clearData();
      this.setState({
        brandSelectStatus: Math.random(),
        clearAll: true,
        saleMessageData: [{
          key: 0,
          message: '',
          ifstop: false,
          Model: '',
          Number: '',
          Code: '',
          Weight: null,
          weightUnit: 'g',
          attributes: null,
          skuUnit: null
        }]
      });
      this.saleMessageData = [{
        key: 0,
        message: '',
        ifstop: false,
        Model: '',
        Number: '',
        Code: '',
        Weight: null,
        weightUnit: 'g',
        attributes: null,
        skuUnit: null
      }];
      this.init = true;
      this.firstCid = null;
      this.itemPulishVO.cid = null;
      this.itemPulishVO.itemSkuVoList = [{//最后的SKU信息
        "platformId": 2,
        "sellerId": -1,
        "shopId": -1,
        "attributes": null,
        "modelCode": '',//商品型号
        "barCode": '',//商品条形码
        "productCode": '', //物料号
        "weight": null, //商品毛重
        "skuStatus": 1,// sku 状态,1:有效;0:无效
        "weightUnit": 'g',
        skuUnit: null
      }];
      this.itemPulishVO.itemSkuPictureVoList = [];
      this.itemPulishVO.categoryAttributes = '';
      this.itemPulishVO.brandId = null;
      this.itemPulishVO.weightUnit = null;
      this.props.uploadPrams(this.itemPulishVO);
      return false;
    } else {
    }
    this.setState({
      clearAll: false
    });
    this.selectCid = value.cid;
    this.firstCid = value.cid;
    if ((this.firstCid == this.secondCid) && (this.firstCid != '') && (this.secondCid != '')) {
      this.setState({
        error: true,
        errorMSG: '平台分类与第二分类选择不能相同'
      });
      message.error('平台分类与第二分类选择不能相同');
    } else {
      this.itemPulishVO.cid = value.cid;
      this.props.uploadPrams(this.itemPulishVO);
      this.setState({
        error: false
      });
    }//平台分类
    let param = {
      // platformId: 2,
      cid: value.cid,
      shopId: -1
    };
    let param2 = {
      cid: value.cid,
      itemId: this.props.itemId,
      shopId: -1
    }
    this.props.getSaleInfo(param);
    this.props.getBrandInfo(param);
    this.props.getUnitInfo(param).then(
      (result) => {
        this.setState({
          key: Math.random(),
          saleMessage: this.state.saleMessage
        });
      },
      (error) => {
      }
    );
    let secondParam = {
      cId: value.cid
    };
    this.props.findCategory(param2);
    //清空标签所有状态start
    this.props.getIndustryInfo(secondParam).then(
      (result) => {
        this.setState({
          labels: []
        });
        this.itemPulishVO.industryLabel = null;
        this.props.uploadPrams(this.itemPulishVO);
      }
    );
    //清空标签所有状态end
    this.props.brandSearchByCid({
      platformId: this.platformId,
      categoryId: this.selectCid,
    });
    this.init = true;
    this.setState({
      saleMessageData: [{
        key: 0,
        message: '',
        ifstop: false,
        Model: '',
        Number: '',
        Code: '',
        Weight: null,
        weightUnit: 'g',
        attributes: null,
        skuUnit: null
      }], //销售信息表格,
      selectCid: value.cid
    });
    this.setState({
      brandSelectStatus: Math.random()
    });
  }

  handleSecondCategoryChange(value) { //更改第二分类
    if (!value.ifHasLeaf) {
      this.secondCid = null;
      this.itemPulishVO.secondCid = null;
      return false;
    }
    this.secondCid = value.cid;
    if ((this.firstCid == this.secondCid) && (this.firstCid != '') && (this.secondCid != '')) {
      this.setState({
        error: true,
        errorMSG: '平台分类与第二分类选择不能相同'
      });
      //this.errorMSG = '平台分类与第二分类选择不能相同';
      //this.info();
      message.error('平台分类与第二分类选择不能相同');
    } else {
      this.itemPulishVO.secondCid = value.cid;
      this.props.uploadPrams(this.itemPulishVO);
      this.setState({
        error: false
      });

    }
  }

  handleBrandSelectChange(brandId,brandName) {
    // console.log('-----------选择了品牌')
    // console.log(brandId);
    // console.log(brandName);
    this.itemPulishVO.brandId = brandId;
    if (!brandId) {
      this.itemPulishVO.brandName = '';
    }
    if (brandName){
      this.itemPulishVO.brandName = brandName;
    }
    this.props.uploadPrams(this.itemPulishVO);
    if (brandId == -1) {
      this.setState({
        ifAddBrand: true
      });
    } else {
      this.setState({
        ifAddBrand: false
      });
    }
  }

  changePlace(e) {//地名
    this.itemPulishVO.origin = e.target.value;
    this.props.uploadPrams(this.itemPulishVO);
  }

  changeOperators(value) {
    this.itemPulishVO.operatorId = value;
    this.props.uploadPrams(this.itemPulishVO);
    this.props.changeOperators(value);
  }

  componentWillMount() {
    if (!this.props.editGoods) {
      this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    }
  }

  changeBrandCh=(e)=>{  //中文品牌名称校验
    let value = e.target.value;
    let reg = /^[\u4e00-\u9fa5]+$/
    if(value && !reg.test(value[0])){
      console.log('请输入中文名称')
      this.setState({
        ifBrandNameCh : false
      })
    } else {
      this.setState({
        ifBrandNameCh : true
      })
    }
  }

  changeBrandEn=(e)=>{  //英文品牌名称校验
    let value = e.target.value;
    let reg = /^[^\u4e00-\u9fa5]+$/;
    if(value && !reg.test(value)){
      console.log('请输入英文名称')
      this.setState({
        ifBrandNameEn : false
      })
    } else {
      this.setState({
        ifBrandNameEn : true
      })
    }
  }

  addBrandCh=(e)=> { //新添加的中文品牌
    if(this.state.ifBrandNameCh){
      let value = e.target.value;
      this.itemPulishVO.brandNameCh = value;
      this.itemPulishVO.brandId = -1;
      this.props.uploadPrams(this.itemPulishVO);
    }
  }

  addBrandEn=(e)=> { //新添加的英文品牌
    if(this.state.ifBrandNameEn){
      let value = e.target.value;
      this.itemPulishVO.brandNameEn = value;
      this.itemPulishVO.brandId = -1;
      this.props.uploadPrams(this.itemPulishVO);
    }
  }

  oneValue(id) { //编辑回显的时候至少一个值被选中
    let selected = false;
    let ifContinue = false;
    let publicIndex = -1;
    this.checkedCount.map((item, index) => {
      item.map((selectedItem, selectedIndex) => {
        if (id == selectedItem.attrValueId) {
          selected = true;
          publicIndex = index;
        }
      });
    });
    if (!selected) {
      return false;
    }
    if (this.props.editGoods) {
      if (this.initCheckOptions) {
        this.checkedCount.map((item, index) => {
          if (item.length > 0) {
            this.initCheckOptionsArray.push(index);
          }
        });
        this.initCheckOptions = false;
      }
      //this.initCheckOptionsArray.map((item,index) => {
      this.checkedCount = this.removeEmptyArrayEle(this.checkedCount);
      if (this.checkedCount[publicIndex].length <= 1) {
        message.error('至少要选择一个属性值');
        ifContinue = true;
      }
      //});
    }
    return ifContinue;
  }

  removeEmptyArrayEle(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (!arr[i] || (arr[i] == [])) {
        arr.splice(i, 1);
        i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
        // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
      }
    }
    return arr;
  };

  /**
   * @param {array} [] [销售信息表]
   * @return  array
   * description: 回显数据
   */
  echoInfo(preData, nextData) {
    let saleMessageData = JSON.parse(JSON.stringify(nextData));
    preData.map((item, index) => { //初始化销售信息下面的数据
      saleMessageData.map((saleItem, saleIndex) => {
        let editSkuAttributes = null; //判断当前编辑状态的属性名是否是多个
        let saleSkuAttributes = null; //判断当前自动生成的属性名是否是多个
        let ifSame = true; //默认为一致
        //如果都为多个进行对比 回显过来的跟目前是否一致
        if (item.attributes && saleMessageData[saleIndex].attributes && item.attributes.indexOf(';') != -1 && saleMessageData[saleIndex].attributes.indexOf(';') != -1) {
          editSkuAttributes = item.attributes.split(';');
          saleSkuAttributes = saleMessageData[saleIndex].attributes.split(';');
          if (editSkuAttributes.length == saleSkuAttributes.length) {
            editSkuAttributes.map((editItem, editIndex) => {
              //遍历拿回来的属性值是否跟目前属性完全一致
              if (ifSame) {
                if (saleSkuAttributes.indexOf(editItem) != -1) {
                  ifSame = true;
                } else {
                  ifSame = false;
                }
              }
            });
          } else {
            ifSame = false;
          }
        } else {
          if (item.attributes == saleMessageData[saleIndex].attributes) {
            ifSame = true;
          } else {
            ifSame = false;
          }
        }
        if (ifSame) {
          saleMessageData[saleIndex].Model = item.modelCode;
          saleMessageData[saleIndex].Code = item.barCode;
          saleMessageData[saleIndex].Number = item.productCode;
          saleMessageData[saleIndex].Weight = item.weight;
          saleMessageData[saleIndex].skuUnit = item.skuUnit ? item.skuUnit : null;
          saleMessageData[saleIndex].weightUnit = item.weightUnit ? item.weightUnit : null;
          this.ifdis = true; //未勾选有数据时
          if (item.weightUnit) {
            saleMessageData[saleIndex].weightUnit = item.weightUnit;
          } else {
            saleMessageData[saleIndex].weightUnit = 'g';
          }
          if (item.skuStatus || (item.skuStatus == 0)) {
            if (+item.skuStatus == 1) {
              saleMessageData[saleIndex].ifstop = false;
            } else {
              saleMessageData[saleIndex].ifstop = true;
            }
          } else {
            saleMessageData[saleIndex].ifstop = false;
          }
          saleMessageData[saleIndex].ifHaveValue = true;
        } else {
        }
      });
    });
    return saleMessageData;
  }

  detailCacheParams(data) {
    let params = [];
    if (data && data.length) {
      params = data.map((item, index) => {
        return item.attributes
      });
    } else {
    }
    let param = {
      keys: JSON.stringify(params)
    };
    return param;
  }

  detailBasicTable(data) {
    let basic = [];
    if (data && data.length) {
      basic = data.map((item, index) => {
        return item ? JSON.parse(item) : item;
      });
    } else {
    }
    return basic;
  }

  detailSkuIndex(data, newData) {
    if (data && data.length && newData && newData.length) {
      newData.map((newItem, newIndex) => {
        data.map((item, index) => {
          if (item.attributes == newItem.attributes) {
            newItem.index = item.index;
          } else {
          }
        });
      });
    } else {
    }
    let compare = function (property) {
      return function (obj1, obj2) {
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;     // 升序
        //return value2 - value1;
      }
    }
    newData = newData.sort(compare('index'));
    newData.map((item, index) => {
      item.key = index;
    });
    return newData;
  }

  onChange(e, val) {
    //判断他选了多少行start
    let sameAttr = false;
    let findId;
    let ifcheckInit = true;
    let saleifchecked;
    let parentId = null;
    if (val) {
      findId = val;
    } else {
      findId = e.target.attrId;
      ifcheckInit = e.target.checked;
      parentId = e.target.parentId;
    }
    let count = 0;
    this.checkedCount = [];
    let ifHas = false;
    // 判断一共有多少组数据被点中start
    this.initSaleData.map((item, index) => {
      this.checkedCount[index] = [];
      item.platformCategoryAttributeValues.map((item2, index2) => {
        if (item2.ifchecked == true) {
          this.checkedCount[index].push(item.platformCategoryAttributeValues[index2]);
        } else {
        }
      });
    });
    // 判断一共有多少组数据被点中end
    if (+this.props.type !== 1) {
      let ifContinue = this.oneValue(findId);
      if (ifContinue) {
        return false;
      } else {
      }
    } else {
    }
    this.props.checkedId(findId, ifcheckInit, parentId);
    //判断当前选中元素位置
    this.initSaleData.map((item2, index2) => {
      item2.platformCategoryAttributeValues.map((item3, index3) => {
        if (item3.attrValueId == findId) {
          if (this.checkedCount[index2].length >= 1) {
            ifHas = true;
          } else {
            ifHas = false;
          }
        } else {
        }
      });
    });
    //end
    if (this.checkedCount.length > 0) {
      this.checkedCount.map((item, index) => {
        if (+item.length >= 1) {
          //判断当前选中元素位置
          count += 1;
        } else {
        }
      });
      if (count >= 3 && !ifHas && !this.init) {
        this.setState({
          error: true,
          errorMSG: '只能选择三种属性信息'
        });
        if (e) {
          message.error('只能选择三种属性信息');
        } else {
        }
        return false;
      }
    }
    //判断他选了多少行end
    this.initSaleData.map((item, index1) => {
      item.platformCategoryAttributeValues.map((item, index2) => {
        if (item.attrValueId == findId) {
          sameAttr = true;
          saleifchecked = !this.saleData[index1].value[index2].props.checked;
          this.saleData[index1].value[index2] = (
            <Checkbox attrId={item.attrValueId} parentId={item.attrId} checked={saleifchecked}
                      onChange={::this.onChange}> {item.attrValueName} </Checkbox>);
          this.initSaleData[index1].platformCategoryAttributeValues[index2].ifchecked = saleifchecked;
          this.initSaleData[index1].platformCategoryAttributeValues[index2].salechecked = true;
        } else {
        }
      });
    });
    //再重新获取一下新数组
    this.initSaleData.map((item, index) => {
      this.checkedCount[index] = [];
      item.platformCategoryAttributeValues.map((item2, index2) => {
        if (item2.ifchecked == true) {
          this.checkedCount[index].push(item.platformCategoryAttributeValues[index2]);
        } else {
        }
      });
    });
    //销售信息表格
    let saleMSG = [];
    this.checkedCount.map((item, index) => {
      if (item.length >= 1) {
        saleMSG.push(item);
      } else {
      }
    });
    this.saleMessageData = [];
    let attrIDs = [];
    let x = 0;
    let y = 0;
    let z = 0;
    if (saleMSG.length >= 1) {
      saleMSG[0].map((item, index) => {
        if (saleMSG.length >= 2) {
          saleMSG[1].map((item2, index2) => {
            if (saleMSG.length >= 3) {
              saleMSG[2].map((item3, index3) => {
                this.saleMessageData.push({
                  key: z++,
                  message: (item.attrValueName + ' ' + item2.attrValueName + ' ' + item3.attrValueName),
                  ifstop: false,
                  Model: '',
                  Number: '',
                  Code: '',
                  Weight: null,
                  weightUnit: 'g',
                  skuUnit: null,
                  attributes: item.attrId + ":" + item.attrValueId + ';' + item2.attrId + ":" + item2.attrValueId + ';' + item3.attrId + ":" + item3.attrValueId + ';',
                  //action: <span style = {{cursor: 'pointer'}} key = {z } onClick = {() => {this.changeStatus(z);}}>启动</span>
                });
                //attrIDs.push(item.attrValueId+ ' ' + item2.attrValueId + ' ' + item3.attrValueId);
                attrIDs.push({//最后的SKU信息
                  "platformId": 2,
                  "sellerId": -1,
                  "shopId": -1,
                  "attributes": item.attrId + ":" + item.attrValueId + ';' + item2.attrId + ":" + item2.attrValueId + ';' + item3.attrId + ":" + item3.attrValueId + ';',
                  "modelCode": '',//商品型号
                  "barCode": '',//商品条形码
                  "productCode": '', //物料号
                  "weight": null, //商品毛重
                  "skuStatus": 1,// sku 状态,1:有效;0:无效
                  skuUnit: null,
                  "weightUnit": 'g'
                });
              });
            } else {
              this.saleMessageData.push({
                key: y++,
                message: (item.attrValueName + ' ' + item2.attrValueName),
                ifstop: false,
                Model: '',
                Number: '',
                Code: '',
                Weight: null,
                weightUnit: 'g',
                skuUnit: null,
                attributes: item.attrId + ":" + item.attrValueId + ';' + item2.attrId + ":" + item2.attrValueId + ';',

                //action: <span style = {{cursor: 'pointer'}} key = {y} onClick = {() => {this.changeStatus(y);}}>启动</span>
              });
              //attrIDs.push(item.attrValueId+ ' ' + item2.attrValueId );
              attrIDs.push({//最后的SKU信息
                "platformId": 2,
                "sellerId": -1,
                "shopId": -1,
                "attributes": item.attrId + ":" + item.attrValueId + ';' + item2.attrId + ":" + item2.attrValueId + ';',
                "modelCode": '',//商品型号
                "barCode": '',//商品条形码
                "productCode": '', //物料号
                "weight": null, //商品毛重
                "skuStatus": 1,// sku 状态,1:有效;0:无效
                "weightUnit": 'g',
                skuUnit: null,
              });
            }
          });
        } else {
          this.saleMessageData.push({
            key: x++,
            message: (item.attrValueName),
            ifstop: false,
            Model: '',
            Number: '',
            Code: '',
            Weight: null,
            weightUnit: 'g',
            attributes: item.attrId + ":" + item.attrValueId + ';',
            skuUnit: null,
            //action: <span style = {{cursor: 'pointer'}} key = {x} onClick = {() => {this.changeStatus(x);}}>启动</span>
          });
          attrIDs.push({//最后的SKU信息
            "platformId": 2,
            "sellerId": -1,
            "shopId": -1,
            "attributes": item.attrId + ":" + item.attrValueId + ';',
            "modelCode": '',//商品型号
            "barCode": '',//商品条形码
            "productCode": '', //物料号
            "weight": null, //商品毛重
            "skuStatus": 1,// sku 状态,1:有效;0:无效
            "weightUnit": 'g',
            skuUnit: null,
          });
        }
      });
    } else {
      attrIDs = [{//最后的SKU信息
        "platformId": 2,
        "sellerId": -1,
        "shopId": -1,
        "attributes": null,
        "modelCode": '',//商品型号
        "barCode": '',//商品条形码
        "productCode": '', //物料号
        "weight": null, //商品毛重
        "skuStatus": null,// sku 状态,1:有效;0:无效
        "weightUnit": 'g',
        skuUnit: null,
      }];
      this.saleMessageData = [{
        key: 0,
        message: '',
        ifstop: false,
        Model: '',
        Number: '',
        Code: '',
        Weight: null,
        weightUnit: 'g',
        attributes: null,
        skuUnit: null,
      }];
    }
    //将类目属性值传参过去start
    if (!this.props.editGoods) {
      this.itemPulishVO.itemSkuVoList = attrIDs;
    } else {
      if (e) {
        this.itemPulishVO.itemSkuVoList = attrIDs;
      }
    }
    let saleMessageDataEcho = [];
    let cacheParams = this.detailCacheParams(attrIDs);
    //无销售属性时直接从回显接口获取数据
    if(attrIDs.length==1 && attrIDs[0].attributes==null){
      console.log('无销售属性商品')
    } else {//有销售属性时通过缓存接口获取数据
      this.props.getCacheTable(cacheParams).then(
        (result) => {
          if (+result.code === 0) {
            let basicTable = this.detailBasicTable(result.data);
            saleMessageDataEcho = this.echoInfo(basicTable, this.saleMessageData);
            let detailSkuData = null;
            detailSkuData = this.detailSkuData(this.itemPulishVO.itemSkuVoList, basicTable);
            this.itemPulishVO.itemSkuVoList = detailSkuData;
            this.props.uploadPrams(this.itemPulishVO);
            if (!e) {
              if (this.itemPulishVO.itemSkuVoList && this.itemPulishVO.itemSkuVoList.length) {
                this.itemPulishVO.itemSkuVoList.map((SKUitem, SKUindex) => {
                  SKUitem.index = SKUindex;
                });
                saleMessageDataEcho = this.detailSkuIndex(this.itemPulishVO.itemSkuVoList, saleMessageDataEcho);
                this.saleMSGIndex = false;
              }
            }
            if (!e) {
              saleMessageDataEcho = this.detailSkuIndex(this.itemPulishVO.itemSkuVoList, saleMessageDataEcho);
            }
            /*this.setState({
            saleMessageData: saleMessageDataEcho
            });*/
            this.detailCacheData(this.itemPulishVO.itemSkuVoList);
            setTimeout(() => {
              this.setState({saleMessageData: saleMessageDataEcho});
            }, 0);
            this.props.uploadSaleMessage(saleMessageDataEcho, true);
          } else {
            console.log('销售信息表格更新出错！');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    let checkedString = '';
    let saleStringAttr = '';
    this.initSaleData.map((item, index) => {
      item.platformCategoryAttributeValues.map((item2, index2) => {
        if (item2.ifchecked === true) {
          let text = '';
          if (item.text) {
            text = item.text
          } else {
            text = '';
          }
          checkedString += (item2.attrId + ':' + item2.attrValueId + ':' + text + ';');
          saleStringAttr += (item2.attrId + ':' + item2.attrValueId + ';');
        }
      });
    });
    this.itemPulishVO.attributes = saleStringAttr;
    this.props.uploadPrams(this.itemPulishVO);
    //将类目属性值传参过去end
    //let saleMessageDataEcho = [];
    this.setState({
      saleData: this.saleData,
    });
    this.props.postSaleInfo(this.initSaleData);
    this.step4 = true;
    this.init = false;
    /*if(e){
     this.itemPulishVO.itemSkuVoList = this.handleSaleData(saleMessageDataEcho, attrIDs);
     if(this.itemPulishVO.itemSkuVoList && this.itemPulishVO.itemSkuVoList.length){
     this.itemPulishVO.itemSkuVoList.map((item,index)=>{
     if(item && item.attributes){
     let specArray= item.attributes.split(';');
     let specArr = [];
     specArray && specArray.length && specArray.map((specitem, specindex) => {
     specitem = specitem.split(':');
     if(specitem[1]){
     specArr = specArr.concat(specitem[0] + ':' +  specitem[1] + ':;');
     }else{}
     });
     if(!item.specAttributes){
     if(specArr && specArr.length){
     specArr.map((item, index) => {
     if(item.indexOf(';') == -1){
     item.specAttributes += (item+';');
     }else{}
     });
     }else{}
     }else{}
     }else{}
     });
     }else{}
     this.props.uploadPrams(this.itemPulishVO);
     this.detailCacheData(this.itemPulishVO.itemSkuVoList);
     }else{}*/
  }

  detailSkuData(preData, nextData) {
    preData.map((attrItem, attrIndex) => {
      nextData.map((item, index) => {
        if (attrItem.attributes == item.attributes) {
          attrItem.modelCode = item.modelCode;
          attrItem.barCode = item.barCode;
          attrItem.productCode = item.productCode;
          attrItem.weight = item.weight;
          attrItem.skuUnit = item.skuUnit;
          attrItem.specAttributes = item.specAttributes;
          attrItem.weightUnit = item.weightUnit;
          attrItem.skuStatus = item.skuStatus;
        }
      });
    });
    return preData;
  }

  /**
   * @param {array} [] [数据给值]
   * @return  array
   * description: 处理提交给后台的回显数据
   */
  handleSaleData(data, attrData) {
    attrData.map((attrItem, attrIndex) => {
      data.map((item, index) => {
        if (attrItem.attributes == item.attributes) {
          attrItem.modelCode = item.Model;
          attrItem.barCode = item.Code;
          attrItem.productCode = item.Number;
          attrItem.weight = item.Weight;
          attrItem.skuUnit = item.skuUnit;
          attrItem.weightUnit = item.weightUnit;
          attrItem.skuStatus = item.ifstop ? 0 : 1;
        }
      });
    });
    return attrData;
  }

  initData(data, checkedList = [], ifbrand) {
    //let checkedList = JSON.parse(checkedList);
    let saleDataValue = [];
    this.detailData = [];
    let ifchecked = false;
    data.map((item, index) => {
      item.platformCategoryAttributeValues.map((item1, index1) => {

        if (checkedList.length > 0 && checkedList !== undefined && checkedList !== null) { //传过来的数据
          checkedList.map((itemlist, index2) => { //遍历第条
            let keys = [];
            for (var key in itemlist) {
              keys.push(key);
            }
            let firstindex = keys[0];
            if (itemlist[firstindex] !== undefined && itemlist[firstindex] !== null) {
              itemlist[firstindex].map((item2, index3) => { //遍历每条里面的数据每个选项
                if ((+item1.attrValueId) == (+item2) && (+item1.attrId) == (+keys[0])) {
                  data[index].platformCategoryAttributeValues[index1].ifchecked = true;
                  return;
                }
              });
            }
          });
        }
      });
    });
    data.map((itemParent, index) => {
      saleDataValue = [];
      let ifcheck = false;
      itemParent.platformCategoryAttributeValues.map((item, index) => {
        if (item.ifchecked) {
          ifcheck = true;
        }
      });
      itemParent.platformCategoryAttributeValues.map((item, index) => {
        if (ifbrand) {
          saleDataValue.push(<Checkbox attrId={item.attrValueId} parentId={item.attrId} checked={item.ifchecked}
                                       onChange={(e) => {
                                         this.onChangeBrand(e);
                                       }}> {item.attrValueName} </Checkbox>);
        } else {
          saleDataValue.push(<Checkbox parentId={item.attrId}
                                       disabled={this.props.editGoods && !ifcheck && this.props.type != 1}
                                       attrId={item.attrValueId} checked={item.ifchecked} onChange={(e) => {
            this.onChange(e);
          }}> {item.attrValueName} </Checkbox>);
        }
      });
      this.detailData.push({
        key: index,
        name: itemParent.attrName,
        value: saleDataValue,
      });
    });
    if (ifbrand) {
      this.initBrandData = data;
    }
  }

  require(record, index) {
    this.setState({
      currentIndex: index
    }, () => {
      this.setState({
        index: index
      });
    });
  }

  getOptions(data) {
    const options = data.map((item, index) => {
      return (<Option value={item}> {item} </Option>);
    });
    return options;
  }

  getOptionsOperator(data) {
    let options = [];
    if (data.length > 0) {
      options = data.map((item, index) => {
        return (<Option value={item.id} id={item.id}> {item.username} </Option>);
      });
    }
    return options;
  }

  info() {
    Modal.info({
      title: '',
      content: (
        <div>
          <p>{this.errorMSG}</p>
        </div>
      ),
      onOk() {
      },
    });
  }

  changeIndustry(val, e) {
    let params = '';
    if (this.itemPulishVO.industryLabel) {
      this.checkedParams = this.itemPulishVO.industryLabel.split(';');
      this.checkedParams.map((item, index) => {
        if (item == "") {
          this.checkedParams.splice(index, 1);
        }
      });
    } else {
      this.checkedParams = [];
    }
    this.checkedParams.map((item, index) => {

      this.checkedParams[index] = +item;
    });
    if (e.target.checked) {
      this.checkedParams.push(val);
    } else {
      let index = this.checkedParams.indexOf(val);
      if (index != -1) {
        this.checkedParams.splice(index, 1);
      }
    }
    if (this.checkedParams.length > 0) {
      this.checkedParams.map((item, index) => {
        params += (item + ';');
      });
    }
    this.itemPulishVO.industryLabel = params;
    this.props.uploadPrams(this.itemPulishVO);
  }

  onChangeIndustry(value) {
    this.setState({
      labels: value
    });
    let params = '';
    if (value.length > 0) {
      value.map((item, index) => {
        params += (item + ';');
      });
    }
    this.itemPulishVO.industryLabel = params;
    this.props.uploadPrams(this.itemPulishVO);
  }

  industry() {
    if (!this.props.editGoods) {
      if (this.props.goodsRlease && this.props.goodsRlease.industryData && this.props.goodsRlease.industryData.data) {
        this.industryData = this.props.goodsRlease.industryData.data;
        if (this.industryData.length > 0) {
          let cheks = [];
          cheks = this.industryData.map((item, index) => {
            //return <Checkbox value={item.id}>{item.tagName}</Checkbox>
            if (+item.tagStatus !== -1) {
              return <Checkbox defaultChecked={false} value={item.id}
                               onChange={(e) => this.changeIndustry(item.id, e)}>{item.tagName}</Checkbox>;
            }
          });
          this.options = cheks;
        } else {
          this.options = [];
        }
      } else {
        this.options = [];
      }
    } else {
      if (this.props.editGoods && this.props.goodsEdit && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.allIndustryLabel && this.initindustry) {
        this.industryData = this.props.goodsEdit.editGoods.allIndustryLabel;
        this.labels = [];
        if (this.props.goodsEdit.editGoods.industryLabel && this.props.goodsEdit.editGoods.industryLabel != '') {
          this.labels = this.props.goodsEdit.editGoods.industryLabel.split(';');
          if (this.labels.length > 0) {
            this.labels.map((item, index) => {
              this.labels[index] = +item;
            });
          }
        } else {
          this.options = [];
        }
        if (this.industryData.length > 0) {
          let checks2 = [];
          checks2 = this.industryData.map((item, index) => {
            let ifcheck = false;
            if (this.labels.indexOf(item.id) != -1) {
              ifcheck = true;
            }
            if (+item.tagStatus !== -1 || ifcheck) {
              return <Checkbox defaultChecked={ifcheck} disabled={+item.tagStatus == -1 } value={item.id}
                               onChange={(e) => this.changeIndustry(item.id, e)}>{item.tagName}</Checkbox>;
            }
          });
          this.options = checks2;
          this.editChecks = checks2;
        } else {
          this.options = [];
        }
        this.initindustry = false;
      } else {
        if (this.props.goodsRlease && this.props.goodsRlease.industryData && this.props.goodsRlease.industryData.data) {
          this.industryData = this.props.goodsRlease.industryData.data;
          if (this.industryData.length > 0) {
            let checks3 = [];
            checks3 = this.industryData.map((item, index) => {
              //return <Checkbox value={item.id}>{item.tagName}</Checkbox>
              return <Checkbox defaultChecked={false} value={item.id}
                               onChange={(e) => this.changeIndustry(item.id, e)}>{item.tagName}</Checkbox>;
            });
            this.options = checks3;

          } else {
            this.options = [];
          }
        }
      }
    }
    //this.setState({options: this.options});
  }

  //是否可以生成最后信息
  allStep() { //满足所有条件后方可渲染数据
    if ((this.step3 && this.step1 && this.step4) || this.initd) {
      //let saleMessageData = [...this.state.saleMessageData];
      let saleMessageData = [];
      if (this.state.saleMessageData.length > this.saleMessageData.length) {
        saleMessageData = this.state.saleMessageData;
      } else {
        saleMessageData = this.saleMessageData;
      }
      if (this.props.goodsEdit.editGoods
        && this.props.goodsEdit.editGoods.itemSkuVoList
        && this.props.goodsEdit.editGoods.itemSkuVoList.length > 0
      ) {
        this.props.goodsEdit.editGoods.itemSkuVoList.map((item, index) => { //初始化销售信息下面的数据
          saleMessageData.map((saleItem, saleIndex) => {
            let editSkuAttributes = null; //判断当前编辑状态的属性名是否是多个
            let saleSkuAttributes = null; //判断当前自动生成的属性名是否是多个
            let ifSame = true; //默认为一致
            //如果都为多个进行对比 回显过来的跟目前是否一致
            if (item.attributes && saleMessageData[saleIndex].attributes && item.attributes.indexOf(';') != -1 && saleMessageData[saleIndex].attributes.indexOf(';') != -1) {
              editSkuAttributes = item.attributes.split(';');
              saleSkuAttributes = saleMessageData[saleIndex].attributes.split(';');
              if (editSkuAttributes.length == saleSkuAttributes.length) {
                editSkuAttributes.map((editItem, editIndex) => {
                  //遍历拿回来的属性值是否跟目前属性完全一致
                  if (ifSame) {
                    if (saleSkuAttributes.indexOf(editItem) != -1) {
                      ifSame = true;
                    } else {
                      ifSame = false;
                    }
                  }
                });
              } else {
                ifSame = false;
              }
            } else {
              if (item.attributes == saleMessageData[saleIndex].attributes) {
                ifSame = true;
              } else {
                ifSame = false;
              }
            }
            if (ifSame) {
              saleMessageData[saleIndex].Model = item.modelCode;
              saleMessageData[saleIndex].Number = item.productCode;
              saleMessageData[saleIndex].Code = item.barCode;
              saleMessageData[saleIndex].Weight = item.weight;
              saleMessageData[saleIndex].skuUnit = item.skuUnit;
              this.ifdis = true; //未勾选有数据时
              if (item.weightUnit) {
                saleMessageData[saleIndex].weightUnit = item.weightUnit;
              } else {
                saleMessageData[saleIndex].weightUnit = 'g';
              }
              if (item.skuStatus || (item.skuStatus == 0)) {
                if (+item.skuStatus == 1) {
                  saleMessageData[saleIndex].ifstop = false;
                } else {
                  saleMessageData[saleIndex].ifstop = true;
                }
              } else {
                saleMessageData[saleIndex].ifstop = false;
              }
              saleMessageData[saleIndex].ifHaveValue = true;
            }
          });
        });
      }
      if (saleMessageData && saleMessageData.length && saleMessageData.length > 1) {
        saleMessageData.map((dataItem, dataIndex) => {
          if (!dataItem.ifHaveValue) {
            dataItem.ifstop = true;
          }
        });
      }
      this.saleMessageData = saleMessageData;
      let indexSaleMessageData = this.detailSkuIndex(this.itemPulishVO.itemSkuVoList, saleMessageData);
      setTimeout(() => {
        this.setState({saleMessageData: indexSaleMessageData});
      }, 0);
    }
  }

  //勾选渠道
  chooseChannel=(value)=>{
    console.log(value)
    let channelArr = value;
    if(value.indexOf(1)!=-1){
      let newArr = channelArr.concat([2,3,4,5]);
      channelArr = newArr;
    } else {
      if(value.indexOf(2)!=-1) {
        channelArr.splice(value.indexOf(2),1)
        channelArr.splice(value.indexOf(3),1)
        channelArr.splice(value.indexOf(4),1)
        channelArr.splice(value.indexOf(5),1)
      }
    }
    this.itemPulishVO.channelArr = channelArr;
    this.props.uploadPrams(this.itemPulishVO);
    if(value.length>0){
      this.channel = false;
    } else {
      this.channel = true;
    }
  }

  render() {
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    if (this.saleData.length > 0 && this.firstCheck) {
      this.onChange(null, '213');
      this.step1 = true;
      this.step2 = true;
      this.allStep();
      this.firstCheck = false;
    }
    let newlist = [];
    let newlist2 = [];
    if (this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.id != undefined && this.props.goodsEdit.editGoods != null && this.props.goodsEdit.editGoods != undefined) {
      this.checkedList = [];
      if (this.initd) {
        this.editData = JSON.parse(JSON.stringify(this.props.goodsEdit.editGoods));
        this.step3 = true;
        this.allStep();
        this.setState({
          ifhavedata: true,
        }, () => {
          this.setState({ifhavedata2: true});
        });
        this.initd = false;
      }
      newlist = JSON.parse(JSON.stringify(this.props.goodsEdit.editGoods.attributesCheck));
      newlist2 = JSON.parse(JSON.stringify(this.props.goodsEdit.editGoods.categoryAttributesCheck));
      if (newlist !== null && newlist !== undefined) {
        this.checkedList = [];
        newlist.map((item, index) => {
          this.checkedList.push({
            [item.key]: []
          });
          if (typeof item.values === 'object') {
            item.values.map((item2, index2) => {
              this.checkedList[index][item.key].push(item2);
            });
          }
        });
      }
      if (newlist2 !== null && newlist2 !== undefined) {
        this.checkedList2 = [];
        newlist2.map((item, index) => {
          this.checkedList2.push({
            [item.key]: []
          });
          if (typeof item.values === 'object' && item.values) {
            item.values.map((item2, index2) => {
              this.checkedList2[index][item.key].push(item2);
            });
          }
        });
      }
    }
    if (this.init) {
      if (this.props.goodsRlease.saleData && this.props.goodsRlease.saleData.length > 0 && this.props.goodsRlease.saleloaded) {
        this.initSaleData = JSON.parse(JSON.stringify(this.props.goodsRlease.saleData));
        this.initData(this.initSaleData, this.checkedList);
        this.saleData = this.detailData;
        if (this.saleData.length > 0) {
          this.onChange(null, '213');
        }
        this.step1 = true;
        this.allStep();
      } else {
        this.saleData = [];
      }
    }
    //第一次进来时把所有参数进行初始化
    if (this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.itemName && this.firstLoad) {

      this.itemPulishVO = JSON.parse(JSON.stringify(this.props.goodsEdit.editGoods));
      this.props.uploadPrams(this.itemPulishVO);
      this.firstLoad = false;
      this.initCid = this.props.goodsEdit.editGoods.cid;
    }
    this.props.goodsRlease && this.props.goodsRlease.industryData && this.props.goodsRlease.industryData.data && this.industry()
    this.props.editGoods && this.props.goodsEdit && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.allIndustryLabel && this.industry()
    return (
      <div id='goodsRlease' className={styles.basic + ' ' + "ui-container ui-platform"}
           style={{borderBottom: '1px solid #e9e9e9', paddingBottom: '20px', background: 'white'}}>
        <strong className={styles.strongstyle1}>基本信息</strong>
        <div className={styles.outDiv5}>
          <label htmlFor="" className={styles.la}><i className={styles.istyle}>*</i>商品名称：</label>
          {!this.props.editGoods && <Input size="large" className={styles.inputname1} maxLength="100" placeholder="输入名称"
                                           onBlur={::this.changeGoodsName}/>}
          {this.props.editGoods && this.props.goodsEdit.editGoods && (this.props.goodsEdit.editGoods.itemName || this.props.goodsEdit.editGoods.itemName == '') &&
          <Input size="large" className={styles.inputname1} maxLength="100" placeholder="输入名称"
                 defaultValue={this.props.goodsEdit.editGoods.itemName} onBlur={::this.changeGoodsName}/>}
        </div>
        {this.name && <p style={{marginLeft: '83px', color: '#f04134'}}>商品名称不能为空</p>}
        <div className={styles.outDiv}>
          <label htmlFor="" className={styles.la}><i className={styles.istyle}>*</i>平台分类：</label>
          {!this.props.editGoods && <Provider store={this.store1}>
            <CategoryCascade ifCategory={(val) => this.ifCategory(val)} isShowAllCategory={true}
                             className={styles.inputname}
                             onChangeCategoryValue={(value) => this.handleCategoryChange(value)}></CategoryCascade>
          </Provider>}
          {this.props.editGoods && <Provider store={this.store1}>
            <CategoryCascade eidt={true} first={true && (this.props.type != 1)} isShowAllCategory={true}
                             categoryEdit={this.props.editGoods}
                             categoryData={this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.cNames}
                             className={styles.inputname}
                             onChangeCategoryValue={(value) => this.handleCategoryChange(value)}></CategoryCascade>
          </Provider>}
        </div>
        <div className={styles.outDiv30}>
          <label htmlFor="" className={styles.la}>第二分类：</label>
          {!(this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.secondCNames) &&
          <Provider store={this.store2}>
            <CategoryCascade isShowAllCategory={true} className={styles.inputname}
                             onChangeCategoryValue={(value) => this.handleSecondCategoryChange(value)}></CategoryCascade>
          </Provider>}
          {this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.secondCNames &&
          <Provider store={this.store2}>
            <CategoryCascade isShowAllCategory={true} categoryEdit={this.props.editGoods}
                             categoryData={this.props.editGoods && this.props.goodsEdit.editGoods.secondCNames}
                             className={styles.inputname}
                             onChangeCategoryValue={(value) => this.handleSecondCategoryChange(value)}></CategoryCascade>
          </Provider>}
        </div>
        <div className={styles.outDiv31 + ' ' + styles.mt15}>
          <div className={styles.fl + ' ' + styles.brand}>
            <div>
              <label htmlFor="" className={styles.la}>品牌：</label>
              {!this.props.editGoods && <BrandSelect goods={true}
                                                     goodsBrand={this.props.brandSelect && this.props.brandSelect.data && this.props.brandSelect.data.data}
                                                     brandSelectData={this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.brandName}
                                                     gcid={this.state.selectCid}
                                                     brandId2={this.props.goodsRlease && this.props.goodsRlease.itemPulishVO && this.props.goodsRlease.itemPulishVO.brandId}
                                                     brandName={this.props.goodsRlease && this.props.goodsRlease.itemPulishVO && this.props.goodsRlease.itemPulishVO.brandName}
                                                     style={{float: 'left'}}
                                                     className={styles.inputname}
                                                     onChangeBrandValue={(brandId,brandName)=>this.handleBrandSelectChange(brandId,brandName)}
                                                     key={this.state.brandSelectStatus}
                                                     edit={true}
                                                     clearAll={this.state.clearAll}
                                                     itemId={this.props.itemId}>
              </BrandSelect>}
              {this.props.editGoods
              && this.props.editGoods
              && this.props.brandSelect.data
              && (this.props.brandSelect.data || this.props.brandSelect.data.data.length >= 0)
              && this.props.brandSelect
              && this.props.brandSelect.data
              && this.props.brandSelect.data.data
              && <BrandSelect goods={true}
                              itemId={this.props.itemId}
                              goodsBrand={this.props.brandSelect && this.props.brandSelect.data && this.props.brandSelect.data.data}
                              brandSelectData={this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.brandName}
                              gcid={this.state.selectCid}
                              brandId2={this.props.goodsRlease && this.props.goodsRlease.itemPulishVO && this.props.goodsRlease.itemPulishVO.brandId}
                              brandName={this.props.goodsRlease && this.props.goodsRlease.itemPulishVO && this.props.goodsRlease.itemPulishVO.brandName}
                              style={{float: 'left'}}
                              className={styles.inputname}
                              onChangeBrandValue={(brandId,brandName) => this.handleBrandSelectChange(brandId,brandName)} edit={true}>
              </BrandSelect>}
              {this.props.editGoods
              && this.props.editGoods
              && this.props.brandSelect.data
              && (this.props.brandSelect.data.data == null || this.props.brandSelect.data.data == 'null')
              && <BrandSelect goods={true}
                              itemId={this.props.itemId}
                              goodsBrand={this.props.brandSelect && this.props.brandSelect.data && this.props.brandSelect.data.data}
                              gcid={this.state.selectCid}
                              style={{float: 'left'}}
                              className={styles.inputname}
                              onChangeBrandValue={(brandId,brandName) => this.handleBrandSelectChange(brandId,brandName)}>
              </BrandSelect>}
              {this.state.ifAddBrand &&
                <div style={{marginLeft: "70px", marginTop: "20px", width: "550px"}}>
                  <label>中文名称：</label>
                  <Input placeholder="输入品牌中文名称" size='large' onChange={this.changeBrandCh} onBlur={this.addBrandCh} style={{width: '120px', marginRight: '20px'}}/>
                  <label>英文名称：</label>
                  <Input placeholder="输入品牌英文名称" size='large' onChange={this.changeBrandEn} onBlur={this.addBrandEn} style={{width: '120px'}}/>
                </div>}
                {this.state.ifAddBrand && (!this.state.ifBrandNameCh || !this.state.ifBrandNameEn) &&
                  <div className="brand_warning_box" >
                    {!this.state.ifBrandNameCh?<span className="brand_warning brand_ch" >请输入中文品牌</span>:<span className="brand_ch" ></span>}
                    {!this.state.ifBrandNameEn?<span className="brand_warning" >请输入英文品牌</span>:null}
                  </div>}
            </div>
          </div>
        </div>
        <div className={styles.outDiv50}>
          <label htmlFor="" className={styles.la}>产地：</label>
          {
            !this.props.editGoods &&
            <Input size="large" className={styles.inputname1} placeholder="请输入产地" maxLength="100" size="large"
                   onBlur={::this.changePlace}/>}
          {this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.origin &&
          <Input size="large" placeholder="请输入产地" className={styles.inputname1}
                 defaultValue={this.props.goodsEdit.editGoods.origin} maxLength="100" size="large"
                 onBlur={::this.changePlace}/>}
          {this.props.editGoods && this.props.goodsEdit.editGoods && !this.props.goodsEdit.editGoods.origin &&
          <Input size="large" className={styles.inputname1} placeholder="请输入产地" maxLength="100" size="large"
                 onBlur={::this.changePlace}/>}
        </div>
        <div className={styles.outDivCheck}>
          <label htmlFor="" className={styles.la}><i style={{color: '#f04134'}}>*</i>适用渠道：</label>
          {this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.channelArr && this.props.goodsEdit.editGoods.channelArr.length>0?
            <CheckboxGroup onChange={this.chooseChannel} defaultValue={this.props.goodsEdit.editGoods.channelArr}>
              {/*<Checkbox value='1'>APP</Checkbox>
              <Checkbox value='2'>H5商城</Checkbox>
              <Checkbox value='3'>微信商城</Checkbox>
              <Checkbox value='4'>小程序</Checkbox>
              <Checkbox value='5'>银行APP</Checkbox>*/}
              <Checkbox value={1}>移动端</Checkbox>
              <Checkbox value={6}>PC端</Checkbox>
            </CheckboxGroup>:null}
          {!this.props.editGoods?
            <CheckboxGroup onChange={this.chooseChannel} defaultValue={this.defaultChannelValue}>
              {/*<Checkbox value='1'>APP</Checkbox>
              <Checkbox value='2'>H5商城</Checkbox>
              <Checkbox value='3'>微信商城</Checkbox>
              <Checkbox value='4'>小程序</Checkbox>
              <Checkbox value='5'>银行APP</Checkbox>*/}
              <Checkbox value={1}>移动端</Checkbox>
              <Checkbox value={6}>PC端</Checkbox>
            </CheckboxGroup>:null}
        </div>
        {this.channel && <p style={{marginLeft: '83px', color: '#f04134'}}>适用渠道不能为空</p>}
        <div className={styles.outDivlabel}>
          <label htmlFor="" className={styles.la}>行业标签：</label>
          {this.options}
        </div>
        <strong className={styles.strongstyle}>销售规格</strong>
        <Table loading={this.props.goodsRlease.saleloading} className={styles.tablestyle } columns={ this.saleColumns}
               dataSource={this.init ? this.saleData : this.state.saleData} pagination={false}/>
        <strong className={styles.strongstyle}>销售信息</strong>
        {this.state.saleMessageData.length >= 1
        && this.state.saleMessageData[0].attributes
        && (<div><Button onClick={::this.allSeletct} className={styles.buttonStyle}>全选</Button>
          <Button onClick={::this.notSeletct} className={styles.buttonStyle}>反选</Button>
          <Button onClick={::this.batchStop} className={styles.buttonStyle}>批量停用</Button>
          <Button onClick={::this.batchStart} className={styles.buttonStyle}>批量启用</Button></div>)}
        {this.state.saleMessageData
        && this.state.saleMessageData.length >= 1
        && this.state.saleMessageData[0].attributes
        && <Table key={this.state.key} rowSelection={this.rowSelection} onRowClick={::this.require}
                  className={styles.tablestyle} columns={this.saleMessage} dataSource={this.state.saleMessageData}
                  pagination={false}/>}
        {+this.state.saleMessageData.length === 1
        && !this.state.saleMessageData[0].attributes
        && !this.ifdis
        && <Table key={this.state.key} onRowClick={::this.require} className={styles.tablestyle}
                  columns={this.initSaleMessage} dataSource={this.initSaleMessageData} pagination={false}/>}
        {this.state.saleMessageData.length >= 1
        && !this.state.saleMessageData[0].attributes
        && this.ifdis
        && <Table key={this.state.key} onRowClick={::this.require} className={styles.tablestyle}
                  columns={this.initSaleMessage} dataSource={this.state.saleMessageData} pagination={false}/>}
        <strong className={styles.strongstyle}>管理员信息</strong>
        <label htmlFor="" className={styles.la}>商品发布：</label>
        {this.props.goodsRlease.publisher && this.props.goodsRlease.publisher.data && this.props.goodsRlease.publisher.data.username &&
        <Select size='large' defaultValue={this.props.goodsRlease.publisher.data.username} className={styles.inputname}
                placeholder="请选择">
          <Option value="20">{this.props.goodsRlease.publisher.data.username}</Option>
        </Select>}
        <label htmlFor="" className={styles.la} style={{marginLeft: '20px'}}><i
          style={{color: '#f04134'}}>*</i>商品运营：</label>
        {!this.props.editGoods &&
        <Select size='large' className={styles.inputname} placeholder="请选择" onChange={::this.changeOperators}>
          {this.props.goodsRlease.operators && this.getOptionsOperator(this.props.goodsRlease.operators)}
        </Select>}
        {this.props.editGoods
        && this.props.goodsEdit.editGoods
        && this.props.goodsEdit.editGoods.operatorId
        && this.props.goodsRlease
        && this.props.goodsRlease.operators
        && this.props.goodsRlease.operators.length > 0
        &&
        <Select size='large' className={styles.inputname} defaultValue={this.props.goodsEdit.editGoods.operatorId}
                placeholder="请选择" onChange={::this.changeOperators}>
          {this.props.goodsRlease.operators && this.getOptionsOperator(this.props.goodsRlease.operators)}
        </Select>}
        {this.props.editGoods
        && this.props.goodsEdit.editGoods
        && (this.props.goodsEdit.editGoods.operatorId == null || this.props.goodsEdit.editGoods.operatorId == 'null')
        &&
        <Select size='large' className={styles.inputname} placeholder="请选择" onChange={::this.changeOperators}>
          {this.props.goodsRlease.operators && this.getOptionsOperator(this.props.goodsRlease.operators)}
        </Select>}
      </div>
    )
  }
}
