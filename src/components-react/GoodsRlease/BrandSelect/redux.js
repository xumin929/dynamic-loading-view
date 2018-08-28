/**
 * Created by huangxiao3 on 2017/2/18.
 */
const BRAND_SEARCH_LOADING = 'item/brandSearch/BRAND_SEARCH_LOADING';
const BRAND_SEARCH_FAIL = 'item/brandSearch/BRAND_SEARCH_FAIL';
const BRAND_SEARCH_SUCCESS = 'item/brandSearch/BRAND_SEARCH_SUCCESS';

const BRAND_SEARCH_BYCID_LOADING = 'item/brandSearch/BRAND_SEARCH_BYCID_LOADING';
const BRAND_SEARCH_BYCID_SUCCESS = 'item/brandSearch/BRAND_SEARCH_BYCID_FAIL';
const BRAND_SEARCH_BYCID_FAIL = 'item/brandSearch/BRAND_SEARCH_BYCID_SUCCESS';
const CLEAR_DATA = 'CLEAR_DATA';

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
    case CLEAR_DATA:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: {data:{result:[]}}
      };
    default:
      return state
  }
}

export function brandSearch (values, urlStyle) {
  let url = '';
  if(urlStyle){
    url = '/item/platform/brandController/getBrandByCategoryIdOrItemId';
  }else{
    url = '/item/platform/brandController/brandInfoTable';
  }
  return {
    types: [BRAND_SEARCH_LOADING, BRAND_SEARCH_SUCCESS, BRAND_SEARCH_FAIL],
    promise: (client) => client.get(url, {params:values})
  }
}
export function brandSearchByCid (values, urlStyle) {
  let url = '';
  if(urlStyle){
    url = '/item/platform/brandController/getBrandByCategoryIdOrItemId';
  }else{
    url = '/item/platform/brandController/getBrandByCategoryId';
  }
  return {
    types: [BRAND_SEARCH_LOADING, BRAND_SEARCH_SUCCESS, BRAND_SEARCH_FAIL],
    promise: (client) => client.get(url, {params:values})
  }
}
//清除所有数据
export function clearData (values) {
  return {
    type: CLEAR_DATA,
  }
}
