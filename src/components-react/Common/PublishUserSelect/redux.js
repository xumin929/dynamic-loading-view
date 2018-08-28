/**
 * Created by huangxiao3 on 2017/2/24.
 */
const PUBLISH_USER_SEARCH_LOADING = 'item/publishUserSearch/PUBLISH_USER_SEARCH_LOADING';
const PUBLISH_USER_FAIL = 'item/publishUserSearch/PUBLISH_USER_FAIL';
const PUBLISH_USER_SUCCESS = 'item/publishUserSearch/PUBLISH_USER_SUCCESS';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
/*    case PUBLISH_USER_SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };*/
    case PUBLISH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case PUBLISH_USER_FAIL:
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

export function publishUserSearch (values) {
  return {
    types: [PUBLISH_USER_SEARCH_LOADING, PUBLISH_USER_SUCCESS, PUBLISH_USER_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/queryPublishUser',{params:values})
  }
}
