<template>
  <div>
    <!-- 登陆注册弹出层 -->
    <div class="model" v-show="showModel" @click="fade">
      <div class="card" @click.stop>
        <!-- 登录页 -->
        <div class="log" v-show="showLog">
          <p class="title">手机号登录</p>
          <div class="form">
            <form action method="post">
              <i-input placeholder="请输入您的手机号" clearable v-model.number="user.number" class="user">
                <i class="iconfont icon-shouji" slot="prefix"></i>
              </i-input>
              <i-input placeholder="请输入右侧验证码" v-model="user.val">
                <span slot="append" class="yanzhen">
                  <img :src="logSrc" alt @click="getValCode">
                </span>
              </i-input>
              <i-input placeholder="请输入您的密码" clearable type="password" v-model="user.pwd">
                <i class="iconfont icon-mima" slot="prefix"></i>
              </i-input>
              <p class="forget" @click="showForget=true;showLog=false;">忘记密码？</p>
              <p class="btn" @click="login">登录</p>
            </form>
          </div>
          <div class="weixin">
            <!-- <i class="iconfont icon-weixin1" @click="weChat"></i> -->
            <span @click="showReg=true;showLog=false;">没有账号？去注册</span>
          </div>
        </div>
        <!-- 登录页 -->
        <!-- 注册页 -->
        <div class="reg" v-show="showReg">
          <p class="title">手机号注册</p>
          <div class="form">
            <form action method="post">
              <i-input
                placeholder="请输入您的手机号"
                clearable
                v-model.number="regUser.number"
                class="user"
              >
                <i class="iconfont icon-shouji" slot="prefix"></i>
              </i-input>
              <i-input placeholder="请右侧的验证码" v-model="regUser.val">
                <span slot="append" class="yanzhen">
                  <img :src="regSrc" alt @click="ReggetValCode">
                </span>
              </i-input>
              <i-input placeholder="请输入您的验证码" v-model.number="regUser.code">
                <span slot="append" @click="getCode" v-show="!showYan">获取验证码</span>
                <span slot="append" v-show="showYan">{{sec}}秒后重发</span>
              </i-input>
              <i-input placeholder="请输入您的密码" clearable type="password" v-model="regUser.pwd">
                <i class="iconfont icon-mima" slot="prefix"></i>
              </i-input>
              <i-input placeholder="请确认您的密码" clearable type="password" v-model="regUser.pwdS">
                <i class="iconfont icon-mima" slot="prefix"></i>
              </i-input>
              <p class="btn" @click="register">注册</p>
            </form>
          </div>
          <div class="weixin">
            <!-- <i class="iconfont icon-weixin1"></i> -->
            <span @click="showReg=false;showLog=true;">直接登录</span>
          </div>
        </div>
        <!-- 注册页 -->
        <!-- 忘记密码 -->
        <div class="forget" v-show="showForget">
          <p class="title">密码重置</p>
          <div class="form">
            <form action method="post">
              <i-input placeholder="请输入您的手机号" clearable v-model.number="forget.number" class="user">
                <i class="iconfont icon-shouji" slot="prefix"></i>
              </i-input>
              <i-input placeholder="请右侧的验证码" v-model="forget.val">
                <span slot="append" class="yanzhen">
                  <img :src="regSrc" alt @click="getValCode">
                </span>
              </i-input>
              <i-input placeholder="请输入您的验证码" v-model.number="forget.code">
                <span slot="append" @click="getForgetCode" v-show="!showYan">获取验证码</span>
                <span slot="append" v-show="showYan">{{sec}}秒后重发</span>
              </i-input>
              <i-input placeholder="请输入您的密码" clearable type="password" v-model="forget.pwd">
                <i class="iconfont icon-mima" slot="prefix"></i>
              </i-input>
              <i-input placeholder="请确认您的密码" clearable type="password" v-model="forget.pwdS">
                <i class="iconfont icon-mima" slot="prefix"></i>
              </i-input>
              <p class="btn" @click="resetPwd">确认</p>
            </form>
          </div>
        </div>
        <!-- 忘记密码 -->
        <div id="wechat-container" v-show="showWeChat">
          
        </div>
      </div>
    </div>
    <!-- 登陆注册弹出层 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import logApi from "@/api/log";
