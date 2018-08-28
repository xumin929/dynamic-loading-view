/*
 * Author:gaoqingli
 * Date:2017-02-18
 * Description:销售商品管理SkuTable
 */
import React,{Component} from 'react';
import {Row,Col} from 'jdcloudui';

export default class SkuTable extends Component {
render() {
		const skuItems =  this.props.skuData.map((skuItem) => {
			return (
				<Row type="flex" justify="space-around" align="middle" className="sku-row">
					<Col span={5} offset={1}>
						<div className="table-goods">
							<div className="tg-img">
								<img width="57" height="57" src={skuItem.pictureUrl} />
							</div>
							<div className="tg-txt">
								<p><span className="text-grey">SKU编码:</span>{skuItem.skuId}</p>
								<p>{skuItem.attributesName}</p>
							</div>
						</div>
					</Col>
          {/*面价*/}
					<Col span={3}>
						{skuItem.marketPrice}
					</Col>
          {/*批发价*/}
					<Col span={3}>
						{skuItem.costPrice}
					</Col>
          {/*销量*/}
					<Col span={2}>
						{skuItem.initialMount}
					</Col>
          {/*发布时间*/}
					<Col span={2}>

					</Col>
          {/*商品运营*/}
					<Col span={2}>

					</Col>
          {/*占位*/}
          <Col span={2}>
          </Col>
					<Col span={3}>
					</Col>
				</Row>
			);
		});
		return(
			<div className="sku-warp">
				{skuItems}
			</div>
		)
	}
}
