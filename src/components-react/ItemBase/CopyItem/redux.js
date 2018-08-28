/**
 * Created by huangxiao3 on 2017/2/21.
 */
const COPY_ITEM_LOADING = 'ITEM/COPYITEM/COPY_ITEM_LOADING'
const COPY_ITEM_SUCCESS = 'ITEM/COPYITEM/COPY_ITEM_SUCCESS'
const COPY_ITEM_FAIL = 'ITEM/COPYITEM/COPY_ITEM_FAIL'

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case COPY_ITEM_LOADING:
     return {
     ...state,
       loading: true,
     };
    case COPY_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case COPY_ITEM_FAIL:
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

export function copyItem (values) {
  return {
    types: [COPY_ITEM_LOADING, COPY_ITEM_SUCCESS, COPY_ITEM_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/insertCopyItemPublish',{params:values})
    /*promise: (client) => client.get('/supplyTestData.json',{params:values})*/
  }
}
