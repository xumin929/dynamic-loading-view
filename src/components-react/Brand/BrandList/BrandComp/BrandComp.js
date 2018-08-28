/****************************************************************
 * author:FengYan
 * date:2017-02-13
 * update:2017-02-19
 * description:brand edit
 ****************************************************************/
import React, {Component} from 'react';
import { Table, Modal, Row, Col, Input, Button, Form, Pagination } from 'jdcloudui';
const FormItem = Form.Item;
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

/*********  自定义组件调用  *********/
import styles from '../style/BrandList.less';    //css style
import GetAllCategory from '../../GetAllCategory/GetAllCategory';
import { BrandEditAction } from '../redux/BrandSaveRedux';

@connect(
  state => ({ BrandEdit:state.BrandEdit }),
  dispatch => bindActionCreators({ BrandEditAction }, dispatch)
)
class BrandEdit extends Component {
  constructor(props) {
    super(props);
    this.tableColumns = [{
      title: '一级类目',
      dataIndex: 'firstLevName',
      width: '20%'
    }, {
      title: '二级类目',
      dataIndex: 'secondLevName',
      width: '20%'
    }, {
      title: '三级类目',
      dataIndex: 'thirdLevName',
      width: '20%'
    }, {
      title: '四级类目',
      dataIndex: 'fourthLevName',
      width: '20%'
    },{
      title:'操作',
      dataIndex:'action',
      width:'20%',
      render: text => <span>{text}解除关联</span>
    }
    ]
  }
  brandEditSaveAction(){
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log(value)
    //   }})
    alert()
    // this.props.BrandEditAction({
    //   platformId: this.platformId,
    //   id:id,
    //   brandNameEn:'',
    //   brandNameCh:'',
    //   telePhone:'',
    //   remark:'',
    //   brandUrl:'',
    //   brandLogoUrl:'',
    //   categoryList:[],
    // })
  }
  

  render() {
    const { brand, categoryList } = this.props.detail;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col span={12}>
            <Row className={styles.brandInformation}>
              <Row>
                <Col><strong>品牌信息</strong></Col>
              </Row>
              <FormItem
                className={styles.antItem}
                label="品牌中文名："
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator('brandNameCh', {
                  rules: [{
                    required: true, message: '请输出品牌中文名！',
                  }],
                  initialValue:brand.brandNameCh ,
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.antItem} label="品牌英文名：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                {getFieldDecorator('brandNameEn', {
                  rules: [{
                    required: true, message: '请输入品牌英文名！',
                  }],
                  initialValue:brand.brandNameEn ,
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.antItem} label="网址：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                {getFieldDecorator('brandUrl', {
                  initialValue:brand.brandUrl ,
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.antItem} label="服务电话：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                {getFieldDecorator('telePhone', {
                  initialValue:brand.telePhone ,
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem className={styles.antItem} label="品牌LOGO：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                <img className={styles.brandInformationRow} src={ brand.brandLogoUrl } alt={ brand.brandLogoUrl } />
              </FormItem>
              <FormItem className={styles.antItem} label="备注：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                {getFieldDecorator('remark', {
                  initialValue:brand.remark ,
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
              <GetAllCategory />
            </Row>
            <Table
              columns={this.tableColumns}
              dataSource={categoryList}
              pagination={false}
              scroll={{ y: 240 }}
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(BrandEdit);
