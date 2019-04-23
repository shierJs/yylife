<template>
  <div v-if="showPage">
    <!-- 头部 -->
    <Head :i="-1"></Head>
    <!-- 头部 -->
    <!-- 主体 -->
    <div id="main">
      <div class="wrap">
        <!-- 面包屑 -->
        <Breadcrumb :data="rentBread"></Breadcrumb>
        <!-- 面包屑 -->
        <Row>
          <i-col span="18">
            <div class="info clear">
              <div class="head">
                <h2 class="title">{{data.house_title}}</h2>
                <div class="head-list clear">
                  <div class="fl head-left">
                    <p class="txt-box">
                      <span class="label">发布于:</span>
                      <span class="data">{{data.update_time}}</span>
                    </p>
                    <p class="txt-box">
                      <span class="label">浏览:</span>
                      <span class="data">{{data.hits}}</span>
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
              </div>
              <div class="left fl">
                <swiper :h="320" :banners="data.house_rent_img"></swiper>
              </div>
              <div class="right fl">
                <div class="card">
                  <p class="label">租金：&emsp;&emsp;</p>
                  <p class="rental">
                    <span class="num">{{data.price}}</span>
                    <span class="unit">元</span>
                  </p>
                </div>
                <div class="card">
                  <p class="label">付款方式：</p>
                  <p class="content">{{data.payType}}</p>
                </div>
                <div class="card">
                  <p class="label">小区名：&emsp;</p>
                  <p class="content">{{data.address}}</p>
                </div>
                <div class="card">
                  <p class="label">地址：&emsp;&emsp;</p>
                  <p class="content">{{data.area_name}}-{{data.house_area}}</p>
                </div>
                <div class="card">
                  <p class="label">联系人：&emsp;</p>
                  <p class="content">{{data.username}}</p>
                </div>
                <div class="card">
                  <p class="phone" @click="showNum" v-if="showNumber">查看电话</p>
                  <p class="phone number" v-else>{{data.mobile}}</p>
                </div>
              </div>
              <p class="tips">沂源生活不承担任何交易损失，请谨慎判断相关信息的真实性！</p>
            </div>
            <div class="details">
              <h2 class="detail-title">详情介绍</h2>
              <ul class="item-list">
                <li class="item">
                  <span class="label">租房类型：</span>
                  <span class="content">{{data.type}}</span>
                </li>
                <li class="item">
                  <span class="label">房屋面积：</span>
                  <span class="content">{{data.acreage}}平米</span>
                </li>
                <li class="item">
                  <span class="label">楼层概括：</span>
                  <span class="content">{{data.floor}}</span>
                </li>
                <li class="item">
                  <span class="label">房间朝向：</span>
                  <span class="content">{{data.orientation}}</span>
                </li>
                <li class="item">
                  <span class="label">装修类型：</span>
                  <span class="content">{{data.decoration}}</span>
                </li>
                <li class="item">
                  <span class="label">具体地点：</span>
                  <span class="content">{{data.area_name}}</span>
                </li>
                <li class="config item">
                  <span class="label">房屋配置：</span>
                  <span
                    class="content"
                    v-for="(item,index) in data.house_config"
                    :key="index"
                  >{{item.name}}、</span>
                </li>
              </ul>
              <div class="desc">
                <div class="content" v-html="data.intro"></div>
              </div>
            </div>
          </i-col>
          <i-col span="6">
            <div class="msg">
              <h4 class="name">我是发布的人</h4>
              <p class="desc">我很懒，什么也不想留下</p>
            </div>
            <div class="rank">
              <div class="head clearfix">
                <p class="fl title">为您推荐</p>
                <p class="fr more" @click="$router.push('/rent')">查看更多</p>
              </div>
              <ul class="list">
                <li class="item" v-for="(item,index) in recommend" :key="index" @click="rcmDetail(item.house_id)">
                  <img v-lazy="item.thumb" :key="item.thumb" alt>
                  <p class="desc">{{item.house_title}}</p>
                </li>
              </ul>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
    <!-- 举报 -->
    <Report :type="6" :feed_id="id"></Report>
    <!-- 举报 -->
    <!-- 主体 -->
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Breadcrumb from "@/components/Breadcrumb";
import Report from "@/components/Report";
import Swiper from "@/components/DetailSwiper";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { mapActions, mapState, mapMutations } from "vuex";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      rentBread: {},
      showNumber: true,
      showPage:false,
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
      webToken: "",
      data: {},
      typeList: [
        {
          id: "",
          name: "无"
        },
        {
          id: 1,
          name: "整租房"
        },
        {
          id: 2,
          name: "合租房"
        }
      ],
      floorList: [
        {
          id: "",
          name: "无"
        },
        {
          id: 1,
          name: "低层"
        },
        {
          id: 2,
          name: "中层"
        },
        {
          id: 3,
          name: "高层"
        }
      ],
      payList: [
        {
          id: "",
          name: "无"
        },
        {
          id: 1,
          name: "押一付一"
        },
        {
          id: 2,
          name: "押一付二"
        },
        {
          id: 3,
          name: "押一付三"
        },
        {
          id: 4,
          name: "半年付（押一月）"
        },
        {
          id: 5,
          name: "一年付（押一月）"
        }
      ],
      decorationList: [
        {
          id: "",
          name: "无"
        },
        {
          id: 1,
          name: "精装"
        },
        {
          id: 2,
          name: "简装"
        },
        {
          id: 3,
          name: "豪华"
        },
        {
          id: 4,
          name: "毛坯房"
        }
      ],
      id: "",
      copyUrl:window.location.href,
    };
  },
  methods: {
    showNum() {
      if (this.webToken == "") {
        this.$Message.info("请先去登录");
      } else {
        this.showNumber = false;
      }
    },
    getData() {
      let params = {
        house_id: this.id
      };
      getInfoApi
        .getRentDetail(params)
        .then(res => {
          if (res.data.code === 200) {
            this.data = res.data.data;
            this.data.hits =
              parseInt(this.data.hits) + parseInt(this.data.virtual_hits);
            this.data.type = this.typeList[this.data.type].name;
            this.data.floor = this.floorList[this.data.floor_in].name;
            this.data.decoration = this.decorationList[
              this.data.decoration_type
            ].name;
            this.data.payType = this.payList[this.data.payment_type].name;
            this.getRankList();
            this.showPage=true;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    collect() {
      if (!this.webToken) {
        this.$Message.info("请先去登录");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "houseRent",
          title:this.data.house_title,
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
      let data = {
        type: "cancel",
        commentable_id: this.id,
        commentable_type: "houseRent"
      };
      setInfoApi
        .delCollect(data)
        .then(res => {
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
      let params = {
        commentable_id: this.id,
        commentable_type: "houseRent"
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
      };
      getInfoApi.getPublishHouseRent(params).then(res=>{
        ;
        if(res.data.code === 200){
          this.recommend=res.data.data;
        }
      }).catch(err=>console.log(err));
    },
    rcmDetail(i){
      //进入详情页
      let data = {
        path: "/rent",
        name: "房屋出租",
        now: "房屋出租详情页"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("rentBread", data);
      const {href} = this.$router.resolve({
        path: `/rent/rentDetail/${i}`,//通过id渲染详情页数据
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
    this.rentBread = JSON.parse(sessionStorage.getItem("rentBread"));
    if(this.rentBread == null){
      this.rentBread={
        path: "/",
        name: "首页",
        now: "房屋出租详情页"
      }
    };
    this.webToken = JSON.parse(localStorage.getItem("webToken"));
    this.id = parseInt(this.$route.params.id);
  },
  mounted() {
    this.getData();
    this.hasCollect();
  },
  computed: {
    col() {
      return this.$store.state.collect;
    }
  },
  components: {
    Head,
    Breadcrumb,
    Swiper,
    Report,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f4f0ea;
  padding-bottom: 50px;
  .info {
    background: #fff;
    position: relative;
    padding-bottom: 50px;
    .head {
      padding: 20px 40px 20px;
      .title {
        font-size: 20px;
        color: #333;
        line-height: 40px;
      }
      .head-list {
        height: 30px;
        line-height: 30px;
        p {
          display: inline-block;
          color: #999;
        }
        .txt-box {
          margin-right: 18px;
        }
        .function {
          margin-left: 18px;
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
    }
    .left {
      width: 400px;
      padding-left: 40px;
    }
    .right {
      margin-left: 40px;
      .card {
        margin: 10px 0;
        p {
          display: inline-block;
          font-size: 16px;
        }
        .label {
          color: #666;
          margin-right: 20px;
        }
        .rental {
          color: #f33;
          font-weight: 600;
          .num {
            font-size: 24px;
          }
        }
        .phone {
          width: 280px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: 16px;
          color: #fff;
          background: #f55;
          border-radius: 4px;
          cursor: pointer;
        }
        .number {
          font-size: 26px;
        }
      }
    }
    .tips {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      background: rgb(241, 178, 141);
      color: rgb(187, 88, 58);
      font-size: 14px;
      line-height: 30px;
      text-indent: 2em;
    }
  }
  .msg {
    background: #fff;
    padding: 10px 20px;
    margin-left: 20px;
    .name {
      font-size: 16px;
    }
    .desc {
      color: #999;
      font-size: 14px;
    }
  }
  .rank {
    background: #fff;
    padding: 0 10px;
    margin-top: 30px;
    margin-left: 20px;
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
  .details {
    margin-top: 30px;
    background: #fff;
    padding: 10px 20px;
    .detail-title {
      font-size: 20px;
      color: #333;
      height: 40px;
      border-bottom: 1px solid #ccc;
      line-height: 30px;
    }
    .item-list {
      font-size: 16px;
      margin: 20px 0;
      .item {
        display: inline-block;
        width: 49%;
        line-height: 30px;
      }
      .config {
        width: 100%;
      }
    }
    .desc {
      font-size: 16px;
      .content {
        line-height: 30px;
        text-indent: 2em;
      }
      .content /deep/ img{
        max-width:100%;
      }
    }
  }
}
</style>