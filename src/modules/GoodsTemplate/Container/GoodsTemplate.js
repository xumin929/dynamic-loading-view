/**
 * 商品发布模板管理页面
 */
import React, { Component, PropTypes } from 'react';
import { JcBreadCrumb } from 'jdcloudecc/components';
import { getDomain } from './redux';//'jdcloudecc/reducer/domain';
import { provideHooks } from 'redial';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GoodsTemplateWrapper from '../../../components-react/GoodsTemplate/GoodsTemplateWrapper';

@provideHooks({
    fetch: async ({ store: { dispatch, getState } }) => {
        await dispatch(getDomain()).catch(() => null);
        console.log("get data async from server")
    }
})

@connect(
    state => ({ domain: state.domain }),
    dispatch => bindActionCreators({getDomain}, dispatch)
  )

export default class GoodsTemplate extends Component {
    constructor(props) {
        super(props);
        this.paramsData = {};
        this.mainDomain = null;
    }

    componentWillMount(){
        // let paramsData = this.props.location.query.paramsData;
        // this.paramsData = paramsData;
        this.props.getDomain();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.domain && nextProps.domain.loaded){
            nextProps.domain.domains.map((item,index)=>{
                if(item.domainType == 4){
                    this.mainDomain = item.domain;
                    console.log(this.mainDomain);
                }
            })
            
        }
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
            name: "商品模板管理"
        }]
        return (
            <div className='ui-container ui-platform'>
              <div className="ui-breadcrumb">
                <JcBreadCrumb menu={menus} />
              </div>
              <div className="ui-ct">
                <div className="ui-hd">商品模板管理</div>
                <div className="ui-bd">
                  <GoodsTemplateWrapper mainDomain={this.mainDomain}/>
                </div>
              </div>
            </div>
        );
    }
}