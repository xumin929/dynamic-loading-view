const VIEWGOODSANDMANAGE_LOADING = 'VIEWGOODSANDMANAGE_LOADING';
const VIEWGOODSANDMANAGE_SUCCESS = 'VIEWGOODSANDMANAGE_SUCCESS';
const VIEWGOODSANDMANAGE_FAIL = 'VIEWGOODSANDMANAGE_FAIL';

const GETPERFECT_GOODSMSG = 'GETPERFECT_GOODSMSG', GETPERFECT_GOODSMSG_SUCCESS = 'GETPERFECT_GOODSMSG_SUCCESS', GETPERFECT_GOODSMSG_FAIL = 'GETPERFECT_GOODSMSG_FAIL';


export default function(state = { loading: false }, action = {}) {
  switch (action.type) {

    case VIEWGOODSANDMANAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case VIEWGOODSANDMANAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case VIEWGOODSANDMANAGE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    case GETPERFECT_GOODSMSG:
      return {
        ...state,
      };
    case GETPERFECT_GOODSMSG_SUCCESS:
      return {
        ...state,
        shopInfoData: action.result.data,
      };
    case GETPERFECT_GOODSMSG_FAIL:
      return {
        ...state,
        error: action.msg
      };
    default:
      return state;
  }
}

//查询分组价
export function queryShopInfo (param) {
  return {
    types: [GETPERFECT_GOODSMSG, GETPERFECT_GOODSMSG_SUCCESS, GETPERFECT_GOODSMSG_FAIL],
    promise: (client) => client.get('/item/platform/shopItem/queryShopItemSkuLabelPrice', {
      params: param
    })
  }
}

export function searchGoods(param) {
  return {
    types: [VIEWGOODSANDMANAGE_LOADING, VIEWGOODSANDMANAGE_SUCCESS, VIEWGOODSANDMANAGE_FAIL],
    promise: (client) => client.get('item/platform/shopItem/queryShopItemListOnlyItemInfo', {
      params: param
    })
  };
}
