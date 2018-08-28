/****************************************************************
 * author:FengYan
 * date:2017-02-13
 * update:2017-02-18
 * description:BrandListWrapper
 ****************************************************************/
import React, {Component} from 'react';
import {Modal, Button, Popconfirm, message, Row} from 'jdcloudui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

/*********  自定义组件调用  *********/
import BaseComponent from '../../Common/BaseComponent';
import styles from './style/BrandList.less';
import BrandListViews from './BrandListViews'
import BrandListDetail from './BrandDetail/BrandDetails'
import BrandSave from './BrandSave/BrandSave'
import {BrandDetailAction} from './redux/BrandDetailRedux';
import {BrandDetailTableAction} from './redux/BrandDetailTableRedux';
import {BrandDisableAction} from './redux/BrandDisableRedux';
import {brandSearch, setFormValues} from '../BrandSearch/redux';
import {BrandSaveAction} from './redux/BrandSaveRedux';
import {GetAllCategoryAction} from '../GetAllCategory/redux';

/* 权限控制 */
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';
import {FuncPermission}  from 'jdcloudecc/components';
@connect(
  state => ({
    BrandList: state.brandSearch,
    BrandDetails: state.BrandDetail,
    BrandDetailTable: state.BrandDetailTable,
    BrandDisable: state.BrandDisable,
    BrandEdit: state.BrandEdit,
    funcPermissions: state.funcPermissions
  }),
  dispatch => bindActionCreators({
    brandSearch,
    BrandDetailAction,
    BrandDetailTableAction,
    BrandDisableAction,
    BrandSaveAction,
    setFormValues,
    getPlatformFuncPermission,
    GetAllCategoryAction
  }, dispatch)
)

class BrandListWrapper extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '查看品牌',
      okText: '编辑',
      cancelText: '关闭',
      isDetail: true,
      uid: this.getUUID(32, 16),
      visible: false,
      confirmVisible: false,
      action: () => this.brandEdit(),
      loading: false,
      categoryloading: true,
    };
    this.codes = '';
    this.codesResponse = [];
    this.brandListView = null;
    this.brandDetailData = {
      brand: {},
      categoryList: []
    };
    this.pagination = {};
  }

  //添加品牌、修改品牌组件表格设置
  tableColumns() {
    return {
      tableColumns: [
        {
          title: '品牌名称', dataIndex: 'brandNameCh', width: 150,
          render: (text, record) => {
            return (
              <Row>
                <Row>{record.brandNameCh}</Row>
                <Row>{record.brandNameEn}</Row>
              </Row>
            )
          }
        },
        {title: '品牌LOGO', dataIndex: 'brandLogoUrl'},
        {title: '网址', dataIndex: 'brandUrl'},
        {title: '服务电话', dataIndex: 'telePhone', width: 150},
        {title: '备注', dataIndex: 'remark'},
        {title: '状态', dataIndex: 'brandStatus', width: 100},
        {title: '操作', dataIndex: 'handle', width: 170}
      ],
      tableData: this.brandListView,
      pagination: this.pagination
    }
  }

  //停用or启用品牌二次确认
  confirm(status, id) {
    let text = status == 1 ? '正在进行停用品牌操作！' : '正在进行启用品牌操作！';
    message.info(text);
    this.brandDisable(id, status)
  }

  //停用or启用品牌提示
  brandDisableConfirmTitle(status) {
    this.setState({
      text: status == 1 ? '是否要停用此品牌？' : '是否要启用此品牌？'
    })
  }

  //停用or启用品牌状态
  brandDisable(id, status) {
    this.props.BrandDisableAction({
      id: id,
      brandStatus: status
    }).then(() => {
      //刷新列表
      this.refreshBrandList();
    })
  }

  //初始化页面运行品牌列表展示
  componentWillMount() {
    this.props.brandSearch();
    this.props.getPlatformFuncPermission();
    this.props.GetAllCategoryAction()
  }

  // 获取权限
  componentWillReceiveProps(nextProps) {
    try {
      // 获取权限
      if (nextProps.funcPermissions.loaded && nextProps.funcPermissions.data.code == 0) {
        const codesData = nextProps.funcPermissions.data.data;
        this.codes = codesData.join(',');
        this.codesResponse = codesData;
      }

      if (nextProps.BrandDetailTable.loaded) {
        this.dataSource().detailcategory(nextProps.BrandDetailTable.data);
        this.setState({categoryloading: false});
      }
      if (nextProps.BrandDetailTable.loading) {
        // console.log('加载中.......')
        this.brandDetailData.categoryList = [];
        this.setState({categoryloading: true});
      }
    } catch (e) {
      console.log(e)
    }
  }

  //获取品牌详情(左侧品牌信息)
  getBrandDetailAction(id) {
    this.props.BrandDetailAction({brandId: id})
  }

  //获取品牌详情(右侧类目信息)
  getBrandDetailTableAction(id) {
    this.props.BrandDetailTableAction({brandId: id})
  }

