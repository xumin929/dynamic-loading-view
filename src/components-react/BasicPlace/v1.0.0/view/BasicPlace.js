/**
 * @file 发布商品-基础设置- 商品名称
 */

import React, {Component} from 'react';
import { Input } from "jdcloudui";
import styles from "./style/basic.less";

class BasicPlace extends Component {
    constructor(props) {
        super(props);
    }
    handleChange =(e)=>{
        const data = e.target.value;
        this.props.itemTmplPublishVo.origin = data;
        this.props.updateItemTmplAction(this.props.itemTmplPublishVo);
    }


    render() {
        const origin = this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.origin;
        return (
            <div className={styles.labelWrap}>
                <label htmlFor="产地" className={styles.labelTitle}>产地 ：</label>
                <div className={styles.labelCont}>
                    <Input size="large" placeholder="输入产地" value={origin} onChange = {this.handleChange} />
                </div>
            </div>
        );
    }
}
export default BasicPlace;
