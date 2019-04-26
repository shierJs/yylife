<template>
  <div>
    <Head :title="title"></Head>
    <!-- 头部 -->
    <transition name="fade">
      <div id="main" v-show="show" :class="{del:delShow}">
        <!-- 列表 -->
        <div class="list">
          <div class="cards">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <van-cell v-for="(item,index) in data.data" :key="index" style="margin-top:20px;">
                <slot>
                  <div class="card" @touchend="checkIndex(item)">
                    <p class="title">{{item.title}}</p>
                    <p class="time">收藏时间：{{item.create_time}}</p>
                    <p class="status">{{item.cate}}</p>
                    <i class="iconfont icon-lajitong" @touchend.stop="del(item,index)"></i>
                  </div>
                </slot>
              </van-cell>
            </van-list>
          </div>
        </div>
        <!-- 列表 -->
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "swiper";
import { Toast } from "vant";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
export default {
  data() {
    return {
      title: "我的收藏",
      value: "",
      show: false,
      loading: false,
      finished: false,
      delShow: false,
      starti: 0,
      count: 0,
      num: 10,
      endi: 0,
      page: 1,
      data: {},
      radio: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    onLoad() {
      // 异步更新数据
      this.page++;
      this.getList();
    },
    checkIndex(item) {
      switch(item.commentable_type){
        case "goods":
        this.$router.push(`/mallDetail/${item.commentable_id}`);
        break;
        case "used":
        this.$router.push(`/marketDetail/${item.commentable_id}`);
        break;
        case "shop":
        this.$router.push(`/foodDetail/${item.commentable_id}`);
        break;
        case "recruitment":
        this.$router.push(`/JobDetail/${item.commentable_id}`);
        break;
        case "article":
        this.$router.push(`/headlineDetails/${item.commentable_id}`);
        break;
        case "service":
        this.$router.push(`/LifeDetail/${item.commentable_id}`);
        break;
        case "houseRent":
        this.$router.push(`/rentDetail/${item.commentable_id}`);
        break;
        case "houseTrade":
        this.$router.push(`/homeDetail/${item.commentable_id}`);
        break;
        default:
          Toast("当前收藏内容已下架");
        break;
      }
    },
    del(item,index) {
      this.$dialog
        .confirm({
          title: "确认发布这收藏吗？",
          message: "确认发布这收藏吗？"
        })
        .then(() => {
          // on confirm
          let data = {
            type: "del",
            id: item.id,
            commentable_type: item.commentable_type,
            commentable_id: item.id
          };
          setInfoApi
            .cancelCollect(data)
            .then(res => {
              ;
              if (res.data.code === 200) {
                this.data.data.splice(index, 1);
                Toast(res.data.msg);
              } else if (res.data.code === 10003) {
                Toast("登录已失效,请重新登录");
                this.defined.removeToken();
              } else {
                Toast(res.data.msg);
              }
            })
            .catch(err => {
              this.$router.push("/notFound");
            });
        })
        .catch(() => {
          // on cancel\
          alert(1);
        });
    },
    getList() {
      let params = {
        page: this.page
      };
      getInfoApi
        .getcollection(params)
        .then(res => {
          if (res.data.code === 200) {
            if (this.page == 1) {
              this.data = res.data.data;
              this.data.data.forEach(el => {
                switch (el.commentable_type) {
                  case "goods":
                    el.cate = "来疯购商城";
                    break;
                  case "used":
                    el.cate = "二手市场";
                    break;
                  case "shop":
                    el.cate = "美食店铺";
                    break;
                  case "recruitment":
                    el.cate = "职位招聘";
                    break;
                  case "article":
                    el.cate = "文章资讯";
                    break;
                  case "service":
                    el.cate = "生活服务";
                    break;
                  case "houseRent":
                    el.cate = "房屋租赁";
                    break;
                  case "houseTrade":
                    el.cate = "房屋买卖";
                    break;
                }
              });
              this.show = true;
            } else {
              let data = res.data.data.data;
              if (data.length == 0) {
                this.loading = false;
                this.finished = true;
                Toast("没有更多了");
              } else if (data.length <= data.total) {
                this.data.data = this.data.data.concat(data.data);
                this.data.data.forEach(el => {
                  switch (el.commentable_type) {
                    case "goods":
                      el.cate = "来疯购商城";
                      break;
                    case "used":
                      el.cate = "二手市场";
                      break;
                    case "shop":
                      el.cate = "美食店铺";
                      break;
                    case "recruitment":
                      el.cate = "职位招聘";
                      break;
                    case "article":
                      el.cate = "文章资讯";
                      break;
                    case "service":
                      el.cate = "生活服务";
                      break;
                    case "houseRent":
                      el.cate = "房屋租赁";
                      break;
                    case "houseTrade":
                      el.cate = "房屋买卖";
                      break;
                  }
                });
                this.loading = false;
                this.finished = true;
              } else {
                this.data.data = this.data.data.concat(data.data);
                this.data.data.forEach(el => {
                  switch (el.commentable_type) {
                    case "goods":
                      el.cate = "来疯购商城";
                      break;
                    case "used":
                      el.cate = "二手市场";
                      break;
                    case "shop":
                      el.cate = "美食店铺";
                      break;
                    case "recruitment":
                      el.cate = "职位招聘";
                      break;
                    case "article":
                      el.cate = "文章资讯";
                      break;
                    case "service":
                      el.cate = "生活服务";
                      break;
                    case "houseRent":
                      el.cate = "房屋租赁";
                      break;
                    case "houseTrade":
                      el.cate = "房屋买卖";
                      break;
                  }
                });
                this.loading = false;
              }
            }
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/login");
          } else {
            this.show = false;
            Toast(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    }
  },
  components: {
    Head
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
  padding-top: 90px;

  .list {
    background: #f4f4f4;
    overflow: hidden;
    padding-top:90px;
    position: absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
    .card {
      background: #fff;
      padding: 20px;
      position: relative;
      p {
        font-size: 26px;
      }
      .title {
        font-weight: 700;
        color: #333;
        width: 100%;
        line-height: 30px;
      }
      .time {
        line-height: 40px;
      }
      .status {
        text-align: right;
      }
      .green {
        color: rgb(26, 131, 26);
      }
      .red {
        color: #f44;
      }
      .iconfont {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 26px;
      }
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