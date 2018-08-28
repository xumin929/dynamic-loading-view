/**
 * @author chenyanhua
 * @date 2018-07-26
 * @file 销售规格组件
 * 逻辑：父组件传递 数据源以及修改数据源的方法
 * 当ifSave为false时，表示商品处于发布后状态，那么有数据回显（checked=true）的行可编辑，且必须至少有一个选中项
 * 其他行不可编辑
 */
import React, { Component } from 'react';
import { Table, Checkbox, message } from 'jdcloudui';
import getNewItemTmplSkuVoList from './getNewDataFun/getNewItemTmplSkuVoList';
import getNewItemSkuPicVoList from "./getNewDataFun/getNewItemSkuPicVoList";
import getNewPreSkuPriceVoList from "./getNewDataFun/getNewPreSkuPriceVoList";

import './style/index.css';

export default class ReleaseSaleSpecification extends Component {
  constructor(props) {
    super(props);
    const stateData = this.getInitStateData(props);
    const db_checked = this.getDBChecked(props);
    this.state = { 
      ...stateData,
      ...db_checked
    };
  }
  componentWillReceiveProps(nextProps){
    const stateData = this.getInitStateData(nextProps);
    const db_checked = this.getDBChecked(nextProps);
    this.setState({
      ...stateData,
      ...db_checked
    });
  }

  /**
   * 数据库中已选中的数据
   * @return 返回格式 db_checked=['attrId_attrValueId']，
   * 用于在发布回显编辑的时候，已选数据置灰
   */ 
  getDBChecked = (props) => {
    let { checkedAttributes = [] } = props.itemTmplPublishVo;

    // 数据库中保存的已选中的数据
    let db_checked = [];
    checkedAttributes.forEach((attrId_item)=>{
      (attrId_item.attrValueIds || []).forEach((attrValueId)=>{
        db_checked.push(`${attrId_item.attrId}_${attrValueId}`);
      });
    });
    return {
      db_checked: db_checked
    };
  }

  // 设置state值
  getInitStateData = (props) => {
    var ds = props.saleAttributeData || [];
    var saleAttributeData = JSON.parse(JSON.stringify(ds));
    let stateData = {
      ifSave: props.ifSave, // 默认发布前，有
      saleAttributeData: saleAttributeData // 销售规格 数据源
    };

    // false时，需要设置不可选中项目
    if(!props.ifSave){
      stateData.disabledAttrIds = this.getDisabledAttrIds(saleAttributeData);
    }

    // 已选的销售规格id
    stateData.checkedAttrIds = this.getCheckedAttrIds(saleAttributeData);

    return stateData;
  }
  /**
   * 获取已选的attrId
   * 最多只能选择三种属性信息
   */
  getCheckedAttrIds = (saleAttributeData) => {
    let checkedAttrIds = [];
    saleAttributeData.forEach((attrValueArr) => {
      let checked = false;
      attrValueArr.platformCategoryAttributeValues.forEach((attrValueItem) => {
        if(attrValueItem.checked){
          checked = true;
          return;
        }
      });
      if(checked){
        checkedAttrIds.push(attrValueArr.attrId);
      }
    });
    return checkedAttrIds;
  }

  /**
   * 提供给ifSave为false时使用：需设置不可编辑项目
   * 获取需要设置disabled的attrId数据
   * 剩余的attrId：checked=true时，disabled=true,否则disabld=false
   */
  getDisabledAttrIds(saleAttributeData){
    var disabledAttrIds = [];
    saleAttributeData.forEach((attrValueArr) => {
      let checked = false;
      // 判断是否有checked=true的值
      attrValueArr.platformCategoryAttributeValues.forEach((attrValueItem) => {
        if(attrValueItem.checked){
          checked = true;
          return false;
        }
      });

      // 该条数据中没有选中的值，则该条数据应该全部 disabled = true
      if(!checked){
        disabledAttrIds.push(attrValueArr.attrId);
      }
    });

    return disabledAttrIds;
  }

