import { routerReducer } from 'react-router-redux';
import FC from '../../../components-react/FictitiousCategory/FictitiousCategoryViewWrap/redux';
import SetAdvertisement from '../../../components-react/FictitiousCategory/SetAdvertisement/redux';

//权限 
import funcPermissions from 'jdcloudecc/reducer/functionPermissions';
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';

export default {
  routing: routerReducer,
  FC,
  SetAdvertisement,
  funcPermissions,
}
