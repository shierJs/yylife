<template>
  <div>
    <Loading :show="show"></Loading>
    <Head :title="title"></Head>
    <!-- 头部 -->
    <transition name="fade">
      <div id="main" v-show="show" :class="{del:delShow}" class="headline">
        <!-- 导航栏 -->
        <div class="tabs swiper-container">
          <div class="swiper-wrapper">
            <div
              class="tab swiper-slide"
              v-for="(item,i) in tabs"
              :key="i"
              @click="tab(i)"
              :class="{active:item.id==index}"
            >
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
        <!-- 导航栏 -->
        <!-- 列表 -->
        <div class="list" v-show="none">
          <div class="cards" v-for="(v,i) in tabs" :key="i" v-show="i==index">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                :immediate-check="false"
              >
                <van-cell v-for="(item,index) in list" :key="index">
                  <slot>
                    <div class="card" @click="enterDetail(index)">
                      <p class="title">{{item.title}}</p>
                      <div class="img-box">
                        <img v-lazy="v.img" alt v-for="(v,i) in item.article_img" :key="i">
                      </div>
                      <div class="date">
                        <img src="/static/img/icon/shijian.png" alt>
                        <span>{{item.create_time}}</span>
                      </div>
                    </div>
                  </slot>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
        <!-- 列表 -->
        <div class="none" v-show="!none" @click="$router.go(0);">
          <i class="iconfont icon-meiyoushuju"></i>
          <p class="label">暂无数据</p>
        </div>
      </div>
    </transition>
    <!-- 底部 -->
    <Foot :idx="3"></Foot>
    <!-- 底部 -->
  </div>
</template>

<script>
import Head from "@/components/Head";
import Foot from "@/components/Foot";
import Loading from "@/components/Loading";
import Swiper from "swiper";
import { Toast } from "vant";
import getInfoApi from "@/api/getInfo";
export default {
  data() {
    return {
      title: "同城头条",
      tabs: [],
      index: 0,
      value: "",
      show: false,
      loading: false,
      finished: false,
      isLoading: false,
      delShow: false,
      page: 1,
      list: [],
      none: false,
      timer:null,
    };
  },
  mounted() {
    this.index = this.$route.params.id;
    this.getCate();
    this.getData();
    new Swiper(".swiper-container", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
  },
  methods: {
    onLoad() {
      // 异步更新数据
      this.page++;
      let params = {
        cate_id: this.index,
        page: this.page
      };
      getInfoApi
        .getArtList(params)
        .then(res => {
          if (res.data.code === 200) {
            if (!res.data.data.length) {
              this.loading = false;
              this.finished = true;
              Toast("没有更多了");
            } else {
              this.list = this.list.concat(res.data.data);
              this.loading = false;
            }
          } else {
            this.loading = false;
            this.finished = true;
            Toast(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
          this.finished = true;
        });
    },
    onRefresh() {
      this.page = 1;
      let params = {
        cate_id: this.index,
        page: this.page
      };
      getInfoApi
        .getArtList(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              this.isLoading = false;
            } else {
              this.list = [];
              this.isLoading = false;
              this.none = false;
            }
          } else {
            Toast("服务器出小差了，请稍后再试");
            clearTimeout(this.timer);
            this.timer=setTimeout(() => {
              this.isLoading = false;
            }, 2000);
          }
        })
        .catch(err => {
          Toast("服务器出小差了，请稍后再试");
          this.$router.push("/notFound");
           clearTimeout(this.timer);
          this.timer=setTimeout(() => {
            this.isLoading = false;
          }, 2000);
        });
    },
    tab(i) {
      this.index = this.tabs[i].id;
      this.page = 1;
      this.finished=false;
      this.getData();
    },
    enterDetail(i) {
      this.$router.push(`/headlineDetails/${this.list[i].id}`);
    },
    getData() {
      let params = {
        cate_id: this.index,
        page: this.page
      };
      getInfoApi
        .getArtList(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              this.none = true;
            } else {
              this.none = false;
            }
            this.show = true;
          } else {
            this.show = false;
            Toast(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    getCate() {
      getInfoApi
        .getArtCate()
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.tabs = res.data.data;
            this.tabs.push({
              id: 0,
              name: "推荐"
            });
            this.tabs.reverse();
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    }
  },
  components: {
    Head,
    Foot,
    Loading
  }
};
</script>

<style scoped lang="less">
.edit {
  color: #808080;
}
.del {
  padding-bottom: 100px;
}
#main {
  padding-top: 112px;
  padding-bottom: 65px;
  .tabs {
    height: 62px;
    position: fixed;
    top: 90px;
    left: 0;
    background: #fff;
    .tab {
      width: 190px !important;
      height: 62px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 26px;
        color: #808080;
      }
    }
    .active {
      border-bottom: 4px solid #9a9a9a;
    }
  }
  .list {
    background: #fff;
    padding: 0 20px;
    .card {
      width: 100%;
      background: #fff;
      padding: 40px 0 16px;
      position: relative;
      border-bottom: 2px solid #ccc;
      color: #5e5e5e;
      .title {
        font-size: 34px;
        line-height: 40px;
      }
      .img-box {
        width: 100%;
        display: flex;
        margin: 20px 0;
        img {
          width: 196px;
          height: 144px;
          margin-left: 45px;
        }
        img:first-child {
          margin-left: 0;
        }
      }
      .date {
        display: flex;
        align-items: center;
        font-size: 22px;
        img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }
  }
  .none {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #b4a078;
    margin-top:200px;
    .iconfont {
      font-size: 240px;
    }
    .label {
      text-align: center;
      font-size: 50px;
    }
  }
}
.col-foot {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>