import { routerReducer } from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';
import domain from 'jdcloudecc/reducer/domain';

import industryLabelWrap from '../../../components-react/IndustryLabel/IndustryLabelWrap/redux';
import allCategory from '../../../components-react/IndustryLabel/CategoryLinkPop/redux';
import industryLabelDetail from '../../../components-react/IndustryLabel/IndustryLabelDetail/redux';
//权限 
import funcPermissions from 'jdcloudecc/reducer/functionPermissions';

export default {
  routing: routerReducer,
  session,
  domain,
  industryLabelWrap,
  allCategory,
  industryLabelDetail,
  funcPermissions
}
