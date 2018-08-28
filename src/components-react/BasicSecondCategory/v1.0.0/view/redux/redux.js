const FIRST_SECOND_SUCCESS = 'item/categoryCascade/FIRST_SECOND_SUCCESS';
const FIRST_SECOND_FAIL = 'item/categoryCascade/FIRST_SECOND_FAIL';
const SECOND_SECOND_SUCCESS = 'item/categoryCascade/SECOND_SECOND_SUCCESS';
const SECOND_SECOND_FAIL = 'item/categoryCascade/SECOND_SECOND_FAIL';
const THIRD_SECOND_SUCCESS = 'item/categoryCascade/THIRD_SECOND_SUCCESS';
const THIRD_SECOND_FAIL = 'item/categoryCascade/THIRD_SECOND_FAIL';
const FOUR_SECOND_SUCCESS = 'item/categoryCascade/FOUR_SECOND_SUCCESS';
const FOUR_SECOND_FAIL = 'item/categoryCascade/FOUR_SECOND_FAIL';
const FIRST_SECOND_LOADING = 'item/categoryCascade/FIRST_SECOND_LOADING';
const SECOND_SECOND_LOADING = 'item/categoryCascade/SECOND_SECOND_LOADING';
const THIRD_SECOND_LOADING = 'item/categoryCascade/THIRD_SECOND_LOADING';
const FOUR_SECOND_LOADING = 'item/categoryCascade/FOUR_SECOND_LOADING';
const First_SECOND_CLEAR = 'item/categoryCascade/First_SECOND_CLEAR';
const SECOND_SECOND_CLEAR = 'item/categoryCascade/SECOND_SECOND_CLEAR';
const THIRD_SECOND_CLEAR = 'item/categoryCascade/THIRD_SECOND_CLEAR';

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
    case FIRST_SECOND_LOADING:
      return {
        ...state,
        first: {
          ...state.first,
          firstloaded: false,
          loading: true
        }
      };
    case SECOND_SECOND_LOADING:
      return {
        ...state,
        second: {
          ...state.second,
          secondloaded: false,
          loading: true
        }
      };
    case THIRD_SECOND_LOADING:
      return {
        ...state,
        third: {
          ...state.third,
          thirdloaded: false,
          loading: true
        }
      };
    case FOUR_SECOND_LOADING:
      return {
        ...state,
        four: {
          ...state.four,
          fourloaded: false,
          loading: true
        }
      };
    case FIRST_SECOND_SUCCESS:
      return {
        ...state,
        first: {
          loading: false,
          firstloaded: true,
          data: action.result
        }
      };
    case FIRST_SECOND_FAIL:
      return {
        ...state,
        first: {
          loading: false,
          firstloaded: false,
          error: action.msg
        }
      };
    case SECOND_SECOND_SUCCESS:
      return {
        ...state,
        second: {
          loading: false,
          secondloaded: true,
          data: action.result
        }
      };
    case SECOND_SECOND_FAIL:
      return {
        ...state,
        second: {
          loading: false,
          secondloaded: false,
          error: action.msg
        }
      };
    case THIRD_SECOND_SUCCESS:
      return {
        ...state,
        third: {
          loading: false,
          thirdloaded: true,
          data: action.result
        }
      };
    case THIRD_SECOND_FAIL:
      return {
        ...state,
        third: {
          loading: false,
          thirdloaded: false,
          error: action.msg
        }
      };
    case FOUR_SECOND_SUCCESS:
      return {
        ...state,
        four: {
          loading: false,
          fourloaded: true,
          data: action.result
        }
      };
    case FOUR_SECOND_FAIL:
      return {
        ...state,
        four: {
          loading: false,
          fourloaded: false,
          error: action.msg
        }
      };
    case First_SECOND_CLEAR:
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
    case SECOND_SECOND_CLEAR:
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
    case THIRD_SECOND_CLEAR:
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

export function getFirstCid (cid,type) {
    let url = ''
    if(type == 1){
        url = '/item/platform/category/getCategoriesByParentId'
    } else if(type == 2){
        url = '/shop-service/seller/shopCategory/getShopCategoriesByParentId'
    } else {
        url = '/item/seller/category/getShopCategoriesByParentId'
    }
  return {
    types: [ FIRST_SECOND_LOADING, FIRST_SECOND_SUCCESS, FIRST_SECOND_FAIL],
    promise: (client) => client.get(url,{params:{parentCategoryId:cid}})
  }
}

export function getSecondCid (cid,type) {
    let url = ''
    if(type == 1){
        url = '/item/platform/category/getCategoriesByParentId'
    } else if(type == 2){
        url = '/shop-service/seller/shopCategory/getShopCategoriesByParentId'
    } else {
        url = '/item/seller/category/getShopCategoriesByParentId'
    }
  return {
    types: [ SECOND_SECOND_LOADING, SECOND_SECOND_SUCCESS, SECOND_SECOND_FAIL],
    promise: (client) => client.get(url,{params:{parentCategoryId:cid}})
  }
}

export function getThirdCid (cid,type) {
    let url = ''
    if(type == 1){
        url = '/item/platform/category/getCategoriesByParentId'
    } else if(type == 2){
        url = '/shop-service/seller/shopCategory/getShopCategoriesByParentId'
    } else {
        url = '/item/seller/category/getShopCategoriesByParentId'
    }
  return {
    types: [ THIRD_SECOND_LOADING, THIRD_SECOND_SUCCESS, THIRD_SECOND_FAIL],
    promise: (client) => client.get(url,{params:{parentCategoryId:cid}})
  }
}

export function getFourCid (cid,type) {
    let url = ''
    if(type == 1){
        url = '/item/platform/category/getCategoriesByParentId'
    } else if(type == 2){
        url = '/shop-service/seller/shopCategory/getShopCategoriesByParentId'
    } else {
        url = '/item/seller/category/getShopCategoriesByParentId'
    }
  return {
    types: [ FOUR_SECOND_LOADING, FOUR_SECOND_SUCCESS, FOUR_SECOND_FAIL],
    promise: (client) => client.get(url,{params:{parentCategoryId:cid}})
  }
}
 export function clearData (level){
    let type;
    if (level == 1){
        type = First_SECOND_CLEAR;
    }else if (level == 2){
        type = SECOND_SECOND_CLEAR;
    }else if (level == 3){
        type = THIRD_SECOND_CLEAR;
    }
   return {
     type:type
   }
}