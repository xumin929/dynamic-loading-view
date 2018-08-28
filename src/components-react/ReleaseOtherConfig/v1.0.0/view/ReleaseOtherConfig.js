/**
 * @file 发布商品-其他设置Tab组件
 */
import React, { Component } from 'react';

import OtherFreightInfo from '../../../OtherFreightInfo/v1.0.0/view/index';
import OtherSaleMode from '../../../OtherSaleMode/v1.0.0/view/index';
import OtherAftersaleStatement from '../../../OtherAftersaleStatement/v1.0.0/view/index';
import OtherFavourable from '../../../OtherFavourable/v1.0.0/view/index';
import OtherElseInfo from '../../../OtherElseInfo/v1.0.0/view/index';
import OtherDeliverySet from '../../../OtherDeliverySet/v1.0.0/view/index';

export default class ReleaseOtherConfig extends Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){

  }
  componentDidMount(){
    console.log(this.props.type)
    console.log(this.props.itemTmplPublishVo)
  }
  
  render() {
    return (
      <div>
        {this.props.type == 3 ? 
          <OtherDeliverySet 
            type={this.props.type}
            itemTmplPublishVo={this.props.itemTmplPublishVo}
            updateItemTmplAction = {this.props.updateItemTmplAction}/> :
          <OtherFreightInfo
            type={this.props.type}
            itemTmplPublishVo={this.props.itemTmplPublishVo}
            updateItemTmplAction = {this.props.updateItemTmplAction}/>
        }
        <OtherSaleMode 
          type={this.props.type}
          itemTmplPublishVo={this.props.itemTmplPublishVo}
          updateItemTmplAction = {this.props.updateItemTmplAction}/>
        <OtherAftersaleStatement 
          type={this.props.type}
          itemTmplPublishVo={this.props.itemTmplPublishVo}
          updateItemTmplAction = {this.props.updateItemTmplAction}/>
        <OtherFavourable  
          type={this.props.type}
          itemTmplPublishVo={this.props.itemTmplPublishVo}
          updateItemTmplAction = {this.props.updateItemTmplAction}/>
        <OtherElseInfo 
           type={this.props.type}
           itemTmplPublishVo={this.props.itemTmplPublishVo}
           updateItemTmplAction = {this.props.updateItemTmplAction}
        />
      </div>
    );
  }
}
