<template>
  <div>
    <Loading :show="show"></Loading>
    <div>
      <Head title="沂源招聘">
        <div class="icon">
          <i class="iconfont icon-shoucang-copy" @click="collect" v-if="col"></i>
          <i class="iconfont icon-shoucang1" v-else @click="cancelCollect"></i>
          <i
            class="iconfont icon-fenxiang"
            v-clipboard:copy="copyUrl"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></i>
          <i class="iconfont icon-jubao" @click="$router.push(`/report/2/${id}`)"></i>
        </div>
      </Head>
      <!-- 头部 -->
      <transition name="fade">
        <div id="main" v-show="show">
          <div class="detail">
            <div class="top">
              <h3>{{data.title}}</h3>
              <p
                class="wages"
                v-if="data.discuss"
              >{{data.monthly_pay_small}}-{{data.monthly_pay_big}}元/月</p>
              <p class="wages" v-else>面议</p>
              <div class="tips">
                <p>更新：{{data.time}}</p>
                <p>浏览：{{data.hits}}</p>
              </div>
            </div>
            <div class="bottom">
              <div class="position">职位：{{cate.name}}</div>
              <div class="second" v-if="data.type==1">类型：全职</div>
              <div class="second" v-else>类型：兼职</div>
              <div class="second">要求：{{works}}/{{degree}}</div>
              <div class="second">工作地址：{{data.address}}</div>
              <div class="welfare">
                福利：
                <p
                  class="tags"
                  v-for="(item ,i) in data.recruitment_label"
                  :key="i"
                >{{item.label_name}}</p>
              </div>
            </div>
          </div>
          <!-- 职位详情 -->
          <div class="position-desc">
            <h4 class="title">职位详情</h4>
            <div class="desc" v-html="data.intro"></div>
          </div>
          <!-- 职位描述 -->
          <div class="company-info">
            <h4 class="title">公司简介</h4>
            <div class="info">
              <p class="entry">
                名称：
                <span class="field">{{data.company}}</span>
              </p>
              <p class="entry">
                规模：
                <span class="field">{{data.scale}}</span>
              </p>
              <p class="entry">
                地址：
                <span class="field">{{data.address}}</span>
              </p>
            </div>
          </div>
          <!-- 公司信息 -->
          <div class="report" @click="$router.push(`/report/2/${id}`)">
            <h5>如遇无效、虚假、诈骗信息、请立即举报</h5>
            <p>求职过程中请勿缴纳费用、谨防诈骗！若信息不实请举报</p>
            <div class="icon">
              <img src="/static/img/icon/jingdeng.png" alt>
              <span>举报</span>
            </div>
          </div>
          <!-- 举报 -->
        </div>
      </transition>
      <!-- 底部 -->
      <footer id="foot">
        <div class="phone" v-if="phoneShow" @click="showPhone">
          <img src="/static/img/icon/dianhua.png" alt>
          <p>查看电话</p>
        </div>
        <div class="phone" v-else>
          <p>{{data.mobile}}</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import formateTime from "@/common/formateTime";
