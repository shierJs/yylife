<template>
  <div>
    <Head title="支付密码设置"></Head>
    <div id="main">
      <div class="wrap" v-if="show">
        <!-- 密码输入框 -->
        <van-password-input :value="value" info="密码为 6 位数字" @focus="showKeyboard = true"/>
        <!-- 确认按钮 -->
        <van-button
          type="primary"
          style="width:96%;height:40px;font-size:16px;margin-left:7px;"
          @click="confirm"
        >下一步</van-button>
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
      <div class="verify" v-else>
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
        <p class="submit" @click="ok">确认支付密码</p>
        <span class="right">确认表示已同意《沂源生活使用协议》和《沂源生活隐私权条款》</span>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
import { mapState } from "vuex";
import setInfoApi from "@/api/setInfo";
import getInfoApi from "@/api/getInfo";
import logApi from "@/api/log";
import { Toast,Button } from "vant";
export default {
  data() {
    return {
      value: "",
      showKeyboard: true,
      show: true,
      account: "",
      valCode: "",
      phoneCode: "",
      src: "/api/verify?t=",
      fade: true,
      i:30,
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    confirm() {
      if (this.value != this.payPwd) {
        Toast("两次密码不一致请重新输入");
        this.value = "";
      } else {
        //...
        this.show = false;
      }
    },
    getValCode() {
      let time = new Date().getTime();
      this.src = "/api/verify?t=";
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
          type: "pay"
        };
        logApi
          .getCode(params)
          .then(res => {
            if (res.data.code == 10002) {
              ;
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
    ok() {
      if (this.account == "") {
        Toast("请输入验证手机号");
      } else if (this.valCode == "" || this.phoneCode == "") {
        Toast("请输入正确的验证码");
      } else {
        let data = {
          mobile: this.account,
          paypass: this.payPwd,
          paypassS: this.value,
          code: this.phoneCode
        };
        setInfoApi.changePayPass(data).then(res=>{
          ;
          if(res.data.code==200){
            Toast(res.data.msg);
            this.$router.push('/mine');
          }else if (res.data.code===10003){
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push('/login');
          }else {
            Toast(res.data.msg);
          }
        }).catch(err=>this.$router.push('/notFound'));
      }
    }
  },
  mounted() {
    this.getValCode();
  },
  computed: {
    ...mapState(["payPwd"])
  },
  components: {
    Head,
    [Button.name]:Button
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 300px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #efeff4;
  .verify {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    margin: 0 auto;
    padding-top: 300px;
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
      margin-left: 90px;
    }
  }
}
</style>