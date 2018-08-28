/** 重置数据 */

//初始化保存的数据
const itemTmplPublishVo = {//每一个小的vo都要先转成json
      "id": null,//商品id
      "shopId": null,//店铺id
      "sellerId": null,//卖家id
      "itemName": null,//商品名称(必有，必填)
      "cid": null,//一级分类（必有，必填）
      "secondCid": null,//二级分类ID(可选)
      "shopCid":null,//店铺分类ID(可选)
      "brandId": null,//品牌ID(可选)
      "brandNameCh": null,//中文品牌名称
      "brandNameEn": null,//英文品牌名称
      "origin": null,//商品产地(可选)
      "channelArr":[1,2,3,4,5,6],//渠道(可选，pc传6，移动端传1~5)
      "checkedAttributes": [], // [{attrId:1,attrValueIds:[1223,3434,1232,]}], // 已勾选的销售属性 [{attrId:1,attrValueIds:[1223,3434,1232,]},{attrId:1,attrValueIds:[1223,3434,1232,]}]
      "industryLabel":null,//行业标签 '1231;2332;1321;'（可选）
      "itemTmplSkuVoList":[{//销售信息sku列表(可选)
          "attributes": null,//销售属性[{"aName":"颜值","aid":"17504","desc":null,"vName":"10","vid":"33066"}, {"aName":"颜值","aid":"17504","desc":null,"vName":"10","vid":"33066"}]
          "modelCode": null,//商品型号
          "productCode" :null, //商品物料号
          "barCode" :null ,//商品条形码
          "weight" : null, //商品毛重
          "weightUnit": 'g',//毛重单位(与毛重绑定)
          "length" : null, //(可选)
          "width" : null, //(可选)
          "height" : null, //(可选)
          "skuUnit":null,//sku单位(可选)
          "skuStatus": 1,//停用启用操作(必选，默认启用) sku 状态,1:启用;0:停用
          "specAttributes":null,//规格参数 (可选)[{'aid':6,vid':7,desc:null},{'aid':8,vid':9,desc:null}]
        }
      ],
      "publishUserId": null,//商品发布信息(必填,不可选)
      "operatorId": null,//运营人员id 未写发布人员(可选，只有平台有且必填)
      "itemPicVoList": [],
      "itemSkuPicVoList": [],
      "describeUrl": null,//商品介绍(可选，可设必填)
      /**其他设置Tab  必有*/
      "deliveryInfoVo": {//运费信息(可选,有默认值)  和下面的运费模板设置只可二选一
        "deliveryType": 1,//是否包邮  1包邮 2 运费到付
        "homeDelivery": 0//同城配送  0不支持 1 支持
      },
      "freightTmplVo":{//配送设置、运费模板设置(可选，店铺必有且必填)
        "homeDelivery": 0,//同城配送  0不支持 1 支持
        "tmplId":null,//运费模板id(必填，有默认值，默认店铺)
        "hasPost":1,// 商品是否支持快递发货：1：支持  0：不支持
        "hasSelfPick": 0,//商品是否支持自提：1：支持  0：不支持
      },
      "saleInfoVo": {//销售方式(可选，有默认值)
        "saleType": 1,//最小起订量  1按单品 2按总量
        "initialMount": 1,//起订数量(最小值1)
        "deliveryCycle": 3//交货周期(最小值1)
      },
      "afterSaleVo": {//售后说明
        "refundService": 2,//退货 1不允许退货 2 允许退货
        "changeService": 2, //换货
        "refundDuration": 7, //退货时长
        "changeDuration": 15, //换货时长
        "repaireDuration": 3 //质保时长
      },
      /**优惠支持 */ //(可选)
      "couponSupportVo":{
        'cashCouponSupport': 1,  //是否支持代金券
        'meetCouponSupport':1, //是否支持满减卷
        'vipDiscountSupport':1, //是否支持vip折扣
      },
      /**其他信息 */
      "packingList": null,//包装清单
      "itemPicpdfVoList": [],//商品手册
      /**价格及库存 供货信息 */
      "itemPerfectVo":{
        "salePriceType": 1,//销售方式：1：正常销售(有报价)；2：询价模式(暂无报价)；3：分期付款
        "placeDeliveryId":null,//供货信息页发货地(有则必填)
        "preSkuPriceVoList":[{ //(必有，是否必填可配置) 
          "areaPriceList":[{'areaId': 0, 'areaName': "全国", 'areaNumber': 1, 'supplyPrice': null}],
          "labelPriceList":[],
          "inventory":null,//常规备货、库存
          "supplyStatus":1,//供货情况 0暂无供货 1正常供货  --供应商用到
          "attributes":null,//销售属性[{"aid":123,"vid":456}](已有)
          "isPrice":0,
        }]
    },
      "extendFields": [
        { label: 'adText', value: null },
        { label: 'adUrl', value: null },
        { label: 'adColor', value: null }
      ],
};

export default function () {
    return itemTmplPublishVo;
}

