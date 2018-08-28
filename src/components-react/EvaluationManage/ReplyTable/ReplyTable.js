/**
 * author:liuyang
 * date:2017-05-05
 **/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Form, message, Icon, Modal} from 'jdcloudui';
import Reply from '../Reply/Reply';
import PicModal from '../PicModal/PicModal';
import {bindActionCreators} from 'redux';

import {queryList, confirmReply, hideItemComment, hideItemCommentAnnex, hideItemCommentReply} from '../redux';
import * as domain from 'jdcloudecc/reducer/domain';
import {getPlatformFuncPermission} from 'jdcloudecc/reducer/functionPermissions';
import {FuncPermission}  from 'jdcloudecc/components';
import './style/replytable.css';
import icoZoom from './style/ico-zoom.png';
const confirm = Modal.confirm;

@Form.create()
@connect(
  state => ({
    EvaluationManage: state.EvaluationManage,
    funcPermissions: state.funcPermissions
  }),
  dispatch => bindActionCreators({queryList, confirmReply, hideItemComment, hideItemCommentAnnex, hideItemCommentReply, getPlatformFuncPermission,...domain}, dispatch)
)
export default class ReplyTable extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      visible: false,
      visibleTow: false,
      modalIndex: 0,
      data: [],
      loading: false,
      paginationLoading: false
    };
    this.columns = [{
      title: '交易信息',
      dataIndex: 'information',
      width: '25%',
      render: (text, row, index) => {
      return {
        children: <span>{text}</span>,
      props: {
        colSpan: 6,
      },
    };
  },
  }, {
      title: '归属店铺',
          dataIndex: 'ascriptionShop',
          width: '15%',
          render: (text, row, index) => {
        return {
          children: <span>{text}</span>,
            props: {
          colSpan: 0,
        },
      };
      },
    },  {
      title: '评价内容',
          dataIndex: 'evaluation',
          width: '25%',
          render: (text, row, index) => {
        return {
          children: <span>{text}</span>,
            props: {
          colSpan: 0,
        },
      };
      },
    }, {
      title: '评价人',
          width:'15%',
          dataIndex: 'evaluationer',
          render: (text, row, index) => {
        return {
          children: <span>{text}</span>,
            props: {
          colSpan: 0,
        },
      };
      },
    }, {
      title: '显示状态',
          dataIndex: 'status',
          width: '10%',
          render: (text, row, index) => {
        return {
          children: <span>{text}</span>,
            props: {
          colSpan: 0,
        },
      };
      },
    }, {
      title: '操作',
          dataIndex: 'action',
          width:'10%',
          render: (text, row, index) => {
        return {
          children: <span>{text}</span>,
            props: {
          colSpan: 0,
        },
      };
      },
    }];

    this.columns2 = [{
      title: '交易信息',
      dataIndex: 'information',
      width: '25%',
      render: (text, row, index) => {
      if (index == 0 || index == 3 || index == 4 || index == 1) {
      return {
        children: <span>{text}</span>,
          props: {
        colSpan: 6,
      },
    };
    }else{
      return {
        children: <span>{text}</span>,
          props: {
        colSpan: 1,
      },
    };
    }
  },
  }, {
      title: '归属店铺',
          dataIndex: 'ascriptionShop',
          width: '15%',
          render: (text, row, index) => {
        if (index == 0 || index == 3 || index == 4  || index == 1) {
          return {
            children: <span>{text}</span>,
              props: {
            colSpan: 0,
          },
        };
        }else{
          return {
            children: <span>{text}</span>,
              props: {
            colSpan: 1,
          },
        };
        }
      },
    }, {
      title: '评价内容',
          dataIndex: 'evaluation',
          width: '25%',
          render: (text, row, index) => {
        if (index == 0 || index == 3 || index == 4  || index == 1) {
          return {
            children: <span>{text}</span>,
              props: {
            colSpan: 0,
          },
        };
        }else{
          return {
            children: <span>{text}</span>,
              props: {
            colSpan: 1,
          },
        };
        }
      },
    }, {
      title: '评价人',
          dataIndex: 'evaluationer',
          width:'15%',
          render: (text, row, index) => {
        if (index == 0 || index == 3 || index == 4 || index == 1) {
          return {
            children: <span>{text}</span>,
              props: {
            colSpan: 0,
          },
        };
        }else{
          return {
            children: <span>{text}</span>,
              props: {
            colSpan: 1,
          },
        };
        }
      },
    }, {
      title: '显示状态',
          dataIndex: 'status',
          width: '10%',
          render: (text, row, index) => {
        if (index == 0 || index == 3 || index == 4  || index == 1) {
          return {
            children: <span>{text}</span>,
              props: {
            colSpan: 0,
          },
        };
        }else{
          return {
            children: <span>{text}</span>,
              props: {
            colSpan: 1,
          },
        };
        }
      },
    }, {
      title: '操作',
          dataIndex: 'action',
          width:'10%',
          render: (text, row, index) => {
        if (index == 0 || index == 3  || index == 4 || index == 1) {
          return {
            children: <span>{text}</span>,
              props: {
            colSpan: 0,
          },
        };
        }else{
          return {
            children: <span>{text}</span>,
              props: {
            colSpan: 1,
          },
        };
        }
      },
    }];

    this.data = [];
    this.num = 0;
    this.currentNum = 1;
    this.currentSKU = '';
    this.pageNumber = 1;
    this.initload = true;
    this.tableData = [];
    this.itemId = '';
    this.orderNo = '';
    this.skuid = '';
    this.codesResponse = [];
    this.codes = '';
    this.mainDomain="";
  }
  showModal = (SKUcode, itemId, orderNo, skuId) => {
  this.currentSKU = SKUcode;
  this.itemId = itemId;
  this.orderNo = orderNo;
  this.skuid = skuId;
  this.setState({
      visible: true,
      });
}


