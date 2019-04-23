<template>
  <div>
    <Head :i="0"></Head>
    <!-- 主体 -->
    <div id="main">
      <!-- 轮播 -->
      <Swiper :position_id="4"></Swiper>
      <!-- 轮播 -->
      <!-- 服务项目菜单 -->
      <div class="our-service">
        <div class="wrap">
          <div class="title">
            <h2>服务项目</h2>
            <p>OUR SERVICE</p>
          </div>
          <div class="service-list">
            <Row>
              <i-col span="8" v-for="(item,i) in serviceList" :key="i">
                <div class="item" @click="enterService(i)">
                  <i
                    class="iconfont animated"
                    :class="item.class"
                    @mouseover="rotate(i)"
                    @mouseleave="leave(i)"
                  ></i>
                  <span>{{item.name}}</span>
                </div>
              </i-col>
            </Row>
          </div>
        </div>
      </div>
      <!-- 服务项目菜单 -->
      <!-- 来疯购商城 -->
      <div class="wrap shop-wrapper">
        <Row>
          <i-col span="16">
            <div class="shop">
              <div class="head clearfix">
                <h2 class="title fl">来疯购商城</h2>
                <p class="more fr">
                  <span @click="$router.push('/mall')">查看更多</span>
                  <i class="iconfont icon-arrow-right"></i>
                </p>
              </div>
              <div class="content">
                <Row>
                  <i-col span="8">
                    <div class="show">
                      <img v-lazy="imgData.goods_img" :key="imgData.goods_img" alt>
                    </div>
                  </i-col>
                  <i-col span="16">
                    <ul class="shop-list base-list">
                      <li
                        class="item fl"
                        v-for="(item,i) in mallList"
                        :key="i"
                        @click="$router.push(`/mall/mallDetail/${item.goods_id}`)"
                      >
                        <div class="img">
                          <img v-lazy="item.original_img" :key="item.original_img" alt :title="item.goods_name">
                        </div>
                        <p class="title">{{item.goods_name}}</p>
                        <div class="price-wrap">
                          <span class="sale">￥{{item.shop_price}}</span>
                          <span class="price">{{item.market_price}}</span>
                        </div>
                      </li>
                    </ul>
                  </i-col>
                </Row>
              </div>
            </div>
          </i-col>
          <i-col span="8">
            <div class="info-convenience">
              <h3>便民信息</h3>
              <div class="content clear">
                <div class="card" @click="$router.push('/lottery')">
                  <svg class="icon animated" aria-hidden="true">
                    <use xlink:href="#icon-caichoujiang"></use>
                  </svg>
                  <span>幸运抽奖</span>
                </div>
                <div class="card" @click="$router.push('/loans')">
                  <svg class="icon animated" aria-hidden="true">
                    <use xlink:href="#icon-jiyongqian"></use>
                  </svg>
                  <span>急用钱</span>
                </div>
                <div class="card" @click="invited">
                  <svg class="icon animated" aria-hidden="true">
                    <use xlink:href="#icon-yaoqingfanli"></use>
                  </svg>
                  <span>有奖邀请</span>
                </div>
                <div class="card" @click="$router.push('/pushApp')">
                  <svg class="icon animated" aria-hidden="true">
                    <use xlink:href="#icon-xianshangtuijian"></use>
                  </svg>
                  <span>应用推荐</span>
                </div>
              </div>
            </div>
            <div class="pubilic">
              <img src="../../static/img/material/erweima-index.jpg" alt="微信扫描二维码关注沂源生活公众号">
              <p>关注沂源生活公众号</p>
            </div>
          </i-col>
        </Row>
      </div>
      <!-- 来疯购商城 -->
      <!-- 美食 -->
      <div class="food wrapper">
        <div class="wrap">
          <div class="head clearfix">
            <h2 class="title fl">美食</h2>
            <p class="more fr">
              <span @click="$router.push('/food')">查看更多</span>
              <i class="iconfont icon-arrow-right"></i>
            </p>
          </div>
          <ul class="food-list clear base-list">
            <li class="fl first">
              <img v-lazy="imgData.shop_img" :key="imgData.shop_img" alt>
            </li>
            <li class="item fl" v-for="(item,i) in foodList" :key="i" @click="$router.push(`/food/foodDetail/${item.shop_id}`)">
              <div class="img">
                <img v-lazy="item.thumb" :key="item.thumb" alt>
              </div>
              <p class="title">{{item.shop_name}}</p>
              <p class="intro">{{item.intro | flow}}</p>
              <div class="price-wrap">
                <span class="sale">人均：￥{{item.consumption}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 美食 -->
      <!-- 租房 -->
      <div class="rent wrapper">
        <div class="wrap">
          <div class="head clearfix">
            <h2 class="title fl">租房</h2>
            <p class="more fr">
              <span @click="$router.push('/rent')">查看更多</span>
              <i class="iconfont icon-arrow-right"></i>
            </p>
          </div>
          <ul class="rent-list clear base-list">
            <li class="fl first">
              <img v-lazy="imgData.house_tent_img" :key="imgData.house_tent_img" alt>
            </li>
            <li class="item fl" v-for="(item,i) in rentList" :key="i" @click="$router.push(`/rent/rentDetail/${item.house_id}`)">
              <div class="img">
                <img v-lazy="item.thumb" :key="item.thumb" alt>
              </div>
              <p class="title">{{item.house_title}}</p>
              <p class="desc">{{item.house_area}}-朝向：{{item.orientation}}-{{item.acreage}}平方米</p>
              <div class="price-wrap">
                <span class="sale">{{item.price}}元/月</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 租房 -->
      <!-- 招聘 -->
      <div class="recruitment wrap">
        <div class="head clearfix">
          <h2 class="title fl">招聘</h2>
          <p class="more fr">
            <span @click="$router.push('/recruitment')">查看更多</span>
            <i class="iconfont icon-arrow-right"></i>
          </p>
        </div>
        <div class="content clear">
          <div class="img fl">
            <img v-lazy="imgData.recruitment_img" :key="imgData.recruitment_img" alt>
          </div>
          <ul class="job-list fl">
            <li class="item" v-for="(item,index) in jobList" :key="index" @click="$router.push(`/recruitment/jobDetail/${item.id}`)">
              <h4 class="title">{{item.title}}</h4>
              <div class="desc">
                <span v-if="item.discuss == 1">月薪{{item.monthly_pay_small}}-{{item.monthly_pay_big}}元/月</span>
                <span v-else>面议</span>
                <p>职位：{{item.cate_name}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 招聘 -->
      <!-- 二手市场 -->
      <div class="market">
        <div class="wrap">
          <div class="head clearfix">
            <h2 class="title fl">二手市场</h2>
            <p class="more fr">
              <span @click="$router.push('/secondhand')">查看更多</span>
              <i class="iconfont icon-arrow-right"></i>
            </p>
          </div>
          <div class="content clear">
            <div class="first fl">
              <img v-lazy="imgData.used_img" :key="imgData.used_img" alt>
            </div>
            <ul class="base-list list">
              <li class="item fl" v-for="(item,i) in marketList" :key="i" @click="$router.push(`/secondhand/secondhandDetail/${item.used_id}`)">
                <div class="img">
                  <img v-lazy="item.thumb" :key="item.thumb" alt>
                </div>
                <p class="tag">
                  <span>{{item.oldTxt}}</span>
                </p>
                <p class="title">{{item.used_title}}</p>
                <div class="price-wrap">
                  <span class="sale">{{item.price}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 二手市场 -->
      <!-- 同城头条 -->
      <div class="headline wrap" v-if="linesList.length != 0">
        <div class="head clearfix">
          <h2 class="title fl">
            <span>同城头条</span>
          </h2>
          <p class="more fr">
            <span @click="$router.push('/headLine')">查看更多</span>
            <i class="iconfont icon-arrow-right"></i>
          </p>
        </div>
        <div class="wrapper">
          <Row>
            <i-col span="8" v-if="linesList[0].article.length">
              <div class="content-box">
                <p class="red-title" @click="$router.push(`/headLine/headLineDetails/${linesList[0].article[0].id}`)">{{linesList[0].article[0].title | flowHead}}</p>
                <div class="content">
                  <p class="item" v-for="(item,index) in linesList[0].article.slice(1,linesList[0].article.length)" :key="index" @click="$router.push(`/headLine/headLineDetails/${item.id}`)">
                    <span>{{item.title | flowLines}}</span>
                  </p>
                </div>
              </div>
            </i-col>
            <i-col span="8" v-if="linesList[1].article.length">
              <div class="content-box">
                <p class="red-title" @click="$router.push(`/headLine/headLineDetails/${linesList[1].article[0].id}`)">{{linesList[1].article[0].title | flowHead}}</p>
                <div class="content">
                  <p class="item" v-for="(item,index) in linesList[1].article.slice(1,linesList[1].article.length)" :key="index" @click="$router.push(`/headLine/headLineDetails/${item.id}`)">
                    <span>{{item.title | flowLines}}</span>
                  </p>
                </div>
              </div>
            </i-col>
            <i-col span="8" v-if="linesList[2].article.length">
              <div class="content-box">
                <p class="red-title" @click="$router.push(`/headLine/headLineDetails/${linesList[2].article[0].id}`)">{{linesList[2].article[0].title | flowHead}}</p>
                <div class="content">
                  <p class="item" v-for="(item,index) in linesList[2].article.slice(1,linesList[2].article.length)" :key="index" @click="$router.push(`/headLine/headLineDetails/${item.id}`)">
                    <span>{{item.title | flowLines}}</span>
                  </p>
                </div>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
      <!-- 同城头条 -->
      <!-- 房产买卖 -->
      <div class="hometrading">
        <div class="wrap">
          <div class="head clearfix">
            <h2 class="title fl">房屋买卖</h2>
            <p class="more fr">
              <span @click="$router.push('/homeTrading')">查看更多</span>
              <i class="iconfont icon-arrow-right"></i>
            </p>
          </div>
          <div class="content clear">
            <div class="first fl">
              <img v-lazy="imgData.house_trade_img" :key="imgData.house_trade_img" alt>
            </div>
            <ul class="base-list list">
              <li class="item fl" v-for="(item,i) in tradeList" :key="i" @click="$router.push(`/homeTrading/homeTradingDetail/${item.house_id}`)">
                <div class="img">
                  <img v-lazy="item.thumb" :key="item.thumb" alt>
                </div>
                <p class="title">{{item.house_title}}</p>
                <p class="desc">{{item.acreage}}平方/朝向{{item.orientation}}</p>
                <div class="price-wrap">
                  <span class="sale">{{item.price}}万元</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 房产买卖 -->
      <!-- 生活服务 -->
      <div class="food wrapper">
        <div class="wrap">
          <div class="head clearfix">
            <h2 class="title fl">生活服务</h2>
            <p class="more fr">
              <span @click="$router.push('/life')">查看更多</span>
              <i class="iconfont icon-arrow-right"></i>
            </p>
          </div>
          <ul class="food-list clear base-list">
            <li class="fl first">
              <img v-lazy="imgData.service_img" :key="imgData.service_img" alt>
            </li>
            <li class="item fl" v-for="(item,i) in lifeList" :key="i" @click="$router.push(`/life/lifeDetail/${item.service_id}`)">
              <div class="img">
                <img v-lazy="item.thumb" :key="item.thumb" alt>
              </div>
              <p class="title">{{item.service_title}}</p>
              <div class="price-wrap">
                <span class="sale">分类：{{item.cate_name}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 生活服务 -->
      <!-- GIF动图 -->
      <div class="gif wrap" v-if="gifList.length">
        <h2 class="title">
          <span @click="$router.push('/headLine')">GIF动图</span>
        </h2>
        <div class="content">
          <ul class="list clear">
            <li
              class="card fl"
              v-for="(item,index) in gifList"
              :key="index"
              @mouseover="tap(index)"
              @mouseleave="back(index)"
              @click="$router.push(`/headLine/headLineDetails/${item.id}`)"
            >
              <img src="../../static/img/function/load.gif" alt v-show="i!=index">
              <img v-lazy="item.thumb" :key="item.thumb" alt v-show="i==index">
              <p class="title">{{item.title | flowHead}}</p>
              <div class="box clear">
                <p class="fr browse">
                  <i class="iconfont icon-liulan"></i>
                  <span>{{item.hits}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- GIF动图 -->
    </div>
    <!-- 主体 -->
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import flow from "@/filters/flow.js";
import flowHead from "@/filters/flowHead.js";
import flowLines from "@/filters/flowLines.js";
import formateTime from "@/common/formateTime.js";
import { mapActions, mapState } from "vuex";
import getInfoApi from "@/api/getInfo";
import Foot from "@/components/Foot";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源,沂源网,沂源在线,沂源县,沂源吧,,沂源二手信息,沂源房产,沂源人才,沂源商家,沂源招聘,沂源求职,沂源生活服务,沂源网上商城"
      },
      {
        name: "description",
        content: "沂源在线,提供沂源概况,资讯,娱乐,分类信息,企业,商家,服务等综合信息。"
      }
    ]
  },
  data() {
    return {
      i: -1,
      oldList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "全新"
        },
        {
          id: 2,
          name: "95新"
        },
        {
          id: 3,
          name: "9成新"
        },
        {
          id: 4,
          name: "85新"
        },
        {
          id: 5,
          name: "8成新"
        }
      ],
      serviceList: [
        {
          class: "icon-wangzhang",
          name: "网站建设"
        },
        {
          class: "icon-wodeguanggao",
          name: "广告合作"
        },
        {
          class: "icon-daikuan",
          name: "急用钱"
        }
      ], //服务功能
      shopList: [], //商城
      jobList: [], //求职招聘
      marketList: [], //二手市场
      lifeList: [], //生活服务
      gifList: [], //gif动图
      rentList: [],
      tradeList: [],
      foodList: [],
      index: 0,
      weatherData: {}, //天气数据
      webToken: {},
      mallList: [],
      linesList:[],
      imgData:{},
    };
  },
  methods: {
    rotate(i) {
      this.serviceList[i].class = this.serviceList[i].class + " jello";
    },
    leave(i) {
      let arr = this.serviceList[i].class.split(" ");
      this.serviceList[i].class = arr[0];
    },
    //以上为动画效果
    tap(i) {
      this.i = i;
    },
    back(i) {
      this.i = -1;
    },
    enterService(i) {
      if (i == 2) {
        this.$router.push("/loans");
      } else if (i == 1) {
        this.$router.push("/contact");
      }else{
        this.$Message.info("正在制作中...")
      }
    },
    invited() {
      if (!this.webToken) {
        this.$Message.info("请先去登录");
      } else {
        this.$router.push("/invited");
      }
    },
    //gif显示效果
    getAllList() {
      let params = {
        type: "recommend"
      };
      getInfoApi
        .getPublishShop(params)
        .then(res => {
          if (res.data.code === 200) {
            this.foodList = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => document.getElementById("app").style.display = "none");
      // 店铺
      getInfoApi
        .getPublishService(params)
        .then(res => {
          if (res.data.code === 200) {
            this.lifeList = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => document.getElementById("app").style.display = "none");
     // 生活服务
      getInfoApi
        .getPublishUsed(params)
        .then(res => {
          if (res.data.code === 200) {
            this.marketList = res.data.data;
            this.marketList.forEach(el=>{
              this.oldList.forEach(e=>{
                if(e.id == el.old){
                  el.oldTxt=e.name;
                }
              })
            });
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => document.getElementById("app").style.display = "none");
      // 二手物品
      getInfoApi
        .getPublishRecruitment(params)
        .then(res => {
          if (res.data.code === 200) {
            this.jobList = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => document.getElementById("app").style.display = "none");
      // 职位招聘
      getInfoApi
        .getPublishHouseTrade(params)
        .then(res => {
          if (res.data.code === 200) {
            this.tradeList = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => document.getElementById("app").style.display = "none");
      // 房屋买卖
      getInfoApi
        .getPublishHouseRent(params)
        .then(res => {
          if (res.data.code === 200) {
            this.rentList = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => document.getElementById("app").style.display = "none");
      // 房屋出租
      getInfoApi
        .getLoveGoods()
        .then(res => {
          if (res.data.code === 200) {
            this.mallList = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => document.getElementById("app").style.display = "none");
      //获取商城
      getInfoApi.getIndexArticle().then(res=>{
        if(res.data.code === 200){
          this.linesList=res.data.data;
        }else{
          this.$Message.info(res.data.msg);
        }
      }).catch(err=>document.getElementById("app").style.display = "none");
      //获取头条
      getInfoApi.getPcSystem().then(res=>{
        ;
        if(res.data.code === 200){
          this.imgData=res.data.data;
        }else{
          this.$Message.info(res.data.msg);
        }
      }).catch(err=>document.getElementById("app").style.display = "none");
      //获取gif
      getInfoApi.getGifImg().then(res=>{
        ;
        if(res.data.code === 200){
          this.gifList=res.data.data;
          
        }
      }).catch(err=>console.log(err));
    }
    //获取数据
  },
  mounted() {
    //加载天气查询插件
    this.webToken = JSON.parse(localStorage.getItem("webToken"));
    console.log(this.webToken);
    this.getAllList();
  },
  components: {
    Swiper,
    Head,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  h2 {
    font-size: 27px;
  }
  .wrap {
    div.head {
      margin-bottom: 20px;
      h2.title {
        border-bottom: 2px solid #f44;
      }
      p.more {
        padding-top: 24px;
        color: #57a8f5;
        .iconfont {
          font-size: 12px;
        }
      }
      .more:hover {
        cursor: pointer;
        color: #d4282d;
      }
    }
    .base-list {
      .item {
        margin-left: 17px;
        width: 30%;
        cursor: pointer;
        .img {
          width: 100%;
          padding-top:100%;
          background: #f4f0ea;
          position: relative;
          overflow: hidden;
          img {
            position: absolute;
            top:0;
            left:0;
            height:100%;
            width: 100%;
            transition: transform 0.5s;
          }
        }
        .img:hover img {
          transform: scale(1.1);
        }
        p {
          text-align: center;
        }
        .desc{
          margin:5px 0;
        }
        .tag {
          margin-top: 5px;
          margin-bottom: 5px;
          span {
            display: inline-block;
            color: #fff;
            background: #e36844;
            padding: 2px;
          }
        }
        .title {
          font-weight: 700;
          line-height: 24px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price-wrap {
          text-align: center;
          .sale {
            color: #d4282d;
          }
          .price {
            color: #999;
            text-decoration: line-through;
          }
        }
      }
    }
  }
  .our-service {
    margin-top: 30px;
    div.title {
      h2,
      p {
        text-align: center;
      }
      p {
        font-weight: 700;
        font-size: 14px;
      }
    }
    .service-list {
      text-align: center;
      .item {
        .iconfont {
          display: block;
          font-size: 60px;
          height: 75px;
          margin: 0 auto;
          margin-bottom: 10px;
          width: 75px;
        }
      }
      .item:hover {
        cursor: pointer;
      }
    }
  }
  .headline {
    .title {
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #ccc;
      span {
        border-bottom: 2px solid #f44;
        padding-bottom: 4px;
      }
    }
    .wrapper {
      margin-top: 20px;
      .img {
        img {
          width: 100%;
          height: 150px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
          position: relative;
        }
        span {
          position: absolute;
          font-size: 16px;
          height: 32px;
          line-height: 32px;
          width: 193px;
          left: 0;
          text-align: center;
          color: #fff;
          z-index: 5;
        }
        span:hover {
          background: rgba(0, 0, 0, 0.4);
          cursor: pointer;
        }
        .desc-one {
          top: 118px;
          width: 100%;
        }
        .desc-two {
          top: 279px;
        }
        .desc-three {
          top: 279px;
          left: 206px;
        }
        .img-box {
          img {
            width: 193px;
            display: inline-block;
            height: 150px;
          }
          img:first-child {
            margin-right: 10px;
          }
        }
      }
      .content-box,
      .content1-box {
        border-right: 1px solid #ccc;
        p.red-title {
          text-align: center;
          color: #ff5e5e;
          font-size: 22px;
          margin-bottom: 21px;
          cursor: pointer;
        }
        .content {
          text-align: center;
          .item {
            line-height: 32px;
            font-size: 14px;
            span{
              width:100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:hover {
              cursor: pointer;
              color: #ff6862;
            }
          }
        }
      }
      .content1-box {
        border: none;
      }
    }
  }
  .shop-wrapper {
    margin-bottom: 20px;
    .shop .content {
      .show {
        width:242px;
        height:404px;
        img {
          width: 100%;
          height:100%;
        }
      }
    }
    .info-convenience {
      padding-left: 40px;
      h3 {
        font-size: 16px;
        height: 42px;
        padding-top: 20px;
        margin-bottom: 20px;
      }
      .content {
        .card {
          float: left;
          text-align: center;
          margin-left: 65px;
          margin-bottom: 16px;
          .icon {
            width: 60px;
            height: 60px;
            display: block;
            margin-bottom: 10px;
          }
          span {
            font-size: 14px;
          }
        }
        .card:hover {
          cursor: pointer;
        }
      }
    }
    .pubilic{
      text-align: center;
      img{
        height:162px;
      }
      p{
        height:28px;
        font-size:14px;
        color:#333;
        line-height:28px;
      }
    }
  }
  .food {
    background: #f4f0ea;
    padding-bottom: 10px;
  }
  .wrapper {
    .food-list,
    .rent-list {
      .item {
        width: 14%;
        margin-left: 23px;
        .img {
          background: #fff;
        }
      }
      .first {
        overflow: hidden;
        img {
          height: 242px;
          width:242px;
          transition: transform 1s;
        }
      }
      .first:hover {
        img {
          transform: scale(1.1);
        }
      }
    }
    .food-list {
      .title {
        color: #333;
      }
      .intro {
        color: #999;
        line-height: 30px;
      }
    }
  }
  .rent {
    .rent-list {
      .item {
        .img {
          background: #f4f0ea;
        }
      }
    }
  }
  .recruitment .content {
    margin-bottom: 20px;
    .img {
      background: #f4f0ea;
      overflow: hidden;
      width:242px;
      height:242px;
      img {
        transition: transform 1s;
        width:100%;
        height:100%;;
      }
    }
    .img:hover {
      img {
        transform: scale(1.1);
      }
    }
    .job-list {
      width:958px;
      li.item {
        float: left;
        margin-left: 39px;
        margin-bottom: 49px;
        width:200px;
        .title {
          width:100%;
          font-size: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
        .title:hover{
          cursor: pointer;
          color:#b4a078;
        }
        .name {
          text-align: right;
          line-height: 30px;
          font-size: 16px;
        }
        .desc {
          text-align: center;
          font-size: 14px;
          span{
            color:#f44;
          }
        }
      }
    }
  }
  .market,
  .hometrading {
    background: #f4f0ea;
    padding-bottom:20px;
    margin-bottom: 20px;
    .content {
      .first {
        width: 242px;
        height:417px;
        img {
          width: 100%;
          height:100%;
        }
      }
      .list {
        .item {
          width: 13%;
          .img {
            background: #fff;
          }
        }
      }
    }
  }
  .hometrading {
    background: #fff;
    .content{
      .first {
        width: 242px;
        height:242px;
        img {
          width: 100%;
          height:100%;
        }
      }
    }
    .content {
      .list {
        .item {
          img {
            background: #f4f0ea;
            width:168px;
            height:168px;
          }
          .title{
            font-size:16px;
          }
          .title:hover{
            cursor: pointer;
            color:#b4a078;
          }
        }
      }
    }
  }
  .life {
    background: #f4f0ea;
    padding-bottom: 20px;
    .wrap {
      .img {
        background: #fff;
        overflow: hidden;
        img {
          transition: transform 1s;
          width: 202px;
        }
      }
      .img:hover {
        img {
          transform: scale(1.1);
        }
      }
      .life-list {
        margin-left: 285px;
        margin-top: -202px;
        li.item {
          float: left;
          margin-left: 39px;
          margin-bottom: 20px;
          .title {
            font-size: 18px;
          }
          .content {
            width: 140px;
            text-indent: 2em;
          }
        }
        .item:hover {
          color: #f44;
          cursor: pointer;
        }
      }
    }
  }
  .gif {
    margin-top: 40px;
    .title {
      text-align: center;
      font-size: 27px;
      line-height: 60px;
      height: 60px;
      span {
        border-bottom: 2px solid #f44;
      }
      span:hover {
        cursor: pointer;
        color: #b4a078;
      }
    }
    .content {
      background: #f4f0ea;
      padding: 20px 60px;
      .list {
        .card {
          width: 200px;
          margin-right: 18px;
          border: 1px solid transparent;
          border-radius: 5px;
          background: #fff;
          cursor: pointer;
          img {
            width: 100%;
            height: 110px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }
          .title {
            font-size: 14px;
            height: 24px;
            line-height: 24px;
            text-align: left;
            padding-left: 10px;
          }
          .box {
            padding-left: 10px;
            .browse {
              margin-right: 20px;
            }
          }
        }
        .card:hover {
          border: 1px solid #fc0;
        }
        .card:last-child {
          margin: 0;
        }
      }
    }
  }
}
</style>