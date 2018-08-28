/**
 * 商品保存调用redux 
 * 
 * 保存和编辑保存用两个接口
 * 都要根据不同的页面进行判断
 * */

const ITEM_SAVE_LOAD = 'ITEM_SAVE_LOAD';
const ITEM_SAVE_LOAD_SUCCESS = 'ITEM_SAVE_LOAD_SUCCESS';
const ITEM_SAVE_LOAD_FAIL = 'ITEM_SAVE_LOAD_FAIL';

export default function (state = { loaded: false }, action = {}) {
    switch (action.type) {
        case ITEM_SAVE_LOAD:
            return {
                ...state,
                loading: true
            };
        case ITEM_SAVE_LOAD_SUCCESS:
            return {
                ...state,
                data: action.result,
                loading: false,
                loaded: true
            };
        case ITEM_SAVE_LOAD_FAIL:
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

export function querySaveItem(params, type, edit) {
    let url = null;
    if(type == 1){//运营平台
        if(edit){
            url = '/item/platform/itemTmplPublish/saveItemByEdit';
        } else {
            url = '/item/platform/itemTmplPublish/saveItemPublish';
        }
    } else if(type == 3) {//店铺
        if(edit){
            url = '/item/shop/itemTmplPublish/saveItemByEdit';
        } else {
            url='/item/shop/itemTmplPublish/saveItemPublish';
        }
    }
    return {
        types: [ITEM_SAVE_LOAD, ITEM_SAVE_LOAD_SUCCESS, ITEM_SAVE_LOAD_FAIL],
        promise: (client) => client.post(url, { data: params })
    };
}

