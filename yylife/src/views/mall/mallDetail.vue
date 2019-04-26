<template>
  <div>
    <Head :title="title">
      <div class="icon">
        <i
          class="iconfont icon-fenxiang"
          v-clipboard:copy="copyUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        ></i>
      </div>
    </Head>
    <transition name="fade">
      <div id="main" v-show="show">
        <!-- 轮播 -->
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item,index) in goods_data.goods_img" :key="index">
            <img v-lazy="item.img" :key="item.img" alt>
          </van-swipe-item>
        </van-swipe>
        <!-- 轮播 -->
        <!-- 商品信息 -->
        <div class="item">
          <p class="title">{{goods_data.goods_name}}</p>
          <p class="desc">{{goods_data.goods_remark}}</p>
          <p class="current">
            ￥{{shop_price}}
            <span class="price">￥{{market_price}}</span>
          </p>
          <div class="sales">
            <span class="mail">满价包邮</span>
            <!-- <span>销量：568件</span> -->
          </div>
        </div>
        <!-- 商品信息 -->
        <!-- 基本优惠 -->
        <div class="wrap">
          <!-- <div class="card">
            <p class="title">限制</p>
            <p class="content"></p>
          </div>-->
          <div class="card">
            <p class="title">配送</p>
            <p class="content">商品满{{shop.exemption}}元包邮</p>
          </div>
          <div class="card">
            <p class="tag">
              <span class="title">服务</span>
              {{shop.serve}}
            </p>
          </div>
        </div>
        <!-- 基本优惠 -->
        <!-- 物品详情 -->
        <div class="detail">
          <p class="title">物品详情</p>
          <div class="wrapper" v-html="goods_data.goods_content"></div>
        </div>
        <!-- 物品详情 -->
        <!-- 购物车 -->
        <div class="cart">
          <van-goods-action>
            <van-goods-action-mini-btn icon="like-o" text="收藏" @click="collect" v-if="col"/>
            <van-goods-action-mini-btn icon="like-o" text="已收藏" v-else @click="cancelCollect"/>
            <van-goods-action-mini-btn icon="cart" text="购物车" @click="toCart"/>
            <van-goods-action-big-btn text="加入购物车" @click="addCart"/>
            <van-goods-action-big-btn text="立即购买" @click="buyNow" primary/>
          </van-goods-action>
          <van-sku
            v-model="showBase"
            :sku="sku"
            :goods="goods"
            :goods-id="goods_data.goods_id"
            :hide-stock="sku.hide_stock"
            :close-on-click-overlay="true"
            :show-add-cart-btn="cartShow"
            @buy-clicked="onBuy"
            @add-cart="onAddCart"
          >
            <div slot="sku-body-top">
              <div class="slot">
                <div class="color wrapper" v-for="(item,key,index) in spec_attr" :key="index">
                  <span class="title">{{key}}：</span>
                  <div class="choose">
                    <span
                      v-for="(v,i) in item"
                      :key="i"
                      @click="selSpec(v,key,index,$event,i)"
                      :class="[activeArr[index] == i?'active':'']"
                    >{{v}}</span>
                  </div>
                </div>
              </div>
            </div>
          </van-sku>
        </div>
        <!-- 购物车 -->
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import { Toast } from "vant";
import { mapMutations, mapState, mapActions } from "vuex";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
export default {
  data() {
    return {
      copyUrl: "低价好物都在沂源生活"+window.location.href,
      goods_data: {},
      shop: {},
      title: "商品详情",
      show: false,
      showBase: false,
      cartShow: true,
      quota: 0,
      id: 1,
      spec_attr: [],
      spec_arr: [],
      activeArr: [],
      shop_price: 0,
      market_price: 0,
      stock: 0,
      item_id: -1,
      sku: {
        tree: [],
        //
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 10000, // 价格（单位分）
            stock_num: 1, // 当前 sku 组合对应的库存
            color: "",
            size: "",
            property: "12"
          }
        ],
        none_sku: false, // 是否无规格商品
        hide_stock: true // 是否隐藏剩余库存
      },
      goods: {
        // 商品标题
        title: "",
        // 默认商品 sku 缩略图
        picture: ""
      }
    };
  },
  methods: {
    getData() {
      let params = {
        goods_id: this.id
      };
      getInfoApi
        .getMallGoods(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.goods_data = res.data.data;
            this.shop = this.goods_data.shop;
            this.setData();
          }else if(res.data.code === 10005){
            Toast(res.data.msg);
            this.$router.push('/');
          }else{
            Toast(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    setData() {
      this.goods.title = this.goods_data.goods_name;
      this.goods.picture = this.goods_data.original_img;
      this.shop_price = this.goods_data.shop_price;
      this.market_price = this.goods_data.market_price;
      this.sku.list[0].price = parseInt(this.shop_price) * 100;
      this.getSpec(this.goods_data);
      if(this.goods_data.spec_goods_price.length){
        this.item_id=-1;
      }else{
        this.item_id="";
      }
      this.show = true;
    },
    // 商品数据
    getSpec(data) {
      let specData = data.spec_goods_price;
      let obj = {};
      for (let i = 0; i < specData.length; i++) {
        let arrData = specData[i].key_name;
        for (let i = 0; i < arrData.length; i++) {
          for (var key in arrData[i]) {
            if (obj[key]) {
              obj[key].push(arrData[i][key]);
              let set = new Set(obj[key]);
              obj[key] = [...set];
            } else {
              obj[key] = [arrData[i][key]];
            }
          }
        }
      }
      this.spec_attr = obj;
    },
    // 获取规格
    selSpec(v, key, index, event, i) {
      let obj = {};
      obj[key] = v;
      let obj1 = JSON.stringify(obj);
      let specData = JSON.stringify(this.spec_arr[index]);
      if (specData != obj1) {
        this.spec_arr[index] = obj;
        //数组直接赋值无法渲染页面,改用Vue.$set渲染
        this.$set(this.activeArr, index, i);
      } else {
        this.spec_arr[index] = null;
        this.$set(this.activeArr, index, -1);
      }
      this.calcSpec();
    },
    calcSpec() {
      let specData = this.goods_data.spec_goods_price;
      let result = []; //定义数组存储被选中的值
      let arrData = this.spec_arr.map(el => {
        return (el = JSON.stringify(el));
      });
      specData.forEach(el => {
        let arr = el.key_name;
        arr = arr.map(e => {
          return (e = JSON.stringify(e));
        });
        if (arrData.length == arr.length && arrData.indexOf("null") == -1) {
          if (arr.toString() == arrData.toString()) {
            if (el.stock != 0) {
              this.shop_price = el.shop_price;
              this.market_price = el.market_price;
              this.sku.list[0].stock_num = el.stock;
              this.item_id = el.item_id;
              this.sku.hide_stock = false;
              return;
            } else {
              this.sku.hide_stock = true;
              Toast("当前商品库存不足");
              this.sku.list[0].stock_num = el.stock;
            }
          }
        } else {
          this.shop_price = this.goods_data.shop_price;
          this.market_price = this.goods_data.market_price;
          this.sku.list[0].stock_num = this.goods_data.store_count;
          this.sku.hide_stock = true;
          this.item_id = -1;
        }
      });
      this.$forceUpdate(); //重绘
    },
    // 规格算法
    toCart() {
      this.$router.push("/cart");
    },
    // 跳转到购物车
    addCart() {
      this.showBase = true;
      this.cartShow = true;
    },
    // 打开购物车弹层
    buyNow() {
      this.showBase = true;
      this.cartShow = false;
    },
    // 打开立即购买弹层
    onBuy(skuData) {
      if (this.defined.access_token == "") {
        Toast("请先去登录");
      } else {
        console.log(skuData);
        let number=skuData.selectedNum;
        if (number == 0 || this.item_id == -1) {
          Toast("请填写正确的商品数量，选择正确的规格");
        } else {
          let data = {
            goods_id: this.goods_data.goods_id,
            number: number,
            item_id: this.item_id
          };
          setInfoApi
            .toGoodsPay(data)
            .then(res => {
              if (res.data.code === 200) {
                let data=JSON.stringify(res.data.data);
                sessionStorage.setItem("orderData",data);
                this.$router.push('/mallPayOrder');
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                Toast(res.data.msg);
              }
            })
            .catch(err => {});
        }
      }
    },
    // 立即购买
    onAddCart(skuData) {
      if (this.defined.access_token == "") {
        Toast("请先去登录");
      } else {
        console.log(skuData);
        let number=skuData.selectedNum;
        if (number == 0 || this.item_id == -1) {
          Toast("请填写正确的商品数量，选择正确的规格");
        } else {
          let data = {
            goods_id: this.goods_data.goods_id,
            number: number,
            item_id: this.item_id
          };
          setInfoApi
            .addCart(data)
            .then(res => {
              Toast(res.data.msg);
              if (res.data.code === 200) {
                Toast(res.data.msg);
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                Toast(res.data.msg);
              }
            })
            .catch(err => {});
        }
      }
    },
    // 加入购物车
    // 收藏
    collect() {
      if (this.defined.access_token == "") {
        Toast("请先去登录");
        this.$router.push("/login");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "goods",
          title:this.goods_data.goods_name
        };
        setInfoApi
          .collect(data)
          .then(res => {
            if (res.data.code === 200) {
              Toast(res.data.msg);
              this.hasCollect();
            } else if (res.data.code === 10003) {
              Toast("身份已过期，请重新登录");
              this.defined.removeToken();
            } else {
              Toast(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push("/notFound");
          });
      }
    },
    hasCollect() {
      if (this.defined.access_token == "") {
        return;
      } else {
        let params = {
          commentable_id: this.id,
          commentable_type: "goods"
        };
        this.getCollect(params);
      }
    },
    cancelCollect() {
      let data = {
        type: "cancel",
        commentable_id: this.id,
        commentable_type: "goods"
      };
      setInfoApi.cancelCollect(data).then(res => {
        if (res.data.code === 200) {
          Toast(res.data.msg);
          this.hasCollect();
        } else if (res.data.code === 10003) {
          Toast("身份已过期，请重新登录");
          this.defined.removeToken();
        } else {
          Toast(res.data.msg);
        }
      });
    },
    // 收藏
    onCopy(e) {
      Toast("复制成功");
    },
    onError() {
      Toast("复制失败");
    },
    ...mapActions(["getCollect"]),
    ...mapMutations(["setCartData"])
  },
  mounted() {
    this.id = parseInt(this.$route.params.id);
    this.getData();
  },
  computed: {
    ...mapState(["cartData"]),
    col() {
      return this.$store.state.collect;
    }
  },
  components: {
    Head,
    Swiper
  }
};
</script>

<style scoped lang="less">
#head {
  .icon {
    .iconfont {
      font-size: 28px;
    }
  }
}
#main {
  padding-top: 90px;
  padding-bottom: 100px;
  .item {
    padding: 0 24px;
    .title {
      font-size: 32px;
      color: #333;
    }
    .desc {
      margin: 36px 0;
      font-size: 26px;
      color: #ff703a;
    }
    p.current {
      color: #ff8d1b;
      font-size: 30px;
      font-weight: 700;
      .price {
        font-weight: 100;
        color: #a6a6a6;
        font-size: 24px;
        text-decoration: line-through;
        margin-left: 20px;
      }
    }
    .sales {
      height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #505050;
      font-size: 24px;
    }
  }
  .wrap {
    border-top: 12px solid #e5e5e5;
    border-bottom: 12px solid #e5e5e5;
    padding: 0 24px;
    .card {
      border-bottom: 2px solid #bfbfbf;
      padding: 36px 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .title {
        font-size: 28px;
        margin-right: 22px;
        color: #b0b0b0;
      }
      .content {
        font-size: 28px;
      }
      .tag {
        font-size: 28px;
        margin-right: 50px;
        color: #b0b0b0;
      }
    }
    .card:last-child {
      border: 0;
    }
  }
  .detail {
    padding: 26px 30px 0;

    .title {
      font-size: 32px;
      height: 80px;
      line-height: 80px;
    }
    .wrapper {
      width: 100%;
      overflow: hidden;
      padding:0 20px;
    }
    .wrapper /deep/ p img {
      max-width: 100%;
    }
  }
  .cart {
    .slot {
      .wrapper {
        font-size: 24px;
        .title {
          height: 76px;
          line-height: 76px;
        }
        input {
          display: block;
          padding-left: 48px;
        }
        .choose {
          display: flex;
          align-items: center;
          span {
            padding: 16px 30px;
            border: 1px solid #999;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
          }
          .active {
            border-color: #ff4444;
            color: #ff4444;
          }
        }
      }
    }
  }
}
</style>