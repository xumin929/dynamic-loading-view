import { connect } from 'react-redux';
import inject from "../../../../redux/inject";
import K from "./SecondCategory";

import getSecondCidRedux , { getFirstCid, getSecondCid, getThirdCid, getFourCid, clearData } from './redux/redux';

@inject({ 
    getSecondCidRedux
})
@connect(store => ({
    getSecondCidRedux: store.getSecondCidRedux
}), { 
    getFirstCid,
    getSecondCid,
    getThirdCid,
    getFourCid,
    clearData
})

export default class BindSecondCategory extends K {}