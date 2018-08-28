/**
 * Created by huangxiao3 on 2017/3/16.
 */

const AREA_INFO_LOADING = 'itemPublish/queryAreasupplyPrice/AREA_INFO_LOADING';
const AREA_INFO_SUCCESS = 'itemPublish/queryAreasupplyPrice/AREA_INFO_SUCCESS';
const AREA_INFO_FAIL = 'itemPublish/queryAreasupplyPrice/AREA_INFO_FAIL';

const initialState = {
  loading: false,
};
export default function (state = initialState, action = {}) {
  switch(action.type) {
    //获取初始信息
    /*case AREA_INFO_LOADING:
     return {
     ...state,
     loading: true
     }*/
    case AREA_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data
      }
    case AREA_INFO_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      }

    default:
      return state;
  }
}

export function queryAreaSupplyPrice (values) {
  return {
    types: [ AREA_INFO_LOADING, AREA_INFO_SUCCESS, AREA_INFO_FAIL],
    promise: (client) => client.get('/item/platform/itemPublish/queryAreasupplyPrice', {params:values})
  }
}
