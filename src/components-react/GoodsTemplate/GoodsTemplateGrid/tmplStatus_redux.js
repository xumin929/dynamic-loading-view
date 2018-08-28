/**
 * Created by liurenpeng on 2018/7/30.
 */
const EDIT_TEMPLATE_STATUS_LOADING = 'EDIT_TEMPLATE_STATUS_LOADING';
const EDIT_TEMPLATE_STATUS_FAIL = 'EDIT_TEMPLATE_STATUS_FAIL';
const EDIT_TEMPLATE_STATUS_SUCCESS = 'EDIT_TEMPLATE_STATUS_SUCCESS';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case EDIT_TEMPLATE_STATUS_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case EDIT_TEMPLATE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case EDIT_TEMPLATE_STATUS_FAIL:
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

export function editTmplStatusAction (values) {
  return {
    types: [EDIT_TEMPLATE_STATUS_LOADING, EDIT_TEMPLATE_STATUS_SUCCESS, EDIT_TEMPLATE_STATUS_FAIL],
    promise: (client) => client.get('/item/platform/itemTmpl/disableOrEnableTmplStatus',{params:values})
  }
}
