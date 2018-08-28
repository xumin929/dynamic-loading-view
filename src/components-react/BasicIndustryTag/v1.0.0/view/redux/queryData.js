const QUERY_BASE_ATTR_LOADING = 'QUERY_BASE_ATTR_LOADING';
const QUERY_BASE_ATTR_SUCCESS = 'QUERY_BASE_ATTR_SUCCESS';
const QUERY_BASE_ATTR_FAIL = 'QUERY_BASE_ATTR_FAIL';


export default function (state = {}, action = {}) {
    switch (action.type) {
        case QUERY_BASE_ATTR_LOADING:
            return {
                ...state,
            };
        case QUERY_BASE_ATTR_SUCCESS:
            return {
                ...state,
                data: action.result
            };
        case QUERY_BASE_ATTR_FAIL:
            return {
                ...state,
                error: action.msg
            };
        default:
            return state
    }
}


//店铺    添加时查询品牌
export function getIndustryTagData(values,type) {
    // shop
    let url = '/item/seller/tags/getItemTagByCategory';
    // Platform
    if(type == '1'){
        url = '/item/platform/tags/getItemTagByCategory';
    }
    return {
        types: [QUERY_BASE_ATTR_LOADING, QUERY_BASE_ATTR_SUCCESS, QUERY_BASE_ATTR_FAIL],
        promise: (client) => client.get(url, {params: values})
    };
}