starType(num){
  const stars = [];
  let color = '#f7b84f';
  if(num <=2 ){
    color = '#999';
  }else if(num <= 4){
    color = '#f7b84f';
  }else{
    color = 'red';
  }
  for(let i = 0; i< num; i++){
    stars.push(<Icon type="star" style = {{color: color, fontSize: '14px'}}/>);
  }
  return stars;
}


init(data){
  this.currentNum = data.pageNum;
  this.tableData = [];
  if(data.result && data.result.length > 0){
    data.result.map((item, index) => {
      this.data = [];
    let annexList = item.annexList ? item.annexList : [];
    let service = this.starType(item.serviceScore);
    let packages = this.starType(item.qualityScore);
    let arrive = this.starType(item.speedScore);
    let description = this.starType(item.describeScore);
    let quality = this.starType(item.itemQualityScore);
    let attributes = item.attributes ? item.attributes.split(';') : [];
    attributes = attributes.filter((_it) => _it != '');
    let attributesArr = attributes.map((_il) => {
          const d = _il.split(':');
    return d[1];
  });

    let information = (<div style={{padding: '20px 0'}}>
  <p className={attributesArr.length > 0 ? 'padTop10 padLef20 clr_blue' : 'padLef20 clr_blue'}>
  <a className = {'text-link'} href={'//'+this.mainDomain+'/search-website-view/item/'+item.itemId} target = "_blank">{item.itemName}</a>
    </p>
    {
      attributesArr.length > 0 ? (
    <p className="padTopBot10 padLef20">{
          attributesArr.map((_ov, k) => {
          if(k < attributesArr.length - 1) {
      return _ov + ', ';
    } else {
      return _ov;
    }
  })
  }</p>
  ) : null
  }
  </div>);

    let ascriptionShop = (
        <div>
        <p style = {{padding:'10px'}}>{item.shopName ? item.shopName: '----'}</p>
    </div>
  );

    let status = (
        <div>
        <p style = {{padding:'10px'}}>{item.isdisplay == 1 ? '显示' : '隐藏'}</p>
    </div>
  );

    let evaluation = (
        <div>
        <p style = {{padding:'10px'}}>{item.comment ? item.comment : '用户未做内容评价'}</p>
    </div>
  );

    let evaluationer = (<div style={{padding: '10px'}}>
    {
      item.buyerCompany ?  <p>{item.buyerCompany}</p> : null
    }
    {
      item.buyerName ? <p style = {{paddingTop: item.buyerCompany ? '10px' : 0}}>{item.buyerName}</p> : null
    }

  </div>);

    let informationstar = (<p className="padBox">
        <span className="padRig"><span className="padrig-span">服务态度</span> {service}</span>
        <span className="padRig"><span className="padrig-span">包装质量</span> {packages}</span>
        <span className="padRig"><span className="padrig-span">到货速度</span> {arrive}</span>
        <span className="padRig"><span className="padrig-span">描述相符</span> {description}</span>
        <span className="padRig"><span className="padrig-span">商品质量</span> {quality}</span>
        </p>);

    let orderInformation = (<p className="padBox">
        <span className="padRig"><span className="padrig-span">订单号：</span>{item.orderNo}</span>
    <span className="padRig"><span className="padrig-span">商品编码：</span>{item.itemId}</span>
    <span className="padRig"><span className="padrig-span">评价时间：</span>{item.commentTime}</span>
    </p>);

    this.data.push({
      key: 0,
      information: orderInformation,
      ascriptionShop: '',
      evaluation: '',
      evaluationer: '',
      status: '',
      action:  '',
    });

    this.data.push({
      key: 1,
      information: informationstar,
      ascriptionShop,
      evaluation: '',
      evaluationer: '',
      status: '',
      action:  '',
    });

    this.data.push({
      key: 2,
      information: information,
      ascriptionShop,
      evaluation: evaluation,
      evaluationer: evaluationer,
      status,
      action: (
      <FuncPermission
      codes = {this.props.funcPermissions && this.props.funcPermissions.data && this.props.funcPermissions.data.data}
    code = 'evaluationReplay'>
        <a href="javascript:;" style={{marginRight: 20}} className = {'text-link'} onClick={()=>{this.showModal(item.id, item.itemId, item.orderNo, item.skuId);}}>
    回复
    </a>
    <a href="javascript:;" className = {'text-link'} onClick={() => {this.showConfirm('Comment',`${item.isdisplay == 1 ? '隐藏' : '显示'}评论`, `确认要${item.isdisplay == 1 ? '隐藏' : '显示'}此评论吗？`, item.id, item.skuId, item.isdisplay == 1 ? 2 : 1)}}>
    {item.isdisplay == 1 ? '隐藏' : '显示'}
  </a>
    </FuncPermission>
  ),
  });

    if(annexList.length > 0) {
      let imgBox = (
          <div className="imgBox">
          {
            annexList.map((_vl, i) => (
          <div className="com-content" key={i}>
          <span className="com-img" onClick={() => this.onClick(i, index)} style={{background: `url(${icoZoom}) no-repeat`, backgroundSize: '20px 20px'}}>{''}</span>
      <img className="com-content-img" src={`${_vl.url}?img/s/100/100`} alt="" />
          <span className="com-img-span">{''}</span>
          <span className="com-img-span-1" onClick={() => {this.showConfirm('Annex', `${_vl.isdisplay == 1 ? '隐藏' : '显示'}图片`, `确认要${_vl.isdisplay == 1 ? '隐藏' : '显示'}此评论图片吗？`, item.id, _vl.id, _vl.isdisplay == 1 ? 2 : 1)}}>
      {_vl.isdisplay == 1 ? '隐藏' : '显示'}
    </span>
      </div>
    ))
    }
    </div>
    );
      this.data.push({
        key: 3,
        information: imgBox,
        ascriptionShop: '',
        evaluation: '',
        evaluationer: '',
        status: '',
        action:'',
      });
    }

    if(item.replyForPlatformRequestVoList && item.replyForPlatformRequestVoList.length > 0) {
      const ps = item.replyForPlatformRequestVoList.map((_item,_i)=>{
            return (
          <p key={_i} className="clr_orange padLefRit60 padTopBot10">
          <span style={{float: 'left', width: '96%'}}>{_item.replyType == 2 ? `${item.shopName ? item.shopName : '店铺'}回复：` : '平台回复：'}{_item.reply}</span>
      <a style={{float: 'right'}} href="javascript:;" onClick={() => {this.showConfirm('Reply', `${_item.isdisplay == 1 ? '隐藏' : '显示'}回复`, `确认要${_item.isdisplay == 1 ? '隐藏' : '显示'}此回复内容吗？`, item.id, _item.id, _item.isdisplay == 1 ? 2 : 1, item.itemId)}}>
      {_item.isdisplay == 1 ? '隐藏' : '显示'}
    </a>
      </p>
    );
    });
      let replyList = <div className="bgClr_gray minHgt20 replyList">{ps}</div>;
      this.data.push({
        key: 4,
        information: replyList,
        ascriptionShop: '',
        evaluation: '',
        evaluationer: '',
        status: '',
        action:'',
      });
    }

    const table = (
        <Table columns={this.columns2}
    dataSource={this.data}
    pagination = {false}
    showHeader = {false}

        />
  );
    this.tableData.push({
      key: index,
      information: table,
      evaluation: '',
      evaluationer: '',
      action:'',
    });
  });
  }else{}
  this.initload = false;
}
//分页查询
onChangePage(pageNumber){
  console.log("page change:",pageNumber);
  this.pageNumber = pageNumber;
  //var searchData = this.props.ItemBaseSearch.searchdata.searchdata;
  //var pageChange ={...searchData,pageNum:pageNumber};
  let params = this.props.params;
  params.pageNum = pageNumber;
  params.pageSize = 10;
  this.setState({
    paginationLoading: true
  });
  this.props.queryList(params).then(
      (result)=>{
    this.setState({
    paginationLoading: false
  });
  if(+result.code !== 0){
    message.error('评价列表更新失败');
  }else{}
},
  (error)=>{
    this.setState({
      paginationLoading: false
    });
    message.error('评价列表更新失败');
  }
);
}
//生成分页对象
createPagination(){
  let total = 0;
  let current = 0;
  if(this.props.EvaluationManage&&this.props.EvaluationManage.replyList && this.props.EvaluationManage.replyList.data && this.props.EvaluationManage.replyList.data.totalCount){
    total = this.props.EvaluationManage.replyList.data.totalCount;
    current = this.props.EvaluationManage.replyList.data.pageNum;
  }else{}
  return {
        showQuickJumper: true,
        total: total,
        current: current,
        pageSize: 10,
        onChange:(pageNumber)=>this.onChangePage(pageNumber)
};
}
changeParams(value){
  let params = {
    platformId: 1,
    //userId: 2,
    //commentToItemId: this.currentSKU,
    replyConent: value,
    itemId: this.itemId,
    orderNo: this.orderNo,
    skuId: this.skuid
  };
  this.setState({
    loading: false
  });
  this.props.confirmReply(params).then(
      (result)=>{
    if(+this.props.EvaluationManage.confirmReply.code !== 0 && this.props.EvaluationManage.confirmReply.code != undefined){
    message.error(result.msg || '回复失败');
  }else{
    message.success(result.msg || '回复成功！');
    let data = this.props.params;
    data.pageNum = this.pageNumber;
    this.props.queryList(data);
  }
},
  (error)=>{
    message.error('回复失败');
  }
);
}
visibleStatus(value){
  this.setState({
    visible: value
  });
}
changeLoadingStatus(value){
  this.setState({
    loading: value
  });
}
componentWillMount(){
  this.props.getPlatformFuncPermission().then(
      (result)=>{
    if(result.code == 0){
    this.codesResponse = result.data;
    if(this.codesResponse && this.codesResponse.length){
      this.codes = this.codesResponse.join(',');
    }else{}
  }else{
    message.error('获取权限列表失败');
  }
},
  (error)=>{
    message.error('获取权限列表失败');
  }
);
  this.mainDomain=this.props.getMainDomain();
}

