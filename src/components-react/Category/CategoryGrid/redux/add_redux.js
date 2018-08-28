const CATEGORY_ADD_LOAD ='category/grid/CATEGORY_ADD_LOAD';
const CATEGORY_ADD_SUCCESS = 'category/grid/CATEGORY_ADD_SUCCESS';
const CATEGORY_ADD_FAIL= 'category/grid/CATEGORY_ADD_FAIL';
const CATEGORY_ADD_CHANGE = 'category/grid/CATEGORY_ADD_CHANGE';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case CATEGORY_ADD_LOAD:
      return {
        ...state,
        loading: true
      }
    case CATEGORY_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        addData: action.result
      }
    case CATEGORY_ADD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      }
    case CATEGORY_ADD_CHANGE:
      return {
        ...state,
        data: action.result
      }
    default:
      return state
  }
}

export function categoryAddChange(data){
  return {
    type:CATEGORY_ADD_SUCCESS,
    result:data
  }
}

export function submit (category) {

  return {
    types: [CATEGORY_ADD_LOAD, CATEGORY_ADD_SUCCESS, CATEGORY_ADD_FAIL],
    promise: (client) => client.post('/item/platform/category/savePlatformCategory',{data:category})
      .then(function (a,b,c) {
        return a;
      })
  }
}


