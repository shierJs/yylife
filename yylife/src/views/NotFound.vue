<template>
  <div>
    <div class="head">
      <p>页面加载失败</p>
    </div>
    <div class="main">
      <div class="wrap">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-error"></use>
        </svg>
        <p class="tip">数据加载失败，请重试</p>
        <p class="btn" @click="refresh">重新加载</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
      refresh(){
          this.$router.push('/');
      }
  }
};
</script>

<style scoped lang="less">
.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom: 1px solid #ccc;
  z-index: 10;
  p {
    font-size: 36px;
  }
}
.main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f6f6f6;
  padding-top: 290px;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tip {
      font-size: 30px;
      margin: 50px 0;
      text-align: center;
    }
    .btn {
      font-size: 30px;
      border: 2px solid #aaa;
      padding: 10px 40px;
      border-radius: 10px;
      display: inline-block;
    }
  }
}
</style>