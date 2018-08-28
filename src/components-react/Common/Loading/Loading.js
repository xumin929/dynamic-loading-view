/*

 * author:LiuYang
 * date:2017-09-05
 * description:进行页面优化给数据返回过程加loading状态提升用户体验
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Spin} from 'jdcloudui';
import './LoadingStyle.css';
export default class Loading extends Component {
  constructor(props,context) {
    super(props,context);
    this.containers = '';
  }
  changeScrollStatus(status){
      if(typeof document !== 'undefined'){
        let bodyElement = document.getElementsByTagName('body');
        if(status){
          bodyElement[0].style.overflow = 'hidden';
        }else{
           bodyElement[0].style.overflow = 'auto';
        }
      }else{}

  }
  render() {
     this.changeScrollStatus(!this.props.loaded);
     return (
      <div>
       {!this.props.loaded && <div id = 'loadForLy'>
                 <div className="example">
                   <Spin size="large"/>
                 </div>
               </div>}
      </div>
      );
  }
}
