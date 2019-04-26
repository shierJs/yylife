<template>
  <div>
    <Loading :show="showing"></Loading>
    <div v-show="showing">
      <header id="head">
        <div class="sign" @click="sign">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qiandao"></use>
          </svg>
          <span>签到</span>
        </div>
        <h3 class="title">沂源生活</h3>
        <div @click="news">
          <el-badge :value="0" class="news" hidden>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiaoxi2"></use>
            </svg>
            <span>消息</span>
          </el-badge>
        </div>
      </header>

      <div id="main" v-show="showing">
        <!-- 签到弹出层 -->
        <Sign></Sign>
        <!-- 签到弹出层 -->
        <!-- banner轮播 -->
        <Banner></Banner>
        <!-- banner轮播 -->
        <!-- 导航栏 -->
        <ul class="nav">
          <li class="item" v-for="(v,index) in navData" :key="index" @click="$router.push(v.push)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="v.href"></use>
            </svg>
            <span>{{v.title}}</span>
          </li>
        </ul>
        <!-- 导航栏 -->
        <!-- 宣传栏 -->
        <!-- 广告位 -->
        <div class="advertise">
          <div class="integral" @click="$router.push('/mallIndex')">
            <img src="/static/img/laifenggou.jpg" alt>
          </div>
          <div class="right">
            <div class="top" @click="$router.push('/lottery')">
              <img src="/static/img/choujiang.jpg" alt>
            </div>
            <div class="bottom" @click="showShare=true">
              <img src="/static/img/yaoqing.jpg" alt>
            </div>
          </div>
          <van-popup v-model="showShare">
            <Share></Share>
          </van-popup>
        </div>

        <!-- 广告轮播 -->
        <div class="swiper-wrap likeYou" v-if="swiperData.length">
          <p class="title-like">猜你喜欢</p>
          <van-swipe :autoplay="3000">
            <van-swipe-item>
              <div
                class="card-like"
                v-for="(item,index) in swiperData.slice(0,3)"
                :key="index"
                @click="$router.push(`/mallDetail/${item.goods_id}`)"
              >
                <img :src="item.original_img" alt>
                <h5>{{item.goods_name | flow}}</h5>
                <span class="price">￥{{item.shop_price}}</span>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div
                class="card-like"
                v-for="(item,index) in swiperData.slice(3,6)"
                :key="index"
                @click="$router.push(`/mallDetail/${item.goods_id}`)"
              >
                <img :src="item.original_img" alt>
                <h5>{{item.goods_name | flow}}</h5>
                <span class="price">￥{{item.shop_price}}</span>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 广告轮播 -->
        <div class="headline" v-if="headline.length">
          <img v-lazy="headlineImg" :key="headlineImg" alt>
          <van-swipe :autoplay="5000" vertical :width="468" :show-indicators="false">
            <van-swipe-item v-for="(item,index) in headline" :key="index">
              <span @click="tolines(item.id)">{{item.title | flow}}</span>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 广告位 -->
        <!-- 实用工具 -->
        <div class="tools">
          <h2>实用工具</h2>
          <div class="list">
            <div v-for="(v,index) in tools" :key="index" @click="jump(index)">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="v.icon"></use>
              </svg>
              <h4>{{v.title}}</h4>
            </div>
          </div>
        </div>
        <!-- 实用工具 -->
        <!-- 宣传栏 -->
        <!-- 本周推荐 -->
        <Recommend></Recommend>
        <!-- 本周推荐 -->
      </div>
      <!-- 底部 -->
      <Foot :idx="0"></Foot>
      <!-- 底部 -->
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import Swiper from "swiper";
import flow from "@/filters/flow.js";
import Share from "@/components/Share";
import Foot from "@/components/Foot";
import Sign from "@/components/Sign";
import Recommend from "@/components/Recommend";
import { mapActions, mapMutations } from "vuex";
import { Toast } from "vant";
import indexApi from "@/api/index";
import getInfoApi from "@/api/getInfo";
import Loading from "@/components/Loading";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content:
          "沂源,沂源网,沂源在线,沂源县,沂源吧,,沂源二手信息,沂源房产,沂源人才,沂源商家,沂源招聘,沂源求职,沂源生活服务,沂源网上商城"
      },
      {
        name: "description",
        content:
          "沂源在线,提供沂源概况,资讯,娱乐,分类信息,企业,商家,服务等综合信息。"
      }
    ]
  },
  data() {
    return {
      tokens: this.defined.access_token, //用户token
      show: false,
      navData: [
        {
          href: "#icon-meishi",
          title: "美食",
          push: "/food"
        },
        {
          href: "#icon-zhaopinhui",
          title: "招聘",
          push: "/job"
        },
        {
          href: "#icon-ershouwupin",
          title: "二手交易",
          push: "/market"
        },
        {
          href: "#icon-toutiao",
          title: "同城头条",
          push: "/headlines/0"
        },
        {
          href: "#icon-richangshenghuo-jiazheng",
          title: "生活服务",
          push: "/life"
        },
        {
          href: "#icon-zu",
          title: "租房",
          push: "/rent"
        },
        {
          href: "#icon-shangpinfangmaimaishoufei",
          title: "房屋买卖",
          push: "/homeTradingList"
        },
        {
          href: "#icon-jinrongtequan",
          title: "急用钱",
          push: "/urgentMoney"
        }
      ],
      swiperData: [],
      swiperList: [],
      tools: [
        {
          icon: "#icon-kuaidichaxun",
          title: "快递查询"
        },
        {
          icon: "#icon-dakatuijian",
          title: "应用推荐"
        },
        {
          icon: "#icon-xiaoer",
          title: "糗事笑话"
        },
        {
          icon: "#icon-cunqianguanicon",
          title: "急用钱"
        }
      ],
      showing: false,
      showShare: false,
      starti: 0,
      count: 0,
      num: 10,
      endi: 0,
      index: 0,
      headlineImg: "../../static/img/icon/icon125.png",
      headline: []
    };
  },
  methods: {
    sign() {
      if (this.defined.access_token) {
        this.setShowSign(true);
      } else {
        Toast("请先登录");
        this.$router.push("/login");
      }
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    getHeadLine() {
      getInfoApi
        .getRollHeadLines()
        .then(res => {
          if (res.data.code === 200) {
            if (this._isMobile()) {
              this.headline = res.data.data;
              this.showing = true;
            } else {
              location.href = "http://www.yiyuanshenghuo.cn";
            }
          }
        })
        .catch(err => {
          this.showing = false;
        });
    },
    tolines(i) {
      this.$router.push(`/headLineDetails/${i}`);
    },
    getMallList() {
      getInfoApi
        .getLoveGoods()
        .then(res => {
          if (res.data.code === 200) {
            if (this._isMobile()) {
              this.swiperData = res.data.data;
            } else {
              location.href = "http://www.yiyuanshenghuo.cn";
            }
          } else {
            ;
          }
        })
        .catch(err => {
          this.showing = false;
          alert(111);
        });
    },
    jump(i) {
      switch (i) {
        case (i = 0):
          this.$router.push("/express");
          break;
        case (i = 1):
          this.$router.push("/appRecommend");
          break;
        case (i = 2):
          this.$router.push(`/headlines/${i}`);
          break;
        case (i = 3):
          this.$router.push("/urgentMoney");
          break;
        default:
          break;
      }
    },
    handleChange(value) {
      console.log(value);
    },
    tab(i) {
      this.index = i;
    },
    news() {
      Toast("暂无消息");
    },
    ...mapMutations(["setShowSign"])
  },
  created() {
    //头条
    this.getHeadLine();
    //商城
    this.getMallList();
  },
  mounted() {
    //调试接口
    new Swiper(".swiper-container", {
      slidesPerView: 3,
      slidesPerGroup: 3,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      pagination: {
        el: ".swiper-pagination"
      }
    });
  },
  components: {
    Banner,
    Share,
    Foot,
    Sign,
    Recommend,
    Loading
  }
};
</script>

