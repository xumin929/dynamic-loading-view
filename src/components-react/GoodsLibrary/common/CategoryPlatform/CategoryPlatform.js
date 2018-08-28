/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180119
 * @update:       20180119
 * @description:  平台类目查询
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Select} from 'jdcloudui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const Option = Select.Option;

/* **********  自定义组件  ********** */
import './style/style.css';
/* **********  redux  ********** */
import {getCategoriesByParentIdAction} from '../../../GoodsLibrary/common/CategoryPlatform/redux/category_redux';

@connect(
    state => ({getCategory: state.getCategoriesByParentId}),
    dispatch => bindActionCreators({getCategoriesByParentIdAction}, dispatch)
)
@connect(
    state => ({getCategory: state.getCategoriesByParentId}),
    dispatch => bindActionCreators({getCategoriesByParentIdAction}, dispatch)
)
class CategoryPlatform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: ['', '', '', ''],
      optList: [[], [], [], []],
      n: 0
    };
    this.type = false;
  }

  /*
   * 初始化页面加载方法
   * 发送获取类目请求：一级联动菜单
   * */
  componentWillMount() {
    // 根据parentCategoryId，查询类目列表
    // 默认查询全部，即一级类目
    const params = {};
    params.parentCategoryId = -1;
    this.props.getCategoriesByParentIdAction(params).then(rs => {
      if (rs.code == 0) {
        this.renderOptions(rs.data);
      }
    });
  }

  /*
   * 处理所有props数据变化
   * 接收类目接口返回信息，根据每一级类目联动传入的参数不同返回对应级别的联动数据
   * */
  renderOptions(Data) {
    // 获取接口返回的类目信息
    const optionsArr = [];
    // 生成option列表
    Data.map(_item => {
      optionsArr.push(
        <Option
          key={`${_item.cid}-${_item.parentCid}`}
          value={_item.cid}
          title={_item.categoryName}
        >
          {_item.categoryName}
        </Option>
      );
    });
    // 将生成的option列表封装到对应的联动菜单中
    this.state.optList[this.state.n] = optionsArr;
    this.setState({a: 1});
  }

  /*
   *  select类目联动选择时触发方法
   *  每次select有动作时传入e,n两个参数
   *  e：当前值
   *  n：操作的select联动列表位置
   * */
  handelChange(e, n) {
    // 根据当前选项依顺序清空n+n的联动内容
    this.type = true;
    this.state.values.map((_val, _index) => {
      if (_index >= n) {
        this.state.values[_index] = '';
        this.state.optList[_index + 1] = [];
      }
    });
    // select选择时触发ajax
    // 清空select选择不触发
    if (e) {
      const params = {};
      params.parentCategoryId = e;
      this.props.getCategoriesByParentIdAction(params).then(rs => {
        if (rs.code == 0) {
          let type = false;
          if(rs.data && rs.data.length == 0) {
            type = true;
          }
          // 回调给父级组件选中的值
          this.props.callBack(e, type);
          this.renderOptions(rs.data);
        }
      });
      this.state.values[n] = e;
    } else {
      this.props.callBack();
    }
    this.setState({n: n + 1});
  }

  render() {
    const selectConfig = {
      allowClear: true,
      style: {width: '131px'},
      size: 'large',
      placeholder: '请选择',
      defaultValue: ''
    };
    const cNames = this.type ? null : this.props.cNames ? this.props.cNames.split(',') : null;
    const type = this.props.type == 30;
    return (
      <div>
        {/*  一级联动  */}
        <Select
          {...selectConfig}
          disabled={this.state.optList[0].length === 0 || (type && cNames)}
          onChange={(e) => this.handelChange(e, 0)}
          value={this.state.values[0] || (cNames && cNames[0])}
          className="mr10"
        >
          <Option value=""><span className=" text-ccc">请选择</span></Option>
          {this.state.optList[0]}
        </Select>
        {/*  二级联动  */}
        <Select
          {...selectConfig}
          disabled={this.state.optList[1].length === 0 || (type && cNames)}
          onChange={(e) => this.handelChange(e, 1)}
          value={this.state.values[1] || (cNames && cNames[1]) }
          className="mr10"
        >
          <Option value=""><span className="text-ccc">请选择</span></Option>
          {this.state.optList[1]}
        </Select>
        {/*  三级联动  */}
        <Select
          {...selectConfig}
          disabled={this.state.optList[2].length === 0 || (type && cNames)}
          onChange={(e) => this.handelChange(e, 2)}
          value={this.state.values[2] || (cNames && cNames[2])}
          className="mr10"
        >
          <Option value=""><span className="text-ccc">请选择</span></Option>
          {this.state.optList[2]}
        </Select>
        {/*  四级联动  */}
        <Select
          {...selectConfig}
          disabled={this.state.optList[3].length === 0 || (type && cNames)}
          onChange={(e) => this.handelChange(e, 3)}
          value={this.state.values[3] || (cNames && cNames[3])}
        >
          <Option value=""><span className="text-ccc">请选择</span></Option>
          {this.state.optList[3]}
        </Select>
      </div>
    )
      ;
  }
}

export default CategoryPlatform;
