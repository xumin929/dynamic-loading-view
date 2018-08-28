/**
 * Created by huangxiao3 on 2018/5/31.
 */
const LOAD = 'hoc_dynamic-load-component/center/LOAD';
const LOAD_SUCCESS = 'hoc_dynamic-load-component/center/LOAD_SUCCESS';
const LOAD_FAIL = 'hoc_dynamic-load-component/center/LOAD_FAIL';


const SEARCH = 'hoc_dynamic-load-component/SEARCH/LOAD';
const SEARCH_SUCCESS = 'hoc_dynamic-load-component/SEARCH/LOAD_SUCCESS';
const SEARCH_FAIL = 'hoc_dynamic-load-component/SEARCH/LOAD_FAIL';


export default function(state = {loaded:false}, action = {}) {
    switch (action.type) {
        /*    case LOAD:
         return {
         ...state,
         loading: true
         };*/
        case LOAD_SUCCESS:
            return {
                ...state,
                components:{...action.result.data},
                loading: false,
                loaded: true
            };
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                searchData:{...action.result.data},
                search_loading: false,
                search_loaded: true
            };
        case SEARCH_FAIL:
            return {
                ...state,
                search_loading: false,
                search_loaded: false,
                search_error: action.error
            };
        default:
            return state;
    }
}

export function saveConfigHoc(values) {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: ( client ) => client.get('/module-manage-service/operating/modules/componentConf',{params:values}).then((ret)=>{return ret && ret.data})
    };
}

export function searchConfigHoc(values) {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: ( client ) => client.get('/module-manage-service/operating/modules/queryComponentConfig',{params:values}).then((ret)=>{return ret && ret.data && ret.data.config &&JSON.parse(ret.data.config)})
    };
}

