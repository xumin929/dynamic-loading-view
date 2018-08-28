/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 基本信息设置
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Input, Select, Row, Col} from 'jdcloudui';
const Option = Select.Option;

/* **********  自定义组件  ********** */
import '../../style/table_border.css';

class BaseInfomation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/*  商品名称  */}
        <Row>
          <Col span={2}>商品名称:</Col>
          <Col span={12}><Input /></Col>
        </Row>
        {/*  平台分类  */}
        {/*  第二分类  */}
        {/*  品牌  */}
        {/*  产地  */}
        {/*  行业标签  */}
      </div>
    );
  }
}
export default BaseInfomation;
