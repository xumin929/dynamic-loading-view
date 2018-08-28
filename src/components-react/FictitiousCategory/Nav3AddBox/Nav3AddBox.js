/**
 * Created by songjuxi on 2017/5/23-.-.
 */
import React from 'react'
import './style.css'
import {Tree, Row, Col, Modal, Form, Radio, Button, Input, Checkbox, message, Spin} from 'jdcloudui'
import GoodsClassify from './GoodsClassify/GoodsClassify'
const TreeNode = Tree.TreeNode
const FormItem = Form.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group;


@Form.create()
export default class Nav3AddBox extends React.Component {
  static addClass(el, className) {
    el.className += (' ' + className)
  }

  static removeClass(el, className) {
    const newClassName = el.className.replace(className, "");
    el.className = newClassName
  }

  constructor(props) {
    super(props)
    this.state = {updateLoading: false}
    this.handleCheck = this.handleCheck.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.releateChange = this.releateChange.bind(this)
    this.offsetLeft = 0
    this.offsetTop = 0
    this.arr = []
  }

  componentWillMount() {
    const {category3Label: {data: {result: category3Label}}, category3FlattenArray} = this.props.FC
    const getEditData=()=>{
      if (this.props.fcid) {
        this.props.getCategory3Edit({fCid: this.props.fcid},this.props.associationType==1)
          .then(result => {
            if(result.code!=0){
              message.error(result.msg, 2);
            }
          }).catch(err => {
          message.error('出错了', 2);
        })
      }
    }
    if (this.props.associationType == 1) {
      this.props.getCategory3().then(result => {
        if (result.code == 0) {
          getEditData()
        }else{
          message.error(result.msg, 2);
        }
      }).catch(err => {
        message.error('出错了', 2);
      })
    } else {
      this.props.getCategory3Label().then(result => {
        if (result.code == 0) {
          getEditData()
        }else{
          message.error(result.msg, 2);
        }
      }).catch(err => {
        message.error('出错了', 2);
      })
    }

  }

  componentDidMount() {

    Nav3AddBox.addClass(document.body, 'f-oh-imp')
  }



  componentWillUnmount() {
    Nav3AddBox.removeClass(document.body, 'f-oh-imp')
  }

  handleCheck(e, flag) {
    const {setFieldsValue, getFieldValue} = this.props.form
    this.props.form.setFieldsValue({[flag ? 'categoryList' : 'labelData']: e})
  }

  handleCancel() {
    this.props.hideModal()
    this.props.clearCategory3Edit()
  }

    handleSubmit() {
    debugger
    const {setFieldsValue, getFieldValue} = this.props.form;
    const {category3edited} = this.props.FC
    const associationType = getFieldValue('associationType');

    console.log("this.props====",this.props.form.getFieldsValue());

    this.props.form.validateFields((err, value) => {
        if(getFieldValue('associationType') == 1){
          delete err.labelData;
        }
      console.log("categoryList////",err);
      if (!err || Object.keys(err).length == 0){
        value.parentFCid = this.props.parentId
        value.fCid = this.props.fcid
        if (associationType == 2) {
          value.categoryList = value.labelData
        }
        delete value.labelData
        value.hasCategoryModify = JSON.stringify(value.categoryList.map(item => parseFloat(item))) == JSON.stringify(category3edited) ? 0 : 1
        console.log('value~~~~~~~~~~', value)
        this.setState({updateLoading: true})
        if (!this.props.fcid) {
          this.props.addCategory3(value)
            .then(result => {
              if (result.code == 0) {
                message.success(result.msg, 2);
                this.props.refresh(1)
                this.props.changeEdit()
                this.props.hideModal(() => {
                  this.setState({updateLoading: false})
                })
                this.props.clearCategory3Edit()
              } else {
                this.setState({updateLoading: false})
                message.error(result.msg, 2);
              }

            }).catch(err => {
            this.setState({updateLoading: false})
            message.error('出错了', 2);
          })
        } else {
          this.props.updateCategory3(value)
            .then(result => {
              if (result.code == 0) {
                message.success(result.msg, 2);
                this.props.refresh()
                this.props.clearCategory3Edit()
                this.props.changeEdit()
                this.props.hideModal(() => {
                  this.setState({updateLoading: false})
                })
              } else {
                this.setState({updateLoading: false})
                message.error(result.msg, 2);
              }
            }).catch(err => {
            this.setState({updateLoading: false})
            console.log(err)
            message.error('出错了', 2);
          })
        }

      }
    })
  }

