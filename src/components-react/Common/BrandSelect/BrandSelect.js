/**
 * Created by huangxiao3 on 2017/2/18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../Common/BaseComponent';
import { Select } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {brandSearch,brandSearchByCid} from './redux';
const listTip = '请选择品牌';
const allowClear = true;
var options=null;
@connect(
  state => ({BrandSelect:state.brandSelect}),
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
    this.state = {
      brandName: '',
      Name: ''
    };
    this.first = true;
    this.initName = '';
  }

  handleChange(brandId) {
    let {onChangeBrandValue} = this.props;
    onChangeBrandValue(brandId);
  }

  //根据品牌生成option
  optionSource() {
    if(this.props.goodsBrand|| (this.props.BrandSelect && this.props.BrandSelect.data && this.props.BrandSelect.data.data && this.props.BrandSelect.data.data.result)){
      let optionData;
      if(!this.props.goodsBrand){
        optionData = this.props.BrandSelect.data.data.result;
      }else{
        optionData = this.props.goodsBrand;
      }
      if(optionData && optionData.length > 0){
        options = optionData.map((option) => {
          if(this.props.brandSelectData){
            if(this.props.brandSelectData == option.id){
              this.initName = option.brandNameCh;
            }else{}
          }else{}
          return (
            <Option key={option.id} value={option.id} >{option.brandNameCh}</Option>
          );
        });
        this.props.edit && options.push(<Option key={-1} value={-1}>其它</Option>);
      }
    }else if(this.props.goodsBrand == null){
      options = null;
    }
  }
  // 初始化品牌数据
  componentWillMount() {
    if(!this.props.goods){
      if(this.props.cid){
        this.props.brandSearchByCid({
          platformId: this.platformId,
          categoryId:this.props.cid,
        });
      }else{
        this.props.brandSearch({
          platformId: this.platformId,
          pageSize:1000,
          startIndex:0,
        });
      }
    }else if(this.props.gcid != ''){
        this.props.brandSearchByCid({
          platformId: this.platformId,
          categoryId:this.props.gcid,
        });
    }else{}   
  }
  componentDidMount() {
    if(this.first){
      this.handleChange(this.props.brandId);
      this.first = false;
    } else {}
  }
  render() {
    //this.props.BrandSelect.loaded && this.optionSource();
    console.log(this.props.goodsBrand, 'this.props.goodsBrandthis.props.goodsBrandthis.props.goodsBrand');
    if(this.props.goodsBrand || this.props.goodsBrand == null){
      this.optionSource();
    }else{
      this.props.BrandSelect.loaded && this.optionSource();
    }
    return (
      <div>
       {this.props.brandSelectData && <Select placeholder="请选择" defaultValue={this.props.brandSelectData} size="large" style={{ width: 120 }} notFoundContent={listTip} allowClear={allowClear} onChange={(brandId)=>this.handleChange(brandId)}>
               {options}
             </Select>}
       {!this.props.brandSelectData && <Select placeholder="请选择" size="large" style={{ width: 120 }} notFoundContent={listTip} allowClear={allowClear} onChange={(brandId)=>this.handleChange(brandId)}>
             {options}
           </Select>}
      </div>
    );
  }

}