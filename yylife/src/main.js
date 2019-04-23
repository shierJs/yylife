// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'; //兼容IE
import Vue from 'vue'
import App from './App'
import router from './router'
//vuex
import store from '@/store'

//elementui框架
import 'element-ui/lib/theme-chalk/index.css'
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Option,
  OptionGroup,
  Button,
  Carousel,
  CarouselItem,
  Cascader,
  Badge,
  Tabs,
  TabPane,
  Upload,
  Form,
  FormItem,
  Icon,
} from 'element-ui';
//vant ui 框架
import 'vant/lib/vant-css/index.css'
import {
  Cell, 
  CellGroup,
  Popup,
  Field, 
  NumberKeyboard,
  PasswordInput,
  Picker,
  Stepper,
  Switch,
  SwitchCell,
  Uploader,
  Dialog,
  Loading,
  PullRefresh,
  ImagePreview,
  List,
  Step, 
  Steps,
  Swipe, 
  SwipeItem,
  NavBar,
  AddressEdit,
  Card,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  SubmitBar,
  Sku
} from 'vant';

Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Cascader);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Popup);
Vue.use(Field);
Vue.use(NumberKeyboard);
Vue.use(PasswordInput);
Vue.use(Picker);
Vue.use(Stepper);
Vue.use(SwitchCell);
Vue.use(Uploader);
Vue.use(Loading);
Vue.use(PullRefresh);
Vue.use(ImagePreview);
Vue.use(List);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NavBar);
Vue.use(AddressEdit);
Vue.use(Card);
Vue.use(GoodsAction);
Vue.use(GoodsActionBigBtn);
Vue.use(GoodsActionMiniBtn);
Vue.use(SubmitBar);
Vue.use(Sku);
//引入meta插件 seo
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)

import './assets/js/common'

//flexible
import 'lib-flexible/flexible.js'

//引入base.css
import './assets/css/base.css'

//引入swiper.css
import 'swiper/dist/css/swiper.css'

Vue.config.debug = true; //debug模式

//使用axios
import axios from "axios"
axios.defaults.withCredentials = true;
let tokens = JSON.parse(localStorage.getItem("tokens"));
if (tokens === null) {
  console.log("未登录或登录失效");
} else {
  axios.defaults.headers.accessToken = tokens.access_token;
  axios.defaults.headers.refreshToken = tokens.refresh_token;
}
Vue.prototype.http = axios;
//引入mockjs
require('../mock.js')

//图片懒加载
import VueLazyload from 'vue-lazyload'

//引入字体图标
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/iconfont1.js'
import '@/assets/iconfont/iconfont2.js'
import '@/assets/iconfont/iconfont3.js'
import '@/assets/iconfont/iconfont-last.css'
import '@/assets/iconfont/iconfont-last.js'

// 跳转后返回顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { //如果未匹配到路由
    from.name ? next({
      name: from.name
    }) : next('/notFound'); //如果上级也未匹配到路由则跳转首页，如果上级能匹配到则转上级路由
  } else {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next(); //如果匹配到正确跳转
  }
});


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/img/icon/icon_bnfrthrghx/error.png',
  loading: '../static/img/icon/icon_bnfrthrghx/lazyload.gif',
  attempt: 3
})

//复制内容插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


//原型
import defined from './assets/js/defined' //引用文件
Vue.prototype.defined = defined //挂载到Vue实例上面
Vue.config.productionTip = false

/* eslint-disable no-new */
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
