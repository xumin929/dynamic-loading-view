const BRAND_SEARCH_LOADING = 'item/brandSearch/BRAND_SEARCH_LOADING';
const BRAND_SEARCH_FAIL = 'item/brandSearch/BRAND_SEARCH_FAIL';
const BRAND_SEARCH_SUCCESS = 'item/brandSearch/BRAND_SEARCH_SUCCESS';
const BRAND_SEARCH_FORM_VALUE = 'item/brandSearch/BRAND_SEARCH_FORM_VALUE';

export default function (state = {loading: false}, action = {}) {
  switch (action.type) {
    case BRAND_SEARCH_LOADING:
      return {
        ...state,
        loading: true
      };
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
    case BRAND_SEARCH_FORM_VALUE:
      return {
        ...state,
        brandSearchFormValues: action.result
      };
    default:
      return state
  }
}

export function brandSearch(values) {
  return {
    types: [BRAND_SEARCH_LOADING, BRAND_SEARCH_SUCCESS, BRAND_SEARCH_FAIL],
    promise: (client) => client.get('/item/platform/brandController/brandInfoTable', {params: values})
  }
}

export function setFormValues(values) {
  return {
    type: BRAND_SEARCH_FORM_VALUE,
    result: values
  }
}