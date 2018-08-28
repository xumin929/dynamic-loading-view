/**
 * Created by likaiwen on 2017/5/24.
 */
import React,{Component} from 'react';
import {Modal,message} from 'jdcloudui';
export default class DeleteModal extends Component{
  constructor(props,content){
    super(props,content)
  }
  //点击确定执行的操作
  onOk(){
    console.log(this.props.twoParentFcId,this.props.threePraentFcId);
    this.props.hideModal();
    let deleteData = {fCid: this.props.fcId, level: this.props.level};
    if(this.props.level == "1") deleteData.parentFCid = 0;
    else if(this.props.level == "2") deleteData.parentFCid = this.props.twoParentFcId;
    else if(this.props.level == "3") deleteData.parentFCid = this.props.threeParentFcId;
    console.log(deleteData);
    this.props.deleteFictitiousCategory(deleteData).then(
      (result)=>{
        console.log('deleteFictitiousCategory success');

        message.success(result.msg, 2);
        this.props.changeEdit();
        this.props.refresh(0);

        if(this.props.activeId == this.props.fcId){
          this.props.changeActiveId(this.props.data.data[0].fCid);
          if(this.props.level == 1){
            let detailData = {
              parentFCid: this.props.data.data[0].parentFCid,
              fCid: this.props.data.data[0].fCid,
              sortNum: this.props.data.data[0].sortNumber,
              level: 1
            };
            this.props.changeDetailData(1, detailData);
            let searchData = {parentFCid: this.props.data.data[0].fCid , level: 2};
            this.props.searchTwoFictitiousCategoryInfo(searchData).then(
              (result)=>{
                console.log('searchTwoFictitiousCategoryInfo success');
                if(!result.data[0]) return;
                let detailData = {
                  parentFCid: result.data[0].parentFCid,
                  fCid: result.data[0].fCid,
                  sortNum: result.data[0].sortNumber,
                  level: 2
                };
                this.props.changeDetailData(2, detailData);
                this.props.changeTwoParentFcId(result.data[0].parentFCid);
                let searchData = {parentFCid: result.data[0].fCid , level: 3};
                this.props.searchThreeFictitiousCategoryInfo(searchData).then(
                  (result)=>{
                    console.log('searchThreeFictitiousCategoryInfo success');
                    if(!result.data[0]) return;
                    let detailData = {
                      parentFCid: result.data[0].parentFCid,
                      fCid: result.data[0].fCid,
                      sortNum: result.data[0].sortNumber,
                      level: 3
                    };
                    this.props.changeDetailData(3, detailData);
                    this.props.changeThreeParentFcId(result.data[0].parentFCid);
                  },
                  (error)=>{console.log('searchThreeFictitiousCategoryInfo fail')}
                )
              },
              (error)=>{console.log('searchTwoFictitiousCategoryInfo fail')}
            );
          }else if(this.props.level == 2){
            let detailData = {
              parentFCid: this.props.data.data[0].parentFCid,
              fCid: this.props.data.data[0].fCid,
              sortNum: this.props.data.data[0].sortNumber,
              level: 2
            };
            this.props.changeDetailData(2, detailData);
            let searchData = {parentFCid: this.props.data.data[0].fCid , level: 3};
            this.props.searchThreeFictitiousCategoryInfo(searchData).then(
              (result)=>{
                console.log('searchThreeFictitiousCategoryInfo success');
                if(!result.data[0]) return;
                let detailData = {
                  parentFCid: result.data[0].parentFCid,
                  fCid: result.data[0].fCid,
                  sortNum: result.data[0].sortNumber,
                  level: 3
                };
                this.props.changeDetailData(3, detailData);
                this.props.changeThreeParentFcId(result.data[0].parentFCid);
              },
              (error)=>{console.log('searchThreeFictitiousCategoryInfo fail')}
            )
          }
        }
      },
      (error)=>{
        console.log('deleteFictitiousCategory fail');
        message.error('删除失败，请联系管理员！');
      }
    );
  }
  //点击取消的操作
  onCancel(){
    this.props.hideModal();
  }
  render(){
    return (
      <div>
        <Modal
          title="提示"
          visible={this.props.visible}
          onOk={()=>this.onOk()}
          onCancel={()=>this.onCancel()}
          okText="确定"
          cancelText="取消"
          maskClosable={false}
        >
          <p style={{textAlign:'center'}}>{"子分类亦会被删除，确定要删除？"}</p>
        </Modal>
      </div>
    );
  }
}
