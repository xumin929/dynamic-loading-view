/**
 * Created by huangxiao3 on 2017/3/1.
 */
import { routerReducer } from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';

//SaleItem 重构 暂时使用 start
import saleItemEdit from '../../../components-react/SaleItemEdit/SaleItemView/redux';
import saleItemPriceList from '../../../components-react/SaleItemEdit/SaleItemPriceList/redux';
import regionPriceEdit from '../../../components-react/SaleItemEdit/RegionPriceEdit/redux'
//SaleItem 重构 暂时使用 end
import areaSupplyerPrice from '../../../components-react/SaleItemEdit/AreaSupplyerPrice/redux'
import regionPriceDetail from '../../../components-react/SaleItemEdit/RegionPriceDetail/redux'
import supplySeeMore from '../../../components-react/SaleItemEdit/SupplySeeMore/redux'

export default {
    routing: routerReducer,
    session,
    saleItemEdit,
    saleItemPriceList,
    regionPriceEdit,
    areaSupplyerPrice,
    regionPriceDetail,
    supplySeeMore
}
