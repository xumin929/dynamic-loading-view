import { routerReducer } from 'react-router-redux';
import session from 'jdcloudecc/reducer/session';
import domain from 'jdcloudecc/reducer/domain';

/**** Common start ****/
import categoryCascade from '../../../components-react/Common/PlatformCategory/redux';
import brandSelect from '../../../components-react/Common/BrandSelect/redux';
import brandSelectBasic from '../../../components-react/Common/BrandSelectBasic/redux';
import publishUserSelect from '../../../components-react/Common/PublishUserSelect/redux';
import operatorSelect from '../../../components-react/Common/OperatorSelect/redux'
/**** Common end ****/
import supplyAuditSearch from '../../../components-react/SupplyAudit/SupplyAuditSearch/redux';
import itemBaseSearch from '../../../components-react/ItemBase/ItemSearch/redux';
import copyItem from '../../../components-react/ItemBase/CopyItem/redux';
import adoptSupply from '../../../components-react/SupplyAudit/SupplyTable/redux';
import sellGoods from '../../../components-react/SellGoods/SellGoodsSearch/redux';
import sellGoodsEdit from '../../sellgoods/Container/redux';
import goodsEdit from '../../editgoods/Container/redux';
import funcPermissions from 'jdcloudecc/reducer/functionPermissions';
import queryBrand from '../../../components-react/Common/BrandSelectBasic/redux';

export default {
    routing: routerReducer,
    session,
    domain,
    categoryCascade,
    brandSelect,
    brandSelectBasic,
    supplyAuditSearch,
    itemBaseSearch,
    copyItem,
    adoptSupply,
    sellGoodsEdit,
    sellGoods,
    publishUserSelect,
    operatorSelect,
    goodsEdit,
    queryBrand,
    funcPermissions,
}
