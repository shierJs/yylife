<template>
  <div>
    <Head :title="title"></Head>
    <div id="main">
      <div class="register">
        <div class="card">
          <input type="number" placeholder="请输入手机号" v-model.number="account">
        </div>
        <div class="card">
          <input type="text" placeholder="请输入验证码" v-model="valCode">
          <img :src="src" alt @click="getValCode">
        </div>
        <div class="card">
          <input type="text" placeholder="请输入短信验证码" v-model="phoneCode">
          <p class="yanzheng" v-if="fade" @click="getPhoneCode">获取验证码</p>
          <p class="yanzheng" v-else>{{i}}秒后重发</p>
        </div>
        <div class="card">
          <input type="password" placeholder="请输入密码" v-model="pwd">
        </div>
        <div class="card">
          <input type="password" placeholder="请再次输入密码" v-model="pwdComfirm">
        </div>
        <p class="submit" @click="forget">确认</p>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
import { Toast } from "vant";
import { mapMutations } from "vuex";
import logApi from "@/api/log";
export default {
  data() {
    return {
      title: "忘记密码",
      fade: true,
      timer: null,
      account: "",
      valCode: "",
      phoneCode: "",
      pwdComfirm: "",
      i: 30,
      pwd: "",
      src: "/api/verify?t="
    };
  },
  methods: {
    getValCode() {
      let time = new Date().getTime();
      this.src="/api/verify?t=";
      this.src = this.src + time;
    },
    getPhoneCode() {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.account)) {
        Toast("请输入正确的手机号");
      } else {
        let params = {
          mobile: this.account,
          verify: this.valCode,
          type: "forget"
        };
        logApi
          .getCode(params)
          .then(res => {
            if (res.data.code == 10002) {
              this.valCode = "";
              Toast(res.data.msg);
              this.getValCode();
            } else {
              ;
            }
          })
          .catch(err => {
            this.$router.push('/notFound');
          });
        this.setTime();
        
      }
    },
    forget() {
      if (this.pwdComfirm === this.pwd) {
        let params = {
          mobile: this.account,
          password: this.pwd,
          passwordS: this.pwdComfirm,
          code: this.phoneCode
        };
        logApi
          .forget(params)
          .then(res => {
            ;
            if (res.data.code != 200) {
              Toast(res.data.msg);
            } else {
              Toast(res.data.msg);
              this.setUser({
                account: this.account,
                pwd: this.pwd
              });
              this.$router.push("/login");
            }
          })
          .catch(err => {
            this.$router.push('/notFound');
          });
      } else {
        Toast("确认密码错误，请重新输入");
        this.pwdComfirm = "";
      }
    },
    setTime() {
      if (this.i == 0) {
        this.fade = true;
        this.i = 30;
      } else {
        this.fade = false;
        this.i--;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setTime();
        }, 1000);
      }
    },
    ...mapMutations(["setUser"])
  },
  mounted() {
    this.getValCode();
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  .register {
    width: 80%;
    margin: 0 auto;
    margin-top: 118px;
    .card {
      width: 600px;
      height: 120px;
      display: flex;
      align-items: center;
      font-size: 28px;
      color: #000;
      border-bottom: 1px solid #5c5c5c;
      margin: 0 auto;
      input {
        padding-left: 12px;
      }
      img {
        height: 60px;
      }
      .yanzheng {
        font-size: 24px;
        color: #6c6c6c;
        border: 3px solid #c9c9c9;
        padding: 14px 20px;
      }
    }
    .submit {
      width: 450px;
      height: 73px;
      margin: 0 auto;
      border-radius: 8px;
      color: #fff;
      font-size: 28px;
      background: #20b6e3;
      text-align: center;
      line-height: 73px;
      margin-top: 58px;
    }
    .right {
      display: inline-block;
      font-size: 20px;
      color: #e4dfdf;
      height: 56px;
      line-height: 56px;
      margin-left: 10px;
    }
  }
}
</style>