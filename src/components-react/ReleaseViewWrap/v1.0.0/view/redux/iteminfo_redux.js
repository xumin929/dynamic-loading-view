/**商品编辑回显redux */

const ITEM_INFO_LOADING = 'ITEM_INFO_LOADING';
const ITEM_INFO_SUCCESS = 'ITEM_INFO_SUCCESS';
const ITEM_INFO_FAIL = 'ITEM_INFO_FAIL';

//模拟回显的数据
const itemTmplPublishVo = {
    data: { //每一个小的vo都要先转成json
        "id": "1000002311",//商品id
        "shopId": null,//店铺id,
        "sellerId": null,//卖家id
        "itemName": "测试商品",//商品名称(必有，必填)
        "cid": 1076089,//平台分类（必有，必填）
        "cnames": "类目一,类目二", //类目回显用
        "secondCid": 100024,//平台第二分类ID(可选，已有)
        "secondCnames": "第二分类1,第二分类2,第二分类3,第二分类4", //第二类目回显用
        "shopCid":600014,//店铺分类ID(店铺模板可选，平台和供应商不需要，已有)
        "shopCnames":"店铺分类1,店铺分类2", //类目回显用,//店铺分类ID(可选，已有)
        "brandId": null,//品牌ID(可选，已有，如果选其他，brandId传-1，品牌名称不必填)
        "brandNameCh": "五粮液",
        "brandNameEn": "wuliangye",
        "origin": null,//商品产地(可选，已有)
        "channelArr": [1, 2, 3, 4, 5, 6],//渠道(可选，已有，PC端传6，移动端传1~5，待确认)
        "checkedAttributes": [], //[{attrId:10969,attrValueIds:[13204,13221]}], // 已勾选的销售属性 ,回显使用
        "industryLabel":'1231;2332;1321;',//行业标签（可选，已有）
        "itemTmplSkuVoList":[
        //     {'attributes':[
        //     {'aid': 10972, 'aName': "胎面宽度", 'vid': 13207, 'vName': "15 mm"}],
        //     'key':0,
        //     'skuStatus':1,
        //     'specAttributes':[{'aid': 10972, 'vid': 13207, 'desc': ""}],
        //     "extendSkuFields":[
        //         {label:'列字段1', value:'string'}, // filed为在config页面配置的英文名，config页面配置的中文名以及type类型只在渲染时候使用
        //         {label:'列字段1', value: 'image url string'},
        //         {
        //           label:'列字段1',
        //                                  value:` [{   name: "xxx.pdf",      url: "http://www.baidu.com/xxx.pdf"    }]` // 数组转为字符串保存在数据库中

        //         } 
        //  ]          
        // }
    ],
        "publishUserId": null,//商品发布信息(必填,不可选)
        "operatorId": null,//运营人员id 未写发布人员(可选,只有平台有，模块可选，选了之后必填)
        "itemPicVoList": [{ //(必有，必填)
            "url": "XXXXXX",//图片URL
            "alt": "CCCCCCC",//图片标签
        }, {
            "url": "XXXXXX",//图片URL
            "alt": "CCCCCCC",//图片标签
        }],
        "itemSkuPicVoList": [{
            "id": '',//skuId(已有)
            "attributes": null,//销售属性[{"aName":"职业",'aid':1,"vName":"吃饭", vid':5}](已有)
            "modelCode": '',//商品型号(已有)
            "productCode" :'', //商品物料号(已有)
            "barCode" :'' ,//商品条形码(已有)
            "weight" : null, //商品毛重(已有)
            "weightUnit": 'g',//毛重单位(与毛重绑定)
            "length" : null, //(可选，已有)
            "width" : null, //(可选，已有)
            "height" : null, //(可选，已有)
            "skuUnit":'',//sku单位(可选，已有)
            "skuStatus": 1,//停用启用操作(必选，默认启用) sku 状态,1:启用;0:停用
            "specAttributes":null,//规格参数 (可选)[{'aid':6,vid':71,desc:''},{'aid':8,vid':91,desc:''}],
            "extendSkuFields":[
                   {key:'filed', value:'string'}, // filed为在config页面配置的英文名，config页面配置的中文名以及type类型只在渲染时候使用
                   {key:'field', value: 'image url string'},
                   {
                     key:'filed',
                                            value:` [{   name: "xxx.pdf",      url: "http://www.baidu.com/xxx.pdf"    }]` // 数组转为字符串保存在数据库中

                   } 
             ]}],
        // "itemSkuPicVoList": [
        //     {//sku图片(选填，有sku就会有) sku分组上传的拆成一个一个的
        //         "attributes":null,//销售属性[{'aid':1,vid':2},{'aid':3,vid':4}](已有)
        //         "url":"XXXXXX",//地址
        //         "alt":"CCCCCCCCCC",//标签
        //     }
        // ],
        "describeUrl": '',//商品介绍(可选，可设必填)
        /**其他设置Tab选择加载后就要 必填，不支持定制，子模块也不支持定制 */
        "deliveryInfoVo": {//运费信息(可选,有默认值) 和下面的运费模板设置只可二选一
            "deliveryType": 1,//是否包邮 1包邮 2 运费到付
            "homeDelivery": 0//同城配送 0不支持 1 支持
        },
        "freightTmplVo": {//配送设置、运费模板设置(如果是店铺，不可定制，必选)
            "homeDelivery": 0,//同城配送 0不支持 1 支持
            "tmplId": '',//运费模板id(必填，有默认值，默认店铺)
            "hasPost": '0',// 商品是否支持快递发货：1：支持 0：不支持
            "hasSelfPick": 0,//商品是否支持自提：1：支持 0：不支持
        },
        "saleInfoVo": {//销售方式(可选，有默认值)
            "saleType": 1,//最小起订量 1按单品 2按总量
            "initialMount": 1,//起订数量(最小值1)
            "deliveryCycle": 3//交货周期(最小值1)
        },
        "afterSaleVo": {//售后说明
            "refundService": 2,//退货 1不允许退货 2 允许退货
            "changeService": 2, //换货
            "refundDuration": 7, //退货时长
            "changeDuration": 7, //换货时长
            "repaireDuration": 3 //质保时长
        },
        /**优惠支持 */ //(可选)
        "couponSupportVo": {
            'cashCouponSupport': '1', //是否支持代金券
            'meetCouponSupport': '1', //是否支持满减卷
            'vipDiscountSupport': '1', //是否支持vip折扣
        },
        /**其他信息 */ //(可选)
        "packingList": 'aaa',//包装清单
        "itemPicpdfVoList": [{//商品手册
            "uid":'1',
            "name": "自由在高处.pdf",//附件名称
            "url": "XXXXXX",//pdf地址
        }],
        /**价格及库存 供货信息 根据用户身份加载，店铺必选*/
        "itemPerfectVo": {
            "salePriceType": 1,//销售方式：1：正常销售(有报价)；2：询价模式(暂无报价)；3：分期付款
            "placeDeliveryId": ["109241"],//供货信息页发货地(有则必填)
            "preSkuPriceVoList": [{ //(必有，是否必填可配置) 
                "areaPriceList":[{'areaId': 0, 'areaName': "全国", 'areaNumber': 1, 'supplyPrice': "5"}],
                "inventory":1,//常规备货、库存
                "supplyStatus":1,//供货情况 0暂无供货 1正常供货  --供应商用到
                "attributes":[{'aid': 2641, 'aName': "型号千3", 'vid': 6547, 'vName': "M"}],//销售属性[{"aid":123,"vid":456}](已有)
                'labelPriceList':[{labelId:181,labelName:'分销商',labelPrice:100},{labelId:1045,labelName:"111111111111111111",labelPrice:200}],
                'isPrice':1,
            },{ //(必有，是否必填可配置) 
                "areaPriceList":[{'areaId': 0, 'areaName': "全国", 'areaNumber': 1, 'supplyPrice': "6"},{'supplyPrice': "7", 'areaId': "11", 'areaName': "北京市", 'areaNumber': 1}],
                "inventory":2,//常规备货、库存
                "supplyStatus":0,//供货情况 0暂无供货 1正常供货  --供应商用到
                "attributes":[{'aid': 2641, 'aName': "型号千3", 'vid': 6548, 'vName': "L"}],//销售属性[{"aid":123,"vid":456}](已有)
                'labelPriceList':[],
                'isPrice':0,
            }],
    
        },
        "extendFields": [
            { label: 'adText', value: 'aaa' },
            { label: 'adUrl', value: '//a.b.c' },
            { label: 'adColor', value: '#000' }
        ]
    }
}

export default function (state = { loaded:false }, action = {}) {
    switch (action.type) {
        case ITEM_INFO_LOADING:
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        case ITEM_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result
            };
        case ITEM_INFO_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true
            }
        default:
            return state;

    }
}

export function getItemInfoAction(type, params) {
    let url = '/item/platform/itemTmplPublish/queryItemInfo';
    if(type == 2){
        url = '/item/seller/itemTmplPublish/querySupplySellerItemInfo';
    } else if(type == 3){
        url = '/item/shop/itemTmplPublish/queryItemInfo';
    }
    return {
        types: [ITEM_INFO_LOADING, ITEM_INFO_SUCCESS, ITEM_INFO_FAIL],
        promise: (client) => client.get(url, {
            params: params
        })
    }
}
