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

export default class ShopCategory extends Component {
  constructor(props,context) {
    super(props,context);
    this.state={
      firstLeaf: false, //一级类目是否是叶子节点
      secondLeaf: false, //二级类目是否是叶子节点
      firstValue: '请选择',
      secondValue: '请选择',
    };

    this.firstCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    this.secondCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    this.firstLeaf = false;
    this.secondLeaf = false;
    
    this.currentIndex = 0;
    this.firstOn = true;
    this.secondOn = false;
    this.shopCnames = ''; //用于保存类目回显数据
  }

  componentWillMount() {
    //请求一级类目
    let parentCid = -1;
    this.props.getFirstCid(parentCid);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.itemTmplPublishVo){
      if(nextProps.itemTmplPublishVo.shopCnames && nextProps.itemTmplPublishVo.shopCnames != this.shopCnames){
        this.shopCnames = nextProps.itemTmplPublishVo.shopCnames;
        //数据回显
        let shopCnames = this.shopCnames.split(',');
        this.setState({
          firstValue: shopCnames[0]?shopCnames[0]:'请选择',
          secondValue: shopCnames[1]?shopCnames[1]:'请选择',
        })
        switch(shopCnames.length){
          case 1: 
            this.setState({ firstLeaf:true });
            this.firstLeaf = true;
          case 2: 
            this.setState({ secondLeaf:true });
            this.secondLeaf = true;
        }
      }
    }
  }

  //保存终极类目cid
  handleChangeCategoryValue(cid, ifHasLeaf) {
    let itemTmplPublishVo = this.props.itemTmplPublishVo;
    if(ifHasLeaf){
      itemTmplPublishVo.shopCid = cid
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
    }
  }

  /**
   * 获取二级类目cid，返回组件对外提供的方法上面，供父组件使用
   * @param cid
   */
  handleSecondCategoryChange=(cid)=> {
    this.setState({
      secondValue: cid
    });
    this.detailIndex(cid, this.props.getShopCidRedux.second.data.data, 2);
    this.handleChangeCategoryValue(cid, this.secondLeaf);
  }

  /**
   * 查询二级类目
   * @param cid
   */
  handleFirstCategoryChange=(cid)=> {
    let itemTmplPublishVo = this.props.itemTmplPublishVo;
    itemTmplPublishVo.shopCid = cid
    this.props.updateItemTmplAction(itemTmplPublishVo)
    this.setState({
      firstValue: cid,
      secondValue: '请选择',
      secondLeaf: false,
    });
    this.firstOn = true;
    this.secondOn = true;
    this.secondCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
    if (cid && (cid != '请选择')) {
      this.detailIndex(cid, this.props.getShopCidRedux.first.data.data, 1);
      this.props.getSecondCid(cid).then(
        (result) => {
          if(result.data && result.data.length < 1){
            if(!this.state.firstLeaf){

              this.secondCategoryOptions = [];
              this.secondOn = false;
            }else{
               this.setState({
                  secondValue: '请选择',
                });
              this.secondCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
            }
          }
        }
      );
    } else{
      this.secondCategoryOptions = (<Option  title = {'请选择'}  key={'请选择'}><span style = {{color: '#ccc'}}>请选择</span></Option>);
      this.props.clearData(1);
    }
    this.handleChangeCategoryValue(cid, this.firstLeaf);
  }

  dataSource() {
    return {
      first:()=>{
        if (this.props.getShopCidRedux.first.data){
          let firstResult = this.props.getShopCidRedux.first.data.data;
          if (firstResult && firstResult.length > 0){
            this.firstCategoryOptions = firstResult.map(first => <Option  title = {first.cName}  key={first.cid}>
                  {first.cName}
            </Option>);
            this.firstCategoryOptions.unshift(<Option  title = {'请选择'}  key={'请选择'}>
                  <span style = {{color: '#ccc'}}>请选择</span>
            </Option>);
          } 
        }
      },
      second:()=>{
        if (this.props.getShopCidRedux.second.data){
          let secondResult = this.props.getShopCidRedux.second.data.data;
          if (secondResult && secondResult.length > 0){
            this.secondCategoryOptions = secondResult.map(second => <Option title = {second.cName}  key={second.cid}>{second.cName}</Option>);
            this.secondCategoryOptions.unshift(<Option  title = {'请选择'}  key={'请选择'}>
                  <span style = {{color: '#ccc'}}>请选择</span>
            </Option>);
          }
        }
			}
    }
  }

  render() {
    this.firstOn && this.props.getShopCidRedux.first.firstloaded && this.dataSource().first();
    this.secondOn && this.props.getShopCidRedux.second.secondloaded && this.dataSource().second();

    return (
      <div className={styles.labelWrap}>
        <label className={styles.labelTitle}>店铺：</label>
        <div className={styles.labelCont}>
        {/*一级类目变化*/}
          <Select
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
              disabled = { this.state.firstLeaf } 
              placeholder='请选择'
              notFoundContent={listTip} 
              allowClear={allowClear} 
              size="large" 
              className="select"
              onChange={this.handleSecondCategoryChange}
              value = {this.state.secondValue} >
                  {this.secondCategoryOptions} 
          </Select>
        </div>
      </div>
    );
  }
}