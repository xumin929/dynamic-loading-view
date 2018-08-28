/**
 * 商品模板管理wrapper组件
 * liurenpeng
 * 2018/7/30
 */
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { message } from 'jdcloudui';
import GoodsTemplateSearch from './GoodsTemplateSearch/GoodsTemplateSearch';
import GoodsTemplateGrid from './GoodsTemplateGrid/GoodsTemplateGrid';
import {queryTemplateSearch,saveTemplateParams} from './redux/redux';

@connect(
  state => ({goodsTemplateList:state.goodsTemplateList}),
  dispatch => bindActionCreators({queryTemplateSearch,saveTemplateParams}, dispatch)
)
export default class GoodsTemplateWrapper extends Component {
    constructor(props) {
        super(props);
        this.params = {
            pageNum: 1,
            pageSize: 20,
            cid:null,
            tmplName:null,
            status:null,
        };
        this.totalCount = 1,
        this.state={
            key:new Date(),
            templateData:[],
        }
    }

    componentWillMount() {
        this.params = this.props.paramsData ?this.props.paramsData : this.params;
        this.props.saveTemplateParams(this.params);
        this.getTemplateList();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.goodsTemplateList && nextProps.goodsTemplateList.data){
            if(nextProps.goodsTemplateList.data.data){
                if(nextProps.goodsTemplateList.data.data!=this.state.templateData){
                    this.setState({
                        templateData:nextProps.goodsTemplateList.data.data.result || [],
                    })
                    this.params.pageNum = nextProps.goodsTemplateList.data.data.pageNum;
                    this.totalCount = nextProps.goodsTemplateList.data.data.totalCount;
                }
            } else {
                if(nextProps.goodsTemplateList.data.msg){
                    message.error(nextProps.goodsTemplateList.data.msg,2)
                } else {
                    message.error('请求模板列表出错',2)
                }
            }
        }
    }

    //请求列表信息
    getTemplateList = () => {
        this.props.queryTemplateSearch(this.params).then((res) => {
            if (res.code != '0') {
                message.error(res.msg, 2)
            }
        })
    }

    //条件搜索
    onSearchClick = (param) => {
        this.params.cid = param.cid;
        this.params.tmplName = param.tmplName;
        this.params.status = param.status;
        this.props.saveTemplateParams(this.params);
        this.getTemplateList();
    }

    //分页搜索
    onPaginationSearch = (param) => {
        this.params.pageNum = param
        this.getTemplateList();
    }

    //重置搜索条件
    handleReset = () => {
        this.setState({
            key:new Date()
        })
    }

    render() {
        let paramsData = this.params;
        return (
            <div>
                <GoodsTemplateSearch onSearchClick={this.onSearchClick} handleReset={this.handleReset} key={this.state.key}/>
                <GoodsTemplateGrid onPaginationSearch={this.onPaginationSearch} templateData={this.state.templateData} totalCount={this.totalCount} pageNum={this.params.pageNum} getTemplateList={this.getTemplateList} mainDomain={this.props.mainDomain}/>
            </div>
        );
    }
}