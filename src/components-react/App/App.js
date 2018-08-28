import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { Operating } from 'jdcloudecc/components';

@withRouter
export default class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    getMenuUrl=()=>{
        let menuUrl = '';
        let tmp = this.props.route.routes.filter((item)=>{ return typeof window && item.path.indexOf(this.props.location.pathname)>-1});
        if(tmp && tmp[0]){
            menuUrl =  tmp[0].menuUrl
        }
        return menuUrl;
    }

    render() {
        const { route } = this.props;
        //console.log('-----------in app route', route);
        //console.log('-----------in app this.props', this.props);
        return (

            <Operating menuUrl = {this.getMenuUrl()}>
                {renderRoutes(route.routes)}
            </Operating>
        );
    }
}
