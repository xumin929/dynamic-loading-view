import ssrrender from "../../../../../routes/ssrrender";
import reducer from "../Container/reducer"
export default function(req,res,next) {
	const router = require("./router");
	ssrrender(req,res,"../components-react/ReleaseSaleInfo/v1.0.0/config/template/cfg",router,reducer);
}


//module.exports = router;