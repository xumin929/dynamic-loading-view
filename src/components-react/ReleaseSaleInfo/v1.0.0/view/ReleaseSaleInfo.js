/**
 * @author chenyanhua
 * @date 2018-07-26
 * @file 销售信息组件
 * 逻辑：根据销售规格选中的属性合成该列表数据
 * 该页面涉及到用户自定义列
 */
import React, { Component } from 'react';
import { Table, Button, Input, InputNumber, Select, Popover, Radio } from 'jdcloudui';
import { UploadSelect } from 'jdcloudecc/components';
import UploadImage from '../../../UploadImage/v1.0.0/view';
import UploadFile from '../../../UploadFile/v1.0.0/view';
import './style/index.css';

const RadioGroup = Radio.Group;

export default class ReleaseSaleInfo extends Component {
  constructor(props) {
    super(props);
    // 默认表格
    this.defaultDataSource = [{
      "key": 0,
      "attributes": null, //销售属性[{"aName":"颜值","aid":"17504","desc":"","vName":"10","vid":"33066"}]
      "skuStatus": 1 //停用启用操作(必选，默认启用) sku 状态,1:启用;0:停用
    }];
    const columns = this.initColumns(props);
    const itemTmplPublishVo = JSON.parse(JSON.stringify(props.itemTmplPublishVo || {})); // 总数据源
    var dataSource = JSON.parse(JSON.stringify(itemTmplPublishVo.itemTmplSkuVoList || []));
    dataSource = this.setDataSourceKey(dataSource);
    this.state = {
      skuUnitDS: props.skuUnitDS.data || [], // 单位数据源
      wholeColumnData: {}, // 存储当前对应列的全部设置input框数据，例如 { barCode: 54, field: value }
      columns: columns, // 表格列
      dataSource: dataSource.length > 0 ? dataSource : this.defaultDataSource, // 表格数据
      selectedRowKeys: [] // 表格选中行
    };
    this.cid = itemTmplPublishVo.cid || undefined;
  }
  componentWillReceiveProps(nextProps) {
    // 需要展示单位列 && 平台分类存在且已经变更，重新加载单位数据源
    const new_cid = nextProps.itemTmplPublishVo && nextProps.itemTmplPublishVo.cid || undefined;
    const type = this.props.type || undefined;
    if (nextProps.skuUnit && new_cid && this.cid != new_cid) {
      this.cid = new_cid;
      nextProps.querySkuUnit({ cid: nextProps.itemTmplPublishVo.cid }, type);
    }

    // 表格数据
    const columns = this.initColumns(nextProps);
    const itemTmplPublishVo = JSON.parse(JSON.stringify(nextProps.itemTmplPublishVo || {})); // 总数据源
    var dataSource = JSON.parse(JSON.stringify(itemTmplPublishVo.itemTmplSkuVoList || []));
    dataSource = this.setDataSourceKey(dataSource);
    this.setState({
      skuUnitDS: nextProps.skuUnitDS.data || [], // 单位数据源
      columns: columns,
      dataSource: dataSource.length > 0 ? dataSource : this.defaultDataSource
    });

  }
  componentDidMount() {
    // 需要展示单位列 && 平台分类存在，加载单位数据源
    const cid = this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.cid || undefined;
    const type = this.props.type || undefined;
    if (this.props.skuUnit && cid) {
      this.props.querySkuUnit({ cid: this.props.itemTmplPublishVo.cid }, type);
    }
  }
  // 为dataSource增加key
  setDataSourceKey = (dataSource) => {
    let new_dataSource = [];
    dataSource.forEach((item, index) => {
      new_dataSource.push({
        ...item,
        key: index
      });
    });
    return new_dataSource;
  }
  // 表格checkbox变化，更新选中行数据源
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      [
        <h3 className='h3-title'>销售信息</h3>,
        <div className='btn-group-horizontal'>
          <Button onClick={this.handleCheckAll}>全选</Button>
          <Button onClick={this.handleReverseCheck}>反选</Button>
          <Button onClick={() => { this.handleMultiEnablOrDisabled(0); }}>批量停用</Button>
          <Button onClick={() => { this.handleMultiEnablOrDisabled(1); }} >批量启用</Button>
        </div>,
        <div className='table-bordered'>
          <Table
            rowSelection={rowSelection}
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{ x: true, y: 400 }}
          />
        </div>
      ]
    );
  }
  /**
   * 全选按钮事件，获取所有的key，更新state
   */
  handleCheckAll = () => {
    const { dataSource } = this.state;
    let allRowKeys = [];
    for (let i = 0; i < dataSource.length; i++) {
      allRowKeys.push(i);
    }
    this.setState({
      selectedRowKeys: allRowKeys
    });
  }
  /**
   * 反选按钮事件，反选 key，更新state
   */
  handleReverseCheck = () => {
    const { dataSource, selectedRowKeys } = this.state;
    var allRowKeys = [];
    for (var i = 0; i < dataSource.length; i++) {
      allRowKeys.push(i);
    }
    let new_selectedRowKeys = allRowKeys.filter(v => !selectedRowKeys.includes(v));
    this.setState({
      selectedRowKeys: new_selectedRowKeys
    });
  }
  /**
   * 批量停用/启用按钮
   * @param skuStatus: 0-停用，1-启用
   */
  handleMultiEnablOrDisabled = (skuStatus) => {
    const { selectedRowKeys } = this.state;
    let dataSource = JSON.parse(JSON.stringify(this.state.dataSource));
    selectedRowKeys.forEach((rowkeys) => {
      dataSource[rowkeys].skuStatus = skuStatus;
    });

    // 更新总数据源
    var itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    
    itemTmplPublishVo.itemTmplSkuVoList = dataSource;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }
  /**
   * td里 input text类型，更新总数据源
   * @param value 改变的值
   * @param field 改变的字段
   * @param key 当前操作数据行
   */
  handleSingleDataChange = (value, field, key) => {
    var dataSource = JSON.parse(JSON.stringify(this.state.dataSource));
    dataSource[key][field] = value;

    // 当是变换单位字段时，weight字段需要根据单位进行换算
    if (field == 'weightUnit') {
      const weight = dataSource[key]['weight'];
      if(typeof weight == 'number'){
        if (value == 'g') {
          dataSource[key]['weight'] = weight * 1000;
        } else if (value = 'kg') {
          dataSource[key]['weight'] = weight / 1000;
        }
      }
    }

    // 总数据源
    var itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    // 更新总数据源：销售信息数据
    itemTmplPublishVo.itemTmplSkuVoList = dataSource;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  /**
   * 列头部input text，设置按钮 click，更新总数据源
   * @param fields 改变的字段 [string]
   */
  handleWholeColumnChange = (fields) => {
    var dataSource = JSON.parse(JSON.stringify(this.state.dataSource));

    fields.forEach((field) => {
      const value = this.state.wholeColumnData[field];
      // 数据存在
      if (typeof value == 'string' || typeof value == 'number') {
        // 更改所有数据
        dataSource.forEach((item) => {
          // 处于启用状态的数据才可进行重新赋值，停用状态的数据不可赋值
          if (item.skuStatus == '1') {
            item[field] = value;
          }
        });
      }
    });

    // 更新总数据源
    var itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.itemTmplSkuVoList = dataSource;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  /**
   * 列头部 input text，onChange时保存变化的数据到state中
   * @param e: input对象
   * @param field:改变的字段
   */
  storeWholeInputData = (value, field) => {
    this.setState((preState) => {
      let wholeColumnData = JSON.parse(JSON.stringify(preState.wholeColumnData));
      wholeColumnData[field] = value;
      return {
        wholeColumnData: wholeColumnData
      };
    });
  }

  // 删除附件
  onRemoveFile = (file) => {
    console.log('file-----', file);
  }
  /**
   * 根据config配置信息，确定表格由哪些列组成
   * @return columns
   */
  initColumns = (props) => {

    let itemTmplSkuVoList = props.itemTmplPublishVo && props.itemTmplPublishVo.itemTmplSkuVoList || [];
    // 没有勾选销售规格属性
    let ifDefaultData = itemTmplSkuVoList.length == 1 && itemTmplSkuVoList[0].attributes == null ? true : false;

    let columns = [];

    // 如果选了销售规格，则展示商品信息列
    if (!ifDefaultData) {
      columns.push({
        title: '商品信息',
        dataIndex: 'attributes',
        key: 'attributes',
        width: 200,
        render: (data) => {
          var context = '';
          (data || []).forEach((item) => {
            context += item.vName + ' ';
          });
          return (<span>{context}</span>);
        }
      });
    }
    // 商品型号
    if (props.modelCode) {
      const content = (
        <div>
          <label>型号</label>
          <Input
            className='inline-input'
            onChange={(e) => { this.storeWholeInputData(e.target.value, "modelCode"); }}
          />
          <a
            href='javascript:void(0)'
            className='a-link'
            onClick={() => { this.handleWholeColumnChange(['modelCode']); }}
          >设置</a>
        </div>
      );
      const title = (
        <div>
          <label className='inline-label'>型号</label>
          <Popover content={content}>
            <a href='javascript:void(0)' className='a-link'>设置全部</a>
          </Popover>
        </div>
      );
      columns.push({
        title: title,
        dataIndex: 'modelCode',
        key: 'modelCode',
        width: 150,
        render: (data, record) => {
          return (
            <Input
              value={data}
              disabled={record.skuStatus == '0' ? true : false}
              onChange={(e) => { this.handleSingleDataChange(e.target.value, "modelCode", record.key); }}
            />
          );
        }
      });
    }

    // 商品物料号
    if (props.productCode) {
      const content = (
        <div>
          <label>物料号</label>
          <Input
            className='inline-input'
            onChange={(e) => { this.storeWholeInputData(e.target.value, "productCode"); }}
          />
          <a href='javascript:void(0)'
            className='a-link'
            onClick={() => { this.handleWholeColumnChange(['productCode']); }}
          >设置</a>
        </div>
      );
      const title = (
        <div>
          <label className='inline-label'>物料号</label>
          <Popover content={content}>
            <a href='javascript:void(0)' className='a-link'>设置全部</a>
          </Popover>
        </div>
      );
      columns.push({
        title: title,
        dataIndex: 'productCode',
        key: 'productCode',
        width: 150,
        render: (data, record) => {
          return (
            <Input
              value={data}
              disabled={record.skuStatus == '0' ? true : false}
              onChange={(e) => { this.handleSingleDataChange(e.target.value, "productCode", record.key); }}
            />
          );
        }
      });
    }

    // 商品条形码
    if (props.modelCode) {
      const content = (
        <div>
          <label>商品条码</label>
          <Input
            className='inline-input'
            onChange={(e) => { this.storeWholeInputData(e.target.value, "barCode"); }}
          />
          <a
            href='javascript:void(0)'
            className='a-link'
            onClick={() => { this.handleWholeColumnChange(['barCode']); }}
          >设置</a>
        </div>
      );
      const title = (
        <div>
          <label className='inline-label'>商品条码</label>
          <Popover content={content}>
            <a href='javascript:void(0)' className='a-link'>设置全部</a>
          </Popover>
        </div>
      );
      columns.push({
        title: title,
        dataIndex: 'barCode',
        key: 'barCode',
        width: 150,
        render: (data, record) => {
          return (
            <Input
              value={data}
              disabled={record.skuStatus == '0' ? true : false}
              onChange={(e) => { this.handleSingleDataChange(e.target.value, "barCode", record.key); }}
            />
          );
        }
      });
    }

    // 商品毛重
    const weight_content = (
      <div>
        <label>商品毛重</label>
        <InputNumber
          min={0}
          className='inline-input-number'
          onChange={(value) => { this.storeWholeInputData(value, "weight"); }}
        />
        <RadioGroup
          defaultValue='g'
          onChange={(e) => { this.storeWholeInputData(e.target.value, "weightUnit"); }}
        >
          <Radio value='g'>g</Radio>
          <Radio value='kg'>kg</Radio>
        </RadioGroup>
        <a
          href='javascript:void(0)'
          className='a-link'
          onClick={() => {
            this.handleWholeColumnChange(['weight', 'weightUnit']);
          }}
        >设置</a>
      </div>
    );
    const weight_title = (
      <div>
        <label className='inline-label'>商品毛重</label>
        <Popover content={weight_content}>
          <a href='javascript:void(0)' className='a-link'>设置全部</a>
        </Popover>
      </div>
    );
    columns.push({
      title: weight_title,
      dataIndex: 'weight',
      key: 'weight',
      colSpan: 2,
      width: 90,
      render: (data, record) => {
        return (
          <InputNumber
            min={0}
            value={data}
            disabled={record.skuStatus == '0' ? true : false}
            className='inline-input-number'
            onChange={(value) => { this.handleSingleDataChange(value, "weight", record.key); }}
          />
        );
      }
    });
    columns.push({
      title: '',
      dataIndex: 'weightUnit',
      key: 'weightUnit',
      colSpan: 0,
      width: 70,
      render: (data, record) => {
        var unit = data ? data : 'g';
        return (
          <Select
            value={unit}
            disabled={record.skuStatus == '0' ? true : false}
            onChange={(value) => { this.handleSingleDataChange(value, "weightUnit", record.key); }}
          >
            <Select.Option value="g">g</Select.Option>
            <Select.Option value="kg">kg</Select.Option>
          </Select>
        );
      }
    });

    // 包装尺寸，默认有该列
    const size_content = (
      <div>
        <label>包装尺寸（mm） </label>
        &nbsp;&nbsp;长:
          <InputNumber
          min={0}
          className='inline-input-number'
          onChange={(value) => { this.storeWholeInputData(value, "length"); }}
        />
        &nbsp;&nbsp;宽:
          <InputNumber
          min={0}
          className='inline-input-number'
          onChange={(value) => { this.storeWholeInputData(value, "width"); }}
        />
        &nbsp;&nbsp;高:
          <InputNumber
          min={0}
          className='inline-input-number'
          onChange={(value) => { this.storeWholeInputData(value, "height"); }}
        />
        <a
          href='javascript:void(0)'
          className='a-link'
          onClick={() => {
            this.handleWholeColumnChange(['length', 'width', 'height']);
          }}
        >设置</a>
      </div>
    );
    const size_title = (
      <div>
        <label className='inline-label'>包装尺寸（mm）</label>
        <Popover content={size_content}>
          <a href='javascript:void(0)' className='a-link'>设置全部</a>
        </Popover>
      </div>
    );
    columns.push({
      title: size_title,
      dataIndex: 'length',
      key: 'length',
      colSpan: 3,
      width: 110,
      render: (data, record) => {
        return (
          <div>
            长:
              <InputNumber
              min={0}
              value={data}
              disabled={record.skuStatus == '0' ? true : false}
              className='inline-input-number'
              onChange={(value) => { this.handleSingleDataChange(value, "length", record.key); }}
            />
          </div>
        );
      }
    });
    columns.push({
      dataIndex: 'width',
      key: 'width',
      colSpan: 0,
      width: 110,
      render: (data, record) => {
        return (
          <div>
            宽:
              <InputNumber
              min={0}
              value={data}
              disabled={record.skuStatus == '0' ? true : false}
              className='inline-input-number'
              onChange={(value) => { this.handleSingleDataChange(value, "width", record.key); }}
            />
          </div>
        );
      }
    });
    columns.push({
      dataIndex: 'height',
      key: 'height',
      colSpan: 0,
      width: 110,
      render: (data, record) => {
        return (
          <div>
            高:
              <InputNumber
              min={0}
              value={data}
              disabled={record.skuStatus == '0' ? true : false}
              className='inline-input-number'
              onChange={(value) => { this.handleSingleDataChange(value, "height", record.key); }}
            />
          </div>
        );
      }
    });

    /**
     * 自定义扩展列，从config页面配置
     * props.extendColumnFields = [{ id:1, key:'中文名1', type:'图片|file|input', width: *** }]
     */
    if (props.extendColumnFields && props.extendColumnFields instanceof Array && props.extendColumnFields.length > 0) {
      props.extendColumnFields.forEach((item) => {
        let label = `extendSkuFields_${item.label}`;
        columns.push({
          title: item.labelName,
          dataIndex: label,
          key: label,
          width: item.width || 120,
          render: (data, record) => {
            if (item.type == 'input') {
              return (
                <Input
                  value={data && data.value || ''}
                  disabled={record.skuStatus == '0' ? true : false}
                  onChange={(e) => {
                    let newValue = {
                      label: item.label,
                      value: e.target.value
                    };
                    this.handleSingleDataChange(newValue, label, record.key);
                  }}
                />
              );
            } else if (item.type == 'image') {
              if (props.type == '0' || props.type == '1') { // platform
                return (
                  <div className={record.skuStatus == '0' ? 'image-diabled' : ''}>
                    <UploadSelect
                      onChange={(result) => {
                        let newValue = {
                          label: item.label,
                          value: result.url || ''
                        };
                        this.handleSingleDataChange(newValue, label, record.key)
                      }}
                      onRemove={(result) => {
                        let newValue = {
                          label: item.label,
                          value: ''
                        };
                        this.handleSingleDataChange(newValue, label, record.key)
                      }}
                      limit={{ size: 5, suffix: ['JPG', 'JPEG', 'PNG', 'GIF'] }}
                      imgUrl={data && data.value || ''}
                      showRemoveIcon={true}
                    >
                    </UploadSelect>
                  </div>
                );
              } else {  // shop
                return (
                  // 添加图片禁用样式
                  <div className={record.skuStatus == '0' ? 'image-diabled' : ''}>
                    <UploadImage
                      onChange={(result) => {
                        let newValue = {
                          label: item.label,
                          value: result.logoUrl || ''
                        };
                        this.handleSingleDataChange(newValue, label, record.key)
                      }}
                      relation="logoUrl"
                      onRemove={(result) => {
                        let newValue = {
                          label: item.label,
                          value: ''
                        };
                        this.handleSingleDataChange(newValue, label, record.key)
                      }}
                      imgType={['JPG', 'JPEG', 'PNG', 'GIF']}
                      action="/proxy/base/upload/uploadImgLimitOneMega"
                      maxFileSize="500"
                      fileSizeType="KB"
                      imageUrl={data && data.value || ''}
                    />
                  </div>
                );
              }
            } else if (item.type == 'file') {
              const fileList = JSON.parse(data && data.value || JSON.stringify([]));
              const disabled = (record.skuStatus == '0' || fileList.length >= 1) ? true : false;
              return (
                <UploadFile
                  fileLength={1}
                  disabled={disabled}
                  fileType={['png', 'jpg', 'word', 'excel', 'pdf']}
                  action='/proxy/base/upload/uploadFileLimit'
                  fileList={fileList}
                  onRemove={(file) => {
                    // 启用状态时，可删除
                    if (record.skuStatus == '1') {
                      let newValue = {
                        label: item.label,
                        value: JSON.stringify([])
                      };
                      this.handleSingleDataChange(newValue, label, record.key);
                    } else if (record.skuStatus == '0') {
                      // 停用状态不可删除
                      return false;
                    }
                  }}
                  onChange={(file) => {
                    let newValue = {
                      label: item.label,
                      value: JSON.stringify([file])
                    };
                    this.handleSingleDataChange(newValue, label, record.key);
                  }}
                />
              );
            }
          }
        });
      });
    }

    // 单位
    if (props.skuUnit) {
      let that = this;
      columns.push({
        title: '单位',
        dataIndex: 'skuUnit',
        key: 'skuUnit',
        width: 100,
        render: (data, record) => {
          return (
            <Select
              style={{ width: 80 }}
              value={data}
              disabled={record.skuStatus == '0' ? true : false}
              onChange={(value) => { this.handleSingleDataChange(value, "skuUnit", record.key); }}
            >
              {
                that.state.skuUnitDS.map((item) => {
                  return <Select.Option value={item}>{item}</Select.Option>
                })
              }
            </Select>
          );
        }
      });
    }

    // 如果选了销售规格，则展示操作列
    if (!ifDefaultData) {
      columns.push({
        title: '操作',
        dataIndex: 'skuStatus',
        key: 'skuStatus',
        width: 60,
        render: (data, record) => {
          // sku 状态,1:启用; 0:停用
          return (
            <a
              href='javascript:void(0);'
              className='a-link'
              onClick={() => {
                const newData = (data == '1') ? 0 : 1;
                this.handleSingleDataChange(newData, "skuStatus", record.key);
              }}
            >
              {data == "0" ? "启用" : "停用"}
            </a>
          );
        }
      });
    }

    // 纯粹为了当只有尺寸和毛重时，列不至于太宽导致样式变形进行的控制
    if(columns.length < 6){
      columns.push({
        title: '',
        dataIndex: 'skuUnit',
        key: 'skuUnit',
        width: 300
      });
    }

    return columns;
  }

}


