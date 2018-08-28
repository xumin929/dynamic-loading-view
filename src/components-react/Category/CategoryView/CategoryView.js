
/**
 * Created by luoquan on 2017/2/15.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal, Table, Transfer, Button ,message} from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBrandAll, Relation, Relieve} from './redux';
import {FuncPermission}  from 'jdcloudecc/components';
import styles from './style/CategoryView.less';
const confirm = Modal.confirm;
@connect(
  state => ({brands:state.brands}),
  dispatch => bindActionCreators({getBrandAll, Relation, Relieve}, dispatch)
)

export default class CategorySee extends Component {
  static propTypes = {
    brands: PropTypes.object,
    getBrandAll: PropTypes.func.isRequired,
    Relation: PropTypes.func.isRequired,
    Relieve: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.codesResponse = [];
    this.state = {
      targetKeys: [],
      mockData: [],
      message: {
        height: '0',
        top: '-300px',
        isSwitch: false
      },
      columns: [{
        title: '品牌信息',
        dataIndex: 'name',
        width: 150
      }, {
        title: '操作',
        dataIndex: 'address',
        width: 150,
        render: text => <FuncPermission codes={this.codesResponse} code="bindBrand"><a href="javascript:void(0);">{text}</a></FuncPermission>,
        onCellClick(record) {
          confirm({
            title: '你确定要删除品牌' + record.name + '吗？',
            onOk: () => this.handleDeleteData(record),
            onCancel() {

            }
          });
        }
      }]
    };
    this.visible = false;
    this.state.newRandomKey = this.props.getUUID(32,16);
    this.state.columns[1].onCellClick = this.state.columns[1].onCellClick.bind(this);

  }

  componentDidMount() {
    this.codesResponse = this.props.codes;
  }

  handleDeleteData(record) {
    const platformId = 2, uuid = this.props.uuid;
    this.setState({
      message: {
        height: '0',
        top: '-300px',
        isSwitch: (this.props.brand.data.length - 1) < 6 ? false : 300,
      }
    });
    this.props.Relieve(platformId, uuid, this.props.brand.categoryId, record.id).then(
      (result)=>{
        if(result.code == '0'){
          message.success('解除关联成功！', 2, this.props.handleDeleteData(record, this.props.brand.categoryId));
        }else {
          message.error(result.msg);
        }
      },
      (error)=>{
        message.error('解除关联失败！');
      }
    );
  }


  //取消时下拉框缩回
  transferClose() {
    this.setState({
      message: {
        top: '-300px',
        height: '0',
        isSwitch: this.state.message.isSwitch
      }
    }, function () {this.visible = false}.bind(this))
  }

  //点击管理类目，显示下拉框，并刷新数据
  transferOpen() {
    if (!this.visible) {
      const platformId = 2;
      //目前测试使用固定categoryId值1001005
      this.props.getBrandAll(platformId, this.props.brand.categoryId)
      //this.props.getBrandAll(platformId, 1001005)
        .then(
          (function (brands) {
            const mockData = [];
            for (let i = 0, length = brands.data ? brands.data.length : 0; i < length; i++) {
              const data = {
                key: brands.data[i].id,
                title: brands.data[i].brandNameCh ? brands.data[i].brandNameCh : brands.data[i].brandNameEn,
                id: brands.data[i].id,
                address: '解除关联'
              };
              mockData.push(data);
            }
            this.setState(() =>({
              targetKeys: [],
              mockData
            }))
          }).bind(this)
        );
      this.setState({
        message: {
          top: '26px',
          height: '300px',
          isSwitch: this.state.message.isSwitch
        }
      });
      this.visible = true;
    }
  }

  //提交管理类目
  submitMock() {
    const platformId = 2, uuid = this.props.uuid;
    const dataArr = [];
    const brandData = [];
    for (let i = 0, length = this.state.mockData.length; i < length; i++) {
      for (let j = 0, length = this.state.targetKeys.length; j < length; j++) {
        if (this.state.mockData[i].key === this.state.targetKeys[j]) {
          const data = {
            key: this.state.mockData[i].key,
            name: this.state.mockData[i].title,
            id: this.state.mockData[i].id,
            address: '解除关联'
          };
          dataArr.push(data);
          brandData.push(data.id);
        }
      }
    }
    if(dataArr.length !== 0){
      this.props.handleAddData(dataArr, this.props.brand.categoryId);
      this.props.Relation(platformId, uuid, this.props.brand.categoryId, brandData).then(
        (result)=>{
          if(result.code=='0'){
            message.success('关联品牌成功！');
          }else{
            message.error(result.msg);
          }
        },
        (error)=>{
          message.error('关联品牌失败！');
        }
      );
    }
    this.setState({
      message: {
        height: '0',
        top: '-300px',
        isSwitch: this.props.brand.data.length + dataArr.length < 6 ? false : 300,
      }
    },  function () {this.visible = false}.bind(this));
  }

  handleChange(targetKeys) {
    this.setState({ targetKeys });
  }


  render() {
    // const styles = import('./style/CategoryView.less');
    if(!this.props.visibleView) {
      this.visible = false;
    }
    this.codesResponse = this.props.codes;
    return (
      <div>
        <Modal
          maskClosable={false}
          className={styles.brandBox}
          key={this.state.newRandomKey}
          title={'已关联品牌-分类名称'}
          footer={null}
          visible={this.props.visibleView}
          onOk={this.props.handleAlreadyOk} onCancel={this.props.handleCancelBrand}
        >
          <ul className={styles.brandTitle}>
            <li className=''>品牌信息</li>
            <li className=''>操作</li>
          </ul>
          <Table
            className={styles.brandTable}
            columns={this.state.columns}
            dataSource={this.props.brand.data}
            pagination={false}
            showHeader={false}
            bordered
            scroll={{ y: this.props.brand.data.length <= 6 ? false : 300}}
          />
          <div className={styles.brandText} onClick={this.transferOpen.bind(this)}>
            <FuncPermission codes={this.codesResponse} code="bindBrand"><a>关联新品牌</a></FuncPermission>
            <div style={{marginTop: '1px', position: 'relative', overflow: 'hidden', height: (this.props.visibleView && this.visible ? this.state.message.height : '0'), background: '#fff', transition: '1s'}}>
              <div className="bindBrandBox" style={{position: 'absolute', top:  (this.props.visibleView && this.visible ? this.state.message.top : '-300px'), padding: '14px', transition: '1s'}}>
                <div className={styles.brandMask1}></div>
                <div className={styles.brandMask2}></div>
                <Transfer
                  dataSource={this.state.mockData}
                  showSearch
                  listStyle={{
                    width: 196,
                    height: 220,
                  }}
                  operations={['', '']}
                  targetKeys={this.state.targetKeys}
                  searchPlaceholder={'请输入关键字'}
                  onChange={this.handleChange.bind(this)}
                  render={item => item.title}
                  footer={function() {
                    return (
                      <div className={styles.BrandFooter}>
                        <Button type="ghost" size="small" style={{ float: 'left', margin: 5,marginRight: 46, width: 50, height: 30 }} onClick={this.submitMock.bind(this)}>关联</Button>
                        <Button type="last" size="small" style={{ float: 'left', margin: 5, width: 50, height: 30 }} onClick={this.transferClose.bind(this)}>取消</Button>
                      </div>
                    )
                  }.bind(this)}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
