<template>
  <div>
    <Head :i="4"></Head>
    <!-- 头部 -->
    <!-- 主体 -->
    <div id="main">
      <div class="wrap">
        <div class="top">
          <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <span class="index" @click="jump">首页</span>
            <i class="iconfont icon-arrow-r-copy"></i>
            <span class="current">商城</span>
          </div>
          <!-- 面包屑导航 -->
          <!-- 轮播 -->
          <Swiper :h="400" :position_id="12"></Swiper>
          <!-- 轮播 -->
        </div>
        <div class="main">
          <!-- 分类导航 -->
          <div class="nav-list" v-show="showCateChd">
            <ul class="class-list clear">
              <li class="title">分类:</li>
              <li
                class="item"
                v-for="(item,index) in cateList"
                :key="index"
                @click="changeCate(item.id)"
                :class="{active:item.id==cateId}"
              >
                <span>{{item.name}}</span>
              </li>
            </ul>
            <ul class="class-list clear">
              <li class="title">类型:</li>
              <li
                class="item"
                v-for="(item,index) in typeList"
                :key="index"
                @click="changeType(item.type)"
                :class="{active:item.type==type}"
              >
                <span>{{item.name}}</span>
              </li>
            </ul>
            <ul class="class-list clear">
              <li class="title">排序:</li>
              <li class="item" @click="changeSort(0)" :class="{active:sort=='default'}">
                <span>默认</span>
              </li>
              <li class="item" @click="changePrice">
                <span>价格</span>
                <i class="iconfont icon-none-copy" v-show="priceOrder==-1"></i>
                <svg class="icon" aria-hidden="true" v-show="priceOrder==0">
                  <use xlink:href="#icon-on"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-show="priceOrder==1">
                  <use xlink:href="#icon-under"></use>
                </svg>
              </li>
              <li class="item" @click="changeSort(3)" :class="{active:sort=='time'}">
                <span>上架时间</span>
              </li>
            </ul>
          </div>
          <!-- 分类导航 -->
          <!-- 列表主体 -->
          <div class="list-wrap">
            <!-- 所有列表 -->
            <div class="floor" v-for="(v,i) in allList" :key="i" v-show="showIndex">
              <div class="title" style="padding-top:40px;" v-show="v.goods.length">
                <h2>
                  <span>{{v.name}}</span>
                </h2>
              </div>
              <div class="wrapper">
                <ul class="list clear">
                  <li
                    class="item fl"
                    v-for="(item,index) in v.goods"
                    :key="index"
                    @click="enterDetail(item.goods_id)"
                  >
                    <div class="img">
                      <img
                        v-lazy="item.original_img"
                        :key="item.original_img"
                        :alt="item.goods_name"
                      >
                    </div>
                    <div class="content">
                      <div class="badge-wrap">
                        <span
                          class="badge"
                          v-show="item.is_recommend==0"
                          style="background:#F9A818;"
                        >推荐</span>
                        <span class="badge" v-show="item.is_hot==0">热卖</span>
                        <span class="badge" v-show="item.is_new==0" style="background:#21D35D;">新品</span>
                      </div>
                      <p class="name">{{item.goods_name | flowMall}}</p>
                      <div class="price-wrap">
                        <span class="sale">￥{{item.shop_price}}</span>
                        <span class="price" v-show="item.market_price!=''">￥{{item.market_price}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 所有列表 -->
            <!-- 指定列表 -->
            <div class="floor" v-show="!showIndex">
              <div class="wrapper">
                <ul class="list clear">
                  <li
                    class="item fl"
                    v-for="(item,index) in list"
                    :key="index"
                    @click="enterDetail(item.goods_id)"
                  >
                    <div class="img">
                      <img
                        v-lazy="item.original_img"
                        :key="item.original_img"
                        :alt="item.goods_name"
                      >
                    </div>
                    <div class="content">
                      <div class="badge-wrap">
                        <span
                          class="badge"
                          v-show="item.is_recommend==0"
                          style="background:#F9A818;"
                        >推荐</span>
                        <span class="badge" v-show="item.is_hot==0">热卖</span>
                        <span class="badge" v-show="item.is_new==0" style="background:#21D35D;">新品</span>
                      </div>
                      <p class="name">{{item.goods_name | flowMall}}</p>
                      <div class="price-wrap">
                        <span class="sale">￥{{item.shop_price}}</span>
                        <span class="price" v-show="item.market_price!=''">￥{{item.market_price}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="none" v-show="!show">
                  <i class="iconfont icon-meiyoushuju"></i>
                  <p class="none-content">暂无数据</p>
                </div>
              </div>
              <Page
                :total="total"
                @on-change="changePage"
                :current="mallCurrent"
                style="display:inline-block;margin-left:50%;transform:translateX(-50%);"
                v-show="show"
              />
              <!-- 页码 -->
            </div>
            <!-- 指定列表 -->
          </div>
          <!-- 列表主体 -->
          <div class="none" v-show="showAll">
            <i class="iconfont icon-meiyoushuju"></i>
            <p class="none-content">暂无数据</p>
          </div>
        </div>
      </div>
      <!-- 导航侧边栏 -->
      <div class="aside-nav">
        <div class="head">
          <h2 class="title">来疯购</h2>
          <ul class="cate-list">
            <li
              class="item"
              v-for="(item,index) in asideNav"
              :key="index"
              @click="change(item.id)"
              :class="{active:item.id==activei}"
            >
              <i class="iconfont" :class="item.icon"></i>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 导航侧边栏 -->
    </div>
    <!-- 主体 -->
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import getInfoApi from "@/api/getInfo";
import flowMall from "@/filters/flowMall";
import Foot from "@/components/Foot";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源商城,来疯购商城,家电,手机,服装,母婴,美食"
      },
      {
        name: "description",
        content:
          "沂源在线商城，在线销售进口商品、家电、手机、电脑、服装服饰、母婴、图书、食品等数万个品牌千万种优质商品。便捷、诚信的服务，为您提供愉悦的网上商城购物体验! "
      }
    ]
  },
  data() {
    return {
      priceOrder: -1,
      asideNav: [],
      cateList: [],
      allList: [],
      typeList: [
        {
          type: "is_hot",
          name: "热卖"
        },
        {
          type: "is_new",
          name: "新品"
        },
        {
          type: "is_recommend",
          name: "推荐"
        }
      ],
      sortlist: ["default", "price_desc", "price_asc", "time"],
      list: [],
      showIndex: false,
      showCateChd: false,
      activei: 0,
      pid: 0,
      cateId: "",
      type: "",
      sort: "default",
      mallCurrent: 1,
      total: 1,
      show: false,
      showAll: false
    };
  },
  methods: {
    jump() {
      this.$router.push("/");
    },
    changePrice() {
      if (this.priceOrder == -1) {
        this.priceOrder = 0;
        this.sort = this.sortlist[1];
        this.getList();
      } else if (this.priceOrder == 0) {
        this.priceOrder = 1;
        this.sort = this.sortlist[2];
        this.getList();
      } else {
        this.priceOrder = -1;
        this.sort = "default";
        this.getList();
      }
    },
    change(i) {
      this.activei = i;
      this.pid = i;
      this.type = "";
      this.cateId = "";
      this.sort = "default";
      this.mallCurrent = 1;
      this.showCateChd = false;
      if (i === 0) {
        //index
        this.getAllList();
      } else {
        this.getCate();
        this.getList();
      }
    },
    changePage(i) {
      //分页
      this.mallCurrent = i;
      this.getList();
      window.scrollTo(0, 600);
    },
    changeCate(i) {
      this.cateId = i;
      this.getList();
    },
    changeType(v) {
      this.type = v;
      this.getList();
    },
    changeSort(i) {
      this.sort = this.sortlist[i];
      this.getList();
    },
    enterDetail(i) {
      let data = {
        path: "/mall",
        name: "商城",
        now: "商城详情页"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("mallBread", data);
      this.blank(i);
    },
    blank(i) {
      const { href } = this.$router.resolve({
        path: `/mall/mallDetail/${i}`,
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    getCate() {
      let params = {
        pid: this.pid
      };
      getInfoApi
        .getMallCate(params)
        .then(res => {
          if (res.data.code === 200) {
            if (this.pid === 0) {
              this.asideNav = res.data.data;
              this.asideNav.unshift({
                id: 0,
                name: "推荐商品"
              });
            } else {
              this.cateList = res.data.data;
              this.cateList.unshift({
                id: "",
                name: "全部"
              });
            }
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log("err"));
    },
    getList() {
      let params = {
        type: this.type,
        cate_id: this.cateId,
        cate_pid: this.pid,
        sort: this.sort,
        page: this.mallCurrent
      };
      getInfoApi
        .getMallList(params)
        .then(res => {
          if (res.data.code === 200) {
            this.list = [];
            if (!res.data.data.length) {
              this.show = false;
              this.showIndex = false;
              this.showCateChd = true;
            } else {
              this.list = res.data.data;
              this.total = res.data.count;
              this.showIndex = false;
              this.showCateChd = true;
              this.show = true;
            }
          } else {
            this.$Message.info(res.data.msg);
            this.activei = 0;
            this.getAllList();
          }
        })
        .catch(err => console.log("err"));
    },
    getAllList() {
      getInfoApi
        .getMallIndex()
        .then(res => {
          this.showIndex = true;
          if (res.data.code == 200) {
            if (res.data.data.length) {
              this.allList = res.data.data;
            } else {
              this.showAll = true;
            }
          } else {
            this.showAll = true;
            console.log(res.data.msg);
          }
        })
        .catch(err => this.$router.push("/notFound"));
    },
    position() {
      let len = $(".aside-nav").offset().top;
      $(window).scroll(function() {
        let iTop = $(document).scrollTop();
        iTop += 80;

        if (iTop > len) {
          $(".aside-nav").css({
            position: "fixed",
            top: 80,
            zIndex: 5
          });
        } else {
          $(".aside-nav").css({
            position: "absolute",
            top: 410
          });
        }
      });
      window.onresize = resizeBannerImage; //当窗口改变宽度时执行此函数
      let widths = $(window).width();
      function resizeBannerImage() {
        var winW = $(window).width();
        if ($(window).width() > widths) {
          console.log(winW);
          $(".aside-nav").css({
            left: 110 + (winW - widths)
          });
        } else {
          $(".aside-nav").css({
            left: widths - winW > 110 ? 0 : 110 - (widths - winW)
          });
        }
      }
    }
  },
  created() {
    this.getCate();
    this.getAllList();
  },
  mounted() {
    this.position();
  },
  components: {
    Head,
    Swiper,
    Foot
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f4f0ea;
  padding-bottom: 50px;
  .wrap {
    div.top {
      margin-bottom: 30px;
      .breadcrumb {
        height: 50px;
        line-height: 50px;
        font-size: 0;
        color: #999;
        span,
        .iconfont {
          font-size: 12px;
        }
        .index {
          color: #333;
        }
        .index:hover {
          text-decoration: underline;
          cursor: pointer;
        }
        .iconfont {
          display: inline-block;
          margin: 0 8px;
        }
      }
    }
    .main {
      position: relative;
      background: #fff;
      .none {
        text-align: center;
        .iconfont {
          font-size: 240px;
          color: #b4a078;
        }
        .none-content {
          font-size: 18px;
          color: #b4a078;
        }
      }
      .nav-list {
        padding: 10px 40px 40px;
        .class-list {
          height: 54px;
          line-height: 54px;
          border-bottom: 1px dashed #ddd;
          li {
            float: left;
            font-size: 14px;
          }
          .title {
            color: #999;
          }
          .item {
            cursor: pointer;
            margin-left: 30px;
            color: #333;
            .icon {
              width: 16px;
              height: 16px;
            }
          }
          .active {
            color: #b4a078;
          }
          .item:hover {
            span {
              color: #b4a078;
            }
          }
        }
      }
      .list-wrap {
        padding: 0 50px;
        .floor {
          margin-bottom: 20px;
          .title {
            text-align: center;
            margin-bottom: 35px;
            h2 {
              font-size: 24px;
              color: #333;
              margin-bottom: 20px;
            }
            .sub {
              font-size: 14px;
              color: #999;
              line-height: 21px;
            }
          }
          .wrapper {
            .list {
              .item {
                width: 263px;
                height: 400px;
                margin-right: 16px;
                margin-bottom: 55px;
                text-align: center;
                position: relative;
                .img {
                  overflow: hidden;
                }
                img {
                  width: 100%;
                  transition: transform 1s;
                }
                .img:hover img {
                  transform: scale(1.1);
                }
                .badge-wrap {
                  height: 36px;
                  line-height: 36px;
                  .badge {
                    display: inline-block;
                    height: 20px;
                    line-height: 20px;
                    background: #f44;
                    color: #fff;
                    font-size: 12px;
                    padding: 0 4px;
                    text-align: center;
                  }
                }
                .name {
                  color: #333;
                  font-weight: 700;
                  font-size: 14px;
                }
                .name:hover {
                  color: #b4a078;
                  cursor: pointer;
                }
                div.price-wrap {
                  position: absolute;
                  bottom: 20px;
                  left: 50%;
                  transform: translateX(-50%);
                  .sale {
                    color: #f44;
                    font-size: 14px;
                  }
                  .price {
                    color: #999;
                    text-decoration: line-through;
                  }
                }
                .line {
                  height: 1px;
                  width: 150px;
                  background: #ccc;
                  margin: 0 auto;
                  margin-top: 10px;
                  margin-bottom: 10px;
                }
                .ad {
                  font-size: 14px;
                  color: #999;
                }
              }
              .item:nth-child(4n) {
                margin-right: 0;
              }
            }
            .none {
              text-align: center;
              .iconfont {
                font-size: 240px;
                color: #b4a078;
              }
              .none-content {
                font-size: 18px;
                color: #b4a078;
              }
            }
          }
        }
      }
    }
  }
  .aside-nav {
    position: absolute;
    left: 110px;
    top: 410px;
    width: 112px;
    text-align: center;
    div.head {
      height: 42px;
      background: url("../../../static/img/material/bg-aside.png") no-repeat;
      background-size: 100% 100%;
      h2 {
        line-height: 42px;
        color: #f44;
      }
      .cate-list {
        background: #fff;
        border: 1px solid #e2ded6;
        border-top: none;
        padding: 0 12px;
        .item {
          .iconfont {
            color: #f44;
            margin-right: 5px;
          }
          height: 36px;
          line-height: 36px;
          border-bottom: 1px solid #e2ded6;
          text-align: left;
          padding-left: 8px;
          span {
            display: inline-block;
          }
        }
        .item:last-child {
          border: none;
        }
        .active {
          cursor: pointer;
          span {
            font-weight: 700;
            color: #f44;
          }
        }
        .item:hover {
          cursor: pointer;
          span {
            font-weight: 700;
            color: #f44;
          }
        }
      }
    }
  }
}
</style>