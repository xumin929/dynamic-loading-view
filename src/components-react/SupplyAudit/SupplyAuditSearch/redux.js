/**
 * Created by huangxiao3 on 2017/2/20.
 */
const SUPPLY_SEARCH_LOADING = 'ITEM/SUPPLYSEARCH/SPECIFICATION_SEARCH_LOADING';
const SUPPLY_SEARCH_FAIL = 'ITEM/SUPPLYSEARCH/SPECIFICATION_SEARCH_FAIL';
const SUPPLY_SEARCH_SUCCESS = 'ITEM/SUPPLYSEARCH/SPECIFICATION_SEARCH_SUCCESS';

const SUPPLY_SEARCH_SAVE = 'ITEM/SUPPLYSEARCH/SPECIFICATION_SEARCH_SAVE';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case SUPPLY_SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case SUPPLY_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case SUPPLY_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.msg
      };
    case SUPPLY_SEARCH_SAVE:
      return{
        ...state,
        searchdata:action
      };
    default:
      return state
  }
}

export function supplyAuditSearch (values) {
  return {
    types: [SUPPLY_SEARCH_LOADING, SUPPLY_SEARCH_SUCCESS, SUPPLY_SEARCH_FAIL],
    promise: (client) => client.get('/item/platform/supplyAudit/querySupplyAuditList',{params:values})
    /*promise: (client) => client.get('/supplyTestData.json',{params:values})*/
  }
}
export function saveFormData (values) {
  return {
    type:SUPPLY_SEARCH_SAVE,
    searchdata: values
  }
}
