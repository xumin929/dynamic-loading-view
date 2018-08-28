/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  商品库相关redux
 * *********************************************/

/* **********  系统组件  ********** */
import {routerReducer} from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';

/* **********  自定义组件  ********** */
import getCategoriesByParentId from './redux/category_redux';

export default {
  routing: routerReducer,
  session,
  getCategoriesByParentId
};
