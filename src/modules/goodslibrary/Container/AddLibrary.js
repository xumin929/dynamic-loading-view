/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  商品发布
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {JcBreadCrumb} from 'jdcloudecc/components';
/* **********  自定义组件  ********** */
import AddLibraryWrap from '../../../components-react/GoodsLibrary/AddLibrary/AddLibraryWrap';


import {getDomain} from 'jdcloudecc/reducer/domain';
import {provideHooks} from "redial";
@provideHooks({
    fetch: async ({ store: { dispatch, getState } }) => {
        await dispatch(getDomain()).catch(() => null);
        console.log("get data async from server")
    }
})
class AddLibrary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menus = [{name: '首页'}, {name: '商品管理'}, {name: '商品发布'}];
    return (
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <JcBreadCrumb menu={menus}/>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">商品发布</div>
          <div className="ui-bd">
            <AddLibraryWrap />
          </div>
        </div>
      </div>
    );
  }
}
export default AddLibrary;
