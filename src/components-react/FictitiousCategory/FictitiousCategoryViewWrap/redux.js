/**
 * Created by likaiwen on 2017/5/22.
 */
//查询一级分类导航列表信息
const FICTITIOUS_CATEGORY_ONE_LOADING = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_ONE/FICTITIOUS_CATEGORY_ONE_LOADING';
const FICTITIOUS_CATEGORY_ONE_SUCCESS = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_ONE/FICTITIOUS_CATEGORY_ONE_SUCCESS';
const FICTITIOUS_CATEGORY_ONE_FAIL = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_ONE/FICTITIOUS_CATEGORY_ONE_FAIL';

//查询二级分类导航列表信息
const FICTITIOUS_CATEGORY_TWO_LOADING = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_TWO/FICTITIOUS_CATEGORY_TWO_LOADING';
const FICTITIOUS_CATEGORY_TWO_SUCCESS = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_TWO/FICTITIOUS_CATEGORY_TWO_SUCCESS';
const FICTITIOUS_CATEGORY_TWO_FAIL = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_TWO/FICTITIOUS_CATEGORY_TWO_FAIL';

//查询三级分类导航列表信息
const FICTITIOUS_CATEGORY_THREE_LOADING = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_THREE/FICTITIOUS_CATEGORY_THREE_LOADING';
const FICTITIOUS_CATEGORY_THREE_SUCCESS = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_THREE/FICTITIOUS_CATEGORY_THREE_SUCCESS';
const FICTITIOUS_CATEGORY_THREE_FAIL = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_THREE/FICTITIOUS_CATEGORY_THREE_FAIL';

//上移/下移选中导航
const FICTITIOUS_CATEGORY_MOVE_LOADING = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_MOVE/FICTITIOUS_CATEGORY_MOVE_LOADING';
const FICTITIOUS_CATEGORY_MOVE_SUCCESS = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_MOVE/FICTITIOUS_CATEGORY_MOVE_SUCCESS';
const FICTITIOUS_CATEGORY_MOVE_FAIL = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_MOVE/FICTITIOUS_CATEGORY_MOVE_FAIL';

//添加分类导航
const FICTITIOUS_CATEGORY_ADD_LOADING = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_ADD/FICTITIOUS_CATEGORY_ADD_LOADING';
const FICTITIOUS_CATEGORY_ADD_SUCCESS = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_ADD/FICTITIOUS_CATEGORY_ADD_SUCCESS';
const FICTITIOUS_CATEGORY_ADD_FAIL = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_ADD/FICTITIOUS_CATEGORY_ADD_FAIL';

//删除分类导航
const FICTITIOUS_CATEGORY_DELETE_LOADING = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_DELETE/FICTITIOUS_CATEGORY_DELETE_LOADING';
const FICTITIOUS_CATEGORY_DELETE_SUCCESS = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_DELETE/FICTITIOUS_CATEGORY_DELETE_SUCCESS';
const FICTITIOUS_CATEGORY_DELETE_FAIL = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_DELETE/FICTITIOUS_CATEGORY_DELETE_FAIL';

//修改分类导航
const FICTITIOUS_CATEGORY_UPDATE_LOADING = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_UPDATE/FICTITIOUS_CATEGORY_UPDATE_LOADING';
const FICTITIOUS_CATEGORY_UPDATE_SUCCESS = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_UPDATE/FICTITIOUS_CATEGORY_UPDATE_SUCCESS';
const FICTITIOUS_CATEGORY_UPDATE_FAIL = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_UPDATE/FICTITIOUS_CATEGORY_UPDATE_FAIL';

//隐藏/显示分类导航
const FICTITIOUS_CATEGORY_SHOW_LOADING = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_SHOW/FICTITIOUS_CATEGORY_SHOW_LOADING';
const FICTITIOUS_CATEGORY_SHOW_SUCCESS = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_SHOW/FICTITIOUS_CATEGORY_SHOW_SUCCESS';
const FICTITIOUS_CATEGORY_SHOW_FAIL = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_SHOW/FICTITIOUS_CATEGORY_SHOW_FAIL';

