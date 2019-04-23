<template>
  <div>
    <header id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)"/>
      <p class="title">订单详情</p>
    </header>
    <transition name="fade">
      <div id="main" v-show="show">
        <div class="address-wrap">
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
              <span class="name">{{order_data.consignee}}</span>
              <span class="phone">{{order_data.mobile}}</span>
            </p>
            <p class="location">
              <span class="default">默认</span>
              <span class="address">{{order_data.address}}</span>
            </p>
          </div>
        </div>
        <!-- 收获地址显示 -->
        <div class="order">
          <div class="box">
            <div class="card">
              <span class="name">订单金额</span>
              <span class="content">￥{{order_data.order_amount}}</span>
            </div>
            <div class="card">
              <span class="name">运费</span>
              <span class="content">￥{{order_data.shipping_price}}</span>
            </div>
            <div class="card">
              <span class="name">下单时间</span>
              <span class="content">{{order_data.create_time}}</span>
            </div>
            <div class="card">
              <span class="name">订单编号</span>
              <span class="content">{{order_data.order_sn}}</span>
            </div>
            <div class="card">
              <span class="name">订单状态</span>
              <span class="content">{{status}}</span>
            </div>
          </div>
          <div class="wrap">
            <div class="items" v-for="(item,index) in order_data.order_goods" :key="index">
              <img :src="item.goods_img" alt>
              <div class="txt">
                <p class="title">{{item.goods_name}}</p>
                <span class="desc">{{item.spec_key_name}}</span>
                <span class="price">￥{{item.goods_price}}</span>
              </div>
              <p class="num">x{{item.goods_num}}</p>
            </div>
          </div>
        </div>
        <van-submit-bar
          v-show="order_data.order_status == 1"
          :price="total"
          button-text="提交订单"
          @submit="onSubmit"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head";
import setInfoApi from "@/api/setInfo";
import getInfoApi from "@/api/getInfo";
import { Icon } from "vant";
export default {
  data() {
    return {
      show: false,
      order_data: {},
      total: 100,
      order_sn: "",
      status: "查询中...",
      order_status: [
        {
          id: 1,
          name: "待支付"
        },
        {
          id: 5,
          name: "待发货"
        },
        {
          id: 10,
          name: "待收货"
        },
        {
          id: 15,
          name: "已完成"
        }
      ]
    };
  },
  methods: {
    onSubmit() {},
    getData() {
      let params = {
        order_sn: this.order_sn
      };
      getInfoApi.getOrderDetail(params).then(res => {
        if (res.data.code === 200) {
          this.order_data = res.data.data;
          this.total=parseInt(this.order_data.order_amount)*100;
          console.log(this.order_data);
          this.order_status.forEach(el => {
            if (el.id == this.order_data.order_status) {
              this.status = el.name;
            }
          });
          this.show = true;
        } else if (res.data.code === 10003) {
          Toast("身份验证已过期，请重新登录");
          this.defined.removeToken();
          this.$router.push("/login");
        } else {
          Toast(res.data.msg);
        }
      });
    }
  },
  created() {
    this.order_sn = this.$route.params.id;
    if (this.order_sn) {
      this.getData();
    } else {
      this.$router.push("/");
    }
  },
  components: {
    Head,
    [Icon.name]:Icon
  }
};
</script>

<style scoped lang="less">
#head {
  height: 90px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 40px;
  justify-content: space-between;
  font-size: 30px;
  background: #fff;
  z-index: 200;
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 40px;
    }
  }
}
#main {
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
        padding: 30px 20px;
        display: flex;
        align-items: center;
        background: #fff;
        position: relative;
        overflow: hidden;
        img {
          width: 160px;
          height: 160px;
        }
        .txt {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 160px;
          padding:0 20px;
          .title {
            font-size: 28px;
            color: #333;
          }
          .desc {
            color: #999999;
          }
        }
        .num {
          position: absolute;
          top: 20px;
          right: 20px;
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
    top: 90px;
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
}
</style>