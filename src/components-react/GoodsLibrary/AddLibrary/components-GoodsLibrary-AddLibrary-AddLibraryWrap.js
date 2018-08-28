/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20180102
 * @update:       20180102
 * @description:  商品库容器
 * *********************************************/
/* **********  系统组件  ********** */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
/* **********  自定义组件  ********** */
import BI from '../../GoodsLibrary/common/BaseInformation/BaseInformation';
import SS from '../../GoodsLibrary/common/SalesSpecifications/SalesSpecifications';
import SI from '../../GoodsLibrary/common/SalesInformation/SalesInformation';
import AI from '../../GoodsLibrary/common/AdminInformation/AdminInformation';
import GI from '../../GoodsLibrary/common/GoodsImage/GoodsImage';
import SKI from '../../GoodsLibrary/common/SkuImage/SkuImage';
import SP from '../../GoodsLibrary/common/SpecificationsParameter/SpecificationsParameter';
import ProductsIntroduction from '../../GoodsLibrary/common/ProductsIntroduction/ProductsIntroduction';
import FreightInfo from '../../GoodsLibrary/common/FreightInfo/FreightInfo';
import SalesMethod from '../../GoodsLibrary/common/SalesMethod/SalesMethod';
import AfterHelp from '../../GoodsLibrary/common/AfterHelp/AfterHelp';
import Preferential from '../../GoodsLibrary/common/Preferential/Preferential';
import OtherInformation from '../../GoodsLibrary/common/OtherInformation/OtherInformation';


import {setPanelData, setSpecData, setListData} from '../../GoodsLibrary/params_redux';
import {queryLoginInfo, queryAllAdminUser} from '../../GoodsLibrary/common/AdminInformation/redux/queryMsg_redux';
import {getBrandByCategoryId, getItemTagByCategory, queryUnitByCategoryId, getBrandByCategoryIdOrItemId} from '../../GoodsLibrary/common/BaseInformation/redux/paramsMsg_redux';
import {setParamete,setSpecAttributes} from '../../GoodsLibrary/parameters_redux';


/* **********  redux  ********** */
import {querySaleAttrAction, queryPlatfromAttributeList} from '../../GoodsLibrary/common/SalesSpecifications/redux/querySaleAttr_redux';


@connect(
  state => ({params: state.Params}),
  dispatch => bindActionCreators({setParamete, setSpecData, setListData, getBrandByCategoryId, getItemTagByCategory, getBrandByCategoryIdOrItemId, queryUnitByCategoryId, querySaleAttrAction, queryPlatfromAttributeList}, dispatch)
)
class BaseInformation extends BI {
}

@connect(
  state => ({params: state.Params, listData: state.PanelData.list}),
  dispatch => bindActionCreators({setParamete, setPanelData, querySaleAttrAction}, dispatch)
)
class SalesSpecifications extends SS {
}
@connect(
  state => ({params: state.Params}),
  dispatch => bindActionCreators({setParamete}, dispatch)
)
class SalesInformation extends SI {
}
@connect(
  state => ({params: state.Params}),
  dispatch => bindActionCreators({setParamete}, dispatch)
)
class GoodsImage extends GI {
}
@connect(
  state => ({params: state.Params}),
  dispatch => bindActionCreators({setParamete}, dispatch)
)
class SkuImage extends SKI {
}

@connect(
  state => ({params: state.Params, panelData: state.PanelData.panel, specData: state.PanelData.spec,allData:state.Params}),
  dispatch => bindActionCreators({setSpecAttributes}, dispatch)
)
class SpecificationsParameter extends SP {
}

@connect(
  state => ({params: state.Params}),
  dispatch => bindActionCreators({setParamete, queryLoginInfo, queryAllAdminUser}, dispatch)
)
class AdminInformation extends AI {
}

export {
  BaseInformation,
  SalesSpecifications,
  SalesInformation,
  AdminInformation,
  GoodsImage,
  SkuImage,
  SpecificationsParameter,
  ProductsIntroduction,
  FreightInfo,
  SalesMethod,
  AfterHelp,
  Preferential,
  OtherInformation
};
