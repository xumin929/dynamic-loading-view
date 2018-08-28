const LIST_LOAD = 'category/grid/LIST_LOAD';
const LIST_SUCCESS = 'category/grid/LIST_SUCCESS';
const LIST_FAIL = 'category/grid/LIST_FAIL';

const CATEGORY_LOAD = "category/grid/CATEGORY_LOAD";
const CATEGORY_SUCCESS = "category/grid/CATEGORY_SUCCESS";
const CATEGORY_FAIL = "category/grid/CATEGORY_FAIL";

const All_CATEGORY_LOAD = "category/grid/All_CATEGORY_LOAD";
const All_CATEGORY_SUCCESS = "category/grid/All_CATEGORY_SUCCESS";
const All_CATEGORY_FAIL = "category/grid/All_CATEGORY_FAIL";

const CHILDREN_CATEGORY_LOAD = "category/grid/CHILDREN_CATEGORY_LOAD";
const CHILDREN_CATEGORY_SUCCESS = "category/grid/CHILDREN_CATEGORY_SUCCESS";
const CHILDREN_CATEGORY_FAIL = "category/grid/CHILDREN_CATEGORY_FAIL";

const UPDATE_KEYS = "category/grid/UPDATE_KEYS";

//排序state的状态
const SORT ='category/grid/SORT';
const SORT_SUCCESS='category/grid/SORT_SUCCESS';
const SORT_FAIL='category/grid/SORT_FAIL';
const ADD_OR_EDIT_SORT_SUCCESS = 'category/grid/ADD_OR_EDIT_SORT_SUCCESS' ;

//删除state的状态
const CATEGORY_CHANGE = 'category/grid/CATEGORY_CHANGE';
const DELETE ='category/grid/DELETE';
const DELETE_SUCCESS='category/grid/DELETE_SUCCESS';
const DELETE_FAIL='category/grid/DELETE_FAIL';

import {searchNodeLevelName} from './common_redux';
import * as sortActions from './sortUtil';

export default function (state = {gridLoading:false,loading:false,expandedRowKeys: []}, action = {}) {
  switch (action.type) {
    case LIST_LOAD:
      return {
        ...state,
        gridLoading: true
      }
    case LIST_SUCCESS:
      return {
        ...state,
        gridLoading: false,
        loaded: true,
        data: setDataCheckStatus(action.result.data)
      }
    case LIST_FAIL:
      return {
        ...state,
        gridLoading: false,
        loaded: false,
        error: action.msg
      }
    case CATEGORY_LOAD:
      return {
        ...state,
        refreshLoading:true,
      }
    case CATEGORY_SUCCESS:
      let params =  action.params; //传过来的参数
      if(params.type && params.type=='add'){
        return {
          ...state,
          refreshLoading: false,
          loaded: true,
          categoryList: action.result.data,
        }
      }else{
        let originalData = action.originalData;
        let list = setDataCheckStatus(action.result.data,params.parentKey);
        let lastData = updateData(originalData,params.parentKey,list);
        let Data = JSON.stringify(lastData);
         if(params.parentKey && params.parentKey==-1){ //刷新首级分类
           return {
             ...state,
             refreshLoading: false,
             loaded: true,
             categoryList: list,
             data:lastData,
             expandedRowKeys:[]
           }
         }else{
           return {
             ...state,
             refreshLoading: false,
             loaded: true,
             categoryList: list,
             data:lastData,
           }
         }
      }
    case CATEGORY_FAIL:
      return {
        ...state,
        refreshLoading: false,
        loaded: false,
        error: action.msg
      }
    case All_CATEGORY_LOAD:
      return {
        ...state,
      }
    case All_CATEGORY_SUCCESS:
      var keys  = [];
      searchAllKeys(action.result.data,keys);
      return {
        ...state,
        gridLoading: false,
        loaded: true,
        data:updateIndex(action.result.data,keys),
        expandedRowKeys:keys
      }
    case All_CATEGORY_FAIL:
      return {
        ...state,
        gridLoading: false,
        loaded: false,
        error: action.msg
      }
    case CHILDREN_CATEGORY_LOAD:
      return {
        ...state,
      }
    case CHILDREN_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        children:action.result.data,
      }
    case CHILDREN_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      }
    case UPDATE_KEYS:
      return {
        ...state,
        expandedRowKeys: action.result
      }

    /**sort state start**/
    case SORT:case SORT_FAIL:
    return {
      ...state,
      sortOpera:{loading: false,loaded: false},
      error: action.msg
    }
    case SORT_SUCCESS:
      return{
        ...state,
        sortOpera:{loading: false,loaded: true},
        data: action.result.changeData
      }
    case ADD_OR_EDIT_SORT_SUCCESS:
      return{
        ...state,
        addOrEditSortOpera:{loading: false,loaded: true},
      }
    /**sort state end**/

    /**delete state  start**/
    case CATEGORY_CHANGE:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      }
    case DELETE:case DELETE_FAIL:
    return {
      ...state,
      deleteOpera:{loading: false,loaded: false},
      error: action.msg
    }
    case DELETE_SUCCESS:
      if(action.result.code && action.result.code=='0'){
        return {
          ...state,
          deleteOpera:{loading: false,loaded: true},
          deleteResult:action.result,
          data:action.changeData
        }
      }else{
        return {
          ...state,
          data:action.originalData,
          deleteOpera:{loading: false,loaded: true},
          deleteResult:action.result,
        }
      }
    /**delete state  end**/

    default:
      return state
  }
}

