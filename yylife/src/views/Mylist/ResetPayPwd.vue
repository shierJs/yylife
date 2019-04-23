<template>
  <div>
    <Head title="支付密码设置"></Head>
    <div id="main">
      <div class="wrap">
        <!-- 密码输入框 -->
        <van-password-input :value="value" info="密码为 6 位数字" @focus="showKeyboard = true"/>
        <!-- 确认按钮 -->
        <van-button type="primary" style="width:96%;height:40px;font-size:16px;margin-left:7px;" @click="next">下一步</van-button>
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
import { Toast } from 'vant';
import {mapMutations} from "vuex";
import { Button } from "vant";
export default {
  data() {
    return {
      value: "",
      showKeyboard: true
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    next(){
        if(this.value.length<6){
            Toast("支付密码为6位数字");
        }else{
            this.getPayPwd(this.value);
            this.$router.push('/confirmPayPwd');
        }
    },
    ...mapMutations(['getPayPwd'])
  },
  components: {
    Head,
    [Button.name]:Button
  }
};
</script>

<style scoped lang="less">
#main{
    padding-top:300px;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: #efeff4;
}
</style>