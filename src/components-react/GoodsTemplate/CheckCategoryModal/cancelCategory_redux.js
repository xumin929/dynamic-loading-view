/**
 * Created by liurenpeng on 2018/7/30.
 */
const CANCEL_CATEGORY_LOADING = 'CANCEL_CATEGORY_LOADING';
const CANCEL_CATEGORY_FAIL = 'CANCEL_CATEGORY_FAIL';
const CANCEL_CATEGORY_SUCCESS = 'CANCEL_CATEGORY_SUCCESS';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case CANCEL_CATEGORY_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case CANCEL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case CANCEL_CATEGORY_FAIL:
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

export function cancelCategoryTmpls (values) {
  return {
    types: [CANCEL_CATEGORY_LOADING, CANCEL_CATEGORY_SUCCESS, CANCEL_CATEGORY_FAIL],
    promise: (client) => client.get('/item/platform/itemTmpl/cancelCategoryTmpl',{params:values})
  }
}
