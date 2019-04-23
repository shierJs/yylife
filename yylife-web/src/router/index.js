import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    // 路由懒加载 优化页面加载速度
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/Index'), // 首页
      meta: {
        title: '沂源生活-沂源分类信息网',
      }
    },
    {
      path: '/mine/:id',
      name: '',
      component: () => import('@/views/mine/Mine'), // 个人中心
      meta: {
        title: '个人中心',
      },
      children: [{
          path: "mineIndex",
          name: "mineIndex",
          component: () => import('@/views/mine/MineIndex'), //个人中心首页
          meta: {
            title: '账户信息',
          }
        },
        {
          path: "news",
          name: "news",
          component: () => import('@/views/mine/News'), //消息通知
          meta: {
            title: '消息通知',
          },
        },
        {
          path: "collection",
          name: "collection",
          component: () => import('@/views/mine/Collection'), //我的收藏
          meta: {
            title: '我的收藏',
          },
        },
        {
          path: "order",
          name: "order",
          component: () => import('@/views/mine/Order'), //我的订单
          meta: {
            title: '我的订单',
          }
        },
        {
          path: "integral",
          name: "integral",
          component: () => import('@/views/mine/Integral'), //我的积分
          meta: {
            title: '我的积分',
          }
        },
        {
          path: "myRelease",
          name: "myRelease",
          component: () => import('@/views/mine/MyRelease'), //我的发布
          meta: {
            title: '我的发布',
          }
        },
        {
          path: "address",
          name: "address",
          component: () => import('@/views/mine/Address'), //地址管理
          meta: {
            title: '地址管理',
          }
        },
        {
          path: "coupons",
          name: "coupons",
          component: () => import('@/views/mine/Coupons'), //优惠券
          meta: {
            title: '优惠券',
          }
        },
        {
          path: "setUser",
          name: "setUser",
          component: () => import('@/views/mine/SetUser'), //修改账户信息
          meta: {
            title: '账户管理',
          }
        },
      ]
    },
    {
      path: '/food',
      name: 'Food',
      component: () => import('@/views/food/FoodList'), //美食列表页
      meta: {
        title: '美食店铺',
      }
    },
    {
      path: '/food/foodDetail/:id',
      name: 'FoodDetail',
      component: () => import('@/views/food/FoodDetail'), //美食详情页
      meta: {
        title: '店铺详情',
      }
    },
    {
      path: '/recruitment',
      name: 'Recruitment',
      component: () => import('@/views/recruitment/Recruitment'), //招聘列表页
      meta: {
        title: '求职招聘',
      }
    },
    {
      path: '/recruitment/jobDetail/:id',
      name: 'JobDetail',
      component: () => import('@/views/recruitment/JobDetail'), //招聘详情页
      meta: {
        title: '招聘详情',
      }
    },
    {
      path: '/secondhand',
      name: 'Secondhand',
      component: () => import('@/views/secondhand/Secondhand'), //二手市场列表页
      meta: {
        title: '二手市场',
      }
    },
    {
      path: '/secondhand/secondhandDetail/:id',
      name: 'SecondhandDetail',
      component: () => import('@/views/secondhand/SecondhandDetail'), //二手市场详情页
      meta: {
        title: '二手物品详情',
      }
    },
    {
      path: '/rent',
      name: 'Rent',
      component: () => import('@/views/rent/Rent'), //房屋出租列表页
      meta: {
        title: '房屋租赁',
      }
    },
    {
      path: '/rent/rentDetail/:id',
      name: 'RentDetail',
      component: () => import('@/views/rent/RentDetail'), //房屋出租详情页
      meta: {
        title: '租房详情',
      }
    },
    {
      path: '/homeTrading',
      name: 'HomeTrading',
      component: () => import('@/views/homeTrading/HomeTrading'), //房屋买卖列表页
      meta: {
        title: '房屋买卖',
      }
    },
    {
      path: '/homeTrading/homeTradingDetail/:id',
      name: 'HomeTradingDetail',
      component: () => import('@/views/homeTrading/HomeTradingDetail'), //房屋买卖详情页
      meta: {
        title: '房屋买卖详情',
      }
    },
    {
      path: '/life',
      name: 'Life',
      component: () => import('@/views/lifeService/life'), //生活服务列表页
      meta: {
        title: '生活服务',
      }
    },
    {
      path: '/life/lifeDetail/:id',
      name: 'LifeDetail',
      component: () => import('@/views/lifeService/LifeDetail'), //生活服务详情页
      meta: {
        title: '服务详情',
      }
    },
    {
      path: '/mall',
      name: 'Mall',
      component: () => import('@/views/mall/MallIndex'), //商城首页
      meta: {
        title: '来疯购商城',
      }
    },
    {
      path: '/mall/mallDetail/:id',
      name: 'MallDetail',
      component: () => import('@/views/mall/MallDetail'), //商城详情页
      meta: {
        title: '商品详情',
      }
    },
    {
      path: '/mall/mallCart',
      name: 'MallCart',
      component: () => import('@/views/mall/MallCart'), //商城购物车
      meta: {
        title: '购物车',
      }
    },
    {
      path: '/mall/mallOrder/:id',
      name: 'MallOrder',
      component: () => import('@/views/mall/MallOrder'), //提交订单页
      meta: {
        title: '提交订单',
      }
    },
    {
      path: '/headLine',
      name: 'HeadLine',
      component: () => import('@/views/headlines/HeadLine'), //头条资讯列表
      meta: {
        title: '头条资讯',
      }
    },
      {
        path: '/headLine/headLineDetails/:id',
        name: 'HeadLineDetails',
        component: () => import('@/views/headlines/HeadLineDetails'), //头条资讯详情
        meta: {
          title: '文章详情',
        }
      },
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/views/help/Help'),//帮助中心
      meta: {
        title: '帮助中心',
      }
    },
    {
      path: '/pushApp',
      name: 'PushApp',
      component: () => import('@/views/Tools/PushApp'), //应用推荐
      meta: {
        title: '应用推荐',
      }
    }, 
      {
        path: '/pushAppDetail/:id',
        name: 'PushAppDetail',
        component: () => import('@/views/Tools/PushAppDetail'), //应用推荐详情页
        meta: {
          title: '应用详情',
        }
      },
    {
      path: '/lottery',
      name: 'Lottery',
      component: () => import('@/views/Tools/Lottery'), //幸运抽奖
      meta: {
        title: '幸运抽奖',
      }
    },
    {
      path: '/invited',
      name: 'Invited',
      component: () => import('@/views/Tools/Invited'), //邀请好友
      meta: {
        title: '邀请好友',
      }
    },
    {
      path: '/release',
      name: 'Release',
      component: () => import('@/views/release/release'), //发布
      meta: {
        title: '发布信息',
      }
    },
      {
        path: '/release/releaseRent/:id',
        name: 'ReleaseRent',
        component: () => import('@/views/release/releaseRent'), //发布租房信息
        meta: {
          title: '房屋出租',
        }
      },
      {
        path: '/release/releaseTrade/:id',
        name: 'ReleaseTrade',
        component: () => import('@/views/release/releaseTrade'), //发布卖房信息
        meta: {
          title: '房屋售卖',
        }
      },
      {
        path: '/release/releaseJob/:id',
        name: 'ReleaseJob',
        component: () => import('@/views/release/releaseJob'), //发布招聘信息
        meta: {
          title: '招聘',
        }
      },
      {
        path: '/release/releaseUsed/:id',
        name: 'ReleaseUsed',
        component: () => import('@/views/release/releaseUsed'), //发布二手
        meta: {
          title: '发布二手物品',
        }
      },
      {
        path: '/release/releaseLife/:id',
        name: 'ReleaseLife',
        component: () => import('@/views/release/releaseLife'), //发布生活服务
        meta: {
          title: '发布生活服务',
        }
      },
      {
        path: '/release/releaseCatering/:id',
        name: 'ReleaseCatering',
        component: () => import('@/views/release/releaseCatering'), //发布餐饮广告
        meta: {
          title: '店铺入驻',
        }
      },
      {
        path: '/release/releasePay/:id/:id2',
        name: 'ReleasePay',
        component: () => import('@/views/release/releasePay'), //发布完成
        meta: {
          title: '完成发布',
        }
      },
    {
      path: '/pay',
      name: 'Pay',
      component: () => import('@/views/Pay'), //支付订单页面
      meta: {
        title: '支付订单',
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About'), //关于我们
      meta: {
        title: '关于我们',
      }
    },
    {
      path: '/loans',
      name: 'Loans',
      component: () => import('@/views/Tools/Loans'), //急用钱
      meta: {
        title: '急用钱',
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('@/views/Contact'), //客服中心 联系我们
      meta: {
        title: '联系我们',
      }
    },
    {
      path: '/frendship',
      name: 'Frendship',
      component: () => import('@/views/Frendship'), //友情链接
      meta: {
        title: '友情链接',
      }
    },
    {
      path: '/log/:id',
      name: 'Log',
      component: () => import('@/views/logReg/Log'), //登陆注册
      meta: {
        title: '沂源生活登录注册',
      }
    },
    {
      path: '/notFound',
      name: 'NotFound',
      component: () => import('@/views/NotFound'), //404页面
      meta: {
        title: 'Not Found',
      }
    },
    {
      path: '/weChatPay/:id',
      name: 'WeChatPay',
      component: () => import('@/views/weChatPay'), //微信支付页面
      meta: {
        title: '微信支付-沂源生活',
      }
    },
    {
      path: '/aliPay',
      name: 'AliPay',
      component: () => import('@/views/AliPay'), //支付宝支付跳转
      meta: {
        title: '支付宝支付',
      }
    },
    {
      path: '/recharge/:id',
      name: 'Recharge',
      component: () => import('@/views/Recharge'), //金币充值
      meta: {
        title: '金币充值',
      }
    },
    {
      path: '/upgrade',
      name: 'Upgrade',
      component: () => import('@/views/Upgrade'), //引导用户升级浏览器版本
      meta: {
        title: '支付宝支付',
      }
    }
  ]
})
