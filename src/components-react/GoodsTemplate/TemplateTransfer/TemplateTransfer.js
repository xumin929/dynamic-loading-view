/**
 * Created by liurenpeng on 2018/8/1.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Tree , Button , Input ,Checkbox, message, Spin } from 'jdcloudui';
import { getCategoryListAction } from './redux';
import './style.css'

const TreeNode = Tree.TreeNode;

@connect(
  state => ({ getCategory: state.getCategory }),
  dispatch => bindActionCreators({ getCategoryListAction }, dispatch)
)
export default class TemplateTransfer extends Component {
  constructor() {
    super();
    this.state = {
			loadingLeft:true,  //左侧tree加载loading状态
			loadingRight:true, //右侧tree加载loading状态
      checkedKeysLeft:[],  //左侧tree已勾选的数组
      checkedKeysRight:[], //右侧tree已勾选的数组
      sourceData:[], //左侧原始tree数据
      targetData:[], //右侧目标tree数据
      searchData:[], //搜索时用的基础tree，在无搜索条件下与sourceData保持一致
      allCheckedLeft: false,  //左侧可选类目的全选按钮状态
      allCheckedRight: false, //右侧已选类目的全选按钮状态
      isSearch: false, //是否正在搜索
    };
    this.categoryList = null; //保存总类目数据
	}

	componentWillMount(){
		this.props.getCategoryListAction()

	}

	componentWillReceiveProps(nextProps){
		if(nextProps.getCategory && nextProps.getCategory.data){
			this.setState({loadingLeft:false})
			if(nextProps.getCategory.data.data){
				if(nextProps.getCategory.data.data != this.categoryList){
					console.log('拿到类目总数据');
					this.categoryList = nextProps.getCategory.data.data;
					this.setState({
              sourceData: this.categoryList,
              searchData: this.categoryList,
          });
				}
			} else {
				message.error(nextProps.getCategory.data.msg);
			}
		}

		if(nextProps.tmplTreeData && nextProps.getCategory.data && nextProps.getCategory.data.data){
      console.log('---------------初始化数据')
      let leafCids = this.getLeafCids(nextProps.tmplTreeData); //拿到回显的tree中的所有叶子节点cids数组
      console.log(leafCids)
      let sourceData = nextProps.getCategory.data.data; //类目总数据
      let checkedKeys = this.getCheckedKeys(sourceData,leafCids) //拿到回显tree中的所有子节点和只含有该子节点的父节点数组
			this.setState({
				checkedKeysLeft:checkedKeys,
				targetData:nextProps.tmplTreeData,
        sourceData:this.clearData(sourceData,checkedKeys), //用总类目tree数据去掉回显的数据
        searchData:this.clearData(sourceData,checkedKeys),
				loadingRight:false,
			},()=>{
        this.moveRight(this.state.sourceData,this.state.targetData);
      });
		}
  }
  
  //根据选中的所有子节点leafCids，找到总数据allTree中仅包含该子节点的父级节点
  getCheckedKeys = (allTree,leafCids)=>{
    let arr = [];
    leafCids.map((leafItem,leafIndex)=>{
      allTree.map((item1,index1)=>{
        //遍历第一层
        if(item1.cid == leafItem){
          //该选中的子节点在一级
          arr.push(item1.cid.toString())
        }
        if(item1.children && item1.children.length>0){
          item1.children.map((item2,index2)=>{
            //遍历第二层
            if(item2.cid == leafItem){
              //该选中的子节点在第二级
              arr.push(item2.cid.toString());
              //判断该节点的父节点除了该已选子节点外是否还有其他子节点
              item1.children.splice(index2,1);
              if(item1.children.length == 0){
                arr.push(item1.cid.toString())
              }
            }
            if(item2.children && item2.children.length>0){
              item2.children.map((item3,index3)=>{
                //遍历第三层
                if(item3.cid == leafItem){
                  //该选中的子节点在第三级
                  arr.push(item3.cid.toString())
                  //判断该节点的父节点除了该已选子节点外是否还有其他子节点
                  item2.children.splice(index3,1);
                  if(item2.children.length == 0){
                    arr.push(item2.cid.toString())
                    item1.children.splice(index2,1);
                    if(item1.children.length == 0){
                      arr.push(item1.cid.toString())
                    }
                  }
                }
                if(item3.children && item3.children.length>0){
                  item3.children.map((item4,index4)=>{
                    //遍历第四层
                    if(item4.cid == leafItem){
                      //该选中的子节点在第四级
                      arr.push(item4.cid.toString())
                      //判断该节点的父节点除了该已选子节点外是否还有其他子节点
                      item3.children.splice(index4,1);
                      if(item3.children.length == 0){
                        arr.push(item3.cid.toString())
                        item2.children.splice(index3,1);
                        if(item2.children.length == 0){
                          arr.push(item2.cid.toString())
                          item1.children.splice(index2,1);
                          if(item1.children.length == 0){
                            arr.push(item1.cid.toString())
                          }
                        }
                      }
                    }
                  })
                }
              })
            }
          })
        }
      })
    })

    console.log(arr)
    return arr;
  }

	//将smallData数组从bigData树状数据中去掉
	clearData = (bigData,smallData)=>{
		let newData = bigData;
		let loop = (data,target) => data.map((item,index)=>{
			if(item){
				if(item.cid == target){
					data.splice(index,1);
				}
				if(item.children){
					loop(item.children,target)
				}
			}
		})
		if(smallData && smallData.length>0){
			smallData.map((_item,_index)=>{
				loop(newData,_item);
			})
		}
		return newData
	}

	//获取tree数据里所有的cids
	getCids = (data)=>{
		let newData = [];
		let loop = data => data.map((item,index)=>{
			newData.push(item.cid.toString())
			if(item.children){
				loop(item.children)
			}
		})
		loop(data);
		return newData;
  }
  
  //获取tree数据里所有叶子节点的cids
  getLeafCids = (data)=>{
    let newData = [];
    let loop = data => data.map((item,index)=>{
      if(item.hasLeaf ==1 ){
        newData.push(item.cid.toString())
      }
			if(item.children){
				loop(item.children)
			}
		})
		loop(data);
		return newData;
  }

	//左侧可选类目的全选事件
  allSelectSource=()=> {
    this.setState({
      allCheckedLeft: !this.state.allCheckedLeft
    });
    const data = [];
    if(this.state.sourceData){
      this.state.sourceData.map((item,index) => {
        data.push(item.cid.toString());
      });
    }
    console.log(data,'可选类目数据');
    if(!this.state.allCheckedLeft){
			console.log('全选')
      this.setState({
        checkedKeysLeft: data
      });
    }else{
			console.log('全不选')
      this.setState({
       checkedKeysLeft: []
      });
    }
	}
	
	//右侧已选类目的全选事件
  allSelectSource2=()=> {
    this.setState({
      allCheckedRight: !this.state.allCheckedRight
    });
    const data = [];
    if(this.state.targetData){
      this.state.targetData.map((item,index) => {
        data.push(item.cid.toString());
      });
    }
    if(!this.state.allCheckedRight){
      this.setState({
        checkedKeysRight: data
      });
    }else{
      this.setState({
       checkedKeysRight: []
      });
    }
	}
	
  /*点击左复选框触发*/
  onCheckLeft=(info)=> {
		console.log(info)
    this.setState({
      checkedKeysLeft: info,
    });
  }

  /*点击右复选框触发*/
  onCheckRight=(info)=> {
    this.setState({
      checkedKeysRight: info,
    });
	}
	
	/*向右移动数据*/
	moveRight(source,target,type){
    // console.log('-----------开始向右移动')
    let sourceData = [...source];
    const targetData = [...target];
    // console.log('--------------初始时的targetData')
    // console.log(targetData)
    const {checkedKeysLeft} = this.state;
    // console.log('---------------勾选的数据')
    checkedKeysLeft.map((checkName, index) => { //要查找的每一个元素
			sourceData.map((item1, index1) => { // 在第一级目录进行查找
				if (item1.cid == checkName) {
          // console.log('勾选的内容在一级类目中')
					let level1 = -1;
					targetData.map((item, index) => {
						if(targetData[index].cid == item1.cid){
              // console.log('目标数组中已含有该一级类目')
							level1 = index;
							return;
						}
					})
					if(level1 == -1) {
            // console.log('目标数组中不含有该一级类目，将该一级类目数据添加到模板数组中，并从原数组中删掉')
						targetData.push(JSON.parse(JSON.stringify(item1)));
						sourceData.splice(index1, 1);
					}
        } else {
            if(item1.children !== undefined && item1.children !== null){
            item1.children.map((item2, index2) => { // 在第二级目录进行查找 
              if(item2.cid == checkName) {
                console.log('勾选的内容在二级类目中')
                // console.log(item2.cid)
                let level2 = -1;
                targetData.map((item,index) => {
                  if(item.cid == item1.cid){
                    // console.log('目标数组中含有该类目的一级类目')
                    level2 = index;
                    return;
                  }
                })
                if (level2 == -1) { //如果第一级目录没有查找直接push整个的
                    // console.log('目标数组中不含有该类目的一级类目，将该一级类目添加到目标数组中，并重置该一级类目下的子类目，直到当前选中的类目')
                    targetData.push(JSON.parse(JSON.stringify(item1)));
                    targetData[(targetData.length - 1)].children = [];//将他的children 置空
                    // console.log(item2)
                    targetData[(targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //添加新在当前目录下填加子元素
                    // console.log(targetData)
                    // console.log('从原数组中删除该选中的类目数据')
                    sourceData[index1].children.splice(index2, 1);
                    if(sourceData[index1].children.length == 0){
                      // console.log('删除后的原数组下没有子类目了，将该类目的父级也删掉')
                      sourceData.splice(index1,1);
                    }
                } else {
                  console.log('目标数组中已含有该类目的一级类目，将选中的类目添加到该一级类目的children中')
                  let level3 = -1
                  targetData.map((item,index)=>{
                    if(item.children){
                      item.children.map((arritem,arrindex)=>{
                        if(arritem.cid == item2.cid){
                          level3 = arrindex
                        }
                      })
                    }
                  })
                  if(level3 == -1){ //目标数组中不含有该二级类目
                    targetData[level2].children.push((JSON.parse(JSON.stringify(item2))));
                  } else { //目标数组中含有该二级类目
                    console.log('目标数组中含有该二级类目，只添加其子节点')
                    if(item2.children){
                      item2.children.map((item21,index21)=>{
                        targetData[level2].children[level3].children.push((JSON.parse(JSON.stringify(item21))));
                      })
                    }
                  }
                  
                  // console.log('删除原数组中该父级类目下的选中的子类目')
                  sourceData[index1].children.splice(index2, 1);
                  if(sourceData[index1].children.length == 0){
                    // console.log('删除后的原数组下没有子类目了，将该类目的父级也删掉')
                    sourceData.splice(index1,1);
                  }
                }
              } else {
                if (item2.children !== undefined && item2.children !== null) {
                item2.children.map((item3, index3) => { //在第三级目录中进行查找 
                  if(item3.cid == checkName) {
                    console.log('勾选的内容在第三级类目中')
                    let level1 = -1;
                    let level2 = -1;
                    targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          // console.log('目标数组中含有该类目的一级类目')
                          level1 = index;
                          return;
												}
                      })
                    if (level1 == -1) { //查找到了判断最上级不存在
                      // console.log('目标数组中不含有该类目的一级类目，将该一级类目添加到目标数组中，并重置该一级类目下的子类目，直到当前选中的类目')
                      targetData.push(JSON.parse(JSON.stringify(item1))); // 将第一级加进去
                      targetData[(targetData.length - 1)].children = []; //将第一级chirlden置空
                      targetData[(targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级复制到第一级的chirldren
                      targetData[(targetData.length - 1)].children[targetData[(targetData.length - 1)].children.length - 1].children = [];//将第三级置空
                      targetData[(targetData.length - 1)].children[targetData[(targetData.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item3)))); //将对象添加到第三级中
                      level1 = -1;
                      level2 = -1;
                      targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          if(item.children){
														item.children.map((arritem, index2) => {
															if(arritem.cid == item2.cid){
                                // console.log('目标数组中含有该类目的一级类目和二级类目')
																level2 = index2;
																return;
															}
														});
													}
                        }
                      })
                      // console.log('从原数组中删除该类目')
                     	sourceData[index1].children[index2].children.splice(index3, 1);
                     	if(sourceData[index1].children[index2].children.length == 0) {
                        // console.log('该类目下没有其他子类目了，也删除')
												sourceData[index1].children.splice(index2,1);
												if(sourceData[index1].children.length == 0){
                            // console.log('该类目的父级类目下没有其他子类目了，也删除')
														sourceData.splice(index1,1);
												}
                     	}
                    } else {
                        level2 = -1;
                        targetData.map((item,index) => {
                          if(item.children){
                            item.children.map((arritem, index2) => {
															if(arritem.cid == item2.cid){
																level2 = index2;
																return;
															}
														});
                          }
                        });
                        if (level2 == -1) { 
                           //level1 = targetData.indexOf(item1); //第一级存在第二级不存在
                           targetData[level1].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级加入到里面去
                           targetData[level1].children[targetData[level1].children.length - 1].children = [];
                           targetData[level1].children[targetData[level1].children.length - 1].children.push((JSON.parse(JSON.stringify(item3))));
                           sourceData[index1].children[index2].children.splice(index3, 1);
                           if(sourceData[index1].children[index2].children.length == 0) {
                                sourceData[index1].children.splice(index2,1);
                                if(sourceData[index1].children.length == 0){
                                  sourceData.splice(index1,1);
                                }
                           }
                        } else { //如果此元素存在在第三级
                          console.log('一级类目和二级类目都存在')
                          targetData[level1].children[level2].children.push((JSON.parse(JSON.stringify(item3))));
                          sourceData[index1].children[index2].children.splice(index3, 1);
                          if(sourceData[index1].children[index2].children.length == 0) {
														sourceData[index1].children.splice(index2,1);
														if(sourceData[index1].children.length == 0){
															sourceData.splice(index1,1);
														}
													}
                        }
                      }
                    } else {
                    //在第四级目录进行查找
                    if (item3.children !== undefined && item3.children !== null) {
                      let level1 = -1;
                      let level2 = -1;
                      let level3 = -1;
                      targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          if(item.children){
                              item.children.map((arritem, index2) => {
                                if(arritem.cid == item2.cid){
                                  if(level3 != -1){
                                    return;
                                  }
                                  level2 = index2;
                                }
                                if(arritem.children){
                                  arritem.children.map((arr3item, index3) => {
                                    if(arr3item.cid == item3.cid){
                                      level3 = index3;
                                      return;  
                                    }
                                  });
                                }
															});
													}
                        }
                      })
                      item3.children.map((item4,index4)=>{
                        if (item4.cid == checkName) { //如果在第四级找到目标元素
                            if(level1 == -1){ //查找第一级目录是否存在
                              targetData.push((JSON.parse(JSON.stringify(item1)))); // 将第一级加进去
                              targetData[(targetData.length - 1)].children = []; //将第一级chirlden置空
                              targetData[(targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级复制到第一级的chirldren
                              targetData[(targetData.length - 1)].children[targetData[(targetData.length - 1)].children.length - 1].children = [];//将第三级置空
                              targetData[(targetData.length - 1)].children[targetData[(targetData.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item3)))); //将对象添加到第三级中
                              //第四级目录清空
                              let target4 = targetData[(targetData.length - 1)].children[targetData[(targetData.length - 1)].children.length - 1].children.length-1;
                              targetData[(targetData.length - 1)].children[targetData[(targetData.length - 1)].children.length - 1].children[target4].children = [];
                              targetData[(targetData.length - 1)].children[targetData[(targetData.length - 1)].children.length - 1].children[target4].children.push((JSON.parse(JSON.stringify(item4))));
                              targetData.map((item,index) => {
                                  if(item.cid == item1.cid){
                                    level1 = index;
                                    return;
                                    if(item.children){
																			item.children.map((arritem, index2) => {
																				if(arritem.cid == item2.cid){
																					if(level3 != -1){
																						return;
																					}
																					level2 = index2;
																				}
																				if(arritem.children){
																					arritem.children.map((arr3item, index3) => {
																						if(arr3item.cid == item3.cid){
																							level3 = index3;
																							return;
																						}
																					});
																				}
																			});
																		}
                                  }
                                })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                  if(sourceData[index1].children[index2].children.length == 0) {
                                    sourceData[index1].children.splice(index2,1);
                                      if(sourceData[index1].children.length == 0){
                                          sourceData.splice(index1,1);
                                        }
                                   }
                              }
                            } else if(level2 == -1) { //第二级不存在
                              targetData[level1].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级加入到里面去
                              targetData[level1].children[targetData[level1].children.length - 1].children = [];
                              targetData[level1].children[targetData[level1].children.length - 1].children.push((JSON.parse(JSON.stringify(item3))));
                              targetData[level1].children[targetData[(targetData[level1].children.length - 1)].children.length - 1].children = [];//将第三级置空
                              targetData[level1].children[targetData[(targetData[level1].children.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item4)))); //将对象添加到第三级中
                              targetData.map((item,index) => {
                                if(item.cid == item1.cid){
                                  level1 = index;
                                  return;
                                  if(item.children){
																		item.children.map((arritem, index2) => {
																			if(arritem.cid == item2.cid){
																					if(level3 != -1){
																						return;
																					}
																				level2 = index2;
																			}
																			if(arritem.children){
																				arritem.children.map((arr3item, index3) => {
																					if(arr3item.cid == item3.cid){
																						level3 = index3;
																						return;
																					}
																				});
																			}
																		});
																	}
                                }
                              })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
																if(sourceData[index1].children[index2].children.length == 0) {
																	sourceData[index1].children.splice(index2,1);
																	if(sourceData[index1].children.length == 0){
																		sourceData.splice(index1,1);
																	}
																}
                              }
                            } else if (level3 == -1){ 
                            //第三级目录不存在
                            if(!targetData[level1].children[level2].children){
                                targetData[level1].children[level2].children = [];
                            }
                              targetData[level1].children[level2].children.push(JSON.parse(JSON.stringify(item3)));
                              targetData[level1].children[level2].children[targetData[level1].children[level2].children.length - 1].children = [];
                              targetData[level1].children[level2].children[targetData[level1].children[level2].children.length - 1].children.push((JSON.parse(JSON.stringify(item4))));
                              targetData.map((item,index) => {
                                  if(item.cid == item1.cid){
                                    level1 = index;
                                    return;
                                    if(item.children){
                                        item.children.map((arritem, index2) => {
                                          if(arritem.cid == item2.cid){
                                             if(level3 != -1){
                                              return;
                                            }
                                            level2 = index2;
                                          }
                                          if(arritem.children){
                                            arritem.children.map((arr3item, index3) => {
                                              if(arr3item.cid == item3.cid){
                                                level3 = index3;
                                                return;
                                              }
                                            });
                                          }
                                        });
                                      }
                                  }
                                })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                if(sourceData[index1].children[index2].children.length == 0) {
																	sourceData[index1].children.splice(index2,1);
																	if(sourceData[index1].children.length == 0){
																		sourceData.splice(index1,1);
																	}
                           			}
                              }
                            } else {
                              targetData[level1].children[level2].children[level3].children.push((JSON.parse(JSON.stringify(item4))));
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                if(sourceData[index1].children[index2].children.length == 0) {
																	sourceData[index1].children.splice(index2,1);
																	if(sourceData[index1].children.length == 0){
																		sourceData.splice(index1,1);
																	}
																}
                              }
                            } 
													}
												});
											}
										}
									});
                }
              }
            });
					}
				}
			});    
    });
    if(type){
      this.setState({
        searchData: sourceData,
      })
    } else {
      this.setState({
        sourceData: sourceData,
        targetData: targetData,
        checkedKeysLeft: [],
      });
      console.log('----------回传数据')
      console.log(targetData)
      this.props.callBack(targetData);
    }
	}
	

  /*向左移动数据*/
  moveLeft(source,target,type){
    let sourceData = [...target];
    const targetData = [...source];
    const {checkedKeysRight} = this.state;
     checkedKeysRight.map((checkName, index) => { //要查找的每一个元素
        sourceData.map((item1, index1) => { // 在第一级目录进行查找
        if (item1.cid == checkName) {
            let level1 = -1;
            targetData.map((item, index) => {
              if(targetData[index].cid == item1.cid){
                level1 = index;
                return;
              }
            })
            if(level1 == -1) {
              targetData.push(JSON.parse(JSON.stringify(item1)));
              sourceData.splice(index1, 1);
            }
        } else {
            if(item1.children !== undefined && item1.children !== null){
            item1.children.map((item2, index2) => { // 在第二级目录进行查找 
              if(item2.cid == checkName) {
                let level2 = -1;
                targetData.map((item,index) => {
                  if(item.cid == item1.cid){
                    level2 = index;
                    return;
                  }
                })
                if (level2 == -1) { //如果第一级目录没有查找直接push整个的
                    targetData.push(JSON.parse(JSON.stringify(item1)));
                    targetData[(targetData.length - 1)].children = [];//将他的children 置空
                    targetData[(targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //添加新在当前目录下填加子元素
                    sourceData[index1].children.splice(index2, 1);
                    if(sourceData[index1].children.length == 0){
                      sourceData.splice(index1,1);
                    }
                } else {
                  let level3 = -1
                  targetData.map((item,index)=>{
                    if(item.children){
                      item.children.map((arritem,arrindex)=>{
                        if(arritem.cid == item2.cid){
                          level3 = arrindex
                        }
                      })
                    }
                  })
                  if(level3 == -1){ //目标数组中不含有该二级类目
                    targetData[level2].children.push((JSON.parse(JSON.stringify(item2))));
                  } else { //目标数组中含有该二级类目
                    console.log('目标数组中含有该二级类目，只添加其子节点')
                    if(item2.children){
                      item2.children.map((item21,index21)=>{
                        targetData[level2].children[level3].children.push((JSON.parse(JSON.stringify(item21))));
                      })
                    }
                  }

                   sourceData[index1].children.splice(index2, 1);
                   if(sourceData[index1].children.length == 0){
                      sourceData.splice(index1,1);
                    }
                }
              } else {
                if (item2.children !== undefined && item2.children !== null) {
                item2.children.map((item3, index3) => { //在第三级目录中进行查找 
                  if(item3.cid == checkName) {
                    let level1 = -1;
                    let level2 = -1;
                    targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          return;
                          }
                      })
                    if (level1 == -1) { //查找到了判断最上级不存在
                      targetData.push(JSON.parse(JSON.stringify(item1))); // 将第一级加进去
                      targetData[(targetData.length - 1)].children = []; //将第一级chirlden置空
                      targetData[(targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级复制到第一级的chirldren
                      targetData[(targetData.length - 1)].children[targetData[(targetData.length - 1)].children.length - 1].children = [];//将第三级置空
                      targetData[(targetData.length - 1)].children[targetData[(targetData.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item3)))); //将对象添加到第三级中
                      level1 = -1;
                      level2 = -1;
                        targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          if(item.children){
                              item.children.map((arritem, index2) => {
                                if(arritem.cid == item2.cid){
                                  level2 = index2;
                                  return;
                                }
                              });
                            }
                        }
                      })
                     sourceData[index1].children[index2].children.splice(index3, 1);
                     if(sourceData[index1].children[index2].children.length == 0) {
                          sourceData[index1].children.splice(index2,1);
                          if(sourceData[index1].children.length == 0){
                              sourceData.splice(index1,1);
                            }
                     }
                    } else {
                        level2 = -1;
                        targetData.map((item,index) => {
                          if(item.children){
                            item.children.map((arritem, index2) => {
															if(arritem.cid == item2.cid){
																level2 = index2;
																return;
															}
														});
                          }
                        });
                        if (level2 == -1) { 
                           //level1 = targetData.indexOf(item1); //第一级存在第二级不存在
                           targetData[level1].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级加入到里面去
                           targetData[level1].children[+targetData[level1].children.length - 1].children = [];
                           targetData[level1].children[+targetData[level1].children.length - 1].children.push((JSON.parse(JSON.stringify(item3))));
                           sourceData[index1].children[index2].children.splice(index3, 1);
                           if(sourceData[index1].children[index2].children.length == 0) {
                                sourceData[index1].children.splice(index2,1);
                                if(sourceData[index1].children.length == 0){
                                  sourceData.splice(index1,1);
                                }
                           }
                        } else { //如果此元素存在在第三级
                          targetData[level1].children[level2].children.push((JSON.parse(JSON.stringify(item3))));
                          sourceData[index1].children[index2].children.splice(index3, 1);
                          if(sourceData[index1].children[index2].children.length == 0) {
															sourceData[index1].children.splice(index2,1);
															if(sourceData[index1].children.length == 0){
																sourceData.splice(index1,1);
															}
                           }
                        }
                      }
                    } else {
                    //在第四级目录进行查找
                    if (item3.children !== undefined && item3.children !== null) {
                      let level1 = -1;
                      let level2 = -1;
                      let level3 = -1;
                      targetData.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          if(item.children){
                              item.children.map((arritem, index2) => {
                                if(arritem.cid == item2.cid){
                                  if(level3 != -1){
                                    return;
                                  }
                                  level2 = index2;
                                }
                                if(arritem.children){
                                  arritem.children.map((arr3item, index3) => {
                                    if(arr3item.cid == item3.cid){
                                      level3 = index3;
                                      return;  
                                    }
                                  });
                                }
                              });
                            }
                        }
                      })
                      item3.children.map((item4,index4)=>{
                        if (item4.cid == checkName) { //如果在第四级找到目标元素
                            if(level1 == -1){ //查找第一级目录是否存在
                              targetData.push((JSON.parse(JSON.stringify(item1)))); // 将第一级加进去
                              targetData[(targetData.length - 1)].children = []; //将第一级chirlden置空
                              targetData[(targetData.length - 1)].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级复制到第一级的chirldren
                              targetData[(targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children = [];//将第三级置空
                              targetData[(targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item3)))); //将对象添加到第三级中
                              //第四级目录清空
                              let target4 = +targetData[(+targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children.length-1;
                              targetData[(targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children[target4].children = [];
                              targetData[(targetData.length - 1)].children[targetData[(+targetData.length - 1)].children.length - 1].children[target4].children.push((JSON.parse(JSON.stringify(item4))));
                              targetData.map((item,index) => {
                                  if(item.cid == item1.cid){
                                    level1 = index;
                                    return;
                                    if(item.children){
                                        item.children.map((arritem, index2) => {
                                           if(level3 != -1){
                                              return;
                                            }
                                          if(arritem.cid == item2.cid){
                                            level2 = index;
                                          }
                                          if(arritem.children){
                                            arritem.children.map((arr3item, index3) => {
                                              if(arr3item.cid == item3.cid){
                                                level3 = index3;
                                                return;
                                              }
                                            });
                                          }
                                        });
                                      }
                                  }
                                })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                  if(sourceData[index1].children[index2].children.length == 0) {
                                    sourceData[index1].children.splice(index2,1);
                                      if(sourceData[index1].children.length == 0){
                                          sourceData.splice(index1,1);
                                        }
                                   }
                              }
                            } else if(level2 == -1) { //第二级不存在
                              targetData[level1].children.push((JSON.parse(JSON.stringify(item2)))); //将第二级加入到里面去
                              targetData[level1].children[+targetData[level1].children.length - 1].children = [];
                              targetData[level1].children[+targetData[level1].children.length - 1].children.push((JSON.parse(JSON.stringify(item3))));
                              targetData[level1].children[targetData[(+targetData[level1].children.length - 1)].children.length - 1].children = [];//将第三级置空
                              targetData[level1].children[targetData[(+targetData[level1].children.length - 1)].children.length - 1].children.push((JSON.parse(JSON.stringify(item4)))); //将对象添加到第三级中
                              targetData.map((item,index) => {
                                if(item.cid == item1.cid){
                                  level1 = index;
                                  return;
                                  if(item.children){
                                      item.children.map((arritem, index2) => {
                                        if(arritem.cid == item2.cid){
                                           if(level3 != -1){
                                              return;
                                            }
                                          level2 = index2;
                                        }
                                        if(arritem.children){
                                          arritem.children.map((arr3item, index3) => {
                                            if(arr3item.cid == item3.cid){
                                              level3 = index3;
                                              return;
                                            }
                                          });
                                        }
                                      });
                                    }
                                }
                              })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
																if(sourceData[index1].children[index2].children.length == 0) {
                                    sourceData[index1].children.splice(index2,1);
                                    if(sourceData[index1].children.length == 0){
                                      sourceData.splice(index1,1);
                                    }
                               	}
                              }
                            } else if (level3 == -1){ 
                            //第三级目录不存在
                              if(!targetData[level1].children[level2].children){
                                targetData[level1].children[level2].children = [];
                              }
                              targetData[level1].children[level2].children.push(JSON.parse(JSON.stringify(item3)));
                              targetData[level1].children[level2].children[+targetData[level1].children[level2].children.length - 1].children = [];
                              targetData[level1].children[level2].children[+targetData[level1].children[level2].children.length - 1].children.push((JSON.parse(JSON.stringify(item4))));
                              targetData.map((item,index) => {
                                  if(item.cid == item1.cid){
                                    level1 = index;
                                    return;
                                    if(item.children){
                                        item.children.map((arritem, index2) => {
                                          if(arritem.cid == item2.cid){
                                            if(level3 != -1){
                                              return;
                                            }
                                            level2 = index2;
                                          }
                                          if(arritem.children){
                                            arritem.children.map((arr3item, index3) => {
                                              if(arr3item.cid == item3.cid){
                                                level3 = index3;
                                                return;
                                              }
                                            });
                                          }
                                        });
                                      }
                                  }
                                })
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                if(sourceData[index1].children[index2].children.length == 0) {
																	sourceData[index1].children.splice(index2,1);
																	if(sourceData[index1].children.length == 0){
																		sourceData.splice(index1,1);
																	}
																}
                              }
                            } else {
                              targetData[level1].children[level2].children[level3].children.push((JSON.parse(JSON.stringify(item4))));
                              sourceData[index1].children[index2].children[index3].children.splice(index4, 1);
                              if(sourceData[index1].children[index2].children[index3].children.length == 0) {
                                sourceData[index1].children[index2].children.splice(index3, 1);
                                if(sourceData[index1].children[index2].children.length == 0) {
																	sourceData[index1].children.splice(index2,1);
																	if(sourceData[index1].children.length == 0){
																			sourceData.splice(index1,1);
																	}
																}
                            	}
                        		}
													}
												});
											}
										}
									});
                }
              }
            });
					}
        }
			});
    });
    if(type){
      this.setState({
        searchData: targetData,
      })
    } else {
      this.setState({
        sourceData: targetData,
        targetData: sourceData,
        checkedKeysRight: [],
      });
      this.props.callBack(sourceData);
    }
	}
	
	//生成tree节点
  loop = data => data.map((item) => {
			if(item){
				if (item.children) {
					return (
						<TreeNode key={item.cid} title={item.categoryName}>
							{this.loop(item.children)}
						</TreeNode>
					);
				}
				return <TreeNode key={item.cid} title={item.categoryName}/>;
			}
		});
	
	//查询类目
	onSearchCategory = (e) => {
    const value = e.target.value;
    if(value){
      console.log('-------搜索条件',value)
      this.setState({isSearch:true})
      let newData = this.getSearchData(this.state.searchData,value)
      this.setState({sourceData:newData})
    } else {
      console.log('------未输入搜索内容')
      this.setState({isSearch:false})
      console.log(this.state.searchData)
      this.setState({sourceData:this.state.searchData})
    }
		// const dataArray = [];
		// let arrayLoop = data => data.map((item,index)=>{
		// 	if(item.categoryName.indexOf(value)!=-1){
		// 		dataArray.push(item.cid.toString());
    //   }
    //   if(item.children){
		// 		arrayLoop(item.children);
		// 	}
		// })
    // if(value){
		// 	arrayLoop(sourceData)
    // }
    // this.setState({
    //    checkedKeysLeft: dataArray
		// });
  }
  
  //根据value匹配data(tree结构)中符合value的tree数据
  getSearchData = (data,value) =>{
    // console.log('----------开始进行匹配')
    let newTree = [];
    data.map((item1, index1) => { // 在第一级类目查找
      if(item1.categoryName.indexOf(value)!=-1){
        //该一级类目匹配
        let level1 = -1;
        newTree.map((item, index) => {
          if(item.cid == item1.cid){
            //目标数组中已含有该一级类目
            level1 = index;
            return;
          }
        })
          if(level1 == -1) {
            //目标数组中不含有该一级类目，将该一级类目数据添加到模板数组中
            newTree.push(item1);
          }
      } else {
        if(item1.children && item1.children.length>0){
          item1.children.map((item2, index2) => { // 在第二级类目查找 
            if(item2.categoryName.indexOf(value)!=-1) {
              //该二级类目匹配
              let level2 = -1;
              newTree.map((item,index) => {
                if(item.cid == item1.cid){
                  level2 = index;
                  return;
                }
              })
              if(level2 == -1){ //第一级不存在，直接push全部
                newTree.push(item1);
                newTree[(newTree.length - 1)].children = [];//将他的children 置空
                newTree[(newTree.length - 1)].children.push(item2); //添加新在当前目录下填加子元素
              } else {
                newTree[level2].children.push(item2);
              }
            } else {
              if (item2.children && item2.children.length>0) {
                item2.children.map((item3, index3) => { //在第三级目录中进行查找 
                  if(item3.categoryName.indexOf(value)!=-1) {
                    //该三级类目匹配
                    let level1 = -1;
                    let level2 = -1;
                    newTree.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          return;
                        }
                    })
                    if (level1 == -1) { //查找到了且一级类目不存在
                       newTree.push(item1); // 将第一级加进去
                       newTree[(newTree.length - 1)].children = []; //将第一级chirlden置空
                       newTree[(newTree.length - 1)].children.push(item2); //将第二级复制到第一级的chirldren
                       newTree[(newTree.length - 1)].children[newTree[(newTree.length - 1)].children.length - 1].children = [];//将第三级置空
                       newTree[(newTree.length - 1)].children[newTree[(newTree.length - 1)].children.length - 1].children.push(item3); //将对象添加到第三级中
                       level1 = -1;
                       level2 = -1;
                       newTree.map((item,index) => {
                         if(item.cid == item1.cid){
                           level1 = index;
                           if(item.children){
                             item.children.map((arritem, index2) => {
                               if(arritem.cid == item2.cid){
                                 level2 = index2;
                                 return;
                               }
                             });
                           }
                         }
                       })
                    } else { //查找到且一级类目已有
                      level2 = -1;
                      newTree.map((item,index) => {
                        if(item.children){
                          item.children.map((arritem, index2) => {
                            if(arritem.cid == item2.cid){
                              level2 = index2;
                              return;
                            }
                          });
                        }
                      });
                      if (level2 == -1) { //第一级存在第二级不存在
                        newTree[level1].children.push(item2); //将第二级加入到里面去
                        newTree[level1].children[newTree[level1].children.length - 1].children = [];
                        newTree[level1].children[newTree[level1].children.length - 1].children.push(item3);
                      } else { //第一级存在且第二级存在
                        newTree[level1].children[level2].children.push(item3);
                      }
                    }
                  } else {
                    //在第四级类目查找
                    if (item3.children && item3.children.length>0) {
                      let level1 = -1;
                      let level2 = -1;
                      let level3 = -1;
                      newTree.map((item,index) => {
                        if(item.cid == item1.cid){
                          level1 = index;
                          if(item.children){
                              item.children.map((arritem, index2) => {
                                if(arritem.cid == item2.cid){
                                  if(level3 != -1){
                                    return;
                                  }
                                  level2 = index2;
                                }
                                if(arritem.children){
                                  arritem.children.map((arr3item, index3) => {
                                    if(arr3item.cid == item3.cid){
                                      level3 = index3;
                                      return;  
                                    }
                                  });
                                }
                            });
                          }
                        }
                      })
                      item3.children.map((item4,index4)=>{
                         if (item4.categoryName.indexOf(value)!=-1) { //在第四级找到目标元素
                             if(level1 == -1){ //第一级类目不存在
                               newTree.push(item1); // 将第一级加进去
                               newTree[(newTree.length - 1)].children = []; //将第一级chirlden置空
                               newTree[(newTree.length - 1)].children.push(item2); //将第二级复制到第一级的chirldren
                               newTree[(newTree.length - 1)].children[newTree[(newTree.length - 1)].children.length - 1].children = [];//将第三级置空
                               newTree[(newTree.length - 1)].children[newTree[(newTree.length - 1)].children.length - 1].children.push(item3); //将对象添加到第三级中
                               //第四级目录清空
                               let target4 = newTree[(newTree.length - 1)].children[newTree[(newTree.length - 1)].children.length - 1].children.length-1;
                               newTree[(newTree.length - 1)].children[newTree[(newTree.length - 1)].children.length - 1].children[target4].children = [];
                               newTree[(newTree.length - 1)].children[newTree[(newTree.length - 1)].children.length - 1].children[target4].children.push(item4);
                               newTree.map((item,index) => {
                                   if(item.cid == item1.cid){
                                     level1 = index;
                                     return;
                                     if(item.children){
                                       item.children.map((arritem, index2) => {
                                         if(arritem.cid == item2.cid){
                                           if(level3 != -1){
                                             return;
                                           }
                                           level2 = index2;
                                         }
                                         if(arritem.children){
                                           arritem.children.map((arr3item, index3) => {
                                             if(arr3item.cid == item3.cid){
                                               level3 = index3;
                                               return;
                                             }
                                           });
                                         }
                                       });
                                     }
                                   }
                                 })

                             } else if(level2 == -1) { //第一级存在第二级不存在
                               newTree[level1].children.push(item2); //将第二级加入到里面去
                               newTree[level1].children[newTree[level1].children.length - 1].children = [];
                               newTree[level1].children[newTree[level1].children.length - 1].children.push(item3);
                               newTree[level1].children[newTree[(newTree[level1].children.length - 1)].children.length - 1].children = [];//将第三级置空
                               newTree[level1].children[newTree[(newTree[level1].children.length - 1)].children.length - 1].children.push(item4); //将对象添加到第三级中
                               newTree.map((item,index) => {
                                 if(item.cid == item1.cid){
                                   level1 = index;
                                   return;
                                   if(item.children){
                                     item.children.map((arritem, index2) => {
                                       if(arritem.cid == item2.cid){
                                           if(level3 != -1){
                                             return;
                                           }
                                         level2 = index2;
                                       }
                                       if(arritem.children){
                                         arritem.children.map((arr3item, index3) => {
                                           if(arr3item.cid == item3.cid){
                                             level3 = index3;
                                             return;
                                           }
                                         });
                                       }
                                     });
                                   }
                                 }
                               })
                             } else if (level3 == -1){ 
                              //第一级存在，第二级存在，第三级不存在
                              if(!newTree[level1].children[level2].children){
                                  newTree[level1].children[level2].children = [];
                              }
                               newTree[level1].children[level2].children.push(item3);
                               newTree[level1].children[level2].children[newTree[level1].children[level2].children.length - 1].children = [];
                               newTree[level1].children[level2].children[newTree[level1].children[level2].children.length - 1].children.push(item4);
                               newTree.map((item,index) => {
                                   if(item.cid == item1.cid){
                                     level1 = index;
                                     return;
                                     if(item.children){
                                         item.children.map((arritem, index2) => {
                                           if(arritem.cid == item2.cid){
                                              if(level3 != -1){
                                               return;
                                             }
                                             level2 = index2;
                                           }
                                           if(arritem.children){
                                             arritem.children.map((arr3item, index3) => {
                                               if(arr3item.cid == item3.cid){
                                                 level3 = index3;
                                                 return;
                                               }
                                             });
                                           }
                                         });
                                       }
                                   }
                                 })

                             } else { //第一级，第二级，第三级都存在
                               newTree[level1].children[level2].children[level3].children.push((JSON.parse(JSON.stringify(item4))));
                             }
                           }
                         });
                       }
                     }
                   });
                 }
               }
             });
           }
         }
       });
       console.log('---------匹配完成')
      //  console.log('匹配结果：')
      //  console.log(newTree)
      //  console.log('原始数据：')
      //  console.log(data)
       return newTree;
  }

  handleToRight = ()=>{
    if(this.state.isSearch){
      this.moveRight(this.state.sourceData,this.state.targetData,false);
      this.moveRight(this.state.searchData,this.state.targetData,true); //变更搜索源数据
    } else {
      this.moveRight(this.state.sourceData,this.state.targetData,false);
    }
  }

  handleToLeft = ()=>{
    if(this.state.isSearch){
      this.moveLeft(this.state.sourceData,this.state.targetData,false);
      this.moveLeft(this.state.searchData,this.state.targetData,true); //变更搜索源数据
    } else {
      this.moveLeft(this.state.sourceData,this.state.targetData,false);
    }
  }

  render() {
    return (
      <div className="template-transfer-box">
					<p className="template-transfer-search">选择目标类目</p>
					<Input placeholder="输入关键字" onChange={this.onSearchCategory} />
					<p className="template-transfer-title">
						<span className ="title-left">可选类目</span>
						<span className ="title-right">已选类目</span>
					</p>
					<div className="transfer-tree-box">
						{/* <Checkbox defaultChecked={false} checked={this.state.allCheckedLeft} onChange={this.allSelectSource}>全选</Checkbox> */}
						<div className="transfer-tree">
							<Spin spinning = {this.state.loadingLeft}>
								{this.state.sourceData && (<Tree
										checkable
										checkedKeys = {this.state.checkedKeysLeft}
										onCheck = {this.onCheckLeft}
										onSelect = {this.onCheckLeft}
									>
									{this.loop(this.state.sourceData)}
								</Tree>)}
							</Spin>
						</div>
					</div>
					<div className="transfer-btn-box">
						<Button type="primary" onClick={()=>{this.handleToRight()}} className="transfer-btn-left" >{'>>'}</Button>
						<Button type="primary" onClick={()=>{this.handleToLeft()}} className="transfer-btn-right" >{'<<'}</Button>
					</div>
					<div className="transfer-tree-box">
							{/* <Checkbox defaultChecked={false} checked={this.state.allCheckedRight} onChange={this.allSelectSource2}>全选</Checkbox> */}
							<div className="transfer-tree">
								<Spin spinning={this.state.loadingRight}>
									{this.state.targetData.length >= 1 && (<Tree
										checkable
										checkedKeys = {this.state.checkedKeysRight}
										onCheck = {this.onCheckRight}
										onSelect = {this.onCheckRight}
									>
										{this.loop(this.state.targetData)}
									</Tree>)}
								</Spin>
							</div>
					</div>
      </div>
    );
  }
}