/**
 * Created by huangxiao3 on 2017/5/23.
 */
/*
 输入：
 数据源：dataSource
 搜索方法：onSearch
 搜索参数：searchdata
 pageSize
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button,Table,Icon,message,Popconfirm } from 'jdcloudui';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import  BaseComponent  from '../../Common/BaseComponent';
import * as domain from 'jdcloudecc/reducer/domain'

import IndustryLabelDetail from '../IndustryLabelDetail/IndustryLabelDetail'
/*动作权限*/
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';
import {FuncPermission}  from 'jdcloudecc/components';
import './styles.css'

@connect(
  state => ({IndustryLabelWrap:state.industryLabelWrap,funcPermissions:state.funcPermissions}),
  dispatch => bindActionCreators({...domain,getPlatformFuncPermission}, dispatch)
)
export default class IndustryLabelList extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      type:1,
      id:null,
    };
  }

  showNewDetail(){
    this.setState({
      type:1,
      visible: true,
    })
  }
  handleVisibleControl(Newvisible){
    this.setState({
      visible: Newvisible,
    })
  }

  componentWillMount() {
    this.props.onSearch({pageNum:1,pageSize:this.props.pageSize});
    //获取动作权限
    this.props.getPlatformFuncPermission();
  }

  editIndustryLabel(id){
    this.setState({
      type:2,
      id:id,
      visible:true,
    });
  }

  //生成列表数据
  createData(){
    if(this.props.dataSource && this.props.dataSource.industryLabelListdata && this.props.dataSource.industryLabelListdata.data&& this.props.dataSource.industryLabelListdata.data.result){
      const dataSourceArrData = this.props.dataSource.industryLabelListdata.data.result;
      return dataSourceArrData;
    }else{
      return null;
    }
  }

  //生成表头
  createColumns(){
    let mainDomain = this.props.getMainDomain();
    return [{
      title: <span style={{paddingLeft:'8px'}}>标签名称</span>,
      render: (record) => {
        return <span style={{paddingLeft:'8px'}}>{record.tagName}</span>
      }
    }, {
      title: '关键词',
      dataIndex: 'keyword',
      key: 'keyword',
    }, {
      title: '标签链接',
      key: 'url',
      render:(record)=>{
        let url=`//${mainDomain}/search-website-view/search?industryLabels=${record.tagName}`;
        return (<a style={{color:'#009afe'}}href={url}>{url}</a>);
      }
    },{
      title: '编辑时间',
      dataIndex: 'modified',
      key: 'modified',
    }, {
      title: '状态',
      dataIndex: 'tagStatusView',
      key: 'tagStatusView',
    }, {
      title: '操作',
      key: 'action',
      render: (record) => {
        return (
          <span>
            <FuncPermission codes={this.createFuncCode()} code="editIndustryTag">
              <a onClick={()=>this.editIndustryLabel(record.id)} style={{color:'#009afe'}}>编辑  </a>
            </FuncPermission>
            <FuncPermission codes={this.createFuncCode()} code="deleteIndustryTag">
              <Popconfirm title="确认删除该行业标签?" onConfirm={()=>this.deleteIndustryLabel(record.id)} okText="确认" cancelText="取消">
                <a style={{color:'#009afe'}}>删除</a>
              </Popconfirm>
            </FuncPermission>
          </span>
        )
      },
    }];
  }

  deleteIndustryLabel(id){
    if(id){
      this.props.onDelete({id:id}).then(
        (result)=>{message.info(result.msg);this.refreshList()},
        (error)=>{message.info("保存失败！")}
      );
    }
  }

  //分页查询
  onChangePage(pageNumber){
    console.log("page change:",pageNumber);
    var searchData = this.props.dataSource.searchdata;
    var pageChange ={...searchData,pageNum:pageNumber};
    this.props.onSearch(pageChange).then(
      (result)=>{console.log('PageChange SearchData success')},
      (error)=>{console.log('PageChange SearchData fail')}
    );
  }

  //生成分页对象
  createPagination(){
    let total = this.props.dataSource.industryLabelListdata && this.props.dataSource.industryLabelListdata.data &&this.props.dataSource.industryLabelListdata.data.totalCount;
    let current = this.props.dataSource.industryLabelListdata && this.props.dataSource.industryLabelListdata.data && this.props.dataSource.industryLabelListdata.data.pageNum;

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
    var searchValue = this.props.dataSource.searchdata;
    this.props.onSearch(searchValue);
  }

  createIndustryLabelDetail(){
    return (
      <IndustryLabelDetail
        id={this.state.id}
        type={this.state.type}
        visible={this.state.visible}
        refresh={this.props.onSearch}
        handleVisibleControl={()=>this.handleVisibleControl()}
      />
    );
  }

  createFuncCode(){
    let permissionData = this.props.funcPermissions.data;
    if(permissionData && permissionData.code != 0){
      message.warning("动作权限获取失败！");
    }
    if(permissionData && permissionData.code == 0){
      return permissionData.data;
    }
  }

  render() {
    return (
      <div>
        <div className="tbl-top-action">
          <FuncPermission codes={this.createFuncCode()} code="insertIndustryTag">
            <Button type="primary" icon="plus" onClick={()=>this.showNewDetail()}>添加新标签</Button>
          </FuncPermission>
        </div>
        <div className="tableBorderIndustry">
          <Table
            columns={this.createColumns()}
            dataSource={this.createData()}
            pagination={this.createPagination()}
            loading={this.props.IndustryLabelWrap.listLoading}
          />
        </div>
        {this.createIndustryLabelDetail()}
      </div>
    )
  }
}