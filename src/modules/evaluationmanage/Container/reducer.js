import { routerReducer } from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';
import domain from 'jdcloudecc/reducer/domain';
import EvaluationManage from '../../../components-react/EvaluationManage/redux';
//权限
import funcPermissions from 'jdcloudecc/reducer/functionPermissions';

export default {
  routing: routerReducer,
  session,
  domain,
  funcPermissions,
  EvaluationManage
}
