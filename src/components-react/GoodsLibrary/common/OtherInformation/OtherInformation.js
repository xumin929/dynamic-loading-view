/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       王禹展(wyuzhan@163.com)
 * @description:  基础信息 > 其它设置 > 其它信息
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Input} from 'jdcloudui';
import {connect} from 'react-redux';
import {setParamete} from '../../parameters_redux';

import {bindActionCreators} from 'redux';
import FileUp from '../FileUp/FileUp';
const {TextArea} = Input;

/* **********  自定义组件  ********** */
@connect(
  state => ({
    params: state.Params,
    libraryGoodsEdit: state.queryLibraryGoodsInfo,
  }),
  dispatch => bindActionCreators({setParamete}, dispatch)
)
class FreightInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileAddr: []
    };
    this.params = {};
    this.annexs = [];
  }

  componentWillMount() {
    if(this.props.libraryGoodsEdit && this.props.libraryGoodsEdit.libraryGoodsEditInfo){
      this.params = this.props.libraryGoodsEdit.libraryGoodsEditInfo;
      if (this.params.annexs) {
        this.annexs = eval(this.params.annexs);
        this.props.setParamete('annexs', this.params.annexs);
      }
      if (this.params.packingList) {
        this.props.setParamete('packingList', this.params.packingList);
      }
      this.getFileAddr();
    }
  }
  getFileAddr() {
    let fileAddr = [];
    if (this.annexs.length > 0) {
      this.annexs.map((item, index) => {
        fileAddr.push(<a href={item.url} target="_blank">{item.name}</a>);
      });
    }
    this.setState({
      fileAddr: fileAddr
    });
  }

  changeArear(e) {
    console.log(e.target.value, 'changeArear');
    this.props.setParamete('packingList', e.target.value);
  }
  render() {
    return (
      <div className="mt15">
        <strong className="f-fs14">其它信息</strong>
        <div className="jc-spin-container mt10">
          <span className="text-999 f-fl">包装清单：</span>
          <div className="f-fl" style={{width: '50%'}}>
            <TextArea defaultValue={this.props.libraryGoodsEdit.libraryGoodsEditInfo ? this.props.libraryGoodsEdit.libraryGoodsEditInfo.packingList : ''} onChange={::this.changeArear} rows={4} style={{resize: 'none'}}/>
          </div>
        </div>
        <div className="mt10">
          <span className="text-999">商品手册：</span>
          只支持PDF、jpg、png、word和excel文档，大小5M以内
          {!this.props.editStatus && <FileUp></FileUp>}
          {this.props.editStatus &&
          this.props.libraryGoodsEdit
          && this.props.libraryGoodsEdit.libraryGoodsEditInfo
          && this.props.libraryGoodsEdit.libraryGoodsEditInfo.annexs
          && <FileUp fileAddr={this.state.fileAddr}></FileUp>}
        </div>
      </div>
    );
  }
}
export default FreightInfo;
