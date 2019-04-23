<template>
  <div>
    <Head :i="-1" ref="head"></Head>
    <div id="main">
      <div class="wrap">
        <div class="none" v-show="!showCart">
          <div class="none-icon"></div>
          <p>购物车还是空滴</p>
          <p class="btn" @click="shopping">继续逛</p>
        </div>
        <div class="cart" v-show="showCart">
          <div class="head">
            <Row>
              <i-col span="3">
                <div class="allChk" @click="checkAll">
                  <Checkbox v-model="all">全选</Checkbox>
                </div>
              </i-col>
              <i-col span="9">
                <div class="title-head">商品信息</div>
              </i-col>
              <i-col span="3">
                <p class="price-head">单价</p>
              </i-col>
              <i-col span="3">
                <p class="num-head">数量</p>
              </i-col>
              <i-col span="3">
                <p class="subtotal-head">小计</p>
              </i-col>
              <i-col span="3">
                <p class="operation">操作</p>
              </i-col>
            </Row>
          </div>
          <!-- 购物车头部 -->
          <!-- 购物车商品 -->
          <Row v-for="(item,index) in cartList" :key="index" class="cart-wrap">
            <i-col span="3">
              <div class="chk" @click="changeChk(index)">
                <Checkbox v-model="item.chk"></Checkbox>
              </div>
            </i-col>
            <i-col span="9">
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
            <i-col span="3">
              <div class="num">
                <span class="iconfont icon-jianqu" @click="reduce(index)"></span>
                <input type="text" class="input" v-model="item.goods_num" @blur="changeNum(index)">
                <span class="iconfont icon-jia" @click="add(index)"></span>
              </div>
            </i-col>
            <i-col span="3">
              <p class="subtotal">￥{{item.subtotal}}</p>
            </i-col>
            <i-col span="3">
              <p class="operation" @click="del(index)">删除</p>
            </i-col>
          </Row>
          <!-- 商品执行 -->
          <Row class="control">
            <i-col span="3">
              <div class="allChk" @click="checkAll">
                <Checkbox v-model="all">全选</Checkbox>
              </div>
            </i-col>
            <i-col span="3">
              <p class="operation" @click="delAllBtn">批量删除</p>
            </i-col>
            <i-col span="15">
              <div class="total-wrap">
                <span class="label">应付金额：</span>
                <span class="total">￥{{total}}</span>
              </div>
            </i-col>
            <i-col span="3">
              <div class="drop" @click="dropOrder">
                <span>下单</span>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
    </div>
    <Modal v-model="modal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除商品</span>
      </p>
      <div style="text-align:center">
        <p>确认删除选中商品?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="loading" @click="delAll">确认</Button>
      </div>
    </Modal>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import flow from "@/filters/flow";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      cart: 0,
      showCart: false,
      all: false,
      modal: false,
      loading: false,
      subtotal: 0,
      total: 0,
      selArr: [],
      delArr: [],
      cartList: [],
      len: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getInfoApi
        .getCartList()
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.cartList = res.data.data;
              this.cartList.forEach(el => {
                el.subtotal = el.goods_num * el.goods_price;
                if (el.selected == 1) {
                  el.chk = true;
                  this.delArr.push(el.id);
                } else {
                  el.chk = false;
                }
                this.len = this.delArr.length;
              });
              this.all = this.cartList.every(el => {
                return el.chk == true;
              });
              this.checkChkAll();
              this.calc();
              this.$refs.head.getCartNum();
              this.showCart = true;
            } else {
              this.showCart = false;
            }
          } else if (res.data.code === 10003) {
            
            this.defined.removeToken();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    shopping() {
      this.$router.push({
        path: "/mall"
      });
    },
    delAllBtn() {
      this.len = this.delArr.length;
      if (this.len) {
        this.modal = true;
      } else {
        this.$Message.info("请选择需要删除的商品");
      }
    },
    checkAll() {
      this.selArr = [];
      let i = 0;
      if (this.all) {
        this.all = false;
        i = 0;
        this.cartList.forEach(el => {
          this.selArr.push(el.id);
          this.delArr = [];
          el.selected = 0;
          el.chk = false;
        });
        this.updateSelAll(i);
        this.calc();
      } else {
        this.all = true;
        i = 1;
        this.cartList.forEach(el => {
          this.selArr.push(el.id);
          if (this.delArr.indexOf(el.id) == -1) {
            this.delArr.push(el.id);
          } else {
            return;
          }
          el.selected = 1;
          el.chk = true;
        });
        this.updateSelAll(i);
        this.calc();
      }
    },
    changeChk(index) {
      let chk = this.cartList[index].chk;
      if (chk) {
        this.cartList[index].chk = false;
        this.cartList[index].selected = 0;
        let i = this.delArr.indexOf(this.cartList[index].id);
        this.delArr.splice(i, 1);
        this.updateSel(index);
        this.checkChkAll();
        this.calc();
      } else {
        this.cartList[index].chk = true;
        this.cartList[index].selected = 1;
        this.delArr.push(this.cartList[index].id);
        this.updateSel(index);
        this.checkChkAll();
        this.calc();
      }
    },
    updateSel(index) {
      let data = {
        id: this.cartList[index].id,
        selected: this.cartList[index].selected
      };
      setInfoApi
        .updateSelectCart(data)
        .then(res => {
          if (res.data.code === 200) {
          } else if (res.data.code === 10003) {
            
            this.defined.removeToken();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    updateSelAll(i) {
      let data = {
        ids: this.selArr,
        selected: i
      };
      setInfoApi
        .updateSelectCart(data)
        .then(res => {
          if (res.data.code === 200) {
          } else if (res.data.code === 10003) {
            
            this.defined.removeToken();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    updateCartNum(i) {
      let data = {
        id: this.cartList[i].id,
        number: this.cartList[i].goods_num
      };
      setInfoApi
        .updateCartNum(data)
        .then(res => {
          if (res.data.code === 200) {
            this.subTotal(i);
          } else if (res.data.code === 10007) {
            this.$Message.info(res.data.msg);
            this.cartList[i].goods_num = res.data.store_count;
            this.subTotal(i);
          } else if (res.data.code === 10003) {
            
            this.defined.removeToken();
            this.$router.push("/log/0");
          } else {
            this.$Message.info(res.data.msg);
            this.cartList[i].goods_num = 1;
            this.subTotal(1);
          }
        })
        .catch(err => console.log(err));
    },
    reduce(i) {
      if (this.cartList[i].goods_num <= 1) {
        this.$Message.warning("该商品1件起售");
        return;
      } else {
        this.cartList[i].goods_num--;
        this.updateCartNum(i);
      }
    },
    subTotal(i) {
      let num = this.cartList[i].goods_num;
      this.cartList[i].subtotal = num * this.cartList[i].goods_price;
      this.calc();
    },
    add(i) {
      this.cartList[i].goods_num++;
      this.updateCartNum(i);
      //不大于库存数
    },
    changeNum(i) {
      if (this.cartList[i].goods_num < 1) {
        this.$Message.warning("该商品1件起售");
        this.cartList[i].goods_num = 1;
      }
      this.updateCartNum(i);
    },
    delAll() {
      let data = {
        ids: this.delArr
      };
      this.loading = true;
      setInfoApi.deleteCart(data).then(res => {
        ;
        this.loading = false;
        if (res.data.code === 200) {
          for (let i = 0; i < this.cartList.length; i++) {
            for (let j = 0; j < this.delArr.length; j++) {
              if (this.cartList[i].id == this.delArr[j]) {
                this.cartList.splice(i, 1);
              }
            }
          }
          this.calc();
          this.showcart();
          this.$Message.info(res.data.msg);
          this.$refs.head.getCartNum();
          this.modal = false;
        } else if (res.data.code === 10003) {
          
          this.defined.removeToken();
          this.modal = false;
          this.$router.push("/log/0");
        } else {
          this.modal = false;
          this.$Message.info(res.data.msg);
        }
      });
    },
    del(i) {
      let data = {
        id: this.cartList[i].id
      };
      setInfoApi.deleteCart(data).then(res => {
        ;
        if (res.data.code === 200) {
          this.cartList.splice(i, 1);
          this.$refs.head.getCartNum();
          this.calc();
          this.showcart();
          this.$Message.info(res.data.msg);
        } else if (res.data.code === 10003) {
          
          this.defined.removeToken();
          this.$router.push("/log/0");
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    checkChkAll() {
      let allChki = this.cartList.every(el => {
        return el.chk == true;
      });
      if (allChki) {
        this.all = true;
      } else {
        this.all = false;
      }
    },
    calc() {
      let totalArr = this.cartList.filter(el => {
        return el.chk == true;
      });
      let total = 0;
      for (let i = 0; i < totalArr.length; i++) {
        total += totalArr[i].subtotal;
      }
      this.total = total;
      return this.total;
    },
    showcart() {
      if (this.cartList.length) {
        this.showCart = true;
      } else {
        this.showCart = false;
      }
    },
    dropOrder() {
      this.$router.push('/mall/mallOrder/0');
    },
  },
  components: {
    Head,
    Foot
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f4f0ea;
  padding: 40px 0 50px;
  .wrap {
    .none {
      height: 600px;
      border: 1px solid #999;
      background: #fff;
      .none-icon {
        width: 368px;
        height: 368px;
        background: url("../../../static/img/material/sprite.png") no-repeat 0 -1152px;
        margin: 0 auto;
        transform: scale(0.5);
        margin-top: -18px;
      }
      p {
        font-size: 16px;
        text-align: center;
        margin-top: -90px;
        color: #999;
      }
      .btn {
        border: 1px solid #b4a078;
        color: #b4a078;
        padding: 5px 10px;
        display: inline-block;
        margin: 0 560px;
        margin-top: 20px;
        background: rgba(238, 238, 238, 0.733);
      }
      .btn:hover {
        cursor: pointer;
        background: #fff;
      }
    }
    .cart {
      .head {
        height: 50px;
        line-height: 50px;
        border: 1px solid #ddd;
        background: #f5f5f5;
        color: #333;
        font-size: 15px;
        p {
          text-align: center;
        }
        .allChk {
          padding-left: 20px;
          .ivu-checkbox {
            margin-right: 10px;
          }
        }
      }
      .cart-wrap {
        background: #fff;
        margin-top: 30px;
        height: 180px;
        padding: 20px 0;
        border: 1px solid #ddd;
        .chk {
          padding-left: 20px;
          line-height: 140px;
        }
        .info-wrap {
          height: 140px;
          padding: 20px 0;
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
            width: 305px;
            .title {
              color: #333;
              overflow: hidden;
              text-overflow:ellipsis;
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
            width: 40px;
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            border: none;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            position: absolute;
            top: 55px;
            left: 55px;
          }
          .iconfont {
            position: absolute;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            width: 30px;
            height: 30px;
            border: 1px solid #ccc;
            top: 55px;
            left: 25px;
            cursor: pointer;
          }
          .icon-jia {
            left: 95px;
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
      .control {
        margin-top: 40px;
        height: 50px;
        line-height: 50px;
        border: 1px solid #ddd;
        background: #f5f5f5;
        color: #333;
        font-size: 15px;
        .allChk {
          padding-left: 20px;
          .ivu-checkbox {
            margin-right: 10px;
          }
        }
        .total-wrap {
          text-align: right;
          padding-right: 20px;
          .total {
            color: #d4282d;
            font-size: 24px;
            font-weight: 600;
          }
        }
        .drop {
          height: 100%;
          text-align: center;
          font-size: 16px;
          background: #b4a078;
          color: #fff;
          cursor: pointer;
        }
        .operation {
          font-size: 14px;
        }
        .operation:hover {
          color: #b4a078;
          cursor: pointer;
        }
      }
    }
  }
}
</style>