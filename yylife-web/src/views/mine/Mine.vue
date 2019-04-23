<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <!-- 面包屑 -->
        <div class="breadcrumb">
          <router-link to="/">首页</router-link>
          <i class="iconfont icon-arrow-r-copy"></i>
          <span>个人中心</span>
          <i class="iconfont icon-arrow-r-copy"></i>
          <span>{{aside_name}}</span>
        </div>
        <!-- 面包屑 -->
        <div class="wrapper">
          <Row>
            <i-col span="4">
              <Aside @setbread="getbread" :index="i"></Aside>
            </i-col>
            <i-col span="20">
              <div class="box">
                <router-view></router-view>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Aside from "@/components/mineAside";
import { mapState } from "vuex";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      aside_name: "",
      i: 0
    };
  },
  created() {
    //this.reload();
    const webToken = JSON.parse(localStorage.getItem("webToken"));
    if (webToken == null) {
      this.$router.push("/");
    } else {
      this.i = parseInt(this.$route.params.id);
      let data = sessionStorage.getItem("asideName");
      this.aside_name = data ? data : "我的账号";
    }
  },
  mounted() {
    window.history.pushState(null, null, document.URL);
    //禁止返回
    window.addEventListener("popstate", this.onBrowserBack, false); //添加事件
  },
  destroyed() {
    window.removeEventListener("popstate", this.onBrowserBack, false); //销毁事件
  },
  methods: {
    getbread(data) {
      this.aside_name = data;
    },
    onBrowserBack() {
      this.$router.push("/");
    }
  },
  components: {
    Head,
    Aside,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  padding-bottom: 50px;
  .wrap {
    .breadcrumb {
      height: 30px;
      line-height: 30px;
      .router-link-active,
      .iconfont {
        font-size: 12px;
        color: #333;
      }
      span {
        color: #999;
      }
    }
    .box {
      margin-top: 20px;
    }
  }
}
</style>