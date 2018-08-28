const SALEITEM_LOADING = 'SALEITEM/SALEITEM_LOADING'
const SALEITEM_SUCCESS = 'SALEITEM/SALEITEM_QUEYRALL';
const SALEITEM_FAIL = 'SALEITEM/SALEITEM_FAIL'

const SALEITEM_BATCHSHELVES = 'SALEITEM/SALEITEM_BATCHSHELVES'

const SALEITEMSKU_SUCCESS = 'SALEITEMSKU/SALEITEMSKU_SUCCESS';
const SALEITEMSKU_LOADING = 'SALEITEMSKU/SALEITEMSKU_LOADING';
const SALEITEMSKU_FAIL = 'SALEITEMSKU/SALEITEMSKU_FAIL';

export default function(state={loading:false},action={}) {
  switch (action.type) {
    case SALEITEM_LOADING:
      return{
        ...state,
        loading: true,
        loaded: false
      }

    case SALEITEM_SUCCESS:
      return{
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      }

    case SALEITEM_BATCHSHELVES:
      return{
        ...state,
        loading: false,
        loaded: true,
        bsData: action.result
      }

    case SALEITEMSKU_LOADING:
      return{
        ...state,
        loading: true,
        loaded: false
      }
    case SALEITEMSKU_SUCCESS:
      return{
        ...state,
        loading: false,
        loaded: true,
        skuData: action.result
      }
    case SALEITEMSKU_FAIL:
      return{
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };

    case SALEITEM_FAIL:
      return{
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    default:
      return state
  }
}


export function querySaleItemList(values) {
  return{
    types: [SALEITEM_LOADING, SALEITEM_SUCCESS, SALEITEM_FAIL],
    promise: (client)=>client.get('/item/platform/itemPublish/querySaleItemListWithoutSkus',{params:values})
  }
}
// /item/platform/itemPublish/querySaleItemSkuListByAsync
export function querySaleItemSku(values) {
  return{
    types: [SALEITEMSKU_LOADING, SALEITEMSKU_SUCCESS, SALEITEMSKU_FAIL],
    promise: (client)=>client.get('/item/platform/itemPublish/querySaleItemSkuListByAsync',{params:values})
  }
}

export function updateItembatchShelves(values){
  return{
    types: [SALEITEM_LOADING, SALEITEM_BATCHSHELVES, SALEITEM_FAIL],
    promise: (client)=>client.get('/item/platform/itemPublish/updateItembatchShelves',{params:values})
  }
}