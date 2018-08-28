/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  公共检索组件
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Select} from 'jdcloudui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const Option = Select.Option;

/* **********  自定义组件  ********** */
import Prom, {queryPromulgatorAction} from './redux';
/* **********  redux  ********** */
@connect(
  state => ({Prom: state.Prom}),
  dispatch => bindActionCreators({queryPromulgatorAction}, dispatch)
)

export default class Promulgator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsArr: []
    };
  }

  componentWillMount() {
    this.props.queryPromulgatorAction().then(rs => {
      if (rs.code == 0) {
        this.renderOptions(rs.data);
      }
    });
  }

  renderOptions(data) {
    const optionsArr = [];
    data.map(_item => {
      optionsArr.push(
        <Option key={_item.id} title={_item.username}>{_item.username || '无名氏'}</Option>
      );
    });
    this.setState({optionsArr});
  }

  render() {
    return (
      <Select style={{width: '120px'}} {...this.props}>
        <Option key="0">全部</Option>
        {this.state.optionsArr}
      </Select>
    );
  }
}
