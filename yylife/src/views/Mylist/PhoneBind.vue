<template>
  <div>
    <Head :title="title"></Head>
    <transition name="fade2">
      <div id="main" v-show="show">
        <div class="form">
          <div class="card">
            <p class="title">手机号码：</p>
            <p>15056222824</p>
          </div>
          <div class="card">
            <p class="title">用户名：</p>
            <input type="text" placeholder="请输入您的用户名" class="phone" v-model="user">
          </div>
          <div class="card">
            <p class="title">邮箱：</p>
            <input type="email" placeholder="请输入您的常用邮箱" class="phone" v-model="email">
          </div>
          <div class="card">
            <p class="title">性别：</p>
            <div>
              <el-radio v-model="gender" label="0">男</el-radio>
              <el-radio v-model="gender" label="1">女</el-radio>
            </div>
          </div>
          <div class="info-btn">
            <el-button type="warning" round @click="submit">确认完成</el-button>
            <el-button type="danger" style="margin-top:20px;margin-left:0;">退出登录</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head";
export default {
  data() {
    return {
      title: "个人信息",
      show: false,
      fade: true,
      birthday: "",
      user:"",
      email:"",
      calendar: false,
      gender: "0"
    };
  },
  methods: {
    submit() {
      alert("提交事件");
    }
  },
  mounted() {
    this.show = true;
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  background: #f1f1f1;
  width: 100%;
  .form {
    margin-top: 20px;
    width: 100%;
    background: #fff;
    .card {
      height: 106px;
      display: flex;
      align-items: center;
      padding: 0 40px;
      color: #505050;
      border-bottom: 1px solid #e9e9e9;
      position: relative;
      justify-content: space-between;
      .title {
        font-size: 24px;
        margin-right: 30px;
      }
      .info {
        font-size: 22px;
      }
      .bind {
        position: absolute;
        right: 40px;
        display: flex;
        align-items: center;
      }
      .phone {
        text-align: right;
        position: absolute;
        right: 40px;
      }
      .operation {
        position: absolute;
        right: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          font-size: 22px;
          padding: 12px 20px;
          border: 1px solid #bbb;
          border-radius: 20px;
          color: #bbb;
        }
        .get {
          border-color: #ff8d1b;
          color: #ff8d1b;
        }
      }
    }
    .info-btn {
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>