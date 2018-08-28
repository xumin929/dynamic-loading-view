import React, {Component} from 'react';
import {BrandUpload} from '../../../components-react/Brand/BrandUpload/BrandUpload2';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Breadcrumb, Tabs, Button, Modal,Table, Upload, message, Spin, Alert, Icon} from 'jdcloudui';
import * as funcs from './redux';
import * as getDomain from './redux-domain';
import styles from './style/BatchUpload.css';
const TabPane = Tabs.TabPane;
const columns = [{
  title: '上传批次号',
  dataIndex: 'fileName',
  width: 150,
}, {
  title: '文件名称',
  dataIndex: 'name',
  width: 150,
}, {
  title: '上传状态',
  dataIndex: 'status',
  width: 150,
}, {
  title: '下载结果',
  dataIndex: 'result',
  width: 150,
}];
const data = [];
for (let num = 0; num < 30; num++) {
  data.push({
    name: `手机 ${num}`,
    parentSortId: `id ${num}`,
    cause: `失败原因 ${num}`,
  });
}
const uploadProps = {
  name: 'file',
  action:"/proxy/item/item/itemImport/importItemy",
  headers: {
    authorization: 'authorization-text',
  },
  showUploadList:false
};
@connect(
  state => ({
    uploadStore: state.uploadStore,
    domainData: state.domainData
  }),
  dispatch => bindActionCreators({...funcs, ...getDomain}, dispatch)
)export default class BatchUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showLoading: false,
      msg1: '上传',
      msg2: '上传',
      msg3: '上传',
      msg4: '上传',
      msg1Loading: false,
      msg2Loading: false,
      msg3Loading: false,
      msg4Loading: false,
      i: 0,
      dataSourceForClass: [],
      msg: null
    };
    this.i = 0;
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.callback = this.callback.bind(this);
    this.uploadChange =this.uploadChange.bind(this);
    this.dataSourceForClass = [];
    this.dataSourceForBrand = [];
    this.dataSourceForGoods = [];
    this.dataSourceforSpec = [];
    this.params = {
      platformId: 2,
      type: 1,
      pageNum: 1,
      pageSize: 10
    };
    this.params2 = {
      platformId: 2,
      type: 2,
      pageNum: 1,
      pageSize: 10
    };
    this.params3 = {
      platformId: 2,
      type: 4,
      pageNum: 1,
      pageSize: 10
    };
    this.params4 = {
      platformId: 2,
      type: 3,
      pageNum: 1,
      pageSize: 10
    };
    this.para1 = {
      platformId: 2,
      templateType:1
    };
    this.para2 = {
      platformId: 2,
      templateType:2
    };
    this.para3 = {
      platformId: 2,
      templateType:3
    };
    this.para4 = {
      platformId: 2,
      templateType:4
    };
    this.timer1 = null;
    this.ifTimer1 = true;
    this.ifTimer2 = true;
    this.ifTimer3 = true;
    this.ifTimer4 = true;
    this.PN1 = 1;
    this.PN2 = 1;
    this.PN3 = 1;
    this.PN4 = 1;
  }
  getInitialState() {
    return { visible: false };
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleCancel(envent) {
    console.log(envent);
    this.setState({
      visible: false,
    });
  }
  handleOk() {
    console.log('click ok');
    this.setState({
      visible: false,
    });
  }
  callback(key) {
    console.log(key);
  }
  uploadChange(info, type){
    //window.i = 0;
    //this.repeatRefresh();
    switch(type){
      case 1: this.setState({
        msg1: '正在上传中，请稍等',
        msg1Loading: true,
      });
        break;
      case 2: this.setState({
        msg1: '正在上传中，请稍等',
        msg2Loading: true,
      });
        break;
      case 3: this.setState({
        msg1: '正在上传中，请稍等',
        msg3Loading: true,
      });
        break;
      case 4: this.setState({
        msg1: '正在上传中，请稍等',
        msg4Loading: true,
      });
        break;
    }
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      this.setState({
        showLoading: true
      });
    }else{
      //message.loading('正在上传中，请稍等....',3);
    }
    if (info.file.status === 'done') {
      this.setState({
        showLoading: true
      });
      switch(type){
        case 1: this.setState({
          msg1: '上传',
          msg1Loading: false,
        });
          break;
        case 2: this.setState({
          msg1: '上传',
          msg2Loading: false,
        });
          break;
        case 3: this.setState({
          msg1: '上传',
          msg3Loading: false,
        });
          break;
        case 4: this.setState({
          msg1: '上传',
          msg4Loading: false,
        });
          break;
      }
      if(info.file.response.code != 0){
        if(info.file.response.msg){
          this.setState({
            showLoading: false,
            visible: true,
            msg: info.file.response.msg
          });
          //message.error(info.file.response.msg);
        }else{
          this.setState({
            showLoading: false
          });
          message.error('上传失败');
        }
      }else{
        this.setState({
          showLoading: false
        });
        let filetype = 1;
        if(type == 4){
          filetype = 3;
        }else if(type == 3){
          filetype = 4;
        }else{
          filetype = type;
        }
        message.success(`${info.file.name} 文件已上传，请等待数据同步`);
        let params = {
          type: filetype,
          batchNo: info.file.response.data,
          fileName: info.file.name
        };
        this.props.postFileName(params);
        switch(type){
          case 1: this.onChangePageClass(this.PN1);
            break;
          case 2: this.onChangePageBrand(this.PN2);
            break;
          case 3: this.onChangePageGoods(this.PN3);
            break;
          case 4: this.onChangePageSpec(this.PN4);
            break;
        }
      }
    } else if (info.file.status === 'error') {
      switch(type){
        case 1: this.setState({
          msg1: '上传',
          msg1Loading: false,
        });
          break;
        case 2: this.setState({
          msg1: '上传',
          msg2Loading: false,
        });
          break;
        case 3: this.setState({
          msg1: '上传',
          msg3Loading: false,
        });
          break;
        case 4: this.setState({
          msg1: '上传',
          msg4Loading: false,
        });
          break;
      }
      this.setState({
        showLoading: false
      });
      message.error(`${info.file.name} 文件上传失败`);
    }
    console.log(info.file.name, 'info.file.nameinfo.file.nameinfo.file.nameinfo.file.nameinfo.file.name');
  }
  beforeUpload = (file) => {
    /*console.log(file,'filefilefilefilefilefilefilefilefilefilefilefilefilefilefilefile');
    console.log(file.type,'typetypetypetype');
    console.log(file.size,'sizesizesizesizesizesize');
    console.log(file.size/1024/1024,'MMMMMMMMMMMMMMMMMMMMMMM');
    const isXlsx = file.type =='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const isXls = file.type =='application/vnd.ms-excel';
    const isXlsm = file.type == 'application/vnd.ms-excel.sheet.macroEnabled.12';*/
    const isXlsx = true;
    const isXls = true;
    const isXlsm = true;
    const isLT1M = true;
    if(!isXls && !isXlsx && !isXlsm){
      message.error('上传格式仅限.xls、.xlsm、xlsx');
    }else
    if(!isLT1M){
      message.error('上传文件不大于1M')
    }

    return (isXlsx || isXls || isXlsm) && isLT1M
  };
  repeatRefreshClass(){
    if(typeof window != 'undefined'){
      let ifRefresh = true;
      let params = this.params;
      let {uploadStore, queryClassTable} = this.props;
      window.timer1 = window.setInterval(function(){
        if(uploadStore
          && uploadStore.classData
          && (uploadStore.classData.code == 0)){
          if((uploadStore
              && uploadStore.classData
              && uploadStore.classData.data
              && uploadStore.classData.data.result.length
              && uploadStore.classData.data.result[0].isAllFinish)
            || (uploadStore.classData.data.result.length == 0)
          ){
            window.timer1 && window.clearInterval(window.timer1);
            ifRefresh = false;
            this.ifTimer1 = false;
          }else{
          }
        }else if(uploadStore
          && uploadStore.classData
          && (uploadStore.classData.code != 0)){
          window.timer1 && window.clearInterval(window.timer1);
          ifRefresh = false;
          this.ifTimer1 = false;
        }else{}
        if(ifRefresh){
          queryClassTable(params);
          this.ifTimer1 = true;
        }else{}
      },20000)
    }else{}
  }
  repeatRefreshBrand(){
    if(typeof window != 'undefined'){
      let ifRefresh = true;
      let params2 = this.params2;
      let {uploadStore, queryBrandTable} = this.props;
      window.timer2 = window.setInterval(function(){
        if(uploadStore
          && uploadStore.brandData
          && (uploadStore.brandData.code == 0)){
          if((uploadStore
              && uploadStore.brandData
              && uploadStore.brandData.data
              && uploadStore.brandData.data.result.length
              && uploadStore.brandData.data.result[0].isAllFinish)
            || (uploadStore.brandData.data.result.length == 0)
          ){
            window.timer2 && window.clearInterval(window.timer2);
            ifRefresh = false;
            this.ifTimer2 = false;
          }else{
          }
        }else if(uploadStore
          && uploadStore.brandData
          && uploadStore.brandData.data
          && uploadStore.brandData
          && (uploadStore.brandData.data.code != 0)){
          window.timer2 && window.clearInterval(window.timer2);
          this.ifTimer2 = false;
          ifRefresh = false;
        }else{}
        if(ifRefresh){
          queryBrandTable(params2);
          this.ifTimer2 = true;
        }else{}
      },20000)
    }else{}
  }
  repeatRefreshGoods(){
    if(typeof window != 'undefined'){
      let ifRefresh = true;
      let params3 = this.params3;
      let {uploadStore, queryGoodsTable} = this.props;
      window.timer3 = window.setInterval(function(){
        if(uploadStore
          && uploadStore.goodsData
          && (uploadStore.goodsData.code == 0)){
          if((uploadStore
              && uploadStore.goodsData
              && uploadStore.goodsData.data
              && uploadStore.goodsData.data.result.length
              && uploadStore.goodsData.data.result[0].isAllFinish)
            || (uploadStore.goodsData.data.result.length == 0)
          ){
            window.timer3 && window.clearInterval(window.timer3);
            this.ifTimer3 = false;
            ifRefresh = false;
          }else{
          }
        }else if(uploadStore
          && uploadStore.goodsData
          && (uploadStore.goodsData.code != 0)){
          window.timer3 && window.clearInterval(window.timer3);
          ifRefresh = false;
          this.ifTimer3 = false;
        }else{}
        if(ifRefresh){
          queryGoodsTable(params3);
          this.ifTimer3 = true;
        }else{}
      },20000)
    }else{}
  }
  repeatRefreshSpec(){
    if(typeof window != 'undefined'){
      let ifRefresh = true;
      let params = this.params4;
      let {uploadStore, querySpecificationTable} = this.props;
      window.timer4 = window.setInterval(function(){
        if(uploadStore
          && uploadStore.specData
          && (uploadStore.specData.code == 0)){
          if((uploadStore
              && uploadStore.specData
              && uploadStore.specData.data
              && uploadStore.specData.data.result.length
              && uploadStore.specData.data.result[0].isAllFinish)
            || (uploadStore.specData.data.result.length == 0)
          ){
            window.timer4 && window.clearInterval(window.timer4);
            ifRefresh = false;
            this.ifTimer4 = false;
          }else{
          }
        }else if(uploadStore
          && uploadStore.classData
          && (uploadStore.classData.code != 0)){
          window.timer4 && window.clearInterval(window.timer4);
          ifRefresh = false;
          this.ifTimer4 = false;
        }else{}
        if(ifRefresh){
          querySpecificationTable(params);
          this.ifTimer4 = true;
        }else{}
      },20000)
    }else{}
  }
  componentWillMount(){
    if(typeof window != 'undefined'){
      window.i = 0;
    }else{}
    this.props.queryClassTable(this.params).then(
      (result) => {
        if(result.code != 0 ){
          if(result.msg){
            message.error(result.msg);
          }else{
            message.error('获取分类列表失败');
          }
        }else{
          this.repeatRefreshClass();
        }
      },
      (error) => {
        message.error('获取分类列表失败');
      }
    );
    this.props.getClassDomainName(this.para1).then((res)=>{
      if(res.code == 0){
        //console.log(res.data)
        //console.log(typeof (res.data))
        //console.log(res.data.slice(2));
        var s1=res.data.slice(2).indexOf("/");
        const domainStr1=res.data.slice(2,s1+2);
        this.setState({
          domain1:domainStr1
        })
      }else{
        message.error(res.msg);
      }
    });
    this.props.queryBrandTable(this.params2).then(
      (result) => {
        if(result.code != 0 ){
          if(result.msg){
            message.error(result.msg);
          }else{
            message.error('获取品牌列表失败');
          }
        }else{
          this.repeatRefreshBrand();
        }
      },
      (error) => {
        message.error('获取品牌列表失败');
      }
    );
    this.props.getBrandDomainName(this.para2).then((res)=>{
      if(res.code == 0){
        //console.log(res.data)
        var s2=res.data.slice(2).indexOf("/");
        const domainStr2=res.data.slice(2,s2+2);
        this.setState({
          domain2:domainStr2
        })
      }else{
        message.error(res.msg);
      }
    });
    this.props.queryGoodsTable(this.params3).then(
      (result) => {
        if(result.code != 0 ){
          if(result.msg){
            message.error(result.msg);
          }else{
            message.error('获取商品列表失败');
          }
        }else{
          this.repeatRefreshGoods();
        }
      },
      (error) => {
        message.error('获取商品列表失败');
      }
    );
    this.props.getGoodsDomainName(this.para3).then((res)=>{
      if(res.code == 0){
        //console.log(res.data)
        var s3=res.data.slice(2).indexOf("/");
        const domainStr3=res.data.slice(2,s3+2);
        this.setState({
          domain3:domainStr3
        })
      }else{
        message.error(res.msg);
      }
    });
    this.props.querySpecificationTable(this.params4).then(
      (result) => {
        if(result.code != 0 ){
          if(result.msg){
            message.error(result.msg);
          }else{
            message.error('获取规格属性列表失败');
          }
        }else{
          this.repeatRefreshSpec();
        }
      },
      (error) => {
        message.error('获取规格属性列表失败');
      }
    );
    this.props.getSpecDomainName(this.para4).then((res)=>{
      if(res.code == 0){
        //console.log(res.data)
        var s4=res.data.slice(2).indexOf("/");
        const domainStr4=res.data.slice(2,s4+2);
        this.setState({
          domain4:domainStr4
        })
      }else{
        message.error(res.msg);
      }
    });
  }
  initClassData(data){
    this.dataSourceForClass = [];
    if(data && data.result && data.result.length){
      data.result.map((item,index) => {
        this.dataSourceForClass.push({
          key: index,
          fileName: item.batchNo,
          status: item.isFinish ? '已上传成功' : '正在上传中，请稍等',
          name: item.fileName,
          //result: <Button disabled = {!item.isFinish} onClick = {() => {window.location.href = '/proxy/item/platform/item/exportItemCategoryByImport?type='+1+'&platformId='+2+'&batchNo='+item.batchNo+'&fileName='+item.fileName}} type="primary">下载</Button>,
          result: item.isFinish ?
            <a className = "text-link" onClick = {() => {window.location.href = '/proxy/item/platform/item/exportItemCategoryByImport?platformId='+2+'&batchNo='+item.batchNo+'&fileName='+item.fileName}}>下载</a>
            :<span style = {{color: '#bbb'}}>下载</span>,
        });
      });
    }
  }
  initBrandData(data){
    this.dataSourceForBrand = [];
    if(data && data.result && data.result.length){
      data.result.map((item,index) => {
        this.dataSourceForBrand.push({
          key: index,
          fileName: item.batchNo,
          status: item.isFinish ? '已上传成功' : '正在上传中，请稍等',
          name: item.fileName,
          result: item.isFinish ?
            <a className = "text-link" onClick = {() => {window.location.href = '/proxy/item/platform/item/exportItemBrandByImport?platformId='+2+'&batchNo='+item.batchNo+'&fileName='+item.fileName}}>下载</a>
            :<span style = {{color: '#bbb'}}>下载</span>,
        });
      });
    }
  }
  initGoodsData(data){
    this.dataSourceForGoods = [];
    if(data && data.result && data.result.length){
      data.result.map((item,index) => {
        this.dataSourceForGoods.push({
          key: index,
          fileName: item.batchNo,
          status: item.isFinish ? '已上传成功' : '正在上传中，请稍等',
          name: item.fileName,
          result: item.isFinish ?
            <a className = "text-link" onClick = {() => {window.location.href = '/proxy/item/platform/item/exportItemByImport?platformId='+2+'&batchNo='+item.batchNo+'&fileName='+item.fileName}}>下载</a>
            :<span style = {{color: '#bbb'}}>下载</span>,
        });
      });
    }
  }
  initSpecData(data){
    this.dataSourceforSpec = [];
    if(data && data.result && data.result.length){
      data.result.map((item,index) => {
        this.dataSourceforSpec.push({
          key: index,
          fileName: item.batchNo,
          status: item.isFinish ? '已上传成功' : '正在上传中，请稍等',
          name: item.fileName,
          result: item.isFinish ?
            <a className = "text-link" onClick = {() => {window.location.href = '/proxy/item/platform/item/exportItemCategoryAttrByImport?platformId='+2+'&batchNo='+item.batchNo+'&fileName='+item.fileName}}>下载</a>
            :<span style = {{color: '#bbb'}}>下载</span>,
        });
      });
    }
  }
  //分页查询
  onChangePageClass(pageNumber,type){
    window.clearInterval(window.timer1);
    this.PN1 = pageNumber;
    this.params.pageNum = pageNumber;
    this.params.pageSize = 10;
    this.props.queryClassTable(this.params).then(
      (result) => {
        if(result.code != 0 ){
          if(result.msg){
            message.error(result.msg);
          }else{
            message.error('获取分类列表失败');
          }
        }else{
          if(result.data && result.data.result && result.data.result.length && !result.data.result[0].isFinish){
            this.repeatRefreshClass();
          }else{}

        }
      },
      (error) => {
        message.error('获取分类列表失败');
      }
    );
  }
  onChangePageBrand(pageNumber,type){
    window.clearInterval(window.timer2);
    this.PN2 = pageNumber;
    this.params2.pageNum = pageNumber;
    this.params2.pageSize = 10;
    this.props.queryBrandTable(this.params2).then(
      (result) => {
        if(result.code != 0 ){
          if(result.msg){
            message.error(result.msg);
          }else{
            message.error('获取品牌列表失败');
          }
        }else{
          if(result.data && result.data.result && result.data.result.length && !result.data.result[0].isFinish){
            this.repeatRefreshBrand();
          }else{}
        }
      },
      (error) => {
        message.error('获取品牌列表失败');
      }
    );
  }
  onChangePageGoods(pageNumber,type){
    window.clearInterval(window.timer3);
    this.PN3 = pageNumber;
    this.params3.pageNum = pageNumber;
    this.params3.pageSize = 10;
    this.props.queryGoodsTable(this.params3).then(
      (result) => {
        if(result.code != 0 ){
          if(result.msg){
            message.error(result.msg);
          }else{
            message.error('获取商品列表失败');
          }
        }else{
          if(result.data && result.data.result && result.data.result.length && !result.data.result[0].isFinish){
            this.repeatRefreshGoods();
          }else{}
        }
      },
      (error) => {
        message.error('获取商品列表失败');
      }
    );
  }
  onChangePageSpec(pageNumber,type){
    window.clearInterval(window.timer4);
    this.PN4 = pageNumber;
    this.params4.pageNum = pageNumber;
    this.params4.pageSize = 10;
    this.props.querySpecificationTable(this.params4).then(
      (result) => {
        if(result.code != 0 ){
          if(result.msg){
            message.error(result.msg);
          }else{
            message.error('获取规格属性列表失败');
          }
        }else{
          if(result.data && result.data.result && result.data.result.length && !result.data.result[0].isFinish){
            this.repeatRefreshSpec();
          }else{}
        }
      },
      (error) => {
        message.error('获取规格属性列表失败');
      }
    );
  }
  //生成分页对象
  createPaginationClass(type){
    let total = 0;
    let current = 0;
    if(this.props.uploadStore
      && this.props.uploadStore.classData
      && this.props.uploadStore.classData.data
      && this.props.uploadStore.classData.data.totalCount){
      total = this.props.uploadStore.classData.data.totalCount;
      current = this.props.uploadStore.classData.data.pageNum;
    }else{}
    return {
      showQuickJumper: true,
      total: total,
      current: current,
      pageSize: 10,
      onChange:(pageNumber, type)=>this.onChangePageClass(pageNumber, type)
    }
  }
  createPaginationBrand(type){
    let total = 0;
    let current = 0;
    if(this.props.uploadStore
      && this.props.uploadStore.brandData
      && this.props.uploadStore.brandData.data
      && this.props.uploadStore.brandData.data.totalCount){
      total = this.props.uploadStore.brandData.data.totalCount;
      current = this.props.uploadStore.brandData.data.pageNum;
    }else{}
    return {
      showQuickJumper: true,
      total: total,
      current: current,
      pageSize: 10,
      onChange:(pageNumber, type)=>this.onChangePageBrand(pageNumber, type)
    }
  }
  createPaginationGoods(type){
    let total = 0;
    let current = 0;
    if(this.props.uploadStore
      && this.props.uploadStore.goodsData
      && this.props.uploadStore.goodsData.data
      && this.props.uploadStore.goodsData.data.totalCount){
      total = this.props.uploadStore.goodsData.data.totalCount;
      current = this.props.uploadStore.goodsData.data.pageNum;
    }else{}
    return {
      showQuickJumper: true,
      total: total,
      current: current,
      pageSize: 10,
      onChange:(pageNumber, type)=>this.onChangePageGoods(pageNumber, type)
    }
  }
  createPaginationSpec(type){
    let total = 0;
    let current = 0;
    if(this.props.uploadStore
      && this.props.uploadStore.specData
      && this.props.uploadStore.specData.data
      && this.props.uploadStore.specData.data.totalCount){
      total = this.props.uploadStore.specData.data.totalCount;
      current = this.props.uploadStore.specData.data.pageNum;
    }else{}
    return {
      showQuickJumper: true,
      total: total,
      current: current,
      pageSize: 10,
      onChange:(pageNumber, type)=>this.onChangePageSpec(pageNumber, type)
    }
  }
  render() {
    this.props.uploadStore && this.props.uploadStore.classLoaded && this.initClassData(this.props.uploadStore.classData.data)
    this.props.uploadStore && this.props.uploadStore.brandLoaded && this.initBrandData(this.props.uploadStore.brandData.data)
    this.props.uploadStore && this.props.uploadStore.goodsLoaded && this.initGoodsData(this.props.uploadStore.goodsData.data)
    this.props.uploadStore && this.props.uploadStore.specLoaded && this.initSpecData(this.props.uploadStore.specData.data)
    console.log(this.state.domain1);
    console.log(this.state.domain2);
    console.log(this.state.domain3);
    console.log(this.state.domain4);
    //hnc-hn-01.oss.cn-south-1.jcloudcs.com/importTemplateForCategory.xlsx
    //hnc-hn-01.oss.cn-south-1.jcloudcs.com/importTemplateForBrand.xlsx
    //hnc-hn-01.oss.cn-south-1.jcloudcs.com/importTemplateForItem.xlsx
    //hnc-hn-01.oss.cn-south-1.jcloudcs.com/importTemplateForCategoryAttribute.xlsx
    return(
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item><a href="brand">商品管理</a></Breadcrumb.Item>
            <Breadcrumb.Item>批量上传</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ui-ct">
          <div className="ui-hd">批量上传</div>
          <div className="ui-bd">
            <div style={{marginTop:'20px'}}>
              <Tabs defaultActiveKey="1" onChange={this.callback} animated={false}>
                <TabPane tab="上传分类" key="1">
                  <div  className = {"ui-container ui-platform"} style = {{background: 'white'}}>
                    <div>
                      <span className="textTitle">批量分类导入模板下载&nbsp;</span>
                      <a className = "text-link" href={"//"+this.state.domain1+"/importTemplateForCategory.xlsx"}>下载模板</a>
                    </div>
                    <div className="uploadTempPanel">
                      <span className="textTitle">将填写好的模板上传，每个模板最多支持1000行&nbsp;</span>
                      <Upload {...uploadProps}
                              name='file'
                              action="/proxy/platform-service/platform/itemImport/importItemCategory"
                              beforeUpload={this.beforeUpload}
                              showUploadList={false}
                              onChange={(info)=>this.uploadChange(info, 1)}
                      >
                        <Button loading = {this.state.msg1Loading}><Icon type="upload" />{this.state.msg1}</Button>
                      </Upload>
                    </div>
                    <Table loading = {!this.props.uploadStore.classLoaded} className="tableStyle ui-tbl" dataSource={this.dataSourceForClass} columns={columns} pagination={this.createPaginationClass(1)}/>
                  </div>
                </TabPane>
                <TabPane tab="上传品牌" key="2">
                  <div  className = {"ui-container ui-platform"} style = {{background: 'white'}}>
                    <div>
                      <span className="textTitle">批量品牌导入模板下载&nbsp;</span>
                      <a className = "text-link" href={"//"+this.state.domain2+"/importTemplateForBrand.xlsx"}>下载模板</a>
                    </div>
                    <div className="uploadTempPanel">
                      <span className="textTitle">将填写好的模板上传，每个模板最多支持1000行&nbsp;</span>
                      <Upload {...uploadProps}
                              name='file'
                              action="/proxy/platform-service/platform/itemImport/importItemBrand"
                              beforeUpload={this.beforeUpload}
                              showUploadList={false}
                              onChange={(info)=>this.uploadChange(info, 2)}>
                        <Button loading = {this.state.msg2Loading}><Icon type="upload" />{this.state.msg2}</Button>
                      </Upload>
                    </div>
                    <Table loading = {!this.props.uploadStore.brandLoaded} className="tableStyle ui-tbl" dataSource={this.dataSourceForBrand} columns={columns} pagination={this.createPaginationBrand(2)}/>
                  </div>
                </TabPane>
                <TabPane tab="上传商品" key="3">
                  <div  className = {"ui-container ui-platform"} style = {{background: 'white'}}>
                    <div>
                      <span className="textTitle">批量商品导入模板下载&nbsp;</span>
                      <a className = "text-link" href={"//"+this.state.domain3+"/importTemplateForItem.xlsx"}>下载模板</a>
                    </div>
                    <div className="uploadTempPanel">
                      <span className="textTitle">将填写好的模板上传，每个模板最多支持1000行&nbsp;</span>
                      <Upload
                        name='file'
                        action="/proxy/platform-service/platform/itemImport/importItem"
                        beforeUpload={this.beforeUpload}
                        showUploadList={false}
                        onChange={(info)=>this.uploadChange(info, 3)}>
                        <Button loading = {this.state.msg3Loading}><Icon type="upload" />{this.state.msg3}</Button>
                      </Upload>
                    </div>
                    <Table loading = {!this.props.uploadStore.goodsLoaded} className="tableStyle ui-tbl" dataSource={this.dataSourceForGoods} columns={columns} pagination={this.createPaginationGoods(3)}/>
                  </div>
                </TabPane>
                <TabPane tab="上传规格属性" key="4">
                  <div  className = {"ui-container ui-platform"} style = {{background: 'white'}}>
                    <div>
                      <span className="textTitle">规格属性导入模板下载&nbsp;</span>
                      <a className = "text-link" href= {"//"+this.state.domain4+"/importTemplateForCategoryAttribute.xlsx"}>下载模板</a>
                    </div>
                    <div className="uploadTempPanel">
                      <span className="textTitle">将填写好的模板上传，每个模板最多支持1000行&nbsp;</span>
                      <Upload
                        name='file'
                        action="/proxy/platform-service/platform/itemImport/importItemCategoryAttribute"
                        beforeUpload={this.beforeUpload}
                        showUploadList={false}
                        onChange={(info)=>this.uploadChange(info, 4)}>
                        <Button loading = {this.state.msg4Loading}><Icon type="upload" />{this.state.msg4}</Button>
                      </Upload>
                    </div>
                    <Table loading = {!this.props.uploadStore.specLoaded} className="tableStyle ui-tbl" dataSource={this.dataSourceforSpec} columns={columns} pagination={this.createPaginationSpec(4)}/>
                  </div>
                </TabPane>
              </Tabs>
              <Modal
                title="上传提示"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="submit" type="primary" size="large"  onClick={this.handleOk}>
                    确定
                  </Button>,
                ]}
              >
                <div className={styles.hintSuccess}>
                  {this.state.msg}
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
