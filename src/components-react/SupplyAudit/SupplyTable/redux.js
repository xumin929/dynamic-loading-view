/**
 * Created by huangxiao3 on 2017/2/23.
 */

const ADOPT_SUPPLY_LOADING = 'ITEM/ADOPSUPPLY/ADOPT_SUPPLY_LOADING'
const ADOPT_SUPPLY_SUCCESS = 'ITEM/ADOPSUPPLY/ADOPT_SUPPLY_SUCCESS'
const ADOPT_SUPPLY_FAIL = 'ITEM/ADOPSUPPLY/ADOPT_SUPPLY_FAIL'

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    /*    case ADOPT_SUPPLY_LOADING:
     return {
     ...state,
     };*/
    case ADOPT_SUPPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case ADOPT_SUPPLY_FAIL:
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

export function adoptSupply (values) {
  return {
    types: [ADOPT_SUPPLY_LOADING, ADOPT_SUPPLY_SUCCESS, ADOPT_SUPPLY_FAIL],
    promise: (client) => client.get('/item/platform/supplyAudit/adopt',{params:values})
    /*promise: (client) => client.get('/supplyTestData.json',{params:values})*/
  }
}
