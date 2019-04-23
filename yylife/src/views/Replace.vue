<template>
  <div>
    <div id="replace">
      <div class="show">
        <img src="/static/img/logo512.png" alt>
        <span>请在移动设备打开</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  },
  mounted() {
    if (this._isMobile()) {
      this.$router.go(-1);
    } else {
      return;
    }
  }
};
</script>

<style scoped lang="less">
#replace {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .show {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 600px;
      height: 600px;
    }
    span {
      font-size: 60px;
      color: #666;
      line-height: 200px;
    }
  }
}
</style>