/**
 * author:suyunxia
 * date:2017-02-17
**/
import React, {Component} from 'react';
import { Input } from 'jdcloudui';
import RegionPrice from '../RegionPrice/RegionPrice';
import styles from './style/sellGoodsEditBox.css';
import SkuList from  '../../SellGoods/SkuList/SkuList';

export default class SellGoodsEditBox extends Component {

   constructor(props, context) {
      super(props, context);
      this.state = {
         visible: false,
      };
      this.tpl = [];
   }

   showModal() {
      this.setState({
         visible: true,
      });
   }

   showTpl(){
      for(let i=0, _data=this.props.data, _size=_data.length; i<_size; i++){
         this.tpl.push(
            <tbody  key={i}>
               <tr className={styles.sumTr} data-id={ _data[i].id } data-skuid={_data[i].skuId}>
                  <td>{ _data[i].skuId }   尺寸   容量</td>
                  <td>销量：99999</td>
                  <td>平均供货价：<span className="txt-red">￥123</span></td>
                  <td>全国统一面价：<Input size="large" style={{width: 90}} /><a className="ml10" onClick={()=>this.showModal()}>设置地域价</a><a className="ml10">查看</a></td>
                  <td>全国统一批发价：<Input size="large" style={{width: 90}} /><a className="ml10" onClick={()=>this.showModal()}>设置地域价</a><a className="ml10">查看</a></td>
               </tr>
               <SkuList data={_data[i].shopItemSkuPriceList}/>
            </tbody>
         )
      }
   }

   render() {
      this.showTpl();
      return (
         <div>

            <RegionPrice
                visible={this.state.visible}
            />

            <div className="ui-tbl">
               <table>
                  <colgroup>
                     <col/>
                     <col/>
                     <col style={{width: 170}}/>
                     <col style={{width: 310}} />
                     <col style={{width: 310}} />
                  </colgroup>
                  {this.tpl}
               </table>
            </div>
         </div>
      )
   }

}
