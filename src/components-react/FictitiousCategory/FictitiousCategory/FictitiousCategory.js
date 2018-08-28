/**
 * Created by likaiwen on 2017/5/22.
 */
import React,{Component} from 'react';
import {Modal,Icon,message,Popover} from 'jdcloudui';
import DeleteModal from '../DeleteModal/DeleteModal';
import DetailModal from '../DetailModal/DetailModal';
import Nav3AddBox from '../Nav3AddBox/Nav3AddBox';
import SetAdvertisement from '../SetAdvertisement/SetAdvertisement';
import styles from './styles.less';
import {FuncPermission}  from 'jdcloudecc/components';
import {Loading} from 'jdcloudecc/components';


var fcId = 0;
var title = "";
var content = "";
var placeholder = "";
var detailData = {};


export default class FictitiousCategory extends Component{
  constructor(props){
    super(props);
    this.codesResponse = [];
    this.codes = [];
    this.state = {
      flag:true,
      updateShow: false,
      deleteShow: false,
      addShow: false,
      advShow: false,
      threeShow: false,
      isEdit: false,
      type: 1,
      name: "",
      homeShow: 1,
      idx: 0,
      id: 0,
      associationType: 1,
      isAbled: true
    };
  }
  /*componentDidMount(){
    let permissionData = this.props.funcPermissions.data
    console.log(permissionData);
    console.log(this.props.funcPermissions);
    if(permissionData && permissionData.code != 0){
      message.warning('菜单权限获取失败！');
    }
    if(permissionData && permissionData.code == 0){
      this.codesResponse = permissionData.data;
      this.codes = this.codesResponse && this.codesResponse.join(',');
      console.log(this.codes);
      console.log(this.codesResponse);
    }
  }*/
  componentWillReceiveProps(){
    this.setState({id: this.props.activeId});
  }
  //点击某一行执行的操作
  rowClickChangeColor(index,fcid){
    fcId = fcid;
    this.props.changeActiveId(fcid);
    this.setState({flag:false,idx:index,id: fcid});
    if(this.props.level == "1"){
      detailData = {
        parentFCid: 0,
        fCid: fcid,
        sortNum: this.props.data.data[index].sortNumber,
        level: 1
      };
      this.props.changeDetailData(1, detailData);
      this.props.changeTwoParentFcId(fcid);
      let searchData = {parentFCid: fcid , level: 2};
      this.props.saveFormData({parentFCid:fcid});
      this.props.searchTwoFictitiousCategoryInfo(searchData).then(
        (result)=>{
          if(!result.data[0] || result.data.length == 0){
            this.props.clearThreeData();
            return;
          }
          detailData = {
            parentFCid: result.data[0].parentFCid,
            fCid: result.data[0].fCid,
            sortNum: result.data[0].sortNumber,
            level: 2
          };
          this.props.changeDetailData(2, detailData);
          this.props.changeActiveId(fcid);
          this.props.changeThreeParentFcId(result.data[0].fCid);
          console.log('searchTwoFictitiousCategoryInfo success');
          let threeData = {parentFCid: result.data[0].fCid , level: 3};
          this.props.searchThreeFictitiousCategoryInfo(threeData).then(
            (result)=>{
              console.log('searchThreeFictitiousCategoryInfo success');
              if(!result.data[0])return;
              detailData = {
                parentFCid: result.data[0].parentFCid,
                fCid: result.data[0].fCid,
                sortNum: result.data[0].sortNumber,
                level: 3
              };
              this.props.changeActiveId(fcid);
              this.props.changeDetailData(3, detailData);
            },
            (error)=>{console.log('searchTwoFictitiousCategoryInfo fail')}
          )
        },
        (error)=>{console.log('searchTwoFictitiousCategoryInfo fail')}
      )
    }else if(this.props.level == "2"){
      detailData = {
        parentFCid: this.props.data.data[index].parentFCid,
        fCid: fcid,
        sortNum: this.props.data.data[index].sortNumber,
        level: 2
      };
      this.props.changeDetailData(2, detailData);
      this.props.changeThreeParentFcId(fcid);
      let searchData = {parentFCid: fcid , level: 3};
      this.props.searchThreeFictitiousCategoryInfo(searchData).then(
        (result)=>{
          console.log('searchThreeFictitiousCategoryInfo success');
          if(!result.data[0]) return;
          detailData = {
            parentFCid: result.data[0].parentFCid,
            fCid: result.data[0].fCid,
            sortNum: result.data[0].sortNumber,
            level: 3
          };
          this.props.changeDetailData(3, detailData);
          this.props.changeActiveId(fcid);
        },
        (error)=>{console.log('searchThreeFictitiousCategoryInfo fail')}
      )
    }else if(this.props.level == 3){
      detailData = {
        parentFCid: this.props.data.data[index].parentFCid,
        fCid: fcid,
        sortNum: this.props.data.data[index].sortNumber,
        level: 3
      };
      this.props.changeDetailData(3, detailData);
      this.props.changeActiveId(fcid);
    }
  }
  //添加导航
  add(){
    if(this.props.level != 3){
      if(this.props.level == 1){
        title = "添加一级分类导航";
        content = "一级分类导航名称";
        placeholder = "一级分类导航名称";
      }else{
        title = "添加二级分类导航";
        content = "二级分类导航名称";
        placeholder = "二级分类导航名称";
      }
      this.setState({addShow: true,type: 1,name: "",homeShow: 1});
    }
  }
  //编辑
  update(e,idx){
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    fcId = this.props.data.data[idx].fCid;
    if(this.props.level != 3){
      if(this.props.level == 1){
        title = "编辑一级分类导航";
        content = "一级分类导航名称";
        placeholder = "一级分类导航名称";
      }else{
        title = "编辑二级分类导航";
        content = "二级分类导航名称";
        placeholder = "二级分类导航名称";
      }
      this.setState({updateShow:true,type: 0,name: this.props.data.data[idx].name,homeShow: this.props.data.data[idx].homeShow});
    }
  }
  //删除
  delete(e,idx){
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    fcId = this.props.data.data[idx].fCid;
    this.setState({deleteShow: true});
  }
  //移动操作
  move(e,type){
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    console.log(this.state.flag);
    this.setState({flag:false});
    if(!this.state.isAbled) return false;
    this.setState({isAbled : false});
    for(let i = 0 ; i < this.props.data.data.length ; i++){
      if(this.props.data.data[i].fCid == this.state.id){
        detailData = {
          parentFCid: this.props.data.data[i].parentFCid,
          fCid: this.props.data.data[i].fCid,
          sortNum: this.props.data.data[i].sortNumber,
          level: this.props.level
        }
      }
    }
    detailData.sortType = type;
    this.props.operationSelectedCategory(detailData).then(
      (result)=>{
        console.log('operationSelectedCategory success');
        message.success(result.msg, 2);
        this.props.changeEdit();
        this.refresh();
      },
      (error)=>{
        console.log('operationSelectedCategory fail');
        message.error('操作失败，请联系管理员！', 2);
      }
    );
  }
  //显示或隐藏
  isShowHide(e, isShow, idx){
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    let serarchData = {
      parentFCid: this.props.data.data[idx].parentFCid,
      fCid: this.props.data.data[idx].fCid,
      homeShow: isShow == 1 ? 2 : 1,
      level: this.props.level
    }
    this.props.isShowFictitiousCategory(serarchData).then(
      (result)=>{
        console.log('isShowFictitiousCategory success');
        message.success(result.msg, 2);
        this.props.changeEdit();
        this.refresh();
      },
      (error)=>{
        console.log('isShowFictitiousCategory fail');
        message.error('操作失败，请联系管理员！', 2);
      }
    )
  }
  //设置广告
  setAdv(e,idx){
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    fcId = this.props.data.data[idx].fCid;
    this.setState({advShow: true});
  }
  //第三级弹出框
  showThreeModal(e,idx){
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    if(idx != undefined){
      fcId = this.props.data.data[idx].fCid;
      this.setState({name: this.props.data.data[idx].name,homeShow: this.props.data.data[idx].homeShow,associationType: this.props.data.data[idx].associationType});
    }else{
      fcId = 0;
      this.setState({name: "",homeShow: 1,associationType: 1});
    }
    this.setState({threeShow: true})
  }
  //隐藏所有二次确认窗口
  hideModal(cb){
    this.setState({updateShow: false,deleteShow: false,addShow: false,advShow: false,threeShow: false},cb);
  }
  //刷新页面
  refresh(type){
    this.props.changeDetailData(this.props.level, detailData);
    if(this.props.level == "1"){
      let searchData = {parentFCid:0 , level:this.props.level};
      this.props.searchOneFictitiousCategoryInfo(searchData).then(
        (result)=>{
          console.log('searchOneFictitiousCategoryInfo success');
          this.setState({isAbled : true});
          if(type == 1){
            this.props.changeActiveId(result.data[result.data.length - 1].fCid);
            if(document.getElementsByClassName(`${styles.listBox}`)[0].offsetHeight < document.getElementsByClassName(`${styles.listBox}`)[0].scrollHeight){
              document.getElementsByClassName(`${styles.listBox}`)[0].scrollTop = document.getElementsByClassName(`${styles.listBox}`)[0].scrollHeight;
            }
            this.rowClickChangeColor(result.data.length - 1, result.data[result.data.length - 1].fCid);
          }else if(type == 0){
            if(result.data[0] && result.data.length != 0){
              this.props.changeActiveId(result.data[0].fCid);
              if(document.getElementsByClassName(`${styles.listBox}`)[0].offsetHeight < document.getElementsByClassName(`${styles.listBox}`)[0].scrollHeight){
                document.getElementsByClassName(`${styles.listBox}`)[0].scrollTop = 0;
              }
              this.rowClickChangeColor(0, result.data[0].fCid);
            }else{
              this.props.clearThreeData();
            }
          }
          if(result.data[0] && result.data.length != 0) {
            detailData = {
              parentFCid: this.props.data.data[this.state.idx].parentFCid,
              fCid: this.props.data.data[this.state.idx].fCid,
              sortNum: this.props.data.data[this.state.idx].sortNumber,
              level: this.props.level
            };
            this.props.changeDetailData(this.props.level, detailData);
          }
        },
        (error)=>{console.log('searchOneFictitiousCategoryInfo fail')}
      )
    }else if(this.props.level == "2"){
      let searchData = {parentFCid: this.props.twoParentFcId , level:this.props.level};
      this.props.searchTwoFictitiousCategoryInfo(searchData).then(
        (result)=>{
          console.log('searchTwoFictitiousCategoryInfo success');
          this.setState({isAbled : true});
          if(type == 1){
            this.props.changeActiveId(result.data[result.data.length - 1].fCid);
            if(document.getElementsByClassName(`${styles.listBox}`)[1].offsetHeight < document.getElementsByClassName(`${styles.listBox}`)[1].scrollHeight){
              document.getElementsByClassName(`${styles.listBox}`)[1].scrollTop = document.getElementsByClassName(`${styles.listBox}`)[1].scrollHeight;
            }
            this.rowClickChangeColor(result.data.length - 1, result.data[result.data.length - 1].fCid);
          }else if(type == 0){
            if(result.data[0] && result.data.length != 0) {
              this.props.changeActiveId(result.data[0].fCid);
              if (document.getElementsByClassName(`${styles.listBox}`)[1].offsetHeight < document.getElementsByClassName(`${styles.listBox}`)[1].scrollHeight) {
                document.getElementsByClassName(`${styles.listBox}`)[1].scrollTop = 0;
              }
              this.rowClickChangeColor(0, result.data[0].fCid);
            }else{
              this.props.clearThreeData();
            }
          }
          if(result.data[0] && result.data.length != 0) {
            detailData = {
              parentFCid: this.props.data.data[this.state.idx].parentFCid,
              fCid: this.props.data.data[this.state.idx].fCid,
              sortNum: this.props.data.data[this.state.idx].sortNumber,
              level: this.props.level
            };
            this.props.changeDetailData(this.props.level, detailData);
          }
        },
        (error)=>{console.log('searchTwoFictitiousCategoryInfo fail')}
      )
    }else if(this.props.level == "3"){
      let searchData = {parentFCid: this.props.threeParentFcId , level:this.props.level};
      this.props.searchThreeFictitiousCategoryInfo(searchData).then(
        (result)=>{
          console.log('searchThreeFictitiousCategoryInfo success');
          this.setState({isAbled : true});
          if(type == 1){
            this.props.changeActiveId(result.data[result.data.length - 1].fCid);
            if(document.getElementsByClassName(`${styles.listBox}`)[2].offsetHeight < document.getElementsByClassName(`${styles.listBox}`)[2].scrollHeight){
              document.getElementsByClassName(`${styles.listBox}`)[2].scrollTop = document.getElementsByClassName(`${styles.listBox}`)[2].scrollHeight;
            }
            this.rowClickChangeColor(result.data.length - 1, result.data[result.data.length - 1].fCid);
          }else if(type == 0){
            if(result.data[0] && result.data.length != 0) {
              this.props.changeActiveId(result.data[0].fCid);
              if (document.getElementsByClassName(`${styles.listBox}`)[2].offsetHeight < document.getElementsByClassName(`${styles.listBox}`)[2].scrollHeight) {
                document.getElementsByClassName(`${styles.listBox}`)[2].scrollTop = 0;
              }
              this.rowClickChangeColor(0, result.data[0].fCid);
            }
          }
          if(result.data[0] && result.data.length != 0) {
            detailData = {
              parentFCid: this.props.data.data[this.state.idx].parentFCid,
              fCid: this.props.data.data[this.state.idx].fCid,
              sortNum: this.props.data.data[this.state.idx].sortNumber,
              level: this.props.level
            };
            this.props.changeDetailData(this.props.level, detailData);
          }
        },
        (error)=>{console.log('searchThreeFictitiousCategoryInfo fail')}
      )
    }
  }
  render(){
    if(this.props.level == 2){
      var show = this.props.FC.twoData && this.props.FC.twoData.data && this.props.FC.oneData.data.length ? false : true;
    }else if(this.props.level == 3){
      var show = this.props.FC.twoData && this.props.FC.twoData.data && this.props.FC.twoData.data.length ? false : true;
    }
    let permissionData = this.props.funcPermissions.data
    if(permissionData && permissionData.code != 0){
      message.warning('菜单权限获取失败！');
    }
    if(permissionData && permissionData.code == 0){
      this.codesResponse = permissionData.data;
      this.codes = this.codesResponse && this.codesResponse.join(',');
    }

    return(
      <div className={this.props.level == "1" ? styles.leftBox : styles.box}>
        {this.props.level == 1 ? <Loading loaded = {this.props.FC.oneLoaded}>
        </Loading> : null}
        {this.props.level == 2 ? <Loading loaded = {this.props.FC.twoLoaded}>
        </Loading> : null}
        {this.props.level == 3 ? <Loading loaded = {this.props.FC.threeLoaded}>
        </Loading> : null}
        <div className={styles.header}>
          <span className="text-333">{this.props.title}</span>
          {this.props.level == "1" ?
            <span className={styles.tip}>
              <Popover overlayStyle={{width: 200}} placement="bottomLeft" content="出于页面展示效果考虑，前台最多展示前10个“显示状态”的分类" trigger="hover">
                <Icon type="question-circle-o" />
              </Popover>
            </span>
            : null}
        </div>
        <div className={styles.addBox}>
          <FuncPermission codes={this.codesResponse} code={this.props.level == 1 ? 'firstAdd' : this.props.level == 2 ? 'secondAdd' : this.props.level == 3 ? 'thirdAdd' : ''}>
            <a
              disabled={show}
              className={styles.add}
              onClick={this.props.level != 3 ? ()=>this.add() : (event)=>this.showThreeModal(event)}
            >
              <Icon type="plus-circle" /> 添加分类导航
            </a>
          </FuncPermission>
          <div style={!this.state.isAbled ? {color: 'rgba(0, 0, 0, 0.25)', cursor: 'not-allowed'} : {}} className={styles.moveTop + ' ' + styles.allMenu} onClick={(event)=>this.move(event,1)}>
            <Popover placement="bottom" content="上移" trigger="hover">
              <Icon type="shangyi" style={!this.state.isAbled ? {color: 'rgba(0, 0, 0, 0.25)', cursor: 'not-allowed'} : {}} />
            </Popover>
          </div>
          <div style={!this.state.isAbled ? {color: 'rgba(0, 0, 0, 0.25)', cursor: 'not-allowed'} : {}} className={styles.moveBottom + ' ' + styles.allMenu} onClick={(event)=>this.move(event,2)}>
            <Popover placement="bottom" content="下移" trigger="hover">
              <Icon type="xiayi" style={!this.state.isAbled ? {color: 'rgba(0, 0, 0, 0.25)', cursor: 'not-allowed'} : {}} />
            </Popover>
          </div>
        </div>
        <div className={styles.listBox+' text-333 '}>
          {this.props.data && this.props.data.data && this.props.data.data.map((item,index)=>{
            return (
              <div
                key={item.key}
                style={
                  item.homeShow == 2
                    ? {backgroundColor: '#fafafa'}
                    : {backgroundColor: '#FFF'}
                }
                className={
                  item.fCid == this.props.activeId || index == 0 && this.state.flag
                    ? styles.rowBox + ' ' + styles.activeRow
                    : styles.rowBox
                }
                onClick={
                  ()=>this.rowClickChangeColor(index,item.fCid)
                }
              >
                <span className={styles.row}>{item.name}</span>
                <div className={styles.detail}>
                  <FuncPermission codes={this.codesResponse} code={this.props.level == 1 ? 'firstIsShow' : this.props.level == 2 ? 'secondIsShow' : this.props.level == 3 ? 'thirdIsShow' : ''}>
                    <span className={item.homeShow == 1 ? styles.show + ' ' + styles.allMenu : styles.hide + ' ' + styles.allMenu} onClick={(event)=>this.isShowHide(event,item.homeShow,index)}>
                      {item.homeShow == 1 ?
                        <Popover placement="bottom" content="隐藏" trigger="hover">
                          <Icon type="new-show" />
                        </Popover>
                        :
                        <Popover placement="bottom" content="显示" trigger="hover">
                          <Icon type="new-hide" />
                        </Popover>
                      }
                    </span>
                  </FuncPermission>
                  {this.props.level == 1 ?
                    <FuncPermission codes={this.codesResponse} code='firstSetAdv'>
                      <span className={styles.adv + ' ' + styles.allMenu} onClick={(event)=>this.setAdv(event,index)}>
                        <Popover placement="bottom" content="广告" trigger="hover">
                          <Icon type="new-ad" />
                        </Popover>
                      </span>
                    </FuncPermission>
                  : null}
                  <FuncPermission codes={this.codesResponse} code={this.props.level == 1 ? 'firstDel' : this.props.level == 2 ? 'secondDel' : this.props.level == 3 ? 'thirdDel' : ''}>
                    <span className={styles.del + ' ' + styles.allMenu} onClick={(event)=>this.delete(event,index)}>
                      <Popover placement="bottom" content="删除" trigger="hover">
                        <Icon type="new-delete" />
                      </Popover>
                    </span>
                  </FuncPermission>
                  <FuncPermission codes={this.codesResponse} code={this.props.level == 1 ? 'firstUpd' : this.props.level == 2 ? 'secondUpd' : this.props.level == 3 ? 'thirdUpd' : ''}>
                    <span className={styles.upd + ' ' + styles.allMenu} onClick={this.props.level != 3 ? (event)=>this.update(event,index) : (event)=>this.showThreeModal(event,index)}>
                      <Popover placement="bottom" content="编辑" trigger="hover">
                        <Icon type="new-edit" />
                      </Popover>
                    </span>
                  </FuncPermission>
                </div>
              </div>
            )
          })}
        </div>
        <DeleteModal
          visible={this.state.deleteShow}
          fcId={fcId}
          level={this.props.level}
          activeId={this.props.activeId}
          twoParentFcId={this.props.twoParentFcId}
          threeParentFcId={this.props.threeParentFcId}
          data={this.props.data}
          hideModal={()=>this.hideModal()}
          deleteFictitiousCategory={this.props.deleteFictitiousCategory}
          refresh={(type)=>this.refresh(type)}
          changeDetailData={(level, detailData)=>this.props.changeDetailData(level, detailData)}
          FC={this.props.FC}
          changeEdit={()=>this.props.changeEdit()}
          changeActiveId={(fcid)=>this.props.changeActiveId(fcid)}
          changeTwoParentFcId={(value)=>this.props.changeTwoParentFcId(value)}
          changeThreeParentFcId={(value)=>this.props.changeThreeParentFcId(value)}
          searchOneFictitiousCategoryInfo={this.props.searchOneFictitiousCategoryInfo}
          searchTwoFictitiousCategoryInfo={this.props.searchTwoFictitiousCategoryInfo}
          searchThreeFictitiousCategoryInfo={this.props.searchThreeFictitiousCategoryInfo}
        />
        <DetailModal
          type={this.state.type}
          name={this.state.name}
          homeShow={this.state.homeShow}
          fcId={fcId}
          level={this.props.level}
          visible={this.state.updateShow || this.state.addShow}
          twoParentFcId={this.props.twoParentFcId}
          threeParentFcId={this.props.threeParentFcId}
          data={this.props.data}
          hideModal={()=>this.hideModal()}
          title={title}
          content={content}
          placeholder={placeholder}
          addFictitiousCategory={this.props.addFictitiousCategory}
          updateFictitiousCategory={this.props.updateFictitiousCategory}
          refresh={(type)=>this.refresh(type)}
          FC={this.props.FC}
          changeEdit={()=>this.props.changeEdit()}
          changeActiveId={(fcid)=>this.props.changeActiveId(fcid)}
          changeTwoParentFcId={(value)=>this.props.changeTwoParentFcId(value)}
          changeThreeParentFcId={(value)=>this.props.changeThreeParentFcId(value)}
        />
        {this.props.level == 3 && this.state.threeShow ?
          <Nav3AddBox
            FC={this.props.FC}
            getCategory3={this.props.getCategory3}
            getCategory3Edit={this.props.getCategory3Edit}
            updateCategory3={this.props.updateCategory3}
            addCategory3={this.props.addCategory3}
            getCategory3Label={this.props.getCategory3Label}
            fcid={fcId}
            name={this.state.name}
            parentId={this.props.threeParentFcId}
            associationType={this.state.associationType}
            homeShow={this.state.homeShow}
            hideModal={(cb)=>this.hideModal(cb)}
            changeEdit={()=>this.props.changeEdit()}
            refresh={(type)=>this.refresh(type)}
            clearCategory3Edit={this.props.clearCategory3Edit}
            changeCategory3Arr={this.props.changeCategory3Arr}
          /> : null}
        {this.props.level == 1 && this.state.advShow ?
          <SetAdvertisement
            fcid={fcId}
            hideModal={()=>this.hideModal()}
            changeEdit={()=>this.props.changeEdit()}
          /> : null}
      </div>
    )
  }
}
