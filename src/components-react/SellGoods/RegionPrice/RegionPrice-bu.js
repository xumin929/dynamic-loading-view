/**
 * Created by zhanghaitian on 2017/2/18.
 */

import React from 'react';
import { Modal, Button, Form, Input, Icon, Row, Col,Popover, Checkbox } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  BaseComponent  from '../../Common/BaseComponent';
import  './style/regionPrice.css';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
import {getAddress} from './redux';

let uuid = 1;
@Form.create()

@connect(
  state => ({regionPrice: state.regionPrice}),
  dispatch => bindActionCreators({getAddress}, dispatch)
)
export default class RegionPrice extends BaseComponent {
  //构造函数 设置state的初始值
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: this.props.visible
    };
  }

  componentWillMount() {
    this.props.getAddress();
  }

  //父组件里的props 更新组件自身的内部state
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  handleOk() {

  }

  //删除地域
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  //添加地域
  add = () => {
    uuid++;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      keys: nextKeys,
    });

  }

  hideArea() {
    this.setState({
      pVisible: false,
    });
  }

  showArea = (index) => {
    this.props.regionPrice.loaded && this.areaDataSource();
    this.setState({
      pVisible: true,
    });
  }


  //查询地域
  areaDataSource() {
    if (this.props.regionPrice.loaded) {
      //console.log(this.props.regionPrice.data.data);
      let areaData = this.props.regionPrice.data.data;

      let areaOptions = areaData.map((item) => {
        let o = {};
        o.label = item.name;
        o.value = item.id;
        return o;
      })

      return areaOptions
    }
  }



  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', {initialValue: [1]});

    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 21},
    };

    const keys = getFieldValue('keys');

    function onChange(checkedValues) {
      console.log('checked = ', checkedValues);
    }

    const areaList = (
      <div className="areaList w500">
        <CheckboxGroup options={this.areaDataSource()} onChange={onChange}/>
        <div className="popButton">
          <Button type="default" size="small" onClick={()=>this.hideArea()}>取消</Button>
          <Button type="primary" size="small" onClick={()=>this.hideArea()}>确定</Button>
        </div>
      </div>
    );


    const formItems = keys.map((k, index) => {
      return (
        <div key={k}>
          <FormItem>
            <Row>
              <Col span={3} className="selectRegion">
                <Popover
                  content={areaList}
                  trigger="click"
                  placement="bottomLeft"
                  item={index}
                  visible={this.state.pVisible}
                >
                  <a onClick={()=>this.showArea(index)}>选择地域<Icon type="caret-down"/></a>
                </Popover>
              </Col>
              <Col span={21}>
                <div className="areaTitle"></div>
              </Col>
            </Row>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="供货价"
          >
            <span>￥</span><span className="w160"><Input /></span><a className="actionDel" disabled={keys.length === 1} onClick={() => this.remove(k)}>删除地域</a>
          </FormItem>
        </div>
      );
    });

    return (
      <div>
        <Modal
          title={'设置地域价'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={()=>this.handleCancel()}
          width={'640'}
          footer={[
          <Button key="back" size="large" onClick={()=>this.handleCancel()}>取 消</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.handleOk}>保存</Button>
          ]}
          maskClosable={false}
        >
          <Form>
            <div className="countryBox">
              <h3>全国统一价</h3>
              <FormItem
                {...formItemLayout}
                label="供货价"
              >
                <span>￥</span><span className="w160"><Input /></span>
              </FormItem>
            </div>
            <div className="regionBox">
              <h3>地域价</h3>
              <div className="regionList">

                {formItems}

                <Button type="dashed" size="large" icon="plus" onClick={this.add} className="w-100 mt10">添加地域</Button>
              </div>
            </div>

          </Form>
        </Modal>
      </div>
    );
  }
}
