/**
 * @file 发布商品-基础设置- 商品名称
 */

import React, {Component} from 'react';
import { Input } from "jdcloudui";
import styles from "./style/basic.less";

class BasicName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTips: false
        };
    }
    handleChange =(e)=>{
        const data = e.target.value;
        console.log("eeee===",data);
        if(data.length<=0){
            this.setState({
                showTips: true
            });
        } else {
            this.setState({
                showTips: false
            });
        }
        this.props.itemTmplPublishVo.itemName = data;
        // this.props.updateItemTmplAction(this.props.itemTmplPublishVo);
    }
    handleBlur = () => {
        // const data = e.target.value;
        // this.props.itemTmplPublishVo.itemName = data;
        this.props.updateItemTmplAction(this.props.itemTmplPublishVo);
    }

    render() {
        let itemName = this.props.itemTmplPublishVo && this.props.itemTmplPublishVo.itemName;
        return (
            <div className={styles.labelWrap}>
                <label htmlFor="商品名称" className={styles.labelTitle}>
                    <span className={styles.colorRed}>*</span>商品名称：
                </label>
                <div className={styles.labelCont}>
                    <Input size="large" placeholder="输入商品名称" value={itemName} onChange = {this.handleChange} onBlur={this.handleBlur}/>
                </div>
                {
                    this.state.showTips?
                        <div className={styles.errorTips}>
                            商品名称不能为空
                        </div>:null
                }

            </div>
        );
    }
}
export default BasicName;
