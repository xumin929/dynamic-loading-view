/****************************************************************
 * author:FengYan
 * date:2017-02-14
 * description:brand detail redux
 ****************************************************************/
const CHECK = 'allCategory/LOAD';
const CHECK_SUCCESS = 'allCategory/LOAD_SUCCESS';
const CHECK_FAIL = 'allCategory/LOAD_FAIL';


//查询平台下所有类目信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//参数说明：platformId:平台id
export function GetAllCategoryAction(params) {
  return {
    types: [CHECK, CHECK_SUCCESS, CHECK_FAIL],
    promise: (client) => client.get('/item/platform/category/getCategoriesByPlatformId', params,'','',true,true)
  }
}
export default function (state = {loading: false}, action = {}) {
  switch (action.type) {
    case CHECK:
      return {
        ...state,
        loading: true
      }
    case CHECK_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      }
    case CHECK_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      }
    default:
      return state
  }
}
