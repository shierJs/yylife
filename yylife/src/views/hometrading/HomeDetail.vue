<template>
  <div>
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
        <i class="iconfont icon-jubao" @click="$router.push(`/report/7/${id}`)"></i>
      </div>
    </header>
    <!-- 头部 -->
    <!-- 主体 -->
    <transition name="fade">
      <div id="main">
        <div class="show">
          <img v-lazy="imgSrc" :key="imgSrc" alt @click="preview">
        </div>
        <div class="info">
          <h3 class="title">{{data.house_title}}</h3>
          <div class="browse">
            <img src="/static/img/icon/eye.png" alt>
            <span>{{data.hits}}</span>
          </div>
        </div>
        <!-- 租房信息 -->
        <div class="desc">
          <div class="top">
            <div class="type">
              <p class="name">户型</p>
              <p class="content">{{data.houseType}}</p>
            </div>
            <div class="area">
              <p class="name">价格</p>
              <p class="content">{{data.price}}万元</p>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <p class="entry">
                小区：
                <span class="filed">{{data.house_area}}</span>
              </p>
              <p class="entry">
                装修：
                <span class="filed">{{data.dec}}</span>
              </p>
              <p class="entry">
                地址：
                <span class="filed">{{data.area_name}}-{{data.address}}</span>
              </p>
            </div>
            <div class="right">
              <p class="entry">
                面积：
                <span class="filed">{{data.acreage}}㎡</span>
              </p>
              <p class="entry">
                朝向：
                <span class="filed">{{data.orientation}}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 房源详情 -->
        <div class="detail">
          <p class="title">房源详情</p>
          <div class="content" v-html="data.intro"></div>
        </div>
        <!-- 房源详情 -->
        <!-- 举报-->
        <div class="address">
          <div class="report" @click="$router.push('/report')">
            <p>签约前切勿支付订金、租金、押金等一切费用！</p>
            <p>请务必实地看房，查验房东和房屋证件后再签约！</p>
            <div class="icon">
              <img src="/static/img/icon/jingdeng.png" alt>
              <span>举报</span>
            </div>
          </div>
        </div>
        <!-- 举报-->
      </div>
    </transition>
    <!-- 主体 -->
    <footer id="foot">
      <div class="broker">
        <img v-lazy="data.head_portrait" :key="data.head_portrait" alt>
        <div>
          <p>{{data.username}}</p>
        </div>
      </div>
      <div class="phone" v-if="number" @click="showNumber">
        <i class="iconfont icon-phone"></i>
      </div>
      <div class="phone" v-else>
        <span>{{data.mobile}}</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Loading from "@/components/Loading";
