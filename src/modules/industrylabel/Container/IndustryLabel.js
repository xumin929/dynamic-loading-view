/**
 * Created by huangxiao3 on 2017/5/19.
 */

import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import IndustryLabelWrap from '../../../components-react/IndustryLabel/IndustryLabelWrap/IndustryLabelWrap';
import { getDomain } from 'jdcloudecc/reducer/domain';
import { provideHooks } from 'redial';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
      await dispatch(getDomain()).catch(() => null);
      console.log("get data async from server")
  }
})

export default class IndustryLabel extends Component {
  render() {
    return (
      <IndustryLabelWrap />
    );
  }
}
