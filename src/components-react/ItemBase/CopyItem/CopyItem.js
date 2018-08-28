/**
 * Created by huangxiao3 on 2017/2/22.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, message, InputNumber } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { copyItem } from './redux';
import  BaseComponent  from '../../Common/BaseComponent';
import {FuncPermission}  from 'jdcloudecc/components';

const FormItem = Form.Item;

@connect(
  state => ({CopyItem:state.copyItem}),
  dispatch => bindActionCreators({copyItem}, dispatch)
)
@Form.create()
export default class CopyItem extends BaseComponent {

  static propTypes = {
    CopyItem: PropTypes.object.isRequired,
    copyItem: PropTypes.func.isRequired,
    refreshList: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
    };
  }

  handleOk() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.copyItem(values).then(
          (result)=>{this.onclose();},
          (error)=>{message.info('复制失败！');}
        );
      }
    });
  }

  onclose(){
    if(!this.state.visible) {
      return;
    }
    const loadingStatus = this.props.CopyItem.loading;
    const loadedStatus = this.props.CopyItem.loaded;
    var code = this.props.CopyItem.data.code;
    var msg = this.props.CopyItem.data.msg;
    if(code!=null){
      if(!loadingStatus && loadedStatus && code==0){
        const { form } = this.props;
        form.resetFields();
        this.setState({
          visible: false,
        });
        form.resetFields();
        message.info(msg);
        this.props.refreshList();
      }else{
        message.info(msg);
      }
    }
  }

  //显示对话框
  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleCancel() {
    //重置form
    const { form } = this.props;
    form.resetFields();
    this.setState({
      visible: false,
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    getFieldDecorator('platformId', { initialValue: this.platformId });
    getFieldDecorator('copyNum', { initialValue: 1 });
    getFieldDecorator('itemId', { initialValue: this.props.itemid });

    //菜单权限数据处理
    console.log(this.props.funcPermissions);
    let permissionData = this.props.funcPermissions.data;
    if(permissionData && permissionData.code != 0){
      message.warning("菜单权限获取失败！");
    }
    if(permissionData && permissionData.code == 0){
      this.codesResponse = permissionData.data;
      this.codes = this.codesResponse && this.codesResponse.join(",");
    }

    return(
      <FuncPermission codes={this.codesResponse} code="copy">
        <a onClick={()=>this.showModal()}>复制</a>
          <Modal title="复制商品"
                 visible={this.state.visible}
                 onOk={()=>this.handleOk()}
                 onCancel={()=>this.handleCancel()}
                 mashClosable={false}
                 confirmLoading={this.props.CopyItem.loading}
          >
            <Form>
              <FormItem label="复制商品数量：" {...formItemLayout}>
                {getFieldDecorator('copyNum', {
                  initialValue: 1,
                })(
                  <InputNumber min={1} max={10} />
                )}
              </FormItem>
            </Form>
          </Modal>
      </FuncPermission>
    )
  }
}
