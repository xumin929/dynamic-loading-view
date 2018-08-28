/****************************************************************
 * author:LiuPeng
 * date:2017-02-20
 * description:产品发布-图片上传-外层
 ****************************************************************/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseComponent from '../Common/BaseComponent';
import {getGoodsInfo,uploadPrams,uploadPicture,postCacheTable,getCacheTable,setImgCacheTableKeys} from './redux';
import GoodsPic from '../GoodsRlease/GoodsPic'
import GoodsPicSingle from '../GoodsRlease/GoodsPicSingle'
import { Radio, Table} from 'jdcloudui';
import styles from './style/GoodsPic.css';
import styleless from './style/GoodsPicl.less';
import _ from 'lodash';
const RadioGroup = Radio.Group;
@connect(
  state => ({
    goodsRlease:state.goodsRlease,
    goodsEdit: state.goodsEdit
  }),
  dispatch => bindActionCreators({getGoodsInfo,uploadPrams,uploadPicture,postCacheTable,getCacheTable,setImgCacheTableKeys}, dispatch)
)

export default class GoodsPicWrapper extends BaseComponent{
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 0,
      dataSourceId:[],
      loading:true,
      key: null,
      redioIndex:0
    };
    //传给后端的所有数据
    this.picAllDate = {
      'itemPictureVoList':[],     //商品图片
      'itemSkuPictureVoList':[]   //SKU图片
    };
    this.dataSource = [];     //table表格的数据源
    this.dataColumns = [];    //table表格的列
    this.itemPulishVO = [];
    this.initialArr = [];
    this.saleData = [];       //所有对应得属性和属性名
    this.itemSkuVoList =[];   //所有生成的SKU基础信息
    this.attrValueName = [];
    this.attrKeys = [];
    this.columnsKeys = [];
    this.targetNum = 0;      //初始化Tab默认值
    this.attrId = null;
    this.attrValueId = null;
    this.attributes = [];
    this.staticSource = [];   //获取的完整的静态数据源
    // this.allAttrName = [];
    this.changeColumnsKeys =[];
    this.setPics = [];
    this.actionPic = [];
    this.initialParent = [];
    this.initialChildren = [];
    this.random = 1;
    this.dataSourceId=[];
  }

  componentWillMount() {
    this.handleInit();
    this.makeInitialArr();
    //编辑状态数据回显
    if(this.props.editGoods){
      console.log('edit')
      this.makeInitialReplay();
    }
    this.getSkuPicture();
    this.staticSource = JSON.parse(JSON.stringify(this.dataSource));
    console.log('update')
    this.props.handleIfupdateBack();
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.goodsRlease.itemPulishVO.itemSkuVoList,"this.props。this.itemSkuVoList")
    if(nextProps.ifupdate){
            console.log('change')

            this.props.handleIfupdateBack();
            this.props.editGoods?this.handleInitEdit(nextProps):this.handleInit();

            //清空存储图片和alt的字段
            this.initialArr = [];
            let lenArr = nextProps.goodsRlease.itemPulishVO.itemSkuVoList.length;
            for(let i = 0;i < lenArr;i++){
              this.initialArr.push([])
            }
            //初始化分别上传
            this.setState({
              value: 0
            });
              //this.random = Math.random();
              this.getSkuPicture();
              this.setState({
                key: Math.random()
              });
    }
    console.log("this.props.ifupdate：",this.props.ifupdate)
  }
  /*
   * 编辑是数据的回显
   * */
  makeInitialReplay(){
    let itemPictureVoList = this.props.goodsEdit.editGoods.itemPictureVoList;
    let itemSkuPictureVoList = this.props.goodsEdit.editGoods.itemSkuPictureVoList;
    let itemSkuVoList = this.props.goodsEdit.editGoods.itemSkuVoList;
    //将回显的数据传到redux
    this.itemPulishVO.itemPictureVoList = itemPictureVoList;
    this.itemPulishVO.itemSkuPictureVoList = itemSkuPictureVoList;
    this.props.uploadPrams(this.itemPulishVO)
    let dataSourceId=[];
    //编辑状态下保存的数据传给对应的展示项目
    if(itemPictureVoList&&itemPictureVoList.length>0){
      itemPictureVoList.map((item1,index1) => {
        this.initialParent.push({
          alt:item1.altImages,
          url:item1.pictureUrl
        })
      })
    }
    let diff = [];
    if(itemSkuPictureVoList&&itemSkuPictureVoList.length>0){
      itemSkuPictureVoList.map((item2,index2) => {
        diff.push(item2.attributes[0])
      })
    }
    diff  = [...new Set(diff)]     //数组去重
    for(let i = 0;i<diff.length;i++){
      this.initialChildren.push([])
    }
    if(diff!==[]&&diff.length>0){
      diff.map((item3,index3) =>{
        itemSkuPictureVoList.map((item4,index4) => {
          if(item3 ==item4.attributes[0]){
            this.initialChildren[index3].push({
              alt:item4.altImages,
              url:item4.pictureUrl
            })
          }
        })
      })
    }
    this.initialArr = JSON.parse(JSON.stringify(this.initialChildren))
    if(itemSkuVoList !==null&&itemSkuVoList.length > 0){
      this.makeInitialSourceData(itemSkuVoList.length);
      itemSkuVoList.map((item,index) => {
        this.attrValueName = [];
        this.attrKeys = [];
        if(item.attributes){
            let firstarr = item.attributes.split(';');
            firstarr.map((item1,index1) => {
              let secondarr = item1.split(':');
              this.getSkuValueName(secondarr[1]);
              this.getSkuAttrName(secondarr[0])
            })
            this.columnsKeys = this.attrKeys;
            this.changeColumnsKeys = JSON.parse(JSON.stringify(this.columnsKeys));
            /*
             * 初始化Table数据源dataSource
             * */
            this.dataSource[index].key = index+1;
            this.attrValueName.map((item2,index2) => {
              this.dataSource[index][this.attrKeys[index2]]= item2.name;
            });
            this.dataSource[index].id=this.attrValueName.map(item5=>item5.id).join('_');
            dataSourceId[index]=this.attrValueName.map(item5=>item5.id).join('_');
            this.dataSource[index].oncallbackchirld = this.oncallbackchirld.bind(this);
            this.dataSource[index].pics = this.initialChildren[index]?this.initialChildren[index]:[];
            this.props.postCacheTable({
              content:JSON.stringify([{
                key:this.dataSource[index].id,
                value:[...this.dataSource[index].pics]
              }])
            });
        }else{}
      });
      this.setState({dataSourceId:dataSourceId});
      this.props.setImgCacheTableKeys(dataSourceId)
      /*
       * 初始化Table列数dataColumns
       * */
      this.makeInitialColumns(this.columnsKeys.length);
      this.columnsKeys.length>0&&this.columnsKeys.map((item3,index3) => {
        this.dataColumns[index3].key = item3;
        this.dataColumns[index3].dataIndex = item3;
        this.dataColumns[index3].render = text =>(
          <div>{text instanceof Array?text.map(item4=><p className={styles.pad_top_bot}>{item4}</p>):text} </div>
        )
      });
      this.dataColumns.push({
        key: 'action',
        render: (text, record) => (
          <GoodsPicSingle oncallbackchirld={record.oncallbackchirld} record={record} num={1} postCacheTable={this.props.postCacheTable} redioValue={this.state.value}></GoodsPicSingle>
        )
      })
    }
  }
  /*
   * 初始化SKU数据的总长度
   * */
  makeInitialArr(){
    this.initialArr = [];
    let lenArr = this.staticSource.length;
    for(let i = 0;i < lenArr;i++){
      this.initialArr.push([])
    }
  }

  /*
   * 初始化table表格数据源的长度
   * */
  makeInitialSourceData(len){
    this.dataSource = [];
    for(let i = 0;i < len;i++){
      this.dataSource.push({})
    }
  }
  /*
   * 初始化table表格列的个数
   * */
  makeInitialColumns(len){
    this.dataColumns  = [];
    for(let i = 0;i < len;i++){
      this.dataColumns.push({})
    }
  }
  /*
   * 初始化每行传到后台attributes的长度
   * */
  makeInitialAttr(){
    this.attributes = [];
    let lenArr = this.dataSource.length;
    for(let i = 0;i < lenArr;i++){
      this.attributes.push([])
    }
  }
  /*
   * SKU图片那一列的imageurl和alt
   * */
  makeInitialSetPics(len){
    this.setPics = [];
    for(let i = 0;i < len;i++){
      this.setPics.push([])
    }
  }
  /*
   * 通过attrValueId查到SkuValueName
   * */
  getSkuValueName(code){
    this.saleData.map((item,index) => {
      item.platformCategoryAttributeValues.map((item1,index1) => {
        const attrValueName={};
        if(item1.attrValueId == code ){
          attrValueName.id=item1.attrId+":"+item1.attrValueId;
          attrValueName.name=item1.attrValueName;
          this.attrValueName.push(attrValueName)
        }
      })
    })
  }
  /*
   * 通过attrId查到SkuAttrName
   * */
  getSkuAttrName(code){
    this.saleData.map((item,index) => {
      if(item.attrId == code ){
        this.attrKeys.push(item.attrName)
      }
    })
  }
  /*
   * 通过SkuAttrName查到attrId
   * */
  getSkuAttrId(name){
    this.saleData.map((item,index) => {
      if(item.attrName == name ){
        this.attrId = item.attrId;
      }
    })
  }
  /*
   * 通过SkuValueName查到attrValueId
   * */
  getSkuAttrValueId(valueName){
    this.saleData.map((item,index) => {
      item.platformCategoryAttributeValues.map((item1,index1) => {
        if(item1.attrValueName == valueName ){
          this.attrValueId = item1.attrValueId
        }
      })
    })
  }
  /**
   *
   * 通过SkuValueName返回缓存ID
   * @memberof GoodsPicWrapper
   */
  getCatchId(valueParentName,valueName){
    let valueId=null;
    this.saleData.map((item,index) => {
      item.platformCategoryAttributeValues.map((item1,index1) => {
        if(item1.attrValueName == valueName&&item.attrName == valueParentName){
          valueId = item1.attrId+":"+item1.attrValueId
        }
      })
    })
    return valueId;
  }
  //存储DataSourceId
  setDataSourceId=()=>{
    let dataSourceId=[];
    this.itemSkuVoList.map((item,index) => {
      var attrValueName = [];
      if(item.attributes){
          let firstattr = item.attributes.split(';');
          firstattr = _.compact(firstattr);
          firstattr&&firstattr.map((item1,index1) => {
            let secondarr = item1.split(':');
            this.saleData.map((item2,inde2) => {
              item2.platformCategoryAttributeValues.map((item3,index3) => {
                let attr={};
                if(item3.attrValueId == secondarr[1] ){
                  attr.id=item3.attrId+":"+item3.attrValueId;
                  attr.name=item3.attrValueName;
                  attrValueName.push(attr)
                }
              })
            })
          })
          dataSourceId[index]=attrValueName.map(item5=>item5.id).join('_');
      }else{}
  });
  return dataSourceId;
};
  //组装数据源
   initSourceData=()=>{
    let dataSourceId=[];
    this.makeInitialSourceData(this.itemSkuVoList.length);
    this.itemSkuVoList.map((item,index) => {
      this.attrValueName = [];
      this.attrKeys = [];
      if(item.attributes){
          let firstattr = item.attributes.split(';');
          firstattr = _.compact(firstattr);
          firstattr&&firstattr.map((item1,index1) => {
            let secondarr = item1.split(':');
            this.getSkuValueName(secondarr[1]);
            this.getSkuAttrName(secondarr[0])
          })
          this.columnsKeys = this.attrKeys;
          this.changeColumnsKeys = JSON.parse(JSON.stringify(this.columnsKeys));
         //this.initialArr[index]&&this.initialArr[index].length>1&&this.initialArr[index].shift();
          //构造Table中的行dataSource
          this.dataSource[index].key = index+1;
          this.attrValueName.map((item2,index2) => {
            this.dataSource[index][this.attrKeys[index2]]= item2.name;
          });
          this.dataSource[index].id=this.attrValueName.map(item5=>item5.id).join('_');
          dataSourceId[index]=this.attrValueName.map(item5=>item5.id).join('_');
          this.dataSource[index].pics = this.initialArr[index];
          this.dataSource[index].oncallbackchirld = this.oncallbackchirld.bind(this);
      }else{}
    });
    this.setState({dataSourceId:dataSourceId});
    this.props.setImgCacheTableKeys(dataSourceId);
      //构造Table中的列dataColumns
      this.makeInitialColumns(this.columnsKeys.length);
      this.columnsKeys.length>0&&this.columnsKeys.map((item3,index3) => {
        this.dataColumns[index3].key = item3+1;
        this.dataColumns[index3].dataIndex = item3;
        this.dataColumns[index3].render = text =>(
          <div>{text instanceof Array?text.map(item4=><p className={styles.pad_top_bot}>{item4}</p>):text} </div>
        )
      });
      //图片插件所在列
      this.dataColumns.push({
        key: 'action',
        render: (text, record) => (
          <GoodsPicSingle oncallbackchirld={record.oncallbackchirld} record={record} num={1} postCacheTable={this.props.postCacheTable} redioValue={this.state.value}></GoodsPicSingle>
        )
      })
      this.staticSource = JSON.parse(JSON.stringify(this.dataSource));
      this.setState({
        key: Math.random(),
        loading:false
      });
  }
  //得到SKU信息
  getSkuPicture = () =>{
    console.log("进入getSkuPicture：");
    this.setState({
      loading:true
    });
    if(this.itemSkuVoList !==null&&this.itemSkuVoList.length > 0){
      if(this.setDataSourceId().length>0){
        console.log("进入getSkuPicture：",this.setDataSourceId());
        this.props.getCacheTable({keys:JSON.stringify(this.setDataSourceId())}).then((result)=>{
          if(+result.code===0){
            let  initialArr=[];
            result.data.length>0&&result.data.forEach(item=>{
              if(item==""){
                initialArr.push([]);
              }
              else{
                initialArr.push(JSON.parse(item))
              }
            })
            this.initialArr=initialArr;
            this.initSourceData();
          }
          else{
            this.initSourceData();
          }
        }).catch(error=>{
          this.initSourceData();
        });
      }
      else{
        this.initSourceData();
      }
    }
  }
  /*
   * 改变table中属性的位置
   * */
  onChangePosition = (num) =>{
    let cutCol = this.dataColumns.splice(num,1);
    this.dataColumns.unshift(cutCol[0]);
    let cutKeys = this.changeColumnsKeys.splice(num,1);
    this.changeColumnsKeys.unshift(cutKeys[0])
  }
  /*
   * 不同Tab插入的内容不同
   * */
  handlefilter = (numIndex) =>{
    //清空所有图片
    // this.makeInitialArr()
    this.targetNum = this.columnsKeys[numIndex];
    if(this.staticSource !==null&&this.staticSource.length > 0){
      let volAttr = [];
      let exceptVol = this.columnsKeys.filter(value =>value !== this.columnsKeys[numIndex]);

      //除选中的属性外其他的属性
      let someVolAttr = [];
      for(let i=0;i<exceptVol.length;i++){
        someVolAttr.push([])
      }
      this.staticSource.map((item,index) => {
        volAttr.push(item[this.columnsKeys[numIndex]]);
      });
      let volArr  = [...new Set(volAttr)];  //数组去重
      volAttr = [];
      this.makeInitialSourceData(volArr.length);
      this.makeInitialSetPics(volArr.length);
      volArr.map((item2,index2) => {
        this.staticSource.map((item,index) => {
          if(item[this.columnsKeys[numIndex]] === item2&&exceptVol !==[] &&exceptVol.length>0){
            exceptVol.map((item3,index3) => {
              someVolAttr[index3].push(item[item3])
            })
            this.setPics[index2].push(index);
          }
        });
        this.setPics[index2].map((item5,index5) => {
          this.actionPic = this.actionPic.concat(this.initialArr[item5])
        })
        this.actionPic = [...new Set(this.actionPic)]
        /*
         * 重新构造Table中的数据源dataSource
         * */
        this.dataSource[index2].key = index2+1;
        someVolAttr.map((item4,index4) => {
          item4 = [...new Set(item4)];
          this.dataSource[index2][exceptVol[index4]] = item4;
        });
        this.dataSource[index2].id=this.getCatchId(this.targetNum,item2);
        this.dataSource[index2][this.columnsKeys[numIndex]] = item2;
        this.dataSource[index2].oncallbackchirld = this.oncallbackchirld.bind(this);
        this.dataSource[index2].pics = '';
        //每次清空传给每行图片的数据
        this.actionPic = [];
        // JSON.parse(JSON.stringify(this.actionPic))
      });
    }
    this.setState({
      key: Math.random()
    });
  }
  /*
   * 不同的Tab上传有不同的形式
   * */
  handleUpload = (attr,record,picChirldDate,status,cancelItem,repeatItem) =>{
    //判断存储的ID字符串中是否含有返回的record中的ID值
    if(this.props.goodsRlease.singleImgKeys.length>0){
      this.props.goodsRlease.singleImgKeys.forEach((item)=>{
        if(item.indexOf(record.id)>=0){
            //将返回的图片赋值给存储的ID缓存起来
            this.props.postCacheTable({
              content:JSON.stringify([{
                key:item,
                value:[...picChirldDate]
              }])
            });
        }
      });
    }
    this.staticSource.map((item,index) => {
      if(item[attr] == record[attr]){
        switch(status){
            case 1:this.initialArr[index] = [picChirldDate[picChirldDate.length-1]];
                   break;
            case 2:this.initialArr[index].map((item2,index2) => {
                          cancelItem.url == item2.url&&this.initialArr[index].splice(index2,1,repeatItem);
                   })
                   break;
            case 3:this.initialArr[index].map((item2,index2) => {
                          cancelItem.url == item2.url&&this.initialArr[index].splice(index2,1);
                   })
                   break;
            case 4:this.initialArr[index].map((item2,index2) => {
                          cancelItem.url == item2.url&&this.initialArr[index].splice(index2,1,cancelItem);
                   })
                   break;
        }
      }else{}
    })
  }
  /*
   * Tab再次属性分组
   * */
  handleGrouping = (attr,record,picChirldDate) =>{
      this.getSkuAttrId(attr);
      this.makeInitialAttr();
      this.itemSkuVoList.map((item3,index3) => {
        if(item3.attributes){
            let firstattr = item3.attributes.split(';');
            firstattr = _.compact(firstattr);
            firstattr.map((item4,index4) => {
              let secondattr = item4.split(':');
              if(this.attrId == secondattr[0]) {
                let corAttr = [];
                this.dataSource.map((item,index) => {
                  this.getSkuAttrValueId(item[attr])
                  corAttr.push(this.attrValueId);
                });
                let corArr  = [...new Set(corAttr)];  //数组去重
                corArr.map((item2,index2) => {
                  if (secondattr[1] == item2) {
                    this.attributes[index2].push(item3.attributes)
                  }else{}
                })
              }else{}
            })
        }else{}
      })
  }
  /*
   * 传输重新分组后的属性内容
   * */
  handleTrans = (attr,record,picChirldDate) => {
     if(this.initialArr !== [] && this.initialArr.length >0){
        this.initialArr.map((item1,index1) => {
          if(item1 !== []&&item1.length>0){
            item1.map((item2,index2) => {
              let attrSelect = this.attributes.filter(item=>item.includes(this.itemSkuVoList[index1].attributes))
              item2.url?this.picAllDate.itemSkuPictureVoList.push({
                  'pictureUrl':item2.url,
                  'sortNumber':index2+1,
                  'altImages':item2.alt,
                  'attributes':attrSelect[0]
                }):null
            })
          }else{}
        })
      }else{}
  }
  /*
   *分组后过滤相同的图片
   * */
  handleFilterPic = () =>{
      let arr = this.picAllDate.itemSkuPictureVoList;
      let datas = [];
      let resultValue = [];
      for(let i = 0; i < arr.length; i ++){
        let off = true;
        for(let j = 0; j < datas.length; j ++){
          if(arr[i].pictureUrl === datas[j][0].pictureUrl&&arr[i].attributes == datas[j][0].attributes){
            off = false;
            break;
          }
        }
        if(!off){
          continue;
        }
        let data = arr.filter((item, index, arr) => item.pictureUrl === arr[i].pictureUrl&&item.attributes == arr[i].attributes);
        datas.push(data);
      }
      datas.map(item=>{
        resultValue.push(item[0]);
      })
      this.itemPulishVO.itemSkuPictureVoList = resultValue;
      this.props.uploadPrams(this.itemPulishVO);
  }
  /*
   * Tab单选改变触发
   * */
  onChange(e) {
    //this.random = Math.random();
    this.setState({
      key: Math.random()
    });
    this.setState({
      value: e.target.value,
    });

    //交换位置
    this.changeColumnsKeys.map((item,index) => {
      if(e.target.value == item){
        this.onChangePosition(index)
      }
    });
    /*
     * 按四种不同属性上传的情况
     * */
    if(e.target.value === this.columnsKeys[0]){
      this.handlefilter(0)
    }else if(e.target.value === this.columnsKeys[1]){
      this.handlefilter(1)
    }else if(e.target.value === this.columnsKeys[2]){
      this.handlefilter(2)
    }else if(e.target.value === 0){
      this.setState({
        loading:true
      });
      this.targetNum = 0;
      this.dataSource = [];
      this.getSkuPicture();
    }
  }
  /*
   * sku图片为空的话将spu图片给它
   * */
  sku_to_spu = () =>{
      this.picAllDate.itemSkuPictureVoList = [];

      if(this.initialArr !== [] && this.initialArr.length >0){
        this.initialArr.map((item1,index1) => {
          if(item1 !== []&&item1.length>0){
            item1.map((item2,index2) => {
              item2.url?this.picAllDate.itemSkuPictureVoList.push({
                  'pictureUrl':item2.url,
                  'sortNumber':item1[0].url?(index2+1):index2,
                  'altImages':item2.alt,
                  'attributes':[this.itemSkuVoList[index1].attributes]
                }):null
            })
          }else{
                this.picAllDate.itemPictureVoList.length>0&&this.picAllDate.itemSkuPictureVoList.push({
                  'pictureUrl':this.picAllDate.itemPictureVoList[0].pictureUrl,
                  'sortNumber':1,
                  'altImages':'',
                  'attributes':[this.itemSkuVoList[index1].attributes]
                })
          }
        })
      }else{}
  }
  /*
   * 子组件将上传的商品图片的数据传回来的回调
   * */
  oncallbackparent(picParentDate){
    this.picAllDate.itemPictureVoList = [];
    if(picParentDate !==null&&picParentDate.length >0){
      picParentDate.map((item,index) => {
        this.picAllDate.itemPictureVoList.push({
          "pictureUrl":item.url,
          "sortNumber":index+1,
          "altImages":item.alt
        })
      })
    }

    //更新redux中的商品图片的数据
    this.itemPulishVO.itemPictureVoList = this.picAllDate.itemPictureVoList;
    this.props.uploadPrams(this.itemPulishVO);

    this.sku_to_spu();
    this.handleFilterPic();
  }
  /*
   * 子组件将上传的SKU图片的数据传回来的回调
   * */
  oncallbackchirld(picChirldDate,record,status,cancelItem,repeatItem){
    this.picAllDate.itemSkuPictureVoList = [];

    //不同Tab状态传给后台的数据不同
    if(this.targetNum == 0){
      //更新initialArr的数据
      this.initialArr.splice(record.key-1,1,picChirldDate);
      if(this.initialArr !== [] && this.initialArr.length >0){
        this.initialArr.map((item1,index1) => {
          if(item1 !== []&&item1.length>0){
            item1.map((item2,index2) => {
              item2.url?this.picAllDate.itemSkuPictureVoList.push({
                  'pictureUrl':item2.url,
                  'sortNumber':item1[0].url?(index2+1):index2,
                  'altImages':item2.alt,
                  'attributes':[this.itemSkuVoList[index1].attributes]
                }):null
            })
          }else{
                this.picAllDate.itemPictureVoList.length>0&&this.picAllDate.itemSkuPictureVoList.push({
                  'pictureUrl':this.picAllDate.itemPictureVoList[0].pictureUrl,
                  'sortNumber':1,
                  'altImages':'',
                  'attributes':[this.itemSkuVoList[index1].attributes]
                })
          }
        })
      }else{}
      this.getSkuPicture();
    }else if(this.targetNum == this.columnsKeys[0]){

      //重新分组属性
      this.handleGrouping(this.columnsKeys[0],record,picChirldDate)

      //改变initialArr
      this.handleUpload(this.columnsKeys[0],record,picChirldDate,status,cancelItem,repeatItem);

      //传输分组后内容
      this.handleTrans(this.columnsKeys[0],record,picChirldDate)
    }else if(this.targetNum == this.columnsKeys[1]){

      //重新分组属性
      this.handleGrouping(this.columnsKeys[1],record,picChirldDate);

      //改变initialArr
      this.handleUpload(this.columnsKeys[1],record,picChirldDate,status,cancelItem,repeatItem);

      //传输分组后将内容
      this.handleTrans(this.columnsKeys[1],record,picChirldDate);
    }else if(this.targetNum == this.columnsKeys[2]){

      //重新分组属性
      this.handleGrouping(this.columnsKeys[2],record,picChirldDate);

      //改变initialArr
      this.handleUpload(this.columnsKeys[2],record,picChirldDate,status,cancelItem,repeatItem);

      //传输分组后将内容
      this.handleTrans(this.columnsKeys[2],record,picChirldDate);
    }
    this.handleFilterPic();
  }
  /*
   *从redux中得到初始数据
   * */
  handleInit(){
    this.itemPulishVO = this.props.goodsRlease.itemPulishVO?JSON.parse(JSON.stringify(this.props.goodsRlease.itemPulishVO)):[];
    this.itemSkuVoList = this.itemPulishVO.itemSkuVoList?JSON.parse(JSON.stringify(this.itemPulishVO.itemSkuVoList)):[];
    this.saleData = this.props.goodsRlease.saleData?JSON.parse(JSON.stringify(this.props.goodsRlease.saleData)):[];
    this.picAllDate.itemSkuPictureVoList = this.itemPulishVO?JSON.parse(JSON.stringify(this.itemPulishVO.itemSkuPictureVoList)):[];
    this.picAllDate.itemPictureVoList = this.itemPulishVO?JSON.parse(JSON.stringify(this.itemPulishVO.itemPictureVoList)):[];
    this.makeInitialSourceData(this.itemSkuVoList.length)
  }
   /*
   *从redux中回显的初始数据
   * */
  handleInitEdit(nextProps){
    this.itemPulishVO = nextProps.goodsRlease.itemPulishVO?JSON.parse(JSON.stringify(nextProps.goodsRlease.itemPulishVO)):[];
    this.itemSkuVoList = this.itemPulishVO.itemSkuVoList?JSON.parse(JSON.stringify(this.itemPulishVO.itemSkuVoList)):[];
    this.saleData = nextProps.goodsRlease.saleData?JSON.parse(JSON.stringify(nextProps.goodsRlease.saleData)):[];
    this.picAllDate.itemSkuPictureVoList = this.itemPulishVO?JSON.parse(JSON.stringify(this.itemPulishVO.itemSkuPictureVoList)):[];
    this.picAllDate.itemPictureVoList = this.itemPulishVO?JSON.parse(JSON.stringify(this.itemPulishVO.itemPictureVoList)):[];
    this.makeInitialSourceData(this.itemSkuVoList.length)
  }
  /**
   * 获取缓存信息
   * @param key 存储缓存的key
   * @param callback 回调函数
   * @param errorCallback 失败回调函数
   * @memberof getCatchInfo
   */
  getCatchInfo(key,callback,errorCallback){
    //获取缓存的图片信息
    this.props.getCacheTable({keys:JSON.stringify([key])}).then((result)=>{
      if(+result.code==0){
        callback(result.data&&JSON.parse(result.data[0]))
      }
      else{
        console.log("没有获取到",key,"缓存信息");
        errorCallback();
      }
    }).catch((error)=>{
        console.error("获取缓存信息失败");
        errorCallback();
    })
  }
  render() {
    console.log('this.props.goodsRlease.singleImgKeys：',this.props.goodsRlease.singleImgKeys);
    this.props.goodsRlease.itemPulishVO.itemSkuVoList.length > 0 && !this.props.goodsRlease.itemPulishVO.itemSkuVoList[0].attributes && (this.dataSource = [])
    return (
      <div className={`${styles.container} ${styleless.content}`} style = {{overflow: 'hidden'}}>
        <div className={styles.breadcrumb}>
          <span className={styles.required}>*</span>
          <span className={styles.picturesku}>商品图片</span>
          <span className={styles.gray}>(至少添加一张，最多允许十张；单张图片不能大于5M；允许的图片格式有jpg、jpeg、png、JPG、JPEG、PNG ; 图片最佳尺寸为800x800)</span>
        </div>
        <div className="ui-ct">
          <div className="ui-bd clearfix">
            <GoodsPic oncallbackparent={::this.oncallbackparent} initialParent={this.initialParent} num={10} postCacheTable={this.props.postCacheTable}></GoodsPic>
          </div>
        </div>
        {this.itemSkuVoList.length > 0 && this.itemSkuVoList[0].attributes&&
          <div>
            <div className={styles.breadcrumb+ " " +styles.space}>
                <span className={styles.picturesku}>SKU图片</span>
                <RadioGroup onChange={::this.onChange} value={this.state.value} defaultValue={0}>
                  <Radio value={0}>分别上传</Radio>
                  {this.columnsKeys.length >0&&this.columnsKeys.map( (item,index) =>{
                    return( <Radio value={item} key={index}>按商品{item}属性上传</Radio>)
                  })
                  }
                </RadioGroup>
               <span className={styles.tip}>(如按销售属性分组编辑，会覆盖对应SKU已编辑图片相关信息)</span>
            </div>
            <div className="ui-ct">
                <div className={`ui-bd clearfix ${styleless.nopadding}`}>
                  <Table
                  key={this.state.key}
                  dataSource={this.dataSource}
                  columns={this.dataColumns}
                  showHeader={false}
                  pagination={false}
                  className={styleless.skuTable}
                  loading={this.state.loading}
                  />
                </div>
            </div>
          </div>}
      </div>);
  }
}
