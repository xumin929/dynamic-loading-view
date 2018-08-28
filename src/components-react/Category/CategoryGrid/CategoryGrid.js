/**
 * Created by songshuangwang on 2017/1/19.
 */
import React  from 'react';
import PropTypes from 'prop-types';
import {  Icon, Button, Modal, Table, Row, Col, Checkbox, message } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryListActions from './redux/list_redux';
import * as categorySaveAllActions from './redux/save_all_redux';
import * as categoryAddActions from './redux/add_redux';
import {getBrand} from '../CategoryView/redux';
import BaseComponent from '../../Common/BaseComponent';
import CategoryAdd from '../CategoryAdd/CategoryAdd';
import  Divider from '../../Common/Divider/Divider';
import  CategoryView from '../CategoryView/CategoryView';
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';
import {FuncPermission}  from 'jdcloudecc/components';
import  * as styles from './style/categoryGrid.less';
import './style/style.css';
import {searchNodeLevelName} from './redux/common_redux';
message.config({top: 300, duration: 2});//设置message的位置和延迟消失时间！
@connect(
  state =>{ return {categoryList:{
    ...state.category_grid_list,
    ...state.category_grid_add,
    ...state.category_grid_save_all,

  },brands:state.brands,session:state.session,funcPermissions:state.funcPermissions}},
  dispatch => bindActionCreators({...categoryListActions,
    ...categorySaveAllActions,...categoryAddActions,getBrand,getPlatformFuncPermission}, dispatch)
)
export default class CategoryGrid extends BaseComponent {
  static propTypes = {
    brands: PropTypes.object,
    getBrand: PropTypes.func.isRequired
  };
  constructor(props,context) {
    super(props,context);
    this.state = {
      expandedRowKeys: [],
      visibleView: false,
      brand: {data: [], categoryId: ""},
      confirmLoading:false,
    };
    this.state.visible = false;
    this.state.isSubmit = false;
    this.UUID="";
    this.categoryAddFormTitle='添加新分类';
    this.categoryAddForm  = {};
    this.codesResponse = [];
  }

  /**
   * 页面被渲染之前执行方法
   * 获取权限码
   */
  componentWillMount(){
    this.props.getPlatformFuncPermission();
    this.props.list({parentCategoryId:-1});//查询所有一级类目
    this.UUID=this.getUUID(32,16);//生成32位的uuid(base=16进制)
    console.log("category random uuid:"+this.UUID);
  }

  /**
   * 类目全部展开
   */
  handleExpandAll() {
    //const data = this.props.categoryList.data;
    this.props.getAllCategoryList({uuid:this.UUID});
  }

  searchAllKeys(data,keys){
    for(var index in data){
      var key = data[index]["key"];
      keys.push(key);
      if(data[index]["children"]){
        this.searchAllKeys(data[index]["children"],keys)
      }
    }
  }

  /**
   * 类目全部收起
   */
  handleCloseAll() {
    //this.setState({expandedRowKeys:[]});
    this.props.updateExpandedRowKeys([]);
  }

  handleOnExpandedRowsChange(rows) {
    //this.setState({expandedRowKeys: rows});
    this.props.updateExpandedRowKeys(rows);
  }

  handleOnExpand(expanded, record){
    const  data = this.props.categoryList.data;
    let params ={
      parentCategoryId:record.cid,
      parentKey:record.index,
      uuid:this.UUID
    };
    if(expanded){
      if(!record.children || (record.children && record.children.length==0)){
        this.props.getCategoryByParentId(params,data);
      }
    }
  }
  /**
   * 保存全部更改
   */
  handleSaveAllPlatformCategories(){
    var $this=this;
    this.props.categorySaveAllChanges($this.UUID,$this.platformId)
      .then(function (a,b,c) {
        var isSuccess = a.data.isSuccess;
        var msg = a.msg;
        if(isSuccess){
          Modal.success({
            title: '提示信息',
            content: '保存成功'
          });
        }else{
          Modal.error({
            title: '提示信息',
            content: '保存失败，'+msg
          });
        }
      },
        //服务器失败
      function (a,b,c) {
        var result  = a.response.text;
        Modal.error({
          title: '提示信息',
          content: '保存失败，'+result.msg
        });
      });
  }

