
import React, { Component } from 'react';
import { Input, Icon } from 'jdcloudui';
require('./style/select_css.css');



class InputSelectWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
    this.valueName = '';
  }


  componentWillMount(){

  }

  //获取焦点
  handlerFocus = () => {
    const { flag } = this.state;
    this.setState({flag: !flag})
  };

  //鼠标移开
  handlerBlur = () => {
    this.valueName = '';
    setTimeout(() => this.setState({flag: false}), 100)
  };

  //获取输入的value值
  handlerChange = (e) => {
    const { flag } = this.state;
    this.valueName = e.target.value;
    const value = {
      id: null,
      name: e.target.value
    };
    if(!flag) {
      this.setState({flag: true})
    }
    this.props.onChange(value)
  };

  //下拉选择
  handlerClick = (e) => {
    const value = {
      id: e.target.id,
      name: e.target.innerHTML
    };
    this.props.onChange(value)
  };


  render() {
    const { flag } = this.state;
    const { dataArr, disabled, type } = this.props;
    const value = this.props.value ? this.props.value : null;
    const valueId = (value && value.id) ||'A999B';
    const data = dataArr ? dataArr.filter(item => item[(type && (type.name || type.enName)) || 'name'].indexOf(this.valueName) !== -1) : [];
    const style = this.props.style || {};
    style.minHeight = '32px';
    console.log(this.props);
    return (
      <div className="select-box-content">
        <Input
          style={style}
          defaultValue={null}
          placeholder="请输入品牌名称"
          disabled={disabled ? disabled : false}
          value={(value && value.name) ? value.name : (value && value.id) ? dataArr.filter(item => item[(type && type.id) || 'id'] == value.id)[0] ? dataArr.filter(item => item[(type && type.id) || 'id'] == value.id)[0][(type && type.name) || 'name'] : null : null}
          onClick={this.handlerFocus}
          onBlur={this.handlerBlur}
          onChange={(e) => this.handlerChange(e)}
        />
        <span className={flag ? 'select-arrow-v' :'select-arrow'} />
        {
          data && data.length > 0 ? (
            <div
              className="select-box-content-box"
              style={{maxHeight: flag ? 250 : 0, width: style.width || '100%', top: style.height && parseInt(style.height) < 32 ? 34 : parseInt(style.height) + 2}}
            >
              <ul className="select-box-content-ul">
                {
                  data.map((item, index) => (
                      <li
                        className={valueId == item[(type && type.id) || 'id'] ? 'select-dropdown-menu-item-selected' : 'select-dropdown-menu-item'}
                        key={index + 'A321'}
                        id={item[(type && type.id) || 'id']}
                        onClick={(e) => this.handlerClick(e)}
                      >
                        {item[(type && type.name) || 'name']}
                      </li>
                    )
                  )
                }
              </ul>
            </div>
          ) : null
        }
      </div>
    )
  }

}
export default InputSelectWrap;