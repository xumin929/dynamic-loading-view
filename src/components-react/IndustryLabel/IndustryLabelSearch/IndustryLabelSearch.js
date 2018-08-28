/**
 * Created by huangxiao3 on 2017/5/23.
 */
/*
 输入：
 搜索方法：onSearch()
 保存搜索参数方法：onSave()
 pageSize
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {  Row, Col, Input, Form, Select, Button } from 'jdcloudui';
import  BaseComponent  from '../../Common/BaseComponent';
const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
export default class IndustryLabelSearch extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }

  //form submit function
  handleSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSave(values);
        this.props.onSearch(values).then(
          (result)=>{console.log('SearchData success')},
          (error)=>{console.log('SearchData fail')}
        );
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('tagName', { initialValue: null });
    getFieldDecorator('keyword', { initialValue: null });
    getFieldDecorator('tagStatus', { initialValue: null });

    getFieldDecorator('pageNum', { initialValue: 1 });
    getFieldDecorator('pageSize', { initialValue: this.props.pageSize });

    return(
      <div className="ui-search">
        <Row>
          <Col span={20} className="l-content">
            <Form layout='inline'>
              <FormItem label="标签名称：">
                {getFieldDecorator(`tagName`, {
                })(
                  <Input style={{ width: 120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="关键词：">
                {getFieldDecorator(`keyword`, {
                })(
                  <Input style={{ width: 120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="状态：">
                {getFieldDecorator(`tagStatus`, {
                  initialValue: "",
                })(
                  <Select size="large" allowClear={true} style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1">有效</Option>
                    <Option value="-1">无效</Option>
                  </Select>
                )}
              </FormItem>
            </Form>
          </Col>
          <Col>
            <div className="r-action">
              <Button type="primary" size="large" onClick={()=>this.handleSubmit()} style={{paddingLeft:'20px',paddingRight:'20px'}} >查 询</Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

