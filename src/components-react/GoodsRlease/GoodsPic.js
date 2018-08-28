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
export default class GoodsPic extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      picUrls:[],
      index :null
    };
    this.loop = this.loop.bind(this);
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
          picUrls:this.props.record.pics
        });
      }
  }
//上传图片
  handleChange = (info) => {
    console.log(info);
    if(info){
        console.log('data:'+typeof info)

        let urls;
        if((this.state.picUrls.length+info.length)>10&&this.state.picUrls.length<10){
            let picSmallLength=10-this.state.picUrls.length;
            urls=info.slice(0,picSmallLength);
        }
        else{
          urls =info;
        }
        if(urls&&Array.isArray(urls)){
          urls.forEach((item)=>{
            this.state.picUrls.push(
                {
                  url:item.url,
                  alt:''
                }
            );
          })
        }
        else{
            this.state.picUrls.push(
                {
                  url:item.url,
                  alt:''
                }
            );
        }
        this.setState({
          picUrls:this.state.picUrls
        });
        //子组件将数据传给父组件
        console.log("图片上传：",this.state.picUrls)
        this.status = 1;
        this.props.postCacheTable({
          content:JSON.stringify(this.setPicCacheData('goldpicurls',this.state.picUrls,this.props.initialParent))
        });
        this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
        this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status);
    }
    else{
      message.error("上传失败");
    }
  };
  //设置拼接缓存数据
  setPicCacheData=(key,pics,initialParent)=>{

    return [{
              key:key,
              value:[...pics,...initialParent]
            }]
  }
  //重新上传
  handleReChange = (info,index) => {
    this.state.index = index;
    this.setState({
      index:this.state.index
    });
    setTimeout(()=>{
      if(info&&info.url){
          console.log('data:'+typeof info.url)
          const url = info.url;
          const repeatItem = {
            url:url,
            alt:''
          }
          let cancelItem = this.state.picUrls.splice(this.state.index,1,repeatItem);
          url&&this.setState({
            picUrls:this.state.picUrls,
          });

          //子组件将数据传给父组件
          this.status = 2;
          this.props.postCacheTable({
            content:JSON.stringify(this.setPicCacheData('goldpicurls',this.state.picUrls,this.props.initialParent))
          });
          this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
          this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem[0],repeatItem);
      }
      else{
        message.error("上传失败");
      }
    },0)
  };
  //删除
  handleCancel = (index) => {
    const cancelItem = this.state.picUrls.splice(index,1);
    this.setState({
      picUrls:this.state.picUrls
    });
    //子组件将数据传给父组件
    this.status = 3;
    this.props.postCacheTable({
      content:JSON.stringify(this.setPicCacheData('goldpicurls',this.state.picUrls,this.props.initialParent))
    });
    this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
    this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem[0]);
  };
  //重新上传时的下标
  handleReUpload = (index) => {
    this.state.index = index;
    this.setState({
      index:this.state.index
    });
    console.log(this.state.index)
  };
  //改变ALT
  onChangeAlt = (e) => {
    this.state.picUrls[e.target.id].alt = e.target.value
    this.setState({ picUrls: this.state.picUrls });
  };
  //失去焦点后确认输入ALT
  onBlurChange = (index) => {
    this.setState({
      picUrls:this.state.picUrls
    });
    const cancelItem = this.state.picUrls[index];
    //子组件将数据传给父组件
    this.status = 4;
    this.props.postCacheTable({
      content:JSON.stringify(this.setPicCacheData('goldpicurls',this.state.picUrls,this.props.initialParent))
    });
    this.props.oncallbackparent?this.props.oncallbackparent(this.state.picUrls):
      this.props.oncallbackchirld(this.state.picUrls,this.props.record,this.status,cancelItem);
    console.log(this.state.picUrls);
  };
  //循环的到插入的每张照片
  loop = data => data.map((item,index) => {
    return (
      item.url?<div className={styles.avatarcontainer} key={index} >
        <div className={styles.avatarwrapper}>
            <UploadSelect
              className={styles.avataruploader}
              limit={{size:5,suffix:["jpg","jpeg","png","JPG","JPEG","PNG"]}}
              onChange={(info) =>this.handleReChange(info,index)}
              imgUrl={item.url}
              showRemoveIcon={true}
              onRemove={() =>this.handleCancel(index)}
            />
        </div>
        <Input placeholder="输入ALT标签" onChange={this.onChangeAlt} onBlur={() =>this.onBlurChange(index)}
                 value={this.state.picUrls[index].alt} id={index} maxLength="50" />
      </div>:null
    );
  });

  render() {
    console.log(this.props);
    const uploadButton = (
      <div className={styles.avatarcontainer}>
        <div className={styles.avatarwrapperadd}>
            <UploadSelect
              className={styles.avataruploader}
              limit={{size:5,suffix:["jpg","jpeg","png","JPG","JPEG","PNG"]}}
              multiple={true}
              onChange={this.handleChange}
            />
        </div>
        <Input placeholder="图片ALT标签" disabled={true}/>
      </div>
    );
    return (
      <div className={styles.avatarfl}>
        {this.state.picUrls !==[]&&this.state.picUrls.length>0&&this.loop(this.state.picUrls)}
        {this.state.picUrls.length >=this.props.num?null:uploadButton}
      </div>
    );
  }
}
