/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  商品库相关redux
 * *********************************************/

/* **********  系统组件  ********** */
import {routerReducer} from 'react-router-redux';
import session from 'jdcloudecc/reducer/session';

/* **********  自定义组件  ********** */
import domain from 'jdcloudecc/reducer/domain';
import funcPermissions from 'jdcloudecc/reducer/functionPermissions';
import queryItemLibraryList from '../../../components-react/GoodsLibrary/common/Search/redux/queryItemLibraryList_redux';
import getCategoriesByParentId from '../../../components-react/GoodsLibrary/common/CategoryPlatform/redux/category_redux';
import queryLibraryGoodsInfo from './edit_redux';
import Params from '../../../components-react/GoodsLibrary/parameters_redux';
import PanelData from '../../../components-react/GoodsLibrary/params_redux';


export default {
    routing: routerReducer,
    session,
    domain,
    funcPermissions,
    queryItemLibraryList,
    getCategoriesByParentId,
    Params,
    PanelData,
    queryLibraryGoodsInfo
};
