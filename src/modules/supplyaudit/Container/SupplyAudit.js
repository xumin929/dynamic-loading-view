/**
 * Created by huangxiao3 on 2017/2/18.
 */
import React, {Component} from 'react';
import SupplyAuditView from "../../../components-react/SupplyAudit/SupplyAuditView/SupplyAuditView";
import { provideHooks } from 'redial';
import {getDomain} from 'jdcloudecc/reducer/domain';

@provideHooks({
    fetch: async ({ store: { dispatch, getState } }) => {
        await dispatch(getDomain()).catch(() => null);
        console.log("get data async from server")
    }
})
export default class SupplyAudit extends Component {
  handleSubmit() {

  }

  render() {
    return (
      <div>
        <SupplyAuditView />
      </div>
    );
  }
}
