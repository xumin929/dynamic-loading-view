//import * as categoryActions from './common_redux';
import {updateDataKey,searchNodeLevelName} from './common_redux';
//向上移动类目
export function upLevel(keyArr,data,record,level) {
  if(level == 1){
    var srcKey = parseInt(keyArr);
    var srcNode = data[srcKey];
    srcNode.index = (srcKey - 1)+"";
    var destNode = data[srcKey - 1];
    destNode.index = srcKey+"";
    data[srcKey] =updateDataKey(destNode);
    data[srcKey - 1]= updateDataKey(srcNode);
  }else if(level == 2){
    var srcKey = parseInt(keyArr[1]);
    var srcNode = data[keyArr[0]].children[srcKey];
    srcNode.index = keyArr[0]+ "-"+(srcKey - 1);
    var destNode = data[keyArr[0]].children[srcKey - 1];
    destNode.index = keyArr[0]+"-"+srcKey;
    data[keyArr[0]].children[srcKey] =updateDataKey(destNode);
    data[keyArr[0]].children[srcKey - 1] = updateDataKey(srcNode);;
  }else if(level == 3){
    var srcKey = parseInt(keyArr[2]);
    var srcNode = data[keyArr[0]].children[keyArr[1]].children[srcKey];
    srcNode.index = keyArr[0]+"-"+keyArr[1]+ "-"+(srcKey - 1);
    var destNode = data[keyArr[0]].children[keyArr[1]].children[srcKey - 1];
    destNode.index = keyArr[0]+"-"+keyArr[1]+"-"+srcKey;
    data[keyArr[0]].children[keyArr[1]].children[srcKey] =updateDataKey(destNode);
    data[keyArr[0]].children[keyArr[1]].children[srcKey - 1] = updateDataKey(srcNode);;
  }else if(level == 4){
    var srcKey = parseInt(keyArr[3]);
    var srcNode = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[srcKey];
    srcNode.index = keyArr[0]+"-"+keyArr[1]+"-"+keyArr[2]+ "-"+(srcKey - 1);
    var destNode = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[srcKey - 1];
    destNode.index = keyArr[0]+"-"+keyArr[1]+"-"+keyArr[2]+"-"+srcKey;
    data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[srcKey] =updateDataKey(destNode);
    data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[srcKey - 1] = updateDataKey(srcNode);;
  }

}
export function recordChangeNode(parentCid,data){
  var changeNode = [];
  searchNodeLevelName(parentCid,data,changeNode);
  return changeNode;
}

export function downLevel(keyArr,data,record,level){
  if(level == 1){
    var srcKey = parseInt(keyArr);
    var srcNode = data[srcKey];
    srcNode.index = (srcKey + 1)+"";
    var destNode = data[srcKey + 1];
    destNode.index = srcKey+"";
    data[srcKey] =updateDataKey(destNode);
    data[srcKey + 1] = updateDataKey(srcNode);
  }else if(level == 2){
    var srcKey = parseInt(keyArr[1]);
    var srcNode = data[keyArr[0]].children[srcKey];
    srcNode.index = keyArr[0]+ "-"+(srcKey + 1);
    var destNode = data[keyArr[0]].children[srcKey + 1];
    destNode.index = keyArr[0]+"-"+srcKey;
    data[keyArr[0]].children[srcKey] =updateDataKey(destNode);;
    data[keyArr[0]].children[srcKey + 1] = updateDataKey(srcNode);;
  }else if(level == 3){
    var srcKey = parseInt(keyArr[2]);
    var srcNode = data[keyArr[0]].children[keyArr[1]].children[srcKey];
    srcNode.index = keyArr[0]+"-"+keyArr[1]+ "-"+(srcKey + 1);
    var destNode = data[keyArr[0]].children[keyArr[1]].children[srcKey + 1];
    destNode.index = keyArr[0]+"-"+keyArr[1]+"-"+srcKey;
    data[keyArr[0]].children[keyArr[1]].children[srcKey] =updateDataKey(destNode);;
    data[keyArr[0]].children[keyArr[1]].children[srcKey + 1] = updateDataKey(srcNode);;
  }else if(level == 4){
    var srcKey = parseInt(keyArr[3]);
    var srcNode = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[srcKey];
    srcNode.index = keyArr[0]+"-"+keyArr[1]+"-"+keyArr[2]+ "-"+(srcKey + 1);
    var destNode = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[srcKey + 1];
    destNode.index = keyArr[0]+"-"+keyArr[1]+"-"+keyArr[2]+"-"+srcKey;
    data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[srcKey] =updateDataKey(destNode);;
    data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[srcKey + 1] = updateDataKey(srcNode);;
  }

}

