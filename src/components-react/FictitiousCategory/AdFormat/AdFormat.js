/**
 * Created by yuanye on 2017/5/23.
 */
import React, {Component} from 'react';
import {Row, Col, Icon } from 'jdcloudui';
import styles from '../SetAdvertisement/style.css';
import ad1 from '../SetAdvertisement/pics/ad1.jpg';
import ad2 from '../SetAdvertisement/pics/ad2.jpg';
import ad3 from '../SetAdvertisement/pics/ad3.jpg';
import ad4 from '../SetAdvertisement/pics/ad4.jpg';


export default class AdFormat extends Component {
	constructor(props, context) {
		super(props, context);		
	}
	handleClick(e){		
		var index = e.currentTarget.dataset.index;		
		//this.props.getType(index);
	}
	
	render(){
		return (
			<div className="AdFormatDivBox">
				<div className="explain"><Icon type="exclamation-circle" />仅支持Jpg、Jpeg、Png格式。大小不能超过1M！</div>				
				<div className="formatItem mr20">
					<div className="ad1 mb15">
						<div className="mb20 text-666">广告位1：270x162 px</div>
						<div className="adPic">
							<img src={ad1}/>
						</div>
					</div>
					<div className="ad2">
						<div className="mb20 text-666">广告位2：270x270 px</div>
						<div className="adPic">
							<img src={ad2}/>
						</div>
					</div>									
				</div>								
				<div className="littleTriangle"></div>	
			</div>			
		)
	}
}
