/**
 * Created by huangxiao3 on 2017/2/14.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SpecificationsAdd from '../../Specification/SpecificationAdd/SpecificationAdd';

import Copying from '../../Specification/Copying/Copying';
import { Row, Col} from 'jdcloudui';
import {FuncPermission}  from 'jdcloudecc/components';

export default class SpecificationFuncWrapper extends Component {
  //校验
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.codesResponse = [];
    this.permissions = true;

  }
  render() {
    return (
        <Row style = {{background:'#f7f7f7',padding:'10px 15px', border: '1px solid #e9e9e9', borderBottom: 'none', marginTop: '15px'}}>
          <Col span={20}>
            {this.permissions ?
              (<FuncPermission codes = {this.props.codesResponse} code = 'addProperty'>
                          <SpecificationsAdd searchCid = {this.props.searchCid} onSearch={this.props.onSearch} />
              </FuncPermission>)
              :
              <SpecificationsAdd searchCid = {this.props.searchCid} onSearch={this.props.onSearch} />
            }
          </Col>
          <Col span={4} style={{padding:"0 3px"}}>
            {this.permissions ?
              (<FuncPermission codes = {this.props.codesResponse} code = 'copyProperty'>
                  <Copying searchCid = {this.props.searchCid}></Copying>
                </FuncPermission>)
              :
              <Copying></Copying>}
          </Col>
        </Row>
    );
  }

}
