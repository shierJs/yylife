<template>
  <div>
    <Loading :show="show"></Loading>
    <Head :title="title"></Head>
    <transition name="fade2">
      <div id="main" v-show="show">
        <!-- 列表 -->
        <div class="list" v-show="none">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              :immediate-check="false"
            >
              <van-cell v-for="(item,index) in list" :key="index">
                <slot>
                  <div class="card" @click="link(index)">
                    <img :src="item.logo" alt>
                    <div class="md">
                      <h3 class="title">{{item.cut_name}}</h3>
                      <p class="desc">
                        <span>利率：{{item.rate}}</span>
                        <span>期限{{item.deadline}}</span>
                      </p>
                      <div class="tags" v-show="item.cut_label.length">
                        <p class="tag" v-for="(v,i) in item.cut_label" :key="i">{{v.label_name}}</p>
                      </div>
                    </div>
                    <div class="rt">
                      <p class="amount">{{item.max_limit}}元</p>
                      <p class="num">{{item.count}}人已申请</p>
                    </div>
                  </div>
                </slot>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </div>
        <!-- 列表 -->
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
import Loading from '@/components/Loading';
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: "急用钱",
      show: false,
      index: 0,
      value: "",
      loading: false,
      finished: false,
      isLoading: false,
      delShow: false,
      page: 1,
      list: [],
      none:false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    onRefresh() {
      this.page = 1;
      let params = {
        page: this.page
      };
      getInfoApi
        .getListCut(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              this.isLoading = false;
              this.none=true;
              Toast("刷新成功");
            } else {
              this.isLoading = false;
              this.none=false;
            }
          } else {
            Toast("服务器走丢了");
            this.isLoading = false;
            this.none=false;
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    onLoad() {
      this.page++;
      console.log(this.page);
      let params = {
        page: this.page
      };
      getInfoApi
        .getListCut(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            ;
            if (res.data.data.length) {
              this.list = this.list.concat(res.data.data);
              this.loading=false;
            } else {
              Toast("没有更多了");
              this.loading=false;
              this.finished = true;
            }
          } else {
            Toast("服务器走丢了");
            this.loading=false;
            this.finished = true;
            this.none=false;
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
          this.finished = true;
        });
    },
    getList() {
      let params = {
        page: this.page
      };
      getInfoApi
        .getListCut(params)
        .then(res => {
          if (res.data.code === 200) {
            this.show = true;
            if(res.data.data.length){
              this.list = res.data.data;
              this.none=true;
            }else{
              this.none=false;
            }
          } else {
            console.log(res.data.msg);
            this.show=false;
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    link(i) {
      console.log(this.list[i]);
      let data = {
        id: this.list[i].id
      };
      let url=this.list[i].url;
      setInfoApi
        .setCount(data)
        .then(res => {
          if (res.data.code === 200) {
            location.href = url;
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => this.$router.push('/notFound'));
    }
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
  .list {
    border-top: 1px solid #ccc;
    .card {
      padding: 20px 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      background: #fff;
      position: relative;
      img {
        width: 120px;
        height: 120px;
      }
      .md {
        margin-left: 20px;
        .title {
          font-size: 28px;
          margin-bottom: 10px;
        }
        .desc {
          color: #565656;
          font-size: 26px;
        }
        .tags {
          margin-top: 10px;
          display: flex;
          align-items: center;
          .tag {
            padding: 5px 20px;
            font-size: 20px;
            color: #ff8d1a;
            border: 1px solid #ff8d1a;
            border-radius: 4px;
            margin-right: 5px;
          }
        }
      }
      .rt {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 26px;
        right: 30px;
        .amount {
          color: #ff8d1a;
        }
        .num {
          color: #505050;
          margin-top: 30px;
        }
      }
    }
  }
}
</style>