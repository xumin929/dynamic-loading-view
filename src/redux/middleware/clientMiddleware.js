/*export default function clientMiddleware(helpers) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    const actionPromise = promise(helpers, dispatch);
    actionPromise
      .then(result => next({ ...rest, result, type: SUCCESS }), error => next({ ...rest, error, type: FAILURE }))
      .catch(error => {
        console.error('MIDDLEWARE ERROR:', error);
        next({ ...rest, error, type: FAILURE });
      });

    return actionPromise;
  };
}*/


import clientMiddleware from 'jdcloudecc/redux/middleware';
export default function(helpers){
  return clientMiddleware(helpers);
}