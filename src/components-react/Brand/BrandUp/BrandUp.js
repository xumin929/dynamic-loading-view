/*
 * author:ZhangHongJie
 * date:2017-02-17
 * description:branup
 *
 */
import React, {Component} from 'react';
import { Upload, Icon, message } from 'jdcloudui';
import styles from './style/brandUp.less';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJPG) {
    message.error('只支持上传jpge、png类型的图片！s');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('上传图片必须小于2M！');
  }
  return isJPG && isLt2M;
}
class BrandUp extends Component {
  state = {
    upState:0,
    upMsg:''
  };
  handleChange = (info) => {
    if (info.file.status === 'done') {

      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      //注意：这里是实现成功 接受返回值 图片的url
      this.setState({
        upState:1
      });
      this.props.imgurl(info.file.response.data.pictureURL);
      this.setState({
        upMsg:'图片上传成功！'
      })
    }else if (info.file.status === 'uploading'){
      this.setState({
        upMsg:'图片上传中...'
      })
    }else{
      this.setState({
        upMsg:<span style={{color:'red'}}>图片上传失败！</span>
      })
    }

  };
  render() {
    const imageUrl = this.state.imageUrl || this.props.imgsrc;
    return (
      <div>
        <Upload
          className={styles.avataruploader}
          name="pictures"
          showUploadList={false}
          action="/proxy/base/upload/uploadImgFile"
          beforeUpload={beforeUpload}
          onChange={this.handleChange.bind(this)}
          data={{platformId:2}}
          multiple={false}
        >
          {
            imageUrl ?
              <img src={imageUrl} alt="" className={styles.avatar} /> :
              <div className={styles.div}>点击<br/>上传图片</div>
          }
        </Upload>
        {this.state.upMsg}
      </div>
    );
  }
}

export default BrandUp