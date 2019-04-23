<template>
  <div>
    <Loading :show="show"></Loading>
    <Head :title="title"></Head>
    <transition name="fade2">
      <div id="main" v-show="show">
        <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false" v-show="none">
          <van-cell v-for="(item,index) in app" :key="index" @click="link(item.id)">
            <slot>
              <div class="app-list">
                <div class="app-item">
                  <img v-lazy="item.logo" :key="item.logo" alt>
                  <div class="content">
                    <h3 class="title">{{item.app_name}}</h3>
                    <p class="desc">{{item.intro}}</p>
                    <span class="memory">{{item.size}}M</span>
                  </div>
                  <p class="install" @touchend.prevent="install(item.url)">安装</p>
                </div>
              </div>
            </slot>
          </van-cell>
        </van-list>
        <div class="none" v-show="!none" @click="$router.go(0);">
          <i class="iconfont icon-meiyoushuju"></i>
          <p class="label">暂无数据</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Loading from "@/components/Loading";
import getInfoApi from "@/api/getInfo";
import { Toast } from 'vant';
export default {
  data() {
    return {
      title: "应用推荐",
      show: false,
      equipmentType: "",
      page: 1,
      finished: false,
      loading: false,
      app:[],
      none:false,
    };
  },
  methods: {
    link(i) {
      this.$router.push(`/appDetail/${i}`);
    },
    getData() {
      let params = {
        page: this.page,
        type: this.equipmentType
      };
      getInfoApi
        .getAppList(params)
        .then(res => {
          if (res.data.code === 200) {
            this.show = true;
            if(res.data.data.length){
              this.app = res.data.data;
              this.none=true;
            }else{
              this.none=false;
            }
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    detect() {
      var agent = navigator.userAgent.toLowerCase();
      var android = agent.indexOf("android");
      var iphone = agent.indexOf("iphone");
      var ipad = agent.indexOf("ipad");
      if (android != -1) {
        this.equipmentType = "android";
      }
      if (iphone != -1 || ipad != -1) {
        this.equipmentType = "ios";
      }
    },
    onLoad() {
      this.page++;
      let params = {
        page: this.page,
        type: this.equipmentType
      };
      getInfoApi
        .getAppList(params)
        .then(res => {
          if (res.data.code === 200) {
            if(res.data.data.length){
              this.app = this.app.concat(res.data.data);
              this.loading=false;
            }else{
              Toast("没有更多啦");
              this.loading=false;
              this.finished=true;
            }
          }else{
            Toast(res.data.msg);
            this.loading=false;
            this.finished=true;
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
          this.none=false;
        });
    },
    install(url) {
      location.href=url;
    }
  },
  created() {
    this.detect();
  },
  mounted() {
    this.getData();
  },
  components: {
    Head,
    Loading
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  .app-list {
    border-top: 1px solid #ededed;
    .app-item {
      padding: 0 50px;
      display: flex;
      align-items: center;
      height: 156px;
      position: relative;
      border-bottom: 1px solid #ededed;
      img {
        width: 132px;
        height: 132px;
      }
      .content {
        font-size: 24px;
        color: #636363;
        margin-left: 32px;
        .title {
          font-size: 26px;
          color: #505050;
        }
        .desc {
          width: 320px;
          line-height: 60px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .install {
        position: absolute;
        font-size: 26px;
        color: #fff;
        padding: 18px 32px;
        background: #b4a078;
        border-radius: 32px;
        right: 50px;
      }
    }
  }
  .none {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color:#b4a078;
    margin-top:150px;
    .iconfont {
      font-size: 240px;
    }
    .label {
      text-align: center;
      font-size: 50px;
    }
  }
}
</style>