/*
import _ from 'lodash';
import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createPersistoid, persistCombineReducers, REGISTER } from 'redux-persist';
import clientMiddleware from './middleware/clientMiddleware';
var store;
function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    ...asyncReducers
  };
}
function combine(reducers, persistConfig) {
  if (persistConfig) {
    return persistCombineReducers(persistConfig, reducers);
  }
  return combineReducers(reducers);
}

export function inject(store, reducers, persistConfig) {
  Object.entries(reducers).forEach(([name, reducer]) => {
    if (store.asyncReducers[name]) return;
    store.asyncReducers[name] = reducer.__esModule ? reducer.default : reducer;
  });

  store.replaceReducer(combine(createReducers(store.asyncReducers), persistConfig));
}
export function attachReducers(reducers) {
  
}
export function getStore () {
  return store;
}

function getNoopReducers(reducers, data) {
  if (!data) return {};
  return Object.keys(data).reduce(
    (prev, next) => (reducers[next] ? prev : { ...prev, [next]: (state = {}) => state }),
    {}
  );
}

export default function createStore({ history, data, helpers, persistConfig, reducer}) {
  const middleware = [clientMiddleware(helpers), routerMiddleware(history)];

  if (__CLIENT__ && __DEVELOPMENT__) {
    const logger = require('redux-logger').createLogger({
      collapsed: true
    });
    middleware.push(logger.__esModule ? logger.default : logger);
  }

  const enhancers = [applyMiddleware(...middleware)];

  if (__CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../helpers/DevTools/DevTools');

    Array.prototype.push.apply(enhancers, [
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ]);
  }

  const finalCreateStore = compose(...enhancers)(_createStore);
  const reducers = createReducers();
  
  const noopReducers = getNoopReducers(reducers, data);
  const asyncReducers = { ...noopReducers, ...reducers,...reducer };
  store = finalCreateStore(combine(asyncReducers, persistConfig), data);
  store.asyncReducers = asyncReducers;
  store.inject = _.partial(inject, store, _, persistConfig);

  if (persistConfig) {
    const persistoid = createPersistoid(persistConfig);
    store.subscribe(() => {
      persistoid.update(store.getState());
    });
    store.dispatch({ type: REGISTER });
  }

  // if (__DEVELOPMENT__ && module.hot) {
  //   module.hot.accept('./reducer', () => {
  //     let reducer = require('./reducer');
  //     reducer = combine((reducer.__esModule ? reducer.default : reducer)(store.asyncReducers), persistConfig);
  //     store.replaceReducer(reducer);
  //   });
  // }

  return store;
}
*/
/*
 import * as config from 'jdcloudecc/redux/create';
 export config.inject  config.createStore=>config.default
 config:
 {
  inject:f()
  default:f()
 }


* */

import createStore from 'jdcloudecc/redux/create';

export {createStore};
