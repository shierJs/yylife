<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <div class="info">
          <h3 class="title">选择付款方式</h3>
          <div class="trading clear">
            <p class="fl">{{order_num}}</p>
            <p class="total fr" v-if="payMethod != 'gold'">
              <span class="label">实付：</span>
              <span class="price">￥{{price}}</span>
            </p>
            <p class="total fr" v-else>
              <span class="label">实付：</span>
              <span class="price">{{order_gold}}金币</span>
            </p>
          </div>
        </div>
        <div class="payment">
          <p class="title">支付方式</p>
          <div class="methods">
            <RadioGroup v-model="payMethod">
              <Radio label="alipay">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-alipay"></use>
                </svg>
              </Radio>
              <Radio label="weChat">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixinzhifu1"></use>
                </svg>
              </Radio>
              <Radio label="gold" :disabled="gold_pay">
                <svg class="icon gold" aria-hidden="true">
                  <use xlink:href="#icon-jinbi"></use>
                </svg>
                <span>金币支付(剩余:{{gold_count}})</span>
              </Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="paying clearfix">
          <p class="pay fr" @click="paying">立即付款</p>
        </div>
      </div>
    </div>
    <div class="pop" v-show="pop">
      <div class="wrap">
        <p class="title">请尽快完成付款，否则订单会被系统取消</p>
        <div class="action clearfix">
          <div class="btns fl">
            <p class="tips">支付成功请点击</p>
            <p class="btn success" @click="confirmPay">已完成付款</p>
          </div>
          <div class="line fl"></div>
          <div class="btns fr">
            <p class="tips">支付失败请点击</p>
            <p class="btn fail" @click="rePay">重新付款</p>
          </div>
        </div>
        <div class="ps">
          <p>注：重新付款前，请关闭之前的付款页面</p>
          <p>
            如有疑问或需要帮助，请进入
            <span @click="$router.push('/help')">帮助中心</span> 或联系在线客服
          </p>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import { mapState } from "vuex";
import setInfoApi from "@/api/setInfo";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      payMethod: "alipay",
      price: 0,
      gold_pay: true,
      order_num: "",
      gold_count: 0,
      type: 0,
      pop: false,
      order_gold: 0,
      release: false,
      releaseId:0,
      data: {},
      htmls: ""
    };
  },
  methods: {
    paying() {
      if (this.payMethod === "alipay") {
        this.$Message.info("支付宝支付");
        this.type = 1;
      } else if (this.payMethod === "weChat") {
        this.type = 2;
      } else {
        this.type = 3;
      }
      if (this.release) {
        let data = {
          type: this.type,
          web_type: "pc",
          days: parseInt(this.data.days),
          common_id: this.data.id,
          location: this.data.location,
          mold: this.releaseId
        };
        setInfoApi
          .paymentsPublish(data)
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg);
              this.$router.push("/mine/4");
            } else if (res.data.code === 201) {
              let data = res.data.data;
              data.cate_type=2;
              data = JSON.stringify(data);
              sessionStorage.setItem("wxPayData", data);
              $("body").css("overflow", "hidden"); //浮层出现时窗口不能滚动设置
              const { href } = this.$router.resolve({
                path: "/weChatPay/2",
                query: {
                  pdf: JSON.stringify(this.pdf)
                }
              });
              window.open(href, "_blank");
              this.pop = true;
            } else if (res.data.code === 203) {
              let routerData = this.$router.resolve({
                path: "/aliPay",
                query: { htmls: res.data.data }
              });
              this.htmls = res.data.data;
              window.open(routerData.href, "_blank");
            } else if (res.data.code === 10003) {
              this.defined.removeToken();
              this.$router.push("/log/0");
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => console.log(err));
      } else {
        let data = {
          type: this.type,
          order_sn: this.order_num,
          web_type: "pc"
        };
        setInfoApi
          .paymentGoods(data)
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg);
              sessionStorage.removeItem("payData");
              sessionStorage.setItem("orderSn", this.order_num);
              this.$router.push("/mine/3");
            } else if (res.data.code === 201) {
              let data = res.data.data;
              data.cate_type=1;
              data=JSON.stringify(data);
              sessionStorage.setItem("wxPayData", data);
              $("body").css("overflow", "hidden"); //浮层出现时窗口不能滚动设置
              const { href } = this.$router.resolve({
                path: "/weChatPay/1",
                query: {
                  pdf: JSON.stringify(this.pdf)
                }
              });
              window.open(href, "_blank");
              this.pop = true;
            } else if (res.data.code === 203) {
              let routerData = this.$router.resolve({
                path: "/aliPay",
                query: { htmls: res.data.data }
              });
              this.htmls = res.data.data;
              window.open(routerData.href, "_blank");
              // const div=document.createElement('div');
              // div.innerHTML=this.htmls;
              // document.body.appendChild(div);
              // document.forms[0].submit();
            } else if (res.data.code === 10003) {
              this.defined.removeToken();
              this.$router.push("/log/0");
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => console.log(err));
      }
    },
    getData() {
      let data = JSON.parse(sessionStorage.getItem("payData"));
      if (data) {
        this.data = data;
        this.price = data.order_amount;
        this.gold_count = data.gold_account;
        this.order_num = data.order_sn;
        this.order_gold = Math.floor(this.price * 10);
        if (this.gold_count > this.order_gold) {
          this.gold_pay = false;
        } else {
          this.gold_pay = true;
        }
        if (this.order_num == "发布支付") {
          this.release = true;
          this.releaseId=data.releaseId;
        }
      } else {
        this.$router.push("/");
      }
    },
    rePay() {
      if (this.type == 2) {
        sessionStorage.removeItem("wxPayData");
        this.pop = false;
      }
    },
    confirmPay() {
      sessionStorage.setItem("orderSn", this.order_num);
      if (this.release) {
        this.$router.push("/mine/4");
      } else {
        this.$router.push("/mine/3");
      }
    }
  },
  mounted() {
    this.getData();
  },
  components: {
    Head,
    Foot
  }
};
</script>

