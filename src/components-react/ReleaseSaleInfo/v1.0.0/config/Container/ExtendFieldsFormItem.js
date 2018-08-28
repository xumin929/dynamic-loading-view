/**
 * @author chenyanhua
 * @file form自定义表单: 扩展销售信息自定义列 
 * @date 2018-08-03
 */
import React, { Component } from 'react';
import { Button, Input, Select, Icon } from 'jdcloudui';
const Option = Select.Option;
import styles from './index.less';
export default class ExtendFieldsFormItem extends Component {
    constructor(props) {
        super(props);
        this.default = {
            label: '',
            labelName: '',
            type: 'input'
        };
        const extendColumnFields = JSON.parse(JSON.stringify(props.getFieldValue("extendColumnFields") || []));
        this.state = {
            extendColumnFields: extendColumnFields
        };
    }

    componentWillReceiveProps(nextProps) {
        const extendColumnFields = JSON.parse(JSON.stringify(nextProps.getFieldValue("extendColumnFields") || []));
        this.setState({
            extendColumnFields: extendColumnFields
        });
    }

    render() {
        const { extendColumnFields = [] } = this.state;
        const length = extendColumnFields.length;
        return (
            <div className={styles.mb}>
                {
                    extendColumnFields.map((item, index) => {
                        return (
                            <div key={index}>
                                <span className={styles.spanTitle}>
                                    列字段:
                                </span>
                                <div className={styles.inputWrap}>
                                    <Input 
                                        type='text' 
                                        value={item.label} 
                                        onChange={(e)=>{ this.onFieldChange('label', e.target.value, index); }} 
                                    />
                                </div>
                                <span className={styles.spanTitle}>
                                    列名称:
                                </span>
                                <div className={styles.inputWrap}>
                                    <Input 
                                        type='text' 
                                        value={item.labelName} 
                                        onChange={(e)=>{ this.onFieldChange('labelName', e.target.value, index); }} 
                                    />
                                </div>
                                <span className={styles.spanTitle}>
                                    列类型:
                                </span>
                                <Select 
                                    value={item.type} 
                                    style={{width: 80}}
                                    onChange={ (value) => { this.onFieldChange('type', value, index); } }
                                >
                                    <Option value='input'>文本</Option>
                                    <Option value='image'>图片</Option>
                                    <Option value='file'>文件</Option>
                                </Select>
                                <Button className={styles.iconFont} onClick={()=>{ this.handleMinus(index); }} >
                                    <Icon type="minus" />
                                </Button>
                            </div>
                        );
                    })
                }
                <div className={length>0?styles.ml:""}>
                    <Button className={styles.iconFont} onClick={this.handlePlus} >
                        <Icon type="plus" />
                    </Button>
                </div>
            </div>
        );
    }
    /**
     * 添加新列
     */
    handlePlus = () => {
        const extendColumnFields = JSON.parse(JSON.stringify(this.state.extendColumnFields || []));
        extendColumnFields.push(this.default);
        this.onFormSetFieldsValue(extendColumnFields);
    }
    /**
     * 减去列
     */
    handleMinus = (index) => {
        const extendColumnFields = JSON.parse(JSON.stringify(this.state.extendColumnFields || []));
        extendColumnFields.splice(index, 1);
        this.onFormSetFieldsValue(extendColumnFields);
    }

    /**
     * 变化字段值
     */ 
    onFieldChange = (field, value, index) => {
        const extendColumnFields = JSON.parse(JSON.stringify(this.state.extendColumnFields || []));
        extendColumnFields[index][field] = value;
        this.setState({
            extendColumnFields: extendColumnFields
        });
        this.onFormSetFieldsValue(extendColumnFields);
    }

    
  // 自定义组件，pass value to Form
  onFormSetFieldsValue = (changedValue) => {
    const setFieldsValue = this.props.setFieldsValue;
    if (setFieldsValue) {
      setFieldsValue({
        extendColumnFields: changedValue
      });
    }
  }
}
