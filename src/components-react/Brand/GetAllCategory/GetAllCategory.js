/****************************************************************
 * author:FengYan
 * date:2017-02-13
 * description:GetAllCategory
 * childComponents:GetAllCategory
 ****************************************************************/
import React, {Component} from 'react';
import {Table, Modal, Row, Col, Input, Button, Tree, Popover, Spin} from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

/* 自定义组件调用 */
import BaseComponent from '../../Common/BaseComponent';
import {GetAllCategoryAction} from './redux';
import styles from './style/category.less';
/* 权限控制 */
import {FuncPermission}  from 'jdcloudecc/components';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
import {BrandDetailAction} from '../BrandList/redux/BrandDetailRedux';

@connect(
  state => ({category: state.getAllCategory, BrandDetails: state.BrandDetail,}),
  dispatch => bindActionCreators({GetAllCategoryAction, BrandDetailAction}, dispatch)
)
class GetAllCategory extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      popover: false,
      treeList: [],
      autoExpandParent: true,
      checkCategoryList: [],
      cids: [],
      reList: [],
      gData: [],
      searchValue: Math.random(),
      searchList: [],
    };
    this.checkedKeys = [];
    this.expandedKeys = [];
    this.UltimateNodes = [];
  }

  popoverShow() {
    //显示类目列表
    this.setState({
      popover: true
    });
  }

  categoryHide() {
    // 隐藏类目列表
    this.setState({
      popover: false,
    });
  }

  onChange(e) {
    // 设置搜索条件
    const value = e.target.value;
    const searchList = [];
    // 遍历
    this.state.treeList.map(_item => {
      // 改变数据格式为字符串，通过getCategoryName方法返回某一条的全部categoryname名称
      const catagoryNames = this.getCategoryName(JSON.stringify(_item))
      // 通过catagoryNames查找检索条件是否存在某一条数据中
      if (catagoryNames.indexOf(value) >= 0) {
        // 将条例检索条件的数据装入searchList中进行回显
        searchList.push(_item);
        this.setState({
          searchList: searchList
        })
      }
    })
  }

  getCategoryName(_item) {
    // 传进来的数据已经进行了转字符串处理
    // 设定过滤规则（要获取的内容）
    const cte = 'categoryName:';
    // 将数据进行转数据处理
    const dataList = _item.split(",");
    // 定义要返回的变量
    let name = "";
    // 遍历数组，找到categoryName
    dataList.map(_list => {
      // 通过正则去掉双引号"
      const repList = _list.replace(/"/g, '');
      if (repList.indexOf(cte) >= 0) {
        // 组装categoryName名称
        name += repList.substr(repList.indexOf(':') + 1);
      }
    })
    return name;
  }

  onExpand(e) {
    // this.expandedKeys = e;
    this.setState({
      autoExpandParent: false
    })
  }

  searchList() {

  }

  treeLoop(item) {
    // 生成类目树
    if (!item) return;
    return item.map((_list, _index) => {
      let name = '';
      name = <span>{_list.categoryName}</span>
      // 判断是否有子类，进行递归
      if (_list.children) {
        return (
          <TreeNode
            key={_list.key}
            title={name}>
            {this.treeLoop(_list.children)}
          </TreeNode>
        )
      }
      // 终级节点push到数组里，回显用
      this.UltimateNodes.push(_list);
      return (
        <TreeNode
          key={_list.cid}
          title={name}
        />
      )
    })
  }

  onCheck(e) {
    // 复选框选择
    this.setState({
      cids: e,
    });
  }

  categoryLinkOn() {
    if(this.state.cids.length===0) {
      this.categoryHide();
      return;
    }
    // 获取cid对应的key，即最终子节点的key值，封入categoryKeyArr数组，下一步拼接成json数据
    const categoryKeyArr = [];
    const categoryKey = (data, cid) => {
      data.map(_list => {
        if (_list.children) categoryKey(_list.children, cid);
        if (_list.cid == cid) return categoryKeyArr.push(_list.key);
      });
    };
    this.state.cids.map(_cid => {
      categoryKey(this.state.treeList, _cid);
    });
    // 根据上一步获取的key进行遍历，组成类目列表数据{lev1:*,lev2:*,lev3:*,lev4:*}
    let categoryObj = {};
    const categoryArr = [];
    const categoryCids = [];
    const categoryCid = (data, key) => {
      data.map(_list => {
        if (key.substr(0, _list.key.length) == _list.key) {
          // 防止与lev1的key重复，出现错误数据
          if (_list.lev == 1 && parseInt(key) != _list.key) return;
          categoryObj[`lev${_list.lev}`] = _list.categoryName;
          if (_list.children) return categoryCid(_list.children, key);
          // 存储cid，一维数组
          categoryCids.push(_list.cid);
          // 存储类目列表，json格式
          categoryArr.push(categoryObj);
          // 每个类目完结后清除临时对象
          categoryObj = {};
        }
      });
    };
    categoryKeyArr.map(_key => {
      categoryCid(this.state.treeList, _key);
    });
    console.log(categoryArr)
    // 回调，向父组件传递类目表格数据，终级类目cid
    this.props.tableList(categoryArr, categoryCids);
    // 关闭类目关联弹层
    this.categoryHide();
  }

  componentDidMount() {
    // 新建品牌类目有时不出现，因此用空请求激活
    this.props.tableList([], []);
  }

  componentWillReceiveProps(nextProps) {
    const reList = [];
    if (nextProps.categoryList) {
      // 编辑状态下数据回显（复选框勾选）
      nextProps.categoryList.map(_item => {
        if (_item.fourthLevCid) {
          reList.push(_item.fourthLevCid)
          return;
        }
        if (_item.thirdLevCid) {
          reList.push(_item.thirdLevCid)
          return;
        }
        if (_item.secondLevCid) {
          reList.push(_item.secondLevCid)
          return;
        }
        if (_item.firstLevCid) {
          reList.push(_item.firstLevCid)
          return;
        }
      });
    }
    if (nextProps.category.loaded) {
      if (nextProps.category.data.code != 0) return;
      const data = nextProps.category.data.data;
      this.setState({
        treeList: data
      });
    }
    reList.map(_list => {
      this.checkedKeys.push(_list.toString());
    });
    this.setState({reList: reList});
  }

  test(e) {
    /*
     类目检索预留
     title={
     <Search
     style={{width: 300}}
     placeholder="输入类目名进行检索"
     onChange={this.onChange.bind(this)}
     onSearch={(e) => this.test(e)}
     />
     }
     */
  }

  render() {
    const categoryList = this.state.searchList.length === 0 ? this.state.treeList : this.state.searchList;
    return (
      <div className={styles.div} id='div'>
        <Popover
          placement="bottom"
          content={
            <div>
              {this.props.category.loading && <div className="f-tac mt10"><Spin tip="数据加载中..."/></div>}
              <Tree
                checkable
                className={styles.treeWidth}
                autoExpandParent={this.state.autoExpandParent}
                onExpand={this.onExpand.bind(this)}
                onCheck={this.onCheck.bind(this)}
                defaultCheckedKeys={this.checkedKeys}
                // expandedKeys={this.expandedKeys}
              >
                {this.treeLoop(categoryList)}
              </Tree>
              <div className={styles.textCenter}>
                <Button type="primary" onClick={() => this.categoryLinkOn()}>关联</Button>&nbsp;&nbsp;
                <Button onClick={() => this.categoryHide()}>取消</Button>
              </div>
            </div>
          }
          className={styles.textCenter}
          visible={this.state.popover}
          onCancel={() => this.categoryHide()}
          getPopupContainer={() => document.getElementById('div')}
        >
          <FuncPermission code="linkNewCategory" codes={this.props.codesResponse}>
            <Button type="ghost" onClick={this.popoverShow.bind(this)}>关联新类目</Button>
          </FuncPermission>
        </Popover>
      </div>
    )
  }
}

export default GetAllCategory;

