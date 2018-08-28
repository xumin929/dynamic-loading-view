/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  公共表格组件
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Table} from 'jdcloudui';
/* **********  自定义组件  ********** */
import '../../style/table_border.css';

class Grid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table
        className="mt10 tableBorder"
        columns={this.columns}
        dataSource={this.props.dataSource}
        pagination={this.props.pagination}
      />
    );
  }
}
export default Grid;
