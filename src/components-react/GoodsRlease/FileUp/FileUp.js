/**************************
 *@author:FengYan
 *@date:2017/03/02
 *@description：
 *************************/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Upload, Icon, message, Button} from 'jdcloudui';
import BaseComponent from '../../Common/BaseComponent';
import styles from './style/FileUp.css';
import {uploadPrams} from '../redux';

@connect(
  state => ({
    goodsRlease:state.goodsRlease,
    brandSelect:state.brandSelect,
    goodsEdit: state.goodsEdit,
  }),
  dispatch => bindActionCreators({uploadPrams}, dispatch)
)
class FileUp extends BaseComponent {
  constructor() {
    super();
    this.state = {
      upMsg: '',
      visible: true,
      fileAddr: ''
    };
    this.itemPulishVO = '';
    this.fileAddr = [];
  }
  beforeUpload = (file)=> {
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    if(this.itemPulishVO.itemPicpdfManualVoList.length >= 5){
       message.error('最多支持五个附件！');
       return false;
     }else{}
    /*const isPdf = file.type === 'application/pdf';
    const isJpg = (file.type === 'image/jpg' || file.type ==='image/jpeg' || file.type ==='image/png' || file.type ==='image/JPG'|| file.type ==='image/JPEG'|| file.type ==='image/PNG');
    const isDoc = file.type === 'application/msword';
    const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const isXls = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const isXlsx = file.type === 'application/vnd.ms-excel';*/
    const isPdf = true;
    const isJpg = true;
    const isDoc = true;
    const isDocx = true;
    const isXls = true;
    const isXlsx = true;
    if (!(isPdf || isJpg || isDoc || isDocx || isXls || isXlsx)) {
      message.error('只支持PDF、jpg、png、word和excel文档！');
    }else{}
    const isLt5M = true;
    if (!isLt5M) {
      message.error('上传文件不可大于5M！');
    }
    return (isPdf || isJpg || isDoc || isDocx || isXls || isXlsx) && isLt5M;
  };
  handleChange = (info) => {
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    console.log(info.file.status);
    if (info.file.status === 'done') {
      if(info.file.response && +info.file.response.code == 0){
            let url = info.file.response.data;
            let fileNameHref = <a href={url} target="_blank">{info.file.name}</a>;
            this.fileAddr.push(fileNameHref);
            this.setState({
              upMsg: <div style={{color: 'green'}}>文件上传成功！</div>,
              fileAddr: this.fileAddr,
              visible: true,
            });
            //向父级组件返回上传文件url
            //let url = 'JSON.parse(info.file.response.data).pictureURL';
            this.itemPulishVO.itemPicpdfManualVoList.push({
              platformId: 2,
              sellerId: -1,
              shopId: -1,
              picpdfUrl: url,
              picpdfName: info.file.name
            });
            this.props.uploadPrams(this.itemPulishVO);
      }else{
          if(info.file.response && info.file.response.msg){
             message.error(info.file.response.msg);
          }else{
             message.error('上传文件接口出错');
          }
           this.setState({
              upMsg: '',
            });
      }
    } else if (info.file.status === 'uploading') {
      this.setState({
        upMsg: <div>文件上传中...</div>
      })
    }
  };
  getFileAddr(fileAddr){
    let files = [];
    if(fileAddr.length > 0){
        files = fileAddr.map((item, index) => {
        let icons = (<div style = {{minWidth: '100px'}}>
                    <Icon type="paper-clip" className={styles.fileIcon}/>
                          {item}
                       <Icon type="close" className={{marginLeft: '10px'}} onClick={()=>this.removeList(item)}/>
                       {/*<a className={{marginLeft: '10px',display: 'inlineBlock'}} onClick={()=>this.removeList(item)}>删除</a>*/}
                    </div>);
        return icons;
      });
    }else{}
    return files;
  }
  removeList(itemFileAddr) {
    let removeItem = null;
    if(itemFileAddr && itemFileAddr.props && itemFileAddr.props.children){
        removeItem = itemFileAddr.props.children;
    }else{
       removeItem = itemFileAddr;
    }
    let fileAddrArray = [];
    this.fileAddr.map((item, index) => {
      if(item && item.props && item.props.children){
        fileAddrArray.push(item.props.children);
      }else{
        fileAddrArray.push(item);
      }
    });
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO;
    this.setState({
      //visible: false,
      upMsg:''
    });
    //this.props.reUrl('');
    const index = fileAddrArray.indexOf(removeItem);
    if(+index !== -1){
      this.fileAddr.splice(index, 1);
      this.itemPulishVO.itemPicpdfManualVoList.splice(index, 1);
      this.setState({
        fileAddr: this.fileAddr
      });
    }else{}
    this.props.uploadPrams(this.itemPulishVO);
  }
  componentWillMount(){
    if(this.props.goodsEdit && this.props.goodsEdit.editGoods && this.props.goodsEdit.editGoods.itemPicpdfManualVoList){
      this.fileAddr = JSON.parse(JSON.stringify(this.props.goodsEdit.editGoods.itemPicpdfManualVoList));
      if(this.fileAddr.length > 0){
        this.fileAddr.map((item,index)=>{
          this.fileAddr[index] = <a href={item.picpdfUrl} target="_blank">{item.picpdfName}</a>;
        });
      }else{}
    }else{}
    this.props.fileAddr || (
      this.setState({
        visible: false
      })
    )
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
          &nbsp;&nbsp;只支持PDF、jpg、png、word和excel文档，大小5M以内
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
