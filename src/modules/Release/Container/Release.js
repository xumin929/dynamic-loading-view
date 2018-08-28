/**
 * type :
 * "0": (运营平台：平台商品库管理 发布、编辑),
 * "1": (运营平台：商品库管理/商品发布、编辑),
 * "2": (供应商),
 * "3": (店铺)
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Spin } from 'jdcloudui';
import Loadable from 'react-loadable';
import { provideHooks } from 'redial';
import { getDomain } from './redux';

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.pastDelay) {
      return <div style={{ 'height':'800px', 'paddingTop': '200px', 'textAlign': 'center'}}><Spin size="large" /></div>;
  } else {
    return null;
  }
}
@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(getDomain()).catch(() => null);
    console.log("get data async from server")
  }
})
@connect(state => ({domain: state.domain}), {})
export default class Release extends Component {
  constructor(props, context) {
    super(props, context);
    this.state={
      ViewWrapCom:null
    };
  }
  componentDidMount(){
    const ViewWrapCom = this.loadInstance();
    this.setState({
      ViewWrapCom: ViewWrapCom
    });
  }
  loadInstance(components) {
    var Ins = Loadable({
      loader: () => import('../../../components-react/ReleaseViewWrap/v1.0.0/view/index').then(object => object.default),
      loading: Loading,
      delay: 300,
      render(Component) {
        // type区分页面
        return <Component type='1' />;
      }
    });

    return Ins;
  }
  render() {
    let { ViewWrapCom } = this.state;
    return (
      <div className="ui-container ui-shop">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item >首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>商品发布</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">商品发布</div>
          <div className="ui-bd">
            {
              ViewWrapCom?<ViewWrapCom />:null
            }

          </div>
        </div>
      </div>
    );
  }
}