onClick(i, index) {
  this.num = index;
  this.setState({
    modalIndex: i,
    visibleTow: true
  });
}

handleCancel() {
  this.setState({
    visibleTow: false
  })
}

handleImgChange(type) {
  let { modalIndex } = this.state;
  if(type) {
    modalIndex ++;
    modalIndex = modalIndex >= this.imgLnegth ? 0 : modalIndex;
  } else {
    modalIndex --;
    modalIndex = modalIndex < 0 ? this.imgLnegth - 1 : modalIndex;
  }
  this.setState({
    modalIndex
  })
}

showConfirm(type, title, content, commentId, id, status, itemId) {
  confirm({
        title: title,
        content: content,
        onOk: () => {this.handleConfirm(type, commentId, id, status, itemId)},
  onCancel() {},
});
}

//隐藏评论或回复
handleConfirm(type, commentId, id, status, itemId) {
  if(type == 'Comment') {
    let params = {
      commentId,
      status,
      skuId: id
    };
    this.props.hideItemComment(params).then(result => {
      if(result.code == 0) {
      message.success(result.msg || '操作成功！');
      let data = this.props.params;
      data.pageNum = this.pageNumber;
      this.props.queryList(data);
    }else{
      message.error(result.msg);
    }
  },(error)=>{
      message.error('操作失败');
    });
  } else if(type == 'Annex') {
    let params = {
      commentId,
      annexId: id,
      status
    };
    this.props.hideItemCommentAnnex(params).then(result => {
      if(result.code == 0) {
      message.success(result.msg || '操作成功！');
      let data = this.props.params;
      data.pageNum = this.pageNumber;
      this.props.queryList(data);
    }else{
      message.error(result.msg);
    }
  },(error)=>{
      message.error('操作失败');
    });
  } else {
    let params = {
      commentId,
      replyId: id,
      status,
      itemId
    };
    this.props.hideItemCommentReply(params).then(result => {
      if(result.code == 0) {
      message.success(result.msg || '操作成功！');
      let data = this.props.params;
      data.pageNum = this.pageNumber;
      this.props.queryList(data);
    }else{
      message.error(result.msg);
    }
  },(error)=>{
      message.error('操作失败');
    });
  }
}