import { ImagePreview } from "vant";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      imgSrc: "/static/img/img13715ae5879f38.png",
      rentList: [
        {
          imgSrc: "/static/img/floorImg03.jpg",
          name: "天麓园 一室一厅一卫",
          desc: "一室一厅 天马山 天麓园",
          rent: "3500"
        },
        {
          imgSrc: "/static/img/floorImg03.jpg",
          name: "天麓园 一室一厅一卫",
          desc: "一室一厅 天马山 天麓园",
          rent: "1250"
        },
        {
          imgSrc: "/static/img/floorImg03.jpg",
          name: "天麓园 一室一厅一卫",
          desc: "一室一厅 天马山 天麓园",
          rent: "800"
        },
        {
          imgSrc: "/static/img/floorImg03.jpg",
          name: "天麓园 一室一厅一卫",
          desc: "一室一厅 天马山 天麓园",
          rent: "2000"
        }
      ],
      imgSrcList: [],
      id: "",
      data: {},
      houseTypeList: [
        {
          id: 1,
          name: "一室"
        },
        {
          id: 2,
          name: "二室"
        },
        {
          id: 3,
          name: "三室"
        },
        {
          id: 4,
          name: "四室"
        },
        {
          id: 5,
          name: "五室及以上"
        }
      ],
      decList: [
        {
          id: "",
          name: "不限"
        },
        {
          id: 1,
          name: "精装"
        },
        {
          id: 2,
          name: "简装"
        },
        {
          id: 3,
          name: "豪华"
        },
        {
          id: 4,
          name: "毛坯房"
        }
      ],
      number: true,
      copyUrl: window.location.href
    };
  },
  methods: {
    more() {
      alert("添加事件");
    },
    preview() {
      ImagePreview({
        images: this.imgSrcList,
        startPosition: 0,
        onClose() {
          // do something
        }
      });
    },
    getData() {
      let params = {
        house_id: this.id
      };
      getInfoApi
        .getHomeTradeDetail(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (res.data.data) {
              this.data = res.data.data;
              this.imgSrc = this.data.house_trade_img[0].img;
              this.data.hits =
                parseInt(this.data.hits) + parseInt(this.data.virtual_hits);
              this.data.houseType = this.houseTypeList[
                this.data.house_type - 1
              ].name;
              this.data.dec = this.decList[this.data.decoration_type].name;
              this.data.house_trade_img.forEach(el => {
                return this.imgSrcList.push(el.img);
              });
            } else {
              this.$router.push("/");
            }
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => this.$router.push("/notFound"));
    },
    showNumber() {
      if (this.defined.access_token) {
        this.number = false;
      } else {
        Toast("请先去登录");
        return;
      }
    },
    collect() {
      if (this.defined.access_token == "") {
        Toast("请先去登录");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "houseTrade",
          title: this.data.house_title
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
          commentable_type: "houseTrade"
        };
        this.getCollect(params);
      }
    },
    cancelCollect() {
      let data = {
        type: "cancel",
        commentable_id: this.id,
        commentable_type: "houseTrade"
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
  mounted() {
    this.show = true;
    this.id = this.$route.params.id;
    this.getData();
    this.hasCollect();
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
  background: #d9d9d9;
  padding-bottom: 138px;
  .show {
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    img {
      height: 544px;
    }
  }
  .info {
    background: #fff;
    padding: 36px 40px 32px;
    position: relative;
    margin-bottom: 24px;
    .title {
      font-size: 32px;
      width: 568px;
      color: #555;
    }
    .badge {
      display: inline-block;
      border: 1px solid #e0e0e0;
      padding: 6px 4px;
      font-size: 22px;
      color: #808080;
      border-radius: 8px;
      margin-top: 8px;
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
  .desc {
    background: #fff;
    margin-bottom: 24px;
    padding: 36px 40px 32px;
    .top {
      display: flex;
      align-items: center;
      padding-bottom: 50px;
      border-bottom: 1px solid #a7a7a7;
      div {
        display: flex;
        width: 50%;
        flex-direction: column;
        align-items: center;
        color: #ff6645;
        height: 82px;
        justify-content: space-between;
        .name {
          font-size: 24px;
          color: #787878;
        }
        .content {
          font-size: 32px;
          font-weight: 600;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      div {
        width:50%;
        p {
          font-size: 24px;
          line-height: 40px;
        }
        .entry {
          color: #787878;
          max-width:100%;
        }
        .filed {
          color: #2d2d2d;
        }
      }
    }
  }
  .address {
    padding: 0 20px;
    background: #fff;
    .report {
      background: #fff;
      margin-bottom: 24px;
      padding: 20px 0;
      color: #6d6d6d;
      position: relative;
      p {
        font-size: 24px;
      }
      .icon {
        position: absolute;
        right: 0;
        top: 50%;
        width: auto;
        height: auto;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  .house-item {
    background: #fff;
    padding: 36px 40px 32px;
    color: #505050;
    margin-bottom: 24px;
    .title {
      font-size: 30px;
      border-bottom: 1px solid #505050;
      height: 72px;
      line-height: 72px;
    }
    .config {
      padding: 50px 0 22px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li {
        display: flex;
        align-items: center;
        font-size: 26px;
        width: 136px;
        margin-bottom: 28px;
        margin-right: 42px;
        .iconfont {
          font-size: 28px;
          margin-right: 10px;
        }
      }
      li:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
  .detail {
    background: #fff;
    margin-bottom: 24px;
    .title {
      font-size: 30px;
      border-bottom: 1px solid #505050;
      height: 72px;
      line-height: 72px;
      padding: 0 40px;
    }
    .content {
      padding: 26px 30px;
      font-size: 26px;
      color: #707070;
    }
    .content /deep/ img{
      max-width:100%;
    }
  }
  .same-price {
    background: #fff;
    color: #575757;
    .title {
      padding: 0 40px;
      line-height: 96px;
      font-size: 24px;
    }
    .list {
      .item {
        padding: 20px 36px 32px;
        border-top: 1px solid #ccc;
        position: relative;
        display: flex;
        img {
          width: 228px;
          height: 184px;
          margin-right: 40px;
        }
        .box {
          .name {
            font-size: 24px;
          }
          .desc {
            padding: 0;
            margin-top: 60px;
            color: #b5b5b5;
            font-size: 20px;
            display: block;
          }
          p {
            font-size: 28px;
            font-weight: 800;
          }
        }
        .badge {
          border: 1px solid #575757;
          font-size: 22px;
          padding: 3px 2px;
          border-radius: 8px;
          position: absolute;
          right: 40px;
          bottom: 36px;
        }
      }
    }
  }
}
#foot {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 138px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  div {
    background: #f88;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    color: #fff;
  }
  .broker {
    width: 360px;
    margin-right: 20px;
    img {
      width: 92px;
      height: 92px;
      border-radius: 46px;
      margin-right: 8px;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      p {
        font-size: 30px;
      }
      span {
        font-size: 28px;
      }
    }
  }
  .phone {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 52px;
    }
    span {
      font-size: 36px;
      color: #fff;
    }
  }
}
</style>