<template>
  <div>
    <!-- 头部 -->
    <Head :i="1"></Head>
    <!-- 头部 -->
    <!-- 主体 -->
    <div id="main">
      <div class="wrap">
        <breadcrumb :data="breadcrumb"></breadcrumb>
        <div class="wrapper">
          <h2 class="title">{{data.shop_name}}</h2>
          <div class="head clear">
            <div class="fl head-left">
              <p class="txt-box">
                <span class="label">发布于:</span>
                <span class="data">{{data.time}}</span>
              </p>
              <p class="txt-box">
                <span class="label">浏览:</span>
                <span class="data">{{data.hits}}</span>
              </p>
              <p class="txt-box">
                <span class="label">收藏:</span>
                <span class="data">{{data.collection}}人</span>
              </p>
            </div>
            <div class="fr head-right">
              <p class="function" v-if="col" @click="collect">
                <i class="iconfont icon-shoucang"></i>
                <span class="collection">收藏</span>
              </p>
              <p class="function" v-else @click="delCollect">
                <i class="iconfont icon-shoucang" style="color:#b4a078;"></i>
                <span class="collection" style="color:#b4a078;">已收藏</span>
              </p>
              <p
                class="function"
                v-clipboard:copy="copyUrl"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                <i class="iconfont icon-icon_share"></i>
                <span class="collection">分享</span>
              </p>
              <p class="function" @click="showFeedBack">
                <i class="iconfont icon-jubao"></i>
                <span class="report">举报</span>
              </p>
            </div>
          </div>
          <div class="content clearfix">
            <div class="left fl">
              <div class="show">
                <img :src="showImg.img" alt :title="data.shop_name">
              </div>
              <ul class="img-list">
                <li
                  class="img fl"
                  v-for="(item,index) in imgList"
                  :key="index"
                  @mouseenter="changeShowImg(index)"
                >
                  <img v-lazy="item.img" :key="item.img" alt>
                </li>
              </ul>
            </div>
            <div class="right fl">
              <p class="title">{{data.shop_name}}</p>
              <div class="price-wrap">
                <span class="currency">￥</span>
                <span class="price">{{data.consumption}}</span>
              </div>
              <div class="contact">
                <Button
                  type="error"
                  style="height:50px;width:240px;font-size:16px;"
                  @click="view"
                  v-if="phone"
                >查看联系电话</Button>
                <div class="views" v-else>
                  <i class="iconfont icon-dianhua1"></i>
                  <span>{{data.mobile}}</span>
                </div>
              </div>
              <div class="item">
                <p class="address">
                  <span class="label">店铺地址:</span>
                  <span class="content">{{data.area_name}}{{data.address}}</span>
                </p>
                <p class="preferential">
                  <span class="label">沂源优惠:</span>
                  <span class="content">{{data.discounts}}</span>
                </p>
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
                      <p class="label fl">商家描述</p>
                      <div class="content fl" v-html="data.details"></div>
                    </div>
                    <ul class="img-detail" v-show="detailIndex==1">
                      <li v-for="(item,index) in imgList" :key="index">
                        <img v-lazy="item.img" :key="item.img" alt>
                      </li>
                    </ul>
                  </div>
                </div>
              </i-col>
              <i-col span="6">
                <div class="recommend">
                  <div class="head clearfix">
                    <p class="fl title">为您推荐</p>
                    <p class="fr more" @click="$router.push('/food')">查看更多</p>
                  </div>
                  <ul class="list">
                    <li class="item" v-for="(item,index) in recommend" :key="index" @click="rcmDetail(item.shop_id)">
                      <img v-lazy="item.thumb" :key="item.thumb" alt>
                      <p class="desc">{{item.shop_name}}</p>
                    </li>
                  </ul>
                </div>
              </i-col>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <!-- 主体 -->
    <!-- 举报 -->
    <Report :type="1" :feed_id="id"></Report>
    <!-- 举报 -->
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Breadcrumb from "@/components/Breadcrumb";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { mapState, mapActions, mapMutations } from "vuex";
import Report from "@/components/Report";
import formateTime from "@/common/formateTime";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      imgList: [],
      recommend: [
        {
          src:
            "../../../static/img/material/recom01.jpg@320w_240h_0e_1l_watermark=0",
          desc: "大毛龙虾馆买一送一个龙虾毛"
        },
        {
          src:
            "../../../static/img/material/recom02.jpg@320w_240h_0e_1l_watermark=0",
          desc: "大毛龙虾馆买一送一个龙虾毛"
        },
        {
          src:
            "../../../static/img/material/recom03.jpg@320w_240h_0e_1l_watermark=0",
          desc: "大毛龙虾馆买一送一个龙虾毛"
        },
        {
          src:
            "../../../static/img/material/recom04.jpg@320w_240h_0e_1l_watermark=0",
          desc: "大毛龙虾馆买一送一个龙虾毛"
        }
      ],
      details: ["详情描述", "图文详情"],
      showImg: {},
      detailIndex: 0,
      breadcrumb: {},
      phone: true,
      id: 0,
      data: {},
      copyUrl: "",
    };
  },
  methods: {
    changeShowImg(i) {
      this.showImg = this.imgList[i];
    },
    changeBool(i) {
      this.detailIndex = i;
    },
    view() {
      if (localStorage.getItem("webToken")) {
        this.phone = false;
      } else {
        this.$Message.info("请先去登录");
      }
    },
    getData() {
      let params = {
        shop_id: this.id
      };
      getInfoApi
        .getShopDetail(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.data = res.data.data;
            this.data.hits =
              parseInt(this.data.hits) + parseInt(this.data.virtual_hits);
            this.data.time = formateTime(
              parseInt(this.data.publish_time) * 1000
            );
            this.imgList = this.data.shop_img;
            this.showImg = this.imgList[0];
            this.getRankList();
          }
        })
        .catch(err => this.$router.push('/notFound'))
    },
    collect() {
      //收藏
      if (!localStorage.getItem("webToken")) {
        this.$Message.info("请先去登录");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "shop",
          title:this.data.shop_name
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
            this.$router.push('/notFound');
          });
      }
    },
    delCollect() {
      //取消收藏
      let data = {
        type: "cancel",
        commentable_id: this.id,
        commentable_type: "shop"
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
          this.$router.push('/notFound');
        });
    },
    hasCollect() {
      //是否已收藏
      let params = {
        commentable_id: this.id,
        commentable_type: "shop"
      };
      this.getCollect(params);
    },
    showFeedBack() {
      //举报
      if (localStorage.getItem("webToken")) {
        this.showFeed(true);
      } else {
        this.$Message.info("请登录");
      }
    },
    onCopy(e) {
      this.$Message.success("复制成功");
    },
    onError() {
      this.$Message.error("复制失败");
    },
    getRankList(){
      let params={
        type:"details",
        cate_id:this.data.cate_id
      };
      getInfoApi.getPublishShop(params).then(res=>{
        ;
        if(res.data.code === 200){
          this.recommend=res.data.data;
        }
      }).catch(err=>console.log(err));
    },
    rcmDetail(i){
      //进入详情页
      let data={
        path:'/food',
        name:"美食",
        now:"美食详情页"
      };
      data=JSON.stringify(data);
      sessionStorage.setItem("foodBread",data);
      const {href} = this.$router.resolve({
        path:`/food/foodDetail/${i}`,//通过id渲染详情页数据
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      })
      window.open(href, '_blank');
    },
    ...mapActions(["getCollect"]),
    ...mapMutations(["showFeed"])
  },
  created() {
    this.breadcrumb = JSON.parse(sessionStorage.getItem("foodBread"));
    if(this.breadcrumb == null){
      this.breadcrumb={
        path:'/',
        name:"首页",
        now:"美食详情页"
      }
    };
    this.id = parseInt(this.$route.params.id);
    this.copyUrl = window.location.href;
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
    Report,
    Foot,
  },
}

