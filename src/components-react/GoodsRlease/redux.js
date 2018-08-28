/****************************************************************
 * author:LiuYang
 * date:2017-02-20
 * description:产品发布
 ****************************************************************/
const GOODS_LOADING = 'redux/GOODSRLEASE/LOADING';
const GOODS_LOAD_SUCCESS = 'redux/GOODSRLEASE/LOAD_SUCCESS';
const GOODS_LOADING_FAIL = 'redux/GOODSRLEASE/LOADING_FAIL';


// 同步商品到平台标准库
const GOODS_LIBRARY = 'redux/GOODSRLEASE/GOODS_LIBRARY';
const GOODS_LIBRARY_SUCCESS = 'redux/GOODSRLEASE/GOODS_LIBRARY_SUCCESS';
const GOODS_LIBRARY_FAIL = 'redux/GOODSRLEASE/GOODS_LIBRARY_FAIL'

//获取销售属性
const GOODS_SALE = 'redux/GOODSRLEASE/GOODS_SALE';
const GOODS_SALE_SUCCESS = 'redux/GOODSRLEASE/GOODS_SALE_SUCCESS';
const GOODS_SALE_FAIL = 'redux/GOODSRLEASE/GOODS_SALE_FAIL';

//获取类目属性
const GOODS_BRAND = 'redux/GOODSRLEASE/GOODS_BRAND';
const GOODS_BRAND_SUCCESS = 'redux/GOODSRLEASE/GOODS_BRAND_SUCCESS';
const GOODS_BRAND_FAIL = 'redux/GOODSRLEASE/GOODS_BRAND_FAIL';

//获取单位
const GOODS_UNIT = 'redux/GOODSRLEASE/GOODS_UNIT';
const GOODS_UNIT_SUCCESS = 'redux/GOODSRLEASE/GOODS_UNIT_SUCCESS';
const GOODS_UNIT_FAIL = 'redux/GOODSRLEASE/GOODS_UNIT_FAIL';

//获取运营者
const GOODS_OPERATORS = 'redux/GOODSRLEASE/GOODS_OPERATORS';
const GOODS_OPERATORS_SUCCESS = 'redux/GOODSRLEASE/GOODS_OPERATORS_SUCCESS';
const GOODS_OPERATORS_FAIL = 'redux/GOODSRLEASE/GOODS_OPERATORS_FAIL';

//获取发布者
const GOODS_PUBLISHER = 'redux/GOODSRLEASE/GOODS_PUBLISHER';
const GOODS_PUBLISHER_SUCCESS = 'redux/GOODSRLEASE/GOODS_PUBLISHER_SUCCESS';
const GOODS_PUBLISHER_FAIL = 'redux/GOODSRLEASE/GOODS_PUBLISHER_FAIL';

const GOODS_SALEINFO_AFTER = 'redux/GOODSRLEASE/GOODS_SALEINFO_AFTER';
const GOODS_SALEINFO_AFTER_SUCCESS = 'redux/GOODSRLEASE/GOODS_SALEINFO_AFTER_SUCCESS';
const GOODS_SALEINFO_AFTER_FAIL = 'redux/GOODSRLEASE/GOODS_SALEINFO_AFTER_FAIL';

// 获取规格参数start
const CATEGORY_LOADING = 'redux/GOODSRLEASE/CATEGORY_LOADING';
const CATEGORY_SUCCESS = 'redux/GOODSRLEASE/CATEGORY_SUCCESS';
const CATEGORY_FAIL = 'redux/GOODSRLEASE/CATEGORY_FAIL';
// 获取规格参数end
const UPLOADPRAMAS = 'redux/GOODSRLEASE/UPLOADPRAMAS';
//发布新商品供货信息的sku
const UPLOADSALEDATA = 'redux/GOODSRLEASE/UPLOADSALEDATA';
const UPLOADSALEDATA_COMPLETE = 'redux/GOODSRLEASE/UPLOADSALEDATA_COMPLETE';
const UPLOADSALEDATA_FAIL = 'redux/GOODSRLEASE/UPLOADSALEDATA_FAIL';
//发布新商品供货信息的sku

