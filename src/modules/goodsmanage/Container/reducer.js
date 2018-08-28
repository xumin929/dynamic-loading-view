import { routerReducer } from 'react-router-redux';
import session from 'jdcloudecc/reducer/session';
import domain from 'jdcloudecc/reducer/domain';
import categoryCascade from '../../../components-react/GoodsManage/PlatformCategory/redux';
import search_goods from '../../../components-react/GoodsManage/redux/search_goods';
import reject_lock from '../../../components-react/GoodsManage/redux/reject_lock';
import batch_shelves from '../../../components-react/GoodsManage/redux/batch_shelves';
import pass_item from '../../../components-react/GoodsManage/redux/pass_item';
import search_brand from '../../../components-react/GoodsManage/redux/search_brand';
import search_price from '../../../components-react/GoodsManage/redux/search_price';
import brandData from '../../../components-react/GoodsManage/redux/search_price';
import brand from '../../../components-react/Common/BrandSelectBasic/redux';
export default {
	routing: routerReducer,
	session,
	domain,
	categoryCascade,
	search_goods: search_goods,
	reject_lock: reject_lock,
	batch_shelves: batch_shelves,
	pass_item: pass_item,
	search_brand: search_brand,
	search_price: search_price,
	brandData,
	brand
}
