/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 其它设置 > 运费信息
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Radio, Checkbox} from 'jdcloudui';
const RadioGroup = Radio.Group;

/* **********  自定义组件  ********** */

class FreightInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const radioBlock = {
      display: 'block',
      marginTop: '10px'
    };
    return (
      <div className="mt15">
        <strong className="f-fs14">运费信息</strong>
        <div>
          <RadioGroup>
            <Radio value={1} style={radioBlock}>商品价格已包含运费（选择此项时请记得将运费分摊至商品单价里)</Radio>
            <Radio value={2} style={radioBlock}>选择合适的物流公司运输，运费到付（不需要在产品单价里加运费，买家根据实际费用支付）</Radio>
          </RadioGroup>
        </div>
        <Checkbox className="mt10">同城可送货上门</Checkbox>
      </div>
    );
  }
}
export default FreightInfo;
