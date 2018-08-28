import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Button ,Popconfirm} from 'jdcloudui';
import SupplyTable from '../SupplyTable/SupplyTable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { adoptSupply } from '../SupplyTable/redux';
import { supplyAuditSearch,saveFormData } from '../SupplyAuditSearch/redux';
import  BaseComponent  from '../../Common/BaseComponent';
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';

var uuid = 0;
@connect(
  state => ({
    SupplyAuditSearch:state.supplyAuditSearch,
    AdoptSupply:state.adoptSupply,
    funcPermissions:state.funcPermissions
  }),
  dispatch => bindActionCreators({supplyAuditSearch,saveFormData,adoptSupply,getPlatformFuncPermission}, dispatch)
)
export default class SupplyAuditList extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.state={
       check:{},
       checkData:{}
    }
  }

  static propTypes = {
    SupplyAuditSearch: PropTypes.object.isRequired,
    supplyAuditSearch: PropTypes.func.isRequired,
    saveFormData: PropTypes.func.isRequired,
  };

  componentWillMount() {
    var initialValue={platformId:this.platformId,userId:1111,pageSize:this.props.pageSize,pageNum:1};
    this.props.saveFormData(initialValue);
    this.props.supplyAuditSearch(initialValue).then(
      (result)=>{console.log('SearchData success')},
      (error)=>{console.log('SearchData fail')}
    );
    //获取权限数据
    this.props.getPlatformFuncPermission();
  }

  //生成表头
  createColumns(){
    return [{
      key: 'title',
      title:
      <Row>
        <Col span={6} offset={1}>
          商品信息
        </Col>
        <Col span={3}>
          供货价
        </Col>
        <Col span={2}>
          销量
        </Col>
        <Col span={3}>
          申请时间
        </Col>
        <Col span={3}>
          供应商
        </Col>
        <Col span={3}>
          商品运营
        </Col>
        <Col span={3}>
          操作
        </Col>
      </Row>,
    heigth: 10,
    dataIndex: 'title'}];
  }

  //解析第一层数组
  createData(){
    var dataSource = new Array();
    this.supplyAuditSearchResult = this.props.SupplyAuditSearch.data && this.props.SupplyAuditSearch.data.data &&this.props.SupplyAuditSearch.data.data.result;
    var test = this.supplyAuditSearchResult && this.supplyAuditSearchResult.map((supply,index)=>{
        ++uuid;
        var data = { key: uuid, title: <SupplyTable data={supply} refresh={()=>{this.refreshList()}}
                                                    check={this.state.check} onChange={::this.onChange}
                                                    funcPermissions={this.props.funcPermissions} />};
        dataSource.push(data);
      });

    return dataSource;
  }
  createPagination(){
    var total = this.props.SupplyAuditSearch.data && this.props.SupplyAuditSearch.data.data && this.props.SupplyAuditSearch.data.data.totalCount;
    var current = this.props.SupplyAuditSearch.data && this.props.SupplyAuditSearch.data.data && this.props.SupplyAuditSearch.data.data.pageNum;
    var pageSize = this.props.pageSize;

    return {
      total:total,
      current:current,
      pageSize:pageSize,
      onChange:(pageNumber)=>this.onChangePage(pageNumber)
    };
  }
  onChangePage(pageNumber){
    var searchData = this.props.SupplyAuditSearch.searchdata && this.props.SupplyAuditSearch.searchdata.searchdata;
    var pageChange ={...searchData,pageNum:pageNumber};
    this.props.supplyAuditSearch(pageChange).then(
      (result)=>{console.log('PageChange SearchData success')},
      (error)=>{console.log('PageChange SearchData fail')}
    );
  }

  //刷新页面(获取搜索参数，重新查询)
  refreshList(){
    var searchValue = this.props.SupplyAuditSearch.searchdata.searchdata;
    this.props.supplyAuditSearch(searchValue);
  }
  //采纳不采纳方法
  confirm(id,supplySellerId,supplyShopId,operation){
    var itemIds = new Array();
    itemIds.push(id);
    var adoptData ={
      platformId:this.platformId,
      supplySellerId:supplySellerId,
      itemIds:itemIds,
      supplyShopId:supplyShopId,
      saleStatus:operation
    }
    this.props.adoptSupply(adoptData).then(
      (result)=>{
        message.success(result.msg);
        this.props.refreshList();
      },
      (error)=>{
        message.info("采纳失败！");
        console.log('adoptData fail')}
    );
  }
  //全选
  allChecked = () =>{
    let check ={};
    this.supplyAuditSearchResult&&this.supplyAuditSearchResult.forEach((item)=>{
        check[item.itemId+item.supplySellerId]=true;
    })
    console.log(check)
    this.setState({
        check:check
    });
  }
  //反选
  diffChecked = () => {
    let check ={};
    this.supplyAuditSearchResult&&this.supplyAuditSearchResult.forEach((item)=>{
      check[item.itemId+item.supplySellerId]=!this.state.check[item.itemId+item.supplySellerId];
    })
    console.log(check)
    this.setState({check:check});
  }
  //批量采纳
  upDateAll(){
    const checkState=Object.assign({},this.state.check);
    const chackData=Object.assign({},this.state.chackData);
    Object.entries(checkState).forEach(item=>{
       console.log(item)
       item[1]&&this.confirm(chackData[item[0]].itemId,chackData[item[0]].supplySellerId,chackData[item[0]].supplyShopId,1)
    })
    this.setState({
         check:{},
         chackData:{}
    });
    this.refreshList();
  }
  //批量不采纳
  downDateAll(){
    const checkState=Object.assign({},this.state.check);
    const chackData=Object.assign({},this.state.chackData);
    Object.entries(checkState).forEach(item=>{
       console.log(item[1])
       item[1]&&this.confirm(chackData[item[0]].itemId,chackData[item[0]].supplySellerId,chackData[item[0]].supplyShopId,0)
    })
    this.setState({
         check:{},
         chackData:{}
    });
    this.refreshList();
  }
  onChange(e,item){
      console.log(e.target.checked)
      console.log(this.state.check)
      const chackData=Object.assign({},this.state.chackData);
      const checkState=Object.assign({},this.state.check);
      checkState[item.itemId+item.supplySellerId]=e.target.checked;
      chackData[item.itemId+item.supplySellerId]=item;
      this.setState({
         check:checkState,
         chackData:chackData
      });
  }
  render() {
    return(
       <div>
          <div className="tbl-top-action">
            <Button type="primary" onClick={::this.allChecked}>全选</Button>
            <Button type="ghost" style={{marginLeft:10}} onClick={::this.diffChecked}>反选</Button>
            <Popconfirm title="确认批量采纳?" onConfirm={::this.upDateAll} okText="确认" cancelText="取消">
                <Button type="ghost" style={{marginLeft:10}} >批量采纳</Button>
            </Popconfirm>
            <Popconfirm title="确认批量不采纳?" onConfirm={::this.downDateAll} okText="确认" cancelText="取消">
                <Button type="ghost" style={{marginLeft:10}} >批量不采纳</Button>
            </Popconfirm>
          </div>
          <div className="ui-tbl">
            <Table
              columns={this.createColumns()}
              dataSource={this.createData()}
              pagination={this.createPagination()}
              size="middle"
              className="tbl-warp"
            />
          </div>
       </div>
    )
  }
}

