import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { querySaleItemSku } from '../SaleGoods/redux.js';
import {Icon,Popover,Button, Spin} from 'jdcloudui';
import styles from '../SaleGoods/styles.less';
import '../SaleGoods/style.css';
import * as domain from 'jdcloudecc/reducer/domain';

@connect(
  state => ({SaleItem: state.SaleItem, QuerySaleItemSku: state.SaleItem}),
  dispatch => bindActionCreators({...domain, querySaleItemSku}, dispatch)
)
export default class SaleSublist extends Component {
  constructor(props) {
    super(props);
  }

  ajustHeight(node, rows) {
    let v = node.innerHTML;
    node.innerHTML = "";
    let h1 = node.offsetHeight;
    node.innerHTML = "&nbsp;";
    let h2 = node.offsetHeight;
    let rowHeight = h2 - h1;
    node.innerHTML = v;
    let len = v.length, i = 3;
    while (node.offsetHeight > rowHeight * rows + h1) {
      node.innerHTML = v.substring(0, len - i) + '...';
      i++;
    }
  }

  render() {
    return (
      <div>
        <Spin size="small" spinning={!this.props.loaded} delay={1000}>
          {
            this.props.itemSkuInfoList && this.props.itemSkuInfoList.map((item, key) => {
              return (
                <div className={key == 0 ? `${styles.showSale} bt-so-e7e7ea` : `${styles.showSale} bt-da-e7e7ea`}>
                  <div className={styles.saleInfo}>
                    <div className={styles.pic}>
                      <img src={`${item.pictureUrl}`} alt=""/>
                    </div>
                    <div className={styles.parentBox}>
                      <div className={styles.wenzi}>
                        {item.skuIdStr ? item.skuIdStr : ''}
                        {item.attributesName && item.attributesName.split(';').map((item, key) => {
                          return <p>{item}</p>
                        })}
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.parentBox} w-12`}>
                    <div className={styles.mianjia}>
                      {item.marketPrice != null ? '￥' + item.marketPrice.toFixed(2) : ''}
                    </div>
                  </div>
                  <div className={`${styles.parentBox} w-12`}>
                    <div className={styles.pifa}>
                      {item.costPrice != null ? '￥' + item.costPrice.toFixed(2) : ''}
                    </div>
                  </div>
                  <div className={`${styles.parentBox} w-8`}>
                    <div className={styles.xiaoliang}>
                      {item.salesVolume ? item.salesVolume : 0}
                    </div>
                  </div>
                  <div className={`${styles.parentBox} w-8`}>
                    <div className={styles.listingTime}>

                    </div>
                  </div>
                  <div className={`${styles.parentBox} w-8`}>
                    <div className={styles.saleOperation}>

                    </div>
                  </div>
                  <div className={`${styles.parentBox} w-8`}>
                    <div className={styles.status}>

                    </div>
                  </div>
                  <div className={`${styles.parentBox} w-12`}>
                    <div className={styles.action}>
                      <Popover content={
                        <div className="qrBox">
                          <p>商品二维码</p>
                          {item.skuQrcode ? <img className="qrImg" src={item.skuQrcode}/> : null}
                          <br/>
                          {item.skuQrcode ? <Button className="qrSaveBtn" type="primary"><a href={item.skuQrcode}
                                                                                            download="">保存到本地</a></Button> : null}
                          {item.skuQrcode ? <p className="savefail">若无法保存，请点击鼠标右键保存图片</p> : null}
                        </div>}
                               trigger="hover">
                        <span><Icon type='qrcode'/> 二维码</span>
                      </Popover>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </Spin>
      </div>
    );
  }
}
