/**
 * Created by yuanye on 2017/5/23.
 */
import React, {Component} from 'react';
import {Button, Upload, Icon, Modal, message, Input} from 'jdcloudui';
import styles from '../SetAdvertisement/style.css';
import  { UploadSelect }  from 'jdcloudecc/components';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload1(file) {
	console.log(file);
	if(file && file.name){
		console.log(file);
		let arr = file.name.split('.');
		let fileType = arr[arr.length -1].toLowerCase();
		const isJPG = fileType === 'jpeg' || fileType === 'png' || fileType === 'jpg';
		console.log(fileType,isJPG);
		if (!isJPG) {
			message.error('仅支持jpg、jpeg、png格式');
		}
		return isJPG;
	}

}
function beforeUpload2(file) {
	if(file && file.name){
		console.log(file);
		let arr = file.name.split('.');
		let fileType = arr[arr.length -1].toLowerCase();
		const isJPG = fileType === 'jpeg' || fileType === 'png' || fileType === 'jpg';
		console.log(fileType,isJPG);
		if (!isJPG) {
			message.error('仅支持jpg、jpeg、png格式');
		}
		return isJPG;
	}
}

export default class UploadPic extends Component {
	constructor(props){
		super(props);
		this.state = {
			imageUrl1: '',
			imageUrl2: '',
			upMsg1:'',
			upMsg2:'',
		};
	}
	del1(){
		this.setState({
			imageUrl1: '1',
			upMsg1:'',
		});
		this.props.getPicOneUrl('');
	}
	del2(){
		this.setState({
			imageUrl2: '2',
			upMsg2:'',
		});
		this.props.getPicTwoUrl('');
	}
  handleChange1 = (info) => {
  	console.log(info);
  	this.setState({imageUrl1: info.url});
  	this.props.getPicOneUrl(info.url);
  	//console.log(info.file.status);
 //    if (info.file.status === 'done') {
 //    	if(info.file.response.code == 0){
 //    		///getBase64(info.file.originFileObj, imageUrl1 => this.setState({ imageUrl1 }));
 //    		this.setState({imageUrl1: info.file.response.data.pictureURL});
	// 		this.props.getPicOneUrl(info.file.response && info.file.response.data && info.file.response.data.pictureURL);
	// 		this.props.getUpState1('done');
	// 		this.setState({
	//         upMsg1: <span className="upMsg1">图片上传成功！</span>
	//       })
 //    	}else{
 //    		message.error(info.file.response.msg);
 //    		this.props.getUpState1('error');
 //    		this.setState({
	// 	        upMsg1:	'',
	// 	    })
 //    	}
	// }else if (info.file.status === 'uploading'){
	// 	this.props.getUpState1('uploading');
	//     this.setState({
	//         upMsg1: <span className="upMsg1">图片上传中...</span>
	//     })
 //    }else{
	// 	this.props.getUpState1('error');
	//     this.setState({
	//         upMsg1: <span className="upMsg1Error">图片上传失败！</span>
	//     })
	// }
  }
	handleChange2 = (info) => {
	this.setState({imageUrl2: info.url});
	this.props.getPicTwoUrl(info.url);
 //    if (info.file.status === 'done') {
 //    	if(info.file.response.code == 0){
 //    		//getBase64(info.file.originFileObj, imageUrl2 => this.setState({ imageUrl2 }));
 //    		this.setState({imageUrl2: info.file.response.data.pictureURL});
	// 		this.props.getPicTwoUrl(info.file.response && info.file.response.data && info.file.response.data.pictureURL);
	// 		this.props.getUpState2('done');
	// 		this.setState({
	// 	        upMsg2:	<span className="upMsg2">图片上传成功！</span>
	// 	    })
	//   	}else{
	//   		message.error(info.file.response.msg);
	//   		this.props.getUpState2('error');
	//   		this.setState({
	// 	        upMsg2:	'',
	// 	    })
	//   	}
	// }else if (info.file.status === 'uploading'){
	// 		this.props.getUpState2('uploading');
 //      this.setState({
 //        upMsg2: <span className="upMsg2">图片上传中...</span>
 //      })
 //    }else{
	// 	this.props.getUpState2('error');
 //      	this.setState({
	//         upMsg2: <span className="upMsg2Error">图片上传失败！</span>
	//     })
	// }
  }
   render() {
		this.imageUrl1 = this.state.imageUrl1 || this.props.imageUrl1;
		this.imageUrl2 = this.state.imageUrl2 || this.props.imageUrl2;
    return (
			<div className="uploadPicBox">
				<div className="divbBox">
					{
						this.imageUrl1 &&　this.imageUrl1 !=1 ?
							<UploadSelect
								className="reUpload picBox hasPicBox1 mr20"
								limit={{width:270, height:162, size:1, suffix:["jpg","jpeg","png"] }}
								showRemoveIcon={true}
								onChange={this.handleChange1}
								onRemove={this.del1.bind(this)}
								imgUrl={this.imageUrl1}
							/>
						:
						<UploadSelect
							className="picBox noPic noPicBox1 mr20"
							limit={{width:270, height:162, size:1, suffix:["jpg","jpeg","png"] }}
							onChange={this.handleChange1}
						>
							<div className="text-999 mrt100">（广告位270x162px）</div>
						</UploadSelect>
					}
					{
						this.imageUrl2 && this.imageUrl2 !=2 ?
							<UploadSelect
								className="reUpload picBox hasPicBox2"
								limit={{width:270, height:270, size:1, suffix:["jpg","jpeg","png"] }}
								showRemoveIcon={true}
								onChange={this.handleChange2}
								onRemove={this.del2.bind(this)}
								imgUrl={this.imageUrl2}
							/>
						:
						<UploadSelect
							className="picBox noPic noPicBox2"
							limit={{width:270, height:270, size:1, suffix:["jpg","jpeg","png"] }}
							onChange={this.handleChange2}
						>
							<div className="text-999 mrt100">（广告位270x270px）</div>
						</UploadSelect>
					}
				</div>
				<div className="divbBox1">
						{this.state.upMsg1}
						{this.state.upMsg2}
				</div>
				<div className="divbBox">
					<Input
						key={this.props.key1}
						className="inpt mr20"
						placeholder="请输入链接地址"
						defaultValue={this.props.targetUrl1}
						onChange={this.props.getInptOneValue}/>
					<Input
						key={this.props.key2}
						className="inpt"
						placeholder="请输入链接地址"
						defaultValue={this.props.targetUrl2 }
						onChange={this.props.getInptTwoValue}/>
				</div>
			</div>
    );
  }
}
