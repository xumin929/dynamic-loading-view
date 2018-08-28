/**
 * Created by likaiwen on 2017/5/22.
 */
import React,{Component} from 'react';
import {Breadcrumb,message,Button,Icon,Alert} from 'jdcloudui';
import FictitiousCategory from '../FictitiousCategory/FictitiousCategory';
import styles from '../FictitiousCategory/styles.less';
import {FuncPermission}  from 'jdcloudecc/components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';
import {
    saveFormData,
    clearThreeData,
    searchPublish,
    publish,
    searchOneFictitiousCategoryInfo,
    searchTwoFictitiousCategoryInfo,
    searchThreeFictitiousCategoryInfo,
    operationSelectedCategory,
    addFictitiousCategory,
    updateFictitiousCategory,
    deleteFictitiousCategory,
    isShowFictitiousCategory,
    getCategory3,
    getCategory3Edit,
    addCategory3,
    getCategory3Label,
    updateCategory3,
    clearCategory3Edit,
    changeCategory3Arr
} from './redux';

@connect(
    state => ({FC: state.FC,funcPermissions: state.funcPermissions}),
    dispatch => bindActionCreators({
        saveFormData,
        clearThreeData,
        searchPublish,
        publish,
        searchOneFictitiousCategoryInfo,
        searchTwoFictitiousCategoryInfo,
        searchThreeFictitiousCategoryInfo,
        operationSelectedCategory,
        addFictitiousCategory,
        updateFictitiousCategory,
        deleteFictitiousCategory,
        isShowFictitiousCategory,
        getCategory3,
        getCategory3Edit,
        addCategory3,
        getCategory3Label,
        updateCategory3,
        clearCategory3Edit,
        getPlatformFuncPermission,
        changeCategory3Arr
    }, dispatch)
)

