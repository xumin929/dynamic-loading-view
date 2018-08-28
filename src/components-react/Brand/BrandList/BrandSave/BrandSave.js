/****************************************************************
 * author:FengYan
 * date:2017-02-13
 * update:2017-02-19
 * description:brand edit
 ****************************************************************/
import React, {Component} from 'react';
import {Table, Modal, Row, Col, Input, Button, Form, Pagination} from 'jdcloudui';
const FormItem = Form.Item;
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/*********  自定义组件调用  *********/
import BaseComponent from '../../../Common/BaseComponent';
import styles from '../style/BrandList.less';    //css style
import table from '../style/table.css';
import GetAllCategory from '../../GetAllCategory/GetAllCategory';
import {UploadSelect}  from 'jdcloudecc/components';
import {BrandDetailAction} from '../redux/BrandDetailRedux';
/* 权限控制 */
import {FuncPermission}  from 'jdcloudecc/components';

@connect(
  state => ({
    BrandDetails: state.BrandDetail,
  }),
  dispatch => bindActionCreators({
    BrandDetailAction,
  }, dispatch)
)

class BrandSave extends BaseComponent {
  constructor(props) {
    super(props);
    this.tableColumns = [{
      title: '一级类目',
      dataIndex: 'lev1',
      width: '20%',
    }, {
      title: '二级类目',
      dataIndex: 'lev2',
      width: '20%'
    }, {
      title: '三级类目',
      dataIndex: 'lev3',
      width: '20%'
    }, {
      title: '四级类目',
      dataIndex: 'lev4',
      width: '20%'
    }, {
      title: '操作',
      dataIndex: 'hasBind',
      width: '20%',
      render: (text, record, index) => {
        if (text === false) {
          return <span title="该类目下已发布商品">取消关联</span>;
        } else {
          return <FuncPermission code="dissCategory" codes={this.props.codesResponse}><a
            onClick={() => this.removeTableList(index)}>取消关联</a></FuncPermission>;
        }
      }
    }];
    this.state = {
      imgurl: '',
      tableList: [],
      cids: false,
      categoryList: [],
      hasBindCids: [],
      loading: true
    };
  }

  removeTableList(index) {
    //移除类目
    this.state.tableList.splice(index, 1);
    this.state.cids.splice(index, 1);
    this.setState({
      tableList: this.state.tableList,
      cids: this.state.cids,
      categoryList: this.state.cids
    });
  }

  imgurl(url) {
    //图片回调
    this.setState({
      imgurl: url
    })
  }

  tableList(list, cids) {
    // 数组替重
    const newCids = Array.from(new Set(cids));
    const cidList = [];
    newCids.map((_item, _index) => {
      if (this.state.hasBindCids.indexOf(_item - 0) >= 0) {
        list[_index].hasBind = false;
      }
      cidList.push({cid: _item});
    });
    //关联回调
    this.setState({
      tableList: list,
      cids: cidList
    });
  }

  componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.detail.categoryList) {
        // 类目回显
        const reList = [];
        const cids = [];
        // 判断选中的回显类目是否不可解除关联
        const hasBindCids = [];
        nextProps.detail.categoryList.map(_list => {
          reList.push({
            lev4: _list.fourthLevName,
            lev3: _list.thirdLevName,
            lev2: _list.secondLevName,
            lev1: _list.firstLevName,
            hasBind: _list.hasBind
          });
          if (_list.fourthLevCid) {
            cids.push(_list.fourthLevCid)
            return;
          }
          if (_list.thirdLevCid) {
            cids.push(_list.thirdLevCid)
            return;
          }
          if (_list.secondLevCid) {
            cids.push(_list.secondLevCid)
            return;
          }
          if (_list.firstLevCid) {
            cids.push(_list.firstLevCid)
            return;
          }
        });
        this.tableList(reList, cids);
        reList.map((_rs, _index) => {
          if (_rs.hasBind === false) {
            hasBindCids.push(cids[_index])
          }
        })
        this.setState({
          categoryList: nextProps.detail.categoryList,
          hasBindCids: hasBindCids,
          loading: false
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  backUrl(e) {
    this.setState({imgurl: e.url});
  }

  brandNameChConfirm=(rule, value, callback)=>{
    let reg = /^[\u4e00-\u9fa5]+$/
    if(value && !reg.test(value[0])){
      callback('请输入中文名称')
    } else {
      callback()
    }
  }

  brandNameEnConfirm=(rule, value, callback)=>{
    let reg = /^[^\u4e00-\u9fa5]+$/;
    if(value && !reg.test(value)){
      callback('请输入英文名称')
    } else {
      callback()
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const {brandNameCh, brandNameEn, telePhone, brandUrl, remark, id, brandLogoUrl, platformId} = this.props.detail.brand;
    return (
      <Form>
        { getFieldDecorator('id', {initialValue: id})}
        { getFieldDecorator('categoryList', {initialValue: JSON.stringify(this.state.cids)})}
        <Row>
          <Col span={12}>
            <Row className={styles.brandInformation}>
              <Row>
                <Col><strong>品牌信息</strong></Col>
              </Row>
              <FormItem
                {...formItemLayout}
                label="品牌中文名："
                hasFeedback
              >
                {getFieldDecorator('brandNameCh', {
                  rules: [{
                    validator: this.brandNameChConfirm
                  }, {
                    // pattern: /^[\u4e00-\u9fa5]+$/, message: '请输入品牌中文名！',
                  }, {
                    max: 20, message: '品牌中文名称不可超过20个汉字！'
                  }],
                  initialValue: brandNameCh,
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="品牌英文名："
                hasFeedback
              >
                {getFieldDecorator('brandNameEn', {
                  rules: [{
                    max: 50, message: '品牌英文名称不可超过50个字符！'
                  }, {
                    validator: this.brandNameEnConfirm
                  }, {
                    // pattern: /^[^\u4e00-\u9fa5]+$/, message: '请输入品牌英文名！',
                  }],
                  initialValue: brandNameEn
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="网址："
                hasFeedback
              >
                {getFieldDecorator('brandUrl', {
                  rules: [{
                    validator: 'brandUrl',
                  }, {
                    max: 100, message: '最大支持100个字符！'
                  }],
                  initialValue: brandUrl
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="服务电话："
                hasFeedback
              >
                {getFieldDecorator('telePhone', {
                  rules: [{
                    validator: 'telePhone',
                  }, {
                    max: 30, message: '最大支持30个字符！'
                  }],
                  initialValue: telePhone
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                label="品牌LOGO："
              >
                {getFieldDecorator('brandLogoUrl', {
                  initialValue: this.state.imgurl || brandLogoUrl
                })}
                <UploadSelect
                  className={'toupload'}
                  limit={{size: 3, suffix: ['png', 'jpg']}}
                  imgUrl={this.state.imgurl || brandLogoUrl}
                  onChange={(e) => this.backUrl(e)}
                />
                <div>支持小于3M的JPG、PNG格式图片，建议长宽为120*60</div>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="备注："
              >
                {getFieldDecorator('remark', {
                  rules: [{
                    validator: 'remark',
                  }, {
                    max: 200, message: '品牌备注不可超过200个字符！'
                  }],
                  initialValue: remark
                })(
                  <Input />
                )}
              </FormItem>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col><strong>类目信息</strong></Col>
            </Row>
            <Row>
              <GetAllCategory tableList={this.tableList.bind(this)} categoryList={this.state.categoryList}
                              codesResponse={this.props.codesResponse}/>
            </Row>
            <Table
              columns={ this.tableColumns }
              dataSource={this.state.tableList}
              pagination={false}
              scroll={{y: 340}}
              className="tableBorder"
              loading={brandNameCh || brandNameEn ? this.props.loading : false}
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(BrandSave);
