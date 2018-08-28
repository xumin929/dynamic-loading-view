/**
 * @author chenyanhua
 * @date 2018-08-06
 * @file 发布商品-商品介绍 Tab组件
 * 运营平台/店铺/供应商 用的该组件代码都一样
 * 除static下的ueditor文件不一样
 */
import React, { Component } from 'react';
import './index.css';
export default class ReleaseGoodsDesc extends Component {
  constructor(props){
    super(props);
    this.editor = null;
  }
  
  componentDidMount(){
    this.editor=UE.getEditor('editor');    
    this.editor.ready(function(){
      const describeUrl = this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.describeUrl || '';
      this.editor.setContent(describeUrl);
    }.bind(this));
    this.editor.addListener("contentChange", function () {
      let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
      itemTmplPublishVo.describeUrl = this.editor.getContent();
      this.props.updateItemTmplAction(itemTmplPublishVo);
    }.bind(this));
  }
  render() {
    return (
      <div>
        <p className='mt10 mb10 descTips'>提示：建议上传的图片大小限制为3M，尺寸宽度为960，否则系统会自动压缩和宽度调整可能会使图片失真</p>
        <div id="editor" style={{maxWidth:'960px', width:'100%', height:'450px',paddingBottom: '24px'}} ></div>
      </div>
    );
  }
}
