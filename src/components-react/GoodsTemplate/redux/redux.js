/**
 * Created by liurenpeng on 2018/7/30.
 */
const GOODS_TEMPLATE_LOADING = 'GOODS_TEMPLATE_LOADING';
const GOODS_TEMPLATE_FAIL = 'GOODS_TEMPLATE_FAIL';
const GOODS_TEMPLATE_SUCCESS = 'GOODS_TEMPLATE_SUCCESS';

const GOODS_TEMPLATE_SAVE = 'GOODS_TEMPLATE_SAVE';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case GOODS_TEMPLATE_LOADING:
     return {
       ...state,
       loading: true,
       loaded: false,
     };
    case GOODS_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case GOODS_TEMPLATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    case GOODS_TEMPLATE_SAVE:
      return{
        ...state,
        searchparams:action
      }
    default:
      return state
  }
}

export function queryTemplateSearch (values) {
  return {
    types: [GOODS_TEMPLATE_LOADING, GOODS_TEMPLATE_SUCCESS, GOODS_TEMPLATE_FAIL],
    promise: (client) => client.get('/item/platform/itemTmpl/queryTmpls',{params:values})
  }
}

export function saveTemplateParams (values) {
  return {
    type:GOODS_TEMPLATE_SAVE,
    searchparams: values
  }
}