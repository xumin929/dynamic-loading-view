import { connect } from 'react-redux';
import skuUnitDS, { querySkuUnit } from './redux-SkuUnit';
import inject from "../../../../redux/inject";
import K from "./ReleaseSaleInfo";

@inject({ skuUnitDS  })
@connect(store => ({ skuUnitDS: store.skuUnitDS }), { querySkuUnit })
export default class BindReleaseSaleInfo extends K {}