//保存查询参数
const FICTITIOUS_CATEGORY_DATA = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_DATA';
const FICTITIOUS_CATEGORY_CLEAR_DATA = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_CLEAR/FICTITIOUS_CATEGORY_CLEAR_DATA'

//查询发布
const FICTITIOUS_CATEGORY_SEARCH_PUBLISH_LOADING = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_SEARCH_PUBLISH/FICTITIOUS_CATEGORY_PUBLISH_SEARCH_LOADING';
const FICTITIOUS_CATEGORY_SEARCH_PUBLISH_SUCCESS = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_SEARCH_PUBLISH/FICTITIOUS_CATEGORY_PUBLISH_SEARCH_SUCCESS';
const FICTITIOUS_CATEGORY_SEARCH_PUBLISH_FAIL = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_SEARCH_PUBLISH/FICTITIOUS_CATEGORY_PUBLISH_SEARCH_FAIL';

//发布
const FICTITIOUS_CATEGORY_PUBLISH_LOADING = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_PUBLISH/FICTITIOUS_CATEGORY_PUBLISH_LOADING';
const FICTITIOUS_CATEGORY_PUBLISH_SUCCESS = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_PUBLISH/FICTITIOUS_CATEGORY_PUBLISH_SUCCESS';
const FICTITIOUS_CATEGORY_PUBLISH_FAIL = 'FICTITIOUS_CATEGORY/FICTITIOUS_CATEGORY_PUBLISH/FICTITIOUS_CATEGORY_PUBLISH_FAIL';

//3级分类导航查询所有商品分类
const FICTITIOUS_CATEGORY3_LOADING = 'Nav3AddBox/FICTITIOUS_CATEGORY3_LOADING'
const FICTITIOUS_CATEGORY3_FAIL = 'Nav3AddBox/FICTITIOUS_CATEGORY3_FAIL'
const FICTITIOUS_CATEGORY3_SUCCESS = 'Nav3AddBox/FICTITIOUS_CATEGORY3_SUCCESS'

//3级分类导航查询所有行业标签
const FICTITIOUS_CATEGORY3_LABEL_LOADING = 'Nav3AddBox/FICTITIOUS_CATEGORY3_LABEL_LOADING'
const FICTITIOUS_CATEGORY3_LABEL_FAIL = 'Nav3AddBox/FICTITIOUS_CATEGORY3_LABEL_FAIL'
const FICTITIOUS_CATEGORY3_LABEL_SUCCESS = 'Nav3AddBox/FICTITIOUS_CATEGORY3_LABEL_SUCCESS'

//3级分类导航查询编辑过的回显数据
const FICTITIOUS_CATEGORY3_EDIAED_LOADING = 'Nav3AddBox/FICTITIOUS_CATEGORY3_EDIAED_LOADING'
const FICTITIOUS_CATEGORY3_EDITED_FAIL = 'Nav3AddBox/FICTITIOUS_CATEGORY3_EDITED_FAIL'
const FICTITIOUS_CATEGORY3_EDITED_SUCCESS = 'Nav3AddBox/FICTITIOUS_CATEGORY3_EDITED_SUCCESS'
const FICTITIOUS_CATEGORY3_EDITED_INITIAL = 'Nav3AddBox/FICTITIOUS_CATEGORY3_EDITED_INITIAL'

const FICTITIOUS_CHANGE_CATEGORY3ARR = 'Nav3AddBox/FICTITIOUS_CHANGE_CATEGORY3ARR'

//设置三级分类导航数据关联类型
const FICTITIOUS_CATEGORY3_EDIAED_AssociationType = 'Nav3AddBox/FICTITIOUS_CATEGORY3_EDIAED_AssociationType'



//3级分类导航的修改/新增
const FICTITIOUS_CATEGORY3_UPDATE_ADD_LOADING = 'Nav3AddBox/FICTITIOUS_CATEGORY3_UPDATE_ADD_LOADING'
const FICTITIOUS_CATEGORY3_UPDATE_ADD_FAIL = 'Nav3AddBox/FICTITIOUS_CATEGORY3_UPDATE_ADD_FAIL'
const FICTITIOUS_CATEGORY3_UPDATE_ADD_SUCCESS = 'Nav3AddBox/FICTITIOUS_CATEGORY3_UPDATE_ADD_SUCCESS'


