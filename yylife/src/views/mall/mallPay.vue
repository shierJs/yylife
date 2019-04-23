<template>
  <div>
    <Head :title="title"></Head>
    <transition name="fade">
      <div id="main" v-show="show">
        <Swiper :banner="banner"></Swiper>
        <div class="order">
          <div class="content">
            <p class="price">实付：￥{{data.order_amount}}</p>
            <span class="num">订单号-{{data.order_sn}}</span>
          </div>
        </div>
        <div class="wrap">
          <div class="pay" @click="pay1">
            <i class="iconfont icon-zhifubaozhifu"></i>
            <span>支付宝支付</span>
            <div class="radio">
              <i class="iconfont icon-danxuankuangyixuanzhong" v-show="pay==1"></i>
            </div>
          </div>
          <div class="pay" @click="pay2">
            <i class="iconfont icon-weixinzhifu"></i>
            <span>微信支付</span>
            <div class="radio">
              <i class="iconfont icon-danxuankuangyixuanzhong" v-show="pay == 2"></i>
            </div>
          </div>
          <div class="pay" @click="pay3">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jinbi"></use>
            </svg>
            <span>金币支付(余额：{{data.gold_account}})</span>
            <div class="radio">
              <i class="iconfont icon-danxuankuangyixuanzhong" v-show="pay==3"></i>
            </div>
          </div>
        </div>
        <div class="paying" @click="paying">
          <span v-if="order_gold==0">确认支付￥{{data.order_amount}}</span>
          <span v-else>确认支付{{order_gold}}金币</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import setInfoApi from "@/api/setInfo";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: "支付订单",
      show: false,
      pay: 1,
      banner: [
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png",
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png",
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png"
      ],
      data: {},
      order_gold:0,
    };
  },
  methods: {
    pay1() {
      this.pay = 1;
      this.order_gold=0;
    },
    pay2() {
      this.pay = 2;
      this.order_gold=0;
    },
    pay3() {
      this.pay = 3;
      let order_gold=Math.floor((this.data.order_amount)*10);
      if(this.data.gold_account>order_gold){
        this.order_gold=order_gold;
      }else{
        this.pay=1;
        Toast("您的金币余额不足以支付该订单");
      }
    },
    paying() {
      let data = {
        type: this.pay,
        order_sn: this.data.order_sn,
        web_type: "wap"
      };
      setInfoApi
        .paymentGoods(data)
        .then(res => {
          ;
          if (res.data.code === 200) {
            Toast(res.data.msg);
            sessionStorage.removeItem('payData');
            this.$router.push(`/orderDetail/${this.data.order_sn}`);
          }else if(res.data.code === 202){
            location.href=res.data.data.url;
          }else if(res.data.code === 204){
            let routerData = this.$router.resolve({
                path: "/aliPay",
                query: { htmls: res.data.data }
              });
              this.htmls = res.data.data;
              window.open(routerData.href, "_self");
          }else if (res.data.code === 10003) {
            this.defined.removeToken();
            Toast("身份验证已过期，请重新登录");
            this.$router.push("/");
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.data = JSON.parse(sessionStorage.getItem("payData"));
    if (this.data) {
      this.show = true;
    } else {
      Toast("没有未支付订单");
      this.$router.push('/');
    }
  },
  components: {
    Head,
    Swiper
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  background: #f4f4f4;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .order {
    background: #fff;
    padding-left: 52px;
    height: 146px;
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      margin-right: 36px;
    }
    .content {
      font-size: 24px;
      color: #5a5a5a;
    }
  }
  .wrap {
    margin-top: 20px;
    background: #fff;
    .pay {
      padding: 0 20px;
      height: 100px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ebebeb;
      position: relative;
      .icon {
        width: 40px;
        height: 40px;
        margin-right: 20px;
      }
      .iconfont {
        font-size: 36px;
        margin-right: 20px;
      }
      .icon-weixinzhifu {
        color: #24af41;
      }
      .icon-zhifubaozhifu {
        color: #108ee9;
      }
      span {
        font-size: 24px;
      }
      .radio {
        position: absolute;
        right: 20px;
        width: 32px;
        height: 32px;
        border: 1px solid #333;
        border-radius: 16px;
        .iconfont {
          font-size: 36px;
          margin: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          color: #18a689;
        }
      }
    }
  }
  .paying {
    width: 90%;
    margin: 0 auto;
    margin-top: 164px;
    height: 80px;
    border-radius: 10px;
    background: #ff4444;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 32px;
      color: #fff;
    }
  }
}
</style>