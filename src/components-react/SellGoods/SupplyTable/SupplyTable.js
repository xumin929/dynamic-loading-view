import React, {Component} from 'react';
import { Table, Row, Col,Checkbox} from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SkuTable from '../SkuTable/SkuTable';
import { updateItembatchShelves } from '../SellGoodsResults/redux';
import {FuncPermission}  from 'jdcloudecc/components';

@connect(
  state => ({UpdateItembatchShelves:state.updateItembatchShelves}),
  dispatch => bindActionCreators({updateItembatchShelves}, dispatch)
)
export default class SupplyTable extends Component {
  constructor(props, context) {
    super(props, context);
  }
  //生成表头
  createColumns(){
    var columns = new Array();
    var columnsUnit = {
      title:
        <Row>
          <Col span={1}>
            <Checkbox
                checked={this.props.check[this.props.data.id]?this.props.check[this.props.data.id]:false}
                onChange={(e)=>this.props.onChange(e,this.props.data.id)}
            >
            </Checkbox>
          </Col>
          <Col span={3}>
            商品编码：{this.props.data.id}
          </Col>
          <Col span={6} offset={2}>
            平台类目：{this.props.data.cname1}/{this.props.data.cname2}/{this.props.data.cname3}/{this.props.data.cname4}
          </Col>
          <Col span={4} offset={8}>
          </Col>
        </Row>,
      dataIndex: 'title',
      key: 'title'
    };
    columns.push(columnsUnit);
    return columns;
  }
  //上下架方法
  updateItembatchShelves(id,status){
    var itemId = new Array();
    itemId.push(id);
    var param = {itemId:itemId,saleStatus:status,platformId:2};
    this.props.updateItembatchShelves(param).then(
      (result)=>{this.props.refreshList();}
    );
  }

  //生成表数据行（1行）
  createSpuData(){
    var spuData = this.props.data;
    var saleStatus ='';
    var flag=null;
    if(spuData.saleStatus == 20){
      saleStatus='待上架'
      flag=0;
    }else if(spuData.saleStatus == 50){
      saleStatus='下架';
      flag=1;
    }else if(spuData.saleStatus == 60){
      saleStatus='上架';
      flag=2;
    }
    /*var creatdTime = spuData.format('L');*/
    var spuDataUnit=[{
      key: spuData.id,
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
          {/*面价*/}
          <Col span={3}>
            {spuData.minMarketPrice?`￥${spuData.minMarketPrice}`:''} - {spuData.maxMarketPrice?`￥${spuData.maxMarketPrice}`:''}
          </Col>
          {/*批发价*/}
          <Col span={3}>
            {spuData.minCostPrice?`￥${spuData.minCostPrice}`:''} - {spuData.maxCostPrice?`￥${spuData.maxCostPrice}`:''}
          </Col>
          {/*销量*/}
          <Col span={2}>
            <span style={{color:'#e37560'}}>
              {spuData.saleNum?spuData.saleNum:''}
            </span>
          </Col>
          {/*发布时间*/}
          <Col span={2}>
            {spuData.createdStr}
          </Col>
          {/*商品运营*/}
          <Col span={2}>
            {spuData.operatorName}
          </Col>
          {/*状态*/}
          <Col span={2}>
            {saleStatus}
          </Col>
          {/*操作*/}
          <Col span={3}>
            <div>
              {(spuData.saleStatus == 50 || spuData.saleStatus == 20 )&&
                <FuncPermission codes={this.codesResponse} code="edit">
                  <a href = {'/operating-item-view/sale-edit?itemId='+spuData.id+'&sellerId='+spuData.sellerId+'&shopId='+spuData.shopId+'&codes='+this.codes}> 编辑 </a>
                </FuncPermission>}
              {flag==1 &&
                <FuncPermission codes={this.codesResponse} code="onshelves">
                  <a onClick={()=>this.updateItembatchShelves(spuData.id,60)}> 上架 </a>
                </FuncPermission>}
              {flag==2 &&
                <FuncPermission codes={this.codesResponse} code="offshelves">
                  <a onClick={()=>this.updateItembatchShelves(spuData.id,50)}> 下架 </a>
                </FuncPermission>}
            </div>
          </Col>
        </Row>
      ,description:<SkuTable skuData={spuData.itemSkuInfoList} />
    }];
    return spuDataUnit;
  }

  render() {
    console.log(this.props.funcPermissions)
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

    return (
      <div>
        <Table
          columns={this.createColumns()}
          dataSource={true && this.createSpuData()}
          expandedRowRender={record =>  <p>{record.description}</p>}
          pagination={false}
          onExpand={(record) => console.log(record.key)}
          size="middle"
          className="spu-warp"
        />
      </div>
    )
  }
}
