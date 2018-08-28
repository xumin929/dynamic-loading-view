/**
 * Created by liurenpeng on 2018/7/30.
 */
const ADD_MODULE_LOADING = 'ADD_MODULE_LOADING';
const ADD_MODULE_FAIL = 'ADD_MODULE_FAIL';
const ADD_MODULE_SUCCESS = 'ADD_MODULE_SUCCESS';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case ADD_MODULE_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case ADD_MODULE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case ADD_MODULE_FAIL:
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

export function addModuleAction (values) {
  return {
    types: [ADD_MODULE_LOADING, ADD_MODULE_SUCCESS, ADD_MODULE_FAIL],
    promise: (client) => client.get('/module-manage-service/feign/resource/addResource',{params:values})
  }
}
