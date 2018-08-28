/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       王禹展(wyuzhan@163.com)
 * @description:  商品编辑
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {JcBreadCrumb, Loading} from 'jdcloudecc/components';
/* **********  自定义组件  ********** */
import {getDomain} from 'jdcloudecc/reducer/domain';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddLibraryWrap from '../../../components-react/GoodsLibrary/AddLibrary/AddLibraryWrap';
import {queryLibraryGoodsAction} from './edit_redux';
import {setParameteAll} from '../../../components-react/GoodsLibrary/parameters_redux';
import {provideHooks} from "redial";

@provideHooks({
    fetch: async ({ store: { dispatch, getState } }) => {
        await dispatch(getDomain()).catch(() => null);
        console.log("get data async from server")
    }
})
@connect(
  state => ({
    libraryGoodsEdit: state.queryLibraryGoodsInfo
  }),
  dispatch => bindActionCreators({queryLibraryGoodsAction, setParameteAll}, dispatch)
)
class EditLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    }
  }

  componentDidMount() {
    this.location = typeof window !== 'undefined' ? window.location.href : '';
    let itemId = this.getUrlParam(this.location, 'itemId');
    let type = this.getUrlParam(this.location, 'type');
    let param = {
      platformId: 2,
      itemId: itemId
    };
    this.props.queryLibraryGoodsAction(param,type).then(
      (result)=>{
        if(result.code == 0) {
          this.setState({
            flag: true
          });
          this.props.setParameteAll(result.data || {});
          //console.log(result);
        }
      });

    console.log(this.props.libraryGoodsEdit);
  }


  getUrlParam(url, name){
    var pattern = new RegExp('[?&]' + name + '\=([^&]+)', 'g');
    var matcher = pattern.exec(url);
    var items = null;
    if (matcher !== null) {
      try {
        items = decodeURIComponent(decodeURIComponent(matcher[1]));
      }
      catch (e) {
        try {
          items = decodeURIComponent(matcher[1]);
        }
        catch (e) {
          items = matcher[1];
        }
      }
    }
    return items;
  }

  render() {
    let {flag} = this.state;
    return (
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <JcBreadCrumb menu={menus}/>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">商品编辑</div>
          <div className="ui-bd">
            <Loading loaded = {flag}> </Loading>
            {
              flag ? <AddLibraryWrap /> : <div style={{height: 500}}>{''}</div>
            }
          </div>
        </div>
      </div>
    );
    const menus = [{name: '首页'}, {name: '商品管理'}, {name: '商品编辑'}];
  }
}
export default EditLibrary;
