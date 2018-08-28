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
    //if (true) {
      //console.log(this.props.regionPrice.data.data);
      if (this.props.regionPrice.loaded) {
      let areaData = this.props.regionPrice.data.data;
      //let areaData =  [{"id":1000008,"code":"11","parentCode":"0","name":"北京市","level":1,"yn":null,"created":null,"modified":null,"region":1},{"id":1000009,"code":"12","parentCode":"0","name":"天津市","level":1,"yn":null,"created":null,"modified":null,"region":1},{"id":1000010,"code":"13","parentCode":"0","name":"河北省","level":1,"yn":null,"created":null,"modified":null,"region":1},{"id":1000011,"code":"14","parentCode":"0","name":"山西省","level":1,"yn":null,"created":null,"modified":null,"region":1},{"id":1000012,"code":"15","parentCode":"0","name":"内蒙古自治区","level":1,"yn":null,"created":null,"modified":null,"region":1},{"id":1000013,"code":"21","parentCode":"0","name":"辽宁省","level":1,"yn":null,"created":null,"modified":null,"region":5},{"id":1000014,"code":"22","parentCode":"0","name":"吉林省","level":1,"yn":null,"created":null,"modified":null,"region":5},{"id":1000015,"code":"23","parentCode":"0","name":"黑龙江省","level":1,"yn":null,"created":null,"modified":null,"region":5},{"id":1000016,"code":"31","parentCode":"0","name":"上海市","level":1,"yn":null,"created":null,"modified":null,"region":2},{"id":1000017,"code":"32","parentCode":"0","name":"江苏省","level":1,"yn":null,"created":null,"modified":null,"region":2},{"id":1000018,"code":"33","parentCode":"0","name":"浙江省","level":1,"yn":null,"created":null,"modified":null,"region":2},{"id":1000019,"code":"34","parentCode":"0","name":"安徽省","level":1,"yn":null,"created":null,"modified":null,"region":2},{"id":1000020,"code":"35","parentCode":"0","name":"福建省","level":1,"yn":null,"created":null,"modified":null,"region":4},{"id":1000021,"code":"36","parentCode":"0","name":"江西省","level":1,"yn":null,"created":null,"modified":null,"region":2},{"id":1000022,"code":"37","parentCode":"0","name":"山东省","level":1,"yn":null,"created":null,"modified":null,"region":1},{"id":1000023,"code":"41","parentCode":"0","name":"河南省","level":1,"yn":null,"created":null,"modified":null,"region":3},{"id":1000024,"code":"42","parentCode":"0","name":"湖北省","level":1,"yn":null,"created":null,"modified":null,"region":3},{"id":1000025,"code":"43","parentCode":"0","name":"湖南省","level":1,"yn":null,"created":null,"modified":null,"region":3},{"id":1000026,"code":"44","parentCode":"0","name":"广东省","level":1,"yn":null,"created":null,"modified":null,"region":4},{"id":1000027,"code":"45","parentCode":"0","name":"广西壮族自治区","level":1,"yn":null,"created":null,"modified":null,"region":4},{"id":1000028,"code":"46","parentCode":"0","name":"海南省","level":1,"yn":null,"created":null,"modified":null,"region":4},{"id":1000029,"code":"50","parentCode":"0","name":"重庆市","level":1,"yn":null,"created":null,"modified":null,"region":7},{"id":1000030,"code":"51","parentCode":"0","name":"四川省","level":1,"yn":null,"created":null,"modified":null,"region":7},{"id":1000031,"code":"52","parentCode":"0","name":"贵州省","level":1,"yn":null,"created":null,"modified":null,"region":7},{"id":1000032,"code":"53","parentCode":"0","name":"云南省","level":1,"yn":null,"created":null,"modified":null,"region":7},{"id":1000033,"code":"54","parentCode":"0","name":"西藏自治区","level":1,"yn":null,"created":null,"modified":null,"region":7},{"id":1000034,"code":"61","parentCode":"0","name":"陕西省","level":1,"yn":null,"created":null,"modified":null,"region":6},{"id":1000035,"code":"62","parentCode":"0","name":"甘肃省","level":1,"yn":null,"created":null,"modified":null,"region":6},{"id":1000036,"code":"63","parentCode":"0","name":"青海省","level":1,"yn":null,"created":null,"modified":null,"region":6},{"id":1000037,"code":"64","parentCode":"0","name":"宁夏回族自治区","level":1,"yn":null,"created":null,"modified":null,"region":6},{"id":1000038,"code":"65","parentCode":"0","name":"新疆维吾尔自治区","level":1,"yn":null,"created":null,"modified":null,"region":6},{"id":1000039,"code":"71","parentCode":"0","name":"台湾省","level":1,"yn":null,"created":null,"modified":null,"region":8},{"id":1000040,"code":"81","parentCode":"0","name":"香港特别行政区","level":1,"yn":null,"created":null,"modified":null,"region":8},{"id":1000041,"code":"82","parentCode":"0","name":"澳门特别行政区","level":1,"yn":null,"created":null,"modified":null,"region":8},{"id":1003532,"code":"83","parentCode":"0","name":"钓鱼岛","level":1,"yn":null,"created":null,"modified":null,"region":8}];
      let areaOptions = areaData.map((item) => {
        let nArry = {};
        nArry.label = item.name;
        nArry.value = item.id;
        return nArry;
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
