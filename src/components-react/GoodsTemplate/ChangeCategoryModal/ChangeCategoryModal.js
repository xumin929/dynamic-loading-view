/**
 * Created by liurenpeng on 2018/7/30.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Modal, Button, message, Spin } from 'jdcloudui';
import TemplateTransfer from '../TemplateTransfer/TemplateTransfer';
import { queryCategoryTree } from './queryCategoryTree_redux';
import { saveTmplCategory } from './saveTmplCategory_redux';

@connect(
  state => ({getCategoryTree:state.getCategoryTree,saveTemplCategory:state.saveTemplCategory}),
  dispatch => bindActionCreators({queryCategoryTree,saveTmplCategory}, dispatch)
)
export default class ChangeCategoryModal extends Component {
  constructor(props, context) {
		super(props, context);
		this.modalTitle = <span>调整分类</span>;
		this.state = {
			code:null,
			tmplTreeData:[], // 已关联分类的tree数据
			loading:true,
		};
		this.tmplCids = []; // 保存关联分类时存的cids数组
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.code && nextProps.code != this.state.code){
			this.setState({code:nextProps.code})
			this.props.queryCategoryTree({code:nextProps.code})
		}
		if(nextProps.tmplName && nextProps.tmplName != this.state.tmplName){
			this.setState({tmplName:nextProps.tmplName})
			this.modalTitle = <p className="modal-title"><span>调整分类</span><span className="modal-title-right">{nextProps.tmplName}</span></p>
		}
		if(nextProps.getCategoryTree && nextProps.getCategoryTree.data){
			if(nextProps.getCategoryTree.data.data){
				this.setState({loading:false,})
				if(nextProps.getCategoryTree.data.data != this.state.tmplTreeData){
					this.setState({
						tmplTreeData:nextProps.getCategoryTree.data.data,
					});
					this.tmplCids = this.getCids(nextProps.getCategoryTree.data.data);
				}
			} else {
				message.error('查询已关联分类出错',2)
			}
		}
	}
	
	//关闭弹窗
	handleCancel=()=>{
		this.props.onChangeVisible(false)
		this.props.refreshData();
	}

	//提交修改
	submitCategory = ()=>{
		let params = {
			code:this.props.code,
			cids:this.tmplCids,
		}
		console.log('提交修改类目关联接口')
		console.log(params)
		this.props.saveTmplCategory(params).then((res)=>{
			if(res.code == 0){
				message.success(res.data,2)
				this.props.onChangeVisible(false);
				this.props.refreshData();
				this.props.getTemplateList();
			} else {
				if(res.msg){
					message.error(res.msg,2)
				} else {
					message.error('类目关联失败！',2)
				}
			}
		})
	}

	//保存穿梭框组件传递回来的数据
	updateTreeData = (data)=>{
		this.tmplCids = this.getCids(data);
		console.log('保存穿梭框传递回来的数据')
		console.log(data)
		console.log(this.tmplCids)
	}

	//处理回显的tree数据转换为cids数组
	getCids = (treeData)=>{
		let treeList = [];
		let loop = data => data.map((item,index)=>{
			treeList.push(item.cid)
			if(item.children){
				loop(item.children)
			}
		})
		if(treeData && treeData.length>0){
			loop(treeData);
		}
		return treeList;
	}

  render(){
    return (
        <Modal title= {this.modalTitle}
						className = "tmpl-modal"
						visible = {this.props.visible}
						onCancel= {this.handleCancel}
						footer={[
							<Button className="tmpl-modal-btn-small" onClick = {this.handleCancel}>关闭</Button>,
							<Button className="tmpl-modal-btn tmpl-modal-btn-small" onClick = {this.submitCategory}>调整分类</Button>,
						]}
				>
						<Spin spinning={this.state.loading}>
							<TemplateTransfer 
								code={this.props.code} 
								tmplName={this.props.tmplName} 
								tmplTreeData={this.state.tmplTreeData} 
								callBack={this.updateTreeData} 
								visible = {this.props.visible}
							/>
						</Spin>
				</Modal>
    )
  }
}