/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180116
 * @update:       20180116
 * @description:  查询用户
 * *********************************************/

const PROMULGATOR_PUBLISH_USER_SEARCH_LOADING = 'PROMULGATOR_PUBLISH_USER_SEARCH_LOADING';
const PROMULGATOR_PUBLISH_USER_FAIL = 'PROMULGATOR_PUBLISH_USER_FAIL';
const PROMULGATOR_PUBLISH_USER_SUCCESS = 'PROMULGATOR_PUBLISH_USER_SUCCESS';

export default function (state = {loading: false}, action = {}) {
  switch (action.type) {
    case PROMULGATOR_PUBLISH_USER_SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case PROMULGATOR_PUBLISH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case PROMULGATOR_PUBLISH_USER_FAIL:
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

export function queryPromulgatorAction(values) {
  return {
    types: [PROMULGATOR_PUBLISH_USER_SEARCH_LOADING, PROMULGATOR_PUBLISH_USER_SUCCESS, PROMULGATOR_PUBLISH_USER_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/queryPublishUser', {params: values})
  };
}
