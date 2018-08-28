const LIST = 'category/grid/LOAD';
const LIST_SUCCESS = 'category/grid/LOAD_SUCCESS';
const LIST_FAIL = 'category/grid/LOAD_FAIL';
const CATEGORY_CHANGE = 'category/grid/CATEGORY_CHANGE';
const DELETE ='category/grid/DELETE';
const DELETE_SUCCESS='category/grid/DELETE_SUCCESS';
const DELETE_FAIL='category/grid/DELETE_FAIL';
const SORT ='category/grid/SORT';
const SORT_SUCCESS='category/grid/SORT_SUCCESS';
const SORT_FAIL='category/grid/SORT_FAIL';
const SAVE_ALL ='category/grid/SAVE_ALL';
const SAVE_ALL_SUCCESS='category/grid/SAVE_ALL_SUCCESS';
const SAVE_ALL_FAIL='category/grid/SAVEL_ALL_FAIL';

import * as categoryActions from './common_redux';
export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
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
        console.log('aaaaaaaaaa');
        return {
          ...state,
          deleteOpera:{loading: false,loaded: true},
          deleteResult:action.result,
          data:action.changeData
        }
      }else{
        console.log('bbbbbbbbb');
        return {
          ...state,
          data:action.originalData,
          deleteOpera:{loading: false,loaded: true},
          deleteResult:action.result,
        }
      }

    default:
      return state
  }
}

function cancelSelect(data,obj,attr,value){
  var keyArr = obj.index.split("-");
  if(keyArr.length==2){
    data[keyArr[0]][attr]=value;
  }else if(keyArr.length==3){
    data[keyArr[0]][attr]=value;
    data[keyArr[0]]['children'][keyArr[1]][attr] = value;
  }else if(keyArr.length==3){
    data[keyArr[0]][attr]=value;
    data[keyArr[0]]['children'][keyArr[1]][attr] = value;
    [keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]][attr]=value;
  }
  return data;
}
function setDataAttrByKey(data,key,obj,attr,value){
  var keyArr= key.split("-");
  if(keyArr.length==1){
    data[keyArr[0]]= setAttr(obj,attr,value);
  }else if(keyArr.length==2){
    data[keyArr[0]]['children'][keyArr[1]]= setAttr(obj,attr,value);
  }else if(keyArr.length==3){
    data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]]= setAttr(obj,attr,value);
  }else if(keyArr.length==4){
    data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]]['children'][keyArr[3]] = setAttr(obj,attr,value);
  }
  return data;
}
function setAttr(obj,attr,value){
  if(obj.children && obj.children.length>0){
    var child=obj.children;
    for(var i =0;i<child.length; i++){
      obj['children'][i][attr]=value;
      setAttr(child[i],attr,value);
    }
  }
  return obj;
}
function setDataAttrByKey(data,key,obj,attr,value){
  var keyArr= key.split("-");
  if(keyArr.length==1){
    data[keyArr[0]]= setAttr(obj,attr,value);
  }else if(keyArr.length==2){
    data[keyArr[0]]['children'][keyArr[1]]= setAttr(obj,attr,value);
  }else if(keyArr.length==3){
    data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]]= setAttr(obj,attr,value);
  }else if(keyArr.length==4){
    data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]]['children'][keyArr[3]] = setAttr(obj,attr,value);
  }
  return data;
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
export function categoryAdd(data,saveObj) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (client) => client.post('/item/categoryDelete.json',{params:saveObj})
      .then(function (a,b,c) {
        saveObj.index=(data.length-1)+'';
        saveObj.categoryId=a.data.categoryId;
        a.changeData=data;
        return a;
      })
  }
}

