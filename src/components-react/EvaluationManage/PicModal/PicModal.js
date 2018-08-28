/**
 * author:liuyang
 * date:2017-03-28
**/
import React, {Component} from 'react';
import {Modal} from 'jdcloudui';
require('./style/PicModal.css');
const spImg = require('./style/sp-img.png');


export default class PicModal extends Component {
   constructor(props) {
      super(props);
  }


  render() {
    let { data, visible, index } = this.props;
    return (
      <div className="modalBox">
        <Modal
          title={null}
          footer={null}
          onCancel={this.props.handleCancel}
          visible={visible}
          style={{top: '50%'}}
        >
          <div className="comment-popup-img">
            <a href="javascript:;" onClick={this.props.handleCancel} className="comment-popup-img-close" style={{background: `url(${spImg}) no-repeat -100px 0`}}>{''}</a>
            <div className="comment-img-mask">{''}</div>
            <div className="comment-img-slide">
              <div className="comment-bd">
                <ul>
                  {
                    data.map((item, i) => <li style={{display: index == i ? 'block' : 'none'}} key={i}><img src={`${item.url}?img/s/700/700`} width="630" height="630" /></li>)
                  }
                </ul>
              </div>
              <a href="javascript:;" onClick={() => this.props.handleImgChange()} className="comment-prev" style={{background: `url(${spImg}) no-repeat 0 0`}}>{''}</a>
              <a href="javascript:;" onClick={() => this.props.handleImgChange(true)} className="comment-next" style={{background: `url(${spImg}) no-repeat -50px 0`}}>{''}</a>
            </div>
          </div>
        </Modal>
      </div>
     )
   }
}