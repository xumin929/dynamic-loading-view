/**
 * 其他设置/配送设置/商品运费模板 redux
 * 只有店铺有这个需求，供应商和运营平台不需要
 * 
 * 编辑状态下，销售信息表格组件的列根据哪个模板进行校验
 * 对比总数据源中 运费模板 是哪个类型
 * "calcRule":3 -- 按体积校验
 * "calcRule":2 -- 按件数校验
 * "calcRule":1 -- 按重量校验
 */

 // 查询单位
const TEMP_LOAD = 'TEMP_LOAD';
const TEMP_LOAD_SUCCESS = 'TEMP_LOAD_SUCCESS';
const TEMP_LOAD_FAIL = 'TEMP_LOAD_FAIL';

export default function (state = { temp_loaded: false }, action = {}) {
    switch (action.type) {
        case TEMP_LOAD:
            return {
                ...state,
                temp_loading: true
            };
        case TEMP_LOAD_SUCCESS:
            return {
                ...state,
                data: action.result && action.result.data && action.result.data.shopFareTemplateForItemVo || [],
                temp_loading: false,
                temp_loaded: true
            };
        case TEMP_LOAD_FAIL:
            return {
                ...state,
                temp_loading: false,
                temp_loaded: false,
                temp_error: action.error
            };
        default:
            return state;
    }
}

export function queryDeliveryFareTemplate(params) {
    return {
        types: [TEMP_LOAD, TEMP_LOAD_SUCCESS, TEMP_LOAD_FAIL],
        promise: (client) => client.get('/shop-service/delivery/queryDeliveryFareTemplate', { params: params })
    };
}