export function updateExpandedRowKeys(keys) {
 return{
   type:UPDATE_KEYS,
   result:keys
 }
}

export function list (params) {
  return {
    types: [LIST_LOAD, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoryListByParentId',
    {params:params})

  }
}

export function getCategoryByParentId(params,data) {
  return {
    types: [CATEGORY_LOAD,CATEGORY_SUCCESS,CATEGORY_FAIL],
    params: params,
    originalData:data,
    promise: (client) => client.get('/item/platform/category/getCategoryListByParentId',
      {params:{parentCategoryId:params.parentCategoryId,uuid:params.uuid}})
  }

}

export function getChildrenByCategory(params) {
  return {
    types: [CHILDREN_CATEGORY_LOAD,CHILDREN_CATEGORY_SUCCESS,CHILDREN_CATEGORY_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoryListByParentId',
      {params:params})
  }
}
export function getAllCategoryList(params) {
  return {
    types: [All_CATEGORY_LOAD,All_CATEGORY_SUCCESS,All_CATEGORY_FAIL],
    promise: (client) => client.get('/item/platform/category/getAllCategoriesForAllSpreadByPlatformId',
      {params:params})
  }
}

function setCheckStatus(data) {
  if(data && data.length>0){
    for(var i=0;i< data.length;i++){
      var info = data[i];
      data[i].index = data[i].key;
      data[i].key =data[i].cid;
      data[i] = setIsCheck(info);
    }
  }
  return data;
}
function setIsCheck(obj)
{
  obj.isCheck = false;
  var child1=obj.children;
  if(child1 && child1.length>0){
    for (var i=0;i<child1.length;i++){
      child1[i].index = child1[i].key;
      child1[i].key = child1[i].cid;
      child1[i].isCheck=false;
      var child2=child1[i].children;
      if(child2&&child2.length>0){
        for (var a=0;a<child2.length;a++) {
          child2[a].index = child2[a].key;
          child2[a].key = child2[a].cid;
          child2[a].isCheck = false;
          var child3=child2[a].children;
          if(child3&&child3.length>0){
            for(var b=0;b<child3.length;b++){
              child3[b].index = child3[b].key;
              child3[b].key = child3[b].cid;
              child3[b].isCheck = false;
            }
            child2[a].children=child3;
          }
        }
        child1[i].children=child2;
      }
    }
    obj.children=child1;
  }
  return obj;
}

function setDataCheckStatus(data,key) {
  if(data && data.length>0){
    for(var i=0;i< data.length;i++){
      data[i].isCheck = false;
      data[i].key = data[i].cid;
      data[i].index = i+'';
      if(key && key!= '' && key!=-1){ //key==-1，代表是移动到首级分类
        data[i].index = key+'-'+i;
      }
    }
  }
  return data;
}


function updateData(data,key,list){
  if(key && key!=-1){ //key==-1，代表是移动到首级分类
    let keys = key.split("-");
    if(!list || (list && list.length==0)){
      list = null;
    }
    if(keys.length==1){//父节点是一级类目
      data[keys[0]].children = list;
    }
    if(keys.length==2){ //父节点是二级类目
      data[keys[0]].children[keys[1]].children = list;
    }
    if(keys.length==3){ //父节点是三级类目
      data[keys[0]].children[keys[1]].children[keys[2]].children = list;
    }
  }else{
    data = list;
  }
  return data;
}

function searchAllKeys(data,keys){
  for(var index in data){
    var key = data[index]["cid"];
    keys.push(key);
    if(data[index]["children"]){
      searchAllKeys(data[index]["children"],keys)
    }
  }
}
function updateIndex(data) {
  for(var x=0;x<data.length;x++){
    data[x].index = data[x].key+'';
    data[x].key = data[x].cid;
    data[x].isCheck = false;
    recursionUpdateIndex(data[x]);
  }
  return data;
}

