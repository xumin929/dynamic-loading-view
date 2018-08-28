/**
 * @file 发布商品-商品图片
 */

import React, {Component} from 'react';
import styles from "./style/basic_img.less"
import UploadImg from "./UploadImg/UploadImg";


class GoodImageShop extends Component {
    constructor(props) {
        super(props);

    }
    onCallBackData(item){
        this.props.itemTmplPublishVo.itemPicVoList = item;
        this.props.updateItemTmplAction(this.props.itemTmplPublishVo);
    }

    render() {
        this.itemImgInfos = this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.itemPicVoList ? this.props.itemTmplPublishVo.itemPicVoList : [];
        // console.log("this.itemImgInfos====",this.itemImgInfos);
        return (
            <div >
                <div className={styles.basicImg}>
                    <span className="mr20 f-fs14 f-fwn">
                      <i className="text-red mr5">*</i>
                      商品图片
                    </span>
                    (至少添加一张，最多允许十张；单张图片不能大于5M；允许的图片格式有jpg、jpeg、png、JPG、JPEG、PNG ; 图片最佳尺寸为800x800)
                </div>
                <div className={styles.UploadSelect}>
                    <UploadImg
                        onCallBackData = {this.onCallBackData.bind(this)}
                        itemImgInfos = { this.itemImgInfos }
                        num={10}
                    />
                </div>
            </div>
        );
    }
}
export default GoodImageShop;
