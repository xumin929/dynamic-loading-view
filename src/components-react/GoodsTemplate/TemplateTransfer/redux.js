/**
 * Created by liurenpeng on 2018/8/1.
 */
const GET_CAREGORY_LIST_LOADING = 'GET_CAREGORY_LIST_LOADING';
const GET_CAREGORY_LIST_FAIL = 'GET_CAREGORY_LIST_FAIL';
const GET_CAREGORY_LIST_SUCCESS = 'GET_CAREGORY_LIST_SUCCESS';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case GET_CAREGORY_LIST_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case GET_CAREGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case GET_CAREGORY_LIST_FAIL:
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

export function getCategoryListAction (values) {
  return {
    types: [GET_CAREGORY_LIST_LOADING, GET_CAREGORY_LIST_SUCCESS, GET_CAREGORY_LIST_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoriesByPlatformId',{params:values})
  }
}
