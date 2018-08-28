/**
 * Created by huangxiao3 on 2017/2/27.
 */

const QUERY_LOADING = 'redux/SaleItemInfo/QUERY_LOADING';
const QUERY_SUCCESS = 'redux/SaleItemInfo/QUERY_SUCCESS';
const QUERY_FAIL = 'redux/SaleItemInfo/QUERY_FAIL';

const initialState = {
  loading: false,
};
export default function (state = initialState, action = {}) {
  switch(action.type) {
    //查询priceinfo
    case QUERY_LOADING:
      return {
        ...state,
        loading: true,
        loaded:false,
      };
    case QUERY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        msg: action.result.msg,
        code: action.result.code,
      };

    case QUERY_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    default:
      return state;
  }
}


//查询所有信息
export function querySaleItem(param){
  return {
    types: [QUERY_LOADING, QUERY_SUCCESS, QUERY_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/querySaleItemInfoPrice',{params:param})
    /*promise: (client) => client.get('/querySaleItemInfoPrice2',{params:param})*/
  }
}
