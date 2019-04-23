<template>
  <div>
      <header id="head">
            <van-icon name="arrow-left" @click="edits" />
            <p class="title">编辑内容</p>
            <slot></slot>
        </header>
    <div id="main" v-show="show">
      <p class="tips">不能填写电话、QQ、微信等联系方式及特殊符号、性别歧视等内容</p>
      <div class="area">
        <textarea v-model="txt" cols="50" rows="10"></textarea>
        <p class="rcd">已输入<span :class="{num:txt.length>0}">{{txt.length}}</span>个字</p>
      </div>
      <p class="comfirm" @click="comfirm">完成</p>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
import { Toast,Icon } from "vant";
export default {
  data() {
    return {
      show: false,
      txt: ""
    };
  },
  methods: {
    comfirm() {
      if (this.txt == "") {
        Toast({
          message: "请输入内容",
          position: "bottom"
        });
      } else if (/^\s+|\s+$/g.test(this.txt)) {
        Toast({
          message: "内容不能为空",
          position: "bottom"
        });
      } else if (this.txt.length < 10) {
        Toast({
          message: "请输入至少超过10个字",
          position: "bottom"
        });
      } else {
        this.edits();
      }
    },
    edits() {
      this.$emit("edit", this.txt);
    }
  },
  mounted() {
    this.show = true;
  },
  components: {
    Head,
    [Icon.name]: Icon
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
    img {
      width: 40px;
    }
  }
}
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