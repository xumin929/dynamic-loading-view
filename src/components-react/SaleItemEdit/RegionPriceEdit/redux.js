/**
 * Created by huangxiao3 on 2017/3/1.
 */

//查询省
const ADDRESS_LIST_LOADING = 'supplier/queryProvinceAddress/LOADING';
const ADDRESS_LIST_SUCCESS = 'supplier/queryProvinceAddress/LOAD_SUCCESS';
const ADDRESS_LIST_FAIL = 'supplier/queryProvinceAddress/LOAD_FAIL';

//获取初始信息
const INITIAL_LIST_LOADING = 'supplier/INITIAL_LIST_LOADING/LOADING';
const INITIA_LIST_SUCCESS = 'supplier/INITIAL_LIST_LOADING/LOAD_SUCCESS';
const INITIA_LIST_FAIL = 'supplier/INITIAL_LIST_LOADING/LOAD_FAIL';

const initialState = {
  loading: false,
};
export default function (state = initialState, action = {}) {
  switch(action.type) {
    //查询省
    case ADDRESS_LIST_LOADING:
     return {
     ...state,
     loading: true
     }
    case ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        address_loaded: true,
        data: action.result.data
      }
    case ADDRESS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      }
    //获取初始信息
    /*case ADDRESS_LIST_LOADING:
     return {
     ...state,
     loading: true
     }*/
    case INITIA_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        initail_loaded: true,
        initialdata: action.result.data
      }
    case INITIA_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      }

    default:
      return state;
  }
}
//获取省份信息
export function queryAddress(param) {
  return {
    types: [ ADDRESS_LIST_LOADING, ADDRESS_LIST_SUCCESS, ADDRESS_LIST_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/queryDistrictPrice', {params:param})
    /*promise: (client) => client.get('/item/item/address/queryAddressListByCode', {params:{addressCode:0,platformId:2}})*/
  }
}

export function queryInitialData (values) {
  return {
    types: [ INITIAL_LIST_LOADING, INITIA_LIST_SUCCESS, INITIA_LIST_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/queryAreaMarketPrice', {params:values})
  }
}
