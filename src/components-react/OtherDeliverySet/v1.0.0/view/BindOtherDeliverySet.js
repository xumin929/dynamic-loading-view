import { connect } from 'react-redux';
import DeliveryData, { getDeliverySet } from './redux';
import inject from "../../../../redux/inject";
import K from "./OtherDeliverySet";

@inject({ DeliveryData  })
@connect(store => ({ DeliveryData: store.DeliveryData }), { getDeliverySet })
export default class BindOtherDeliverySet extends K {}