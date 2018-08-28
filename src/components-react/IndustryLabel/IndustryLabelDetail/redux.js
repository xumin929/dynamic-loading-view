/**
 * Created by huangxiao3 on 2017/5/24.
 */


//行业标签 详情查询(编辑功能调用)
const INDUSTRYLABEL_DETAIL_LOADING = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_DETAIL_LOADING';
const INDUSTRYLABEL_DETAIL_SUCCESS = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_DETAIL_SUCCESS';
const INDUSTRYLABEL_DETAIL_FAIL = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_DETAIL_FAIL';

//行业标签 详情查询(编辑功能调用) 新增分页查询
const INDUSTRYLABEL_DETAIL_PAGE_LOADING = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_DETAIL_PAGE_LOADING';
const INDUSTRYLABEL_DETAIL_PAGE_SUCCESS = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_DETAIL_PAGE_SUCCESS';
const INDUSTRYLABEL_DETAIL_PAGE_FAIL = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_DETAIL_PAGE_FAIL';

//行业标签 新增获取全部终极类目
const INDUSTRYLABEL_ALLID_LOADING = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_ALLID_LOADING';
const INDUSTRYLABEL_ALLID_SUCCESS = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_ALLID_SUCCESS';
const INDUSTRYLABEL_ALLID_FAIL = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_ALLID_FAIL';

//行业标签新增
const INDUSTRYLABEL_INSERT_LOADING = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_INSERT_LOADING';
const INDUSTRYLABEL_INSERT_SUCCESS = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_INSERT_SUCCESS';
const INDUSTRYLABEL_INSERT_FAIL = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_INSERT_FAIL';

//行业标签保存
const INDUSTRYLABEL_UPDATE_LOADING = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_UPDATE_LOADING';
const INDUSTRYLABEL_UPDATE_SUCCESS = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_UPDATE_SUCCESS';
const INDUSTRYLABEL_UPDATE_FAIL = 'ITEM/INDUSTRYLABEL/INDUSTRYLABEL_UPDATE_FAIL';

export default function (state = {loading:false,industryLabelListdata:null}, action = {}) {
  switch (action.type) {
    /*    case SUPPLY_SEARCH_LOADING:
     return {
     ...state,
     };*/

    //行业标签 详情查询(编辑功能调用)
    case INDUSTRYLABEL_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        industryLabelDetail: action.result,
      };
    case INDUSTRYLABEL_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    //行业标签 新增
    case INDUSTRYLABEL_INSERT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        industryLabelDelete: action.result,
      };
    case INDUSTRYLABEL_INSERT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    //行业标签 保存
    case INDUSTRYLABEL_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        industryLabelDelete: action.result,
      };
    case INDUSTRYLABEL_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };

    //行业标签 详情查询(编辑功能调用) 新增分页查询
    case INDUSTRYLABEL_DETAIL_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        industryLabelPageDetail: action.result,
      };
    case INDUSTRYLABEL_DETAIL_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };

    //行业标签 新增获取全部终极类目
    case INDUSTRYLABEL_ALLID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        industryLabelAllId: action.result,
      };
    case INDUSTRYLABEL_ALLID_FAIL:
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


//行业标签 详情查询(编辑功能调用)
export function industryLabelDetailSearch (values) {
  return {
    types: [INDUSTRYLABEL_DETAIL_LOADING, INDUSTRYLABEL_DETAIL_SUCCESS, INDUSTRYLABEL_DETAIL_FAIL],
    promise: (client) => client.get('/item/platform/tags/queryItemTagDetail',{params:values})
    /*promise: (client) => client.get('/industrylabel/industryLabelDetailSearch.json', {params: values})*/
  }
}

//行业标签 详情查询(编辑功能调用)  新查询增分页
export function industryLabelPageDetailSearch (values) {
  return {
    types: [INDUSTRYLABEL_DETAIL_PAGE_LOADING, INDUSTRYLABEL_DETAIL_PAGE_SUCCESS, INDUSTRYLABEL_DETAIL_PAGE_FAIL],
    promise: (client) => client.get('/item/platform/tags/queryItemTagDetailPage',{params:values})
    /*promise: (client) => client.get('/industrylabel/industryLabelDetailSearch.json', {params: values})*/
  }
}

//行业标签 新增获取全部终极类目
export function industryLabelAllIdSearch (values) {
  return {
    types: [INDUSTRYLABEL_ALLID_LOADING, INDUSTRYLABEL_ALLID_SUCCESS, INDUSTRYLABEL_ALLID_FAIL],
    promise: (client) => client.post('/item/platform/tags/queryCatagoryIdListByTagId',{data:values})
  }
}

//行业标签 新增
export function industryLabelInsert (values) {
  return {
    types: [INDUSTRYLABEL_INSERT_LOADING, INDUSTRYLABEL_INSERT_SUCCESS, INDUSTRYLABEL_INSERT_FAIL],
    promise: (client) => client.post('/item/platform/tags/addItemTag',{data:values})
    /*promise: (client) => client.get('/supplyTestData.json', {params: values})*/
  }
}

//行业标签 保存
export function industryLabelUpdate (values) {
  return {
    types: [INDUSTRYLABEL_UPDATE_LOADING, INDUSTRYLABEL_UPDATE_SUCCESS, INDUSTRYLABEL_UPDATE_FAIL],
    promise: (client) => client.post('/item/platform/tags/updateItemTag',{data:values})
    /*promise: (client) => client.get('/supplyTestData.json', {params: values})*/
  }
}

