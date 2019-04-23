<template>
  <div>
    <Head :i="5"></Head>
    <div id="main">
      <div class="wrap">
        <div class="top">
          <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <span class="index" @click="jump">首页</span>
            <i class="iconfont icon-arrow-r-copy"></i>
            <span class="current">生活服务</span>
          </div>
          <!-- 面包屑导航 -->
          <!-- 轮播 -->
          <Swiper :h="400"  :position_id="17"></Swiper>
          <!-- 轮播 -->
        </div>
        <div class="main">
          <!-- 筛选 -->
          <div class="filter">
            <div class="wrapper">
              <p class="fl">分类：&emsp;&emsp;</p>
              <ul class="job-list clear">
                <li
                  class="item fl"
                  v-for="(item,index) in cateList"
                  :key="index"
                  :class="{active:cateId==item.id}"
                  @click="changeCate(item.id)"
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
                  :class="{active:areaId==item.id}"
                  @click="changeArea(item.id)"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 筛选 -->
          <Row>
            <!-- 美食列表 -->
            <i-col span="20">
              <div class="list" v-show="show">
                <ul class="gif-list">
                  <li
                    class="item clear"
                    v-for="(item,index) in list"
                    :key="index"
                    @click="enterDetail(item.service_id)"
                  >
                  <div class="left fl">
                      <img v-lazy="item.thumb" :key="item.thumb" alt :title="item.house_title">
                    </div>
                    <div class="fl content">
                      <h4 class="title">{{item.service_title}}</h4>
                      <p class="name">联系人：{{item.username}}</p>
                      <p class="desc">地址：{{item.area_name}}-{{item.address}}</p>
                      <p>分类：{{item.cate_name}}</p>
                      <p class="time">发布于：{{item.publish_time}}</p>
                      <div class="tags">
                        <p class="tag" v-for="(v,i) in item.service_label" :key="i">{{v.label_name}}</p>
                      </div>
                    </div>
                    <p class="contact" @click.stop="enterDetail(item.service_id)">
                      <i class="iconfont icon-dianhua"></i>
                      <span>联系商家</span>
                    </p>
                    <svg class="icon top" aria-hidden="true" v-if="item.location == 1">
                      <use xlink:href="#icon-tuijian"></use>
                    </svg>
                  </li>
                </ul>
              </div>
              <div class="none" v-show="!show">
                  <i class="iconfont icon-meiyoushuju"></i>
                  <p class="none-content">暂无数据</p>
                </div>
            </i-col>
            <!-- 美食列表 -->
            <!-- 24小时热榜 -->
            <i-col span="4">
              <div class="rank">
                <div class="title clear">
                  <h3 class="fl">24小时热榜</h3>
                </div>
                <ul class="rank-list">
                  <li class="item clear" v-for="(item,index) in hotList" :key="index" @click="enterDetail(item.service_id)">
                    <p class="tag" v-show="index <= 3">{{index+1}}</p>
                    <img v-lazy="item.thumb" :key="item.thumb" alt class="fl">
                    <div class="content fl">
                      <p class="title">{{item.service_title}}</p>
                      <p class="area">分类：{{item.cate_name}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </i-col>
            <!-- 24小时热榜 -->
            <Page :total="total" @on-change="change" :current="foodCurrent" v-show="show" />
            <!-- 页码 -->
          </Row>
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
import formateTime from "@/common/formateTime.js";
import getInfoApi from "@/api/getInfo";
import { mapActions, mapState, mapMutations } from "vuex";
import Foot from "@/components/Foot";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源生活服务, 沂源商家大全, 沂源本地服务,搬家,家政"
      },
      {
        name: "description",
        content: "沂源生活服务频道,是沂源地区综合的本地生活服务平台,是本地综合的商家展示平台。为您提供沂源搬家公司, 沂源家政服务, 沂源月嫂, 沂源装修建材, 沂源餐饮娱乐, 沂源教育培训, 沂源婚庆等本地服务的精准商家务信息查询和发布。"
      }
    ]
  },
  data() {
    return {
      foodRate: 5,
      cateList: [],
      cateId: "",
      gifList: [
        {
          imgSrc: "../../../static/img/material/sucai08.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述24v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai09.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述23v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai10.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述22v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai11.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述21v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai09.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述20ov啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai08.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述19v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai08.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述18v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai09.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述17v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai10.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述16v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai11.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述15v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai09.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述14v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai08.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述13v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai08.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述12v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai09.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述11v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai10.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述v10啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai11.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述9v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai09.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述8v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai08.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述7v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai08.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述6v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai09.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述5v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai10.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述4v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai11.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai09.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述2v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        },
        {
          imgSrc: "../../../static/img/material/sucai08.gif",
          title: "我是美食的标题，我也很好吃，大家点击我就能找到最美味的食物",
          desc: "我是文章的描述1v啊我是美食的描述，我很好吃",
          name: "爆炒小龙虾",
          tag: ["满20减5", "满100减90"]
        }
      ],
      cate: "",
      list: [],
      total: 0,
      foodCurrent: 1,
      areaId: "",
      hotList:[],
      show:false,
      keyword:"",
    };
  },
  mounted() {
    this.getAreaList();
    this.getCate();
    this.getHotList();
    if (this.searchList.key == 4) {
      this.list = this.searchList.list;
      this.total = this.searchList.count;
      this.keyword=this.searchList.keyword;
      this.list.forEach(el => {
        el.hits = parseInt(el.hits) + parseInt(el.virtual_hits);
        el.publish_time = new Date(parseInt(el.publish_time) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ");
      });
      this.show=true;
    } else {
      this.getList();
    }
  },
  methods: {
    jump() {
      this.$router.push("/");
    },
    change(i) {
      //分页
      this.foodCurrent = i;
      this.getList();
      window.scrollTo(0, 600);
    },
    enterDetail(i) {
      let data = {
        path: "/life",
        name: "生活服务",
        now: "生活服务详情页"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("lifeBread", data);
      this.blank(i);
    },
    blank(i) {
      const { href } = this.$router.resolve({
        path: `/life/lifeDetail/${i}`,
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    getCate() {
      getInfoApi
        .getLifeCate()
        .then(res => {
          if (res.data.code === 200) {
            this.cateList = res.data.data;
            this.cateList.unshift({
              id: "",
              name: "全部"
            });
          }
        })
        .catch(err => console.log('err'));
    },
    changeCate(i) {
      this.cateId = i;
      this.getList();
    },
    changeArea(i) {
      this.areaId = i;
      this.getList();
    },
    getList() {
      this.$Spin.show();
      let params = {
        page: this.foodCurrent,
        cate_id: this.cateId,
        area_id: this.areaId,
        keyword:this.keyword
      };
      getInfoApi
        .getLifeList(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              this.total = res.data.count;
              this.list.forEach(el => {
                el.hits = parseInt(el.hits) + parseInt(el.virtual_hits);
                el.publish_time = new Date(parseInt(el.publish_time) * 1000)
                  .toLocaleString()
                  .replace(/:\d{1,2}$/, " ");
              });
              this.show=true;
              this.$Spin.hide();
            } else {
              this.show=false;
              this.$Spin.hide();
            }
          }
        })
        .catch(err => this.$router.push("/notFound"));
    },
    getHotList() {
      let params = {
        type: "hits"
      };
      getInfoApi.getPublishService(params).then(res => {
        if (res.data.code === 200) {
          ;
          this.hotList = res.data.data;
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    ...mapActions(["getAreaList"]),
    ...mapMutations(["clearKeyList"])
  },
  beforeDestroy() {
    sessionStorage.removeItem("foodCurrent"); //组件销毁之前删除session
    this.clearKeyList();
  },
  computed: {
    areaList() {
      return this.$store.state.areaList;
    },
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
      .list {
        .gif-list {
          padding: 0 20px;
          li.item {
            padding: 20px 0;
            border-bottom: 1px solid #ccc;
            position: relative;
            .left {
              width: 150px;
              height: 150px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .content {
              padding-left: 20px;
              font-size: 14px;
              .title {
                font-size: 18px;
              }
              .desc {
                line-height: 40px;
              }
              .name {
                font-size: 16px;
                color: #b4a078;
              }
              .tags {
                margin-top: 15px;
                .tag {
                  float: left;
                  background: #f44;
                  color: #fff;
                  margin-right: 10px;
                  padding: 0 10px;
                }
              }
              .time {
                position: absolute;
                right: 20px;
                bottom: 20px;
              }
            }
            .contact {
              position: absolute;
              right: 0;
              top: 50%;
              width: 130px;
              height: 40px;
              color: #fff;
              text-align: center;
              line-height: 40px;
              font-size: 14px;
              background: #f44;
              margin-top: -20px;
              border-radius: 5px;
              cursor: pointer;
            }
            .top {
              position: absolute;
              top: 0px;
              left: 0px;
              width: 50px;
              height: 50px;
            }
          }
          .item .title:hover {
            cursor: pointer;
            color: #b4a078;
            text-decoration: underline;
          }
        }
      }
      .none{
        text-align: center;
        .iconfont{
          font-size:240px;
          color:#b4a078;
        }
        .none-content{
          font-size:18px;
          color:#b4a078;
        }
      }
      .ivu-row {
        padding-bottom: 60px;
        .ivu-page {
          position: absolute;
          margin-left: 50%;
          transform: translateX(-50%);
          bottom: 10px;
        }
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
            img {
              width: 80px;
              height: 50px;
            }
            .content {
              margin-left: 10px;
              width:100px;
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