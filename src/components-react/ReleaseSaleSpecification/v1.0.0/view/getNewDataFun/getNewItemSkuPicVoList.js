/**
 * 遍历已选的销售规格数据saleAttributeData，重新组合itemSkuPicVoList数据
 * 对比saleAttributeData与itemTmplPublishVo.itemSkuPicVoList
 * 不在saleAttributeData里的url ,alt不展示
 * @param itemSkuPicVoList ： 已存在sku商品图片
 * @param saleAttributeData :  销售规格数据源
 * @return 新的图片信息表格数据源
 */

function getNewItemSkuPicVoList(itemSkuPicVoList, saleAttributeData) {
    let combinedSaleAttributeData = getCombinedDataFromChecked(saleAttributeData); // 组合已选销售规格数据
    let skuAttributesData = [];
    itemSkuPicVoList.forEach((item) => {
        skuAttributesData.push(item.attributes || []);
    });
    let newItemlSkuVoList = [];
    combinedSaleAttributeData.forEach((item, index) => {
        var old_index = getEqualIndex(skuAttributesData,item);
        if(old_index >=0){
            newItemlSkuVoList.push(itemSkuPicVoList[old_index]);
        }else{
            newItemlSkuVoList.push({
                "attributes": combinedSaleAttributeData[index],
                "url":"",
                "alt":""
            });
        }
    });
    return newItemlSkuVoList;
}
/**
//对比选中的销售规格与之前保存的销售规格，并保存下标。
 */
function  getEqualIndex(skuAttributesData,item){
    let index = -1;
    let newItem = changeToStrArray(item);

    if(skuAttributesData.length>0) {
        skuAttributesData.length > 0 && skuAttributesData.map((result, i) => {
           let newResult = changeToStrArray(result);
          if (JSON.stringify(newItem) == JSON.stringify(newResult)) {
                index = i;
          }
        })
    }
    return index;
}


/**
 * 转换对象
 * [{aid:**, aName:**, vid:**,vName:**},{}] => [{aid:"",vid:""}];
 */
function changeToStrArray(array) {
  let strArr = [];
  array.forEach((itemArr) => {
    strArr.push({
      aid:itemArr.aid.toString(),
      vid:itemArr.vid.toString()
    });
  });
  return strArr;
}
/**
 * 组合选中的销售规格数据
 */
function getCombinedDataFromChecked(saleAttributeData) {
    let two_array = [];
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
    return doExchange(two_array);
}
/**
 * // 二维数组的排列组合
 **/

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
export default getNewItemSkuPicVoList;






