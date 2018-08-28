/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 基本信息设置
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Table, message} from 'jdcloudui';
import UploadSelect from '../UploadSelect/UploadSelect';


/* **********  自定义组件  ********** */
import './style/table_border.css';

class BaseInfomation extends Component {
  constructor(props) {
    super(props);
    this.goodsImgColumns = [{
      title: <div className="f-fwn">
        <span className="mr20 f-fs14">
          <i className="text-red mr5">*</i>
          商品图片
        </span>
        (至少添加一张，最多允许十张；单张图片不能大于5M；允许的图片格式有jpg、jpeg、png、JPG、JPEG、PNG ; 图片最佳尺寸为800x800)
      </div>,
    }];
  }


  //上传图片
  handleChange = (info) => {
    console.log(info);
    if(info) {
      info.map(item => {
        let data = {
          url: item.url,
          alt: null,
        };
        if(this.itemImgInfos.length < 10) {
          this.itemImgInfos.push(data);
        }
      });
      this.props.setParamete('itemImgInfos', JSON.stringify(this.itemImgInfos));
    } else {
      message.error("上传失败");
    }
  };

  //重新上传
  handleReChange = (info, index) => {
    console.log(info);
    if(info) {
      let item = {
        url: info.url,
        alt: null,
      };
      this.itemImgInfos.splice(index, 1, item);
      this.props.setParamete('itemImgInfos', JSON.stringify(this.itemImgInfos));
    } else {
      message.error("上传失败");
    }
  };

  //删除
  handleCancel = (index) => {
    this.itemImgInfos.splice(index, 1);
    this.props.setParamete('itemImgInfos', JSON.stringify(this.itemImgInfos));
  };

  //改变ALT
  handleALTChange = (e, index) => {
    console.log(e.target.value, index);
    this.itemImgInfos[index].alt = e.target.value;
    this.props.setParamete('itemImgInfos', JSON.stringify(this.itemImgInfos));
  };

  render() {
    //console.log(this.props.params);
    this.itemImgInfos = this.props.params && this.props.params.itemImgInfos ? JSON.parse(this.props.params.itemImgInfos) : [];
    return (
      <div>
        <Table
          columns={this.goodsImgColumns}
          dataSource={[]}
          className="tableBorder table-box-title"
        />
        <div className="UploadSelect">
          <UploadSelect
            itemImgInfos={this.itemImgInfos}
            num={10}
            type={true}
            handleChange={::this.handleChange}
            handleReChange={::this.handleReChange}
            handleCancel={::this.handleCancel}
            handleALTChange={::this.handleALTChange}
          />
        </div>
      </div>
    );
  }
}
export default BaseInfomation;