  /**
   * 将变化的数据保存到数据源里
   * 根据attrId，更新 销售规格 数据源 checked属性
   * 当ifSave = false时，可操作的属性行（有数据回显），必须至少保留一个属性值
   * e.target.value = {
   *  "attrValueId":13223,
   *  "attrId":10971,
   *  "attrValueName":"R16",
   *  "status":1,
   *  "checked": true/false
   * }
   */
  onChange = (e) => {
    // 数据对象
    let value = e.target.value;
    let checked = e.target.checked;

    let checkedAttrIds = JSON.parse(JSON.stringify(this.state.checkedAttrIds));

    // 当要选中销售规格属性值时，最多只能选择三种属性信息
    if(checked && checkedAttrIds.indexOf(value.attrId) < 0){
      if(checkedAttrIds.length>=3){
        message.error("只能选择三种属性信息");
        return;
      } else {
        checkedAttrIds.push(value.attrId);
        this.setState({
          checkedAttrIds: checkedAttrIds
        });
      }
    }

    let saleAttributeData = JSON.parse(JSON.stringify(this.props.saleAttributeData));

    saleAttributeData.forEach((item) => {
      if(item.attrId == value.attrId){ // 操作的哪行属性

        // ifSave为false时，可操作的属性行，最少保留一个属性
        if(!this.state.ifSave && !checked){
          let checkedAttr = item.platformCategoryAttributeValues.filter((checkboxItem) => {
            return checkboxItem.checked == true;
          });
          if(checkedAttr.length <= 1){
            message.error("至少要保留一种属性信息");
            return;
          }
        }

        item.platformCategoryAttributeValues.forEach((checkboxItem) => {
          if(checkboxItem.attrValueId == value.attrValueId) {
            checkboxItem.checked = checked;
          }
        });
      }
    });

    // 更新销售规格数据
    this.props.updateSaleAttributeAction(saleAttributeData);

    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    let old_itemTmplSkuVoList = JSON.parse(JSON.stringify(itemTmplPublishVo.itemTmplSkuVoList));

    // 新的销售信息表格数据

    const new_itemTmplPublishVo = getNewItemTmplSkuVoList(old_itemTmplSkuVoList, saleAttributeData);
    itemTmplPublishVo.itemTmplSkuVoList = new_itemTmplPublishVo;

    //更新图片数据
    const old_itemSkuPicVo = this.props.itemTmplPublishVo.itemSkuPicVoList;
    // 新的图片数据
    const new_itemSkuPicVo = getNewItemSkuPicVoList(old_itemSkuPicVo, saleAttributeData);
    itemTmplPublishVo.itemSkuPicVoList = new_itemSkuPicVo;

    // 店铺和供应商才有第六个tab
    if(this.props.type=='2' || this.props.type=='3'){
      //更新供货信息或者价格及库存数据
      const old_preSkuPriceVoList = this.props.itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList;
      // 新的供货信息或者价格及库存数据
      const new_preSkuPriceVoList = getNewPreSkuPriceVoList(old_preSkuPriceVoList, saleAttributeData);
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList = new_preSkuPriceVoList;
    }
    
    // 更新总数据源
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  render() {

    const columns = [{
      title: '属性名称',
      dataIndex: 'attrName',
      key: 'attrName',
      width: 200
    },{
      title: '属性值',
      key: 'attrValue',
      render: (text, record) => (
        record.platformCategoryAttributeValues.map((item)=>{
          const { disabledAttrIds = [], ifSave = true } = this.state;
          let disabled = false;
          if(!ifSave){
            if(disabledAttrIds.indexOf(record.attrId) >=0){
              disabled=true;
            } else if(this.state.db_checked.indexOf(`${record.attrId}_${item.attrValueId}`)>=0){
              disabled=true;
            }
          }
          return (
            <Checkbox value={item} onChange={this.onChange} checked={item.checked} disabled={disabled}>
              {item.attrValueName}
            </Checkbox>
          )
        })
      ),
    }];
    return (
      [
        <h3 className = 'h3-title'>销售规格</h3>,
        <div className = 'table-bordered'>
          <Table
            columns = {columns}
            dataSource = {this.state.saleAttributeData}
            pagination = {false}
          />
        </div>
      ]
    );
  }
}