//刷新
  refreshBrandList() {
    const params = this.props.BrandList.brandSearchFormValues;
    this.props.brandSearch(params);
  }

//品牌添加修改方法
  submitAction() {
    const data = this.refs.brandSaveData;
    this.setState({loading: true});
    if (data) {
      data.validateFields((errs, values) => {
        if (values.brandNameCh == '' && values.brandNameEn == '') {
          message.error('品牌中文名或者英文名至少填写一个！');
          this.setState({loading: false});
          return;
        } else {
          if (!errs) {
            this.props.BrandSaveAction(values).then((rs) => {
              if (rs.code == 1) {
                message.success('品牌操作成功！');
                this.setState({visible: false});
                this.refreshBrandList();
              } else {
                message.error(rs.msg);
                this.setState({loading: false});
              }
            });
          } else {
            this.setState({loading: false});
          }
        }
      });
    }
  }

//品牌添加
  brandAdd() {
    //品牌信息预设
    this.brandDetailData.brand = {
      platformId: this.platformId,
      brandNameCh: '',
      brandNameEn: '',
      brandLogoUrl: '',
      telePhone: '',
      brandUrl: '',
      remark: '',
      brandStatus: '',
      created: '',
      modified: '',
      yn: '',
      id: ''
    };
    this.setState({
      title: '添加新品牌',
      okText: '添加',
      cancelText: '取消',
      uid: this.getUUID(32, 16),
      isDetail: false,
      type: 0,
      action: () => this.submitAction()
    });
    this.brandDetailData.categoryList = [];
    this.modalShow();
  }

