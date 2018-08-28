/****************************************************************
 * author:FengYan
 * date:2017-02-14
 * update:2017-02-18
 * description:brand detail redux
 ****************************************************************/
const CHECK = 'Branddetail/LOAD';
const CHECK_SUCCESS = 'Branddetail/LOAD_SUCCESS';
const CHECK_FAIL = 'Branddetail/LOAD_FAIL';

export function BrandDetailAction(data) {
  return {
    types: [CHECK, CHECK_SUCCESS, CHECK_FAIL],
    promise: (client) => client.get('/item/platform/brandController/getItemBrandInfo', {
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
