import {updateDataKey} from './common_redux';

export function cancelSelect(data,obj,attr,value){
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
export function setDataAttrByKey(data,key,obj,attr,value){
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



export function getLevelDataByParentCid(delData) {
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
export function processData(data,delData){
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

export function getDeleteData(data) {
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


//删除的时候更改数据结构
export function getDataByKey(data,key,type){
  var keyArr =(key+'').split("-");
  var selectCategory;
  var sortCategory=[],parentCid='';
  if(keyArr.length==1){
    selectCategory=data[keyArr[0]];
    if(type=="delete"){
      var removed = data.splice(keyArr[0],1);
      for(var i=0;i<data.length;i++){
        data[i].index=i+"";
        data[i]= updateDataKey(data[i]);
      }
      sortCategory=data;
      parentCid=selectCategory.parentCid;
    }
  }else if(keyArr.length==2){
    if(type=="delete"){
      data[keyArr[0]]['children'].splice(keyArr[1],1);
      data[keyArr[0]]= updateDataKey(data[keyArr[0]]);
      sortCategory=data[keyArr[0]].children;
      parentCid=data[keyArr[0]].cid;
    }
  }else if(keyArr.length==3){
    if(type=="delete"){
      var parentCategory = data[keyArr[0]]['children'][keyArr[1]];
      parentCategory['children'].splice(keyArr[2],1);
      data[keyArr[0]]['children'][keyArr[1]] = updateDataKey(parentCategory);
      sortCategory= parentCategory.children;
      parentCid=parentCategory.cid;
    }
  }else if(keyArr.length==4){
    if(type=="delete") {
      var parentCategory = data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]];
      parentCategory['children'].splice(keyArr[3],1);
      data[keyArr[0]]['children'][keyArr[1]]['children'][keyArr[2]]= updateDataKey(parentCategory);
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

function getObjSize(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}