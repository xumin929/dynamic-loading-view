/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  商品库容器
 * *********************************************/
/* **********  系统组件  ********** */
import React from 'react';
/* **********  自定义组件  ********** */

import G from '../../../components-react/GoodsLibrary/common/Grid/Grid';
import B from '../../../components-react/GoodsLibrary/common/Buttons/Buttons';
import {isEmpty} from '../../../components-react/GoodsLibrary/common/Tools';
import ItemInfo from '../../../components-react/GoodsLibrary/common/ItemInfo/ItemInfo';
import ItemCopy from '../../../components-react/GoodsLibrary/common/ItemCopy/ItemCopy';


class Grid extends G {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '商品库编码',
        dataIndex: 'id',
        key: (val, row) => row.modified,
        render: (val, row) => this.renderGoodsStatus(row),
        width: '10%'
      },
      {title: '商品信息', dataIndex: 'itemName', render: (val, row) => this.renderItemInfo(row)},
      {title: '发布时间', dataIndex: 'publishTime', render: val => isEmpty(val), width: '15%'},
      {title: '平台类目', dataIndex: 'cname1', width: '30%', render: (val, row) => this.renderCategorys(row)},
      {title: '发布者', dataIndex: 'publishName', render: val => isEmpty(val), width: '10%'},
      {title: '操作', dataIndex: 'id', render: (val, row, index) => this.renderAction(row), width: '10%'}
    ];
  }

  renderItemInfo(row) {
    const itemEcho = {
      picUrl: row.pictureUrl,
      name: row.itemName,
      url: '',
      width: '60',
      height: '60',
      layout: 'inline',
      list: [],
      className: ''
    };
    return <ItemInfo echo={itemEcho}/>;
  }

  renderGoodsStatus(row) {
    if (row.storeStatus == 10) return '（复制）';
    if (row.storeStatus != 30) return '（草稿）';
    return row.id;
  }

  renderAction(row) {
    let copyBtn = '';
    let editBtn = '';
    let editUrl = '/operating-item-view/goodslibrary/edit-library?itemId=' + row.id;

    editBtn = <a href={editUrl} className="ml10 mr10">编辑</a>;
    if (row.storeStatus && row.storeStatus == 30) {
      copyBtn = <ItemCopy itemId={row.id} onSearch={this.props.onSearch} />;
    }
    return <div>{editBtn}{copyBtn}</div>;
  }

  renderCategorys(row) {
    const categorys = [];
    if (row.cname1) categorys.push(row.cname1);
    if (row.cname2) categorys.push(row.cname2);
    if (row.cname3) categorys.push(row.cname3);
    if (row.cname4) categorys.push(row.cname4);
    return categorys.join('--');
  }
}
class Buttons extends B {
  constructor(props) {
    super(props);
    this.buttonArr = [
      {title: '发布商品', type: 'primary', icon: 'plus', href: '/operating-item-view/goodslibrary/add-library'}
    ];
  }
}
export {Grid, Buttons};
