/**
 * Created by huangxiao3 on 2018/5/31.
 */
import config from "../config";
const micro_service_name = config.micro_service_name.replace("b2b-","");
import swigrender from 'jdcloduecc/route/swigrender';

export default function(req,res, template,data={}) {
    return swigrender(req,res, template,data,micro_service_name)
}