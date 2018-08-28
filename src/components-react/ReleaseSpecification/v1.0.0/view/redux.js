/**
 * Created by huangxiao3 on 2018/8/3.
 */
//http://shop.b2b-v2-pre2.jcloudec.com/proxy/item/seller/categoryAttribute/queryPlatfromAttributeList?_=1533280858348
const QUERY_ATTRIBUTE_BY_CATEGORY_LOADING = 'QUERY_ATTRIBUTE_BY_CATEGORY_LOADING';
const QUERY_ATTRIBUTE_BY_CATEGORY_SUCCESS = 'QUERY_ATTRIBUTE_BY_CATEGORY_SUCCESS';
const QUERY_ATTRIBUTE_BY_CATEGORY_FAIL = 'QUERY_ATTRIBUTE_BY_CATEGORY_FAIL';

export default function (state={},action={}){
    switch(action.type){
        case QUERY_ATTRIBUTE_BY_CATEGORY_LOADING:
            return {
                ...state,
                loading: true
            };
        case QUERY_ATTRIBUTE_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result
            };
        case QUERY_ATTRIBUTE_BY_CATEGORY_FAIL:
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

export function getAttributeByCategoryIdForShop (param) {
    return {
        types: [QUERY_ATTRIBUTE_BY_CATEGORY_LOADING, QUERY_ATTRIBUTE_BY_CATEGORY_SUCCESS, QUERY_ATTRIBUTE_BY_CATEGORY_FAIL],
        promise: (client) => client.get('/item/seller/categoryAttribute/queryPlatfromAttributeList', {params: {cid:param}})
    };
}
export function getAttributeByCategoryIdForPlatform (param) {
    return {
        types: [QUERY_ATTRIBUTE_BY_CATEGORY_LOADING, QUERY_ATTRIBUTE_BY_CATEGORY_SUCCESS, QUERY_ATTRIBUTE_BY_CATEGORY_FAIL],
        promise: (client) => client.get('/item/platform/categoryAttribute/queryAttributeList', {params: {cid:param}})
    };
}


