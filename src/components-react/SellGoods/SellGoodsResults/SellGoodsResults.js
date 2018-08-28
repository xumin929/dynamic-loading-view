import React from 'react';
import {Table, Row, Col, Button } from 'jdcloudui';
import SupplyTable from "../SupplyTable/SupplyTable";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { sellGoodsSearch,saveFormData } from '../SellGoodsSearch/redux';
import {updateItembatchShelves} from '../SellGoodsResults/redux';
import  BaseComponent  from '../../Common/BaseComponent';
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';
import {FuncPermission}  from 'jdcloudecc/components';

var uuid = 0;
@connect(
  state => ({
    SellGoodsSearch:state.sellGoodsSearch,
    updateItembatchShelves:state.updateItembatchShelves,
    funcPermissions:state.funcPermissions
  }),
  dispatch => bindActionCreators({sellGoodsSearch,saveFormData,updateItembatchShelves,getPlatformFuncPermission}, dispatch)
)
export default class SellGoodsList extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.state={
         check:{}
    }
  }

  componentWillMount() {
    var initialValue = {};
    if(this.props.status && this.props.status!="undefined"){
      initialValue={platformId:this.platformId,userId:1,pageSize:this.props.pageSize,pageNum:1,saleStatus:this.props.status};
    }else{
      initialValue={platformId:this.platformId,userId:1,pageSize:this.props.pageSize,pageNum:1};
    }
    this.props.saveFormData(initialValue);
    this.props.sellGoodsSearch(initialValue).then(
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
          面价
        </Col>
        <Col span={3}>
          批发价
        </Col>
        <Col span={2}>
          销量
        </Col>
        <Col span={2}>
          发布时间
        </Col>
        <Col span={2}>
          商品运营
        </Col>
        <Col span={2}>
          状态
        </Col>
        <Col span={3}>
          操作
        </Col>
      </Row>,
      height:10,
      dataIndex:'title'}
    ];
  }
  //解析第一层数组
  createData(){
    var dataSource = new Array();
    this.sellGoodsSearchResult = this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.result;
    var tmp = this.sellGoodsSearchResult && this.sellGoodsSearchResult.map((supply, index) =>{
      ++uuid;
      var data = {key:uuid,
                   title:<SupplyTable  data={supply} refreshList={()=>this.refreshList()}
                                       check={this.state.check} onChange={::this.onChange}
                                       funcPermissions={this.props.funcPermissions}
                                       /> };
      dataSource.push(data);
    });
    return dataSource;
  }
  createPagination(){
    var total = this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.totalCount;
    var current =this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.pageNum;
    var pageSize =this.props.pageSize;
    return{
      total:total,
      current:current,
      pageSize:pageSize,
      onChange:(pageNumber) =>this.onChangePage(pageNumber)
    };
  }
  onChangePage(pageNumber){
    var searchData = this.props.SellGoodsSearch.searchdata && this.props.SellGoodsSearch.searchdata.searchdata;
    var pageChange ={...searchData,pageNum:pageNumber};
    this.props.sellGoodsSearch(pageChange).then(
      (result)=>{console.log('PageChange SearchData success')},
      (error)=>{console.log('PageChange SearchData fail')}
    );
  }
  //刷新页面
  refreshList(){
    var searchValue = this.props.SellGoodsSearch.searchdata.searchdata;
    this.props.sellGoodsSearch(searchValue);
  }
  //上下架方法
  updateItembatchShelves(id,status){
    var itemId = new Array();
    itemId.push(id);
    var param = {itemId:itemId,saleStatus:status,platformId:2};
    this.props.updateItembatchShelves(param).then(
      (result)=>{this.refreshList();}
    );
  }
  //全选
  allChecked = () =>{
    let check ={};
    this.sellGoodsSearchResult&&this.sellGoodsSearchResult.forEach((item)=>{
        check[item.id]=true;
    })
    console.log(check)
    this.setState({
        check:check
    });
  }
  //反选
  diffChecked = () => {
    let check ={};
    this.sellGoodsSearchResult&&this.sellGoodsSearchResult.forEach((item)=>{
      check[item.id]=!this.state.check[item.id];
    })
    console.log(check)
    this.setState({check:check});
  }
  //批量上架
  upDateAll(){
    const checkState=Object.assign({},this.state.check);
    Object.entries(checkState).forEach(item=>{
       console.log(item)
       item[1]&&this.updateItembatchShelves(item[0],60)
    })
    this.setState({
         check:{}
    });
    this.refreshList();
  }
  //批量下架
  downDateAll(){
    const checkState=Object.assign({},this.state.check);
    Object.entries(checkState).forEach(item=>{
       console.log(item)
       item[1]&&this.updateItembatchShelves(item[0],50)
    })
    this.setState({
         check:{}
    });
    this.refreshList();
  }
  onChange(e,id){
      console.log(e.target.checked)
      console.log(this.state.check)
      const checkState=Object.assign({},this.state.check);
      checkState[id]=e.target.checked;
      this.setState({
         check:checkState
      });
  }
  render(){
    //菜单权限数据处理
    console.log(333333333);
    console.log(this.props.funcPermissions);
    console.log(444444444);
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
        <div className="tbl-top-action">
          <Button type="primary" onClick={::this.allChecked}>全选</Button>
          <Button type="ghost" style={{marginLeft:10}} onClick={::this.diffChecked}>反选</Button>
          <FuncPermission codes={this.codesResponse} code="onbatchshelves">
            <Button type="ghost" style={{marginLeft:10}} onClick={::this.upDateAll}>批量上架</Button>
          </FuncPermission>
          <FuncPermission codes={this.codesResponse} code="offbatchshelves">
            <Button type="ghost" style={{marginLeft:10}} onClick={::this.downDateAll}>批量下架</Button>
          </FuncPermission>
        </div>
        <div className="ui-tbl">
          <Table
            columns={true && this.createColumns()}
            dataSource={true && this.createData()}
            pagination={true && this.createPagination()}
            size="middle"
            className="tbl-warp"
          />
        </div>
      </div>
    )
  }
}
