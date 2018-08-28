// 查询单位
const SKUUNIT_LOAD = 'SKUUNIT_LOAD';
const SKUUNIT_LOAD_SUCCESS = 'SKUUNIT_LOAD_SUCCESS';
const SKUUNIT_LOAD_FAIL = 'SKUUNIT_LOAD_FAIL';

export default function (state = { skuUnit_loaded: false }, action = {}) {
    switch (action.type) {
        case SKUUNIT_LOAD:
            return {
                ...state,
                skuUnit_loading: true
            };
        case SKUUNIT_LOAD_SUCCESS:
            return {
                ...state,
                data: action.result.data || [],
                skuUnit_loading: false,
                skuUnit_loaded: true
            };
        case SKUUNIT_LOAD_FAIL:
            return {
                ...state,
                skuUnit_loading: false,
                skuUnit_loaded: false,
                skuUnit_error: action.error
            };
        default:
            return state;
    }
}

export function querySkuUnit(params, type) {
    let url = '/item/seller/category/queryUnitByCategoryId';// shop
    if (type == '0' || type == '1') {
        url = '/item/platform/category/queryUnitByCategoryId'; // 运营平台
    }
    return {
        types: [SKUUNIT_LOAD, SKUUNIT_LOAD_SUCCESS, SKUUNIT_LOAD_FAIL],
        promise: (client) => client.get(url, { params: params })
    };
}

