import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { sellGoodsSearch,saveFormData } from './redux';
import { Row, Col, Form, Input, Button, Select, Icon, message } from 'jdcloudui';
import CategoryCascade from '../../Common/PlatformCategory/CategoryCascade';
import BrandSelectBasic from '../../Common/BrandSelectBasic/BrandSelectBasic';
import BaseComponent  from '../../Common/BaseComponent';
import OperatorSelect from'../../Common/OperatorSelect/OperatorSelect'
import '../SaleGoods/style.css';
import {queryBrand} from '../../../components-react/Common/BrandSelectBasic/redux';
import InputBrand from '../../Common/InputBrand/InputBrand';
const FormItem = Form.Item;
const Option = Select.Option;

@connect(
  state => ({SellGoodsSearch:state.sellGoodsSearch,brandData:state.brandSelectBasic}),
  dispatch => bindActionCreators({sellGoodsSearch,saveFormData,queryBrand}, dispatch)
)
@Form.create()
export default class SellGoodsSearch extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    this.ifHasLeaf = false;
  }

    componentWillMount(){
        this.props.queryBrand();
    }
  //form submit function
  handleSubmit(){
    this.props.form.validateFields((err,values) => {
      if(!err){
          values.brandId = values.brand && (values.brand.id && values.brand.id || -5) || null;
          delete values.brand;
          this.props.saveFormData(values);
          this.props.sellGoodsSearch(values).then(
            (result)=>{console.log('SearchData success')},
            (error)=>{console.log('SearchData fail')}
          );
      }
    });
  }
  /**
    *获取最终选择的平台类目id
    *@param value
    */
  handleCategoryChange(value){
    this.ifHasLeaf = value.ifHasLeaf;
    this.props.form.setFieldsValue({
      'cid':value.cid
    });
  }
  /**
   * 获取商品运营
   * @param value
   */
  onChangeOperatorValue (value) {
    this.props.form.setFieldsValue({
      operatorId: value
    });
  }
  /**
   * 获取最终选择的品牌id
   * @param value
   */
  handleBrandSelectChange(value){
    this.props.form.setFieldsValue({
      'brandId':value
    })
  }

  ifCategory(val){
    console.log(val);
    if(!val){
      message.error('分类数据无效，请从新选择平台分类');
    }else{}
  }
  render() {
    // form bind
    const {getFieldDecorator, getFieldValue} = this.props.form;
    let brandArr = this.props.brandData.data && this.props.brandData.data.data || [];
    brandArr = brandArr.map(item => {
        if(!item.brandNameCh){
            item.brandNameCh = item.brandNameEn;
        }
        return item;
    });
    getFieldDecorator('platformId',{initialValue :this.platformId});
    getFieldDecorator('userId',{initialValue:1});

    return (
      <div className="ui-search">
        <Row>
          <Col span={24} className="l-content">
            <Form layout='inline'>
              <FormItem label="平台分类：" className='aaa'>
                <div>
                  {getFieldDecorator(`cid`,{
                  })(
                    <CategoryCascade ifCategory = {(val)=>this.ifCategory(val)} isShowAllCategory = {true}  onChangeCategoryValue = {(value) => this.handleCategoryChange(value)}></CategoryCascade>
                  )}
                </div>
              </FormItem>
              <FormItem label="商品状态：" className='aaa'>
                {getFieldDecorator(`saleStatus`,{
                  initialValue: this.props.status && this.props.status!="undefined"?this.props.status:null,
                })(
                  <Select icon={<Icon type="caret-down" />} size="large" defaultValue="" className="w120">
                    <Option value="">全部</Option>
                    <Option value='20'>待上架</Option>
                    <Option value='60'>上架</Option>
                    <Option value='50'>下架</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="商品名称：" className='aaa'>
                {getFieldDecorator(`itemName`,{
                })(
                <Input className="w120" />
                )}
              </FormItem>
              <FormItem label="商品库编码：" className='aaa'>
                {getFieldDecorator(`itemId`,{
                })(
                <Input className="w120" />
                )}
              </FormItem>
              <FormItem label="物料号：" className='aaa'>
                {getFieldDecorator(`productCode`,{
                })(
                <Input className="w120 h30" />
                )}
              </FormItem>
              <FormItem label="商品条码：" className='aaa'>
                {getFieldDecorator(`barCode`,{
                })(
                <Input className="w120 h30" />
                )}
              </FormItem>
              <FormItem label="品牌：" className='aaa'>
                <div>
                  {getFieldDecorator(`brand`,{
                  })(
                      <InputBrand dataArr={brandArr} type={{id: 'id', name: 'brandNameCh', enName: 'brandNameEn'}} />
                  )}
                </div>
              </FormItem>
              <FormItem label="商品运营：" className='aaa'>
                <div>
                  {getFieldDecorator(`operatorId`,{
                  })(
                    <OperatorSelect onChangeOperatorValue={(value)=>this.onChangeOperatorValue(value)}/>
                  )}
                </div>
              </FormItem>

              <div className="r-action">
                <Button type="primary" size="large" onClick={()=>this.handleSubmit()}>查 询</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
