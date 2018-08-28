const itemTmplPublishVo = { //每一个小的vo都要先转成json
  "id": "1000002311",//商品id
  "shopId": null,//店铺id,
  "sellerId": null,//卖家id
  "itemName": "",//商品名称(必有，必填)
  "cid": 100014,//一级分类（必有，必填）
  "cidNames": "100011,100012,100013,100014", //类目回显用
  "secondCid": 100024,//二级分类ID(可选，已有)
  "secondCNames": "100021,100022,100023,100024", //第二类目回显用
  "shopCid": 600014,//店铺分类ID(可选，已有)
  "shopCidNames": "600011,600012,600013,600014", //类目回显用,//店铺分类ID(可选，已有)
  "brandId": null,//品牌ID(可选，已有)
  "brandNameCh": "五粮液",
  "brandNameEn": "wuliangye",
  "origin": null,//商品产地(可选，已有)
  "channelArr": [1, 2, 3, 4, 5, 6],//渠道(可选，已有)
  "industryLabel": '1231;2332;1321;',//行业标签（可选，已有）
  "itemTmplSkuVoList": [{//销售信息(可选)
    "id": '200001454',//skuId(已有)
    "attributes": null,//销售属性[{"aName":"颜值","aid":"17504","desc":"","vName":"10","vid":"33066"}](已有)
    "modelCode": '',//商品型号(已有)
    "productCode": '', //商品物料号(已有)
    "barCode": '',//商品条形码(已有)
    "weight": null, //商品毛重(已有)
    "weightUnit": 'g',//毛重单位(与毛重绑定)
    "length": null, //(可选，已有)
    "width": null, //(可选，已有)
    "height": null, //(可选，已有)
    "skuUnit": '',//sku单位(可选，已有)
    "skuStatus": 1,//停用启用操作(必选，默认启用) sku 状态,1:启用;0:停用
    "specAttributes": null,//规格参数 (可选)[{'aid':6,vid':7,desc:''},{'aid':8,vid':9,desc:''}] 
  }, {
    "id": '',//skuId(已有)
    "attributes": null,//销售属性[{'aid':1,vid':5},{'aid':3,vid':4}](已有)
    "modelCode": '',//商品型号(已有)
    "productCode": '', //商品物料号(已有)
    "barCode": '',//商品条形码(已有)
    "weight": null, //商品毛重(已有)
    "weightUnit": 'g',//毛重单位(与毛重绑定)
    "length": null, //(可选，已有)
    "width": null, //(可选，已有)
    "height": null, //(可选，已有)
    "skuUnit": '',//sku单位(可选，已有)
    "skuStatus": 1,//停用启用操作(必选，默认启用) sku 状态,1:启用;0:停用
    "specAttributes": null,//规格参数 (可选)[{'aid':6,vid':71,desc:''},{'aid':8,vid':91,desc:''}] 
  }],
  "publishUserId": null,//商品发布信息(必填,不可选)
  "operatorId": null,//运营人员id 未写发布人员(可选)
  "itemPicVoList": [{ //(必有，必填)
    "name": "",//附件名称
    "url": "XXXXXX",//图片URL
    "alt": "CCCCCCC",//图片标签
    "sortNumber": 1,//图片顺序，按上传时间排序
  }, {
    "name": "",//附件名称
    "url": "XXXXXX",//图片URL
    "alt": "CCCCCCC",//图片标签
    "sortNumber": 2,//图片顺序，按上传时间排序
  }],
  "itemSkuPicVoList": [{//sku图片(选填，有sku就会有) sku分组上传的拆成一个一个的
    "name": "sku图片-1",//附件名称
    "attributes": null,//销售属性[{'aid':1,vid':2},{'aid':3,vid':4}](已有)
    "url": "",//地址
    "alt": "",//标签
    "sortNumber": 1 //图片顺序
  }, {
    "name": "sku图片-2",//附件名称
    "attributes": null,//销售属性[{'aid':1,vid':2},{'aid':3,vid':4}](已有)
    "url": "",//地址
    "alt": "",//标签
    "sortNumber": 2 //图片顺序
  }],
  "describeUrl": '',//商品介绍(可选，可设必填)
  /**其他设置Tab选择加载后就要必填 */
  "deliveryInfoVo": {//运费信息(可选,有默认值) 和下面的运费模板设置只可二选一
    "deliveryType": 1,//是否包邮 1包邮 2 运费到付
    "homeDelivery": 0//同城配送 0不支持 1 支持
  },
  "freightTmplVo": {//配送设置、运费模板设置(可选) 
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
  "packingList": '',//包装清单
  "itemPicpdfVoList": [{//商品手册
    "name": "自由在高处.pdf",//附件名称
    "url": "XXXXXX",//pdf地址
  }],
  /**价格及库存 供货信息 */
  "itemPerfectVo": {
    "placeDeliveryId": null,//供货信息页发货地(有则必填)
    "preSkuPriceVoList": [{ //(必有，是否必填可配置) 


      "areaPriceList": [{
        "areaId": "0",
        "areaName": "全国",
        "areaNumber": 1,//地域价序号
        "supplyPrice": "3.00",
      }, {
        "areaId": "11",
        "areaName": "北京",
        "areaNumber": 2,
        "supplyPrice": "4.00",
      }],
      "skuId": 1000012221,
      "inventory": 2,//常规备货、库存
      "supplyStatus": 1,//供货情况 0暂无供货 1正常供货
      "attributes": null,//销售属性[{"aid":123,"vid":456}](已有)
    }]
  }
}