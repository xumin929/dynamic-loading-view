import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import App from 'jdcloudecc/components/AppConfig/App'
@withRouter
export default class App1 extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { route } = this.props;
        return (
            <App route = {route} />
        );
    }
}