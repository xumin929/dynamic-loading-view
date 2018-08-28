
//获取域名
const DOMAIN_CLASS_LOADING = 'redux/DOMAIN_CLASS_LOADING';
const DOMAIN_CLASS_SUCCESS = 'redux/DOMAIN_CLASS_SUCCESS';
const DOMAIN_CLASS_FAIL = 'redux/DOMAIN_CLASS_FAIL';

const DOMAIN_BRAND_LOADING = 'redux/DOMAIN_BRAND_LOADING';
const DOMAIN_BRAND_SUCCESS = 'redux/DOMAIN_BRAND_SUCCESS';
const DOMAIN_BRAND_FAIL = 'redux/DOMAIN_BRAND_FAIL';

const DOMAIN_GOODS_LOADING = 'redux/DOMAIN_GOODS_LOADING';
const DOMAIN_GOODS_SUCCESS = 'redux/DOMAIN_GOODS_SUCCESS';
const DOMAIN_GOODS_FAIL = 'redux/DOMAIN_GOODS_FAIL';

const DOMAIN_SPECIFICTION_LOADING = 'redux/DOMAIN_SPECIFICTION_LOADING';
const DOMAIN_SPECIFICTION_SUCCESS = 'redux/DOMAIN_SPECIFICTION_SUCCESS';
const DOMAIN_SPECIFICTION_FAIL = 'redux/DOMAIN_SPECIFICTION_FAIL';
export default function domain(state = {}, action = {}) {
	switch(action.type) {
//获取域名
		case DOMAIN_CLASS_LOADING:
			return {
				...state,
        		loading: true,
        		domainClassLoaded: false
			};
		case DOMAIN_CLASS_SUCCESS:
			return {
				...state,
        		loading: false,
            domainClassLoaded: true,
        		domainClassData: action.result
			};
		case DOMAIN_CLASS_FAIL:
			return {
				...state,
        		loading: false,
            domainClassLoaded: false
			};
    //获取域名
    case DOMAIN_BRAND_LOADING:
      return {
        ...state,
        loading: true,
        domainBrandLoaded: false
      };
    case DOMAIN_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        domainBrandLoaded: true,
        domainBrandData: action.result
      };
    case DOMAIN_BRAND_FAIL:
      return {
        ...state,
        loading: false,
        domainBrandLoaded: false
      };
    //获取域名
    case DOMAIN_GOODS_LOADING:
      return {
        ...state,
        loading: true,
        domainGoodsLoaded: false
      };
    case DOMAIN_GOODS_SUCCESS:
      return {
        ...state,
        loading: false,
        domainGoodsLoaded: true,
        domainGoodsData: action.result
      };
    case DOMAIN_GOODS_FAIL:
      return {
        ...state,
        loading: false,
        domainGoodsLoaded: false
      };
    //获取域名
    case DOMAIN_SPECIFICTION_LOADING:
      return {
        ...state,
        loading: true,
        domainSpecLoaded: false
      };
    case DOMAIN_SPECIFICTION_SUCCESS:
      return {
        ...state,
        loading: false,
        domainSpecLoaded: true,
        domainSpecData: action.result
      };
    case DOMAIN_SPECIFICTION_FAIL:
      return {
        ...state,
        loading: false,
        domainSpecLoaded: false
      };
		default:
			return {
				...state,
			};
	}
}
/**
* description:获取域名
*/
export function getClassDomainName(param){
		return {
			types: [DOMAIN_CLASS_LOADING, DOMAIN_CLASS_SUCCESS, DOMAIN_CLASS_FAIL],
	    	promise: (client) => client.get('/base/platform/template/queryByTemplateType', {
	    		params: param
	    	})
		}
	}
export function getBrandDomainName(param){
  return {
    types: [DOMAIN_BRAND_LOADING, DOMAIN_BRAND_SUCCESS, DOMAIN_BRAND_FAIL],
    promise: (client) => client.get('/base/platform/template/queryByTemplateType', {
      params: param
    })
  }
}
export function getGoodsDomainName(param){
  return {
    types: [DOMAIN_GOODS_LOADING, DOMAIN_GOODS_SUCCESS, DOMAIN_GOODS_FAIL],
    promise: (client) => client.get('/base/platform/template/queryByTemplateType', {
      params: param
    })
  }
}
export function getSpecDomainName(param){
  return {
    types: [DOMAIN_SPECIFICTION_LOADING, DOMAIN_SPECIFICTION_SUCCESS, DOMAIN_SPECIFICTION_FAIL],
    promise: (client) => client.get('/base/platform/template/queryByTemplateType', {
      params: param
    })
  }
}