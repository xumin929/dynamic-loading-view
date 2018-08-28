/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 销售规格设置
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Table, Checkbox, message} from 'jdcloudui';

/* **********  自定义组件  ********** */
import './style/table_border.css';

class SalesSpecifications extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {title: '属性名称', dataIndex: 'attrName', key: (val, row) => row.attrId, width: '25%'},
      {title: '属性值', dataIndex: 'platformCategoryAttributeValues', render: (val, row) => this.renderCheckBox(val, row)}
    ];
    this.state = {
    };
    this.saleAttrLen = {};
    this.cid = '';
    this.specAttributesArr = []; //保存接口返回的this.specAttributes数据
  }

  initAllData = (props)=>{
    this.cid = props.params && props.params.cid ? props.params.cid : '';

    if(this.cid) {
      let params = {cid: this.cid};
      params.itemId = props.params && props.params.id ? props.params.id : undefined;
      props.querySaleAttrAction(params, props.type).then(rs => {
        if (rs.code == 0 && rs.data) {
          const specAttributesArr = props.params.specAttributes ? JSON.parse(props.params.specAttributes) : [];
          const dataSource = rs.data ? rs.data : [];

          specAttributesArr.map(_val => {
            dataSource.map(_item => {
              if(_val.aid == _item.attrId){
                _val.attrName =_item.attrName;
                _item.platformCategoryAttributeValues && _item.platformCategoryAttributeValues.map(_result => {
                  if(_val.vid == _result.attrValueId){
                    _val.desc = _result.attrValueName;
                  }
                })
              }
            });

            const _aid = _val.aid;
            if (_aid in this.saleAttrLen) {
              this.saleAttrLen[_aid].push(_val);
            } else {
              this.saleAttrLen[_aid] = [_val];
            }
          });

          console.log(this.saleAttrLen);
        }
      });
    }

    //设置规格属性回显
    const itemPublishSkuParamsVo = props.params.itemPublishSkuParamsVo ? props.params.itemPublishSkuParamsVo : [];
    let panelData = {
      skuData: []
    };
    itemPublishSkuParamsVo.map(item => {
      let saleAttributes = item.saleAttributes ? JSON.parse(item.saleAttributes) : [];
      let specAttributes = item.specAttributes ? JSON.parse(item.specAttributes) : [];
      let name = '';
      saleAttributes.map(result => {
        name += `${result.vName || ''} `;
      });
      let data = {
        name: name,
        checkValue: specAttributes.map(a => {return {aid: a.aid,vid: a.vid}}),
        specAttributes: specAttributes
      };
      panelData.skuData.push(data);
    });
    //console.log(JSON.stringify(panelData));
    props.setPanelData(panelData);
  }

  /*
   * 监听props变化，根据缓存中的cid参数查询销售规格数据
   * */
  componentWillReceiveProps(nextProps) {
    if(this.cid != nextProps.params.cid){
      this.initAllData(nextProps);
      this.specAttributesArr = nextProps.params.specAttributes?JSON.parse(nextProps.params.specAttributes):[];
    }
  }
  componentDidMount(){
    this.initAllData(this.props);
  }

  setParams(saleAttrLen) {
    const abc = [];
    for (let i in saleAttrLen) {
      saleAttrLen[i].map(_item => {
        abc.push(_item);
      });
    }
    const specAttributes = Array.from(new Set(abc));
    const dataSourceObj = {};
    const dataSource = [];
    // 处理销售属性数据，根据aid进行分组
    specAttributes.map(_item => {
      if (_item.aid in dataSourceObj) {
        dataSourceObj[_item.aid].push({vid: _item.vid, desc: _item.desc});
      } else {
        dataSourceObj[_item.aid] = [{vid: _item.vid, desc: _item.desc}];
      }
    });
    // 将dataSourceObj根据values转换成数组
    const dataSourceArr = Object.values(dataSourceObj);

    // 默认数组长度最多为3
    // 通过if判断各数组是否存在，生成dataSource数据
    if (dataSourceArr[0]) {
      dataSourceArr[0].map(_val => {
        if (dataSourceArr[1]) {
          dataSourceArr[1].map(_val1 => {
            if (dataSourceArr[2]) {
              dataSourceArr[2].map(_val2 => {
                dataSource.push({aName: `${_val.desc} ${_val1.desc} ${_val2.desc}`, saleAttributes: `${_val.vid} ${_val1.vid} ${_val2.vid}`} );
              });
            } else {
              dataSource.push({aName: `${_val.desc} ${_val1.desc}`, saleAttributes: `${_val.vid} ${_val1.vid}`});
            }
          });
        } else {
          dataSource.push({aName: `${_val.desc}`, saleAttributes: `${_val.vid}`});
        }
      });
    }

    let itemPublishSkuParamsVo = [];
    let panelData = {
      skuData: []
    };

    console.log(dataSource, specAttributes);

    dataSource.map(item => {
      let data = {
        saleAttributes: [],
        specAttributes: [],
        skuStatus: 1,
        weightUnit: 'g'
      };
      let skuData = {};
      specAttributes.map(result => {
        if(item.saleAttributes.indexOf((result.vid + '')) !== -1) {
          let params1 = {
            aid: result.aid,
            vid: result.vid,
            desc: null
          };
          data.specAttributes.push(params1);

          let params2 = {
            aid: result.aid,
            vid: result.vid,
            aName: result.attrName,
            vName: result.desc
          };
          data.saleAttributes.push(params2);

          //
          skuData = {
            name: item.aName,
            checkValue: data.specAttributes,
            specAttributes:[],
          };
        }
      });
      panelData.skuData.push(skuData);
      data.saleAttributes = JSON.stringify(data.saleAttributes);
      data.specAttributes = JSON.stringify(data.specAttributes);
      itemPublishSkuParamsVo.push(data);
    });

    if(itemPublishSkuParamsVo.length == 0) {
      const data =  {
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
      };
      itemPublishSkuParamsVo.push(data);
    }

    //console.log(JSON.stringify(panelData));
    // 添加到缓存中
    let specAttributesData = specAttributes.map(item => {return {aid: item.aid, vid: item.vid}});
    this.props.setParamete('specAttributes', JSON.stringify(specAttributesData));
    this.props.setParamete('itemPublishSkuParamsVo', itemPublishSkuParamsVo);
    this.props.setPanelData(panelData);
  }

  /*
   * checkbox复选框选中触发
   * 为specAttributes参数添加数据
   * 步骤：获取原始数据 > 去重 > 添加
   * */
  handelChange(e) {
    // 获取缓存的销售规格数据
    const storeStatus = this.props.params.storeStatus ? this.props.params.storeStatus : null;
    const val = e.target.value;
    const checked = e.target.checked;
    const aid = val.aid;
    const len = Object.keys(this.saleAttrLen).length;
    if (checked) {
      if (len < 3 && !(aid in this.saleAttrLen)) {
        this.saleAttrLen[aid] = [val];
      } else if (aid in this.saleAttrLen) {
        this.saleAttrLen[aid].push(val);
      } else {
        message.error('只能选择三种属性信息');
      }
    } else {
      if (aid in this.saleAttrLen) {
        if(storeStatus == 20 || storeStatus == 30) {
          if (this.saleAttrLen[aid].length <= 1) {
            message.error('至少要保留一种属性信息');
            return;
          }
        }
        this.saleAttrLen[aid].map((_item, _index) => {
          if (_item.vid == val.vid) {
            this.saleAttrLen[aid].splice(_index, 1);
          }
        });
      }
      if (this.saleAttrLen[aid].length === 0) {
        delete this.saleAttrLen[aid];
      }
    }
    this.setParams(this.saleAttrLen);
  }

  /*
   * 渲染checkbox复选框
   * checkbox的value中已经组装好当前条目所需数据
   * aid:父id，vid:当前id，desc:当前描述
   * */
  renderCheckBox(val, row) {
    const specAttributesArr = this.props.params.specAttributes ? JSON.parse(this.props.params.specAttributes) : [];
    const storeStatus = this.props.params.storeStatus ? this.props.params.storeStatus : null;
    const checkboxArr = [];
    val.map(_item => {
      let disabled = false;
      this.specAttributesArr.map((specItem,specIndex)=>{
        if(specItem.vid == _item.attrValueId){
          disabled = true;
        }
      })
      checkboxArr.push(
        <Checkbox
          disabled={(storeStatus == 30) && specAttributesArr.filter(item => _item.attrId == item.aid).length == 0 || disabled}
          key={_item.attrValueId}
          value={{aid: _item.attrId, vid: _item.attrValueId, desc: _item.attrValueName, attrName: row.attrName}}
          onChange={(e) => this.handelChange(e)}
          checked={JSON.stringify(this.saleAttrLen).indexOf(`"vid":${_item.attrValueId}`) !== -1 || JSON.stringify(this.saleAttrLen).indexOf(`"vid":"${_item.attrValueId}"`) !== -1}
        >
          {_item.attrValueName}
        </Checkbox>
      );
    });
    return checkboxArr;
  }

  render() {
    let dataSource = this.props.listData ? this.props.listData : [];
    let cid = this.props.params ? this.props.params.cid : null;
    if(this.cid !== cid) {
      this.saleAttrLen = {};
      this.cid = cid;
    }
    console.log(this.props.params);
    return (
      <div className="mt15">
        <strong className="f-fs14">销售规格</strong>
        <Table
          rowKey={(row) => row.attrId}
          className="tableBorder mt10"
          columns={this.columns}
          pagination={false}
          dataSource={dataSource}
        />
      </div>
    );
  }
}

export
default
SalesSpecifications;
