

const SALE_REGIONAL_PRICE_LOAD = 'SALE_REGIONAL_PRICE_LOAD';
const SALE_REGIONAL_PRICE_SUCCESS = 'SALE_REGIONAL_PRICE_SUCCESS';
const SALE_REGIONAL_PRICE_FAIL = 'SALE_REGIONAL_PRICE_FAIL';

export default function (state={},action={}){
    switch(action.type){
        case SALE_REGIONAL_PRICE_LOAD:
        return {
            ...state,
            loading: true
          };
        case SALE_REGIONAL_PRICE_SUCCESS:
            return {
              ...state,
              loading: false,
              loaded: true,
              data: action.result
            };
        case SALE_REGIONAL_PRICE_FAIL:
            return {
              ...state,
              loading: false,
              loaded: true,
              error: action.msg
            };
        default:
            return state
    }
}

export function getRegionalPrice (param) {
    return {
      types: [SALE_REGIONAL_PRICE_LOAD, SALE_REGIONAL_PRICE_SUCCESS, SALE_REGIONAL_PRICE_FAIL],
      promise: (client) => client.get('/shop/seller/addressRange/queryAllSellAreaBySellerIdV2', {params: param})
    };
  }