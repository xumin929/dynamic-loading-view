/**
 * Created by yuanye on 2017/5/23.
 */
import React, {Component} from 'react';
import { Modal, message} from 'jdcloudui';
import styles from './style.css';

import AdFormat from '../AdFormat/AdFormat';
import UploadPic from '../UploadPic/UploadPic';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAdInit,setAdSave,clearImg } from './redux';

let requestParam = {
	fCid : '',
	adPicture1 : '',
	adPicture2 : '',
	adUrl1 : '',
	adUrl2 : '',
	layoutType: '',
};
let upState1='';
let upState2='';

@connect(
  state => ({ SetAdvertisement:state.SetAdvertisement }),
  dispatch => bindActionCreators({ setAdInit,setAdSave,clearImg }, dispatch)
)

export default class SetAdvertisement extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentWillMount(){
	    this.props.setAdInit({fCid:this.props.fcid});
	}
	saveAd(){
		console.log(requestParam);
		if(upState1 !== 'uploading' && upState2 !== 'uploading'){
			this.props.hideModal();
			this.props.setAdSave(requestParam).then(
				(result)=>{
					if(result.code == 0){
						message.success('保存成功！');
						this.props.clearImg();
						this.props.changeEdit();
					}else{
						message.error('保存失败，请重试')
					}
				},
				(error)=>{console.log(error)}
			);
		}else{
			message.info('图片正在上传，请稍候...');
		}
	}
	getInptOneValue = (e)=>{
		requestParam.adUrl1 = e.target.value;
	}
	getInptTwoValue = (e)=>{
		requestParam.adUrl2 = e.target.value;
	}
	getPicOneUrl(value){
		requestParam.adPicture1 = value;
	}
	getPicTwoUrl(value){
		requestParam.adPicture2 = value;
	}
	getType(value){
		requestParam.layoutType = value;
	}
	getUpState1(value){
		upState1 = value;
	}
	getUpState2(value){
		upState2 = value;
	}
	render() {
		console.log(this.props.SetAdvertisement.setAdInit );
		var type =
			this.props.SetAdvertisement &&
			this.props.SetAdvertisement.setAdInit &&
			this.props.SetAdvertisement.setAdInit.data &&
			this.props.SetAdvertisement.setAdInit.data.layoutType;
		var imageUrl1 =
			this.props.SetAdvertisement &&
			this.props.SetAdvertisement.setAdInit &&
			this.props.SetAdvertisement.setAdInit.data &&
			this.props.SetAdvertisement.setAdInit.data.adOne &&
			this.props.SetAdvertisement.setAdInit.data.adOne.adPicture ?
			this.props.SetAdvertisement &&
			this.props.SetAdvertisement.setAdInit &&
			this.props.SetAdvertisement.setAdInit.data &&
			this.props.SetAdvertisement.setAdInit.data.adOne &&
			this.props.SetAdvertisement.setAdInit.data.adOne.adPicture : '';
		var imageUrl2 =
			this.props.SetAdvertisement &&
			this.props.SetAdvertisement.setAdInit &&
			this.props.SetAdvertisement.setAdInit.data &&
			this.props.SetAdvertisement.setAdInit.data.adTwo &&
			this.props.SetAdvertisement.setAdInit.data.adTwo.adPicture ?
			this.props.SetAdvertisement &&
			this.props.SetAdvertisement.setAdInit &&
			this.props.SetAdvertisement.setAdInit.data &&
			this.props.SetAdvertisement.setAdInit.data.adTwo &&
			this.props.SetAdvertisement.setAdInit.data.adTwo.adPicture : '';
		var targetUrl1 =
			this.props.SetAdvertisement &&
			this.props.SetAdvertisement.setAdInit &&
			this.props.SetAdvertisement.setAdInit.data &&
			this.props.SetAdvertisement.setAdInit.data.adOne &&
			this.props.SetAdvertisement.setAdInit.data.adOne.adUrl;
		var targetUrl2 =
			this.props.SetAdvertisement &&
			this.props.SetAdvertisement.setAdInit &&
			this.props.SetAdvertisement.setAdInit.data &&
			this.props.SetAdvertisement.setAdInit.data.adTwo &&
			this.props.SetAdvertisement.setAdInit.data.adTwo.adUrl;
		requestParam = {
			fCid : this.props.fcid ? this.props.fcid : '',
			adPicture1 : imageUrl1 ? imageUrl1 : '',
			adPicture2 : imageUrl2 ? imageUrl2 : '',
			adUrl1 : targetUrl1 ? targetUrl1 : '',
			adUrl2 : targetUrl2 ? targetUrl2 : '',
			layoutType: type ? type : 1,
		}
		return (
			<Modal
				title="设置广告"
				style={{top: 50}}
				width={600}
				visible={true}
				onOk={() => this.saveAd()}
				onCancel={() => this.props.hideModal() }
        		maskClosable={false}
				className="setAdModalBox"
			>
				<AdFormat
					type={type}
					getType={this.getType}
				/>
				<UploadPic
					imageUrl1={imageUrl1}
					imageUrl2={imageUrl2}
					targetUrl1={targetUrl1}
					targetUrl2={targetUrl2}
					getInptOneValue={this.getInptOneValue}
					getInptTwoValue={this.getInptTwoValue}
					getPicOneUrl={this.getPicOneUrl}
					getPicTwoUrl={this.getPicTwoUrl}
					getUpState1={this.getUpState1}
					getUpState2={this.getUpState2}
					key1={Math.random()}
					key2={Date.now()}
				/>

			</Modal>
		);
	}
}
