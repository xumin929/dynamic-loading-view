/**
 * @file 发布商品-商品图片Tab组件
 */
import React, { Component } from 'react';
import GoodImagePlatform from "../../../GoodImagePlatform/v1.0.0/view/index";
import SkuImagePlatform from "../../../SkuImagePlatform/v1.0.0/view/index";

export default class ReleasePlatformGoodsImage extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
        <div>
            <GoodImagePlatform
                saleAttributeData={this.props.saleAttributeData}  //拼接后的销售规格数据
                updateItemTmplAction={this.props.updateItemTmplAction} //更新总数据的方法
                itemTmplPublishVo={this.props.itemTmplPublishVo} // 发布、保存、编辑，总数据源
            />
            <SkuImagePlatform
                saleAttributeData={this.props.saleAttributeData}  //拼接后的销售规格数据
                updateItemTmplAction={this.props.updateItemTmplAction} //更新总数据的方法
                itemTmplPublishVo={this.props.itemTmplPublishVo} // 发布、保存、编辑，总数据源
            />
        </div>
    );
  }
}