//行业标签
const GOODS_INDUSTRY = 'redux/GOODSRLEASE/GOODS_INDUSTRY';
const GOODS_INDUSTRY_SUCCESS = 'redux/GOODSRLEASE/GOODS_INDUSTRY_SUCCESS';
const GOODS_INDUSTRY_FAIL = 'redux/GOODSRLEASE/GOODS_INDUSTRY_FAIL';

//清空所有数据
const GOODS_CLEAR = 'redux/GOODSRLEASE/CLEAR';

//存储临时表
const SAVECACHE = 'redux/GOODSRLEASE/SAVECACHE';
const SAVECACHE_SUCCESS = 'redux/GOODSRLEASE/SAVECACHE_SUCCESS';
const SAVECACHE_FAIL = 'redux/GOODSRLEASE/SAVECACHE_FAIL';

//获取临时表
const GETCACHE = 'redux/GOODSRLEASE/GETCACHE';
const GETCACHE_SUCCESS = 'redux/GOODSRLEASE/GETCACHE_SUCCESS';
const GETCACHE_FAIL = 'redux/GOODSRLEASE/GETCACHE_FAIL';

//存储单张图片的keys
const SINGLEIMGKEY='redux/GOODSRLEASE/SETSINGLEIMGKEY';


//删除临时表
const DELETECACHE = 'redux/GOODSRLEASE/DELETECACHE';
const DELETECACHE_SUCCESS = 'redux/GOODSRLEASE/DELETECACHE_SUCCESS';
const DELETECACHE_FAIL = 'redux/GOODSRLEASE/DELETECACHE_FAIL';

import {
	API_QUERYPLATFORMCATEGORYATTRIBUTEBYATTRID,
	API_QUERYSALEATTR,
	API_QUERYCATEGORYATTR,
	API_QUERYUNITBYCATEGORYID,
	API_QUERYPUBLISHUSER,
	API_QUERYALLADMINUSER,
	API_QUERYPLATFROMATTRIBUTELIST,
	API_INDUSTRY,
	API_SAVECACHE,
	API_GETCACHE,
	API_DELETECACHE,
  API_PUBLISHITEMBYEDIT
} from '../../modules/goodsrlease/Container/API';


