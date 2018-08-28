/* *********************************************
 * @author: GuoRuiGuang
 * @creatdDate: 20171114
 * @description: 平台店铺商品管理- 表格组件
 * *********************************************/
import React, { Component, PropTypes } from 'react';
import { Checkbox, Table, Icon, Popover, Spin } from 'jdcloudui';
import { MoneyConvert } from 'jdcloudecc/components';
import GoodSKUDetails from './GoodsSKUDetails';
import styles from './style/style.less';
import './style/style.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {queryShopInfo, search_goods} from '../../redux/search_goods';
import PriceModal from '../PriceModal';


@connect(
  state=>({
    goodsManage:{
      ...state.search_goods
    }
  }),
  dispatch => bindActionCreators({queryShopInfo}, dispatch)
)

export default class GoodsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      visible: false,
      PriceData: {},
      priceList: [],
    }
  }

  handleModal = (action, record, type) => {
    console.log(record);
    if(record) {
      record.isPrice = type;
      this.record = record;
    }
    let {PriceData} = this.state;
    if(action && record.skuId) {
      //查询分组价
      let param = {
        skuId: record.skuId
      };
      this.props.queryShopInfo(param).then(
        result => {
          if(result.code == 0 && result.data && result.data.length > 0) {
            PriceData[record.key] = result.data[0] && result.data[0].labelPriceList || [];
            this.setState({
              visible: action,
              PriceData
            });
          }
        }
      );
    } else {
      this.setState({
        visible: action
      });
    }
  };


  onChangeShow = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }


  creatBtn = (record) => {
    let url =`/operating-item-view/goodslibrary/edit-library?itemId=${record.id}&&type=1` //type=1 表示从店铺商品管理页进入到商品标准库编辑页
    return (
      <div>
        {
          record.addSource == 1 ?
            <span className='text-999'>平台导入</span>
            :
            <div>{
              record.storeStatus == 30 ?
                <span className='text-999'>已加入商品库</span>
                :
                <a href={url}>加入商品库</a>
            }</div>
        }
      </div>
    )
  }

  //生成操作按钮
  creatOperationBtn = (text, record, index) => {
    switch (record.saleStatus) {

      case 30:
        return (
          <span>
            <a onClick={() => this.props.handleRejectOrLock(record.id, 70)}>驳回</a><br />
            <a onClick={() => this.props.handlePassItem(record.id)}>通过</a><br />
            {this.creatBtn(record)}
          </span>
        );

      case 40:
        return (
          <span>
            <a onClick={() => this.props.handleRejectOrLock(record.id, 80)}>锁定</a><br />
            {this.creatBtn(record)}
          </span>
        );

      case 50:
        return (
          <span>
            <a onClick={() => this.props.handleRejectOrLock(record.id, 80)}>锁定</a><br />
            {record.rejectReason ?
              <a onClick={() => {
                this.props.handleViewReason(record.rejectReason, 3)}}>查看下架原因</a>
              : null}
            {record.rejectReason ? <br /> : null}
            {this.creatBtn(record)}
          </span>
        );

      case 60:
        return (
          <span>
            <a onClick={() => this.props.handleChangeBatchData(record.id, 50)}>下架</a><br />
            <a onClick={() => this.props.handleRejectOrLock(record.id, 80)}>下架及锁定</a><br />
            {this.creatBtn(record)}
          </span>
        );

      case 70:
        return (
          <span>
            <a onClick={() => {
              this.props.handleViewReason(record.rejectReason, 1)
            }}>查看驳回原因</a><br />
            {this.creatBtn(record)}
          </span>
        );

      case 80:
        return (
          <span>
            <a onClick={() => {
              this.props.handleViewReason(record.rejectReason, 2)
            }}>查看锁定原因</a><br />
            {this.creatBtn(record)}
          </span>
        );

      case 90:
        return (
          <span>
            <a onClick={() => this.props.handleRejectOrLock(record.id, 80)}>锁定</a><br />
            <a onClick={() => this.props.handlePassItem(record.id)}>通过</a><br />
            {this.creatBtn(record)}<br />
            <a onClick={() => {
              this.props.handleViewReason(record.rejectReason, 2)
            }}>查看锁定原因</a>
          </span>
        );

    }
  }

  //生成状态信息
  creatOperationText = (text, record, index) => {
    switch (record.saleStatus) {
      case 10:
        return (
          <span className='text-warning'>待供货</span>
        )

      case 20:
        return (
          <span className='text-success'>已供货</span>
        )

      case 30:
        return (
          <span className='text-warning'>待审核</span>
        )

      case 40:
        return (
          <span className='text-warning'>待上架</span>
        )
      case 50:
        return (
          <span className='text-disabled'>已下架</span>
        )
      case 60:
        return (
          <span className='text-success'>在售</span>
        )
      case 70:
        return (
          <span className='text-success'>已驳回</span>
        )
      case 80:
        return (
          <span className='text-success'>锁定</span>
        )
      case 90:
        return (
          <span className='text-warning'>申请解锁</span>
        )
    }
  }

  //销量判断有值与否
  creatSalesVolume = (text, record, index) => {
    return (
      <div>
        <span>销量</span>
        <br />
        <span>{record.salesVolume ? record.salesVolume : '--'}</span>
      </div>
    )

  }

  //SPU价格判断
  checkPrice = (price1, price2) => {
    if (price1 == price2) {
      return (
        <span>{price1 ? <span>&yen;<MoneyConvert value={price1} /></span> : '--'}</span>
      )
    } else {
      return (
        <span>{price1 ? <span>&yen;<MoneyConvert value={price1} /></span> : '--'} -
          {price2 ? <span>&yen;<MoneyConvert value={price2} /></span> : '--'}</span>
      )
    }
  }


  render() {

    const columns = [{
      title: 'skuNo',
      dataIndex: 'skuNo',
      width: '300px',
      render: (text, record, index) => {
        return (
          <div className={styles["item-title"]}>
            <a target='_blank' href={`//${this.props.host}/search-website-view/item/${record.id}`}>
              <img src={record.pictureUrl} className={styles["item-title-image"]} />
              <div title={record.itemName} className={styles["item-title-text"] + " ml20"}>{record.itemName}</div>
            </a>
          </div>
        )
      }
    }, {
      title: 'price1',
      dataIndex: 'price1',
      width: '150px',
      render: (text, record, index) => {
        return (
          <div>
            <span>售价</span>
            <br />
            <span>{this.checkPrice(record.minMarketPrice, record.maxMarketPrice)}</span>
          </div>
        )
      }
    }, {
      title: 'salesVolume',
      dataIndex: 'salesVolume',
      width: '120px',
      render: (text, record, index) => {
        return this.creatSalesVolume(text, record, index)
      }
    }, {
      title: 'publishTime',
      width: '120px',
      dataIndex: 'publishTime',
    }, {
      title: 'saleStatus',
      dataIndex: 'saleStatus',
      width: '120px',
      render: (text, record, index) => {
        return this.creatOperationText(text, record, index)
      }
    }, {
      title: 'todo',
      dataIndex: 'todo',
      width: '100px',
      render: (text, record, index) => {
        return this.creatOperationBtn(text, record, index)
      }
    }];

    return (
      <div className='goods-manage'>
        <div className={styles.header}>
          <span>
            <Checkbox
              onChange={(e) => this.props.onChange(e, this.props.data.id)}
              checked={this.props.check[this.props.data.id] ? this.props.check[this.props.data.id] : false}
            />
          </span>
          <span className={styles.marginL20}>商品编码：{this.props.data.id ? this.props.data.id.toString() : '--'}</span>
          <span className={styles.marginL20}>平台分类：
            {this.props.data.categoryFullName ? this.props.data.categoryFullName : '--'}
          </span>
          <span className={styles.marginL20}>店铺名称：{this.props.data.shopName ? this.props.data.shopName : '--'}</span>
        </div>

        <div>
          <Table
            columns={columns}
            expandedRowRender={record => <GoodSKUDetails handleModal={this.handleModal} item ={record} onSearchPrice = {this.props.onSearchPrice} price = {this.props.price}/>}
            dataSource={[this.props.data]}
            showHeader={false}
            pagination={false}
            rowKey={record => record.id}
          />
        </div>
        <div>
          {
            this.state.visible ? (
              <PriceModal
                data={this.state.PriceData[this.record.key] || []}
                visible={this.state.visible}
                record={this.record}
                priceList={this.state.priceList}
                handleOk={this.handleOk}
                changePrice={this.changePrice}
                handleModal={this.handleModal}
              />
            ) : null
          }
        </div>
      </div>
    );
  }
}