export default function (state = {
  loading: false,
  category3AssociateObj: {},
  category3edited: [],
  category3Label: {data: {result: []}},
  category3FlattenArray:[]
}, action = {}) {
  switch (action.type) {
    //查询一级分类导航列表信息
    case FICTITIOUS_CATEGORY_ONE_LOADING:
      return {
        ...state,
        oneLoading: true,
        oneLoaded: false
      };
    case FICTITIOUS_CATEGORY_ONE_SUCCESS:
      return {
        ...state,
        oneLoading: false,
        oneLoaded: true,
        oneData: action.result
      };
    case FICTITIOUS_CATEGORY_ONE_FAIL:
      return {
        ...state,
        oneLoading: false,
        oneLoaded: true,
        error: action.msg
      };
    //查询二级分类导航列表信息
    case FICTITIOUS_CATEGORY_TWO_LOADING:
      return {
        ...state,
        twoLoading: true,
        twoLoaded: false
      };
    case FICTITIOUS_CATEGORY_TWO_SUCCESS:
      return {
        ...state,
        twoLoading: false,
        twoLoaded: true,
        twoData: action.result
      };
    case FICTITIOUS_CATEGORY_TWO_FAIL:
      return {
        ...state,
        twoLoading: false,
        twoLoaded: true,
        error: action.msg
      };
    //查询三级分类导航列表信息
    case FICTITIOUS_CATEGORY_THREE_LOADING:
      return {
        ...state,
        threeLoading: true,
        threeLoaded: false
      };
    case FICTITIOUS_CATEGORY_THREE_SUCCESS:
      return {
        ...state,
        threeLoading: false,
        threeLoaded: true,
        threeData: action.result
      };
    case FICTITIOUS_CATEGORY_THREE_FAIL:
      return {
        ...state,
        threeLoading: false,
        threeLoaded: true,
        error: action.msg
      };

    //上移/下移选中导航
    case FICTITIOUS_CATEGORY_MOVE_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false
      }
    case FICTITIOUS_CATEGORY_MOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        moveData: action.result
      };
    case FICTITIOUS_CATEGORY_MOVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    //添加分类导航
    case FICTITIOUS_CATEGORY_ADD_LOADING:
      return {
        ...state,
        addLoading: true,
        addLoaded: false,
      }
    case FICTITIOUS_CATEGORY_ADD_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addLoaded: true,
        addData: action.result
      };
    case FICTITIOUS_CATEGORY_ADD_FAIL:
      return {
        ...state,
        addLoading: false,
        addLoaded: true,
        error: action.msg
      };
    //删除分类导航
    case FICTITIOUS_CATEGORY_DELETE_LOADING:
      return {
        ...state,
      }
    case FICTITIOUS_CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        deleteData: action.result
      };
    case FICTITIOUS_CATEGORY_DELETE_FAIL:
      return {
        ...state,
        error: action.msg
      };
    //修改分类导航
    case FICTITIOUS_CATEGORY_UPDATE_LOADING:
      return {
        ...state,
      }
    case FICTITIOUS_CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
        updateData: action.result
      };
    case FICTITIOUS_CATEGORY_UPDATE_FAIL:
      return {
        ...state,
        error: action.msg
      };
    //隐藏/显示分类导航
    case FICTITIOUS_CATEGORY_SHOW_LOADING:
      return {
        ...state,
      }
    case FICTITIOUS_CATEGORY_SHOW_SUCCESS:
      return {
        ...state,
        showData: action.result
      };
    case FICTITIOUS_CATEGORY_SHOW_FAIL:
      return {
        ...state,
        error: action.msg
      };
    //保存查询参数
    case FICTITIOUS_CATEGORY_DATA:
      return {
        ...state,
        searchData: action.data
      }
    //清除第三分类数据
    case FICTITIOUS_CATEGORY_CLEAR_DATA:
      return {
        ...state,
        threeData: action.data
      }
    //查询发布
    case FICTITIOUS_CATEGORY_SEARCH_PUBLISH_LOADING:
      return {
        ...state,
      };
    case FICTITIOUS_CATEGORY_SEARCH_PUBLISH_SUCCESS:
      return {
        ...state,
        pubData: action.result
      };
    case FICTITIOUS_CATEGORY_SEARCH_PUBLISH_FAIL:
      return {
        ...state,
        error: action.msg
      };
    //发布
    case FICTITIOUS_CATEGORY_PUBLISH_LOADING:
      return {
        ...state,
      };
    case FICTITIOUS_CATEGORY_PUBLISH_SUCCESS:
      return {
        ...state,
        pubData: action.result
      };
    case FICTITIOUS_CATEGORY_PUBLISH_FAIL:
      return {
        ...state,
        error: action.msg
      };

    case FICTITIOUS_CATEGORY3_LOADING:
      return {
        ...state,
        category3classifyloading: true,
        loaded: false,
      }
    case FICTITIOUS_CATEGORY3_SUCCESS:
    {
      const flatten = (data) => {
        data = data || []
        return data.reduce((arr, {categoryName, parentCid, cid, lev, children}) =>{
          children=children||[]
          return arr.concat([{categoryName, parentCid, cid, lev,childs:children.map(item=>item.cid)}], flatten(children))
        }, [])
      }
      const associate = (data) => {
        data = data || []
        return data.reduce((obj, v) => {
          obj[v.cid] = v;
          return obj;
        }, {});
      }
      //扁平化（数组）
      const category3FlattenArray = flatten(action.result.data|| [])
      //关联数组（对象）
      const category3AssociateObj = associate(category3FlattenArray)
      return {
        ...state,
        category3classifyloading: false,
        loaded: true,
        category3FlattenArray,
        category3AssociateObj
      };
    }

    case FICTITIOUS_CATEGORY3_FAIL:
      return {
        ...state,
        category3classifyloading: false,
        loaded: false,
        error: action.msg
      };

    case FICTITIOUS_CATEGORY3_LABEL_LOADING:
      return {
        ...state,
        category3labelloading: true
      }
    case FICTITIOUS_CATEGORY3_LABEL_SUCCESS:
      return {
        ...state,
        category3labelloading: false,
        loaded: true,
        category3Label: action.result
      };
    case FICTITIOUS_CATEGORY3_LABEL_FAIL:
      return {
        ...state,
        category3labelloading: false,
        loaded: false,
        error: action.msg
      };

    case FICTITIOUS_CATEGORY3_EDIAED_LOADING:
      return {
        ...state,
      }
    case FICTITIOUS_CATEGORY3_EDITED_SUCCESS:
    {
      const category3edited=action.result.data
      const   {category3FlattenArray, category3AssociateObj}=state
      const arr=category3FlattenArray.map(item=>({checked:category3edited.includes(item.cid),...item}))
      const data4=arr.filter(item=>item.lev==4)
      const data3=arr.filter(item=>item.lev==3)
      const data2=arr.filter(item=>item.lev==2)
      const data1=arr.filter(item=>item.lev==1)
      const data44=data4.map(item=>{
        return{
          checked:category3edited.includes(item.cid),
          indeterminate:false,
          ...item,
        }
      })
      const resolveObj=(obj,checkedArr)=>{
        const newObj=Object.assign({},obj)
        checkedArr.forEach(item=>{
          newObj[item.cid].checked=item.checked
          newObj[item.cid].indeterminate=item.indeterminate
        })
        return newObj
      }
      const resolveData=(data,obj)=>{
        return data.map(item=>{
          const childs=obj[item.cid].childs
          const childsNoChecked=childs.every(id=>{
            return !obj[id].checked&&!obj[id].indeterminate
          })
          if(childsNoChecked){
            return item
          }
          const checked=childs.every(id=>obj[id].checked)
          return{
            checked,
            indeterminate:!checked,
            ...item,
          }
        })
      }
      let obj=resolveObj(category3AssociateObj,data44)
      const data33=resolveData(data3,obj)
      obj=resolveObj(obj,data33)
      const data22=resolveData(data2,obj)
      obj=resolveObj(obj,data22)
      const data11=resolveData(data1,obj)
      const category3FlattenArrayNew=[].concat(data11,data22,data33,data44)
      return {
        ...state,
        category3classifyloading: false,
        loaded: true,
        category3FlattenArray:category3FlattenArrayNew,
        category3edited

      };
    }

    case FICTITIOUS_CATEGORY3_EDITED_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.msg
      };
    case FICTITIOUS_CHANGE_CATEGORY3ARR:
      const {category3AssociateObj,category3FlattenArray }= state
      const {key,checked,lev,handleCheck}=action.data
      let tmpCategory3Arr=category3FlattenArray.map(item=>item.cid==key?{...item,checked}:item)
      if(lev==1){
        //子
        const lev1Ids=[key]
        const lev2Ids=tmpCategory3Arr.filter(item=>lev1Ids.includes(item.parentCid)).map(item=>item.cid)
        const lev3Ids=tmpCategory3Arr.filter(item=>lev2Ids.includes(item.parentCid)).map(item=>item.cid)
        const lev4Ids=tmpCategory3Arr.filter(item=>lev3Ids.includes(item.parentCid)).map(item=>item.cid)
        const allIds=lev1Ids.concat(lev2Ids,lev3Ids,lev4Ids)
        tmpCategory3Arr.forEach((item,idx)=>{
          if(allIds.includes(item.cid)){
            tmpCategory3Arr[idx].checked=checked
            tmpCategory3Arr[idx].indeterminate=false
          }
        })

      }else if(lev==2){
        const lev2Id=key
        const lev1Id=category3AssociateObj[lev2Id].parentCid
        const lev1Idx=_.findIndex(tmpCategory3Arr, {'cid':lev1Id})
        const lev2Idx=_.findIndex(tmpCategory3Arr, {'cid':lev2Id})

        const lev2siblings=tmpCategory3Arr.filter(item=>item.parentCid==lev1Id)
        const lev2SiblingNoChecked=lev2siblings.some((item=>!item.checked))
        const lev2SiblingChecked=lev2siblings.some((item=>item.checked))
        tmpCategory3Arr[lev1Idx].indeterminate=lev2SiblingNoChecked&&lev2SiblingChecked
        tmpCategory3Arr[lev1Idx].checked=!lev2SiblingNoChecked
        //子
        const lev2Ids=[key]
        const lev3Ids=tmpCategory3Arr.filter(item=>lev2Ids.includes(item.parentCid)).map(item=>item.cid)
        const lev4Ids=tmpCategory3Arr.filter(item=>lev3Ids.includes(item.parentCid)).map(item=>item.cid)
        const allIds=lev2Ids.concat(lev3Ids,lev4Ids)
        tmpCategory3Arr.forEach((item,idx)=>{
          if(allIds.includes(item.cid)){
            tmpCategory3Arr[idx].checked=checked
            tmpCategory3Arr[idx].indeterminate=false
          }
        })
      }else if(lev==3){
        const lev3Id=key
        const lev2Id=category3AssociateObj[lev3Id].parentCid
        const lev1Id=category3AssociateObj[lev2Id].parentCid
        const lev1Idx=_.findIndex(tmpCategory3Arr, {'cid':lev1Id})
        const lev2Idx=_.findIndex(tmpCategory3Arr, {'cid':lev2Id})
        const lev3Idx=_.findIndex(tmpCategory3Arr, {'cid':lev3Id})

        const lev3siblings=tmpCategory3Arr.filter(item=>item.parentCid==lev2Id)
        const lev3SiblingNoChecked=lev3siblings.some((item=>!item.checked))
        const lev3SiblingChecked=lev3siblings.some((item=>item.checked))
        tmpCategory3Arr[lev2Idx].indeterminate=lev3SiblingNoChecked&&lev3SiblingChecked
        tmpCategory3Arr[lev2Idx].checked=!lev3SiblingNoChecked
        const lev2siblings=tmpCategory3Arr.filter(item=>item.parentCid==lev1Id)
        const lev2SiblingNoChecked=lev2siblings.some((item=>!item.checked))
        const lev2SiblingChecked=lev2siblings.some((item=>item.checked))
        tmpCategory3Arr[lev1Idx].indeterminate=lev3SiblingNoChecked&&lev3SiblingChecked||lev2SiblingNoChecked&&lev2SiblingChecked
        tmpCategory3Arr[lev1Idx].checked=!lev2SiblingNoChecked

        //子
        const lev3Ids=[key]
        const lev4Ids=tmpCategory3Arr.filter(item=>lev3Ids.includes(item.parentCid)).map(item=>item.cid)
        const allIds=lev3Ids.concat(lev4Ids)
        tmpCategory3Arr.forEach((item,idx)=>{
          if(allIds.includes(item.cid)){
            tmpCategory3Arr[idx].checked=checked
            tmpCategory3Arr[idx].indeterminate=false
          }
        })
      }else if(lev==4){
        const lev4Id=key
        const lev3Id=category3AssociateObj[lev4Id].parentCid
        const lev2Id=category3AssociateObj[lev3Id].parentCid
        const lev1Id=category3AssociateObj[lev2Id].parentCid
        const lev1Idx=_.findIndex(tmpCategory3Arr, {'cid':lev1Id})
        const lev2Idx=_.findIndex(tmpCategory3Arr, {'cid':lev2Id})
        const lev3Idx=_.findIndex(tmpCategory3Arr, {'cid':lev3Id})
        const lev4Idx=_.findIndex(tmpCategory3Arr, {'cid':lev4Id})

        const lev4siblings=tmpCategory3Arr.filter(item=>item.parentCid==lev3Id)
        const lev4SiblingNoChecked=lev4siblings.some((item=>!item.checked))
        const lev4SiblingChecked=lev4siblings.some((item=>item.checked))
        tmpCategory3Arr[lev3Idx].indeterminate=lev4SiblingNoChecked&&lev4SiblingChecked
        tmpCategory3Arr[lev3Idx].checked=!lev4SiblingNoChecked
        const lev3siblings=tmpCategory3Arr.filter(item=>item.parentCid==lev2Id)
        const lev3SiblingNoChecked=lev3siblings.some((item=>!item.checked))
        const lev3SiblingChecked=lev3siblings.some((item=>item.checked))
        tmpCategory3Arr[lev2Idx].indeterminate=lev4SiblingNoChecked&&lev4SiblingChecked||lev3SiblingNoChecked&&lev3SiblingChecked
        tmpCategory3Arr[lev2Idx].checked=!lev3SiblingNoChecked
        const lev2siblings=tmpCategory3Arr.filter(item=>item.parentCid==lev1Id)
        const lev2SiblingNoChecked=lev2siblings.some((item=>!item.checked))
        const lev2SiblingChecked=lev2siblings.some((item=>item.checked))
        tmpCategory3Arr[lev1Idx].indeterminate=lev4SiblingNoChecked&&lev4SiblingChecked||lev3SiblingNoChecked&&lev3SiblingChecked||lev2SiblingNoChecked&&lev2SiblingChecked
        tmpCategory3Arr[lev1Idx].checked=!lev2SiblingNoChecked

        //子
        const lev4Ids=[key]
        const allIds=lev4Ids.concat()
        tmpCategory3Arr.forEach((item,idx)=>{
          if(allIds.includes(item.cid)){
            tmpCategory3Arr[idx].checked=checked
            tmpCategory3Arr[idx].indeterminate=false
          }
        })
      }
      handleCheck&&handleCheck(tmpCategory3Arr.filter(item=>item.checked).map(item=>item.cid),true)
      return {
        ...state,
        category3FlattenArray:tmpCategory3Arr
      }
    case FICTITIOUS_CATEGORY3_EDITED_INITIAL:
      return {
        ...state,
        category3edited: [],
        category3AssociateObj: {},
        category3FlattenArray:[]
      }
    case FICTITIOUS_CATEGORY3_UPDATE_ADD_LOADING:
      return {
        ...state,
      }
    case FICTITIOUS_CATEGORY3_UPDATE_ADD_SUCCESS:
      return {
        ...state,
        loaded: true,
        category3AddUpdate: action.result
      };
    case FICTITIOUS_CATEGORY3_UPDATE_ADD_FAIL:
      return {
        ...state,
        loaded: false,
        error: action.msg
      };
    case FICTITIOUS_CATEGORY3_EDIAED_AssociationType:
      return{
        ...state,
        isClassifyEdit:action.data
      }
    default:
      return state
  }
}