export default {
  data() {
    return {
      showLog: true,//显示登录
      showReg: false,//显示注册
      showYan: false,//显示验证码
      timer: null,
      loading: false,//
      showForget: false,
      showWeChat:false,
      sec: 30,
      user: {
        number: "",
        pwd: "",
        code: ""
      },
      regUser: {
        number: "",
        val: "",
        pwd: "",
        code: "",
        pwdS: ""
      },
      forget: {
        number: "",
        val: "",
        pwd: "",
        code: "",
        pwdS: ""
      },
      onOff: true,
      logSrc: "/api/verifyApi/",
      regSrc: "/api/verifyApi/12"
    };
  },
  methods: {
    getValCode() {
      let time = new Date().getTime();
      this.logSrc="/api/verifyApi?t=",
      this.logSrc = this.logSrc + time;
    },
    ReggetValCode() {
      let time = new Date().getTime();
      this.regSrc = "/api/verifyApi?t=1";
      this.regSrc = this.regSrc + time;
    },
    fade() {
      this.fadeLogReg();
      this.user={
        number: "",
        pwd: "",
        code: ""
      };
      this.regUser= {
        number: "",
        val: "",
        pwd: "",
        code: "",
        pwdS: ""
      };
      this.forget={
        number: "",
        val: "",
        pwd: "",
        code: "",
        pwdS: ""
      };
      clearTimeout(this.timer);
    },
    login() {
      //登录
      if (this.user.number == "") {
        this.$Message.error("请输入手机号");
      } else if (this.user.val == "") {
        this.$Message.error("请输入验证码");
      } else if (this.user.pwd == "") {
        this.$Message.error("请输入密码");
      } else {
        let params = {
          mobile: this.user.number,
          password: this.user.pwd,
          verify: this.user.val
        };
        this.$Loading.start();
        logApi
          .login(params)
          .then(res => {
            if (res.data.code != 200) {
              this.$Message.info(res.data.msg);
              this.getValCode();
              this.user.val="";
              this.$Loading.finish();
            } else {
              this.$Message.info(res.data.msg);
              this.fadeLogReg();
              this.defined.setAtoken(res.data.data.access_token);
              this.defined.setRtoken(res.data.data.refresh_token);
              let webToken = JSON.stringify(res.data.data);
              localStorage.setItem("webToken", webToken);
              this.$Loading.finish();
              this.$router.go(0);
            }
          })
          .catch(err => {
            this.$Loading.error();
            this.$router.push('/notFound');
          });
      }
    },
    register() {
      //注册
      if (this.regUser.user == "") {
        this.$Message.error("请输入用户名");
      } else if (this.regUser.pwd == "") {
        this.$Message.error("请输入密码");
      } else if (this.regUser.pwd != this.regUser.pwdS) {
        this.$Message.error("两次密码不一致，请重新输入");
      } else {
        let params = {
          mobile: this.regUser.number,
          password: this.regUser.pwd,
          passwordS: this.regUser.pwdS,
          code: this.regUser.code,
          verify: this.regUser.val,
          reg_type: 4
        };
        logApi
          .register(params)
          .then(res => {
            if (res.data.code != 200) {
              this.$Message.info(res.data.msg);
              this.ReggetValCode();
            } else {
              this.$Message.info(res.data.msg);
              ;
              this.user = this.regUser;
              this.showLog = true;
              this.showReg = false;
            }
          })
          .catch(err => {
            this.$router.push('/notFound');
          });
      }
    },
    resetPwd() {
      //忘记密码
      if (this.forget.pwdS === this.forget.pwd) {
        let params = {
          mobile: this.forget.number,
          password: this.forget.pwd,
          passwordS: this.forget.pwdS,
          code: this.forget.code
        };
        logApi
          .forget(params)
          .then(res => {
            ;
            if (res.data.code != 200) {
              this.$Message.info(res.data.msg);
              this.ReggetValCode();
            } else {
              this.$Message.info(res.data.msg);
              this.user = this.forget;
              this.showLog = true;
              this.showForget = false;
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
    getCode() {
      //获取手机验证码
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.regUser.number == "") {
        this.$Message.error("请输入手机号");
      } else if (!myreg.test(this.regUser.number)) {
        this.$Message.error("请输入正确的手机号");
        this.regUser.number = "";
      } else if (this.regUser.val == "") {
        this.$Message.error("请输入验证码");
      } else {
        let params = {
          mobile: this.regUser.number,
          verify: this.regUser.val,
          type: "register"
        };
        logApi
          .getCode(params)
          .then(res => {
            if(res.data.code === 200){
              this.setTime();
            }else{
              this.$Message.info(res.data.msg);
              this.ReggetValCode();
            }
          })
          .catch(err => {});
      }
    },
    getForgetCode() {
      //忘记密码的手机号验证码
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.forget.number == "") {
        this.$Message.error("请输入手机号");
      } else if (!myreg.test(this.forget.number)) {
        this.$Message.error("请输入正确的手机号");
        this.forget.number = "";
      } else if (this.forget.val == "") {
        this.$Message.error("请输入验证码");
      } else {
        let params = {
          mobile: this.forget.number,
          verify: this.forget.val,
          type: "forget"
        };
        logApi
          .getCode(params)
          .then(res => {
            this.setTime();
          })
          .catch(err => {});
      }
    },
    setTime() {
      //倒计时
      if (this.sec == 0) {
        this.showYan = false;
        this.sec = 30;
      } else {
        this.showYan = true;
        this.sec--;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setTime();
        }, 1000);
      }
    },
    weChat(){
      
      //微信登录，未完成
      // this.showWeChat=true;
      // this.showLog=false;
      // this.showReg=false;
      //  var obj = new WxLogin({
      //   self_redirect:false,
      //   id:"wechat-container", 
      //   appid: "wx31fcb28d7ed2af22", 
      //   scope: "snsapi_login", 
      //   redirect_uri: encodeURIComponent("http://"+window.location.host+"/"),
      //   state: Math.ceil(Math.random()*1000),
      //   style: "white",
      //   href: ""
      //   });
    },
    ...mapMutations(["fadeLogReg"])
  },
  mounted() {
    this.getValCode();
  },
  beforeDestroy(){
    clearTimeout(this.timer);
  },
  computed: {
    showModel() {
      return this.$store.state.showLog;
    }
  },
  watch: {
    showModel() {
      if (!this.showModel) {
        this.showForget = false;
        this.showLog = true;
        this.showReg = false;
        this.showWeChat=false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.model {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  .card {
    width: 380px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .log,
    .reg,
    .forget {
      padding: 0 50px;
      .title {
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
      .form {
        padding-bottom: 60px;
        .forget {
          font-size: 14px;
          margin-bottom: 10px;
          text-align: right;
          color: #666;
        }
        .forget:hover {
          cursor: pointer;
          color: #333;
          text-decoration: underline;
        }
        .btn {
          height: 38px;
          line-height: 38px;
          font-size: 16px;
          text-align: center;
          color: #fff;
          background: #b4a078;
          border-radius: 4px;
          cursor: pointer;
          margin: 0;
        }
        .btn:hover {
          background: #d3c19e;
        }
        .yanzhen {
          display: inline-block;
          img {
            height: 27px;
          }
        }
      }
      .weixin {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 45px;
        background: #f4f4f4;
        font-size: 16px;
        text-align: center;
        color: #ccc;
        .iconfont {
          margin-right: 120px;
          font-size: 30px;
          vertical-align: middle;
        }
        .iconfont:hover {
          color: #25be03;
          cursor: pointer;
        }
        span{
          line-height:45px;
        }
        span:hover {
          color: #999;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
</style>