
const SAVE_ALL ='category/grid/SAVE_ALL';
const SAVE_ALL_SUCCESS='category/grid/SAVE_ALL_SUCCESS';
const SAVE_ALL_FAIL='category/grid/SAVEL_ALL_FAIL';

export default function (state = {loading:false}, action = {}) {
  switch (action.type) {
    case SAVE_ALL:case SAVE_ALL_FAIL:
    return {
      ...state,
      error: action.error
    }
    case SAVE_ALL_SUCCESS:
      return{
        ...state,
        saveData: action.result.data,
        error:action.msg
      }
    default:
      return state
  }
}
/**
 * 保存全部更改
 * @param UUID
 * @param platformId
 * @returns {{types: *[], promise: (function(*): (Request|*))}}
 */
export function categorySaveAllChanges(UUID,platformId) {
  var params = {};
  params.platformId = platformId;
  params.uuid=UUID;
  return {
    types: [SAVE_ALL, SAVE_ALL_SUCCESS, SAVE_ALL_FAIL],
    promise: (client) => client.post('/item/platform/category/saveAllPlatformCategories',{data:params})
  }
}