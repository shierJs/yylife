<template>
  <div>
    <div class="wrapper">
      <div v-show="order">
        <Tabs @on-click="tab">
          <!-- 所有订单 -->
          <TabPane :label="all" class="tab1">
            <div class="none" v-show="!show">
              <div class="none-icon"></div>
              <p>还没有订单呢</p>
            </div>
            <div class="order-wrap" v-show="show">
              <div class="order-list" v-for="(item,index) in orderList" :key="index">
                <div class="head clearfix">
                  <p class="order-time">下单时间：{{item.create_time}}</p>
                  <p class="order-num">订单号：{{item.order_sn}}</p>
                  <p
                    class="order-num"
                    style="margin-left:200px;width:200px;text-align:center;"
                    v-for="(txt,n) in status_txt"
                    :key="n"
                    v-show="txt.id == item.order_status"
                  >订单状态：{{txt.status}}</p>
                  <i
                    class="iconfont icon-lajitong"
                    v-show="item.order_status == 15||item.order_status == 20||item.order_status == 25"
                    @click="del(item.order_id)"
                  ></i>
                </div>
                <ul class="list">
                  <li class="item" v-for="(v,i) in item.order_goods" :key="i">
                    <div class="img">
                      <img :src="v.goods_img" alt :title="v.goods_name">
                    </div>
                    <p class="name">{{v.goods_name}}</p>
                    <p class="state">￥{{v.final_price}}</p>
                  </li>
                </ul>
                <div class="order_price">
                  <p>应付金额：￥{{item.order_amount}}</p>
                </div>
                <div class="operation-wrap">
                  <div class="operation">
                    <i-button
                      type="error"
                      v-show="item.order_status == 1"
                      @click="paying(item.order_sn)"
                    >去付款</i-button>
                    <p v-show="item.order_status == 10" @click="getExpress(item.order_id)">查看物流</p>
                    <i-button
                      type="success"
                      v-show="item.order_status == 10"
                      @click="recive(item.order_id)"
                    >确认收货</i-button>
                    <p v-show="item.order_status != 10" @click="detail(item.order_sn)">查看详情</p>
                    <p v-show="item.order_status == 1" @click="cancel(item.order_id,index)">取消订单</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <!-- 所有订单 -->
          <!-- 待付款 -->
          <TabPane :label="pendPay" :name="statusArr[0].order_status">
            <div class="none" v-show="!show">
              <div class="none-icon"></div>
              <p>还没有订单呢</p>
            </div>
            <div class="order-wrap" v-show="show">
              <div class="order-list" v-for="(item,index) in orderList" :key="index">
                <div class="head clearfix">
                  <p class="order-time">下单时间：{{item.create_time}}</p>
                  <p class="order-num">订单号：{{item.order_sn}}</p>
                </div>
                <ul class="list">
                  <li class="item" v-for="(v,i) in item.order_goods" :key="i">
                    <div class="img">
                      <img v-lazy="v.goods_img" :key="v.goods_img" alt :title="v.goods_name">
                    </div>
                    <p class="name">{{v.goods_name}}</p>
                    <p class="state">￥{{v.final_price}}</p>
                  </li>
                </ul>
                <div class="order_price">
                  <p>应付金额：￥{{item.order_amount}}</p>
                </div>
                <div class="operation-wrap">
                  <div class="operation">
                    <i-button
                      type="error"
                      v-show="item.order_status == 1"
                      @click="paying(item.order_sn)"
                    >去付款</i-button>
                    <p v-show="item.order_status != 10" @click="detail(item.order_sn)">查看详情</p>
                    <p @click="cancel(item.order_id,index)">取消订单</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <!-- 待付款 -->
          <!-- 待发货 -->
          <TabPane :label="pendDelivery" :name="statusArr[1].order_status">
            <div class="none" v-show="!show">
              <div class="none-icon"></div>
              <p>还没有订单呢</p>
            </div>
            <div class="order-wrap" v-show="show">
              <div class="order-list" v-for="(item,index) in orderList" :key="index">
                <div class="head clearfix">
                  <p class="order-time">下单时间：{{item.create_time}}</p>
                  <p class="order-num">订单号：{{item.order_sn}}</p>
                </div>
                <ul class="list">
                  <li class="item" v-for="(v,i) in item.order_goods" :key="i">
                    <div class="img">
                      <img v-lazy="v.goods_img" :key="v.goods_img" alt :title="v.goods_name">
                    </div>
                    <p class="name">{{v.goods_name}}</p>
                    <p class="state">￥{{v.final_price}}</p>
                  </li>
                </ul>
                <div class="order_price">
                  <p>应付金额：￥{{item.order_amount}}</p>
                </div>
                <div class="operation-wrap">
                  <div class="operation">
                    <p v-show="item.order_status != 10" @click="detail(item.order_sn)">查看详情</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <!-- 待发货 -->
          <!-- 待收货 -->
          <TabPane :label="shipped" :name="statusArr[2].order_status">
            <div class="none" v-show="!show">
              <div class="none-icon"></div>
              <p>还没有订单呢</p>
            </div>
            <div class="order-wrap" v-show="show">
              <div class="order-list" v-for="(item,index) in orderList" :key="index">
                <div class="head clearfix">
                  <p class="order-time">下单时间：{{item.create_time}}</p>
                  <p class="order-num">订单号：{{item.order_sn}}</p>
                </div>
                <ul class="list">
                  <li class="item" v-for="(v,i) in item.order_goods" :key="i">
                    <div class="img">
                      <img v-lazy="v.goods_img" :key="v.goods_img" alt :title="v.goods_name">
                    </div>
                    <p class="name">{{v.goods_name}}</p>
                    <p class="state">￥{{v.final_price}}</p>
                  </li>
                </ul>
                <div class="order_price">
                  <p>应付金额：￥{{item.order_amount}}</p>
                </div>
                <div class="operation-wrap">
                  <div class="operation">
                    <p
                      v-show="item.order_status == 10"
                      @click="getExpress(item.order_id,item.delivery_method)"
                    >查看物流</p>
                    <i-button
                      type="success"
                      v-show="item.order_status == 10"
                      @click="recive(item.order_id)"
                    >确认收货</i-button>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <!-- 待收货 -->
          <!-- 已完成 -->
          <TabPane :label="completed" :name="statusArr[3].order_status">
            <div class="none" v-show="!show">
              <div class="none-icon"></div>
              <p>还没有订单呢</p>
            </div>
            <div class="order-wrap" v-show="show">
              <div class="order-list" v-for="(item,index) in orderList" :key="index">
                <div class="head clearfix">
                  <p class="order-time">下单时间：{{item.create_time}}</p>
                  <p class="order-num">订单号：{{item.order_sn}}</p>
                  <i
                    class="iconfont icon-lajitong"
                    v-show="item.order_status == 15||item.order_status == 20||item.order_status == 25"
                    @click="del(item.order_id,index)"
                  ></i>
                </div>
                <ul class="list">
                  <li class="item" v-for="(v,i) in item.order_goods" :key="i">
                    <div class="img">
                      <img v-lazy="v.goods_img" :key="v.goods_img" alt :title="v.goods_name">
                    </div>
                    <p class="name">{{v.goods_name}}</p>
                    <p class="state">￥{{v.final_price}}</p>
                  </li>
                </ul>
                <div class="order_price">
                  <p>应付金额：￥{{item.order_amount}}</p>
                </div>
                <div class="operation-wrap">
                  <div class="operation">
                    <p v-show="item.order_status != 10" @click="detail(item.order_sn)">查看详情</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <!-- 已完成 -->
        </Tabs>
        <Page :total="total" @on-change="change" :current="orderCurrent" v-show="show"/>
        <!-- 页码 -->
        <!-- 确认收货弹出层 -->
        <Modal v-model="modal3" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>确认收货</span>
          </p>
          <div style="text-align:center">
            <p>请确认本人已签收货物!</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long :loading="loading" @click="receipt">确认</Button>
          </div>
        </Modal>
        <!-- 确认收货弹出层 -->
        <!-- 订单删除弹出层 -->
        <Modal v-model="modal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除订单</span>
          </p>
          <div style="text-align:center">
            <p>删除的订单无法申请售后是否继续?</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long :loading="loading" @click="delOrder">确认</Button>
          </div>
        </Modal>
        <!-- 订单删除弹出层 -->
        <!-- 订单取消弹出层 -->
        <Modal v-model="modal1" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>取消订单</span>
          </p>
          <div style="text-align:center">
            <p>确定取消该订单?</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long :loading="loading" @click="calOrder">确认</Button>
          </div>
        </Modal>
        <!-- 订单取消弹出层 -->
      </div>
      <!-- 订单详情 -->
      <div v-show="!order" class="order-detail">
        <div class="order-wrap">
          <div class="head">
            <Row class="head-row">
              <i-col span="3">
                <p class="back" @click="backList">返回订单列表</p>
              </i-col>
              <i-col span="9">
                <p>商品信息</p>
              </i-col>
              <i-col span="3">
                <p>单价</p>
              </i-col>
              <i-col span="5">
                <p>数量</p>
              </i-col>
              <i-col span="4">
                <p>小计</p>
              </i-col>
            </Row>
          </div>
          <Row v-for="(item,index) in orderDetail.order_goods" :key="index" class="order-row">
            <i-col span="12">
              <div class="info-wrap">
                <div class="img-wrap">
                  <img v-lazy="item.goods_img" :key="item.goods_img" alt>
                </div>
                <div class="info">
                  <p class="title">{{item.goods_name}}</p>
                  <span class="spec">{{item.spec_key_name}}</span>
                </div>
              </div>
            </i-col>
            <i-col span="3">
              <p class="price">￥{{item.final_price}}</p>
            </i-col>
            <i-col span="5">
              <div class="num">
                <p class="input">{{item.goods_num}}</p>
              </div>
            </i-col>
            <i-col span="4">
              <p class="subtotal">￥{{item.amount}}</p>
            </i-col>
          </Row>
        </div>
        <div class="orderInfo">
          <div class="clearfix info">
            <div class="fl left">
              <p class="label">订单号：&emsp;{{orderDetail.order_sn}}</p>
              <p class="label">下单时间：{{orderDetail.create_time}}</p>
            </div>
            <div class="fr right">
              <p class="item">
                <span class="label">商品合计:</span>
                <span>￥{{orderDetail.order_amount}}</span>
              </p>
              <p class="item">
                <span class="label">&emsp;&emsp;运费:</span>
                <span>￥{{orderDetail.shipping_price}}</span>
              </p>
            </div>
          </div>
          <div class="clear info">
            <div class="right fr">
              <p class="item">
                <span class="label">应付总额:</span>
                <span class="price">￥{{orderDetail.order_amount}}</span>
              </p>
              <p
                class="pay payactive"
                v-show="orderDetail.order_status ==1"
                @click="paying(orderDetail.order_sn)"
              >去付款</p>
              <p
                class="pay"
                v-for="(txt,n) in status_txt"
                :key="n"
                v-show="txt.id == orderDetail.order_status&&orderDetail.order_status !=1"
              >{{txt.status}}</p>
            </div>
          </div>
          <div class="clear info">
            <div class="fr right">
              <p class="rep">
                <span class="name">{{orderDetail.consignee}}</span>
                <span class="phone">{{orderDetail.mobile}}</span>
              </p>
              <p class="address">{{orderDetail.details}}-{{orderDetail.address}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单详情 -->
      <!-- 物流信息弹出层 -->
      <Modal v-model="modal2" :mask-closable="false">
        <p slot="header" style="border:none;font-size:16px;">
          <span>物流信息</span>
        </p>
        <div class="express">
          <p class="title">快递单号：{{express.LogisticCode}}</p>
          <p class="title">快递名称：{{express.name}}</p>
          <Timeline>
            <TimelineItem
              v-for="(item,index) in express.Traces"
              :key="index"
              class="items"
              color="green"
            >
              <p class="time">{{item.AcceptTime}}</p>
              <p class="content">{{item.AcceptStation}}</p>
            </TimelineItem>
          </Timeline>
        </div>
        <div slot="footer" style="border:none;padding:0"></div>
      </Modal>
      <!-- 物流信息弹出层 -->
    </div>
  </div>
</template>

<script>
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import flow from "@/filters/flow";
export default {
  data() {
    return {
      all: h => {
        return h("div", [
          h("span", "全部订单"),
          h("Badge", {
            props: {
              dot: false,
              offset: [-11, -4]
            }
          })
        ]);
      },
      pendPay: h => {
        return h("div", [
          h("span", {
            domProps: {
              innerHTML: this.tabArr[0]
            }
          })
        ]);
      },
      pendDelivery: h => {
        return h("div", [
          h("span", {
            domProps: {
              innerHTML: this.tabArr[1]
            }
          })
        ]);
      },
      shipped: h => {
        return h("div", [
          h("span", {
            domProps: {
              innerHTML: this.tabArr[2]
            }
          })
        ]);
      },
      completed: h => {
        return h("div", [
          h("span", {
            domProps: {
              innerHTML: this.tabArr[3]
            }
          })
        ]);
      },
      tabArr: [],
      statusArr: [
        {
          order_status: "1"
        },
        {
          order_status: "5"
        },
        {
          order_status: "10"
        },
        {
          order_status: "5"
        }
      ],
      total: 1,
      orderCurrent: 1,
      show: false,
      modal: false,
      modal1: false,
      modal2: false,
      modal3: false,
      loading: false,
      order: true,
      orderList: [],
      orderDetail: {},
      order_id: 0,
      index: 0,
      express: {},
      status_txt: [
        {
          status: "待支付",
          id: 1
        },
        {
          status: "待发货",
          id: 5
        },
        {
          status: "待收货",
          id: 10
        },
        {
          status: "已完成",
          id: 15
        },
        {
          status: "已取消",
          id: 20
        },
        {
          status: "已作废",
          id: 25
        },
        {
          status: "申请退货退款",
          id: 30
        },
        {
          status: "退款中",
          id: 35
        },
        {
          status: "拒绝退款",
          id: 40
        },
        {
          status: "已退款",
          id: 35
        }
      ]
    };
  },
  methods: {
    getOrderStatus() {
      getInfoApi
        .getOrderStatus()
        .then(res => {
          let arr = ["待付款 ", "待发货 ", "待收货 ", "已完成 "];
          this.tabArr = arr;
          for (let i = 0; i < res.data.length; i++) {
            this.statusArr[i].order_status = JSON.stringify(
              res.data[i].order_status
            );
            let obj = res.data[i];
            if (obj.num != 0) {
              let str = this.tabArr[i] + obj.num;
              this.$set(this.tabArr, i, str);
            }
          }
        })
        .catch(err => console.log(err));
    },
    tab(n) {
      let i = parseInt(n);
      this.orderCurrent = 1;
      this.getOrderList(i);
    },
    change(i) {
      //分页
      this.orderCurrent = i;
      this.getOrderList();
    },
    getOrderList(i) {
      let params = {
        order_status: i,
        page: this.orderCurrent
      };
      getInfoApi
        .getOrderList(params)
        .then(res => {
          this.orderList=[];
          if (res.data.code === 200) {
            this.total = res.data.count;
            if (res.data.data.length) {
              this.orderList = res.data.data;
              this.show = true;
            } else {
              this.show = false;
            }
          } else if (res.data.code === 10003) {
            
            this.defined.removeToken();
            this.$router.push("/log/0");
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    del(id, i) {
      this.order_id = id;
      this.index = i;
      this.modal = true;
    },
    cancel(id, i) {
      this.order_id = id;
      this.index = i;
      this.modal1 = true;
    },
    detail(order_sn) {
      let params = {
        order_sn: order_sn
      };
      getInfoApi
        .getOrderDetail(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.orderDetail = res.data.data;
            this.order = false;
            sessionStorage.removeItem("orderSn");
          } else if (res.data.code === 10003) {
            
            this.defined.removeToken();
            this.$router.push("/log/0");
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    calOrder() {
      this.loading = true;
      let data = {
        order_id: this.order_id
      };
      setInfoApi.cancelOrder(data).then(res => {
        this.loading = false;
        this.modal1 = false;
        if (res.data.code == 200) {
          this.$Message.success(res.data.msg);
          this.orderList.splice(this.index, 1);
          this.order_id = 0;
          if (this.orderList.length == 0) {
            this.show = false;
          }
          this.getOrderStatus();
        } else if (res.data.code === 10003) {
          
          this.defined.removeToken();
          this.$router.push("/log/0");
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    delOrder() {
      this.loading = true;
      let data = {
        order_id: this.order_id
      };
      setInfoApi.deleteOrder(data).then(res => {
        this.loading = false;
        this.modal = false;
        this.order_id = 0;
        if (res.data.code == 200) {
          this.$Message.success(res.data.msg);
          this.orderList.splice(this.index, 1);
          this.order_id = 0;
          if (this.orderList.length == 0) {
            this.show = false;
          }
          this.getOrderStatus();
        } else if (res.data.code === 10003) {
          
          this.defined.removeToken();
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    getExpress(id, index) {
      if (index == 1) {
        let params = {
          order_id: id
        };
        getInfoApi
          .getOrderExpress(params)
          .then(res => {
            ;
            this.express = res.data;
            this.modal2 = true;
          })
          .catch(err => console.log(err));
      } else {
        this.$Message.info(
          "同城配送订单由自营物流配送(无物流信息)，如需查看物流信息，请致电客服！"
        );
      }
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
            this.$router.push("/pay");
          } else if (res.data.code === 10003) {
            this.defined.removeToken();
            this.$Message.error("身份验证已过期，请重新登录");
            this.$router.push("/");
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    recive(id) {
      this.order_id = id;
      this.modal3 = true;
    },
    receipt() {
      let data = {
        order_id: this.order_id
      };
      this.loading = true;
      setInfoApi
        .receivingOrder(data)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.$Message.success(res.data.msg);
            this.loading = false;
            this.modal3 = false;
            this.tab(15);
            this.getOrderStatus();
          } else if (res.data.code === 10003) {
            
            this.defined.removeToken();
            this.$router.push("/log/0");
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    backList() {
      this.order = true;
    }
  },
  created() {
    this.getOrderStatus();
    this.getOrderList(0);
    let order_sn = sessionStorage.getItem("orderSn");
    if (order_sn) {
      this.detail(order_sn);
    };
  },
  watch: {
    $route: ["fresh"]
  }
};
</script>

<style scoped lang="less">
.wrapper {
  background: #fff;
  padding-bottom: 50px;
  min-height: 500px;
  .ivu-tabs {
    height: 100%;
    .ivu-tabs-content {
      .none {
        .none-icon {
          width: 368px;
          height: 368px;
          background: url("../../../static/img/material/sprite.png") no-repeat 0 -736px;
          margin: 0 auto;
          transform: scale(0.5);
          margin-top: -18px;
        }
        p {
          font-size: 16px;
          text-align: center;
          margin-top: -70px;
          color: #999;
        }
      }
      .order-wrap {
        background: #fff;
        .order-list {
          margin-bottom: 20px;
          border: 1px solid #ddd;
          position: relative;
        }
        .head {
          height: 60px;
          background: #f5f5f5;
          padding: 0 24px;
          font-size: 14px;
          border-bottom: 1px solid #ddd;
          p {
            float: left;
            line-height: 60px;
            color: #333;
          }
          .order-time {
            width: 265px;
          }
          .iconfont {
            line-height: 60px;
            float: right;
            cursor: pointer;
          }
        }
        .list {
          .item {
            padding: 24px;
            border-top: 1px solid #ddd;
            position: relative;
            div,
            p {
              display: inline-block;
              vertical-align: middle;
            }
            .img {
              width: 120px;
              height: 120px;
              background: #f4f4f4;
              margin-right: 145px;
              img {
                width: 100%;
              }
            }
            p {
              line-height: 120px;
              font-size: 16px;
              width: 200px;
              text-align: center;
            }
            .name {
              color: #999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .state {
              color: #f44;
            }
          }
          .item:first-child {
            border: none;
          }
        }
        .order_price {
          width: 200px;
          position: absolute;
          right: 114px;
          top: 60px;
          bottom: 0;
          background: #fff;
          border-left: 1px solid #ddd;
          p {
            font-size: 16px;
            font-weight: 600;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            text-align: center;
          }
        }
        .operation-wrap {
          width: 114px;
          text-align: center;
          position: absolute;
          right: 0;
          top: 60px;
          bottom: 0;
          background: #fff;
          border-left: 1px solid #ddd;
          .operation {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            text-align: center;
            p {
              color: #6699cc;
              font-size: 14px;
              text-align: center;
              width: 100%;
              line-height: 30px;
            }
            p:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  .ivu-page {
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
  }
  .order-detail {
    .order-wrap {
      padding: 50px 20px 0;
      background: #fff;
      border: 1px solid #ddd;
      position: relative;
      .back:hover {
        color: #b4a078;
        cursor: pointer;
      }
      .order-row {
        height: 140px;
        border-top: 1px dashed #ddd;
        .info-wrap {
          height: 140px;
          padding: 20px 0;
          padding-left: 20px;
          .img-wrap {
            display: inline-block;
            background: #f4f0ea;
            img {
              width: 100px;
            }
          }
          .info {
            display: inline-block;
            vertical-align: top;
            margin-left: 20px;
            margin-top: 10px;
            font-size: 14px;
            width: 335px;
            .title {
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .spec {
              color: #aaa;
            }
          }
        }
        .price {
          font-size: 16px;
          line-height: 140px;
          text-align: center;
        }
        .num {
          font-size: 0;
          position: relative;
          height: 140px;
          .input {
            font-size: 14px;
            line-height: 140px;
            text-align: center;
          }
        }
        .subtotal {
          line-height: 140px;
          font-size: 14px;
          color: #d4282d;
          text-align: center;
        }
        .operation {
          text-align: center;
          line-height: 140px;
          font-size: 14px;
        }
        .operation:hover {
          color: #b4a078;
          cursor: pointer;
        }
      }
      .order-row:nth-child(2) {
        border: none;
      }
      .head {
        position: absolute;
        top: 0;
        left: 0;
        height: 50px;
        background: #f4f4f4;
        width: 100%;
        padding: 0 20px;
        .head-row {
          p {
            text-align: center;
            font-size: 14px;
            line-height: 50px;
          }
        }
      }
    }
    .orderInfo {
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-top: none;
      padding: 0 40px;
      .info {
        height: 140px;
        .left {
          border-bottom: 1px dashed #ccc;
          width: 600px;
          padding-bottom: 20px;
          height: 100%;
          .label {
            font-size: 14px;
            color: #999;
            height: 45px;
            line-height: 45px;
          }
          .use-coupons {
            border: 1px solid #ccc;
            padding: 8px 20px;
            font-size: 14px;
            color: #333;
            display: inline-block;
          }
          .use-coupons:hover {
            border-color: #d4282d;
            color: #d4282d;
            cursor: pointer;
          }
        }
        .right {
          padding: 20px 0;
          .item {
            color: #333;
            font-size: 14px;
            span {
              text-align: right;
            }
            span.label {
              text-align: left;
              margin-right: 50px;
            }
          }
          .price {
            color: #d4282d;
            font-size: 20px;
            font-weight: 600;
          }
          .pay {
            width: 180px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            background: #ccc;
            color: #999;
            margin-top: 20px;
          }
          .payactive {
            color: #fff;
            background: #ac9a76;
          }
          .payactive:hover {
            cursor: pointer;
            background: #b4a078;
          }
          .rep {
            text-align: right;
            font-size: 14px;
            color: #333;
            span {
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}
.express {
  .title {
    height: 40px;
    line-height: 40px;
    border-left: 2px solid #b4a078;
    font-size: 16px;
    margin-bottom: 20px;
    padding-left: 10px;
  }
  .items:last-child {
    color: #b4a078;
  }
  .time {
    font-size: 16px;
    font-weight: 600;
  }
  .content {
    font-size: 14px;
  }
}
</style>