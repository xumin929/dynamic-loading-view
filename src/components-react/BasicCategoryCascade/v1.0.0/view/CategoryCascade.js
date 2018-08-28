/**
 * 平台分类组件：四级类目级联选择框
 */
import React, { Component }  from 'react';
import { Select ,Tooltip } from 'jdcloudui';
import styles from './style/category.less';
import './style/style.css';

const Option = Select.Option;
const listTip = '请选择类目';
const allowClear = true;

export default class CategoryCascade extends Component {
  constructor(props,context) {
    super(props,context);
    this.state={
      firstLeaf: false, //一级类目是否是叶子节点
      secondLeaf: false, //二级类目是否是叶子节点
      thirdLeaf: false, //三级类目是否是叶子节点
      fourLeaf: false, //四级类目是否是叶子节点
      firstValue: '请选择',
      secondValue: '请选择',
      thirdValue: '请选择',
      fourValue: '请选择',
    };

    this.firstCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    this.secondCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    this.thirdCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    this.fourCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);

    this.firstLeaf = false;
    this.secondLeaf = false;
    this.thirdLeaf = false;
    this.fourLeaf = false;

    this.currentIndex = 0;
    this.firstOn = true;
    this.secondOn = false;
    this.thirdOn = false;
    this.fourOn = false;
    this.cnames = ''; //用于保存类目回显数据
  }

  componentWillMount() {
    //请求一级类目
    let parentCid = -1;
    this.props.getFirstCid(parentCid,this.props.type);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.itemTmplPublishVo){
      if(nextProps.itemTmplPublishVo.cnames && nextProps.itemTmplPublishVo.cnames != this.cnames){
        this.cnames = nextProps.itemTmplPublishVo.cnames;
        //数据回显
        let cnames = this.cnames.split(',');
        this.setState({
          firstValue: cnames[0]?cnames[0]:'请选择',
          secondValue: cnames[1]?cnames[1]:'请选择',
          thirdValue: cnames[2]?cnames[2]:'请选择',
          fourValue: cnames[3]?cnames[3]:'请选择',
        })
        switch(cnames.length){
          case 1: 
            this.setState({ firstLeaf:true });
            this.firstLeaf = true;
          case 2: 
            this.setState({ secondLeaf:true });
            this.secondLeaf = true;
          case 3: 
            this.setState({ thirdLeaf:true });
            this.thirdLeaf = true;
          case 4: 
            this.setState({ fourLeaf:true });
            this.fourLeaf = true;
        }
      }
    }
  }

  //保存终极类目cid
  handleChangeCategoryValue(cid, ifHasLeaf) {
    let itemName = this.props.itemTmplPublishVo.itemName;
    // 保留管理员信息组件数据
    let publishUserId = this.props.itemTmplPublishVo.publishUserId;
    let operatorId = this.props.itemTmplPublishVo.operatorId;

    // 保留商品id（主要用在编辑时）
    let id = this.props.itemTmplPublishVo.id;

    let itemTmplPublishVo = this.props.resetParamsRedux;
    
    itemTmplPublishVo.itemName = itemName;

    itemTmplPublishVo.publishUserId = publishUserId;
    itemTmplPublishVo.operatorId = operatorId;
    
    itemTmplPublishVo.id = id;
    console.log('-----保存终极类目')
    console.log(ifHasLeaf)
    if(ifHasLeaf){
      itemTmplPublishVo.cid = cid;
      if(this.props.type == 1){
        itemTmplPublishVo.itemPerfectVo = null;
      }
      this.props.updateItemTmplAction(itemTmplPublishVo)
    }
  }

  detailIndex(cid, category , index){//判断当前是否是根节点
    let hasLeaf = false;
    if(category && category.length > 0){
      category.map((item, index) => {
        if(item.cid == cid){
          this.currentIndex = index;
          if(category[this.currentIndex].hasLeaf == 1){
            hasLeaf = true;
          }
        }
      });
    }
    switch (index){
      case 1:
        this.setState({firstLeaf: hasLeaf});
        this.firstLeaf = hasLeaf;
      case 2: 
        this.setState({secondLeaf: hasLeaf});
        this.secondLeaf = hasLeaf;
      case 3: 
        this.setState({thirdLeaf: hasLeaf});
        this.thirdLeaf = hasLeaf;
      case 4: 
        this.setState({fourLeaf: hasLeaf});
        this.fourLeaf = hasLeaf;
    }
  }

  /**
   * 获取四级类目cid，返回组件对外提供的方法上面，供父组件使用
   * @param cid
   */
  handleFourCategoryChange=(cid)=> {
    // if(this.props.ifCategory){
    //   this.props.ifCategory(true);
    // }
    this.setState({
      fourValue: cid
    });
    this.detailIndex(cid, this.props.getCidRedux.four.data.data, 4);
    this.handleChangeCategoryValue(cid, this.fourLeaf);
  }

  /**
   * 查询四级类目
   * @param cid
   */
  handleThirdCategoryChange=(cid)=> {
    this.firstOn = true;
    this.secondOn = true;
    this.thirdOn = true;
    this.fourOn = true;
    this.setState({
      thirdValue: cid,
      fourValue: '请选择',
      fourLeaf: false,
    });
    this.fourCategoryOptions = [];
    if (cid && (cid != '请选择')){
      this.detailIndex(cid, this.props.getCidRedux.third.data.data, 3);
      this.props.getFourCid(cid,this.props.type).then(
         (result) => {
          if(result.data && result.data.length < 1){
              if(!this.state.thirdLeaf){
                // if(this.props.ifCategory){
                //     this.props.ifCategory(false);
                //   }
                this.fourCategoryOptions = [];
                this.firstOn = true;
                this.secondOn = true;
                this.thirdOn = true;
                this.fourOn = false;
              }else{
                // if(this.props.ifCategory){
                //     this.props.ifCategory(true);
                //   }
                this.setState({
                    fourValue: '请选择',
                  });
                this.fourCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
              }
            }else{
              // if(this.props.ifCategory){
              //   this.props.ifCategory(true);
              // }
            }
           }
        );
    }else {
      this.fourCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
      this.props.clearData(3);
    }
    this.handleChangeCategoryValue(cid, this.thirdLeaf);
  }
  /**
   * 查询三级类目
   * @param cid
   */
  handleSecondCategoryChange=(cid)=> {
    this.setState({
      secondValue: cid,
      thirdValue: '请选择',
      fourValue: '请选择',
      secondLeaf: false,
      thirdLeaf: false,
      fourLeaf: false,
    });
    this.firstOn = true;
    this.secondOn = true;
    this.thirdOn = true;
    this.fourOn = false;
    this.thirdCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    this.fourCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    if (cid && (cid != '请选择')){
      this.detailIndex(cid, this.props.getCidRedux.second.data.data, 2);
      this.props.getThirdCid(cid,this.props.type).then(
        (result) => {
          if(result.data && result.data.length < 1){
              if(!this.state.secondLeaf){
                //  if(this.props.ifCategory){
                //     this.props.ifCategory(false);
                //   }
                  this.thirdCategoryOptions = [];
                  this.fourCategoryOptions = [];
                  this.firstOn = true;
                  this.secondOn = true;
                  this.thirdOn = false;
                  this.fourOn = false;
              }else{
                  // if(this.props.ifCategory){
                  //   this.props.ifCategory(true);
                  // }
                  this.setState({
                      thirdValue: '请选择',
                      fourValue: '请选择',
                  });
                  this.thirdCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
                  this.fourCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
              }
          }else{
            // if(this.props.ifCategory){
            //   this.props.ifCategory(true);
            // }
          }
        }
      )
    }else{
      this.thirdCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
      this.fourCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
      this.props.clearData(2);
    }
    this.handleChangeCategoryValue(cid, this.secondLeaf);
  }
  /**
   * 查询二级类目
   * @param cid
   */
  handleFirstCategoryChange=(cid)=> {
    this.setState({
      firstValue: cid,
      secondValue: '请选择',
      thirdValue: '请选择',
      fourValue: '请选择',
      secondLeaf: false,
      thirdLeaf: false,
      fourLeaf: false,
    });
    this.firstOn = true;
    this.secondOn = true;
    this.thirdOn = false;
    this.fourOn = false;
    this.secondCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    this.thirdCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    this.fourCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    if (cid && (cid != '请选择')) {
      this.detailIndex(cid, this.props.getCidRedux.first.data.data, 1);
      this.props.getSecondCid(cid,this.props.type).then(
        (result) => {
          if(result.data && result.data.length < 1){
            if(!this.state.firstLeaf){
              // if(this.props.ifCategory){
              //   this.props.ifCategory(false);
              // }
              this.secondCategoryOptions = [];
              this.thirdCategoryOptions = [];
              this.fourCategoryOptions = [];
              this.secondOn = false;
              this.thirdOn = false;
              this.fourOn = false;  
            }else{
              // if(this.props.ifCategory){
              //   this.props.ifCategory(true);
              // }
               this.setState({
                  secondValue: '请选择',
                  thirdValue: '请选择',
                  fourValue: '请选择',
                });
              this.secondCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
              this.thirdCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
              this.fourCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
            }
          }else{
            //  if(this.props.ifCategory){
            //     this.props.ifCategory(true);
            //   }
          }
        }
      );
    } else{
      this.secondCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
      this.thirdCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
      this.fourCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
      this.props.clearData(1);
    }
    this.handleChangeCategoryValue(cid, this.firstLeaf);
  }

  dataSource() {
    return {
      first:()=>{
        if (this.props.getCidRedux.first.data){
          let firstResult = this.props.getCidRedux.first.data.data;
          if (firstResult && firstResult.length > 0){
            this.firstCategoryOptions = firstResult.map(first => <Option  title = {first.categoryName}  key={first.cid}>
                  {first.categoryName}
            </Option>);
            this.firstCategoryOptions.unshift(<Option  title = {'请选择'}  key={'请选择'}>
                  <span style = {{color: '#ccc'}}>请选择</span>
            </Option>);
          } 
        }
      },
      second:()=>{
        if (this.props.getCidRedux.second.data){
          let secondResult = this.props.getCidRedux.second.data.data;
          if (secondResult && secondResult.length > 0){
            this.secondCategoryOptions = secondResult.map(second => <Option title = {second.categoryName}  key={second.cid}>{second.categoryName}</Option>);
            this.secondCategoryOptions.unshift(<Option  title = {'请选择'}  key={'请选择'}>
                  <span style = {{color: '#ccc'}}>请选择</span>
            </Option>);
          }
        }
      },
      third:()=>{
        if (this.props.getCidRedux.third.data){
          let thirdResult = this.props.getCidRedux.third.data.data;
          if (thirdResult && thirdResult.length > 0){
            this.thirdCategoryOptions = thirdResult.map(third => <Option title = {third.categoryName}  key={third.cid}>{third.categoryName}</Option>);
            this.thirdCategoryOptions.unshift(<Option  title = {'请选择'}  key={'请选择'}>
                  <span style = {{color: '#ccc'}}>请选择</span>
            </Option>);
          }
        }
      },
      four:()=>{
        if (this.props.getCidRedux.four.data){
          let fourResult = this.props.getCidRedux.four.data.data;
          if (fourResult && fourResult.length > 0){
            this.fourCategoryOptions = fourResult.map(four => <Option title = {four.categoryName}  key={four.cid}>{four.categoryName}</Option>);
            this.fourCategoryOptions.unshift(<Option  title = {'请选择'}  key={'请选择'}>
                  <span style = {{color: '#ccc'}}>请选择</span>
            </Option>);
          }
        }
      }
    }
  }

  render() {
    this.firstOn && this.props.getCidRedux.first.firstloaded && this.dataSource().first();
    this.secondOn && this.props.getCidRedux.second.secondloaded && this.dataSource().second();
    this.thirdOn && this.props.getCidRedux.third.thirdloaded && this.dataSource().third();
    this.fourOn && this.props.getCidRedux.four.fourloaded && this.dataSource().four();

    return (
      <div className={styles.labelWrap}>
        <label className={styles.labelTitle}><span style={{color:'red'}}>*</span>平台分类：</label>
        <div className={styles.labelCont}>
        {/*一级类目变化*/}
          <Select 
              disabled = {this.props.ifValid}
              placeholder='请选择'
              value = {this.state.firstValue} 
              notFoundContent={listTip} 
              allowClear={allowClear} 
              size="large" 
              className="select"
              onChange={this.handleFirstCategoryChange}>
                  {this.firstCategoryOptions}
          </Select>
        {/*二级类目变化*/}
          <Select 
              disabled = {this.props.ifValid || this.state.firstLeaf } 
              placeholder='请选择'
              notFoundContent={listTip} 
              allowClear={allowClear} 
              size="large" 
              className="select"
              onChange={this.handleSecondCategoryChange}
              value = {this.state.secondValue} >
                  {this.secondCategoryOptions} 
          </Select>
        {/*三级类目变化*/}
          <Select 
              disabled = {this.props.ifValid || this.state.secondLeaf || this.state.firstLeaf } 
              placeholder='请选择'
              notFoundContent={listTip} 
              allowClear={allowClear} 
              size="large" 
              className="select"
              onChange={this.handleThirdCategoryChange}
              value = {this.state.thirdValue} >
                  {this.thirdCategoryOptions}
          </Select>
        {/*四级类目变化*/}
          <Select 
              disabled = {this.props.ifValid || this.state.firstLeaf||this.state.secondLeaf || this.state.thirdLeaf } 
              placeholder='请选择'
              notFoundContent={listTip} 
              allowClear={allowClear} 
              size="large" 
              className="select"
              value = {this.state.fourValue}  
              onChange={this.handleFourCategoryChange}>
                  {this.fourCategoryOptions}
          </Select>
        </div>
      </div>
    );
  }
}
