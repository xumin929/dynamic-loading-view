/**
 * Created by liurenpeng on 2018/8/1.
 */
const SAVE_TEMPLATE_CATEGORY_LOADING = 'SAVE_TEMPLATE_CATEGORY_LOADING';
const SAVE_TEMPLATE_CATEGORY_FAIL = 'SAVE_TEMPLATE_CATEGORY_FAIL';
const SAVE_TEMPLATE_CATEGORY_SUCCESS = 'SAVE_TEMPLATE_CATEGORY_SUCCESS';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case SAVE_TEMPLATE_CATEGORY_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case SAVE_TEMPLATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case SAVE_TEMPLATE_CATEGORY_FAIL:
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

export function saveTmplCategory (values) {
  return {
    types: [SAVE_TEMPLATE_CATEGORY_LOADING, SAVE_TEMPLATE_CATEGORY_SUCCESS, SAVE_TEMPLATE_CATEGORY_FAIL],
    promise: (client) => client.get('/item/platform/itemTmpl/adjustCids',{params:values})
  }
}
