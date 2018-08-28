const SEARCHPRICEBYSKUID_LOADING = 'SEARCHPRICEBYSKUID_LOADING';
const SEARCHPRICEBYSKUID_SUCCESS = 'SEARCHPRICEBYSKUID_SUCCESS';
const SEARCHPRICEBYSKUID_FAIL = 'SEARCHPRICEBYSKUID_FAIL';

export default function (state = { loading: false }, action = {}) {
  switch (action.type) {

    case SEARCHPRICEBYSKUID_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEARCHPRICEBYSKUID_SUCCESS: 
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case SEARCHPRICEBYSKUID_FAIL:
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

export function searchPrice(param) {
  return {
    types: [SEARCHPRICEBYSKUID_LOADING, SEARCHPRICEBYSKUID_SUCCESS, SEARCHPRICEBYSKUID_FAIL],
    promise: (client) => client.get('item/platform/shopItem/shopItemSkuPrice', {
      params: param
    })
  }
}
