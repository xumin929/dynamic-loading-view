const SEARCHGOODSBRAND_LOADING = 'SEARCHGOODSBRAND_LOADING';
const SEARCHGOODSBRAND_SUCCESS = 'SEARCHGOODSBRAND_SUCCESS';
const SEARCHGOODSBRAND_FAIL = 'SEARCHGOODSBRAND_FAIL';

export default function (state = { loading: false }, action = {}) {
  switch (action.type) {

    case SEARCHGOODSBRAND_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEARCHGOODSBRAND_SUCCESS:  
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case SEARCHGOODSBRAND_FAIL:
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

export function searchBrand(param) {
  return {
    types: [SEARCHGOODSBRAND_LOADING, SEARCHGOODSBRAND_SUCCESS, SEARCHGOODSBRAND_FAIL],
    promise: (client) => client.get('item/platform/brandController/getBrandByCategoryId', {
      params: param
    })
  }
}
