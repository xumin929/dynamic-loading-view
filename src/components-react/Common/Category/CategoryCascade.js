/*
 * author:ChenQi
 * date:2017-01-20
 * description:categoryCascade
 */
import React from 'react';
import BaseComponent from '../../Common/BaseComponent';
import { Select } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getFirstCid,getSecondCid,getThirdCid,getFourCid,clearData} from './redux';

const Option = Select.Option;
const defaultValue = '请选择';
const listTip = '请选择类目';
const allowClear = true;

@connect(
  state => ({categoryCascade:state.categoryCascade}),
  dispatch => bindActionCreators({getFirstCid,getSecondCid,getThirdCid,getFourCid,clearData}, dispatch)
)
export default class CategoryCascade extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.handleFirstCategoryChange = this.handleFirstCategoryChange.bind(this);
    this.handleSecondCategoryChange = this.handleSecondCategoryChange.bind(this);
    this.handleThirdCategoryChange = this.handleThirdCategoryChange.bind(this);
    this.handleFourCategoryChange = this.handleFourCategoryChange.bind(this);
    this.firstCategoryOptions = [];
    this.secondCategoryOptions = [];
    this.thirdCategoryOptions = [];
    this.fourCategoryOptions = [];
    this.firstCategoryId = {};
    this.secondCategoryId = {};
    this.thirdCategoryId = {};
    this.fourCategoryId = {};
    //是否联动
    this.isShowAllCategory = false;
  }

  /**
   * 初始化view时，查询平台一级分类
   */
  componentWillMount() {
    this.isShowAllCategory = this.props.isShowAllCategory && this.props.isShowAllCategory;
    let parentCid = -1;
    this.props.getFirstCid(this.platformId,parentCid);
  }

  /**
   * 判断json对象是否为空
   * @param e
   * @returns {boolean}
   */
  isNotEmptyObject(e){
    var t;
    for (t in e)
      return !0;
    return !1
  }

  handleChangeCategoryValue(cid) {
    let {onChangeCategoryValue} = this.props;
    if (this.isNotEmptyObject(this.fourCategoryId)){
      onChangeCategoryValue(this.fourCategoryId.cid);
    }else if(this.isNotEmptyObject(this.thirdCategoryId)){
      onChangeCategoryValue(this.thirdCategoryId.cid);
    }else if(this.isNotEmptyObject(this.secondCategoryId)){
      onChangeCategoryValue(this.secondCategoryId.cid);
    }else if(this.isNotEmptyObject(this.firstCategoryId)){
      onChangeCategoryValue(this.firstCategoryId.cid);
    }else {
      onChangeCategoryValue(cid);
    }
  }

  /**
   * 获取四级类目cid，返回组件对外提供的方法上面，供父组件使用
   * @param cid
   */
  handleFourCategoryChange(cid) {
    if (cid){
      this.fourCategoryId = {cid:cid};
    }else{
      this.fourCategoryId = {};
    }
    this.handleChangeCategoryValue(cid);
  }

  /**
   * 查询四级类目
   * @param cid
   */
  handleThirdCategoryChange(cid) {
    if (cid){
      this.thirdCategoryId = {cid:cid};
      this.props.getFourCid(this.platformId,cid);
    }else {
      this.thirdCategoryId = {};
      this.fourCategoryId = {};
      this.fourCategoryOptions = [];
      this.props.clearData(3);
    }
    this.handleChangeCategoryValue(cid);
  }

  /**
   * 查询三级类目
   * @param cid
   */
  handleSecondCategoryChange(cid) {
    if (cid){
      this.secondCategoryId = {cid:cid};
      this.props.getThirdCid(this.platformId,cid);
    }else{
      this.secondCategoryId = {};
      this.thirdCategoryId = {};
      this.fourCategoryId = {};
      this.thirdCategoryOptions = [];
      this.fourCategoryOptions = [];
      this.props.clearData(2);
    }
    this.handleChangeCategoryValue(cid);
  }

  /**
   * 查询二级类目
   * @param cid
   */
  handleFirstCategoryChange(cid) {
    if (cid) {
      this.firstCategoryId = {cid:cid};
      this.props.getSecondCid(this.platformId,cid);
    } else{
      this.firstCategoryId = {};
      this.secondCategoryId = {};
      this.thirdCategoryId = {};
      this.fourCategoryId = {};
      this.secondCategoryOptions = [];
      this.thirdCategoryOptions = [];
      this.fourCategoryOptions = [];
      this.props.clearData(1);
    }
    this.handleChangeCategoryValue(cid);
  }

  dataSource() {
    return {
      first:()=>{
        if (this.props.categoryCascade.first.data){
          let firstResult = this.props.categoryCascade.first.data.data;
          if (firstResult && firstResult.length > 0){
            this.firstCategoryOptions = firstResult.map(first => <Option key={first.cid}>{first.categoryName}</Option>);
          }
        }
      },
      second:()=>{
        if (this.props.categoryCascade.second.data){
          let secondResult = this.props.categoryCascade.second.data.data;
          if (secondResult && secondResult.length > 0){
            this.secondCategoryOptions = secondResult.map(second => <Option key={second.cid}>{second.categoryName}</Option>);
          }
        }
      },
      third:()=>{
        if (this.props.categoryCascade.third.data){
          let thirdResult = this.props.categoryCascade.third.data.data;
          if (thirdResult && thirdResult.length > 0){
            this.thirdCategoryOptions = thirdResult.map(third => <Option key={third.cid}>{third.categoryName}</Option>);
          }
        }
      },
      four:()=>{
        if (this.props.categoryCascade.four.data){
          let fourResult = this.props.categoryCascade.four.data.data;
          if (fourResult && fourResult.length > 0){
            this.fourCategoryOptions = fourResult.map(four => <Option key={four.cid}>{four.categoryName}</Option>);
          }
        }
      }
    }
  }
  render() {
    this.props.categoryCascade.first.loaded && this.dataSource().first();
    this.props.categoryCascade.second.loaded && this.dataSource().second();
    this.props.categoryCascade.third.loaded && this.dataSource().third();
    this.props.categoryCascade.four.loaded && this.dataSource().four();
    return (
      <div>
        <Select placeholder={defaultValue} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120 }} onChange={this.handleFirstCategoryChange}>
          {this.firstCategoryOptions}
        </Select>
        <Select placeholder={defaultValue} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120,marginLeft:10 }} onChange={this.handleSecondCategoryChange}>
          {this.secondCategoryOptions}
        </Select>
        <Select placeholder={defaultValue} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120,marginLeft:10 }} onChange={this.handleThirdCategoryChange}>
          {this.thirdCategoryOptions}
        </Select>
        <Select placeholder={defaultValue} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120,marginLeft:10 }} onChange={this.handleFourCategoryChange}>
          {this.fourCategoryOptions}
        </Select>
      </div>
    );
  }
}
