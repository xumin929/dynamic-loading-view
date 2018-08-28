/**
 * @Desc 类目添加form页面
 * @Author ZhengZhiMin
 * @Date 2017-2-6
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Input, Form, Select, Button, Icon, Col, message, InputNumber, TreeSelect, Radio } from 'jdcloudui';
import BaseComponent from '../../Common/BaseComponent';
import {submit, getCategoryByPid,getParentCategoryByPlatformId} from './redux';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
let uuid = 0;

@Form.create({withRef:true})
@connect(
  state => ({categoryAdd:state.categoryAdd}),
  dispatch => bindActionCreators({submit ,getCategoryByPid,getParentCategoryByPlatformId}, dispatch)
)
export default class CategoryAdd extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {disabled:true};
    this.state.unitVisible = false;
    this.unitJson = {};
    this.keys=[];
    this.treeCategoryValue = [];
    this.parentKey = '';
  }

  /**
   * 删除计量单位
   * @param k
     */
  handleRemove(k){
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
    //删除 unitJson
    delete this.unitJson["unit-"+k];
    this.processFormUnit();
  }

  /**
   * 添加计量单位
   */
  handleAdd(){
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    let keys = form.getFieldValue('keys');
    if(keys.length>29){
      message.error("计量单位最大支持30组！");
      return;
    }
    var addKey = 1;
    if(keys.length>0){
      addKey=keys[keys.length-1]+1;
    }
    let nextKeys = keys.concat(addKey);
    this.keys = nextKeys;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
    //增加unitJson
    this.unitJson["unit-"+addKey] = "";
  }

  /**
   * 是否终极分类，联动计量单位是否展示
   */
  handleChange(){
    this.setState({
      unitVisible:!this.state.unitVisible
    });
  }

  /**
   * 校验value是否符合规则
   * @param rule
   * @param value
   * @param callback
     */
  filterSpecialChar = (rule, value, callback) => {
    let reg =/[\*\?]/g;
    if(reg.test(value)){
       callback('不支持*,?特殊字符!');
    }
    callback();
  };

  processUnitValue(e) {
    var value = e.target.value;
    var key = e.target.id;
    this.unitJson[key] = value;
    this.processFormUnit();
    return value;
  }

  processFormUnit(){
    //每次 单位修改后 重新渲染 计算出结果 放到 form里
    var temp = "";
    Object.keys(this.unitJson).map((key)=>{
      if (this.unitJson[key] && this.unitJson[key] != "" && this.unitJson[key].length > 0){
        temp += (this.unitJson[key] +",");
      }
    });
    if(temp.length>1 && temp.indexOf(",")>0){
      temp = temp.substring(0,temp.lastIndexOf(","));
    }
    const {setFieldsValue} = this.props.form;
    setFieldsValue({'unit':temp});
  }

  /**
   * 生成TreeCategoryDate
   */
  getTreeCategoryData () {
    let treeData = this.props.categoryAdd.data.data;
    let treeCategoryDate = [];
    if(treeData && treeData.length > 0){
      let dataJson = JSON.stringify(treeData);
      treeCategoryDate = JSON.parse(dataJson);
    }
    // 设置首级类目 treeSelect中 value和key取data数据中的key标示唯一
    let headCategory = {label:'首级类目',value:'-1',key:'-1'};
    treeCategoryDate.unshift(headCategory);
    return treeCategoryDate;
  }

  /**
   * 父级类目变化时触发function
   * @param value
   * @param label
   * @param extra
     */
  onTreeCategoryChange=(value,label,extra)=>{
    this.treeCategoryValue = value;
  };

  /**
   * 校验父级分类是否符合要求
   * @param rule
   * @param value
   * @param callback
     */
  validateParentCategory = (rule, value, callback) => {
    if (!value){
      callback();
    }
    // 获取选中的父级分类对象数据
    let dataSource = this.props.categoryAdd.data.data;
    let parentCategory = {};
    if (value && value == '-1'){
      parentCategory = {
        key : '-1',
        cid : -1,
        hasLeaf : 0,
        lev: 0
      }
    }else{
      parentCategory = this.getCategoryByKey(value,dataSource);
    }
    let cid = parseInt(parentCategory.cid);
    let key = parentCategory.key;
    let hasLeaf = parseInt(parentCategory.hasLeaf);
    let lev = parseInt(parentCategory.lev);
    /*let curLen = 0;
    let children = this.props.categoryAddForm.children;
    if (children && children.length > 0){
      curLen = children.length;
    }*/
    // 判断当前分类父id与选中分类cid是否一致
    if (cid && cid == this.props.categoryAddForm.parentCid){
      callback();
    }
    // 判断当前分类与选中分类cid是否一致
    if (cid && cid == this.props.categoryAddForm.cid){
      callback('当前分类不能成为父级分类，请重新选择！');
    }
    // 当前分类选择‘首级分类’，需要包含子分类
    /*if (cid && cid == -1 && curLen == 0){
      callback('当前分类需包含子分类，请重新选择！');
    }*/
    // 选中的父级分类不能为终极分类
    if (hasLeaf && hasLeaf == 1){
      callback('当前父级分类为终极分类，请重新选择！');
    }
    // 计算当前分类的深度
    let deep  = this.getDepthForCategory(this.props.categoryAddForm);
    if ((Number(lev)+Number(deep)) > 4){
      callback('总分类级别大于四级，请重新选择！');
    }
    const { form } = this.props;
    form.setFieldsValue({
      parentCid: cid,
      lev:Number(lev)+1
    });
    if (cid && cid != this.props.categoryAddForm.parentCid){
      form.setFieldsValue({
        oldParentCid:this.props.categoryAddForm.parentCid,
        newParentKey:value
      });
    }
    callback();
  };

  /**
   * 计算当前分类的深度
   * @param category
     */
  getDepthForCategory(category){
    // 采用柯里化函数，类似数组的map
    let map = cb => arr => Array.prototype.map.call(arr,cb);
    // 求数组的最大值
    let max = arr => arr.reduce((acc,cur) => {
      if (cur >= acc){
        return cur;
      }else{
        return acc;
      }
    },arr[0]);

    let nextChildren = node => {
      if (!node || !node.children || node.children.length <= 0){
        return 1;
      }else{
        // 求子节点的长度，并取最大值
        let deeps = map(nextChildren)(node.children);
        return 1 + max(deeps);
      }
    };
    let deep = nextChildren(category);
    return deep;
  }

  /**
   * 通过key从list获取类目对象
   * @param key
   * @param list
     */
  getCategoryByKey(key,list){
    var data = {};
    var temp = (key +"").split("-");
    if(temp.length==1){
      data = list[temp[0]];
    }
    if(temp.length==2){
      if(list[temp[0]].children){
        data = list[temp[0]].children[temp[1]];
      }
    }
    if(temp.length==3){
      if(list[temp[0]].children[temp[1]].children){
        data = list[temp[0]].children[temp[1]].children[temp[2]];
      }
    }
    if(temp.length==4){
      if(list[temp[0]].children[temp[1]].children[temp[2]].children){
        data = list[temp[0]].children[temp[1]].children[temp[2]].children[temp[3]];
      }
    }
    return data;
  }

  getParentKey(parentCid){
    if (parentCid && parentCid != -1){
      let key = this.props.categoryAddForm.index;
      if(key.length == 1){
        this.parentKey = key;
      }else{
        this.parentKey = key.substring(0,key.length-2);
      }
    }else{
      this.parentKey = '-1';
    }
  }

  render(){
    const { getFieldDecorator , getFieldValue } = this.props.form;
    const formItemLayout = {labelCol: { span: 5 }, wrapperCol: { span: 14 }};

    //是否是添加新分类，添加新分类不包含父级分类下拉列表
    const parentCid= this.props.categoryAddForm.parentCid;
    const cid = this.props.categoryAddForm.cid;
    // 判断是否编辑类目,展示父级类目
    let categoryOptions = [];
    let treeDate = [];
    if(cid && cid > -1){
      if(this.props.categoryAdd.loaded && this.props.categoryAdd.data){
        treeDate = this.getTreeCategoryData();
        this.getParentKey(parentCid);
      }

    }else{
      // 新增类目，判断是否是新增一级类目还是新增子类目
      if(parentCid && parentCid > -1){
        let option =<Option key={this.props.categoryAddForm.parentCid}>
          {this.props.categoryAddForm.parentCidView}</Option>;
        categoryOptions.push(option);
      }
    }
    const lev = this.props.categoryAddForm.lev;
    if(lev == 4){
      this.state.disabled = true;
      this.state.unitVisible = true;
    }
    const children = this.props.categoryAddForm.children;
    if(children&&children.length>0){
      this.state.disabled = true;
    }
    getFieldDecorator('keys', { initialValue: this.keys });
    var keys = getFieldValue('keys');
    //编辑进来的时候 初始化值
    if(this.props.categoryAddForm.cid > 0 && this.props.categoryAddForm.unit){
      keys.concat(this.props.categoryAddForm.unit.split(",").length);
    }
    const formItems = keys.map((k, index) => {
      return (
        <Col span="5" style={{minHeight:'40px'}}>
          <FormItem required={false}  key={k} >
            {getFieldDecorator(`unit-${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
              {validator : this.filterSpecialChar.bind(this)},
              {max:5, message: '计量单位不超过5个字符！'}
              ],
              getValueFromEvent:this.processUnitValue.bind(this),
              initialValue:this.unitJson["unit-"+k]
            })(
              <Input placeholder="请输入内容" maxLength="30" style={{ width: '60px', marginRight: 8 }} />
            )}
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.handleRemove(k)}
            />
          </FormItem>
        </Col>
      );
    });
    return (
      <div>
        <Form>
          { getFieldDecorator('parentCid', { initialValue: this.props.categoryAddForm.parentCid})(<Input type="hidden" />)}
          { getFieldDecorator('cid', { initialValue: this.props.categoryAddForm.cid})(<Input type="hidden" />)}
          { getFieldDecorator('lev', { initialValue: this.props.categoryAddForm.lev })(<Input type="hidden" />)}
          { getFieldDecorator('uuid', { initialValue: this.props.categoryAddForm.uuid })(<Input type="hidden" />)}
          { getFieldDecorator('unit', { initialValue: this.props.categoryAddForm.unit})(<Input type="hidden" />)}
          { getFieldDecorator('key', { initialValue: this.props.categoryAddForm.key})(<Input type="hidden" />)}
          { getFieldDecorator('index', { initialValue: this.props.categoryAddForm.index})(<Input type="hidden" />)}
          {cid && cid > -1 ? getFieldDecorator('oldParentCid')(<Input type="hidden" />):''}
          {cid && cid > -1 ? getFieldDecorator('newParentKey')(<Input type="hidden" />):''}
          {cid && cid > -1 ?
            <FormItem label="父级分类"  {...formItemLayout} hasFeedback>
              {getFieldDecorator('parentCidView', {
                rules: [
                  { required: true, message: '请选择父级分类' },
                  {validator : this.validateParentCategory.bind(this)}
                ],
                initialValue:this.parentKey
              })(
                <TreeSelect
                  value={this.treeCategoryValue}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={treeDate}
                  placeholder="请选择父级分类"
                  onChange={this.onTreeCategoryChange}
                  showSearch
                  treeNodeFilterProp='title'
                />
              )}
            </FormItem>
            : parentCid && parentCid == -1 ? '' :
            <FormItem label="父级分类"  {...formItemLayout}>
              {getFieldDecorator('parentCidView', {
                rules: [{ required: true, message: '请选择父级分类' }],
                initialValue:this.props.categoryAddForm.parentCidView
              })(
                <Select>
                  {categoryOptions}
                </Select>
              )}
            </FormItem>
          }

          <FormItem label="分类名称" {...formItemLayout} hasFeedback>
            {getFieldDecorator("categoryName",{
              rules: [
              {required: true, message: '请输入分类名称！' },
              {max:30, message: '分类名称不能超过30个字符！' },
              {validator : this.filterSpecialChar.bind(this)}
              ],
              initialValue:this.props.categoryAddForm.categoryName
            })
            (<Input  placeholder="请输入分类名称" maxLength="30"/>)}
          </FormItem>

          <FormItem label="排列序号 " labelCol={{span:5}} wrapperCol={{span:8}} hasFeedback>
            {getFieldDecorator("sortNumber",
              {rules: [
                { required: true, message: '排列序号!' },
                {pattern:/^\+?[1-9][0-9]*$/,message:'排列序号必须大于1整数！'}
              ],
              initialValue:this.props.categoryAddForm.sortNumber}
              )(
              <InputNumber min={1} max={1000} placeholder="排列序号" />)}
          </FormItem>

          <FormItem label="关键词" {...formItemLayout} hasFeedback>
            {getFieldDecorator("keyWords",{
              rules: [
               {validator : this.filterSpecialChar.bind(this)},
               {max:300, message: '关键词不能超过300个字符！'}
              ],
              initialValue:this.props.categoryAddForm.keyWords
            })
            (<Input placeholder="请输入关键词" type="textarea" maxLength="300"/>)}
          </FormItem>

          <FormItem  label="是否终极分类" {...formItemLayout}>
            {getFieldDecorator('hasLeaf',{
              initialValue: this.props.categoryAddForm.hasLeaf})
            (
              <RadioGroup onChange={()=>this.handleChange()}>
                <Radio value={1} disabled={this.state.disabled}>是</Radio>
                <Radio value={0} disabled={this.state.disabled} >否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          {this.state.unitVisible==false?"":
           <div>
            <FormItem label="简码" {...formItemLayout} hasFeedback>
              {getFieldDecorator("simpleCode",{
                initialValue:this.props.categoryAddForm.simpleCode,
                rules: [
                  {max:10, message: '简码不能超过10个字符！'},
                  {pattern:/^[A-Za-z0-9]+$/,message:'简码必须是数字和字母！'}
                ]
              })
              (<Input placeholder="请输入关键词" maxLength="10"/>)}
            </FormItem>
            {/* <FormItem label="类目类型" {...formItemLayout} >
              {getFieldDecorator("cateType",{
                rules: [],
                initialValue:this.props.categoryAddForm.cateType?this.props.categoryAddForm.cateType:2
              })
              (<RadioGroup>
                <Radio value={1}>O2O</Radio>
                <Radio value={2}>实物</Radio>
              </RadioGroup>)}
            </FormItem> */}
            <FormItem label="添加计量单位" labelCol={{ span: 5 }} visible = {false}>
              {formItems}
            <Button onClick={()=>this.handleAdd()}  style={{width: '60'}}>添加</Button>
            </FormItem>
           </div>
          }
        </Form>
      </div>
    );
  }

  componentWillMount(){
    if(this.props.categoryAddForm.parentCid && this.props.categoryAddForm.parentCid >-1){
      //如果非一级类目，则获取当前
      this.setState({disabled:!this.state.disabled});
    }

    if(this.props.categoryAddForm.unit){
      var  tmp = this.props.categoryAddForm.unit.split(",");
      for(var i=1 ;i<=tmp.length;i++){
        this.unitJson["unit-"+i] = tmp[i-1];
        this.keys.push(i);
      }
    }
      //如果是点击编辑进来且终极节点为true，则出
    const hasLeaf = this.props.categoryAddForm.hasLeaf;
    if(this.props.categoryAddForm.cid > 0) {
      if (hasLeaf == 1) {
        this.state.unitVisible = true;
      }
    }
  }

  componentDidMount(){
    if(this.props.categoryAddForm.cid > 0){
      let params = {
        uuid:this.props.categoryAddForm.uuid,
        cid:this.props.categoryAddForm.cid,
        lev:this.props.categoryAddForm.lev,
        hasLeaf:this.props.categoryAddForm.hasLeaf,
        parentCid:this.props.categoryAddForm.parentCid
      };
      if (this.props.categoryAddForm.firstCid){
        params.firstCid = this.props.categoryAddForm.firstCid
      }
      this.props.getParentCategoryByPlatformId(params);
    }
  }

}
