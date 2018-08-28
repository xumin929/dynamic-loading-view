const BATCHSHEVLVESITEM_LOADING = 'BATCHSHEVLVESITEM_LOADING';
const BATCHSHEVLVESITEM_SUCCESS = 'BATCHSHEVLVESITEM_SUCCESS';
const BATCHSHEVLVESITEM_FAIL = 'BATCHSHEVLVESITEM_FAIL';

export default function (state = { loading: false }, action = {}) {
  switch (action.type) {

    case BATCHSHEVLVESITEM_LOADING:
      return {
        ...state,
        loading: true
      };
    case BATCHSHEVLVESITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case BATCHSHEVLVESITEM_FAIL:
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

export function batchShelves(param) {
  return {
    types: [BATCHSHEVLVESITEM_LOADING, BATCHSHEVLVESITEM_SUCCESS, BATCHSHEVLVESITEM_FAIL],
    promise: (client) => client.post('item/platform/shopItem/updateItembatchShelves', {
      data: param
    })
  }
}
