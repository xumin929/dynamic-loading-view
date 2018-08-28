/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  公共按钮组件
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {Button} from 'jdcloudui';
import {Link} from 'react-router-dom';
/* **********  自定义组件  ********** */

class Buttons extends Component {
  constructor(props) {
    super(props);
  }

  renderButton() {
    const btnArr = [];
    if (this.buttonArr) {
      this.buttonArr.map((_btn, _index) => {
        btnArr.push(
          <Link to={_btn.href}>
            <Button {..._btn} key={_index}>{_btn.title}</Button>
          </Link>
        );
      });
    }
    return btnArr;
  }

  render() {
    return (
      <div className="p10 bgf7 mt10">
        {this.renderButton()}
      </div>
    );
  }
}
export default Buttons;