  /**
   * 类目排序
   * @param record 参数
   * @param direction 方向
     */
  handleSort(record,direction){
    let data=this.props.categoryList.data;
    var $this=this;
    record.index = record.index +"";
    var keyArr=record.index.split('-');
    if(keyArr && keyArr.length>1) {
      var level = keyArr.length;
    }else{
      var level = 1;
      //keyArr = record.index;
    }
    if(direction == "up"){
      if( (keyArr.length >1 && keyArr[keyArr.length -1] == "0" ) || keyArr == "0"){
        return;
      }
    }else if(direction == "down"){
      var childrenNodes = [];
      searchNodeLevelName(record.parentCid,data,childrenNodes);
      var lastNodeIndex = childrenNodes.length-1;
      if( (keyArr.length >1 && keyArr[keyArr.length -1] == lastNodeIndex  ) || keyArr == lastNodeIndex){
        return;
      }
    }else if(direction == "top"){
      if( (keyArr.length >1 && keyArr[keyArr.length -1] == "0" ) || keyArr == "0"){
        return;
      }
    }else if(direction == "bottom"){
      var childrenNodes = [];
      searchNodeLevelName(record.parentCid,data,childrenNodes);
      var lastNodeIndex = childrenNodes.length-1;
      if( (keyArr.length >1 && keyArr[keyArr.length -1] == lastNodeIndex  ) || keyArr == lastNodeIndex){
        return;
      }
    }
    this.props.categorySort(data,record,direction,$this.UUID,$this.platformId);
  }

  /**
   * 类目删除
   * @param record
     */
  handelDelete(record) {
    const expandedRowKeys = this.props.categoryList.expandedRowKeys;
    const data = this.props.categoryList.data;
    var categoryDelete = this.props.categoryDelete;
    var $this=this;
    Modal.confirm({
      title: '提示',
      content: '删除这些类目将会删除它们的子类目，是否删除？',
      onOk(close) {
        if(record){
          var cid= record.cid;
          var key=record.index;
          var cids=[]; cids.push(cid);
          categoryDelete(data,cids,key,"delete",$this.UUID,expandedRowKeys).
          then(function(result){
            if(result.code && result.code=='0'){
              message.success('删除平台类目成功！');
              //$this.props.updateExpandedRowKeys([]);
            }else{
              message.error(result.msg);
            }
          });
        }else{
          $this.props.batchCategoryDelete(data,$this.UUID,$this.platformId).then(function (result) {
            if(result.code && result.code=='0'){
              message.success('删除平台类目成功！');
              //$this.props.updateExpandedRowKeys([]);
            }else{
              message.error(result.msg);
            }
          });
        }
        close();
      },
      onCancel() {
        return;
      }
    });
  }

  /**
   * 编辑类目
   * @param record
     */
  handleDoEdit(record){
    if(record){
      const data = this.props.categoryList.data;
      this.categoryAddForm = record ;
      this.categoryAddForm.uuid = this.UUID;
      let _this = this;
      if(record.lev>1){
        let keys = record.index.split('-');
        let num = keys[keys.length-1];
        this.categoryAddForm.sortNumber = parseInt(num)+1;
        var parentCategory;
        if(keys.length==2){
          parentCategory = data[keys[0]];
        }
        if(keys.length==3){
          parentCategory = data[keys[0]].children[keys[1]];
          this.categoryAddForm.firstCid = data[keys[0]].cid;
        }
        if(keys.length==4){
          parentCategory = data[keys[0]].children[keys[1]].children[keys[2]];
        }
        this.categoryAddForm.parentCid = parentCategory.cid;
        this.categoryAddForm.parentCidView = parentCategory.categoryName;
        this.categoryAddForm.maxSortNumber = parentCategory.children.length+1;
        this.props.getChildrenByCategory({parentCategoryId:record.cid,uuid:this.UUID}).then(
          (result)=>{
            if(result.code=='0'){
              _this.categoryAddForm.children = result.data;
            }
            _this.showModel('编辑分类');
        });
      }else{
        this.categoryAddForm.parentCid = -1;
        this.categoryAddForm.sortNumber = parseInt(record.index)+1;
        this.categoryAddForm.maxSortNumber = data.length+1;
        this.showModel('编辑分类');
      }
    }

  }

