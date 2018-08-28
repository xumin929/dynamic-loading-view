/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  公共检索组件
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Form, Button, Input, Row, Col} from 'jdcloudui';
const FormItem = Form.Item;

/* **********  自定义组件  ********** */

class Searchs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    return (
      <div className="ui-search">
        <Row>
          <Col span={24}>
            <Form layout={this.props.layout || 'inline'}>
              <FormItem label="公司名称">
                {getFieldDecorator('companyName', {})(
                  <Input placeholder="请输入公司名称"/>
                )}
              </FormItem>
            </Form>
            <div className="r-action">
              <Button type="primary" size="large" icon="search" onClick={() => this.handleSubmitSearch()}>查询</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create()(Searchs);
