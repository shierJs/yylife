<template>
  <div>
    <Head :title="data.used_title">
      <div class="icon">
        <i class="iconfont icon-shoucang-copy" @click="collect" v-if="col"></i>
        <i class="iconfont icon-shoucang1" v-else @click="cancelCollect"></i>
        <i
          class="iconfont icon-fenxiang"
          v-clipboard:copy="copyUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        ></i>
        <i class="iconfont icon-jubao" @click="$router.push(`/report/1/${used_id}`)"></i>
      </div>
    </Head>
    <transition name="fade">
      <div id="market" v-show="show">
        <div class="item">
          <div class="title">
            <img v-lazy="data.thumb" :key="data.thumb" alt @click="showMore">
          </div>
          <div class="info-wrap">
            <div class="info">
              <h3>{{data.used_title}}</h3>
              <p class="price">
                {{data.selling_price}}
                <span>元</span>
              </p>
              <p class="release">发布于：{{data.time}}</p>
            </div>
            <div class="badge">
              <span>个人</span>
            </div>
            <div class="browse">
              <img src="/static/img/icon/eye.png" alt>
              <span>{{data.hits}}</span>
            </div>
          </div>
        </div>
        <div class="wrap">
          <div class="cate">
            <div>
              <span class="title">新旧</span>
              <span>{{data.old}}</span>
            </div>
            <div>
              <span class="title">类别</span>
              <span>笔记本</span>
            </div>
          </div>
          <div class="area">
            <span class="title">区域</span>
            <span>{{data.area_name}}</span>
          </div>
        </div>
        <div class="item-info">
          <h4>详细信息</h4>
          <span class="content">{{data.intro}}</span>
        </div>
      </div>
    </transition>
    <footer id="btn">
      <div class="chat">
        <el-button>先生</el-button>
      </div>
      <div class="call">
        <el-button type="danger">
          <img src="/static/img/icon/call.png" alt>
          <span @click="phone=false" v-if="phone">电话</span>
          <span v-else>{{data.mobile}}</span>
        </el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import formateTime from "@/common/formateTime";
import { ImagePreview, Toast } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
      used_id: 1,
      data: {},
      phone: true,
      copyUrl: "闲置二手"+data.used_title+window.location.href
    };
  },
  mounted() {
    this.used_id = this.$route.params.id;
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        used_id: this.used_id
      };
      getInfoApi
        .getUsedDetail(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (res.data.data) {
              this.data = res.data.data;
              this.data.hits =
                parseInt(this.data.hits) + parseInt(this.data.virtual_hits);
              this.data.time = formateTime(
                parseInt(this.data.publish_time) * 1000
              );
              this.copyUrl = "闲置二手"+this.data.used_title+window.location.href
              this.show = true;
            }else{
              this.$router.push("/");
            }
          }else{
            Toast(res.data.msg);
            this.$router.push("/notFound");
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    showMore() {
      let imgSrc = [];
      for (let i = 0; i < this.data.img.length; i++) {
        imgSrc[i] = this.data.img[i].img;
      }
      ImagePreview({
        images: imgSrc,
        startPosition: 0,
        onClose() {
          // do something
        }
      });
    },
    collect() {
      if (this.defined.access_token == "") {
        Toast("请先去登录");
        this.$router.push("/login");
      } else {
        let data = {
          commentable_id: this.used_id,
          commentable_type: "used",
          title: this.data.used_title
        };
        setInfoApi
          .collect(data)
          .then(res => {
            if (res.data.code === 200) {
              Toast(res.data.msg);
              this.hasCollect();
            } else if (res.data.code === 10003) {
              Toast("身份已过期，请重新登录");
              this.defined.removeToken();
            } else {
              Toast(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push("/notFound");
          });
      }
    },
    hasCollect() {
      if (this.defined.access_token == "") {
        return;
      } else {
        let params = {
          commentable_id: this.used_id,
          commentable_type: "used"
        };
        this.getCollect(params);
      }
    },
    cancelCollect() {
      let data = {
        type: "cancel",
        commentable_id: this.used_id,
        commentable_type: "used"
      };
      setInfoApi.cancelCollect(data).then(res => {
        if (res.data.code === 200) {
          Toast(res.data.msg);
          this.hasCollect();
        } else if (res.data.code === 10003) {
          Toast("身份已过期，请重新登录");
          this.defined.removeToken();
        } else {
          Toast(res.data.msg);
        }
      });
    },
    onCopy(e) {
      Toast("复制成功");
    },
    onError() {
      Toast("复制失败");
    },
    ...mapActions(["getCollect"])
  },
  computed: {
    col() {
      return this.$store.state.collect;
    }
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
#head {
  .icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 160px;
    height: auto;
    .iconfont {
      font-size: 28px;
    }
    .icon-shoucang1 {
      color: #ff9500;
    }
  }
}
#market {
  padding-top: 90px;
  background: #d9d9d9;
  margin-bottom: 100px;
  .item {
    border-bottom: 1px solid #dadada;
    background: #fff;
    margin-bottom: 22px;
    .title {
      width: 100%;
      height: 312px;
      position: relative;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
    .info-wrap {
      padding: 20px 40px;
      position: relative;

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 190px;
        h3 {
          font-size: 40px;
          color: #6b6b6b;
        }
        .price {
          font-size: 40px;
          color: #ff5834;
          span {
            font-size: 24px;
            margin-left: 30px;
            color: #515151;
          }
        }
        .release {
          font-size: 24px;
          color: #838383;
        }
      }
      .badge {
        position: absolute;
        top: 52px;
        right: 40px;
        width: 66px;
        height: 46px;
        border: 2px solid #64d792;
        color: #64d792;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
      }
      .browse {
        position: absolute;
        bottom: 20px;
        right: 40px;
        display: flex;
        align-items: center;
        color: #898989;
        img {
          width: 32px;
          margin-right: 10px;
        }
      }
    }
  }
  .wrap {
    border-top: 1px solid #dadada;
    border-bottom: 1px solid #dadada;
    margin-bottom: 22px;
    background: #fff;
    padding: 0 40px;
    font-size: 28px;
    .title {
      color: #a2a2a2;
      margin-right: 52px;
    }
    .cate {
      padding: 12px 0;
      div {
        height: 48px;
        line-height: 48px;
      }
    }
    .area {
      height: 92px;
      line-height: 92px;
      border-top: 1px solid #ebebeb;
    }
  }
  .item-info {
    background: #fff;
    h4 {
      font-size: 30px;
      color: #7c7c7c;
      height: 102px;
      line-height: 102px;
      padding-left: 40px;
    }
    .content {
      padding-left: 40px;
      color: #888;
      height: 92px;
      line-height: 92px;
    }
  }
}
#btn {
  display: flex;
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  .call {
    width: 100%;
  }
}
</style>