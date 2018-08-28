/**
 * Created by liurenpeng on 2018/7/30.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Modal, Table, Button ,message, Popconfirm } from 'jdcloudui';
import {queryCategoryTmpls} from './queryCategory_redux';
import {cancelCategoryTmpls} from './cancelCategory_redux';
import './style.css'
@connect(
  state => ({templateCategoryList:state.templateCategoryList,cancelCategoryList:state.cancelCategoryList}),
  dispatch => bindActionCreators({queryCategoryTmpls,cancelCategoryTmpls}, dispatch)
)
export default class CheckCategoryModal extends Component {
  constructor(props, context) {
		super(props, context);
		this.state = {
			tmplName : '',
			loading: true,
		}
		this.modalTitle = <span>查看分类</span>;
		this.columns = [{
			title:'一级分类',
			key: 'cname1',
			dataIndex: 'cname1',
			width:'20%',
			render:(text,record,index)=>{
				return (text?<span>{text}</span>:<span>----</span>)
			}
		},{
			title:'二级分类',
			key: 'cname2',
			dataIndex: 'cname2',
			width:'20%',
			render:(text,record,index)=>{
				return (text?<span>{text}</span>:<span>----</span>)
			}
		},{
			title:'三级分类',
			key: 'cname3',
			dataIndex: 'cname3',
			width:'20%',
			render:(text,record,index)=>{
				return (text?<span>{text}</span>:<span>----</span>)
			}
		},{
			title:'四级分类',
			key: 'cname4',
			dataIndex: 'cname4',
			width:'20%',
			render:(text,record,index)=>{
				return (text?<span>{text}</span>:<span>----</span>)
			}
		},{
			title:'操作',
			key: 'action',
			dataIndex: 'action',
			width:'20%',
			render:(text,record,index)=>{
				let title = '确定要取消关联吗？'
				return (
					<Popconfirm title={title} onConfirm={()=>this.cancelConnet(record.cid)}>
						<a>取消关联</a>
					</Popconfirm>
				)
			}
		}];
		this.dataSource = [];
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.tmplName && nextProps.tmplName != this.state.tmplName){
			this.setState({tmplName:nextProps.tmplName})
			this.modalTitle = <p className="modal-title"><span>查看分类</span><span className="modal-title-right">{nextProps.tmplName}</span></p>
		}
		if(nextProps.templateCategoryList && nextProps.templateCategoryList.data && nextProps.templateCategoryList.data.data){
			this.setState({loading:false})
			if(nextProps.templateCategoryList.data.data != this.dataSource){
				this.dataSource = this.addKey(nextProps.templateCategoryList.data.data)
			}
		}
	}

	//给原始数据增加key
	addKey = (data)=>{
		let newData = data;
		if(newData && newData.length>0){
			newData.map((item,index)=>{
				item.key = item.cid
			})
		}
		return newData;
	}

	//取消关联
	cancelConnet = (cid)=>{
		let params = {
			cid: cid,
			code: this.props.code
		}
		this.props.cancelCategoryTmpls(params).then((res)=>{
			if(res && res.code == 0){
				message.success('取消关联成功！',2);
				this.props.queryCategoryTmpls({code:this.props.code});
				this.props.getTemplateList();
				this.props.refreshData();
			} else {
				if(res.msg){
					message.error(res.msg,2);
				} else {
					message.error('取消关联失败！',2)
				}
			}
		})
	}

	//关闭弹窗
	handleCancel=()=>{
		this.props.onChangeVisible(false);
	}

	//调整分类
	changeCategory=()=>{
		this.props.onChangeCategory(this.props.code);
	}

  render(){
		return (
      <Modal title= {this.modalTitle}
					className = "tmpl-modal"
					visible = {this.props.visible}
					onCancel= {this.handleCancel}
					footer={[
							<Button className="tmpl-modal-btn-small" onClick = {this.handleCancel}>关闭</Button>,
							<Button className="tmpl-modal-btn tmpl-modal-btn-small" onClick = {this.changeCategory}>调整分类</Button>,
					]}
			>
					<Table loading={this.state.loading} columns={this.columns} dataSource={this.dataSource} pagination={false} className="tmpl-modal-table"/>
			</Modal>
		)
  }
}