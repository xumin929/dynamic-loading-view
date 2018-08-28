

const SALE_DELIVERY_SET_LOAD = 'SALE_DELIVERY_SET_LOAD';
const SALE_DELIVERY_SET_SUCCESS = 'SALE_DELIVERY_SET_SUCCESS';
const SALE_DELIVERY_SET_FAIL = 'SALE_DELIVERY_SET_FAIL';

export default function (state={},action={}){
    switch(action.type){
        case SALE_DELIVERY_SET_LOAD:
        return {
            ...state,
            loading: true
          };
        case SALE_DELIVERY_SET_SUCCESS:
            return {
              ...state,
              loading: false,
              loaded: true,
              data: action.result
            };
        case SALE_DELIVERY_SET_FAIL:
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

export function getDeliverySet (param) {
    return {
      types: [SALE_DELIVERY_SET_LOAD, SALE_DELIVERY_SET_SUCCESS, SALE_DELIVERY_SET_FAIL],
      promise: (client) => client.get('/shop-service/delivery/queryDeliveryFareTemplate', {params: param})
    };
  }