//移动4级类目,置顶
export function top4Level(keyArr,data,record,level) {
  if(level == 1){
    var srcLastKey = parseInt(keyArr);
    var currentNode = data[srcLastKey];

    //更新当前节点之前的所有node，位置递增1
    var firstNode = data[0];
    exchangeNode(data,keyArr,firstNode,srcLastKey,0,level)

    //当前节点更新为第一个节点
    currentNode.index =  "0";
    data[0] = updateDataKey(currentNode);;
  }else if(level == 2){
    var srcLastKey = parseInt(keyArr[1]);
    var currentNode = data[keyArr[0]].children[srcLastKey];

    //更新当前节点之前的所有node，位置递增1
    var firstNode = data[keyArr[0]].children[0];
    exchangeNode(data,keyArr,firstNode,srcLastKey,0,level)

    //当前节点更新为第一个节点
    currentNode.index = keyArr[0]+ "-0";
    data[keyArr[0]].children[0] = updateDataKey(currentNode);;
  }else if(level == 3){
    var srcLastKey = parseInt(keyArr[2]);
    var currentNode = data[keyArr[0]].children[keyArr[1]].children[srcLastKey];

    //更新当前节点之前的所有node，位置递增1
    var firstNode = data[keyArr[0]].children[keyArr[1]].children[0];
    exchangeNode(data,keyArr,firstNode,srcLastKey,0,level)

    //当前节点更新为第一个节点
    currentNode.index = keyArr[0]+"-"+keyArr[1]+ "-0";
    data[keyArr[0]].children[keyArr[1]].children[0] = updateDataKey(currentNode);;

  }else if(level == 4){
    var srcLastKey = parseInt(keyArr[3]);
    var currentNode = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[srcLastKey];

    //更新当前节点之前的所有node，位置递增1
    var firstNode = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[0];
    exchangeNode(data,keyArr,firstNode,srcLastKey,0,level)

    //当前节点更新为第一个节点
    currentNode.index = keyArr[0]+"-"+keyArr[1]+"-"+keyArr[2]+ "-0";
    data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[0] = updateDataKey(currentNode);
  }

}

function exchangeNode(data,keyArr,curNode,nodeCount,nodeIndex,level) {
  if(level == 1){
    curNode.index = (nodeIndex + 1) +"";
    var nextNode = data[nodeIndex+1];
    data[nodeIndex + 1] = updateDataKey(curNode);
  }else if(level ==2){
    curNode.index = keyArr[0] + "-"+(nodeIndex + 1);
    var nextNode = data[keyArr[0]].children[nodeIndex + 1];
    data[keyArr[0]].children[nodeIndex + 1] = updateDataKey(curNode);
  }else if(level ==3){
    curNode.index = keyArr[0] + "-" + keyArr[1]  + "-"+(nodeIndex + 1);
    var nextNode = data[keyArr[0]].children[keyArr[1]].children[nodeIndex + 1];
    data[keyArr[0]].children[keyArr[1]].children[nodeIndex + 1] = updateDataKey(curNode);
  }else if(level ==4){
    curNode.index = keyArr[0] + "-" + keyArr[1] + "-" + keyArr[2] + "-"+(nodeIndex + 1);
    var nextNode = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[nodeIndex + 1];
    data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[nodeIndex + 1] = updateDataKey(curNode);
  }

  if (nodeIndex+1 < nodeCount) {
    exchangeNode(data, keyArr, nextNode, nodeCount, nodeIndex+1,level)
  }
}

