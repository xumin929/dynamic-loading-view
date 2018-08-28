/**
 * @author chenyanhua
 * @date 2018-08-06
 * @file 发布商品-商品介绍 Tab组件
 * 运营平台/店铺/供应商 用的该组件代码都一样
 * 除模板引用的static下的ueditor文件不一样
 * shop引用的是ueditor.all.js
 * platform引用的是ueditor.all.min.js
 */
import React, { Component } from 'react';
import { Checkbox, message } from 'jdcloudui';
import styles from "./style/index.less";

const CheckboxGroup = Checkbox.Group;
export default class ReleaseChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.getValue(props)
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            value: this.getValue(nextProps)
        });
    }
    /**
     * 根据edit确定是新发布还是编辑
     * 新发布默认选中全部
     */
    getValue = (props)=>{
        let value = [];
        let old_value = props.itemTmplPublishVo && props.itemTmplPublishVo.channelArr || ['m', 'pc'];
        if(old_value.indexOf(1) >= 0){
            value.push('m');
        }
        if(old_value.indexOf(6) >= 0){
            value.push('pc');
        }
        return value;
    }
    render() {
        const channelOptions = [
            { label: '移动端', value: 'm' },
            { label: 'PC端', value: 'pc' },
        ];
        return (
            <div className={styles.labelWrap}>
                <label htmlFor="适用渠道" className={styles.labelTitle}>
                    <span className={styles.colorRed}>*</span>适用渠道：
                </label>
                <div className={styles.labelCont}>
                    <CheckboxGroup 
                        options={channelOptions} 
                        value={this.state.value}
                        onChange={(checkedValues)=>{ this.onChange(checkedValues); }} 
                    />
                </div>
            </div>
        );
    }

    /**
     * 选择销售渠道,组合数据,并更新数据源
     * PC端传6，移动端传1~5
     */
    onChange = (checkedValues)=>{
        if(checkedValues.length<=0){
            message.warn('适用渠道不能为空!');
        } else {
            this.setState({
                value: checkedValues
            });
            let channelArr = [];
            if(checkedValues.indexOf('m')>=0){
                channelArr = channelArr.concat([1,2,3,4,5]);
            }
            if(checkedValues.indexOf('pc')>=0){
                channelArr.push(6);
            }
            let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
            itemTmplPublishVo.channelArr = channelArr;
            this.props.updateItemTmplAction(itemTmplPublishVo); 
        }
    }
}
