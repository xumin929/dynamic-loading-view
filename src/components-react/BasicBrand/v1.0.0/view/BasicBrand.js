/**
 * @file 发布商品-基础设置- 商品名称
 */

import React, {Component} from 'react';
import { Input,Select,message } from "jdcloudui";
Option = Select.Option;
import styles from "./style/basic.less";
import { getShopBrandData } from "./redux/queryData";
import brandData from "./redux/queryData";

class BasicBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brandArr: [],
            flag: false,
            ifBrandNameCh: true, //中文品牌名称符合校验规则
            ifBrandNameEn: true, //英文品牌名称符合校验规则
        };
        this.cid =  this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.cid;
    }
    componentDidMount(){
        if(this.cid){
            this.props.getShopBrandData({categoryId: this.cid},this.props.type);
        }
        // const params = this.props.itemTmplPublishVo;
        // if(!params.brandId && params.brandNameEn && params.brandNameCh){
        //     this.setState({
        //         flag:true,
        //         brandNameEn:params.brandNameEn,
        //         brandNameCh:params.brandNameCh
        //     })
        // }
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.itemTmplPublishVo.cid && nextProps.itemTmplPublishVo.cid !=this.cid){
            this.cid = nextProps.itemTmplPublishVo.cid;
            nextProps.getShopBrandData({categoryId: this.cid},nextProps.type)
        }

        if(nextProps.brandData && nextProps.brandData.data && nextProps.brandData.data.data){
            if(nextProps.brandData.data.data.length >0 ){
                this.setState({
                    brandArr: nextProps.brandData.data.data
                })
            }
        }

    }
    //保存用户操作数据
    handelChange = (e, key) => {
        const itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
        let value = e.target.value;
        if(key =="brandNameCh" ){
            let reg = /^[\u4e00-\u9fa5]+$/
            if(value && !reg.test(value[0])){
                this.setState({
                    ifBrandNameCh : false
                })
            } else {
                this.setState({
                    ifBrandNameCh : true
                })
                itemTmplPublishVo.brandNameCh = value;
            }
        }else if( key == "brandNameEn" ){
            let reg = /^[^\u4e00-\u9fa5]+$/;
            if(value && !reg.test(value)){
                this.setState({
                    ifBrandNameEn : false
                })
            } else {
                this.setState({
                    ifBrandNameEn : true
                })
                itemTmplPublishVo.brandNameEn = value;
            }
        }
        itemTmplPublishVo.brandId = -1;
        this.props.updateItemTmplAction(itemTmplPublishVo);
    };
    //用户操作更改数据
    handelSelectChange = (key, value) => {
        if(value == 'a999') {
            this.setState({
                flag: true
            })
        } else {
            this.setState({
                flag: false
            });
            const itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
            itemTmplPublishVo.brandId = value;
            this.props.updateItemTmplAction(itemTmplPublishVo);
        }
    };

    render() {
        let { flag, brandArr } = this.state;
        const params = this.props.itemTmplPublishVo;
        let setPlaceholder = {
            placeholder: '请选择',
            onChange: (value) => this.handelSelectChange('brandId', value)
        };
        if(params.brandId) {
            brandArr.length>0 && brandArr.map((result,index)=>{
                if(result.id == params.brandId ){
                    setPlaceholder.value = result.id;
                }
            })
        } else if(flag) {
            setPlaceholder.value = 'a999';
        } else {
            this.num ++;
        }

        return (
            <div className={styles.labelWrap}>
                <label htmlFor="品牌" className={styles.labelTitle}>品牌：</label>
                <div className={styles.labelCont}>
                    <Select className="" key={this.num} {...setPlaceholder} style={{width:'100%'}} >
                        {
                            brandArr.map((item, index) => <Option key={index} value={item.id}>{item.brandNameCh ? item.brandNameCh : item.brandNameEn}</Option>)
                        }
                        <Option key={'a999'} value='a999'>其他</Option>
                    </Select>
                    {
                        flag ?
                            <div style={{marginTop: "15px"}}>
                                <label>中文名称：</label>
                                <Input placeholder="输入品牌中文名称" size='large' onBlur={(e) => this.handelChange(e, 'brandNameCh')} style={{width: '120px', marginRight: '20px'}}/>
                                <label>英文名称：</label>
                                <Input placeholder="输入品牌英文名称" size='large' onBlur={(e) => this.handelChange(e, 'brandNameEn')} style={{width: '120px'}}/>
                            </div>
                            : null
                    }
                    {
                        flag && (!this.state.ifBrandNameCh || !this.state.ifBrandNameEn) ?
                            <div className={styles.brand}>
                                {!this.state.ifBrandNameCh?<span className={styles.brandcn} >请输入中文品牌,否则不会保存</span>:null}
                                {!this.state.ifBrandNameEn?<span className={styles.branden} >请输入英文品牌，否则不会保存</span>:null}
                            </div>
                            :null
                    }
                </div>
            </div>
        );
    }
}
export default BasicBrand;
