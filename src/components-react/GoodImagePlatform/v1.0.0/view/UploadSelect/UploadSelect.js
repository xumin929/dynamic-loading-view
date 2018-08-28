/****************************************************************
 * author:luoquan
 * date:2018-03-12
 * description:产品发布-图片上传
 ****************************************************************/
import React, { Component } from 'react';

import { Input } from 'jdcloudui';
import  { UploadSelect }  from 'jdcloudecc/components';
import styles from './style/imageupload.less';


export default class Upload extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  //初始化数据
  init = (data, type) => {
      // console.log("data ===",data,"type ===",type);
    if(data.length > 0) {
      return type ? (
          data.map((item, index) => {
            return (
              item.url ? (
                  <div className={styles.avatarcontainer} key={index} >
                    <div className={styles.avatarwrapper}>
                      <UploadSelect
                        className={styles.avataruploader}
                        limit={{size:5,suffix:["jpg","jpeg","png","JPG","JPEG","PNG"]}}
                        onChange={(info) =>this.props.handleReChange(info, index)}
                        imgUrl={item.url}
                        showRemoveIcon={true}
                        onRemove={() =>this.props.handleCancel(index)}
                      />
                    </div>
                    <Input placeholder="输入ALT标签" onChange={(e) => this.props.handleALTChange(e, index)}
                           value={item.alt} maxLength="50" />
                  </div>
                ) : null
            )
          })
        ) : (
          data.map((item, index) => {
            return (
              <div className={styles.avatarcontainer} key={index} >
                <div className={styles.avatarwrapper}>
                  <UploadSelect
                    className={styles.avataruploader}
                    limit={{size:5,suffix:["jpg","jpeg","png","JPG","JPEG","PNG"]}}
                    onChange={(info) =>this.props.handleReChange(info)}
                    imgUrl={item.url}
                    showRemoveIcon={true}
                    onRemove={() =>this.props.handleCancel()}
                  />
                </div>
                <Input
                  placeholder="输入ALT标签"
                  onChange={(e) => this.props.handleALTChange(e)}
                  value={item.alt}
                  maxLength="50"
                />
              </div>
            )
          })
        );
    }else{
      return type ? null : (
          <div className={styles.avatarcontainer}>
            <div className={styles.avatarwrapper}>
              <UploadSelect
                className={styles.avataruploader}
                limit={{size:5,suffix:["jpg","jpeg","png","JPG","JPEG","PNG"]}}
                onChange={(info) =>this.props.handleReChange(info)}
              />
            </div>
            <Input
              placeholder="输入ALT标签"
              disabled={true}
            />
          </div>
        )
    }
  };

  render() {
    const uploadButton = (
      <div className={styles.avatarcontainer}>
        <div className={styles.avatarwrapperadd}>
            <UploadSelect
              className={styles.avataruploader}
              limit={{size:5,suffix:["jpg","jpeg","png","JPG","JPEG","PNG"]}}
              multiple={true}
              onChange={this.props.handleChange}
            />
        </div>
        <Input placeholder="图片ALT标签" disabled={true} />
      </div>
    );
    return (
      <div className={styles.avatarfl}>
        {
          this.init(this.props.itemImgInfos, this.props.type)
        }
        {
          this.props.type ? this.props.itemImgInfos.length >= this.props.num ? null : uploadButton : null
        }
      </div>
    );
  }
}
