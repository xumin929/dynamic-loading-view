/*import serialize from 'serialize-javascript';
import config from "../config";
const micro_service_name = config.micro_service_name.replace("b2b-","")
export default function(req,res, template,data={}) {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }
  try {
    const assets = webpackIsomorphicTools.assets();
    const style = Object.keys(assets.styles).map((style, key) => {
       return '<link href="' + assets.styles[style] + '" media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>'
    });
    const script = "window.__data="+serialize({});
    res.render(template, {css:assets.styles,style:style.join(" "),script:script,js:assets.javascript,mode:__DEVELOPMENT__,micro_service_name,...data});

  }catch(err) {
    console.log(err.stack)
  }
}*/


/**
 * Created by huangxiao3 on 2018/5/31.
 */
import config from "../config";
import swigrender from 'jdcloudecc/routes/swigrender';

export default function(req,res, template,data={}) {
return swigrender(req,res, template,data,config)
}
