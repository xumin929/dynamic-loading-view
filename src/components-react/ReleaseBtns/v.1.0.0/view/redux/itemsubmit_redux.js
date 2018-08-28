/**
 * 商品发布调用redux 
 * 
 * 发布和编辑发布用两个接口
 * 都要根据不同的页面进行判断
 * */

const ITEM_SUBMIT_LOAD = 'ITEM_SUBMIT_LOAD';
const ITEM_SUBMIT_LOAD_SUCCESS = 'ITEM_SUBMIT_LOAD_SUCCESS';
const ITEM_SUBMIT_LOAD_FAIL = 'ITEM_SUBMIT_LOAD_FAIL';

export default function (state = { loaded: false }, action = {}) {
    switch (action.type) {
        case ITEM_SUBMIT_LOAD:
            return {
                ...state,
                loading: true
            };
        case ITEM_SUBMIT_LOAD_SUCCESS:
            return {
                ...state,
                data: action.result,
                loading: false,
                loaded: true
            };
        case ITEM_SUBMIT_LOAD_FAIL:
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

export function querySubmitItem(params, type, edit) {
    let url = null;
    if(type == 1){//运营平台
        if(edit){
            url = '/item/platform/itemTmplPublish/publishItemByEdit';
        } else {
            url = '/item/platform/itemTmplPublish/publishItem';
        }
    } else if(type == 2){//供应商
        if(edit){
            url = '/item/seller/itemTmplPublish/publishItemByEdit'
        } else {
            url = '/item/seller/itemTmplPublish/publishItem';
        }
    } else if(type == 3){//店铺
        if(edit){
            url = '/item/shop/itemTmplPublish/publishItemByEdit';
        } else {
            url='/item/shop/itemTmplPublish/publishItem';
        }
    } else { //从供货申请审核页编辑发布的接口
        url = '/item/platform/itemTmplPublish/publishItemByAudit'
    }
    return {
        types: [ITEM_SUBMIT_LOAD, ITEM_SUBMIT_LOAD_SUCCESS, ITEM_SUBMIT_LOAD_FAIL],
        promise: (client) => client.post(url, { data: params })
    };
}

