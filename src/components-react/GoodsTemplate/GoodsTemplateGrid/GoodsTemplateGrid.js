/**
 * Created by liurenpeng on 2018/7/30.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Input, Modal, Table, Button ,message ,Icon} from 'jdcloudui';
import './style.css'
import CheckCategoryModal from '../CheckCategoryModal/CheckCategoryModal';
import ChangeCategoryModal from '../ChangeCategoryModal/ChangeCategoryModal';
import { addModuleAction } from './addModule_redux';
import { addTmplAction } from './addTmpl_redux';
import { editTmplNameAction } from './editTmpl_redux';
import { editTmplStatusAction } from './tmplStatus_redux';
import { queryCategoryTmpls } from '../CheckCategoryModal/queryCategory_redux';
import { queryCategoryTree } from '../ChangeCategoryModal/queryCategoryTree_redux';

@connect(
  state => ({addTemplate:state.addTemplate,addModule:state.addModule,editTemplate:state.editTemplate,editStatus:state.editStatus,templateCategoryList:state.templateCategoryList}),
  dispatch => bindActionCreators({addTmplAction,addModuleAction,editTmplNameAction,editTmplStatusAction,queryCategoryTmpls,queryCategoryTree}, dispatch)
)
export default class GoodsTemplateGrid extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        visible : false,//modal展示状态
        tmplName : null,//新增模板的模板名称
        editCode: '', //正在编辑模板名称的code
        editName: '', //正在编辑的模板的名称
        dataSource : [], //table数据源
        checkCateVisible : false, //查看分类弹窗展示状态
        changeCateVisible : false, //调整分类弹窗展示状态
        loading:true, //table 加载状态
        value:null, //输入框内容
        tmplCode : '', //当前正在查看或修改的模板code
    }
    this.columns = [{
        title: '模板名称',
        dataIndex: 'tmplName', 
        key: 'tmplName', 
        width: '30%',
        render:(text, record, index)=>{
            if(record.type == 1){
                return text
            } else {
                if(record.code == this.state.editCode){
                    return (
                        <span>
                            <Input className="mr10 edit-tmplname" defaultValue={text} onChange={this.handleChangeName}/>
                            <a className="mr10" onClick={()=>this.handleSaveEdit(record.code)}>保存</a>
                            <a className="mr10" onClick={()=>this.handleCancelEdit()}>取消</a>
                        </span>
                    )
                } else {
                    return (
                        <span>
                            <span className="mr10">{text}</span>
                            <a onClick={()=>this.handleEditName(text,record.code)}><Icon type="edit"/></a>
                        </span>
                    )
                }
            }
        }
    },{
        title: '模板状态',
        dataIndex: 'status', 
        key: 'status', 
        width: '20%',
        render:(text, record, index)=>{
            let tmplStatus = ''
            // if(record.type == 1){
            //     tmplStatus = '启用（默认系统模板）'
            // } else {
                if(text==1){
                    tmplStatus = '启用'
                } else {
                    tmplStatus = '停用'
                }
            // }
            return (
                <span>{tmplStatus}</span>
            )
        }
    },{
        title: '操作',
        dataIndex: 'action', 
        key: 'action', 
        width: '20%',
        render:(text, record, index)=>{
            if(record.type == 1){
                return '-----'
            } else {
                return (
                    <div>
                        <a className="mr10" href={'//'+this.props.mainDomain+'/news-operating-view/modules'} target='_blank'>编辑模板</a>
                        {record.status == 1?
                            <a onClick={()=>this.changeTmplStatus(0,record.code)}>停用</a>:
                            <a onClick={()=>this.changeTmplStatus(1,record.code)}>启用</a>
                        }
                    </div>
                )
            }
        }
    },{
        title: '分类',
        dataIndex: 'category', 
        key: 'category', 
        width: '30%',
        render: (text,record,index)=>{
            if(record.type == 1){
                return "全部分类"
            } else {
                if(record.hasCid){
                    if(record.isDesign || record.status){
                        return (
                            <span>
                                    <a className="mr10" onClick={()=>this.handleCheckCategory(record.code,record.tmplName)}>查看分类</a>
                                    <a onClick={()=>this.handleChangeCategory(record.code,record.tmplName)}>调整分类</a>
                            </span>
                        )
                    } else {
                        return (
                            <span>
                                    <a className="mr10" onClick={()=>this.handleCheckCategory(record.code,record.tmplName)}>查看分类</a>
                                    <span className="disable">调整分类</span>
                            </span>
                        )
                    }
                } else {
                    if(record.isDesign || record.status){
                        return <a onClick={()=>this.handleChangeCategory(record.code,record.tmplName)}>关联分类</a>
                    } else {
                        return <span className="disable">关联分类</span>
                    }
                }
            }
        }
    }];
    this.pagination = {
        current: 1, //当前页数
        pageSize: 20,
        total: 1, //数据总数
        onChange: this.changePageNum, 
        showQuickJumper: true,
    }

    this.tmplCode = ''; //当前正在查看或修改的模板code
    this.tmplName = ''; //当前正在查看或修改的模板name
    this.randomCode = Math.floor(Math.random()*10); //随机code
	}

  componentWillReceiveProps=(nextProps)=>{
      if(nextProps.templateData && nextProps.templateData != this.state.dataSource){
          this.setState({
                dataSource:nextProps.templateData,
                loading:false,
          })
      }
      if(nextProps.totalCount && nextProps.totalCount != this.pagination.total){
          this.pagination.total = nextProps.totalCount;
      }
      if(nextProps.pageNum && nextProps.pageNum != this.pagination.current){
          this.pagination.current = nextProps.pageNum
      }
  }

  //修改模板停用启用状态
  changeTmplStatus = (status,code)=>{
			let params = {
				code:code,
				status:status,
			}
			this.props.editTmplStatusAction(params).then((res)=>{
				if(res.code == 0){
					message.success(res.data,2)
					this.props.getTemplateList();
				} else {
					if(res.code == '500'){
						message.error(res.data,2)
					} else {
						message.error('停用/启用商品模板失败！')
					}
				}
			})
  }

  //修改模板名称按钮
  handleEditName = (name,code)=>{
      this.setState({
          editCode:code,
          editName:name,
      })
  }

  //修改模板名称输入框
  handleChangeName = (e)=>{
    this.setState({
        editName:e.target.value
    })
  }

  //保存模板名称
  handleSaveEdit = (code)=>{
      if(this.state.editName){
          let params = {
              tmplName:this.state.editName,
              code:code
          }
          this.props.editTmplNameAction(params).then((res)=>{
              if(res.code == 0){
                  message.success(res.data,2);
                  this.props.getTemplateList();
                  this.handleCancelEdit();
              } else {
                  if(res.code == '5-0005'){
                      message.error(res.data,2)
                  } else {
                      message.error('编辑商品模板失败！',2)
                  }
              }
          })
      } else {
          message.error('模板名称不能为空！',2)
      }
  }

  //取消编辑模板
  handleCancelEdit = ()=>{
    console.log('取消模板名称编辑')
    this.setState({
        editCode:'',
        editName:'',
    })
  }

  addTemplate = ()=>{
    this.setState({
        visible : true
    })
  }

  handleCancel = ()=>{
    this.setState({
        visible : false,
        value:null,
    })
  }

	//保存新建的模板
  handleSave = ()=>{
    if(this.state.tmplName){
				let resourcePageRequestVo = {
						name:this.state.tmplName,
						type:'page'
				}
				let tmplParams = {resourcePageRequestVo:JSON.stringify(resourcePageRequestVo)}
				this.props.addModuleAction(tmplParams).then((res)=>{
					if(res.code == 0){
						let params = {
							code:res.data,
							tmplName:this.state.tmplName,
						}
						this.props.addTmplAction(params).then((res)=>{
							if(res.code == 0){
								message.success('新增模板成功！',2)
								this.props.getTemplateList();
								this.setState({value:null,visible:false})
							} else {
								if(res.code == '5-0005'){
									message.error(res.data,2)
								} else {
									message.error('新增模板失败！',2)
								}
							}
						})
					} else {
						message.error(res.msg,2)
					}
				})
    } else {
			message.error('请输入模板名称！')
    }
  }

	//保存并设计新建的模板
  handleSaveAndDesign = ()=>{
    if(this.state.tmplName){
			let resourcePageRequestVo = {
				name:this.state.tmplName,
				type:'page'
			}
			let tmplParams = {resourcePageRequestVo:JSON.stringify(resourcePageRequestVo)}
			this.props.addModuleAction(tmplParams).then((res)=>{
				if(res.code == 0){
					let params = {
						code:res.data,
						tmplName:this.state.tmplName,
					}
					this.props.addTmplAction(params).then((res)=>{
						if(res.code == 0){
                            this.setState({value:null,visible:false})
							window.open('//'+this.props.mainDomain+'/news-operating-view/modules');
						} else {
							if(res.code == '5-0005' || res.code =='5-0015'){
								message.error(res.data,2)
							} else {
								message.error('新增模板失败！',2)
							}
						}
					})
				} else {
					message.error(res.msg,2)
				}
			})
		} else {
			message.error('请输入模板名称！')
		}
	}
	
	changeInput = (e)=>{
		this.setState({
			value:e.target.value,
		})
	}

  changeTmplName = (e)=>{
      this.setState({
          tmplName:e.target.value
      })
  }

  //查看模板对应的类目
  handleCheckCategory =(code,name)=>{
		console.log('查看code为:'+code +'的模板对应的类目')
		this.props.queryCategoryTmpls({code:code})
        this.setState({
            checkCateVisible : true,
            tmplCode: code,
		}) 
		this.tmplCode = code;
		this.tmplName = name;
  }

	//调整模板对应的类目
	handleChangeCategory =(code,name)=>{
        console.log('修改code为:'+code +'的模板对应的类目')
        this.randomCode = Math.floor(Math.random()*10);
		this.props.queryCategoryTree({code:code})
		this.setState({
            changeCateVisible : true,
            tmplCode: code,
		}) 
		this.tmplCode = code;
        this.tmplName = name;
	}

	//查看分类弹窗中修改分类
	onChangeCategory = (code)=>{
		this.setState({
			checkCateVisible : false,
			changeCateVisible : true,
		})
        this.props.queryCategoryTree({code:code})
	}
    
  //分页
  changePageNum = (page)=>{
    this.pagination.current = page;
    this.props.onPaginationSearch(page);
	}
	
	//修改查看分类弹窗展示状态
	onChangeVisibleForCheckModal = (visible)=>{
		this.setState({
			checkCateVisible:visible
        })
	}

	//修改调整分类弹窗展示状态
	onChangeVisibleForChangeModal = (visible)=>{
		this.setState({
			changeCateVisible:visible
        })
    }
    
    //修改随机code码
    changeRandomCode = ()=>{
        this.randomCode = Math.floor(Math.random()*10);
    }

  render() {
    return(
      <div className="tmpl-grid">
        <Button className="addtmpl-btn" onClick={this.addTemplate}>添加新模板</Button>
        <Modal title="创建新模板"
            className="tmpl-modal"
            visible = {this.state.visible}
            onCancel={this.handleCancel}
            footer={[
                <Button className="tmpl-modal-btn-small" onClick = {this.handleSave}>保存</Button>,
                <Button className="tmpl-modal-btn" onClick = {this.handleSaveAndDesign}>保存并设计模板</Button>,
                <Button className="tmpl-modal-btn tmpl-modal-btn-small" onClick = {this.handleCancel}>取消</Button>,
            ]}
        >
            <div className="modal-content">
                <span>模板名称：</span>
                <Input onBlur = {this.changeTmplName} value={this.state.value} onChange={this.changeInput} style={{width:'300px'}}/>
            </div>
        </Modal>
        <Table loading={this.state.loading} columns={this.columns} dataSource={this.state.dataSource} pagination={this.pagination}/>
				<CheckCategoryModal key={this.state.tmplCode+'_check'} 
						visible={this.state.checkCateVisible} 
						code={this.state.tmplCode} 
						tmplName={this.tmplName} 
						onChangeCategory={this.onChangeCategory} 
                        onChangeVisible={this.onChangeVisibleForCheckModal}
                        getTemplateList={this.props.getTemplateList}
                        refreshData={this.changeRandomCode}
				/>
				<ChangeCategoryModal key={this.state.tmplCode+'_change'+this.randomCode} 
						visible={this.state.changeCateVisible} 
						code={this.state.tmplCode} 
						tmplName={this.tmplName} 
						onChangeVisible={this.onChangeVisibleForChangeModal} 
                        getTemplateList={this.props.getTemplateList}
                        refreshData={this.changeRandomCode}
				/>
      </div>
    )
  }
}

