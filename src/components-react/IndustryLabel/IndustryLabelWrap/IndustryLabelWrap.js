/**
 * Created by huangxiao3 on 2017/5/23.
 */
import React, {Component} from 'react';
import { Breadcrumb } from 'jdcloudui';
import IndustryLabelSearch from '../IndustryLabelSearch/IndustryLabelSearch';
import IndustryLabelList from '../IndustryLabelList/IndustryLabelList';

const pageSize = 10;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {industryLabelSearch, saveFormData,industryLabelDelete} from './redux';

@connect(
  state => ({IndustryLabelWrap:state.industryLabelWrap}),
  dispatch => bindActionCreators({industryLabelSearch, saveFormData,industryLabelDelete}, dispatch)
)
export default class IndustryLabelWrap extends Component {

  render() {
    return(
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">商品管理</a></Breadcrumb.Item>
            <Breadcrumb.Item>行业标签管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">行业标签管理</div>
          <div className="ui-bd" style={{padding:'16px 16px 50px 16px'}} >
            <IndustryLabelSearch
              onSearch={this.props.industryLabelSearch}
              onSave={this.props.saveFormData}
              pageSize={pageSize}
            />
            <div style={{marginTop:'20px'}}>
              <IndustryLabelList
                onSearch={this.props.industryLabelSearch}
                dataSource={this.props.IndustryLabelWrap}
                onDelete={this.props.industryLabelDelete}
                pageSize={pageSize}
              />
            </div>
          </div>
        </div>
      </div>

    )
  }

}