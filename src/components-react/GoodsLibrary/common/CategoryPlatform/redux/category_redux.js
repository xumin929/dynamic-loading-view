/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180119
 * @update:       20180119
 * @description:  根据检索条件查询商品列表
 * *********************************************/
/* **********  自定义组件  ********** */


const CATEGORIES_BY_PLATFORMID_LOADING = 'CATEGORIES_BY_PLATFORMID_LOADING';
const CATEGORIES_BY_PLATFORMID_FAIL = 'CATEGORIES_BY_PLATFORMID_FAIL';
const CATEGORIES_BY_PLATFORMID_SUCCESS = 'CATEGORIES_BY_PLATFORMID_SUCCESS';
const CATEGORIES_BY_PLATFORMID_HISTORY = 'CATEGORIES_BY_PLATFORMID_HISTORY';

export default function (state = {loading: false}, action = {}) {
  switch (action.type) {
    case CATEGORIES_BY_PLATFORMID_LOADING:
      return {
        ...state,
        loading: true
      };
    case CATEGORIES_BY_PLATFORMID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case CATEGORIES_BY_PLATFORMID_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    case CATEGORIES_BY_PLATFORMID_HISTORY:
      return {
        searchHistory: action.searchHistory
      };
    default:
      return state
  }
}

export function getCategoriesByParentIdAction(values) {
  return {
    types: [CATEGORIES_BY_PLATFORMID_LOADING, CATEGORIES_BY_PLATFORMID_SUCCESS, CATEGORIES_BY_PLATFORMID_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoriesByParentId', {params: values})
  };
}
