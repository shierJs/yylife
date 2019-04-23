<template>
  <div>
    <Head :title="title"></Head>
    <div id="main">
      <nav class="nav">
        <ul class="menu-list">
          <li
            v-for="(v,index) in list"
            :key="index"
            :class="{active:v.order_status==status}"
            @click="change(index)"
          >
            <el-badge :value="v.badeg" :max="9" class="news">
              <span>{{v.label}}</span>
            </el-badge>
          </li>
        </ul>
      </nav>
      <div class="view">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :immediate-check="false"
          :error.sync="error"
          finished-text="没有更多内容了"
          v-if="showOrder"
        >
          <van-cell v-for="(item,index) in dataList" :key="index">
            <slot>
              <div class="cards" @click="detail(item.order_sn)">
                <div>
                  <div class="head">
                    <p class="orderNum">订单编号：{{item.order_sn}}</p>
                    <span
                      class="state"
                      v-for="(txt,v) in list"
                      :key="v"
                      v-show="txt.order_status == item.order_status"
                    >{{txt.label}}</span>
                  </div>
                  <div class="item" v-for="(v,i) in item.order_goods" :key="i">
                    <div class="session">
                      <div class="left">
                        <img v-lazy="v.goods_img" :key="v.goods_img" alt>
                        <p class="title">{{v.goods_name | flow}}</p>
                        <p class="desc">{{v.spec_key_name | flow}}</p>
                      </div>
                      <div class="right">
                        <p class="num">x{{v.goods_num}}</p>
                        <p class="price">￥{{v.final_price}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="act" v-show="item.order_status == 1">
                    <span @click.stop="cancel(item.order_id,index)" class="default">取消订单</span>
                    <span @click.stop="paying(item.order_sn)">去付款</span>
                  </div>
                  <div class="act" v-show="item.order_status == 10">
                    <span @click.stop="reciept(item.order_id)" class="reciept">确认收货</span>
                    <span @click.stop="viewLog(item.order_id,item.delivery_method)">查看物流</span>
                  </div>
                </div>
              </div>
            </slot>
          </van-cell>
        </van-list>
        <div class="null" v-else>
          <img src="/static/img/bg3.png" alt>
          <p class="content">还没有任何订单呢</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast } from "vant";
