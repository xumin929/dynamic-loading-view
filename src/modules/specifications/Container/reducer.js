import { routerReducer } from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';
import categoryGird from '../../../components-react/Category/CategoryGrid/redux';
import brands from '../../../components-react/Category/CategoryView/redux';
import brandup from '../../../components-react/Brand/BrandUp/redux';
import categoryAdd from '../../../components-react/Category/CategoryAdd/redux';
/**** Common start ****/
import brandSelect from '../../../components-react/Common/BrandSelect/redux';
import categoryCascade from '../../../components-react/GoodsRlease/Category/redux';
/**** Common end ****/
/**** Specifications start ****/
import specifications from '../Container/redux';
import specificationAdd from '../../../components-react/Specification/SpecificationAdd/redux';
import specificationSearch from '../../../components-react/Specification/SpecificationSearch/redux';
import speciCopying from '../../../components-react/Specification/Copying/redux';
/**** Specifications end ****/
/**** Brand start ****/
//所有 Brand 调用的redux全部放到这里
import brandSearch from '../../../components-react/Brand/BrandSearch/redux';
import BrandDetail from '../../../components-react/Brand/BrandList/redux/BrandDetailRedux';
import BrandDisable from '../../../components-react/Brand/BrandList/redux/BrandDisableRedux';
import BrandSave from '../../../components-react/Brand/BrandList/redux/BrandSaveRedux';
import getAllCategory from '../../../components-react/Brand/GetAllCategory/redux';
/**** Brand end ****/
import supplyAuditSearch from '../../../components-react/SupplyAudit/SupplyAuditSearch/redux';
import itemBaseSearch from '../../../components-react/ItemBase/ItemSearch/redux';
import copyItem from '../../../components-react/ItemBase/CopyItem/redux';
import adoptSupply from '../../../components-react/SupplyAudit/SupplyTable/redux';
import sellGoods from '../../../components-react/SellGoods/SellGoodsSearch/redux';
import sellGoodsEdit from '../../sellgoods/Container/redux';
import regionPrice from '../../../components-react/SellGoods/RegionPrice/redux';
import goodsRlease from '../../../components-react/GoodsRlease/redux';
//权限
import funcPermissions from 'jdcloudecc/reducer/functionPermissions';
export default {
    routing: routerReducer,
    session,
    categoryCascade,
    specifications,
    specificationAdd,
    brandSearch,
    specificationSearch,
    categoryAdd,
    brands,
    speciCopying,
    brandup,
    categoryGird,
    BrandDetail,
    getAllCategory,
    BrandDisable,
    BrandSave,
    brandSelect,
    supplyAuditSearch,
    itemBaseSearch,
    copyItem,
    adoptSupply,
    sellGoodsEdit,
    sellGoods,
    regionPrice,
    goodsRlease,
    funcPermissions
}
