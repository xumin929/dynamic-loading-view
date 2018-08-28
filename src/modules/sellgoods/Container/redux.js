/**
 * Created by suyunxa on 2017/2/22.
 */

const SELLGOODSEDIT_LOADING = 'item/sellGoodsEdit/SELLGOODSEDIT_LOADING';
const SELLGOODSEDIT_SUCCESS = 'item/sellGoodsEdit/SELLGOODSEDIT_SUCCESS';
const SELLGOODSEDIT_FAIL = 'item/sellGoodsEdit/SELLGOODSEDIT_FAIL';

const initialState = {
	loading: false,
	loaded: false,
	goodsData:{}
};
export default function (state = initialState, action = {}) {
	switch(action.type) {
		case SELLGOODSEDIT_LOADING:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case SELLGOODSEDIT_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		goodsData: action.result
			};
		case SELLGOODSEDIT_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};
		default:
			return {
				...state,
			};
	}
}

export function getSellGoodsData (platformId, itemId) {
  return {
  	types: [ SELLGOODSEDIT_LOADING, SELLGOODSEDIT_SUCCESS, SELLGOODSEDIT_FAIL],
    promise: (client) => client.get('/item/platform/brandController/brandInfoTable',{params:{platformId:platformId,itemId:itemId}})
    //promise: (client) => client.get('/querySaleItemInfoPrice.json',{params:{platformId:platformId,itemId:itemId}})
  }
}