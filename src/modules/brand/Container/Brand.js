/****************************************************************
 * author:FengYan
 * date:2017-02-16
 * description:Brand
 ****************************************************************/
import React, {Component} from 'react';
import BrandListWrapper from '../../../components-react/Brand/BrandList/BrandListWrapper'
import BrandSearch from '../../../components-react/Brand/BrandSearch/BrandSearch'
import {Breadcrumb} from 'jdcloudui';

/* 自定义组件调用 */
import {connect} from 'react-redux';

@connect(
  state => ({viewBrandList: state.brandSearch}),
)
class Brand extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      brandSearch: this
    };
  }

  childComponentCallback(_this) {
    this.setState({
      brandSearch: _this
    });
  }

  refreshView() {
    this.state.brandSearch.resetSubmit();
  }

  render() {
    return (
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>品牌管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">品牌管理</div>
          <div className="ui-bd">
            <BrandSearch childComponentCallback={this.childComponentCallback.bind(this)}/>
            <div className="mt15">
              <BrandListWrapper />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Brand;
