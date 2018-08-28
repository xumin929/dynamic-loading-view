/* *********************************************
* @author: GuoRuiGuang
* @creatdDate: 20171114
* @description: 平台店铺管理列表组件-搜索
* *********************************************/
import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, Form, Input, message, Select } from 'jdcloudui';
import CategoryCascade from '../PlatformCategory/CategoryCascade';
import InputSelect from "../../Common/InputBrand/InputBrand";
const FormItem = Form.Item;
const Option = Select.Option;
@Form.create()

export default class GoodsManageSearch extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.queryBrand();
    }

    handleSearch = () => {
        let params = {
            itemName: this.props.form.getFieldValue("itemName") ? this.props.form.getFieldValue("itemName") : null,
            itemId: this.props.form.getFieldValue("itemId") ? this.props.form.getFieldValue("itemId") : null,
            skuId: this.props.form.getFieldValue("skuNo") ? this.props.form.getFieldValue("skuNo") : null,
            cId: this.props.form.getFieldValue("cid") ? this.props.form.getFieldValue("cid") : null,
            shopName: this.props.form.getFieldValue("shopName") ? this.props.form.getFieldValue("shopName") : null,
            itemStatus: this.props.form.getFieldValue("type") ? (this.props.form.getFieldValue("type") == '0' ? null : this.props.form.getFieldValue("type")) : null,
            brandId: this.props.form.getFieldValue("brand") ? (this.props.form.getFieldValue("brand").id ? this.props.form.getFieldValue("brand").id : null) : null
        };
        this.props.handleSearchClick(params);
    }
    /**
    *获取最终选择的平台类目id
    *@param value
    */
    handleCategoryChange (value) {
        this.ifHasLeaf = value.ifHasLeaf;
        this.props.form.setFieldsValue({
            'cid': value.cid
        });

      /*  if(value.ifHasLeaf){
            this.props.form.setFieldsValue({"brand": '0'});
            this.props.onSearchBrand({status:30,categoryId:value.cid})
        }*/
    }

    ifCategory(val) {
        if (!val) {
            message.error('分类数据无效，请重新选择平台分类');
        } else { }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let brandArr = this.props.brandData || [];
        brandArr = brandArr.map(item => {
            if(!item.brandNameCh){
                item.brandNameCh = item.brandNameEn;
            }
            return item;
        });
        return (
            <div className="ui-search mar-bot">
                <Row>
                    <Col span={24} className="l-content">
                        <Form layout='inline'>
                            <FormItem label="商品名称">
                                {getFieldDecorator('itemName')(
                                    <Input placeholder="请输入商品名称" />
                                )}
                            </FormItem>

                            <FormItem label="商品编码">
                                {getFieldDecorator('itemId')(
                                    <Input placeholder="请输入商品编码" />
                                )}
                            </FormItem>

                            <FormItem label="SKU编码">
                                {getFieldDecorator('skuNo')(
                                    <Input placeholder="请输入SKU编码" />
                                )}
                            </FormItem>

                            <FormItem label="平台分类：">
                                <div>
                                    {getFieldDecorator(`cid`, {
                                    })(
                                        <CategoryCascade
                                            ifCategory={(val) => this.ifCategory(val)}
                                            isShowAllCategory={true}
                                            onChangeCategoryValue={(value) => this.handleCategoryChange(value)}>
                                        </CategoryCascade>
                                        )}
                                </div>
                            </FormItem>

                            <FormItem label="店铺名称">
                                {getFieldDecorator('shopName')(
                                    <Input placeholder="请输入店铺名称" />
                                )}
                            </FormItem>

                            <FormItem label="商品状态">
                                {getFieldDecorator('type', { initialValue: '0' })(
                                    <Select style={{ width: '100px' }}>
                                        <Option value='0'>全部</Option>
                                        <Option value='30'>待审核</Option>
                                        <Option value='70'>已驳回</Option>
                                        <Option value='40'>待上架</Option>
                                        <Option value='50'>已下架</Option>
                                        <Option value='80'>锁定</Option>
                                        <Option value='60'>在售</Option>
                                        <Option value='90'>申请解锁</Option>
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem label="品牌">
                                {getFieldDecorator('brand', { initialValue: '0' })(
                                    <InputSelect dataArr={brandArr} type={{id: 'id', name: 'brandNameCh', enName: 'brandNameEn'}} />
                                )}
                            </FormItem>

                            <div className="r-action">
                                <Button style={{top: '25%'}} type="primary" size="large" htmlType="submit" onClick={(e) => this.handleSearch(e)}>查 询</Button>
                                <Button style={{top: '75%'}}  type="primary" size="large" htmlType="reset" onClick={this.props.handleReset}>重 置</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
