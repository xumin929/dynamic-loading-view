/**
 * Created by huangxiao3 on 2017/6/19.
 */
/*
* 原有公共组件brandSelect不知道被谁修改后
* 大量页面无法使用
* 在此还原原始可用组件
* */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../Common/BaseComponent';
import { Select } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {brandSearch,brandSearchByCid} from './redux';
const listTip = '请选择品牌';
const allowClear = true;
const Option = Select.Option;
@connect(
  state => ({BrandSelect:state.brandSelectBasic}),
  dispatch => bindActionCreators({brandSearch,brandSearchByCid}, dispatch)
)
export default class BrandSelect extends BaseComponent {
  static propTypes = {
    brandSearch: PropTypes.func.isRequired,
    brandSearchByCid: PropTypes.func.isRequired,
    BrandSelect: PropTypes.object.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.state={
      options:[],
    }
  }

  handleChange(brandId) {
    let {onChangeBrandValue} = this.props;
    onChangeBrandValue(brandId);
  }

  //根据品牌生成option
  optionSource(cid) {
    if(cid){
      this.props.brandSearchByCid({
        platformId: this.platformId,
        categoryId:cid,
      }).then(
        (result)=>{
          let optionData = result.data;
          if(optionData && optionData.length > 0){
            let options = optionData.map((option) => {
              return (
                <Option key={option.id} value = {option.id} >{option.brandNameCh}</Option>
              );
            });
            this.setState({
              options:options,
            })
          }
        }
      );
    }
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.cid!=this.props.cid){
      this.optionSource(nextProps.cid);
    }
  }

  render() {
    return (
      <Select size="large" style={{ width: 120 }} notFoundContent={listTip} allowClear={allowClear} onChange={(brandId)=>this.handleChange(brandId)}>
        {this.state.options}
      </Select>
    );
  }

}
