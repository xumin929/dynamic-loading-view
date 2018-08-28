/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  商品库
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {JcBreadCrumb} from 'jdcloudecc/components';
/* **********  自定义组件  ********** */
import GoodsLibraryWrap from '../../../components-react/GoodsLibrary/GoodsLibrary/GoodsLibraryWrap';

class GoodsLibrary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menus = [{name: '首页'}, {name: '商品管理'}, {name: '平台商品库管理'}];
    return (
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <JcBreadCrumb menu={menus}/>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">平台商品库管理</div>
          <div className="ui-bd">
            <GoodsLibraryWrap />
          </div>
        </div>
      </div>
    );
  }
}
export default GoodsLibrary;