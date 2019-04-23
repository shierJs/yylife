<template>
  <div>
    <Head :i="2"></Head>
    <div id="main">
      <div class="wrap">
        <div class="top">
          <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <span class="index" @click="jump">首页</span>
            <i class="iconfont icon-arrow-r-copy"></i>
            <span class="current">招聘</span>
          </div>
          <!-- 面包屑导航 -->
          <!-- 轮播 -->
          <Swiper :h="400" :position_id="8"></Swiper>
          <!-- 轮播 -->
        </div>
        <div class="main">
          <!-- 筛选 -->
          <div class="filter">
            <div class="wrapper">
              <p class="fl">类型：&emsp;&emsp;</p>
              <ul class="job-list clear">
                <li
                  class="item fl"
                  v-for="(item,index) in typeList"
                  :key="index"
                  @click="changeType(index)"
                  :class="{active:typeId==item.id}"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="wrapper">
              <p class="fl">职位：&emsp;&emsp;</p>
              <ul class="job-list clear">
                <li
                  class="item fl"
                  v-for="(item,index) in jobList"
                  :key="index"
                  @click="changeCate(index)"
                  :class="{active:jobId==item.id}"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="wrapper">
              <p class="fl">薪资水平：</p>
              <ul class="wages-list clear">
                <li
                  class="item fl"
                  v-for="(item,index) in salarys"
                  :key="index"
                  @click="changeSalary(index)"
                  :class="{active:salaryId==item.id}"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="wrapper">
              <p class="fl">学历要求：</p>
              <ul class="welfare-list clear">
                <li
                  class="item fl"
                  v-for="(item,index) in education"
                  :key="index"
                  @click="changeDegree(index)"
                  :class="{active:degreeId==item.id}"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="wrapper">
              <p class="fl">工作经历：</p>
              <ul class="welfare-list clear">
                <li
                  class="item fl"
                  v-for="(item,index) in workYears"
                  :key="index"
                  @click="changeWork(index)"
                  :class="{active:workId==item.id}"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="wrapper">
              <p class="fl">地区：&emsp;&emsp;</p>
              <ul class="area-list clear">
                <li
                  class="item fl"
                  v-for="(item,index) in areaList"
                  :key="index"
                  @click="changeArea(index)"
                  :class="{active:areaId==item.id}"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 筛选 -->
          <!-- 列表 -->
          <div class="list-wrap">
            <Row>
              <i-col span="20">
                <ul class="list" v-show="show">
                  <li class="item clear" v-for="(item,index) in list" :key="index">
                    <div class="left fl">
                      <p class="title" @click="enterDetail(item.id)">{{item.title}}</p>
                      <p class="desc">
                        <span class="address">{{item.address}}</span>
                        <span class="company">{{item.company}}</span>
                        <span class="line">/</span>
                        <span class="time">{{item.publish_time}}</span>
                      </p>
                    </div>
                    <div class="right">
                      <h3 class="salary" v-if="item.discuss">{{item.salary}}元</h3>
                      <h3 class="salary" v-else>面议</h3>
                      <ul class="tags">
                        <li
                          class="fl tag"
                          v-for="(v,i) in item.recruitment_label"
                          :key="i"
                        >{{v.label_name}}</li>
                      </ul>
                    </div>
                    <svg class="icon top" aria-hidden="true" v-if="item.location == 1">
                      <use xlink:href="#icon-tuijian"></use>
                    </svg>
                  </li>
                </ul>
                <div class="none" v-show="!show">
                  <i class="iconfont icon-meiyoushuju"></i>
                  <p class="none-content">暂无数据</p>
                </div>
              </i-col>
              <i-col span="4">
                <div class="rank">
                  <div class="title clear">
                    <h3 class="fl">热门职位推荐</h3>
                  </div>
                  <ul class="rank-list">
                    <li
                      class="item clear"
                      v-for="(item,index) in hotList"
                      :key="index"
                      @click="enterDetail(item.id)"
                    >
                      <div class="content fl">
                        <p class="title">{{item.title}}</p>
                        <p class="area">职位：{{item.cate_name}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </i-col>
            </Row>
            <Page
              :total="total"
              @on-change="change"
              :page-size="num"
              :current="recruitmentCurrent"
              v-show="show"
            />
          </div>
          <!-- 列表 -->
        </div>
      </div>
      <p class="release">
        <span @click="$router.push('/release')">马上去发布</span>
      </p>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import getInfoApi from "@/api/getInfo";
import { mapState, mapMutations } from "vuex";
import Foot from "@/components/Foot";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源找工作,沂源招聘求职,沂源人才,沂源招聘"
      },
      {
        name: "description",
        content: "沂源招聘求职频道为您提供大量的沂源招聘信息,求职简历信息，是沂源地区综合招聘求职平台，您也可以免费发布招聘职位，求职简历信息。"
      }
    ]
  },
  data() {
    return {
      typeList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "全职"
        },
        {
          id: 2,
          name: "兼职"
        }
      ], //职位类型
      jobList: [],
      workYears: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "不限"
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
      salarys: [
        {
          name: "不限",
          monthly_pay_small: "",
          monthly_pay_big: "",
          id: 1
        },
        {
          name: "3000元以下",
          monthly_pay_small: "",
          monthly_pay_big: 3000,
          id: 2
        },
        {
          name: "3000-5000元",
          monthly_pay_small: 3000,
          monthly_pay_big: 5000,
          id: 3
        },
        {
          name: "5000-8000元",
          monthly_pay_small: 5000,
          monthly_pay_big: 8000,
          id: 4
        },
        {
          name: "8000-10000元",
          monthly_pay_small: 8000,
          monthly_pay_big: 10000,
          id: 5
        },
        {
          name: "10000-12000元",
          monthly_pay_small: 10000,
          monthly_pay_big: 12000,
          id: 6
        },
        {
          name: "12000元",
          monthly_pay_small: 12000,
          monthly_pay_big: "",
          id: 7
        }
      ], //薪资
      areaList: [], //区域
      education: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "不限"
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
      ], //教育经历
      list: [],
      total: 0, //总条数
      num: 10, //一页条数
      rate: 5,
      recruitmentCurrent: 1, //页码
      jobId: "",
      typeId: "",
      salaryId: 1,
      degreeId: "",
      workId: "",
      areaId: "",
      salary_small: "",
      salary_big: "",
      hotList: [],
      show: false,
      keyword:"",
    };
  },
  mounted() {
    this.$Spin.show();
    this.getCate();
    this.getArea();
    this.getHotList();
    if (this.searchList.key == 2) {
      this.list = this.searchList.list;
      this.keyword=this.searchList.keyword;
      this.list.forEach(el => {
        el.publish_time = new Date(parseInt(el.publish_time) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ");
        el.salary = el.monthly_pay_small + "-" + el.monthly_pay_big;
      });
      this.total = this.searchList.count;
      this.$Spin.hide();
      this.show=true;
    } else {
      this.getList();
    }
  },
  methods: {
    jump() {
      this.$router.push("/");
    },
    getList() {
      //取数据
      let params = {
        page: this.recruitmentCurrent,
        type: this.typeId,
        cate_id: this.jobId,
        education: this.degreeId,
        working_limit: this.workId,
        area_id: this.areaId,
        monthly_pay_small: this.salary_small,
        monthly_pay_big: this.salary_big,
        keyword:this.keyword
      };
      getInfoApi
        .getJobList(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              this.list.forEach(el => {
                el.publish_time = new Date(parseInt(el.publish_time) * 1000)
                  .toLocaleString()
                  .replace(/:\d{1,2}$/, " ");
                el.salary = el.monthly_pay_small + "-" + el.monthly_pay_big;
              });
              this.total = res.data.count;
              this.show = true;
              this.$Spin.hide();
            } else {
              this.show = false;
              this.$Spin.hide();
            }
          }
        })
        .catch(err => {
          console.log('err')
        });
    },
    change(i) {
      //分页获取数据
      this.recruitmentCurrent = i;
      this.getList();
      window.scrollTo(0, 600);
    },
    enterDetail(id) {
      //进入详情页
      let data = {
        name: "求职招聘",
        path: "/recruitment",
        now: "招聘详情页"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("jobBread", data);
      this.blank(id);
    },
    blank(i) {
      let id = i;
      const { href } = this.$router.resolve({
        path: `/recruitment/jobDetail/${id}`, //通过id渲染详情页数据
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    getCate() {
      //获取分类
      getInfoApi
        .getJobCate()
        .then(res => {
          if (res.data.code === 200) {
            this.jobList = res.data.data;
            this.jobList.unshift({
              id: "",
              name: "全部"
            });
          }
        })
        .catch(err => {
          console.log('err')
        });
    },
    getArea() {
      //获取地区
      getInfoApi
        .getAllArea()
        .then(res => {
          if (res.data.code === 200) {
            this.areaList = res.data.data[0].children;
            this.areaList.unshift({
              id: "",
              name: "全部"
            });
            this.areaList.push(res.data.data[1]);
          }
        })
        .catch(err => {
          console.log('err');
        });
    },
    changeType(i) {
      this.typeId = this.typeList[i].id;
      this.getList();
    },
    changeCate(i) {
      this.jobId = this.jobList[i].id;
      this.getList();
    },
    changeSalary(i) {
      this.salaryId = this.salarys[i].id;
      this.salary_small = this.salarys[i].monthly_pay_small;
      this.salary_big = this.salarys[i].monthly_pay_big;
      this.getList();
    },
    changeDegree(i) {
      this.degreeId = this.education[i].id;
      this.getList();
    },
    changeWork(i) {
      this.workId = this.workYears[i].id;
      this.getList();
    },
    changeArea(i) {
      this.areaId = this.areaList[i].id;
      this.getList();
    },
    getHotList() {
      let params = {
        type: "hits"
      };
      getInfoApi.getPublishRecruitment(params).then(res => {
        if (res.data.code === 200) {
          ;
          this.hotList = res.data.data;
        } else {
          this.$Message.info(res.data.msg);
        }
      }).catch(err=>console.log('err'));
    },
    ...mapMutations(["clearKeyList"])
  },
  beforeDestroy() {
    sessionStorage.removeItem("recruitmentCurrent"); //删除页码缓存
    this.clearKeyList();
  },
  computed: {
    searchList() {
      return this.$store.state.searchList;
    }
  },
  components: {
    Head,
    Swiper,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f4f0ea;
  .wrap {
    div.top {
      margin-bottom: 30px;
      .breadcrumb {
        height: 50px;
        line-height: 50px;
        font-size: 0;
        color: #999;
        span,
        .iconfont {
          font-size: 12px;
        }
        .index {
          color: #333;
        }
        .index:hover {
          text-decoration: underline;
          cursor: pointer;
        }
        .iconfont {
          display: inline-block;
          margin: 0 8px;
        }
      }
    }
    .main {
      background: #fff;
      .filter {
        padding: 20px 40px 40px;
        .wrapper {
          margin-top: 10px;
          border-bottom: 1px dashed #ddd;
          p {
            font-size: 14px;
            color: #999;
          }
          ul {
            .item {
              height: 26px;
              color: #333;
              margin-left: 14px;
            }
            .active {
              color: #b4a078;
              font-size: 14px;
            }
            .item:hover {
              color: #b4a078;
              cursor: pointer;
            }
          }
        }
      }
      .list-wrap {
        padding: 0 20px;
        padding-bottom: 40px;
        position: relative;
        .list {
          .item {
            padding: 10px 20px;
            border-top: 1px dashed #ccc;
            position: relative;
            .left {
              p.title {
                font-size: 18px;
                color: #666;
                line-height: 46px;
              }
              .title:hover {
                color: #b4a078;
                text-decoration: underline;
                cursor: pointer;
              }
              .desc {
                height: 36px;
                line-height: 36px;
                color: #999;
                span {
                  font-size: 14px;
                }
                .line {
                  display: inline-block;
                  margin: 0 5px;
                }
              }
            }
            .right {
              position: absolute;
              right: 20px;
              top: 50%;
              transform: translateY(-50%);
              .salary {
                font-size: 18px;
                color: #f44;
                text-align: right;
              }
              .tags {
                li {
                  color: #999;
                  border: 1px solid #999;
                  padding: 2px 3px;
                  font-size: 12px;
                  text-align: center;
                  margin-left: 10px;
                }
              }
            }
            .top {
              position: absolute;
              top: 0px;
              left: 0px;
              width: 50px;
              height: 50px;
            }
          }
        }
        .none {
          text-align: center;
          .iconfont {
            font-size: 240px;
            color: #b4a078;
          }
          .none-content {
            font-size: 18px;
            color: #b4a078;
          }
        }
        .ivu-page {
          position: absolute;
          margin-left: 50%;
          transform: translateX(-50%);
          bottom: 10px;
        }
        .rank {
          .title {
            margin-bottom: 20px;
            h3 {
              font-size: 16px;
              border-bottom: 2px solid #f44;
            }
            .more {
              font-size: 12px;
              padding-top: 8px;
            }
          }
          .rank-list {
            .item {
              position: relative;
              margin-bottom: 15px;
              cursor: pointer;
              border-bottom: 1px dashed #ddd;
              .content {
                margin-left: 10px;
                width: 100px;
                .title {
                  margin-bottom: 10px;
                  max-width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 14px;
                  font-weight: 600;
                  color: #b4a078;
                }
              }
              .tag {
                position: absolute;
                top: 0;
                left: 0;
                background: #f44;
                color: #fff;
                font-size: 14px;
                text-align: center;
                height: 20px;
                width: 30px;
                line-height: 20px;
              }
            }
            .item:nth-child(2) .tag {
              background: #f85b30;
            }
            .item:nth-child(3) .tag {
              background: #f7ab26;
            }
          }
        }
      }
    }
  }
  .release {
    text-align: center;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    color: #0cf;
  }
  .release span:hover {
    color: #f44;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>