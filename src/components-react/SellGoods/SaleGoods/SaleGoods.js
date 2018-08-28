import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { sellGoodsSearch,saveFormData } from '../SellGoodsSearch/redux';
import { updateItembatchShelves,querySaleItemSku } from './redux.js';
import { Button,Pagination,Icon,message } from 'jdcloudui';
import SaleDetails from '../SaleDetails/SaleDetails';
import styles from './styles.less';
import './style.css';
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';
import {FuncPermission}  from 'jdcloudecc/components';
import {Loading} from 'jdcloudecc/components';

@connect(
  state => ({SellGoodsSearch:state.sellGoodsSearch,funcPermissions:state.funcPermissions,QuerySaleItemSku:state.SaleItem}),
  dispatch => bindActionCreators({sellGoodsSearch,saveFormData,updateItembatchShelves,getPlatformFuncPermission,querySaleItemSku}, dispatch)
)
export default class SaleGoods extends Component{
  constructor(props){
    super(props);
    this.codes = [];
    this.codesResponse = [];
    this.state = {
      check: {},
      isShow: {},
      loaded:{}
    }
  }
  componentWillMount(){
    let initialValue = {};
    if(this.props.status && this.props.status!="undefined"){
      if(this.props.pageNum){
        initialValue={pageSize:this.props.pageSize,pageNum:this.props.pageNum,saleStatus:this.props.status};
      }else{
        initialValue={pageSize:this.props.pageSize,pageNum:1,saleStatus:this.props.status};
      }

    }else{
      if(this.props.pageNum){
        initialValue={pageSize:this.props.pageSize,pageNum:this.props.pageNum};
      }else{
        initialValue={pageSize:this.props.pageSize,pageNum:1};
      }
    }
    this.props.saveFormData(initialValue);
    this.props.sellGoodsSearch(initialValue).then(
      (result)=>{console.log('sellGoodsSearch success');},
      (error)=>{console.log('sellGoodsSearch fail')}
    );
    //获取权限数据
    this.props.getPlatformFuncPermission();
  }
  //更改单个选中状态
  onChange(e, id){
    const checkState = Object.assign({}, this.state.check);
    checkState[id] = e.target.checked;
    this.setState({check: checkState});
  }
  //展开列表
  changeShow(id){
    const showState = Object.assign({}, this.state.isShow);
    this.setState({loaded: false})
    if(showState[id]){
      showState[id] = false;
    }else{
      showState[id] = true;
      let initialValues = {};
      this.props.querySaleItemSku(initialValues).then(
        (result)=>{
          console.log('querySaleItemSku success');
          this.setState({loaded: true})
        },
        (error)=>{console.log('querySaleItemSku fail')}
      );
    }
    this.setState({isShow: showState});
  }
  //全选
  allChecked(){
    let check = {};
    this.props.SellGoodsSearch
    && this.props.SellGoodsSearch.data
    && this.props.SellGoodsSearch.data.data
    && this.props.SellGoodsSearch.data.data.result.forEach((item)=>{
      check[item.id] = true;
    })
    this.setState({
      check: check
    });
  }
  //反选
  diffChecked(){
    let check ={};
    this.props.SellGoodsSearch
    && this.props.SellGoodsSearch.data
    && this.props.SellGoodsSearch.data.data
    && this.props.SellGoodsSearch.data.data.result.forEach((item)=>{
      check[item.id] = !this.state.check[item.id];
    })
    this.setState({check: check});
  }
  //批量上架
  upDateAll(){
    const checkState = Object.assign({}, this.state.check);
    let arr = [];
    Object.entries(checkState).forEach(item=>{
      console.log(item)
      item[1] && arr.push(item[0]);
    })
    arr.length && this.updateItembatchShelves(arr, 60);
    this.setState({
      check: {}
    });
    this.refreshList();
  }
  //批量下架
  downDateAll(){
    const checkState=Object.assign({},this.state.check);
    let arr = [];
    Object.entries(checkState).forEach(item=>{
      item[1] && arr.push(item[0]);
    })
    arr.length && this.updateItembatchShelves(arr, 50);
    this.setState({
      check:{}
    });
    this.refreshList();
  }

    //导出
    exportItem(){
        let url = `/proxy/item/platform/item/saleItemExport`;
        window.open(url);
    }

