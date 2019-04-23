<template>
  <div>
    <!-- 头部 -->
    <Head :i="-1"></Head>
    <!-- 头部 -->
    <!-- 主体 -->
    <div id="main">
      <div class="wrap">
        <!-- 面包屑 -->
        <Breadcrumb :data="jobBread"></Breadcrumb>
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
                    <div class="wrapper">
                      <div class="top clear">
                        <div class="fl">
                          <h2 class="title">{{data.title}}</h2>
                          <p class="additional"></p>
                          <ul class="tags clear">
                            <li
                              class="tag fl"
                              v-for="(v,i) in data.recruitment_label"
                              :key="i"
                            >{{v.label_name}}</li>
                          </ul>
                        </div>
                        <p class="salary fr" v-if="data.discuss">
                          <span class="num">{{data.salary}}</span>
                          <span class="unit">元/月</span>
                        </p>
                        <p class="salary fr" v-else>
                          <span class="num">面议</span>
                        </p>
                      </div>
                      <div class="bottom">
                        <ul class="info-wrap clear">
                          <li class="fl info">{{degree}}</li>
                          <li class="fl info">{{works}}</li>
                        </ul>
                        <p class="address">
                          <i class="iconfont icon-dingwei"></i>
                          <span>{{data.address}}</span>
                        </p>
                        <div class="application">
                          <div class="btn" @click="view">
                            <p class="view" v-if="phone">查看电话号码</p>
                            <p class="phone-number" v-else>
                              <i class="iconfont icon-dianhua1"></i>
                              <span class="number">{{data.mobile}}</span>
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
                </div>
                <div class="items">
                  <h3 class="title">职位详情</h3>
                  <div class="content" v-html="data.intro"></div>
                </div>
              </div>
            </i-col>
            <i-col span="7">
              <div class="right">
                <div class="company">
                  <h4 class="title">{{data.company}}</h4>
                  <p class="desc">该企业没有留下什么</p>
                  <p class="prove">
                    <span>企业招聘（已认证企业）</span>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-renzheng"></use>
                    </svg>
                  </p>
                </div>
                <div class="recommend">
                  <div class="head clearfix">
                    <p class="fl title">为您推荐</p>
                    <p class="fr more" @click="$router.push('/recruitment')">查看更多</p>
                  </div>
                  <ul class="list">
                    <li class="item" v-for="(item,index) in recommend" :key="index" @click="rcmDetail(item.id)">
                      <p class="title">{{item.title}}</p>
                      <p class="cate">职位:{{item.cate_name}}</p>
                      <p class="price">4000-8000元/月</p>
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
    <Report :type="2" :feed_id="id"></Report>
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
      education: [
        {
          id: 1,
          name: "学历不限"
        },
        {
          id: 2,
          name: "职高"
        },
        {
          id: 3,
          name: "普高"
        },
        {
          id: 4,
          name: "大专"
        },
        {
          id: 5,
          name: "本科"
        },
        {
          id: 6,
          name: "硕士"
        },
        {
          id: 7,
          name: "博士"
        }
      ], //学历列表
      workYears: [
        {
          id: 1,
          name: "经验不限"
        },
        {
          id: 2,
          name: "1年以下"
        },
        {
          id: 3,
          name: "1-2年"
        },
        {
          id: 4,
          name: "2-3年"
        },
        {
          id: 5,
          name: "3-4年"
        },
        {
          id: 6,
          name: "4-5年"
        },
        {
          id: 7,
          name: "5-10年"
        },
        {
          id: 8,
          name: "十年以上"
        }
      ], //工作年限
      phone: true, //是否显示手机号
      id: 1,
      data: {}, //数据
      degree: "", //学历
      works: "", //经验
      webToken: {}, //user token
      copyUrl:window.location.href,
    };
  },
  methods: {
    view() {
      //查看手机号
      if (this.webToken.access_token == "") {
        this.$Message.info("请先去登录");
      } else {
        this.phone = false;
      }
    },
    getData() {
      //获取数据
      let params = {
        id: this.id
      };
      getInfoApi
        .getJobDetail(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if(res.data.data){
              this.data = res.data.data;
            this.data.hits =
              parseInt(this.data.hits) + parseInt(this.data.virtual_hits);
            this.data.time = formateTime(
              parseInt(this.data.publish_time) * 1000
            );
            this.data.address =
              this.data.area_name + this.data.address + this.data.company;
            this.data.salary =
              this.data.monthly_pay_small + "-" + this.data.monthly_pay_big;
            this.degree = this.education[this.data.education - 1].name;
            this.works = this.workYears[this.data.working_limit - 1].name;
            this.getRankList();
            this.$Spin.hide();
            }else{
              this.$router.push('/recruitment');
            }
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    collect() {
      //收藏
      if (!this.webToken) {
        this.$Message.info("请先去登录");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "recruitment",
          title:this.data.title,
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
        commentable_type: "recruitment"
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
      //判断是否已经收藏
      let params = {
        commentable_id: this.id,
        commentable_type: "recruitment"
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
      getInfoApi.getPublishRecruitment(params).then(res=>{
        ;
        if(res.data.code === 200){
          this.recommend=res.data.data;
        }
      }).catch(err=>console.log(err));
    },
    rcmDetail(i){
      //进入详情页
      let data = {
        name: "求职招聘",
        path: "/recruitment",
        now: "招聘详情页"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("jobBread", data);
      const {href} = this.$router.resolve({
        path: `/recruitment/jobDetail/${i}`,//通过id渲染详情页数据
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
    this.$Spin.show();
    this.jobBread = JSON.parse(sessionStorage.getItem("jobBread")); //面包屑
    if(this.jobBread == null){
      this.jobBread={
        name: "首页",
        path: "/",
        now: "招聘详情页"
      }
    }
    this.webToken = JSON.parse(localStorage.getItem("webToken")); //token
    this.id = parseInt(this.$route.params.id); //id
    this.getData();
  },
  mounted() {
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
        padding: 0 20px;
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
          .top {
            .title {
              font-size: 28px;
              line-height: 52px;
            }
            .additional {
              font-size: 18px;
            }
            .tags {
              margin: 30px 0;
              .tag {
                font-size: 14px;
                background: rgb(243, 223, 197);
                color: #b4a078;
                padding: 0 10px;
                height: 24px;
                line-height: 24px;
                margin-right: 10px;
              }
            }
            .salary {
              color: #ff552e;
              .num {
                font-size: 36px;
                font-weight: 700;
              }
              .unit {
                font-size: 14px;
              }
            }
          }
          .bottom {
            border-top: 1px solid #f4f4f4;
            padding-top: 10px;
            padding-bottom: 90px;
            .application {
              .btn {
                width: 280px;
                height: 54px;
                line-height: 54px;
                color: #fff;
                background: #ff6c32;
                text-align: center;
                font-size: 16px;
                cursor: pointer;
                .phone-number {
                  font-size: 24px;
                }
              }
            }
            .info-wrap {
              padding: 15px 0;
              font-size: 14px;
              .info {
                border-left: 1px solid #ccc;
                padding: 0 10px;
              }
              .info:first-child {
                border: none;
              }
            }
            p.address {
              font-size: 14px;
              margin-bottom: 30px;
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
        .content /deep/ img{
          max-width:100%;
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
          padding-bottom:20px;
          .item {
            position: relative;
            margin-bottom: 20px;
            width:300px;
            border-bottom:1px dashed #ddd;
            .title{
              color: #333;
              font-size:16px;
            }
            .cate{
              line-height:30px;
              color:#999;
              font-size:14px;
            }
            .price{
              font-size:14px;
              color:#f44;
            }
          }
        }
      }
    }
  }
}
</style>