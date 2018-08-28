/**
 * Created by huangxiao3
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, Layout, Input, Icon, Form, message, InputNumber, Radio,Table } from 'jdcloudui';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';

import  BaseComponent  from '../../Common/BaseComponent';

import CategoryLinkPop from '../CategoryLinkPop/CategoryLinkPop'

import './style/style.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import {industryLabelDetailSearch,industryLabelInsert,industryLabelUpdate,industryLabelPageDetailSearch,industryLabelAllIdSearch} from './redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
@connect(
  state => ({IndustryLabelDetail:state.industryLabelDetail}),
  dispatch => bindActionCreators({industryLabelDetailSearch,industryLabelInsert,industryLabelUpdate,industryLabelPageDetailSearch,industryLabelAllIdSearch}, dispatch)
)
@Form.create()
export default class IndustryLabelDetail extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      //列表展示数据
      categoryList:[],
      //接口保存数据：全量
      finalCids:[],
      //查询详情接口请求中，保存按钮失效
      disable:true,
      //保存接口，保存中不可点击，变为loading状态
      loading:false,
      //子组件的状态
      popvisible:false,
      //查看更多
      hasMore:false,
    };
    this.pageNum = 1;
    this.pageSize = 10;
  }

  componentWillMount() {
  }

  componentDidMount() {
    //ajax请求
  }

  //分页请求
  queryItemTagDetailPage(pageNum,pageSize,id){
    this.props.industryLabelPageDetailSearch({pageNum:pageNum,pageSize:pageSize,id:id}).then(
      (result)=>{
        if(result.code==0){
          let hasMore = this.state.hasMore;
          let categoryList = this.state.categoryList;
          if(result && result.data){
            //pageDetail:pageNum,pageSize,totalCount,totalPageCount,result
            let pageDetail = result.data.relatedCategoryPage;
            this.pageNum = pageDetail.pageNum;
            categoryList = categoryList.concat(result.data.relatedCategoryPage.result);
            if(pageDetail.pageNum!=pageDetail.totalPageCount){
              hasMore = true;
            }
            this.setState({hasMore:hasMore,categoryList:categoryList});
          }
        }else{
          message.warning(result.msg);
        }
      },
      (error)=>{
        message.info("查询失败!");
      }
    )
  }

  seeMore(){
    ++this.pageNum;
    this.queryItemTagDetailPage(this.pageNum,this.pageSize,this.props.id);
  }

  handleCancel(){
    this.props.form.resetFields();
    this.setState({
      visible: false,
      categoryList:[],
      finalCids:[],
      disable:true,
      loading:false,
      //子组件的状态
      popvisible:false,
      //查看更多
      hasMore:false,
    });
    this.pageNum=1;
    this.props.handleVisibleControl(false);
  }

  //子组件展示状态的回调方法
  categoryVisible(data){
    this.setState({
      popvisible:data
    })
  }

  //提交表单
  handleOk(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.keyword = values.keyword.replace(/\，/g,",");
        values.categoryIds = this.state.finalCids;
        this.setState({
          loading:true,
        });
        if(this.props.type==1){
          this.props.industryLabelInsert(values).then(
            (result)=>{
              message.info(result.msg);
              if(result.code==0){
                this.props.refresh({pageNum:1,pageSize:10});
                this.handleCancel();
              }else{
                this.setState({
                  loading:false,
                })
              }
            },
            (error)=>{
              message.info("保存失败！");
              this.setState({
                loading:false,
              })
            }
          )
        }else{
          values.id=this.props.id;
          this.props.industryLabelUpdate(values).then(
            (result)=> {
              message.info(result.msg);
              if (result.code == 0) {
                this.props.refresh({pageNum: 1, pageSize: 10});
                this.handleCancel();
              }else{
                this.setState({
                  loading:false,
                })
              }
            },
            (error)=>{
              message.info("保存失败！");
              this.setState({
                loading:false,
              })
            }
          )
        }
      }
    });
  }

  createColumns(){
    return [{
      title: '一级类目',
      dataIndex: 'firstLevName',
      width: '20%',
    }, {
      title: '二级类目',
      dataIndex: 'secondLevName',
      width: '20%',
    }, {
      title: '三级类目',
      dataIndex: 'thirdLevName',
      width: '20%',
    }, {
      title: '四级类目',
      dataIndex: 'fourthLevName',
      width: '20%',
    },{
      title: '操作',
      key: 'action',
      width: '20%',
      render: (record) => {
        if(record.isUsing==1){
          return(
            <span>类目已关联商品，无法删除</span>
          );
        }else{
          return (
            <span>
            <a onClick={()=>this.onUnLinkCategory(record.lastLevCid)}>解除关联</a>
          </span>
          );
        }
      }
    }];
  }


  onUnLinkCategory(cid){
    let resultCategory=[];
    for(let i in this.state.categoryList){
      let category = this.state.categoryList[i];
      if(category.lastLevCid!=cid){
        resultCategory.push(category);
      }
    }
    let resultFinalCids = [];
    for(let j in this.state.finalCids){
      let finalCid = this.state.finalCids[j];
      if(finalCid!=cid){
        resultFinalCids.push(finalCid);
      }
    }
    this.setState({
      categoryList:resultCategory,
      finalCids:resultFinalCids,
    })
  }

  getCids2List(data){
    let resultCategory=this.state.categoryList;
    let resultFinalCids = this.state.finalCids
    for(let i in data){
      resultFinalCids.push(data[i].lastLevCid);
      resultCategory.push(data[i]);
    }
    this.setState({
      categoryList:data.concat(resultCategory),
      finalCids:resultFinalCids,
    })
  }

  inputCheck = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if(value.indexOf('?')>-1 || value.indexOf('？')>-1 || value.indexOf('*')>-1 ){
      callback("请勿输入特殊字符！");
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.visible!=true && nextProps.visible==true){
      //type:2   编辑状态
      if(nextProps.id && nextProps.type==2 ){
        //获取全部类目，用于全量保存、更新
        this.props.industryLabelAllIdSearch({id:nextProps.id}).then(
          (result)=>{
            if(result.code && result.code == 0){
              this.setState({
                finalCids:result.data,
              })
            }else{
              message.warining(result.msg)
            }
          },
          (error)=>{message.warining('查询所有关联类目失败')}
        )
        //分页获取关联类目列表
        this.props.industryLabelPageDetailSearch({pageNum:this.pageNum,pageSize:this.pageSize,id:nextProps.id}).then(
          /*this.queryItemTagDetailPage(this.pageNum,1,nextProps.id).then(*/
          (result)=>{
            if (result.code && result.code == 0) {
              //分页获取已关联的类目-------------------------------------------------------
              //pageDetail:pageNum,pageSize,totalCount,totalPageCount,result
              let hasMore = this.state.hasMore;
              let categoryList = this.state.categoryList;
              let pageDetail = result.data.relatedCategoryPage;
              this.pageNum = pageDetail.pageNum;
              categoryList = categoryList.concat(result.data.relatedCategoryPage.result);
              if(pageDetail.pageNum!=pageDetail.totalPageCount){
                hasMore = true;
              }
              this.setState({
                hasMore: hasMore,
                categoryList: categoryList,
                disable:false,
                loading:false,
                popvisible:false,
              });
            }else{
              message.info(result.msg);
            }
          },
          (error)=>{message.info("查询行业标签详情失败！")}
        );
      }else{
        this.setState({
          categoryList: [],
          finalCids:[],
          disable:false,
          loading:false,
          //tmp
          popvisible:true,
        });
      }
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    console.log('in render:',this.props.IndustryLabelDetail);

    let tagName =
      this.props.IndustryLabelDetail.industryLabelPageDetail
      && this.props.IndustryLabelDetail.industryLabelPageDetail.data
      && this.props.IndustryLabelDetail.industryLabelPageDetail.data.tagName;
    let keyword =
      this.props.IndustryLabelDetail.industryLabelPageDetail
      && this.props.IndustryLabelDetail.industryLabelPageDetail.data
      && this.props.IndustryLabelDetail.industryLabelPageDetail.data.keyword;
    let tagStatus =
      this.props.IndustryLabelDetail.industryLabelPageDetail
      && this.props.IndustryLabelDetail.industryLabelPageDetail.data
      && this.props.IndustryLabelDetail.industryLabelPageDetail.data.tagStatus;
    let relatedCategory =
      this.props.IndustryLabelDetail.industryLabelPageDetail
      && this.props.IndustryLabelDetail.industryLabelPageDetail.data
      && this.props.IndustryLabelDetail.industryLabelPageDetail.data.relatedCategory;

    getFieldDecorator('categoryIds', { initialValue: relatedCategory?relatedCategory:[] });


    let title=this.props.type==1?"新增行业标签":"编辑行业标签";
    let disabled=this.props.type==1?false:this.state.disable;

    /*/^((?!\?|\*).)*$/*/

    return (
      <div >
        <Modal
          className="industryLabelStyle"
          maskClosable={false}
          style={{ top: 20 }}
          width="500px"
          height="500px"
          visible={this.props.visible}
          title={title}
          onOk={(e)=>{this.handleOk(e)}}
          onCancel={()=>{this.handleCancel()}}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={()=>{this.handleCancel()}}>
              取消
            </Button>,
            <Button key="submit" type="primary" size="large" disabled={disabled} loading={this.state.loading} onClick={(e)=>{this.handleOk(e)}}>
              保存
            </Button>,
          ]}
        >
          <Form>
            <FormItem label="标签名称" {...formItemLayout}>
              {getFieldDecorator('tagName', {
                initialValue:this.props.type==1?'':tagName,
                rules: [{
                  required: true,
                  message: '请输入标签名称!',
                },{
                  validator:this.inputCheck,
                  message:'请勿输入特殊字符！'
                }],
              })(
                <Input size="default" maxLength="10" style={{width:"250px"}}/>
              )}
            </FormItem>
            <FormItem label="关键词" {...formItemLayout}>
              {getFieldDecorator('keyword', {
                initialValue:this.props.type==1?'':keyword,
                rules: [{
                  required: false,
                  message: '请输入关键词,以逗号分隔！',
                },{
                  validator:this.inputCheck,
                  message:'请勿输入特殊字符！'
                }],
              })(
                <Input type="textarea" rows={2} style={{width:"250px"}} maxLength="50" placeHolder="以“，”分隔多个关键词"/>
              )}
            </FormItem>
            <FormItem label="有效性" {...formItemLayout}>
              {getFieldDecorator('tagStatus', {
                initialValue:this.props.type=='1'?'1':tagStatus+'',
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true }],
              })(
                <RadioGroup>
                  <Radio value='1'>启用</Radio>
                  <Radio value='-1'>停用</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <hr style={{marginBottom:'10px',border:'0',height:'1px',backgroundColor:'#d9d9d9'}}/>
            <CategoryLinkPop
              getCids2List={(data)=>this.getCids2List(data)}
              selectCids={this.state.finalCids}
              visible={this.state.popvisible}
              categoryVisible={(data)=>this.categoryVisible(data)}
            />
            <div style={{height:'300px'}}>
              <Table
                columns={this.createColumns()}
                dataSource={this.state.categoryList}
                pagination={false}
                scroll={{ y: 220 }}
              />
              {
                this.state.hasMore?
                  <div>
                    <div className="seemore">
                      <a onClick={()=>this.seeMore()} className="seemorebtn">查看更多类目</a>
                    </div>
                  </div>
                  :
                  <div></div>
              }

            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}


