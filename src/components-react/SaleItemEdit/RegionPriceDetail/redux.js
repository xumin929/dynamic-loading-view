/**
 * Created by huangxiao3 on 2017/3/16.
 */

//获取初始信息
const INITIAL_LIST_LOADING = 'supplier/INITIAL_LIST_LOADING/LOADING';
const INITIA_LIST_SUCCESS = 'supplier/INITIAL_LIST_LOADING/LOAD_SUCCESS';
const INITIA_LIST_FAIL = 'supplier/INITIAL_LIST_LOADING/LOAD_FAIL';

const initialState = {
  loading: false,
};
export default function (state = initialState, action = {}) {
  switch(action.type) {
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
        data: action.result.data
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

export function queryInitialData (values) {
  return {
    types: [ INITIAL_LIST_LOADING, INITIA_LIST_SUCCESS, INITIA_LIST_FAIL],
    promise: (client) => client.get('item/platform/itemPublish/queryAreaMarketPrice', {params:values})
  }
}
