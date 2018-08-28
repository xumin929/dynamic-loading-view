import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function getProtocol(req) {
  return "http:";
  //return req.headers["x-proto"]=="http"?"http:":"https:";
}
function formatUrl(path, config, req) {
  if (/^(https?:)|^(\/\/)/.test(path)) return path;
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    var protocol = getProtocol(req);
    if (config.apiPort != "" && config.apiPort != "80") {
      return protocol + '//' + config.apiHost + ':' + config.apiPort + adjustedPath;
    } else {
      return protocol + '//' + config.apiHost + adjustedPath;
    }
  }
  return '/proxy' + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        params = params || {};
        params._ = +new Date();
        request.query(params);

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
