<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <div class="receipt">
          <p class="title">收货信息</p>
          <div class="address-wrap">
            <Row v-show="showInfo">
              <i-col span="18">
                <div class="show">
                  <p class="top">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-dizhi"></use>
                    </svg>
                    <span class="default" v-show="address.is_default == 1">默认地址</span>
                    <span class="edit" @click="modify">修改</span>
                  </p>
                  <p class="content">
                    <span class="label">收&nbsp;货&nbsp;人:</span>
                    <span>{{address.consignee}}</span>
                  </p>
                  <p class="content">
                    <span class="label">联系方式:</span>
                    <span>{{address.mobile}}</span>
                  </p>
                  <p class="content">
                    <span class="label">收货地址:</span>
                    <span>{{address.details}}-{{address.address}}</span>
                  </p>
                </div>
              </i-col>
              <i-col span="6">
                <div class="operation">
                  <div class="oper">
                    <span class="tab" @click="tabAddressList">地址切换</span>
                    <p class="add" @click="getArea">新建地址</p>
                  </div>
                </div>
              </i-col>
            </Row>
            <Row v-show="!showInfo">
              <i-col span="18">
                <div class="edit" @click.stop>
                  <div class="forms">
                    <div class="item">
                      <span class="label">所在地区</span>
                      <div class="sel-box">
                        <Select
                          v-model="province"
                          style="width:150px"
                          label-in-value
                          :placeholder="province"
                          @on-change="changeProvince"
                        >
                          <Option
                            v-for="(item,index) in provinceList"
                            :value="item.id"
                            :key="index"
                          >{{ item.areaName }}</Option>
                        </Select>
                        <Select
                          v-model="city"
                          style="width:150px"
                          not-found-text="请先选择省份"
                          label-in-value
                          :placeholder="city"
                          @on-change="changeCity"
                        >
                          <Option
                            v-for="(item,index) in cityList"
                            :value="item.id"
                            :key="index"
                          >{{ item.areaName }}</Option>
                        </Select>
                        <Select
                          v-model="district"
                          style="width:150px"
                          not-found-text="请先选择城市"
                          label-in-value
                          :placeholder="district"
                          @on-change="changeDistrict"
                        >
                          <Option
                            v-for="(item,index) in districtList"
                            :value="item.id"
                            :key="index"
                          >{{ item.areaName }}</Option>
                        </Select>
                      </div>
                    </div>
                    <div class="item">
                      <span class="label">详细地址</span>
                      <i-input
                        v-model="addressData.address"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请输入您的详细地址"
                        style="width:456px"
                      ></i-input>
                    </div>
                    <div class="item clear">
                      <i-input
                        v-model="addressData.consignee"
                        style="width:200px;float:left;height:32px;"
                      >
                        <span slot="prepend">收货人&emsp;</span>
                      </i-input>
                      <i-input
                        v-model="addressData.mobile"
                        style="width:200px;float:left;margin-left:125px;height:32px;"
                      >
                        <span slot="prepend">手机号码</span>
                      </i-input>
                    </div>
                  </div>
                </div>
              </i-col>
              <i-col span="6">
                <div class="operation-edit">
                  <Checkbox v-model="defaultBool" style="font-size:16px;display;inline-block">设为默认</Checkbox>
                  <div class="btn">
                    <p class="submit" @click="comfirm">保存地址</p>
                    <p class="reset" @click="reset">取消</p>
                  </div>
                </div>
              </i-col>
            </Row>
          </div>
        </div>
        <div class="order-wrap">
          <div class="head">
            <Row class="head-row">
              <i-col span="12">
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
          <Row v-for="(item,index) in orderList.goods" :key="index" class="order-row">
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
              <p class="price">￥{{item.goods_price}}</p>
            </i-col>
            <i-col span="5">
              <div class="num">
                <p class="input">{{item.goods_num}}</p>
              </div>
            </i-col>
            <i-col span="4">
              <p class="subtotal">￥{{item.subtotal}}</p>
            </i-col>
          </Row>
        </div>
        <div class="orderInfo">
          <div class="clearfix info">
            <div class="fl left">
              <p class="label">使用优惠券</p>
              <p class="use-coupons">暂无可用</p>
            </div>
            <div class="fr right">
              <p class="item">
                <span class="label">商品合计:</span>
                <span>￥{{orderList.global_value}}</span>
              </p>
              <p class="item">
                <span class="label">&emsp;&emsp;运费:</span>
                <span>￥{{orderList.postage}}</span>
              </p>
            </div>
          </div>
          <div class="clear info">
            <div class="left fl"></div>
            <div class="right fr">
              <p class="item">
                <span class="label">应付总额:</span>
                <span class="price">￥{{total}}</span>
              </p>
              <p class="pay" :class="{payactive:agree}" @click="pay">去付款</p>
            </div>
          </div>
          <div class="clear info">
            <div class="fr right">
              <p class="rep">
                <span class="name">{{address.consignee}}</span>
                <span class="phone">{{address.mobile}}</span>
              </p>
              <p class="address">{{address.details}}-{{address.address}}</p>
            </div>
          </div>
        </div>
        <div class="agree">
          <Checkbox v-model="agree">
            同意
            <span class="toList" @click.stop="$router.push('/help')">《沂源生活服务协议》</span>
          </Checkbox>
        </div>
      </div>
      <div class="modal" v-show="modal">
        <div class="addressList">
          <div class="head clear">
            <p class="fl title">选择地址</p>
            <i class="iconfont icon-guanbi1 fr" @click="modal=false"></i>
          </div>
          <ul class="list">
            <li
              class="address"
              v-for="(item,index) in addressList"
              :key="index"
              :class="{active:activei==index}"
              @click="check(index)"
            >
              <p class="item">
                <span class="label">收 货 人:&nbsp;</span>
                <span>{{item.consignee}}</span>
              </p>
              <p class="item">
                <span class="label">联系方式:</span>
                <span>{{item.mobile}}</span>
              </p>
              <p class="item">
                <span class="label">收货地址:</span>
                <span>{{item.details}}-{{item.address}}</span>
              </p>
              <p class="default">{{item.default}}</p>
              <svg class="icon badgei" aria-hidden="true">
                <use xlink:href="#icon-jiaobiao"></use>
              </svg>
            </li>
          </ul>
          <div class="btns">
            <p class="comfirm" @click="tabAddress">确认</p>
            <p class="cancel" @click="modal=false">取消</p>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { mapMutations } from "vuex";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      orderList: {},
      showInfo: true,
      defaultBool: false,
      modal: false,
      agree: true,
      activei: 0,
      total: 0,
      editi: -1,
      pi: 0,
      ci: 0,
      di: 0,
      addressList: [],
      addressData: {
        details: "",
        consignee: "",
        mobile: "",
        province: "",
        city: "",
        district: "",
        address: "",
        is_default: 1
      },
      address: {},
      province: "",
      provinceList: [],
      city: "",
      cityList: [],
      district: "",
      districtList: []
    };
  },
  methods: {
    comfirm() {
      if (this.province == "" || this.city == "" || this.district == "") {
        this.$Message.error("请选择收货地址");
      } else if (this.addressData.address == "") {
        this.$Message.error("请输入详细的收货地址");
      } else if (
        this.addressData.consignee == "" ||
        this.addressData.mobile == ""
      ) {
        this.$Message.error("请填写收货人信息");
      } else if (this.addressData.address_id) {
        if (this.defaultBool) {
          this.addressData.is_default = 1;
        } else {
          this.addressData.is_default = 0;
        }
        setInfoApi
          .editAddress(this.addressData)
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.data);
              this.reset();
              this.getAddressList();
            } else if (res.data.code === 10003) {
              this.defined.removeToken();
              this.$Message.error("身份验证已过期，请重新登录");
              this.$router.push("/");
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        if (this.defaultBool) {
          this.addressData.is_default = 1;
        } else {
          this.addressData.is_default = 0;
        }
        setInfoApi
          .addAddress(this.addressData)
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.data);
              this.reset();
              this.getAddressList();
            } else if (res.data.code === 10003) {
              this.defined.removeToken();
              this.$Message.error("身份验证已过期，请重新登录");
              this.$router.push("/");
            } else {
              this.$Message.info(res.data.msg);
            }
            this.reset();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    reset() {
      this.addressData = {
        details: "",
        consignee: "",
        mobile: "",
        province: "",
        city: "",
        district: "",
        address: "",
        is_default: 1
      };
      this.province = "";
      this.city = "";
      this.district = "";
      this.showInfo = true;
    },
    check(i) {
      this.activei = i;
    },
    pay() {
      if (this.agree) {
        if (parseInt(this.$route.params.id) == 0) {
          let idArr = [];
          this.orderList.goods.forEach(el => {
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
                sessionStorage.removeItem("orderData");
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
        } else {
          let data = {
            goods_id: this.orderList.goods[0].goods_id,
            item_id: this.orderList.item_id,
            number: this.orderList.goods[0].goods_num,
            address_id: this.address.address_id
          };
          setInfoApi
            .toGoodsOrderPay(data)
            .then(res => {
              if (res.data.code === 200) {
                let data = JSON.stringify(res.data.data);
                sessionStorage.setItem("payData", data);
                sessionStorage.removeItem("orderData");
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
        }
      } else {
        this.$Message.warning("请先同意沂源协议");
      }
    },
    getAddressList() {
      getInfoApi
        .getAddress()
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.length) {
              this.addressList = res.data.data;
              this.addressList.forEach(el => {
                if (el.is_default == 1) {
                  this.address = el;
                }
              });
            } else {
              this.getArea();
            }
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
    getArea() {
      let params = {
        parentId: 0
      };
      getInfoApi
        .getArea(params)
        .then(res => {
          if (res.data.code === 200) {
            this.provinceList = res.data.data;
            this.showInfo = false;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    changeProvince(v) {
      if (!v) {
        return;
      } else {
        this.addressData.details = v.label;
        this.addressData.province = v.value;
        let params = {
          parentId: v.value
        };
        getInfoApi
          .getArea(params)
          .then(res => {
            if (res.data.code === 200) {
              this.cityList = res.data.data;
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push("/notFound");
          });
      }
    },
    changeCity(v) {
      if (!v) {
        return;
      } else {
        this.addressData.details = this.addressData.details + "-" + v.label;
        this.addressData.city = v.value;
        let params = {
          parentId: v.value
        };
        getInfoApi
          .getArea(params)
          .then(res => {
            if (res.data.code === 200) {
              this.districtList = res.data.data;
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push("/notFound");
          });
      }
    },
    changeDistrict(v) {
      if (!v) {
        return;
      } else {
        this.addressData.details = this.addressData.details + "-" + v.label;
        this.addressData.district = v.value;
      }
    },
    modify() {
      this.showInfo = false;
      let params = {
        address_id: this.address.address_id
      };
      getInfoApi
        .getAddressDetail(params)
        .then(res => {
          if (res.data.code === 200) {
            let list = res.data.data.details.split("-");
            this.province = list[0];
            this.city = list[1];
            this.district = list[2];
            this.addressData = res.data.data;
            if (this.addressData.is_default === 1) {
              this.defaultBool = true;
            } else {
              this.defaultBool = false;
            }
            this.getArea();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    tabAddress() {
      this.address = this.addressList[this.activei];
      this.modal = false;
    },
    tabAddressList() {
      this.getAddressList();
      this.modal = true;
    },
    getOrderList() {
      getInfoApi
        .getOrderCart()
        .then(res => {
          if (res.data.code === 200) {
            this.orderList = res.data.data;
            this.total =
              parseInt(this.orderList.global_value) +
              parseInt(this.orderList.postage);
            this.orderList.goods.forEach(el => {
              el.subtotal = el.goods_num * el.goods_price;
            });
          } else if (res.data.code === 10003) {
            
            this.defined.removeToken();
            this.$router.push("/log/0");
          } else {
            this.$Message.info(res.data.msg);
            this.$router.push("/mall");
          }
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    let i = parseInt(this.$route.params.id);
    this.getAddressList();
    if (i == 0) {
      this.getOrderList();
    } else {
      let data = sessionStorage.getItem("orderData");
      data = JSON.parse(data);
      if (data) {
        this.orderList = data;
        this.total =
          parseInt(this.orderList.global_value) +
          parseInt(this.orderList.postage);
        this.orderList.goods.forEach(el => {
          el.subtotal = el.goods_num * el.goods_price;
        });
      } else {
        this.$router.push("/mall");
      }
    }
  },
  components: {
    Head,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  padding: 50px 0;
  background: #f4f0ea;
  .wrap {
    .receipt {
      border: 1px solid #ddd;
      margin-bottom: 40px;
      background: #fff;
      .title {
        height: 40px;
        padding: 0 30px;
        line-height: 40px;
        font-size: 14px;
        color: #999;
        background: #f4f4f4;
      }
      .address-wrap {
        padding: 20px 30px;
        .show {
          font-size: 15px;
          .top {
            line-height: 40px;
            .icon {
              width: 20px;
              height: 20px;
            }
            span.edit {
              display: inline-block;
              color: #b4a078;
              border: 1px solid #b4a078;
              background: #f5f3ef;
              padding: 4px 10px;
              height: 20px;
              line-height: 12px;
              margin-left: 20px;
              border-radius: 2px;
              font-size: 14px;
            }
            .edit:hover {
              background: #fff;
              cursor: pointer;
            }
          }
          .content {
            line-height: 30px;
            .label {
              color: #999;
              margin-right: 5px;
            }
          }
        }
        .edit {
          padding: 30px 20px;
          .head {
            .title {
              font-size: 16px;
              line-height: 30px;
            }
            .iconfont {
              position: absolute;
              font-size: 30px;
              top: 0;
              right: 10px;
              cursor: pointer;
            }
          }
          .item {
            margin-top: 20px;
            min-height: 34px;
            .label {
              font-size: 14px;
              margin-right: 10px;
            }
            .sel-box {
              display: inline-block;
            }
          }
        }
        .operation-edit {
          padding: 65px 0px;
          .btn {
            display: inline-block;
            margin-top: 20px;
            p {
              display: inline-block;
              width: 120px;
              height: 40px;
              background: #b4a078;
              font-size: 16px;
              color: #fff;
              text-align: center;
              line-height: 40px;
              border-radius: 4px;
            }
            p:hover {
              cursor: pointer;
            }
            p:last-child {
              background: rgba(255, 255, 255, 0.6);
              color: #b4a078;
              border: 1px solid #b4a078;
              margin-left: 25px;
            }
          }
        }
        .operation {
          padding: 30px 0;
          .oper {
            border-left: 1px dashed #ddd;
            padding: 0 20px;
            text-align: center;
            .tab {
              color: #6699cc;
            }
            .tab:hover {
              cursor: pointer;
              color: #b4a078;
            }
            .add {
              border: 1px solid #999;
              width: 80px;
              height: 30px;
              line-height: 30px;
              margin: 0 auto;
              margin-top: 10px;
              background: #f8f8f8;
            }
            .add:hover {
              cursor: pointer;
              background: #fff;
            }
          }
        }
      }
    }
    .order-wrap {
      padding: 50px 20px 0;
      background: #fff;
      border: 1px solid #ddd;
      position: relative;
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
            width: 435px;
            .title {
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .spec {
              color: #aaa;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
    .agree {
      text-align: right;
      height: 40px;
      line-height: 40px;
      .ivu-checkbox-wrapper {
        color: #6699cc;
      }
      .toList:hover {
        color: #b4a078;
      }
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
    .addressList {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      background: #fff;
      padding-bottom: 40px;
      .head {
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        .iconfont {
          color: #999;
          font-size: 20px;
        }
        .iconfont:hover {
          color: #333;
          cursor: pointer;
        }
      }
      .list {
        padding: 0 20px;
        .address {
          cursor: pointer;
          border: 1px solid #e8e8e8;
          position: relative;
          padding: 20px 20px;
          margin-bottom: 20px;
          p.item {
            font-size: 14px;
            color: #333;
            .label {
              margin-right: 10px;
              color: #999;
            }
          }
          .default {
            position: absolute;
            right: 20px;
            bottom: 20px;
            color: #b4a078;
          }
          .badgei {
            display: none;
            width: 20px;
            height: 20px;
          }
        }
        .active {
          border: 2px solid #b4a078;
          padding: 19px 19px;
          .default {
            right: 19px;
            bottom: 19px;
          }
          .badgei {
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }
      .btns {
        text-align: center;
        p {
          display: inline-block;
          font-size: 16px;
          width: 120px;
          height: 40px;
          line-height: 40px;
          color: #333;
          border: 1px solid #ddd;
          background: #f8f8f8;
          margin-left: 10px;
        }
        p:hover {
          background: #fff;
          cursor: pointer;
        }
        .comfirm {
          border-color: #b4a078;
          color: #fff;
          background: #ac9a76;
        }
        .comfirm:hover {
          background: #b4a078;
        }
      }
    }
  }
}
</style>