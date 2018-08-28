/**
 * shop 上传图片，携带重新上传和删除按钮
 */
import React, { Component } from 'react';
import {message,Upload,Icon} from 'jdcloudui';
import './style/index.css';
message.config({
  top: 300,
  duration: 2,
});
let uploadFlag = true;
function getBase64(img, callback,imageUrl) {
  const reader = new FileReader();
  if(imageUrl && imageUrl!=''){
    reader.addEventListener('load', () => callback(imageUrl));
    //reader.readAsDataURL(imageUrl);
  }else{
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}
export default class UploadImg extends Component {
  constructor(props, context) {
    super(props, context);
    this.state={
      imageUrl: props.imageUrl || ''
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      imageUrl: nextProps.imageUrl || ''
    });
  }
  beforeUpload =(file)=>{
    const maxFileSize = this.props.maxFileSize;
    let fileSizeType = this.props.fileSizeType;
    let imgTypes = this.props.imgType;
    var isLt2M = true,isImgTypes=true;
    var fileName = file.name;
    //var validate= file.type === 'image/jpeg';
    if(imgTypes && imgTypes.length>0){
      var fileTypes=fileName.split('.');
      var type = fileTypes[fileTypes.length-1];
      type = type.toUpperCase();
      imgTypes = imgTypes.map((types,index)=>{
        return types.toUpperCase();
      });
      if(imgTypes.indexOf(type)=== -1){//文件类型不在用户指定的范围内
        isImgTypes =false;
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
    if(!isImgTypes){
      message.error('上传图片的文件格式有误!');
      return false;
    }
    if (!isLt2M) {
      if(!fileSizeType){
        fileSizeType ='M';
      }
      message.error('上传图片的文件大小必须小于'+maxFileSize+fileSizeType+'!');
      return false;
    }
    return true;
  }
  handleChange = (info) => {
    if(info.file.status === 'uploading'){
      if(uploadFlag){
        message.loading('正在上传中，请稍等....',1);
      }
      uploadFlag = false;
    }
    if (info.file.status === 'done') {
      uploadFlag = true;
      var response=info.file.response;
      if(response && response.code=='0'){
        var picture = response.data;
        this.setState({imageUrl:picture});
        var attr = this.props.relation;
        let {onChange} = this.props;
        var obj={};
        obj[attr]= picture;
        onChange(obj);
        //getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }),picture.pictureURL);
      }else{
        if(response && response.code=='-1'){
          message.error(response.msg)
        }else{
          message.error("上传失败！");
        }
        let {onChange} = this.props;
        var obj={};
        onChange(obj);
      }
    }
    if (info.file.status === 'error') {
      uploadFlag = true;
      message.error("上传失败！")
    }
  }
  
  //移除
  onRemove = ()=>{
    //更新图片
    if(this.props.onRemove && typeof this.props.onRemove=='function'){
      this.props.onRemove({url: this.state.imageUrl});
    }
    this.setState({
      imageUrl: undefined
    });
  }

  render(){
    //const styles = require('./style/UploadImg.less');
    let style = this.props.style || {};
    const action = this.props.action;
    const data =this.props.data;
    const name = this.props.name;
    let imageUrl = this.state.imageUrl || '';

    let wrapClassName = 'upload-select-wrap ' + (this.props.className || '');
    if(imageUrl && imageUrl.length>0){
      wrapClassName += ' solid-border';
    }
    return(
      <div className={wrapClassName} style={style}>
        {
          imageUrl && imageUrl!='' ?
          <div class="upload-select-box">
            <img src={imageUrl} />
            <div class="upload-select-footer">
              <Upload
                name={name}
                showUploadList={false}
                action={action}
                beforeUpload={this.beforeUpload.bind(this)}
                onChange={this.handleChange.bind(this)}
                data={data}
              >
                <div class="upload-select-btn">重新上传</div>
              </Upload>
              <div class="upload-select-removebtn" onClick={this.onRemove}>删除</div>
            </div>
          </div>
          :
            <Upload
              name={name}
              showUploadList={false}
              action={action}
              beforeUpload={this.beforeUpload.bind(this)}
              onChange={this.handleChange.bind(this)}
              data={data}
            >
              <div className='upload-select-defaultbtn'>
                <Icon type="plus" className='upload-plus' /> <br/>上传图片
              </div>
            </Upload>
        }
      </div>
    )
  }
  
}