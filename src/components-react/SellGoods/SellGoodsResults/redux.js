/**
 * Created by huangxiao3 on 2017/3/2.
 */

const UPDATE_LOADING = 'item/itemPublish/updateItembatchShelves/UPDATE_LOADING';
const UPDATE_SUCCESS = 'item/itemPublish/updateItembatchShelves/UPDATE_SUCCESS';
const UPDATE_FAIL = 'item/itemPublish/updateItembatchShelves/UPDATE_FAIL';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    /*    case UPDATE_LOADING:
     return {
     ...state,
     };*/
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case UPDATE_FAIL:
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

export function updateItembatchShelves (values) {
  return {
    types: [UPDATE_LOADING, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/updateItembatchShelves',{params:values})
  }
}