import flow from "@/filters/flow.js";
export default {
  data() {
    return {
      title: "所有订单",
      i: 0,
      show: true,
      error: false,
      list: [
        {
          order_status: 0,
          label: "全部",
          badeg: ""
        },
        {
          order_status: 1,
          label: "待付款",
          badeg: 0
        },
        {
          order_status: 5,
          label: "待发货",
          badeg: 0
        },
        {
          order_status: 10,
          label: "待收货",
          badeg: 0
        },
        {
          order_status: 15,
          label: "已完成",
          badeg: 0
        }
      ],
      dataList: [
        {
          id: 0,
          arr: [
            {
              imgSrc: "/static/img/img811620fc9bc70.png",
              orderNum: 232341434,
              title: "冲锋衣",
              desc: "黑色 L",
              price: "199.00",
              num: 1,
              state: "已付款",
              act: ""
            },
            {
              imgSrc: "/static/img/img821620fc9bc70.png",
              orderNum: 463456764,
              title: "大衣",
              desc: "白色 XL",
              price: "398.00",
              num: 2,
              state: "待付款",
              act: "去付款"
            },
            {
              imgSrc: "/static/img/img821620fc9bc70.png",
              orderNum: 463456764,
              title: "大衣",
              desc: "白色 XL",
              price: "398.00",
              num: 2,
              state: "已发货",
              act: "查看物流"
            },
            {
              imgSrc: "/static/img/img811620fc9bc70.png",
              orderNum: 232341434,
              title: "冲锋衣",
              desc: "黑色 L",
              price: "199.00",
              num: 1,
              state: "已发货",
              act: "查看物流"
            }
          ]
        },
        {
          id: 1,
          arr: [
            {
              imgSrc: "/static/img/img821620fc9bc70.png",
              orderNum: 463456764,
              title: "大衣",
              desc: "白色 XL",
              price: "398.00",
              num: 2,
              state: "待付款",
              act: "去付款"
            }
          ]
        },
        {
          id: 2,
          arr: []
        },
        {
          id: 3,
          arr: [
            {
              imgSrc: "/static/img/img821620fc9bc70.png",
              orderNum: 463456764,
              title: "大衣",
              desc: "白色 XL",
              price: "398.00",
              num: 2,
              state: "已发货",
              act: "查看物流"
            },
            {
              imgSrc: "/static/img/img811620fc9bc70.png",
              orderNum: 232341434,
              title: "冲锋衣",
              desc: "黑色 L",
              price: "199.00",
              num: 1,
              state: "已发货",
              act: "查看物流"
            }
          ]
        },
        {
          id: 4,
          arr: [
            {
              imgSrc: "/static/img/img821620fc9bc70.png",
              orderNum: 463456764,
              title: "大衣",
              desc: "白色 XL",
              price: "199.00",
              num: 1,
              state: "已收货",
              act: ""
            }
          ]
        }
      ],
      status: 0,
      page: 1,
      loading: false,
      finished: false,
      showOrder: false
    };
  },
  methods: {
    change(index) {
      this.status = this.list[index].order_status;
      this.getOrderList();
    },
    getOrderStatus() {
      getInfoApi
        .getOrderStatus()
        .then(res => {
          this.list.forEach(el => {
            res.data.forEach(e => {
              if (el.order_status == e.order_status) {
                if (e.num == 0) {
                  el.badeg = "";
                } else {
                  el.badeg = e.num;
                }
              }
            });
          });
        })
        .catch(err => console.log(err));
    },
    getOrderList() {
      this.page = 1;
      this.finished = false;
      this.dataList = [];
      let params = {
        order_status: this.status,
        page: this.page
      };
      getInfoApi
        .getOrderList(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.dataList = res.data.data;
              this.showOrder = true;
            } else {
              this.showOrder = false;
            }
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/login");
          } else {
            this.showOrder = false;
            Toast(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    onLoad() {
      this.page++;
      let params = {
        order_status: this.status,
        page: this.page
      };
      getInfoApi
        .getOrderList(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (res.data.data.length == 0) {
               Toast("已经加载到最后啦");
              this.finished = true;
              this.loading = false;
            } else {
              this.dataList = this.dataList.concat(res.data.data);
              this.showOrder = true;
              this.loading = false;
            }
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/login");
          } else {
            this.error = true;
            this.showOrder = false;
            Toast(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    detail(id) {
      this.$router.push(`/orderDetail/${id}`);
    },
    paying(n) {
      let data = {
        order_sn: n
      };
      setInfoApi
        .paymentOrder(data)
        .then(res => {
          if (res.data.code === 200) {
            let data = JSON.stringify(res.data.data);
            sessionStorage.setItem("payData", data);
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
    },
    viewLog(sn, id) {
      this.$router.push(`/mallLogistics/${sn}/${id}`);
    },
    reciept(id) {
      this.$dialog
        .confirm({
          title: "请确认本人已签收货物，并且货物完好无损！",
          message: "请确认本人已签收货物，并且货物完好无损！"
        })
        .then(() => {
          // on confirm
          let data = {
            order_id: id
          };
          setInfoApi
            .receivingOrder(data)
            .then(res => {
              ;
              if (res.data.code === 200) {
                Toast(res.data.msg);
                this.getOrderStatus();
                this.change(3);
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/log/1");
              } else {
                Toast(res.data.msg);
              }
            })
            .catch(err => console.log(err));
        })
        .catch(() => {
          // on cancel
        });
    },
    cancel(id,i) {
      this.$dialog
        .confirm({
          title: "确定取消该订单?",
          message: "确定取消该订单?"
        })
        .then(() => {
          // on confirm
          let data = {
            order_id: id
          };
          setInfoApi.cancelOrder(data).then(res => {
            if (res.data.code == 200) {
              Toast(res.data.msg);
              this.dataList.splice(i, 1);
              if (this.dataList.length == 0) {
                this.showOrder=false;
              }
              this.getOrderStatus();
            } else if (res.data.code === 10003) {
              Toast("身份验证已过期，请重新登录");
              this.defined.removeToken();
              this.$router.push("/log/1");
            } else {
              Toast(res.data.msg);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  mounted() {
    this.i = this.$route.params.id;
    this.getOrderStatus();
    this.change(this.i);
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
  .nav {
    background: #fff;
    border-top: 1px solid #eee;
    padding: 0 50px;
    position: fixed;
    top: 90px;
    left: 0;
    z-index: 500;
    width: 100%;
    .menu-list {
      display: flex;
      align-items: center;
      height: 80px;
      width: 100%;
      justify-content: space-between;
      li {
        font-size: 28px;
        height: 100%;
        span {
          line-height: 80px;
        }
      }
      .active {
        color: #ff4444;
        border-bottom: 3px solid #ff4444;
      }
    }
  }
  .view {
    margin-top: 100px;
    .null {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    p.content {
      font-size: 32px;
      color: #999;
      text-align: center;
    }
    .head {
      padding: 0 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #f4f4f4;
      height: 60px;
      color: #8a8a8a;
      font-size: 26px;
    }
    .cards div div.item {
      background: #fff;
      margin-top: 20px;
      width: 100%;

      .session {
        padding: 26px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #666;
        font-size: 24px;
        .left {
          display: flex;
          align-items: center;
          img {
            width: 80px;
            height: 80px;
          }
          .title {
            margin: 0 20px;
          }
        }
        .right {
          display: flex;
          align-items: center;
          .num {
            margin:0 24px;
          }
        }
      }
    }
    .act {
      height: 110px;
      border-top: 2px solid #f4f4f4;
      padding: 0 26px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      span {
        padding: 16px 32px;
        font-size: 24px;
        color: #ff4444;
        border: 1px solid #ff4444;
        margin-left: 20px;
      }
      .reciept {
        color: #279918;
        border: 1px solid #279918;
      }
      .default {
        color: #666;
        border: 1px solid #666;
      }
    }
  }
}
</style>