export default class FictitiousCategoryViewWrap extends Component{
  constructor(props){
    super(props);
    this.state = {
      edit: 0,
      twoParentFcId: 0,
      threeParentFcId: 0,
      oneDetailData: {},
      twoDetailData: {},
      thrDetailData: {},
      activeIdOne: 1,
      activeIdTwo: 1,
      activeIdThree: 1,
    };
  }
  //修改state.activeIdOne
  changeActiveIdOne(fcid){
    this.setState({activeIdOne: fcid});
    if(this.props.FC.twoData && this.props.FC.twoData.data && this.props.FC.twoData.data.length){
      this.setState({activeIdTwo: this.props.FC.twoData.data[0].fCid});
    }
    if(this.props.FC.threeData && this.props.FC.threeData.data && this.props.FC.threeData.data.length){
      this.setState({activeIdThree: this.props.FC.threeData.data[0].fCid});
    }
  }
  //修改state.activeIdTwo
  changeActiveIdTwo(fcid){
    this.setState({activeIdTwo: fcid});
    if(this.props.FC.threeData && this.props.FC.threeData.data && this.props.FC.threeData.data.length){
      this.setState({activeIdThree: this.props.FC.threeData.data[0].fCid});
    }
  }
  //修改state.activeIdThree
  changeActiveIdThree(fcid){
    this.setState({activeIdThree: fcid});
  }
  //修改state.edit
  changeEdit(){
    this.setState({edit: 1});
  }
  //发布类目
  publishCategory(){
    this.props.publish({}).then(
      (result)=>{
        console.log('publish success');
        if(result.code == 0){
          message.success(result.msg, 2);
          this.props.searchPublish({}).then(
            (result)=>{
              console.log('searchPublish success');
              this.setState({edit: result.data});
            },
            (error)=>{console.log('searchPublish fail')}
          );
        }
      }
    );
  }
  //修改第二列父ID
  changeTwoParentFcId(value){
    this.setState({twoParentFcId: value});
  }
  //修改第三列父ID
  changeThreeParentFcId(value){
    this.setState({threeParentFcId: value});
  }
  //修改DetailModal组件内需要的参数
  changeDetailData(level, value){
    if(level == 1) this.setState({oneDetailData: value});
    else if(level == 2) this.setState({twoDetailData: value});
    else if(level == 3) this.setState({thrDetailData: value});
  }
  componentWillMount(){
    console.log(this.props)
    //获取菜单权限
    //this.props.getPlatformFuncPermission && this.props.getPlatformFuncPermission();
    this.props.getPlatformFuncPermission();

    this.props.searchPublish({}).then(
      (result)=>{
        console.log('searchPublish success');
        this.setState({edit: result.data});
      },
      (error)=>{console.log('searchPublish fail')}
    );
    let initialValues = {parentFCid:0 , level: 1};
    this.props.searchOneFictitiousCategoryInfo(initialValues).then(
      (result)=>{
        if(result.code == 0){
          console.log('searchOneFictitiousCategoryInfo success');
          if(!result.data[0]) return;
          this.changeActiveIdOne(result.data[0].fCid);
          this.setState({oneDetailData :{
            parentFCid: result.data[0].parentFCid,
            fCid: result.data[0].fCid,
            sortNum: result.data[0].sortNumber,
            level: 1
          }});
          let twoData = {parentFCid:result.data[0].fCid , level: 2};
          this.setState({twoParentFcId: result.data[0].fCid});
          this.props.saveFormData(twoData);
          this.props.searchTwoFictitiousCategoryInfo(twoData).then(
            (result)=>{
              console.log('searchTwoFictitiousCategoryInfo success');
              if(!result.data[0]){
                this.props.clearThreeData();
                return;
              }
              this.changeActiveIdTwo(result.data[0].fCid);
              this.setState({twoDetailData :{
                parentFCid: result.data[0].parentFCid,
                fCid: result.data[0].fCid,
                sortNum: result.data[0].sortNumber,
                level: 2
              }});
              let threeData = {parentFCid:result.data[0].fCid , level: 3};
              this.setState({threeParentFcId: result.data[0].fCid});
              this.props.searchThreeFictitiousCategoryInfo(threeData).then(
                (result)=>{
                  console.log('searchThreeFictitiousCategoryInfo success');
                  if(!result.data[0]) return;
                  this.changeActiveIdThree(result.data[0].fCid);
                  this.setState({thrDetailData :{
                    parentFCid: result.data[0].parentFCid,
                    fCid: result.data[0].fCid,
                    sortNum: result.data[0].sortNumber,
                    level: 3
                  }});
                },
                (error)=>{console.log('searchThreeFictitiousCategoryInfo fail')}
              )
            },
            (error)=>{
              console.log('searchTwoFictitiousCategoryInfo fail');
            }
          )
        }else{
          message.error(result.msg , 2);
        }
      },
      (error)=>{console.log('searchOneFictitiousCategoryInfo fail')}
    )
  }
  render(){
    return(
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>商城管理</Breadcrumb.Item>
            <Breadcrumb.Item>商城设置</Breadcrumb.Item>
            <Breadcrumb.Item>分类导航设置</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">
            <span>分类导航设置</span>
          </div>
          <div className="ui-bd" style={{overflow:'auto'}}>
            <Alert className={styles.mb16} message="提示：发布分类导航后，您需前往商城装修，重新发布商城头部，前台展示分类更新" type="warning" showIcon />
            <div className={styles.content}>
              <FictitiousCategory
               level="1"
               title="一级分类导航"
               edit={this.state.edit}
               detailData={this.state.oneDetailData}
               activeId={this.state.activeIdOne}
               changeActiveId={(fcid)=>this.changeActiveIdOne(fcid)}
               changeEdit={()=>this.changeEdit()}
               changeDetailData={(level, detailData)=>this.changeDetailData(level, detailData)}
               FC={this.props.FC}
               data={this.props.FC.oneData}
               twoParentFcId={this.state.twoParentFcId}
               threeParentFcId={this.state.threeParentFcId}
               changeTwoParentFcId={(value)=>this.changeTwoParentFcId(value)}
               changeThreeParentFcId={(value)=>this.changeThreeParentFcId(value)}
               saveFormData={this.props.saveFormData}
               clearThreeData={this.props.clearThreeData}
               searchOneFictitiousCategoryInfo={this.props.searchOneFictitiousCategoryInfo}
               searchTwoFictitiousCategoryInfo={this.props.searchTwoFictitiousCategoryInfo}
               searchThreeFictitiousCategoryInfo={this.props.searchThreeFictitiousCategoryInfo}
               operationSelectedCategory={this.props.operationSelectedCategory}
               addFictitiousCategory={this.props.addFictitiousCategory}
               updateFictitiousCategory={this.props.updateFictitiousCategory}
               deleteFictitiousCategory={this.props.deleteFictitiousCategory}
               isShowFictitiousCategory={this.props.isShowFictitiousCategory}
               funcPermissions={this.props.funcPermissions}
              />
              <FictitiousCategory
                level="2"
                title="二级分类导航"
                edit={this.state.edit}
                detailData={this.state.twoDetailData}
                activeId={this.state.activeIdTwo}
                changeActiveId={(fcid)=>this.changeActiveIdTwo(fcid)}
                changeEdit={()=>this.changeEdit()}
                changeDetailData={(level, detailData)=>this.changeDetailData(level, detailData)}
                FC={this.props.FC}
                data={this.props.FC.twoData}
                twoParentFcId={this.state.twoParentFcId}
                threeParentFcId={this.state.threeParentFcId}
                changeTwoParentFcId={(value)=>this.changeTwoParentFcId(value)}
                changeThreeParentFcId={(value)=>this.changeThreeParentFcId(value)}
                saveFormData={this.props.saveFormData}
                clearThreeData={this.props.clearThreeData}
                searchOneFictitiousCategoryInfo={this.props.searchOneFictitiousCategoryInfo}
                searchTwoFictitiousCategoryInfo={this.props.searchTwoFictitiousCategoryInfo}
                searchThreeFictitiousCategoryInfo={this.props.searchThreeFictitiousCategoryInfo}
                operationSelectedCategory={this.props.operationSelectedCategory}
                addFictitiousCategory={this.props.addFictitiousCategory}
                updateFictitiousCategory={this.props.updateFictitiousCategory}
                deleteFictitiousCategory={this.props.deleteFictitiousCategory}
                isShowFictitiousCategory={this.props.isShowFictitiousCategory}
                funcPermissions={this.props.funcPermissions}
              />
              <FictitiousCategory
                level="3"
                title="三级分类导航"
                edit={this.state.edit}
                detailData={this.state.thrDetailData}
                activeId={this.state.activeIdThree}
                changeActiveId={(fcid)=>this.changeActiveIdThree(fcid)}
                changeDetailData={(level, detailData)=>this.changeDetailData(level, detailData)}
                twoParentFcId={this.state.twoParentFcId}
                threeParentFcId={this.state.threeParentFcId}
                changeTwoParentFcId={(value)=>this.changeTwoParentFcId(value)}
                changeThreeParentFcId={(value)=>this.changeThreeParentFcId(value)}
                changeEdit={()=>this.changeEdit()}
                FC={this.props.FC}
                data={this.props.FC.threeData}
                saveFormData={this.props.saveFormData}
                clearThreeData={this.props.clearThreeData}
                searchOneFictitiousCategoryInfo={this.props.searchOneFictitiousCategoryInfo}
                searchTwoFictitiousCategoryInfo={this.props.searchTwoFictitiousCategoryInfo}
                searchThreeFictitiousCategoryInfo={this.props.searchThreeFictitiousCategoryInfo}
                operationSelectedCategory={this.props.operationSelectedCategory}
                addFictitiousCategory={this.props.addFictitiousCategory}
                updateFictitiousCategory={this.props.updateFictitiousCategory}
                deleteFictitiousCategory={this.props.deleteFictitiousCategory}
                isShowFictitiousCategory={this.props.isShowFictitiousCategory}
                getCategory3={this.props.getCategory3}
                getCategory3Edit={this.props.getCategory3Edit}
                addCategory3={this.props.addCategory3}
                updateCategory3={this.props.updateCategory3}
                getCategory3Label={this.props.getCategory3Label}
                clearCategory3Edit={this.props.clearCategory3Edit}
                funcPermissions={this.props.funcPermissions}
                changeCategory3Arr={this.props.changeCategory3Arr}
              />
            </div>
            <div className={styles.footer}>

              {this.state.edit ? <span className={styles.tip}>
                <Icon type="exclamation-circle-o" style={{marginRight:'5px'}} />您的分类有改动，记得发布哦。
              </span> : null}
              <div className={styles.btn}>
                <Button onClick={()=>this.publishCategory({})} disabled={!this.state.edit} type="primary" style={{paddingLeft:'20px', paddingRight:'20px'}}>发布</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