  releateChange(e) {
    const value = e.target.value
    const {category3Label: {data: {result: category3Label}}, category3FlattenArray} = this.props.FC
    if (value == 2) {
      if (category3Label.length == 0) this.props.getCategory3Label()
    } else {
      if (category3FlattenArray.length == 0) {
        this.props.getCategory3().then(result => {
          console.log(result)
          if (result.code != 0) {
            message.error(result.msg, 2);
          }
        }).catch(err => {
          message.error('查询失败！', 2);

        })
      }
    }
  }

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {category3edited, category3Label: {data: {result: category3Label}}, category3FlattenArray} = this.props.FC
    const industryOption = category3Label.map(item => {
      const obj = {label: item.tagName, value: item.id}
      return obj
    })
    let initialGoodsClassify = []
    let initialLabel = []
    if (this.props.associationType == 2) {
      initialLabel = category3edited
    }else{
      initialGoodsClassify = category3edited
    }
    const isGoodsClassify = getFieldValue('associationType') == 1
    console.log('isGoodsClassify',isGoodsClassify ,category3FlattenArray)
    return (<div >
      <Modal
        title="添加三级分类导航"
        visible={true}
        onOk={this.handleSubmit}
        width={800}
        onCancel={this.handleCancel}
        maskClosable={false}
        wrapClassName="nav3-modal"
        bodyStyle={{overflow: 'hidden'}}
        footer={[
          <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
          <Button key="submit" type="primary" size="large" onClick={this.handleSubmit}
                  loading={this.state.updateLoading}>
            保存
          </Button>,
        ]}
      >
        {this.props.FC.category3classifyloading || this.props.FC.category3labelloading ? <div className="load-box">
          <Spin size="large"/>
        </div> : null}
        <Form  >
          <FormItem
            label="三级分类导航名称"
            labelCol={{span: 5}}
            wrapperCol={{span: 12}}
            className="category-name"
          >
            {getFieldDecorator('name', {
              initialValue: this.props.name,
              rules: [
                {required: true, message: '名称不能为空'},
                {max: 20, message: '最多20个字符', transform: value => value.replace(/[\u4e00-\u9fa5]/ig, "aa")},]
            })(<Input style={{width: 200}}/>)}
          </FormItem>
          <FormItem
            label="关联"
            labelCol={{span: 5}}
            wrapperCol={{span: 19}}
          >
            {getFieldDecorator('associationType', {
              initialValue: this.props.associationType || 1,
              rules: [{required: true, message: '请选择行业标签'}]

            })(<RadioGroup
              onChange={this.releateChange}
            >
              <Radio value={1}>商品分类</Radio>
              <Radio value={2}>行业标签</Radio>
            </RadioGroup>)}

          </FormItem>
          {isGoodsClassify
            ? <FormItem
              label="商品分类"
              labelCol={{span: 5}}
              wrapperCol={{span: 18}}
            >
              {getFieldDecorator('categoryList', {
              rules: [{required: true, message: '请选择商品分类'}],
              initialValue:initialGoodsClassify
            })(
              <GoodsClassify
                category3FlattenArray={this.props.FC.category3FlattenArray}
                handleCheck={this.handleCheck}
                category3edited={category3edited}
                changeCategory3Arr={this.props.changeCategory3Arr}
                isEdit={this.props.form.getFieldValue('associationType')===this.props.associationType&&this.props.fcid}
              />)}
            </FormItem>
            : <FormItem
              label="行业标签"
              labelCol={{span: 5}}
              wrapperCol={{span: 19}}
              className="label-star"
            >
              {getFieldDecorator('labelData', {
                rules: [{required: true, message: '请选择行业标签'}],
                initialValue: initialLabel
              })(<CheckboxGroup
                className="industryLabel"
                options={industryOption}
                onChange={this.handleCheck}
              />)}
            </FormItem>
          }
          <FormItem
            label="前台展示"
            labelCol={{span: 5}}
            wrapperCol={{span: 12}}
          >
            {getFieldDecorator('homeShow', {
              initialValue: this.props.homeShow || 1,
              rules: [{required: true, message: '请选择'}]

            })(<RadioGroup>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </RadioGroup>)}
          </FormItem>
        </Form>

      </Modal>
    </div>)
  }
}
