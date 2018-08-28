/**
 * Created by liurenpeng on 2018/7/30.
 */
import React, {Component, PropTypes} from 'react';
import { Input, Form, Select, Button ,message} from 'jdcloudui';
import CategoryCascade from '../../Common/PlatformCategory/CategoryCascade';
import './style.css'

const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
export default class GoodsTemplateSearch extends Component {
  constructor(props, context) {
    super(props, context);
    this.ifHasLeaf = false;
  }

  /**
   * 获取最终选择的平台类目id
   * @param value
   */
  handleCategoryChange (value) {
    this.ifHasLeaf = value.ifHasLeaf;
    this.props.form.setFieldsValue({
      cid: value.cid
    });
	}

	ifCategory(val){
    if(!val){
      message.error('分类数据无效，请重新选择平台分类');
    }
  }
	
	handleSearch = ()=>{
		this.props.form.validateFields((err, values) => {
      if (!err) {
				values.cid = values.cid ? values.cid : null;
				values.tmplName = values.tmplName ? values.tmplName : null;
				values.status = values.status == '2' ? null : values.status;
				console.log(values);
				this.props.onSearchClick(values);
      }
    });
	}

	handleReset = ()=>{
		this.props.handleReset()
	}

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="ui-search">
            <Form layout='inline'>
              <FormItem label="平台分类：">
                {getFieldDecorator(`cid`, {
                })(
                  <CategoryCascade ifCategory = {(val)=>this.ifCategory(val)} isShowAllCategory = {true}  onChangeCategoryValue = {(value) => this.handleCategoryChange(value)}></CategoryCascade>
                )}
              </FormItem>
              <FormItem label="模板名称：">
                {getFieldDecorator(`tmplName`, {
                })(
                    <Input style={{ width: 300 }}/>
                )}
                </FormItem>
              <FormItem label="模板状态：">
                {getFieldDecorator(`status`, {initialValue: '2' })(
                  <Select size="large" allowClear={true} style={{ width: 120 }}>
                    <Option value="2">全部</Option>
                    <Option value="1">启用</Option>
                    <Option value="0">停用</Option>
                  </Select>
                )}
              </FormItem>
              <div className="r-action">
                <Button style={{top: '25%',paddingLeft:'20px',paddingRight:'20px',fontSize:'12px'}} type="primary" htmlType="submit" onClick={() => this.handleSearch()}>查 询</Button>
                <Button style={{top: '75%',paddingLeft:'20px',paddingRight:'20px',fontSize:'12px'}} htmlType="reset" onClick={this.handleReset}>重 置</Button>
              </div>
            </Form>
      </div>
    )
  }
}

