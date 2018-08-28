import { routerReducer } from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';
import domain from 'jdcloudecc/reducer/domain';
import brandSelect from '../../../components-react/GoodsRlease/BrandSelect/redux';
import goodsRlease from '../../../components-react/GoodsRlease/redux';
import goodsEdit from '../../editgoods/Container/redux';
import categoryCascade from '../../../components-react/Common/PlatformCategory/redux';
export default {
    routing: routerReducer,
    session,
    domain,
    goodsRlease,
    goodsEdit,
    brandSelect,
    categoryCascade
}
