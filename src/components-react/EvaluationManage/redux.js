/**********************************************
 * @author:       liuyang
 * @creatd:       20170504
 * @update:       20170504
 * @description:
 **********************************************/
const REPLYLIST_LOAD = 'REPLYLIST_LOAD';
const REPLYLIST_SUCCESS = 'REPLYLIST_SUCCESS';
const REPLYLIST_FAIL = 'REPLYLIST_FAIL';

const CONFIRMREPLY_LOAD = 'CONFIRMREPLY_LOAD';
const CONFIRMREPLY_SUCCESS = 'CONFIRMREPLY_SUCCESS';
const CONFIRMREPLY_FAIL = 'CONFIRMREPLY_FAIL';

const ItemComment_LOAD = 'ItemComment_LOAD';
const ItemComment_SUCCESS = 'ItemComment_SUCCESS';
const ItemComment_FAIL = 'ItemComment_FAIL';

const CommentAnnex_LOAD = 'CommentAnnex_LOAD', CommentAnnex_SUCCESS = 'CommentAnnex_SUCCESS', CommentAnnex_FAIL = 'CommentAnnex_FAIL';

const CommentReply_LOAD = 'CommentReply_LOAD', CommentReply_SUCCESS = 'CommentReply_SUCCESS', CommentReply_FAIL = 'CommentReply_FAIL';

const ListFrom_LOAD = 'ListFrom_LOAD', ListFrom_SUCCESS = 'ListFrom_SUCCESS', ListFrom_FAIL = 'ListFrom_FAIL';


import {
    API_queryItemCommentList,
    API_replyBuyer,
} from '../../modules/evaluationmanage/Container/API';

const initialState = {
  loading: false,
  loaded: false,
};

export default function ( state = initialState , action={} ) {
  switch ( action.type ) {
    case ListFrom_LOAD:
      return {
          ...state,
  };
  case ListFrom_SUCCESS:
      return {
          ...state,
          ListFrom:action.result
};
  case ListFrom_FAIL:
      return {
          ...state,
};
  case REPLYLIST_LOAD:
      return {
          ...state,
          loading:true
};
  case REPLYLIST_SUCCESS:
      return {
          ...state,
          loading:false,
      loaded:true,
      replyList:action.result
};
  case REPLYLIST_FAIL:
      return {
          ...state,
          loading:false,
      loaded:false
};
  case CONFIRMREPLY_LOAD:
      return {
          ...state,
          loading:true
};
  case CONFIRMREPLY_SUCCESS:
      return {
          ...state,
          loading : false,
      loaded : true,
      confirmReply : action.result
};
  case CONFIRMREPLY_FAIL:
      return {
          ...state,
          loading:false,
      loaded:false
};
  case ItemComment_LOAD:
      return {
          ...state,
};
  case ItemComment_SUCCESS:
      return {
          ...state,
          itemComment : action.result
};
  case ItemComment_FAIL:
      return {
          ...state,
};
  case CommentAnnex_LOAD:
      return {
          ...state,
};
  case CommentAnnex_SUCCESS:
      return {
          ...state,
          commentAnnex : action.result
};
  case CommentAnnex_FAIL:
      return {
          ...state,
};
  case CommentReply_LOAD:
      return {
          ...state,
};
  case CommentReply_SUCCESS:
      return {
          ...state,
          commentReply : action.result
};
  case CommentReply_FAIL:
      return {
          ...state,
};
  default:
  return state
}
}

//查询回复列表
export function queryList (params) {
  return {
        types:[ REPLYLIST_LOAD, REPLYLIST_SUCCESS, REPLYLIST_FAIL ],
        promise:(client) => client.get(API_queryItemCommentList, {params:params}, '', '', true, true)
}
}

//确认是否回复
export function confirmReply (params) {
  return {
        types:[ CONFIRMREPLY_LOAD, CONFIRMREPLY_SUCCESS, CONFIRMREPLY_FAIL],
        promise:(client) => client.get(API_replyBuyer, {
        params:params
      }, '', '', true, true)
}
}

//查询店铺
export function queryShopNamesListFromComment (params) {
  return {
        types:[ListFrom_LOAD, ListFrom_SUCCESS, ListFrom_FAIL],
        promise:(client) => client.post('/comment/platform/comment/queryShopNamesListFromComment', {
        data:params
      }, '', '', true, true)
}
}


//显示或隐藏商品的评论
export function hideItemComment (params) {
  return {
        types:[ ItemComment_LOAD, ItemComment_SUCCESS, ItemComment_FAIL],
        promise:(client) => client.post('/comment/platform/comment/hideItemComment', {
        data:params
      }, '', '', true, true)
}
}

// 显示或隐藏商品的评论图片附件
export function hideItemCommentAnnex (params) {
  return {
        types:[ CommentAnnex_LOAD, CommentAnnex_SUCCESS, CommentAnnex_FAIL],
        promise:(client) => client.post('/comment/platform/comment/hideItemCommentAnnex', {
        data:params
      }, '', '', true, true)
}
}

// 显示或隐藏商品回复内容
export function hideItemCommentReply (params) {
  return {
        types:[ CommentReply_LOAD, CommentReply_SUCCESS, CommentReply_FAIL],
        promise:(client) => client.post('/comment/platform/comment/hideItemCommentReply', {
        data:params
      }, '', '', true, true)
}
}
