/****************************************************************
 * author:liupeng
 * date:2017-02-20
 * description:产品发布-图片介绍
 ****************************************************************/

import React, { Component } from 'react';
import styles from './style/imageupload.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGoodsInfo,uploadPrams} from './redux';
@connect(
  state => ({
    goodsRlease:state.goodsRlease,
    goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({getGoodsInfo,uploadPrams}, dispatch)
)

export default class GoodsIntroduction extends Component {
  constructor(props, context) {
    super(props, context);
    this.editor = null;
    this.itemPulishVO =[];
  }
  componentWillMount() {
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    if(this.props.editGoods){
      this.describeUrl = this.props.goodsEdit.editGoods.describeUrl;
    }
  }
  componentDidMount(){
    // this.editor = new UE.ui.Editor();
    // this.editor.render('editor');
    this.editor=UE.getEditor('editor');
    this.editor.ready(function(){
      if(this.props.editGoods){
        this.editor.setContent(this.describeUrl);
      }
    }.bind(this))
    this.editor.addListener("contentChange", function () {
      console.log(this.editor.getContent())
      this.itemPulishVO.describeUrl = this.editor.getContent();
      this.props.uploadPrams(this.itemPulishVO);
      console.log(this.itemPulishVO)
    }.bind(this));
  }
  render() {
    return (
      <div style = {{borderBottom: '1px solid #e9e9e9' , paddingBottom: '20px', background: 'white',paddingLeft: '16px',}} >
        <strong className={styles.picturesku}>商品介绍</strong>
          <p className={styles.pictip}>提示：建议上传的图片大小限制为3M，尺寸宽度为960，否则系统会自动压缩和宽度调整可能会使图片失真</p>
        <div id="editor"  style={{width:'960px', height:'450px',paddingBottom: '24px'}} ></div>
      </div>
    )
  }
}