//保存查询条件
export function saveFormData(values) {
  return {
    type: FICTITIOUS_CATEGORY_DATA,
    data: values
  }
}

//查询一级分类导航列表信息
export function searchOneFictitiousCategoryInfo(values) {
  return {
    types: [FICTITIOUS_CATEGORY_ONE_LOADING, FICTITIOUS_CATEGORY_ONE_SUCCESS, FICTITIOUS_CATEGORY_ONE_FAIL],
    promise: (client) => client.get('/platform-service/platform/frontcategory/queryPlatformFrontCategoryList', {params: values})
  }
}
//查询二级分类导航列表信息
export function searchTwoFictitiousCategoryInfo(values) {
  return {
    types: [FICTITIOUS_CATEGORY_TWO_LOADING, FICTITIOUS_CATEGORY_TWO_SUCCESS, FICTITIOUS_CATEGORY_TWO_FAIL],
    promise: (client) => client.get('/platform-service/platform/frontcategory/queryPlatformFrontCategoryList', {params: values})
  }
}
//查询三级分类导航列表信息
export function searchThreeFictitiousCategoryInfo(values) {
  return {
    types: [FICTITIOUS_CATEGORY_THREE_LOADING, FICTITIOUS_CATEGORY_THREE_SUCCESS, FICTITIOUS_CATEGORY_THREE_FAIL],
    promise: (client) => client.get('/platform-service/platform/frontcategory/queryPlatformFrontCategoryList', {params: values})
  }
}


