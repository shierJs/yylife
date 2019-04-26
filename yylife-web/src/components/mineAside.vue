<template>
  <div>
    <div id="aside-mine">
      <ul class="aside-list">
        <li class="title">
          <span>个人中心</span>
        </li>
        <li
          class="item"
          v-for="(item,index) in asideList"
          :key="index"
          :class="{active:index==i}"
          @click="change(index)"
        >
          <router-link :to="{name:item.path}" class="link">{{item.aside_name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      asideList: [
        {
          aside_name: "我的账号",
          path: "mineIndex"
        },
        // {
        //   aside_name: "消息通知",
        //   path: "news"
        // },
        {
          aside_name: "账户管理",
          path: "setUser"
        },
        {
          aside_name: "我的收藏",
          path: "collection"
        },
        {
          aside_name: "我的订单",
          path: "order"
        },
        {
          aside_name: "我的发布",
          path: "myRelease"
        },
        {
          aside_name: "我的积分",
          path: "integral"
        },
        {
          aside_name: "地址管理",
          path: "address"
        },
        // {
        //   aside_name: "优惠券",
        //   path: "coupons"
        // },
        {
          aside_name: "帮助中心",
          path: "Help"
        },
      ],
      i: 0
    };
  },
  methods: {
    change(i) {
      this.i = i;
      let aside_name = this.asideList[i].aside_name;
      this.$emit("setbread", aside_name);
      sessionStorage.setItem("asideName", aside_name);
      sessionStorage.setItem("asidei", i);
    },
    toPath() {
      this.change(this.index);
      let path = this.asideList[this.index].path;
      if(path == ""){
        path="mineIndex"
      }
      this.$router.push({
        path: `/mine/${this.index}/${path}`
      });
    }
  },
  created() {
    this.toPath();
  },
  mounted() {
    let i = sessionStorage.getItem("asidei");
    if (!i) {
      this.i = 0;
    } else {
      this.i = parseInt(i);
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem("asidei");
  }
};
</script>

<style scoped lang="less">
#aside-mine {
  background: #fff;
  margin-top: 20px;
  width: 180px;
  padding: 30px 0;
  border: 1px solid #ddd;
  .aside-list {
    .title {
      font-size: 16px;
      color: #333;
      font-weight: 600;
      line-height: 40px;
      margin-left: 40px;
    }
    .item {
      line-height: 40px;
      border-left: 3px solid transparent;
      .link {
        font-size: 14px;
        color: #666;
        width: 100%;
        height: 100%;
        display: block;
        padding-left: 37px;
      }
    }
    .item:hover .link {
      cursor: pointer;
      color: #b4a078;
    }
    .active {
      .link {
        color: #b4a078;
      }
      cursor: pointer;
      border-color: #b4a078;
    }
  }
}
</style>