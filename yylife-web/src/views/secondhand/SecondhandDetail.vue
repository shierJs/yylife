<template>
  <div v-show="show">
    <!-- 头部 -->
    <Head :i="-1"></Head>
    <!-- 头部 -->
    <!-- 主体 -->
    <div id="main">
      <div class="wrap">
        <!-- 面包屑 -->
        <Breadcrumb :data="secondBread"></Breadcrumb>
        <!-- 面包屑 -->
        <div class="content">
          <Row>
            <i-col span="17">
              <div class="left">
                <div class="infomation">
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
                  <div class="main clear">
                    <div class="wrapper clearfix">
                      <div class="left fl" v-if="data.img">
                        <div class="show">
                          <img :src="showImg.img" alt>
                        </div>
                        <ul class="img-list">
                          <li
                            class="img fl"
                            v-for="(item,index) in data.img.slice(0,5)"
                            :key="index"
                            @mouseenter="changeShowImg(index)"
                          >
                            <img v-lazy="item.img" :key="item.img" alt>
                          </li>
                        </ul>
                      </div>
                      <div class="right fl">
                        <p class="title">{{data.used_title}}</p>
                        <div class="price-wrap">
                          <span class="label">价格</span>
                          <span class="currency">￥</span>
                          <span class="price">{{data.selling_price}}</span>
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
                            <span class="label">交易地址:</span>
                            <span class="content">{{data.area_name}}{{data.address}}</span>
                          </p>
                        </div>
                      </div>
                      <p class="tips">
                        <span class="label">提示：</span>
                        <span>刷信誉、淘宝刷钻、YY网络兼职、加iSpeak/YY联系的职位都是骗子！收取费用或押金都可能有欺诈嫌疑，请警惕！</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="items">
                  <h3 class="title">宝贝详情</h3>
                  <div class="content" v-html="data.intro"></div>
                </div>
              </div>
            </i-col>
            <i-col span="7">
              <div class="right">
                <div class="company">
                  <h4 class="title">我是个人</h4>
                  <p class="desc">我很懒啥也没留下</p>
                  <p class="prove" v-show="1!=1">
                    <span>企业招聘（已认证企业）</span>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-renzheng"></use>
                    </svg>
                  </p>
                </div>
                <div class="recommend">
                  <div class="head clearfix">
                    <p class="fl title">为您推荐</p>
                    <p class="fr more" @click="$router.push('/secondhand')">查看更多</p>
                  </div>
                  <ul class="list">
                    <li
                      class="item"
                      v-for="(item,index) in recommend"
                      :key="index"
                      @click="rcmDetail(item.used_id)"
                    >
                      <img v-lazy="item.thumb" :key="item.thumb" alt>
                      <p class="desc">{{item.used_title}}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
    </div>
    <!-- 举报 -->
    <Report :type="3" :feed_id="used_id"></Report>
    <!-- 举报 -->
    <!-- 主体 -->
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Breadcrumb from "@/components/Breadcrumb";
import Report from "@/components/Report";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import formateTime from "@/common/formateTime";
import { mapActions, mapState, mapMutations } from "vuex";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      jobBread: {},
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
      detailImg: [
        "../../../static/img/material/detail06.jpg@740w_2048h_0e_1l_watermark=1&&r=1&p=9&x=2&y=2&relative=1&o=20",
        "../../../static/img/material/detail07.jpg@740w_2048h_0e_1l_watermark=1&&r=1&p=9&x=2&y=2&relative=1&o=20",
        "../../../static/img/material/detail08.jpg@740w_2048h_0e_1l_watermark=1&&r=1&p=9&x=2&y=2&relative=1&o=20"
      ],
      data: {},
      showImg: {},
      phone: true,
      used_id: 0,
      show: false,
      webToken: JSON.parse(localStorage.getItem("webToken"))
        ? JSON.parse(localStorage.getItem("webToken"))
        : "",
      copyUrl: window.location.href
    };
  },
  methods: {
    changeShowImg(i) {
      this.showImg = this.data.img[i];
    },
    view() {
      this.phone = false;
    },
    getData() {
      let params = {
        used_id: this.used_id
      };
      getInfoApi
        .getUsedDetail(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.data = res.data.data;
            (this.data.img.length);
            if (this.data.img.length != 0) {
              this.showImg = this.data.img[0];
              this.data.hits =
                parseInt(this.data.hits) + parseInt(this.data.virtual_hits);
              this.data.time = formateTime(
                parseInt(this.data.publish_time) * 1000
              );
              this.getRankList();
              this.show = true;
            } else {
              this.show = false;
              this.$Message.info("加载失败，请重试");
              this.$router.push('/secondhand');
            }
          }else{
            this.$Message.info(res.data.msg);
            this.$router.push('/secondhand');
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    collect() {
      //收藏
      if (!this.webToken) {
        this.$Message.info("请先去登录");
      } else {
        let data = {
          commentable_id: this.used_id,
          commentable_type: "used",
          title: this.data.used_title
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
              this.$router.push('/secondhand');
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
        commentable_id: this.used_id,
        commentable_type: "used"
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
            this.$router.push('/secondhand');
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    hasCollect() {
      //判断是否已经收藏
      let params = {
        commentable_id: this.used_id,
        commentable_type: "used"
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
    getRankList() {
      let params = {
        type: "details",
        cate_id: this.data.cate_id
      };
      getInfoApi
        .getPublishUsed(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.recommend = res.data.data;
          }
        })
        .catch(err => console.log(err));
    },
    rcmDetail(i) {
      //进入详情页
      let data = {
        name: "二手市场",
        path: `/secondhand`,
        now: "二手市场详情页"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("second", data);
      const { href } = this.$router.resolve({
        path: `/secondhand/secondhandDetail/${id}`, //通过id渲染详情页数据
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    ...mapActions(["getCollect"]),
    ...mapMutations(["showFeed"])
  },
  created() {
    this.secondBread = JSON.parse(sessionStorage.getItem("second"));
    if(this.secondBread == null){
      this.secondBread={
        name: "首页",
        path: `/`,
        now: "二手市场详情页"
      }
    }
    this.used_id = parseInt(this.$route.params.id);
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
    Report,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f4f0ea;
  padding-bottom: 50px;
  .wrap {
    .left {
      .infomation {
        padding: 0 20px 40px;
        background: #fff;
        position: relative;
        .head {
          height: 90px;
          line-height: 90px;
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
        .wrapper {
          color: #333;
          .left {
            border-top: none;
            width: 280px;
            padding-bottom: 15px;
            img {
              width: 100%;
              height: 210px;
            }
            .img-list {
              margin-top: 15px;
              padding: 0 9px;
              width: 100%;
              .img {
                width: 48px;
                height: 35px;
                margin-left: 5px;
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
          .tips {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 32px;
            font-size: 14px;
            background: #fffaea;
            color: #ff6c32;
            line-height: 32px;
            width: 100%;
            padding: 0 20px;
          }
        }
      }
      .items {
        margin-top: 20px;
        background: #fff;
        padding: 30px 20px 30px;
        h3.title {
          font-size: 24px;
          color: #333;
          margin-bottom: 40px;
        }
        .content {
          font-size: 14px;
          line-height: 30px;
        }
        .content /deep/ img {
          max-width: 100%;
        }
      }
    }
    .right {
      margin-left: 20px;
      .company {
        padding: 20px;
        background: #fff;
        margin-bottom: 20px;
        .title {
          font-size: 16px;
          line-height: 32px;
        }
        .desc {
          color: #999;
          font-size: 14px;
          line-height: 26px;
        }
        .prove {
          margin-top: 16px;
          span {
            color: #b4a078;
          }
          .icon {
            vertical-align: middle;
            width: 24px;
            height: 24px;
          }
        }
      }
      .recommend {
        background: #fff;
        padding: 0 10px;
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