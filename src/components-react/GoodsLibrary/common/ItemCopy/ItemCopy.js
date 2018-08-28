/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180117
 * @update:       20180117
 * @description:  商品复制
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Modal, Form, InputNumber, message} from 'jdcloudui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {insertCopyItemPublish} from './redux/item-copy_redux';
const FormItem = Form.Item;

/* **********  自定义组件  ********** */

@connect(
  state => ({search: state.search}),
  dispatch => bindActionCreators({insertCopyItemPublish}, dispatch)
)


@Form.create()
export default class itemCopy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleOk = () => {
    let params = this.props.form.getFieldsValue();
    params.itemId = this.props.itemId;
    this.props.insertCopyItemPublish(params).then(data => {
        if(data.code == 0) {
          message.success(data.msg || '操作成功');
          this.props.onSearch();
          this.handelModalHide();
        }else{
          message.error(data.msg || '操作失败');
        }
      },
      (error) => {
        message.error('操作失败');
      }
    )
  };

  handelModalShow() {
    this.setState({
      visible: true
    });
  }

  handelModalHide() {
    this.setState({
      visible: false
    });
  }

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <Modal
          title="复制商品"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={::this.handelModalHide}
        >
          <Form>
            <FormItem label="复制商品数量：" {...formItemLayout}>
              {getFieldDecorator('copyNum', {
                initialValue: 1,
              })(
                <InputNumber min={1} max={10}/>
              )}
            </FormItem>
          </Form>
        </Modal>
        <a onClick={::this.handelModalShow}>复制</a>
      </span>
    );
  }
}
