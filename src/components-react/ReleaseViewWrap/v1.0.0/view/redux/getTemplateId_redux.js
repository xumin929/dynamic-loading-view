/**
 * 根据cid查询TemplateId
 */

const TEMPLATE_ID_LOADING = 'TEMPLATE_ID_LOADING';
const TEMPLATE_ID_SUCCESS = 'TEMPLATE_ID_SUCCESS';
const TEMPLATE_ID_FAIL = 'TEMPLATE_ID_FAIL';

export default function (state = { loaded: false }, action = {}) {
    switch (action.type) {
        case TEMPLATE_ID_LOADING:
            return {
                ...state,
                loading: true
            };
        case TEMPLATE_ID_SUCCESS:
            return {
                ...state,
                data: action.result,
                loading: false,
                loaded: true
            };
        case TEMPLATE_ID_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function queryGetTemplateId(params,type) {
    let url = '/item/platform/itemTmplPublish/queryUsingTmpl';
    if(type == 2){
        url = '/item/seller/itemTmplPublish/queryUsingTmpl';
    } else if(type == 3){
        url = '/item/shop/itemTmplPublish/queryUsingTmpl';
    }
    return {
        types: [TEMPLATE_ID_LOADING, TEMPLATE_ID_SUCCESS, TEMPLATE_ID_FAIL],
        promise: (client) => client.get(url, { params: params })
    };
}