//上移/下移选中导航
export function operationSelectedCategory(values) {
  return {
    types: [FICTITIOUS_CATEGORY_MOVE_LOADING, FICTITIOUS_CATEGORY_MOVE_SUCCESS, FICTITIOUS_CATEGORY_MOVE_FAIL],
    promise: (client) => client.get('/platform-service/platform/frontcategory/updateSortNumPlatformFrontCategory', {params: values})
  }
}

//添加分类导航
export function addFictitiousCategory(values) {
  return {
    types: [FICTITIOUS_CATEGORY_ADD_LOADING, FICTITIOUS_CATEGORY_ADD_SUCCESS, FICTITIOUS_CATEGORY_ADD_FAIL],
    promise: (client) => client.get('/platform-service/platform/frontcategory/insertPlatformFrontCategory', {params: values})
  }
}

//编辑分类导航
export function updateFictitiousCategory(values) {
  return {
    types: [FICTITIOUS_CATEGORY_ADD_LOADING, FICTITIOUS_CATEGORY_ADD_SUCCESS, FICTITIOUS_CATEGORY_ADD_FAIL],
    promise: (client) => client.get('/platform-service/platform/frontcategory/updatePlatformFrontCategory', {params: values})
  }
}

//删除分类导航
export function deleteFictitiousCategory(values) {
  return {
    types: [FICTITIOUS_CATEGORY_DELETE_LOADING, FICTITIOUS_CATEGORY_DELETE_SUCCESS, FICTITIOUS_CATEGORY_DELETE_FAIL],
    promise: (client) => client.get('/platform-service/platform/frontcategory/deletePlatformFrontCategory', {params: values})
  }
}

