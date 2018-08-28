/*
 * author:ChenQi
 * date:2017-02-10
 * description:specifications search
 */
import React from 'react';
import BaseComponent from '../../Common/BaseComponent';
import { Form, Row, Col, Button, Select, Input, message} from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {specificationSearch,saveFormData} from './redux';
import CategoryCascade from '../../Common/PlatformCategory/CategoryCascade';

const Option = Select.Option;
const FormItem = Form.Item;
message.config({top: 300, duration: 2,});//设置message的位置和延迟消失时间！

@connect(
  state => ({specificationSearch:state.specificationSearch}),
  dispatch => bindActionCreators({specificationSearch, saveFormData}, dispatch)
)
@Form.create()
export default class SpecificationSearch extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.props.childComponentCallback(this);
    this.ifHasLeaf = false;
  }
  /**
   * 获取最终选择的平台类目id
   * @param value
   */
  handleCategoryChange (value) {
    console.log(value.cid,'value.cidvalue.cidvalue.cidvalue.cidvalue.cid')
    this.props.getCid(value.cid);
    this.ifHasLeaf = value.ifHasLeaf;
    this.props.saveFormData(value.cid);
    this.props.form.setFieldsValue({
      cid: value.cid
    });
  }

  /**
   * 规格参数条件查询
   * @param value
   */
  handleSearch (event) {
    event.preventDefault();
    this.resetSubmit();
  }

  resetSubmit () {

    if(!this.ifHasLeaf){
      message.error('请选择最终类目');
      return false;
    }else{}
    let values = this.props.form.getFieldsValue();
    values.platformId = this.platformId;
    if (values.cid){
       this.props.callbackstatus(true);
      this.props.specificationSearch(JSON.parse(JSON.stringify(values))).then(
        (result)=>{
          this.props.callbackstatus(false);
        },
        (error)=>{
          this.props.callbackstatus(false);
        }
        );
      this.props.saveFormData(values);
    }else {
      message.error("请选择最终类目");
    }
  }
  ifCategory(val){
    console.log(val);
    if(!val){
      message.error('分类数据无效，请重新选择平台分类');
    }else{}
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="ui-search">
        <Row>
          <Col span={24} className="l-content">
            <Form layout='inline' onSubmit={(e)=>this.handleSearch(e)}>
              <FormItem label="平台分类">
                <CategoryCascade ifCategory = {(val)=>this.ifCategory(val)} isShowAllCategory = {true}  onChangeCategoryValue = {(value) => this.handleCategoryChange(value)}></CategoryCascade>
              </FormItem>
              <FormItem label="状态">
                {getFieldDecorator('state', {
                  initialValue: '',
                })(
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="1">有效</Option>
                    <Option value="0">无效</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('cid')(
                  <Input type='hidden' />
                )}
              </FormItem>
              <div className="r-action">
                <Button type="primary" size="large" htmlType="submit">查 询</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
