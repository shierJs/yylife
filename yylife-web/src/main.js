// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: '../static/img/function/error.png',
  loading: '../static/img/function/load.gif',
  attempt:5
})

// 引入css公共样式
import './assets/css/base.css'
import './assets/css/uiStyle.css'
import "babel-polyfill"

//引入axios
import axios from "axios"
axios.defaults.withCredentials = true; //允许携带cookie
const webToken = JSON.parse(localStorage.getItem("webToken"));
if (webToken == null) {
  console.log('err of log');
} else {
  axios.defaults.headers.accessToken = webToken.access_token;
  axios.defaults.headers.refreshToken = webToken.refresh_token;
}
Vue.prototype.http = axios; //挂在vue原型上

//引入vuex
import store from '@/store'

//引入meta插件 seo
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)

//引入iview UI
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//引入swiper
import 'swiper/dist/css/swiper.css'

//引入animate.css动画库

//引入jquery
import 'jquery'

// 跳转后返回顶部
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { //如果未匹配到路由
    from.name ? next({
      name: from.name
    }) : next('/notFound'); //如果上级也未匹配到路由则跳转首页，如果上级能匹配到则转上级路由
  } else {
    iView.LoadingBar.start();
    next();
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next(); //如果匹配到正确跳转
  }
});
router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

//粘贴复制插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import defined from './assets/js/defined'; //引用文件
Vue.prototype.defined = defined; //挂载到Vue实例上面

Vue.config.productionTip = false;

/* eslint-disable no-new */

// window.requestAnimationFrame多浏览器兼容问题补丁
(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
          window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function () { callback(currTime + timeToCall); },
              timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };
  }

  if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
          clearTimeout(id);
      };
  }
}());

//dataset兼容
if (window.HTMLElement) {
  if (Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') === -1) {
      Object.defineProperty(HTMLElement.prototype, 'dataset', {
          get: function () {
              var attributes = this.attributes; // 获取节点的所有属性
              var name = [];
              var value = []; // 定义两个数组保存属性名和属性值
              var obj = {}; // 定义一个空对象
              for (var i = 0; i < attributes.length; i++) { // 遍历节点的所有属性
                  if (attributes[i].nodeName.slice(0, 5) === 'data-') { // 如果属性名的前面5个字符符合"data-"
                      // 取出属性名的"data-"的后面的字符串放入name数组中
                      name.push(attributes[i].nodeName.slice(5));
                      // 取出对应的属性值放入value数组中
                      value.push(attributes[i].nodeValue);
                  }
              }
              for (var j = 0; j < name.length; j++) { // 遍历name和value数组
                  obj[name[j]] = value[j]; // 将属性名和属性值保存到obj中
              }
              return obj; // 返回对象
          },
      });
  }
}

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
})
