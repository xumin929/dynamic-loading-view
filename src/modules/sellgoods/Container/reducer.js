/**
 * Created by huangxiao3 on 2017/3/1.
 */
import { routerReducer } from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';
import domain from 'jdcloudecc/reducer/domain';
import sellGoodsSearch from '../../../components-react/SellGoods/SellGoodsSearch/redux';
import categoryCascade from '../../../components-react/Common/PlatformCategory/redux';
import brandSelect from '../../../components-react/Common/BrandSelect/redux';
import updateItembatchShelves from '../../../components-react/SellGoods/SellGoodsResults/redux';
import operatorSelect from '../../../components-react/Common/OperatorSelect/redux'
import brandSelectBasic from '../../../components-react/Common/BrandSelectBasic/redux';
import SaleItem from '../../../components-react/SellGoods/SaleGoods/redux';
import funcPermissions from 'jdcloudecc/reducer/functionPermissions';
export default {
    routing: routerReducer,
    session,
    domain,
    SaleItem,
    sellGoodsSearch,
    brandSelect,
    brandSelectBasic,
    categoryCascade,
    updateItembatchShelves,
    operatorSelect,
    funcPermissions,
}
