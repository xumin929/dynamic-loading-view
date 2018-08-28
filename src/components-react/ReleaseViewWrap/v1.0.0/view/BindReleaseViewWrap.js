import { connect } from 'react-redux';
import inject from "../../../../redux/inject";
import K from "./ReleaseViewWrap";

import tabComponents, { loadTabComponents } from './redux/redux-dyTabCom';
import saveParamsRedux, { saveParamsAction } from './redux/saveparams_redux';
import saveSkuListRedux, { saveSkuListAction } from './redux/saveskulist_redux';
import itemInfoRedux, { getItemInfoAction } from './redux/iteminfo_redux';
import saleAttributeRedux, { getSaleAttributeAction } from './redux/saleattribute_redux';
import getTemplateIdRedux, { queryGetTemplateId } from './redux/getTemplateId_redux';

// 店铺 其他设置/配送设置/运费模板
import tempRedux, { queryDeliveryFareTemplate } from './redux/deliveryFareTemplate_redux';

@inject({ 
    tabComponents, 
    saveParamsRedux, 
    saveSkuListRedux,
    itemInfoRedux,
    saleAttributeRedux,
    tempRedux, // 运费模板
    getTemplateIdRedux, //获取模板id
})
@connect(store => ({ 
    tabComponents: store.tabComponents, 
    saveParamsRedux: store.saveParamsRedux,
    saveSkuListRedux: store.saveSkuListRedux,
    itemInfoRedux: store.itemInfoRedux,
    saleAttributeRedux: store.saleAttributeRedux,
    tempRedux: store.tempRedux, // 运费模板
    getTemplateIdRedux: store.getTemplateIdRedux,
}), {
    loadTabComponents,
    getSaleAttributeAction,
    saveSkuListAction,
    saveParamsAction,
    getItemInfoAction,
    queryDeliveryFareTemplate,
    queryGetTemplateId
})
export default class BindReleaseViewWrap extends K {}