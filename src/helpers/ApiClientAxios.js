import axios from 'axios';
import config from '../config';
import qs from 'qs';

export default function apiClient(req) {
  // const instance = axios.create({
  //   baseURL: __SERVER__ ? `http://${config.apiHost}:${config.apiPort}` : '/proxy'
  // });
  const instance = axios.create({
      baseURL: __SERVER__ ? `http://${config.apiHost}/proxy` : '/proxy',
      transformRequest: [function (data) {
          return qs.stringify(data || {});
      }],
  });
  let token;

  instance.setJwtToken = newToken => {
    token = newToken;
  };

  instance.interceptors.request.use(
    conf => {
      if (__SERVER__) {
        if (req.header('cookie')) {
          conf.headers.Cookie = req.header('cookie');
        }
        if (req.header('authorization')) {
          conf.headers.authorization = req.header('authorization');
        }
      }

      if (token) {
        conf.headers.authorization = token;
      }

      return conf;
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response ? error.response.data : error)
  );

  return instance;
}