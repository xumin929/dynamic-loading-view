/****************************************************************
 * author:liupeng
 * date:2017-02-20
 * description:产品发布-图片上传
 ****************************************************************/
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGoodsInfo,uploadPrams,uploadPicture} from './redux';
import {message ,Input} from 'jdcloudui';
import  { UploadSelect }  from 'jdcloudecc/components';
import styles from './style/imageupload.css';

@connect(
  state => ({
    goodsRlease:state.goodsRlease,
  }),
  dispatch => bindActionCreators({getGoodsInfo,uploadPrams,uploadPicture}, dispatch)
)
export default class GoodsPicSingle extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      picUrls:[],
      placeholder:"图片ALT标签",
      disabled:true
    };
    this.status = 1;
  }
  componentDidMount() {
      if(this.props.initialParent&&this.props.initialParent.length>0){
          this.setState({
            picUrls:this.props.initialParent
          });
      }
      if(this.props.record&&this.props.record.pics&&this.props.record.pics.length>0){
        this.setState({
          picUrls:this.props.record.pics,
          disabled:false
        });
      }
  }
  handleChange = (info) => {
      if(info&&info.url){
          console.log('data:'+typeof info.url)
          const url = info.url;
          const repeatItem = {
            url:url,
            alt:''
          }
          let cancelItem = this.state.picUrls.splice(0,1,repeatItem);
          url&&this.setState({
            picUrls:this.state.picUrls,
            disabled:false,
            placeholder:"输入ALT标签"
          });

          //子组件将数据传给父组件
          this.status = 1;
          //存储缓存图片
          if(this.props.redioValue==0){
            this.props.postCacheTable({
              content:JSON.stringify(this.setPicCacheData(this.props.record.id,this.state.picUrls))
            }).then(result=>{
              this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
              this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem[0],repeatItem);
            }).catch(error=>{
              this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
              this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem[0],repeatItem);
            });
          }
          else{
            this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
            this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem[0],repeatItem);
          }
      }
      else{
        message.error("上传失败");
      }
  };
  //删除
  handleCancel =() => {
    const cancelItem = this.state.picUrls.splice(0,1);
    this.setState({
      picUrls:this.state.picUrls,
      disabled:true,
      placeholder:"图片ALT标签"
    });
    //子组件将数据传给父组件
    this.status = 3;
    //存储缓存图片
    if(this.props.redioValue==0){
      this.props.postCacheTable({
        content:JSON.stringify(this.setPicCacheData(this.props.record.id,this.state.picUrls))
      }).then(result=>{
        this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
        this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem[0]);
      }).catch(error=>{
        this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
        this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem[0]);
      });
    }else{
      this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
      this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem[0]);
    }
  };
  //改变ALT
  onChangeAlt = (e) => {
    this.state.picUrls[0].alt = e.target.value
    this.setState({ picUrls: this.state.picUrls });
  };
  //失去焦点后确认输入ALT
  onBlurChange = () => {
    const cancelItem = this.state.picUrls[0];
    //子组件将数据传给父组件
    this.status = 1;
    //存储缓存图片
    if(this.props.redioValue==0){
      this.props.postCacheTable({
        content:JSON.stringify(this.setPicCacheData(this.props.record.id,this.state.picUrls))
      }).then(result=>{
        this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
        this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem);
      }).catch(error=>{
        this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
        this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem);
      });
    }else{
      this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
      this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem);
    }


    console.log(this.state.picUrls);
  };
//设置拼接缓存数据
  setPicCacheData=(key,pic)=>{

      return [{
                key:key,
                value:[...pic]
              }]
  }
  render() {
    console.log("record99999999999999999999999999999:",this.props.record);
    const uploadButton = (
      <div className={styles.avatarcontainer}>
        <div className={styles.avatarwrapperadd}>
            <UploadSelect
              className={styles.avataruploader}
              limit={{size:5,suffix:["jpg","jpeg","png","JPG","JPEG","PNG"]}}
              imgUrl={this.state.picUrls[0]&&this.state.picUrls[0].url}
              showRemoveIcon={true}
              onRemove={this.handleCancel}
              onChange={this.handleChange}
            />
        </div>
        <Input
          placeholder={this.state.placeholder}
          disabled={this.state.disabled}
          onChange={this.onChangeAlt}
          onBlur={this.onBlurChange}
          value={this.state.picUrls[0]&&this.state.picUrls[0].alt}
          maxLength="50"
        />
      </div>
    );
    return (
      <div className={styles.avatarfl}>
        {uploadButton}
      </div>
    );
  }
}
