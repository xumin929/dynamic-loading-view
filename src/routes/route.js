import express from 'express';
const router = express.Router();

// 类目管理
router.get('/category/?*', function(req, res, next) {
    import("../modules/"+["category","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});
// 运营平台 商品发布
router.get('/goods-template/?*', function(req, res, next) {
    import("../modules/"+["GoodsTemplate","route"].join("/")).then((load) => {
		load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});

router.get('/product-release/?*', function(req, res, next) {
    import("../modules/"+["Release","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});
// 商品库管理
router.get('/item-base/?*', function(req, res, next) {
    import("../modules/"+["itembase","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});

// 品牌管理
router.get('/brand/?*', function(req, res, next) {
    import("../modules/"+["brand","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});

// 规格参数管理
router.get('/specifications/?*', function(req, res, next) {
    import("../modules/"+["specifications","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});

// 供货申请审核
router.get('/supply-audit/?*', function(req, res, next) {
    import("../modules/"+["supplyaudit","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});

// 商品发布
// router.get('/goods-release/?*', function(req, res, next) {
//     import("../modules/"+["goodsrlease","route"].join("/")).then((load) => {
//         load(req,res,next)
//     }).catch(err=>{
//         console.log(err,"------")
//         next();
//     });
// });

// 商品编辑
router.get('/edit-goods/?*', function(req, res, next) {
    import("../modules/"+["editgoods","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});

// 销售商品管理
router.get('/sale-item/?*', function(req, res, next) {
    import("../modules/"+["sellgoods","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});

// 销售商品编辑
router.get('/sale-edit/?*', function(req, res, next) {
    import("../modules/"+["saleitemedit","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});

// 商品库管理
router.get('/goodslibrary/?*', function(req, res, next) {
    import("../modules/"+["goodslibrary","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});

//  批量上传
router.get('/batch-upload/?*', function(req, res, next) {
    import("../modules/"+["batchupload","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});
//行业标签
router.get('/industry-label/?*', function(req, res, next) {
    import("../modules/"+["industrylabel","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
            console.log(err,"------")
        next();
    });
});
//商品评价
router.get('/evaluation-manage/?*', function(req, res, next) {
    import("../modules/"+["evaluationmanage","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});
//分类导航设置
router.get('/fictitious-category/?*', function(req, res, next) {
    import("../modules/"+["fictitiouscategory","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});
//店铺商品管理
router.get('/goodsmanage/?*', function(req, res, next) {
    import("../modules/"+["goodsmanage","route"].join("/")).then((load) => {
        load(req,res,next)
    }).catch(err=>{
        console.log(err,"------")
        next();
    });
});
// 配置页面路由
router.get('/configs/?*', function(req, res, next) {
	var url = req.originalUrl.replace(/\?(.*)/,'');
	var path = url.split("/");
	import("../"+[path[3],path[4],path[5],"config/route"].join("/")).then((load) => {
    	load(req,res,next)
	}).catch(err=>{
		console.log(err,"------")
		next();
	});
});
module.exports = router;
