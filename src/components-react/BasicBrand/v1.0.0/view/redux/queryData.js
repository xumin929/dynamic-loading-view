const QUERY_BASE_BRAND_LOADING = 'QUERY_BASE_BRAND_LOADING';
const QUERY_BASE_BRAND_SUCCESS = 'QUERY_BASE_BRAND_SUCCESS';
const QUERY_BASE_BRAND_FAIL = 'QUERY_BASE_BRAND_FAIL';


export default function (state = {}, action = {}) {
    switch (action.type) {
        case QUERY_BASE_BRAND_LOADING:
            return {
                ...state,
            };
        case QUERY_BASE_BRAND_SUCCESS:
            return {
                ...state,
                data: action.result
            };
        case QUERY_BASE_BRAND_FAIL:
            return {
                ...state,
                error: action.msg
            };
        default:
            return state
    }
}


//店铺    添加时查询品牌
export function getShopBrandData(values,type) {
    // shop
    let url = '/shop-service/seller/shopBrand/getAuditBrandByCategoryId';
    // Platform
    if( type == '1'){
        url = '/item/platform/brandController/getBrandByCategoryId';
    }
    return {
        types: [QUERY_BASE_BRAND_LOADING, QUERY_BASE_BRAND_SUCCESS, QUERY_BASE_BRAND_FAIL],
        promise: (client) => client.get(url, {params: values})
    };
}


