import { routerReducer } from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';
import categoryGird from '../../../components-react/Category/CategoryGrid/redux';
import brands from '../../../components-react/Category/CategoryView/redux';
import categoryAdd from '../../../components-react/Category/CategoryAdd/redux';
import categoryCascade from '../../../components-react/Common/Category/redux';
import funcPermissions from 'jdcloudecc/reducer/functionPermissions';

import category_grid_save_all from '../../../components-react/Category/CategoryGrid/redux/save_all_redux';
import category_grid_list from '../../../components-react/Category/CategoryGrid/redux/list_redux';
import category_grid_add from '../../../components-react/Category/CategoryGrid/redux/add_redux';
export default {
    routing: routerReducer,
    session,
    category_grid_save_all,
    category_grid_list,
    category_grid_add,
    brands,
    categoryAdd,
    categoryCascade,
    funcPermissions
}
