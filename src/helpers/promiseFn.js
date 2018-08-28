import ApiClient from './ApiClient';

/*
 * req{obj}    路由回调参数
 * res{obj}
 * st{Boolean} true不需要登陆，false需要登陆
 * url{String} 接口url
 * params{obj} 接口参数
 * @renturn promise 对象
 * */
function promiseFn(req, res, st, url, params) {
  return new Promise(function (resolve) {
    const client = new ApiClient(req, res);
    client.get(url, params, st).then(
      function (success) {
        resolve(success);
      },
      function (err) {
        resolve(err);
      }
    );
  });
}

export default promiseFn;