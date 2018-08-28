/**存储销售规格组件使用数据的redux */
const SAVESKULIST = 'SAVESKULIST';

export default function (state = [], action = {}) {
    switch (action.type) {
        case SAVESKULIST:
            return {
                ...state,
                loading: false,
                loaded: true,
                skuListData: action.data
            }
        default:
            return state;
        
    }
}

export function saveSkuListAction(data){
    return {
        type: SAVESKULIST,
        data: data
    }
}