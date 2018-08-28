/**************************
 *@author:wangyuzhan
 *@date:2018/03/14
 *@description：
 *************************/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Upload, Icon, message, Button} from 'jdcloudui';
import BaseComponent from '../../../Common/BaseComponent';
import styles from './style/FileUp.css';
import {setParamete} from '../../parameters_redux';

@connect(
  state => ({
    params: state.Params,
    libraryGoodsEdit: state.queryLibraryGoodsInfo,
  }),
  dispatch => bindActionCreators({setParamete}, dispatch)
)
class FileUp extends BaseComponent {
  constructor() {
    super();
    this.state = {
      upMsg: '',
      visible: true,
      fileAddr: ''
    };
    this.params = {};
    this.annexs = [];
    // 附件
    this.fileAddr = [];
  }

  componentWillMount() {
    if (this.props.libraryGoodsEdit && this.props.libraryGoodsEdit.libraryGoodsEditInfo) {
      this.params = this.props.libraryGoodsEdit.libraryGoodsEditInfo;
      if (this.props.libraryGoodsEdit.libraryGoodsEditInfo.annexs) {
        this.annexs = eval(this.props.libraryGoodsEdit.libraryGoodsEditInfo.annexs);
        if (this.annexs.length > 0) {
          this.annexs.map((item, index)=>{
            this.fileAddr[index] = <a href={item.url} target="_blank">{item.name}</a>;
          });
        }
        this.props.setParamete('annexs', this.props.libraryGoodsEdit.libraryGoodsEditInfo.annexs);
      }
    }
    if (this.fileAddr) {
      this.setState({
        fileAddr: this.fileAddr,
        visible: true
      });
    }else {
      this.setState({
        visible: false
      });
    }
  }

  beforeUpload = (file)=> {
    if (this.fileAddr.length >= 5) {
      message.error('最多支持五个附件！');
      return false;
    }
    const isPdf = true;
    const isJpg = true;
    const isDoc = true;
    const isDocx = true;
    const isXls = true;
    const isXlsx = true;
    if (!(isPdf || isJpg || isDoc || isDocx || isXls || isXlsx)) {
      message.error('只支持PDF、jpg、png、word和excel文档！');
    }
    const isLt5M = true;
    if (!isLt5M) {
      message.error('上传文件不可大于5M！');
    }
    return (isPdf || isJpg || isDoc || isDocx || isXls || isXlsx) && isLt5M;
  };
  handleChange = (info) => {
    console.log(info.file.status);
    if (info.file.status === 'done') {
      if (info.file.response && +info.file.response.code === 0) {
        let url = info.file.response.data;
        let fileNameHref = <a href={url} target="_blank">{info.file.name}</a>;
        this.fileAddr.push(fileNameHref);
        this.setState({
          upMsg: <div style={{color: 'green'}}>文件上传成功！</div>,
          fileAddr: this.fileAddr,
          visible: true,
        });
            // 向父级组件返回上传文件url
            // let url = 'JSON.parse(info.file.response.data).pictureURL';
        this.annexs.push({
          url: url,
          name: info.file.name
        });
        this.params.annexs = JSON.stringify(this.annexs);
        this.props.setParamete('annexs', this.params.annexs);
      }else {
        if (info.file.response && info.file.response.msg) {
          message.error(info.file.response.msg);
        }else {
          message.error('上传文件接口出错');
        }
        this.setState({
          upMsg: '',
        });
      }
    } else if (info.file.status === 'uploading') {
      this.setState({
        upMsg: <div>文件上传中...</div>
      });
    }
  };
  getFileAddr(fileAddr) {
    let files = [];
    if (fileAddr.length > 0) {
      files = fileAddr.map((item, index) => {
        let icons = (<div style = {{minWidth: '100px'}}>
                    <Icon type="paper-clip" className={styles.fileIcon}/>
                          {item}
                       <Icon type="close" className={{marginLeft: '10px'}} onClick={()=>this.removeList(item)}/>
                       {/*<a className={{marginLeft: '10px',display: 'inlineBlock'}} onClick={()=>this.removeList(item)}>删除</a>*/}
                    </div>);
        return icons;
      });
    }
    return files;
  }
  removeList(itemFileAddr) {
    let removeItem = null;
    if (itemFileAddr && itemFileAddr.props && itemFileAddr.props.children) {
      removeItem = itemFileAddr.props.children;
    }else {
      removeItem = itemFileAddr;
    }
    let fileAddrArray = [];
    this.fileAddr.map((item, index) => {
      if (item && item.props && item.props.children) {
        fileAddrArray.push(item.props.children);
      }else {
        fileAddrArray.push(item);
      }
    });
    // this.params = this.props.params;
    this.setState({
      //visible: false,
      upMsg:''
    });
    //this.props.reUrl('');
    const index = fileAddrArray.indexOf(removeItem);
    if (+index !== -1) {
      this.fileAddr.splice(index, 1);
      this.annexs.splice(index, 1);
      this.setState({
        fileAddr: this.fileAddr
      });
    }
    //  再将数组重新转换回json
    this.params.annexs = JSON.stringify(this.annexs);
    this.props.setParamete('annexs', this.params.annexs);
  }

  render() {
    const fileAddr = this.state.fileAddr || this.props.fileAddr;
    return (
      <div>
        <Upload
          name="file"
          action="/proxy/base/upload/uploadFileLimit"
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          data={{platformId: 2}}
          //accept="application/pdf/jpg/png/doc/docx"
          showUploadList={false}
          id = 'lUpload'
          style = {{display:'block'}}
        >
          <Button>
            <Icon type="upload"/> 添加附件
          </Button>
        </Upload>
        {this.state.visible && (
          <div className={styles.fileList} style = {{minWidth: '200px'}}>
           {this.getFileAddr(fileAddr)}
          </div>)
        }
        {this.state.upMsg}
      </div>
    );
  }
}

export default FileUp;
