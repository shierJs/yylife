<template>
  <div>
    <div class="about">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="section1">
            <div class="bg">
              <video loop autoplay muted class="bg-video">
                <source
                  src="http://img.yiyuanshenghuo.cn/vdo/about-bg.mp4"
                  type="video/mp4"
                  poster="../../static/img/material/yybg.jpg"
                >
              </video>
            </div>
            <p class="title">沂源生活</p>
            <p class="introduction">沂源本地的生活服务平台</p>
            <div class="line"></div>
            <p class="desc">让生活更简单更美好</p>
            <i class="iconfont icon-xia"></i>
          </div>
        </div>
        <div class="swiper-slide">
            <div class="section2">
                <p class="title">寻找/发布信息</p>
                <p class="desc">为你提供餐馆酒店打折促销、房产、招聘、二手、商城等生活分类信息，满足您寻找/发布信息的需求。</p>
                <div class="content">
                    <p class="title">在你发布消息时，我们希望你做到</p>
                    <div class="wrapper">
                      <div class="items" v-for="(item,index) in provList" :key="index">
                        <i class="iconfont" :class="item.icon"></i>
                        <p class="name">{{item.name}}</p>
                        <p>{{item.desc}}</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="swiper-slide">
          <div class="mall">
            <p class="title">来疯购商城</p>
            <p class="lines">严格把控商品品质，层层筛选好商品</p>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Swiper from "swiper";
import Foot from "@/components/Foot";
export default {
  data(){
    return {
      provList:[
        {
          icon:"icon-zhaopian",
          name:"照片",
          desc:"请使用自己实拍的照片，而不是其他网站获取的照片，尤其不要使用淘宝等。",
        },
        {
          icon:"icon-xiangji",
          name:"真实",
          desc:"请确保你的信息的描述是真实的、准确的。",
        },
        {
          icon:"icon-bendi",
          name:"本地",
          desc:"百姓网是连接身边需求的，请仅在一个地点发布你的信息。",
        },
        {
          icon:"icon-falv",
          name:"合法",
          desc:"请不要发布违反国家政策法规的信息，这样的信息将被删除。",
        },
        {
          icon:"icon-zhengjian",
          name:"个人",
          desc:"百姓网是连接个人和个人身边需求的平台，我们允许商家发布信息，但请在有此选项的时候如实标出你的身份，我们会把你的信息放在合适的地方。",
        },
        {
          icon:"icon-zhongfujilu",
          name:"重复",
          desc:"请不要发布重复信息。",
        },
        {
          icon:"icon-leimupinleifenleileibie--",
          name:"分类",
          desc:"请将信息发布到指定的类目，当您不知道如何分类的时候可以选择向我们寻求帮助。",
        },
      ],
    }
  },
  created() {
    $("#foot").css({
      display: "none"
    });
    $("#aside").css({
      display: "none"
    });
    $("body").css({
      overflowY: "hidden"
    });
  },
  mounted() {
    new Swiper(".about", {
      direction: "vertical",
      mousewheel: true,
      height: window.innerHeight //电脑屏幕高度
    });
  },
  beforeDestroy() {
    $("#foot").css({
      display: "block"
    });
    $("#aside").css({
      display: "block"
    });
  },
  components:{
    Foot,
  }
};
</script>

<style scoped lang="less">
.about {
    font-family: "宋体";
  .swiper-slide {
    .section1 {
        position: relative;
        padding-top:250px;
        background: rgba(0,0,0,.3);
        width: 100%;
        height:100%;
        text-align: center;
        overflow: hidden;
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -10;
        text-align: center;
        line-height: 100%;
        .bg-video {
          min-width: 100%;
          min-height: 100%;
          height: auto;
          width: auto;
          background: url('../../static/img/material/yybg.jpg') no-repeat;
          background-size: 100% 100%;
          display: inline-block;
        }
      }
      .title{
          font-size:80px;
          color:#fff;
      }
      .introduction{
          font-size:54px;
          color:#fff;
          margin:50px 0;
      }
      .line{
          display: inline-block;
          width: 120px;
          height:2px;
          background: #b4a078;
          margin-bottom:40px;
      }
      .desc{
          font-size:30px;
          color:#b4a078;
          margin-bottom:50px;
      }
      .iconfont{
          font-size:50px;
          color:#b4a078;
      }
    }
    .section2{
        .title{
            font-size:60px;
            text-align: center;
            color:#b4a078;
        }
        .desc{
            text-align: center;
            font-size:20px;
        }
        .content{
            width: 100%;
            background: url('../../static/img/material/yybg-slide02.jpg') no-repeat;
            background-size:100% 100%;
            height:708px;
            margin-top:80px;
            .title{
                font-size:30px;
                color:#fff;
                line-height: 150px;
            }
            .wrapper{
              padding:0 300px;
              .items{
                display: inline-block;
                width: 200px;
                height:270px;
                color:#fff;
                margin-left:70px;
                text-align: center;
                vertical-align: middle;
                .iconfont{
                  font-size:50px;
                }
                .name{
                  font-size:30px;
                  font-weight: 600px;
                }
                p{
                  font-size:14px;
                }
              }
            }
        }
    }
    .mall{
      width: 100%;
      height: 100%;
      background: url('../../static/img/material/eg-bg.jpg') no-repeat;
      background-size: 100% 100%;
      .title{
        text-align: center;
        padding-top:200px;
        font-size:150px;
        color:#fff;
      }
      .lines{
        text-align: center;
        line-height: 100px;
        font-size:50px;
        color:#b4a078;
      }
    }
  }
}
</style>