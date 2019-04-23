<template>
  <div>
    <Head :showRelease="false" :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <!-- 面包屑 -->
        <div class="breadcrumb">
          <router-link to="/" class="link">首页</router-link>
          <i class="iconfont icon-arrow-r-copy"></i>
          <span>发布信息</span>
        </div>
        <!-- 面包屑 -->
        <div class="wrapper">
          <div class="head">
            <p class="class">1.请选择发布类别</p>
            <p class="info">2.填写信息</p>
            <p class="comfirm">3.完成发布</p>
          </div>
          <ul class="class-list">
            <li
              class="item"
              v-for="(item,index) in classList"
              :key="index"
              @click="toRelease(index)"
            >
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.icon"></use>
              </svg>
              <p>{{item.label}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      classList: [
        {
          icon: "#icon-wicon-fang-wu-zu-lin-copy",
          label: "房屋租赁",
          path: "/release/releaseRent/0"
        },
        {
          icon: "#icon-fangdai",
          label: "房屋买卖",
          path: "/release/releaseTrade/0"
        },
        {
          icon: "#icon-zhaopinqiuzhi",
          label: "求职招聘",
          path: "/release/releaseJob/0"
        },
        {
          icon: "#icon-catering",
          label: "餐饮广告",
          path: "/release/releaseCatering/0"
        },
        {
          icon: "#icon-svgmoban06",
          label: "二手物品",
          path: "/release/releaseUsed/0"
        },
        {
          icon: "#icon-fuwu-copy",
          label: "生活服务",
          path: "/release/releaseLife/0"
        }
      ]
    };
  },
  methods: {
    toRelease(i) {
      if (localStorage.getItem("webToken")) {
        let releaseName = this.classList[i].label;
        let data = {
          path: "/release",
          name: "发布信息",
          now: releaseName
        };
        data = JSON.stringify(data);
        sessionStorage.setItem("releasebread", data);
        this.$router.push({
          path: this.classList[i].path
        });
      } else {
        this.$router.push('/log/0');
      }
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
  background: #f4f0ea;
  padding-bottom: 50px;
  .wrap {
    .breadcrumb {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color: #999;
      .link {
        color: #666;
      }
      .iconfont {
        font-size: 12px;
      }
      .link:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .wrapper {
      background: #fff;
      padding: 20px 20px;
      .head {
        margin: 30px 0;
        font-size: 16px;
        p {
          display: inline-block;
          width: 350px;
          margin-left: 50px;
          border-bottom: 2px solid #ccc;
        }
        p:first-child {
          margin-left: 0;
          border-color: #b4a078;
          color: #b4a078;
        }
      }
      .class-list {
        .item {
          display: inline-block;
          width: 40%;
          margin-bottom: 40px;
          .icon {
            width: 36px;
            height: 36px;
            vertical-align: bottom;
            margin-right: 20px;
          }
          p {
            display: inline-block;
            font-size: 18px;
          }
          p:hover {
            cursor: pointer;
            text-decoration: underline;
            color: #b4a078;
          }
        }
      }
    }
  }
}
</style>