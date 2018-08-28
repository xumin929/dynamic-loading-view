/**
 * Created by liurenpeng on 2018/7/30.
 */
const ADD_TEMPLATE_LOADING = 'ADD_TEMPLATE_LOADING';
const ADD_TEMPLATE_FAIL = 'ADD_TEMPLATE_FAIL';
const ADD_TEMPLATE_SUCCESS = 'ADD_TEMPLATE_SUCCESS';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case ADD_TEMPLATE_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case ADD_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case ADD_TEMPLATE_FAIL:
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

export function addTmplAction (values) {
  return {
    types: [ADD_TEMPLATE_LOADING, ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAIL],
    promise: (client) => client.get('/item/platform/itemTmpl/saveTmpl',{params:values})
  }
}
