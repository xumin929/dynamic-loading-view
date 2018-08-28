/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 其它设置 > 优惠支持
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Radio, Checkbox} from 'jdcloudui';
const RadioGroup = Radio.Group;

/* **********  自定义组件  ********** */

class Preferential extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mt15">
        <strong className="f-fs14">优惠支持</strong>
        <div className="mt10">
          可用优惠券：
          <RadioGroup >
            <Checkbox value={1}>代金券</Checkbox>
            <Checkbox value={2}>满减券</Checkbox>
          </RadioGroup>
        </div>
        <div className="mt10">
          <span style={{marginLeft: '12px'}}>会员折扣：</span>
          <RadioGroup >
            <Radio value={1}>支持</Radio>
            <Radio value={2}>不支持</Radio>
          </RadioGroup>
        </div>
      </div>
    );
  }
}
export default Preferential;