<style scoped lang="less">
#head {
  width: 100%;
  height: 84px;
  display: flex;
  align-items: center;
  position: fixed;
  background: #fff;
  z-index: 50;
  box-sizing: border-box;
  padding: 0 30px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  top: 0;
  left: 0;
  .sign {
    display: flex;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 40px;
      height: 40px;
    }
    span {
      color: #333;
      font-size: 20px;
    }
  }
  img {
    width: 40px;
    height: 40px;
  }
  .news {
    display: flex;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 40px;
      height: 40px;
    }
    span {
      color: #333;
      font-size: 20px;
    }
  }
  .title {
    font-size: 40px;
    font-weight: 100;
  }
}
#main {
  background: #ecf0f1;
  width: 100%;
  margin-bottom: 123px;
  margin-top: 84px;
  .nav {
    padding-top: 24px;
    display: flex;
    flex-wrap: wrap;
    margin: 14px 14px 21px 14px;
    background: #fff;
    justify-content: space-between;
    .item {
      width: 150px;
      font-size: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 24px;
      .icon {
        width: 80px;
        height: 80px;
        margin-bottom: 14px;
      }
    }
  }
  .advertise {
    border-top: 1px solid #e4e5e6;
    margin: 0 14px;
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    .integral {
      width: 48%;
      img {
        width: 100%;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 280px;
      width: 48%;
      div {
        width: 100%;
        height: 48%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .swiper-wrap {
    margin: 0 14px;
    background: #fff;
    padding: 0 20px;
    overflow: auto;
    .swiper-container {
      .swiper-pagination-bullets {
        bottom: -40px;
      }
    }
    .title-like {
      font-size: 35px;
      color: #333;
      line-height: 87px;
    }
    .card-like {
      width: 200px;
      margin: 0 16px;
      img {
        width: 200px;
        height: 216px;
      }
      h5 {
        font-size: 20px;
        line-height: 36px;
        color: #333;
        font-weight: 100;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        font-size: 16px;
        color: #e7757d;
      }
    }
  }
  .headline {
    height: 76px;
    background: #fff;
    margin: 0 14px 14px 14px;
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    img {
      height: 39px;
      margin-right: 48px;
    }
    span {
      color: #ff6600;
      height: 76px;
      width: 468px;
      line-height: 76px;
      display: block;
      font-size: 24px;
    }
  }
  .tools {
    margin: 0 14px 14px;
    background: #fff;
    box-sizing: border-box;
    padding: 0 34px 40px;
    h2 {
      height: 60px;
      font-size: 29px;
      color: #333;
      font-weight: 700;
      line-height: 60px;
    }
    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 100px;
          height: 100px;
        }
        h4 {
          color: #666;
          font-size: 26px;
          font-weight: 100;
        }
      }
    }
  }
  .recommend {
    margin: 0 14px;
    background: #fff;
    .title {
      height: 78px;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -8px;
        margin-left: -50%;
        width: 100%;
      }
      h4 {
        line-height: 78px;
        text-align: center;
        font-size: 30px;
        color: #4d4d4d;
      }
    }
    .tabs {
      height: 62px;
      background: #ecf0f1;
      .tab {
        width: 250px;
        height: 62px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ecf0f1;
        border-top: 5px solid transparent;
        span {
          font-size: 26px;
          color: #808080;
        }
      }
      .active {
        border-top-color: #ecf0f1;
        background: #fff;
        span {
          color: #333;
        }
      }
    }
    .list-recommend {
      overflow: hidden;
      background: #fff;
      .card {
        position: relative;
        border-bottom: 2px solid #ccc;
        background: #fff;
        display: flex;
        height: 200px;
        padding: 0 12px;
        align-items: center;
        box-sizing: content-box;
        font-size: 24px;
        img {
          height: 150px;
          width: 150px;
        }
        div.txt {
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: 30px;

          .title-card {
            font-size: 24px;
            font-weight: 600;
          }
          .desc {
            color: #929292;
          }
          .activities {
            color: #86d0c4;
          }
        }
        .browse {
          position: absolute;
          bottom: 30px;
          right: 20px;
          display: flex;
          align-items: center;
          img {
            width: 46px;
            height: 40px;
          }
          span {
            color: #808080;
          }
        }
      }
      .card:last-child {
        border: 0;
      }
    }
  }
}
</style>