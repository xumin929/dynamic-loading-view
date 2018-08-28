/**
 * Created by huangxiao3 on 2017/3/15.
 */

//获取 地域-供应商-价格
const AREA_SUPPLY_PRICE_LOADING = '/item/itemPublish/queryAreaSupplySeller/LOADING'
const AREA_SUPPLY_PRICE_SUCCESS ='/item/itemPublish/queryAreaSupplySeller/SUCCESS'
const AREA_SUPPLY_PRICE_FAIL = '/item/itemPublish/queryAreaSupplySeller/FAIL'

const initialState = {
  loading: false,
};
export default function (state = initialState, action = {}) {
  switch(action.type) {
    //获取 地域-供应商-价格
    /*case AREA_SUPPLY_PRICE_LOADING:
      return {
        ...state,
        loading: true
      }*/
    case AREA_SUPPLY_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        address_loaded: true,
        data: action.result
      }
    case AREA_SUPPLY_PRICE_FAIL:
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
//获取 地域-供应商-价格
export function queryAreaSupplyerPrice(param) {
  /*var testParam={platformId:2,itemId:66,skuId:1005803}*/
  return {
    types: [ AREA_SUPPLY_PRICE_LOADING, AREA_SUPPLY_PRICE_SUCCESS, AREA_SUPPLY_PRICE_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/queryAreaSupplySeller', {params:param})
  }
}

