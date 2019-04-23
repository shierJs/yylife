import axios from 'axios'
const URL="/api/";
//获取用户信息
async  function getUser(){
    let url=URL+"getUsers"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
} 

//获取签到奖励数据
async  function getSign(){
    let url=URL+"sign"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
} 


//获取用户地址数据
async  function getAddress(){
    let url=URL+"getAllAddress"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
} 

//获取用户地址详情
async  function getAddressDetail(params){
    let url=URL+"getFindAddress"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 

//获取省市区联动
async  function getArea(params){
    let url=URL+"getProvinces"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//获取资讯文章列表
async  function getArtList(params){
    let url=URL+"getListArticle"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//获取轮播
async function getBanner(params){
    let url=URL+"getAllAd";
    let res=await axios({
        method:"get",
        url:url,
        params:params
    });
    return res
}
//获取资讯文章详情
async  function getArtDetails(params){
    let url=URL+"getFindArticle"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//获取文章分类
async  function getArtCate(){
    let url=URL+"getArticleCategory"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
} 
//获取急用钱列表数据
async  function getListCut(params){
    let url=URL+"getListCut"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//获取列表页区域数据
async  function getAllArea(){
    let url=URL+"getAllArea"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
} 
//获取二手物品分类
async  function getUsedCate(){
    let url=URL+"getAllUsedCategory"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
} 
//获取二手物品列表
async  function getUsedDetail(params){
    let url=URL+"getFindUsed"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//获取二手物品详情
async  function getListUsed(params){
    let url=URL+"getListUsed"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//获取应用推荐列表数据
async  function getAppDetail(params){
    let url=URL+"getFindApp"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//获取应用推荐列表数据
async  function getAppList(params){
    let url=URL+"getListApp"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//获取我的收藏
async  function getcollection(params){
    let url=URL+"getUserCollect"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//获取招聘职位分类
async  function getJobCate(){
    let url=URL+"getRecruitmentCategory"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取招聘职位列表
async  function getJobList(params){
    let url=URL+"getListRecruitment"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//获取招聘详情
async  function getJobDetail(params){
    let url=URL+"getFindRecruitment"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//详情页显示是否收藏
async  function hasCollect(params){
    let url=URL+"hasUserCollect"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//租房列表
async  function getRentList(params){
    let url=URL+"getListHouseRent"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//租房详情页数据
async  function getRentDetail(params){
    let url=URL+"getFindHouseRent"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//房屋买卖列表
async  function getHomeTradeList(params){
    let url=URL+"getListHouseTrade"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
} 
//房屋买卖详情页数据
async  function getHomeTradeDetail(params){
    let url=URL+"getFindHouseTrade"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//店铺分类
async  function getShopCate(){
    let url=URL+"getShopCategory"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
} 
//店铺列表数据
async  function getShopList(params){
    let url=URL+"getListShop"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//店铺详情页数据
async  function getShopDetail(params){
    let url=URL+"getFindShop"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//生活服务分类
async  function getLifeCate(){
    let url=URL+"getServiceCategory"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
} 
//生活服务列表数据
async  function getLifeList(params){
    let url=URL+"getListService"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//生活服务详情页数据
async  function getLifeDetail(params){
    let url=URL+"getFindService"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//首页头条标题轮播
async  function getRollHeadLines(){
    let url=URL+"getRollArticle"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取租房配置项
async  function getRentConfig(){
    let url=URL+"getAllHouseConfig"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取来疯购商城列表数据
async  function getMallList(params){
    let url=URL+"getListGoods"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//获取来疯购商城分类数据
async  function getMallCate(params){
    let url=URL+"getGoodsCategory"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//获取商品详情页数据
async  function getMallGoods(params){
    let url=URL+"getDetailsGoods"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//获取商品订单状态
async  function getOrderStatus(){
    let url=URL+"orderStatus"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取商品订单列表
async  function getOrderList(params){
    let url=URL+"getListOrder"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//获取商品订单详情
async  function getOrderDetail(params){
    let url=URL+"detailsOrder"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//获取订单物流信息
async  function getOrderExpress(params){
    let url=URL+"checkLogistics"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//获取购物车列表
async  function getCartList(){
    let url=URL+"getListCart"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取购物车生成订单列表
async  function getOrderCart(){
    let url=URL+"cartBuy"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取生活服务发布页面标签
async  function getServiceLabel(params){
    let url=URL+"getServiceLabel"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//获取招聘福利标签
async  function getRecruitmentLabel(params){
    let url=URL+"getRecruitmentLabel"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//获取我的发布列表
//房屋租赁
async  function getMyHouseRent(params){
    let url=URL+"getMyHouseRent"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//店铺发布
async  function getMyShop(params){
    let url=URL+"getMyShop"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//房屋买卖
async  function getMyHouseTrade(params){
    let url=URL+"getMyHouseTrade"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//招聘发布
async  function getMyRecruitment(params){
    let url=URL+"getMyRecruitment"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//二手物品
async  function getMyUsed(params){
    let url=URL+"getMyUsed"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//房屋租赁
async  function getMyService(params){
    let url=URL+"getMyService"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//编辑租房发布数据
async  function getMyFindRent(params){
    let url=URL+"getMyFindHouseRent"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//编辑店铺发布数据
async  function getMyFindShop(params){
    let url=URL+"getMyFindShop"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//编辑招聘发布数据
async  function getMyFindRecruitment(params){
    let url=URL+"getMyFindRecruitment"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//编辑二手发布数据
async  function getMyFindUsed(params){
    let url=URL+"getMyFindUsed"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//编辑卖房发布数据
async  function getMyFindHouseTrade(params){
    let url=URL+"getMyFindHouseTrade"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//编辑租房发布数据
async  function getMyFindService(params){
    let url=URL+"getMyFindService"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//获取物物流公司
async  function getExpressCompany(){
    let url=URL+"getExpressCompany"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//我的收藏列表数据
async  function getUserCollect(params){
    let url=URL+"getUserCollect"; 
    let res=await axios({
        method:"get",
        url:url,
        params:params
    })
    return res;
}
//获取抽奖数据
async  function getActivityDraw(){
    let url=URL+"getActivityDraw"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取所有中奖纪录
async  function getActivityDrawRecord(){
    let url=URL+"getActivityDrawRecord"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取我的中奖纪录
async  function getMyActivityDrawRecord(){
    let url=URL+"getMyActivityDrawRecord"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取商城推荐数据
async  function getLoveGoods(){
    let url=URL+"getLoveGoods"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取邀请链接
async  function getShareUrl(){
    let url=URL+"getInvitation"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
//获取联系方式
async  function getAboutSystem(){
    let url=URL+"getAboutSystem"; 
    let res=await axios({
        method:"get",
        url:url,
    })
    return res;
}
export default {
    getUser,
    getSign,
    getAddress,
    getAddressDetail,
    getArea,
    getArtList,
    getArtDetails,
    getBanner,
    getArtCate,
    getListCut,
    getAllArea,
    getUsedCate,
    getListUsed,
    getAppList,
    getAppDetail,
    getUsedDetail,
    getcollection,
    getJobCate,
    getJobList,
    getJobDetail,
    hasCollect,
    getRentList,
    getRentDetail,
    getHomeTradeList,
    getHomeTradeDetail,
    getShopCate,
    getShopList,
    getShopDetail,
    getLifeCate,
    getLifeList,
    getLifeDetail,
    getRollHeadLines,
    getRentConfig,
    getMallList,
    getMallCate,
    getMallGoods,
    getOrderStatus,
    getOrderList,
    getOrderDetail,
    getOrderExpress,
    getCartList,
    getOrderCart,
    getServiceLabel,
    getRecruitmentLabel,
    getMyHouseRent,
    getMyService,
    getMyUsed,
    getMyRecruitment,
    getMyHouseTrade,
    getMyShop,
    getMyFindService,
    getMyFindHouseTrade,
    getMyFindUsed,
    getMyFindRecruitment,
    getMyFindShop,
    getMyFindRent,
    getExpressCompany,
    getUserCollect,
    getActivityDraw,
    getActivityDrawRecord,
    getMyActivityDrawRecord,
    getLoveGoods,
    getShareUrl,
    getAboutSystem,
}