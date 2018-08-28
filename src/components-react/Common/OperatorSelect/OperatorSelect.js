/**
 * Created by huangxiao3 on 2017/2/24.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../Common/BaseComponent';
import { Select } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {operatorSearch} from './redux';
const listTip = '请选择';
const allowClear = true;

@connect(
  state => ({OperatorSelect:state.operatorSelect}),
  dispatch => bindActionCreators({operatorSearch}, dispatch)
)
export default class OperatorSelect extends BaseComponent {
  static propTypes = {
    operatorSearch: PropTypes.func.isRequired,
    OperatorSelect: PropTypes.object.isRequired,
  };
  constructor(props, context) {
    super(props, context);
  }

  handleChange(operatorId) {
    let {onChangeOperatorValue} = this.props;
    onChangeOperatorValue(operatorId);
  }

  //根据品牌生成option
  optionSource() {
    if(this.props.OperatorSelect.data.data){
      let optionData = this.props.OperatorSelect.data.data;
      if(optionData && optionData.length > 0){
        var options = optionData.map((option) => {
          return (
            <Option key={option.id} title={option.nickname ? `${option.nickname}（${option.username}）` : option.username}>
              {option.nickname ? `${option.nickname}（${option.username}）` : option.username}
            </Option>
          );
        });
        return options;
      }
    }
  }

  componentWillMount() {
    this.props.operatorSearch({
      platformId: this.platformId,
    });
  }

  render() {
    let options = this.props.OperatorSelect && this.props.OperatorSelect.loaded && this.optionSource();
    return (
      <Select size="large" style={{ width: 200 }} notFoundContent={listTip} allowClear={allowClear} onChange={(operatorId)=>this.handleChange(operatorId)}>
        {options}
      </Select>
    );
  }

}