import { Toast } from "vant";
import setInfoApi from "@/api/setInfo";
export default {
  data() {
    return {
      show: false,
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
      ],
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
      ],
      cateList: [],
      scale: ["", "20人以下", "20-50人", "50-100人", "100-200人", "200人以上"],
      id: "",
      data: {},
      degree: "",
      works: "",
      cate: "",
      phoneShow: true,
      col: true,
      copyUrl: window.location.href
    };
  },
  methods: {
    expand() {
      if (this.news == "展开信息") {
        this.desc = this.desc2;
        this.news = "收起信息";
      } else {
        this.desc = this.desc1;
        this.news = "展开信息";
      }
    },
    more() {
      this.$router.push("/jobList");
    },
    getData() {
      let params = {
        id: this.id
      };
      getInfoApi
        .getJobDetail(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data) {
              this.data = res.data.data;
              this.data.hits = this.data.hits + this.data.virtual_hits;
              this.data.time = formateTime(
                parseInt(this.data.publish_time) * 1000
              );
              this.data.address =
                this.data.area_name + this.data.address + this.data.company;
              this.data.salary =
                this.data.monthly_pay_small + "-" + this.data.monthly_pay_big;
              this.degree = this.education[this.data.education - 1].name;
              this.works = this.workYears[this.data.working_limit - 1].name;
              this.cate = this.cateList.filter(el => {
                return el.id == this.data.cate_id;
              });
              this.data.scale = this.scale[this.data.company_scale];
              this.show = true;
            }else{
              this.$router.push('/');
            }
          } else {
            Toast(res.data.msg);
            this.$router.push("/notFound");
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    getCate() {
      getInfoApi
        .getJobCate()
        .then(res => {
          if (res.data.code === 200) {
            this.cateList = res.data.data;
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    showPhone() {
      if (this.defined.access_token === "") {
        Toast("请先去登录");
      } else {
        this.phoneShow = false;
      }
    },
    collect() {
      if (this.defined.access_token == "") {
        Toast("请先去登录");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "recruitment",
          title: this.data.title
        };
        setInfoApi
          .collect(data)
          .then(res => {
            if (res.data.code === 200) {
              Toast(res.data.msg);
              this.col = false;
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
          commentable_type: "recruitment"
        };
        getInfoApi
          .hasCollect(params)
          .then(res => {
            if (res.data.code === 200) {
              if (res.data.is_collect) {
                this.col = true;
              } else {
                this.col = false;
              }
            } else if (res.data.code === 10003) {
              this.defined.removeToken();
            } else {
              ;
            }
          })
          .catch(err => {
            this.$router.push("/notFound");
          });
      }
    },
    cancelCollect() {
      let data = {
        type: "cancel",
        commentable_id: this.id,
        commentable_type: "recruitment"
      };
      setInfoApi.cancelCollect(data).then(res => {
        if (res.data.code === 200) {
          Toast(res.data.msg);
          this.col = true;
        } else if (res.data.code === 10003) {
          Toast("身份已过期，请重新登录");
          this.defined.removeToken();
        } else {
          Toast(res.data.msg);
        }
      });
    },
    onCopy(e) {
      Toast("复制成功");
    },
    onError() {
      Toast("复制失败");
    }
  },
  mounted() {
    this.id = parseInt(this.$route.params.id);
    this.getData();
    this.getCate();
    this.hasCollect();
  },
  components: {
    Head,
    Loading
  }
};
</script>

<style scoped lang="less">
#head {
  .icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 160px;
    height: auto;
    .iconfont {
      font-size: 28px;
    }
    .icon-shoucang1 {
      color: #ff9500;
    }
  }
}
#main {
  padding-top: 91px;
  background: #d9d9d9;
  padding-bottom: 110px;
  .detail {
    background: #fff;
    margin-bottom: 24px;
    .top {
      padding: 0 40px;
      padding-top: 48px;
      border-bottom: 2px solid #dedede;
      h3 {
        color: #505050;
        font-size: 36px;
        margin-bottom: 42px;
      }
      p {
        font-size: 36px;
        color: #505050;
        line-height: 49px;
        display: flex;
        align-items: center;
        .badeg {
          display: inline-block;
          width: 80px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          background: #666;
          color: #fff;
          font-size: 20px;
          margin-left: 24px;
        }
      }
      .tips {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 44px;
        margin-bottom: 32px;
        p {
          font-size: 24px;
          color: #616161;
        }
      }
    }
    .bottom {
      padding: 48px 40px 36px;
      font-size: 24px;
      color: #515151;
      .position {
        margin-bottom: 48px;
      }
      .second {
        margin-bottom: 44px;
      }
      .welfare {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .tags {
          border: 1px solid #ff5834;
          padding: 6px;
          color: #ff5834;
          margin-left: 20px;
          margin-top: 10px;
        }
      }
    }
  }

  .position-desc {
    background: #fff;
    margin-bottom: 24px;
    .title{
      padding: 0 20px;
    }
    .desc{
      padding:0 20px;
    }
    .desc /deep/ img{
      max-width:100%;
    }
  }
  .company-info {
    background: #fff;
    margin-bottom: 24px;
    .info {
      padding: 26px 20px;
      font-size: 26px;
      color: #707070;
      border-top: 1px solid #707070;
      .entry {
        line-height: 52px;
        height: 26px;
        color: #9e9e9e;
        height: 52px;
        .field {
          color: #3c3c3c;
        }
      }
    }
  }
  .qa {
    background: #fff;
    margin-bottom: 24px;
    .question {
      height: 96px;
      padding: 0 40px;
      border-top: 2px solid #ccc;
      display: flex;
      align-items: center;
      font-size: 26px;
      img {
        margin-right: 10px;
      }
    }
  }
  .report {
    background: #fff;
    margin-bottom: 24px;
    padding: 20px 40px;
    color: #6d6d6d;
    position: relative;
    h5 {
      font-size: 26px;
      margin-bottom: 8px;
    }
    p {
      font-size: 20px;
    }
    .icon {
      position: absolute;
      right: 40px;
      top: 50%;
      height: auto;
      width: auto;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .title {
    height: 124px;
    line-height: 124px;
    font-size: 32px;
    color: #636363;
    padding: 0 40px;
  }
}
#foot {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  z-index: 100;
  div {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f44;
    width: 100%;
    img {
      width: 48px;
      margin-right: 20px;
    }
    p {
      font-size: 36px;
      color: #fff;
    }
  }
  .application {
    width: 360px;
  }
}
</style>