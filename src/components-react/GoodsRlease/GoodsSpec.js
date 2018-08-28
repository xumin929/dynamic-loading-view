/****************************************************************
 * author:LiuYang
 * date:2017-10-13
 * description:产品发布-规格参数
 ****************************************************************/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, Input, Select, Collapse, message} from 'jdcloudui';
import * as specFunc from './redux';
const Option = Select.Option;
const Panel = Collapse.Panel;
import styles from './style/GoodsBasic.css';

@Form.create()
@connect(
  state => ({
    goodsRlease: state.goodsRlease,
    goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({...specFunc}, dispatch)
)
export default class BasicInfomation extends Component {
  constructor(props, context) {
    super(props, context);
    this.saledata = [];
    this.first = true;
    this.state = {
      saledata: [],
      divs: [],
      checks: [],
      key: null
    };
    this.itemPulishVO = [];
    this.specData = []; //规格参数拿到的数据
    this.firstLoad = true;
    this.drops = null;
    this.divs = [];
    this.chks = [];
    this.init = true;
    this.checks = [];//当前选中的元素
    this.initEditAttributes = true;
    this.initInputValue = true;
    this.initChecks = [];
    this.initLoadAttrlist = true;
    this.detailStatus = true;
    this.panels = '';
    this.categoryData = '';
    this.ifUpdate = true;
    this.ifRemote = true;
    this.changeSKUattr = this.changeSKUattr.bind(this);
    this.changeDesc = this.changeDesc.bind(this);
    this.initData = this.initData.bind(this);
  }

  componentWillMount() {
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    let cacheParams = this.detailCacheParams(this.props.goodsRlease.saleMessage);
    let initData = this.initData;
    let changeSKUattr = this.changeSKUattr;
    let changeDesc = this.changeDesc;
    let detailCategoryData = this.detailCategoryData;
    let that = this;
    let attrIDs = this.props.goodsRlease.saleMessage;
    if(attrIDs.length==1 && attrIDs[0].attributes==null) {
      this.panels = initData(this.props.goodsRlease.saleMessage)(1);
      this.setState({
        key: Math.random()
      });
    } else {
      this.props.getCacheTable(cacheParams).then(
        (result) => {
          if (+result.code === 0) {
            if (result.data && result.data.length) {
              result.data.map((item, index) => {
                if (item) {
                  let skuItem = JSON.parse(item);
                  this.props.goodsRlease.saleMessage[index].specAttributes = skuItem.specAttributes;
                  this.panels = initData(this.props.goodsRlease.saleMessage)(1);
                  //console.log( this.panels );
                  this.setState({
                    key: Math.random()
                  });
                } else {
                }
              });
            } else {
            }
          } else {
            message.error('规格参数临时表更新出错！');
          }
        },
        (error) => {
          message.error('规格参数临时表更新出错！');
        }
      );
    }
  }

  initData(data) {
    console.log( data );
    let detailCategoryData = this.detailCategoryData;

    // 处理获取categoryData时空值判断，add by jingxl
    let categoryData = void 0;
    let { goodsRlease } = this.props;
    if(goodsRlease.categoryData) {
        categoryData = goodsRlease.categoryData.data;
    }
    console.log( categoryData );
    const that = this;
    return function (dataStyle) {
      let panels;
      if (data && data.length) {
        panels = data.map((item, index) => {
          if(!item.ifstop) {
            return <Panel header={item.message} key={item.index}>
              <p>{detailCategoryData(categoryData, item, that)}</p>
            </Panel>;
          }
        });
      } else {
      }
      return panels;
    }
  }

  /**
   * @param []
   * @return []
   * description: 数组去空值
   */
  deleteNull(data) {
    let arr = data;
    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i] === undefined || arr[i] == [] || !arr[i]) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  /**
   * @param {string or int} 属性值ID 属性ID SKUID 从哪里拿来的值
   * @return  NULL
   * description: SKU属性选择属性值
   */
  skuListDetail(data, skuId, attrId, parentId, ifInput) {
    let specArray = [];
    if (data && data.length) {
      data.map((item, index) => {
        console.log(item.attributes,skuId)
        if (item.attributes == skuId) {
          let specArray = item.specAttributes ? item.specAttributes.split(';') : [];
          let ifFind = false;
          let attributesArray = item.attributes ? item.attributes.split(';') : [];
          attributesArray = this.deleteNull(attributesArray);
          specArray = this.deleteNull(specArray);
          specArray.map((specItem, specIndex) => {
            specArray[specIndex] = specItem.split(':');
            //specArray[specIndex] = this.deleteNull(specArray[specIndex]);
            if (specArray[specIndex][0] == parentId && !ifInput) {
              specArray[specIndex][1] = attrId;
              ifFind = true;
            } else {
            }
            if (specArray[specIndex][0] == parentId && ifInput) {
              specArray[specIndex][2] = attrId;
              ifFind = true;
            } else {
            }

            if (specArray[specIndex]) {
              let parentId = specArray[specIndex][0] ? specArray[specIndex][0] : '';
              let childrenId = specArray[specIndex][1] ? specArray[specIndex][1] : '';
              let inputVal = specArray[specIndex][2] ? specArray[specIndex][2] : '';
              if (childrenId || inputVal) {
                specArray[specIndex] = parentId + ':' + childrenId + ':' + inputVal;
              } else {
                specArray[specIndex] = '';
              }
            } else {
            }
          });
          specArray = this.deleteNull(specArray);
          if (ifFind) {
            specArray = this.deleteNull(specArray);
            let attrString = '';
            specArray.map((item, index) => {
              if (item) {
                attrString = attrString + (item + ';');
              } else {
              }
            });
            item.specAttributes = attrString;
          } else {
            if (ifInput) {
              if (item.specAttributes && (item.specAttributes.indexOf(';') != (item.specAttributes.length - 1))) {
                item.specAttributes = item.specAttributes + ';' + parentId + ':' + '' + ':' + attrId + ';';
              } else if (item.specAttributes) {
                item.specAttributes = item.specAttributes + parentId + ':' + '' + ':' + attrId + ';';
              } else {
                item.specAttributes = parentId + ':' + '' + ':' + attrId + ';';
              }
            } else {
              if (item.specAttributes && (item.specAttributes.indexOf(';') != (item.specAttributes.length - 1))) {
                item.specAttributes = item.specAttributes + ';' + parentId + ':' + attrId + ':' + '' + ';';
              } else if (item.specAttributes) {
                item.specAttributes = item.specAttributes + parentId + ':' + attrId + ':' + '' + ';';
              } else {
                item.specAttributes = parentId + ':' + attrId + ':' + '' + ';';
              }
            }
          }
          if (item.specAttributes.indexOf(';') != -1) {
            let newSpec = item.specAttributes.split(';');
            newSpec = this.deleteNull(newSpec);
            let attrString = '';
            newSpec.map((newitem, newindex) => {
              if (newitem) {
                attrString = attrString + (newitem + ';');
              } else {
              }
            });
            item.specAttributes = attrString;
          } else {
          }
        } else {
        }
      });
    } else {
    }
    return data;
  }

  /**
   * @param {string or int} 属性值ID 属性ID SKUID
   * @return  NULL
   * description: SKU属性选择属性值
   */
  changeSKUattr(attrId, parentId, skuId) {
    //if(attrId){
    let data = [...this.itemPulishVO.itemSkuVoList];
    this.itemPulishVO.itemSkuVoList = this.skuListDetail(data, skuId, attrId, parentId, false);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
    //}else{}
  }

  /**
   * @param {string or int} 属性值ID 属性ID SKUID
   * @return  NULL
   * description: SKU描述
   */
  changeDesc(attrId, parentId, skuId) {
    let inputValue = attrId.target.value;
    let data = [...this.itemPulishVO.itemSkuVoList];
    this.itemPulishVO.itemSkuVoList = this.skuListDetail(data, skuId, inputValue, parentId, true);
    this.props.uploadPrams(this.itemPulishVO);
    this.detailCacheData(this.itemPulishVO.itemSkuVoList);
  }

  /**
   * @param {[],[]} 属性值 基础信息规格属性
   * @return  []
   * description: 将规格参数与基础信息进行耦合
   */
  detailCategoryData(data, saledata, that) {
    let children = [];
    const changeSKUattr = that.changeSKUattr;
    const changeDesc = that.changeDesc;
    let sale = [];
    let specSale = [];
    if (saledata && saledata.attributes) {
      sale.push(saledata.attributes.split(';'));
    } else {
    }
    if (saledata && saledata.specAttributes) {
      specSale.push(saledata.specAttributes.split(';'));
    } else {
    }
    if (data && data.length) {
      children = data.map((item, index) => { //对所有规格参数进行判断哪些是停用状态
        let options = [];
        let checkedName = null;
        let attrValueName = null;
        let inputDefaultValue = null;
        let disable = false;
        if (item && item.platformCategoryAttributeValues && item.platformCategoryAttributeValues.length) {
          options = item.platformCategoryAttributeValues.map((catItem, catIndex) => {
            if (!disable && !attrValueName) { //看销售属性是否有当前规格参数 如果有就置灰
              sale && sale.length && sale.map((saleItem, saleIndex) => {
                if (saleItem && saleItem.length && !disable) {
                  saleItem.map((lItem, lIndex) => {
                    if (lItem && (lItem.split(':')[0] == catItem.attrId) && !disable) {
                      inputDefaultValue = lItem.split(':')[2] ? lItem.split(':')[2] : null;
                      if (lItem.split(':')[1] == catItem.attrValueId) {
                        attrValueName = catItem.attrValueName;
                        disable = true;
                      } else {
                      }
                    } else {
                    }
                  });
                } else {
                }
              });
              if (!disable) {
                specSale.map((saleItem, saleIndex) => {
                  if (saleItem && saleItem.length && !disable) {
                    saleItem.map((lItem, lIndex) => {
                      if (lItem && (lItem.split(':')[0] == catItem.attrId)) {
                        inputDefaultValue = lItem.split(':')[2] ? lItem.split(':')[2] : null;
                        if (lItem.split(':')[1] == catItem.attrValueId) {
                          attrValueName = catItem.attrValueName;
                        } else {
                        }
                      } else {
                      }
                    });
                  } else {
                  }
                });
              } else {
              }
              if(!attrValueName && saledata.message == '' && that.itemPulishVO.itemSkuVoList && that.itemPulishVO.itemSkuVoList[0] && that.itemPulishVO.itemSkuVoList[0].specAttributes) {
                let values = that.itemPulishVO.itemSkuVoList[0].specAttributes.split(';');
                values.map(_item => {
                  if (_item.split(':')[0] == catItem.attrId) {
                    inputDefaultValue = _item.split(':')[2] ? _item.split(':')[2] : null;
                    if (_item.split(':')[1] == catItem.attrValueId) {
                      attrValueName = catItem.attrValueName;
                    }
                  }
                });
              }
            } else {
            }
            return <Option value={catItem.attrValueId} title={catItem.attrValueName}
                           parentId={catItem.attrId}>{catItem.attrValueName}</Option>;
          });
        } else {
        }
        options.unshift(<Option value={null} title={'请选择'} parentId={null}>请选择</Option>);
        return <div>
          <span className='spanSpec'>{item.attrName}:</span>
          <div className='sepcOv'>
            <Select
              disabled={disable}
              className='specSelect'
              size="large"
              notFoundContent={'无数据'}
              placeholder={'请选择'}
              defaultValue={attrValueName ? attrValueName : '请选择'}
              onChange={(e) => that.changeSKUattr(e, item.attrId, saledata.attributes)}
            >
              {options}
            </Select>
            <Input maxLength="200" defaultValue={inputDefaultValue ? inputDefaultValue : ''} disabled={disable}
                   className='inp' size="large"
                   onBlur={(e) => that.changeDesc(e, item.attrId, saledata.attributes)}></Input>
          </div>
        </div>
      });
    } else {
    }
    return children;
  }

  /**
   * @param {[]} sku值
   * @return  string
   * description: 根据数据获取临时表keys
   */
  detailCacheParams(data) {
    let params = [];
    if (data && data.length) {
      params = data.map((item, index) => {
        return item.attributes
      });
    } else {
    }
    let param = {
      keys: JSON.stringify(params)
    };
    return param;
  }

  /**
   * @param {array} [] [销售信息表]
   * @return  array
   * description: 处理存储临时表的参数
   */
  detailCacheData(data) {
    let params = [];
    if (data && data.length) {
      params = data.map((item, index) => {
        return {
          key: item.attributes,
          value: item
        }
      });
    } else {
    }
    let params2 = {
      content: JSON.stringify(params)
    };
    if(params.length == 1 && !params[0].key) {
      return params;
    }
    this.props.postCacheTable(params2);
    return params;
    this.props.postCacheTable(params2);
    return params;
  }

  render() {
    this.props.goodsRlease.saleMessage
    && this.props.goodsRlease.categoryData
    && this.props.goodsRlease.categoryData.data
    && (this.panels = this.initData(this.props.goodsRlease.saleMessage)(1))
    return (
      <div id='spec' className="ui-container ui-platform" style={{
        borderBottom: '1px solid #e9e9e9',
        paddingBottom: '20px',
        overflow: 'hidden',
        background: 'white',
        paddingLeft: '16px'
      }}>
        <strong className={styles.specialStyle}>规格参数</strong>
        <Collapse accordion key={this.state.key}>
          {this.panels}
        </Collapse>
      </div>
    )
  }
}
