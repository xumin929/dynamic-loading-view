
import React, { Component, PropTypes } from 'react';
import { Upload, Icon, message ,Input } from 'jdcloudui';
import styles from './style/imageupload.less';
let uploadFlag = true;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload  (file) {
    let isImgTypes=true;
    let fileName = file.name;
    let imgTypes=['jpg','jpeg','png'];
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
    if(!isImgTypes){
        message.error('允许的图片格式有jpg、jpeg、png、JPG、JPEG、PNG')
    }
    return isImgTypes;
};
export default class UploadImg extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            index :null
        };
        this.loop = this.loop.bind(this);
        this.uploadName = styles.avatardelete;
    }
    componentDidMount() {
    }
    addEventHandler(target,type,func){
        if(target.addEventListener){
            //监听IE9，谷歌和火狐
            target.addEventListener(type, func, false);
        }else if(target.attachEvent){
            target.attachEvent("on" + type, func);
        }else{
            target["on" + type] = func;
        }
    }
    //上传
    handleChange = (info) => {
        if(info.file.status === 'uploading'){
            if(uploadFlag){
                message.loading('正在上传中，请稍等....',1.5);
            }
            uploadFlag = false;
        }
        if (info.file.status === 'done') {
            uploadFlag = true;
            //注意：这里是实现成功 接受返回值 图片的url
            if(info.file.response.code==0){
                // console.log('data:'+typeof info.file.response.data)
                const urls = info.file.response.data;
                urls&&this.itemImgInfos.push(
                    {
                        url:urls,
                        alt:''
                    }
                );
                //将数据传给父组件
                this.props.onCallBackData(this.itemImgInfos);
            }else{
                message.error(info.file.response.msg);
            }
        }else if (info.file.status === 'error') {
            uploadFlag = true;
            const msg=info.file.response&&info.file.response.msg?info.file.response.msg:"上传失败";
            message.error(msg);
        }
    };
    //重新上传
    handleReChange = (info) => {
        if(info.file.status === 'uploading'){
            if(uploadFlag){
                message.loading('正在上传中，请稍等....',1.5);
            }
            uploadFlag = false;
        }
        if (info.file.status === 'done') {
            uploadFlag = true;
            //重新上传成功 接受返回图片的url
            if(+info.file.response.code===0){
                const url = info.file.response.data;
                const repeatItem = {
                    url:url,
                    alt:''
                }
                this.itemImgInfos.splice(this.state.index,1,repeatItem);
               //将数据传给父组件
                this.props.onCallBackData(this.itemImgInfos);
            }else{
                message.error(info.file.response.msg);
            }
        }else if (info.file.status === 'error') {
            uploadFlag = true;
            const msg=info.file.response&&info.file.response.msg?info.file.response.msg:"上传失败";
            message.error(msg);
        }
    };
    //删除
    handleCancel = (index) => {
         this.itemImgInfos.splice(index,1);
        //将数据传给父组件
        this.props.onCallBackData(this.itemImgInfos);
    };
    //重新上传时的下标
    handleReUpload = (index) => {
        this.state.index = index;
        this.setState({
            index:this.state.index
        });
    };
    //改变ALT
    onChangeAlt = (e) => {
        this.itemImgInfos[e.target.id].alt = e.target.value;
        this.props.onCallBackData(this.itemImgInfos);
    };
    //失去焦点后确认输入ALT
    onBlurChange = (index) => {
        //将数据传给父组件
        this.props.onCallBackData(this.itemImgInfos);
    };
    //循环的到插入的每张照片
    loop = data => data.map((item,index) => {
        return (
            item.url?<div className={styles.avatarcontainer} key={index} >
                <div className={styles.avatarwrapper}>
                    <div className={this.uploadName}>
                        <Upload
                            className={styles.lUpload}
                            name="file"
                            showUploadList={false}
                            action="/proxy/base/upload/uploadImgLimitFiveMega"
                            beforeUpload={beforeUpload}
                            onChange={this.handleReChange}
                        >
                            <span className={styles.reupload}  onClick={()=>this.handleReUpload(index)} >{'重新上传'}</span>
                        </Upload>
                        <span className={styles.gip}></span>
                        <span className={styles.deletespan}  onClick={() =>this.handleCancel(index)} >{'删除'}</span>
                    </div>
                    <img src={item.url} alt={item.alt} className={styles.avatar} />
                </div>
                <Input placeholder="输入ALT标签" onChange={this.onChangeAlt} onBlur={() =>this.onBlurChange(index)}
                       value={this.itemImgInfos[index].alt} id={index} maxLength="50" />
            </div>:null
        );
    });

    componentWillReceiveProps(nextProps){
        // console.log("nextProps====",nextProps);
    }

    componentWillMount(){
        let browser = '';
        let b_version = '';
        let version = [];
        let trim_Version = '';
        if(navigator){
            browser = navigator.appName;
            b_version = navigator.appVersion;
            if(b_version){
                version = b_version.split(";");
                if(version.length > 1){
                    trim_Version = version[1].replace(/[ ]/g,"");
                }else{}
            }else{}
        }else{}
        if(browser && b_version && version && trim_Version){
            console.log(browser, b_version, version, trim_Version,'browser, b_version, version, trim_Version');
            if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0")
            {
                console.log("IE 6.0");
            }
            else if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0")
            {
                console.log("IE 7.0");
            }
            else if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0")
            {
                console.log("IE 8.0");
            }
            else if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0")
            {
                //alert("IE 9.0");
                this.uploadName = styles.avatardelete2;
            }
        }
    }

    render() {
        this.itemImgInfos = this.props.itemImgInfos ? this.props.itemImgInfos : [];
        const uploadButton = (
            <div className={styles.avatarcontainer}>
                <div className={styles.avatarwrapperadd}>
                    <Upload
                        className={styles.avataruploader}
                        name="file"
                        showUploadList={false}
                        action="/proxy/base/upload/uploadImgLimitFiveMega"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                        data={{platformId:2}}
                        multiple={true}
                    >
                        <div className={styles.avataruploadertrigger}>
                            <Icon type="plus"  size="large" className={styles.plusicon}></Icon>
                            <span className={styles.plus1}>添加图片</span>
                        </div>
                    </Upload>
                </div>
                <Input placeholder="图片ALT标签" disabled={true}/>
            </div>
        );
        return (
            <div className={styles.avatarfl}>
                {this.itemImgInfos !==[]&&this.itemImgInfos.length>0&&this.loop(this.itemImgInfos)}
                {this.itemImgInfos.length >=this.props.num?null:uploadButton}
            </div>
        );
    }
}
