/**
 * Created by liurenpeng on 2018/8/1.
 */
const CATEGORY_TREE_LOADING = 'CATEGORY_TREE_LOADING';
const CATEGORY_TREE_FAIL = 'CATEGORY_TREE_FAIL';
const CATEGORY_TREE_SUCCESS = 'CATEGORY_TREE_SUCCESS';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case CATEGORY_TREE_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case CATEGORY_TREE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case CATEGORY_TREE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    default:
      return state
  }
}

export function queryCategoryTree (values) {
  return {
    types: [CATEGORY_TREE_LOADING, CATEGORY_TREE_SUCCESS, CATEGORY_TREE_FAIL],
    promise: (client) => client.get('/item/platform/itemTmpl/queryTmplCategoryTree',{params:values})
  }
}