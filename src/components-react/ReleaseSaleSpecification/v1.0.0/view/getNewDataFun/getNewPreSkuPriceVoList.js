
/**
 * 遍历已选的销售规格数据saleAttributeData，重新组合preSkuPriceVoList数据
 * 对比saleAttributeData与itemTmplPublishVo.preSkuPriceVoList
 * 已有的保留，没有的删除，新增的添加
 * 超出column列的数据不展示，少于column列的数据默认为空
 * @param preSkuPriceVoList ： 价格及库存/供货信息表格数据
 * @param saleAttributeData :  销售规格数据源
 * @return 新的销售信息表格数据源
 */
function getNewPreSkuPriceVoList(preSkuPriceVoList, saleAttributeData) {
    let combinedSaleAttributeData = getCombinedDataFromChecked(saleAttributeData); // 组合当前已选销售规格数据
    // 遍历旧sku数据，得到其attributes
    let skuAttributesData = [];
    preSkuPriceVoList.forEach((item) => {
        skuAttributesData.push(item.attributes || []);
    });

    let combineStrArr = changeToStrArray(combinedSaleAttributeData); // 已选规格数据 转换为 字符串数组
    let skuStrArr = changeToStrArray(skuAttributesData); // 已有sku列表数据 转换为 字符串数组

    let newPreSkuPriceVoList = []; // 对比后数据

    combineStrArr.forEach((item, index) => {
        let skuStrArr_index = skuStrArr.indexOf(item);
        if (skuStrArr_index >= 0) { // sku列表里数据已存在
            newPreSkuPriceVoList.push({
                ...preSkuPriceVoList[skuStrArr_index],
                "key": index
            });
        } else { // 新增数据
            newPreSkuPriceVoList.push({
                "areaPriceList": [{ 'areaId': 0, 'areaName': "全国", 'areaNumber': 1, 'supplyPrice': null }],
                "inventory": null, //常规备货、库存
                "supplyStatus": 1,
                "attributes": combinedSaleAttributeData[index],
                "key": index
            });
        }
    });

    // 添加默认数据
    if (newPreSkuPriceVoList.length <= 0) {
        newPreSkuPriceVoList.push({
            "areaPriceList": [{ 'areaId': 0, 'areaName': "全国", 'areaNumber': 1, 'supplyPrice': null }],
            "inventory": null, //常规备货、库存
            "supplyStatus": 1,
            "attributes": null,
            "key": 0
        });
    }
    return newPreSkuPriceVoList;
}

/**
 * 组合选中的销售规格数据
 * 销售规格最多只允许选择三种
 * @return  = 
 * [[
 *  {"aName":"颜值","aid":"175041","desc":"","vName":"101","vid":"330661"},
 *  {"aName":"大小","aid":"175041","desc":"","vName":"101","vid":"330661"}
 * ],[
 *  {"aName":"颜值","aid":"175042","desc":"","vName":"102","vid":"330662"},
 *  {"aName":"大小","aid":"175042","desc":"","vName":"102","vid":"330662"}
 * ]]
 */
function getCombinedDataFromChecked(saleAttributeData) {
    let two_array = [];

    // 每一种销售规格数据checked的数据组合成一个数组
    saleAttributeData.forEach((attrItem) => {
        let array = [];
        attrItem.platformCategoryAttributeValues.forEach((attrValueItem) => {
            if (attrValueItem.checked) {
                const checkedItem = {
                    aid: attrItem.attrId,
                    aName: attrItem.attrName,
                    vid: attrValueItem.attrValueId,
                    vName: attrValueItem.attrValueName
                }
                array.push(checkedItem);
            }
        });
        if (array.length > 0) {
            two_array.push(array);
        }
    });
    // two_array 二维数组，销售规格最多只允许选择三种，因此 length <= 3
    // two_array = [[{"aName":"颜值","aid":"1","desc":"","vName":"11","vid":"11"},{"aName":"颜值","aid":"1","desc":"","vName":"12","vid":"12"}], [{"aName":"大小","aid":"2","desc":"","vName":"21","vid":"22"}]]
    // two_array = [[{销售规格1+属性值对象}], [销售规格2数组], [销售规格3数组]]
    return doExchange(two_array);
}
/**
 * 转换对象二维数组为字符串一维数组
 * [[{aid:**, aName:**, vid:**,vName:**},{}],[{},{}]] => ['aid_vid,aid1_vid1','aid2_vid2'];
 */
function changeToStrArray(array) {
    let strArr = [];
    array.forEach((itemArr) => {
        let arr = [];
        itemArr.forEach((itemObj) => {
            arr.push(`${itemObj.aid}_${itemObj.vid}`);
        });
        strArr.push(arr.sort().toString());
    });
    return strArr;
}

// 二维数组的排列组合
function doExchange(doubleArrays) {
    var array = doubleArrays;
    var len = array.length;
    var results = [];
    var indexs = {};
    function specialSort(start) {
        start++;
        if (start > len - 1) {
            return;
        }
        if (!indexs[start]) {
            indexs[start] = 0;
        }
        if (!(array[start] instanceof Array)) {
            array[start] = [array[start]];
        }
        for (indexs[start] = 0; indexs[start] < array[start].length; indexs[start]++) {
            specialSort(start);
            if (start == len - 1) {
                var temp = [];
                for (var i = len - 1; i >= 0; i--) {
                    if (!(array[start - i] instanceof Array)) {
                        array[start - i] = [array[start - i]];
                    }
                    temp.push(array[start - i][indexs[start - i]]);
                }
                results.push(temp);
            }
        }
    }

    specialSort(-1);
    return results;
}

export default getNewPreSkuPriceVoList;