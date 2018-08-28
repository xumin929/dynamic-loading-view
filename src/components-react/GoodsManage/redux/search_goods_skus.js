const VIEW_GOODS_SKU_MANAGE_LOADING = 'VIEW_GOODS_SKU_MANAGE_LOADING';
const VIEW_GOODS_SKU_MANAGE_SUCCESS = 'VIEW_GOODS_SKU_MANAGE_SUCCESS';
const VIEW_GOODS_SKU_MANAGE_FAIL = 'VIEW_GOODS_SKU_MANAGE_FAIL';

export default function(state = { loading: false }, action = {}) {
  switch (action.type) {
    case VIEW_GOODS_SKU_MANAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case VIEW_GOODS_SKU_MANAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case VIEW_GOODS_SKU_MANAGE_FAIL:
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

export function searchGoodsSkus(param) {
  return {
    types: [VIEW_GOODS_SKU_MANAGE_LOADING, VIEW_GOODS_SKU_MANAGE_SUCCESS, VIEW_GOODS_SKU_MANAGE_FAIL],
    promise: (client) => client.get('item/platform/shopItem/querySaleItemListOnlySkuInfo', {
      params: param
    })
  };
}
