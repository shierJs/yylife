<template>
  <div>
    <Head :title="title"></Head>
    <transition name="fade">
      <div id="main">
        <div class="top">
          <p class="way-bill">运单编号:{{list.LogisticCode}}</p>
          <span class="num">快递名称:{{list.name}}</span>
        </div>
        <div class="steps">
          <van-steps direction="vertical" :active="0" active-color="#2EBAB9">
            <van-step v-for="(item,index) in list" :key="index">
              <h3>{{item.AcceptStation}}</h3>
              <p>{{item.AcceptTime}}</p>
            </van-step>
          </van-steps>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: "物流详情",
      list: {},
      order_id: 0,
      index: 0
    };
  },
  mounted() {
    this.order_id = this.$route.params.orderSn;
    this.index = this.$route.params.methodId;
    this.getList();
  },
  methods: {
    getList() {
      if (this.index == 1) {
        let params = {
          order_id: this.order_id
        };
        getInfoApi
          .getOrderExpress(params)
          .then(res => {
            ;
            this.list=res.data;
          })
          .catch(err => console.log(err));
      } else {
        this.$router.go(-1);
        Toast(
          "同城配送订单由自营物流配送(无物流信息)，如需查看物流信息，请致电客服！"
        );
      }
    }
  },
  components: {
    Head
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
  background: #f4f4f4;
  .top {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 0 30px;
    height: 116px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .way-bill {
      color: #666;
      font-size: 26px;
    }
    .num {
      font-size: 22px;
      color: #999;
    }
  }
  .steps {
    margin: 0 auto;
    margin-top: 20px;
    width: 90%;
    background: #fff;
  }
}
</style>