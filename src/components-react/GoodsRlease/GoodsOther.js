/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布-规格参数
 ****************************************************************/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Radio, InputNumber, Checkbox} from 'jdcloudui';
import {uploadPrams} from './redux';
import FileUp from './FileUp/FileUp';
const RadioGroup = Radio.Group;
import styles from './style/GoodsBasic.css';
@connect(
  state => ({
    goodsRlease: state.goodsRlease,
    goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({uploadPrams}, dispatch)
)
export default class BasicInfomation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 1,
      deliveryType: 1,
      saleType: 1,
      refundService: 1,
      changeService: 1,
      cashCouponSupport: true,
      meetCouponSupport: true,
      ifchecked: false,
      fileAddr: [],
      initialTime: 1,//起订量
      deliveryCycle: 3,//交货周期
      changeDuration: 7,//退货周期
      refundDuration: 7, //换货周期
      repaireDuration: 3,//质保期限

    };
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    this.first = false;
    this.firstLoad = true;
    this.firstValue = true;
    this.firstchecked = true;
  }

  onChange(e) {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });

  }

  onChangehomeDelivery(e) {
    this.setState({
      ifchecked: e.target.checked
    });
    if (e.target.checked == true) {
      this.itemPulishVO.itemDeliveryInfoVo.homeDelivery = 1;
    } else {
      this.itemPulishVO.itemDeliveryInfoVo.homeDelivery = 0;
    }
    this.props.uploadPrams(this.itemPulishVO);
  }

  onChangedeliveryType(e) {

    console.log(e.target.value, 'onChangedeliveryType');
    this.itemPulishVO.itemDeliveryInfoVo.deliveryType = e.target.value;
    this.props.uploadPrams(this.itemPulishVO);
    this.setState({
      deliveryType: e.target.value,
    });
  }

  onChangesaleType(e) {

    this.itemPulishVO.itemSaleInfoVo.saleType = e.target.value;
    this.props.uploadPrams(this.itemPulishVO);
    this.setState({
      saleType: e.target.value,
    });
  }

  onChangeinitialMount(e) {
    let num = 0;
    if (e && e.target && e.target.value) {
      num = e.target.value;
    } else {
      num = e;
    }

    num = parseInt(num);
    if (!num && num != 0) {
      num = 1;
    } else {
    }
    this.itemPulishVO.itemSaleInfoVo.initialMount = +num;
    this.setState({
      initialTime: +num
    });
    this.props.uploadPrams(this.itemPulishVO);
  }

  onChangedeliveryCycle(e) { //交货周期

    let num = 0;
    if (e && e.target && e.target.value) {
      num = e.target.value;
    } else {
      num = e;
    }
    num = parseInt(num);
    if (!num && num != 0) {
      num = 1;
    } else {
    }
    if (+num < 1) {
      num = 1;
    } else {
    }
    this.itemPulishVO.itemSaleInfoVo.deliveryCycle = +num;
    this.setState({
      deliveryCycle: +num
    });
    this.props.uploadPrams(this.itemPulishVO);
  }

  onBChangedeliveryCycle(e) {

    let num = 0;
    if (e && e.target && e.target.value) {
      num = e.target.value;
    } else {
      num = e;
    }
    num = parseInt(num);
    if (!num && num != 0) {
      num = 1;
    } else {
    }
    if (+num < 1) {
      num = 1;
    } else {
    }
    this.itemPulishVO.itemSaleInfoVo.deliveryCycle = +num;
    this.setState({
      deliveryCycle: +num
    });
    this.props.uploadPrams(this.itemPulishVO);
  }

  onChangerefundService(e) {

    console.log(e.target.value, 'onChangerefundService');
    this.itemPulishVO.itemAfterSaleVo.refundService = e.target.value;
    this.props.uploadPrams(this.itemPulishVO);
    this.setState({
      refundService: e.target.value,
    });
  }

  onChangerefundDuration(e) {// 退货时长

    let num = 0;
    if (e && e.target && e.target.value) {
      num = e.target.value;
    } else {
      num = e;
    }
    num = parseInt(num);
    if (!num && num != 0) {
      num = 0;
    } else {
    }
    this.itemPulishVO.itemAfterSaleVo.refundDuration = +num;
    this.props.uploadPrams(this.itemPulishVO);
    this.setState({
      refundDuration: +num
    });
  }

  onChangechangeService(e) {

    console.log(e.target.value, 'onChangechangeService');
    this.itemPulishVO.itemAfterSaleVo.changeService = e.target.value;
    this.props.uploadPrams(this.itemPulishVO);
    this.setState({
      changeService: e.target.value,
    });
  }

  onChangechangeDuration(e) {

    let num = 0;
    if (e && e.target && e.target.value) {
      num = e.target.value;
    } else {
      num = e;
    }
    num = parseInt(num);
    if (!num && num != 0) {
      num = 0;
    } else {
    }
    this.itemPulishVO.itemAfterSaleVo.changeDuration = +num;
    this.props.uploadPrams(this.itemPulishVO);
    this.setState({
      changeDuration: +num,
    });
  }

  onChangerepaireDuration(e) {

    let num = 0;
    if (e && e.target && e.target.value) {
      num = e.target.value;
    } else {
      num = e;
    }
    num = parseInt(num);
    if (!num && num != 0) {
      num = 0;
    } else {
    }
    this.itemPulishVO.itemAfterSaleVo.repaireDuration = +num;
    this.setState({
      repaireDuration: +num
    });
    this.props.uploadPrams(this.itemPulishVO);
  }

  changeArear(e) {

    console.log(e.target.value, 'changeArear');
    this.itemPulishVO.packingList = e.target.value;
    this.props.uploadPrams(this.itemPulishVO);
  }

  componentWillMount() {
    /*if (!this.props.editGoods) {
      this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    } else {
    }*/
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
  }

  changeCashCouponSupport(e) {
    this.setState({
      cashCouponSupport: e.target.checked,
    });
    if (e.target.checked) {
      if(this.props.goodsEdit && this.props.goodsEdit.editGoods){
        this.props.goodsEdit.editGoods.cashCouponSupport = 1;
      }else{}
      this.itemPulishVO.cashCouponSupport = 1;
    } else {
      if(this.props.goodsEdit && this.props.goodsEdit.editGoods){
        this.props.goodsEdit.editGoods.cashCouponSupport = 0;
      }else{}
      this.itemPulishVO.cashCouponSupport = 0;
    }
    this.props.uploadPrams(this.itemPulishVO);
  }

  changeMeetCouponSupport(e) {
    this.setState({
      meetCouponSupport: e.target.checked,
    });
    if (e.target.checked) {
      if(this.props.goodsEdit && this.props.goodsEdit.editGoods){
        this.props.goodsEdit.editGoods.meetCouponSupport = 1;
      }else{}
      this.itemPulishVO.meetCouponSupport = 1;
    } else {
       if(this.props.goodsEdit && this.props.goodsEdit.editGoods){
        this.props.goodsEdit.editGoods.meetCouponSupport = 0;
      }else{}
      this.itemPulishVO.meetCouponSupport = 0;
    }
    this.props.uploadPrams(this.itemPulishVO);
  }

  changeVipDiscountSupport(e) {
    this.itemPulishVO.vipDiscountSupport = e.target.value;
    this.props.uploadPrams(this.itemPulishVO);
  }

  getFileAddr() {
    let fileAddr = [];
    if (this.itemPulishVO.itemPicpdfManualVoList.length > 0) {
      this.itemPulishVO.itemPicpdfManualVoList.map((item, index) => {
        fileAddr.push(<a href={item.picpdfUrl} target="_blank">{item.picpdfName}</a>);
      });
    } else {
    }
    this.setState({
      fileAddr: fileAddr
    });
  }

  render() {
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    let editData;
    if (this.props.goodsEdit && this.props.goodsEdit.editGoods !== undefined && this.props.goodsEdit.editGoods.length > 0) {
      this.first = true;
      editData = this.props.goodsEdit.editGoods;
    } else {
    }
    if (this.props.editGoods && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.itemName && this.firstLoad) {
      //this.itemPulishVO = this.props.goodsEdit.editGoods;
      this.props.uploadPrams(this.itemPulishVO);
      this.getFileAddr();
      this.firstLoad = false;
      this.setState({
        initialTime: this.props.goodsEdit.editGoods.itemSaleInfoVo.initialMount,//起订量
        deliveryCycle: this.props.goodsEdit.editGoods.itemSaleInfoVo.deliveryCycle,//交货周期
        changeDuration: this.props.goodsEdit.editGoods.itemAfterSaleVo.changeDuration,//退货周期
        refundDuration: this.props.goodsEdit.editGoods.itemAfterSaleVo.refundDuration, //换货周期
        repaireDuration: this.props.goodsEdit.editGoods.itemAfterSaleVo.repaireDuration,//质保期限
      });

    } else {
    }
    if (this.props.goodsEdit &&
      this.props.goodsEdit.editGoods &&
      this.props.goodsEdit.editGoods.itemDeliveryInfoVo &&
      this.props.goodsEdit.editGoods.itemDeliveryInfoVo.homeDelivery && this.firstchecked) {
      let open = true;
      if (this.props.goodsEdit.editGoods.itemDeliveryInfoVo.homeDelivery == 1) {
        open = true;
      } else {
        open = false;
      }
      this.setState({
        ifchecked: open
      });
      this.firstchecked = false;
    } else {
    }

    return (
      <div className={styles.of + ' ' + "ui-container ui-platform"} id = 'specStyle'
           style={{borderBottom: '1px solid #e9e9e9', paddingBottom: '20px', background: 'white',paddingLeft: '16px'}}>
        <div>
          <strong className={styles.specialStyle}>运费信息</strong>
          {!this.props.editGoods &&
          <RadioGroup onChange={::this.onChangedeliveryType} defaultValue={1}>
            <Radio className={styles.otherMt202} value={1}>商品价格已包含运费<span className={styles.smallColor}>（选择此项时请记得将运费分摊至商品单价里)</span></Radio><br/>
            <Radio className={styles.otherMt202} value={2}>选择合适的物流公司运输，运费到付<span className={styles.smallColor}>（不需要在产品单价里加运费，买家根据实际费用支付）</span></Radio><br/>
          </RadioGroup>
          }
          {this.props.editGoods &&
          this.props.goodsEdit &&
          this.props.goodsEdit.editGoods &&
          this.props.goodsEdit.editGoods.itemDeliveryInfoVo &&
          this.props.goodsEdit.editGoods.itemDeliveryInfoVo.deliveryType &&
          <RadioGroup onChange={::this.onChangedeliveryType}
                      defaultValue={this.props.goodsEdit.editGoods.itemDeliveryInfoVo.deliveryType}>
            <Radio className={styles.otherMt202} value={1}>商品价格已包含运费<span className={styles.smallColor}>（选择此项时请记得将运费分摊至商品单价里)</span></Radio><br/>
            <Radio className={styles.otherMt202} value={2}>选择合适的物流公司运输，运费到付<span className={styles.smallColor}>（不需要在产品单价里加运费，买家根据实际费用支付）</span></Radio><br/>
          </RadioGroup>
          }
          <br/>
          {!this.props.editGoods && <Checkbox defaultValue={false} className={styles.otherMt202}
                                              onChange={::this.onChangehomeDelivery}>同城可送货上门</Checkbox>}
          {this.props.editGoods &&
          this.props.goodsEdit &&
          this.props.goodsEdit.editGoods &&
          this.props.goodsEdit.editGoods.itemDeliveryInfoVo &&
          <Checkbox checked={this.state.ifchecked} className={styles.otherMt202} onChange={::this.onChangehomeDelivery}>同城可送货上门</Checkbox>
          }
          <strong className={styles.strongstyle}>销售方式</strong>
          <div className={styles.shopStyle}>
            <label htmlFor="" className={styles.smaillest + ' ' + styles.smallColor}>最小起订量:</label>
            <span className={styles.line32 + ' ' + styles.marginL5}>按单品</span>
            {/*<RadioGroup className={styles.shopRadioStyle + '' + styles.otherml5} value={1}
                        onChange={::this.onChangesaleType}>
              <Radio value={1}>按单品</Radio>
              <Radio value={2}>按总量</Radio>
            </RadioGroup>*/}
            <span className={styles.line32}>订购大于等于
				    	<InputNumber min={1}
                           defaultValue={this.props.editGoods ? +(this.props.goodsEdit.editGoods.itemSaleInfoVo.initialMount) : 1}
                           onBlur={::this.onChangeinitialMount}
                           onChange={::this.onChangeinitialMount}
                           className = {styles.ml10}
                           value={this.state.initialTime}/>
				    	（计量单位）方可订购
				    </span>
          </div>
          <div className={styles.deliveryCycle}>
            <label htmlFor="" className={styles.la3} className={styles.otherMt202 + ' ' + styles.smallColor}>预计出货日:</label>
            {!this.props.editGoods &&
            <InputNumber min={1}
                         max={99}
                         defaultValue={+this.state.deliveryCycle}
                         onChange={::this.onChangedeliveryCycle}
                         onBlur={::this.onBChangedeliveryCycle}
                         value={+this.state.deliveryCycle}></InputNumber>}
            {this.props.editGoods &&
            this.props.goodsEdit &&
            this.props.goodsEdit.editGoods &&
            this.props.goodsEdit.editGoods.itemSaleInfoVo &&
            (this.props.goodsEdit.editGoods.itemSaleInfoVo.deliveryCycle != 0
            && this.props.goodsEdit.editGoods.itemSaleInfoVo.deliveryCycle != undefined
            && this.props.goodsEdit.editGoods.itemSaleInfoVo.deliveryCycle != 'undefined'
            && this.props.goodsEdit.editGoods.itemSaleInfoVo.deliveryCycle != ""
            && this.props.goodsEdit.editGoods.itemSaleInfoVo.deliveryCycle != '')
            &&
            <InputNumber min={1}
                         max={99}
                         defaultValue={+this.state.deliveryCycle}
              //defaultValue={44}
                         onChange={::this.onChangedeliveryCycle}
                         onBlur={::this.onBChangedeliveryCycle}
                         value={+this.state.deliveryCycle}
                         className = {styles.ml10}
            ></InputNumber>}
            {this.props.editGoods &&
            this.props.goodsEdit &&
            this.props.goodsEdit.editGoods &&
            this.props.goodsEdit.editGoods.itemSaleInfoVo &&
            !this.props.goodsEdit.editGoods.itemSaleInfoVo.deliveryCycle
            &&
            <InputNumber min={1}
                         max={99}
                         defaultValue={+this.props.goodsEdit.editGoods.itemSaleInfoVo.deliveryCycle}
                         onChange={::this.onChangedeliveryCycle}
                         onBlur={::this.onBChangedeliveryCycle}
                         value={+this.state.deliveryCycle}
                         className = {styles.ml10}
            > </InputNumber>}
            <span className={styles.time}>天</span>
          </div>
          <strong className={styles.strongstyle}>售后说明</strong>
          <div className={styles.otherBottom}>
            <label htmlFor="" className={styles.la3 + ' ' + styles.smallColor}>退货:</label>
            {!this.props.editGoods && <RadioGroup defaultValue={1} onChange={::this.onChangerefundService}>
              <Radio value={1}>特殊商品，一经签收非质量问题不予退货</Radio><br/>
              <Radio value={2}>确认收货后
                <InputNumber
                  className={styles.otherMt20 + ' ' + styles.ml10}
                  min={0}
                  max={999}
                  defaultValue={this.props.editGoods ? +(this.props.goodsEdit.editGoods.itemAfterSaleVo.refundDuration) : 7}
                  onBlur={::this.onChangerefundDuration}
                  onChange={::this.onChangerefundDuration}
                  value={this.state.refundDuration}
                /> 日内可与卖家协商退货，可能需要扣除部分货款作为卖家的损失</Radio><br/>
            </RadioGroup>}
            {this.props.editGoods &&
            this.props.goodsEdit &&
            this.props.goodsEdit.editGoods &&
            this.props.goodsEdit.editGoods.itemAfterSaleVo &&
            this.props.goodsEdit.editGoods.itemAfterSaleVo.refundService
            && <RadioGroup defaultValue={this.props.goodsEdit.editGoods.itemAfterSaleVo.refundService}
                           onChange={::this.onChangerefundService}>
              <Radio value={1}>特殊商品，一经签收非质量问题不予退货</Radio><br/>
              <Radio value={2}>确认收货后
                <InputNumber
                  className={styles.otherMt20+ ' ' + styles.ml10}
                  min={0}
                  max={999}
                  defaultValue={this.props.editGoods ? +(this.props.goodsEdit.editGoods.itemAfterSaleVo.refundDuration) : 7}
                  onBlur={::this.onChangerefundDuration}
                  onChange={::this.onChangerefundDuration}
                  value={this.state.refundDuration}/>
                日内可与卖家协商退货，可能需要扣除部分货款作为卖家的损失
              </Radio><br/>
            </RadioGroup>}
          </div>
          <div className={styles.otherBottom}>
            <label htmlFor="" className={styles.la3 + ' ' + styles.smallColor}>换货:</label>
            {!this.props.editGoods && <RadioGroup defaultValue={1} onChange={::this.onChangechangeService}>
              <Radio value={1}>特殊商品，一经签收非质量问题不予换货</Radio><br/>
              <Radio value={2}>确认收货后
                <InputNumber className={styles.otherMt20 + ' ' + styles.ml10}
                             min={0}
                             max={999}
                             defaultValue={this.props.editGoods ? +(this.props.goodsEdit.editGoods.itemAfterSaleVo.changeDuration) : 7}
                             onBlur={::this.onChangechangeDuration}
                             onChange={::this.onChangechangeDuration}
                             value={this.state.changeDuration}
                />
                日内可与卖家协商换货，换货过程中可能会产生一些额外费用</Radio><br/>
            </RadioGroup>}
            {this.props.editGoods &&
            this.props.goodsEdit &&
            this.props.goodsEdit.editGoods &&
            this.props.goodsEdit.editGoods.itemAfterSaleVo &&
            this.props.goodsEdit.editGoods.itemAfterSaleVo.changeService
            && <RadioGroup defaultValue={this.props.goodsEdit.editGoods.itemAfterSaleVo.changeService}
                           onChange={::this.onChangechangeService} /*value={this.state.changeService}*/ >
              <Radio value={1}>特殊商品，一经签收非质量问题不予换货</Radio><br/>
              <Radio value={2}>确认收货后
                <InputNumber
                  className={styles.otherMt20+ ' ' + styles.ml10}
                  min={0}
                  max={999}
                  defaultValue={this.props.editGoods ? +(this.props.goodsEdit.editGoods.itemAfterSaleVo.changeDuration) : 7}
                  onBlur={::this.onChangechangeDuration}
                  onChange={::this.onChangechangeDuration}
                  value={this.state.changeDuration}/> 日内可与卖家协商换货，换货过程中可能会产生一些额外费用</Radio><br/>
            </RadioGroup>}
          </div>
          <div className={styles.otherBottom}>
            <label htmlFor="" className={styles.la3 + ' ' + styles.smallColor} style={{marginTop: '2px'}}>质保:</label>
            <div className = {styles.repaireDuration}>
              <p>质保期限
                <InputNumber
                  defaultValue={this.props.editGoods ? +(this.props.goodsEdit.editGoods.itemAfterSaleVo.repaireDuration) : 3}
                  min={0}
                  max={999}
                  value={this.state.repaireDuration}
                  onBlur={::this.onChangerepaireDuration}
                  onChange={::this.onChangerepaireDuration}
                  style = {{marginLeft: '10px'}}
                /> 个月</p><br/>
                <p className={styles.smallColor}>如有任何售后问题请尽量在质保期内联系卖家协商处理，超过质保期卖家不保证受理，请知悉！</p>
              </div>
          </div>
          <strong className={styles.strongstyle}>优惠支持</strong>
          <div className={styles.sale}>
            <label htmlFor="" className={styles.la3 + ' ' + styles.smallColor}>可用优惠券:</label>
            <Checkbox
              checked={ this.props.editGoods ? this.props.goodsEdit.editGoods.cashCouponSupport : this.state.cashCouponSupport }
              onChange={::this.changeCashCouponSupport}>代金券</Checkbox>
            <Checkbox
              checked={ this.props.editGoods ? this.props.goodsEdit.editGoods.meetCouponSupport : this.state.meetCouponSupport }
              onChange={::this.changeMeetCouponSupport}>满减券</Checkbox>
            </div>
          <div className={styles.sale}>
            <label className={styles.smallColor} htmlFor="">会员折扣:</label>
            <RadioGroup className={styles.ml17}
                        defaultValue={(this.props.editGoods ? this.props.goodsEdit.editGoods.vipDiscountSupport : 1)}
                        onChange={::this.changeVipDiscountSupport}>
              <Radio value={1}>支持</Radio>
              <Radio value={0}>不支持</Radio>
            </RadioGroup>
          </div>
          <strong className={styles.strongstyle}>其它信息</strong>
          <label htmlFor="" className={styles.la3 + ' ' + styles.smallColor}>包装清单:</label>
          <Input type="textarea"
                 maxLength="500"
                 className={styles.textareaStyle}
                 defaultValue={this.props.editGoods ? this.props.goodsEdit.editGoods.packingList : ''}
                 name="message"
                 onChange={::this.changeArear}
                 style={{height: '120px'}}
          />
          <br/>
          <div className={styles.uploadStyle}>
            <label htmlFor="" className={styles.la3 + ' ' + styles.smallColor}>商品手册:</label>
            {!this.props.editGoods && <FileUp></FileUp>}
            {this.props.editGoods &&
            this.props.goodsEdit.editGoods
            && this.props.goodsEdit.editGoods.itemPicpdfManualVoList
            && <FileUp fileAddr={this.state.fileAddr}></FileUp>}
          </div>
        </div>
      </div>
    )
  }
}
