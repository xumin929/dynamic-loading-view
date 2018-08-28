/**
 * Created by huangxiao3
 */
const LOADING = 'redux/Specifications/LOADING';
const LOAD_SUCCESS = 'redux/Specifications/LOAD_SUCCESS';
const LOADING_FAIL = 'redux/Specifications/LOADING_FAIL';
//添加新属性
const ADD_LOADING = 'redux/Specifications/NEW_LOADING';
const ADD_SUCCESS = 'redux/Specifications/NEW_SUCCESS';
const ADD_FAIL = 'redux/Specifications/NEW_FAIL';

const initialState = {
  loading: false,
};
import{
    API_INSERTPLATFORMCATEGORYATTRIBUTE
} from '../../../modules/specifications/Container/API'
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
    //规格参数-新增类目属性
    case ADD_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        msg: action.result.msg,
        code: action.result.code,
      };
    case ADD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    //新增类目属性finish
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

export function inputCheck (inputValue) {
  inputValue = inputValue.replace(/\*/g,"");
  inputValue = inputValue.replace(/\?/g,"");
  inputValue = inputValue.replace(/\？/g,"");
  return encodeURI(inputValue);
}

//添加新属性
export function addNewSpecification(param){
  const platformId = param.platformId;
  let paramJson={};
  param.platformCategoryAttribute.attrName = inputCheck(param.platformCategoryAttribute.attrName);
  for(var i=0;i<param.keys.length;++i){
    var index = param.keys[i];
    //获取数据
    var name1='attrName-'+index;
    var name2='status-'+index;
    var attrTempData = {"attrValueName":"","platformId":platformId,"status":"1","sortNumber":''}
    //拼装进入数组
    attrTempData.attrValueName = inputCheck(param[name1]);
    attrTempData.status = param[name2];
    attrTempData.sortNumber = i+1;
    param.platformCategoryAttribute.platformCategoryAttributeValues.push(attrTempData);
    //删除多余数据
    delete param[name1];
    delete param[name2];
  }
  //删除无用数据
  delete param.keys;
  paramJson.platformAttributeParam=JSON.stringify(param);
  return {
    types: [ADD_LOADING, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post(API_INSERTPLATFORMCATEGORYATTRIBUTE,{data:paramJson})
    /*promise: (client) => client.get('/platformCategoryAttributeController/insertPlatformCategoryAttribute',{params:param})*/
    /*promise: (client) => client.get('/new.json?oo',{params:param})*/
  }
}
