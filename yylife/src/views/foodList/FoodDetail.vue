<template>
  <div>
    <Loading :show="show"></Loading>
    <Head :title="data.shop_name">
      <div class="icon">
        <i class="iconfont icon-shoucang-copy" @click="collect" v-if="col"></i>
        <i class="iconfont icon-shoucang1" v-else @click="cancelCollect"></i>
        <i
          class="iconfont icon-fenxiang"
          v-clipboard:copy="copyUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        ></i>
        <i class="iconfont icon-jubao" @click="$router.push(`/report/1/${id}`)"></i>
      </div>
    </Head>
    <transition name="fade">
      <div id="food" v-show="show">
        <div class="item">
          <div class="title">
            <img v-lazy="img" :key="img" alt @click="preview">
            <h3>{{data.shop_name}}</h3>
            <span>{{data.intro}}</span>
          </div>
          <div class="item-wrap">
            <div class="price-box">
              <span class="currency">￥</span>
              <p class="price">{{data.consumption}}</p>
            </div>
            <div class="browse">
              <img src="/static/img/icon/eye.png" alt>
              <span>{{data.hits}}</span>
            </div>
          </div>
        </div>
        <div class="business">
          <p class="title">商家信息</p>
          <div class="info">
            <div class="name">
              <h3>{{data.shop_name}}</h3>
              <span class="address">{{data.area_name}}-{{data.address}}</span>
            </div>
            <img src="/static/img/icon/phone.png" alt @click="showNum">
          </div>
        </div>
        <div class="detail-info">
          <p class="title">详细信息</p>
          <div class="detail">
            <p>优惠：{{data.discounts}}</p>
            <div class="content" v-html="data.details"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import currency from "@/filters/currency";
import Head from "@/components/Head";
import Loading from "@/components/Loading";
import { ImagePreview, Toast } from "vant";
export default {
  data() {
    return {
      id: 0,
      show: false,
      imgSrc: [],
      data: {},
      img: "",
      copyUrl: window.location.href
    };
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
    showNum() {
      if (this.defined.access_token) {
        this.$dialog
          .confirm({
            title: "联系方式：" + this.data.mobile
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Toast("请先去登录哦");
      }
    },
    getData() {
      let params = {
        shop_id: this.id
      };
      getInfoApi
        .getShopDetail(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (res.data.data) {
              this.data = res.data.data;
              this.data.hits =
                parseInt(this.data.hits) + parseInt(this.data.virtual_hits);
              this.data.shop_img.forEach(el => {
                return this.imgSrc.push(el.img);
              });
              this.img = this.imgSrc[0];
              this.show = true;
            }
          } else {
            Toast(res.data.msg);
            this.$router.push("/");
          }
        })
        .catch(err => this.$router.push("/notFound"));
    },
    collect() {
      if (this.defined.access_token == "") {
        Toast("请先去登录");
        this.$router.push("/login");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "shop",
          title: this.data.shop_name
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
          commentable_type: "shop"
        };
        this.getCollect(params);
      }
    },
    cancelCollect() {
      let data = {
        type: "cancel",
        commentable_id: this.id,
        commentable_type: "shop"
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
  created() {
    this.id = parseInt(this.$route.params.id);
    this.hasCollect();
    this.getData();
  },
  computed: {
    col() {
      return this.$store.state.collect;
    }
  },
  components: {
    Head,
    Loading
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
#food {
  padding-top: 90px;
  background: #e9e9e9;
  .item {
    margin-bottom: 14px;
    border-bottom: 1px solid #dadada;
    padding-bottom: 20px;
    background: #fff;
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
      h3,
      span {
        position: absolute;
        z-index: 10;
        color: #333;
        left: 20px;
      }
      h3 {
        bottom: 60px;
        font-weight: normal;
        font-size: 30px;
      }
      span {
        bottom: 20px;
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
      }
    }
    .item-wrap {
      width: 100%;
      background: #fff;
      padding-left: 20px;
      position: relative;
      .price-box {
        height: 80px;
        color: #f44;
        .price {
          display: inline-block;
          font-size: 60px;
          margin-right: 5px;
        }
        .currency {
          font-size: 30px;
        }
        .old-price {
          color: #808080;
        }
      }
      .right {
        .tag {
          display: flex;
          align-items: center;
          color: #808080;
          img {
            margin-right: 10px;
          }
        }
        .tag:first-child {
          margin-bottom: 10px;
        }
      }
      .browse {
        position: absolute;
        right: 48px;
        bottom: 0px;
        display: flex;
        align-items: center;
        color: #808080;
        img {
          width: 48px;
          height: 40px;
          margin-right: 5px;
        }
      }
    }
  }
  .business {
    background: #fff;
    padding: 0 20px;
    margin-bottom: 16px;
    .title {
      height: 76px;
      color: #808080;
      line-height: 76px;
      border-bottom: 2px solid #ccc;
    }
    .info {
      padding: 32px 0;
      display: flex;
      align-items: center;
      .name {
        width: 590px;
        height: 114px;
        border-right: 2px solid #ccc;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          font-size: 24px;
          font-weight: normal;
          margin-bottom: 10px;
        }
        .address {
          color: #808080;
          font-size: 20px;
        }
      }
      img {
        width: 36px;
        margin-left: 51px;
      }
    }
  }
  .detail-info {
    background: #fff;
    padding: 0 20px;
    .title {
      height: 76px;
      color: #808080;
      line-height: 76px;
      border-bottom: 2px solid #ccc;
    }
    .vouchers {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 94px;
      line-height: 94px;
    }
    .detail {
      p {
        font-size: 22px;
        line-height: 62px;
      }
      .content{
        padding:0 20px;
      }
      .content /deep/ img{
        max-width:100%;
      }
    }
    .imgDetail {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 2px solid #ccc;
      .title {
        border-bottom: 0;
      }
      img {
        width: 40px;
      }
    }
  }
}
</style>