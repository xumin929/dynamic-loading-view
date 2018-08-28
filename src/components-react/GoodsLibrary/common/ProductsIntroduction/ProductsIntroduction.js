/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       王禹展(wyuzhan@163.com)
 * @description:  基础信息 > 商品介绍设置
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
/* **********  自定义组件  ********** */
import '../../style/table_border.css';
import {setParamete} from '../../parameters_redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(
  state => ({
    params: state.Params,
    libraryGoodsEdit: state.queryLibraryGoodsInfo,
  }),
  dispatch => bindActionCreators({setParamete}, dispatch)
)

class BaseInfomation extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.params = {};
    this.describeUrl = '';
  }

  componentWillMount() {
    this.params = this.props.libraryGoodsEdit.libraryGoodsEditInfo;
    if (this.props.libraryGoodsEdit && this.props.libraryGoodsEdit.libraryGoodsEditInfo) {
      this.describeUrl = this.props.libraryGoodsEdit.libraryGoodsEditInfo.describeUrl;
      this.props.setParamete('describeUrl', this.describeUrl);
    }
  }
  componentDidMount() {
    this.editor = UE.getEditor('editor');
    this.editor.ready(function() {
      if (this.props.libraryGoodsEdit.libraryGoodsEditInfo) {
        this.editor.setContent(this.describeUrl);
      }
    }.bind(this));
    this.editor.addListener('contentChange', function() {
      console.log(this.editor.getContent());
      this.props.setParamete('describeUrl', this.editor.getContent());
      console.log(this.params);
    }.bind(this));
  }

  render() {
    return (
      <div className="mt15">
        <strong className="f-fs14">商品介绍</strong>
        <p className="mt10 mb10">提示：建议上传的图片大小限制为3M，尺寸宽度为960，否则系统会自动压缩和宽度调整可能会使图片失真</p>
        <div id="editor" style={{width: '960px', height: '450px', paddingBottom: '24px'}}></div>
      </div>
    );
  }
}
export default BaseInfomation;
