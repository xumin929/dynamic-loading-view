/**
 * Created by gaoqingli on 2017/2/24.
 */
const SELLGOODSSEARCH_LOADING = 'ITEM/SELLGOODSSEARCH/SELLGOODSSEARCH_LOADING';
const SELLGOODSSEARCH_FAIL = 'ITEM/SELLGOODSSEARCH/SELLGOODSSEARCH_FAIL';
const SELLGOODSSEARCH_SUCCESS = 'ITEM/SELLGOODSSEARCH/SELLGOODSSEARCH_SUCCESS';

const SELLGOODSSEARCH_SAVE = 'ITEM/SELLGOODSSEARCH/SELLGOODSSEARCH_SAVE';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case SELLGOODSSEARCH_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case SELLGOODSSEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case SELLGOODSSEARCH_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.msg
      };
    case SELLGOODSSEARCH_SAVE:
      return{
        ...state,
        searchdata:action
      };
    default:
      return state
  }
}

export function sellGoodsSearch (values) {
  return {
    types: [SELLGOODSSEARCH_LOADING, SELLGOODSSEARCH_SUCCESS, SELLGOODSSEARCH_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/querySaleItemListWithoutSkus',{params:values})
  }
}
export function saveFormData (values) {
  return {
    type:SELLGOODSSEARCH_SAVE,
    searchdata: values
  }
}