import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tree, Modal, Button, message} from 'jdcloudui';
import  CopyTo2 from './CopyTo2';
import { searchAllITEM , searchAllAttr, copySpecification } from './redux';
import {Loading} from 'jdcloudecc/components';
const TreeNode = Tree.TreeNode;
@connect(
  state => ({
    speciCopying: state.speciCopying,
    specificationSearch: state.specificationSearch
  }),
  dispatch => bindActionCreators({ searchAllITEM ,searchAllAttr, copySpecification}, dispatch)
)
export default class Copying extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      visible2: false,
      expandedKeys: [],
      checkedKeys: [],
      selectedKeys: [],
      ifNext: false,
      autoExpandParent: true,
      key: 0,
      copyToStep1: true,
      copyToStep2: true
    };
    this.initData =  []; //初始化的数据
    this.submitData = []; //提交的数据
    this.changeData = [];
    this.changeInit = [];
    this.treeData = [];
    this.allInfo = [];
    this.checkInfo = [];
    this.ifNext = true;
    this.allSel = false;
    this.initSubmitData = [];
  }
  // 弹出框显示与隐藏start
  showModal() {
    this.setState({
      visible: true,
      visible2: false,
    });
  }
  showModal2() {
    this.setState({
      visible2: true,
      visible: false,
    });
  }
  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
      visible2: false,
    });
    let param = {
      platformId: 2,
      targetCID: this.props.speciCopying.attrAllData,
        categoryAttributeLists: this.submitData
      }
    this.props.copySpecification(param).then(
      (result) => {
        if(result.code != 0){
          message.error(this.props.speciCopying.copydata.msg);
        }else{}
      },
      (error) => {
          message.error('复制到保存不成功');
       }
      );
  }
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
      visible2: false,
    });
    //this.props.callbackParent();
  }
  // 弹出框显示与隐藏end
  // 全选属性 复选属性 start
  onCheck(info,allS){
    if(allS == '123'){
      this.allSel = true;
    }else{
      this.allSel = false;
    }
    console.log(info, 'infoinfoinfoinfoinfoinfo');//用户选择的数据
    let oldinfo2 = JSON.parse(JSON.stringify(info));
    this.checkInfo = oldinfo2;
    let oldinfo = JSON.parse(JSON.stringify(info));
    let checkParent = [];//存放父节点信息(如果有子节点的话，保存的是序号，没有的话，保存的名字)
    let checkChidren = [];//存放子节点信息
    info.map((item, index) => {
      checkChidren[index] = info[index].split(';')[1] ? info[index].split(';')[1] : info[index].split(';')[0];
      checkParent[index] = info[index].split(';')[0];
    });
    this.setState({
      //expandedKeys: oldinfo,
      checkedKeys: oldinfo
    });
    this.submitData = [];
    checkChidren.map((item,index) => { //item每个要查找的字段(具体的子节点的value)
      console.log(item,'wl199212')
      this.initData.map((item2, index2)=>{ //item2 数组对象每项(存放的是大的数据类型)
       if(item2.attrName == item && +this.submitData.indexOf(item2) === -1 ) {//用于没有子节点的数据处理
            this.submitData.push(item2);
            if(item2.platformCategoryAttributeValues) {
              item2.platformCategoryAttributeValues.map((item3, index3) =>{
                this.changeInit[index2].platformCategoryAttributeValues[index3].ifCheck = 1;
              });
            }
        }else{
            if (item2.platformCategoryAttributeValues !== undefined) {
            item2.platformCategoryAttributeValues.map((item3, index3) => { //item3 每个子对象里的东西
              if(item3.attrValueName == item && checkParent[index] == item3.attrId) {
                if(this.submitData.indexOf(item2) == -1){
                  let tempData = JSON.parse(JSON.stringify(this.changeInit[index2]));//用于存放临时保存的数据
                  let tempArry = [];
                   this.changeInit[index2].platformCategoryAttributeValues.map((itemData,index,array)=>{
                    // if(itemData.attrValueName == item){
                    //   return itemData;
                    // }
                    if(itemData&&itemData.attrValueName == item){
                      tempArry.push(itemData);
                    }
                    console.log(itemData)
                  })
                  tempData.platformCategoryAttributeValues=tempArry;
                  this.submitData.push(tempData);
                }
                this.changeInit[index2].platformCategoryAttributeValues[index3].ifCheck = 1;
                }
            });
          }
        }
      });
    });
    if(this.allSel){
      this.submitData = JSON.parse(JSON.stringify(this.initSubmitData));
      if(this.submitData && this.submitData.length > 0){
        this.submitData.map((item, index) => {
          if(item.platformCategoryAttributeValues && item.platformCategoryAttributeValues.length){
            item.platformCategoryAttributeValues.map((item2, index2) => {
              if(item2.platformCategoryAttributeValues && item2.platformCategoryAttributeValues.length){
                item2.platformCategoryAttributeValues.map((item3, index3)=>{
                   if(item3.platformCategoryAttributeValues && item3.platformCategoryAttributeValues.length){
                        item3.platformCategoryAttributeValues.map((item4, index4)=>{
                            if(item4.platformCategoryAttributeValues && item4.platformCategoryAttributeValues.length){
                            }else{
                              item4.ifCheck = 1;
                            }
                        });
                    }else{
                      item3.ifCheck = 1;
                    }
                });
              }else{
                item2.ifCheck = 1;
              }
            });
          }else{
            item.ifCheck = 1;
          }
        });
      }else{}
    }else{}
  }
  onSelect(info) {
    /*this.setState({
      expandedKeys: info,
      checkedKeys: info
    });*/
  }
  allSelect(info) {
    this.submitData = this.initSubmitData;
    let arr = [];
    this.initData.map((item,index) => {
        arr.push(item.attrName);
    });
    this.setState({
      expandedKeys: arr,
      checkedKeys: arr
    });
    this.allSel = true;
    this.onCheck(arr, '123');
  }
  notSelect(){
    let index = -1;
    let all = JSON.parse(JSON.stringify(this.allInfo));
    this.checkInfo.map((item, index) => {
      index = all.indexOf(item);
      console.log(item);
      if(index != -1){
        all.splice(index, 1);
      }else{}
    });
    if(this.allSel){
      all = [];
    }else{}
    this.onCheck(all,false);
  }
  handleNext() {
    this.setState({
      copyToStep2: false
    });
    this.setState({
      visible: false,
      visible2: true,
    });
   let param = {
      //platformId: this.props.specificationSearch.data.result.data[0].platformId, //2
      cid: this.props.searchCid //1000087
    }
    this.props.searchAllAttr(param).then(
      (result) => {
        this.setState({
            copyToStep2: true
        });
        if(+result.code == 0){
          this.initSubmitData = result.data;
        }else{
          if(result.msg){
            message.error(result.msg);
          }else{
            message.error('获取属性失败');
          }
        }
      },
      (error) => {
        this.setState({
          copyToStep2: true
        });
        message.error('获取属性失败');
      }
      );
    this.initData =  this.props.speciCopying.searchData;
  }
  handlePrev() {
    this.setState({
      visible: true,
      visible2: false,
    });
  }
  handleCopyTo(){
    this.setState({
      copyToStep1: false
    });
    if(!this.props.searchCid){
       message.error("请选择最终类目");
       return false;
    }else{}
        this.setState({
          visible: true,
          visible2: false,
          //key: Math.random()
        });
        let param = {
          platformId: 2,//2
        };
        this.props.searchAllITEM(param).then(
          (result)=>{
           this.treeData = this.props.speciCopying.itemData;
           this.setState({
              copyToStep1: true
            });
          },
          (error)=>{
            this.setState({
              copyToStep1: true
            });
          }
        );
        //this.props.speciCopying.itemData.data;
  }
  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    console.log(sourceSelectedKeys, 'sourceSelectedKeyssourceSelectedKeyssourceSelectedKeys');
    console.log(targetSelectedKeys, 'targetSelectedKeystargetSelectedKeystargetSelectedKeys');
    console.log(this.checkInfo, 'this.checkInfothis.checkInfothis.checkInfo');
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    this.setState({
      expandedKeys: sourceSelectedKeys,
      autoExpandParent: true,
    });
  }
  changeNext(value){
    console.log(value);
    if(value!=null){
        if(value.length < 1){
          this.setState({
            ifNext: false
          });
          this.ifNext = false;
        }else{
          this.setState({
            ifNext: true
          });
          this.ifNext = true;
        }
      }else{
          this.setState({
            ifNext: false
          });
      }
  }
  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode style = {{width: '90%', whiteSpace: 'normal'}} key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      //return <TreeNode key={item.title + item.parentName+';'+item.key} title={item.key} />;
      return <TreeNode style = {{width: '90%', whiteSpace: 'normal'}} key={item.parentName+';'+item.key} title={item.key} />;
    });
    if(this.props.speciCopying.loaded) {
      this.initData = this.props.speciCopying.searchData.data;
    }
    this.changeInit = this.initData;
    const state = this.state;
    const initData2 = [];
    if (this.initData) {
      const i = 0;
      this.initData.map((item,index) => {
        let children = [];
        if(item.platformCategoryAttributeValues !== undefined)
        {
          children = [];
          item.platformCategoryAttributeValues.map((item2,index2) => {
              children.push({
                key: item2.attrValueName,
                title:  index + '-' +index2,
                parentName: item.attrId
              });
          });
        }
        initData2.push({
          key: item.attrName,
          title: index.toString(),
          children: children
        });
      });
    }else {
    }
    if(initData2.length > 0){
      this.allInfo = [];
      initData2.map((item,index) => {
        item.children.map((item,index)=>{
          this.allInfo.push(item.parentName+';'+item.key);
        });
      });
    }else{}
    return (
      <div id = 'sytlebyly' >
        <Button key="copying" size="large" onClick={()=>{this.handleCopyTo();}} style = {{float: 'right'}}>复制到</Button>
        <Modal className="ui-platform" style = {{minHeight: '400px'}} title="复制规格参数"
               visible={this.state.visible}
               onOk={()=>{this.handleOk();}}
               onCancel={()=>{this.handleCancel();}}
               maskClosable={false}
               key = {this.state.key}
               footer={[
                 <Button style = {{margin: '0 auto'}} disabled = {!this.state.ifNext} key="submit" type="primary" size="large" loading={this.state.loading} onClick={()=>{this.handleNext();}}>
                   下一步
                 </Button>,
               ]}
        >
        <CopyTo2 copyToStep1 = {this.state.copyToStep1} itemData={this.props.speciCopying.itemData ? this.props.speciCopying.itemData.data : []} ifNext = {(value) => {this.changeNext(value)}}></CopyTo2>
        </Modal>
        <Modal style = {{minHeight: '400px'}} title="选择拷贝属性"
               visible={this.state.visible2}
               onOk={()=>{this.handleOk();}}
               onCancel={()=>{this.handleCancel();}}
               maskClosable={false}
               footer={[
                 <Button key="back" type="ghost" size="large" onClick={()=>{this.handlePrev();}}>上一步</Button>,
                 <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={()=>{this.handleOk();}}>
                   保存
                 </Button>,
               ]}
        >
          <Loading loaded = {this.state.copyToStep2}></Loading>
          <p style = {{marginBottom: '10px'}}>选择拷贝属性</p>
          <Button type="primary" onClick={()=>{this.allSelect();}}>全选</Button>
          <Button style = {{marginLeft: '10px'}} type="primary" onClick={::this.notSelect}>反选</Button>
           {initData2.length>0 &&
            <div style = {{overflow: 'scroll', width: '100%', height: '100%'}}>
              <Tree
                checkable
                expandedKeys = {this.state.expandedKeys}
                checkedKeys = {this.state.checkedKeys}
                selectedKeys={this.state.selectedKeys}
                onSelect={::this.onSelect}
                onCheck={ ::this.onCheck}
                onExpand={::this.handleSelectChange}
                autoExpandParent={true}
              >
                {loop(initData2)}
              </Tree>
          </div>
          }
        </Modal>
      </div>
    );
  }
}
