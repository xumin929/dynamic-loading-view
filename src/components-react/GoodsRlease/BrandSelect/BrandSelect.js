/**
 * Created by huangxiao3 on 2017/2/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../Common/BaseComponent';
import { Select } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {brandSearch,brandSearchByCid} from './redux';
const listTip = '请选择品牌';
const allowClear = true;
var options=[];
const Option = Select.Option;
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
    this.initName = '';
    this.location = null;
    this.id = null;
  }

  handleChange(id) {
    let brandId = id;
    let brandName = null;
    if (id == undefined){
      brandId = null
    }
    let brandList = this.props.goodsBrand;
    brandList.map((item,index)=>{
      if(brandId == item.id){
        brandName = item.brandNameCh ? item.brandNameCh : item.brandNameEn
      }
    })
    this.props.onChangeBrandValue(brandId,brandName);
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
              this.initName = option.brandNameCh ? option.brandNameCh : option.brandNameEn;
            }
          }
          return (
            <Option key={option.id}
                    value={option.id} >
                    {option.brandNameCh ? option.brandNameCh : option.brandNameEn}
            </Option>
          );
        });
        //this.props.edit && options.push(<Option key={-1} value={-1}>其它</Option>);
        options.push(<Option key={-1} value={-1}>其它</Option>);
      }else{
        options = <Option key={-1} value={-1}>其它</Option>;
      }
    }else if(this.props.goodsBrand == null){
      options = <Option key={-1} value={-1}>其它</Option>;
    }
  }
  // 初始化品牌数据
  getUrlParam(url, name) {
        var pattern = new RegExp('[?&]' + name + '\=([^&]+)', 'g');
        var matcher = pattern.exec(url);
        var items = null;
        if (matcher !== null) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            }
            catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                }
                catch (e) {
                    items = matcher[1];
                }
            }
        }
        return items;
    }
  componentWillMount() {
    this.location = typeof window !== 'undefined' ? window.location.href : "";
    this.id = this.getUrlParam(this.location, 'itemId');
    if(!this.props.goods){
      if(this.props.cid){
        this.props.brandSearchByCid({
          platformId: this.platformId,
          categoryId:this.props.cid,
          itemId: this.id ? this.id : null,
        },this.id);
      }else{
        this.props.brandSearch({
          platformId: this.platformId,
          pageSize:1000,
          startIndex:0,
          itemId: this.id ? this.id : null,
        },this.id);
      }
    }else if(this.props.gcid != ''){
        this.props.brandSearchByCid({
          platformId: this.platformId,
          categoryId:this.props.gcid,
          itemId: this.id ? this.id : null,
        },this.id);
    }
  }
  componentDidMount() {
      if(this.props.brandId2){
        this.handleChange(this.props.brandId2);
      }
  }
  render() {
    if(this.props.goodsBrand || this.props.goodsBrand == null){
      this.optionSource();
    }else{
      this.props.BrandSelect.loaded && this.optionSource();
    }
    return (
      <div>
       {this.props.brandSelectData && <Select placeholder="请选择" defaultValue={this.props.brandSelectData} size="large" style={{ width: 120 }} notFoundContent={listTip} allowClear={allowClear} onChange={(brandId)=>this.handleChange(brandId)}>
              {this.props.clearAll ? <Option key={-1} value={-1}>其它</Option> : options}
             </Select>}
       {!this.props.brandSelectData && <Select placeholder="请选择" size="large" style={{ width: 120 }} notFoundContent={listTip} allowClear={allowClear} onChange={(brandId)=>this.handleChange(brandId)}>
              {this.props.clearAll ? <Option key={-1} value={-1}>其它</Option> : options}
           </Select>}
      </div>
    );
  }

}
