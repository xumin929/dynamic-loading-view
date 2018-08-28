/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 规格参数
 * *********************************************/
/* **********  系统组件  ********** */
import React, { Component } from 'react';
import { Input, Select, Row, Col } from 'jdcloudui';
const Option = Select.Option;

/* **********  自定义组件  ********** */

class PanelItemChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: "0",
            inputValue: "",
        };
        this.values={
            desc:"",
            vid:null,
            aid:this.props.itemData.attrId
        };
    }
    componentWillMount() {
        this.checkAttributeEcho(this.props.itemData.attrId);
        //this.props.getValue(this.values,this.props.index);
        if((this.values.vid || this.values.desc != "") && !this.checkAttributeIsDisable(this.props.itemData.attrId)){
            this.props.getValue(this.values,this.props.index);
        }
    }
    /**
   * 生成规格参数展开内容select选项
   */
    creatSelectItem = (spcItems) => {
        if (spcItems.length > 0) {
            return spcItems.map((item, index) => {
                return (
                    <Option key={item.attrValueId} value={item.attrValueId}>{item.attrValueName}</Option>
                )
            })
        } else {

        }
    }
    /**
     * 判断属性是否禁用
     */
    checkAttributeIsDisable = (aid) => {
        let disable = false;
        if (this.props.disableValue) {
           JSON.parse(this.props.disableValue).map((item, index) => {
                if (aid == item.aid) {
                    disable = true;
                } else {

                }
            })
        } else {

        }
        return disable;
    }
    /**
     * 判断属性值回显
     */
    checkAttributeEcho = (aid) => {
        if (this.props.specAttributes&&this.props.specAttributes.length>0) {
            //新建商品
            this.props.specAttributes.map((item, index) => {
                if (aid == item.aid) {
                    this.values.vid = item.vid || null;
                    this.values.desc = item.desc;
                    this.setState({
                        selectValue: item.vid || '0',
                        inputValue: item.desc
                    })
                } else { }
            })
        } else {
            //编辑商品
            this.props.checkValue.map((item, index) => {
                if(aid==item.aid){
                    this.values.vid = item.vid || null;
                    this.values.desc=item.desc;
                    this.setState({
                        selectValue: item.vid || '0',
                        inputValue: item.desc
                    })
                }
            })
        }
    }
    /**
     * select选择框选择内容
     */
    handleSelectChange = (value) => {
        this.setState({
            selectValue: value
        });
        if(value != "0"){
            this.values.vid = value;
            this.props.getValue(this.values,this.props.index)
        }else{
            this.values.vid = null;
            this.props.getValue(undefined,this.props.index)
        }
    }
    /**
     * input 框输入内容-失焦后触发
     */
    handleInputBlur = (e) =>{
        this.values.desc=e.target.value;
        //this.props.getValue(this.values,this.props.index)
        if((this.values.vid || this.values.desc != "") && !this.checkAttributeIsDisable(this.props.itemData.attrId)){
            this.props.getValue(this.values,this.props.index)
        }else{
            this.props.getValue(undefined,this.props.index)
        }
    };

    render() {
        return (
            <Row className="mb20" key={this.props.itemData.attrId}>
                <Row>{this.props.itemData.attrName}：</Row>
                <Row className="mt10">
                    <Col span={3}>
                        <Select
                            size="large"
                            defaultValue="0"
                            style={{ width: '95%' }}
                            onChange={this.handleSelectChange}
                            disabled={this.checkAttributeIsDisable(this.props.itemData.attrId)}
                            value={(this.state.selectValue && parseInt(this.state.selectValue)) || '0'}
                        >
                            <Option value="0">请选择</Option>
                            {this.creatSelectItem(this.props.itemData.platformCategoryAttributeValues)}
                        </Select>
                    </Col>
                    <Col span={11}>
                        <Input
                            size="large"
                            maxLength={200}
                            defaultValue={this.state.inputValue}
                            disabled={this.checkAttributeIsDisable(this.props.itemData.attrId)}
                            // onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                        />
                    </Col>
                </Row>
            </Row>
        );
    }
}
export default PanelItemChild;
