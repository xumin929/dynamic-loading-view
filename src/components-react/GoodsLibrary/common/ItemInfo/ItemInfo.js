/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180117
 * @update:       20180117
 * @description:  商品信息显示
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
/* **********  自定义组件  ********** */

export default class ItemInfo extends Component {
  constructor(props) {
    super(props);
  }

  /*
   * 生成商品信息
   * 内容返回：商品图片，商品名，商品属性
   * renderImage渲染图片
   * renderName渲染商品名称
   * renderList渲染属性信息
   * */
  renderItemInfo(echo) {
    const img = this.renderImage(echo);
    const name = this.renderName(echo, this.renderList(echo.list));
    return (<div style={{minWidth: '300px', overflow: 'hidden'}}>{img}{name}</div>);
  }

  /*
   * 生成商品图片
   * 根据url信息判断“图片”是否为超链接
   * 根据layout设置显示样式：横向、纵向
   * 设置图片宽、高、引用样式
   * */
  renderImage(echo) {
    let img = '';
    if (echo.url) {
      img = (
        <div className={`${echo.layout === 'inline' && 'f-fl mr10'}`}>
          <a href={echo.url}>
            <img src={echo.picUrl} width={echo.width} height={echo.height} className={echo.className}/>
          </a>
        </div>
      );
    } else {
      img = (
        <div className={`${echo.layout === 'inline' && 'f-fl mr10'}`}>
          <img src={echo.picUrl} width={echo.width} height={echo.height}/>
        </div>
      );
    }
    return img;
  }

  /*
   * 生成商品名称
   * 根据url信息判断“商品名称”是否为超链接
   * 根据layout设置显示样式：横向、纵向
   * 引用renderList返回结果显示属性信息
   * */
  renderName(echo, list) {
    let name = '';
    if (echo.url) {
      name = (
        <div className={`${echo.layout === 'inline' && 'f-fl mr10'}`} style={{width: '72%', overflow: 'hidden',textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
          <a href={echo.url}>{echo.name}</a>
          {list}
        </div>
      );
    } else {
      name = <div className={`${echo.layout === 'inline' && 'f-fl mr10'}`} style={{width: '72%', overflow: 'hidden',textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        {echo.name}{list}
        </div>;
    }
    return name;
  }

  /*
   * 生成属性信息
   * list为数组格式
   * 遍历list生成信息列表
   * */
  renderList(list) {
    if (!list || list.length < 0) return null;
    const listArr = [];
    list.map(_list => {
      listArr.push(<div key={_list}>{_list}</div>);
    });
    return listArr;
  }

  render() {
    return (
      this.renderItemInfo(this.props.echo)
    );
  }
}