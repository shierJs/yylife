<template>
  <div v-show="user">
    <header id="head">
      <van-icon name="arrow-left"/>
      <p class="title">会员中心</p>
      <div class="more">
        <van-icon name="contact" @click="$router.push('/information')"/>
      </div>
    </header>
    <!-- 头部 -->
    <!-- 主体 -->
    <div id="main" class="mine">
      <div class="info">
        <div class="coin">
          <p class="title">金币</p>
          <span>{{user.gold_account}}</span>
          <p class="change" @click="recharge">充值</p>
        </div>
        <div class="user" @click="$router.push('/information')">
          <img :src="src" alt>
          <div>
            <p class="name" v-if="user.username!=''">{{user.username}}</p>
            <p class="name" v-else>{{user.mobile}}</p>
          </div>
        </div>
        <div class="integral">
          <p class="title">积分</p>
          <span>{{user.points_account}}</span>
          <p class="change" @click="$router.push('/lottery')">抽奖</p>
        </div>
      </div>
      <!-- 用户信息 -->
      <!-- 订单 -->
      <div class="order" @click="$router.push('/mallAllOrder/0')">
        <p class="my-order">我的订单</p>
        <div class="all-order">
          <span>全部订单</span>
          <van-icon name="arrow"/>
        </div>
      </div>
      <!-- 订单 -->
      <ul class="list">
        <li @click="$router.push('/mallAllOrder/1')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daifukuan"></use>
          </svg>
          <span>待付款</span>
        </li>
        <li @click="$router.push('/mallAllOrder/2')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daifahuo"></use>
          </svg>
          <span>待发货</span>
        </li>
        <li @click="$router.push('/mallAllOrder/3')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daishouhuo"></use>
          </svg>
          <span>待收货</span>
        </li>
      </ul>
      <!-- 订单 -->
      <!-- 功能列表 -->
      <div class="wrap">
        <p class="title">我的服务</p>
        <div class="cards">
          <div class="card" @click="$router.push('/myRelease')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wodefabu"></use>
            </svg>
            <span>我的发布</span>
          </div>
          <div class="card" @click="$router.push('/collection')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wodeshoucang"></use>
            </svg>
            <span>我的收藏</span>
          </div>
          <div class="card" @click="$router.push('/coupons')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youhuiquan"></use>
            </svg>
            <span>优惠券</span>
          </div>
          <div class="card" @click="invite">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yaoqinghaoyou"></use>
            </svg>
            <span>邀请好友</span>
          </div>
        </div>
        <div class="cards">
          <div class="card" @click="$router.push('/mallAdress')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouhuodizhi"></use>
            </svg>
            <span>收货地址</span>
          </div>
          <div class="card" @click="$router.push('/contact')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-richangshenghuo-jiazheng"></use>
            </svg>
            <span>帮助与客服</span>
          </div>
          <div class="card" @click="$router.push('/contact')">
            <img src="/static/img/icon/shangwuhezuo.svg" alt class="icon">
            <span>商务合作</span>
          </div>
          <div class="card" @click="$router.push('/set')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shezhi"></use>
            </svg>
            <span>设置</span>
          </div>
        </div>
      </div>
      <!-- 功能列表 -->
      <!-- 弹出层 -->
      <van-popup v-model="show">
        <div class="invite">
          <div class="invite-wrap">
            <p class="copy">
              复制链接:
              <span>{{url}}</span>
            </p>
            <p
              class="btn"
              v-clipboard:copy="url"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >点我复制</p>
          </div>
          <p class="tips">温馨提示：</p>
          <p class="instruction">邀请一位好友成功注册后可获得金币或积分哦。赶快去邀请你的小伙伴吧！</p>
        </div>
      </van-popup>
      <!-- 弹出层 -->
    </div>
    <Foot :idx="4"></Foot>
  </div>
</template>

