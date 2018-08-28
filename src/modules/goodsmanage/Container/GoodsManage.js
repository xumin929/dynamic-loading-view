/* *********************************************
* @author: GuoRuiGuang
* @creatdDate: 20171114
* @description: 平台店铺管理
* *********************************************/
import React, { Component, PropTypes } from 'react';
import { Breadcrumb } from 'jdcloudui';
import { JcBreadCrumb } from 'jdcloudecc/components';
import GoodsManageWrapper from '../../../components-react/GoodsManage/GoodsManageWrapper';
import { provideHooks } from 'redial';
import { getDomain } from 'jdcloudecc/reducer/domain';



@provideHooks({
    fetch: async ({ store: { dispatch, getState } }) => {
        await dispatch(getDomain()).catch(() => null);
        console.log("get data async from server")
    }
})


export default class GoodsManage extends Component {
    constructor(props) {
        super(props);
        this.paramsData = {};
    }

    componentWillMount(){
        let paramsData = this.props.location.query ? this.props.location.query.paramsData : {};
        this.paramsData = paramsData;
    }

    render() {
        const menus = [{
            url: "/operating-view/home",
            name: "首页"
        }, {
            url: "/operating-item-view/goodsmanage",
            name: "商品管理"
        }, {
            url: "",
            name: "店铺商品管理"
        }]
        return (
            <div className='ui-container ui-platform'>
                <div className="ui-breadcrumb">
                    <JcBreadCrumb menu={menus} />
                </div>
                <div className="ui-ct">
                    <div className="ui-bd">
                        <GoodsManageWrapper paramsData={this.paramsData}/>
                    </div>
                </div>
            </div>
        );
    }
}