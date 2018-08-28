/**
 * @file 文件上传组件
 * @author chenyanhua
 * @date 2018-08-02 
 */
import React, { Component } from 'react';
import { message, Upload, Icon, Button } from 'jdcloudui';
message.config({
  top: 300,
  duration: 2,
});

export default class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.canUpload = true; // 格式大小是否满足要求
    this.state = {
      fileList: props.fileList || []// 文件列表
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      fileList: nextProps.fileList || []
    });
  }
  render() {
    let { action, disabled, fileLength, btnTitle='上传' } = this.props;
    let { fileList } = this.state;
    let props = {
      action: action,
      disabled: disabled,
      beforeUpload: this.beforeUpload,
      onChange: this.onChange,
      onRemove: this.props.onRemove
    };
    return (
      <div>
        <Upload {...props} fileList = {fileList}>
          {
            fileList.length < fileLength ?
            (<Button disabled={disabled}>
              <Icon type="upload" />{btnTitle}
            </Button>) : null
          }
          
        </Upload>
      </div>
    )
  }

  // 上传前做处理
  beforeUpload = (file) => {
    const maxFileSize = this.props.maxFileSize;
    let fileSizeType = this.props.fileSizeType;
    let propsFileTypes = this.props.fileType;
    var isLt2M = true,isFileTypes=true;
    var fileName = file.name;
    //var validate= file.type === 'image/jpeg';
    if(propsFileTypes && propsFileTypes.length>0){
      var fileTypes=fileName.split('.');
      var type = fileTypes[fileTypes.length-1];
      type = type.toUpperCase();
      propsFileTypes = propsFileTypes.map((types,index)=>{
        return types.toUpperCase();
      });
      if(propsFileTypes.indexOf(type)=== -1){//文件类型不在用户指定的范围内
        isFileTypes =false;
      }
    }
    if(maxFileSize && file.size){
      if(fileSizeType && (fileSizeType.toUpperCase()=='M' ||
        fileSizeType.toUpperCase()=='MB')){
        isLt2M = file.size <= parseInt(maxFileSize)*1024*1024;
      }else if(fileSizeType && fileSizeType.toUpperCase()=='KB'){
        isLt2M = file.size <= parseInt(maxFileSize)*1024;
      }else if(fileSizeType && fileSizeType.toUpperCase()=='B'){
        isLt2M = file.size <= parseInt(maxFileSize);
      }else{
        isLt2M = file.size <= parseInt(maxFileSize)*1024*1024;//默认fileSizeType=='M'
      }
    }
    if(!isFileTypes){
      message.error('上传图片的文件格式有误!');
      this.canUpload = false;
      return false;
    }
    if (!isLt2M) {
      if(!fileSizeType){
        fileSizeType ='M';
      }
      message.error('上传图片的文件大小必须小于'+maxFileSize+fileSizeType+'!');
      this.canUpload = false;
      return false;
    }
    this.canUpload = true;
    return true;
  };

  // 文件上传过程
  onChange = (info) => {
    if( this.canUpload ){
      this.setState({
        fileList: info.fileList
      });
      if (info.file.status === 'done') {
        var response = info.file.response;
        if (response && response.code == '0') {
          let fileUrl = response.data;
          // 向父级组件返回上传文件信息
          const { onChange, onFileListChange } = this.props;
          if (onChange) {
            onChange({
              uid: info.file.uid,
              url: fileUrl,
              name: info.file.name
            });
          }
          if(onFileListChange){
            onFileListChange(info.fileList);
          }
          message.success('文件上传成功');
        } else {
          if (response && response.code == '-1') {
            message.error(response.msg)
          } else {
            message.error("上传失败！");
          }
          let { onChange, onFileListChange } = this.props;
          if(onChange){
            onChange({});
          }
          if(onFileListChange){
            onFileListChange(info.fileList);
          }
        }
      }
    }
  } 
}