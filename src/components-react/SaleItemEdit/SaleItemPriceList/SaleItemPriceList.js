/**
 * Created by huangxiao3 on 2017/2/27.
 */
import React from 'react';
import { Form, Input, Button, message, Radio } from 'jdcloudui';

import './style/SaleItemPriceList.css'
import RegionPriceEdit from  '../RegionPriceEdit/RegionPriceEdit';
import RegionPriceDetail from  '../RegionPriceDetail/RegionPriceDetail';
import  BaseComponent  from '../../Common/BaseComponent';
import SupplySeeMore from '../SupplySeeMore/SupplySeeMore'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FuncPermission}  from 'jdcloudecc/components';
import * as action from './redux';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import { withRouter } from 'react-router';
import queryString from 'query-string';

@connect(
  state => ({SaleItemPriceList:state.saleItemPriceList,routing:state.routing}),
  dispatch => bindActionCreators({...action}, dispatch)
)
@withRouter
@Form.create()
export default class SaleItemPriceList extends BaseComponent {

  constructor(props, context) {
    super(props, context);
    //保存子页面数据,
    this.advancePercent='';
    this.balancePayment='';
    this.state={
      paymentType3:true,
      isEdit:false,
      regionList:{},
      buttonLoading:false,//保存按钮的loading状态
    }
  }

  //返回list中的全国价
  findTotalPrice(list,type){
    for(var key in list){
      if(list[key].areaId==0){
        if(type==='1' || type === 1){
          return list[key].marketPrice;
        }else{
          return list[key].costPrice;
        }
      }
    }
  }

  //保存子页面数据，通过uuid唯一标识，更新父页面的全国价格
  saveData(dataList){
    //获取 设置地域价 数据；根据uuid唯一表示并保存。
    let tmpRegionList = this.state.regionList;
    tmpRegionList[dataList.uuid] = dataList;
    this.setState({
      regionList:tmpRegionList
    })

    //更新父页面的input数据
    for(var key in tmpRegionList){
      var skuId = tmpRegionList[key].skuId;
      var type = tmpRegionList[key].priceType;
      var price = this.findTotalPrice(tmpRegionList[key].priceList,type);
      var totalPrice = tmpRegionList[key].totalPrice;
      if(totalPrice && totalPrice>0){
        if(type==='1' || type === 1){
          this.props.form.setFieldsValue({
            [`totalMarketPrice-${skuId}`]:totalPrice
          });
        }else{
          this.props.form.setFieldsValue({
            [`totalCostPrice-${skuId}`]:totalPrice
          });
        }
      }
    }
    console.log('SaleItemPriceList.js regionList is', tmpRegionList);
  }

