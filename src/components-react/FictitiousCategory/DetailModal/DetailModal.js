/**
 * Created by likaiwen on 2017/5/24.
 */
import React,{Component} from 'react';
import {Modal,message,Row,Col,Input,Form,Button,Radio} from 'jdcloudui';
import styles from '../FictitiousCategory/styles.less';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
@Form.create()
export default class DetailModal extends Component{
  constructor(props,content){
    super(props,content);
    this.state = {loading: false,value: 1, newKey: Math.random()};
  }
  //点击确定执行的操作
  onOk(){
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.setState({loading:true});
        values.level = this.props.level;
        if(this.props.level == 1) values.parentFCid = 0;
        else if(this.props.level == 2) values.parentFCid = this.props.twoParentFcId;
        console.log(values);
        if(this.props.type == 1){
          if(this.props.FC.twoData && this.props.FC.twoData.data && this.props.FC.oneData.data.length == 1){
            this.props.changeTwoParentFcId(this.props.FC.oneData.data[0].fCid);
          }
          this.props.addFictitiousCategory(values).then(
            (result)=>{
              console.log('addFictitiousCategory success');
              message.success(result.msg, 2);
              this.props.changeEdit();
              this.props.refresh(1);
              this.setState({loading: false})
              this.props.hideModal();
              this.setState({newKey: Math.random()});
            },
            (errir)=>{
              console.log('addFictitiousCategory fail');
              this.setState({loading: false})
              message.error('添加失败，请联系管理员！');
            }
          )
        }else if(this.props.type == 0){
          values.fCid = this.props.fcId;
          console.log(this.props.fcId);
          this.props.updateFictitiousCategory(values).then(
            (result)=>{
              console.log('updateFictitiousCategory success');
              message.success(result.msg, 2);
              this.props.changeEdit();
              this.setState({loading: false})
              this.props.hideModal();
              this.props.refresh();
            },
            (errir)=>{
              this.setState({loading: false})
              console.log('updateFictitiousCategory fail');
              message.error('修改失败，请联系管理员！');
            }
          )
        }
      }
    });
  }
  //点击取消的操作
  onCancel(){
    this.props.hideModal();
    this.setState({newKey: Math.random()});
  }
  //校验规则
  handleConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    let str = getFieldValue('name');
    let newStr = str.replace( /([\u4e00-\u9fa5])/g, 'aa');
    if(newStr.length > 20){
      callback('最多20个字符');
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }
  render(){
    const { getFieldDecorator,getFieldValue } = this.props.form;
    const {loading} = this.state;
    return (
      <Form inline>
        <div>
          <Modal
            key={this.state.newKey}
            title={this.props.title}
            visible={this.props.visible}
            onOk={()=>this.onOk()}
            onCancel={()=>this.onCancel()}
            maskClosable={false}
            footer={[
              <Button key="back" size="large" onClick={()=>this.onCancel()}>取消</Button>,
              <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={()=>this.onOk()}>
                确定
              </Button>,
            ]}
          >
            <p>
              <Row>
                <Col span={7} style={{textAlign:'right'}}>
                  <span style={{color:'red'}}>*</span>
                  {' ' + this.props.content + '：'}
                </Col>
                <Col span={15}>
                  <FormItem>
                    {getFieldDecorator(`name`,{
                      initialValue: this.props.name,
                      rules: [{
                        type: 'string', message: '请填写一级分类导航名称',
                      },{
                        validator: this.handleConfirmPassword
                      }, {
                        required: true, message: '请填写一级分类导航名称',
                      }],
                    })(
                      <Input placeholder={this.props.placeholder} style={{width: 150}} />
                    )}
                    <div style={{width: '100%', color: '#ccc'}}>
                      最多20个字符，支持中英文，一个英文占一个字符，一个汉字占两个字符。
                    </div>
                  </FormItem>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col span={7} style={{textAlign:'right'}}>
                  <span style={{color:'red'}}>*</span>{" 前台显示："}
                </Col>
                <Col span={8}>
                  <FormItem>
                    {getFieldDecorator(`homeShow`,{
                      initialValue: this.props.homeShow,
                      rules: [{
                        type: 'number', message: '请选择是否前台展示',
                      }, {
                        required: true, message: '请选择是否前台展示',
                      }],
                    })(
                      <RadioGroup>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </p>
          </Modal>
        </div>
      </Form>
    );
  }
}
