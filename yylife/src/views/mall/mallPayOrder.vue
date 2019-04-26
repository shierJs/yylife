<template>
  <div>
    <Head title="确认订单"></Head>
    <div class="address-wrap" @click="finish">
      <div class="bg"></div>
      <div v-if="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouhuodizhi"></use>
        </svg>
        <span>请完善个人信息</span>
        <img src="/static/img/icon/arrow_down.png" alt>
      </div>
      <div v-else class="local">
        <p class="info">
          <span class="name">{{address.consignee}}</span>
          <span class="phone">{{address.mobile}}</span>
        </p>
        <p class="location">
          <span class="default">默认</span>
          <span class="address">{{address.details}}-{{address.address}}</span>
        </p>
        <img src="/static/img/icon/arrow_down.png" alt>
      </div>
    </div>
    <!-- 收获地址显示 -->
    <transition name="fade">
      <div class="order" v-show="show">
        <div class="box">
          <div class="card">
            <span class="name">订单金额</span>
            <span class="content">￥{{order_data.global_value}}</span>
          </div>
          <div class="card">
            <span class="name">运费</span>
            <span class="content">￥{{order_data.postage}}</span>
          </div>
          <div class="card">
            <span class="name"></span>
            <span class="content">已同意《沂源生活服务协议》</span>
          </div>
        </div>
        <div class="wrap">
          <div class="items" v-for="(item,index) in order_data.goods" :key="index">
            <img :src="item.goods_img" v-if="buy_id == 0" alt>
            <img :src="item.original_img" v-else alt>
            <div class="txt">
              <p class="title">{{item.goods_name}}</p>
              <span class="desc">{{item.spec_key_name}}</span>
              <span class="price">￥{{item.goods_price}}</span>
            </div>
            <p class="num">x{{item.goods_num}}</p>
          </div>
        </div>
      </div>
    </transition>
    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit"/>
  </div>
</template>

<script>
import Head from "@/components/Head";
import flow from "@/filters/flow.js";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast, Icon } from "vant";
export default {
  data() {
    return {
      show: false,
      total: 19900,
      address: {},
      checked: true,
      order_data: {},
      buy_id: 0
    };
  },
  mounted() {
    this.getAddress();
    let id = parseInt(this.$route.params.id);
    if (id) {
      console.log(id);
      let data = JSON.parse(sessionStorage.getItem("orderData"));
      if (!data) {
        Toast("服务器出错了，请稍后重试");
        this.$router.push("/");
      } else {
        this.order_data = data;
        this.total =
          (parseInt(this.order_data.global_value) +
            parseInt(this.order_data.postage)) *
          100;
        this.buy_id = 1;
        this.show = true;
      }
    } else {
      this.getOrderList();
    }
  },
  methods: {
    onSubmit() {
      if (this.buy_id == 0) {
        let idArr = [];
        this.order_data.goods.forEach(el => {
          idArr.push(el.id);
        });
        let data = {
          ids: idArr,
          address_id: this.address.address_id
        };
        setInfoApi
          .toCartPay(data)
          .then(res => {
            if (res.data.code === 200) {
              let data = JSON.stringify(res.data.data);
              sessionStorage.setItem("payData", data);
              this.$router.push("/mallPay");
            } else if (res.data.code === 10003) {
              this.defined.removeToken();
              Toast("身份验证已过期，请重新登录");
              this.$router.push("/login");
            } else {
              Toast(res.data.msg);
            }
          })
          .catch(err => console.log(err));
      } else {
        let data = {
          goods_id: this.order_data.goods[0].goods_id,
          item_id: this.order_data.item_id,
          number: this.order_data.goods[0].goods_num,
          address_id: this.address.address_id
        };
        setInfoApi
          .toGoodsOrderPay(data)
          .then(res => {
            if (res.data.code === 200) {
              let data = JSON.stringify(res.data.data);
              sessionStorage.setItem("payData", data);
              sessionStorage.removeItem("orderData");
              this.$router.push("/mallPay");
            } else if (res.data.code === 10003) {
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
    finish() {
      this.$router.push({
        name: "mallAdress"
      });
    },
    getOrderList() {
      getInfoApi
        .getOrderCart()
        .then(res => {
          if (res.data.code === 200) {
            this.order_data = res.data.data;
            this.total =
              (parseInt(this.order_data.global_value) +
                parseInt(this.order_data.postage)) *
              100;
            this.show = true;
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/log/1");
          } else {
            let data = JSON.parse(sessionStorage.getItem("orderData"));
            if (!data) {
              Toast(res.data.msg);
              this.$router.push("/");
            } else {
              this.order_data = data;
              this.total =
                (parseInt(this.order_data.global_value) +
                  parseInt(this.order_data.postage)) *
                100;
              this.buy_id = 1;
              this.show = true;
            }
          }
        })
        .catch(err => console.log(err));
    },
    getAddress() {
      getInfoApi
        .getAddress()
        .then(res => {
          if (res.data.code === 200) {
            let addressList = res.data.data;
            addressList.forEach(el => {
              if (el.is_default == 1) {
                this.address = el;
              }
            });
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/log/1");
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    }
  },
  components: {
    Head,
    [Icon.name]: Icon
  }
};
</script>

<style scoped lang="less">
.order {
  padding-top: 200px;
  padding-bottom: 50px;
  background: #f4f4f4;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .box {
    background: #fff;
    margin-top: 50px;
    padding: 0 30px;
    .card {
      height: 100px;
      display: flex;
      font-size: 28px;
      color: #333;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eeeeee;
    }
  }
  .wrap {
    margin-top: 20px;
    .items {
      padding: 20px 20px;
      display: flex;
      align-items: center;
      background: #fff;
      position: relative;
      img {
        width: 160px;
        height: 160px;
      }
      .txt {
        display: flex;
        flex-direction: column;
        padding-left: 20px;
        justify-content: space-between;
        height: 160px;
        width: 72%;
        .title {
          font-size: 28px;
          color: #333;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .desc {
          color: #999999;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .num {
        position: absolute;
        top: 30px;
        right: 40px;
      }
    }
  }
}
.van-card {
  background: rgb(235, 232, 232);
}
.address-wrap {
  display: flex;
  align-items: center;
  font-size: 15px;
  position: fixed;
  top: 100px;
  width: 100%;
  left: 0;
  z-index: 30;
  background: #fff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding-left: 15px;
  background: #fff;
  position: relative;
  div {
    display: flex;
    align-items: center;
    padding: 40px 25px;
    span {
      font-size: 28px;
    }
    .icon {
      width: 50px;
      height: 50px;
    }
    img {
      width: 50px;
      height: 50px;
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .local {
    display: block;
    padding: 40px 0;
    color: #333;
    span {
      font-size: 28px;
    }
    .info {
      .name {
        margin-right: 18px;
      }
    }
    .location {
      .default {
        display: inline-block;
        border: 1px solid #b4282d;
        padding: 4px 15px;
        font-size: 20px;
        color: #b4282d;
        margin-top: 10px;
        margin-right: 18px;
      }
      .address {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    img {
      width: 50px;
      height: 50px;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  span {
    margin-left: 20px;
    font-size: 24px;
  }
  .bg {
    width: 100%;
    background: url("/static/img/bg2.png") repeat-x;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .van-icon-arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>