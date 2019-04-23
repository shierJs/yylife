<template>
  <div id="app">
    <router-view/>
    <Aside></Aside>
  </div>
</template>

<script>
import Aside from "@/components/Aside";
export default {
  name: "App",
  methods:{
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
  components: {
    Aside
  },
  mounted(){
    if(this._isMobile()){
      location.href="http://m.yiyuanshenghuo.cn";
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