  //组装数据并提交
  submitData(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //获取skuList信息，生成全量保存的数据结构，不包含全国价，全国价根据本页面的input进行再次保存
        var itemSkuInfoList = this.props.SaleItemPriceListData && this.props.SaleItemPriceListData.itemSkuInfoList

        var priceList=new Array();
        for(var item in itemSkuInfoList){
          //产品需求修改：无供货商也可保存价格
          /*if(itemSkuInfoList[item].shopItemSkuPriceList && itemSkuInfoList[item].shopItemSkuPriceList.length>0){*/
          if(true){
            var tmp={
              platformId:this.platformId,
              itemId: this.props.itemId,
              skuId: itemSkuInfoList[item].skuId,
              sellerId:this.props.sellerId,
              shopId:this.props.shopId,
              yn:0,
              marketPriceList:[],
              costPriceList:[],
              areaId:'0',
              marketPrice:null,
              costPrice:null,
              updateMarketPrice:false,
              updateCostPrice:false,
            };
            for(var price in this.state.regionList){
              //遍历regionList，根据skuid和priceType进行匹配
              if(itemSkuInfoList[item].skuId==this.state.regionList[price].skuId && this.state.regionList[price].priceType=='1'){
                tmp.marketPriceList = tmp.marketPriceList.concat(this.state.regionList[price].priceList);
                tmp.updateMarketPrice = this.state.regionList[price].updatePrice;
              }else if(itemSkuInfoList[item].skuId==this.state.regionList[price].skuId && this.state.regionList[price].priceType=='2'){
                tmp.costPriceList = tmp.costPriceList.concat(this.state.regionList[price].priceList);
                tmp.updateCostPrice = this.state.regionList[price].updatePrice;
              }
            }
            priceList.push(tmp);
          }
        }
        //获取本页面上的全国价
        let formValues = this.props.form.getFieldsValue();
        console.log("list page,all total price from Form is",formValues);
        for(var k in priceList){
          var skuId = priceList[k].skuId;
          var marketTotalPrice = formValues[`totalMarketPrice-${skuId}`];
          var costTotalPrice = formValues[`totalCostPrice-${skuId}`];
          if(marketTotalPrice!=null && marketTotalPrice!=undefined && marketTotalPrice!='' && parseFloat(marketTotalPrice).toFixed){
            marketTotalPrice = parseFloat(marketTotalPrice).toFixed(2);
          }
          if(costTotalPrice!=null && costTotalPrice!=undefined && costTotalPrice!='' && parseFloat(costTotalPrice).toFixed){
            costTotalPrice = parseFloat(costTotalPrice).toFixed(2);
          }

          //new interface
          if(marketTotalPrice!=null && marketTotalPrice!=undefined && marketTotalPrice!=''){
            if(costTotalPrice == ''){
              costTotalPrice = null;
            }
            priceList[k].marketPrice = marketTotalPrice;
            priceList[k].costPrice = costTotalPrice;
          }
        }

        console.log('final data', priceList);
        let result = {
          salePriceType:this.props.form.getFieldValue('salePriceType'),
          tradeItemSkuPriceListVo:priceList,
          advancePercent:this.advancePercent,
        };
        //临时修改，不保存任何数据，应传参数为priceList！！！！！！！！
        this.props.savePriceInfo(result).then(
          (result)=>{
            if(result.code==0){
              console.log('code0',result.code);
              message.info('保存成功！');
              this.setState({
                buttonLoading: true,
              })
              window.location.href = `/operating-item-view/sale-item?pageNum=${this.props.pageNum}`;
            }else{
              console.log('false,',result.code);
              message.warning(result.msg);
            }
          }
        );
      }
    });
  }

  handleSubmitCancel(cancelUrl){
    window.location.href = cancelUrl;
  }

  getUnifiedPrice (k){
    var marketPrice ='false';
    if(this.state.regionList && this.state.regionList[k]){
      for(var i=0;i<this.state.regionList[k].length;++i){
        if(this.state.regionList[k].areaId===0 && this.state.regionList[k].marketPrice!=''){
          marketPrice = this.state.regionList[k].marketPrice;
        }
      }
      if(marketPrice){
        return marketPrice;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  createData(){
    //询价模式 面价选填
    let required = this.props.form.getFieldValue('salePriceType')==2?false:true;
    let uuid=0;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    var dataSource = this.props.SaleItemPriceListData && this.props.SaleItemPriceListData.itemSkuInfoList && this.props.SaleItemPriceListData.itemSkuInfoList.map((data)=>{
      //720产品需求修改：无供货商供货也可设置地域价
      let diableFlag=false;
      // if(data.shopItemSkuPriceList && data.shopItemSkuPriceList.length>0){
      //   diableFlag= false;
      // }
      return(
        <tbody>
          {/*sku维度商品信息汇总*/}
          <tr className='sumTr'>
            <td>{ data.attributesName }</td>
            <td>销量：{ data.salesVolume }</td>
            <td>平均供货价：<span className="txt-red">￥{ data.avgSupplyPrice }</span></td>
            <td>
              <FormItem layout='inline' required={required} label="全国统一面价：" {...formItemLayout} style={{margin:'0 0 0 0'}}>
                {getFieldDecorator(`totalMarketPrice-${data.skuId}`, {
                  initialValue: data.marketPrice,
                  rules: [{
                    validator: this.checkPrice,
                  }],
                })(
                  <Input size="large" maxLength="10" style={{ width: 90,marginRight:'10px' }} disabled={diableFlag} />
                )}

              {!diableFlag &&
              <FuncPermission codes={this.createFuncCode()} code="setMarketPrice">
                <RegionPriceEdit
                  priceType="1"
                  itemId={this.props.itemId}
                  skuId={data.skuId}
                  savePrice={(dataList)=>this.saveData(dataList)}
                  uuid={++uuid}
                  queryPriceDetail={this.props.getPlatformPrice}
                  totalPrice={this.props.form.getFieldValue(`totalMarketPrice-${data.skuId}`)}
                  tmpSourceData={this.state.regionList[uuid]}
                />
              </FuncPermission>
              }
              {!diableFlag &&
              <FuncPermission codes={this.createFuncCode()} code="marketPriceDetail">
                <RegionPriceDetail
                  priceType="1"
                  itemId={this.props.itemId}
                  skuId={data.skuId}
                  sourceData={this.state.regionList[uuid]}
                  totalPrice={this.props.form.getFieldValue(`totalMarketPrice-${data.skuId}`)}
                />
              </FuncPermission>
              }
              </FormItem>
            </td>
            {/*<td>
               <FormItem inline label="全国统一批发价：" {...formItemLayout} style={{margin:'0 0 0 0'}}>
                {getFieldDecorator(`totalCostPrice-${data.skuId}`, {
                  initialValue: data.costPrice,
                  rules: [{
                    validator: this.checkPrice2,
                  }],
                })(
                  <Input size="large" style={{ width: 90 }} disabled={diableFlag} />
                )}
              {!diableFlag &&
              <FuncPermission codes={this.createFuncCode()} code="setCostPrice">
                <RegionPriceEdit
                  priceType="2"
                  itemId={this.props.itemId}
                  skuId={data.skuId}
                  savePrice={(dataList)=>this.saveData(dataList)}
                  uuid={++uuid}
                  queryPriceDetail={this.props.getSuppluPrice}
                  totalPrice={this.props.form.getFieldValue(`totalCostPrice-${data.skuId}`)}
                  tmpSourceData={this.state.regionList[uuid]}
                />
              </FuncPermission>
              }
              {!diableFlag &&
              <FuncPermission codes={this.createFuncCode()} code="costPriceDetail">
                <RegionPriceDetail
                  priceType="2"
                  itemId={this.props.itemId}
                  skuId={data.skuId}
                  sourceData={this.state.regionList[uuid]}
                  totalPrice={this.props.form.getFieldValue(`totalCostPrice-${data.skuId}`)}
                />
              </FuncPermission>
              }
              </FormItem> 
            </td>*/}
          </tr>
          {/*某个sku对应的多个供应商*/}
          {this.createSkuListData(data.shopItemSkuPriceList)}
        </tbody>
      );
    });
    return dataSource;
  }

  createsalePriceTypeRadio(){
    const formItemLayout = {
      labelCol: {span: 1},
      wrapperCol: {span: 15},
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    if(this.props.SaleItemPriceListData && this.props.SaleItemPriceListData.salePriceType){
      getFieldDecorator('salePriceType', { initialValue: this.props.SaleItemPriceListData.salePriceType });
    }else{
      getFieldDecorator('salePriceType', { initialValue: 1 });
    }
    return(
      <FormItem label="销售方式" {...formItemLayout}>
        {getFieldDecorator(`salePriceType`)(
        <RadioGroup>
          <Radio value={1}>正常销售</Radio>
          <Radio value={2}>询价模式</Radio>
          <Radio value={3}>分期付款</Radio>
        </RadioGroup>
      )}
      </FormItem>
    )
  }

  changePayType(event){
    this.props.form.setFieldsValue({
      'salePriceType':event.target.value,
    },()=>{console.log('callbacktest')})
    this.props.form.validateFields({ force: true });
  }

  handleEdit(){
    if(this.props.form.getFieldValue('salePriceType')==3){
      this.props.form.setFieldsValue(
        {
          'advancePercent':this.advancePercent,
          'balancePayment':this.balancePayment,
        }
      )
      this.setState({
        paymentType3:true,
        isEdit:true
      });
    }
  }

  handleSave(){
    this.props.form.validateFields(['advancePercent'],
      (err) =>
      {
        if (!err) {
          this.advancePercent=this.props.form.getFieldValue('advancePercent');
          this.balancePayment=this.props.form.getFieldValue('balancePayment');
          this.setState({
            paymentType3:true,
            isEdit:false,
            regionList:{},
          });
        }
      },
    );
  }

  handleCancel(){
    this.props.form.setFieldsValue(
      {
        'advancePercent':this.advancePercent,
        'balancePayment':this.balancePayment,
      }

    )
    this.setState({
      paymentType3:true,
      isEdit:false,
      regionList:{},
    });
  }

  checkAdvancePercent = (rule, value, callback) => {
    const form = this.props.form;
    let advancePercent = parseInt(value);
    if(value=='' || advancePercent<1 || advancePercent>99 || !(/^[0-9]*$/.test(advancePercent))){
      callback('请输入合理的定金比例!');
    } else {
      this.props.form.setFieldsValue({
        balancePayment: 100-parseInt(advancePercent)
      });
      callback();
    }
  }

  checkPrice=(rule, value, callback) => {
    const form = this.props.form;
    const type = this.props.form.getFieldValue('salePriceType');
    if(type!=2){
      if(value=='' || !(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value))){
        callback('请输入有效价格,最多保留两位小数!');
      } else {
        callback();
      }
    }else{
      if(value && value!='' && !(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value))){
        callback('请输入有效价格,最多保留两位小数!');
      } else {
        callback();
      }
    }
  }
  checkPrice2=(rule, value, callback) => {
    const form = this.props.form;
    if(value && value!='' && !(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value))){
      callback('请输入有效价格,最多保留两位小数!');
    } else {
      callback();
    }
  }

  checkBalancePayment = (rule, value, callback) => {
    const form = this.props.form;
    let balancePayment = parseInt(value);
    let advancePercent = parseInt(form.getFieldValue('advancePercent'));
    let result = advancePercent+balancePayment;
    if(value && result!=100){
      callback('请输入合理的尾款比例!');
    } else {
      callback();
    }
  }


  createPaymentText(){
    const { getFieldDecorator, getFieldValue } = this.props.form;

    //---------布局start----------
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const formItemLayout2 = {
      labelCol: { span: 11 },
      wrapperCol: { span: 10 },
    };
    //---------布局end----------

    let disable = this.props.form.getFieldValue('salePriceType')==3?false:true;

    if(this.props.SaleItemPriceListData && this.props.SaleItemPriceListData.salePriceType){
      getFieldDecorator('salePriceType', { initialValue: this.props.SaleItemPriceListData.salePriceType });
    }else{
      getFieldDecorator('salePriceType', { initialValue: 1 });
    }
    if(this.props.form.getFieldValue('advancePercent') && this.props.form.getFieldValue('advancePercent')!=''){
      this.advancePercent = this.props.form.getFieldValue('advancePercent');
    }

    /*this.advancePercent = this.props.form.getFieldValue('advancePercent');*/
    if(this.advancePercent && this.advancePercent!=''){
      //修改过，以修改后的为主
      this.balancePayment = 100-parseInt(this.advancePercent);
    }else{
      //未修改，以接口返回的为主
      this.advancePercent = this.props.SaleItemPriceListData && this.props.SaleItemPriceListData.advancePercent?this.props.SaleItemPriceListData.advancePercent:'';
      if(this.advancePercent=='' || !this.advancePercent){
        this.balancePayment = '';
      }else{
        this.balancePayment = 100-parseInt(this.advancePercent);
      }
    }
    getFieldDecorator('balancePayment', { initialValue: this.balancePayment });

    //begin:2017-10-17需求：满减、优惠券、优惠券活动商品不可选择：询价、分期；直降商品不可选择：询价；
    let type1Disable=false;
    let type2Disable=false;
    let type3Disable=false;
    let activity = this.props.SaleItemPriceListData && this.props.SaleItemPriceListData.activityFlag;
    console.log('in createPaymentText,activity is :',activity);
    if(activity && (activity==1 || activity==3 || activity==4)){
      type2Disable = true;
      type3Disable = true;
    }else if(activity && activity==2){
      type2Disable = true;
    }
    //end

    return(
      <div className="saleType">
          <div className="saleTypeTitle">
            <FormItem label="销售方式 :" layout='inline'>
              {getFieldDecorator(`salePriceType`)(
                <RadioGroup onChange={(event)=>this.changePayType(event)}>
                  <Radio value={1} disabled={type1Disable} >正常销售</Radio>
                  <Radio value={2} disabled={type2Disable}>询价模式</Radio>
                  <Radio value={3} disabled={type3Disable}>分期付款</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </div>
          {this.props.form.getFieldValue('salePriceType')==3?
            [
              <div className="paymentTitle">
                <FormItem  label="定金比例">
                  {getFieldDecorator(`advancePercent`, {
                    initialValue:this.advancePercent?this.advancePercent:'',
                    rules: [{
                      validator: this.checkAdvancePercent,
                    }],
                  })(
                    <Input disabled={!this.state.isEdit} placeholder="1-99正整数" addonAfter="%" width="50px" />
                  )}
                </FormItem>
              </div>
              ,
              <div className="paymentTitle">
                <FormItem label="尾款比例" key={Math.random()}>
                  {getFieldDecorator(`balancePayment`, {
                    initialValue: this.balancePayment
                  })(
                    <Input disabled={true} addonAfter="%" width="50px"/>
                  )}
                </FormItem>
              </div>
              ,
              <div className="saleTypeOperation">
                {this.state.isEdit?
                  [
                    <Button type="primary" onClick={()=>this.handleSave()}>保存</Button>,
                    <Button onClick={()=>this.handleCancel()} style={{marginLeft:'10px'}}>取消</Button>
                  ]:
                  <div style={{marginTop:'7px',}} className="saleTypeOperation">
                    <a onClick={()=>this.handleEdit()} >编辑</a>
                  </div>
                }
              </div>
            ]:
            ''
          }
      </div>
    )
  }

  createSkuListData(sourceData){
    var dataSource = sourceData.map((data)=>{
      return(
        <tr className='secondTr'>
          <td>供货商：{data.supplySellerName}</td>
          <td>销量：{data.salesVolume}</td>
          <td><span className="fb mr10">全国统一价</span> 供货价：<span className="txt-red">￥{data.supplyPrice}</span></td>
          <td>基础备货：<span className="txt-red" style={{marginRight:'10px'}}>{data.inventory}</span>
            <FuncPermission codes={this.createFuncCode()} code="supplyPriceDetail">
              <SupplySeeMore title={data.supplySellerName} totalPrice={data.supplyPrice} itemId={data.itemId} skuId={data.skuId} supplySellerId={data.supplySellerId} />
            </FuncPermission>
          </td>
        </tr>
      );
    });
    return dataSource;
  }

  createFuncCode(){
    // TODO 修改调用 by jingxl
    // let codes = this.props.routing.locationBeforeTransitions.query.codes;
    let {search} = this.props.routing.location;
    let codes = queryString.parse(search) && queryString.parse(search).codes;

    let codesArray = codes &&  codes.split(",") || [];
    return codesArray;
  }

  render() {
    //let cancelUrl = `/operating-item-view/sale-item?pageNum=${this.props.pageNum}`;
    let cancelUrl = '/operating-item-view/sale-item';
    return (
      <Form>
        {this.createPaymentText()}
        <div className="ui-tbl">
          <table>
            <colgroup>
              <col />
              <col />
              <col style={{width: 170}}/>
              <col style={{width: 350}} />
              <col style={{width: 350}} />
            </colgroup>
              {this.createData()}
          </table>
        </div>
        <hr style={{marginTop:'24px',border:'0',height:'1px',backgroundColor:'#d9d9d9'}}/>
        <div style = {{textAlign: 'center',paddingTop:'20px'}}>
          <FuncPermission codes={this.createFuncCode()} code="saveAllPrice">
            <Button style = {{marginLeft: '40px'}} type="primary" onClick={()=>this.submitData()} loading={this.state.buttonLoading}>保存</Button>
          </FuncPermission>
          <Button style = {{marginLeft: '40px'}} onClick={()=>this.handleSubmitCancel(cancelUrl)}>取消</Button>
        </div>
      </Form>
    )
  }

}
