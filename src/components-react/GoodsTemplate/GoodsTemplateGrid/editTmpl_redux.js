/**
 * Created by liurenpeng on 2018/7/30.
 */
const EDIT_TEMPLATE_NAME_LOADING = 'EDIT_TEMPLATE_NAME_LOADING';
const EDIT_TEMPLATE_NAME_FAIL = 'EDIT_TEMPLATE_NAME_FAIL';
const EDIT_TEMPLATE_NAME_SUCCESS = 'EDIT_TEMPLATE_NAME_SUCCESS';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case EDIT_TEMPLATE_NAME_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case EDIT_TEMPLATE_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case EDIT_TEMPLATE_NAME_FAIL:
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

export function editTmplNameAction (values) {
  return {
    types: [EDIT_TEMPLATE_NAME_LOADING, EDIT_TEMPLATE_NAME_SUCCESS, EDIT_TEMPLATE_NAME_FAIL],
    promise: (client) => client.get('/item/platform/itemTmpl/editTmpl',{params:values})
  }
}
