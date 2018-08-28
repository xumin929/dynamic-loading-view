/****************************************************************
 * author:王禹展(wyuzhan@163.com)
 * date:2018-03-14
 * description:编辑产品
 ****************************************************************/
const GOODS_LIBRARY_EDIT_LOADING = 'redux/GOODSLIBTARY/EIDT_LOADING';
const GOODS_LIBRARY_EDIT_LOAD_SUCCESS = 'redux/GOODSLIBTARY/EIDT_LOAD_SUCCESS';
const GOODS_LIBRARY_EDIT_LOADING_FAIL = 'redux/GOODSLIBTARY/EIDT_LOADING_FAIL';


export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case GOODS_LIBRARY_EDIT_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case GOODS_LIBRARY_EDIT_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        libraryGoodsEditInfo: JSON.parse(JSON.stringify(action.result.data))
      };
    case GOODS_LIBRARY_EDIT_LOADING_FAIL:

      return {
        ...state,
        loading: false,
        loaded: true
      };
    default:
      return {
        ...state,
      };
  }
}

export function queryLibraryGoodsAction(param,type) {
  let url = '/item/platform/itemLibrary/queryLibraryItemInfo';
  if(type){
    url = '/item/platform/itemLibrary/queryItemInfoFromShop'
  }
  return {
    types: [GOODS_LIBRARY_EDIT_LOADING, GOODS_LIBRARY_EDIT_LOAD_SUCCESS, GOODS_LIBRARY_EDIT_LOADING_FAIL],
    promise: (client) => client.get(url, {params: param})
  };
}