function getLevelDataByParentCid(delData) {
  var lev1={},lev2={},lev3={},lev4={},cids=[];
  for(var index in delData) {
    var info = delData[index];
    var keyArr = info.index.split("-");
    var keyLength = keyArr.length;
    cids.push(info.cid);
    if (info.lev == 1) {
      var newKey = -1;
      if (lev1[info.parentCid + '_' + newKey]) {
        lev1[info.parentCid + '_' + newKey].push(info);
      } else {
        lev1[info.parentCid + '_' + newKey] = [];
        lev1[info.parentCid + '_' + newKey].push(info);
      }
    } else if (info.lev == 2) {
      keyArr.pop();
      var newKey = keyArr[0];
      if (lev2[info.parentCid + '_' + newKey]) {
        lev2[info.parentCid + '_' + newKey].push(info);
      } else {
        lev2[info.parentCid + '_' + newKey] = [];
        lev2[info.parentCid + '_' + newKey].push(info);
      }
    } else if (info.lev == 3) {
      keyArr.pop();
      var newKey = keyArr.join('-');
      if (lev3[info.parentCid + '_' + newKey]) {
        lev3[info.parentCid + '_' + newKey].push(info);
      } else {
        lev3[info.parentCid + '_' + newKey] = [];
        lev3[info.parentCid + '_' + newKey].push(info);
      }
    } else if (info.lev == 4) {
      keyArr.pop();
      var newKey = keyArr.join('-');
      if (lev4[info.parentCid + '_' + newKey]) {
        lev4[info.parentCid + '_' + newKey].push(info);
      } else {
        lev4[info.parentCid + '_' + newKey] = [];
        lev4[info.parentCid + '_' + newKey].push(info);
      }
    }
  }
  return {lev1:lev1,lev2:lev2,lev3:lev3,lev4:lev4,cids:cids};
}
function getDataByAttr(parentCid,key,data,attr) {
  var keyArr = key.split("-");
  if(attr && attr!=''){
    if(parentCid == '-1'){
      return data;
    }else{
      if(keyArr.length==1){
        return data[keyArr[0]][attr];
      }else if(keyArr.length==2) {
        return data[keyArr[0]]['children'][keyArr[1]][attr];
      }else if(keyArr.length==3){
        return data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]][attr];
      }else if(keyArr.length==4){
        return data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]]['children'][keyArr[3]][attr];
      }
    }
  }
}
//数组去重
function arrUnique(parentCid,allChild,delChild,keyArr) {
  var sortData=[],obj={},sortLevelData=[];
  var key=keyArr;key=key.join("-");
  for(var a=0;a< delChild.length;a++){
    var info = delChild[a];
    obj[info.cid]=info.cid;
  }

  for(var i=0;i<allChild.length;i++){
    var info = allChild[i];
    if(!obj[info.cid]){
      sortData.push(info);
      sortLevelData.push(info.cid);
    }
  }
  if(parentCid!='-1'){
    for(var b = 0;b<sortData.length; b++){
      var newKey= key+'-'+b;
      sortData[b].index = newKey;
    }
  }
  return {sortData:sortData,sortLevelData:sortLevelData};
}
function pushDel(data,sortDatas,levObj) {
  for(var info in levObj){
    var obj={},sortLevelData=[];
    var arr=info.split("_");
    var parentCid=arr[0];
    var parentKey=arr[1];
    var keyArr =parentKey.split("-");
    var delChild = levObj[info];
    var allChild = getDataByAttr(parentCid,parentKey,data,'children');
    var lastObj = arrUnique(parentCid,allChild,delChild,keyArr);//删除数组数据
    obj.parentCid = parentCid;
    obj.sortLevelData = lastObj.sortLevelData;
    sortDatas.push(obj);
    if(parentCid=='-1'){
      data=lastObj.sortData;
      for(var i=0;i<data.length;i++){
        data[i].index =i+'';
        data[i] = updateDataKey(data[i]);
      }
    }else{
      if(keyArr.length==1){
        data[keyArr[0]]['children'] = lastObj.sortData;
        data[keyArr[0]] = updateDataKey(data[keyArr[0]]);
      }else if(keyArr.length==2){
        data[keyArr[0]]['children'][keyArr[1]]['children'] = lastObj.sortData;
        data[keyArr[0]]['children'][keyArr[1]] = updateDataKey(data[keyArr[0]]['children'][keyArr[1]]);
      } else if(keyArr.length==3){
        data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]]['children'] = lastObj.sortData;
        data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]] =
          updateDataKey(data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]]);
      }
    }
  }
  return {data:data,sortDatas:sortDatas}
}
function processData(data,delData){
  var sortDatas = [];
  var lev1 = delData.lev1;
  var lev2 = delData.lev2;
  var lev3 = delData.lev3;
  var lev4 = delData.lev4;
  if(getObjSize(lev4)> 0 ){
    var list = pushDel(data,sortDatas,lev4);
    data =list.data;
    sortDatas = list.sortDatas;
  }
  if(getObjSize(lev3)> 0){
    var list = pushDel(data,sortDatas,lev3);
    data =list.data;
    sortDatas = list.sortDatas;
  }
  if(getObjSize(lev2)> 0){
    var list = pushDel(data,sortDatas,lev2);
    data =list.data;
    sortDatas = list.sortDatas;
  }
  if(getObjSize(lev1)> 0){
    var list = pushDel(data,sortDatas,lev1);
    data =list.data;
    sortDatas = list.sortDatas;
  }
  return {data:data,sortDatas:sortDatas}
}

function getCheckedData(delData,obj) {
  var child1 = obj.children;
  if(child1 && child1.length>0) {
    for (var a = 0; a < child1.length; a++) {
      if(child1[a].isCheck){
        var obj1 ={};
        obj1.cid=child1[a].cid;
        obj1.index=child1[a].index;
        obj1.parentCid = child1[a].parentCid;
        obj1.lev = child1[a].lev;
        if(!delData[child1[a].parentCid]){
          delData[child1[a].cid]=(obj1);
        }
      }
      getCheckedData(delData,child1[a]);
    }
  }
  return delData;
}

