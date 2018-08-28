/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:specification
 ****************************************************************/
const LOADING = 'redux/Specifications/LOADING';
const LOAD_SUCCESS = 'redux/Specifications/LOAD_SUCCESS';
const LOADING_FAIL = 'redux/Specifications/LOADING_FAIL';
//编辑
const EDIT_FAIL = 'redux/Specifications/EDIT_FAIL';
const EDIT_SUCESS = 'redux/Specifications/EDIT_SUCESS';
const EDITING = 'redux/Specifications/EDITING';
//保存
const SAVING = 'redux/Specifications/SAVING';
const SAVE_SUCCESS = 'redux/Specifications/SAVE_SUCCESS';
const SAVE_FAIL = 'redux/Specifications/SAVE_FAIL';
//停用
const STOPING = 'redux/Specifications/STOPING';
const STOP_SUCCESS = 'redux/Specifications/STOP_SUCCESS';
const STOP_FAIL = 'redux/Specifications/STOP_FAIL';
//上移下移
const MOVING = 'redux/Specifications/MOVING';
const MOVE_SUCCESS = 'redux/Specifications/MOVE_SUCCESS';
const MOVE_FAIL = 'redux/Specifications/MOVE_FAIL';
//置顶置底
const TOING = 'redux/Specifications/TOING';
const TO_SUCCESS = 'redux/Specifications/TO_SUCCESS';
const TO_FAIL = 'redux/Specifications/TO_FAIL';

//删除属性值
const DELETE = 'redux/Specifications/DELETE';
const DELETE_SUCCESS = 'redux/Specifications/DELETE_SUCCESS';
const DELETE_FAIL = 'redux/Specifications/DELETE_FAIL';

import{
    API_QUERYPLATFORMCATEGORYATTRIBUTEBYATTRID,
    API_UPDATEPLATFORMCATEGORYATTRIBUTE,
    API_UPDATEPLATFORMATTRIBUTESTATE,
    API_UPDATESORT,
    API_UPDATESORTTOP,
    API_DELETE
} from './API'
const initialState = {
  loading: false,
  loaded: false,
  editData: false
};
export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case LOADING:
      return {
        ...state,
        listloading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        listloading: false
      };
    case LOADING_FAIL:
      return {
        ...state,
        listloading: false
      };
    // 编辑 查看
    case EDITING:
      return {
        ...state,
        specloading: true
      }
    case EDIT_SUCESS:
      return {
        ...state,
        specloading: false,
        loaded: true,
        editData: action
      }
    case EDIT_FAIL:
      return {
        ...state,
        specloading: false,
        loaded: false,
        editError: action
      }
    //保存修改
    case SAVING:
      return {
        ...state,
        loading: true
      }
    case SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        saveData: action.result
      }
    case SAVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        saveError: action.error.message
      }
    // 停用
    case STOPING:
      return {
        ...state,
        loading: true
      }
    case STOP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        stopData: action.result
      }
    case STOP_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        stopError: action.error.message
      }
    //上移下移
    case MOVING:
      return {
        ...state,
        loading: true
      }
    case MOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        moveData: action.result
      }
    case MOVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        moveError: action.error.message
      }
    //置顶置底
    case TOING:
      return {
        ...state,
        loading: true
      }
    case TO_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        toData: action.result
      }
    case TO_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        toError: action.error.message
      }
    //对删除属性值进行判断
    case DELETE:
      return {
        ...state,
        deleteloading: true
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        deleteloading: false,
        deleteloaded: true,
        deleteData: action
      }
    case DELETE_FAIL:
      return {
        ...state,
        deleteloading: false,
        deleteloaded: false,
        deleteError: action
      }
    default:
      return state;
  }
}
// test
export function isLoading(globalState){
	console.log('this is a isLoading1');
	return {
		 type: LOADING
	}
}
//查看和编辑
export function edit(param){
	return {
		types: [EDITING, EDIT_SUCESS, EDIT_FAIL],
    	promise: (client) => client.get(API_QUERYPLATFORMCATEGORYATTRIBUTEBYATTRID, {
    		params: param
    	})
	}
}
//保存
export function saveEdit(param) {
  let paramJson={};
  paramJson.platformAttributeParam=JSON.stringify(param);
	return {
		types: [SAVING, SAVE_SUCCESS, SAVE_FAIL],
    	/*promise: (client) => client.post('/platform/categoryAttribute/updatePlatformCategoryAttribute?platformId=' + param.platformId, {
    		params: JSON.parse(JSON.stringify(param.platformCategoryAttribute))
    	})*/
    	promise: (client) => client.post(API_UPDATEPLATFORMCATEGORYATTRIBUTE, {
    		//data: JSON.parse(JSON.stringify(param))
        //platformAttributeParam: JSON.stringify(param)
        data:paramJson
    	})
	}
}
//停用
export function stopUse(param) {
	return {
		types: [STOPING, STOP_SUCCESS, STOP_FAIL],
    	promise: (client) => client.post(API_UPDATEPLATFORMATTRIBUTESTATE,{
    		data: param
    	})
	}
}
//上移下移
export function move(param) {
  console.log('上移下移');
  return {
    types: [MOVING, MOVE_SUCCESS, MOVE_FAIL],
    promise: (client) => client.get(API_UPDATESORT,{
      params: param
    })
  }
}
//置顶置底
export function topBttom(param) {
  return {
    types: [TOING, TO_SUCCESS, TO_FAIL],
    promise: (client) => client.post(API_UPDATESORTTOP,{
      data: param
    })
  }
}

//确定是否删除
export function ifDelete(param) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (client) => client.post(API_DELETE, {
      data: param
    })
  }
}
