import React, {Component} from 'react';
import styles from './style/brandUpload.less';
import { Button, Tabs, Table,	 Modal } from 'jdcloudui';
const TabPane = Tabs.TabPane;
const columns = [{
  title: '分类名称',
  dataIndex: 'name',
  width: 150,
}, {
  title: '父级分类ID',
  dataIndex: 'parentSortId',
  width: 150,
}, {
  title: '失败原因',
  dataIndex: 'cause',
}];
const data = [];
for (let num = 0; num < 30; num++) {
  data.push({
    name: `手机 ${num}`,
    parentSortId: `id ${num}`,
    cause: `失败原因 ${num}`,
  });
}

class BrandUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false};
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  getInitialState() {
    return { visible: false };
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleCancel(evevt) {
    console.log(evevt);
    this.setState({
      visible: false,
    });
  }
  handleOk() {
    console.log('click ok');
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
		<div id={styles.brandUpload}>
			<Tabs>
				<TabPane tab="上传品牌" key="1">
					<p className={styles.tabCont}>批量品牌导入模板下载&nbsp;
						<Button type="primary">下载模板</Button>
					</p>
	    		<p className={styles.tabCont}>将填写好的模板上传，每个模板最多支持1000行&nbsp;
	    			<Button type="primary" onClick={this.showModal}>点我上传</Button>
	    		</p>
				</TabPane>
				<TabPane tab="上传分类" key="2">
					<p className={styles.tabCont}>批量分类导入模板下载&nbsp;
						<Button type="primary">下载模板</Button>
					</p>
	    		<p className={styles.tabCont}>将填写好的模板上传，每个模板最多支持1000行&nbsp;
	    			<Button type="primary"	onClick={this.showModal}>点我上传</Button>
	    		</p>
				</TabPane>
			</Tabs>
			<Modal
				title="上传提示"
				visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
      	<div className={styles.hintSuccess}>
      		已上传成功<span className={styles.textGreen}>100</span>条数据&nbsp;&nbsp;
					失败<span className={styles.textRed}>20</span>条数据
      	</div>
      	<div className={styles.hintTitle}>
					<strong>传输失败列表</strong>
      	</div>
      	<Table
      		columns={columns}
	      	dataSource={data}
	      	scroll={{ y: 170 }}
	      	pagination={false}
				/>
      </Modal>
		</div>
      );
  }
}

export default BrandUpload;
