/**
 * Created by huangxiao3 on 2017/2/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'jdcloudui';
import ReginPrice from '../RegionPrice/RegionPrice'

export default class SkuTable extends Component {
  constructor(props, context) {
    super(props, context);
  }
  //校验
  static propTypes = {
    skuData: PropTypes.object.isRequired,
  };

  render() {
    const skuItems = this.props.skuData.map((skuItem) => {
      let supplyPrice = '￥';
      for(let i in skuItem.skuPriceList){
        if(skuItem.skuPriceList[i].areaId && skuItem.skuPriceList[i].areaId=='0'){
          supplyPrice+=skuItem.skuPriceList[i].supplyPrice;
        }
      }
      return (
        <Row type="flex" justify="space-around" align="middle" className="sku-row">
          <Col span={5} offset={1}>
            <div className="table-goods">
              <div className="tg-img">
                <img width="57" height="57" src={skuItem.pictureUrl} />
              </div>
              <div className="tg-txt">
                <p><span className="text-grey">SKU编码:</span>{skuItem.skuId}</p>
                <p>{skuItem.attributes}</p>
              </div>
            </div>
          </Col>
          <Col span={3}>
            <ReginPrice supplyPrice={supplyPrice} sourceData={skuItem.skuPriceList} />
          </Col>
          <Col span={3}>
            <span>{skuItem.saleNum}</span>
          </Col>
          {/*占位*/}
          <Col span={11}>
            <span></span>
          </Col>
        </Row>
      );
    });
    return(
      <div>
        {skuItems}
      </div>
    )
  }
}