<script>
import Foot from "@/components/Foot";
import logApi from "@/api/log";
import getInfoAPi from "@/api/getInfo";
import { Toast,Icon } from "vant";
export default {
  data() {
    return {
      show: false, //分享是否显示
      user: {
        gold_account: 0,
        mobile: 15056222824,
        points_account: 0
      }, //用户数据占位
      src: "../../static/img/touxiang.png",
      url: "沂源生活金币限时放送，现在注册登录可免费发布广告：",
    };
  },
  mounted() {
    let tokens = JSON.parse(localStorage.getItem("tokens"));
    if (tokens == null) {
      this.$router.push("/login");
    } else {
      this.getInfo(); //后台取用户数据
    }
  },
  methods: {
    recharge() {
      this.$router.push(`/recharge/${this.user.gold_account}`);
    },
    invite() {
      this.getUrl();
    },
    getInfo() {
      logApi
        .getInfo()
        .then(res => {
          if (res.data.code === 10003) {
            Toast("身份已失效，请重新登录");
            this.defined.removeToken();
            this.$router.push("/login");
          } else if (res.data.code === 200) {
            this.user = res.data.data;
            if (this.user.head_portrait) {
              this.src = this.user.head_portrait;
            }
          } else {
            Toast(res.data.msg);
            this.$router.push("/");
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    onCopy(e) {
      Toast("复制成功");
    },
    onError() {
      Toast("复制失败");
    },
    getUrl() {
      getInfoAPi
        .getShareUrl()
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (parseInt(res.data.data.invite_switch)) {
              let url=location.origin;
              this.url="沂源生活金币限时放送，现在注册登录可免费发布广告：";
              this.url = this.url + url+`/register/${res.data.data.user_id}`;
              this.show = true;
            } else {
              Toast("该活动已关闭");
              this.show = false;
            }
          }else if(res.data.code === 10003){
            Toast("身份已失效，请重新登录");
            this.defined.removeToken();
            this.$router.push("/login");
          }else{
            Toast(res.data.msg);
            this.show = false;
          }
        })
        .catch(err => this.$router.push("/notFound"));
    }
  },
  components: {
    Foot,
    [Icon.name]:Icon
  }
};
</script>

<style scoped lang="less">
#head {
  position: fixed;
  left: 0;
  top: 0;
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 40px;
  justify-content: space-between;
  font-size: 30px;
  z-index: 100;
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .more {
    .left {
      margin-right: 10px;
    }
  }
}
#main {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .info {
    padding: 90px 60px 24px;
    background: #2a82e4;
    color: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 26px;
      }
      span {
        line-height: 72px;
        font-size: 28px;
      }
      .change {
        border: 3px solid #fff;
        border-radius: 20px;
        padding: 10px 30px;
      }
    }
    .user {
      img {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        margin-bottom: 10px;
        background: #fff;
      }
      .name {
        font-size: 30px;
      }
    }
  }
  .order {
    background: #fff;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    justify-content: space-between;
    border-bottom: 1px solid#999;
    .my-order {
      font-size: 30px;
      color: #505050;
    }
    .all-order {
      font-size: 24px;
      color: #a6a6a6;
      display: flex;
      align-items: center;
      span {
        margin-right: 20px;
      }
    }
  }
  .list {
    background: #fff;
    display: flex;
    align-items: center;
    padding: 26px 60px 30px;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 26px;
      color: #6e6e6e;
      .icon {
        width: 42px;
        height: 42px;
        margin-bottom: 14px;
      }
    }
  }
  .wrap {
    margin-top: 36px;
    width: 100%;
    background: #fff;
    padding: 0 36px;
    .title {
      height: 104px;
      line-height: 104px;
      font-size: 28px;
      font-weight: 700;
      color: #333;
    }
    .cards {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 2px solid #c4c4c4;
      padding: 50px 0;
      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 140px;
        .icon {
          width: 60px;
          height: 60px;
        }
        span {
          font-size: 24px;
          color: #333;
          margin-top: 20px;
        }
      }
    }
  }
  .invite {
    width:95%;
    margin: 0 auto;
    padding: 20px 40px;
    background: #fff;
    .invite-wrap {
      .copy{
        font-size:26px;
        color:#666;
        span{
          color: #b4a078;
          text-decoration:underline;
        }
      }
      .btn{
        text-align: right;
        color:#b4a078;
        line-height:60px;
      }
    }
    p {
      font-size: 26px;
      color: #333;
    }
    .tips {
      margin-top: 60px;
    }
    .instruction {
      text-indent: 2em;
      margin-top: 20px;
    }
  }
}
</style>