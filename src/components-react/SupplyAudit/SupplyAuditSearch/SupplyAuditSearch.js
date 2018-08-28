/**
 * Created by huangxiao3 on 2017/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { supplyAuditSearch,saveFormData} from './redux';
import {  Row, Col, Input, Form, Button ,message } from 'jdcloudui';
import CategoryCascade from '../../Common/PlatformCategory/CategoryCascade';
import BrandSelectBasic from '../../Common/BrandSelectBasic/BrandSelectBasic';
import OperatorSelect from '../../Common/OperatorSelect/OperatorSelect';
import  BaseComponent  from '../../Common/BaseComponent';
import InputBrand from '../../Common/InputBrand/InputBrand';
import { queryBrand } from '../../Common/BrandSelectBasic/redux';
const FormItem = Form.Item;

@connect(
  state => ({SupplyAuditSearch:state.supplyAuditSearch,brandData:state.queryBrand}),
  dispatch => bindActionCreators({supplyAuditSearch,saveFormData,queryBrand}, dispatch)
)
@Form.create()
export default class SupplyAuditSearch extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    this.ifHasLeaf = false;
  }
    componentWillMount(){
        this.props.queryBrand();
    }
  static propTypes = {
    SupplyAuditSearch: PropTypes.object.isRequired,
    supplyAuditSearch: PropTypes.func.isRequired,
    saveFormData: PropTypes.func.isRequired,
  };

  //form submit function
  handleSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.brandId = values.brand && (values.brand.id && values.brand.id || -5) || null;
        delete values.brand;
        console.log('Received values of form: ', values);
        //保存搜索数据
        this.props.saveFormData(values);
        this.props.supplyAuditSearch(values).then(
          (result)=>{console.log('SearchData success')},
          (error)=>{console.log('SearchData fail')}
        );
      }
    });
  }

  /**
   * 获取最终选择的平台类目id
   * @param value
   */
 /* handleCategoryChange (value) {
    this.props.form.setFieldsValue({
      'cid': value
    });
  }*/

  /**
   * 获取最终选择的品牌id
   * @param value
   */
  handleBrandSelectChange (value) {
    console.log(value);
    this.props.form.setFieldsValue({
      'brandId': value
    });
  }


  handleOperatorSelectChange (value) {
    console.log(value);
    this.props.form.setFieldsValue({
      'operatorId': value
    });
  }

  handleCategoryChange (value) {
    this.ifHasLeaf = value.ifHasLeaf;
    this.props.saveFormData(value.cid);
    this.props.form.setFieldsValue({
      'cid': value.cid
    });
  }
  ifCategory(val){
    if(!val){
      message.error('分类数据无效，请从新选择平台分类');
    }else{}
  }
  render() {
    //form bind
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let brandArr = this.props.brandData.data && this.props.brandData.data.data || [];
    brandArr = brandArr.map(item => {
        if(!item.brandNameCh){
            item.brandNameCh = item.brandNameEn;
        }
        return item;
    });
    getFieldDecorator('platformId', { initialValue: this.platformId });
    getFieldDecorator('userId', { initialValue: 1111 });
    getFieldDecorator('cid', { initialValue: null });
    getFieldDecorator('brandId', { initialValue: null });
    getFieldDecorator('itemId', { initialValue: null });
    getFieldDecorator('itemName', { initialValue: null });
    getFieldDecorator('modelCode', { initialValue: null });
    getFieldDecorator('barCode', { initialValue: null });
    getFieldDecorator('productCode', { initialValue: null });
    getFieldDecorator('operatorId', { initialValue: null });

    /*getFieldDecorator('pageVo', { initialValue:
      {'totalCount':'','startIndex':'','pageSize':pageSize,'orderField':'','orderType':''}
    });*/

    getFieldDecorator('pageNum', { initialValue: 1 });
    getFieldDecorator('pageSize', { initialValue: this.props.pageSize });
    getFieldDecorator('orderField', { initialValue: null });
    getFieldDecorator('orderType', { initialValue: null });
    //form bind finish

    return(
      <div className="ui-search">

          <Row>
            <Col span={24} className="l-content">
              <Form layout='inline'>
              <FormItem label="平台分类：">
                {getFieldDecorator(`cid`, {
                })(
                 <CategoryCascade ifCategory = {(val)=>this.ifCategory(val)} isShowAllCategory = {true}  onChangeCategoryValue = {(value) => this.handleCategoryChange(value)}></CategoryCascade>
                )}
              </FormItem>
              <FormItem label="品牌：">
                {getFieldDecorator(`brand`, {
                })(
                    <InputBrand dataArr={brandArr} type={{id: 'id', name: 'brandNameCh', enName: 'brandNameEn'}} />
                )}
              </FormItem>
              <FormItem label="商品名称：">
                {getFieldDecorator(`itemName`, {
                })(
                  <Input style={{ width:120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品库编码：">
                {getFieldDecorator(`itemId`, {
                })(
                  <Input style={{ width:120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="物料号：">
                {getFieldDecorator(`productCode`, {
                })(
                  <Input style={{ width:120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品条码：">
                {getFieldDecorator(`barCode`, {
                })(
                  <Input style={{ width:120 }} placeholder=""/>
                )}
              </FormItem>
              <FormItem label="商品运营：">
                {getFieldDecorator(`operatorId`, {
                })(
                  <OperatorSelect onChangeOperatorValue={(value)=>this.handleOperatorSelectChange(value)}/>
                )}
              </FormItem>
                <div className="r-action">
                  <Button type="primary" size="large" onClick={()=>this.handleSubmit()} style={{ paddingLeft:'20px',paddingRight:'20px'}}>查 询</Button>
                </div>
              </Form>
              </Col>
          </Row>

      </div>
    )
  }
}

