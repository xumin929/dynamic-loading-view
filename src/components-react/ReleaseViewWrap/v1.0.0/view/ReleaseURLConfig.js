/**
 * @author chenyanhua
 * @dateTime 20180724
 * @file 店铺、供应商、运营平台接口合集
 */
module.exports = {
    common:{
        1:['name', 'ad', 'startTime', 'endTime', "areaList","shopPromotionLevels","shopPromotionChannels","personList"],
        2:[],
        3:['limitType']
    },
    //** 满减 **//
    type_1: {
        1:[],
        2:[{name:'meetPrice',type:'loop'},{name:'discountPercent',type:'loop'}],
    },
};
