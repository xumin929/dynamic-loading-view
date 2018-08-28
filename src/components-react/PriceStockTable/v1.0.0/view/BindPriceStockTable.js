import { connect } from 'react-redux';
import priceStockData, { getCustomerLabel,getRegionalPriceStock,queryShopInfo } from './redux';
import inject from "../../../../redux/inject";
import K from "./PriceStockTable";

 @inject({ priceStockData  })
 @connect(store => ({ priceStockData: store.priceStockData}), { getCustomerLabel,getRegionalPriceStock,queryShopInfo })
export default class BindPriceStockTable extends K {}