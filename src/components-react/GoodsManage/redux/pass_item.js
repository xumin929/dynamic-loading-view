const PASSITEMTODO_LOADING = 'PASSITEMTODO_LOADING';
const PASSITEMTODO_SUCCESS = 'PASSITEMTODO_SUCCESS';
const PASSITEMTODO_FAIL = 'PASSITEMTODO_FAIL';

export default function (state = { loading: false }, action = {}) {
  switch (action.type) {

    case PASSITEMTODO_LOADING:
      return {
        ...state,
        loading: true
      };
    case PASSITEMTODO_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case PASSITEMTODO_FAIL:
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

export function passItem(param) {
  return {
    types: [PASSITEMTODO_LOADING, PASSITEMTODO_SUCCESS, PASSITEMTODO_FAIL],
    promise: (client) => client.post('item/platform/shopItem/updateItempass', {
      data: param
    })
  }
}
