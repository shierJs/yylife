<template>
    <div>
        <Head title="联系我们"></Head>
        <transition name="fade">
            <div id="main" v-show="show">
                <h2 class="contact-logo">
                    <img src="../../static/img/logo300.png" alt="">
                </h2>
                <div class="wrap">
                  <p class="titles">联系客服</p>
                  <ul class="contact-list">
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dianhua"></use>
                        </svg>
                        <div class="card">
                            <p class="title">联系电话：</p>
                            <span>{{data.service_phone}}</span>
                        </div>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon--"></use>
                        </svg>
                        <div class="card">
                            <p class="title">微信服务号：</p>
                            <span>{{data.service_wechat}}</span>
                        </div>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youxiang"></use>
                        </svg>
                        <div class="card">
                            <p class="title">企业邮箱：</p>
                            <span>{{data.service_email}}</span>
                        </div>
                    </li>
                </ul>
                </div>
                <div class="wrap">
                  <p class="titles">广告合作</p>
                  <ul class="contact-list">
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dianhua"></use>
                        </svg>
                        <div class="card">
                            <p class="title">联系电话：</p>
                            <span>{{data.ad_phone}}</span>
                        </div>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon--"></use>
                        </svg>
                        <div class="card">
                            <p class="title">微信服务号：</p>
                            <span>{{data.ad_wechat}}</span>
                        </div>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youxiang"></use>
                        </svg>
                        <div class="card">
                            <p class="title">企业邮箱：</p>
                            <span>{{data.ad_email}}</span>
                        </div>
                    </li>
                </ul>
                </div>
                <div class="wrap">
                  <p class="titles">市场合作</p>
                  <ul class="contact-list">
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dianhua"></use>
                        </svg>
                        <div class="card">
                            <p class="title">联系电话：</p>
                            <span>{{data.market_phone}}</span>
                        </div>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon--"></use>
                        </svg>
                        <div class="card">
                            <p class="title">微信服务号：</p>
                            <span>{{data.market_wechat}}</span>
                        </div>
                    </li>
                    <li>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youxiang"></use>
                        </svg>
                        <div class="card">
                            <p class="title">企业邮箱：</p>
                            <span>{{data.market_email}}</span>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
export default {
  data() {
    return {
      show: false,
      data:{},
    };
  },
  mounted() {
    this.getData();
  },
  methods:{
    getData(){
      getInfoApi.getAboutSystem().then(res=>{
        if(res.data.code === 200){
          ;
          this.data=res.data.data;
          this.show=true;
        }
      }).catch(err=>console.log(err));
    }
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .titles{
    text-align: center;
    line-height:60px;
    font-size:34px;
  }
  .contact-logo {
    margin: 40px 0;
    img {
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }
  }
  .contact-list {
    width: 90%;
    margin: 0 auto;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      height: 120px;
      margin-top: 0px;
      background: #fff;
      
      .icon {
        width: 60px;
        height: 60px;
        padding-left: 40px;
      }
      .card {
        margin-left: 40px;
        .title {
          font-size: 25px;
          color: #8c8c8c;
          margin-bottom: 10px;
        }
        span {
          color: #000;
          font-size: 28px;
        }
      }
    }
  }
}
</style>