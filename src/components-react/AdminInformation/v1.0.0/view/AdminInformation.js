/**
 * @file 发布商品-基础设置- 商品名称
 */

import React, {Component} from 'react';
import { Input, Select, Row, Col } from "jdcloudui";
const Option = Select.Option;
import styles from "./style/basic.less";
import { queryLoginInfo,queryAllAdminUser } from "./redux/queryData";


class AdminInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            dataArr: []
        }
    }
    componentDidMount() {
        let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
        if(this.props.type == '1'){
            //获取平台运营人员以及发布人员
            this.props.queryLoginInfo("",this.props.type).then(res => {
                if (res.code == 0) {
                    this.props.queryAllAdminUser().then(dt => {
                        if (res.code == 0) {
                            this.setState({
                                user: res.data,
                                dataArr: dt.data
                            })

                            itemTmplPublishVo.publishUserId = res.data.userId;
                            this.props.updateItemTmplAction(itemTmplPublishVo);
                        }
                    });
                }
            })
        }else{
            this.props.queryLoginInfo("",this.props.type).then(res =>{
                if(res.code == 0){
                    this.setState({
                        user: res.data
                    });
                    console.log("res==============",res.data);
                    itemTmplPublishVo.publishUserId = res.data.userId;
                    this.props.updateItemTmplAction(itemTmplPublishVo);

                }
            })
        }

    }

    handelChange = (value) => {
        console.log("value",value);
        let itemTmplPublishVo = JSON.parse(JSON.stringify(this.props.itemTmplPublishVo));
        itemTmplPublishVo.operatorId = value;
        this.props.updateItemTmplAction(itemTmplPublishVo);
        console.log("12121",this.props.itemTmplPublishVo);
    };

    render() {
        let { user, dataArr } = this.state;
        let operatorId = this.props.itemTmplPublishVo ? this.props.itemTmplPublishVo.operatorId : null;
        let publishUserId = this.props.itemTmplPublishVo ? this.props.itemTmplPublishVo.publishUserId : null;
        this.type = this.props.type;
        let setPlaceholder = {
            placeholder: '请选择',
            value: operatorId,
            onChange: (value) => this.handelChange(value)
        };
        return (
            <div className="mt15 mb10">
                <strong className="f-fs14">管理员信息</strong>
                <div className={styles.label}>
                    <div className={styles.labelWrap}>
                        <label htmlFor="商品发布" className={styles.labelTitle}>商品发布 : </label>
                        <div className={styles.labelCont}>
                            <Select placeholder='请选择'  value={publishUserId} className={styles.labelSelect}>
                                <Option value={user.userId}>{user.username}</Option>
                            </Select>
                        </div>
                    </div>
                    {
                        this.type == "1" ?
                            <div className={styles.labelWrap}>
                                <label htmlFor="商品运营" className={styles.labelTitle}>
                                    <span className={styles.colorRed}>*</span> 商品运营 :
                                </label>
                                <div className={styles.labelCont}>
                                    <Select placeholder='请选择' className={styles.labelSelect}  {...setPlaceholder}>
                                        {
                                            dataArr.map((item, index) => <Option key={index} value={item.id}>{item.username}</Option>)
                                        }
                                    </Select>
                                </div>
                            </div>:null
                    }


                </div>
            </div>
        );
    }
}
export default AdminInformation;
