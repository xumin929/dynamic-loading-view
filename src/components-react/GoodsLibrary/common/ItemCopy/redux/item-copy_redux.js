
const QUERY_BASE_ATTR_LOADING = 'QUERY_BASE_ATTR_LOADING';
const QUERY_BASE_ATTR_LIST_SUCCESS = 'QUERY_BASE_ATTR_LIST_SUCCESS';
const QUERY_BASE_ATTR_LIST_FAIL = 'QUERY_BASE_ATTR_LIST_FAIL';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case QUERY_BASE_ATTR_LOADING:
      return {
        ...state,
      };
    case QUERY_BASE_ATTR_LIST_SUCCESS:
      return {
        ...state,
        dataB: action.result
      };
    case QUERY_BASE_ATTR_LIST_FAIL:
      return {
        ...state,
        error: action.msg
      };
    default:
      return state
  }
}

//添加时查询品牌
export function insertCopyItemPublish(values) {
  return {
    types: [QUERY_BASE_ATTR_LOADING, QUERY_BASE_ATTR_LIST_SUCCESS, QUERY_BASE_ATTR_LIST_FAIL],
    promise: (client) => client.get('/item/platform/itemLibrary/insertCopyItemPublish', {params: values},'','',true,true)
  };
}
