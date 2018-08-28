/**
 * @author chenyanhua
 * @dateTime 20180724
 * @file 发布商品-基础信息Tab组件
 */
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import CategoryCascade from '../../../BasicCategoryCascade/v1.0.0/view/BindCategoryCascade';
import BasicName from '../../../BasicName/v1.0.0/view/index';
import { Spin } from 'jdcloudui';

function Loading(props) {
  if (props.error) {
      return <div>Error!</div>;
  } else if (props.pastDelay) {
      // return <div style={{ 'height':'800px', 'paddingTop': '200px', 'textAlign': 'center'}}><Spin size="large" /></div>;
      return <div></div>
  } else {
      return null;
  }
}
export default class ReleaseBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: {}
    };
  }
  componentDidMount() {
    // 加载动态tab组件,此处根据钩子查询组件
    // this.props.loadBasicInfoComponents().then((result) => {
    //   const components = this.loadInstance(result && result.data || {});
    //   this.setState({
    //     components: components
    //   });
    // },
    //   (error) => {
    //     console.log(error)
    //   }
    // );
  }
  loadInstance(components) {
    var that = this;
    var instances = {};
    components && Object.keys(components).map((hook) => {
      components[hook].map((value) => {
        if (value["signature"]) {
          let props = {};
          //处理config-->json.parse
          props = JSON.parse(value['config']);
          //处理moduleConfig-->json.parse,eval
          let sourceModuleProps = JSON.parse(value['moduleConfig'])
          let moduleConfigProps = Object.keys(sourceModuleProps).reduce((obj, item) => {
            try {
              obj[item] = eval(sourceModuleProps[item]);
            } catch (e) {
              obj[item] = '';
            }
            return obj;
          }, {});
          //合并config
          props = Object.assign(props ? props : {}, moduleConfigProps ? moduleConfigProps : {});

          var Ins = Loadable({
            loader: () => import('../../..' + '/' + value["signature"] + '/' + value["version"] + '/view/index').then(object => object.default),
            loading: Loading,
            delay: 300,
            render(loaded) {
              let Component = loaded;
              return <Component
                {...props}
                type={that.props.type} // 平台、供应商、店铺
                key={`basic_info_${value["signature"]}`}
                ifSave={that.props.ifSave}
                edit={that.props.edit}
                saleAttributeData={that.props.saleAttributeData || []}  //拼接后的销售规格数据
                updateSaleAttributeAction={that.props.updateSaleAttributeAction} //更新销售规格数据的方法
                updateItemTmplAction={that.props.updateItemTmplAction} //更新总数据的方法
                itemTmplPublishVo={that.props.itemTmplPublishVo} // 当前已保存的总数据
              />;
            }
          });
          instances[hook] = instances[hook] || [];
          instances[hook].push(Ins);
        }
      });
    });
    return instances;
  }

  render() {
    console.log(this.props.itemTmplPublishVo)
    return (
      <div>
        <h3 className="h3-title">基础信息 </h3>
        <BasicName
          type={this.props.type} // 平台、供应商、店铺
          ifSave={this.props.ifSave}
          ifValid={this.props.ifValid}
          edit={this.props.edit}
          updateItemTmplAction={this.props.updateItemTmplAction} //更新总数据的方法
          itemTmplPublishVo={this.props.itemTmplPublishVo} // 当前已保存的总数据
        />
        <CategoryCascade
          type={this.props.type} // 平台、供应商、店铺
          ifSave={this.props.ifSave}
          ifValid={this.props.ifValid} //是否是已生效商品
          edit={this.props.edit}
          updateItemTmplAction={this.props.updateItemTmplAction} //更新总数据的方法
          itemTmplPublishVo={this.props.itemTmplPublishVo} // 当前已保存的总数据
        />
                {/* 添加HOOK_BASICINFO_templateID 钩子加载该tab下的各种组件 */}
        
          {/*<ReleaseSaleSpecification
            ifSave={this.props.ifSave}
            saleAttributeData={this.props.saleAttributeData || []} //拼接后的销售规格数据
            updateSaleAttributeAction = {this.props.updateSaleAttributeAction}  //更新销售规格数据的方法
          />
          <ReleaseSaleInfo 
            saleAttributeData={this.props.saleAttributeData || []} // 销售规格数据
            updateItemTmplAction = {this.props.updateItemTmplAction} // 更新总数据的方法
            saveParamsRedux = {this.props.saveParamsRedux} // 总数据源
          />  
        */}
        {/*  动态加载组件 */}
        {
          this.props.dyComLoading?
          <div style={{minHeight: '50px'}}>
            <Spin size='large'>
              {
                (this.props.components[`HOOK_BASIC_INFO_${this.props.templateId}`] || []).map((Com, i) => {
                  return (
                    <Com />
                  )
                })
              }
            </Spin>
          </div>:
            (this.props.components[`HOOK_BASIC_INFO_${this.props.templateId}`] || []).map((Com, i) => {
              return (
                <Com />
              )
            })
        }
      </div>
    );
  }
}
