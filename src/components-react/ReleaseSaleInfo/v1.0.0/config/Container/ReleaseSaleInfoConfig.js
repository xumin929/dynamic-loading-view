/**
 * @author chenyanhua
 * @date 2018-08-03
 * @file 销售信息表格：自定义扩展列
 * /item-shop-view/configs/components-react/ReleaseSaleInfo/v1.0.0
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveConfig, searchConfig } from './redux';
import queryString from 'query-string';
import { Row, Col, Checkbox, Form, Button, message, Spin, Icon, Tooltip  } from 'jdcloudui';
import PropTypes from 'prop-types';
import ExtendFieldsFormItem from './ExtendFieldsFormItem';
const FormItem = Form.Item;
import AppConfigHoc from '../../../../AppConfig/AppConfigHoc';

import './style.css';
let ev;
@connect(state => ({ components: state.centerConfig }), { saveConfig, searchConfig })
@AppConfigHoc
@Form.create()
export default class ReleaseSaleInfoConfig extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.componentId = '';
        this.pageId = '';
        this.state = { loading: false, spinLoading: true };

    }

    /**
     * 扩展列不能为空，且扩展的列字段不能重复；
     */
    examineExtendColumnFields = (extendColumnFields) => {
        let labelArr = []; // 记录所有的label
        let ifEmpty = false; //是否存在为空字段
        extendColumnFields.forEach((item) => {
            if (item.label.length <= 0 || item.labelName.length <= 0) {
                ifEmpty = true;
                return;
            }
            labelArr.push(item.label);
        });
        const newLabelSet = new Set(labelArr);
        return {
            ifEmpty: ifEmpty, // 是否有为空字段
            ifRepeat: labelArr.length == newLabelSet.size ? false : true // label字段是否重复，true为重复，false不重复
        }
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let examin = {};

                // 如果扩展列有数据，则先进行校验
                if (values.extendColumnFields && values.extendColumnFields.length > 0) {
                    examin = this.examineExtendColumnFields(values.extendColumnFields);
                }
                if (examin.ifEmpty) {
                    message.error("扩展列数据不能为空，请输入！");
                    return;
                } else if (examin.ifRepeat) {
                    message.error("列字段不能重复，请重新输入！");
                    return;
                } else {
                    this.setState({ loading: true });
                    var that = this;
                    this.props.saveConfigHoc({ componentId: this.componentId, pageId: this.pageId, config: JSON.stringify(values) }).then(
                        (result) => {
                            that.callParent();
                            message.success('修改成功', 2);
                            that.setState({ loading: false });
                        },
                        (error) => {
                            message.error(error, 2);
                            that.setState({ loading: false });

                        }
                    )
                }
            }
        });
    }

    receiveMessage(event) {
        if(event && event.origin.indexOf('platform')>=0){
            ev = event;
        }
    }

    callParent() {
        ev && ev.source && ev.source.postMessage && ev.source.postMessage('ok', ev.origin);
    }

    componentDidMount() {
        window.addEventListener('message', this.receiveMessage, false);
        const componentId = queryString.parse(window.location.search).componentId;
        const pageId = queryString.parse(window.location.search).pageId;
        let source = window.location.href.split('/');
        let length = source.length;
        /*        this.componentId = source[length-2];
                this.pageId = source[length-1];*/
        this.componentId = componentId;
        this.pageId = pageId;
        this.props.searchConfigHoc({ componentId: this.componentId, pageId: this.pageId }).then(
            (result) => {
                this.setState({ ...result, spinLoading: false })
                this.forceUpdate();
            },
            (error) => {
                message.error(error, 2);
                this.setState({ spinLoading: false })
            }
        );
        console.log('componentId----', this.componentId)
        console.log('pageId-----', this.pageId)
    }

    render() {
        console.log('this.props.testPropsFromHoc is:', this.props.testPropsFromHoc);
        console.log('this.props.saveConfigHoc is:', this.props.saveConfigHoc);
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
        const formItemLayout = { labelCol: { span: 18 }, wrapperCol: { span: 6 } };
        const formItemLayout_full = { labelCol: { span: 3 }, wrapperCol: { span: 21 } };
        const extendTitle = <div>
                                列字段：唯一，数据库中存储使用，如果改变，则成为新列。<br />
                                列名称：展示给用户的列名称。
                            </div>;
        const extendFormItemLabel = <Tooltip title={extendTitle}>
                                        扩展列 <Icon type="question-circle-o" />
                                    </Tooltip>;
        return (
            <Spin spinning={this.state.spinLoading}>
                <div style={{ width: '600px', overflow:'auto', margin: 'auto' }}>
                    <Form>
                        <Row>
                            <Col span={4}>
                                <FormItem label="型号" {...formItemLayout}>
                                    {getFieldDecorator('modelCode', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.modelCode
                                    })(
                                        <Checkbox />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem label="物料号" {...formItemLayout}>
                                    {getFieldDecorator('productCode', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.productCode
                                    })(
                                        <Checkbox />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem label="商品条码" {...formItemLayout}>
                                    {getFieldDecorator('barCode', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.barCode
                                    })(
                                        <Checkbox />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem label="单位" {...formItemLayout}>
                                    {getFieldDecorator('skuUnit', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.skuUnit
                                    })(
                                        <Checkbox />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label={extendFormItemLabel} {...formItemLayout_full}>
                                    {getFieldDecorator('extendColumnFields', {
                                        initialValue: this.state.extendColumnFields
                                    })(
                                        <ExtendFieldsFormItem
                                            setFieldsValue={setFieldsValue}
                                            getFieldValue={getFieldValue}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <div className="buttonFooter">
                        <Button type="primary" onClick={() => this.handleSubmit()} loading={this.state.loading}>保存</Button>
                        <Button className="ml15" onClick={() => this.callParent()}>取消</Button>
                    </div>
                </div>
            </Spin>
        );
    }
    /**
     * @param e checkbox 对象
     * @param field 修改的字段
     */
    onCheckboxChange = (e, field) => {
        this.props.form.setFieldsValue({
            [field]: e.target.checked
        });
    }
}
