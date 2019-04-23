<template>
    <div>
        <Head :title="title"></Head>
        <transition name="fade">
            <div id="main" v-show="show">
                <p class="tips">不能填写电话、QQ、微信等联系方式及特殊符号、性别歧视等内容</p>
                <div class="area">
                    <textarea v-model="txt" cols="50" rows="10"></textarea>
                    <p class="rcd">已输入<span :class="{num:txt.length>0}">{{txt.length}}</span>个字</p>
                </div>
                <p class="comfirm" @click="comfirm">完成</p>
            </div>
        </transition>
    </div>
</template>

<script>
import Head from "@/components/Head";
import { Toast } from "vant";
import {mapMutations,mapState} from 'vuex';
export default {
  data() {
    return {
      title: "详情描述",
      show: false,
      txt:"",
    };
  },
  methods: {
    comfirm() {
      if (this.txt == "") {
        this.setTxt(this.txt);
        this.$router.go(-1);
      } else if (/^\s+|\s+$/g.test(this.txt)) {
        Toast({
          message: "请输入详情描述",
          position: "bottom"
        });
      } else if(this.txt.length<10){
          Toast({
          message: "请输入至少超过10个字",
          position: "bottom"
        });
      }else {
        this.setTxt(this.txt);
        this.$router.go(-1);
      }
      
    },
    ...mapMutations(['setTxt']),
  },
  mounted() {
    this.show = true;
    this.txt=this.text;
  },
  computed:{
      text(){
          return this.$store.state.text
      }
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f1f1f1;
  padding: 90px 30px 695px;
  .tips {
    padding: 10px;
    font-size: 24px;
    color: #999;
    background: #ddd;
    border-radius: 10px;
    margin: 20px 0;
  }
  .area {
    position: relative;
    textarea {
      width: 100%;
      padding: 20px;
      font-size: 24px;
      color: #333;
    }
    .rcd {
      position: absolute;
      right: 30px;
      bottom: 30px;
      color: #aaa;
      .num {
        color: rgb(255, 38, 0);
      }
    }
  }
  .comfirm {
    width: 100%;
    height: 70px;
    margin-top: 30px;
    background: #ff704e;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30px;
    position: relative;
  }
}
</style>