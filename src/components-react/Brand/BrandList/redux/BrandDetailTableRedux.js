
const CHECK = 'BrandDetailTable/LOAD';
const CHECK_SUCCESS = 'BrandDetailTable/LOAD_SUCCESS';
const CHECK_FAIL = 'BrandDetailTable/LOAD_FAIL';

export function BrandDetailTableAction(data) {
  return {
    types: [CHECK, CHECK_SUCCESS, CHECK_FAIL],
    promise: (client) => client.get('/item/platform/brandController/getItemBrandCategoryInfo', {
      params: data
    })
  }
}
export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case CHECK:
      return {
        ...state,
        loading: true
    }
    case CHECK_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      data: action.result
  }
    case CHECK_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.msg
  }
    default:
    return state
  }
}
