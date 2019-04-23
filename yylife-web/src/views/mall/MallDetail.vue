<template>
  <div>
    <Head ref="head" :i="4"></Head>
    <div id="main">
      <div class="wrap" v-show="show">
        <breadcrumb :data="breadcrumb"></breadcrumb>
        <div class="wrapper">
          <div class="content clearfix">
            <div class="left fl" v-if="goodsData.goods_img">
              <div class="show fl">
                <img :src="showImg.img" alt>
              </div>
              <ul class="img-list fl">
                <li
                  class="img"
                  v-for="(item,index) in goodsData.goods_img"
                  :key="index"
                  @mouseenter="changeShowImg(index)"
                >
                  <img v-lazy="item.img" :key="item.img" alt>
                </li>
              </ul>
            </div>
            <div class="right fl">
              <h3 class="title">{{goodsData.goods_name}}</h3>
              <p class="sub-title">{{goodsData.goods_remark}}</p>
              <div class="content">
                <p class="price">
                  <span class="label">价格</span>
                  <span class="currency">￥</span>
                  <span class="sale">{{shop_price}}</span>
                  <span class="sale-price" v-show="market_price!=0">￥{{market_price}}</span>
                </p>
                <p class="distribution" v-show="goodsData.shop.exemption != 0">
                  <span class="label">配送</span>
                  <span class="text">满{{goodsData.shop.exemption}}包邮</span>
                </p>
                <div class="service">
                  <span class="label">服务</span>
                  <p class="items">
                    <span class="item">{{goodsData.shop.serve}}</span>
                  </p>
                </div>
                <div class="class">
                  <div class="color" v-for="(item,key,index) in spec_attr" :key="index">
                    <p class="label">{{key}}</p>
                    <ul class="color-list">
                      <li
                        class="item fl"
                        v-for="(v,i) in item"
                        :key="i"
                        @click="selSpec(v,key,index,$event,i)"
                        :class="[activeArr[index] == i?'active':'']"
                      >
                        <i class="iconfont icon-jiaobiao"></i>
                        <span>{{v}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="num">
                    <p class="label">数量&emsp;&emsp;</p>
                    <InputNumber :max="parseInt(stock)" :min="1" v-model="number">1</InputNumber>
                    <span style="margin-left:5px;color:#999;">库存：{{stock}}</span>
                  </div>
                </div>
              </div>
              <div class="function">
                <p class="buy" @click="buyNow">
                  <span>立即购买</span>
                </p>
                <p class="add-cart" @click="addCart">
                  <i class="iconfont icon-gouwuche"></i>
                  <span>加入购物车</span>
                </p>
                <div class="collection" v-if="col" @click="collect">
                  <i class="iconfont icon-shoucang"></i>
                  <span>收藏</span>
                </div>
                <div class="collection" v-else @click="delCollect">
                  <i class="iconfont icon-shoucang"></i>
                  <span>已收藏</span>
                </div>
              </div>
            </div>
          </div>
          <div class="details">
            <Row>
              <i-col span="18">
                <div class="detail">
                  <div class="nav-detail">
                    <p
                      :class="{active:index==detailIndex}"
                      @click="changeBool(index)"
                      v-for="(item,index) in details"
                      :key="index"
                    >{{item}}</p>
                  </div>
                  <div class="wrapper-detail">
                    <div class="clear" v-show="detailIndex==0">
                      <div v-html="goodsData.goods_content"></div>
                    </div>
                    <div class="question" v-show="detailIndex==1">
                      <p>
                        <b>1、问：沂源生活的订单如何配送？</b>
                      </p>
                      <p>答：沂源生活会根据商品所在地、顾客所在地和商品的尺寸重量优选物流配送商，确保优质用户体验。目前暂不支持自选快递，具体物流信息可在下单成功后“我的订单-追踪物流”中查看。</p>
                      <p>
                        <b>2、问：我的包裹多长时间能送到？</b>
                      </p>
                      <p>答：我们会在订单支付成功后1-3天内发货（节假日顺延，部分特殊商品七天内发货），送达时间视快递配送时间而定。</p>
                      <p>
                        <b>3、问：订单生成后我需要在多长时间内支付货款？</b>
                      </p>
                      <p>答：下单后我们会为您保留1小时，为确保订单的有效性，需要您在1小时内完成支付。</p>
                      <p>
                        <b>4、问：在线支付已经成功，为什么我的订单状态还是显示“待付款”？</b>
                      </p>
                      <p>答：一般来说，网上支付是即时到账的。但有时因为网络原因，可能会有几分钟的延迟，请您耐心等待，并及时查询您的银行卡账户余额，如果费用已扣，但订单状态依然是“等待付款”，请联系客服处理。</p>
                      <p>
                        <b>5、问：实物与图片有色差吗？</b>
                      </p>
                      <p>答：沂源生活中的商品照片均以实物拍摄，颜色经设计师校对，由于不同的电脑显示器、光线、亮度都有差异，造成轻微色差难以避免。</p>
                      <p>
                        <b>6、问：下单后可以修改订单信息吗？</b>
                      </p>
                      <p>答：订单支付前，用户可以在订单详情页中修改订单收货信息和发票信息，修改结果以实际页面修改提示为准。</p>
                      <p>
                        <b>7、问：退货时，商品的退款是怎么计算的？</b>
                      </p>
                      <p>答：按照实际支付货款退还。若您在该订单中使用过优惠券，则该优惠券不予返还，并按 "券后结算价"为商品退款。</p>
                      <p>
                        <b>8、问：商品发货后，拒收会收取费用吗？</b>
                      </p>
                      <p>答：商品发货后，非商品质量问题拒收产生的退回物流费用由用户承担。</p>
                    </div>
                  </div>
                </div>
              </i-col>
              <i-col span="6">
                <div class="recommend">
                  <div class="head clearfix">
                    <p class="fl title">为您推荐</p>
                    <p class="fr more" @click="$router.push('/mall')">查看更多</p>
                  </div>
                  <ul class="list">
                    <li class="item" v-for="(item,index) in recommend" :key="index" @click="rcmDetail(item.goods_id)">
                      <img v-lazy="item.original_img" :key="item.original_img" alt :title="item.goods_remark">
                      <p class="desc">
                        <span>{{item.goods_name | flow}}</span>
                        <span style="color:#f00">￥{{item.shop_price}}</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </i-col>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Breadcrumb from "@/components/Breadcrumb";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { mapState, mapActions, mapMutations } from "vuex";
import flow from "@/filters/flow";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      recommend: [],
      details: ["详情描述", "常见问题"],
      showImg: {},
      detailIndex: 0,
      breadcrumb: {},
      phone: true,
      number: 1,
      colorActive: 0,
      id: 0,
      goodsData: {
        shop:{
          exemption:0,
          server:"沂源自营"
        }
      },
      spec_attr: {},
      spec_arr: [],
      activeArr: [],
      shop_price: "",
      market_price: "",
      stock: "",
      item_id: 0,
      show:false,
    };
  },
  methods: {
    changeShowImg(i) {
      if(this.goodsData.goods_img.length == 0){
        this.showImg.img="../../../static/img/function/load.gif"
      }else{
        this.showImg = this.goodsData.goods_img[i];
      }
    },
    changeBool(i) {
      this.detailIndex = i;
    },
    view() {
      this.phone = false;
    },
    buyNow(){
      if (!localStorage.getItem("webToken")) {
        
        this.defined.removeToken();
        this.$router.push("/log/0");
      } else {
        if (this.number == 0 ||this.item_id ==-1) {
          this.$Message.info("请填写正确的商品数量，选择正确的规格");
        } else {
          let data={
            goods_id: this.goodsData.goods_id,
            number: this.number,
            item_id: this.item_id
          };
          setInfoApi.toGoodsPay(data).then(res=>{
            ;
            if(res.data.code === 200){
              let data=JSON.stringify(res.data.data);
              sessionStorage.setItem("orderData",data);
              this.$router.push('/mall/mallOrder/1');
            }
          }).catch(err=>console.log(err));
        }
      }
    },
    addCart() {
      if (!localStorage.getItem("webToken")) {
        this.$Message.info('请先登录');
      } else {
        if (this.number == 0 ||this.item_id ==-1) {
          this.$Message.info("请填写正确的商品数量，选择正确的规格");
        } else {
          let data = {
            goods_id: this.goodsData.goods_id,
            number: this.number,
            item_id: this.item_id
          };
          setInfoApi
            .addCart(data)
            .then(res => {
              ;
              if(res.data.code === 200){
                this.$Message.success(res.data.msg);
                this.$refs.head.getCartNum();
              }else if(res.data.code === 10003){
                
                this.defined.removeToken();
                this.$router.push("/log/0");
              }else{
                this.$Message.info(res.data.msg);
              }
            })
            .catch(err => {});
        }
      }
    },
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
      let specData = this.goodsData.spec_goods_price;
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
              this.stock = el.stock;
              this.item_id = el.item_id;
              return;
            } else {
              this.$Message.info("当前商品库存不足");
              this.stock = el.stock;
            }
          }
        } else {
          this.shop_price = this.goodsData.shop_price;
          this.market_price = this.goodsData.market_price;
          this.stock = this.goodsData.store_count;
          this.item_id = -1;
        }
      });
      this.$forceUpdate(); //重绘
    },
    getData() {
      let params = {
        goods_id: this.id
      };
      getInfoApi
        .getMallGoods(params)
        .then(res => {
          if (res.data.code === 200) {
            this.goodsData = res.data.data;
            this.shop_price = this.goodsData.shop_price;
            this.market_price = this.goodsData.market_price;
            this.stock = this.goodsData.store_count;
            this.goodsData.goods_img=this.goodsData.goods_img.slice(0,5);
            this.getSpec(this.goodsData);
            this.getRec(this.goodsData);
            if(this.goodsData.spec_goods_price.length){
                this.item_id=-1;
            }else{
                this.item_id="";
            }
            this.changeShowImg(0);
            this.show=true;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
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
    getRec(data) {
      let params = {
        cate_id: data.cate_id
      };
      getInfoApi
        .getMallGoodsRcd(params)
        .then(res => {
          if (res.data.code === 200) {
            this.recommend = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    collect() {
      //收藏
      if (!localStorage.getItem("webToken")) {
        this.$Message.info("请先去登录");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "goods",
          title:this.goodsData.goods_name
        };
        setInfoApi
          .collect(data)
          .then(res => {
            if (res.data.code == 200) {
              this.hasCollect();
              this.$Message.success(res.data.msg);
            } else if (res.data.code === 10003) {
              this.$Message.info("登录已失效,请重新登录");
              this.defined.removeToken();
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push("/notFound");
          });
      }
    },
    delCollect() {
      //取消收藏
      let data = {
        type: "cancel",
        commentable_id: this.id,
        commentable_type: "goods"
      };
      setInfoApi
        .delCollect(data)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.hasCollect();
            this.$Message.info(res.data.msg);
          } else if (res.data.code === 10003) {
            this.$Message.info("登录已失效,请重新登录");
            this.defined.removeToken();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    hasCollect() {
      //是否已收藏
      let params = {
        commentable_id: this.id,
        commentable_type: "goods"
      };
      this.getCollect(params);
    },
    rcmDetail(i){
      //进入详情页
      let data = {
        path: "/mall",
        name: "商城",
        now: "商城详情页"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("mallBread", data);
      const {href} = this.$router.resolve({
        path: `/mall/mallDetail/${i}`,//通过id渲染详情页数据
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      })
      window.open(href, '_blank');
    },
    ...mapActions(["getCollect"])
  },
  created() {
    this.breadcrumb = JSON.parse(sessionStorage.getItem("mallBread"));
    this.id = this.$route.params.id;
    this.hasCollect();
    this.getData();
  },
  computed: {
    col() {
      return this.$store.state.collect;
    }
  },
  components: {
    Head,
    Breadcrumb,
    Foot
  }
};
</script>

<style scoped lang="less">
#main {
  box-shadow: 0 -1px 1px 0px #ddd;
  padding-bottom: 150px;
  .wrapper {
    padding: 0 50px;
    .content {
      margin-top: 20px;
      .left {
        padding-bottom: 15px;
        .show {
          width: 360px;
          img {
            width: 100%;
            height: 360px;
          }
        }
        .img-list {
          margin-left: 15px;
          .img {
            width: 84px;
            height: 63px;
            margin-top: 11px;
            border: 1px solid transparent;
            img {
              height: 100%;
              width: 100%;
            }
          }
          .img:first-child {
            margin-top: 0;
          }
          .img:hover {
            border-color: #b4a078;
          }
        }
      }
      .right {
        margin-left: 20px;
        width: 488px;
        .title {
          font-size: 24px;
          color: #333;
        }
        .sub-title {
          font-size: 14px;
          color: #999;
        }
        .content {
          border-top: 1px dashed #999;
          background: #f5f3ef;
          padding: 10px 10px;
          font-size: 14px;
          .label {
            margin-right: 30px;
            color: #666;
          }
          p {
            line-height: 24px;
          }
          .price {
            .currency {
              color: #f22;
              font-size: 14px;
              font-weight: 600;
            }
            .sale {
              font-size: 24px;
              color: #f22;
              font-weight: 600;
            }
            .sale-price {
              font-size: 16px;
              color: #ccc;
              text-decoration: line-through;
              margin-left: 5px;
            }
          }
          .color {
            margin-top: 10px;
            .label {
              display: inline-block;
            }
            .color-list {
              display: inline-block;
              vertical-align: middle;
              .item {
                cursor: pointer;
                padding: 5px 10px;
                background: #fff;
                border: 1px solid transparent;
                position: relative;
                text-align: center;
                margin-right: 15px;
                .iconfont {
                  color: #b4a078;
                  position: absolute;
                  right: 0;
                  bottom: -5px;
                  display: none;
                }
                span {
                  font-size: 14px;
                  display: inline-block;
                  min-width: 14px;
                }
              }
              .active {
                border-color: #b4a078;

                .iconfont {
                  display: block;
                }
              }
            }
          }
          .service {
            margin: 5px 0;
            .label {
              margin-right: 0;
            }
            .items {
              display: inline-block;
              margin-left: 30px;
              width: 400px;
              vertical-align: top;
            }
          }
          .num {
            margin: 10px 0;
            .label {
              display: inline-block;
            }
          }
        }
        .function {
          margin: 20px 0;
          p {
            width: 168px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            border: 1px solid #b4a078;
            background: #f3f3f3;
            font-size: 18px;
            display: inline-block;
            margin-right: 20px;
          }
          .buy {
            color: #b4a078;
          }
          .buy:hover {
            background: #fff;
            cursor: pointer;
          }
          .add-cart {
            background: rgba(180, 160, 120, 1);
            color: #fff;
          }
          .add-cart:hover {
            cursor: pointer;
            background: rgba(180, 160, 120, 0.9);
          }
          .collection {
            vertical-align: bottom;
            text-align: center;
            display: inline-block;
            height: 50px;
            width: 50px;
            font-size: 14px;
            cursor: pointer;
            background: #fdfafa;
            color: #999;
            border: 1px solid #b4a078;
            span {
              display: block;
            }
          }
          .collection:hover {
            background: #fff;
          }
        }
      }
    }
    .details {
      margin-top: 50px;
      .detail {
        .nav-detail {
          background: #f5f5f5;
          border: 1px solid #ccc;
          font-size: 0;
          p {
            display: inline-block;
            font-size: 14px;
            text-align: center;
            line-height: 44px;
            width: 125px;
            border-right: 1px solid #ccc;
            border-top: 2px solid transparent;
            cursor: pointer;
          }
          .active {
            border-top: 2px solid #b4a078;
            background: #fff;
            color: #b4a078;
          }
        }
        .wrapper-detail {
          margin-top: 30px;
          .label {
            font-size: 16px;
            color: #aaa;
            padding: 0 10px;
          }
          .content {
            margin: 0;
            border: none;
            width: 80%;
            text-indent: 2em;
            font-size: 14px;
            line-height: 24px;
            margin-left: 33px;
          }
          .clear {
            margin-bottom: 30px;
          }
          .clear div /deep/ img{
            max-width:100%;
          }
          .question {
            font-size: 16px;
            padding: 0 20px;
            p {
              line-height: 30px;
            }
          }
        }
      }
      .recommend {
        padding-left: 20px;
        .head {
          p {
            font-size: 14px;
            line-height: 30px;
          }
          .more {
            color: #999;
          }
          .more:hover {
            color: #b4a078;
            cursor: pointer;
          }
        }
        .list {
          .item {
            position: relative;
            height: 200px;
            margin-bottom: 20px;
            img {
              height: 200px;
              width: 100%;
            }
            p.desc {
              position: absolute;
              height: 30px;
              background: rgba(255, 255, 255, 0.6);
              bottom: 0;
              left: 0;
              width: 100%;
              text-align: center;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>