<style scoped lang='less'>
#main {
  border-top: 1px solid #ddd;
  padding: 40px 0;
  .wrap {
    .info {
      background: #fff;
      .title {
        font-size: 18px;
        color: #333;
        line-height: 32px;
      }
      .trading {
        .fl {
          font-size: 16px;
          color: #999;
        }
        .total {
          font-size: 18px;
          .label {
            color: #333;
          }
          .price {
            font-size: 18px;
            color: #d4282d;
          }
        }
      }
    }
    .payment {
      border: 1px solid #ddd;
      .title {
        font-size: 16px;
        background: #eee;
        color: #333;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
      }
      .ivu-radio-wrapper {
        margin-left: 20px;
      }
      .icon {
        width: 150px;
        height: 150px;
        vertical-align: middle;
      }
      .gold {
        width: 70px;
        height: 70px;
      }
      span {
        font-size: 16px;
        font-weight: 600;
      }
    }
    .paying {
      margin-top: 20px;
      .pay {
        width: 180px;
        height: 50px;
        color: #fff;
        background: #a7946f;
        text-align: center;
        border-radius: 4px;
        line-height: 50px;
        font-size: 16px;
      }
      .pay:hover {
        cursor: pointer;
        background: #b4a078;
      }
    }
  }
}
.pop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -200px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
  .wrap {
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    padding: 40px 110px;
    transform: translate(-50%, -50%);
    .title {
      font-size: 16px;
      text-align: center;
      line-height: 60px;
    }
    .action {
      margin: 40px 0;
      .btns {
        text-align: center;
        width: 44%;
        .tips {
          font-size: 14px;
          line-height: 30px;
        }
        .btn {
          width: 120px;
          height: 40px;
          font-size: 16px;
          line-height: 40px;
          border: 1px solid #ccc;
          margin: 0 auto;
          cursor: pointer;
        }
        .success {
          background: #f3f3f3;
        }
        .success:hover {
          background: #fff;
        }
        .fail {
          background: rgba(180, 160, 120, 1);
          color: #fff;
          border-color: rgba(180, 160, 120, 0.9);
        }
        .fail:hover {
          background: rgba(180, 160, 120, 0.9);
        }
      }
      .line {
        height: 70px;
        width: 1px;
        margin: 0 20px;
        background: #aaa;
      }
    }
    .ps {
      text-align: center;
      p {
        font-size: 15px;
        color: #999;
        line-height: 30px;
        span {
          color: #b4a078;
        }
        span:hover {
          cursor: pointer;
          text-decoration: underline;
          color: #3fc5ee;
        }
      }
    }
  }
}
</style>