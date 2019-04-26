<template>
  <div>
    <Head :title="headTitle"></Head>
    <div id="main">
      <div class="recharge">
        <div class="card">
          <p class="title">账户余额：</p>
          <p class="balance">{{goldAccount}}</p>
        </div>
        <div class="card">
          <p class="title">充值金币：</p>
          <input type="number" v-model="amount" placeholder="输入您要充值的金币个数">
        </div>
        <div class="wrap">
          <div class="pay" @click="pay1">
            <i class="iconfont icon-weixinzhifu"></i>
            <span>微信支付</span>
            <div class="radio">
              <i class="iconfont icon-danxuankuangyixuanzhong" v-show="pay"></i>
            </div>
          </div>
          <div class="pay" @click="pay2">
            <i class="iconfont icon-zhifubaozhifu"></i>
            <span>支付宝支付</span>
            <div class="radio">
              <i class="iconfont icon-danxuankuangyixuanzhong" v-show="!pay"></i>
            </div>
          </div>
        </div>
        <div class="btn">
          <p class="pay" @click="paying">立即支付</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
import { Toast } from "vant";
import payApi from "@/api/pay";
export default {
  data() {
    return {
      headTitle: "金币充值",
      amount: "",
      goldAccount: 11,
      pay: true,
      title: ""
    };
  },
  methods: {
    pay1() {
      this.pay = true;
    },
    pay2() {
      this.pay = false;
    },
    paying() {
      if (this.amount === "") {
        Toast("请输入充值金额");
      } else if(this.amount < 1){
        Toast("输入充值金币个数不能小于1");
      }else {
        let isWeiXin = () => {
          return (
            navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1
          );
        };
        if (isWeiXin()) {
          Toast("微信浏览器不支持支付宝，微信支付");
        } else {
          if (this.pay) {
            let params = {
              account: this.amount,
              type: 4
            };
            payApi
              .reCharge(params)
              .then(res => {
                if (res.data.code === 204) {
                  location.href = res.data.data.url;
                } else if (res.data.code === 202) {
                  let routerData = this.$router.resolve({
                    path: "/aliPay",
                    query: { htmls: res.data.data }
                  });
                  this.htmls = res.data.data;
                  window.open(routerData.href, "_self");
                } else if (res.data.code === 10003) {
                  this.defined.removeToken();
                  Toast("身份验证已过期，请重新登录");
                  this.$router.push("/");
                } else {
                  Toast(res.data.msg);
                }
              })
              .catch(err => {
                this.$router.push("/notFound");
              });
          } else {
            let params = {
              account: this.amount,
              type: 2
            };
            payApi
              .reCharge(params)
              .then(res => {
                ;
                if (res.data.code === 204) {
                  location.href = res.data.data.url;
                } else if (res.data.code === 202) {
                  let routerData = this.$router.resolve({
                    path: "/aliPay",
                    query: { htmls: res.data.data }
                  });
                  this.htmls = res.data.data;
                  window.open(routerData.href, "_self");
                } else if (res.data.code === 10003) {
                  ;
                  this.defined.removeToken();
                  Toast("身份验证已过期，请重新登录");
                  this.$router.push("/");
                } else {
                  Toast(res.data.msg);
                }
              })
              .catch(err => {
                this.$router.push("/notFound");
              });
          }
        }
      }
    }
  },
  created() {
    this.goldAccount = this.$route.params.id;
    this.title = this.$route.meta.title;
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f4f4f4;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 90px;
  .recharge {
    margin-top: 20px;
    background: #fff;
    .card {
      padding: 0 40px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      font-size: 26px;
      color: #666;
      .balance {
        font-weight: 800;
        color: #ff8d1a;
      }
      input {
        text-align: right;
        width:540px;
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
    .btn {
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      .pay {
        width: 412px;
        height: 92px;
        border-radius: 46px;
        background: #2dcb6e;
        font-size: 28px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>