/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20-180-126
 * @update:       王禹展(wyuzhan@163.com)
 * @description:  发布商品、编辑商品参数整合封装
 * *********************************************/
const TEST_PANE = 'AA_TEST_SPEC';
const TEST_SPEC = 'BB_TEST_SPEC';
const TEST_ITEM = 'CC_TEST_ITEM';
const TEST_LIST = 'DD_TEST_LIST';

//存储规格参数
const panelData = {
  skuData:[]
};

export default function (state = {panel: panelData, spec: [], item: [], list: []}, action) {
  switch (action.type) {
    case TEST_PANE:
      state.panel = action.val;
      return {
        ...state,
      };
    case TEST_SPEC:
      state.spec = action.val;
      return {
        ...state,
      };
    case TEST_ITEM:
      state.item = action.val;
      return {
        ...state,
      };
    case TEST_LIST:
      state.list = action.val;
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function setItemData(val) {
  return {
    type: TEST_ITEM,
    val: val
  };
}

export function setPanelData(val) {
  return {
    type: TEST_PANE,
    val: val
  };
}

export function setSpecData(val) {
  return {
    type: TEST_SPEC,
    val: val
  };
}

export function setListData(val) {
  return {
    type: TEST_LIST,
    val: val
  };
}