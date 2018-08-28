/**
 * 销售规格接口redux
 * 发布、编辑不同接口
 * 各个页面不同接口
 */

const SALE_ATTRIBUTE_LOADING = 'SALE_ATTRIBUTE_LOADING';
const SALE_ATTRIBUTE_SUCCESS = 'SALE_ATTRIBUTE_SUCCESS';
const SALE_ATTRIBUTE_FAIL = 'SALE_ATTRIBUTE_FAIL';

export default function (state = {}, action = {}) {
    switch (action.type) {
        case SALE_ATTRIBUTE_LOADING :
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        case SALE_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result,
            };
        case SALE_ATTRIBUTE_FAIL:
            return{
                ...state,
                loading: false,
                loaded: true
            }
        default:
            return state;
        
    }
}

/**
 * type : 
 * "0": (运营平台：平台商品库管理 发布、编辑), 
 * "1": (运营平台：商品库管理/商品发布、编辑), 
 * "2": (供应商), 
 * "3": (店铺)
 */

export function getSaleAttributeAction(type, edit, params){  //(0,true,{cid:'',itemId:''})
    let url = null;
    if(edit){ //编辑状态
        if(type == 0 || type == 1){
            url = '/item-service/platform/categoryAttribute/querySaleAttribute';
        } else {
            url = '/item/seller/categoryAttribute/querySaleAttribute';
        }
    } else { //发布状态
        if(type == 0 || type == 1){
            url = '/item/platform/categoryAttribute/querySaleAttr';
        } else {
            url = '/item/seller/categoryAttribute/querySaleAttr';
        }
    }
    // // 不再区分编辑和发布
    // if(type == 0 || type == 1){
    //     url = '/item-service/platform/categoryAttribute/querySaleAttribute';
    // } else {
    //     url = '/item/seller/categoryAttribute/querySaleAttribute';
    // }
    return {
        types: [SALE_ATTRIBUTE_LOADING, SALE_ATTRIBUTE_SUCCESS, SALE_ATTRIBUTE_FAIL],
        promise: (client) => client.get(url, {
            params: params
        })
    }
}