  /**
   * 添加子类目
   * @param record
     */
  handleAddChildCategory(record){
    //如果cid有值，且大于0则为 子节点的父节点
    this.categoryAddForm = {};
    if(record.cid && record.cid >0){
      this.categoryAddForm.parentCid = record.cid;
      this.categoryAddForm.parentCidView = record.categoryName;
    }else{
      this.categoryAddForm.parentCid = -1;
    }
    if(record.lev && record.lev >0){
      this.categoryAddForm.lev = record.lev +1;
    }
    this.categoryAddForm.hasLeaf = 0;
    if(this.categoryAddForm.lev==4){
      this.categoryAddForm.hasLeaf = 1;
    }
    this.categoryAddForm.cid = -1;
    this.categoryAddForm.uuid = this.UUID;
    this.categoryAddForm.platformId = this.platformId;
    //todo 动态计算
    var keyIndex = record.index;
    if(record.children && record.children.length>0){
      this.categoryAddForm.sortNumber = record.children.length + 1;
      keyIndex+=("-"+record.children.length);//设置当前子节点的key
      this.categoryAddForm.index = keyIndex;
      this.showModel('添加子分类');
    }else{
      this.categoryAddForm.sortNumber = 1;//设置当前子节点的key
      this.categoryAddForm.index = keyIndex;
      let params= {
          parentCategoryId: record.cid,
          uuid:this.UUID, type:"add"
        };
      this.props.getCategoryByParentId(params).then(
        (result)=>{
          if(result.code=='0'){
            if(result.data && result.data.length>0){
              this.categoryAddForm.sortNumber = result.data.length + 1;
              keyIndex+=("-"+result.data.length);//设置当前子节点的key
              this.categoryAddForm.index = keyIndex;
            } else{
              keyIndex+="-0";
              this.categoryAddForm.index = keyIndex;
            }
          }else{
            keyIndex+="-0";
            this.categoryAddForm.index = keyIndex;
          }
          this.showModel('添加子分类');
        },
        (error) =>{
          keyIndex+="-0"; //
          this.showModel('添加子分类');
          message.error("查询失败");
        }
      );//查询当前类目下的
    }
  }

  /**
   * 添加一级类目
   */
  handleAddCategory() {
    this.categoryAddForm = {
      cid:-1,
      lev:1,
      parentCid:-1,
      sortNumber:1,
      uuid:this.UUID,
      hasLeaf:0,
      key:0
    };
    const data = this.props.categoryList.data;
    if(data && data.length>0){
      this.categoryAddForm.sortNumber = data.length + 1;
      this.categoryAddForm.index = data.length;
    }
    this.showModel('添加新分类');
  }

  /**
   * model取消
   * @param e
   */
  handleCancel(e) {
    this.setState({
      visible: false,
      confirmLoading: false,
      newRandomKey:this.getUUID(32,16) //添加完了之后清空旧数据，从新渲染组件
    });
  }

  /**
   * 多个模块打开madel弹窗
   * @param title
     */
  showModel(title){
    this.categoryAddFormTitle = title;
    this.setState({visible: true});
    //this.state.newRandomKey=this.getUUID(32,16);//添加完了之后清空旧数据，从新渲染组件
  }

  getDataByKey(key,list){
    var data = [];
    var temp = (key +"").split("-");
    if(temp.length==1){
      data = list[temp[0]];
    }
    if(temp.length==2){
      if(list[temp[0]].children){
        data = list[temp[0]].children;
      }
    }
    if(temp.length==3){
      if(list[temp[0]].children[temp[1]].children){
        data = list[temp[0]].children[temp[1]].children;
      }
    }
    if(temp.length==4){
      if(list[temp[0]].children[temp[1]].children[temp[2]].children){
        data = list[temp[0]].children[temp[1]].children[temp[2]].children;
      }
    }
    return data;
  }

