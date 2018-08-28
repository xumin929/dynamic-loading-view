const SPECIFICATION_SEARCH_LOADING = 'item/specificationSearch/SPECIFICATION_SEARCH_LOADING';
const SPECIFICATION_SEARCH_FAIL = 'item/specificationSearch/SPECIFICATION_SEARCH_FAIL';
const SPECIFICATION_SEARCH_SUCCESS = 'item/specificationSearch/SPECIFICATION_SEARCH_SUCCESS';

const SAVE_SPECIFICATION_CID = 'item/specificationSearch/SAVE_SPECIFICATION_CID';
import{
    API_QUERYPLATFORMCATEGORYATTRIBUTEBYCID
} from '../../../modules/specifications/Container/API'

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case SPECIFICATION_SEARCH_LOADING:
      return {
        ...state,
        searchloading: true
      };
    case SPECIFICATION_SEARCH_SUCCESS:
      return {
        ...state,
        searchloading: true,
        loaded: true,
        data: action
      };
    case SPECIFICATION_SEARCH_FAIL:
      return {
        ...state,
        searchloading: true,
        loaded: false,
        error: action.msg
      };
    case SAVE_SPECIFICATION_CID:
      return {
        ...state,
        cid:action.cid,
      };
    default:
      return state
  }
}

export function specificationSearch (values) {
  return {
    types: [SPECIFICATION_SEARCH_LOADING, SPECIFICATION_SEARCH_SUCCESS, SPECIFICATION_SEARCH_FAIL],
    promise: (client) => client.get(API_QUERYPLATFORMCATEGORYATTRIBUTEBYCID,{params:values})
  }
}
export function saveFormData (values) {
  return {
    type:SAVE_SPECIFICATION_CID,
    cid: values.cid
  }
}
