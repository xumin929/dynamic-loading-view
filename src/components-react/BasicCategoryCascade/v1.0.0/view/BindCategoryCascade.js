import { connect } from 'react-redux';
import inject from "../../../../redux/inject";
import K from "./CategoryCascade";

import getCidRedux , { getFirstCid, getSecondCid, getThirdCid, getFourCid, clearData } from './redux/redux';
import resetParamsRedux from './redux/resetparams_redux';

@inject({ 
    getCidRedux,
    resetParamsRedux
})
@connect(store => ({
    getCidRedux: store.getCidRedux,
    resetParamsRedux: store.resetParamsRedux,
}), { 
    getFirstCid,
    getSecondCid,
    getThirdCid,
    getFourCid,
    clearData
})

export default class BindCategoryCascade extends K {}