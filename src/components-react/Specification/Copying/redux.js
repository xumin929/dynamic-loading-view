//测试用
const LOADING = 'redux/Specifications/LOADING';
const LOAD_SUCCESS = 'redux/Specifications/LOAD_SUCCESS';
const LOADING_FAIL = 'redux/Specifications/LOADING_FAIL';
//复制属性-保存
const COPY_LOADING = 'redux/Specifications/COPY_LOADING';
const COPY_SUCCESS = 'redux/Specifications/COPY_SUCCESS';
const COPY_FAIL = 'redux/Specifications/COPY_FAIL';
//获取类目所有属性
const SEARCH_ALL_LOADING = 'redux/Specifications/SEARCH_ALL_LOADING';
const SEARCH_ALL_SUCCESS = 'redux/Specifications/SEARCH_ALL_SUCCESS';
const SEARCH_ALL_FAIL = 'redux/Specifications/SEARCH_ALL_FAIL';
//获取类目所有信息
const ITEM_ALL_LOADING = 'redux/Specifications/ITEM_ALL_LOADING';
const ITEM_ALL_SUCCESS = 'redux/Specifications/ITEM_ALL_SUCCESS';
const ITEM_ALL_FAIL = 'redux/Specifications/ITEM_ALL_FAIL';
const ITEM_ALL_DATA = 'redux/Specifications/ITEM_ALL_DATA';
const initialState = {
  loading: false,
  allAttrData: [],
};
import{
  API_COPYPLATFORMCATEGORYATTRIBUTE,
  API_QUERYPLATFROMATTRIBUTELIST,
  API_GETCATEGORIESBYPLATFORMID,
}from '../../../modules/specifications/Container/API'
export default function (state = initialState, action = {}) {
  switch(action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result
      };
    case LOADING_FAIL:
      return {
        ...state,
        loading: false,
        username
      };
    //复制到 begin
    case COPY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COPY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        copydata: action.result
      };
    case COPY_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    //复制到finish

    //获取类目所有属性begin
    case SEARCH_ALL_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        searchData: action.result
      };
    case SEARCH_ALL_FAIL:
      return {
        ...state,
        loading: false,
        loaded:false
      };
    //获取类目所有属性finish
    //获取类目所有信息
    case ITEM_ALL_LOADING:
      return {
        ...state,
        loading: true,
        itemloaded: false
      };
    case ITEM_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        itemloaded: true,
        itemData: action.result
      };
    case ITEM_ALL_FAIL:
      return {
        ...state,
        loading: false,
        itemloaded:false
      };
    case ITEM_ALL_DATA:
      return {
        ...state,
        attrAllData: action.data
      }
    default:
      return state;
  }
}
export function isLoading(globalState){
  console.log('thisis a nuber');
  return {
    type: LOADING
  }
}

//复制到-保存
export function copySpecification(param){
  let paramJson={};
  //模拟数据
  var str = {
    "platformId": param.platformId,
    "targetCID": param.targetCID,
    "categoryAttributeLists": param.categoryAttributeLists
  }
  //转JSON
  //str = JSON.parse(JSON.stringify(str));
  //模拟finish
  paramJson.platformAttributeParam=JSON.stringify(str);
  return {
    types: [COPY_LOADING, COPY_SUCCESS, COPY_FAIL],
    promise: (client) => client.post(API_COPYPLATFORMCATEGORYATTRIBUTE,{
      //data: str
      data: paramJson
    })
  }
}

//查询类目所有属性 供复制到第二步获取数据
export function searchAllAttr(param){
  //模拟数据
  var str = '{"platformId":2,"cid":1000087}';
  str = JSON.parse(str);
  //模拟finish
  return {
    types: [SEARCH_ALL_LOADING, SEARCH_ALL_SUCCESS, SEARCH_ALL_FAIL],
    promise: (client) => client.get(API_QUERYPLATFROMATTRIBUTELIST,{
      params: param
    })
  }
}
//获得类目所有信息 供复制到第一步获取数据
export function searchAllITEM(param){
  var str = '{"platformId":2}';
  str = JSON.parse(str);
  return {
    types: [ITEM_ALL_LOADING, ITEM_ALL_SUCCESS, ITEM_ALL_FAIL],
    promise: (client) => client.get(API_GETCATEGORIESBYPLATFORMID,{
      params: param
    })
  }
}
export function attrStep1(data){
  return {
    type: ITEM_ALL_DATA,
    data: data
  }
}
