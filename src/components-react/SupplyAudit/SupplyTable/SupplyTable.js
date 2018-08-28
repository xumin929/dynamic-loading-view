/**
 * Created by huangxiao3 on 2017/2/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Popconfirm, message ,Checkbox} from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { adoptSupply } from './redux';
import SkuTable from '../SkuTable/SkuTable';
import  BaseComponent  from '../../Common/BaseComponent';
import DispatchPlaces from '../DispatchPlaces/DispatchPlaces';

import {FuncPermission}  from 'jdcloudecc/components';

@connect(
  state => ({AdoptSupply:state.adoptSupply}),
  dispatch => bindActionCreators({adoptSupply}, dispatch)
)
export default class SupplyTable extends BaseComponent {

  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    AdoptSupply: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired
  };

  //采纳确认框
  confirm(id,supplySellerId,supplyShopId,operation){
    var itemIds = new Array();
    itemIds.push(id);
    var adoptData ={
      platformId:this.platformId,
      itemIds:itemIds,
      supplySellerId:supplySellerId,
      supplyShopId:supplyShopId,
      saleStatus:operation
    }
    this.props.adoptSupply(adoptData).then(
      (result)=>{
        message.success(result.msg);
        this.props.refresh();
      },
      (error)=>{
        message.info("采纳失败！");
        console.log('adoptData fail')}
    );
  }
  //生成表头
  createColumns(){
    var columns = new Array();
    var isNew = this.props.data.saleStatus==30 && this.props.data.storeStatus==20;
    var columnsUnit = {
      title:
        <Row>
           <Col span={1}>
               <Checkbox
                    checked={this.props.check[this.props.data.itemId+this.props.data.supplySellerId]?this.props.check[this.props.data.itemId+this.props.data.supplySellerId]:false}
                    onChange={(e)=>this.props.onChange(e,this.props.data)}
                >
                </Checkbox>
          </Col>
          <Col span={3}>
            商品编码：{this.props.data.itemId}
          </Col>
          <Col span={7} offset={2}>
            平台类目：{this.props.data.firstCategoryName ?`${this.props.data.firstCategoryName}`:''}{this.props.data.secondCategoryName?`/${this.props.data.secondCategoryName}`:''}{this.props.data.thirdCategoryName?`/${this.props.data.thirdCategoryName}`:''}{this.props.data.fourthCategoryName?`/${this.props.data.fourthCategoryName}`:''}
          </Col>
          <Col span={2} offset={1}>
            <DispatchPlaces sourceData ={ this.props.data.baseAddressList}/>
          </Col>
          <Col span={4} offset={4}>
            {isNew?(<span>供应商申请的新发布商品</span>):(<span>供应商申请供货的商品</span>)}
          </Col>
        </Row>,
        dataIndex: 'title',
        key: 'title'
    };
    columns.push(columnsUnit);
    return columns;
  }
  //生成表数据行（1行）
  createSpuData(){
    var spuList=new Array();
    var spuData = this.props.data;
    var spuDataUnit=[{
      key: spuData.itemId,
      title:
        <Row type="flex" justify="space-around" align="middle">
          {/*商品信息*/}
          <Col span={6}>
            <div className="table-goods">
              <div className="tg-img">
                <img width="57" height="57" src={spuData.pictureUrl} />
              </div>
              <div className="tg-txt">
                {spuData.itemName}
              </div>
            </div>
          </Col>
          {/*供货价*/}
          <Col span={3}>
            ￥{spuData.minSupplyPrice}-￥{spuData.maxSupplyPrice}
          </Col>
          {/*销量*/}
          <Col span={2}>
            {spuData.saleNum===null?0:spuData.saleNum}
          </Col>
          {/*申请时间*/}
          <Col span={3}>
            {spuData.createdStr}
          </Col>
          {/*供应商*/}
          <Col span={3}>
            {spuData.supplySellerName}
          </Col>
          {/*商品运营*/}
          <Col span={3}>
            {spuData.operatorName}
          </Col>
          {/*操作*/}
          <Col span={3}>
            <div>
              {this.props.data.saleStatus===20 && this.props.data.storeStatus===20?
                <FuncPermission codes={this.codesResponse} code="edit">
                  <a href={"/operating-item-view/product-release?itemId=" + spuData.itemId + '&&storeStatus=' + this.props.data.storeStatus + '&&newType=true'}>编辑</a>
                </FuncPermission>:''}
              {this.props.data.saleStatus===20 && this.props.data.storeStatus===20?<span className="jc-divider"/>:''}
              <Popconfirm title="确认采纳?" onConfirm={()=>this.confirm(spuData.itemId,spuData.supplySellerId,spuData.supplyShopId,1)} okText="确认" cancelText="取消">
                <a> 采纳 </a>
              </Popconfirm>
              <span className="jc-divider"/>
              <FuncPermission codes={this.codesResponse} code="unadopt">
                <Popconfirm title="确认不采纳?" onConfirm={()=>this.confirm(spuData.itemId,spuData.supplySellerId,spuData.supplyShopId,0)} okText="确认" cancelText="取消">
                  <a> 不采纳 </a>
                </Popconfirm>
              </FuncPermission>
            </div>
          </Col>
        </Row>
      ,description:<SkuTable skuData={spuData.itemSupplyAuditSkuList} />
      }];
    return spuDataUnit;
  }

  render() {
    //菜单权限数据处理
    console.log(this.props.funcPermissions);
    let permissionData = this.props.funcPermissions.data;
    if(permissionData && permissionData.code != 0){
      message.warning("菜单权限获取失败！");
    }
    if(permissionData && permissionData.code == 0){
      this.codesResponse = permissionData.data;
      this.codes = this.codesResponse && this.codesResponse.join(",");
    }
    return(
      <div>
        <Table
          columns={this.createColumns()}
          expandedRowRender={record =>  <p>{record.description}</p>}
          dataSource={this.createSpuData()}
          pagination={false}
          onExpand={(record) => console.log(record.key)}
          size="middle"
          className="spu-warp"
        />
      </div>
    )
  }
}