//隐藏/显示分类导航
export function isShowFictitiousCategory(values) {
  return {
    types: [FICTITIOUS_CATEGORY_SHOW_LOADING, FICTITIOUS_CATEGORY_SHOW_SUCCESS, FICTITIOUS_CATEGORY_SHOW_FAIL],
    promise: (client) => client.get('/platform-service/platform/frontcategory/updatePlatformFrontCategoryHomeShow', {params: values})
  }
}

//查询3级导航菜单商品分类
export function getCategory3(values) {
  return {
    types: [FICTITIOUS_CATEGORY3_LOADING, FICTITIOUS_CATEGORY3_SUCCESS, FICTITIOUS_CATEGORY3_FAIL],
    promise: client => client.get('item/platform/category/getCategoriesByPlatformId', {params: values})
  }
}

//查询3级导航菜单行业标签
export function getCategory3Label(values) {
  values = {
    pageNum: 1,
    pageSize: 666,
    tagStatus: 1
  }
  return {
    types: [FICTITIOUS_CATEGORY3_LABEL_LOADING, FICTITIOUS_CATEGORY3_LABEL_SUCCESS, FICTITIOUS_CATEGORY3_LABEL_FAIL],
    promise: client => client.get('item/platform/tags/itemTagList', {params: values})
  }
}

