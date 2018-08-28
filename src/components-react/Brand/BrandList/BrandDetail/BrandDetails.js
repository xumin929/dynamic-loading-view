/****************************************************************
 * author:FengYan
 * date:2017-02-13
 * update:2017-02-19
 * description:brand detail view
 ****************************************************************/
import React, {Component} from 'react';
import { Table, Modal, Row, Col, Input, Button, Form, Pagination } from 'jdcloudui';
const FormItem = Form.Item;
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

/*********  自定义组件调用  *********/
import styles from '../style/BrandList.less';
import table from '../style/table.css';

class BrandDetails extends Component {
  constructor(props) {
    super(props);
    this.tableColumns = [{
      title: '一级类目',
      dataIndex: 'firstLevName',
      width: '25%'
    }, {
      title: '二级类目',
      dataIndex: 'secondLevName',
      width: '25%'
    }, {
      title: '三级类目',
      dataIndex: 'thirdLevName',
      width: '25%'
    }, {
      title: '四级类目',
      dataIndex: 'fourthLevName',
      width: '25%'
    }]

  }
render() {
  const { brand, categoryList } = this.props.detail;
  return (
    <Row>
      <Col span={12}>
        <Row className={styles.brandInformation}>
          <Row>
            <Col><strong>品牌信息</strong></Col>
          </Row>
          <FormItem className={styles.antItem} label="品牌中文名：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            { brand.brandNameCh }
          </FormItem>
          <FormItem className={styles.antItem} label="品牌英文名：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
            { brand.brandNameEn }
          </FormItem>
          <FormItem className={styles.antItem} label="网址：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
            { brand.brandUrl }
          </FormItem>
          <FormItem className={styles.antItem} label="服务电话：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
            { brand.telePhone }
          </FormItem>
          <FormItem className={styles.antItem} label="品牌LOGO：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
            <img className={styles.brandInformationRow} src={ brand.brandLogoUrl } alt={ brand.brandLogoUrl } />
          </FormItem>
          <FormItem className={styles.antItem} label="备注：" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
            { brand.remark }
          </FormItem>
        </Row>
      </Col>
      <Col span={12}>
        <Row>
          <Col><strong>类目信息</strong></Col>
        </Row>
        <Table
          columns={this.tableColumns}
          dataSource={categoryList}
          pagination={false}
          scroll={{ y: 250 }}
          loading={this.props.loading}
          className="tableBorder"
        />
      </Col>
    </Row>
  );
}
}

export default BrandDetails;
