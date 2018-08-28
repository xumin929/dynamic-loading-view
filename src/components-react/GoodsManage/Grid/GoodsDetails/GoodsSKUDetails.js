/* *********************************************
 * @author: 王禹展
 * @creatdDate: 20180703
 * @description: 平台店铺商品管理- 表格组件
 * *********************************************/
import React, { Component, PropTypes } from 'react';
import { Table, Popover, Spin } from 'jdcloudui';
import { MoneyConvert } from 'jdcloudecc/components';
import styles from './style/style.less';
import './style/style.css';
import {searchGoodsSkus} from "../../redux/search_goods_skus";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

@connect(
  state => ({
    price: {
      ...state.search_price
    }
  }),
  dispatch => bindActionCreators({searchGoodsSkus}, dispatch)
)
export default class GoodsSKUDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentWillMount(){
    let params = {itemId: this.props.item.id};
    this.props.searchGoodsSkus(params).then(
      (result) => {
        console.log('querySaleItemSku success');
        this.setState({loaded: true});
        this.setState({itemSkuInfoList: result.data});
      },
      (error) => {
        console.log('querySaleItemSku fail');
        this.setState({loaded: false});
      }
    );
  }


  creatTypeText = (text) => {
    let typeText = text || "";
    return typeText.split(";").map((item, index) => {
      if (item) {
        return (
          <div key={index}>{item}</div>
        )
      }
    })
  }

  //销售价格popover
  showPopover = () => {
    if (this.props.price && this.props.price.loading) {
      return <div className={styles['popoverNo']}><Spin /></div>
    }
    let priceList = this.props.price && this.props.price.loaded && this.props.price.data && this.props.price.data.data;
    if (priceList && priceList.length != 0) {
      return priceList.map(((item, i) => {
        return (
          <div className={styles['popoverItem']} key={i}>
            <h3>{item.areaName ? item.areaName : '--'}</h3>
            <p>销售价：{item.marketPrice ? item.marketPrice : '--'}</p>
          </div>
        )
      }))

    } else {
      return (
        <div className={styles['popoverNo']}>
          暂无数据
        </div>
      )
    }
  }


  render() {
    const column = [{
      title: 'skuId',
      dataIndex: 'skuId',
      render: (text, record, index) => {
        return (
          <span>SKU编码：{record.skuId ? record.skuId.toString() : '--'}</span>
        )
      }
    }, {
      title: 'item',
      dataIndex: 'item',
      render: (text, record, index) => {
        return (
          <div className={styles["item-title"]}>
            <img src={record.pictureUrl} className={styles["item-title-image"]}/>
            <div className={styles["item-title-text"] + " ml20"}>
              {this.creatTypeText(record.attributesName)}
            </div>
          </div>
        )
      }
    }, {
      title: 'price',
      dataIndex: 'marketPrice',
      render: (text, record, index) => {
        return (
          <div>售价：
            <Popover placement="bottom"
                     content={this.showPopover()}
                     trigger="click"
            >
              <a onClick={() => this.props.onSearchPrice(this.props.data.shopId, record.skuId)}>{record.marketPrice ?
                <span>&yen;<MoneyConvert value={record.marketPrice}/></span> : '--'}
              </a>
            </Popover>
          </div>
        )
      }
    }, {
        title: 'labelPrice',
        dataIndex: 'labelPrice',
        width:'150px',
        render: (text, record, index) => {
            return (
                <div>
            <span>分组价：
                {
                    record.minLabelPrice && record.maxLabelPrice && record.minLabelPrice == record.maxLabelPrice ? (
                        <a href="javascript:void(0);" onClick={() => this.props.handleModal(true, record, 1)}>￥{(record.minLabelPrice || 0).toFixed(2)}</a>
                    ) : record.minLabelPrice && record.maxLabelPrice ? (
                        <a href="javascript:void(0);" onClick={() => this.props.handleModal(true, record, 1)}>
                            {`￥${record.minLabelPrice.toFixed(2)} - ￥${record.maxLabelPrice.toFixed(2)}`}
                        </a>
                    ) : '---'
                }
              </span>
                </div>
            )
        }
    }, {
      title: 'num',
      dataIndex: 'salesVolume',
      render: (text, record, index) => {
        return (
          <span>销量：{record.salesVolume}</span>
        )
      }
    }, {
      title: 'has',
      dataIndex: 'inventory',
      render: (text, record, index) => {
        return (
          <span>库存：{record.inventory}</span>
        )
      }
    },];

    return (
        <div>
          <Table rowKey={this.props.item.id} columns={column}
                 dataSource={this.state.itemSkuInfoList} pagination={false}
                 showHeader={false} loading={!this.state.loaded}/>
        </div>
    );
  }
}
