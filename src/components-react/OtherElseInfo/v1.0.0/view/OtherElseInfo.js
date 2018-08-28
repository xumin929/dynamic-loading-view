/**
 * @file 其他设置--其他信息
 */
import React, { Component } from 'react';
import { Checkbox, message, Radio, Input, Icon, Button } from 'jdcloudui';
import './style/index.css';
import UploadFile from './../../../UploadFile/v1.0.0/view/UploadFile';
//import FileUp from '../../../FileUp/v1.0.0/view';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

export default class OtherElseInfo extends Component {
  constructor(props) {
    super(props);
    this.state={
      fileAddr: [],
      textValue: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  textChange=(e)=>{
    console.log(e.target.value)
    let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    itemTmplPublishVo.packingList = e.target.value;
    this.setState({
      textValue: itemTmplPublishVo.packingList
    });
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  render() {
    let fileList = this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.itemPicpdfVoList || [];
    return (
      <div>
        <h3 className='h3-title'>其他信息</h3>
        <div>
          <div className='otherMt202 elseInfo'>
            <span className='smallColor smaillest'>包装清单:</span>
            <TextArea autosize={{ minRows: 4, maxRows: 8 }}
                      value={this.props.itemTmplPublishVo.packingList || ''}
                      onChange={this.textChange} />
          </div>
          <div className='otherMt202 clearfix'>
            <span className='smallColor smaillest pull-left'>商品手册:</span>
            <div className='pull-left uploadify'>
              <UploadFile
                btnTitle='添加附件'
                fileLength={5}
                fileType={['png', 'jpg', 'word', 'excel', 'pdf']}
                action='/proxy/base/upload/uploadFileLimit'
                fileList={fileList}
                onRemove={(result)=>{
                  this.onRemove(result);
                }}
                onFileListChange={(fileList)=>{ this.onFileListChange(fileList) }}
              />
              {
                fileList.length>=5?null:<span className='upload-tips'>只支持PDF、jpg、png、word和excel文档，大小5M以内</span>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
  // 上传文件，更新数据源
  onFileListChange = (fileList)=>{
    let new_fileList = [];
    (fileList || []).map((item)=>{
      new_fileList.push({
        uid: item.uid,
        url: item.url || item.response && item.response.data || '',
        name: item.name
      });
    })
     // 更新总数据源
     var itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
     itemTmplPublishVo.itemPicpdfVoList = new_fileList;
     this.props.updateItemTmplAction(itemTmplPublishVo);
  }

  // 移除文件
  onRemove = (file)=>{
    // 更新总数据源
    var itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
    var new_fileList = [];
    (itemTmplPublishVo.itemPicpdfVoList || []).map((item)=>{
      if(item.name != file.name || item.url != file.url || item.uid != file.uid){
        new_fileList.push({...item});
      }
    });
    itemTmplPublishVo.itemPicpdfVoList = new_fileList;
    this.props.updateItemTmplAction(itemTmplPublishVo);
  }
}