function recursionUpdateIndex(obj){
  if(obj.children && obj.children.length >0){
    for(var i=0;i<obj.children.length;i++){
      obj.children[i].isCheck = false;
      obj.children[i].index = obj.children[i].key+'';
      obj.children[i].key = obj.children[i].cid;
      recursionUpdateIndex(obj.children[i]);
    }
  }
}


/******排序 start*****/
export function addOrEditCategorySort(params) {
  return {
    types: [SORT, ADD_OR_EDIT_SORT_SUCCESS, SORT_FAIL],
    promise: (client) => client.post('/item/platform/category/sortPlatformCategories',{data:params})
  };
}
/**
 * 排序
 * @param data
 * @param direction :up,down,top,bottom
 * @returns {{types: *[], promise: (function(*): (Promise.<TResult>|*|Request))}}
 */
export function categorySort(data,record,direction,UUID,platformId) {
  record.index = record.index +"";
  var keyArr=record.index.split('-');
  if(keyArr && keyArr.length>1) {
    var level = keyArr.length;
  }else{
    var level = 1;
    //keyArr = record.index;
  }
  level = record.lev;
  if(direction == "up"){
    sortActions.upLevel(keyArr,data,record,level );
  }else if(direction == "down"){
    sortActions.downLevel(keyArr,data,record,level );
  }else if(direction == "top"){
    sortActions.top4Level(keyArr, data, record,level);
  }else if(direction == "bottom"){
    sortActions.bottom4Level(keyArr, data, record,level);
  }
  var sortLevelData = sortActions.recordChangeNode(record.parentCid,data);
  var params = {};
  params.platformId = platformId;
  params.uuid=UUID;
  params.parentCid = record.parentCid;
  params.sortLevelData = JSON.stringify(sortLevelData);
  return {
    types: [SORT, SORT_SUCCESS, SORT_FAIL],
    promise: (client) => client.post('/item/platform/category/sortPlatformCategories',{data:params})
      .then(function (a,b,c) {
        a.changeData=data;
        return a;
      })
  }
}

/******排序 end*****/

/******delete start*****/
import {getDataByKey,getDeleteData,getLevelDataByParentCid,cancelSelect,
  processData,setDataAttrByKey} from './deleteUtil';
//删除
export function categoryDelete(data,cids,key,type,UUID) {
  var originalData = data;
  //var cloneData = data.slice(0,data.length);
  var dataJson = JSON.stringify( originalData );
  var cloneData = JSON.parse(dataJson);
  var list = getDataByKey(cloneData,key,type);
  var params = {},sortDatas = [],obj = {};
  params.uuid =UUID;
  params.cids = JSON.stringify(cids);
  obj.parentCid = list.parentCid;
  obj.sortLevelData = list.sortCategory;
  sortDatas.push(obj);
  params.sortDatas = JSON.stringify(sortDatas);
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    changeData:list.data,
    originalData:originalData,
    promise: (client) => client.post('/item/platform/category/deletePlatformCategory',{data:params})
  }
}

//批量删除
export function batchCategoryDelete(data,UUID,platformId) {
  var originalData = data;
  var dataJson = JSON.stringify( originalData );
  var cloneData = JSON.parse(dataJson);
  var cids=[],sortDatas=[];
  var params = {};
  params.platformId =platformId;
  params.uuid = UUID;
  var checkData = getDeleteData(cloneData);
  var delData = getLevelDataByParentCid(checkData);
  var list = processData(cloneData,delData);
  params.cids = JSON.stringify(delData.cids);
  params.sortDatas = JSON.stringify(list.sortDatas);
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    changeData:list.data,
    originalData:originalData,
    promise: (client) => client.post('/item/platform/category/deletePlatformCategory',{data:params})
  }
}
export function selectChangeStatus(data,record) {
  if(record.isCheck){
    record.isCheck = false;
    data = setDataAttrByKey(data,record.index,record,'isCheck',false);//取消选中父节点，则取消选中的子节点
    if(record.lev>1) {//取销子节点的选中时取消父节点父节点的选择
      data = cancelSelect(data, record, 'isCheck', false);
    }
  }else{
    record.isCheck = true;
    data = setDataAttrByKey(data,record.index,record,'isCheck',true);
  }
  return {
    type:CATEGORY_CHANGE,
    result:data
  }
}
export function categoryChange(data) {
  return {
    type:CATEGORY_CHANGE,
    result:data
  }
}
/******delete end*****/