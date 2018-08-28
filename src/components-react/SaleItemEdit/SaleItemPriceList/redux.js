/**
 * Created by huangxiao3 on 2017/3/1.
 */

//查询省
const ADDRESS_LIST_LOADING = 'supplier/queryProvinceAddress/LOADING';
const ADDRESS_LIST_SUCCESS = 'supplier/queryProvinceAddress/LOAD_SUCCESS';
const ADDRESS_LIST_FAIL = 'supplier/queryProvinceAddress/LOAD_FAIL';

//保存价格信息
const SAVE_PRICE_LOADING = 'itemPublish/insertItemMarketPrice/SAVE_PRICE_LOADING';
const SAVE_PRICE_SUCCESS = 'itemPublish/insertItemMarketPrice/SAVE_PRICE_SUCCESS';
const SAVE_PRICE_FAIL = 'itemPublish/insertItemMarketPrice/SAVE_PRICE_FAIL';

//平台价格查看
const PLAT_PRICE_LOADING = 'itemPublish/queryAreaMarketPrice/PLAT_PRICE_LOADING';
const PLAT_PRICE_SUCCESS = 'itemPublish/queryAreaMarketPrice/PLAT_PRICE_SUCCESS';
const PLAT_PRICE_FAIL = 'itemPublish/queryAreaMarketPrice/PLAT_PRICE_FAIL';

//供应商价格查看
const SUPPLY_PRICE_LOADING = 'itemPublish/queryAreasupplyPrice/SUPPLY_PRICE_LOADING';
const SUPPLY_PRICE_SUCCESS = 'itemPublish/queryAreasupplyPrice/SUPPLY_PRICE_SUCCESS';
const SUPPLY_PRICE_FAIL = 'itemPublish/queryAreasupplyPrice/SUPPLY_PRICE_FAIL';

const initialState = {
  loading: false,
};
export default function (state = initialState, action = {}) {
  switch(action.type) {
    //查询省
    /*case ADDRESS_LIST_LOADING:
     return {
     ...state,
     loading: true
     }*/
    case ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        area: action.result.data
      }
    case ADDRESS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      }

    //保存价格信息
    case SAVE_PRICE_LOADING:
      return {
        ...state,
        loading: true
      }
    case SAVE_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        area: action.result.data
      }
    case SAVE_PRICE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      }


    //平台价格查看
    /*case PLAT_PRICE_LOADING:
     return {
     ...state,
     loading: true
     }*/
    case PLAT_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        platprice: action.result.data
      }
    case PLAT_PRICE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      }

    //供应商价格查看
    /*case SUPPLY_PRICE_LOADING:
     return {
     ...state,
     loading: true
     }*/
    case SUPPLY_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        supplyprice: action.result.data
      }
    case SUPPLY_PRICE_FAIL:
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
export function queryAddress() {
  return {
    types: [ ADDRESS_LIST_LOADING, ADDRESS_LIST_SUCCESS, ADDRESS_LIST_FAIL],
    promise: (client) => client.get('/base/address/queryAddressListByCode', {params:{addressCode:0,platformId:2}})
  }
}
//保存所有数据
export function savePriceInfo(param) {
  if(param.salePriceType==1 || param.salePriceType==2){
    param.advancePercent=0;
  }else{
    param.advancePercent = parseInt(param.advancePercent);
  }

  var paramJson = "salePriceType="+JSON.stringify(param.salePriceType)+"&tradeItemSkuPriceListVo="+JSON.stringify(param.tradeItemSkuPriceListVo)+"&advancePercent="+JSON.stringify(param.advancePercent);
  console.log('str is',paramJson);
  return {
    types: [ SAVE_PRICE_LOADING, SAVE_PRICE_SUCCESS, SAVE_PRICE_FAIL],
    promise: (client) => client.post('/item/platform/itemPublish/insertItemMarketPrice',{data:paramJson})
  }
}

//运营商地域价
export function getPlatformPrice(param) {
  return {
    types: [ PLAT_PRICE_LOADING, PLAT_PRICE_SUCCESS, PLAT_PRICE_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/queryAreaMarketPrice', {params:param})
  }
}

//供货商地域价
export function getSuppluPrice(param) {
  return {
    types: [ SUPPLY_PRICE_LOADING, SUPPLY_PRICE_SUCCESS, SUPPLY_PRICE_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/queryAreasupplyPrice', {params:param})
  }
}