function getDeleteData(data) {
  var delData={};
  for(var i=0;i<data.length;i++){
    if(data[i].lev==1 && data[i].isCheck==true) {
      var obj = {};
      obj.cid = data[i].cid;
      obj.index = data[i].index;
      obj.parentCid = data[i].parentCid;
      obj.lev = data[i].lev;
      delData[data[i].cid]= obj;
    }else{
      getCheckedData(delData,data[i]);
    }
  }
  return delData;
}
function getObjSize(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

export function batchCategoryDelete(data,UUID,platformId) {
  var originalData = data;
  //var cloneData = data.slice(0,data.length);
  var dataJson = JSON.stringify( originalData );
  var cloneData = JSON.parse(dataJson);
  var cids=[],sortDatas=[];
  var params = {};
  params.platformId =platformId;
  params.uuid = UUID;
  var checkData = getDeleteData(cloneData);
  var delData = getLevelDataByParentCid(checkData);
  var list = processData(cloneData,delData);
  console.log(delData);
  params.cids = JSON.stringify(delData.cids);
  params.sortDatas = JSON.stringify(list.sortDatas);
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    changeData:list.data,
    originalData:originalData,
    promise: (client) => client.post('/item/platform/category/deletePlatformCategory',{data:params})
  }
}

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
  console.log("originalData:"+list.data);
  console.log("changeData:"+data);
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    changeData:list.data,
    originalData:originalData,
    promise: (client) => client.post('/item/platform/category/deletePlatformCategory',{data:params})
  }
}
//删除的时候更改数据结构
function getDataByKey(data,key,type){
  var keyArr =(key+'').split("-");
  var selectCategory;
  var sortCategory=[],parentCid='';
  if(keyArr.length==1){
    selectCategory=data[keyArr[0]];
    if(type=="delete"){
      var removed = data.splice(keyArr[0],1);
      for(var i=0;i<data.length;i++){
        data[i].index=i+"";
        data[i]= categoryActions.updateDataKey(data[i]);
      }
      sortCategory=data;
      parentCid=selectCategory.parentCid;
    }
  }else if(keyArr.length==2){
    if(type=="delete"){
      data[keyArr[0]]['children'].splice(keyArr[1],1);
      data[keyArr[0]]= categoryActions.updateDataKey(data[keyArr[0]]);
      sortCategory=data[keyArr[0]].children;
      parentCid=data[keyArr[0]].cid;
    }
  }else if(keyArr.length==3){
    if(type=="delete"){
      var parentCategory = data[keyArr[0]]['children'][keyArr[1]];
      parentCategory['children'].splice(keyArr[2],1);
      data[keyArr[0]]['children'][keyArr[1]] =
        categoryActions.updateDataKey(parentCategory);
      sortCategory= parentCategory.children;
      parentCid=parentCategory.cid;
    }
  }else if(keyArr.length==4){
    if(type=="delete") {
      var parentCategory = data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]];
      parentCategory['children'].splice(keyArr[3],1);
      data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]]=
        categoryActions.updateDataKey(parentCategory);
      sortCategory=parentCategory.children;
      parentCid = parentCategory.cid;
    }
  }
  return {data:data,parentCid:parentCid,sortCategory:sortData(sortCategory)};
}
function sortData(sortCategory) {
  var list=[];
  if(sortCategory && sortCategory.length> 0){
    for(var i=0;i< sortCategory.length;i++){
      var objInfo={};
      objInfo.cid=sortCategory[i].cid;
      list.push(sortCategory[i].cid);
    }
  }
  return list;
}
function updateDataKey(obj){
  var child1=obj.children;
  if(child1 && child1.length>0){
    for (var i=0;i<child1.length;i++){
      var data=child1[i];
      var keyList=obj.index.split("-");
      keyList.push(i);
      child1[i].index=keyList.join("-");
      var child2=child1[i].children;
      if(child2&&child2.length>0){
        for (var a=0;a<child2.length;a++) {
          var keyList = child1[i].index.split("-");
          keyList.push(a);
          child2[a].index = keyList.join("-");
          var child3=child2[a].children;
          if(child3&&child3.length>0){
            for(var b=0;b<child3.length;b++){
              var keyList = child2[a].index.split("-");
              keyList.push(b);
              child3[b].index = keyList.join("-");
            }
            child2[a].children=child3;
          }
        }
        child1[i].children=child2;
      }
    }
    obj.children=child1;
  }
  // if(obj.children && obj.children.length==0){
  //   obj.children=null;
  // }
  return obj;
}

function deleteExpandedRowKeys(expandedRowKeys,keys){
  let arr = expandedRowKeys ;
  for(var i=0;i<keys.length;i++){

  }
}