//品牌修改
  brandEdit(id) {
    this.setState({
      title: '修改品牌',
      okText: '保存',
      cancelText: '取消',
      uid: this.getUUID(32, 16),
      isDetail: false,
      type: 1,
      action: () => this.submitAction()
    });
    this.modalShow();
    this.getBrandDetailAction(id);
    this.getBrandDetailTableAction(id);
  }

  brandDetail(id) {
    this.setState({
      title: '查看品牌',
      okText: '编辑',
      cancelText: '关闭',
      uid: this.getUUID(32, 16),
      isDetail: true,
      type: 2,
      action: () => this.brandEdit(id)
    });
    this.modalShow();
    this.getBrandDetailAction(id);
    this.getBrandDetailTableAction(id);
  }

  modalShow() {
    this.setState({
      visible: true,
      loading: false
    })
  }

  modalHide() {
    this.setState({
      visible: false,
      loading: false
    })
  }

  setPagination(page) {
    return this.pagination = { //分页信息
      showQuickJumper: true,
      nextPage: page.nextPage,
      pageCount: page.pageCount,
      pageSize: page.pageSize,
      prevPage: page.prevPage,
      firstPage: page.firstPage,
      current: page.pageNum,
      defaultCurrent: page.pageNum,
      total: page.totalCount,
      lastPage: page.lastPage,
      onChange: (current) => {
        let params = this.props.BrandList.brandSearchFormValues;
        if (typeof params == 'undefined') {
          params = {};
        }
        params.platformId = this.platformId;
        params.pageNum = current == null ? 1 : current;
        params.pageSize = page.pageSize == null ? 10 : page.pageSize;
        params.pageNum = current;
        this.props.brandSearch(params);
        this.props.setFormValues(params);
      },
    }
  }

  setViewList(list) {
    if (!list) {
      return this.brandListView = null;
    }
    const _result = [];
    list.result.map((list) => {
      _result.push({
        key: list.id,
        brandNameCh: list.brandNameCh,
        brandNameEn: list.brandNameEn,
        brandLogoUrl: <img src={list.brandLogoUrl} className={styles.brandLogoList}/>,
        brandUrl: list.brandUrl,
        telePhone: list.telePhone,
        remark: list.remark,
        brandStatus: list.brandStatus === 1 ?
          <span className="text-success">有效</span> :
          <span className="text-error">无效</span>,
        handle: (
          <p className={styles.handleBtnTools}>
            <FuncPermission code="view" codes={this.codesResponse}>
              <span className={styles.handleBtn} onClick={() => this.brandDetail(list.id)}> 查看</span><span
              className={styles.texte5}></span>
            </FuncPermission>
            <FuncPermission code="edit" codes={this.codesResponse}>
              <span className={styles.handleBtn} onClick={() => this.brandEdit(list.id)}> 编辑</span><span
              className={styles.texte5}></span>
            </FuncPermission>
            <FuncPermission code={list.brandStatus === 1 ? 'stop' : 'start'} codes={this.codesResponse}>
              <span className={styles.handleBtn} onClick={() => this.brandDisableConfirmTitle(list.brandStatus)}>
                  <Popconfirm
                    placement="top"
                    title={this.state.text}
                    onConfirm={() => this.confirm(list.brandStatus, list.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    {list.brandStatus === 1 ? '停用' : '启用'}
                  </Popconfirm>
                </span>
            </FuncPermission>
          </p>)
      })
    });
    this.brandListView = _result;
  }

//redux结果集，统一封装调用
  dataSource() {
    return {
      list: (list) => {
        if (list.code == 0) {
          this.setPagination(list.data);
          this.setViewList(list.data);
        }
      },
      detailbrand: (detail) => {
        if (detail.code == 0) {
          const oneBrand = detail.data;
          this.brandDetailData.brand = {
            brandLogoUrl: oneBrand.brandLogoUrl,
            platformId: this.platformId,
            brandNameCh: oneBrand.brandNameCh,
            brandNameEn: oneBrand.brandNameEn,
            telePhone: oneBrand.telePhone,
            brandUrl: oneBrand.brandUrl,
            remark: oneBrand.remark,
            brandStatus: oneBrand.brandStatus,
            created: oneBrand.created,
            modified: oneBrand.modified,
            yn: oneBrand.yn,
            id: oneBrand.id
          };
        }
      },
      detailcategory: (detail) => {
        if (detail.code == 0) {
          this.brandDetailData.categoryList = detail.data;
        }
      }
    }
  }

  render() {
    this.props.BrandList.loaded && this.dataSource().list(this.props.BrandList.data);
    if (this.state.type != 0) this.props.BrandDetails.loaded && this.dataSource().detailbrand(this.props.BrandDetails.data);
    // if (this.state.type != 0) this.props.BrandDetailTable.loaded && this.dataSource().detailcategory(this.props.BrandDetailTable.data);
    return (
      <div>
        <FuncPermission code="add" codes={this.codesResponse}>
          <div className={styles.toolsBtnWrap}>
            <Button type="primary" onClick={() => this.brandAdd()} size="large">添加新品牌</Button>
          </div>
        </FuncPermission>
        {/*<Button><Link to="brandupload">批量上传</Link></Button>*/}
        <div className={styles.listWrap}>
          <BrandListViews table={this.tableColumns()}/>
        </div>
        <Modal
          title={this.state.title}
          okText={this.state.okText}
          cancelText={this.state.cancelText}
          onOk={() => this.modalHide()}
          onCancel={() => this.modalHide()}
          width="900px"
          key={this.state.uid}
          visible={this.state.visible}
          maskClosable={false}
          footer={[
            //关闭取消按钮
            <Button
              onClick={() => this.modalHide()}
              className={styles.marginRight10}
            >
              {this.state.cancelText}
            </Button>,
            //保存编辑按钮
            <FuncPermission code="edit" codes={this.codesResponse}>
              <Button
                onClick={this.state.action}
                type="primary"
                loading={this.state.loading}>
                {this.state.okText}
              </Button>
            </FuncPermission>
          ]}
        >
          {
            this.state.isDetail ?
              <BrandListDetail
                detail={ this.brandDetailData }
                loading={this.state.categoryloading}
              /> :
              <BrandSave
                detail={ this.brandDetailData }
                ref="brandSaveData"
                codesResponse={this.codesResponse}
                loading={this.state.categoryloading}
              />
          }
        </Modal>
      </div>
    );
  }
}

export default BrandListWrapper;
