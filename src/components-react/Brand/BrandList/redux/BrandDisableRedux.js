/****************************************************************
 * author:FengYan
 * date:2017-02-14
 * update:2017-02-19
 * description:brand disable redux
 ****************************************************************/
const CHECK = 'BrandDisable/LOAD';
const CHECK_SUCCESS = 'BrandDisable/LOAD_SUCCESS';
const CHECK_FAIL = 'BrandDisable/LOAD_FAIL';

export function BrandDisableAction(data) {
  return {
    types: [CHECK, CHECK_SUCCESS, CHECK_FAIL],
    promise: (client) => client.post('/item/platform/brandController/disableOrEnableBrand', {
      data:data
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