//查询3级导航菜单编辑过的数据
export function getCategory3Edit(values) {
  setCatgegory3EditType(values.isClassifyEdit)
  return {
    types: [FICTITIOUS_CATEGORY3_EDIAED_LOADING, FICTITIOUS_CATEGORY3_EDITED_SUCCESS, FICTITIOUS_CATEGORY3_EDITED_FAIL],
    promise: client => client.get('/platform-service/platform/frontcategory/queryShowCategory', {params: values})
  }
}
export function changeCategory3Arr(values) {
  return {
    type: FICTITIOUS_CHANGE_CATEGORY3ARR,
    data: values
  }
}
//清除3级导航菜单商品分类
export function clearCategory3Edit() {
  return {
    type: FICTITIOUS_CATEGORY3_EDITED_INITIAL,
  }
}

//增加3级导航菜
export function addCategory3(values) {
  values.level = 3
  return {
    types: [FICTITIOUS_CATEGORY3_UPDATE_ADD_LOADING, FICTITIOUS_CATEGORY3_UPDATE_ADD_SUCCESS, FICTITIOUS_CATEGORY3_UPDATE_ADD_FAIL],
    promise: (client) => client.post('/platform-service/platform/frontcategory/insertPlatformFrontCategory', {data: values})
  }
}

