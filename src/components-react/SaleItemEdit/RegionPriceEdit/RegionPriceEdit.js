/**
 * Created by zhanghaitian on 2017/2/18.
 */

import React from 'react';
import { Modal, Button, Form, Input, Icon, Row, Col,Popover, Checkbox,Tooltip } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  BaseComponent  from '../../Common/BaseComponent';
import  './style/regionPrice.css';
import AreaSupplyerPrice from '../AreaSupplyerPrice/AreaSupplyer'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
import {queryAddress,queryInitialData} from './redux';

@connect(
  state => ({RegionPriceEdit:state.regionPriceEdit}),
  dispatch => bindActionCreators({queryAddress,queryInitialData}, dispatch)
)
@Form.create()
export default class RegionPriceEdit extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      arealist:[],
      checkarealist:[],
      updatePrice:false,
    };
    this.initialData = null;
    this.firstRequest = false;
    this.secondRequest = false;
    this.lastKey = 0;
  }

  //测试方法，场景：点击取消后会resetForm，再次进入后还原上一次保存的现场 方式：重组数据
  formatRegionData2RegionPriceEditData(){
    let sourceData = this.props.tmpSourceData;
    let price = '';
    let result = [];
    let tradeItemSkuPriceList = [];
    if(sourceData && sourceData.priceList && sourceData.priceList.length>0){
      //通过priceType判断是供货价还是批发价
      if(this.props.priceType == 1){
        //转换数据
        price = sourceData.priceList[0].marketPrice;
        for(let i in sourceData.priceList){
          if(price==sourceData.priceList[i].marketPrice){
            tradeItemSkuPriceList.push({areaId:sourceData.priceList[i].areaId,areaName:sourceData.priceList[i].areaName});
          }else{
            result.push({marketPrice:price,tradeItemSkuPriceList:tradeItemSkuPriceList});
            tradeItemSkuPriceList=[];
            price=sourceData.priceList[i].marketPrice
            tradeItemSkuPriceList.push({areaId:sourceData.priceList[i].areaId,areaName:sourceData.priceList[i].areaName});
          }
        }
        result.push({marketPrice:price,tradeItemSkuPriceList:tradeItemSkuPriceList});
        console.log('result is :',result);
      }else{
        //转换数据
        price = sourceData.priceList[0].costPrice;
        for(let i in sourceData.priceList){
          if(price==sourceData.priceList[i].costPrice){
            tradeItemSkuPriceList.push({areaId:sourceData.priceList[i].areaId,areaName:sourceData.priceList[i].areaName});
          }else{
            result.push({costPrice:price,tradeItemSkuPriceList:tradeItemSkuPriceList});
            tradeItemSkuPriceList=[];
            price=sourceData.priceList[i].costPrice
            tradeItemSkuPriceList.push({areaId:sourceData.priceList[i].areaId,areaName:sourceData.priceList[i].areaName});
          }
        }
        result.push({costPrice:price,tradeItemSkuPriceList:tradeItemSkuPriceList});
        console.log('result is :',result);
      }
      return result;
    }
  }

  //1.设置地域价窗口:展示
  showModal(){
    if(this.props.tmpSourceData && this.props.tmpSourceData.updatePrice==true){
      //页面暂时回显
      this.initialData = this.formatRegionData2RegionPriceEditData();
      //lastKey记录form中，再次添加需要的值
      if(this.initialData && this.initialData.length>0){
        this.lastKey = this.initialData.length;
      }
      this.setState({
        arealist: this.initialAreaListState(),
        checkarealist:this.initialCheckListState(),
        visible: true,
        updatePrice:true,
      });
    }else{
      //查询销售地：queryDistrictPrice
      this.props.queryAddress({
        itemId:this.props.itemId,
        skuId:this.props.skuId,
        platformId:this.platformId,
        userId:1
      }).then(
        (result)=>{
          this.firstRequest = true;
          if(this.firstRequest == true && this.secondRequest == true){
            this.initialData = this.props.RegionPriceEdit.initialdata;
            //lastKey记录form中，再次添加需要的值
            if(this.initialData && this.initialData.length>0){
              this.lastKey = this.initialData.length;
            }
            this.setState({
              arealist: this.initialAreaListState(),
              checkarealist:this.initialCheckListState(),
              visible: true,
              updatePrice:true,
            });
          }
        }
      );
      //查询回显数据
      this.props.queryInitialData({
        itemId:this.props.itemId,
        skuId:this.props.skuId,
        priceType:this.props.priceType,
        platformId:this.platformId
      }).then(
        (result)=>{
          this.secondRequest = true;
          if(this.firstRequest == true && this.secondRequest == true){
            this.initialData = this.props.RegionPriceEdit.initialdata;
            //lastKey记录form中，再次添加需要的值
            if(this.initialData && this.initialData.length>0){
              this.lastKey = this.initialData.length;
            }
            this.setState({
              arealist: this.initialAreaListState(),
              checkarealist:this.initialCheckListState(),
              visible: true,
              updatePrice:true,
            });
          }
        }
      );
    }
  }

  //2.1 根据数据数量---->"选择地区"   展开/关闭状态
  initialAreaListState(){
    var states=[];
    if(this.initialData){
      states = this.initialData && this.initialData.map((k)=>{
          return false;
        });
    }
    return states;
  }

  //2.2 根据数据数量---->查看"功能   展开/关闭状态
  initialCheckListState(){
    var states=[];
    if(this.initialData){
      states = this.initialData && this.initialData.map((k)=>{
          return false;
        });
    }
    return states;
  }

  //3.根据数据数量，生成keys：[0,1,2....]，初始化地域价数量
  initialKeys(){
    var keys=new Array();
    var i=-1;
    var tmp = this.initialData && this.initialData.map((k)=>{
        keys.push(++i);
      });
    return keys;
  }


  //生成 地区弹框!!!!!!!!!!!!!
  createSelectboxGroup(k){
    //生成选项  start --------------------------------------
    let areaOptions=[];
    if(this.props.RegionPriceEdit!=null && this.props.RegionPriceEdit.data!=null ){
      let tmp = this.props.RegionPriceEdit && this.props.RegionPriceEdit.data
        && this.props.RegionPriceEdit.data.map((province) => {
          let value = province.code+','+province.name;
          areaOptions.push({label:province.name, value:value, disabled:false});
        });
    }
    //生成选项 end------------------------------------------

    //生成 默认选择数据 start ---------------------------------------------------
    var targetData= null;
    var defaultvalue = new Array();
    if(this.initialData && this.initialData[k] && this.initialData[k].tradeItemSkuPriceList){
      targetData = this.initialData[k].tradeItemSkuPriceList;
      //获取省份默认选中信息
      for(var t in targetData){
        var tmp = targetData[t].areaId+','+targetData[t].areaName;
        defaultvalue.push(tmp);
      }
    }else{
      defaultvalue = null;
    }
    //生成默认选择数据 end-------------------------------------------------------

    //生成置灰值 start----------------------------------------------------------
    let formValue = this.props.form.getFieldsValue();
    let keys = formValue.keys;
    let allCheckedValue=[];
    //获取需要置灰的选项
    for(let i in keys){
      let tmp = formValue[`areaList-${keys[i]}`];
      if(tmp &&　k!=keys[i]){
        allCheckedValue = allCheckedValue.concat(tmp);
      }
    }
    let disableResult =[];
    for(var x in areaOptions){
      for(var y in allCheckedValue){
        if(areaOptions[x].value==allCheckedValue[y]){
          areaOptions[x].disabled = true;
        }
      }
    }
    //生成置灰值 end----------------------------------------------------------

    //生成组件 start -----------------------------------------------------------
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return(
      <FormItem key={`${k}-checkgroup`}>
        <div className="areaList" style={{width:'500px'}}>
          {getFieldDecorator(`areaList-${k}`, {
            initialValue: defaultvalue?defaultvalue:'',
            rules: [{
              required: true,
              message: "请选择地域！",
            }],
          })(
            <CheckboxGroup
              options={areaOptions}
              onChange={(checkedValues)=>this.onChangeCheckboxGroup(checkedValues)}/>
          )}
          <div className="popButton">
            <Button type="primary" size="small" onClick={()=>this.hideArea(k)}>确定</Button>
          </div>
        </div>
      </FormItem>
    );
    //生成组件 end -----------------------------------------------------------
  }


  //生成省份选项 checkGroup->option
  areaDataSource() {
    if(this.props.RegionPriceEdit!=null && this.props.RegionPriceEdit.data!=null ){
      let areaOptions = this.props.RegionPriceEdit && this.props.RegionPriceEdit.data
        && this.props.RegionPriceEdit.data.map((province) => {
          let value = province.code+','+province.name;
          return {label:province.name, value:value};
        });
      return areaOptions;
    }else{
      return [];
    }
  }

  onChangeCheckboxGroup(checkedValues){
    console.log(checkedValues);
  }


  componentWillMount() {
  }

  //表单递交按钮
  submitForm() {
    let keys = this.props.form.getFieldValue('keys');
    this.props.form.validateFields((err, values) => {
      let isErr = false;
      for(let i in err){
        for(let j=0;j<keys.length;++j){
          if(String(i) == `areaList-${keys[j]}` || String(i) == `areaTitile-${keys[j]}` || String(i) == `price-${keys[j]}`){
            isErr = true;
          }
        }
      }
      if (!isErr) {
        console.log('Received values of form: ', values);
        this.props.savePrice(this.buildData(values));
        //关闭所有
        this.hideAllAreaList();
        this.hideAllCheckList();
        //还原现场
        this.initialData = null;
        this.firstRequest = false;
        this.secondRequest = false;
        this.lastKey = 0;
        this.setState({
          visible: false,
          arealist:[],
          checkarealist:[],
          updatePrice:false,
        });
      }
    });
  }


  //重组表单数据
  buildData(values){
    var priceList=new Array();
    //根据keys获取：{price，id+Name}  多个地域对应一个价格--->拆分为单个价格对应单个地域
    var keys = values.keys;
    for(var k in keys){
      var price = values[`price-${keys[k]}`];
      if(price!=null && price!=undefined && price!='' && parseFloat(price).toFixed){
        price = parseFloat(price).toFixed(2);
      }
      var areaList = values[`areaList-${keys[k]}`];
      for(var area in areaList){
        var tmp ={};
        if(this.props.priceType=='1'){
          tmp={
            marketPrice:price,
            areaId:areaList[area].split(',')[0],
            areaName:areaList[area].split(',')[1]
          };
        }else{
          tmp={
            costPrice:price,
            areaId:areaList[area].split(',')[0],
            areaName:areaList[area].split(',')[1]
          };
        }
        priceList.push(tmp);
      }
    }
    //全国价单独获取
    /*if(values.totalPrice){
      if(this.props.priceType=='1'){
        priceList.push({
          marketPrice:values.totalPrice,
          areaId:0,
          areaName:'全国'
        });
      }else{
        priceList.push({
          costPrice:values.totalPrice,
          areaId:0,
          areaName:'全国'
        });
      }
    }*/
    /*
     最终返回单个对象，格式为：
    {
      uuid :123, skuId:1, priceType:1,updatePrice:true/false
      priceList:
      [
        {areaId:1,areaName:'北京',marketPrice:100},
        {areaId:1,areaName:'上海',marketPrice:100},
      ]
    }
    */
    return {uuid:this.props.uuid, skuId:this.props.skuId, updatePrice:this.state.updatePrice,totalPrice:values.totalPrice,priceType:this.props.priceType, priceList:priceList}
  }

  //添加地域条
  add(){
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.lastKey);
    form.setFieldsValue({
      keys: nextKeys,
    });
    ++this.lastKey;
    //新增设置地域、查看地域 窗口状态
    var arealist = this.state.arealist;
    arealist.push(false);

    var checkarealist = this.state.checkarealist;
    checkarealist.push(false);

    this.setState({
      updatePrice:true,
      arealist:arealist,
      checkarealist:checkarealist
    });
  }

  //删除地域条
  remove(k){
    //处理initialData
    /*if(this.initialData && this.initialData[k]){
      this.initialData.splice(k,1);
    }*/

    //更新 arealist
    var arealist = this.state.arealist;
    delete arealist[k];

    //更新 checkarealist
    var checkarealist = this.state.checkarealist;
    checkarealist[k]=false;

    this.setState({
      arealist: arealist,
      checkarealist: checkarealist,
      updatePrice:true,
    });
    //更新keys
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
/*      [`areaTitle-${k}`]:'',
      [`price-${k}`]:'',
      [`areaList-${k}`]:''*/
    });
  }


  //设置地域价窗口：关闭
  handleCancel() {
    this.props.form.resetFields();
    //关闭所有
    this.hideAllAreaList();
    this.hideAllCheckList();
    //还原现场
    this.initialData = null;
    this.firstRequest = false;
    this.secondRequest = false;
    this.lastKey = 0;
    this.setState({
      visible: false,
      arealist:[],
      checkarealist:[],
      updatePrice:false,
    });
  }

  //选择省份：隐藏
  hideArea(k) {
    //关闭所有
    this.hideAllAreaList();
    this.hideAllCheckList();
    //保存到title
    const { form } = this.props;
    var areaTitle = form.getFieldValue(`areaList-${k}`);
    areaTitle = this.areaTitile2Str(areaTitle);
    this.props.form.setFieldsValue({
      [`areaTitle-${k}`]: areaTitle
    });
  }

  //areaTitle数据 数组为字符串
  areaTitile2Str(areaTitle){
    var areaTitleStr='';
    if(areaTitle){
      for(var i in areaTitle){
        var areaTitleTmp = areaTitle[i].split(',')[1]+' ';
        areaTitleStr+=areaTitleTmp;
      }
      return areaTitleStr;
    }else{
      return '';
    }
  }

  //选择地域：展示
  showArea(k) {
    //关闭所有
    this.hideAllAreaList();
    this.hideAllCheckList();
    //展示
    var arealist = this.state.arealist;
    if(arealist!=null && arealist!=undefined && arealist.length>k){
      arealist[k]=true;
    }
    //改变state
    this.setState({
      arealist: arealist
    });
  }

  //查看省份：隐藏
  hideCheckArea(k) {
    this.hideAllAreaList();
    this.hideAllCheckList();
  }

  //"查看" :展示
  showCheckArea(k) {
    //关闭所有
    this.hideAllAreaList();
    this.hideAllCheckList();
    //展示
    var checkarealist = this.state.checkarealist;
    if(checkarealist!=null && checkarealist!=undefined && checkarealist.length>k){
      checkarealist[k]=true;
    }
    //改变state
    this.setState({
      checkarealist: checkarealist,
    });
  }

  hideAllAreaList(){
    let arealist = this.state.arealist;
    this.setState({
      arealist:arealist.fill(false)
    });

  }
  hideAllCheckList(){
    let checkarealist = this.state.checkarealist;
    this.setState({
      checkarealist:checkarealist.fill(false)
    });
  }


  //生成查看省份复选框
  createCheckboxGroup(k){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    var value = this.props.form.getFieldValue(`areaList-${k}`);
    var valueStr = this.areaTitile2Str(value);
    return(
      <div className="areaList" style={{width:'240px'}}>
        {valueStr}
        <div className="popButton">
          <Button type="primary" size="small" onClick={()=>this.hideCheckArea(k)}>确定</Button>
        </div>
      </div>
    );
  }

  //初始化选择地域栏的 "选中展示" Title
  initialAreaTitle(k){
    var targetData= null;
    var defaultvalue = new Array();
    if(this.initialData && this.initialData[k] && this.initialData[k].tradeItemSkuPriceList){
      targetData = this.initialData[k].tradeItemSkuPriceList;
      //获取省份默认选中信息
      for(var t in targetData){
        var tmp = targetData[t].areaId+','+targetData[t].areaName;
        defaultvalue.push(tmp);
      }
    }else{
      defaultvalue = null;
    }
    var str = this.areaTitile2Str(defaultvalue);
    return str;
  }

  //生成  地域价组件
  createAreaPriceDom(){
    var label='面价';
    if(this.props.priceType=='2'){
      label='批发价'
    }
    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 21},
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const keys = getFieldValue('keys');
    const formItems = keys.map((k) => {
      //初始化全国价格
      var initialPrice = '';
      if(this.initialData && this.initialData[k]) {
        if (this.props.priceType == 1) {
          initialPrice = this.initialData[k].marketPrice;
        } else {
          initialPrice = this.initialData[k].costPrice
        }
      }
      //地区选择框 显示状态
      var state = false;
      if(this.state.arealist && this.state.arealist[k]){
        state = this.state.arealist[k];
      }
      let hoverTitle=this.props.form.getFieldValue(`areaTitle-${k}`);
      return (
        <div key={`${k}-areaDomDiv`}>
          <FormItem require={true} key={`${k}-areaDomItem`}>
            <Row>
              <Col span={3} className="selectRegion">
                <Popover
                  content={this.createSelectboxGroup(k)}
                  trigger="click"
                  placement="bottomLeft"
                  visible={state}
                >
                  <a onClick={()=>this.showArea(k)}>选择地域<Icon type="caret-down"/></a>
                </Popover>
              </Col>
              <Col span={7}>
                <Tooltip placement="top" title={hoverTitle}>
                {getFieldDecorator(`areaTitle-${k}`, {
                  initialValue:this.initialAreaTitle(k),
                  rules: [{
                    required: true,
                    message: "请选择地域！",
                  }],
                })(
                  <Input disabled={true} maxLength="15" style={{ border: 0}} className="f-toe" />
                )}
                </Tooltip>
              </Col>
              <Col span={3} offset={11}>
                <Popover
                  content={this.createCheckboxGroup(k)}
                  trigger="click"
                  placement="bottomLeft"
                  visible={this.state.checkarealist[k]}
                >
                  <a onClick={()=>this.showCheckArea(k)}>查看地域</a>
                </Popover>
              </Col>
              {/*  <Col span={19}>
               <div className="areaTitle"></div>
               </Col>*/}
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label={label} key={`${k}-areaPrice`}>
            <span>￥</span>
            <span className="w160">
            {getFieldDecorator(`price-${k}`, {
              initialValue: initialPrice,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                message: '请输入有效价格!',
              },{
                pattern:/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
                message:'请输入数字，最多保留两位小数!'
              }],
            })(
              <Input maxLength='10' />
            )}
            </span>
            <a className="actionDel"  onClick={()=> this.remove(k)}>删除地域</a>
          </FormItem>
        </div>
      );
    });
    return formItems;

  }


  render() {
    var label='面价';
    if(this.props.priceType=='2' || this.props.priceType==2){
      label='批发价'
    }
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', {initialValue: this.initialKeys()});
    getFieldDecorator('skuId', {initialValue: this.props.skuId});
    getFieldDecorator('priceType', {initialValue: this.props.priceType});

    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 21},
    };

    //-----------------main-----------------------
    return (
        <a>
          <a onClick={()=>this.showModal()} style={{color:'#009afe'}}>设置地域价 </a>
          <Modal
            className="ml10"
            title={'设置地域价'}
            visible={this.state.visible}
            onOk={()=>this.submitForm()}
            onCancel={()=>this.handleCancel()}
            width="640px"
            footer={[
              <Button key="back" size="large" onClick={()=>this.handleCancel()}>取消</Button>,
              <Button key="submit" type="primary" size="large" onClick={()=>this.submitForm()}>保存</Button>
            ]}
            maskClosable={false}
          >
            <Form>
              <div className="countryBox">
                <h3>全国统一价</h3>
                <FormItem {...formItemLayout}  label={label} >
                  <span>￥</span>
                  <span className="w160">
                  {getFieldDecorator(`totalPrice`, {
                    initialValue: this.props.totalPrice,
                    validateTrigger: ['onChange', 'onBlur'],
                  })(
                    <Input maxLength="10" />
                  )}
                  </span>
                </FormItem>
              </div>

              {/*查看可销售区域价格*/}
              <Row>
                <Col span={5} offset={19}>
                  <AreaSupplyerPrice itemId={this.props.itemId} skuId={this.props.skuId} parentVisable={this.state.visible}/>
                </Col>
              </Row>
              <div className="regionBox">
                <h3>地域价</h3>
                <div className="regionList">
                  {this.createAreaPriceDom()}
                  <Button type="dashed" size="large" icon="plus" onClick={()=>this.add()} style={{width:'100%',marginTop:'10px'}}>添加地域</Button>
                </div>
              </div>
            </Form>
          </Modal>
      </a>
    );
  }
}