//置底，移动4级类目
export function bottom4Level(keyArr,data,record,level) {
  if(level == 1){
    var srcLastKey = parseInt(keyArr);
    var currentNode = data[srcLastKey];

    //更新当前节点之后的所有node，位置递减1
    var bottomNodeIndex = data.length-1;
    var bottomNode = data[bottomNodeIndex];
    exchangeNodeDown(data,keyArr,bottomNode,bottomNodeIndex,srcLastKey,level);
    //当前节点更新为最后节点
    currentNode.index = bottomNodeIndex+"";
    data[bottomNodeIndex]= updateDataKey(currentNode);
  }else if(level == 2){
    var srcLastKey = parseInt(keyArr[1]);
    var currentNode = data[keyArr[0]].children[srcLastKey];

    //更新当前节点之后的所有node，位置递减1
    var bottomNodeIndex = data[keyArr[0]].children.length-1;
    var bottomNode = data[keyArr[0]].children[bottomNodeIndex];
    exchangeNodeDown(data,keyArr,bottomNode,bottomNodeIndex,srcLastKey,level)

    //当前节点更新为最后节点
    currentNode.index = keyArr[0]+"-"+bottomNodeIndex;
    data[keyArr[0]].children[bottomNodeIndex] = updateDataKey(currentNode);
  }else if(level == 3){
    var srcLastKey = parseInt(keyArr[2]);
    var currentNode = data[keyArr[0]].children[keyArr[1]].children[srcLastKey];

    //更新当前节点之后的所有node，位置递减1
    var bottomNodeIndex = data[keyArr[0]].children[keyArr[1]].children.length-1;
    var bottomNode = data[keyArr[0]].children[keyArr[1]].children[bottomNodeIndex];
    exchangeNodeDown(data,keyArr,bottomNode,bottomNodeIndex,srcLastKey,level)

    //当前节点更新为最后节点
    currentNode.index = keyArr[0]+"-"+keyArr[1]+ "-"+bottomNodeIndex;
    data[keyArr[0]].children[keyArr[1]].children[bottomNodeIndex] = updateDataKey(currentNode);
  }else if(level == 4){
    var srcLastKey = parseInt(keyArr[3]);
    var currentNode = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[srcLastKey];

    //更新当前节点之后的所有node，位置递减1
    var bottomNodeIndex = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children.length-1;
    var bottomNode = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[bottomNodeIndex];
    exchangeNodeDown(data,keyArr,bottomNode,bottomNodeIndex,srcLastKey,level)

    //当前节点更新为最后节点
    currentNode.index = keyArr[0]+"-"+keyArr[1]+"-"+keyArr[2]+ "-"+bottomNodeIndex;
    data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[bottomNodeIndex] = updateDataKey(currentNode);
  }
}

//置底，排序该节点后的所有兄弟节点，从最底节点开始向前递减
export function exchangeNodeDown(data,keyArr,curNode,nodeIndex,sortBottomNodeIndex,level) {

  if(level == 1){
    curNode.index = (nodeIndex - 1)+"" ;
    var nextNode = data[nodeIndex - 1];
    data[nodeIndex - 1]= updateDataKey(curNode);
  }else if(level == 2){
    curNode.index = keyArr[0]  + "-"+(nodeIndex - 1);
    var nextNode = data[keyArr[0]].children[nodeIndex - 1];
    data[keyArr[0]].children[nodeIndex - 1] = updateDataKey(curNode);
  }else if(level ==3){
    curNode.index = keyArr[0] + "-" + keyArr[1]  + "-"+(nodeIndex - 1);
    var nextNode = data[keyArr[0]].children[keyArr[1]].children[nodeIndex - 1];
    data[keyArr[0]].children[keyArr[1]].children[nodeIndex - 1] = updateDataKey(curNode);
  }else if(level ==4){
    curNode.index = keyArr[0] + "-" + keyArr[1] + "-" + keyArr[2] + "-"+(nodeIndex - 1);
    var nextNode = data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[nodeIndex - 1];
    data[keyArr[0]].children[keyArr[1]].children[keyArr[2]].children[nodeIndex - 1] = updateDataKey(curNode);
  }
  if (nodeIndex-1 > sortBottomNodeIndex) {
    exchangeNodeDown(data, keyArr, nextNode, nodeIndex-1,sortBottomNodeIndex,level )
  }
}