</script>

<style scoped lang="less">
#main {
  box-shadow: 0 -1px 1px 0px #ddd;
  padding-bottom: 150px;
  .wrapper {
    padding: 0 100px;
    h2.title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      height: 38px;
      line-height: 38px;
    }
    .head {
      height: 30px;
      line-height: 30px;
      p {
        display: inline-block;
        color: #999;
      }
      .txt-box {
        margin-right: 28px;
      }
      .function {
        margin-left: 28px;
      }
      .function:hover {
        color: #b4a078;
        cursor: pointer;
        .icon-jubao,
        .report {
          color: #f44;
        }
      }
    }
    .content {
      margin-top: 20px;
      border-top: 2px solid #b4a078;
      .left {
        border: 1px solid #ccc;
        border-top: none;
        width: 480px;
        padding-bottom: 15px;
        img {
          width: 100%;
          height: 360px;
        }
        .img-list {
          margin-top: 15px;
          padding: 0 9px;
          width: 100%;
          .img {
            width: 84px;
            height: 63px;
            margin-left: 10px;
            border: 1px solid transparent;
            img {
              height: 100%;
            }
          }
          .img:first-child {
            margin-left: 0;
          }
          .img:hover {
            border-color: #b4a078;
          }
        }
      }
      .right {
        width: 520px;
        height: 454px;
        border: 1px solid #ccc;
        border-left: none;
        padding-left: 20px;
        .title {
          font-size: 16px;
          line-height: 46px;
        }
        .price-wrap {
          background: #f6f6f6;
          color: #f44;
          .currency {
            font-size: 16px;
          }
          .price {
            font-size: 36px;
          }
          p.facade {
            margin-left: 10px;
            display: inline-block;
            color: #999;
            span {
              font-size: 16px;
            }
            .price {
              text-decoration: line-through;
            }
          }
        }
        .contact {
          padding: 20px 0;
          .views {
            width: 240px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 24px;
            color: #fff;
            background: #ed4014;
            border-radius: 4px;
          }
        }
        .item {
          border-top: 1px dashed #ccc;
          p {
            line-height: 40px;
            font-size: 16px;
            .content {
              border: none;
            }
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
          .content /deep/ img{
            max-width:100%;
          }
          .clear {
            margin-bottom: 30px;
          }
          .img-detail{
            text-align: center;
          }
          img {
            max-width: 100%;
            display: block;
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