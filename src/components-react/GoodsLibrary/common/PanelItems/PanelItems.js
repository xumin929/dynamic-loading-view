/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180118
 * @update:       20180118
 * @description:  基础信息 > 规格参数
 * *********************************************/
/* **********  系统组件  ********** */
import React, {Component} from 'react';
import { Collapse} from 'jdcloudui';
import PanelItemChild from '../PanelItemChild/PanelItemChild';
const Panel = Collapse.Panel;

/* **********  自定义组件  ********** */

class PanelItems extends Component {
  constructor(props) {
    super(props);
    this.specAttributes=[];//sku 属性
  }
  /**
   * 生成规格参数展开内容
   */
  creatPanelItem = () =>{
    if(this.props.specData.length>0){
      return this.props.specData.map((item,index)=>{
        return (
          <div key={item.attrId}>
            <PanelItemChild
              key={item.attrId}
              specAttributes={this.props.specAttributes} //回显规格属性
              checkValue={this.props.checkValue}//已填选项
              disableValue={this.props.disableValue}//禁用选项
              itemData={item}
              index={index} //每一条aid 索引值
              getValue = {this.getValue}
            />
          </div>
        )
      })
    }else{

    }
  }
  //this.props.index -> 当前所属sku索引值

  /**
   * 获每一个 select 和 input 的值
   */
  getValue = (value,index) =>{
    this.specAttributes[index] = value;
    console.log(this.bouncer(this.specAttributes),`第${this.props.index}个sku 的 specAttributes 属性串`)
    this.props.onStoreAttributes(JSON.stringify(this.bouncer(this.specAttributes)),this.props.index);
  }
  /**
   * 去除数组中的 undefined；
   */
  bouncer = (arr) => {
    return arr.filter(function(val){
      return !(!val || val === "");
    });
  }


  render() {
    // const specItems = this.props.specData&&this.props.specData.code=="0"&&this.props.specData.data&&this.creatPanelItem();
    return (
      <div>
        {
          this.props.specData&&this.creatPanelItem()
        }
      </div>
    );
  }
}
export default PanelItems;
