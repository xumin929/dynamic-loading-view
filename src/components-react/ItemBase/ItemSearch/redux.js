/**
 * Created by huangxiao3 on 2017/2/21.
 */
const ITEM_SEARCH_LOADING = 'ITEM/ITEMBASE/ITEMBASE_SEARCH_LOADING';
const ITEM_SEARCH_FAIL = 'ITEM/ITEMBASE/ITEMBASE_SEARCH_FAIL';
const ITEM_SEARCH_SUCCESS = 'ITEM/ITEMBASE/ITEMBASE_SEARCH_SUCCESS';

const ITEM_SEARCH_SAVE = 'ITEM/ITEMBASE/ITEM_SEARCH_SAVE';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case ITEM_SEARCH_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case ITEM_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case ITEM_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    case ITEM_SEARCH_SAVE:
      return{
        ...state,
        searchdata:action
      }
    default:
      return state
  }
}

export function itemBaseSearch (values) {
  return {
    types: [ITEM_SEARCH_LOADING, ITEM_SEARCH_SUCCESS, ITEM_SEARCH_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/queryItemLibraryList',{params:values})
    /*promise: (client) => client.get('/supplyTestData.json',{params:values})*/
  }
}

export function saveFormData (values) {
  return {
    type:ITEM_SEARCH_SAVE,
    searchdata: values
  }
}