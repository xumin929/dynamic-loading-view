/**
 * author:liuyang
 * date:2017-03-28
 **/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Modal, Form, Input, InputNumber} from 'jdcloudui';
import {bindActionCreators} from 'redux';
@Form.create()
export default class StockoutRegister extends Component {
   constructor(props) {
      super(props);
      this.state = {
        msg: '               '
      }
  }
  handleOk = (e) => {
    this.props.form.validateFields((err, values) => {
      const { setFieldsValue } = this.props.form;
      if (!err && values.SKUcode != '' && values.SKUcode != undefined) {
        let newVal = values.SKUcode.trim();
        if(newVal.length < 10){
          this.setState({
            msg: '至少10字符'
          });
          return false;
        }else if(newVal.length > 500){
          this.setState({
            msg: '最多500个字符'
          });
          return false;
        }else{
          this.props.changeParams(values.SKUcode);
          this.setState({
            msg: '                '
          }, () => {setFieldsValue({SKUcode: ''});});
        }
        this.props.visibleStatus(false);
      }else{
        this.setState({
          msg: '回复不能为空'
        }, () => {setFieldsValue({SKUcode: ''});});
      }
    });
  };

  handleCancel = (e) => {
    const { setFieldsValue } = this.props.form;
    this.setState({
      msg:  '                '
    }, () => {setFieldsValue({SKUcode: ''}); this.props.visibleStatus(false);});
  };

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
          <Modal className="ui-platform" title="回复" visible={this.props.visible} maskClosable={false}
            onOk={::this.handleOk} onCancel={::this.handleCancel}
          >
          <Form>
            <div className="modal-form-item">
              <Form style={{margin: '0 auto'}}>
                <FormItem label="回复内容：">
                  {getFieldDecorator('SKUcode', {initialValue: ''})(
                    <Input type="textarea" rows="8" cols="120" style = {{'resize':'none'}} />
                  )}
                </FormItem>
              </Form>
              <p style = {{color: '#F04134'}}>{this.state.msg}</p>
              <span style = {{color: '#ccc'}}>(回复内容限制在10-500字以内)</span>
            </div>
          </Form>
          </Modal>
     )
   }
}