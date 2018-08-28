/**
 * @good-release interface type
 * @author liuyang
 */
//运营商发布产品
export const API_BUSINESSITEMPUBLISH = 'item/platform/itemPublish/businessItemPublish'
export const API_BUSINESSITEMSAVE = 'item/platform/itemPublish/businessItemSave'
export const API_PUBLISHITEMBYEDIT = 'item/platform/itemPublish/publishItemByEdit'
export const API_SAVEITEMBYBUSINESS = 'item/platform/itemPublish/saveItemByBusiness'
export const API_SAVEITEMBYAUDIT = 'item/platform/itemPublish/saveItemByAudit'
//运营商品发布end
// 同步商品到平台标准库
export const API_SYNC_GOODS_TO_LIBRARY = 'item/platform/itemPublish/addPlatformItemByEdit'

export const API_QUERYPLATFORMCATEGORYATTRIBUTEBYATTRID = '/item/platform/categoryAttribute/queryPlatformCategoryAttributeByAttrID'
export const API_QUERYSALEATTR = '/item/platform/categoryAttribute/querySaleAttr'
export const API_QUERYCATEGORYATTR = '/item/platform/categoryAttribute/queryCategoryAttr'
export const API_QUERYUNITBYCATEGORYID = '/item/platform/category/queryUnitByCategoryId'
export const API_QUERYPUBLISHUSER = '/platform-passport/platform/Login/queryLoginInfo'
export const API_QUERYALLADMINUSER = '/platform-passport/user/queryAllAdminUser'
export const API_QUERYPLATFROMATTRIBUTELIST = '/item/platform/categoryAttribute/queryAttributeList'
export const API_INDUSTRY = '/item/platform/tags/getItemTagByCategory'

//临时表处理
export const API_SAVECACHE = '/item/platform/itemPublish/batchSaveTempCacheAttributesValues'
export const API_GETCACHE = '/item/platform/itemPublish/batchGetTempCacheAttributesValues'
export const API_DELETECACHE = '/item/platform/itemPublish/batchDeleteTempCacheAttributesValues'


