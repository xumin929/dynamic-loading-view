/**
 * @file 发布商品-供货信息-设置地域价组件
 */
import React, { Component } from 'react';
import { Form,Button,Layout,Modal,Checkbox,Table,Col,Row,
         Popover,Radio,InputNumber,message,Input,Icon } from 'jdcloudui';


const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item

let uuid = 0;
@Form.create()

export default class RegionPriceEdit extends Component {
  constructor(props){
    super(props);

    this.initdata=[{
      key: 0,
      count: 0,
      totalPrice: null,//供货价
      inventory: null,//销量
      attributes: null,
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
    };
    this.lastKey = 0;
    this.initialData=[];
  }

  //地域价Modal
  regionalClick=()=>{

    console.log(this.props.type)

    if(this.props.type == 2){
      let params = {}
      params.requestInfo = [];
      params.requestInfo.push({
        shopAddressId:this.props.itemTmplPublishVo.itemPerfectVo.placeDeliveryId
      })
      if(params.requestInfo[0].shopAddressId&&params.requestInfo[0].shopAddressId.length > 0){
        params.requestInfo = JSON.stringify(params.requestInfo)
        this.props.getRegionalPrice(params).then((res)=>{
          if( res.code == 0){
            console.log(11)
            this.showModal()
          }
        })
      } else {
        message.warning('请选择发货地')
      }
    } else {
      this.showModal()
    }
  }

  showModal = () => {
    console.log(this.props.itemTmplPublishVo.itemPerfectVo)
    console.log(this.props.index,this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList)
    console.log(this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].areaPriceList)
     this.initialAllSourceData();
    this.setState({
        visible: true,
    });
  }

