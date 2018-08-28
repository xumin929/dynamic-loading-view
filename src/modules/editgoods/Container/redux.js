/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:编辑产品
 ****************************************************************/
const GOODS_EDIT_LOADING = 'redux/GOODSRLEASE/EDIT/LOADING';
const GOODS_EDIT_LOAD_SUCCESS = 'redux/GOODSRLEASE/EDIT/LOAD_SUCCESS';
const GOODS_EDIT_LOADING_FAIL = 'redux/GOODSRLEASE/EDIT/LOADING_FAIL';


export default function reducer(state = {}, action = {}) {
	switch(action.type) {
		case GOODS_EDIT_LOADING:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_EDIT_LOAD_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		editGoods: JSON.parse(JSON.stringify(action.result.data)) 
			};
		case GOODS_EDIT_LOADING_FAIL:

			return {
				...state,
        		loading: false,
        		loaded: true
			};
		default:
			return {
				...state,
			};
	}
}
export function editGoodsInfo(param){
		return {
			types: [GOODS_EDIT_LOADING, GOODS_EDIT_LOAD_SUCCESS, GOODS_EDIT_LOADING_FAIL],
	    	promise: (client) => client.get('item/platform/itemPublish/queryItemInfo', {
	    		params: param
	    	})
		}
	}
