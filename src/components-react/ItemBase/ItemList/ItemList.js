/**
 * Created by huangxiao3 on 2017/2/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, message } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { itemBaseSearch,saveFormData } from '../ItemSearch/redux';
import CopyItem from '../CopyItem/CopyItem';
import  BaseComponent  from '../../Common/BaseComponent';
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';
import {FuncPermission}  from 'jdcloudecc/components';
import './styles.css'

@connect(
  state => ({ItemBaseSearch:state.itemBaseSearch,funcPermissions:state.funcPermissions}),
  dispatch => bindActionCreators({itemBaseSearch,saveFormData,getPlatformFuncPermission}, dispatch)
)
export default class ItemList extends BaseComponent {
  constructor(props, context) {
    super(props, context);
  }
  static propTypes = {
    ItemBaseSearch: PropTypes.object.isRequired,
    itemBaseSearch: PropTypes.func.isRequired,
    saveFormData: PropTypes.func.isRequired,
    pageSize:PropTypes.object.isRequired
  };

  //首次获取数据
  componentWillMount() {
    var initialValue={platformId:this.platformId,pageSize:this.props.pageSize,pageNum:1,userId:1};
    this.props.saveFormData(initialValue);
    this.props.itemBaseSearch(initialValue).then(
      (result)=>{console.log('SearchData success')},
      (error)=>{console.log('SearchData fail')}
    );
    //获取菜单权限
    this.props.getPlatformFuncPermission();
  }

  //生成列表数据
  creatData(){
    var dataSource=new Array();
    this.props.ItemBaseSearch && this.props.ItemBaseSearch.data && this.props.ItemBaseSearch.data.data && this.props.ItemBaseSearch.data.data.result && this.props.ItemBaseSearch.data.data.result.map((col)=>{
      //拼接类目
      var categorys = (col.cname1===null?'':col.cname1)
          +(col.cname2===null?'':'--'+col.cname2)
          +(col.cname3===null?'':'--'+col.cname3)
          +(col.cname4===null?'':'--'+col.cname4);
      var spu = col.id;
      if(col.copyStatus==1){
        spu='(复制)';
      }
      if(col.storeStatus==10){
        spu='(草稿)'
      }
      if(col.storeStatus==30){
        spu = col.id;
      }
      //生成数据
      var data = {
        copy:col.copyStatus,
        store:col.storeStatus,
        key:col.id,
        spu:spu,
        iteminfo: <div><img src={col.pictureUrl} width="60" height="60" style={{float:'left',border:'1px solid #eee'}}/><div style={{paddingLeft:'80px'}}>{col.itemName}</div></div>,
        pulishtime: col.publishTime ? col.publishTime : '',
        category: categorys,
        operator: col.publishName,
        action: col.id
      };
      dataSource.push(data);
    });
    return dataSource;
  }

  //生成表头
  createColumns(){
    return [{
      title: '商品库编码',
      dataIndex: 'spu',
      key: 'spu',
      width:'130'
    }, {
      title: '商品信息',
      dataIndex: 'iteminfo',
      key: 'iteminfo',
      width:'220'
    }, {
      title: '发布时间',
      dataIndex: 'pulishtime',
      key: 'pulishtime',
      width:'150'
    }, {
      title: '平台类目',
      dataIndex: 'category',
      key: 'category',
      width:'300'
    }, {
      title: '发布者',
      dataIndex: 'operator',
      key: 'operator',
      width:'100'
    }, {
      title: '操作',
      key: 'action',
      width:'120',
      render: (record) => {
        var copyflag = true;
        if(!record.store || record.store==10){
          copyflag = false
        }
        let type=0;
        if(record.store==10){
          type=1;
        }
        var editUrl = "/operating-item-view/product-release?itemId="+record.key+'&&storeStatus='+record.store;
        return (
          <span>
            <FuncPermission codes={this.codesResponse} code="edit">
              <a href={editUrl}>编辑</a>
            </FuncPermission>
            {copyflag && this.codesResponse && this.codesResponse.indexOf('copy')>-1 && this.codesResponse.indexOf('edit')>-1 && <span className="btn-line">|</span>}
            {copyflag && <CopyItem itemid={record.key} refreshList={()=>this.refreshList()} funcPermissions={this.props.funcPermissions}/>}
          </span>
        )
      },
    }];
  }

  //分页查询
  onChangePage(pageNumber){
    console.log("page change:",pageNumber);
    var searchData = this.props.ItemBaseSearch.searchdata.searchdata;
    var pageChange ={...searchData,pageNum:pageNumber};
    this.props.itemBaseSearch(pageChange).then(
      (result)=>{console.log('PageChange SearchData success')},
      (error)=>{console.log('PageChange SearchData fail')}
    );
  }

  //生成分页对象
  createPagination(){
    var total = this.props.ItemBaseSearch.data && this.props.ItemBaseSearch.data.data && this.props.ItemBaseSearch.data.data.totalCount;
    var current = this.props.ItemBaseSearch.data && this.props.ItemBaseSearch.data.data && this.props.ItemBaseSearch.data.data.pageNum;

    return {
      showQuickJumper:true,
      total:total,
      current:current,
      pageSize:this.props.pageSize,
      onChange:(pageNumber)=>this.onChangePage(pageNumber)
    };
  }

  //刷新页面(获取搜索参数，重新查询)
  refreshList(){
    var searchValue = this.props.ItemBaseSearch.searchdata.searchdata;
    this.props.itemBaseSearch(searchValue);
  }
  goPublishItem(codes){
    if(typeof window !== 'undefined'){
      window.location.href = '/operating-item-view/product-release';
    }
  }

  render() {
    //菜单权限数据处理
    console.log(this.props.funcPermissions);
    let permissionData = this.props.funcPermissions.data;
    if(permissionData && permissionData.code != 0){
      message.warning("菜单权限获取失败！");
    }
    if(permissionData && permissionData.code == 0){
      this.codesResponse = permissionData.data;
      console.log(this.codesResponse);
      this.codes = this.codesResponse && this.codesResponse.join(",");
    }
    return (
      <div>
        <div className="tbl-top-action">
          <FuncPermission codes={this.codesResponse} code="publish">
            <Button type="primary" icon="plus" onClick={()=>this.goPublishItem(this.codes)}>发布商品</Button>
          </FuncPermission>
        </div>
        <div className="tableBorderItemBase">
          <Table
            key={Math.random()}
            columns={true && this.createColumns()}
            dataSource={true && this.creatData()}
            pagination={this.createPagination()}
            loading={this.props.ItemBaseSearch.loading}
          />
        </div>
      </div>
    )
  }
}
