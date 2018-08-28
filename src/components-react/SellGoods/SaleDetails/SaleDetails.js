import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { querySaleItemSku } from '../SaleGoods/redux.js';
import {Checkbox,Icon,Popover,Button} from 'jdcloudui';
import styles from '../SaleGoods/styles.less';
import {FuncPermission}  from 'jdcloudecc/components';
import '../SaleGoods/style.css';
import SaleSublist from '../SaleDetails/SaleSublist';
import * as domain from 'jdcloudecc/reducer/domain';

@connect(
  state => ({SaleItem: state.SaleItem,QuerySaleItemSku:state.SaleItem}),
  dispatch => bindActionCreators({...domain,querySaleItemSku}, dispatch)
)
export default class SaleDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      isShow: {},
      loaded:{},
      item:{},
      id:{}
    }
  }

  ajustHeight(node, rows){
    let v = node.innerHTML;
    node.innerHTML = "";
    let h1 = node.offsetHeight;
    node.innerHTML = "&nbsp;";
    let h2 = node.offsetHeight;
    let rowHeight = h2 - h1;
    node.innerHTML = v;
    let len = v.length, i = 3;
    while(node.offsetHeight > rowHeight * rows + h1){
      node.innerHTML = v.substring(0, len - i) + '...';
      i++;
    }
  }
  //展开列表
  changeShow(item){
    const showState = Object.assign({}, this.state.isShow);
    this.setState({loaded: false});
    this.setState({id: item.id});
    if(showState[item.id]){
      showState[item.id] = false;
      this.setState({loaded: true})
      this.setState({item: null});
    }else{
      showState[item.id] = true;
      let initialValues = {};
      initialValues={itemId: item.id, shopId: item.shopId, cid: item.cid};
      this.props.querySaleItemSku(initialValues).then(
        (result)=>{
          console.log('querySaleItemSku success');
          this.setState({loaded: true});
          this.setState({itemSkuInfoList: result});
        },
        (error)=>{
          console.log('querySaleItemSku fail');
          this.setState({loaded: false});
      }

      );
    }
    this.setState({isShow: showState});
  }
  render(){
    const MainDomain = this.props.getMainDomain();
    console.log(MainDomain)
    let _this = this;
    setTimeout(()=>{
      let domArr = document.getElementsByClassName('words');
      for(let i = 0 ; i < domArr.length ; i++){
        _this.ajustHeight(domArr[i], 2);
      }
    },1);
    return(
      <div className={styles.saleDetail}>
        <div className={styles.hd}>
          <span className="check">
            <Checkbox
              onChange={(e)=>this.props.onChange(e, this.props.item.id)}
              checked={this.props.check[this.props.item.id] ? this.props.check[this.props.item.id] : false}
            />
          </span>
          <span className="w-20 f-fl">
            <span className="text-999">商品编码：</span>
		        <span>{`${this.props.item.id}`}</span>
          </span>
          <span className="w-80 f-fl f-toe">
            <span className="text-999">平台类目：</span>
		        <span>
              {
                this.props.item.cname1 == null
                  ? ''
                  : this.props.item.cname2 == null
                    ? `${this.props.item.cname1}`
                    : this.props.item.cname3 == null
                      ? `${this.props.item.cname1}/${this.props.item.cname2}`
                      : this.props.item.cname4 == null
                        ? `${this.props.item.cname1}/${this.props.item.cname2}/${this.props.item.cname3}`
                        : `${this.props.item.cname1}/${this.props.item.cname2}/${this.props.item.cname3}/${this.props.item.cname4}`
              }
            </span>
          </span>
        </div>
        <div className={styles.sale}>
          <div className={`${styles.parentBox} w-29`}>
            <div className={styles.saleInfo}>
              <span className={styles.zk} onClick={()=>this.changeShow(this.props.item)}>
                <Icon type={this.state.isShow[this.props.item.id] ? "minus-square-o" : "plus-square-o"} />
              </span>
              <div className={styles.pic}>
                <a href={`//${MainDomain}/search-website-view/item/${this.props.item.id}`} target="_blank">
                  <img src={`${this.props.item.pictureUrl}`} alt=""/>
                </a>
              </div>
              <div className={styles.parentBox}>
                <div className={styles.wenzi}>
                  <a href={`//${MainDomain}/search-website-view/item/${this.props.item.id}`} className="words f-wwb text-link" target="_blank">{this.props.item.itemName}</a>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.parentBox} w-12`}>
            <div className={styles.mianjia}>
              {`${this.props.item.minMarketPrice != null ? '￥' + this.props.item.minMarketPrice.toFixed(2) : ''} - ${this.props.item.maxMarketPrice != null ? '￥' + this.props.item.maxMarketPrice.toFixed(2) : ''}`}
            </div>
          </div>
          <div className={`${styles.parentBox} w-12`}>
            <div className={styles.pifa}>
              {`${this.props.item.minCostPrice != null ? '￥' + this.props.item.minCostPrice.toFixed(2) : ''} - ${this.props.item.maxCostPrice != null ? '￥' + this.props.item.maxCostPrice.toFixed(2) : ''}`}
            </div>
          </div>
          <div className={`${styles.parentBox} w-8`}>
            <div className={styles.xiaoliang}>
              {this.props.item.salesVolume ? this.props.item.salesVolume : 0}
            </div>
          </div>
          <div className={`${styles.parentBox} w-8`}>
            <div className={styles.listingTime}>
              {this.props.item.publishTime ? this.props.item.publishTime : ''}
            </div>
          </div>
          <div className={`${styles.parentBox} w-8`}>
            <div className={styles.saleOperation}>
              {this.props.item.operatorName}
            </div>
          </div>
          <div className={`${styles.parentBox} w-8`}>
            <div className={`${styles.status} text-999`}>
              {this.props.item.saleStatus == 20 ? '待上架' : this.props.item.saleStatus == 50 ? '下架' : this.props.item.saleStatus == 60 ? '上架' : ''}
            </div>
          </div>
          <div className={`${styles.parentBox} w-12`}>
            <div className={styles.action}>
              <div>
                <FuncPermission codes={this.props.codesResponse} code="edit">
                  <a target="_blank" href = {'/operating-item-view/sale-edit?itemId='+this.props.item.id+'&sellerId='+this.props.item.sellerId+'&shopId='+this.props.item.shopId+'&codes='+this.props.codes+'&pageNum='+this.props.pageNum} /* className="mr-10 text-link" */>
                    编辑
                  </a><br/>
                </FuncPermission>
                {/* this.props.item.saleStatus != 20 ? <span>|</span> : null */}
                {this.props.item.saleStatus == 50 &&
                <FuncPermission codes={this.props.codesResponse} code="onshelves">
                  <a onClick={()=>this.props.updateItembatchShelves(this.props.item.id,60)} /* className="ml-10 text-link" */>
                    上架
                  </a><br/>
                </FuncPermission>}
                {this.props.item.saleStatus == 60 &&
                <FuncPermission codes={this.props.codesResponse} code="offshelves">
                  <a onClick={()=>this.props.updateItembatchShelves(this.props.item.id,50)} /* className="ml-10 text-link" */>
                    下架
                  </a><br/>
                </FuncPermission>}
                {/* <span>|</span> */}
                <Popover    content={
                  <div className="qrBox">
                      <p>商品二维码</p>
                      {this.props.item.detailPageQrcode?<img className="qrImg" src={this.props.item.detailPageQrcode}/>:null}
                      <br/>
                      {this.props.item.detailPageQrcode?<Button className="qrSaveBtn" type="primary"><a href={this.props.item.detailPageQrcode} download="">保存到本地</a></Button>:null}
                      {this.props.item.detailPageQrcode?<p className="savefail">若无法保存，请点击鼠标右键保存图片</p>:null}
                  </div>}
                  trigger="hover">
                  <span /* className="qrText" */><Icon type='qrcode'/> 二维码</span>
                </Popover>
              </div>
            </div>
          </div>
        </div>
          {
            this.state.isShow[this.state.id]
             ?
            <SaleSublist
              itemSkuInfoList = {this.state.itemSkuInfoList}
            loaded={this.state.loaded}/>:null
            }

      </div>
    )
  }
}