    //表单递交按钮
    handleOk() {
      console.log(this.props.index)
    this.props.form.validateFields((err, values) => {
      console.log(err)
      if (!err) {
        console.log('Received values of form: ', values);
       this.buildData(values)
       console.log(this.buildData(values))
      let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
      if(itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index]){
          itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].areaPriceList=this.buildData(values)
       } else {
          itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index] = {};
          itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].areaPriceList=this.buildData(values)
          itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].supplyStatus = 1;
       }
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].supplyPrice = Number(this.buildData(values)[0].supplyPrice)
      this.props.updateItemTmplAction(itemTmplPublishVo)

      // this.props.form.setFieldsValue({
      //   //keys:this.initialKeys(),
      //   totalPrice:null
      // });

      //  关闭所有
       // this.lastKey = 0;
       //this.initialData=[];

        this.setState({
          visible: false,
          arealist:[],
          checkarealist:[],
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
      var areaList = values[`areaList-${keys[k]}`];
      if(areaList && areaList.length>0){
        for(var area in areaList){
          var tmp={
            supplyPrice:price,
            areaId:areaList[area].split(',')[0],
            areaName:areaList[area].split(',')[1],
            //preCommitSkuPriceId:this.findPreCommitSkuPriceId(areaList[area].split(',')[0]),
            areaNumber: 1,
          };
          priceList.push(tmp);
        }
      }
    }
    priceList.splice(0,0,{
        areaId:0,
        areaName:'全国',
        areaNumber:1,
        supplyPrice:values.totalPrice
    })
    console.log(priceList)
    return priceList;
    //return {index:this.props.index,totalPrice:values.totalPrice,priceList:priceList,updatePrice:true}
  }

  handleCancel = (e) => {
    this.setState({
        visible: false,
    });
  }

    //生成  地域价组件
    createAreaPriceDom(){
      const formItemLayout = {
        labelCol: {span: 3},
        wrapperCol: {span: 21},
      };
      const { getFieldDecorator, getFieldValue } = this.props.form;
     const keys = getFieldValue('keys');
      console.log(keys)
      const formItems = keys && keys.length>0 && keys.map((k) => {
        console.log(k)
          var supplyPrice = '';
          if(this.initialData && this.initialData[k]){
            supplyPrice = this.initialData[k].supplyPrice;
          }
          // //地区选择框 显示状态
          // var state = false;
         // if(this.state.arealist && this.state.arealist[k]){
        //    state = this.state.arealist[k];
         // }
          return (
            <div key={`${k}-areaDomDiv`}>
              <FormItem require={true} key={`${k}-areaDomItem`}>
                <Row>
                  <Col span={3} className="selectRegion">
                    <Popover
                      content={this.createAreaGroup(k)}
                      overlayClassName="rArea"
                      trigger="click"
                      placement="bottomLeft"
                      visible={this.state.visiblePop[k]}
                    >
                      <a onClick={()=>this.showArea(k)}>选择地域<Icon type="caret-down"/></a>
                    </Popover>
                  </Col>
                  <Col span={7}>
                    {getFieldDecorator(`areaTitle-${k}`, {
                      initialValue:this.initialAreaTitle(k),
                      rules: [{
                        required: true,
                        message: "请选择地域！",
                      }],
                    })(
                      <Input disabled={true} maxLength="15" style={{ border: 0}} className="f-toe"/>
                    )}
                  </Col>
                  <Col span={3} offset={11}>
                    <Popover
                      content={this.createCheckboxGroup(k)}
                      trigger="click"
                      placement="bottomLeft"
                      visible={this.state.visibleView[k]}
                    >
                      <a onClick={()=>this.showCheckArea(k)}>查看地域</a>
                    </Popover>
                  </Col>
                </Row>
              </FormItem>
              <FormItem {...formItemLayout} label="供货价" key={`${k}-areaPrice`}>
                <span>￥</span>
                <span className="w160">
                  {getFieldDecorator(`price-${k}`, {
                    initialValue: supplyPrice,
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      message: "请输入地域价！",
                    },{
                       pattern:/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
                      message:'请输入数字且最多为两位小数！'
                    }],
                  })(
                    <Input />
                  )}
              </span>
                <a className="actionDel" onClick={()=> this.remove(k)}>删除地域</a>
              </FormItem>
            </div>
          );
    });
    return formItems;
  }

   //生成 选择地域弹框
   createAreaGroup(k){
    let areaOptions=[];
      areaOptions = this.props.regionalArr && this.props.regionalArr.map((item,index) => {
          return {
            index:index,
            id:item.id,
            code:item.code,
            value:item.code+','+item.name,
            label:item.name,     
          };
        });
    var defaultvalue = new Array();
    let skuParamList = this.initialData.slice(0);
    //获取省份默认选中信息
    if(skuParamList && skuParamList.length>0 && skuParamList[k]){
      if(skuParamList[k].areaId && skuParamList[k].areaId.indexOf(',')!=-1 && skuParamList[k].areaName &&skuParamList[k].areaName.indexOf(',')!=-1){
        var areaIds = skuParamList[k].areaId.split(',');
        var areaNames = skuParamList[k].areaName.split(',');
        if(areaIds.length>0 && areaNames.length>0){
          for(var i=0;i<areaIds.length;++i){
            if(areaIds[i]!=0){
              var tmp = areaIds[i]+','+areaNames[i];
              defaultvalue.push(tmp);
            }
          }
        }
      }else{
        var areaId = skuParamList[k].areaId;
        var areaName = skuParamList[k].areaName;
        var tmp = areaId+','+areaName;
        defaultvalue.push(tmp);
      }
    }

    console.log(defaultvalue)

    let formValue = this.props.form.getFieldsValue();
    console.log(formValue)
    let keys = formValue.keys;
    let allCheckedValue=[];

    for(let i in keys){
      let tmp = formValue[`areaList-${keys[i]}`];
      if(tmp &&　k!=keys[i]){
        allCheckedValue = allCheckedValue.concat(tmp);
      }
    }

    console.log(allCheckedValue)

    let disableResult =[];
    for(var x in areaOptions){
      for(var y in allCheckedValue){
        if(areaOptions[x].value==allCheckedValue[y]){
          areaOptions[x].disabled = true;
        }
      }
    }
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return(
      <FormItem key={`${k}-checkgroup`}>
        <div className="areaList" style={{width:'500px'}}>
          {getFieldDecorator(`areaList-${k}`, {
           initialValue: defaultvalue?defaultvalue:'',
          })(
            <CheckboxGroup
              //options={this.state.regionalList}
              options={areaOptions}
              onChange={(checkedValues)=>this.onChangeCheckboxGroup(checkedValues)}
            />
          )}
          <div className="popButton">
            <Button type="primary" size="small" onClick={()=>this.hideArea(k)}>确定</Button>
          </div>
        </div>
      </FormItem>
    );
  }

  onChangeCheckboxGroup(checkedValues){
    console.log(checkedValues);
  }

    //根据数据数量，生成keys。发布和编辑不同状态无法调平，所以用了不同的方式生成keys
    initialKeys(){
      var keys=new Array();
      if(this.props.edit){
        var i=-1;     
      } else {
        var i=0;
      };

      if(this.props.edit){
        var areaList = this.initialData;
        if(areaList.length == 1){
          console.log(areaList)
          if(areaList[0].areaId == '0'){
            areaList.shift();
          }
       }
      } else {
       var areaList =  this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].areaPriceList
      }

      var tmp = (areaList || []).map((item)=>{
          keys.push(++i);
        });
        
        if(!this.props.edit){
          let formValue = this.props.form.getFieldsValue();
          keys = formValue.keys || []
        };
        console.log(keys)
      return keys;
    }

    //添加地域条
    add(){
      const { form } = this.props;
      const keys = form.getFieldValue('keys');
      console.log(keys)
      console.log('nextKeys',this.lastKey)
      const nextKeys = keys.concat(this.lastKey);
      form.setFieldsValue({
        keys: nextKeys,
      });
      this.lastKey++;
      //新增设置地域、查看地域 窗口状态
      var arealist = this.state.regionalList;
  
      this.setState({
        arealist:arealist,
        // checkarealist:checkarealist
      });
    }

      //删除地域条
  remove(k){
    console.log('remove k is:',k);
    var arealist = this.state.regionalList;
    delete arealist[k];
    console.log(arealist)

    //更新 arealist
    // var arealist = this.state.regionalList;
    // arealist[k]=false;
    // console.log(arealist)

    //更新 checkarealist
   // var checkarealist = this.state.checkarealist;
   // checkarealist[k]=false;

    this.setState({
      arealist: arealist,
     // checkarealist: checkarealist
    });
    //更新keys
    const { form } = this.props;
    let keys = form.getFieldValue('keys');
    console.log(keys)
    this.props.form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
    console.log(keys)
  }

  showArea(k){
    this.state.visiblePop[k]=true
    this.setState({
      visiblePop:this.state.visiblePop
    })
  }

    //选择省份：隐藏
    hideArea(k) {
      //保存到title
      const { form } = this.props;
      var areaTitle = form.getFieldValue(`areaList-${k}`);
      console.log(areaTitle)
      areaTitle = this.areaTitile2Str(areaTitle);
      this.props.form.setFieldsValue({
        [`areaTitle-${k}`]: areaTitle
      });
      this.state.visiblePop[k]=false
      this.setState({
        visiblePop:this.state.visiblePop
      })
    }

      //查看省份：隐藏
  hideCheckArea(k) {
    this.state.visibleView[k]=false
    this.setState({
      visibleView:this.state.visibleView
    })
  }
  

      //初始化选择地域栏的 "选中展示" Title
    initialAreaTitle(k){
          //bugfix HNCBTOB-327 商品待审核状态下，再次编辑设置地域价，获取不到地域，即Title无回显数据
          const { getFieldDecorator, getFieldValue } = this.props.form;
          var value = this.props.form.getFieldValue(`areaList-${k}`);
          console.log(value)
          console.log(k)
          
          var valueStr = this.areaTitile2Str(value);
          console.log(valueStr)
          return valueStr;
        }
    //areaTitle数据 数组为字符串
    areaTitile2Str(areaTitle){
      var areaTitleStr='';
      if(areaTitle){
        for(var i in areaTitle){
          var areaTitleTmp = areaTitle[i].split(',')[1]+' ';
          areaTitleStr+=areaTitleTmp;
        }        
      }
      return areaTitleStr;
    }

      //查看省份
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

  showCheckArea(k) {
    this.state.visibleView[k]=true
    this.setState({
      visibleView:this.state.visibleView
    })
  }

  regionDataTransform(){
    let priceList = this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].areaPriceList;
    console.log(priceList)
    var result = [];
    var price = '';
    var areaName = '';
    var areaId='';


    if(this.props.edit){     
    //过滤全国价
    if(priceList.length>1){
        console.log(priceList.length)
        for(var j in priceList){
          if(priceList[j].areaId==0 || priceList[j].areaId=='0'){
            priceList.splice(j,1);
          }
        }
      }
    }

    if(priceList.length>0){
      console.log(priceList.length)
      price =priceList[0].supplyPrice;
      for(var k in priceList){
        console.log(k)
        if(price===priceList[k].supplyPrice){
          price = priceList[k].supplyPrice;
          areaName = areaName+priceList[k].areaName+',';
          areaId = areaId+priceList[k].areaId+',';
          console.log(result)
        }else{
          areaName = areaName.substr(0,areaName.length-1);
          areaId = areaId.substr(0,areaId.length-1);
          result.push({areaId:areaId,areaName:areaName,supplyPrice:price});
          price = priceList[k].supplyPrice;
          areaName = priceList[k].areaName+',';
          areaId = priceList[k].areaId+',';
          console.log(result)
        }
      }
      areaName = areaName.substr(0,areaName.length-1);
      areaId = areaId.substr(0,areaId.length-1);
      result.push({areaId:areaId,areaName:areaName,supplyPrice:price});
    }
     console.log(result)
    console.log(priceList)

    return result;
  }

  initialAllSourceData(){
    //if(this.props.updatePrice || (this.props.areaList && this.props.areaList.length > 0)){
      this.initialData = this.regionDataTransform()
     // this.forceUpdate();
      console.log(this.initialData)
     if(this.props.edit){
      if(this.initialData.length == '1'){
        this.lastKey = this.initialData.length-1;
      } else {
        this.lastKey = this.initialData.length;
      }
     } else {
      this.lastKey = this.initialData.length;
     }

      console.log(this.lastKey)
      console.log(this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList)
      this.props.form.setFieldsValue({
        keys:this.initialKeys(),
       // totalPrice:this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].areaPriceList[0].supplyPrice || ''
      });
  }
  
  render() {
    console.log(this.props,"---")
   // console.log(this.state.modalKey)
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const initTotalPrice = this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[this.props.index].areaPriceList[0].supplyPrice || '';
console.log(initTotalPrice)
    getFieldDecorator('keys', {value:this.initialKeys()});
    console.log('keys',getFieldValue('keys'))
    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 21},
    };

    return (
        <span>
        <a className="ml10 text-link" onClick={()=>this.regionalClick()}>设置地域价</a>
        <Modal
          title='设置地域价'
          className="rModal"
          visible={this.state.visible}
          onOk={()=>this.handleOk()} 
          onCancel={this.handleCancel}
          width={'640px'}
        //  key={this.state.modalKey}
          maskClosable={false}
        >
          <Form>
          <div className="countryBox">
              <h3>全国统一价</h3>
              <FormItem {...formItemLayout}  label="供货价">
                <span>￥</span>
                <span className="w160">
                {getFieldDecorator(`totalPrice`, {
                  initialValue: initTotalPrice,
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{
                    required: true,
                    message: "请填写价格！",
                  },{
                    pattern:/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
                    message:'请输入数字且最多为两位小数！'
                  }],
                })(
                  <Input maxLength='10'/>
                )}
                </span>
              </FormItem>
            </div>
            <div className="regionBox">
              <h3>地域价</h3>
              <div className="regionList">
                {this.createAreaPriceDom()}
                <Button type="dashed" size="large" 
                        icon="plus" onClick={()=>this.add()} 
                        style={{width:'100%',marginTop:'10px'}}>添加地域</Button>
              </div>
            </div>
          </Form>
        </Modal>
      </span>
    );
  }
}
