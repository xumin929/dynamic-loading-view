import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Checkbox,Icon,Popconfirm} from 'jdcloudui';
import DispatchPlaces from '../DispatchPlaces/DispatchPlaces';
import styles from '../SupplyList/styles.less';
import '../SupplyList/style.css';
import {FuncPermission}  from 'jdcloudecc/components';
import ReginPrice from '../RegionPrice/RegionPrice'
import * as domain from 'jdcloudecc/reducer/domain';

@connect(
  state => ({
    SupplyAuditSearch: state.supplyAuditSearch,
    AdoptSupply:state.adoptSupply,
    funcPermissions:state.funcPermissions
  }),
  dispatch => bindActionCreators({...domain}, dispatch)
)

export default class SupplyDetails extends Component{
  constructor(props){
    super(props);
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
              onChange={(e)=>this.props.onChange(e, this.props.item)}
              checked={this.props.check[this.props.item.itemId+this.props.item.supplySellerId] ? this.props.check[this.props.item.itemId+this.props.item.supplySellerId] : false}
            />
          </span>
          <span className="w-20 f-fl pr20">
            <span className="text-999">商品编码：</span>
		        <span>{`${this.props.item.itemId}`}</span>
          </span>
          <span className="w-50 f-fl f-toe pr20">
            <span className="text-999">平台类目：</span>
		        <span>
              {
                this.props.item.firstCategoryName == null
                  ? ''
                  : this.props.item.secondCategoryName == null
                    ? `${this.props.item.firstCategoryName}`
                    : this.props.item.thirdCategoryName == null
                      ? `${this.props.item.firstCategoryName}/${this.props.item.secondCategoryName}`
                      : this.props.item.fourthCategoryName == null
                        ? `${this.props.item.firstCategoryName}/${this.props.item.secondCategoryName}/${this.props.item.thirdCategoryName}`
                        : `${this.props.item.firstCategoryName}/${this.props.item.secondCategoryName}/${this.props.item.thirdCategoryName}/${this.props.item.fourthCategoryName}`
              }
            </span>
          </span>
          <span className="w-10 f-fl f-toe pr20">
            <DispatchPlaces sourceData ={ this.props.item.baseAddressList}/>
          </span>
          <span className="w-20 f-fl f-toe pr20">
            {this.props.item.saleStatus==30 && this.props.item.storeStatus==20 ? <span>供应商申请的新发布商品</span> : <span>供应商申请供货的商品</span>}
          </span>
        </div>
        <div className={styles.sale}>
          <div className={styles.parentBox} style={{width: '29%'}}>
            <div className={styles.saleInfo}>
              <span className={styles.zk} onClick={()=>this.props.changeShow(this.props.item)}>
                <Icon type={this.props.isShow[this.props.item.itemId+this.props.item.supplySellerId] ? "minus-square-o" : "plus-square-o"} />
              </span>
              <div className={styles.pic}>
                <a href={`//${MainDomain}/search-website-view/item/${this.props.item.itemId}`} target="_blank">
                  <img src={`${this.props.item.pictureUrl}`} alt=""/>
                </a>
              </div>
              <div className={styles.parentBox}>
                <div className={styles.wenzi}>
                  <a href={`//${MainDomain}/search-website-view/item/${this.props.item.itemId}`} className="words f-wwb text-link" target="_blank">{this.props.item.itemName}</a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.parentBox} style={{width: '12.5%'}}>
            <span className={styles.gonghuo}>
              {`${this.props.item.minSupplyPrice != null ? '￥' + this.props.item.minSupplyPrice.toFixed(2) : ''} - ${this.props.item.maxSupplyPrice != null ? '￥' + this.props.item.maxSupplyPrice.toFixed(2) : ''}`}
            </span>
          </div>
          <div className={styles.parentBox} style={{width: '8.33333%'}}>
            <div className={styles.xiaoliang}>
              {this.props.item.saleNum?this.props.item.saleNum:0}
            </div>
          </div>
          <div className={styles.parentBox} style={{width: '12.5%'}}>
            <span className={styles.listingTime}>
              {this.props.item.createdStr}
            </span>
          </div>
          <div className={styles.parentBox} style={{width: '12.5%'}}>
            <span className={styles.saleOperation}>
              {this.props.item.supplySellerName}
            </span>
          </div>
          <div className={styles.parentBox} style={{width: '12.5%'}}>
            <div className={styles.status}>
              {this.props.item.operatorName}
            </div>
          </div>
          <div className={styles.parentBox} style={{width: '12.5%'}}>
            <div className={styles.action}>
              <div>
                {(this.props.item.saleStatus == 30 && this.props.item.storeStatus === 20 )&&
                  <FuncPermission codes={this.props.codesResponse} code="edit">
                    <a href={"/operating-item-view/product-release?itemId=" + this.props.item.itemId + '&&storeStatus=' + this.props.item.storeStatus + '&&newType=true'}>编辑</a>
                  </FuncPermission>}
                {this.props.item.saleStatus == 30 && this.props.item.storeStatus === 20 ? <span className="btn-line">|</span>: ''}
                <Popconfirm title="确认采纳?" onConfirm={()=>this.props.confirm(this.props.item.itemId,this.props.item.supplySellerId,this.props.item.supplyShopId,1)} okText="确认" cancelText="取消">
                  <a className="text-link">采纳</a>
                </Popconfirm>
                <span className="btn-line">|</span>
                <FuncPermission codes={this.props.codesResponse} code="unadopt">
                  <Popconfirm title="确认不采纳?" onConfirm={()=>this.props.confirm(this.props.item.itemId,this.props.item.supplySellerId,this.props.item.supplyShopId,0)} okText="确认" cancelText="取消">
                    <a className="text-link">不采纳</a>
                  </Popconfirm>
                </FuncPermission>
              </div>
            </div>
          </div>
        </div>
        {
          this.props.isShow[this.props.item.itemId+this.props.item.supplySellerId]
          ?
            this.props.item.itemSupplyAuditSkuList && this.props.item.itemSupplyAuditSkuList.map((item,key)=>{
              let supplyPrice = '';
              return (
                <div style={key == 0 ? {borderTop: '1px solid #e7e7ea'} : {borderTop: '1px dashed #e7e7ea'}} className={styles.showSale}>
                  <div className={styles.saleInfo}>
                    <div className={styles.pic}>
                      <img src={`${item.pictureUrl}`} alt=""/>
                    </div>
                    <div className={styles.parentBox}>
                      <div className={styles.wenzi}>
                        {item.skuIdStr ? item.skuIdStr : ''}
                        {item.attributes && item.attributes.split(';').map((item,key)=>{
                          return <p>{item}</p>
                        })}
                      </div>
                    </div>
                  </div>
                  <div className={styles.parentBox} style={{width: '12.5%'}}>
                    <div className={styles.gonghuo}>
                      {
                        item.skuPriceList && item.skuPriceList.map((price,key)=>{
                          {price.areaId && price.areaId == 0 && price.supplyPrice != null ? supplyPrice = '￥' + price.supplyPrice.toFixed(2) : ''}
                        })
                      }
                      <ReginPrice supplyPrice={supplyPrice} sourceData={item.skuPriceList} />
                    </div>
                  </div>
                  <div className={styles.parentBox} style={{width: '8.33333%'}}>
                    <div className={styles.xiaoliang}>
                      {item.saleNum ? item.saleNum : 0}
                    </div>
                  </div>
                  <div className={styles.parentBox} style={{width: '12.5%'}}>
                    <div className={styles.listingTime}>

                    </div>
                  </div>
                  <div className={styles.parentBox} style={{width: '12.5%'}}>
                    <div className={styles.saleOperation}>

                    </div>
                  </div>
                  <div className={styles.parentBox} style={{width: '12.5%'}}>
                    <div className={styles.status}>

                    </div>
                  </div>
                  <div className={styles.parentBox} style={{width: '12.5%'}}>
                    <div className={styles.action}>

                    </div>
                  </div>
                </div>
              )
            })
            : null
        }
      </div>
    )
  }
}
