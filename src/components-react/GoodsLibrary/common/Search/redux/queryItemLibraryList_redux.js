/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180116
 * @update:       20180116
 * @description:  根据检索条件查询商品列表
 * *********************************************/
/* **********  自定义组件  ********** */
const queryItemLibraryList = '/item/platform/itemLibrary/queryItemLibraryList';

const QUERY_LIBRARY_LIST_SEARCH_LOADING = 'QUERY_LIBRARY_LIST_SEARCH_LOADING';
const QUERY_LIBRARY_LIST_FAIL = 'QUERY_LIBRARY_LIST_FAIL';
const QUERY_LIBRARY_LIST_SUCCESS = 'QUERY_LIBRARY_LIST_SUCCESS';
const QUERY_LIBRARY_LIST_HISTORY = 'QUERY_LIBRARY_LIST_HISTORY';

export default function (state = {loading: false}, action = {}) {
  switch (action.type) {
    case QUERY_LIBRARY_LIST_SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case QUERY_LIBRARY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case QUERY_LIBRARY_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    case QUERY_LIBRARY_LIST_HISTORY:
      return {
        searchHistory: action.searchHistory
      };
    default:
      return state
  }
}

export function queryItemLibraryListAction(values) {
  return {
    types: [QUERY_LIBRARY_LIST_SEARCH_LOADING, QUERY_LIBRARY_LIST_SUCCESS, QUERY_LIBRARY_LIST_FAIL],
    promise: (client) => client.get(queryItemLibraryList, {params: values})
  };
}

export function setSearchHistoryAction(values) {
  return {
    type: QUERY_LIBRARY_LIST_HISTORY,
    searchHistory: values
  };
}
