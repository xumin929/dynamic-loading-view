/**
 * Created by huangxiao3 on 2017/2/17.
 */
import React, {Component} from 'react';
import { Popover } from 'jdcloudui';
import './style/style.css';
export default class DispatchPlaces extends Component {
  constructor(props, context) {
    super(props, context);
  }
  //校验
  createContent(){
    let sourceData = this.props.sourceData;
    let result = [];
    let tmp = [];
    if(sourceData && sourceData.length && sourceData.length>0){
      for(let i in sourceData){
        let unit = (<span style={{marginRight:'10px'}}>{sourceData[i]}</span>)
        tmp.push(unit)
        if((parseInt(i)+1)%4 == 0){
          result.push(tmp);
          tmp=[];
        }
      }
      if(tmp!=''){
        result.push(tmp);
      }
      return result.map((k)=>{
        return <div style={{marginTop:'10px'}}>{k}</div>
      });
    }else{
      return(
        <div></div>
      )
    }
  }

  render() {
    return(
      <Popover content={this.createContent()} placement="bottom" title="发货范围">
        <a className="text-link">发货范围</a>
      </Popover>
    );
  }
}


