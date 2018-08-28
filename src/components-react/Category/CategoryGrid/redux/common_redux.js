//搜索某一级别下的所有节点name
export function searchNodeLevelName(parentCid,data,result){
  if(parentCid == -1){
    for(var index in data){
      result.push(data[index].cid);
    }
    return;
  }
  for(var index in data){
    if(data[index]["cid"] == parentCid){
      for(var indexChild in data[index]["children"]){
        var cate = data[index]["children"][indexChild]["cid"];
        result.push(cate);
      }
    }else{
      searchNodeLevelName(parentCid,data[index]["children"],result);
    }

  }
}

export function updateDataKey(obj){
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
