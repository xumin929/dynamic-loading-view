/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  公共检索组件
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Button, Input, Select, Row, Col} from 'jdcloudui';
const FormItem = Form.Item;
const Option = Select.Option;
/* **********  自定义组件  ********** */
import Promulgator from '../../../Common/Promulgator/Promulgator';
import CategoryPlatform from '../../common/CategoryPlatform/CategoryPlatform';

const items = [
    {title: '平台分类', value: 'cid', type: 'cidInput'},
    {title: '发布者', value: 'publishuserId', type: 'Promulgator'},
    {title: '商品名称', value: 'itemName', type: 'Input'},
    {title: '商品库编码', value: 'itemId', type: 'Input'},
    {title: '物料号', value: 'productCode', type: 'Input'},
    {title: '商品条码', value: 'barCode', type: 'Input'},
    {title: '商品运营', value: 'operatorId', type: 'Promulgator'}
];
const bottons = [
    {value: '查询', type: 'primary', action: 'submit'},
    {value: '重置', type: '', action: 'reset'},
];

// 商品库管理>>redux
import {
    queryItemLibraryListAction as onSearch,
    setSearchHistoryAction as history
} from '../../common/Search/redux/queryItemLibraryList_redux';

@connect(
  state => ({search: state.queryItemLibraryList}),
  dispatch => bindActionCreators({onSearch, history}, dispatch)
)

class Searchs extends Component {
  constructor(props) {
    super(props);

  }

  /*
   * 查询提交
   * */
  onSubmit() {
    let params = this.props.form.getFieldsValue();
    console.log(params)
    for(var i in params){
      if(!params[i]){
        console.log(params[i])
        delete params[i]
      }
    }
    console.log(params,JSON.stringify(params))
    params.pageNum = 1;
    params.pageSize = 10;
    params.publishuserId = params.publishuserId != '0' ? params.publishuserId : null;
    params.operatorId = params.operatorId != '0' ? params.operatorId : null;
    params.itemId = params.itemId ? isNaN(params.itemId*1) ? '0' : parseInt(params.itemId) : null;
    this.props.onSearch(params);
    this.props.history(params);
  }

  /*
   * 查询重置
   * */
  // onReset = () => {
  //   this.setState({key: new Date() + '323'})
  // };

  /*
   * 日期
   * */
  renderDate() {

  }

  /*
   * select
   * */
  renderSelect(_search) {
    const optionArr = [];
    if (_search.children.length > 0) {
      _search.children.map(_ser => {
        optionArr.push(
          <Option value={_ser.value}>{_ser.title}</Option>
        );
      });
    }
    return (
      <Select defaultValue="lucy" style={{width: 120}}>
        {optionArr}
      </Select>
    );
  }

  /*
   * input
   * */
  renderInput(_search) {
    return <Input placeholder={_search.title} {..._search}/>;
  }

  callBackSecondCategory(id) {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({cid: id})
  }

  renderCidInput(_search) {
    return <CategoryPlatform callBack={(id) => this.callBackSecondCategory(id)}/>;
  }

  /*
   * importModuls
   * */
  renderPromulgator(_search) {
    return <Promulgator />;
  }

  /*
   * inputManage
   * 根据传入类型返回对应的查询条件
   * input,select,datapicker
   * */
  inputManage(_search) {
    if (_search.type === 'Select') return this.renderSelect(_search);
    if (_search.type === 'Input') return this.renderInput(_search);
    if (_search.type === 'Promulgator') return this.renderPromulgator(_search);
    if (_search.type === 'cidInput') return this.renderCidInput(_search);
    // if (_search.type === 'DatePicker') return this.renderDatePicker(_search);
    // if (_search.type === 'MonthPicker') return this.renderMonthPicker(_search);
    // if (_search.type === 'RangePicker') return this.renderRangePicker(_search);
    // if (_search.type === 'InputNumber') return this.renderInputNumber(_search);
  }

  /*
   *  form表单渲染方法
   *  通过type类型生成input,select,data等表单内容
   * */
  renderFormItem(search) {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    // 未设置检索条件，显示默认项
    if (!search) {
      return (
        <FormItem label="未命名" key="未命名">
          {getFieldDecorator('未命名')(
            <Input placeholder="未命名"/>
          )}
        </FormItem>
      );
    }
    // 根据传入的检索配置文件生成form表单
    const searchArr = [];
    search.map(_search => {
      console.log(_search,search.value)
      if(_search.type == 'Promulgator') {
        searchArr.push(
          <FormItem label={_search.title} key={_search.value}>
            {getFieldDecorator(_search.value, {initialValue: '0'})(
              this.inputManage(_search)
            )}
          </FormItem>
        );
      } else {
        searchArr.push(
          <FormItem label={_search.title} key={_search.value}>
            {getFieldDecorator(_search.value)(
              this.inputManage(_search)
            )}
          </FormItem>
        );
      }
    });
    console.log(searchArr)
    return searchArr;
  }

  /*
   *  表单按钮渲染方法
   *  通过action动作来判断“查询”与“重置”操作
   * */
  rednerButtons(bottons) {
    if (!bottons) {
      return <Button onClick={() => this.onSubmit()}>未命名</Button>;
    }
    const buttonArr = [];
    bottons.map(_btn => {
      buttonArr.push(
        <Button
          key={_btn.value}
          {..._btn}
          onClick={_btn.action === 'submit' ? () => this.onSubmit() : () => this.props.onReset()}
          style={{marginTop: _btn.action === 'submit' ? '-30px' : '10px'}}
        >
          {_btn.value}
        </Button>
      );
    });
    return buttonArr;
  }

  render() {
    return (
      <div className="ui-search">
        <div>
          <Row>
            <Col span={24}>
              <Form layout={this.props.layout || 'inline'}>
                {this.renderFormItem(items)}
              </Form>
              <div className="r-action">
                {this.rednerButtons(bottons)}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Form.create()(Searchs);
