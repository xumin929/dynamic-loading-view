/**
 * @file 发布商品-商品图片
 */

import React, {Component} from 'react';
import { message  } from 'jdcloudui';
import UploadSelect from './UploadSelect/UploadSelect';
import styles from "./style/basic_img.less";

class GoodImagePlatform extends Component {
    constructor(props) {
        super(props);
    }
    //上传图片
    handleChange = (info) => {
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
            this.props.itemTmplPublishVo.itemPicVoList = this.itemImgInfos;
            this.props.updateItemTmplAction(this.props.itemTmplPublishVo);
        } else {
            message.error("上传失败");
        }
    };

    //重新上传
    handleReChange = (info, index) => {
        console.log("重新上传",info,"index",index);
        if(info) {
            let item = {
                url: info.url,
                alt: null,
            };
            this.itemImgInfos.splice(index, 1, item);
            this.props.itemTmplPublishVo.itemPicVoList = this.itemImgInfos;
            this.props.updateItemTmplAction(this.props.itemTmplPublishVo);
        } else {
            message.error("上传失败");
        }
    };

    //删除
    handleCancel = (index) => {
        console.log("删除 index",index);
        this.itemImgInfos.splice(index, 1);
        this.props.itemTmplPublishVo.itemPicVoList = this.itemImgInfos;
        this.props.updateItemTmplAction(this.props.itemTmplPublishVo);
    };

    //改变ALT
    handleALTChange = (e, index) => {
        console.log("改变ALT index",e.target.value,index);
        this.itemImgInfos[index].alt = e.target.value;
        this.props.itemTmplPublishVo.itemPicVoList = this.itemImgInfos;
        this.props.updateItemTmplAction(this.props.itemTmplPublishVo);
    };

    render() {
        this.itemImgInfos = this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.itemPicVoList ? this.props.itemTmplPublishVo.itemPicVoList : [];
        return (
            <div>
                <div className={styles.basic_img}>
                    <span className="mr20 f-fs14 f-fwn">
                      <i className="text-red mr5">*</i>
                      商品图片
                    </span>
                    (至少添加一张，最多允许十张；单张图片不能大于5M；允许的图片格式有jpg、jpeg、png、JPG、JPEG、PNG ; 图片最佳尺寸为800x800)
                </div>
                <div className={styles.UploadSelect}>
                    <UploadSelect
                        itemImgInfos={this.itemImgInfos}
                        num={10}
                        type={true}
                        handleChange={this.handleChange}
                        handleReChange={this.handleReChange}
                        handleCancel={this.handleCancel}
                        handleALTChange={this.handleALTChange}
                    />
                </div>
            </div>
        );
    }
}
export default GoodImagePlatform;
