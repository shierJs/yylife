<template>
  <div>
    <Head :i="8"></Head>
    <div id="main">
      <div class="wrap">
        <div class="breadcrumb">
          <router-link to="/" class="router">首页</router-link>
          <i class="iconfont icon-arrow-r-copy"></i>
          <span>头条资讯</span>
        </div>
        <div class="wrapper">
          <!-- 导航栏 -->
          <ul class="nav-headlines clear">
            <li
              class="nav-item fl"
              v-for="(item,index) in navList"
              :key="index"
              :class="{active:item.id==activei}"
              @click="tab(item.id)"
            >{{item.name}}</li>
          </ul>
          <!-- 导航栏 -->
          <!-- 列表 -->
          <ul class="gif-list" v-show="show">
            <li class="item clear" v-for="(item,index) in list" :key="index">
              <div class="img fl">
                <img v-if="item.thumb != ''" v-lazy="item.thumb" :key="item.thumb" alt :title="item.title">
                <img v-else src="../../../static/img/material/headline-eg.jpg" alt title="沂源资讯">
              </div>
              <div class="fl content">
                <h4 class="title" @click="enterDetail(item.id)">{{item.title}}</h4>
                <p class="desc">{{item.description}}</p>
                <p class="bottom">
                  <span class="time">{{item.create_time}}</span>
                  <i class="iconfont icon-liulan"></i>
                  <span class="browse">{{item.hits}}</span>
                </p>
              </div>
            </li>
          </ul>
          <div class="none" v-show="!show">
            <i class="iconfont icon-meiyoushuju"></i>
            <p class="none-content">暂无数据</p>
          </div>
          <!-- 列表 -->
          <Page
            :total="total"
            @on-change="change"
            :page-size="num"
            :current="current"
            v-show="show"
          />
          <!-- 分页 -->
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import formateTime from "@/common/formateTime.js";
import getInfoApi from "@/api/getInfo";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      linesList: [],
      navList: [
        {
          id: 0,
          name: "推荐"
        }
      ],
      list: [],
      total: 1,
      num: 6,
      activei: 0,
      current: 1, //页码
      show: false
    };
  },
  mounted() {
    this.getCate();
    this.getData();
  },
  methods: {
    tab(i) {
      this.activei = i;
      this.current = 1;
      this.getData();
    },
    getData() {
      //获取当前页数据
      let params = {
        cate_id: this.activei,
        page: this.current
      };
      getInfoApi
        .getArtList(params)
        .then(res => {
          if (res.data.code === 200) {
            this.list=[];
            if (res.data.data.length) {
              this.list = res.data.data;
              this.total = res.data.count;
              this.show = true;
            } else {
              this.$Message.error("当前分类文章为空，请浏览其他分类文章");
              this.show = false;
            }
          } else {
            this.$Message.info(res.data.msg);
            this.show = false;
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    change(i) {
      //分页
      this.current = i;
      this.getData();
      window.scrollTo(0, 300); //回到顶部
    },
    getCate() {
      getInfoApi
        .getArtCate()
        .then(res => {
          if (res.data.code === 200) {
            this.navList = this.navList.concat(res.data.data);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    enterDetail(i) {
      //进入详情页
      let data = {
        name: "文章资讯",
        path: "/headLine",
        now: "文章详情"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("headBread", data);
      this.blank(i);
    },
    blank(i) {
      const { href } = this.$router.resolve({
        path: `/headLine/headLineDetails/${i}`, //通过id渲染详情页数据
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    }
  },
  components: {
    Head,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  padding-bottom: 20px;
  .wrap {
    position: relative;
    padding-bottom: 40px;
    .ivu-page {
      position: absolute;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .breadcrumb {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      .router {
        color: #333;
        font-size: 14px;
      }
      .router:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .wrapper {
      background: #fff;
      .nav-headlines {
        margin-bottom: 25px;
        .nav-item {
          font-size: 16px;
          color: #333;
          height: 40px;
          line-height: 40px;
          border-bottom: 3px solid transparent;
          margin-right: 50px;
        }
        .active {
          border-color: #b4a078;
          color: #b4a078;
          cursor: pointer;
        }
        .nav-item:hover {
          color: #b4a078;
          cursor: pointer;
        }
      }
      .gif-list {
        li.item {
          padding: 20px 0;
          border-top: 1px solid #ccc;
          .img {
            img {
              width: 450px;
              height: 236px;
            }
          }
          .content {
            padding-left: 20px;
            width: 750px;
            font-size: 14px;
            position: relative;
            .title {
              font-size: 18px;
            }
            .desc {
              line-height: 20px;
              padding: 20px 0;
            }
            .bottom {
              position: absolute;
              left: 20px;
              bottom: -113px;
              span {
                display: inline-block;
              }
              .time {
                margin-right: 40px;
              }
              .msg {
                margin-right: 40px;
              }
            }
          }
        }
        .title:hover {
          cursor: pointer;
          color: #b4a078;
          text-decoration: underline;
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
    }
  }
}
</style>