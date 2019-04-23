<template>
  <div>
    <header id="head">
      <van-icon name="arrow-left" @click="$router.push('/')"/>
      <p class="title">登录</p>
      <slot></slot>
    </header>
    <div id="main">
      <h1 class="logo">
        <img src="/static/img/logo300.png" alt>
      </h1>
      <form class="form">
        <div class="card">
          <input type="number" placeholder="手机号" v-model="user.account">
        </div>
        <div class="card">
          <input
            type="password"
            placeholder="密码"
            v-model="user.pwd"
            autocomplete="current-password"
          >
        </div>
        <div class="card">
          <input type="text" placeholder="请输入验证码" v-model="valCode">
          <img :src="src" alt class="yanzhen" @click="getValCode">
        </div>
        <p class="login" @click="login">登录</p>
        <div class="bottom">
          <span @click="$router.push('/register/0')">注册</span>
          <span @click="$router.push('/forget')">忘记密码?</span>
        </div>
      </form>
      <!-- <div class="other">
        <div class="top">
          <p class="line"></p>
          <p class="title">其他登陆方式</p>
          <p class="line"></p>
        </div>
        <div class="weixin">
          <img src="/static/img/weixin.png" alt>
          <span>微信</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
import { mapState, mapMutations } from "vuex";
import logApi from "@/api/log";
import { Toast,Icon } from "vant";
export default {
  data() {
    return {
      user: {
        account: "",
        pwd: ""
      },
      valCode: "", //验证码
      src: "/api/verify?t="
    };
  },
  mounted() {
    this.getValCode();
    let tokens=localStorage.getItem('tokens');
    if(!tokens){
      if (!this.userData) {
        return;
      } else {
        this.user = this.userData;
      }
    }else{
      this.$router.push('/');
    }
    
  },
  methods: {
    login() {
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (this.user.account == "") {
          Toast("用户名不能为空！");
        } else if (!myreg.test(this.user.account)) {
          Toast("请输入正确的手机号");
        } else if (this.valCode===""){
          Toast("请输入验证码");
        }else {
          let params={
            mobile:this.user.account,
            password:this.user.pwd,
            verify:this.valCode
          };
          console.log(params);
          logApi.login(params).then(res=>{
            if(res.data.code!=200){
              Toast(res.data.msg);
            }else{
              console.log(res.data.data);
              Toast(res.data.msg);
              ;
              this.defined.setAtoken(res.data.data.access_token);
              this.defined.setRtoken(res.data.data.refresh_token);
              let tokens=JSON.stringify(res.data.data);
              localStorage.setItem("tokens",tokens);
              this.$router.go(0);
            }
          }).catch(err=>{
            this.$router.push('/notFound');
          })
        }
      
    },
    getValCode() {
      let time = new Date().getTime();
      this.src="/api/verify?t=";
      this.src = this.src + time;
    },
    ...mapMutations(["setToken", "setUser"])
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    }
  },
  components: {
    Head,
    [Icon.name]:Icon
  }
};
</script>

<style scoped lang="less">
#head {
  height: 90px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 40px;
  justify-content: space-between;
  font-size: 30px;
  background: #fff;
  z-index: 200;
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 180px;
    img {
      width: 40px;
    }
  }
}
#main {
  padding-top: 90px;
  h1.logo {
    margin-top: 88px;
    margin-bottom: 130px;
    img {
      margin: 0 auto;
      height: 200px;
    }
  }
  .form {
    width: 600px;
    margin: 0 auto;
    .card {
      margin: 0 auto;
      width: 600px;
      height: 100px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #d3d3d3;
      font-size: 28px;
      color: #000;
      position: relative;
      input {
        padding-left: 68px;
      }
      .yanzhen {
        position: absolute;
        right: 0;
        height: 60px;
      }
    }
    .login {
      width: 416px;
      height: 73px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 28px;
      background: #20b6e3;
      margin: 0 auto;
      margin-top: 40px;
    }
    .bottom {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      font-size: 24px;
      color: #6c6c6c;
      margin-top: 45px;
    }
  }
  .other {
    width: 340px;
    margin: 0 auto;
    margin-top: 140px;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-size: 26px;
        color: #c4c4c4;
      }
      .line {
        height: 2px;
        width: 90px;
        background: #c4c4c4;
      }
    }
    .weixin {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 57px;
      img{
        width: 80px;
      }
      span {
        display: block;
        margin-top: 16px;
        font-size: 24px;
        color: #c3c3c3;
      }
    }
  }
}
</style>