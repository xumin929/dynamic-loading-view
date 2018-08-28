/**
 * Created by huangxiao3 on 2017/6/19.
 */
/**
 * Created by huangxiao3 on 2017/2/18.
 */
const BRAND_SEARCH_LOADING = 'item/brandSearch/BRAND_SEARCH_LOADING';
const BRAND_SEARCH_FAIL = 'item/brandSearch/BRAND_SEARCH_FAIL';
const BRAND_SEARCH_SUCCESS = 'item/brandSearch/BRAND_SEARCH_SUCCESS';

const BRAND_SEARCH_BYCID_LOADING = 'item/brandSearch/BRAND_SEARCH_BYCID_LOADING';
const BRAND_SEARCH_BYCID_SUCCESS = 'item/brandSearch/BRAND_SEARCH_BYCID_FAIL';
const BRAND_SEARCH_BYCID_FAIL = 'item/brandSearch/BRAND_SEARCH_BYCID_SUCCESS';

const QUERY_BRAND_SEARCH_LOADING = 'item/brandSearch/QUERY_BRAND_SEARCH_LOADING';
const QUERY_BRAND_SEARCH_SUCCESS = 'item/brandSearch/QUERY_BRAND_SEARCH_SUCCESS';
const QUERY_BRAND_SEARCH_FAIL = 'item/brandSearch/QUERY_BRAND_SEARCH_FAIL';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    /*case BRAND_SEARCH_LOADING:
     return {
     ...state,
     loading: true
     };*/
    case BRAND_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case BRAND_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    /*case BRAND_SEARCH_LOADING:
     return {
     ...state,
     loading: true
     };*/
    case BRAND_SEARCH_BYCID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case BRAND_SEARCH_BYCID_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
      /*case QUERY_BRAND_SEARCH_LOADING:
     return {
     ...state,
     loading: true
     };*/
      case QUERY_BRAND_SEARCH_SUCCESS:
          return {
              ...state,
              loading: false,
              loaded: true,
              data: action.result
          };
      case QUERY_BRAND_SEARCH_FAIL:
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

export function brandSearch (values) {
  return {
    types: [BRAND_SEARCH_LOADING, BRAND_SEARCH_SUCCESS, BRAND_SEARCH_FAIL],
    promise: (client) => client.get('/item/platform/brandController/brandInfoTable',{params:values})
  }
}
export function brandSearchByCid (values) {
  return {
    types: [BRAND_SEARCH_LOADING, BRAND_SEARCH_SUCCESS, BRAND_SEARCH_FAIL],
    promise: (client) => client.get('/item/platform/brandController/getBrandByCategoryId',{params:values})
  }
}

export function queryBrand (values) {
    return {
        types: [QUERY_BRAND_SEARCH_LOADING, QUERY_BRAND_SEARCH_SUCCESS, QUERY_BRAND_SEARCH_FAIL],
        promise: (client) => client.get('/item/platform/brandController/queryItembrand',{params:values})
    }
}