  /**
   * 校验同一类目下名称不能重复
   * @param values
   * @param list
   * @returns {boolean}
     */
  checkNameSameLevel(values,list){
    let data = list;
    if(values.lev!=1){
      data = [];
      var temp = (values.index +"").split("-");
      if(temp.length==2){
        if(list[temp[0]].children){
          data = list[temp[0]].children;
        }
      }
      if(temp.length==3){
        if(list[temp[0]].children[temp[1]].children){
          data = list[temp[0]].children[temp[1]].children;
        }
      }
      if(temp.length==4){
        if(list[temp[0]].children[temp[1]].children[temp[2]].children){
          data = list[temp[0]].children[temp[1]].children[temp[2]].children;
        }
      }
    }
    if(data.length==0){
      return true;
    }else{
      let categoryName =values.categoryName;
      var arr = data.filter((category,index)=>{
        return category.categoryName == categoryName;
      });
      if(values.cid && values.cid!='' && values.cid!=-1){//编辑
        if(arr.length>0 && arr[0].cid != values.cid){//别的类目名重复
          return false;
        }
      }else{
        if(arr.length>0){
          return false;
        }
      }
      return true;
    }
  }

  /**
   * 添加新类目保存按钮回调函数
   * @param e
     */
  handleOk(e) {
    var categoryAdd = this.refs.categoryAdd;
    var _this = this;
    var list = _this.props.categoryList.data;
    if(categoryAdd){
      categoryAdd.validateFields((errs,values)=>{
        if(!errs){
          //向后台发送请求
          //判断sortNumber
          if (this.categoryAddForm.cid && this.categoryAddForm.cid > -1){
            // 判断编辑分类时 父级分类是否移动
            if (!values.oldParentCid){
              if(values.sortNumber > this.categoryAddForm.maxSortNumber){
                message.error("排序号已超过当前同一级类目最大值！");
                return;
              }
            }else{
              //校验移动后，当前分类sortNumber与移动后同级类目 sortNumber
              if (values.newParentKey){
                let maxSortNumber;
                if(values.newParentKey && values.newParentKey == '-1'){
                  maxSortNumber = list.length + 1;
                }else{
                  let data = _this.getDataByKey(values.newParentKey,list);
                  if (data && data.length && data.length > 0){
                    maxSortNumber = data.length + 1;
                  }
                }
                if(maxSortNumber && values.sortNumber > maxSortNumber){
                  message.error("排序号已超过移动后同一级类目最大值！");
                  return;
                }
              }
            }
          }else{
            if(values.sortNumber > this.categoryAddForm.sortNumber){
              message.error("排序号已超过当前同一级类目最大值！");
              return;
            }
          }

          //处理表单数据。如果终极分类是 ，则有计量单位
          if(values.hasLeaf !=1){
            values.unit = "";
          }
          //添加和编辑时候要验证同一级类目下名称不能重复
          var bool = this.checkNameSameLevel(values,list);
          if(!bool){
            message.error("同一级类目下类目名称不能重复！");
            return;
          }
          _this.setState({confirmLoading:true});
          this.props.submit(values).then(function(a,b,c){
            if(a && a.code ==0){
              message.success(a.msg);
              //成功回调
              _this.setState({
                visible:false,
                confirmLoading: false,
                newRandomKey:_this.getUUID(32,16) //添加完了之后清空旧数据，从新渲染组件
              });
              //修改数据显示
              if(!values.oldParentCid && !values.newParentKey){
                let key = values.index;
                let temp = (key +"").split("-");
                let params;
                if (temp.length == 1){
                  params = {
                    parentCategoryId:-1,
                    uuid:_this.UUID
                  };
                }else if(temp.length > 1){
                  let parentKey = key.substring(0,key.length-2);
                  params = {
                    parentCategoryId:values.parentCid,
                    uuid:_this.UUID,
                    parentKey:parentKey
                  };
                }
                _this.props.getCategoryByParentId(params,list);
              }else{
                let key = values.index;
                let temp = (key +"").split("-");
                let params;
                if (temp.length == 1){
                  params = {
                    parentCategoryId:-1,
                    uuid:_this.UUID
                  };
                  _this.props.getCategoryByParentId(params,list);
                }else if(temp.length > 1){
                  let parentKey = key.substring(0,key.length-2);
                  params = {
                    parentCategoryId:values.oldParentCid,
                    uuid:_this.UUID,
                    parentKey:parentKey
                  };
                  _this.props.getCategoryByParentId(params,list);
                  if (values.newParentKey){
                    let para = {
                      parentCategoryId:values.parentCid,
                      uuid:_this.UUID,
                      parentKey:values.newParentKey
                    };
                    _this.props.getCategoryByParentId(para,list);
                  }
                }
              }
            }else{
              message.error(a.msg);
              _this.setState({
                confirmLoading: false,
              });
            }
          });
        }
      });
    }
  }

