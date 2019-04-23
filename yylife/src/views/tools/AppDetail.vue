<template>
  <div>
    <Loading :show="show"></Loading>
    <Head :title="title"></Head>
    <!-- 头部 -->
    <!-- 主体 -->
    <transition name="fade">
      <div id="main">
        <div class="head">
          <img :src="item.logo" alt>
          <p class="title">{{item.app_name}}</p>
        </div>
        <!-- 主体头部 -->
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(v,index) in item.app_img" :key="index">
            <img v-lazy="v.img" :key="v.img" alt style="width:100%;">
          </van-swipe-item>
        </van-swipe>
        <!-- 轮播 -->
        <div class="label">
          <p class="label-title">应用标签</p>
          <div class="tags">
            <p class="tag" v-for="(v,i) in item.app_label" :key="i">{{v.label_name}}</p>
          </div>
        </div>
        <!-- 应用标签 -->
        <div class="content-wrap">
          <p class="content-title">应用详情</p>
          <div class="content" v-html="item.details"></div>
        </div>
      </div>
    </transition>
    <!-- 主体 -->
    <footer class="foot">
      <p class="memory" @click="install(item.url)">安装</p>
    </footer>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Loading from "@/components/Loading";
import getInfoApi from "@/api/getInfo";
import {Toast} from 'vant';
export default {
  data() {
    return {
      title: "应用详情",
      show: false,
      src: "",
      banner: [
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png",
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png",
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png"
      ],
      item: {}
    };
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
            this.item = res.data.data;
            this.show = true;
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => this.$router.push('/notFound'));
    },
    install(url){
      location.href=url;
    }
  },
  mounted() {
    this.id = parseInt(this.$route.params.id);
    this.getData();
  },
  components: {
    Head,
    Loading
  }
};
</script>

<style scoped lang="less">
.fun {
  display: flex;
  align-items: center;
}
.icon {
  width: 40px;
  height: 40px;
  margin-right: 30px;
}
.icon-jubao {
  font-size: 40px;
}
#main {
  padding-top: 90px;
  padding-bottom: 102px;
  .head {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 180px;
      height: 140px;
    }
    .title {
      height: 72px;
      line-height: 72px;
      font-size: 32px;
      color: #121212;
    }
  }
  .label {
    padding: 18px 60px;
    border-bottom: 24px solid #ecf0f1;
    .label-title {
      line-height: 64px;
      font-size: 26px;
      font-weight: 600;
    }
    .tags {
      display: flex;
      align-items: center;
      .tag {
        padding: 10px 40px;
        font-size: 24px;
        color: #ff8d1a;
        border: 1px solid #ff8d1a;
        border-radius: 8px;
        margin-right: 10px;
      }
    }
  }
  .content-wrap {
    padding: 18px 60px;
    .content-title {
      line-height: 64px;
      font-size: 26px;
      font-weight: 600;
    }
    .content {
      font-size: 24px;
      color: #505050;
      padding:0 20px;
    }
    .content /deep/ img{
      max-width:100%;
    }
  }
}
.foot {
  padding: 12px 60px;
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .memory {
    padding: 18px 268px 18px;
    background: #ff8d1a;
    border-radius: 30px;
    font-size: 32px;
    color: #fff;
  }
}
</style>