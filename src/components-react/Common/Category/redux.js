const FIRST_CATEGORY_SUCCESS = 'item/categoryCascade/FIRST_CATEGORY_SUCCESS';
const FIRST_CATEGORY_FAIL = 'item/categoryCascade/FIRST_CATEGORY_FAIL';
const SECOND_CATEGORY_SUCCESS = 'item/categoryCascade/SECOND_CATEGORY_SUCCESS';
const SECOND_CATEGORY_FAIL = 'item/categoryCascade/SECOND_CATEGORY_FAIL';
const THIRD_CATEGORY_SUCCESS = 'item/categoryCascade/THIRD_CATEGORY_SUCCESS';
const THIRD_CATEGORY_FAIL = 'item/categoryCascade/THIRD_CATEGORY_FAIL';
const FOUR_CATEGORY_SUCCESS = 'item/categoryCascade/FOUR_CATEGORY_SUCCESS';
const FOUR_CATEGORY_FAIL = 'item/categoryCascade/FOUR_CATEGORY_FAIL';
const FIRST_CATEGORY_LOADING = 'item/categoryCascade/FIRST_CATEGORY_LOADING';
const SECOND_CATEGORY_LOADING = 'item/categoryCascade/SECOND_CATEGORY_LOADING';
const THIRD_CATEGORY_LOADING = 'item/categoryCascade/THIRD_CATEGORY_LOADING';
const FOUR_CATEGORY_LOADING = 'item/categoryCascade/FOUR_CATEGORY_LOADING';
const First_CATEGORY_CLEAR = 'item/categoryCascade/First_CATEGORY_CLEAR';
const SECOND_CATEGORY_CLEAR = 'item/categoryCascade/SECOND_CATEGORY_CLEAR';
const THIRD_CATEGORY_CLEAR = 'item/categoryCascade/THIRD_CATEGORY_CLEAR';

let defaultData = {
  first:{
    loading: false,
    data:{
      data:[]
    }
  },
  second:{
    loading: false,
    data:{
      data:[]
    }
  },
  third:{
    loading: false,
    data:{
      data:[]
    }
  },
  four:{
    loading: false,
    data:{
      data:[]
    }
  }
};
export default function (state = defaultData, action = {}) {
  switch (action.type) {
    case FIRST_CATEGORY_LOADING:
      return {
        ...state,
        first: {
          ...state.first,
          loading: true
        }
      };
    case SECOND_CATEGORY_LOADING:
      return {
        ...state,
        second: {
          ...state.second,
          loading: true
        }
      };
    case THIRD_CATEGORY_LOADING:
      return {
        ...state,
        third: {
          ...state.third,
          loading: true
        }
      };
    case FOUR_CATEGORY_LOADING:
      return {
        ...state,
        four: {
          ...state.four,
          loading: true
        }
      };
    case FIRST_CATEGORY_SUCCESS:
      return {
        ...state,
        first: {
          loading: false,
          loaded: true,
          data: action.result
        }
      };
    case FIRST_CATEGORY_FAIL:
      return {
        ...state,
        first: {
          loading: false,
          loaded: false,
          error: action.msg
        }
      };
    case SECOND_CATEGORY_SUCCESS:
      return {
        ...state,
        second: {
          loading: false,
          loaded: true,
          data: action.result
        }
      };
    case SECOND_CATEGORY_FAIL:
      return {
        ...state,
        second: {
          loading: false,
          loaded: false,
          error: action.msg
        }
      };
    case THIRD_CATEGORY_SUCCESS:
      return {
        ...state,
        third: {
          loading: false,
          loaded: true,
          data: action.result
        }
      };
    case THIRD_CATEGORY_FAIL:
      return {
        ...state,
        third: {
          loading: false,
          loaded: false,
          error: action.msg
        }
      };
    case FOUR_CATEGORY_SUCCESS:
      return {
        ...state,
        four: {
          loading: false,
          loaded: true,
          data: action.result
        }
      };
    case FOUR_CATEGORY_FAIL:
      return {
        ...state,
        four: {
          loading: false,
          loaded: false,
          error: action.msg
        }
      };
    case First_CATEGORY_CLEAR:
      return {
        ...state,
        second:{
          loading: false,
          data:{
            data:[]
          }
        },
        third:{
          loading: false,
          data:{
            data:[]
          }
        },
        four:{
          loading: false,
          data:{
            data:[]
          }
        }
      };
    case SECOND_CATEGORY_CLEAR:
      return {
        ...state,
        third:{
          loading: false,
          data:{
            data:[]
          }
        },
        four:{
          loading: false,
          data:{
            data:[]
          }
        }
      };
    case THIRD_CATEGORY_CLEAR:
      return {
        ...state,
        four:{
          loading: false,
          data:{
            data:[]
          }
        }
      };
    default:
      return state
  }
}

export function getFirstCid (platformId,cid) {
  return {
    types: [ FIRST_CATEGORY_LOADING, FIRST_CATEGORY_SUCCESS, FIRST_CATEGORY_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoriesByParentId',{params:{platformId:platformId,parentCategoryId:cid}})
  }
}

export function getSecondCid (platformId,cid) {
  return {
    types: [ SECOND_CATEGORY_LOADING, SECOND_CATEGORY_SUCCESS, SECOND_CATEGORY_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoriesByParentId',{params:{platformId:platformId,parentCategoryId:cid}})
  }
}

export function getThirdCid (platformId,cid) {
  return {
    types: [ THIRD_CATEGORY_LOADING, THIRD_CATEGORY_SUCCESS, THIRD_CATEGORY_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoriesByParentId',{params:{platformId:platformId,parentCategoryId:cid}})
  }
}

export function getFourCid (platformId,cid) {
  return {
    types: [ FOUR_CATEGORY_LOADING, FOUR_CATEGORY_SUCCESS, FOUR_CATEGORY_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoriesByParentId',{params:{platformId:platformId,parentCategoryId:cid}})
  }
}
 export function clearData (level){
  let type;
  if (level == 1){
    type = First_CATEGORY_CLEAR;
  }else if (level == 2){
    type = SECOND_CATEGORY_CLEAR;
  }else if (level == 3){
    type = THIRD_CATEGORY_CLEAR;
  }
   return {
     type:type
   }
 }