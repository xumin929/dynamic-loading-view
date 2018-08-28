/**
 * @file 发布商品-规格参数Tab组件
 */
/**
 * type :
 * "0": (运营平台：平台商品库管理 发布、编辑),
 * "1": (运营平台：商品库管理/商品发布、编辑),
 * "2": (供应商),
 * "3": (店铺)
 */
import React, { Component } from 'react';
import { Collapse, Select, Input} from 'jdcloudui';
const Panel = Collapse.Panel;
const Option = Select.Option;
import style from './style.less'
import './styles.css';
export default class ReleaseSpecification extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount=()=>{
      if(this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.cid){
          console.log('mytest didmount,has cid');
          if(this.props.type==1){
              this.props.getAttributeByCategoryIdForPlatform(this.props.itemTmplPublishVo.cid);
          }else if (this.props.type==2 || this.props.type==3){
              this.props.getAttributeByCategoryIdForShop(this.props.itemTmplPublishVo.cid);
          }
      }
  }
    getDefaultValue4Input=(attr,spec,)=>{
        for(let j=0;j<(spec||[]).length;++j){
            if(spec[j].aid==attr.attrId){
                return spec[j].desc;
            }
        }
        return "";
    }
  getDefaultValue=(mainIds,selectOptionIds,attr,spec)=>{
      // // 优先进行置灰的匹配
      for(let i=0;i<mainIds.length;++i){
          if(selectOptionIds.indexOf(mainIds[i])!=-1){
              return mainIds[i];
          }
      }
      // 未匹配到，返回全量数据里对应的回显数据
      for(let j=0;j<(spec||[]).length;++j){
        if(spec[j].aid==attr.attrId){
          return spec[j].vid;
        }
      }
      return "";
  }
  shouldBeDisable=(mainIds,selectOptionIds)=>{
    for(let i=0;i<mainIds.length;++i){
      if(selectOptionIds.indexOf(mainIds[i])!=-1){
        return true;
      }
    }
    return false;
  }
  //比较两个属性值是否为同一商品
  matchAttr(attrA,attrB){
      let attrAArr = [];
      for(let i =0;i<(attrA||[]).length;++i){
          attrAArr.push(attrA[i].aid +':'+attrA[i].vid);
      }
      let attrBArr = [];
      for(let j =0;j<(attrB||[]).length;++j){
          attrBArr.push(attrB[j].aid +':'+attrB[j].vid);
      }
        if (attrAArr && attrBArr){
            let strA = JSON.stringify(attrAArr.sort());
            let strB = JSON.stringify(attrBArr.sort());
            return strA == strB
        } else {
            return false
        }
    }
  onChangeAttr=(e,aid,attrObj,type)=>{
    let value = type=='select'?e:e.target.value;
    let unit = {aid:aid,vid:'',desc:''};
    let result = '';

      //未匹配到场景：选择了类目，默认生成一条sku数据，该sku的attr为空
      //操作：直接对第一条进行赋值
      if(this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.cid && this.props.itemTmplPublishVo.itemTmplSkuVoList.length==1 && !this.props.itemTmplPublishVo.itemTmplSkuVoList[0].attributes){
          let orginData = this.props.itemTmplPublishVo.itemTmplSkuVoList[0].specAttributes
          for(let k =0;k<(orginData||[]).length;++k){
              if(orginData[k].aid==aid){
                  if(type=='select'){
                      orginData[k].vid = value
                  }
                  if(type=='input'){
                      orginData[k].desc = value
                  }
                  // 此处调用redux回调
              result = this.props.itemTmplPublishVo;
              result.itemTmplSkuVoList[0].specAttributes = orginData;
              this.props.updateItemTmplAction(result);
              this.forceUpdate();
              return;
              }         
          }
          //未匹配到 specAttribute的aid 新增
          // 此处调用redux回调
          result = this.props.itemTmplPublishVo;
          type=='select'?unit.vid = value : unit.desc = value;
          if(orginData){
              orginData.push(unit)
          }else{
              orginData=[unit]
          }
          result = this.props.itemTmplPublishVo;
          result.itemTmplSkuVoList[0].specAttributes = orginData;
          this.props.updateItemTmplAction(result);
          this.forceUpdate();
          return;
      }
      // 全量数据
      let sourceData = this.props.itemTmplPublishVo.itemTmplSkuVoList;
    // 从全量的数据中，找到匹配的sku

      for(let i =0;i<sourceData.length;++i){
        if(this.matchAttr(attrObj.attributes,sourceData[i].attributes)){
          // 循环 匹配specAttribute的aid 更新
          for(let j=0;j<(sourceData[i].specAttributes||[]).length;++j){
            if(sourceData[i].specAttributes[j].aid == aid){
                if(type=='select'){
                  if(sourceData[i].specAttributes[j]){
                      sourceData[i].specAttributes[j].vid = value;
                  }else{
                      //  ???
                      // unit.vid = value;
                      // sourceData[i].specAttributes = [unit];
                  }
                }
                if(type=='input'){
                    if(sourceData[i].specAttributes[j]){
                        sourceData[i].specAttributes[j].desc = value;
                    }else{
                        //  ???
                        // unit.desc = value;
                        // sourceData[i].specAttributes = [unit];
                    }
                }
                // 此处调用redux回调
                result = this.props.itemTmplPublishVo;
                result.itemTmplSkuVoList = sourceData;
                this.props.updateItemTmplAction(result);
                this.forceUpdate();
                return;
            }
          }
          //未匹配到 specAttribute的aid 新增
            type=='select'?unit.vid = value : unit.desc = value;
            sourceData[i].specAttributes?sourceData[i].specAttributes.push(unit):sourceData[i].specAttributes = [unit];
            // 此处调用redux回调
            result = this.props.itemTmplPublishVo;
            result.itemTmplSkuVoList = sourceData;
            this.props.updateItemTmplAction(result);
            this.forceUpdate();
            return ;

        }
      }
  }

    componentWillReceiveProps(nextProps){
        console.log('mytest--------------------willReceiveProps---------------------');
      if(
          ((!this.props.itemTmplPublishVo || !this.props.itemTmplPublishVo.cid) &&nextProps.itemTmplPublishVo && nextProps.itemTmplPublishVo.cid )
          ||
          (this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.cid && nextProps.itemTmplPublishVo && nextProps.itemTmplPublishVo.cid && nextProps.itemTmplPublishVo.cid !=this.props.itemTmplPublishVo.cid)
      )
      {
          console.log('mytest--------------------willReceiveProps,cid changed---------------------');
          if(this.props.type==1){
              this.props.getAttributeByCategoryIdForPlatform(this.props.itemTmplPublishVo.cid);
          }else if (this.props.type==2 || this.props.type==3){
              this.props.getAttributeByCategoryIdForShop(this.props.itemTmplPublishVo.cid);
          }
      }
    }
  render() {
        console.log('mytestitemTmplPublishVoitemTmplPublishVoitemTmplPublishVo:',this.props.itemTmplPublishVo);
    const attrbuteData = this.props.attributeData.data && this.props.attributeData.data.data;
    let skuList = this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.itemTmplSkuVoList && this.props.itemTmplPublishVo.itemTmplSkuVoList.length>0?
        this.props.itemTmplPublishVo.itemTmplSkuVoList:[{attributes:[],specAttributes:[]}];
    return (
      <div>
        <Collapse accordion>
            {
                this.props.itemTmplPublishVo.cid && skuList.map((sku)=>{
                if(sku && sku.skuStatus==1){return (
                    <Panel header = {sku && sku.attributes && sku.attributes.reduce((result,sku)=>{return result+=' '+sku.vName},'')}>
                        {
                            attrbuteData && attrbuteData.map && attrbuteData.map((attr,index)=> {
                                return (
                                    <div>
                                      <span>
                                          {attr.attrName||' '}:
                                      </span>
                                      <div className={style.selectDiv}>
                                        <Select
                                            onChange = {(e,aid,attrObj,type)=>{this.onChangeAttr(e,attr.attrId,sku,'select')}}
                                            defaultValue=""
                                            style={{ width: 120, marginRight:'10px' }}
                                            value={this.getDefaultValue(sku.attributes && sku.attributes.map((i)=>{return String(i.vid)})||[],(attr.platformCategoryAttributeValues||[]).map((i)=>{return String(i.attrValueId)})||[],attr,sku.specAttributes)}
                                            disabled ={this.shouldBeDisable(sku.attributes && sku.attributes.map((i)=>{return String(i.vid)})||[],(attr.platformCategoryAttributeValues||[]).map((i)=>{return String(i.attrValueId)})||[])}
                                        >
                                          <Option value="">请选择</Option>
                                            {
                                                (attr.platformCategoryAttributeValues||[]).map((option)=>{
                                                  return (
                                                      <Option value={String(option.attrValueId)}>{option.attrValueName}</Option>
                                                      )
                                                })
                                            }
                                        </Select>
                                        <Input
                                            value={this.getDefaultValue4Input(attr,sku.specAttributes,attrbuteData)}
                                            style={{ width: 500 }}
                                            onChange = {(e)=>{this.onChangeAttr(e,attr.attrId,sku,'input')}}
                                            disabled ={this.shouldBeDisable(sku.attributes && sku.attributes.map((i)=>{return String(i.vid)})||[],(attr.platformCategoryAttributeValues||[]).map((i)=>{return String(i.attrValueId)})||[])}
                                        />
                                      </div>
                                    </div>
                                )
                            })
                        }
                    </Panel>
                );}
              })
            }

        </Collapse>
      </div>
    );
  }
}
