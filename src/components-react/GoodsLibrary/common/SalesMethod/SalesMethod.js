/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 其它设置 > 销售方式
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {InputNumber} from 'jdcloudui';

/* **********  自定义组件  ********** */

class SalesMethod extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mt15">
        <strong className="f-fs14">销售方式</strong>
        <div className="mt10"><span className="text-999">最小起订量：</span>按单品订购大于等于<span className="mr5"><InputNumber min={1}/></span>（计量单位）方可订购</div>
        <div className="mt10"><span className="text-999">预计出货日：</span><span className="mr5"><InputNumber min={1}/></span>天</div>
      </div>
    );
  }
}
export default SalesMethod;
