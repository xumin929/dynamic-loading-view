/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180126
 * @update:       20180126
 * @description:  根据平台类目id查询销售规格
 * *********************************************/
/* **********  自定义组件  ********** */

const QUERY_SALE_ATTR_LOADING = 'QUERY_SALE_ATTR_LOADING';
const QUERY_SALE_ATTR_FAIL = 'QUERY_SALE_ATTR_FAIL';
const QUERY_SALE_ATTR_SUCCESS = 'QUERY_SALE_ATTR_SUCCESS';
const QUERY_SALE_ATTR_HISTORY = 'QUERY_SALE_ATTR_HISTORY';
const QUERY_SALE_ATTR_LIST_SUCCESS = 'QUERY_SALE_ATTR_LIST_SUCCESS';
const QUERY_SALE_ATTR_LIST_FAIL = 'QUERY_SALE_ATTR_LIST_FAIL';

export default function (state = {loading: false}, action = {}) {
  switch (action.type) {
    case QUERY_SALE_ATTR_LOADING:
      return {
        ...state,
        loading: true
      };
    case QUERY_SALE_ATTR_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case QUERY_SALE_ATTR_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    case QUERY_SALE_ATTR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        dataArr: action.result
      };
    case QUERY_SALE_ATTR_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    case QUERY_SALE_ATTR_HISTORY:
      return {
        searchHistory: action.searchHistory
      };
    default:
      return state
  }
}
/**
 * @desc 销售规格接口
 * @param {object} values  传参
 */
export function querySaleAttrAction(params, type) {
  // debugger;
  let values = JSON.parse(JSON.stringify(params || {}));
  // 平台标准库发布时
  let url = '/item/platform/categoryAttribute/querySaleAttr';
  // 平台标准库编辑回显, 店铺商品库编辑回显
  if(values.itemId){
    url = '/item-service/platform/categoryAttribute/querySaleAttribute';
    // 平台标准库查销售属性 编辑回显的时候， 加上参数platLibrary=true 才能回显出来“引力效应”
    if(!type || type != '1'){
      values.platLibrary=true;
    }
  }
  return {
    types: [QUERY_SALE_ATTR_LOADING, QUERY_SALE_ATTR_SUCCESS, QUERY_SALE_ATTR_FAIL],
    promise: (client) => client.get(url, {params: values},'','',true,true)
  };
}

/**
 * 规格参数接口，只有从平台标准库过来且是编辑状态时候，才会调用另一个接口
 * @param {object} values  传参
 * @param {string} [type = 1] 表示是从店铺商品库过来的
 * @param {string} itemId 可以用来标识是否是编辑回显
 */ 
export function queryPlatfromAttributeList(values, itemId, type) {
  // 平台标准库发布 & 店铺商品库编辑
  let url = '/item/platform/categoryAttribute/queryPlatfromAttributeList';
  // 平台标准库编辑回显时
  if(itemId && (!type || type != '1')){
    url = '/item/platform/categoryAttribute/queryAttributeList';
  }
  return {
    types: [QUERY_SALE_ATTR_LOADING, QUERY_SALE_ATTR_LIST_SUCCESS, QUERY_SALE_ATTR_LIST_FAIL],
    promise: (client) => client.get(url, {params: values},'','',true,true)
  };
}
