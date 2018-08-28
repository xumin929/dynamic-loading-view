/**
 * Created by liurenpeng on 2018/7/30.
 */
const CATEGORY_TMPLS_LOADING = 'CATEGORY_TMPLS_LOADING';
const CATEGORY_TMPLS_FAIL = 'CATEGORY_TMPLS_FAIL';
const CATEGORY_TMPLS_SUCCESS = 'CATEGORY_TMPLS_SUCCESS';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case CATEGORY_TMPLS_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case CATEGORY_TMPLS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case CATEGORY_TMPLS_FAIL:
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

export function queryCategoryTmpls (values) {
  return {
    types: [CATEGORY_TMPLS_LOADING, CATEGORY_TMPLS_SUCCESS, CATEGORY_TMPLS_FAIL],
    promise: (client) => client.get('/item/platform/itemTmpl/queryCategoryTmpls',{params:values})
  }
}
