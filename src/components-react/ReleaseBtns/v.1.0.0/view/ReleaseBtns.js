/**
 * @file 发布商品-商品发布、保存、取消 按钮组件
 */
import React, { Component } from 'react';
import { Button,Layout,message,Modal } from 'jdcloudui';
const confirm = Modal.confirm;
import './style.css'
import { connect } from 'react-redux';
import inject from "../../../../redux/inject";
import querySaveItemRedux , { querySaveItem } from './redux/itemsave_redux';
import querySubmitItemRedux , { querySubmitItem } from './redux/itemsubmit_redux';
import addLibraryItemRedux , { addLibraryItem } from './redux/addlibrary_redux';
const {Footer} = Layout;

@inject({
  querySaveItemRedux,
  querySubmitItemRedux,
    addLibraryItemRedux
})
@connect(store => ({
  querySaveItemRedux: store.querySaveItemRedux,
  querySubmitItemRedux: store.querySubmitItemRedux,
  addLibraryItemRedux: store.addLibraryItemRedux
}), {
  querySaveItem,
  querySubmitItem,
  addLibraryItem
})

export default class ReleaseBtns extends Component {
  constructor(props){
    super(props);
    this.state = {
        submitting:false,//正在保存中状态
    }
  }

  //发布
  handleSubmit = ()=>{
    console.log('商品发布')
    let itemTmplPublishVo = this.props.itemTmplPublishVo;
    let itemTmplSkuVoList = itemTmplPublishVo.itemTmplSkuVoList;
    let isRule = true;
    if(!itemTmplPublishVo.itemName){
      message.error('请输入商品名称！')
      isRule = false;
      return;
    }
    if(!itemTmplPublishVo.cid){
      message.error('请选择平台分类！')
      isRule = false;
      return;
    }
    if(itemTmplPublishVo.cid == itemTmplPublishVo.secondCid){
      message.error('第二分类不能与平台分类相同！')
      isRule = false;
      return;
    }
    if(!itemTmplPublishVo.itemPicVoList || itemTmplPublishVo.itemPicVoList.length==0 || !itemTmplPublishVo.itemPicVoList[0].url ){
      message.error('请上传商品图片！')
      isRule = false;
      return;
    }
    if(this.props.calcRule){
      if(this.props.calcRule == 3){
        console.log('运费模板为按体积计算运费类型')
        let error = false;
        itemTmplSkuVoList.map((item,index)=>{
          if(item.skuStatus == 1){
            if(!item.length || !item.width || !item.height){
              error = true;
              return;
            }
          }
        })
        if(error){
          message.error('请完善商品的长、宽、高信息！');
          isRule = false;
          return;
        }
      } else if(this.props.calcRule == 1){
        console.log('运费模板为按重量计算运费类型')
        let error = false;
        itemTmplSkuVoList.map((item,index)=>{
          if(item.skuStatus == 1){
            if(!item.weight){
              error = true;
              return;
            }
          }
        })
        if(error){
          message.error('请完善商品的毛重信息！');
          isRule = false;
          return;
        }
      }
    }

    if(this.props.type == 2){
      console.log('校验供货信息内容')
      if(!itemTmplPublishVo.itemPerfectVo.placeDeliveryId){
        message.error('请选择发货地！');
        isRule = false;
        return;
      }
      if(!itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList || itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.length==0){
        message.error('请完善供货信息！');
        isRule = false;
        return;
      } else {
        if(itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.length == 1){
          if(itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList[0].supplyStatus == 0){
            console.log('只有一条sku，且已经置灰')
            message.error('至少供应一个sku！');
            isRule = false;
            return;
          }
        } else {
          let allDisable = true
          itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.map((item,index)=>{
            if(item.supplyStatus == 1){
              allDisable = false;
              return;
            }
          })
          if(allDisable){
            console.log('所有sku都已置灰')
            message.error('至少供应一个sku！');
            isRule = false;
            return;
          }
        }

        itemTmplPublishVo.itemTmplSkuVoList.map(statusItem=>{
          if(statusItem.attributes && statusItem.attributes.length >0){
            if(statusItem.skuStatus == 1){
              let statusItemArr = [];
              statusItem.attributes.map((aidItem,aidIndex)=>{
                statusItemArr.push(aidItem.aid,aidItem.vid)
              })
              itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.map(preSkuItem=>{
                let skuItemArr = [];
                preSkuItem.attributes.map((preaidItem,preaidIndex)=>{
                  skuItemArr.push(preaidItem.aid,preaidItem.vid)
                })
                console.log(JSON.stringify(statusItemArr),JSON.stringify(skuItemArr),JSON.stringify(statusItemArr) == JSON.stringify(skuItemArr))
                if(JSON.stringify(statusItemArr) == JSON.stringify(skuItemArr)){
                  if(preSkuItem.supplyStatus == 1){
                    if(!preSkuItem.inventory){
                      message.error('请完善常规备货信息！');
                      isRule = false;
                      return;
                    }
                    if(preSkuItem.areaPriceList.length == 0){
                      message.error('请完善供货价！');
                      isRule = false;
                      return;
                    } else {
                      preSkuItem.areaPriceList.map((_item,_index)=>{
                        if(_item.areaId == 0 ){
                          if(!_item.supplyPrice || _item.supplyPrice ==0){
                            message.error('请完善供货价！');
                            isRule = false;
                            return;
                          }
                        }
                      })
                    }
                  }
                }
              })
            }
          } else {
            itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.map((item,index)=>{
              if(item.supplyStatus == 1){
                if(!item.inventory){
                  message.error('请完善常规备货信息！');
                  isRule = false;
                  return;
                }
                if(item.areaPriceList.length == 0){
                  message.error('请完善供货价！');
                  isRule = false;
                  return;
                } else {
                  item.areaPriceList.map((_item,_index)=>{
                    if(_item.areaId == 0 ){
                      if(!_item.supplyPrice || _item.supplyPrice ==0){
                        message.error('请完善供货价！');
                        isRule = false;
                        return;
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }
    }

    if(this.props.type == 3){
      //校验运费模板
      if(itemTmplPublishVo.freightTmplVo && !itemTmplPublishVo.freightTmplVo.tmplId){
          message.error('请选择运费模板！');
          isRule = false;
          return;
      }
      //校验库存
      let noInventory = false;
      itemTmplPublishVo.itemPerfectVo.preSkuPriceVoList.map((item,index)=>{
        if(!item.inventory && item.inventory!=0){
          noInventory = true;
          isRule = false;
          return;
        }
      })
      if(noInventory){
        message.error('请完善常规备货信息！');
      }
    }

    if(this.props.type == 1 || this.props.type == 0){
      console.log('验证平台商品运营人员')
      if(!itemTmplPublishVo.operatorId){
        message.error('请选择运营人员！');
        isRule = false;
        return;
      }
    }

    if(isRule){
      console.log('符合校验，可以发布')
      this.setState({
        submitting:true
      })
      //处理数据
      let itemTmplSkuVoList = itemTmplPublishVo.itemTmplSkuVoList;
      itemTmplSkuVoList.map((item,index)=>{
        let extendSkuFields = [];
        for(let label in item){
          if(label.indexOf('extendSkuFields_')!=-1){
            extendSkuFields.push(item[label]);
            delete item[label];
          }
        }
        item.extendSkuFields = extendSkuFields;
      })
      let itemPicpdfVoList = itemTmplPublishVo.itemPicpdfVoList;
      itemPicpdfVoList.map((item,index)=>{
        delete item.uid;
      })
      if(!this.props.hasChannel){
        console.log('未加载渠道组件，初始化数据')
        itemTmplPublishVo.channelArr = [1,2,3,4,5,6]
      }
      //处理图片数据
      let itemSkuPicVoList = itemTmplPublishVo.itemSkuPicVoList;
      let picUrl = itemTmplPublishVo.itemPicVoList[0].url;
      if(itemSkuPicVoList && itemSkuPicVoList.length>0){
        itemSkuPicVoList.map((item,index)=>{
          if(!item.url){
            item.url = picUrl
          }
        })
      }
      console.log('------------拼接后的数据')
      console.log(itemTmplPublishVo);
      this.props.querySubmitItem({itemTmplPublishVo:JSON.stringify(itemTmplPublishVo)},this.props.type,this.props.edit).then((res)=>{
        if(res.code == 0){
          console.log('商品发布成功，跳转到商品列表页面')
          let url = ''
          if(this.props.type == 1){
            url = '/operating-item-view/item-base';
              if(this.props.edit && !this.props.ifSave){
                  window.location.href = url;
              }else{
                  this.showConfirm(itemTmplPublishVo, url);
              }
          } else if(this.props.type == 2){
            url = '/item-shop-view/iteminfo';
            window.location.href = url;
          } else if(this.props.type == 3){
            url = '/item-shop-view/productsmanage';
            window.location.href = url;
          } else if(this.props.type == 0){
            url = '/operating-item-view/supply-audit';
            window.location.href = url;
          }
        } else {
          if(res.msg){
            message.error(res.msg,2)
          } else {
            message.error('商品发布失败',2)
          }
          if(itemTmplPublishVo.itemPicpdfVoList){
            itemTmplPublishVo.itemPicpdfVoList.map((item,index)=>{
            item.uid = index
            })
          }
          console.log(itemTmplPublishVo)
          this.props.updateItemTmplAction(itemTmplPublishVo)
        }
        this.setState({
          submitting:false
        })
      })
    }
  }

  //保存
  handleSave = ()=>{
    console.log('商品保存');
    let itemTmplPublishVo = this.props.itemTmplPublishVo;
    let itemTmplSkuVoList = itemTmplPublishVo.itemTmplSkuVoList;
    let isRule = true;
    if(!itemTmplPublishVo.itemName){
      message.error('请输入商品名称！')
      isRule = false;
      return;
    }
    if(!itemTmplPublishVo.cid){
      message.error('请选择平台分类！')
      isRule = false;
      return;
    }
    if(!itemTmplPublishVo.itemPicVoList || itemTmplPublishVo.itemPicVoList.length==0 || !itemTmplPublishVo.itemPicVoList[0].url ){
      message.error('请上传商品图片！')
      isRule = false;
      return;
    }
    if(isRule){
      this.setState({
        submitting:true
      })
      //处理数据
      let itemTmplSkuVoList = itemTmplPublishVo.itemTmplSkuVoList;
      itemTmplSkuVoList.map((item,index)=>{
        let extendSkuFields = [];
        for(let label in item){
          if(label.indexOf('extendSkuFields_')!=-1){
            extendSkuFields.push(item[label]);
            delete item[label];
          }
        }
        item.extendSkuFields = extendSkuFields;
      })
      let itemPicpdfVoList = itemTmplPublishVo.itemPicpdfVoList;
      itemPicpdfVoList.map((item,index)=>{
        delete item.uid;
      })
      //处理图片数据
      let itemSkuPicVoList = itemTmplPublishVo.itemSkuPicVoList;
      let picUrl = itemTmplPublishVo.itemPicVoList[0].url;
      if(itemSkuPicVoList && itemSkuPicVoList.length>0){
        itemSkuPicVoList.map((item,index)=>{
          if(!item.url){
            item.url = picUrl
          }
        })
      }
    }
    console.log('------------拼接后的数据')
    console.log(itemTmplPublishVo)

    this.props.querySaveItem({itemTmplPublishVo:JSON.stringify(itemTmplPublishVo)},this.props.type,this.props.edit).then((res)=>{
      if(res.code == 0){
        console.log('商品保存成功，跳转到商品列表页面')
        let url = ''
        if(this.props.type == 1){
          url = '/operating-item-view/item-base';
        } else if(this.props.type == 2){
          url = '/item-shop-view/iteminfo';
        } else if(this.props.type == 3){
          url = '/item-shop-view/productsmanage';
        } else if(this.props.type == 0){
          url = '/operating-item-view/supply-audit';
        }
        window.location.href = url;
      } else {
        if(res.msg){
          message.error(res.msg,2)
        } else {
          message.error('商品保存失败',2)
        }
      }
      this.setState({
        submitting:false
      })
    });
  }

  //取消
  handleCancel = ()=>{
    console.log('取消发布，跳转到商品列表页')
    let url = ''
    if(this.props.type == 1){
      url = '/operating-item-view/item-base';
    } else if(this.props.type == 2){
      url = '/item-shop-view/iteminfo';
    } else if(this.props.type == 3){
      url = '/item-shop-view/productsmanage';
    } else if(this.props.type == 0){
      url = '/operating-item-view/supply-audit';
    }
    window.location.href = url;
  }

  showConfirm = (itemTmplPublishVo, url)=> {
      let addLibraryItem = this.props.addLibraryItem.bind(this);
      confirm({
          title: '',
          content: '确定同步该商品到标准库吗？',
          onOk() {
              console.log('OK');
              addLibraryItem({itemTmplPublishVo: JSON.stringify(itemTmplPublishVo)}).then((res) => {
                  message.success('同步到标准库成功！');
                  window.location.href = url;
              });

          },
          onCancel() {
              console.log('Cancel');
              window.location.href = url;
          },
      });
  }

  render() {
    return (
      <div className='footer'>
        <div className="footer-btns">
            <Button type="primary" size='large' onClick={this.handleSubmit} loading={this.state.submitting} className="mr10"
                >发布</Button>
            {this.props.ifSave && this.props.type!=2?
            <Button type="primary" size='large' onClick={this.handleSave} loading={this.state.submitting} className="mr10"
                >保存</Button>
            :null}
            <Button size='large' onClick={this.handleCancel}
                >取消</Button>
        </div>
      </div>
    );
  }
}
