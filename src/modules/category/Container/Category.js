/**
 * Created by songshuangwang on 2017/1/19.
 * 类目管理
 */
import React from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import CategoryGrid from '../../../components-react/Category/CategoryGrid/CategoryGrid';
import BaseComponent from '../../../components-react/Common/BaseComponent';
import {Breadcrumb } from 'jdcloudui';

@connect(() => ({}), {initialize})
export default class Category extends BaseComponent {
  constructor(props,context) {
    super(props,context);
  }

  render() {
    return (
      <div className="ui-container">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">商品管理</a></Breadcrumb.Item>
            <Breadcrumb.Item>类目管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">类目管理</div>
          <div className="ui-bd">
            <CategoryGrid/>
          </div>
        </div>
      </div>
    );
  }
}

