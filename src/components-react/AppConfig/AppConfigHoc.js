/**
 * Created by huangxiao3 on 2018/5/31.
 */
import React, { Component } from 'react';
import './style.css'
import { connect } from 'react-redux';
import * as action from './redux';
// let ev = '';
@connect(state => ({}), { ...action })
export default function AppConfigHoc (WrappedComponent)  {
    return class extends Component {

        // handleSubmit(){
        //     debugger;
        //     this.callParent();
        // }
        // receiveMessage(event) {
        //     ev = event;
        // }

        // callParent() {
        //     ev && ev.source && ev.source.postMessage && ev.source.postMessage('ok', ev.origin);
        // }

        // componentDidMount(){
        //     window.addEventListener('message', this.receiveMessage, false);
        // }

        render() {
            return (
            <WrappedComponent {...this.props} callParent = {this.callParent} testPropsFromHoc="aahahahh"/>
            );
        }
    }
}