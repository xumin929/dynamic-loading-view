import ssrrender from "../../../routes/ssrrender";
import reducer from "../Container/reducer"
export default function(req,res,next) {
	const router = require("./router")
	ssrrender(req,res,"evaluationmanage/template/list",router,reducer);
}

//module.exports = router;