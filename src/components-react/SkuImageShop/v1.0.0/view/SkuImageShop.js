/**
 * @file 发布商品-商品图片
 */

import React, {Component} from 'react';
import { Radio, Table,message } from 'jdcloudui';
import UploadImg from '../../../GoodImageShop/v1.0.0/view/UploadImg/UploadImg';
import './style/skuImage.css';
const RadioGroup = Radio.Group;

class SkuImageShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioValue: 0
        };
        //用来判断用户是否已经按照商品属性编辑过
        this.flag = false;
        //用来判断用户所上传的规格参数
        this.isEdit = [];
    }

    //sku表格的columns
    handleColumns = () => {
        return [{
            title: '规格1',
            dataIndex: 'aName1',
            key: 'attrName1',
            render: (value, row) => (<div>{value ? value.map((item, index) => <p className="attr-name-p" key={index}>{item.vName}</p>) : null}</div>)
        }, {
            title: '规格2',
            dataIndex: 'aName2',
            key: 'attrName2',
            render: (value, row) => (<div>{value ? value.map((item, index) => <p className="attr-name-p" key={index}>{item.vName}</p>) : null}</div>)
        }, {
            title: '规格3',
            dataIndex: 'aName3',
            key: 'attrName3',
            render: (value, row) => (<div>{value ? value.map((item, index) => <p className="attr-name-p" key={index}>{item.vName}</p>) : null}</div>)
        }, {
            title: '上传文件',
            key: 'active',
            render: (text, row, index) => {
                let skuImgInfos =[];
                if(row.url){
                    skuImgInfos =[
                        {
                            url:row.url,
                            alt:row.alt
                        }
                    ];}
                return(
                    <UploadImg
                        onCallBackData = {(e)=>this.onCallBackData(e,index,row)}
                        itemImgInfos = { skuImgInfos }
                        num={1}
                    />
                    )
            }
        }]
    };
    //图片上传后返回的数据
    onCallBackData (item,index,row){
        console.log("deceswd-----------",item);
        if(this.state.radioValue == 0) {
            this.itemImgInfos[index].url = item.length>0 ? item[0].url:"";
            this.itemImgInfos[index].alt = item.length>0 ? item[0].alt:"";
        } else {
            this.flag = true;
            this.itemImgInfos.map((_item, i) => {
                let saleAttributes = _item.attributes;
                saleAttributes.map(k => {
                    if(k.aid == row.aid && k.vid == row.vid) {
                        this.isEdit.push({aid: row.aid, vid: row.vid});
                        this.itemImgInfos[i].url = item.length>0 ? item[0].url:"";
                        this.itemImgInfos[i].alt = item.length>0 ? item[0].alt:"";
                    }
                });
            });
        }
        this.props.itemTmplPublishVo.itemSkuPicVoList = this.itemImgInfos;
        this.props.updateItemTmplAction(this.props.itemTmplPublishVo);

    }

    //选项卡change
    handleOnChange = (e) => {
        this.flag = false;
        this.isEdit = [];
        this.setState({
            radioValue: e.target.value
        })
    };


    //初始化radio数据
    handleGetSaleAttributes = data => {
        return data.map(item => {
            return {
                aName: item.aName,
                aid: item.aid
            }
        });
    };


    //初始化数据
    init = (data, radio) => {
        if(radio == 0) {
            return data.map(item => {
                let params = {
                    url: item.url,
                    alt: item.alt
                };
                item.attributes && item.attributes.length >0 && item.attributes.map((result, index) => {
                    params[`aName${index + 1}`] = [result];
                });
                return params;
            })
        }else{
            let dataArr = [], cName = { aName: [] }, bName = { aName: [] };
            let index = 0;
            data.map(item => {
                 item.attributes && item.attributes.length >0  && item.attributes.map((result) => {
                    if(result.aid == radio) {
                        let flag = false;
                        dataArr.map(m => {
                            if(result.vid == m.vid) {
                                flag = true;
                            }
                        });
                        if(!flag) {
                            dataArr[index] = {
                                aid: result.aid,
                                vid: result.vid,
                                aName1: [result],
                            };
                            let Aot = false;
                            this.isEdit.map(_item => {
                                if(_item.aid == result.aid && _item.vid == result.vid) {
                                    Aot = true;
                                }
                            });
                            if(Aot) {
                                dataArr[index].url = this.flag ? item.url : null
                                dataArr[index].alt = this.flag ? item.alt : null
                            }
                            index ++;
                        }
                    } else {
                        if(!cName.aid || cName.aid == result.aid) {
                            let flag = false;
                            cName.aid = result.aid;
                            cName.aName.map(m => {
                                if(result.vid == m.vid) {
                                    flag = true;
                                }
                            });
                            if(!flag) {
                                cName.aName.push(result);
                            }
                        } else {
                            let flag = false;
                            bName.aid = result.aid;
                            bName.aName.map(m => {
                                if(result.vid == m.vid) {
                                    flag = true;
                                }
                            });
                            if(!flag) {
                                bName.aName.push(result);
                            }
                        }
                    }
                });
            });
            dataArr.map((item, index) => {
                dataArr[index].aName2 = cName.aName;
                dataArr[index].aName3 = bName.aName;
            });
            return dataArr;
        }
    };


    render() {
        this.itemImgInfos = this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.itemSkuPicVoList ? this.props.itemTmplPublishVo.itemSkuPicVoList : [];
        let saleAttributes = this.itemImgInfos.length > 0 ? this.itemImgInfos[0].attributes : '';
        let attributes = saleAttributes && this.handleGetSaleAttributes(saleAttributes);
        let data = this.itemImgInfos.length > 0 ? this.init(this.itemImgInfos, this.state.radioValue)  : [];
        let flag = this.itemImgInfos[0] && this.itemImgInfos[0].attributes && this.itemImgInfos[0].attributes.length > 0 ? 1 : 0;
        return (
            <div>
                {
                    this.itemImgInfos.length > 0 && flag ? (
                        <div>
                            <div className="skuSelect">
                                <span className="mr20 f-fs14">
                                  SKU图片
                                </span>
                                <span>
                                  <RadioGroup defaultValue="0" onChange={this.handleOnChange}>
                                    <Radio value="0">分别上传</Radio>
                                      {attributes && attributes.map((item, index) => <Radio key={index} value={item.aid}>{`按商品${item.aName}属性上传`}</Radio>)}
                                  </RadioGroup>
                                </span>
                                <span className="text-red">(如按销售属性分组编辑，会覆盖对应SKU已编辑图片相关信息)</span>
                            </div>

                            <Table
                                showHeader={false}
                                columns={this.handleColumns()}
                                dataSource={data}
                                className="tableBorder"
                                pagination ={false}
                            />
                        </div>
                    ) : null
                }
            </div>
        );
    }
}
export default SkuImageShop;
