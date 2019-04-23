<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
          <router-link class="link" to="/">首页</router-link>
          <i class="iconfont icon-arrow-r-copy"></i>
          <router-link class="link" to="/pushApp">应用推荐</router-link>
          <i class="iconfont icon-arrow-r-copy"></i>
          <span>应用详情页</span>
        </div>
        <!-- 面包屑导航 -->
        <div class="wrapper">
          <div class="info">
            <img :src="data.logo" alt :title="data.app_name">
            <div class="center">
              <h3 class="title">{{data.app_name}}</h3>
              <p class="cate">
                <strong>大小：</strong>
                <span>{{data.size}}M</span>
              </p>
              <Rate disabled v-model="data.star"/>
              <p class="tag">
                <span v-for=" item in data.app_label" :key="item.id">{{item.label_name}}&emsp;</span>
              </p>
            </div>
            <p class="btn" @click="linkUrl" v-show="!showUrl">
              <span>直接下载</span>
            </p>
            <canvas id="qrccode-canvas" v-show="showUrl" style="height: 120px;width: 120px;"></canvas>
          </div>
          <div class="swiper">
            <h3 class="title">屏幕截图</h3>
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(v,i) in data.app_img" :key="i">
                  <img :src="v.img" alt>
                </div>
              </div>
              <div class="swiper-button-prev"></div>
              <!--左箭头-->
              <div class="swiper-button-next"></div>
              <!--右箭头-->
            </div>
          </div>
          <div class="introduction">
            <h3 class="title">应用介绍</h3>
            <div class="content" v-html="data.details"></div>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "swiper";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import Foot from "@/components/Foot";
var QRCode = require("qrcode");
var canvas = "";
export default {
  data() {
    return {
      rate: 4,
      swiperList: [
        "../../../static/img/material/appSwiper01.jpg",
        "../../../static/img/material/appSwiper02.jpg",
        "../../../static/img/material/appSwiper03.jpg",
        "../../../static/img/material/appSwiper04.jpg",
        "../../../static/img/material/appSwiper05.jpg"
      ],
      data: {},
      showUrl: false
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      slidesPerView: 3,
      spaceBetween: 50,
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
    });
    this.$nextTick(function() {
      // DOM操作
      canvas = document.getElementById("qrccode-canvas");
    });
    this.id = parseInt(this.$route.params.id);
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        id: this.id
      };
      getInfoApi
        .getAppDetail(params)
        .then(res => {
          ;
          if (res.data.code == 200) {
            this.data = res.data.data;
          }
        })
        .catch(err => this.$router.push('/notFound'))
    },
    linkUrl() {
      let params={
        id:this.id
      }
      setInfoApi
        .setCountApp(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (this.data.type == 1) {
              location.href = this.data.url;
            } else {
              this.showUrl = true;
              QRCode.toCanvas(canvas, this.data.url, error => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("success");
                }
              });
            }
          }
        })
        .catch(err => this.$router.push('/notFound'))
    }
  },
  components: {
    Head,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  padding: 40px 0;
  background: #f4f0ea;
  .wrap {
    .breadcrumb {
      margin-bottom: 40px;
      font-size: 0;
      .link {
        color: #333;
        font-size: 12px;
      }
      .link:hover {
        text-decoration: underline;
      }
      span,
      .iconfont {
        color: #999;
        font-size: 12px;
      }
    }
    .wrapper {
      .info {
        img {
          width: 120px;
          height: 120px;
        }
        .center {
          display: inline-block;
          margin-left: 10px;
          vertical-align: top;
          .company {
            color: #999;
          }
          .title {
            font-size: 30px;
            color: #333;
          }
          .cate {
            font-size: 14px;
            color: #999;
          }
        }
        margin-bottom: 20px;
      }
      .btn {
        display: inline-block;
        width: 160px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        background: #b4a078;
        border-radius: 4px;
        margin-left: 50px;
        font-size: 16px;
        span:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .swiper {
        padding: 30px 150px;
        background: #fff;
        .title {
          font-size: 24px;
          margin-bottom: 30px;
        }
        .swiper-slide {
          width: 225px !important;
        }
        .swiper-slide img {
          width: 225px;
          height: 400px;
        }
        .swiper-container .swiper-button-prev {
          background-image: url("../../../static/img/icon/prev.svg");
          width: 50px;
          height: 50px;
          background-size: 100% 100%;
          left: 0px;
        }
        .swiper-container .swiper-button-next {
          background-image: url("../../../static/img/icon/next.svg");
          width: 50px;
          height: 50px;
          background-size: 100% 100%;
          right: 0px;
        }
        .swiper-container .swiper-button-prev:hover {
          background-image: url("../../../static/img/icon/prev-in-copy.svg");
        }
        .swiper-container .swiper-button-next:hover {
          background-image: url("../../../static/img/icon/next-in-copy.svg");
        }
      }
      .introduction {
        margin-top: 20px;
        margin-bottom: 20px;
        h3.title {
          font-size: 20px;
          margin-bottom: 20px;
        }
        p {
          font-size: 14px;
          line-height: 24px;
        }
      }
    }
  }
}
</style>