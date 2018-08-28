
const TEST = 'GOODSRLEASE';
const GOODS_LOADING = 'redux/GOODSRLEASE/LOADING';
const GOODS_LOAD_SUCCESS = 'redux/GOODSRLEASE/LOAD_SUCCESS';
const GOODS_LOADING_FAIL = 'redux/GOODSRLEASE/LOADING_FAIL';

const params ={
    itemPicVoList: null,    // 商品图片信息格式"[{img: '',alt: ''}]"
}
// const params = {
//     id: null,   // 商品id
//     itemName: '',   // 商品名称
//     cid: null,    // 平台分类，也称作商品第一分类
//     secondCid: null,    // 商品第二分类
//     shopCid: null,    // 店铺分类
//     brandId: null,    // 品牌id
//     brandName: '',    // 品牌名称
//     origin: '',   // 商品产地
//     cNames: '',  // 类目回显
//     secondCNames: '',   //二级类目
//     skuUnit: null,   //单位，前端使用
//     industryLabel: '',    // 行业标签,多个标签以分号分隔
//     specAttributes: '',   // 销售属性串[{"aid":123,"vid":456,"desc":"abc"}]
//     itemPublishSkuParamsVo: [
//         {   // 商品sku列表
//             id: null,   // skuId
//             saleAttributes: null,   //  sku销售属性[{"aid":123,"aName":"品牌","vName":"大众","vid":456}]
//             specAttributes: null,    //  规格参数属性串[{"aid":123,"vid":456,"desc":"abc"}]
//             modelCode: '',    //  sku商品型号
//             barCode: '',    //  sku条形码
//             productCode: '',    //  sku货号
//             skuStatus: 1,    //  sku 状态,1:有效;0:无效
//             weight: null,   //   sku商品毛重
//             weightUnit: 'g',
//             skuUnit: '',   //  sku单位
//             inventory: '',    //  库存量
//             areaList: '',   //  区域 list 格式：[{"areaid":0,"areaName":"全国","supplyPrice":12.00},{"areaid":1,"areaName":"河南","supplyPrice":12.00}]
//             skuImgInfos: null    //  sku图片信息格式[{url: '',alt: ''}]
//         }
//     ],
//     publishuserId: null,    // 商品发布者ID
//     operatorId: null,   // 运营人员
//
//     describeUrl: '',    // 商品描述url，存在oss中
//     deliveryType: null,   // 运费信息 1、包邮 2、运费到付
//     homeDelivery: null,   // 同城送货上门，0、不支持 1、支持
//     initialMount: null,   // 最小起订量
//     deliveryCycle: null,    //  预计出货日
//     refundService: null,    // 退货类型 1、特殊商品不允许退货 2、允许退货
//     refundDuration: null,   // 退货时长 解释：确认收货后,多少日内可与卖家协商退货
//     changeService: null,    // 换货类型 1、特殊商品不允许换货 2、允许换货
//     changeDuration: null,   // 换货时长 解释：确认收货后,多少日内可与卖家协商换货
//     repaireDuration: null,    // 质保期限 (单位：月)
//     cashCouponSupport: null,    // 是否支持代金券
//     meetCouponSupport: null,    // 是否支持满减卷
//     vipDiscountSupport: null,   // 是否支持会员折扣
//     packingList: '',    // 包装清单
//     annexs: ''    // 商品附件格式"[{"url": '',"name":"商品手册.pdf"}]"
// };

export default function(state = params, action) {
    switch (action.type) {
        case TEST:
            state[action.param] = action.val;
            return {
                ...state,
            };
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
                loaded: true
            };
        case GOODS_LOADING_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false
            };

        default:
            return state;
    }
}

export function setParam(param, val) {
    return {
        type: TEST,
        param: param,
        val: val
    };
}



