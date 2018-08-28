/**
 * @author chenyanhua
 * @date 2018-08-06
 * @file 发布商品-广告词
 * 包含字体颜色和链接
 * 链接做校验
 */
import React, { Component } from 'react';
import { Checkbox, Row, Col } from 'jdcloudui';
import { Input, Button } from 'jdcloudui';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import styles from "./style/index.less";

const CheckboxGroup = Checkbox.Group;
export default class ReleaseAdvertisingWord extends Component {
    constructor(props) {
        super(props);
        const ad = this.getAdDataSource(props);
        this.state = {
            ...ad,
            validAdUrl: true // 广告词链接是否有效
        };
    }
    componentWillReceiveProps(nextProps) {
        const ad = this.getAdDataSource(nextProps);
        this.setState({
            ...ad
        });
    }
    /**
     * 获取广告词相关数据
     */
    getAdDataSource = (props)=>{
        let extendFields = JSON.parse(JSON.stringify(props.itemTmplPublishVo && props.itemTmplPublishVo.extendFields || []));
        let ad = {
            adText: null, // 广告词
            adUrl: null, // 链接
            adColor: null // 颜色
        };

        // 以免数据中不存在这些字段
        let has_adText = false;
        let has_adUrl = false;
        let has_adColor = false;
        extendFields.map((item)=>{
            if(item.label == 'adText'){
                has_adText = true;
                ad.adText = item.value;
            }
            if(item.label == 'adUrl'){
                has_adUrl = true;
                ad.adUrl = item.value;
            }
            if(item.label == 'adColor'){
                has_adColor = true;
                ad.adColor = item.value;
            }
        });

        if(!has_adText){
            extendFields.push({ label: 'adText', value: null });
        }
        if(!has_adUrl){
            extendFields.push({ label: 'adUrl', value: null });
        }
        if(!has_adColor){
            extendFields.push({ label: 'adColor', value: null });
        }
        return ad;
    }
    render() {
        const { adUrl, adColor, adText } = this.state;
        return (
            <div className={styles.labelWrap}>
                <label htmlFor="广告词" className={styles.labelTitle}>广告词：</label>
                <div className={styles.labelCont}>
                    <Input
                        size="large"
                        placeholder="请输入广告词"
                        value={adText}
                        onChange={(e) => { this.onStateChange('adText',e.target.value); }}
                        onBlur={(e) => { this.updateAdDataSource('adText', e.target.value); }}
                    />
                </div>
                <div>
                    <div className={styles.labelChildWrap}>
                        <label className={styles.labelChildTitle}>链接：</label>
                        <p className={styles.labelChildCont}>
                            <Input
                                size="large"
                                placeholder='(http|https|ftp)://a.b.com'
                                style={{ width: '515px' }}
                                value={adUrl}
                                onChange={(e) => { this.onStateChange('adUrl',e.target.value); }}
                                onBlur={(e) => { this.updateAdDataSource('adUrl', e.target.value); }}
                            />
                        </p>
                        {
                            !this.state.validAdUrl ?
                                <div className={styles.errorTips}>
                                    请输入有效的链接，否则数据不会保存
                                </div> : null
                        }
                    </div>
                    <div className={styles.labelChildWrap}>
                        <label className={styles.labelChildTitle}>颜色：</label>
                        <p className={styles.labelChildCont}>
                            {adColor}
                        </p>
                        <p className={styles.labelChildCont}>
                            <span className={styles.verticalMiddle}>
                                <ColorPicker
                                    enableAlpha={false}
                                    color={adColor}
                                    onClose={(colors)=>{ this.updateAdDataSource('adColor', colors.color); }}
                                    onChange={(colors) => { this.onStateChange('adColor', colors.color); }}
                                />
                            </span>
                        </p>
                        {
                            typeof adColor == 'string' && adColor.length>0?
                            <p className={styles.labelChildCont}>
                                <Button size='small' onClick={()=>{ this.updateAdDataSource('adColor', null); }}>重置</Button>
                            </p>:null
                        }
                    </div>
                </div>
            </div>
        );
    }
    /**
     * 更新state
     */
    onStateChange = (field, value) => {
        this.setState({
            [field]: value
        });
    }

    /**
     * 更新数据源
     */
    updateAdDataSource = (field, value) => {
        const reg = /^(((ht|f)tps?):)?\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/;;

        // 如果是广告词链接，则作校验
        if (field == 'adUrl' && value.length > 0 ) {
            if (reg.test(value)) {
                this.setState({
                    validAdUrl: true
                });
            } else {
                this.setState({
                    validAdUrl: false
                });
                return false;
            }
        } else if(field == 'adUrl'){
            this.setState({
                validAdUrl: true
            });
        }
        
        // 更新广告词 extendFields 
        let extendFields = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.extendFields || []));
         
        // 以免数据中不存在这些字段
        let has_adText = false;
        let has_adUrl = false;
        let has_adColor = false;
        extendFields.map((item)=>{
            if(item.label == 'adText'){
                has_adText = true;
            }
            if(item.label == 'adUrl'){
                has_adUrl = true;
            }
            if(item.label == 'adColor'){
                has_adColor = true;
            }
        });
 
        if(!has_adText){
            extendFields.push({ label: 'adText', value: null });
        }
        if(!has_adUrl){
            extendFields.push({ label: 'adUrl', value: null });
        }
        if(!has_adColor){
            extendFields.push({ label: 'adColor', value: null });
        }

        extendFields.forEach((item)=>{
            if(item.label == field){
                item.value = value;
            }
        });

        let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
        itemTmplPublishVo.extendFields = extendFields;
        this.props.updateItemTmplAction(itemTmplPublishVo);
    }
}
