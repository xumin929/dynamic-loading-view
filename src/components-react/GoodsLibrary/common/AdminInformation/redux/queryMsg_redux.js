/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180126
 * @update:       20180126
 * @description:  根据平台类目id查询销售规格
 * *********************************************/
/* **********  自定义组件  ********** */

const QUERY_LEFT_ATTR_LOADING = 'QUERY_LEFT_ATTR_LOADING';
const QUERY_LEFT_ATTR_FAIL = 'QUERY_LEFT_ATTR_FAIL';
const QUERY_LEFT_ATTR_SUCCESS = 'QUERY_LEFT_ATTR_SUCCESS';

const QUERY_LEFT_ATTR_LIST_SUCCESS = 'QUERY_LEFT_ATTR_LIST_SUCCESS';
const QUERY_LEFT_ATTR_LIST_FAIL = 'QUERY_LEFT_ATTR_LIST_FAIL';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case QUERY_LEFT_ATTR_LOADING:
      return {
        ...state,
      };
    case QUERY_LEFT_ATTR_SUCCESS:
      return {
        ...state,
        dataA: action.result
      };
    case QUERY_LEFT_ATTR_FAIL:
      return {
        ...state,
        error: action.msg
      };
    case QUERY_LEFT_ATTR_LIST_SUCCESS:
      return {
        ...state,
        dataB: action.result
      };
    case QUERY_LEFT_ATTR_LIST_FAIL:
      return {
        ...state,
        error: action.msg
      };
    default:
      return state
  }
}

export function queryLoginInfo(values) {
  return {
    types: [QUERY_LEFT_ATTR_LOADING, QUERY_LEFT_ATTR_SUCCESS, QUERY_LEFT_ATTR_FAIL],
    promise: (client) => client.get('/platform-passport/platform/Login/queryLoginInfo', {params: values},'','',true,true)
  };
}

export function queryAllAdminUser(values) {
  return {
    types: [QUERY_LEFT_ATTR_LOADING, QUERY_LEFT_ATTR_LIST_SUCCESS, QUERY_LEFT_ATTR_LIST_FAIL],
    promise: (client) => client.get('/platform-passport/user/queryAllAdminUser', {params: values},'','',true,true)
  };
}
