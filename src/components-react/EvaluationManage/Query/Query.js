/**
 * author:liuyang
 * date:2017-03-28
**/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Layout, Breadcrumb, Form, Icon, Input, Button, Select, Row, Col, DatePicker, TimePicker} from 'jdcloudui';
//import styles from 'containers/StockoutManage/style/StockoutManage';
import {bindActionCreators} from 'redux';
import InputSelectWrap from '../InputSelect/InputSelect';
import  './Query.css';
const Option = Select.Option;
@Form.create()
export default class Query extends Component {
   constructor(props,context) {
      super(props,context);
      this.state = {
        startValue: null,
        endValue: null,
        endOpen: false,
      }
  }
  componentDidMount() {
    this.props.form.validateFields();
  }
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  //结束时间不能大于开始时间start
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    // return startValue.valueOf() > endValue.valueOf();
    return endValue.isBefore(startValue,'day')
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    // return endValue.valueOf() <= startValue.valueOf();
    return endValue.isBefore(startValue,'day')
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    // this.onChange('startValue', value);
    this.props.form.setFieldsValue({
      dateStart: value,
    });
  }

  onEndChange = (value) => {
    // this.onChange('endValue', value);
    this.props.form.setFieldsValue({
      endValue: value,
    });
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  //结束时间不能大于开始时间end
  handleSubmit = (e) => {
    e.preventDefault();
    let values = {};
    let datestart;
    let dateend;
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log('Received values of form: ', fieldsValue);
      }else{}
      if(fieldsValue['date-start']!='' && fieldsValue['date-start'] != undefined){
        datestart = fieldsValue['date-start'].format('YYYY-MM-DD');
      }else{
        datestart = '';
      }
      if(fieldsValue['date-end']!='' && fieldsValue['date-end'] != undefined){
        dateend = fieldsValue['date-end'].format('YYYY-MM-DD');
      }else{
        dateend = '';
      }
      fieldsValue.shopId = fieldsValue.selectObj.id;
      fieldsValue.shopName = fieldsValue.selectObj.name;
      delete fieldsValue.selectObj;
     values = {
        ...fieldsValue,
        'dateStart': datestart,
        'dateEnd': dateend,
      };
    });
    this.props.changeQuery(values);
  };
  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
      const dataArr = this.props.dataArr.filter(item => item.shopName);
      const type = {id: 'shopId', name: 'shopName'};
      const { startValue, endValue, endOpen, zIndex, flag, value } = this.state;
      const FormItem = Form.Item;
      const formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      }; //样式
      const formItemLayout2 = {
        labelCol: { span: 7 },
        wrapperCol: { span: 28 },
      }; //样式
      const config = {
        rules: [{ type: 'object', required: false, message: 'Please select time!' }],
      };

      const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
      const serialNumberError = isFieldTouched('serialNumber') && getFieldError('serialNumber'); //isFieldTouched判断是否任一输入控件经历过 getFieldDecorator 的值收集时机 options.trigger
      const submitTimeStartError = isFieldTouched('submitTimeStart') && getFieldError('submitTimeStart'); //getFieldError 获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error
      const statusError = isFieldTouched('status') && getFieldError('status');
      return (
        <div className={"ui-search" + ' ' + 'evalutionQuery'}>
        <Row>
          <Col className="l-content" span = {20}>
            <Form layout="inline"
                   onSubmit={this.handleSubmit}
                   >
                  <FormItem
                    validateStatus={serialNumberError ? 'error' : ''}
                    label="商品名称"
                     >
                    <div>
                      {getFieldDecorator('itemName', {
                        rules: [{ required: false, message: '请输入商品名称!' }],
                      })(
                        <Input placeholder="请输入商品名称" size = 'large'/>
                      )}
                    </div>
                  </FormItem>
                  <FormItem
                    validateStatus={serialNumberError ? 'error' : ''}
                    label="商品编码"
                  >
                    <div>
                      {getFieldDecorator('shopNumber', {
                        rules: [{ required: false, message: '请输入商品编码!' }],
                      })(
                        <Input placeholder="请输入商品编码" size = 'large'/>
                      )}
                    </div>
                  </FormItem>
                  <FormItem
                    validateStatus={serialNumberError ? 'error' : ''}
                    label="sku编码"
                  >
                    {getFieldDecorator('SKUNumber', {
                      rules: [{ required: false, message: '请输入sku编码!' }],
                    })(
                      <Input placeholder="请输入sku编码" size = 'large'/>
                    )}
                  </FormItem>
                  <FormItem label="店铺名称">
                    {getFieldDecorator('selectObj', {initialValue: ''})(
                      <InputSelectWrap dataArr={dataArr} type={type} style={{width: 153, height: '32px'}} />
                    )}
                  </FormItem>
                  <FormItem
                    validateStatus={submitTimeStartError ? 'error' : ''}
                    label="用户名称"
                  >
                    {getFieldDecorator('userName', {
                      rules: [{ required: false, message: '请输入用户名称!' }],
                    })(
                      <Input placeholder="请输入用户名称" size = 'large'/>
                    )}
                  </FormItem>
                  <FormItem
                    validateStatus={submitTimeStartError ? 'error' : ''}
                    label="评价时间"
                  >
                    {getFieldDecorator('date-start', config)(
                      <DatePicker
                      disabledDate={::this.disabledStartDate}
                      //showTime
                      //format="YYYY-MM-DD HH:mm:ss"
                      // value={startValue}
                      placeholder="请选择日期"
                      onChange={::this.onStartChange}
                      onOpenChange={::this.handleStartOpenChange}
                      />
                    )}
                    &nbsp;&nbsp;至&nbsp;&nbsp;
                    {getFieldDecorator('date-end', config)(
                      <DatePicker
                      disabledDate={::this.disabledEndDate}
                      //showTime
                      //format="YYYY-MM-DD HH:mm:ss"
                      // value={endValue}
                      placeholder="请选择日期"
                      onChange={::this.onEndChange}
                      open={endOpen}
                      onOpenChange={::this.handleEndOpenChange}
                      />
                    )}
                  </FormItem>
                  <FormItem
                    validateStatus={statusError ? 'error' : ''}
                    label="评价等级"
                  >
                    {getFieldDecorator('status', {
                      rules: [{ required: false, message: '请选择评价等级!' }],
                      initialValue: '0',
                    })(
                       <Select
                       style = {{width: '153px'}}
                       size = 'large'
                        >
                          <Option value="0">全部</Option>
                          <Option value="5">五星</Option>
                          <Option value="4">四星</Option>
                          <Option value="3">三星</Option>
                          <Option value="2">二星</Option>
                          <Option value="1">一星</Option>
                        </Select>
                    )}
                  </FormItem>
              <FormItem
                validateStatus={statusError ? 'error' : ''}
                label="显示状态"
              >
                {getFieldDecorator('isdisplay', {
                  rules: [{ required: false, message: '请选择显示状态!' }],
                  initialValue: '-1',
                })(
                  <Select
                    style = {{width: '153px'}}
                    size = 'large'
                  >
                    <Option value="-1">全部</Option>
                    <Option value="2">隐藏</Option>
                    <Option value="1">显示</Option>
                  </Select>
                )}
              </FormItem>
                  <FormItem
                    validateStatus={submitTimeStartError ? 'error' : ''}
                    label="订单编号"
                  >
                    {getFieldDecorator('submitTimeStart', {
                      rules: [{ required: false, message: '请输入订单编号!' }],
                    })(
                      <Input placeholder="请输入订单编号" size = 'large'/>
                    )}
                  </FormItem>
            </Form>
          </Col>
          <Col className="r-action">
            <Button
              type="primary"
              size="large"
              style={{paddingLeft:'20px',paddingRight:'20px', top:'28%'}}
              disabled={this.hasErrors(getFieldsError())}
              onClick = {::this.handleSubmit}
            >
              查询
            </Button>
           <Button
              type="primary"
              size="large"
              style={{paddingLeft:'20px',paddingRight:'20px', top:'62%'}}
              onClick = {::this.handleReset}
            >
              重置
            </Button>
          </Col>
        </Row>
       </div>
       )
  }
}
