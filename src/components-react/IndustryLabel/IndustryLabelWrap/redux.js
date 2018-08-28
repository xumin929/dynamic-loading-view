/**
 * Created by huangxiao3 on 2017/5/23.
 */

//行业标签分页搜索
const INDUSTRYLABEL_SEARCH_LOADING = 'ITEM/INDUSTRYLABEL/INDUSTRYLABELE_SEARCH_LOADING';
const INDUSTRYLABEL_SEARCH_SUCCESS = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_SEARCH_SUCCESS';
const INDUSTRYLABEL_SEARCH_FAIL = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_SEARCH_FAIL';

//行业标签 搜索参数保存
const INDUSTRYLABEL_SEARCH_SAVE = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_SEARCH_SAVE';

//行业标签 删除
const INDUSTRYLABEL_DELETE_LOADING = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_DELETE_LOADING';
const INDUSTRYLABEL_DELETE_SUCCESS = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_DELETE_SUCCESS';
const INDUSTRYLABEL_DELETE_FAIL = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_DELETE_FAIL';


export default function (state = {loading:false,listLoading:false,industryLabelListdata:null}, action = {}) {
  switch (action.type) {
    case INDUSTRYLABEL_SEARCH_LOADING:
     return {
     ...state,
     listLoading:true,
     listLoaded:false,
     };
    //行业标签分页搜索
    case INDUSTRYLABEL_SEARCH_SUCCESS:
      return {
        ...state,
        listLoading: false,
        listLoaded: true,
        industryLabelListdata: action.result,
      };
    case INDUSTRYLABEL_SEARCH_FAIL:
      return {
        ...state,
        listLoading: false,
        listLoaded: false,
        error: action.msg
      };
    //行业标签 搜索参数保存
    case INDUSTRYLABEL_SEARCH_SAVE:
      return{
        ...state,
        industryLabelSearchdata:action
      }

    //行业标签 删除
    case INDUSTRYLABEL_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        industryLabelDelete: action.result,
      };
    case INDUSTRYLABEL_DELETE_FAIL:
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

//行业标签分页搜索
export function industryLabelSearch (values) {
  return {
    types: [INDUSTRYLABEL_SEARCH_LOADING, INDUSTRYLABEL_SEARCH_SUCCESS, INDUSTRYLABEL_SEARCH_FAIL],
    promise: (client) => client.get('/item/platform/tags/itemTagList',{params:values})
    /*promise: (client) => client.get('/industrylabel/industryLabelSearch.json',{params:values})*/
  }
}

//行业标签 搜索参数保存
export function saveFormData (values) {
  return {
    type:INDUSTRYLABEL_SEARCH_SAVE,
    searchdata: values
  }
}


//行业标签 删除
export function industryLabelDelete (values) {
  return {
    types: [INDUSTRYLABEL_DELETE_LOADING, INDUSTRYLABEL_DELETE_SUCCESS, INDUSTRYLABEL_DELETE_FAIL],
    promise: (client) => client.get('/item/platform/tags/deleteItemTag',{params:values})
    /*promise: (client) => client.get('/supplyTestData.json', {params: values})*/
  }
}


