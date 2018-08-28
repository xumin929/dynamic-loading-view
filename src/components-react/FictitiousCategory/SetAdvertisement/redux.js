
 /**
 * Created by yuanye on 2017/5/25
 */
const SET_ADVERTISEMENT_INIT_LOADING = 'SET_ADVERTISEMENT_INIT/SET_ADVERTISEMENT_INIT_LOADING';
const SET_ADVERTISEMENT_INIT_SUCCESS = 'SET_ADVERTISEMENT_INIT/SET_ADVERTISEMENT_INIT_SUCCESS';
const SET_ADVERTISEMENT_INIT_FAIL = 'SET_ADVERTISEMENT_INIT/SET_ADVERTISEMENT_INIT_FAIL';
const SET_ADVERTISEMENT_SAVE_LOADING = 'SET_ADVERTISEMENT_SAVE/SET_ADVERTISEMENT_SAVE_LOADING';
const SET_ADVERTISEMENT_SAVE_SUCCESS = 'SET_ADVERTISEMENT_SAVE/SET_ADVERTISEMENT_SAVE_SUCCESS';
const SET_ADVERTISEMENT_SAVE_FAIL = 'SET_ADVERTISEMENT_SAVE/SET_ADVERTISEMENT_SAVE_FAIL';

const CLEAR_IMG = 'CLEAR_IMG_STATUS/CLEAR_IMG';

export default function(state={loading:false},action={}){
  switch (action.type){
    case SET_ADVERTISEMENT_INIT_LOADING:
      return{
        ...state,
        loading: true,
        loaded: false
      };
    case SET_ADVERTISEMENT_INIT_FAIL:
      return{
        ...state,
        loading: false,
        loaded: false,
        error: action.result
      }; 
    case SET_ADVERTISEMENT_INIT_SUCCESS:
      return{
        ...state,
        loading: false,
        loaded: true,
        setAdInit:action.result
      }; 
    case SET_ADVERTISEMENT_SAVE_LOADING:
      return{
        ...state,
        loading: true,
        loaded: false
      };
    case SET_ADVERTISEMENT_SAVE_FAIL:
      return{
        ...state,
        loading: false,
        loaded: false,
        error: action.result
      }; 
    case SET_ADVERTISEMENT_SAVE_SUCCESS:
      return{
        ...state,
        loading: false,
        loaded: true,
        setAdSave:action.result
      }; 
    case CLEAR_IMG:
      return{
        ...state,        
        setAdInit:{}
      }
    default:
      return state
  }
}

export function setAdInit(values) { 
  return{
    types:[SET_ADVERTISEMENT_INIT_LOADING,SET_ADVERTISEMENT_INIT_SUCCESS,SET_ADVERTISEMENT_INIT_FAIL],
    promise:(client)=>client.get('/platform-service/platform/frontcategory/queryPlatformFrontCategoryAdDetail',{params:values})
  }
}
export function clearImg(values) { 
  return{
    type: CLEAR_IMG,    
    //promise:(client)=>client.get('/platform-service/platform/frontcategory/queryPlatformFrontCategoryAdDetail',{params:values})
  }
}
export function setAdSave(values) { 
  return{
    types:[SET_ADVERTISEMENT_SAVE_LOADING,SET_ADVERTISEMENT_SAVE_SUCCESS,SET_ADVERTISEMENT_SAVE_FAIL],
    promise:(client)=>client.get('/platform-service/platform/frontcategory/insertPlatformFrontCategoryAd',{params:values})
  }
}