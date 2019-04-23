<template>
    <div>
        <header id="head">
            <van-icon name="arrow-left" @click="$router.go(-1)" />
            <p class="title">{{title}}</p>
            <slot></slot>
        </header>
    </div>
</template>

<script>
import { Icon } from "vant";
export default {
  props: {
    title: {
      type: String,
      default: "我是标题"
    }
  },
  components:{
    [Icon.name]:Icon,
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
</style>