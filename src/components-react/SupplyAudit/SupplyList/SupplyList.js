import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { supplyAuditSearch,saveFormData } from '../SupplyAuditSearch/redux';
import { adoptSupply } from '../SupplyTable/redux';
import { Button, Pagination, Icon, Popconfirm, message } from 'jdcloudui';
import SupplyDetails from '../SupplyDetails/SupplyDetails.js';
import styles from './styles.less';
import './style.css';
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';
import {FuncPermission} from 'jdcloudecc/components';
import {Loading} from 'jdcloudecc/components';

@connect(
  state => ({
    SupplyAuditSearch:state.supplyAuditSearch,
    AdoptSupply:state.adoptSupply,
    funcPermissions:state.funcPermissions
  }),
  dispatch => bindActionCreators({supplyAuditSearch,saveFormData,adoptSupply,getPlatformFuncPermission}, dispatch)
)
export default class SupplyList extends Component{
  constructor(props){
    super(props);
    this.codesResponse=[];
    this.codes=[];
    this.state = {
      check: {},
      checkData: {},
      isShow: {}
    }
  }
  componentWillMount() {
    var initialValue={pageSize:this.props.pageSize,pageNum:1};
    this.props.saveFormData(initialValue);
    this.props.supplyAuditSearch(initialValue).then(
      (result)=>{console.log('SearchData success')},
      (error)=>{console.log('SearchData fail')}
    );
    //获取权限数据
    this.props.getPlatformFuncPermission();
  }
  //更改单个选中状态
  onChange(e, item){
    const checkState = Object.assign({}, this.state.check);
    const checkData = Object.assign({},this.state.checkData);
    checkState[item.itemId+item.supplySellerId] = e.target.checked;
    checkData[item.itemId+item.supplySellerId] = item;
    this.setState({
      check: checkState,
      checkData:checkData
    });
  }
  //展开列表
  changeShow(item){
    const showState = Object.assign({}, this.state.isShow);
    if(showState[item.itemId+item.supplySellerId]){
      showState[item.itemId+item.supplySellerId] = false;
    }else{
      showState[item.itemId+item.supplySellerId] = true;
    }
    this.setState({isShow: showState});
  }
  //全选
  allChecked = () =>{
    let check = {};
    let checkData = {};
    this.props.SupplyAuditSearch
    && this.props.SupplyAuditSearch.data
    && this.props.SupplyAuditSearch.data.data
    && this.props.SupplyAuditSearch.data.data.result.forEach((item)=>{
      check[item.itemId+item.supplySellerId] = true;
      checkData[item.itemId+item.supplySellerId] = item;
    })
    this.setState({
      check: check,
      checkData: checkData
    });
  }
  //反选
  diffChecked = () => {
    let check = {};
    let checkData = {};
    this.props.SupplyAuditSearch
    && this.props.SupplyAuditSearch.data
    && this.props.SupplyAuditSearch.data.data
    && this.props.SupplyAuditSearch.data.data.result.forEach((item)=>{
      check[item.itemId+item.supplySellerId] = !this.state.check[item.itemId+item.supplySellerId];
      checkData[item.itemId+item.supplySellerId] = item;
    })
    this.setState({
      check:check,
      checkData: checkData
    });
  }
  //批量采纳
  upDateAll(){
    const checkState = Object.assign({},this.state.check);
    const checkData = Object.assign({},this.state.checkData);
    Object.entries(checkState).forEach(item=>{
      item[1] && this.confirm(checkData[item[0]].itemId,checkData[item[0]].supplySellerId,checkData[item[0]].supplyShopId,1)
    })
    //this.confirm(arr,chackData[item[0]].supplySellerId,chackData[item[0]].supplyShopId,1)
    this.setState({
      check:{},
      checkData:{}
    });
    this.refreshList();
  }
  //批量不采纳
  downDateAll(){
    const checkState=Object.assign({},this.state.check);
    const checkData=Object.assign({},this.state.checkData);
    Object.entries(checkState).forEach(item=>{
      console.log(item)
      console.log(checkData)
      item[1] && this.confirm(checkData[item[0]].itemId,checkData[item[0]].supplySellerId,checkData[item[0]].supplyShopId,0)
    })
    this.setState({
      check:{},
      checkData:{}
    });
    this.refreshList();
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
      supplySellerId:supplySellerId,
      itemIds:itemIds,
      supplyShopId:supplyShopId,
      saleStatus:operation
    }
    this.props.adoptSupply(adoptData).then(
      (result)=>{
        message.success(result.msg);
        this.refreshList();
      },
      (error)=>{
        message.info("采纳失败！");
        console.log('adoptData fail')}
    );
  }
  //分页
  onChangePage(pageNumber){
    var searchData = this.props.SupplyAuditSearch.searchdata && this.props.SupplyAuditSearch.searchdata.searchdata;
    var pageChange ={...searchData,pageNum:pageNumber};
    this.props.saveFormData(pageChange);
    this.props.supplyAuditSearch(pageChange).then(
      (result)=>{
        console.log('PageChange SearchData success');
        this.setState({
          check: {},
          isShow: {}
        });
      },
      (error)=>{console.log('PageChange SearchData fail')}
    );
  }
  render(){
    //菜单权限数据处理
    let permissionData = this.props.funcPermissions.data;
    if(permissionData && permissionData.code != 0){
      message.warning("菜单权限获取失败！");
    }
    if(permissionData && permissionData.code == 0){
      this.codesResponse = permissionData.data;
      this.codes = this.codesResponse && this.codesResponse.join(",");
    }
    console.log(this.props.SupplyAuditSearch.loaded);
    return(
          <div>
            <div style={{position: 'relative', border: '1px solid #e5e5e5'}}>
              <Loading loaded={this.props.SupplyAuditSearch.loaded}>
              </Loading>
              <div className={styles.btns}>
                <span style={{marginLeft: 10}}>
                  <Button type="primary" onClick={::this.allChecked}>全选</Button>
                </span>
                <span style={{marginLeft: 10}}>
                  <Button style={{backgroundColor: '#fff'}} onClick={::this.diffChecked}>反选</Button>
                </span>
                <FuncPermission codes={this.codesResponse} code="batchadopt">
                  <span style={{marginLeft: 10}}>
                    <Popconfirm title="确认批量采纳?" onConfirm={::this.upDateAll} okText="确认" cancelText="取消">
                      <Button style={{backgroundColor: '#fff'}}>批量采纳</Button>
                    </Popconfirm>
                  </span>
                </FuncPermission>
                <FuncPermission codes={this.codesResponse} code="batchUnAdopt">
                  <span style={{marginLeft: 10}}>
                    <Popconfirm title="确认批量不采纳?" onConfirm={::this.downDateAll} okText="确认" cancelText="取消">
                      <Button style={{backgroundColor: '#fff'}}>批量不采纳</Button>
                    </Popconfirm>
                  </span>
                </FuncPermission>
              </div>
              <div className={styles.content}>
                <div className={styles.title}>
                  <span style={{width: '29%'}}>商品信息</span>
                  <span style={{width: '12.5%'}}>供货价</span>
                  <span style={{width: '8.33333333%'}}>销量</span>
                  <span style={{width: '12.5%'}}>申请时间</span>
                  <span style={{width: '12.5%'}}>供应商</span>
                  <span style={{width: '12.5%'}}>商品运营</span>
                  <span style={{width: '12.5%'}}>操作</span>
                </div>
                {
                  this.props.SupplyAuditSearch
                  && this.props.SupplyAuditSearch.data
                  && this.props.SupplyAuditSearch.data.data
                  && this.props.SupplyAuditSearch.data.data.result
                  && this.props.SupplyAuditSearch.data.data.result.length != 0
                  ? this.props.SupplyAuditSearch.data.data.result.map((item,key)=>{
                    return (
                      <SupplyDetails
                        item={item}
                        key={key}
                        index={key}
                        check={this.state.check}
                        isShow={this.state.isShow}
                        onChange={(e, item)=>this.onChange(e, item)}
                        changeShow={(id)=>this.changeShow(id)}
                        confirm={(id,supplySellerId,supplyShopId,operation)=>this.confirm(id,supplySellerId,supplyShopId,operation)}
                        codesResponse={this.codesResponse}
                        codes={this.codes}
                      />
                    )
                  })
                  : <div className={styles.noData}><span style={{marginRight: 5}}><Icon type="frown-o" /></span><span>暂无数据</span></div>
                }
              </div>
            </div>
            <div className={styles.pag}>
              <Pagination
                current={this.props.SupplyAuditSearch && this.props.SupplyAuditSearch.data && this.props.SupplyAuditSearch.data.data && this.props.SupplyAuditSearch.data.data.pageNum ? this.props.SupplyAuditSearch.data.data.pageNum : 1}
                total={this.props.SupplyAuditSearch && this.props.SupplyAuditSearch.data && this.props.SupplyAuditSearch.data.data && this.props.SupplyAuditSearch.data.data.totalCount ? this.props.SupplyAuditSearch.data.data.totalCount : 1}
                pageSize={this.props.pageSize}
                showQuickJumper
                onChange={(pageNumber)=>this.onChangePage(pageNumber)}
              />
            </div>
          </div>
    )
  }
}
