const FIRST_SHOP_SUCCESS = 'item/categoryCascade/FIRST_SHOP_SUCCESS';
const FIRST_SHOP_LOADING = 'item/categoryCascade/FIRST_SHOP_LOADING';
const FIRST_SHOP_FAIL = 'item/categoryCascade/FIRST_SHOP_FAIL';

const SECOND_SHOP_SUCCESS = 'item/categoryCascade/SECOND_SHOP_SUCCESS';
const SECOND_SHOP_LOADING = 'item/categoryCascade/SECOND_SHOP_LOADING';
const SECOND_SHOP_FAIL = 'item/categoryCascade/SECOND_SHOP_FAIL';

const First_SHOP_CLEAR = 'item/categoryCascade/First_SHOP_CLEAR';

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
  }
};
export default function (state = defaultData, action = {}) {
  switch (action.type) {
    case FIRST_SHOP_LOADING:
      return {
        ...state,
        first: {
          ...state.first,
          firstloaded: false,
          loading: true
        }
      };
    case SECOND_SHOP_LOADING:
      return {
        ...state,
        second: {
          ...state.second,
          secondloaded: false,
          loading: true
        }
      };
    case FIRST_SHOP_SUCCESS:
      return {
        ...state,
        first: {
          loading: false,
          firstloaded: true,
          data: action.result
        }
      };
    case FIRST_SHOP_FAIL:
      return {
        ...state,
        first: {
          loading: false,
          firstloaded: false,
          error: action.msg
        }
      };
    case SECOND_SHOP_SUCCESS:
      return {
        ...state,
        second: {
          loading: false,
          secondloaded: true,
          data: action.result
        }
      };
    case SECOND_SHOP_FAIL:
      return {
        ...state,
        second: {
          loading: false,
          secondloaded: false,
          error: action.msg
        }
      };
   
    case First_SHOP_CLEAR:
      return {
        ...state,
        second:{
          loading: false,
          data:{
            data:[]
          }
        }
      }
    default:
      return state
  }
}

export function getFirstCid (cid) {
    let url = '/shop/shopinfo/shopinfoCategory/queryCategoryByParentCid';
    return {
        types: [ FIRST_SHOP_LOADING, FIRST_SHOP_SUCCESS, FIRST_SHOP_FAIL],
        promise: (client) => client.get(url,{params:{parentCid:cid}})
    }
}

export function getSecondCid (cid) {
    let url = '/shop/shopinfo/shopinfoCategory/queryCategoryByParentCid';
    return {
        types: [ SECOND_SHOP_LOADING, SECOND_SHOP_SUCCESS, SECOND_SHOP_FAIL],
        promise: (client) => client.get(url,{params:{parentCid:cid}})
    }
}

 export function clearData (level){
    let type;
    if (level == 1){
        type = First_SHOP_CLEAR;
    }
   return {
     type:type
   }
}