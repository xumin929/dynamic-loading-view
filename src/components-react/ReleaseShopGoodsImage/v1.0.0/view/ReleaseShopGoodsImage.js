/**
 * @file 发布商品-商品图片Tab组件
 */
import React, { Component } from 'react';
import GoodImageShop from "../../../GoodImageShop/v1.0.0/view/index"
import SkuImageShop from "../../../SkuImageShop/v1.0.0/view/index";



export default class ReleaseShopGoodsImage extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <div>
            <GoodImageShop saleAttributeData={this.props.saleAttributeData}  //拼接后的销售规格数据
                           updateItemTmplAction={this.props.updateItemTmplAction} //更新总数据的方法
                           itemTmplPublishVo={this.props.itemTmplPublishVo} //当前已保存的总数据
             />
            <SkuImageShop saleAttributeData={this.props.saleAttributeData}  //拼接后的销售规格数据
                          updateItemTmplAction={this.props.updateItemTmplAction} //更新总数据的方法
                          itemTmplPublishVo={this.props.itemTmplPublishVo} //当前已保存的总数据

            />
        </div>
    );
  }
}
