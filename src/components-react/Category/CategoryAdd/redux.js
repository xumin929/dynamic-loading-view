const LOAD = 'item/category/CategoryAdd/LOAD';
const LOAD_SUCCESS = 'item/category/CategoryAdd/LOAD_SUCCESS';
const LOAD_FAIL = 'item/category/CategoryAdd/LOAD_FAIL';
const CATE_LOAD_SUCCESS = 'item/category/CategoryAdd/CATE_LOAD_SUCCESS';

const SAVE_CATEGORY_URL = '/item/platform/category/savePlatformCategory';
const GET_CATE_BY_ID_URL = '/item/platform/category/getCategoriesByParentId';

const PARENT_CATEGORY_LOAD = 'item/category/CategoryAdd/PARENT_CATEGORY_LOAD';
const PARENT_CATEGORY_SUCCESS = 'item/category/CategoryAdd/PARENT_CATEGORY_SUCCESS';
const PARENT_CATEGORY_FAIL = 'item/category/CategoryAdd/PARENT_CATEGORY_FAIL';
const GET_PARENT_CATEGORY_URL = 'item/platform/category/getAllCategoriesByPlatformId';

export default function (state = {loading:false}, action = {}) {
    switch (action.type) {
        case LOAD:
          	return {
	            ...state,
	            loading: true
	        }
        case LOAD_SUCCESS:
            return {
	            ...state,
	            loading: false,
	            loaded: true,
	            data: action.result
	        }
       case LOAD_FAIL:
        return {
          ...state,
          loading: false,
          loaded: false,
          error: action.msg
        }
      case CATE_LOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.result
        }
      case PARENT_CATEGORY_LOAD:
        return {
          ...state,
          loading: true
        };
      case PARENT_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.result
        };
      case PARENT_CATEGORY_FAIL:
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

export function submit (category) {

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post(SAVE_CATEGORY_URL,{data:category})
      .then(function (a,b,c) {
        return a;
      })
  }
}

export function getCategoryByPid(pid,platformId){
  var params = {};
  params.platformId = platformId;
  params.parentCategoryId = pid;
  return {
    types: [LOAD, CATE_LOAD_SUCCESS],
    promise: (client) => client.get(GET_CATE_BY_ID_URL,{params:params})
      .then(function (a,b,c) {
        return a;
      })
  }
}

export function getParentCategoryByPlatformId(params){
  return {
    types: [PARENT_CATEGORY_LOAD, PARENT_CATEGORY_SUCCESS, PARENT_CATEGORY_FAIL],
    promise: (client) => client.get(GET_PARENT_CATEGORY_URL,{params:params})
  }
}
