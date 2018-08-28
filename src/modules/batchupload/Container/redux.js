/****************************************************************
 * author:LiuYang
 * date:2017-08-22
 * description:上传商品
 ****************************************************************/
//获取分类表格
const UPLOAD_CLASS = 'redux/UPLOAD_CLASS';
const UPLOAD_CLASS_SUCCESS = 'redux/UPLOAD_CLASS_SUCCESS';
const UPLOAD_CLASS_FAIL = 'redux/UPLOAD_CLASS_FAIL';

//获取品牌表格
const UPLOAD_BRAND = 'redux/UPLOAD_BRAND';
const UPLOAD_BRAND_SUCCESS = 'redux/UPLOAD_BRAND_SUCCESS';
const UPLOAD_BRAND_FAIL = 'redux/UPLOAD_BRAND_FAIL';

//获取商品表格
const UPLOAD_GOODS = 'redux/UPLOAD_GOODS';
const UPLOAD_GOODS_SUCCESS = 'redux/UPLOAD_GOODS_SUCCESS';
const UPLOAD_GOODS_FAIL = 'redux/UPLOAD_GOODS_FAIL';

//获取规格参数表格
const UPLOAD_SPECIFICTION = 'redux/UPLOAD_SPECIFICTION';
const UPLOAD_SPECIFICTION_SUCCESS = 'redux/UPLOAD_SPECIFICTION_SUCCESS';
const UPLOAD_SPECIFICTION_FAIL = 'redux/UPLOAD_SPECIFICTION_FAIL';

//上传文件名称
const UPLOAD_FILENAME = 'redux/UPLOAD_FILENAME';
const UPLOAD_FILENAME_SUCCESS = 'redux/UPLOAD_FILENAME_SUCCESS';
const UPLOAD_FILENAME_FAIL = 'redux/UPLOAD_FILENAME_FAIL';

export default function reducer(state = {}, action = {}) {
	switch(action.type) {
//分类
		case UPLOAD_CLASS:
			return {
				...state,
        		loading: true,
        		classloaded: false
			};
		case UPLOAD_CLASS_SUCCESS:
			return {
				...state,
        		loading: false,
        		classLoaded: true,
        		classData: action.result 
			};
		case UPLOAD_CLASS_FAIL:
			return {
				...state,
        		loading: false,
        		classLoaded: false
			};
//品牌
		case UPLOAD_BRAND:
			return {
				...state,
        		loading: true,
        		brandLoaded: false
			};
		case UPLOAD_BRAND_SUCCESS:
			return {
				...state,
        		loading: false,
        		brandLoaded: true,
        		brandData: action.result 
			};
		case UPLOAD_BRAND_FAIL:
			return {
				...state,
        		loading: false,
        		brandLoaded: false
			};
//商品
		case UPLOAD_GOODS:
			return {
				...state,
        		loading: true,
        		goodsLoaded: false
			};
		case UPLOAD_GOODS_SUCCESS:
			return {
				...state,
        		loading: false,
        		goodsLoaded: true,
        		goodsData: action.result
			};
		case UPLOAD_GOODS_FAIL:
			return {
				...state,
        		loading: false,
        		goodsLoaded: false
			};
//规格属性
        case UPLOAD_SPECIFICTION:
			return {
				...state,
        		loading: true,
        		specLoaded: false
			};
		case UPLOAD_SPECIFICTION_SUCCESS:
			return {
				...state,
        		loading: false,
        		specLoaded: true,
        		specData: action.result
			};
		case UPLOAD_SPECIFICTION_FAIL:
			return {
				...state,
        		loading: false,
        		specLoaded: false
			};
//上传文件名称
		case UPLOAD_FILENAME:
			return {
				...state,
        		loading: true,
        		fileNameLoaded: false
			};
		case UPLOAD_FILENAME_SUCCESS:
			return {
				...state,
        		loading: false,
        		fileNameLoaded: true,
        		fileNameData: action.result
			};
		case UPLOAD_FILENAME_FAIL:
			return {
				...state,
        		loading: false,
        		fileNameLoaded: false
			};
		default:
			return {
				...state,
			};
	}
}
/**
* description: 获取分类表格
*/
export function queryClassTable(param){
		return {
			types: [UPLOAD_CLASS, UPLOAD_CLASS_SUCCESS, UPLOAD_CLASS_FAIL],
	    	promise: (client) => client.get('item/platform/item/queryBatchNoList', {
	    		params: param
	    	})
		}
	}
/**
* description: 获取品牌表格
*/
export function queryBrandTable(param){
		return {
			types: [UPLOAD_BRAND, UPLOAD_BRAND_SUCCESS, UPLOAD_BRAND_FAIL],
	    	promise: (client) => client.get('item/platform/item/queryBatchNoList', {
	    		params: param
	    	})
		}
	}
/**
* description: 获取商品表格
*/
export function queryGoodsTable(param){
		return {
			types: [UPLOAD_GOODS, UPLOAD_GOODS_SUCCESS, UPLOAD_GOODS_FAIL],
	    	promise: (client) => client.get('item/platform/item/queryBatchNoList', {
	    		params: param
	    	})
		}
	}
/**
* description: 获取规格属性表格
*/
export function querySpecificationTable(param){
		return {
			types: [UPLOAD_SPECIFICTION, UPLOAD_SPECIFICTION_SUCCESS, UPLOAD_SPECIFICTION_FAIL],
	    	promise: (client) => client.get('item/platform/item/queryBatchNoList', {
	    		params: param
	    	})
		}
	}
/**
* description: 将名字回传给后台
*/
export function postFileName(param){
		return {
			types: [UPLOAD_FILENAME, UPLOAD_FILENAME_SUCCESS, UPLOAD_FILENAME_FAIL],
	    	promise: (client) => client.get('item/platform/item/modifyFileName', {
	    		params: param
	    	})
		}
	}
