import { routerReducer } from 'react-router-redux'
// import domain from 'jdcloudecc/reducer/domain';
import domain from './redux';
import categoryCascade from '../../../components-react/GoodsManage/PlatformCategory/redux';
import goodsTemplateList from '../../../components-react/GoodsTemplate/redux/redux';
import templateCategoryList from '../../../components-react/GoodsTemplate/CheckCategoryModal/queryCategory_redux';
import cancelCategoryList from '../../../components-react/GoodsTemplate/CheckCategoryModal/cancelCategory_redux';
import addTemplate from '../../../components-react/GoodsTemplate/GoodsTemplateGrid/addTmpl_redux';
import addModule from '../../../components-react/GoodsTemplate/GoodsTemplateGrid/addModule_redux';
import editTemplate from '../../../components-react/GoodsTemplate/GoodsTemplateGrid/editTmpl_redux';
import editStatus from '../../../components-react/GoodsTemplate/GoodsTemplateGrid/tmplStatus_redux';
import getCategory from '../../../components-react/GoodsTemplate/TemplateTransfer/redux';
import getCategoryTree from '../../../components-react/GoodsTemplate/ChangeCategoryModal/queryCategoryTree_redux';
import saveTemplCategory from '../../../components-react/GoodsTemplate/ChangeCategoryModal/saveTmplCategory_redux';
export default {
    domain,
    categoryCascade,
    goodsTemplateList,
    templateCategoryList,
    cancelCategoryList,
    addTemplate,
    addModule,
    editTemplate,
    editStatus,
    getCategory,
    getCategoryTree,
    saveTemplCategory,
}