  /**
   * 类目checkbox
   * @param e
   * @param record
     */
  handleSelectChangeStatus(e,record){
    let data=this.props.categoryList.data;
    this.props.selectChangeStatus(data,record);
  }

  /**
   * 取消关联品牌model
   */
  handleCancelBrand() {
    this.setState({
      visibleView: false
    });
  }

  handleAlreadyOk() {
    this.setState({
      visibleView: false
    });
  }

  handleAddData(dataArr, id) {
    this.setState({
      brand: {
        data: this.state.brand.data.concat(dataArr),
        categoryId: id
      }
    })
  }

  handleDeleteData(record, id){
    const data = this.state.brand.data.filter(item => item !== record);
    this.setState({
      brand: {
        data,
        categoryId: id
      }
    });
  }

  onCellClick(record) {
    const platformId = 2;
    if (this.state.brand.categoryId === record.cid) {
      this.setState({
        visibleView: true
      })
    }else{
      this.setState({
        brand: {
          data: [],
          categoryId: record.cid
        }
      });
      this.props.getBrand(platformId, record.cid)
        .then(
          (function (brands) {
            const dataArr = [];
            for (let index = 0, length = brands.data ? brands.data.length : 0; index < length; index ++) {
              const data = {
                key: brands.data[index].id,
                name: brands.data[index].brandNameCh ? brands.data[index].brandNameCh : brands.data[index].brandNameEn,
                id: brands.data[index].id,
                address: '解除关联'
              };
              dataArr.push(data);
            }
            this.setState({
              visibleView: true,
              brand: {
                data: dataArr,
                categoryId: record.cid
              }
            })
          }).bind(this)
        );
    }
  }

  render() {
    const { Column } = Table;
    const  data = this.props.categoryList.data;
    var permissionsData =  this.props.funcPermissions.data;
    if(permissionsData&& permissionsData.code!=0){
      message.error("菜单权限获取失败！");
    }
    if( permissionsData && permissionsData.code == 0){
      this.codesResponse = permissionsData.data;
    }
    return (
      <div>
        <Modal
          key={this.state.newRandomKey}
          maskClosable={false}
          title={this.categoryAddFormTitle} okText= "保存"
          visible= {this.state.visible}
          onOk={(event)=>this.handleOk(event)}
          onCancel={()=>this.handleCancel()}
          confirmLoading={this.state.confirmLoading}
        >
          <CategoryAdd  categoryAddForm={this.categoryAddForm}  ref="categoryAdd"/>
        </Modal>
        <CategoryView
          uuid={this.UUID}
          visibleView={this.state.visibleView}
          handleAlreadyOk={this.handleAlreadyOk.bind(this)}
          handleCancelBrand={this.handleCancelBrand.bind(this)}
          brand={this.state.brand}
          handleAddData={this.handleAddData.bind(this)}
          handleDeleteData={this.handleDeleteData.bind(this)}
          getUUID={this.getUUID}
          codes={this.codesResponse}
        />
        <div className="ui-platform common">
          <div className="common-opera">
            <Row>
              <Col span="4">
                <FuncPermission codes={this.codesResponse} code="addNew">
                  <Button type="primary" icon="plus" onClick={()=>this.handleAddCategory()}>添加新分类</Button>
                </FuncPermission>
              </Col>
              <Col span="20">
                <Button className="saveAllBtn" type="primary" ghost
                        onClick={()=>this.handleSaveAllPlatformCategories()}>保存全部更改</Button>
                <Button type="primary" icon="up" ghost onClick={()=>this.handleCloseAll()}>全部收起</Button>
                <Button type="primary" icon="down" ghost onClick={()=>this.handleExpandAll()}>全部展开</Button>
                <FuncPermission codes={this.codesResponse} code="batchUpload">
                  <a href="/operating-item-view/batch-upload/upload">
                    <Button type="primary" icon="upload" ghost>批量上传</Button>
                  </a>
                </FuncPermission>
                <FuncPermission codes={this.codesResponse} code="batchDelete">
                  <Button type="primary" icon="delete" ghost onClick={()=>this.handelDelete()}>删除</Button>
                </FuncPermission>
              </Col>
            </Row>
          </div>
          <Table dataSource={data}  pagination={false}
                 expandedRowKeys={this.props.categoryList.expandedRowKeys}
                 onExpandedRowsChange={(rows)=> this.handleOnExpandedRowsChange(rows)}
                 onExpand ={(expanded, record)=> this.handleOnExpand(expanded, record)}
                 columns={this.createColumns()}
                 loading={this.props.categoryList.gridLoading}
                 locale={{
                   emptyText: this.props.categoryList.gridLoading?"加载中...":"暂无数据"
                 }}
          />
        </div>

        <Row className="ui-platform bottomBox mt20 mb20">
          <Col span={4}></Col>
          <Col span={20}>
              <Button className="saveAllBtn" type="primary" ghost
                      onClick={()=>this.handleSaveAllPlatformCategories()}>保存全部更改</Button>
          </Col>
        </Row>
      </div>
    );
  }

