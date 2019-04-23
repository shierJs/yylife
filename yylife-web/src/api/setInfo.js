import axios from 'axios'
const URL="/api/"

//设置用户信息
async  function setUser(data){
    let url=URL+"setUsers"; 
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//删除地址
async  function delAddress(data){
    let url=URL+"delAddress";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//编辑收货地址
async  function editAddress(data){
    let url=URL+"editAddress";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//增加收货地址
async  function addAddress(data){
    let url=URL+"addAddress";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//收藏
async  function collect(data){
    let url=URL+"setUserCollect";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//取消收藏
async  function delCollect(data){
    let url=URL+"delUserCollect";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//用户签到
async  function signing(){
    let url=URL+"signIn";
    let res=await axios({
        method:"post",
        url:url,
    })
    return res;
} 
//用户举报上传图片
async  function uploadImg(data){
    let url=URL+"thumbUpload";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//用户举报
async  function report(data){
    let url=URL+"userFeedback";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//租房缩略图上传
async  function uploadRentImg(data){
    let url=URL+"thumbUpload";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//租房发布
async  function addRent(data){
    let url=URL+"addHouseRent";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//生活服务缩略图上传
async  function uploadLifeImg(data){
    let url=URL+"thumbUpload";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//申请人数自增
async  function setCount(data){
    let url=URL+"setCountCut";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//应用下载量自增
async  function setCountApp(data){
    let url=URL+"setIncAppCount";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//友情链接申请
async  function setLink(data){
    let url=URL+"setLink";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//删除订单
async  function deleteOrder(data){
    let url=URL+"deleteOrder";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//取消订单
async  function cancelOrder(data){
    let url=URL+"cancellationOrder";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//加入购物车
async  function addCart(data){
    let url=URL+"addCart";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//更新购物车数据是否选中
async  function updateSelectCart(data){
    let url=URL+"updateSelectCart";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//更新购物车商品数量
async  function updateCartNum(data){
    let url=URL+"updateCart";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//删除购物车商品
async  function deleteCart(data){
    let url=URL+"deleteCart";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//商品生成订单
async  function toCartPay(data){
    let url=URL+"toCartPay";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//商品生成订单
async  function paymentGoods(data){
    let url=URL+"paymentGoods";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//订单页去支付
async  function paymentOrder(data){
    let url=URL+"personalOrderBuy";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//直接购买订单去购买
async  function toGoodsOrderPay(data){
    let url=URL+"toGoodsOrderPay";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//订单确认收货
async  function receivingOrder(data){
    let url=URL+"receivingOrder";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//商品页直接购买
async  function toGoodsPay(data){
    let url=URL+"toGoodsPay";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//微信支付关闭订单
async  function closeOrderWxPay(data){
    let url=URL+"closeOrderWxPay";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
} 
//发布生活服务
async  function addService(data){
    let url=URL+"addService";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//上传二手物品发布图片
async  function uploadUsedImg(data){
    let url=URL+"thumbUpload";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//发布二手物品
async  function addUsed(data){
    let url=URL+"addUsed";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//发布招聘
async  function addRecruitment(data){
    let url=URL+"addRecruitment";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//上传店铺图片
async  function uploadShopImg(data){
    let url=URL+"thumbUpload";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//发布店铺
async  function addShop(data){
    let url=URL+"addShop";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//上传房屋买卖图片
async  function uploadTradeImg(data){
    let url=URL+"thumbUpload";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//发布房屋买卖
async  function addHouseTrade(data){
    let url=URL+"addHouseTrade";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//删除我的租房发布
async  function delMyHouseRent(data){
    let url=URL+"delMyHouseRent";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//删除我的卖房发布
async  function delMyHouseTrade(data){
    let url=URL+"delMyHouseTrade";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//删除我的店铺发布
async  function delMyShop(data){
    let url=URL+"delMyShop";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//删除我的招聘发布
async  function delMyRecruitment(data){
    let url=URL+"delMyRecruitment";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//删除我的二手物品发布
async  function delMyUsed(data){
    let url=URL+"delMyUsed";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//删除我的招聘发布
async  function delMyService(data){
    let url=URL+"delMyService";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//编辑房屋买卖
async  function editHouseTrade(data){
    let url=URL+"editHouseTrade";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//编辑二手发布
async  function editShop(data){
    let url=URL+"editShop";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//编辑招聘发布
async  function editRecruitment(data){
    let url=URL+"editRecruitment";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//编辑房屋租赁
async  function editHouseRent(data){
    let url=URL+"editHouseRent";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//编辑生活服务
async  function editService(data){
    let url=URL+"editService";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//编辑二手
async  function editUsed(data){
    let url=URL+"editUsed";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//抽奖
async  function setLottery(){
    let url=URL+"setLottery";
    let res=await axios({
        method:"post",
        url:url,
    })
    return res;
}
//发布租房支付
async  function paymentsPublish(data){
    let url=URL+"paymentsPublish";
    let res=await axios({
        method:"post",
        url:url,
        data:data
    })
    return res;
}
//金币充值
async  function reCharge(params){
    let url=URL+"paymentRecharge";
    let res=await axios({
        method:"post",
        url:url,
        params:params,
    })
    return res;
} 
export default {
    setUser,
    delAddress,
    editAddress,
    addAddress,
    collect,
    delCollect,
    signing,
    uploadImg,
    report,
    uploadRentImg,
    addRent,
    setCount,
    setCountApp,
    setLink,
    deleteOrder,
    cancelOrder,
    addCart,
    updateSelectCart,
    updateCartNum,
    deleteCart,
    toCartPay,
    paymentGoods,
    paymentOrder,
    receivingOrder,
    toGoodsPay,
    toGoodsOrderPay,
    closeOrderWxPay,
    uploadLifeImg,
    addService,
    uploadUsedImg,
    addUsed,
    addRecruitment,
    uploadShopImg,
    addShop,
    uploadTradeImg,
    addHouseTrade,
    delMyService,
    delMyUsed,
    delMyRecruitment,
    delMyShop,
    delMyHouseTrade,
    delMyHouseRent,
    editHouseTrade,
    editUsed,
    editService,
    editHouseRent,
    editRecruitment,
    editShop,
    setLottery,
    paymentsPublish,
    reCharge,
}