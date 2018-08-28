/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180126
 * @update:       20180126
 * @description:  根据平台类目id查询销售规格
 * *********************************************/
/* **********  自定义组件  ********** */
const QUERY_BASE_ATTR_LOADING = 'QUERY_BASE_ATTR_LOADING';

const QUERY_BASE_ABCD_ATTR_FAIL = 'QUERY_BASE_ABCD_ATTR_FAIL';
const QUERY_BASE_ABCD_ATTR_SUCCESS = 'QUERY_BASE_ABCD_ATTR_SUCCESS';

const QUERY_BASE_ATTR_FAIL = 'QUERY_BASE_ATTR_FAIL';
const QUERY_BASE_ATTR_SUCCESS = 'QUERY_BASE_ATTR_SUCCESS';

const QUERY_BASE_ATTR_LIST_SUCCESS = 'QUERY_BASE_ATTR_LIST_SUCCESS';
const QUERY_BASE_ATTR_LIST_FAIL = 'QUERY_BASE_ATTR_LIST_FAIL';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case QUERY_BASE_ATTR_LOADING:
      return {
        ...state,
      };
    case QUERY_BASE_ATTR_SUCCESS:
      return {
        ...state,
        dataA: action.result
      };
    case QUERY_BASE_ATTR_FAIL:
      return {
        ...state,
        error: action.msg
      };
    case QUERY_BASE_ATTR_LIST_SUCCESS:
      return {
        ...state,
        dataB: action.result
      };
    case QUERY_BASE_ATTR_LIST_FAIL:
      return {
        ...state,
        error: action.msg
      };
    case QUERY_BASE_ABCD_ATTR_SUCCESS:
      return {
        ...state,
        dataC: action.result
      };
    case QUERY_BASE_ABCD_ATTR_FAIL:
      return {
        ...state,
        error: action.msg
      };
    default:
      return state
  }
}

//添加时查询品牌
export function getBrandByCategoryId(values) {
  return {
    types: [QUERY_BASE_ATTR_LOADING, QUERY_BASE_ATTR_SUCCESS, QUERY_BASE_ATTR_FAIL],
    promise: (client) => client.get('/item/platform/brandController/getBrandByCategoryId', {params: values},'','',true,true)
  };
}


//编辑时查询品牌
export function getBrandByCategoryIdOrItemId(values) {
  return {
    types: [QUERY_BASE_ATTR_LOADING, QUERY_BASE_ATTR_SUCCESS, QUERY_BASE_ATTR_FAIL],
    promise: (client) => client.get('/item/platform/brandController/getBrandInfoByCidOrItemId', {params: values},'','',true,true)
  };
}

//查询行业标签
export function getItemTagByCategory(values) {
  return {
    types: [QUERY_BASE_ATTR_LOADING, QUERY_BASE_ABCD_ATTR_SUCCESS,  QUERY_BASE_ABCD_ATTR_FAIL],
    promise: (client) => client.get('/item/platform/tags/getItemTagByCategory', {params: values},'','',true,true)
  };
}

//查询单位
export function queryUnitByCategoryId(values) {
  return {
    types: [QUERY_BASE_ATTR_LOADING, QUERY_BASE_ATTR_LIST_SUCCESS, QUERY_BASE_ATTR_LIST_FAIL],
    promise: (client) => client.get('item/platform/category/queryUnitByCategoryId', {params: values},'','',true,true)
  };
}
