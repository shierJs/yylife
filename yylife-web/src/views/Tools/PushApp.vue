<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <Swiper :h="400" :position_id="19"></Swiper>
        <div class="wrapper">
          <ul class="app-list">
            <li class="app-item clear" v-for="(item,index) in appList" :key="index">
              <img v-lazy="item.logo" :key="item.logo" alt :title="item.app_name" class="fl">
              <div class="fl txt">
                <p class="title" @click="$router.push(`/pushAppDetail/${item.id}`)">{{item.app_name}}</p>
                <span class="desc">{{item.intro}}</span>
              </div>
              <div class="btn fr">
                <p class="download" @click="$router.push(`/pushAppDetail/${item.id}`)">
                  <i class="iconfont icon-xiazai"></i>
                  <span>安&emsp;&emsp;装</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="page">
          <Page :total="total" :current="appCurrent" @on-change="changePage"/>
        </div>
      </div>
      <!-- 导航侧边栏 -->
      <div class="aside-nav">
        <div class="nav-wrap">
          <p class="title">设备类型</p>
          <ul class="cate-list">
            <li
              class="item"
              v-for="(item,index) in asideNav"
              :key="index"
              @click="change(index)"
              :class="{active:index==activei}"
            >
              <i class="iconfont" :class="item.icon"></i>
              <span>{{item.title}}</span>
            </li>
          </ul>
        </div>
        <!-- 应用推荐排行 -->
        <!-- <div class="recommend-wrap">
          <p class="title">应用排行</p>
          <ul class="cate-list">
            <li
              class="item"
              v-for="(item,index) in asideApp"
              :key="index"
              :class="{active:index==activei}"
            >
              <p class="top">
                <span class="name">{{item.name}}</span>
              </p>
              <div class="content">
                <img v-lazy="item.imgSrc" alt :title="item.name">
                <div class="right">
                  <p class="badge">{{item.badge}}</p>
                  <p class="size">
                    <span class="label">大小：</span>
                    <span>{{item.size}}M</span>
                  </p>
                </div>
                <Rate disabled v-model="item.rate"/>
              </div>
            </li>
          </ul>
        </div> -->
      </div>
      <!-- 导航侧边栏 -->
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import getInfoApi from "@/api/getInfo";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      asideNav: [
        {
          icon: "icon-quanbu1",
          title: "全部",
          type: ""
        },
        {
          icon: "icon-anzhuomoren",
          title: "安卓",
          type: "android"
        },
        {
          icon: "icon-ios",
          title: "苹果",
          type: "ios"
        }
      ],
      appList: [],
      activei: 0,
      appCurrent: 1,
      total: 10,
      type: ""
    };
  },
  methods: {
    change(i) {
      this.activei = i;
      this.type = this.asideNav[i].type;
      this.getList();
    },
    getList() {
      let params = {
        page: this.appCurrent,
        type: this.type
      };
      getInfoApi
        .getAppList(params)
        .then(res => {
          this.total=res.data.count;
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.appList = res.data.data;
              this.total = res.data.total;
            } else {
              this.$Message.info("没有更多了");
            }
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    changePage(i) {
      //分页获取数据
      this.appCurrent = i;
      this.getList();
      window.scrollTo(0, 600);
    },
  },
  mounted() {
    this.getList();
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
  padding-top: 20px;
  padding-bottom: 50px;
  background: #f4f0ea;
  .aside-nav {
    position: absolute;
    left: 110px;
    top: 410px;
    width: 112px;
    background: #fff;
    .nav-wrap {
      .title {
        line-height: 30px;
        font-size: 14px;
        color: #f44;
        padding-left: 10px;
        border-bottom: 5px solid #f4f0ea;
      }
      .cate-list {
        .item {
          padding-left: 10px;
          font-size: 14px;
          line-height: 32px;
          border-left: 2px solid transparent;
          margin-bottom: 10px;
        }
        .item:last-child {
          margin-bottom: 0;
        }
        .item:hover {
          color: #b4a078;
          border-color: #b4a078;
          cursor: pointer;
        }
        .active {
          color: #b4a078;
          border-color: #b4a078;
        }
      }
    }
    .recommend-wrap {
      border-top: 20px solid #f4f0ea;
      .title {
        line-height: 30px;
        font-size: 14px;
        color: #f44;
        padding-left: 10px;
        border-bottom: 5px solid #f4f0ea;
      }
      .item {
        cursor: pointer;
        padding: 10px;
        .top {
          span {
            font-size: 14px;
            line-height: 20px;
            color: #b4a078;
          }
          span:hover {
            text-decoration: underline;
          }
        }
        .content {
          img {
            width: 25px;
            height: 25px;
            vertical-align: top;
          }
          .right {
            display: inline-block;
            p {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .wrapper {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    .app-list {
      .app-item {
        border-bottom: 1px dashed #ddd;
        padding: 10px 0;
        cursor: pointer;
        img {
          width: 60px;
          height: 60px;
        }
        .txt {
          margin-left: 20px;
          color: #333;
          .title {
            font-size: 16px;
            margin-bottom: 5px;
          }
          .title:hover {
            color: #b4a078;
            text-decoration: underline;
          }
          .desc {
            font-size: 14px;
            color: #999;
          }
        }
        .btn {
          .download {
            width: 200px;
            height: 50px;
            line-height: 50px;
            background: #a18f6b;
            color: #fff;
            font-size: 16px;
            border-radius: 6px;
            .iconfont {
              font-size: 20px;
              margin-left: 16px;
              padding-right: 14px;
              border-right: 1px solid #eee;
            }
            span {
              margin-left: 21px;
            }
          }
          .download:hover {
            cursor: pointer;
            background: #b4a078;
          }
        }
      }
    }
  }
  .page {
    display: inline-block;
    margin-top: 30px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>