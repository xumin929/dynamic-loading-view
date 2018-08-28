import { connect } from 'react-redux';
import addressData, { getAddressInfo } from './redux';
import inject from "../../../../redux/inject";
import K from "./SupplyInfoAddress";

 @inject({ addressData  })
 @connect(store => ({ addressData: store.addressData }), { getAddressInfo })
export default class BindSupplyInfoAddress extends K {}