/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 基本信息设置
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import { Radio, Table } from 'jdcloudui';
import UploadSelect from '../UploadSelect/UploadSelect';
const RadioGroup = Radio.Group;

/* **********  自定义组件  ********** */
import '../../style/table_border.css';

class BaseInfomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 0
    };
    //用来判断用户是否已经按照商品属性编辑过
    this.flag = false;
    //用来判断用户所上传的规格参数
    this.isEdit = [];
  }

  //sku表格的columns
  handleColumns = () => {
    return [{
      title: '规格1',
      dataIndex: 'aName1',
      key: 'attrName1',
      render: (value, row) => (<div>{value ? value.map((item, index) => <p className="attr-name-p" key={index}>{item.vName}</p>) : null}</div>)
    }, {
      title: '规格2',
      dataIndex: 'aName2',
      key: 'attrName2',
      render: (value, row) => (<div>{value ? value.map((item, index) => <p className="attr-name-p" key={index}>{item.vName}</p>) : null}</div>)
    }, {
      title: '规格3',
      dataIndex: 'aName3',
      key: 'attrName3',
      render: (value, row) => (<div>{value ? value.map((item, index) => <p className="attr-name-p" key={index}>{item.vName}</p>) : null}</div>)
    }, {
      title: '上传文件',
      key: 'active',
      render: (text, row, index) => {
        let skuImgInfos = row.skuImgInfos ? JSON.parse(row.skuImgInfos) : [];
        return (
          <UploadSelect
            itemImgInfos={skuImgInfos}
            handleReChange={(info) => this.handleReChange(info, index, row)}
            handleCancel={() => this.handleCancel(index, row)}
            handleALTChange={(e) => this.handleALTChange(e, index, row)}
          />
        )
      }
    }]
  };


  //选项卡change
  handleOnChange = (e) => {
    console.log(e.target.value);
    this.flag = false;
    this.isEdit = [];
    this.setState({
      radioValue: e.target.value
    })
  };

  //初始化表格头部数据
  handleSkuImgColumns = (data) => {
    return [{
      title: (
        <div className="f-fwn">
        <span className="mr20 f-fs14">
          SKU图片
        </span>
          <span>
          <RadioGroup defaultValue="0" onChange={::this.handleOnChange}>
            <Radio value="0">分别上传</Radio>
            {
              data && data.map((item, index) => <Radio key={index} value={item.aid}>{`按商品${item.aName}属性上传`}</Radio>)
            }
          </RadioGroup>
        </span>
          <span className="text-red">(如按销售属性分组编辑，会覆盖对应SKU已编辑图片相关信息)</span>
        </div>
      )
    }];
  };

  //初始化radio数据
  handleGetSaleAttributes = data => {
    return data.map(item => {
      return {
        aName: item.aName,
        aid: item.aid
      }
    });
  };

  //重新上传
  handleReChange = (info, index, row) => {
    //console.log(info, row);
    if(info) {
      let pic = {
        url: info.url,
        alt: null,
      };
      if(this.state.radioValue == 0) {
        this.itemImgInfos[index].skuImgInfos = JSON.stringify([pic]);
      } else {
        this.flag = true;
        this.itemImgInfos.map((item, i) => {
          let saleAttributes = JSON.parse(item.saleAttributes);
          saleAttributes.map(k => {
            if(k.aid == row.aid && k.vid == row.vid) {
              this.isEdit.push({aid: row.aid, vid: row.vid});
              this.itemImgInfos[i].skuImgInfos = JSON.stringify([pic]);
            }
          });
        });
      }
      console.log(this.itemImgInfos);
      this.props.setParamete('itemPublishSkuParamsVo', this.itemImgInfos);
    } else {
      message.error("上传失败");
    }
  };

  //删除
  handleCancel = (index, row) => {
    if(this.state.radioValue == 0) {
      this.itemImgInfos[index].skuImgInfos = null;
    } else {
      this.itemImgInfos.map((item, i) => {
        let saleAttributes = JSON.parse(item.saleAttributes);
        saleAttributes.map(k => {
          if(k.aid == row.aid && k.vid == row.vid) {
            this.itemImgInfos[i].skuImgInfos = null;
          }
        });
      });
    }
    this.props.setParamete('itemPublishSkuParamsVo', this.itemImgInfos);
  };

  //改变ALT
  handleALTChange = (e, index, row) => {
    if(this.state.radioValue == 0) {
      let skuImgInfos = JSON.parse(this.itemImgInfos[index].skuImgInfos);
      skuImgInfos[0].alt = e.target.value;
      this.itemImgInfos[index].skuImgInfos = JSON.stringify(skuImgInfos);
    } else {
      this.itemImgInfos.map((item, i) => {
        let saleAttributes = JSON.parse(item.saleAttributes);
        saleAttributes.map(k => {
          if(k.aid == row.aid && k.vid == row.vid) {
            let skuImgInfos = JSON.parse(this.itemImgInfos[i].skuImgInfos);
            skuImgInfos[0].alt = e.target.value;
            this.itemImgInfos[i].skuImgInfos = JSON.stringify(skuImgInfos);
          }
        });
      });
    }
    this.props.setParamete('itemPublishSkuParamsVo', this.itemImgInfos);
  };

  //初始化数据
  init = (data, radio) => {
    //console.log(radio == 0, radio);
    if(radio == 0) {
      return data.map(item => {
        let params = {
          skuImgInfos: item.skuImgInfos
        };
        item.saleAttributes && JSON.parse(item.saleAttributes).map((result, index) => {
          params[`aName${index + 1}`] = [result];
        });
        return params;
      })
    }else{
      let dataArr = [], cName = { aName: [] }, bName = { aName: [] };
      let index = 0;
      data.map(item => {
        item.saleAttributes && JSON.parse(item.saleAttributes).map((result) => {
          if(result.aid == radio) {
            let flag = false;
            dataArr.map(m => {
              if(result.vid == m.vid) {
                flag = true;
              }
            });
            if(!flag) {
              dataArr[index] = {
                aid: result.aid,
                vid: result.vid,
                aName1: [result],
              };
              let Aot = false;
              this.isEdit.map(_item => {
                if(_item.aid == result.aid && _item.vid == result.vid) {
                  Aot = true;
                }
              });
              if(Aot) {
                dataArr[index].skuImgInfos = this.flag ? item.skuImgInfos : null
              }
              index ++;
            }
          } else {
            if(!cName.aid || cName.aid == result.aid) {
              let flag = false;
              cName.aid = result.aid;
              cName.aName.map(m => {
                if(result.vid == m.vid) {
                  flag = true;
                }
              });
              if(!flag) {
                cName.aName.push(result);
              }
            } else {
              let flag = false;
              bName.aid = result.aid;
              bName.aName.map(m => {
                if(result.vid == m.vid) {
                  flag = true;
                }
              });
              if(!flag) {
                bName.aName.push(result);
              }
            }
          }
        });
      });
      dataArr.map((item, index) => {
        dataArr[index].aName2 = cName.aName;
        dataArr[index].aName3 = bName.aName;
      });
      return dataArr;
    }
  };


  render() {
    //console.log(this.props.params);
    this.itemImgInfos = this.props.params && this.props.params.itemPublishSkuParamsVo ? this.props.params.itemPublishSkuParamsVo : [];
    let saleAttributes = this.itemImgInfos.length > 0 ? this.itemImgInfos[0].saleAttributes : '';
    let attributes = saleAttributes && this.handleGetSaleAttributes(JSON.parse(saleAttributes));
    let data = this.itemImgInfos.length > 0 ? this.init(this.itemImgInfos, this.state.radioValue)  : [];
    let flag = this.itemImgInfos[0] && this.itemImgInfos[0].saleAttributes && JSON.parse(this.itemImgInfos[0].saleAttributes).length > 0 ? 1 : 0;

    console.log(attributes);
    return (
      <div>
        {
          this.itemImgInfos.length > 0 && flag ? (
            <div>
              <Table
                columns={this.handleSkuImgColumns(attributes)}
                dataSource={[]}
                className="tableBorder mt15 table-box-title"
              />
              <Table
                showHeader={false}
                columns={this.handleColumns()}
                dataSource={data}
                className="tableBorder table-box-box-title"
              />
            </div>
          ) : null
        }
      </div>
    );
  }
}
export default BaseInfomation;
