/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 销售信息设置
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Input, Select, Button, Table, Popover, Row, Col, InputNumber, Radio} from 'jdcloudui';
const Option = Select.Option;
const RadioGroup = Radio.Group;

/* **********  自定义组件  ********** */
import './style/table_border.css';
import './style/style.css';

class SalesInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      dataValue: {}
    };
    this.dataSource = [];
  }

  componentWillMount() {
    this.dataSource = this.props.params.itemPublishSkuParamsVo ? this.props.params.itemPublishSkuParamsVo : [];
  }

  componentWillReceiveProps(nextProps) {
    //this.createDataSource(nextProps.itemData);
  }


  renderColumns() {
    const columns =  [
      {
        title: '商品信息',
        dataIndex: 'saleAttributes',
        key: 'model',
        width: '20%',
        render: val => {
          let specArr = val?JSON.parse(val):[];
          let name = '';
          specArr.map(result => {
            name += ` ${result.vName || ''}`;
          });
          return (
            <span>{name}</span>
          )
        },
      },
      {
        title: this.renderColumnsSetAllPopover('型号', null, 'modelCode'),
        dataIndex: 'modelCode',
        render: (val, row, index) => <Input disabled={!row.skuStatus ? true : false} maxLength="100" value={row.modelCode ? row.modelCode : ''} onChange={(e) => this.handelChange(e, index, 'modelCode')} />,
        width: '15%'
      },
      {
        title: this.renderColumnsSetAllPopover('物料号', null, 'productCode'),
        dataIndex: 'productCode',
        render: (val, row, index) => <Input disabled={!row.skuStatus ? true : false} maxLength="100" value={row.productCode ? row.productCode : ''} onChange={(e) => this.handelChange(e, index, 'productCode')} />,
        width: '15%'
      },
      {
        title: this.renderColumnsSetAllPopover('商品条码', null, 'barCode'),
        dataIndex: 'barCode',
        render: (val, row, index) => <Input disabled={!row.skuStatus ? true : false} maxLength="100" value={row.barCode ? row.barCode : ''} onChange={(e) => this.handelChange(e, index, 'barCode')} />,
        width: '15%'
      },
      {
        title: this.renderColumnsSetAllPopover('商品毛重', 1, 'weight'),
        dataIndex: 'weight',
        render: (val, row, index) => this.renderTableInputSelect(row, index),
        width: '15%'
      },
      {
        title: this.renderColumnsSetAllPopover('单位', 2, 'skuUnit'),
        dataIndex: 'skuUnit',
        render: (val, row, index) => {
          let skuUnit = this.props.params && this.props.params.skuUnit ? this.props.params.skuUnit : [];
          return (
            <Select className="SelectNum" disabled={!row.skuStatus ? true : false} value={val ? val : (<span style={{color: '#ccc'}}>请选择</span>)} onChange={(value) => this.handelSelectChange(value, index, 'skuUnit')} >
              {
                skuUnit.map((item, index) => <Option key={index} value={item}>{item}</Option>)
              }
            </Select>
          )
        },
        width: '10%'
      }
    ];

    if(this.dataSource.length > 1) {
      columns.push({
        title: '操作',
        dataIndex: 'skuStatus',
        width: '10%',
        render: (val, row, index) => val ? (
          <a href="javascript:void(0)" onClick={() => this.handelClick(index, 0)}>停用</a>
        ) : (
          <a href="javascript:void(0)" onClick={() => this.handelClick(index, 1)}>启用</a>
        )
      })
    }
    return columns;
  }

  //设置用户操作数据
  handelChange = (e, index, key) => {
    let itemPublishSkuParamsVo = this.props.params ? this.props.params.itemPublishSkuParamsVo : [];
    itemPublishSkuParamsVo[index][key] = e.target.value;
    this.props.setParamete('itemPublishSkuParamsVo', itemPublishSkuParamsVo);
  };

  //设置商品毛重数据
  handelNumberChange = (value, index, key) => {
    let itemPublishSkuParamsVo = this.props.params ? this.props.params.itemPublishSkuParamsVo : [];
    itemPublishSkuParamsVo[index][key] = value;
    this.props.setParamete('itemPublishSkuParamsVo', itemPublishSkuParamsVo);
  };

  //设置用户设置毛重单位
  handelSelectChange = (value, index, key) => {
    console.log('11',value)
    let itemPublishSkuParamsVo = this.props.params ? this.props.params.itemPublishSkuParamsVo : [];
    itemPublishSkuParamsVo[index][key] = value;
    this.props.setParamete('itemPublishSkuParamsVo', itemPublishSkuParamsVo);
  };

  //操作
  handelClick = (index, type) => {
    let itemPublishSkuParamsVo = this.props.params ? this.props.params.itemPublishSkuParamsVo : [];
    itemPublishSkuParamsVo[index].skuStatus = type;
    this.props.setParamete('itemPublishSkuParamsVo', itemPublishSkuParamsVo);
  };


  renderTableInputSelect(row, index) {
    return (
      <div className="InputSelectBox">
        <InputNumber disabled={!row.skuStatus ? true : false} className="f-fl" min="0" value={row.weight ? row.weight : 0} onChange={(value) => this.handelNumberChange(value, index, 'weight')} />
        <Select disabled={!row.skuStatus ? true : false} className="ml10" value={row.weightUnit ? row.weightUnit : 'g'} onChange={(value) =>this.handelSelectChange(value, index, 'weightUnit')}>
          <Option value="g">g</Option>
          <Option value="kg">kg</Option>
        </Select>
      </div>
    );
  }

  //暂存全部设置的数据
  saveColumnsInputValue(value, status, key, type) {
    console.log(value,status,key,type)
    let { dataValue } = this.state;
    if(status == 1) {
      if(type == 'num') {
        dataValue[key] = value;
        this.setState({dataValue});
      } else {
        dataValue[key] = value.target.value;
        this.setState({dataValue});
      }
    }else if(status == 2) {
      let itemPublishSkuParamsVo = this.props.params ? this.props.params.itemPublishSkuParamsVo : [];
      dataValue[key] = value;
      itemPublishSkuParamsVo = itemPublishSkuParamsVo.map(item => {
        item[key] = dataValue[key];
        return item;
      });
      this.setState({dataValue}, ()=>this.props.setParamete('itemPublishSkuParamsVo', itemPublishSkuParamsVo));
    } else {
      dataValue[key] = value.target.value;
      this.setState({dataValue});
    }
  }

  //点击全部设置保存数据
  handelSetValue(key) {
    let { dataValue } = this.state;
    let itemPublishSkuParamsVo = this.props.params ? this.props.params.itemPublishSkuParamsVo : [];
    itemPublishSkuParamsVo = itemPublishSkuParamsVo.map(item => {
      if(item.skuStatus == 1) {
        if(key == 'weight') {
          item.weightUnit = dataValue.weightUnit ? dataValue.weightUnit : 'g';
          item[key] = dataValue[key] ? dataValue[key] : 0;
        } else {
          item[key] = dataValue[key] ? dataValue[key] : '';
        }
      }
      return item;
    });
    this.props.setParamete('itemPublishSkuParamsVo', itemPublishSkuParamsVo);
  }

  renderColumnsSetAllPopover(title, weight, key) {
    let { dataValue } = this.state;
    const content = (
      <Row style={{width: '350px'}}>
        <Col span={5} className="line40 ColBox">{title}：</Col>
        {
          weight && weight == 1 ? (
            <Col span={15}>
              <InputNumber
                className="f-fl"
                min="0"
                value={dataValue.weight ? dataValue.weight : 0}
                onChange={(value)=>this.saveColumnsInputValue(value, weight, 'weight', 'num')}
              />
              <RadioGroup
                className="f-fl ml10"
                value={dataValue.weightUnit ? dataValue.weightUnit : 'g'}
                onChange={(e)=>this.saveColumnsInputValue(e, weight, 'weightUnit', 'radio')}
              >
                <Radio value="g">g</Radio>
                <Radio value="kg">kg</Radio>
              </RadioGroup>
            </Col>
          ) : weight && weight == 2 ? (
                <Col span={15}>
                  <Select
                    className="SelectAllBox"
                    value={dataValue[key] ? dataValue[key] :(<span style={{color: '#ccc'}}>请选择</span>)}
                    onChange={(value) => this.saveColumnsInputValue(value, weight, key)}
                  >
                    {
                      this.props.params && this.props.params.skuUnit ? this.props.params.skuUnit.map((item, index) => <Option key={index} value={item}>{item}</Option>) : null
                    }
                  </Select>
                </Col>
              ) : (
            <Col span={15}>
              <Input
                maxLength="100"
                value={dataValue[key] ? dataValue[key] : ''}
                onChange={(e)=>this.saveColumnsInputValue(e, weight, key)}
              />
            </Col>
          )
        }
        {
          weight && weight == 2 ? null : (<Col span={4}><Button className="ml10" type="ghost" onClick={()=>this.handelSetValue(key)}>设置</Button></Col>)
        }
      </Row>
    );
    return (
      <div>
        <strong className="mr10">{title}</strong>
        {
          this.dataSource && this.dataSource.length > 0 && (
            <Popover content={content} trigger="click">
              <strong className="text-shop f-csp">设置全部</strong>
            </Popover>
          )

        }
      </div>
    );
  }

  //全选反选
  handelClickAll = (type) => {
    let selectedRowKeys = [];
    if(type) {
      this.dataSource.map(item => {
        selectedRowKeys.push(item.saleAttributes);
      })
    } else {
      let rowKeys = this.state.selectedRowKeys;
      this.dataSource.map(item => {
        if(rowKeys.indexOf(item.saleAttributes) == -1) {
          selectedRowKeys.push(item.saleAttributes);
        }
      })
    }
    this.setState({selectedRowKeys});
  };

  //全部停用或启用
  handelActionAll = (type) => {
    let itemPublishSkuParamsVo = this.props.params ? this.props.params.itemPublishSkuParamsVo : [];
    let rowKeys = this.state.selectedRowKeys;
    itemPublishSkuParamsVo = itemPublishSkuParamsVo.map(item => {
      if(rowKeys.indexOf(item.saleAttributes) != -1) {
        item.skuStatus = type;
      }
      return item;
    });
    this.props.setParamete('itemPublishSkuParamsVo', itemPublishSkuParamsVo);
  };

  handelSelectedChange = (selectedRowKeys) => {
    //console.log(selectedRowKeys);
    this.setState({selectedRowKeys,});
  };

  render() {
    this.dataSource = this.props.params.itemPublishSkuParamsVo ? this.props.params.itemPublishSkuParamsVo : [];
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: ::this.handelSelectedChange,
    };
    return (
      <div className="mt15">
        <strong className="f-fs14">销售信息</strong>
        <div className="mt10">
          <Button className="mr10" onClick={() => this.handelClickAll('all')}>全选</Button>
          <Button className="mr10" onClick={() => this.handelClickAll()}>反选</Button>
          <Button className="mr10" onClick={() => this.handelActionAll(0)}>批量停用</Button>
          <Button onClick={() => this.handelActionAll(1)}>批量启用</Button>
        </div>
        <Table
          rowKey={(row) => row.saleAttributes}
          className="tableBorder mt10"
          columns={this.renderColumns()}
          dataSource={this.dataSource}
          rowSelection={rowSelection}
          pagination={false}
        />
      </div>
    );
  }
}

export
default
SalesInformation;
