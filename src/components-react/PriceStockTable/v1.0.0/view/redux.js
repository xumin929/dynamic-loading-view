

const SALE_CUSTOMER_LABEL_LOAD = 'SALE_CUSTOMER_LABEL_LOAD';
const SALE_CUSTOMER_LABEL_SUCCESS = 'SALE_CUSTOMER_LABEL_SUCCESS';
const SALE_CUSTOMER_LABEL_FAIL = 'SALE_CUSTOMER_LABEL_FAIL';


const SALE_REGIONAL_PRICE_STOCK_LOAD = 'SALE_REGIONAL_PRICE_STOCK_LOAD';
const SALE_REGIONAL_PRICE_STOCK_SUCCESS = 'SALE_REGIONAL_PRICE_STOCK_SUCCESS';
const SALE_REGIONAL_PRICE_STOCK_FAIL = 'SALE_REGIONAL_PRICE_STOCK_FAIL';

const GETPERFECT_GOODSMSG = 'GETPERFECT_GOODSMSG', GETPERFECT_GOODSMSG_SUCCESS = 'GETPERFECT_GOODSMSG_SUCCESS', GETPERFECT_GOODSMSG_FAIL = 'GETPERFECT_GOODSMSG_FAIL';

export default function (state={},action={}){
    switch(action.type){
        case SALE_CUSTOMER_LABEL_LOAD:
        return {
            ...state,
            loading: true
          };
        case SALE_CUSTOMER_LABEL_SUCCESS:
            return {
              ...state,
              loading: false,
              loaded: true,
              data: action.result
            };
        case SALE_CUSTOMER_LABEL_FAIL:
            return {
              ...state,
              loading: false,
              loaded: true,
              error: action.msg
            };
        case SALE_REGIONAL_PRICE_STOCK_LOAD:
            return {
                ...state,
                loading: true
              };
        case SALE_REGIONAL_PRICE_STOCK_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  loaded: true,
                  data: action.result
                };
        case SALE_REGIONAL_PRICE_STOCK_FAIL:
                return {
                  ...state,
                  loading: false,
                  loaded: true,
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
            return state
    }
}

// export function getCustomerLabel (param) {
//     return {
//       types: [SALE_CUSTOMER_LABEL_LOAD, SALE_CUSTOMER_LABEL_SUCCESS, SALE_CUSTOMER_LABEL_FAIL],
//       promise: (client) => client.get('/shop/seller/customerlabel/queryCustomerLabelListByShopId', {params: param})
//     };
//   }

export function getRegionalPriceStock (param) {
    return {
      types: [SALE_REGIONAL_PRICE_STOCK_LOAD, SALE_REGIONAL_PRICE_STOCK_SUCCESS, SALE_REGIONAL_PRICE_STOCK_FAIL],
      promise: (client) => client.get('/shop/seller/addressRange/queryAllSellAreaForShop', {params: param})
    };
  }

//查询分组价
export function queryShopInfo (param) {
  return {
    types: [GETPERFECT_GOODSMSG, GETPERFECT_GOODSMSG_SUCCESS, GETPERFECT_GOODSMSG_FAIL],
    promise: (client) => client.get('/shop/seller/customerlabel/queryCustomerLabelListByShopId', {
      params: param
    })
  }
}