render() {
  this.props.EvaluationManage.replyList && this.props.EvaluationManage.replyList.data && (this.init(this.props.EvaluationManage.replyList.data));
  let {visible, visibleTow, modalIndex} = this.state;
  let annexList = this.props.EvaluationManage.replyList && this.props.EvaluationManage.replyList.data && this.props.EvaluationManage.replyList.data.result ? this.props.EvaluationManage.replyList.data.result.length > 0 && this.props.EvaluationManage.replyList.data.result[this.num].annexList ? this.props.EvaluationManage.replyList.data.result[this.num].annexList : [] : [];
  this.imgLnegth = annexList.length;
  return (
      <div className="ui-tbl yang_container">
      <Table columns={this.columns}
  dataSource={this.tableData}
  pagination={this.createPagination()}
  loading = {this.props.loadingStatus || this.state.paginationLoading}
/>
<Reply
  visible={visible}
  loading = {this.state.loading}
  changeParams = {(value) => this.changeParams(value)}
  visibleStatus = {(value) => this.visibleStatus(value)}
  changeLoadingStatus = {(value) => this.changeLoadingStatus(value)}>
</Reply>
  <PicModal data={annexList} visible={visibleTow} handleCancel={::this.handleCancel} index={modalIndex} handleImgChange={::this.handleImgChange} />
</div>
)
}
}
