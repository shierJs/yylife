<template>
  <div>
    <Head title="设置"></Head>
    <div id="main">
      <div class="setList">
        <div class="wrap" @click="$router.push('/resetPayPwd')">
          <div class="left">
            <p class="title">设置支付密码</p>
            <p class="desc">用于沂源生活在线支付</p>
          </div>
          <i class="iconfont icon-arrow-right"></i>
        </div>
        <div class="exit" @click="exit">
          <p>退出登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
export default {
  methods: {
    exit() {
      this.$dialog
        .confirm({
          title: "确认退出登录吗",
          message: "退出登录后就不能享有用户福利了哦"
        })
        .then(() => {
          this.defined.removeToken();
          this.$router.push("/");
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f6f6f6;
  padding-top: 120px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .setList {
    .wrap {
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      .left {
        .title {
          color: #333;
          font-size: 34px;
          font-weight: 500;
        }
        .desc {
          font-size: 26px;
          color: #bbb;
        }
      }
      .iconfont {
        font-size: 40px;
      }
    }
    .exit {
      width: 100%;
      height: 80px;
      background: #fff;
      line-height: 80px;
      margin-top: 40px;
      p {
        font-size: 34px;
        color: #333;
        text-align: center;
      }
    }
  }
}
</style>