import { connect } from 'react-redux';
import industryTagData, { getIndustryTagData } from './redux/queryData';
import inject from "../../../../redux/inject";
import K from "./BasicIndustryTag";

@inject({ industryTagData })
@connect(store => ({ industryTagData: store.industryTagData }), { getIndustryTagData })
export default class BindBasicIndustryTag extends K {}
