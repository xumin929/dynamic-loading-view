/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 其它设置 > 售后说明
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Radio, InputNumber, Row, Col} from 'jdcloudui';
const RadioGroup = Radio.Group;

/* **********  自定义组件  ********** */

class AfterHelp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const colLeft = 1;
    const colRight = 22;
    const radioBlock = {
      display: 'block',
      marginBottom: '10px'
    };
    return (
      <div className="mt15">
        <strong className="f-fs14">售后说明</strong>
        <Row>
          <Col span={colLeft} className="f-tac text-999">退货：</Col>
          <Col span={colRight}>
            <RadioGroup >
              <Radio value={1} style={radioBlock}>特殊商品，一经签收非质量问题不予退货</Radio>
              <Radio value={2} style={radioBlock}>确认收货后<span className="ml5 mr5"><InputNumber min={1} /></span>日内可与卖家协商退货，可能需要扣除部分货款作为卖家的损失</Radio>
            </RadioGroup>
          </Col>
        </Row>
        <Row>
          <Col span={colLeft} className="f-tac text-999">换货：</Col>
          <Col span={colRight}>
            <RadioGroup >
              <Radio value={1} style={radioBlock}>特殊商品，一经签收非质量问题不予换货</Radio>
              <Radio value={2} style={radioBlock}>确认收货后<span className="ml5 mr5"><InputNumber min={1} /></span>日内可与卖家协商换货，换货过程中可能会产生一些额外费用</Radio>
            </RadioGroup>
          </Col>
        </Row>
        <Row>
          <Col span={colLeft} className="f-tac text-999 pt5">质保：</Col>
          <Col span={colRight}>
            <Row>质保期限<span className="ml5 mr5"><InputNumber min={1} max={12} /></span>个月</Row>
            <Row className="mt10">如有任何售后问题请尽量在质保期内联系卖家协商处理，超过质保期卖家不保证受理，请知悉！</Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default AfterHelp;
