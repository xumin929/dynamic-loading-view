/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 基本信息设置
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Input, Select, message, Checkbox} from 'jdcloudui';
const Option = Select.Option;

/* **********  自定义组件  ********** */
import less from './style/information_form_label.less';
import CategoryPlatform from '../../common/CategoryPlatform/CategoryPlatform';

class BaseInfomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandArr: [],
      flag: false,
      checkboxData: [],
      ifBrandNameCh: true, //中文品牌名称符合校验规则
      ifBrandNameEn: true, //英文品牌名称符合校验规则
    };
    this.num = 0;
    this.cid = '';
  }

  componentDidMount() {
    this.cid = this.props.params.cid;
      let id = this.props.params.id;
      let cNames = this.props.params.cidNames ? this.props.params.cidNames : null;
      this.callBackPlatformCategory(this.cid, true, cNames, id, this.props);
  }
  componentWillReceiveProps(nextProps){
    //console.log(nextProps)
    if(this.cid != nextProps.params.cid){
      this.cid = nextProps.params.cid;
      let id = nextProps.params.id;
      let cNames = nextProps.params.cidNames ? nextProps.params.cidNames : null;
      this.callBackPlatformCategory(this.cid, true, cNames, id, nextProps);
    }
  }

  callBackPlatformCategory = (cid, type, cNames, id, _props) => {
    let props = _props || this.props;
    if(cid && cid != -1 && type) {
      let params = {};
      if(cid){
        params.cid = cid;
      }
      if(id){
        params.itemId = id;
      }
      this.props.querySaleAttrAction(params, props.type).then(rs => {
        if (rs.code == 0 && rs.data) {
          this.props.setListData(rs.data);
          this.props.queryPlatfromAttributeList(params, id, this.props.type).then(dt => {
            if (dt.code == 0 && dt.data) {
              this.props.setSpecData(dt.data);
            } else {
              this.props.setSpecData([]);
              //message.error(dt.msg);
            }
          });
        } else {
          this.props.setListData([]);
          message.error(rs.msg);
        }
      });

      //查询品牌接口
      if(!cNames) {
        this.props.getBrandByCategoryId({categoryId: cid}).then(rs => {
          if ((rs.code == 0 || rs.code == 1) && rs.data) {
            this.setState({
              brandArr: rs.data
            })
          }else{
            this.setState({
              brandArr: []
            })
          }
        })
      } else {
        this.props.getBrandByCategoryIdOrItemId({categoryId: cid, itemId: id}).then(rs => {
          if ((rs.code == 0 || rs.code == 1) && rs.data) {
            this.setState({
              brandArr: rs.data
            })
          }else{
            this.setState({
              brandArr: []
            })
          }
        })
      }

      //查询行业标签接口
      this.props.getItemTagByCategory({cId: cid}).then(rs => {
        if (rs.code == 0 && rs.data) {
          this.setState({
            checkboxData: rs.data
          })
        }else{
          this.setState({
            checkboxData: []
          })
        }
      });

      //查询单位接口
      this.props.queryUnitByCategoryId(params).then(rs => {
        if (rs.code == 0 && rs.data) {
          this.props.setParamete('skuUnit', rs.data ? rs.data : []);
        }
      });

      if(!cNames) {
        if(this.state.flag) {
          this.setState({
            flag: false
          })
        }
        this.props.setParamete('industryLabel', null);
        this.props.setParamete('brandId', null);
        this.props.setParamete('brandName', null);
        this.props.setParamete('specAttributes', '');
        this.props.setParamete('itemPublishSkuParamsVo', [{
          id: null,
          saleAttributes: null,
          specAttributes: null,
          modelCode: '',
          barCode: '',
          productCode: '',
          skuStatus: 1,
          weight: null,
          weightUnit: 'g',
          skuUnit: '',
          inventory: '',
          areaList: '',
          skuImgInfos: null
        }]);
      }
      this.props.setParamete('cid', cid || -1);
    }else{
      this.setState({
        flag: false,
        brandArr: [],
        checkboxData: []
      });
      this.props.setSpecData([]);
      this.props.setListData([]);
      this.props.setParamete('industryLabel', null);
      this.props.setParamete('brandId', null);
      this.props.setParamete('brandName', null);
      this.props.setParamete('cid', null);
      this.props.setParamete('skuUnit', []);
      this.props.setParamete('specAttributes', '');
      this.props.setParamete('itemPublishSkuParamsVo', [{
        id: null,
        saleAttributes: null,
        specAttributes: null,
        modelCode: '',
        barCode: '',
        productCode: '',
        skuStatus: 1,
        weight: null,
        weightUnit: 'g',
        skuUnit: '',
        inventory: '',
        areaList: '',
        skuImgInfos: null
      }]);
    }
  };

  callBackSecondCategory(id) {
    this.props.setParamete('secondCid', id );
  }

  changeBrandCh=(e)=>{  //中文品牌名称校验
    let value = e.target.value;
    let reg = /^[\u4e00-\u9fa5]+$/
    if(value && !reg.test(value[0])){
      console.log('请输入中文名称')
      this.setState({
        ifBrandNameCh : false
      })
    } else {
      this.setState({
        ifBrandNameCh : true
      })
    }
  }

  changeBrandEn=(e)=>{  //英文品牌名称校验
    let value = e.target.value;
    let reg = /^[^\u4e00-\u9fa5]+$/;
    if(value && !reg.test(value)){
      console.log('请输入英文名称')
      this.setState({
        ifBrandNameEn : false
      })
    } else {
      this.setState({
        ifBrandNameEn : true
      })
    }
  }

  //设置用户操作数据
  handelChange = (e, key) => {
    this.props.setParamete(key, e.target.value);
  };

  //设置用户操作数据
  handelSelectChange = (key, value) => {
    if(value == 'a999') {
      // console.log('其他品牌')
      this.setState({
        flag: true
      })
      this.props.setParamete(key, -1)
    } else {
      // console.log('非其他品牌')
      this.setState({
        flag: false
      });
      this.props.setParamete(key, value)
    }
  };

  handelCheckChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const industryArr = this.props.params.industryLabel ? this.props.params.industryLabel.split(';') : [];
    if (checked) {
      industryArr.push(value);
      this.props.setParamete('industryLabel', industryArr.join(';'))
    } else {
      industryArr.splice(industryArr.indexOf((value + '')), 1);
      this.props.setParamete('industryLabel', industryArr.join(';'));
    }
  };

  render() {
    let params = this.props.params ? this.props.params : null;
    let { flag, brandArr, checkboxData } = this.state;
    let setPlaceholder = {
      placeholder: '请选择',
      onChange: (value) => this.handelSelectChange('brandId', value)
    };
    // if(params.brandId) {
    //   if(brandArr.indexOf(params.brandId)==-1){
    //     setPlaceholder.defaultValue = params.brandName;
    //   } else {
    //     setPlaceholder.defaultValue = params.brandId;
    //   }
    // } else if(flag) {
    //   setPlaceholder.defaultValue = 'a999';
    // } else {
    //   this.num ++;
    // }

    if(params.brandId) {
      brandArr.length>0 && brandArr.map((result,index)=>{
          if(result.id == params.brandId ){
              setPlaceholder.value = result.id;
          }
      })
    } else if(flag) {
      setPlaceholder.value = 'a999';
    } else {
      this.num ++;
    }

    //console.log(brandArr);
    return (
      <div>
        <strong className="f-fs14">基本信息</strong>
        {/*  商品名称  */}
        <div className={less.labelWrap}>
          <label htmlFor="商品名称" className={less.labelTitle}><i className="text-red mr5">*</i>商品名称：</label>
          <div className={less.labelCont}>
            <Input size="large" placeholder="输入商品名称" value={params.itemName} onChange={(e) => this.handelChange(e, 'itemName')} />
          </div>
        </div>
        {/*  平台分类  */}
        <div className={less.labelWrap}>
          <label htmlFor="平台分类" className={less.labelTitle}><i className="text-red mr5">*</i>平台分类：</label>
          <div className={less.labelCont}>
            <CategoryPlatform type={params.storeStatus} cNames={params.cidNames} callBack={this.callBackPlatformCategory}/>
          </div>
        </div>
        {/*  第二分类  */}
        <div className={less.labelWrap}>
          <label htmlFor="第二分类" className={less.labelTitle}>第二分类：</label>
          <div className={less.labelCont}>
            <CategoryPlatform cNames={params.secondCNames} callBack={(id) => this.callBackSecondCategory(id)}/>
          </div>
        </div>
        {/*  品牌  */}
        <div className={less.labelWrap}>
          <label htmlFor="品牌" className={less.labelTitle}>品牌：</label>
          <div className={less.labelCont + ' label-box'}>
            <Select className="labelSelect" key={this.num} {...setPlaceholder}>
              {
                brandArr.map((item, index) => <Option key={index} value={item.id}>{item.brandNameCh ? item.brandNameCh : item.brandNameEn}</Option>)
              }
              <Option key={'a999'} value={'a999'}>其他</Option>
            </Select>
            {
              flag ?
              // <Input className={less.labelInput} value={params.brandName} size="large" placeholder="输入品牌名称" onChange={(e) => this.handelChange(e, 'brandName')} />
              <div style={{marginLeft: "70px", marginTop: "20px", width: "550px"}}>
                  <label>中文名称：</label>
                  <Input placeholder="输入品牌中文名称" size='large' onChange={this.changeBrandCh} onBlur={(e) => this.handelChange(e, 'brandNameCh')} style={{width: '120px', marginRight: '20px'}}/>
                  <label>英文名称：</label>
                  <Input placeholder="输入品牌英文名称" size='large' onChange={this.changeBrandEn} onBlur={(e) => this.handelChange(e, 'brandNameEn')} style={{width: '120px'}}/>
                </div>
              : null
            }
            {
              flag && (!this.state.ifBrandNameCh || !this.state.ifBrandNameEn) ?
              <div className="brand_warning_box" >
                {!this.state.ifBrandNameCh?<span className="brand_warning brand_ch" >请输入中文品牌</span>:<span className="brand_ch" ></span>}
                {!this.state.ifBrandNameEn?<span className="brand_warning" >请输入英文品牌</span>:null}
              </div>
              :null
            }
          </div>
        </div>
        {/*  产地  */}
        <div className={less.labelWrap}>
          <label htmlFor="产地" className={less.labelTitle}>产地：</label>
          <div className={less.labelCont}>
            <Input size="large" placeholder="输入产地" value={params.origin} onChange={(e) => this.handelChange(e, 'origin')} />
          </div>
        </div>
        {/*  行业标签  */}
        <div className={less.labelWrap}>
          <label htmlFor="行业标签" className={less.labelTitle}>行业标签：</label>
          <div className={less.labelCont}>
            {
              checkboxData.map((_item, index) => (
                <Checkbox key={index} value={_item.id} onChange={(e) => this.handelCheckChange(e)} checked={params.industryLabel ? params.industryLabel.indexOf(_item.id + '') !== -1 : false}>
                  {_item.tagName}
                </Checkbox>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}
export default BaseInfomation;