//修改3级导航菜
export function updateCategory3(values) {
  values.level = 3
  return {
    types: [FICTITIOUS_CATEGORY3_UPDATE_ADD_LOADING, FICTITIOUS_CATEGORY3_UPDATE_ADD_SUCCESS, FICTITIOUS_CATEGORY3_UPDATE_ADD_FAIL],
    promise: (client) => client.post('/platform-service/platform/frontcategory/updatePlatformFrontCategory', {data: values})
  }
}

//清除三级分类导航数据
export function clearThreeData() {
  return {
    type: FICTITIOUS_CATEGORY_CLEAR_DATA,
    data: []
  }
}
//查询发布
export function searchPublish(values) {
  return {
    types: [FICTITIOUS_CATEGORY_SEARCH_PUBLISH_LOADING, FICTITIOUS_CATEGORY_SEARCH_PUBLISH_SUCCESS, FICTITIOUS_CATEGORY_SEARCH_PUBLISH_FAIL],
    promise: (client) => client.get('/platform-service/platform/frontcategory/publishCacheFlag', {params: values})
  }
}
//发布虚拟分类
export function publish(values) {
  return {
    types: [FICTITIOUS_CATEGORY_PUBLISH_LOADING, FICTITIOUS_CATEGORY_PUBLISH_SUCCESS, FICTITIOUS_CATEGORY_PUBLISH_FAIL],
    promise: (client) => client.get('/platform-service/platform/frontcategory/publishPlatformFrontCategory', {params: values})
  }
}

export function setCatgegory3EditType(isClassifyEdit) {
  return{
    type:FICTITIOUS_CATEGORY3_EDIAED_AssociationType,
    data:isClassifyEdit
  }
}