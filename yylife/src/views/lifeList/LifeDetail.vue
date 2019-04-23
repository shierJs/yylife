<template>
  <div>
    <Loading :show="show"></Loading>
    <!-- 头部 -->
    <header id="head">
      <div class="arrow" @click="$router.go(-1)">
        <img src="/static/img/icon/arrowLeft.png" alt>
      </div>
      <h2>详情</h2>
      <div class="icon">
        <i class="iconfont icon-shoucang-copy" @click="collect" v-if="col"></i>
        <i class="iconfont icon-shoucang1" v-else @click="cancelCollect"></i>
        <i
          class="iconfont icon-fenxiang"
          v-clipboard:copy="copyUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        ></i>
        <i class="iconfont icon-jubao" @click="$router.push(`/report/5/${id}`)"></i>
      </div>
    </header>
    <!-- 头部 -->
    <!-- 主体 -->
    <transition name="fade">
      <div id="main" v-show="show">
        <!-- 宠物信息 -->
        <div class="item">
          <div class="title">
            <img :src="data.thumb" alt @click="preview">
          </div>
          <div class="info-wrap">
            <div class="info">
              <h3>{{data.service_title}}</h3>
            </div>
            <div class="browse">
              <img src="/static/img/icon/eye.png" alt>
              <span>{{data.hits}}</span>
            </div>
          </div>
        </div>
        <!-- 宠物信息 -->
        <!-- 宠物基本情况 -->
        <div class="situation">
          <div class="left">
            <p class="entry">
              服务类型：
              <span class="field">{{data.cate_name}}</span>
            </p>
            <p class="entry">
              服务地址：
              <span class="field">{{data.area_name}}-{{data.address}}</span>
            </p>
            <p class="entry">
              服务关键词：
              <span
                class="field"
                v-for="item in data.service_label"
                :key="item.id"
              >{{item.label_name}}</span>
            </p>
          </div>
        </div>
        <!-- 宠物基本情况 -->
        <!-- 宠物详情 -->
        <div class="position-desc">
          <h4 class="title">服务详情</h4>
          <div class="desc">
            <div class="content" v-html="data.intro"></div>
          </div>
        </div>
        <!-- 宠物详情 -->
        <!-- 举报 -->
        <div class="report" @click="$router.push(`/report/5/${id}`)">
          <h5>如遇无效、虚假、诈骗信息、请立即举报</h5>
          <p>求职过程中请勿缴纳费用、谨防诈骗！若信息不实请举报</p>
          <div class="icon">
            <img src="/static/img/icon/jingdeng.png" alt>
            <span>举报</span>
          </div>
        </div>
        <!-- 举报 -->
      </div>
    </transition>
    <!-- 主体 -->
    <footer id="btn">
      <div class="chat">
        <el-button>{{data.username}}</el-button>
      </div>
      <div class="call">
        <el-button type="danger" @click="showNum" v-if="showNumber">
          <img src="/static/img/icon/call.png" alt>
          <span>电话</span>
        </el-button>
        <el-button type="danger" v-else>
          <span>{{data.mobile}}</span>
        </el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { ImagePreview, Toast } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import Loading from "@/components/Loading";
export default {
  data() {
    return {
      show: false,
      imgSrc: [
        
      ],
      data: {},
      showNumber: true,
      copyUrl: window.location.href
    };
  },
  mounted() {
    this.id = parseInt(this.$route.params.id);
    this.getData();
  },
  methods: {
    preview() {
      ImagePreview({
        images: this.imgSrc,
        startPosition: 0,
        onClose() {
          // do something
        }
      });
    },
    getData() {
      let params = {
        service_id: this.id
      };
      getInfoApi
        .getLifeDetail(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data) {
              this.data = res.data.data;
              this.data.hits =
                parseInt(this.data.hits) + parseInt(this.data.virtual_hits);
              this.data.service_img.forEach(el=>{
                this.imgSrc.push(el.img);
              });
              this.show = true;
            }
          } else {
            Toast(res.data.msg);
            this.$router.push("/notFound")
          }
        })
        .catch(err => this.$router.push("/notFound"));
    },
    showNum() {
      if (this.defined.access_token) {
        this.showNumber = false;
      } else {
        Toast("请先去登录");
      }
    },
    collect() {
      if (this.defined.access_token == "") {
        Toast("请先去登录");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "service",
          title: data.service_title
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
          commentable_id: this.id,
          commentable_type: "service"
        };
        this.getCollect(params);
      }
    },
    cancelCollect() {
      let data = {
        type: "cancel",
        commentable_id: this.id,
        commentable_type: "service"
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
    Loading
  }
};
</script>

<style scoped lang="less">
#head {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #d4d2d4;
  position: fixed;
  padding: 0 20px;
  justify-content: space-between;
  top: 0;
  left: 0;
  z-index: 10;
  .arrow {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
    }
  }
  h2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 400;
  }
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
#main {
  padding-top: 90px;
  padding-bottom: 100px;
  background: #d9d9d9;
  .title {
    height: 124px;
    line-height: 124px;
    font-size: 32px;
    color: #636363;
    padding: 0 40px;
  }
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
        h3 {
          font-size: 40px;
          color: #6b6b6b;
        }
        .price {
          font-size: 40px;
          color: #ff5834;
          margin-top: 34px;
          span {
            font-size: 24px;
            margin-left: 30px;
            color: #515151;
          }
        }
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
  .situation {
    background: #fff;
    padding: 68px 44px 46px;
    display: flex;
    margin-bottom: 22px;
    div {
      .entry {
        width: 100%;
        color: #a1a1a1;
        height: 52px;
        line-height: 52px;
        font-size: 24px;
        .field {
          color: #636363;
        }
      }
    }
  }
  .position-desc {
    background: #fff;
    margin-bottom: 24px;
    .desc {
      .content {
        padding: 26px 30px;
        font-size: 26px;
        color: #707070;
        border-top: 1px solid #707070;
        border-bottom: 1px solid #707070;
      }
      .content /deep/ img{
        max-width:100%;
      }
    }
  }
  .report {
    background: #fff;
    margin-bottom: 24px;
    padding: 20px 40px;
    color: #6d6d6d;
    position: relative;
    h5 {
      font-size: 26px;
      margin-bottom: 8px;
    }
    p {
      font-size: 20px;
    }
    .icon {
      position: absolute;
      right: 40px;
      top: 50%;
      height: auto;
      width: auto;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
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