/*

 * author:LiuYang
 * date:2017-03
 * description:按照提出的新需要改成默认显示四列并且加上回显功能

 */
import React from 'react';
import BaseComponent from '../../Common/BaseComponent';
import { Select } from 'jdcloudui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getFirstCid,getSecondCid,getThirdCid,getFourCid,clearData} from './redux';

const Option = Select.Option;
const defaultValue = '请选择';
const listTip = '请选择类目';
const allowClear = true;

@connect(
  state => ({categoryCascade:state.categoryCascade}),
  dispatch => bindActionCreators({getFirstCid,getSecondCid,getThirdCid,getFourCid,clearData}, dispatch)
)
export default class CategoryCascade extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.state={
      newcategory: [],
      second: false,
      third: false,
      four: false,
      first: false,
      firstValue: <span style = {{color: '#ccc'}}>请选择</span>,
      secondValue: <span style = {{color: '#ccc'}}>请选择</span>,
      thirdValue: <span style = {{color: '#ccc'}}>请选择</span>,
      fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
      defaultValue : '请选择'
    };
    this.handleFirstCategoryChange = this.handleFirstCategoryChange.bind(this);
    this.handleSecondCategoryChange = this.handleSecondCategoryChange.bind(this);
    this.handleThirdCategoryChange = this.handleThirdCategoryChange.bind(this);
    this.handleFourCategoryChange = this.handleFourCategoryChange.bind(this);
    this.firstCategoryOptions = [];
    this.secondCategoryOptions = [];
    this.thirdCategoryOptions = [];
    this.fourCategoryOptions = [];
    this.firstCategoryId = {};
    this.secondCategoryId = {};
    this.thirdCategoryId = {};
    this.fourCategoryId = {};
    //是否联动
    this.isShowAllCategory = false;
    this.initFind = true;
    this.newcategory = [];
    this.category = [];
    this.cid = 0;
    this.currentCategory = [];
    this.currentIndex = 0;
    this.firstIfLeaf = false;
    this.secondIfLeaf = false;
    this.thirdIfLeaf = false;
    this.fourIfLeaf = false;
    this.firstOn = true;
    this.secondOn = false;
    this.thirdOn = false;
    this.fourOn = false;
  }

  /**
   * 初始化view时，查询平台一级分类
   */
  componentWillMount() {
    console.log(this.props,'this.propsthis.propsthis.propsthis.props');
    this.isShowAllCategory = this.props.isShowAllCategory && this.props.isShowAllCategory;
    let parentCid = -1;
    this.props.getFirstCid(this.platformId,parentCid);
    console.log(this.props,'this.propsthis.propsthis.propsthis.props');
  }

  /**
   * 判断json对象是否为空
   * @param e
   * @returns {boolean}
   */
  isNotEmptyObject(e){
    var t;
    for (t in e)
      return !0;
    return !1
  }

  handleChangeCategoryValue(cid, ifHasLeaf) { //什么时候把值传过去
    let {onChangeCategoryValue} = this.props;
    /*if (this.isNotEmptyObject(this.fourCategoryId) && ifHasLeaf){
      onChangeCategoryValue(this.fourCategoryId.cid);
    }else if(this.isNotEmptyObject(this.thirdCategoryId) && ifHasLeaf){
      onChangeCategoryValue(this.thirdCategoryId.cid);
    }else if(this.isNotEmptyObject(this.secondCategoryId) && ifHasLeaf){
      onChangeCategoryValue(this.secondCategoryId.cid);
    }else if(this.isNotEmptyObject(this.firstCategoryId) && ifHasLeaf){
      onChangeCategoryValue(this.firstCategoryId.cid);
    }else {
      onChangeCategoryValue(cid);
    }*/
    let val = {
      cid: cid,
      ifHasLeaf: ifHasLeaf
    };
    onChangeCategoryValue(val);
  }
  // author liuyang
  detailIndex(cid, category , index){//判断当前是否是根节点
    this.firstIfLeaf = false;
    this.secondIfLeaf = false;
    this.thirdIfLeaf = false;
    this.fourIfLeaf = false;
    let hasLeaf = false;
    if(category && category.length > 0){
      category.map((item, index) => {
        if(item.cid == cid){
          this.currentIndex = index;
          if(category[this.currentIndex].hasLeaf == 1){
            hasLeaf = true;
          }else{}
        }else{}
      });
    }else{}

    if(+index === 2){
      this.setState({
        second: hasLeaf
      });
      this.secondIfLeaf = hasLeaf;
    }else if(+index === 3){
      this.setState({
        third: hasLeaf
      });
      this.thirdIfLeaf = hasLeaf;
    }else if(+index === 4){
      this.setState({
        four: hasLeaf
      });
      this.fourIfLeaf = hasLeaf;
    }else{
      this.setState({
        first: hasLeaf
      });
      this.firstIfLeaf = hasLeaf;
    }
  }
  // author liuyang
  /**
   * 获取四级类目cid，返回组件对外提供的方法上面，供父组件使用
   * @param cid
   */
  handleFourCategoryChange(cid) {
    if(this.props.ifCategory){
      this.props.ifCategory(true);
    }else{}
    this.setState({
      fourValue: cid
    });
    if (cid){
      this.fourCategoryId = {cid:cid};
    }else{
      this.fourCategoryId = {};
    }
    this.detailIndex(cid, this.props.categoryCascade.four.data.data, 4);
    this.handleChangeCategoryValue(cid, this.fourIfLeaf);
  }

  /**
   * 查询四级类目
   * @param cid
   */
  handleThirdCategoryChange(cid) {
    this.firstOn = true;
    this.secondOn = true;
    this.thirdOn = true;
    this.fourOn = true;
    this.setState({
      thirdValue: cid,
      fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
      four: false,
    });
    this.fourCategoryOptions = [];
    if (cid){
      this.detailIndex(cid, this.props.categoryCascade.third.data.data, 3);
      this.thirdCategoryId = {cid:cid};
      this.props.getFourCid(this.platformId,cid).then(
         (result) => {
          if(result.data && result.data.length < 1){
              if(!this.thirdIfLeaf){
                if(this.props.ifCategory){
                    this.props.ifCategory(false);
                  }else{}
                    this.setState({
                      defaultValue: '当前无分类信息',
                      fourValue: <span style = {{color: '#ccc'}}>当前无分类信息</span>,
                    });
                this.fourCategoryOptions = [];
                this.firstOn = true;
                this.secondOn = true;
                this.thirdOn = true;
                this.fourOn = false;
              }else{
                if(this.props.ifCategory){
                    this.props.ifCategory(true);
                  }else{}
                this.setState({
                    defaultValue: '请选择',
                    fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
                  });
                this.fourCategoryOptions = [];
              }
            }else{
              if(this.props.ifCategory){
                    this.props.ifCategory(true);
                  }else{}
            }
           }
        );
    }else {
      this.thirdCategoryId = {};
      this.fourCategoryId = {};
      this.fourCategoryOptions = [];
      this.props.clearData(3);
    }
    this.handleChangeCategoryValue(cid, this.thirdIfLeaf);
  }
  /**
   * 查询三级类目
   * @param cid
   */
  handleSecondCategoryChange(cid) {
    this.setState({
      secondValue: cid,
      thirdValue: <span style = {{color: '#ccc'}}>请选择</span>,
      fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
      third: false,
      four: false,
    });
    this.firstOn = true;
    this.secondOn = true;
    this.thirdOn = true;
    this.fourOn = false;
    this.thirdCategoryOptions = [];
    this.fourCategoryOptions = [];
    if (cid){
      this.detailIndex(cid, this.props.categoryCascade.second.data.data, 2);
      this.secondCategoryId = {cid:cid};
      this.props.getThirdCid(this.platformId,cid).then(
        (result) => {
          if(result.data && result.data.length < 1){
              if(!this.secondIfLeaf){
                 if(this.props.ifCategory){
                    this.props.ifCategory(false);
                  }else{}
                  this.setState({
                    defaultValue: '当前无分类信息',
                    thirdValue: <span style = {{color: '#ccc'}}>当前无分类信息</span>,
                    fourValue: <span style = {{color: '#ccc'}}>当前无分类信息</span>,
                  });
                  this.thirdCategoryOptions = [];
                  this.fourCategoryOptions = [];
                  this.firstOn = true;
                  this.secondOn = true;
                  this.thirdOn = false;
                  this.fourOn = false;
              }else{
                  if(this.props.ifCategory){
                    this.props.ifCategory(true);
                  }else{}
                  this.setState({
                      defaultValue: '请选择',
                      thirdValue: <span style = {{color: '#ccc'}}>请选择</span>,
                      fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
                  });
                  this.thirdCategoryOptions = [];
                  this.fourCategoryOptions = [];
              }
          }else{
            if(this.props.ifCategory){
              this.props.ifCategory(true);
            }else{}
          }
        }
      )
    }else{
      this.secondCategoryId = {};
      this.thirdCategoryId = {};
      this.fourCategoryId = {};
      this.thirdCategoryOptions = [];
      this.fourCategoryOptions = [];
      this.props.clearData(2);
    }
    //this.handleChangeCategoryValue(cid);
    this.handleChangeCategoryValue(cid, this.secondIfLeaf);
  }
  /**
   * 查询二级类目
   * @param cid
   */
  handleFirstCategoryChange(cid) {
    this.setState({
      firstValue: cid,
      secondValue: <span style = {{color: '#ccc'}}>请选择</span>,
      thirdValue: <span style = {{color: '#ccc'}}>请选择</span>,
      fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
      second: false,
      third: false,
      four: false,
    });
    this.firstOn = true;
    this.secondOn = true;
    this.thirdOn = false;
    this.fourOn = false;
    this.secondCategoryOptions = [];
    this.thirdCategoryOptions = [];
    this.fourCategoryOptions = [];
    if (cid) {
      this.detailIndex(cid, this.props.categoryCascade.first.data.data, 1);
      this.firstCategoryId = {cid:cid};
      this.props.getSecondCid(this.platformId,cid).then(
        (result) => {
          if(result.data && result.data.length < 1){
            if(!this.firstIfLeaf){
              if(this.props.ifCategory){
                this.props.ifCategory(false);
              }else{}
              this.setState({
                defaultValue: '当前无分类信息',
                secondValue: <span style = {{color: '#ccc'}}>当前无分类信息</span>,
                thirdValue: <span style = {{color: '#ccc'}}>当前无分类信息</span>,
                fourValue: <span style = {{color: '#ccc'}}>当前无分类信息</span>,
              });
              this.secondCategoryOptions = [];
              this.thirdCategoryOptions = [];
              this.fourCategoryOptions = [];
              this.secondOn = false;
              this.thirdOn = false;
              this.fourOn = false;
            }else{
              if(this.props.ifCategory){
                this.props.ifCategory(true);
              }else{}
               this.setState({
                  defaultValue: '请选择',
                  secondValue: <span style = {{color: '#ccc'}}>请选择</span>,
                  thirdValue: <span style = {{color: '#ccc'}}>请选择</span>,
                  fourValue: <span style = {{color: '#ccc'}}>请选择</span>,
                });
              this.secondCategoryOptions = [];
              this.thirdCategoryOptions = [];
              this.fourCategoryOptions = [];
            }
          }else{
             if(this.props.ifCategory){
                this.props.ifCategory(true);
              }else{}
          }
        }
      );
    } else{
      this.firstCategoryId = {};
      this.secondCategoryId = {};
      this.thirdCategoryId = {};
      this.fourCategoryId = {};
      this.secondCategoryOptions = [];
      this.thirdCategoryOptions = [];
      this.fourCategoryOptions = [];
      this.props.clearData(1);
    }
    this.handleChangeCategoryValue(cid, this.firstIfLeaf);
  }
  dataSource() {
    return {
      first:()=>{
        if (this.props.categoryCascade.first.data){
          let firstResult = this.props.categoryCascade.first.data.data;
          if (firstResult && firstResult.length > 0){
            this.firstCategoryOptions = firstResult.map(first => <Option key={first.cid}>{first.categoryName}</Option>);
          }
        }else{}
      },
      second:()=>{
        if (this.props.categoryCascade.second.data){
          let secondResult = this.props.categoryCascade.second.data.data;
          if (secondResult && secondResult.length > 0){
            this.secondCategoryOptions = secondResult.map(second => <Option key={second.cid}>{second.categoryName}</Option>);
          }else{
          }
        }else{

        }
      },
      third:()=>{
        if (this.props.categoryCascade.third.data){
          let thirdResult = this.props.categoryCascade.third.data.data;
          if (thirdResult && thirdResult.length > 0){
            this.thirdCategoryOptions = thirdResult.map(third => <Option key={third.cid}>{third.categoryName}</Option>);
          }else{
          }
        }else{
        }
      },
      four:()=>{
        if (this.props.categoryCascade.four.data){
          let fourResult = this.props.categoryCascade.four.data.data;
          if (fourResult && fourResult.length > 0){
            this.fourCategoryOptions = fourResult.map(four => <Option key={four.cid}>{four.categoryName}</Option>);
          }else{

          }
        }else{
        }
      }
    }
  }
  render() {
    this.firstOn && this.props.categoryCascade.first.firstloaded && this.dataSource().first();
    this.secondOn && this.props.categoryCascade.second.secondloaded && this.dataSource().second();
    this.thirdOn && this.props.categoryCascade.third.thirdloaded && this.dataSource().third();
    this.fourOn && this.props.categoryCascade.four.fourloaded && this.dataSource().four();
    if(this.props.categoryData != null){
      if(this.initFind){
        this.category = this.props.categoryData.split(',');
        this.newcategory = [];
        this.category.map((item,index) => {
          if(item != null && item != "null"){
            this.newcategory.push(item);
          }else{}
        });
        this.setState({
          newcategory: this.newcategory
        });
        this.initFind =  false;
      }else{}
    }else{}
    //信息回显end  author liuyang
     return (
        <div>
          {this.props.categoryEdit && this.state.newcategory.length > 0 && <Select disabled = {this.props.first} placeholder={defaultValue}   defaultValue = {this.state.newcategory[0]&&this.state.newcategory[0]} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120 ,marginRight:10}} onChange={this.handleFirstCategoryChange}>
                      {this.firstCategoryOptions}
                    </Select>}
          {!this.props.categoryEdit && <Select  value = {this.state.firstValue} placeholder={defaultValue} notFoundContent={listTip} allowClear={true} size="large" style={{ width: 120,marginRight:10 }} onChange={this.handleFirstCategoryChange}>
                      {this.firstCategoryOptions}
                    </Select>}
          {this.props.categoryEdit && this.state.newcategory.length > 1 && <Select disabled = {this.state.first || this.props.first} placeholder={defaultValue}   defaultValue = {this.state.newcategory[1]&&this.state.newcategory[1]} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120 ,marginRight:10}} onChange={this.handleSecondCategoryChange}>
                      {this.secondCategoryOptions}
                    </Select>}
          {!this.props.categoryEdit && <Select value = {this.state.secondValue} disabled = {this.state.first} placeholder={defaultValue} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120,marginRight:10 }} onChange={this.handleSecondCategoryChange}>
                      {this.secondCategoryOptions}
                    </Select>}
          {this.props.categoryEdit && this.state.newcategory.length >= 2 && <Select disabled = {this.state.second || this.state.first || this.props.first} placeholder={defaultValue}   defaultValue = {this.state.newcategory[2] ? this.state.newcategory[2] : '请选择'} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120 ,marginRight:10}} onChange={this.handleThirdCategoryChange}>
                      {this.thirdCategoryOptions}
                    </Select>}
          {!this.props.categoryEdit && <Select value = {this.state.thirdValue} disabled = {this.state.second || this.state.first} placeholder={defaultValue} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120,marginRight:10 }} onChange={this.handleThirdCategoryChange}>
                      {this.thirdCategoryOptions}
                    </Select>}
          {this.props.categoryEdit && this.state.newcategory.length >= 2 && <Select disabled = {this.state.first || this.state.second || this.state.third || this.props.first } placeholder={defaultValue}    defaultValue = {this.state.newcategory[3] ? this.state.newcategory[3] : '请选择'} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120 ,marginRight:10}} onChange={this.handleFourCategoryChange}>
                      {this.fourCategoryOptions}
                    </Select>}
          {!this.props.categoryEdit && <Select value = {this.state.fourValue} disabled = {this.state.first||this.state.second || this.state.third }  placeholder={defaultValue} notFoundContent={listTip} allowClear={allowClear} size="large" style={{ width: 120,marginRight:10 }} onChange={this.handleFourCategoryChange}>
                      {this.fourCategoryOptions}
                    </Select>}
        </div>
      );
  }
}
