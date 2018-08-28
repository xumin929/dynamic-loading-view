/**
 * 商品发布后，加入平台标准库调用redux 
 * 
 * 发布和编辑发布用两个接口
 * 都要根据不同的页面进行判断
 * */

const ITEM_ADDLIBRARY_LOAD = 'ITEM_ADDLIBRARY_LOAD';
const ITEM_ADDLIBRARY_LOAD_SUCCESS = 'ITEM_ADDLIBRARY_LOAD_SUCCESS';
const ITEM_ADDLIBRARY_LOAD_FAIL = 'ITEM_ADDLIBRARY_LOAD_FAIL';

export default function (state = { loaded: false }, action = {}) {
    switch (action.type) {
        case ITEM_ADDLIBRARY_LOAD:
            return {
                ...state,
                loading: true
            };
        case ITEM_ADDLIBRARY_LOAD_SUCCESS:
            return {
                ...state,
                data: action.result,
                loading: false,
                loaded: true
            };
        case ITEM_ADDLIBRARY_LOAD_FAIL:
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

export function addLibraryItem(params) {
    let url = '/item/platform/itemTmplPublish/addPlatformLibrary';
    return {
        types: [ITEM_ADDLIBRARY_LOAD, ITEM_ADDLIBRARY_LOAD_SUCCESS, ITEM_ADDLIBRARY_LOAD_FAIL],
        promise: (client) => client.post(url, { data: params })
    };
}

