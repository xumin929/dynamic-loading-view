/**
 * Created by huangxiao3 on 2017/5/23.
 */
/*
 输入props：
 保存到上层组件方法：getCids2List
 回显数据：selectCids[]
 */
import React, {Component} from 'react';
import {Table, Modal, Row, Col, Input, Button, Tree, Popover} from 'jdcloudui';

/* 自定义组件调用 */
import BaseComponent from '../../Common/BaseComponent';
import styles from './style/category.less';
import './style/category.css';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
let CheckedKeys = [];

import {getAllCategory} from './redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
@connect(
  state => ({AllCategory:state.allCategory}),
  dispatch => bindActionCreators({getAllCategory}, dispatch)
)
export default class CategoryLinkPop extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.dataList = {};//原始数据的一维数组结构
    this.searchNode={};//搜索得到的数据，最终放到dataList中
    this.state = {
      popover: false,
      treeList: [],//原始数据
      autoExpandParent: true,
      searchValue:'',//搜索的关键字
      checkedKeys:[],
    }
  }

  popoverShow() {
    this.props.categoryVisible(true);
    //重置数据
    this.generateList(this.state.treeList);
    this.removeLinkedNode(this.props.selectCids);
    //显示类目列表
    //lg
    CheckedKeys=[];
    this.setState({
      searchValue:'',
      popover: true,

    })
  }

  categoryHide() {
    //lg
    CheckedKeys=[];
    //隐藏类目列表
    this.props.categoryVisible(false);
    this.setState({
      searchValue:'',
      popover: false,

    });
  }

  onExpand(expandedKeys) {
    this.setState({
      autoExpandParent:false
    })
  }

  onCheck(checkedKeys, info) {
    console.log('in onCheck,checkedKyes is ',checkedKeys);
    //lg
    CheckedKeys=checkedKeys;
    /*    this.setState({
     checkedKeys:checkedKeys,
     });*/
  }

  componentDidMount() {
    //ajax请求
    this.props.getAllCategory({platformId:2});
  }

  shouldComponentUpdate(nextProps, nextState) {
    let currentCategory='';
    if(this.props.AllCategory){
      currentCategory = JSON.stringify(this.props.AllCategory);
    }
    let nextcurrentCategory='';
    if(nextProps.AllCategory){
      nextcurrentCategory =JSON.stringify(nextProps.AllCategory);
    }
    let currentStateStr = JSON.stringify(this.state);
    let nextStateStr = JSON.stringify(nextState);
    if(currentStateStr!=nextStateStr){
      return true;
    }
    if(currentCategory!=nextcurrentCategory){
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    //不通过外部props控制展示的原因：新增行业标签时，需要延迟执行，因此提供一个转换的步骤(props->state)，用于进行延迟操作
    if(nextProps.visible!=this.state.popover){
      setTimeout(()=>{
        this.setState({
          popover:nextProps.visible,
        })
      },500);
    }else{

    }
    if(nextProps.visible==false){
      //清空数据
      //lg
      CheckedKeys=[];
      this.setState({
        popover: false,
        treeList: [],//原始数据
        autoExpandParent: true,
        searchValue:'',//搜索的关键字

      })
    }
    //处理数据allCategory
    if (nextProps.AllCategory.loaded && nextProps.AllCategory.data.code == 0) {
      this.generateList(nextProps.AllCategory.data.data);
      this.removeLinkedNode(this.props.selectCids);
      this.setState({
        treeList: nextProps.AllCategory.data.data
      });
    }
  }

  //生成一维数据
  generateList(data) {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const key = node.cid;
      this.dataList[key]=node;
      if (node.children) {
        this.generateList(node.children);
      }
    }
  }

  ////////////类目搜索////////////////
  //搜索总方法
  onChange(e) {
    this.searchNode={};
    this.generateList(this.state.treeList);
    this.removeLinkedNode(this.props.selectCids);
    let value = e.target.value;

    if(value==''){
      this.setState({
        searchValue: value,
        autoExpandParent: false,

      });
      return
    };

    this.dataList = this.searhByName(value,this.dataList);
    console.log('onChange,dataList is:',this.dataList);

    this.setState({

      searchValue: value,
      autoExpandParent: true,

    });
  }

  searhByName(name,dataList){
    for(let i in dataList){
      if(dataList[i].categoryName.indexOf(name)>-1 && dataList[i]){
        this.searchNode[dataList[i].cid]=dataList[i];
        this.setParentNodes(dataList[i],dataList);
        this.setChildNodes(dataList[i],dataList);
      }
    }
    return this.searchNode;
  }

  setParentNodes(node,dataList){
    if(dataList[node.cid] && node.parentCid && dataList[node.parentCid]!=undefined){
      this.searchNode[node.parentCid]=dataList[node.parentCid];
      this.setParentNodes(dataList[node.parentCid],dataList);
    }else{
      return;
    }
  }

  setChildNodes(node,dataList){
    if(dataList[node.cid] && node.children){
      let children = node.children;
      for(let i in children){
        if(dataList[children[i].cid]){
          this.searchNode[children[i].cid]=children[i];
          this.setChildNodes(children[i],dataList);
        }
      }
    }else{
      return;
    }
  }
  ////////////////////////////


  ////////////////////////////
  //去除已选类目 输入为终极类目

  //主方法
  removeLinkedNode(cids){
    for(let i in cids){
      this.removeByCid(cids[i],this.dataList);
    }
  }

  //根据cid，删除所有。调用删除父节点
  removeByCid(cid,dataList){
    if(dataList[cid]!=undefined){
      let parentCid = dataList[cid].parentCid;
      delete dataList[cid];
      this.removeByParentCid(parentCid,dataList);
    }
  }
  //删除父节点
  removeByParentCid(parentCid,dataList){
    let childrenEist = false;
    try{
      if(dataList[parentCid] && dataList[parentCid].children){
        let children = dataList[parentCid].children;
        for(let i in children){
          if(dataList[children[i].cid]!=undefined)
          {
            childrenEist=true;
          }
        }
      }
    }catch (e){
      console.log('删除父节点失败')
    }

    if(dataList[parentCid]!=undefined && dataList[parentCid].hasLeaf!=1 && !childrenEist){
      let parentCidtmp = dataList[parentCid].parentCid;
      delete dataList[parentCid];
      if(parentCidtmp!=-1){
        this.removeByParentCid(parentCidtmp,dataList);
      }
    }
  }
  ///////////////////////////////


  //根据终极类目ids，得到展示数据数组，将数据传递到父组件的Table中
  categoryLinkOnData(cids){
    let result=[];
    for(let i in cids){
      let resultUnit = {
        key:Math.random(),
        firstLevCid:null,
        firstLevName:null,

        secondLevCid:null,
        secondLevName:null,

        thirdLevCid:null,
        thirdLevName:null,

        fourthLevCid:null,
        fourthLevName:null,

        lastLevCid:null,
        isUsing:0,
      };

      let cid = cids[i];
      let node = this.dataList[cid];
      let lev = node.lev;
      resultUnit.lastLevCid = cid;
      while(lev>0){
        switch (lev) {
          case 1:
            resultUnit.firstLevCid = node.cid;
            resultUnit.firstLevName = node.categoryName;
            break;
          case 2:
            resultUnit.secondLevCid = node.cid;
            resultUnit.secondLevName = node.categoryName;
            break;
          case 3:
            resultUnit.thirdLevCid = node.cid;
            resultUnit.thirdLevName = node.categoryName;
            break;
          case 4:
            resultUnit.fourthLevCid = node.cid;
            resultUnit.fourthLevName = node.categoryName;
            break;
        }
        lev=lev-1;
        node=this.dataList[node.parentCid];
      }
      result.push(resultUnit);
    }
    return result;
  }


  //生成类目树的节点
  treeLoop(item) {
    if (!item) return;
    let result=[];
    for(let i in item){
      if(this.dataList[item[i].cid]){
        if(item[i].children) {
          result.push(
            <TreeNode
              key={item[i].cid}
              title={item[i].categoryName}
            >
              {this.treeLoop(item[i].children)}
            </TreeNode>
          );
        }else{
          result.push (
            <TreeNode
              key={item[i].cid}
              title={item[i].categoryName}
            />
          )
        }
      }
    }
    return result;
  }

  //生成树
  createTree(){
    return (
      <Tree
        key={Math.random()}
        checkable
        className={styles.treeWidth}
        autoExpandParent={this.state.autoExpandParent}

        onCheck={this.onCheck.bind(this)}
        defaultExpandAll={true}
      >
        {this.treeLoop(this.state.treeList)}
      </Tree>
    );
  }

  // 关联数据
  categoryLinkOn() {
    let checkedKeys = CheckedKeys;
    let cids=[];
    for(let i in checkedKeys){
      let cid =  checkedKeys[i]
      if(this.dataList[cid] && this.dataList[cid].hasLeaf==1){
        cids.push(cid);
      }
    }
    let result=this.categoryLinkOnData(cids);
    this.props.getCids2List(result);
    this.categoryHide();
  }

  render() {
    const categorySearch = (<Search style={{width: 300}} placeholder="输入关键字" onChange={this.onChange.bind(this)} value={this.state.searchValue}/>);
    return (
      <div className={styles.div} id='div'>
        <Popover
          style={{height:'200px'}}
          placement="bottom"
          title={categorySearch}
          content={
            <div>
              {this.createTree()}
              <div className={styles.textCenter}>
                <Button type="primary" onClick={()=>this.categoryLinkOn()}>关联</Button>&nbsp;&nbsp;
                <Button onClick={()=>this.categoryHide()}>取消</Button>
              </div>
            </div>
          }
          className={styles.textCenter}
          visible={this.state.popover}
          onCancel={()=>this.categoryHide()}
          getPopupContainer={()=>document.getElementById('div')}
        >
          <Button type='ghost' onClick={()=>this.popoverShow()}>关联新类目</Button>
        </Popover>
      </div>
    )
  }
}

