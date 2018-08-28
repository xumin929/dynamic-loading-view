/**
 * Created by huangxiao3 on 2017/2/27.
 */
import React, {Component} from 'react';
import SupplySeeMore from '../SupplySeeMore/SupplySeeMore'

export default class SkuList extends Component {
  constructor(props, context){
    super(props, context);
  }

  createData(){
    var dataSource = this.props.shopItemSkuPriceList.map((data)=>{
      return(
        <tr>
          <td>供货商：{data.supplySellerName}</td>
          <td>销量：{data.salesVolume}</td>
          <td></td>
          <td><span className="fb mr10">全国统一价</span> 供货价：<span className="txt-red">￥{data.supplyPrice}</span></td>
          <td>基础备货：<span className="txt-red">{data.inventory}</span>
            <SupplySeeMore title={data.supplySellerName} totalPrice={data.supplyPrice} itemId={data.itemId} skuId={data.skuId} supplySellerId={data.supplySellerId} />
          </td>
        </tr>
      );
    });
    return dataSource;
  }

  render(){
    return (
      <tr>
        <td colSpan="5" style={{padding:0}}>
          <table>
            <colgroup>
              <col />
              <col />
              <col style={{width: 170}} />
              <col style={{width: 350}} />
              <col style={{width: 350}} />
            </colgroup>
            <tbody>
            {this.createData()}
            </tbody>
          </table>
        </td>
      </tr>
    )
  }

}
