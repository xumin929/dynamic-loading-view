import React, {Component} from 'react';
import { Breadcrumb } from 'jdcloudui';
import SellGoodsSearch from '../../../components-react/SellGoods/SellGoodsSearch/SellGoodsSearch';
import SaleGoods from '../../../components-react/SellGoods/SaleGoods/SaleGoods';
import { provideHooks } from 'redial';
import {getDomain} from 'jdcloudecc/reducer/domain';
import './style/saleGood.css';
import { withRouter } from 'react-router';
import queryString from 'query-string';
const pageSize = 10;
var pageNum='';

@provideHooks({
    fetch: async ({ store: { dispatch, getState } }) => {
        await dispatch(getDomain()).catch(() => null);
        console.log("get data async from server")
    }
})
@withRouter
export default class SellGoods extends Component {
  componentWillMount(){
      let {search} = this.props.location;
      pageNum = queryString.parse(search) && queryString.parse(search).pageNum;
  }
  render() {
      let {search} = this.props.location;
      let productStatus = queryString.parse(search) && queryString.parse(search).productStatus;
      console.log('==>productStatus:',queryString.parse(productStatus));
    return (
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>销售商品管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">销售商品管理</div>
          <div className="ui-bd pt16 pr16 pb60 pl18">
            <SellGoodsSearch status={productStatus} pageSize={pageSize}/>
            <div className="mt20">
              <SaleGoods status={productStatus} pageSize={pageSize} pageNum={pageNum}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
