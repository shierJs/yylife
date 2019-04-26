import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [{
      path: '/',
      name: 'Index',
      component: () => import('@/views/Index'), // 首页
      meta: {
        title: '沂源生活'
      }
      // 路由懒加载 优化页面加载速度
    },
    {
      path: '/replace',
      name: 'Replace',
      component: () => import('@/views/Replace'), // 刷新
      // 路由懒加载 优化页面加载速度
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login'), // 登录
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register/:id',
      name: 'Register',
      component: () => import('@/views/login/Register') ,// 注册
      meta: {
        title: '注册'
      }
    },
    {
      path: '/forget',
      name: 'Forget',
      component: () => import('@/views/login/Forget'), // 忘记密码
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/Cart'), // 购物车
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/release',
      name: 'Release',
      component: () => import('@/views/Release'), // 发布
      meta: {
        title: '发布信息'
      }
    },
    {
      path: '/releaseUsed/:id',
      name: 'releaseUsed',
      component: () => import('@/views/ReleaseList/used/releaseUsed'), // 发布--二手物品
      meta: {
        title: '二手物品发布',
        keepAlive:true,
      }
    },
    {
      path: '/rental/:id',
      name: 'Rental',
      component: () => import('@/views/ReleaseList/rent/Rental'), // 发布--房屋出租/求租
      meta: {
        title: '租房发布',
        keepAlive:true,
      }
    },
    {
      path: '/releaseHomeTrading/:id',
      name: 'ReleaseHomeTrading',
      component: () => import('@/views/ReleaseList/homeTrading/ReleaseHomeTrading'), // 发布--房屋买卖
      meta: {
        title: '房屋买卖发布',
        keepAlive:true,
      }
    },
    {
      path: '/catering/:id',
      name: 'Catering',
      component: () => import('@/views/ReleaseList/catering/Catering'), // 发布--餐饮广告
      meta: {
        title: '发布餐饮广告',
        keepAlive:true,
      }
    },
    {
      path: '/recruitment/:id',
      name: 'Recruitment',
      component: () => import('@/views/ReleaseList/job/Recruitment'), // 发布--求职招聘
      meta: {
        title: '发布职位',
        keepAlive:true,
      }
    },
    {
      path: '/edit',
      name: 'Edit',
      component: () => import('@/views/ReleaseList/Edit'), // 发布--编辑文本内容
      meta: {
        title: '编辑内容',
      }
    },
    {
      path: '/service/:id',
      name: 'Service',
      component: () => import('@/views/ReleaseList/lifeServer/Service'), // 发布--生活服务
      meta: {
        title: '发布生活服务',
        keepAlive:true,
      }
    },
    {
      path: '/payRelease/:id/:id2',
      name: 'PayRelease',
      component: () => import('@/views/ReleaseList/PayRelease'), // 发布--发布支付页
      meta: {
        title: '完成支付'
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/views/Mine'), // 我的
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('@/views/Contact') ,// 我的--联系我们（客服  合作）
      meta: {
        title: '联系我们'
      }
    },
    {
      path: '/collection',
      name: 'Collection',
      component: () => import('@/views/Mylist/Collection') ,// 我的--收藏页
      meta: {
        title: '我的收藏'
      }
    },
    {
      path: '/information',
      name: 'Information',
      component: () => import('@/views/Mylist/Information') ,// 我的--个人资料
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('@/views/Mylist/History'), // 我的--历史纪录
      meta: {
        title: '浏览历史记录'
      }
    },
    {
      path: '/myRelease',
      name: 'MyRelease',
      component: () => import('@/views/Mylist/MyRelease'), // 我的--我的发布
      meta: {
        title: '我的发布'
      }
    },
    {
      path: '/reture',
      name: 'Reture',
      component: () => import('@/views/Mylist/Reture'), // 我的--退换货
      meta: {
        title: '商品退换货'
      }
    },
    {
      path: '/coupons',
      name: 'Coupons',
      component: () => import('@/views/Mylist/Coupons'), // 我的--优惠券
      meta: {
        title: '优惠券'
      }
    },
    {
      path: '/recharge/:id',
      name: 'Recharge',
      component: () => import('@/views/Mylist/Recharge'), // 我的--账户充值
      meta: {
        title: '金币充值',
      }
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('@/views/News'), // 消息页
      meta: {
        title: '我的消息',
      }
    },
    {
      path: '/food',
      name: 'Food',
      component: () => import('@/views/foodList/Food'), // 美食页
      meta: {
        title: '沂源美食'
      }
    },
    {
      path: '/foodDetail/:id',
      name: 'FoodDetail',
      component: () => import('@/views/foodList/FoodDetail'), // 美食详情页
      meta: {
        title: '沂源美食',
      }
    },
    {
      path: '/job',
      name: 'Job',
      component: () => import('@/views/jobList/Job'), // 求职招聘页
      meta: {
        title: '求职招聘'
      }
    },
    {
      path: '/jobDetail/:id',
      name: 'JobDetail',
      component: () => import('@/views/jobList/JobDetail'), // 求职招聘详情页
      meta: {
        title: '求职招聘',
      }
    },
    {
      path: '/market',
      name: 'Market',
      component: () => import('@/views/marketList/Market'), // 二手市场页
      meta: {
        title: '二手市场'
      }
    },
    {
      path: '/marketDetail/:id',
      name: 'marketDetail',
      component: () => import('@/views/marketList/MarketDetail'), // 二手市场详情页
      meta: {
        title: '二手市场',
      }
    },
    {
      path: '/rent',
      name: 'Rent',
      component: () => import('@/views/rentList/rent') ,// 房屋租赁页
      meta: {
        title: '房屋租赁'
      }
    },
    {
      path: '/rentDetail/:id',
      name: 'RentDetail',
      component: () => import('@/views/rentList/RentDetail') ,// 房屋租赁详情页
      meta: {
        title: '房屋租赁',
      }
    },
    {
      path: '/life',
      name: 'Life',
      component: () => import('@/views/lifeList/Life'), // 生活服务页
      meta: {
        title: '本地服务'
      }
    },
    {
      path: '/lifeDetail/:id',
      name: 'LifeDetail',
      component: () => import('@/views/lifeList/lifeDetail') ,// 生活服务页
      meta: {
        title: '本地服务',
      }
    },
    {
      path: '/homeTradingList',
      name: 'HomeTradingList',
      component: () => import('@/views/hometrading/HomeTradingList'), // 房屋买卖列表
      meta: {
        title: '房屋买卖'
      }
    },
    {
      path: '/homeDetail/:id',
      name: 'HomeDetail',
      component: () => import('@/views/hometrading/HomeDetail'), // 房屋买卖详情页
      meta: {
        title: '新房，二手房售卖',
      }
    },
    //实用工具
    {
      path: '/appRecommend',
      name: 'AppRecommend',
      component: () => import('@/views/tools/AppRecommend'), // 应用推荐
      meta: {
        title: '应用推荐',
      }
    },
    {
      path: '/appDetail/:id',
      name: 'AppDetail',
      component: () => import('@/views/tools/AppDetail'), // 推荐应用的详情
      meta: {
        title: '应用推荐',
      }
    },
    {
      path: '/urgentMoney',
      name: 'UrgentMoney',
      component: () => import('@/views/tools/UrgentMoney'), // 急用钱
      meta: {
        title: '急用钱',
      }
    },
    {
      path: '/express',
      name: 'Express',
      component: () => import('@/views/tools/Express'), // 快递查询
      meta: {
        title: '查询快递',
      }
    },
    {
      path: '/report/:id1/:id2',
      name: 'Report',
      component: () => import('@/views/Report'), // 用户举报
      meta: {
        title: '用户举报',
      }
    },
    {
      path: '/headLines/:id',
      name: 'HeadLines',
      component: () => import('@/views/headlines/headLines'), // 同城头条  入口：首页同城头条和糗事笑话
      meta: {
        title: '头条资讯',
      }
    },
    {
      path: '/headLineDetails/:id',
      name: 'HeadLineDetails',
      component: () => import('@/views/headlines/HeadLineDetails'), // 同城头条详情
      meta: {
        title: '头条资讯',
      }
    },
    //商城
    {
      path: '/mallIndex',
      name: 'mallIndex',
      component: () => import('@/views/mall/mallIndex'), // 商城首页
      meta: {
        title: '来疯购商城',
      }
    },
    {
      path: '/mallDetail/:id',
      name: 'mallDetail',
      component: () => import('@/views/mall/mallDetail'), // 商城详情页
      meta: {
        title: '来疯购商城',
      }
    },
    {
      path: '/mallLogistics/:orderSn/:methodId',
      name: 'mallLogistics',
      component: () => import('@/views/mall/mallLogistics'), // 商城订单物流
      meta: {
        title: '订单物流',
      }
    },
    {
      path: '/mallAdress',
      name: 'mallAdress',
      component: () => import('@/views/mall/mallAdress'), // 商城收货地址
      meta: {
        title: '收货地址',
      }
    },
    {
      path: '/editAddress/:id',
      name: 'editAddress',
      component: () => import('@/views/mall/editAddress'), // 新增编辑收货地址
      meta: {
        title: '编辑收货地址',
      }
    },
    {
      path: '/mallOrder',
      name: 'mallOrder',
      component: () => import('@/views/mall/mallOrder'), // 商城订单页
      meta: {
        title: '商品订单',
      }
    },
    {
      path: '/mallAllOrder/:id',
      name: 'mallAllOrder',
      component: () => import('@/views/mall/mallAllOrder'), // 商城所有状态订单
      meta: {
        title: '所有订单',
      }
    },
    {
      path: '/mallPayOrder/:id',
      name: 'mallPayOrder',
      component: () => import('@/views/mall/mallPayOrder'), // 商城购物车
      meta: {
        title: '支付订单',
      }
    },
    {
      path: '/mallPay',
      name: 'mallPay',
      component: () => import('@/views/mall/mallPay'), // 商城购物车
      meta: {
        title: '商品订单支付',
      }
    },
    //每日抽奖
    {
      path: '/lottery',
      name: 'Lottery',
      component: () => import('@/views/Lottery'), // 每日抽奖
      meta: {
        title: '幸运抽奖',
      }
    },
    {
      path: '/search/:id',
      name: 'Search',
      component: () => import('@/views/Search'), // 搜索页面
      meta: {
        title: '搜索',
      }
    },
    {
      path: '/resetPayPwd',
      name: 'ResetPayPwd',
      component: () => import('@/views/Mylist/ResetPayPwd'), // 设置支付密码
      meta: {
        title: '设置支付密码',
      }
    },
    {
      path: '/confirmPayPwd',
      name: 'ConfirmPayPwd',
      component: () => import('@/views/Mylist/ConfirmPayPwd'), // 确认支付密码
      meta: {
        title: '确认支付密码',
      }
    },
    {
      path: '/set',
      name: 'Set',
      component: () => import('@/views/Mylist/Set'), // 设置
      meta: {
        title: '设置',
      }
    },
    {
      path: '/notFound',
      name: 'NotFound',
      component: () => import('@/views/NotFound'), // 404错误页面
      meta: {
        title: 'Not Found',
      }
    },
    {
      path: '/orderDetail/:id',
      name: '订单详情',
      component: () => import('@/views/mall/orderDetail'), //订单详情
      meta: {
        title: '订单详情',
      }
    },
    {
      path: '/aliPay',
      name: 'AliPay',
      component: () => import('@/views/AliPay'), //支付宝支付跳转
      meta: {
        title: '支付宝支付',
      },
    },
  ]
});