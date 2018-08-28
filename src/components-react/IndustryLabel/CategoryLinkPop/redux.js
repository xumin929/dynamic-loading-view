/**
 * Created by huangxiao3 on 2017/5/24.
 */

//类目查询
const ALLCATEGORY_SEARCH_LOADING = 'ITEM/INDUSTRYLABEL/ALLCATEGORY_SEARCH_LOADING';
const ALLCATEGORY_SEARCH_SUCCESS = 'ITEM/INDUSTRYLABEL/ALLCATEGORY_SEARCH_SUCCESS';
const ALLCATEGORY_SEARCH_FAIL = 'ITEM/INDUSTRYLABEL/ALLCATEGORY_SEARCH_FAIL';

export default function (state = {loading:false,data:null}, action = {}) {
  switch (action.type) {
    /*    case SUPPLY_SEARCH_LOADING:
     return {
     ...state,
     };*/

    //类目查询
    case ALLCATEGORY_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
      };
    case ALLCATEGORY_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    default:
      return state
  }
}

//类目查询
export function getAllCategory (values) {
  return {
    types: [ALLCATEGORY_SEARCH_LOADING, ALLCATEGORY_SEARCH_SUCCESS, ALLCATEGORY_SEARCH_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoriesByPlatformId',{params:values})
    /*promise: (client) => client.get('/industrylabel/getAllCategory.json', {params: values})*/
  }
}