const initialState = {
	loading: false,
	loaded: false,
	releasData:{},
	saleData:  [],
	brandData:  [],
	unitData:[],
	publisher: [],
	operators:[],
	saleInfoAfter: [],
	saleloaded: false,
	platformId: 2,
	itemPulishVO: {
		 "platformId":2,
		  "sellerId":-1,//运营平台-1
		  "shopId":-1, //运营平台-1
		  "operatorId":null,//运营人员id 未写发布人员
		  "publishuserId":null,
		  "itemName":"",//商品名称
		  "cid":null,//一级分类
		  "secondCid": null,//二级分类ID
		  "brandId":  null,//品牌ID
		  "weightUnit":  null,//单位
		  "origin": null,//商品产地
		  "addSource":1,//1运营平台 2供应商
		  "describeUrl": '',//商品详情
		  "operator":1,//1运营平台 2供应商
		  "categoryAttributes": '',  //商品类目属性keyId:valueId
		  //"specAttributes":'',  //规格参数属性串keyid:valueId:valueDesc;
		  "channelArr":[1,2,3,4,5,6],
		  "itemSaleInfoVo":{//销售方式
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "saleType":1,//1按单品2按总量
			    "initialMount":1,//起订数量
			    "deliveryCycle":3//交货周期
		  },
		  "itemDeliveryInfoVo":{//运费信息
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "deliveryType":1,//1包邮 2 运费到付
			    "homeDelivery":0//0不支持 1 支持
		  },"itemPictureVoList":[/*{
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "pictureUrl":"XXXXXX",//图片URL
			    "sortNumber":1,
			    "altImages":"CCCCCCC"//图片标签
		  }*/],"itemPicpdfManualVoList":[/*{
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "picpdfUrl":"CCCCCC", //pdf地址
			    "picpdfName":"SSSSSS" //名称
		  }*/],"itemAfterSaleVo":{//售后说明
			    "platformId":2,
			    "sellerId":-1,
			    "shopId":-1,
			    "refundService":1,//退货 1不允许退货 2 允许退货
			    "changeService":1, //换货
			    "refundDuration":7, //退货时长
			    "changeDuration":7, //换货时长
			    "repaireDuration":3 //质保时长
		  },"itemSkuPictureVoList":[/*{
				"platformId":2,
				"sellerId":-1,
				"shopId":-1,
				"attributes":"",//销售属性串
				"pictureUrl":"",//地址
				"sortNumber":1 //图片顺序
			}*/],"itemSkuVoList":[{//最后的SKU信息
				"platformId":2,
				"sellerId":-1,
				"shopId":-1,
				"attributes": '',
				"modelCode": '',//商品型号
				"barCode" :'' ,//商品条形码
				"productCode" :'', //商品货号
				"weight" : null, //商品毛重
				"skuStatus": 1,// sku 状态,1:有效;0:无效
				"weightUnit": 'g'
				}
			],"packingList":'',
			'cashCouponSupport': '1',  //是否支持代金券
			'meetCouponSupport':'1', //是否支持满减卷
			'vipDiscountSupport':'1' //是否支持vip折扣
	},
	saleMessage: [{
					key: 0 ,
					message: '',
					ifstop: false,
					Model: '',
					Number: '',
					Code: '',
					Weight:null,
					Unit: 'g',
					attributes: null,
					//action: <span style = {{cursor: 'pointer'}} key = {z } onClick = {() => {this.changeStatus(z);}}>启动</span>
				}],
	singleImgKeys:[]
};
export default function reducer(state = initialState, action = {}) {
	switch(action.type) {
		case GOODS_LOADING:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_LOAD_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		releasData: action.result
			};
		case GOODS_LOADING_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};

		//获取销售属性信息
		case GOODS_SALE:
			return {
				...state,
        		saleloading: true,
        		saleloaded: false
			};
		case GOODS_SALE_SUCCESS:
			return {
				...state,
        		saleloading: false,
        		saleloaded: true,
        		saleData: action.result.data
			};
		case GOODS_SALE_FAIL:
			return {
				...state,
        		saleloading: false,
        		saleloaded: true
			};
		//获取类目属性信息
		case GOODS_BRAND:
			return {
				...state,
        		brandloading: true,
        		brandloaded: false
			};
		case GOODS_BRAND_SUCCESS:
			return {
				...state,
        		brandloading: false,
        		brandloaded: true,
        		brandData: action.result.data
			};
		case GOODS_BRAND_FAIL:
			return {
				...state,
        		brandloading: false,
        		brandloaded: false
			};
		//获取计量单位
		case GOODS_UNIT:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_UNIT_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		unitData: action.result.data
			};
		case GOODS_UNIT_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};
		//获取发布者信息
		case GOODS_PUBLISHER:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_PUBLISHER_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		publisher: action.result
			};
		case GOODS_PUBLISHER_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};
		//获取运营者信息
		case GOODS_OPERATORS:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_OPERATORS_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		operators: action.result.data
			};
		case GOODS_OPERATORS_FAIL:
			return {
				...state,
        		loading: false,
        		loaded: false
			};
		case GOODS_SALEINFO_AFTER:
		     return {
		     	...state,
		     	loading: false,
        		saleloaded: false,
		     };
		case GOODS_SALEINFO_AFTER_SUCCESS:
		     return {
		     	...state,
		     	loading: false,
        		saleloaded: true,
        		saleData: action.data
		     }
		case GOODS_SALEINFO_AFTER_FAIL:
		     return {
		     	...state,
		     	loading: false,
        		saleloaded: false,
		     }
		case UPLOADPRAMAS:
			return {
		     	...state,
		     	loading: false,
        		loaded: true,
        		itemPulishVO: action.data
		     }
		//uploadsaledata
		case UPLOADSALEDATA:
			return {
		     	...state,
		     	loading: false,
        		saleMsgloaded: true,
        		saleMessage: action.data,
        		ifUp: action.ifUp
		     }
		case UPLOADSALEDATA_COMPLETE:
			return {
		     	...state,
		     	loading: false,
		     	saleMsgloaded: false,
		     	ifUp: action.data,
		     }
		case UPLOADSALEDATA_FAIL:
			return {
		     	...state,
		     	loading: false,
		     	saleMsgloaded: false,
		     }
		//uploadsaledata END
		case CATEGORY_LOADING:
			return {
				...state,
        		loading: true,
        		categoryloaded: false
			};
		case CATEGORY_SUCCESS:
			return {
				...state,
        		loading: false,
        		categoryloaded: true,
        		categoryData: action.result
			};
		case CATEGORY_FAIL:
			return {
				...state,
        		loading: false,
        		categoryloaded: false
			};
		//查看行业标签
		case GOODS_INDUSTRY:
			return {
				...state,
        		loading: true,
        		loaded: false
			};
		case GOODS_INDUSTRY_SUCCESS:
			return {
				...state,
        		loading: false,
        		loaded: true,
        		industryData: action.result
			};
		case GOODS_INDUSTRY_FAIL:
			return {
				...state,
        		loading: false,
        	};
        case GOODS_CLEAR:
			return {
				...state,
        		industryData: {data:[]},
        		categoryData: [],
        		saleData: [],
        		brandData: [],
        		unitData: [],
        		saleloaded:true,
        		categoryloaded: true,
        		brandloaded: true

        	};
        //存储临时数据
		case SAVECACHE:
			return {
				...state,
        		savecachloading: true,
        		savecachloaded: false
			};
		case SAVECACHE_SUCCESS:
			return {
				...state,
        		savecachloading: false,
        		savecachloaded: true,
        		savecachedata: action.result
			};
		case SAVECACHE_FAIL:
			return {
				...state,
        		savecachloading: false,
        	};
        //获取临时数据
		case GETCACHE:
			return {
				...state,
        		getcachloading: true,
        		getcachloaded: false
			};
		case GETCACHE_SUCCESS:
			return {
				...state,
        		getcachloading: false,
        		getcachloaded: true,
        		getcachedata: action.result
			};
		case GETCACHE_FAIL:
			return {
				...state,
        		getcachloading: false,
        	};
        //删除临时数据
		case DELETECACHE:
			return {
				...state,
        		getcachloading: true,
        		getcachloaded: false
			};
		case DELETECACHE_SUCCESS:
			return {
				...state,
        		getcachloading: false,
        		getcachloaded: true,
        		getcachedata: action.result
			};
		case DELETECACHE_FAIL:
			return {
				...state,
        		getcachloading: false,
			};
		//存储singleImgKeys
		case SINGLEIMGKEY:
			 return {
				...state,
        		singleImgKeys:action.singleImgKeys,
			 }
		default:
			return {
				...state,
			};
	}
}
export function getGoodsInfo(param){
		return {
			types: [GOODS_LOADING, GOODS_LOAD_SUCCESS, GOODS_LOADING_FAIL],
	    	promise: (client) => client.get(API_QUERYPLATFORMCATEGORYATTRIBUTEBYATTRID, {
	    		params: param
	    	})
		}
	}
