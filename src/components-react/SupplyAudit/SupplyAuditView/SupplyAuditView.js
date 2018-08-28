/**
 * Created by huangxiao3 on 2017/2/17.
 */
import React, {Component} from 'react';
import { Form, Breadcrumb } from 'jdcloudui';
import SupplyList from '../SupplyList/SupplyList';
import SupplyAuditSearch from '../SupplyAuditSearch/SupplyAuditSearch';
const FormItem = Form.Item;
const pageSize = 10;
export default class SupplyAuditView extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render(){
    return(
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">商品管理</a></Breadcrumb.Item>
            <Breadcrumb.Item>供货申请审核</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">供货申请审核</div>
          <div className="ui-bd" style={{padding:'16px 16px 60px 18px'}}>
            <SupplyAuditSearch pageSize={pageSize} />
            <div style={{marginTop:'20px'}}>
              <SupplyList pageSize={pageSize} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}
