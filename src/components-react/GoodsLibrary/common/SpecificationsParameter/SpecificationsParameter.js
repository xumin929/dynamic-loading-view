/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 规格参数
 * *********************************************/
/* **********  系统组件  ********** */
import React, { Component } from 'react';
import PanelItems from '../PanelItems/PanelItems';
import { Collapse, Icon } from 'jdcloudui';
const Panel = Collapse.Panel;

/* **********  自定义组件  ********** */

class SpecificationsParameter extends Component {
  constructor(props) {
    super(props);

  }
  /**
   * 生成panel选项
   */
  creatPanelItem = () => {
    if (this.props.panelData.skuData.length > 0) {
      return this.props.panelData.skuData.map((item, index) => {
        return (
          <Panel header={item.name} key={index} className='changePad'>
            <PanelItems
              key={index} index={index}
              specAttributes={item.specAttributes}
              checkValue={item.checkValue}
              specData={this.props.specData}
              getValue={this.getValue}
              onStoreAttributes={this.onStoreAttributes}
              disableValue={this.props.params && this.props.params.specAttributes || "[]"}
            />
          </Panel>
        )
      })
    } else {
      return (
        <Panel header="" className='changePad'>
          <PanelItems
            index={0}
            specAttributes={[]}
            checkValue={[]}
            specData={this.props.specData}
            getValue={this.getValue}
            onStoreAttributes={this.onStoreAttributes}
            disableValue={'[]'}
          />
        </Panel>
      )
    }
  }
  /**
   * 向 redux 存储规格参数
   */
  onStoreAttributes = (value, index) => {
    this.props.setSpecAttributes("itemPublishSkuParamsVo", index, value)
  }


  render() {
    //console.log(this.props.allData, '----------->alldata')
    console.log(this.props.params, '----------->params')
    console.log(this.props.panelData,"-------------this.props.panelData")
    let cid = this.props.params ? this.props.params.cid : null;
    return (
      <div>
        {/*  规格参数  */}
        {/* <PanelItems specData={this.props.specData}/> */}
        {
          cid && this.props.panelData ? (
            <Collapse accordion>
              {
                this.creatPanelItem()
              }
            </Collapse>
          ) : (
            <div style={{margin: '0 auto', width: '200px', height: '100px', textAlign: 'center', lineHeight: '100px', color: '#ccc', fontSize: '14px'}}>
              <Icon type="frown-o" style={{marginRight: '4px'}} />暂无数据
            </div>
          )
        }

      </div>
    );
  }
}
export default SpecificationsParameter;
