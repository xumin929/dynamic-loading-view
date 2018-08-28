/* *********************************************
 * @author:       冯炎
 * @creatdDate:   20-180-126
 * @update:       20-180-126
 * @description:  发布商品、编辑商品参数整合封装
 * *********************************************/

export default class Parameters {
  constructor() {
    this.params = {
      id: -1,
      itemName: '',
      cid: -1,
      secondCid: -1,
      shopCid: -1,
      brandId: -1,
      brandName: '',
      origin: '',
      industryLabel: '',
      specAttributes: '',
      skuList: [{
        id: -1,
        saleAttributes: '',
        specAttributes: '',
        modelCode: '',
        barCode: '',
        productCode: '',
        skuStatus: -1,
        weight: -1,
        weightUnit: '',
        skuUnit: '',
        inventory: '',
        areaList: '',
        skuImgInfos: "[{url: '',alt: ''}]" //测试数据[{"url":"//b2b-v2.oss.cn-north-1.jcloudcs.com/eec779ea-64bb-443b-972c-5f3eaf9f5d51.jpg","alt":"测试数据"},{"url":"//b2b-v2.oss.cn-north-1.jcloudcs.com/eec779ea-64bb-443b-972c-5f3eaf9f5d51.jpg","alt":"测试数据"}]
      }],
      publishuserId: -1,
      operatorId: -1,
      itemImgInfos: "[{url: '',alt: ''}]",
      describeUrl: '',
      deliveryType: -1,
      homeDelivery: -1,
      initialMount: -1,
      deliveryCycle: -1,
      refundService: -1,
      refundDuration: -1,
      changeService: -1,
      changeDuration: -1,
      repaireDuration: -1,
      cashCouponSupport: -1,
      meetCouponSupport: -1,
      vipDiscountSupport: -1,
      packingList: '',
      annexs: "[{url: '',name: ''}]",
    };
  }

  getParamete(param) {
    if (param in this.params) {
      return this.params[param];
    }
  }

  setParamete(param, val) {
    if (param in this.params) {
      this.params[param] = val;
    }
  }
}