//获取销售属性
// shopFlag
//url = shopFlag?'/item-service/platform/categoryAttribute/querySaleAttribute':'/item-service/platform/categoryAttribute/querySaleAttribute';
export function getSaleInfo(param, ifEdit){
		let url = null;
		if(ifEdit){
			url = '/item-service/platform/categoryAttribute/querySaleAttribute';
		}else{
			url = API_QUERYSALEATTR;
		}
		return {
			types: [GOODS_SALE, GOODS_SALE_SUCCESS, GOODS_SALE_FAIL],
	    	promise: (client) => client.get(url, {
	    		params: param
	    	})
		}
	}
//获取类目属性
export function getBrandInfo(param, ifEdit){
		let url = null;
		if(ifEdit){
			url = '/item/platform/categoryAttribute/queryCategoryAttrByEdit';
		}else{
			url = API_QUERYCATEGORYATTR;
		}
		return {
			types: [GOODS_BRAND, GOODS_BRAND_SUCCESS, GOODS_BRAND_FAIL],
	    	promise: (client) => client.get(url, {
	    		params: param
	    	})
		}
	}
//获取计量单位
export function getUnitInfo(param){
		return {
			types: [GOODS_UNIT, GOODS_UNIT_SUCCESS, GOODS_UNIT_FAIL],
	    	promise: (client) => client.get(API_QUERYUNITBYCATEGORYID, {
	    		params: param
	    	})
		}
	}

