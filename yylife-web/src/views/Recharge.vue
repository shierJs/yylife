<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <div class="info">
          <h3 class="title">金币充值</h3>
          <div class="trading clear">
            <input type="number" v-model.number="count" class="fl input" placeholder="请输入金币充值数量">
            <p class="fr">金币余额：{{account}}</p>
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
            </RadioGroup>
          </div>
        </div>
        <div class="paying clearfix">
          <p class="pay fr" @click="paying">立即付款</p>
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
      order_gold: 0,
      count: "",
      account: 0,
      title: "",
      type: 1
    };
  },
  methods: {
    paying() {
      if (this.count == "" || this.count <= 0) {
        this.$Message.info("请输入充值金币的数量");
      } else {
        if (this.payMethod === "alipay") {
          this.type = 1;
        } else if (this.payMethod === "weChat") {
          this.type = 3;
        }
        let params = {
          account: this.count,
          type: this.type
        };
        setInfoApi
          .reCharge(params)
          .then(res => {
            if (res.data.code === 203) {
              let data =res.data.data;
              data.cate_type=3;
              data=JSON.stringify(data);
              sessionStorage.setItem("wxPayData", data);
              const { href } = this.$router.resolve({
                path: "/weChatPay/3",
                query: {
                  pdf: JSON.stringify(this.pdf)
                }
              });
              window.open(href, "_blank");
            } else if (res.data.code === 201) {
              let routerData = this.$router.resolve({
                path: "/aliPay",
                query: { htmls: res.data.data }
              });
              this.htmls = res.data.data;
              window.open(routerData.href, "_blank");
            } else if (res.data.code === 10003) {
              this.defined.removeToken();
              this.$Message.info("身份验证已过期，请重新登录");
              this.$router.push("/");
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push("/notFound");
          });
      }
    },
    confirmPay() {
      this.$router.push("/mine/1");
    }
  },
  mounted() {
    this.account = parseInt(this.$route.params.id);
    this.title = this.$route.meta.title;
  },
  components: {
    Head,
    Foot,
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
        padding-bottom: 15px;
        .fl {
          font-size: 14px;
          color: #999;
        }
        .input {
          border: none;
          border-bottom: 1px solid #b4a078;
        }
        .fr {
          font-size: 16px;
          color: #b4a078;
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
</style>