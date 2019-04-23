<template>
  <div v-show="showPage">
    <Head :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <div class="head clearfix">
          <div class="left fl">
            <h4 class="title">请及时付款，以便订单尽快处理！</h4>
            <p class="order-sn">交易号：{{data.order_sn}}</p>
            <p>请尽快完成付款，否则交易会被取消</p>
          </div>
          <div class="right fr">
            <p class="amount">
              实付：
              <span>￥{{data.order_amount}}</span>
            </p>
          </div>
        </div>
        <div class="wrapper">
          <div class="erweima">
            <canvas id="qrccode-canvas" style="border:1px solid #ddd;"></canvas>
            <p>微信扫一扫支付</p>
          </div>
          <img src="../../static/img/material/000fb2569f08b434de22fa9c74894728.png" alt>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import Foot from "@/components/Foot";
var QRCode = require("qrcode");
var canvas = "";
export default {
  data() {
    return {
      url: "",
      data: {},
      showPage: false,
      timer: null,
      index: 0,
      i:0,
    };
  },
  methods: {
    show() {
      QRCode.toCanvas(canvas, this.data.url, error => {
        if (error) {
          console.log(error);
        } else {
          console.log("success");
        }
      });
    },
    payRes() {
      let params = {
        order_sn: this.data.order_sn,
        type:this.i,
      };
      getInfoApi
        .checkOrderPayment(params)
        .then(res => {
          if (res.data.code === 200) {
            clearInterval(this.timer);
            if(this.data.cate_type == 1){
              this.$router.push("/mine/3");
            }else if(this.data.cate_type == 2){
              this.$router.push("/mine/4");
            }else{
              this.$router.push("/mine/0");
            }
          } else if (res.data.code === 10003) {
            clearInterval(this.timer);
            this.defined.removeToken();
            this.$router.push("/log/0");
          } else {
            clearInterval(this.timer);
            if (this.index == 60) {
              this.$router.push("/");
            } else {
              this.index++;
              this.timer = setInterval(() => {
                this.payRes();
              }, 3000);
            }
          }
        })
        .catch(err => {
          console.log(err);
          clearInterval(this.timer);
        });
    }
  },
  mounted() {
    this.data = JSON.parse(sessionStorage.getItem("wxPayData"));
    this.i=this.$route.params.id;
    if (!this.data) {
      this.showPage = false;
      this.$Message.info("未生成订单，请重试");
      this.$router.go(-1);
    } else {
      this.showPage = true;
      canvas = document.getElementById("qrccode-canvas");
      canvas.width = 150;
      canvas.height = 150;
      this.show();
      this.payRes();
    }
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  components: {
    Head,
    Foot
  }
};
</script>

<style scoped lang="less">
#main {
  .head {
    width: 100%;
    background: #f5f5f5;
    margin-top: 18px;
    padding: 20px;
    .left {
      .title {
        font-size: 16px;
      }
      p {
        color: #666666;
      }
      .order-sn {
        line-height: 35px;
        font-size: 14px;
      }
    }
    .right {
      padding-top: 48px;
      .amount {
        font-size: 18px;
        color: #333;
        font-weight: 600;
        span {
          color: #d4282d;
        }
      }
    }
  }
  .wrapper {
    width: 560px;
    margin: 0 auto;
    margin-top: 50px;
    position: relative;
    height: 351px;
    .erweima {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      p {
        font-size: 17px;
        font-weight: 600;
        text-align: center;
      }
    }
    img {
      vertical-align: middle;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>