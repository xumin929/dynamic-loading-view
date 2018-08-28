import { connect } from 'react-redux';
import paramsData, { queryLoginInfo,queryAllAdminUser } from './redux/queryData';
import inject from "../../../../redux/inject";
import K from "./AdminInformation";

@inject({ paramsData })
@connect(store => ({ paramsData: store.paramsData }), { queryLoginInfo,queryAllAdminUser })
export default class BindAdminInformation extends K {}
