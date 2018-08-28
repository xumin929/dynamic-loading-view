/**
 * Created by huangxiao3 on 2017/2/24.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../Common/BaseComponent';
import { Select } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {publishUserSearch} from './redux';
const listTip = '请选择发布者';
const allowClear = true;
var options=null;
@connect(
  state => ({PublishUserSelect:state.publishUserSelect}),
  dispatch => bindActionCreators({publishUserSearch}, dispatch)
)
export default class PublishUserSelect extends BaseComponent {
  static propTypes = {
    publishUserSearch: PropTypes.func.isRequired,
    PublishUserSelect: PropTypes.object.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    //this.idAndName={};
  }

  handleChange(publishUserId) {
    let {onChangePublishUserValue} = this.props;
    onChangePublishUserValue(publishUserId);
  }

  //根据品牌生成option
  optionSource() {
    if(this.props.PublishUserSelect.data.data){
      let optionData = this.props.PublishUserSelect.data.data;
      if(optionData && optionData.length > 0){
        options = optionData.map((option) => {
          //this.idAndName[option.username] = option.id;
          return (
            <Option key={option.id} title={option.nickname ? `${option.nickname}（${option.username}）` : option.username}>
              {option.nickname ? `${option.nickname}（${option.username}）` : option.username}
            </Option>
          );
        });
      }
    }
  }
  componentWillMount() {
    this.props.publishUserSearch({
      platformId: this.platformId,
    });
  }

  render() {
    this.props.PublishUserSelect.loaded && this.optionSource();
    return (
      <Select size="large" showSearch style={{ width: 200 }} notFoundContent={listTip} allowClear={allowClear} onChange={(publishUserName)=>this.handleChange(publishUserName)}>
        {options}
      </Select>
    );
  }

}