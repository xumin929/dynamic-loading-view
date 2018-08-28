import { routerReducer } from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';
/**** Common start ****/
import categoryCascade from '../../../components-react/Common/PlatformCategory/redux';
import brandSelect from '../../../components-react/Common/BrandSelect/redux';
import publishUserSelect from '../../../components-react/Common/PublishUserSelect/redux';
import operatorSelect from '../../../components-react/Common/OperatorSelect/redux'
/**** Common end ****/
import itemBaseSearch from '../../../components-react/ItemBase/ItemSearch/redux';
import copyItem from '../../../components-react/ItemBase/CopyItem/redux';
import funcPermissions from 'jdcloudecc/reducer/functionPermissions';

export default {
    routing: routerReducer,
    session,
    itemBaseSearch,
    brandSelect,
    categoryCascade,
    publishUserSelect,
    operatorSelect,
    copyItem,
    funcPermissions,
}
