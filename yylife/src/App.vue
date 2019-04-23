<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
      </router-view>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
      </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    getToken() {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      if (tokens === null) {
        return;
      } else {
        this.defined.setAtoken(tokens.access_token);
        this.defined.setRtoken(tokens.refresh_token);
      }
    }
  },
  created() {
    if (this._isMobile()) {
      this.getToken();
      document.getElementById("appLoading").style.display = "none";
      document.getElementById("app").style.display = "block";
    }
  }
};
</script>

<style>
@import url("./assets/css/base.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
