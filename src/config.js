
const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

var cfg = {
  _b2b_static_server_:"//static.asdf.b2b-v2-pre2.jcloudec.com",
  micro_service_name : "",
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiPort: 80,
  apiHost:'gw.eureka.com'
}


try {
    var fs = require('fs');
    const cfgInfo = fs.readFileSync('./start.json');
    var cfgInfoObject = {};
    try {
      cfgInfoObject = JSON.parse(cfgInfo);
      cfg.micro_service_name = cfgInfoObject.apps[0]["name"];
    } catch (err) {
      console.error('==>  ERROR: Error parsing your start.json');
      console.error(err);
    }
}catch(e){}

module.exports = Object.assign(cfg, environment);