//获取发布者信息 //先写死
export function getPublisherInfo(param){
		return {
			types: [GOODS_PUBLISHER, GOODS_PUBLISHER_SUCCESS, GOODS_PUBLISHER_FAIL],
	    	promise: (client) => client.get(API_QUERYPUBLISHUSER)
		}
	}
//获取运营者信息
export function getOperatorInfo(param){
		return {
			types: [GOODS_OPERATORS, GOODS_OPERATORS_SUCCESS, GOODS_OPERATORS_FAIL],
	    	promise: (client) => client.get(API_QUERYALLADMINUSER, {
	    		params: param
	    	})
		}
	}
// 更改后属性信息
export function postSaleInfo(data){
		return {
			type: GOODS_SALEINFO_AFTER_SUCCESS,
	    	data: data
		}
	}
export function uploadPrams(data){
		return {
			type: UPLOADPRAMAS,
	    	data: data
		}
	}
export function uploadSaleMessage(data){
		return {
			type: UPLOADSALEDATA,
	    	data: data,
	    	ifUp: true
		}
	}
export function changeifUp(){
		return {
			type: UPLOADSALEDATA_COMPLETE,
	    	data: false,
		}
	}

  export function release(param,url){
	return {
			types: [GOODS_LOADING, GOODS_LOAD_SUCCESS, GOODS_LOADING_FAIL],
	    	promise: (client) => client.post(url, {
	    		//data: "itemPublishVo=" + JSON.stringify(param)
	    		data: param
	    	})
		}
	}
	// 同步商品到平台标准库
	export function syncLibrary(param,url){
	return {
			types: [GOODS_LIBRARY, GOODS_LIBRARY_SUCCESS, GOODS_LIBRARY_FAIL],
	    	promise : (client) => client.post(url, {
	    		//data: "itemPublishVo=" + JSON.stringify(param)
	    		data: param
	    	})
		}
	}
//规格参数数据获取
export function findCategory(param){
	return {
			types: [CATEGORY_LOADING, CATEGORY_SUCCESS, CATEGORY_FAIL],
	    	promise: (client) => client.post(API_QUERYPLATFROMATTRIBUTELIST, {
	    		//data: "itemPublishVo=" + JSON.stringify(param)
	    		data: param
	    	})
		}
	}
//获取行业标签
export function getIndustryInfo(param){
		return {
			types: [GOODS_INDUSTRY, GOODS_INDUSTRY_SUCCESS, GOODS_INDUSTRY_FAIL],
	    	promise: (client) => client.get(API_INDUSTRY, {
	    		params: param
	    	})
		}
	}
//清空所有数据
export function clearAllData(data){
		return {
			type: GOODS_CLEAR,
		}
	}
//上传临时表
export function postCacheTable(data){
		return {
			types: [SAVECACHE, SAVECACHE_SUCCESS, SAVECACHE_FAIL],
	    	promise: (client) => client.post(API_SAVECACHE, {
	    		data: data
	    	})
		}
	}
//获取销售临时表
export function getCacheTable(data){
		return {
			types: [GETCACHE, GETCACHE_SUCCESS, GETCACHE_FAIL],
	    	promise: (client) => client.post(API_GETCACHE, {
	    		data: data
	    	})
		}
	}
//删除销售临时表
export function deleteCacheTable(data){
		return {
			types: [DELETECACHE, DELETECACHE_SUCCESS, DELETECACHE_FAIL],
	    	promise: (client) => client.post(API_DELETECACHE, {
	    		data: data
	    	})
		}
	}
//存储图片ID值
export function setImgCacheTableKeys(data){
	return {
		type:SINGLEIMGKEY,
		singleImgKeys:data
	}
}
