/*
 * author:ChenQi
 * date:2017-01-20
 * description:brand search
 */
import React from 'react';
import BaseComponent from '../../Common/BaseComponent';
import {Form, Input, Row, Col, Button, Select, message} from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {brandSearch, setFormValues} from './redux';
// import CategoryCascade from '../../Common/Category/CategoryCascade';
import CategoryCascade from '../../Common/PlatformCategory/CategoryCascade';
const Option = Select.Option;
const FormItem = Form.Item;

@connect(
  state => ({brandSearch: state.brandSearch}),
  dispatch => bindActionCreators({brandSearch, setFormValues}, dispatch)
)
@Form.create()
export default class BrandSearch extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.props.childComponentCallback(this);
    this.ifHasLeaf = true;
  }

  handleCategoryChange(value) {
    this.props.form.setFieldsValue({
      cid: value
    });
  }

  handleBrandSearch(event) {
    event.preventDefault();
    this.resetSubmit();
  }

  resetSubmit() {
    const values = this.props.form.getFieldsValue();
    values.cid = this.cid;
    this.props.setFormValues(values);
    this.props.brandSearch(JSON.parse(JSON.stringify(values)));
  }

  handleCategoryChange(value) {
    this.ifHasLeaf = value.ifHasLeaf; // ifHasLeaf 拿回来的节点是否为根节点 true 根节点  false 不是根节点
    this.cid = value.cid; // 当前类目CID
  }

  ifCategory(val) { // val 拿回来的节点不是根节点但是也不是父节点需要根据个人需要看此功能是否加上 为false 时 此节点为不是根节点但是下面无节点 为true时正常
    if (!val) {
      message.error('分类数据无效，请从新选择平台分类');
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="ui-search">
        <Row>
          <Col span={24} className="l-content">
            <Form onSubmit={(e) => this.handleBrandSearch(e)} layout='inline'>
              <FormItem label="平台分类">
                <CategoryCascade
                  ifCategory={(val) => this.ifCategory(val)}
                  isShowAllCategory={true}
                  onChangeCategoryValue={(value) => this.handleCategoryChange(value)}
                />
              </FormItem>
              <FormItem label="状态">
                {getFieldDecorator('brandStatus', {
                  initialValue: '',
                })(
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="1">有效</Option>
                    <Option value="0">无效</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="品牌中文名">
                {getFieldDecorator('brandNameCh')(
                  <Input placeholder="请输入品牌中文名"/>
                )}
              </FormItem>
              <FormItem label="品牌英文名">
                {getFieldDecorator('brandNameEn')(
                  <Input placeholder="请输入品牌英文名"/>
                )}
              </FormItem>
              <FormItem label="服务电话">
                {getFieldDecorator('telephone')(
                  <Input placeholder="请输入服务电话"/>
                )}
              </FormItem>
              <FormItem label="网址">
                {getFieldDecorator('brandUrl')(
                  <Input placeholder="请输入网址"/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('cid')(
                  <Input type='hidden'/>
                )}
              </FormItem>
              <div className="r-action">
                <Button type="primary" size="large" icon="search" htmlType="submit">查 询</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
