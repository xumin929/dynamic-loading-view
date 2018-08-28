/**
 * Created by huangxiao3
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, Input, Icon, Form, message, InputNumber, Radio } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addNewSpecification } from './redux';
import  BaseComponent  from '../../Common/BaseComponent';
import './style/SpecificationAdd.css';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let uuid = 1;

@connect(
  state => ({SpecificationAdd: state.specificationAdd,SpecificationSearch:state.specificationSearch,CategoryCascade:state.categoryCascade}),
  dispatch => bindActionCreators({addNewSpecification}, dispatch)
)
@Form.create()
export default class SpecificationAdd extends BaseComponent {
  static propTypes = {
    SpecificationAdd: PropTypes.object.isRequired,
    SpecificationSearch: PropTypes.object.isRequired,
    addNewSpecification: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      selectDisabled: false,
    };
    this.status='000';
  }

  //保存后关闭
  onclose(){
    if(!this.state.visible) {
      return;
    }
    const loadingStatus = this.props.SpecificationAdd.loading;
    const loadedStatus = this.props.SpecificationAdd.loaded;
    var code = this.props.SpecificationAdd.code;
    var msg = this.props.SpecificationAdd.msg;
    if(code!=null){
      if(!loadingStatus && loadedStatus && code==0){
        const { form } = this.props;
        form.resetFields();
        this.setState({
          visible: false,
          selectDisabled: false,
        });
        this.status='000';
        form.resetFields();
        message.info(msg);
        this.props.onSearch();
      }else{
        message.info(msg);
      }
    }
  }

  //显示对话框
  showModal() {
    if(this.props.SpecificationSearch.cid){
      /*for(let x in this.props.CategoryCascade){
       for(let y in this.props.CategoryCascade[x]){
       let data = this.props.CategoryCascade[x][y].data.data;
       for(let z in data){
       if(data[z].cid==this.props.SpecificationSearch.cid ){
       if(data[z].hasLeaf==1 || data[z].hasLeaf=='1'){
       this.setState({
       visible: true,
       });
       }else{
       message.info("请选择终极类目！");
       return;
       }
       }
       }
       }
       }*/
      this.setState({
        visible: true,
      });
    }else{
      message.info("请选择类目！");
      return;
    }
  }

  //提交表单
  handleOk(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(this.ifRepeat(values)){
          message.warning('属性值不可重复！');
          return;
        }
        this.props.addNewSpecification(values).then(
          (result)=>{this.onclose();},
          (error)=>{message.info('保存失败！');}
        );
      }
    });
  }
  //判断属性值是否有重复 true
  ifRepeat(values) {
    var keys = values.keys;
    var attrNames=[];
    for(var i=0;i<keys.length;++i){
      var index = keys[i];
      //获取数据
      var name1='attrName-'+index;
      //拼装进入数组
      attrNames.push(values[name1]);
    }
    for(var j=0;j< attrNames.length;++j) {
      if (attrNames.indexOf(attrNames[j]) != attrNames.lastIndexOf(attrNames[j])){
        return true;
      }
    };
    return false;
  }

  //取消保存
  handleCancel(e) {
    this.props.form.resetFields();
    this.status='000';
    this.setState({
      visible: false,
      selectDisabled: false,
    });
  }

  //属性状态 status
  onChangeAttr(event) {
    console.log('radio checked', event.target.value);
    this.props.form.setFieldsValue({
      'platformCategoryAttribute.status': event.target.value,
    });
  }

  //销售属性 hasSaleAttr
  onChangeSale(event) {
    this.onDisable('a');
  }

  //类目属性 hasCategoryAttr
  onChangeCatgory(event) {
    this.onDisable('b');
  }

  //扩展属性 hasExtendAttr
  onChangeExpand(event) {
    this.onDisable('c');
  }

  //复选属性
  onChangeCheck(event) {
    console.log('radio checked', event.target.value);
    this.props.form.setFieldsValue({
      'platformCategoryAttribute.selectType': event.target.value,
    });
  }

  //有限状态流转
  onRules(status,operation){
    switch (status) {
      case '000':
        switch (operation) {
          case 'a':
            return '100'
            break;
          case 'b':
            return '010'
            break;
          case 'c':
            return '011'
            break;
        }
        break;
      case '010':
        switch (operation) {
          case 'a':
            return '110'
            break;
          case 'b':
            return '000'
            break;
          case 'c':
            return '011'
            break;
        }
        break;
      case '011':
        switch (operation) {
          case 'a':
            return '111';
            break;
          case 'b':
            return '000';
            break;
          case 'c':
            return '010';
            break;
        }
        break;
      case '100':
        switch (operation) {
          case 'a':
            return '000';
            break;
          case 'b':
            return '110';
            break;
          case 'c':
            return '111';
            break;
        }
        break;
      case '110':
        switch (operation) {
          case 'a':
            return '010';
            break;
          case 'b':
            return '100';
            break;
          case 'c':
            return '111';
            break;
        }
        break;
      case '111':
        switch (operation) {
          case 'a':
            return '011';
            break;
          case 'b':
            return '100';
            break;
          case 'c':
            return '110';
            break;
        }
        break;
    }
  }

  tranformFinalStatus(status) {
    let hasSaleAttr = status.substr(0,1);
    let hasCategoryAttr = status.substr(1,1);
    let hasExtendAttr = status.substr(2,1);
    this.props.form.setFieldsValue({
      'platformCategoryAttribute.hasSaleAttr': parseInt(hasSaleAttr),
      'platformCategoryAttribute.hasCategoryAttr': parseInt(hasCategoryAttr),
      'platformCategoryAttribute.hasExtendAttr': parseInt(hasExtendAttr),
    });
    if(status.indexOf('1')>-1){
      this.setState({
        selectDisabled: true,
      });
      this.props.form.setFieldsValue({
        'platformCategoryAttribute.selectType': 1,
      });
    }else{
      this.setState({
        selectDisabled: false,
      });
    }
  }


  //销售属性、类目属性、扩展属性，任意一个为1时，复选属性为1，并置灰
  onDisable(operation){
    const { form } = this.props;
    let result = this.onRules(this.status,operation);
    this.tranformFinalStatus(result);
    this.status = result;
  }

  //inputNumber控件
  onChangeNum(value) {
    var lengthNum = this.props.SpecificationSearch.data.result.data.length;
    console.log('change number');
    var flag = isNaN(value);
    if(!isNaN(value)){
      this.props.form.setFieldsValue({
        'platformCategoryAttribute.sortNumber': value>lengthNum?lengthNum:value,
      });
    }
  }

  //删除属性值
  remove(k) {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  //新增属性
  add() {
    uuid++
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  maxNum() {
    if(this.props.SpecificationSearch &&
      this.props.SpecificationSearch.data &&
      this.props.SpecificationSearch.data.result &&
      this.props.SpecificationSearch.data.result.data &&
      this.props.SpecificationSearch.data.result.data.length){
      return this.props.SpecificationSearch.data.result.data.length+1;
    }else{
      return 1;
    }
  }


  inputCheck(event) {
    var inputValue = event.target.value;
    inputValue = inputValue.replace(/\*/g,"");
    inputValue = inputValue.replace(/\?/g,"");
    inputValue = inputValue.replace(/\？/g,"");
    window.setTimeout(()=>{
      this.props.form.setFieldsValue({
        'platformCategoryAttribute.attrName': inputValue,
      });
    },100);
  }

  inputCheck2(k) {
    window.setTimeout(()=>{
      var str = 'attrName-'+k;
      var value = this.props.form.getFieldValue(str);
      var inputValue = value;
      inputValue = inputValue.replace(/\*/g,"");
      inputValue = inputValue.replace(/\?/g,"");
      inputValue = inputValue.replace(/\？/g,"");
      window.setTimeout(()=>{
        this.props.form.setFieldsValue({
          [`attrName-${k}`]: inputValue,
        });
      },100);
    },100);
  }


  render() {
    const maxNum = this.maxNum();
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 4 },
    };
    getFieldDecorator('keys', { initialValue: [] });
    getFieldDecorator('platformId', this.platFormId);
    getFieldDecorator('cid', { initialValue: this.props.searchCid });
    getFieldDecorator('platformCategoryAttribute',
      { initialValue: [{'attrName':'','platformId':this.platformId,'attrNameType':'0','hasCategoryAttr':'0','hasExtendAttr':'0',
        'hasSaleAttr':'0','sortNumber':{maxNum},'selectType':'0','status':'1','hasBaseAttr':'1','platformCategoryAttributeValues':[]}]
      });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k) => {
      return (
        <FormItem layout='inline' required={false} key={k}>
          {getFieldDecorator(`attrName-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入属性值名称！",
            },{
              max: 100,
              message: '属性值长度太长，请勿超过100字！'
            }],
          })(
            <Input placeholder="输入属性值名称" style={{ width: '165px',marginRight:'5px'}} maxLength="500"/>
          )}
          {getFieldDecorator(`status-${k}`, {
            initialValue: 1,
          })(
            <RadioGroup>
              <Radio value={1}>启用</Radio>
              <Radio value={0}>停用</Radio>
            </RadioGroup>
          )}
          <Icon className='dynamicbutton1' type="close-circle-o" onClick={() => this.remove(k)}/>
        </FormItem>
      );
    });

    return (
      <div>
        <Button className="ui-platform" type="primary" onClick={()=>{this.showModal();}}>+ 添加新属性</Button>
        <Modal
          maskClosable={false}
          width="630px"
          style = {{minWidth: '630px'}}
          visible={this.state.visible}
          title="添加属性"
          onOk={(e)=>{this.handleOk(e);}}
          onCancel={()=>{this.handleCancel();}}
          footer={null}
        >
          <div className="addNewSpecifications" style={{ padding: '0 0', background: '#fff',height:'350px'}}>
            <Form>
              <div className="rb1">
                <strong>属性信息：</strong>
                <FormItem label="属性名称：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.attrName', {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{ required: true, message: '请输入属性名称！' }],
                  })(
                    <Input size="default" maxLength="20" onBlur={(event)=>this.inputCheck(event)}  style={{"width":"100px"}}/>
                  )}
                </FormItem>
                <FormItem label="排序编号：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.sortNumber', {
                    initialValue: maxNum,
                    validateTrigger: 'onChange',
                    rules: [{ required: true, message: '请输入排序编号！' }],
                  })(
                    <InputNumber min={1} max={maxNum} defaultValue={maxNum} onChange={(value)=>this.onChangeNum(value)} style={{ width: '100px'}} size="default" />
                  )}
                </FormItem>
                <FormItem label="属性状态：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.status', {
                    initialValue: 1,
                  })(
                    <RadioGroup onChange={(event)=>this.onChangeAttr(event)}>
                      <Radio value={1}>启用</Radio>
                      <Radio value={0}>停用</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="销售属性：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.hasSaleAttr', {
                    initialValue: 0,
                  })(
                    <RadioGroup onChange={(event)=>this.onChangeSale(event)}>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="类目属性：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.hasCategoryAttr', {
                    initialValue: 0,
                  })(
                    <RadioGroup onChange={(event)=>this.onChangeCatgory(event)}>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="扩展属性：" {...formItemLayout}>
                  {getFieldDecorator('platformCategoryAttribute.hasExtendAttr', {
                    initialValue: 0,
                  })(
                    <RadioGroup onChange={(event)=>this.onChangeExpand(event)}>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </div>
              <div className="addSpecification1">
                <div>
                  {formItems}
                </div>
                <div>
                  <Button type="dashed" onClick={()=>this.add()} style={{ width: '100%' }}>
                    <Icon type="plus" /> 添加属性值
                  </Button>
                </div>
                {/*不需要显示的*/}
                <FormItem>
                  {getFieldDecorator('platformId',{initialValue: this.platformId})}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('platformCategoryAttribute.platformId',{initialValue: this.platformId})}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('platformCategoryAttribute.hasBaseAttr',{initialValue: 1})}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('platformCategoryAttribute.attrNameType',{initialValue: 1})}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('platformCategoryAttribute.platformCategoryAttributeValues',{initialValue: []})}
                </FormItem>
              </div>
              <div>
                <div style={{float:"right",marginLeft:'20px',marginTop:'10px'}}>
                  <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={(e)=>{this.handleOk(e)}}>
                    保存
                  </Button>
                </div>
                <div style={{float:"right" ,marginLeft:'20px',marginTop:'10px'}}>
                  <Button key="back" type="ghost" size="large" onClick={()=>{this.handleCancel()}}>
                    取消
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}



