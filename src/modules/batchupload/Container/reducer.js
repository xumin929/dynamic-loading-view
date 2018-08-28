import { routerReducer } from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';
import uploadStore from './redux';
import domainData from './redux-domain';
//权限 
import funcPermissions from 'jdcloudecc/reducer/functionPermissions';

export default {
  routing: routerReducer,
  session,
  uploadStore,
  funcPermissions,
  domainData
}