  //刷新页面
  refreshList(){
    let searchValue = this.props.SellGoodsSearch.searchdata.searchdata;
    this.props.sellGoodsSearch(searchValue).then(
      (result)=>{console.log('sellGoodsSearch success');console.log(result)},
      (error)=>{console.log('sellGoodsSearch fail')}
    );
  }
  //上下架方法
  updateItembatchShelves(arr, status){
    var param = {itemId: arr, saleStatus: status};
    this.props.updateItembatchShelves(param).then(
      (result)=>{console.log('updateItembatchShelves success');this.refreshList();},
      (error)=>{console.log('updateItembatchShelves fail')}
    );
  }
  //分页
  onChangePage(pageNumber){
    var searchData = this.props.SellGoodsSearch.searchdata && this.props.SellGoodsSearch.searchdata.searchdata;
    var pageChange ={...searchData,pageNum:pageNumber};
    this.props.saveFormData(pageChange);
    this.props.sellGoodsSearch(pageChange).then(
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
    return(
          <div>
            <div className="b-e5">
              <Loading loaded = {this.props.SellGoodsSearch.loaded}>
              </Loading>
              <div className={styles.btns}>
                <span className="ml-10">
                  <Button type="primary" onClick={::this.allChecked}>全选</Button>
                </span>
                      <span className="ml-10">
                  <Button className="bc-fff" onClick={::this.diffChecked}>反选</Button>
                </span>
                <FuncPermission codes={this.codesResponse} code="onbatchshelves">
                  <span className="ml-10">
                    <Button className="bc-fff" onClick={::this.upDateAll}>批量上架</Button>
                  </span>
                </FuncPermission>
                <FuncPermission codes={this.codesResponse} code="offbatchshelves">
                  <span className="ml-10">
                    <Button className="bc-fff" onClick={::this.downDateAll}>批量下架</Button>
                  </span>
                </FuncPermission>
                  <span className="ml-10">
                    <Button className="bc-fff1" style={{display:'none'}} onClick={::this.exportItem} dis>导出</Button>
                  </span>
              </div>
              <div className={styles.content}>
                <div className={styles.title}>
                  <span className="w-29">商品信息</span>
                  <span className="w-12">面价</span>
                  <span className="w-12">批发价</span>
                  <span className="w-8">销量</span>
                  <span className="w-8">发布时间</span>
                  <span className="w-8">商品运营</span>
                  <span className="w-8">状态</span>
                  <span className="w-12">操作</span>
                </div>
                {
                  this.props.SellGoodsSearch
                  && this.props.SellGoodsSearch.data
                  && this.props.SellGoodsSearch.data.data
                  && this.props.SellGoodsSearch.data.data.result
                  && this.props.SellGoodsSearch.data.data.result.length != 0
                  ? this.props.SellGoodsSearch.data.data.result.map((item,key)=>{
                    return (
                      <SaleDetails
                        pageNum={this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.pageNum ? this.props.SellGoodsSearch.data.data.pageNum : 1}
                        item={item}
                        key={key}
                        index={key}
                        check={this.state.check}
                        isShow={this.state.isShow}
                        loaded={this.state.loaded}
                        onChange={(e, id)=>this.onChange(e, id)}
                        changeShow={(id)=>this.changeShow(id)}
                        updateItembatchShelves={(arr, status)=>this.updateItembatchShelves(arr, status)}
                        codesResponse={this.codesResponse}
                        codes={this.codes}
                      />
                    )
                  })
                  : <div className={styles.noData}><span className="mr5"><Icon type="frown-o" /></span><span>暂无数据</span></div>
                }
              </div>
            </div>
            <div className={styles.pag}>
              <Pagination
                showQuickJumper
                current={this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.pageNum ? this.props.SellGoodsSearch.data.data.pageNum : 1}
                total={this.props.SellGoodsSearch && this.props.SellGoodsSearch.data && this.props.SellGoodsSearch.data.data && this.props.SellGoodsSearch.data.data.totalCount ? this.props.SellGoodsSearch.data.data.totalCount : 1}
                pageSize={this.props.pageSize}
                onChange={(pageNumber)=>this.onChangePage(pageNumber)}
              />
            </div>
          </div>
    )
  }
}
