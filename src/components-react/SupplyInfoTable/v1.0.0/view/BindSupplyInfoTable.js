import { connect } from 'react-redux';
import regionalData, { getRegionalPrice } from './redux';
import inject from "../../../../redux/inject";
import K from "./SupplyInfoTable";

 @inject({ regionalData  })
 @connect(store => ({ regionalData: store.regionalData}), { getRegionalPrice })
export default class BindSupplyInfoTable extends K {}