import { connect } from 'react-redux';
import inject from "../../../../redux/inject";
import K from "./ShopCategory";

import getShopCidRedux , { getFirstCid, getSecondCid, clearData } from './redux/redux';

@inject({ 
    getShopCidRedux
})
@connect(store => ({
    getShopCidRedux: store.getShopCidRedux
}), {
    getFirstCid,
    getSecondCid,
    clearData
})

export default class BindShopCategory extends K {}