  createColumns(){
    return [
      {title:"分类", key:"categoryName", dataIndex:"categoryName", render: this.getCategoryNameRender},
      {title:"", render:this.getMoveRender},
      {title:"ID", key:"cid", dataIndex:"cid"},
      {title:"简码", key:"simpleCode", dataIndex:"simpleCode"},
      {title:"关键词", key:"keyWords", dataIndex:"keyWords",
        render:(text, record)=>{
          return(
            <span className={styles.keywordToe} title={record.keyWords}>
             {record.keyWords}
            </span>
          )
        }
      },
      {title:"计量单位", key:"unit", dataIndex:"unit"},
      {title:"品牌", key:"brand", dataIndex:"brand", render: this.getBrandRender},
      {title:"操作", key:"opt", render:this.getOperaRender}
    ];
  }

  getCategoryNameRender=(text, record,index)=>{
    return (
      <span>
        <Checkbox checked={record.isCheck} onChange={(event)=>
          this.handleSelectChangeStatus(event,record)}></Checkbox>
        <span className={styles.indexLabel}>{index+1}</span>
        <span className={styles.nameToe} title={text}>{text}</span>
      </span>
    )
  }
  getMoveRender = (text, record)=>{
    return (
      <span>
        <Icon type="arrow-up" onClick={()=> this.handleSort(record,"up")}/>
        <Divider/>
        <Icon type="to-top" onClick={()=> this.handleSort(record,"top")}/>
        <Divider/>
        <Icon type="arrow-down" onClick={()=> this.handleSort(record,"down")} />
        <Divider/>
        <Icon type="download" onClick={()=> this.handleSort(record,"bottom")} />
      </span>
    )
  }
  getBrandRender = (text, record)=>{
    let level = record.lev;
    let look='';
    if(level && (level==2 || level==3) && record.hasLeaf==1){
      look= <FuncPermission codes={this.codesResponse} code="view">
        <a href="javascript:void(0);" onClick={()=>this.onCellClick(record)}>查看</a>
      </FuncPermission>;
    }
    if(level && level==4){
      look= <FuncPermission codes={this.codesResponse} code="view">
        <a href="javascript:void(0);" onClick={()=>this.onCellClick(record)}>查看</a>
      </FuncPermission>;
    }
    return(
      <span>{look}</span>
    )
  }

  getOperaRender = (text, record) =>{
    let level = record.lev;
    let bool=true;
    if(level && level!=4){
      if(record.hasLeaf==1){
        bool= false;
      }
    }else{
      bool=false;
    }
    return (
      <span>
        {bool?
          <FuncPermission codes={this.codesResponse} code="add">
            <a className="mr15" href="javascript:void(0)"
               onClick={()=>this.handleAddChildCategory(record)}>添加子分类</a>
          </FuncPermission>
        : ''}
        <FuncPermission codes={this.codesResponse} code="edit">
          <a className="mr15" href="javascript:void(0)"
             onClick={()=>this.handleDoEdit(record)}>编辑</a>
        </FuncPermission>
        <FuncPermission codes={this.codesResponse} code="delete">
          <a className="mr15" onClick={()=> this.handelDelete(record)}>删除</a>
        </FuncPermission>
      </span>
    )
  }
}
