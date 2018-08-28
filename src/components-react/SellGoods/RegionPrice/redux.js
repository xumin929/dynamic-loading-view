/**
 * Created by zhanghaitian on 2017/2/24.
 */
const ADDRESS_LIST = 'supplier/queryProvinceAddress/LOAD';
const ADDRESS_LIST_SUCCESS = 'supplier/queryProvinceAddress/LOAD_SUCCESS';
const ADDRESS_LIST_FAIL = 'supplier/queryProvinceAddress/LOAD_FAIL';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case ADDRESS_LIST:
      return {

        ...state,
        loading: true
      }
    case ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      }
    case ADDRESS_LIST_FAIL:
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

export function getAddress () {
  return {
    types: [ ADDRESS_LIST, ADDRESS_LIST_SUCCESS, ADDRESS_LIST_FAIL],
    promise: (client) => client.get('/item/supplier/queryProvinceAddress')
  }
}