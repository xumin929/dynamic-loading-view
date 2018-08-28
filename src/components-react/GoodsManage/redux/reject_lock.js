const ITEMREJECTORLOCK_LOADING = 'ITEMREJECTORLOCK_LOADING';
const ITEMREJECTORLOCK_SUCCESS = 'ITEMREJECTORLOCK_SUCCESS';
const ITEMREJECTORLOCK_FAIL = 'ITEMREJECTORLOCK_FAIL';

export default function (state = { loading: false }, action = {}) {
  switch (action.type) {

    case ITEMREJECTORLOCK_LOADING:
      return {
        ...state,
        loading: true
      };
    case ITEMREJECTORLOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case ITEMREJECTORLOCK_FAIL:
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

export function rejectOrLockItem(param) {
  return {
    types: [ITEMREJECTORLOCK_LOADING, ITEMREJECTORLOCK_SUCCESS, ITEMREJECTORLOCK_FAIL],
    promise: (client) => client.post('item/platform/shopItem/updateItemRejectOrLock', {
      data: param
    })
  }
}
