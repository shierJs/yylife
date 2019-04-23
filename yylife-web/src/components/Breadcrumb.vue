<template>
  <div>
    <div class="breadcrumb">
      <span class="path" @click="$router.push('/')">首页</span>
      <i class="iconfont icon-arrow-r-copy"></i>
      <span class="path" @click="$router.push(data.path)">{{data.name}}</span>
      <i class="iconfont icon-arrow-r-copy"></i>
      <span class="current">{{data.now}}</span>
    </div>
  </div>
</template>

<script>

export default {
    props:{
      data:{
        type:Object,
      }
    },
};
</script>

<style scoped lang="less">
.breadcrumb {
  height: 50px;
  line-height: 50px;
  font-size: 0;
  color: #999;
  span,
  .iconfont {
    font-size: 12px;
  }
  .path {
    color: #333;
  }
  .path:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .iconfont {
    display: inline-block;
    margin: 0 8px;
  }
}
</style>