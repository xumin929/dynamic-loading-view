/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:specification
 ****************************************************************/
import React, {Component} from 'react';
import Specifications from '../../../components-react/Specification/Specifications/Specifications';

export default class Specification extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div id = 'spec'>
        <Specifications></Specifications>
      </div>
    );
  }
}


