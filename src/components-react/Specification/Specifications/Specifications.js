/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:specification
 ****************************************************************/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Layout, Breadcrumb, Table, Button, Modal, Icon, Popconfirm, Input, Radio ,InputNumber, message} from 'jdcloudui';
import SpecificationsSearch from '../../Specification/SpecificationSearch/SpecificationSearch';
import SpecificationFuncWrapper from '../../Specification/SpecificationFuncWrapper/SpecificationFuncWrapper';
//权限
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';
import {FuncPermission}  from 'jdcloudecc/components';

import * as speciAction from '../../../modules/specifications/Container/redux';
import './loading.css';
const { Header, Sider, Content} = Layout;
const RadioGroup = Radio.Group;
import styles2 from '../../../modules/specifications/Container/style/Specifications.less';
@connect(
  state => ({
    Specifications: state.specifications,
    specificationSearch: state.specificationSearch,
    funcPermissions: state.funcPermissions
  }),
  //权限
  dispatch => bindActionCreators({...speciAction, getPlatformFuncPermission}, dispatch)
)
export default class Specifications extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ifEdit: true,
      value: 1,
      visible: false,
      currentRecord: {},
      currentIndex: 0,
      saveData: {}, // 初始数据
      inputAttrName: '',
      inputIndex: '',
      optionStatus: 0,
      optionSaleAttr: 0,
      optionCategoryAttr: 0,
      optionExtendAttr: 0,
      optionselectType: 0,
      updown: true,
      backSu: false, //请求是否回调
      disableCategoryAttr: false,
      disableSelect: false,
      searchCid: null,
      disLoadingForEdit: false,
      specListLoading: false,
      specModalSubmitLoading:false
    };
    this.state.specificationsSearch = this;
    this.currentIndex2 = 0;
    this.columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: '属性名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '',
      key: 'action',
      width: 100,
      render: (record) => (// (text, record) <a href="#" onClick = { ()=>{alert('这是个啥');} }>查看</a>
        <span>
          <i onClick = {()=>{this.top(record);}}><Icon type="zhiding" className={styles2.icon}/></i>
          <i onClick = {()=>{this.toBottom(record);}}><Icon type="zhidi" className={styles2.icon}/></i>
          <i onClick = {()=>{this.down(record);}}><Icon type="xiayi" className={styles2.icon}/></i>
          <i onClick = {()=>{this.up(record);}}><Icon type="shangyi" className={styles2.icon}/></i>
        </span>
      ),
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    }, {
      title: '销售属性',
      dataIndex: 'saleProp',
      key: 'saleProp',
    }, {
      title: '类目属性',
      dataIndex: 'classProp',
      key: 'classProp',
    }, {
      title: '扩展属性',
      dataIndex: 'extendProp',
      key: 'extendProp',
    }, {
      title: '操作',
      key: 'action2',
      render: (record) => {// (text, record) <a href="#" onClick = { ()=>{alert('这是个啥');} }>查看</a>
        return (
          <span>
            <FuncPermission codes = {this.props.funcPermissions && this.props.funcPermissions.data && this.props.funcPermissions.data.data} code = 'lookProperty'>
              <span type="primary" className={styles2.cli} style = {{marginRight: '16px'}} onClick = {()=>{ this.dis(record);}}>查看</span>
            </FuncPermission>
            <FuncPermission codes = {this.props.funcPermissions && this.props.funcPermissions.data && this.props.funcPermissions.data.data} code = 'editProperty'>
              <span type="primary" className={styles2.cli} onClick = {()=>{this.edit(record); }}>编辑</span>
            </FuncPermission>
        </span>
        )
      },
      width: '9%'
    }, {
      title: '',
      dataIndex: 'ifStop',
      key: 'ifStop',
    }];
    this.columns2 = [{
      title: '属性值',
      dataIndex: 'propValue',
      key: 'propValue',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }];
    this.state.data = [];
    this.state.listAllData = [];//当前属性列表所有数据
    this.listData = [];
    this.disData = [];//查看显示数据
    this.attrData = {};//当前属性值
    this.initData = {};
    this.exampledata = [];
    this.ifMove = true; //是否再更新表单
    this.editRecord = {};
    this.userAttrData = []; //用户属性集合
    this.editData = [];
    this.displaied = false;
    this.codesResponse = [];
    this.optionSaleAttr = 0;
    this.optionCategoryAttr = 0;
    this.optionExtendAttr = 0;
  }
  top(record) {
    const currentIndex = this.listData.indexOf(record);
    if (+currentIndex === 0 || +this.listData.length === 1) {
      return false;
    }
    let param = {
      platformId: this.exampledata[currentIndex].platformId, //  平台 id
      sortType: '3', // 升序、降序类型(1.上移 2.下移)
      cid: this.state.searchCid,
      attrId: this.exampledata[currentIndex].attrId, // 主键ID
      sort: currentIndex+1 //序号
    }
    this.props.topBttom(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
  }
  toBottom(record) {
    const currentIndex = this.listData.indexOf(record);
    if(+this.listData.length === 1) {
      return false;
    }
    let param = {
      platformId: this.exampledata[currentIndex].platformId, //  平台 id
      sortType: '4', // 升序、降序类型(1.上移 2.下移)
      attrId: this.exampledata[currentIndex].attrId, // 主键ID
      sort: currentIndex+1, //序号
      cid: this.state.searchCid,
    }
    this.props.topBttom(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
  }
  down(record) {
    const currentIndex = this.listData.indexOf(record);
    if(+this.listData.length === 1) {
      return false;
    }
    let param = {
      platformId: this.exampledata[currentIndex].platformId, //  平台 id
      sortType: '2', // 升序、降序类型(1.上移 2.下移)
      attrId: this.exampledata[currentIndex].attrId, // 主键ID
      sort: currentIndex+1, //序号
      cid: this.state.searchCid,
    }
    this.props.move(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
  }
  up(record) {
    const currentIndex = this.listData.indexOf(record);
    if(+this.listData.length === 1) {
      return false;
    }
    let param = {
      platformId: this.exampledata[currentIndex].platformId, //  平台 id
      sortType: '1', // 升序、降序类型(1.上移 2.下移)
      attrId: this.exampledata[currentIndex].attrId, // 主键ID
      sort: currentIndex+1, //序号
      cid: this.state.searchCid,
    }
    this.props.move(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
  }
  // 停用
  st() {
    let state = 0;
    if(this.exampledata[this.state.currentIndex].status == 0){
      state = 1;
    }else{
       state = 0;
    }
    let param = {
      platformId: this.exampledata[this.state.currentIndex].platformId, //  平台 id
      attrId: this.exampledata[this.state.currentIndex].attrId, // 属性id
      cid: this.state.searchCid,// 类目id
      state:  state
    }
    this.props.stopUse(param).then(
      (result)=>{
        this.refreshView();
      },
      (error)=>{}
    );
  }
  //编辑状态start
  top2(record, ev) {
    //const currentIndex2 = this.currentIndex2;
    const currentIndex2 = this.editData.indexOf(record);
    if(+this.editData.length <= 1 || +currentIndex2 == 0) {
      return false;
    }
    let data2 = [...this.editData];
    data2.unshift(data2.splice(currentIndex2, 1)[0]);
    this.initData.platformCategoryAttributeValues.unshift(this.initData.platformCategoryAttributeValues.splice(currentIndex2, 1)[0]);
    this.editData = data2;
    this.setState({ data2 });
    ev.preventDefault();
    ev.stopPropagation();
  }
  toBottom2(record, ev) {
    const currentIndex2 = this.editData.indexOf(record);
    if(+this.editData.length <= 1 || +currentIndex2 == +this.editData.length - 1) {
      return false;
    }
    let data2 = [...this.editData];
    data2.push(data2.splice(currentIndex2, 1)[0]);
    this.initData.platformCategoryAttributeValues.push( this.initData.platformCategoryAttributeValues.splice(currentIndex2, 1)[0]);
    this.editData = data2;
    this.setState({ data2 });
    ev.preventDefault();
    ev.stopPropagation();
  }
  down2(record, ev) {
    const currentIndex2 = this.editData.indexOf(record);
    if(+this.editData.length <= 1 || +currentIndex2 == +this.editData.length - 1) {
      return false;
    }
    [this.initData.platformCategoryAttributeValues[currentIndex2], this.initData.platformCategoryAttributeValues[currentIndex2+1]] = [this.initData.platformCategoryAttributeValues[currentIndex2+1], this.initData.platformCategoryAttributeValues[currentIndex2]];
    [this.editData[currentIndex2], this.editData[currentIndex2+1]] = [this.editData[currentIndex2+1], this.editData[currentIndex2]];
    this.setState({ data2 : this.editData });
    ev.preventDefault();
    ev.stopPropagation();
  }
  up2(record, ev) {
    //const currentIndex2 = this.currentIndex2;
    const currentIndex2 = this.editData.indexOf(record);
    if(+this.editData.length <= 1 || +currentIndex2 == 0) {
      return false;
    }
    [this.initData.platformCategoryAttributeValues[currentIndex2], this.initData.platformCategoryAttributeValues[currentIndex2-1]] = [this.initData.platformCategoryAttributeValues[currentIndex2-1], this.initData.platformCategoryAttributeValues[currentIndex2]];
    [this.editData[currentIndex2], this.editData[currentIndex2-1]] = [this.editData[currentIndex2-1], this.editData[currentIndex2]];
    this.setState({
      data2 : this.editData,
      ifEdit: false });
    ev.preventDefault();
    ev.stopPropagation();
  }
  deleteData(record) {
    let attrId = record.attrId ? record.attrId : null;
    let attrValueId = record.attrId ? record.attrValueId : null;
    let cid = this.state.searchCid ? this.state.searchCid : null;
    let param = {
      attrValueId: attrValueId,
      attrId: attrId,
      cid: cid,
    };
    if(!attrId && !attrValueId && !record.cid){
      const currentIndex2 = this.editData.indexOf(record);
      let data2 = [...this.editData];
      data2.splice(currentIndex2, 1);
      this.initData.platformCategoryAttributeValues.splice(currentIndex2, 1);
      this.editData = data2;
      this.setState({ data2 });
      return false;
    }else{}
    this.props.ifDelete(param).then(
      (result)=>{
        if(result.code == 0){
            if(result.data){
                const currentIndex2 = this.editData.indexOf(record);
                let data2 = [...this.editData];
                data2.splice(currentIndex2, 1);
                this.initData.platformCategoryAttributeValues.splice(currentIndex2, 1);
                this.editData = data2;
                this.setState({ data2 });
            }else{
              typeof document !== 'undefined' && message.error('当前属性值已关键商品，无法删除');
            }
        }else{
          typeof document !== 'undefined' && message.error('查询是否删除接口出错');
        }
      },
      (error)=>{
        typeof document !== 'undefined' && message.error('查询是否删除接口出错');
      }
      );

  }
  addAttr(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let data = {
      key: (+this.editData.length).toString(),
      propValue: <Input  defaultValue = {' '} onChange={(e) => {this.change(this.editData.length, e)}} />,
      status: (<RadioGroup onChange={(e)=>this.attrChange(this.editData.length,e)} defaultValue={1}>
        <Radio value={1}>启用</Radio>
        <Radio value={0}>停用</Radio>
      </RadioGroup>)
    }
    let dataInit = {
      key: (+this.editData.length).toString(),
      attrValueName: ' ',
      status: 1,
      sortNumber: (+this.editData.length + 1).toString(),
      platformId: this.initData.platformId,
    }
    this.editData.push(data);
    if(this.initData && this.initData.platformCategoryAttributeValues){
      this.initData.platformCategoryAttributeValues.push(dataInit);
    }else{}
    this.setState({ data2: this.editData },()=>{
      this.handleCancel();
      this.setState({ visible: true });
    });
  }
  change(index, e){
    this.initData.platformCategoryAttributeValues[index].attrValueName = e.target.value;
  }
  attrChange(index,e) {

    this.initData.platformCategoryAttributeValues[index].status = e.target.value;
  }
  //编辑状态end
  onChangeStatus(ev,iftrue) {

    let val = null;
    if(iftrue){
      val = ev;
    }else{
      val = ev.target.value;
    }
    if(+val == 1){
      this.state.currentRecord.state= '有效';
    } else {
      this.state.currentRecord.state = '无效';
    }
    this.setState({
      optionStatus: val,
    });
  }
  onChangeSaleAttr(ev, iftrue) {
    let val = null;
    if(iftrue){
      val = ev;
    }else{
      val = ev.target.value;
    }
    if(+val == 1){
      this.state.currentRecord.ifCheck= '是';
      this.state.currentRecord.saleProp= '是';
    } else {
      this.state.currentRecord.saleProp = '否';
    }
    if (val === 1){
      this.setState({
        optionSaleAttr: val,
        disableSelect:true,
        optionselectType: 1,
      });
      this.optionSaleAttr =  val;
      //this.optionCategoryAttr = 0;
      //this.optionExtendAttr = 0;
    }else{
      this.setState({
        optionSaleAttr: val
      });
      this.optionSaleAttr =  val;
      if(+val === 0 && +this.optionCategoryAttr === 0 && +this.optionExtendAttr === 0) {
        this.setState({
          disableSelect: false
        });
      }
    }
  }
  onChangeCategoryAttr(ev, iftrue) {

    let val = null;
    if(iftrue){
      val = ev;
    }else{
      val = ev.target.value;
    }
    if(+val == 1){
      this.state.currentRecord.ifCheck= '是';
      this.state.currentRecord.classProp = '是';
    } else {
      this.state.currentRecord.classProp = '否';
    }
    if (+val === 1){
      this.setState({
        optionCategoryAttr: val,
        optionselectType: 1,
        disableSelect:true,
        //disableSelect: true
      });
    //this.optionSaleAttr = 0;
    this.optionCategoryAttr = val;
    //this.optionExtendAttr = 0;
    }else{
      this.state.currentRecord.extendProp  = '否';
      this.setState({
        optionCategoryAttr: val,
        optionExtendAttr: 0,
      });
      //this.optionSaleAttr = 0;
      this.optionCategoryAttr = val;
      this.optionExtendAttr = 0;
      if(+this.optionSaleAttr === 0 && +val === 0 && +this.optionExtendAttr === 0) {
        this.setState({
          disableSelect: false
        });
      }
    }
  }
  onChangeExtendAttr(ev, iftrue) {

    let val = null;
    if(iftrue){
      val = ev;
    }else{
      val = ev.target.value;
    }
    if (+val === 1){
      this.state.currentRecord.classProp = '是';
      this.state.currentRecord.ifCheck= '是';
      this.setState({
        optionExtendAttr: val,
        optionCategoryAttr: 1,
        optionselectType: 1,
        //disableCategoryAttr: true,
        disableSelect: true,
      });
      //this.optionSaleAttr = 0;
      this.optionCategoryAttr = 1;
      this.optionExtendAttr = val;
    }else{
      this.setState({
        optionExtendAttr: val,
      });
      //this.optionSaleAttr = 0;
      //this.optionCategoryAttr = 0;
      this.optionExtendAttr = val;
      if(+val === 0) {
        this.setState({
          disableCategoryAttr: false,
        });
        if(+this.optionSaleAttr === 0 && +this.optionCategoryAttr === 0 && +val === 0){
          this.setState({
            disableSelect: false,
          });
        }
      }
    }
    if(+val == 1){
      this.state.currentRecord.extendProp= '是';
    } else {
      this.state.currentRecord.extendProp = '否';
    }
  }
  onChangeSelectType(ev, iftrue) {
    let val = null;
    if(iftrue){
      val = ev;
    }else{
      val = ev.target.value;
    }

    if(+val == 1){
      this.state.currentRecord.ifCheck= '是';
    } else {
      this.state.currentRecord.ifCheck = '否';
    }
    this.setState({
      optionselectType: val,
    });
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  isRepeat(arr){
    let rowLen = arr.length;
    let setData = new Set(arr);
    let newLen = [...setData].length;
    if(rowLen!=newLen){
      return true;
    }else{
      return false;
    }
  }
  Trim(str,is_global)    //去除字符串空格
        {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g,"");
            if(is_global.toLowerCase()=="g")
            {
                result = result.replace(/\s/g,"");
             }
            return result;
    }
  handleOk() {

    this.setState({specModalSubmitLoading:true});
    this.ifMove = true;
    this.initData.attrName = encodeURI(this.state.inputAttrName);
    this.initData.sortNumber = this.state.currentRecord.key;
    this.initData.status = this.state.optionStatus;
    this.initData.hasSaleAttr = this.state.optionSaleAttr;
    this.initData.hasCategoryAttr = this.state.optionCategoryAttr;
    this.initData.hasExtendAttr = this.state.optionExtendAttr;
    this.initData.selectType = this.state.optionselectType;
    this.initData.cid = this.state.searchCid;
    this.setState({
      loading: true,
     });
    let attrValueName = [];
    let ifHaveName = false;
    this.initData.platformCategoryAttributeValues.map((item, index) => {
      // this.initData.platformCategoryAttributeValues[index].attrValueName = this.Trim(item.attrValueName,'g');
      this.initData.platformCategoryAttributeValues[index].attrValueName = encodeURI(item.attrValueName.trim());
        if(item.attrValueName == null || item.attrValueName == '' || item.attrValueName == ' '){
            ifHaveName = true;
        }else{}
        attrValueName.push(item.attrValueName);
    });
    let ifRepeat = this.isRepeat(attrValueName);
    let message1 = '属性值不能重复';
    let message2 = '属性值不能为空';
    if(ifRepeat){
      this.info(message1);
      this.setState({specModalSubmitLoading:false});
      this.initData.platformCategoryAttributeValues.map((item, index) => {
        this.initData.platformCategoryAttributeValues[index].attrValueName = decodeURI(item.attrValueName.trim());
      });
      return false;
    }else{}
    if(ifHaveName){
      this.info(message2);
      this.setState({specModalSubmitLoading:false});
      this.initData.platformCategoryAttributeValues.map((item, index) => {
        this.initData.platformCategoryAttributeValues[index].attrValueName = decodeURI(item.attrValueName.trim());
      });
      return false;
    }else{}

    let param = {
      platformId: this.initData.platformId, //  平台 id
      platformCategoryAttribute: this.initData
    }

    this.props.saveEdit(param).then(
      (result)=>{
        if(+result.code === 0){
          this.refreshView();
        }else{
          if(result.msg){
            message.error(result.msg);
          }else{
            message.error('保存属性信息失败');
          }
        }
        this.setState({specModalSubmitLoading:false});
      },
      (error)=>{
        message.error('保存属性信息失败');
        this.setState({specModalSubmitLoading:false});
      }
    );
    /*setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);*/
    this.displaied = false;
    this.setState({
      visible: false,
     });
  }
  //查看
  dis(record) {
    console.log(record)
    this.displaied = true;
    this.editRecord = record;
    const currentIndex = this.listData.indexOf(record);

    if (this.props.specificationSearch.data.result.data[+currentIndex]) {
      const {attrId } = this.props.specificationSearch.data.result.data[+currentIndex];
      let param = {
        // platformId: platformId,//  平台 id
        attrId: attrId,// 属性id
        cid: this.state.searchCid //类目id
      }
      console.log(param,this.state.searchCid)
     this.setState({
      disLoadingForEdit: true
    });
      this.props.edit(param).then(
        (result)=>{
          this.disInit();

          this.setState({
            backSu: true,
            inputIndex: this.exampledata[currentIndex].sortNumber,
            inputAttrName: this.exampledata[currentIndex].attrName,
            disLoadingForEdit: false
          });
          this.onChangeStatus(this.exampledata[currentIndex].status, 1);
          this.onChangeSaleAttr(this.exampledata[currentIndex].hasSaleAttr, 1);
          this.onChangeCategoryAttr(this.exampledata[currentIndex].hasCategoryAttr, 1);
          this.onChangeExtendAttr(this.exampledata[currentIndex].hasExtendAttr, 1);
          this.onChangeSelectType(this.exampledata[currentIndex].selectType, 1);
        },
        (error)=>{
          message.error('获取属性信息失败');
          this.setState({
            disLoadingForEdit: false
          });
        }
      );
      this.setState({ifEdit: true, visible: true});
    }
    else {
      return false;
    }
    Object.assign(this.state.currentRecord, record);
    this.columns2 = [{
      title: '属性值',
      dataIndex: 'propValue',
      key: 'propValue',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }];
    this.setState({data2: this.disData});
  }
  //编辑
  edit(record) {
    Object.assign(this.state.currentRecord, record);
    const editR = record ? record : this.editRecord;
    if (!this.displaied) {
      this.editData = [];
    }
    else {}
    this.dis(editR);
    this.setState({
      ifEdit: false
    });
    this.columns2 = [{
      title: '属性值',
      dataIndex: 'propValue',
      key: 'propValue',
      width:90
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width:70
    },  {
      title: '',
      key: 'action',
      width: 110,
      render: (record) => (// (text, record) <a href="#" onClick = { ()=>{alert('这是个啥');} }>查看</a>
        <span>
              <i onClick = {(e)=>{this.top2(record, e);}}><Icon type="zhiding" className={styles2.icon}/></i>
              <i onClick = {(e)=>{this.toBottom2(record, e);}}><Icon type="zhidi" className={styles2.icon}/></i>
              <i onClick = {(e)=>{this.down2(record, e);}}><Icon type="xiayi" className={styles2.icon}/></i>
              <i onClick = {(e)=>{this.up2(record, e);}}><Icon type="shangyi" className={styles2.icon}/></i>
        </span>
      ),
    },
      {
        title: '编辑',
        key: 'edit',
        render: (text, record, index) => {
          return (
            <FuncPermission codes = {this.props.funcPermissions && this.props.funcPermissions.data && this.props.funcPermissions.data.data} code = 'editDelAttribute'>
              <Popconfirm title="确认删除么?" onConfirm = {()=>{this.deleteData(record);}}>
                <a href="#">删除</a>
              </Popconfirm>
            </FuncPermission>
          );
        }
      }];
  }
  handleCancel() {
    this.setState({ visible: false });
    this.ifMove = true;
    this.displaied = false;
  }
  onCellChange = (index, key) => {
    return (value) => {
      const data2 = [...this.state.listAllData];
      data2[index][key] = value;
      this.setState({ data2 });
    };
  }
  require(record, index) {
    this.setState({currentIndex: index});
  }
  require2(record, index) {
    this.currentIndex2 = index;
  }
  inputAttrName(e){
    this.setState({
      inputAttrName: e.target.value
    });
    this.state.currentRecord.name = e.target.value;
  }
  inputIndex(e){

    this.setState({inputIndex: e});
    this.state.currentRecord.key = e;
  }
  childComponentCallback(_this){
    this.setState({
      specificationsSearch : _this
    });
  }
  refreshView() {
    this.state.specificationsSearch.resetSubmit();
  }
  disInit() {
    let exampledata2 = {};
    exampledata2 = this.props.Specifications.editData.result;
    this.attrData = exampledata2.data;
    this.disData = [];
    this.editData = [];
    Object.assign(this.initData, this.props.Specifications.editData.result.data);
    if(this.initData.platformCategoryAttributeValues){
      this.initData.platformCategoryAttributeValues.map((item, index)=>{
        this.disData.push({
          attrId: item.attrId,
          attrValueId: item.attrValueId,
          cid: item.cid,
          key: (index + 1).toString(),
          propValue: item.attrValueName,
          status: +item.status === 1? '启用': '停用'
        })
        this.editData.push({
          attrId: item.attrId,
          attrValueId: item.attrValueId,
          cid: item.cid,
          key: (index + 1).toString(),
          propValue: <Input  defaultValue = {item.attrValueName} onChange={(e) => {this.change(index, e);}} style={{width:'80px'}}/>,
          status: (<RadioGroup  onChange={(e)=>this.attrChange(index,e)} defaultValue={item.status}>
            <Radio value={1}>启用</Radio>
            <Radio value={0}>停用</Radio>
          </RadioGroup>)
        })
      })
    }
    this.ifMove = false;
  }
  listDataInit() {

    this.exampledata =  [];
    this.exampledata = this.props.specificationSearch.data.result.data;
    let newData = [...this.exampledata];
    this.listData = [];
    this.exampledata.map((item, index)=>{
      this.listData.push({
        key: (index + 1).toString(),
        name: newData[index].attrName,
        state: !newData[index].status ? (<span  style={{color:'#e36068'}}>无效</span>): (<span  style={{color:'#81b644'}}>有效</span>),
        saleProp: +newData[index].hasSaleAttr === 1 ? '是': '否',
        classProp: +newData[index].hasCategoryAttr === 1 ? '是': '否',
        extendProp: +newData[index].hasExtendAttr === 1 ? '是': '否',
        ifCheck: +newData[index].selectType === 1 ? '是': '否',
        ifStop: !newData[index].status ?
            (<FuncPermission codes = {this.props.funcPermissions && this.props.funcPermissions.data && this.props.funcPermissions.data.data} code = 'openProperty'>
              <Popconfirm title="确认启用么?" onConfirm = {()=>{this.st();}}>
                <a href="#">启用</a>
              </Popconfirm>
            </FuncPermission>
            ):
             <FuncPermission codes = {this.props.funcPermissions && this.props.funcPermissions.data && this.props.funcPermissions.data.data} code = 'stopProperty'>
               <Popconfirm title="确认停用么?" onConfirm = {()=>{this.st();}}>
                <a href="#">停用</a>
                </Popconfirm>
             </FuncPermission>

      })
    })
  }
  info(msg) {
    Modal.info({
      title: msg,
      content: (
        <div>
        </div>
      ),
      onOk() {},
    });
  }
  componentWillMount(){
    this.props.getPlatformFuncPermission().then(
        (result)=>{
          if(+result.code === 0){
            this.codesResponse = result.data;
          }else{
            typeof document !== 'undefined' && message.error('获取权限列表失败');
          }
        },
        (error)=>{
          typeof document !== 'undefined' && message.error('获取权限列表失败');
        }
      );
  }
  getCid(val){
   console.log('val')
    this.setState({
      searchCid: val
    });
  }
  changeListStatus(val){

    this.setState({
      specListLoading: val
    });
  }
  render() {
    console.log(this.state.searchCid)
    let { ifEdit } = this.state;
    if (this.props.specificationSearch.loaded) {
      this.listDataInit();
    }
    if (this.props.Specifications.loaded && this.ifMove && this.props.Specifications.editData) {
      this.disInit();
    }
    return (
      <div className={'ui-container' + ' ' + 'ui-platform'}>
        <div className="ui-breadcrumb">
          <Breadcrumb >
            <Breadcrumb.Item >首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>规格参数管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
          <div className="ui-ct">
            <div className="ui-hd">规格参数管理</div>
             <div className="ui-bd">
                <SpecificationsSearch childComponentCallback = {this.childComponentCallback.bind(this)} getCid = {(val) => this.getCid(val)} callbackstatus = {(val)=>{this.changeListStatus(val)}}/>
                <SpecificationFuncWrapper searchCid = {this.state.searchCid} platformId="2" onSearch={this.refreshView.bind(this)} codesResponse = {this.props.funcPermissions && this.props.funcPermissions.data && this.props.funcPermissions.data.data}></SpecificationFuncWrapper>
                {/*author: haungxiao,此处onSearch，S为大写！！！*/}
                <div style = {{ background: '#fff', minHeight: 280 }}>
                  <Table loading={this.state.specListLoading} className = {'ui-tbl'} columns = {this.columns} dataSource = {this.listData} pagination = {false} onRowClick = {::this.require}/>
                </div>
              </div>
          </div>
        <Modal className={"ui-platform" + ' ' + 'specModal'}
          maskClosable={false}
          style = {{minWidth: '600px'}}
          visible={this.state.visible}
          title="编辑属性"
          onCancel={this.handleCancel.bind(this)}
          footer={[
            !ifEdit && (<Button key="submit" type="primary" size="large"  loading={this.state.specModalSubmitLoading}  onClick={this.handleOk.bind(this)} >
              保存
            </Button>),
            !ifEdit && <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
            ifEdit && (<Button key="submit" type="primary" size="large" onClick={()=>{this.edit();}}>编辑</Button>),
            ifEdit && (<Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>关闭</Button>),
          ]}
        >
          <Layout style = {{background: 'white'}}>
            <Sider style = {{background: 'white',float: 'left'}}>
              <ul className={styles2.fontcolor}>
                <li>属性信息</li>
                <li className={styles2.attrli}><span  className={styles2.attrname}>属性名称：</span>
                  {ifEdit ?
                    (<span>{this.state.currentRecord.name}</span>)
                    : (<Input
                              onChange={::this.inputAttrName}
                              value={this.state.currentRecord.name}
                              defaultValue = {this.state.currentRecord.name}
                              style={{"width":"100px"}}
                      />
                    )
                  }
                </li>
                <li className={styles2.attrli}><span  className={styles2.attrname}>排列序号：</span>
                  {ifEdit ?
                  (<span>{this.state.currentRecord.key}</span>)
                  : (<InputNumber type = 'text'
                            onChange={::this.inputIndex}
                            value={this.state.currentRecord.key}
                            defaultValue = {this.state.currentRecord.key}
                            min = {0}
                            max = {this.listData ? this.listData.length : 0}
                            style={{"width":"100px"}}
                            />)}
                </li>
                <li className={styles2.attrli}>属性状态：{ifEdit ?
                  (<span>{this.state.currentRecord.state}</span>)
                  :(<RadioGroup onChange={::this.onChangeStatus}
                                value = {(this.state.currentRecord.state == '有效' || this.state.currentRecord.state == '无效' ) ? (this.state.currentRecord.state == '有效' ? 1 : 0) : (this.state.currentRecord.state.props.children == '有效' ? 1 : 0)}
                                defaultValue={(this.state.currentRecord.state == '有效' || this.state.currentRecord.state == '无效' ) ? (this.state.currentRecord.state == '有效' ? 1 : 0) : (this.state.currentRecord.state.props.children == '有效' ? 1 : 0)}>
                    <Radio value={1}>启用</Radio>
                    <Radio value={0}>停用</Radio>
                  </RadioGroup>)}
                </li>
                <li className={styles2.attrli}>销售属性：{ifEdit ? (<span>{this.state.currentRecord.saleProp}</span>)
                  : (<RadioGroup onChange={::this.onChangeSaleAttr} value = {this.state.currentRecord.saleProp == '是' ? 1 : 0} defaultValue={this.state.currentRecord.saleProp == '是' ? 1 : 0}>
                    <Radio value={1} className={styles2.radiomargin}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>)}
                </li>
                <li className={styles2.attrli}>类目属性：{ifEdit ? (<span>{this.state.currentRecord.classProp}</span>)
                  : (<RadioGroup onChange={::this.onChangeCategoryAttr} disabled = {this.state.disableCategoryAttr}  value = {this.state.currentRecord.classProp == '是' ? 1 : 0} defaultValue={this.state.currentRecord.classProp == '是' ? 1 : 0}>
                    <Radio value={1} className={styles2.radiomargin}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>)}
                </li>
                <li className={styles2.attrli}>扩展属性：{ifEdit ? (<span>{this.state.currentRecord.extendProp}</span>)
                  : (<RadioGroup onChange={::this.onChangeExtendAttr} value = {this.state.currentRecord.extendProp == '是' ? 1 : 0} defaultValue={this.state.currentRecord.extendProp == '是' ? 1 : 0}>
                    <Radio value={1} className={styles2.radiomargin}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>)}
                </li>
              </ul>
            </Sider>
            <Content style = {{overflow:'hidden',background: 'white'}}>
              <Header style = {{background: 'white',color:'#333', height: 'auto', padding: 0, lineHeight: '35px'}}>属性值
                {!ifEdit &&
                  <FuncPermission codes = {this.props.funcPermissions && this.props.funcPermissions.data && this.props.funcPermissions.data.data} code = 'addValue'>
                    <Button style = {{float: 'right',marginRight: '10px'}} onClick = {(e)=>{this.addAttr(e);}} type="primary">
                      添加
                    </Button>
                  </FuncPermission>
                }
              </Header>
              <Content >
                {this.state.listAllData && <Table loading={this.state.disLoadingForEdit} style = {{textAlign: 'center', width: '368px'}} className = {styles2.tableSecond + ' ' + 'ui-tbl'}  columns = {this.columns2} dataSource = {ifEdit ? this.disData: this.editData} pagination={false} scroll={{ y: 240 }} />}
              </Content>
            </Content>
          </Layout>
        </Modal>
      </div>

    );
  }
}


