const BRAND = 'brand/grid/LOAD';
const BRAND_GET_SUCCESS = 'brand/grid/LOAD_GET_SUCCESS';
const BRAND_GET_FAIL = 'brand/grid/LOAD_GET_FAIL';
const BRAND_GETALL_SUCCESS = 'brand/grid/LOAD_GETALL_SUCCESS';
const BRAND_GETALL_FAIL = 'brand/grid/LOAD_GETALL_FAIL';
const BRAND_ADD_SUCCESS = 'brand/grid/LOAD_ADD_SUCCESS';
const BRAND_ADD_FAIL = 'brand/grid/LOAD_ADD_FAIL';
const BRAND_DELETE_SUCCESS = 'brand/grid/LOAD_DELETE_SUCCESS';
const BRAND_DELETE_FAIL = 'brand/grid/LOAD_DELETE_FAIL';


export default function (state = {loading:false}, action = {}) {
    switch (action.type) {
        case BRAND:
            return {
                ...state,
                loading: true
            };
        case BRAND_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result
            };
        case BRAND_GET_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.msg
            };
        case BRAND_GETALL_SUCCESS:
          return {
            ...state,
            loading: false,
            loaded: true,
            data: action.result
          };
        case BRAND_GETALL_FAIL:
          return {
            ...state,
            loading: false,
            loaded: false,
            error: action.msg
          };
        case BRAND_ADD_SUCCESS:
          return {
            ...state,
            loading: false,
            loaded: true,
            data: action.result
          };
        case BRAND_ADD_FAIL:
          return {
            ...state,
            loading: false,
            loaded: false,
            error: action.msg
          };
      case BRAND_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.result
        };
      case BRAND_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          loaded: false,
          error: action.msg
        };
        default:
            return state
    }
}


export function getBrandAll (platformId, categoryId) {
    return {
        types: [BRAND, BRAND_GETALL_SUCCESS, BRAND_GETALL_FAIL],
        promise: (client) => client.get('/item/platform/brandController/queryBrandByCategoryId',{params: {platformId, categoryId}})
    }
}

export function getBrand (platformId, categoryId) {
  return {
    types: [BRAND, BRAND_GET_SUCCESS, BRAND_GET_FAIL],
    promise: (client) => client.get('/item/platform/brandController/getBrandByCategoryId',{params: {platformId, categoryId}})
  }
}

export function Relation (platformId, uuid, categoryId, brandData) {
  return {
    types: [BRAND, BRAND_ADD_SUCCESS, BRAND_ADD_FAIL],
    promise: (client) => client.post('/item/platform/brandController/newInsertBrandOnCategory',{data: {platformId, uuid, categoryId, brandData}})
  }
}

export function Relieve (platformId, uuid, categoryId, brandId) {
  return {
    types: [BRAND, BRAND_DELETE_SUCCESS, BRAND_DELETE_FAIL],
    promise: (client) => client.post('/item/platform/brandController/newUpdateBrandOnCategory',{data: {platformId, uuid, categoryId, brandId}})
  }
}