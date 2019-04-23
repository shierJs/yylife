<template>
  <div>
    <Head :title="title"></Head>
    <transition name="fade">
      <div id="main" v-show="show">
        <div class="bg"></div>
        <div
          class="address-wrap"
          v-for="(item,index) in addressData"
          :key="index"
          v-show="addressData.length"
        >
          <div class="local">
            <p class="info">
              <span class="name">{{item.consignee}}</span>
              <span class="phone">{{item.mobile}}</span>
            </p>
            <p class="location">
              <span class="default" v-show="item.is_default==1">默认</span>
              <span class="address">{{item.address | flow}}</span>
            </p>
            <i class="iconfont icon-bianji" @click="edit(index)"></i>
          </div>
        </div>
        <div class="none" v-show="!addressData.length">
          <img src="../../../static/img/dizhi.png" alt>
          <p class="txt">您还没有添加任何地址呢</p>
        </div>
        <!-- 收获地址显示 -->
        <!-- 新增收货地址 -->
        <p class="add" @click="add">
          <span>新增地址</span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head";
import flow from "@/filters/flow.js";
import getInfoApi from "@/api/getInfo";
import { Icon } from "vant";
export default {
  data() {
    return {
      title: "收货地址",
      show: false,
      addressData: []
    };
  },
  methods: {
    edit(i) {
      this.$router.push({
        path: `/editAddress/${this.addressData[i].address_id}`
      });
    },
    add() {
      this.$router.push({
        path: `/editAddress/-1`
      });
    },
    getAddress() {
      getInfoApi
        .getAddress()
        .then(res => {
          if (res.data.code === 10003) {
            Toast("身份验证已过期,请重新登录");
            this.defined.removeToken();
            this.$router.push("/login");
          } else if (res.data.code === 200) {
            this.addressData = res.data.data;
            this.addressData.forEach(el => {
              return el.address = el.details+el.address;
            });
            this.show = true;
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    }
  },
  mounted() {
    this.getAddress();
  },
  components: {
    Head,
    [Icon.name]:Icon
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f5f5;
  padding-bottom:100px;
  .bg {
    width: 100%;
    background: url("/static/img/bg2.png") repeat-x;
    height: 20px;
    position: fixed;
    top: 90px;
    z-index: 30;
    left: 0;
  }
  .address-wrap {
    display: flex;
    align-items: center;
    font-size: 15px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding-left: 15px;
    background: #fff;
    position: relative;
    .local {
      display: block;
      padding: 40px 0;
      color: #333;
      span {
        font-size: 28px;
      }
      .info {
        .name {
          margin-right: 58px;
        }
      }
      .location {
        .default {
          display: inline-block;
          border: 1px solid #b4282d;
          padding: 4px 10px;
          font-size: 20px;
          color: #b4282d;
          position: absolute;
          left: 13px;
          bottom: 40px;
        }
        .address {
          margin-left: 150px;
        }
      }
      .icon-bianji {
        font-size: 32px;
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    span {
      margin-left: 20px;
      font-size: 24px;
    }
    .van-icon-arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .none {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 300px;
      height: 300px;
      margin: 0 auto;
    }
    .txt {
      font-size: 30px;
      color: #5c5c5c;
    }
  }
  .add {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100px;
    background: #ff4444;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    span {
      color: #fff;
      font-size: 32px;
    }
  }
}
</style>