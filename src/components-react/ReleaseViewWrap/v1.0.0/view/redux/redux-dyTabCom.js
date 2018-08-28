const LOAD = 'RELEASE/TABS-DYCOMPONENTS/LOAD';
const LOAD_SUCCESS = 'RELEASE/TABS-DYCOMPONENTS/LOAD_SUCCESS';
const LOAD_FAIL = 'RELEASE/TABS-DYCOMPONENTS/LOAD_FAIL';


export default function (state = { loaded: false }, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        components: { ...action.result.data },
        loading: false,
        loaded: true
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function loadTabComponents(values) {
  let url = '';
  url = '/module-manage-service/operating/component/hookComponentListByPageUrl';
  // url = 'http://shop.eureka3.com/proxy1/findTabsCom.json'; //模拟json
  var params = {
    pageUrl: "/operating-item-view/product-release?template=" + values.templateId
  };
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(url, { params: params })
  };
}
