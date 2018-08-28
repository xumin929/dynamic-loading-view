/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  商品库容器
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
/* **********  自定义组件  ********** */
import * as configs from './components-GoodsLibrary-GoodsLibrary-GoodsLibraryWrap';
const {Grid, Buttons} = configs;
import Searchs from '../common/Search/Search';
import {
    queryItemLibraryListAction as onSearch,
    setSearchHistoryAction as history
} from '../../GoodsLibrary/common/Search/redux/queryItemLibraryList_redux';

@connect(
    state => ({search: state.queryItemLibraryList}),
    dispatch => bindActionCreators({onSearch, history}, dispatch)
)
class GoodsLibraryWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
      dataSource: [],
      key: new Date() + '123'
    };
  }

  /*
   * 渲染操作项
   * 按钮：编辑 | 复制
   * */
  renderAction(row) {
    if (!row) return;
    const edit = <a href=""></a>;
    const copy = <a>复制</a>;
    const actionBtn = `${edit} | ${copy}`
    return actionBtn;
  }

  componentWillMount() {
    // 发送获取商品列表请求
    const params = {
      pageNum: 1,
      pageSize: 1
    };
    this.onSearch(params);
  }

  onSearch = () => {
    const params = this.props.search.searchHistory || {};
    params.pageNum = 1;
    this.props.onSearch(params);
  };

  componentWillReceiveProps(nextProps) {
    // 处理获取商品列表信息
    if (nextProps.search.loaded) {
      const Data = nextProps.search.data;
      // if (Data.code != 0) {
      //   return;
      // }
      this.setState({
        dataSource: Data.data.result,
        pagination: {
          // 列表分页参数设置
          current: Data.data.pageNum,
          pageSize: Data.data.pageSize,
          total: Data.data.totalCount,
          showQuickJumper: true,
          onChange: current => {
            // 分页跳转
            // 获取历史检索记录
            const params = this.props.search.searchHistory || {};
            params.pageNum = current;
            this.props.onSearch(params).then(rs => {
              if (rs.code == 0) {
                // 查询成功后,将新的检索条件存入检索记录
                this.props.history(params);
              }
            });
          }
        }
      });
    }
  }

  /*
 * 查询重置
 * */
  onReset = () => {
    this.setState({key: new Date() + '323'})
  };

  render() {
    return (
      <div>
        {/* ********  检索条件  ******** */}
        <Searchs key={this.state.key} onReset={this.onReset} echo="" />
        {/* ********  按钮组件  ******** */}
        <Buttons/>
        {/* ********  商品列表  ******** */}
        <Grid onSearch={this.onSearch} dataSource={this.state.dataSource} pagination={this.state.pagination}/>
      </div>
    );
  }
}

export default GoodsLibraryWrap;
