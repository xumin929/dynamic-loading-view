/**
 * Created by huangxiao3 on 2017/2/24.
 */
const OPERATOR_SEARCH_LOADING = 'item/operatorSearch/OPERATOR_SEARCH_LOADING';
const OPERATOR_SEARCH_FAIL = 'item/operatorSearch/OPERATOR_SEARCH_FAIL';
const OPERATOR_SEARCH_SUCCESS = 'item/operatorSearch/OPERATOR_SEARCH_SUCCESS';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
/*    case OPERATOR_SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };*/
    case OPERATOR_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case OPERATOR_SEARCH_FAIL:
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

export function operatorSearch (values) {
  return {
    types: [OPERATOR_SEARCH_LOADING, OPERATOR_SEARCH_SUCCESS, OPERATOR_SEARCH_FAIL],
    promise: (client) => client.get('/platform-passport/user/queryAllAdminUser',{params:values})
  }
}
