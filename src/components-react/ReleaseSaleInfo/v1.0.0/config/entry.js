
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { trigger } from 'redial';
import createBrowserHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import { getStoredState } from 'redux-persist';
import { Provider } from 'react-redux';
import localForage from 'localforage';
import {createStore} from 'redux/create';

import ApiClient from '../../../../helpers/ApiClient';
import asyncMatchRoutes from '../../../../routes/asyncMatchRoutes';
import ReduxAsyncConnect from '../../../../routes/ReduxAsyncConnect';
import routes from './route/router';
import reducer from "./Container/reducer"
const persistConfig = {
    key: 'primary',
    storage: localForage,
    whitelist: ['test']
};

const dest = document.getElementById('content');


const client = new ApiClient();
const providers = { ...client };


(async () => {
    const storedData = await getStoredState(persistConfig);


    const history = createBrowserHistory();
    const data = { ...storedData, ...window.__data };
    const store = createStore({
        history,
        data,
        helpers: providers,
        persistConfig,
        reducer
    });

    const hydrate = async _routes => {
        const { components, match, params } = await asyncMatchRoutes(_routes, history.location.pathname);
        const triggerLocals = {
            ...providers,
            store,
            match,
            params,
            history,
            location: history.location
        };

        await trigger('fetch', components, triggerLocals);
        await trigger('defer', components, triggerLocals);
        ReactDOM.hydrate(
            <HotEnabler>
                <Provider store={store} {...providers}>
                    <ConnectedRouter history={history}>
                        <ReduxAsyncConnect routes={_routes} store={store} helpers={providers}>
                            {renderRoutes(_routes)}
                        </ReduxAsyncConnect>
                    </ConnectedRouter>
                </Provider>
            </HotEnabler>,
            dest
        );
    };

    await Loadable.preloadReady();

    await hydrate(routes);

    if (module.hot) {//TODO
        module.hot.accept('./route/router', () => {
            const nextRoutes = require('./route/router');
            hydrate(nextRoutes).catch(err => {
                console.error('Error on routes reload:', err);
            });
        });
    }

    if (process.env.NODE_ENV !== 'production') {
        window.React = React; // enable debugger

        if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-reactroot']) {
            console.error('Server-side React render was discarded.\n' +
                'Make sure that your initial render does not contain any client-side code.');
        }
    }
    if (process.env.NODE_ENV == 'production') {
        __webpack_public_path__ = window.__data._b2b_static_server_;
    }

    if (__DEVTOOLS__ && !window.devToolsExtension) {
        const devToolsDest = document.createElement('div');
        window.document.body.insertBefore(devToolsDest, null);
        const DevTools = require('../../../../helpers/DevTools/DevTools');
        //const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate
        ReactDOM.hydrate(
            <Provider store={store}>
                <DevTools />
            </Provider>,
            devToolsDest
        );
    }


})();
