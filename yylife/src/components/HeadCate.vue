<template>
    <div>
        <header id="head">
            <div class="arrow" @click="back">
                <img src="../../static/img/icon/arrow_left.png" alt="">
            </div>
            <div class="search" @click="$router.push(push)">
               <i class="el-icon-search"></i>
               <span>{{placeholder}}</span>
           </div>
           <p class="release" @click="$router.push(release)">发布消息</p>
        </header>
    </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "输入商家、分类或商圈"
    },
    push:{
      type:String,
      default:"/search/0"
    },
    release:{
      type:String,
      default:"/release"
    },
  },
  methods: {
    back() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped lang="less">
#head {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #d4d2d4;
  position: fixed;
  padding: 0 40px;
  justify-content: space-between;
  top: 0;
  left: 0;
  z-index: 10;
  color: #06c1ae;
  .arrow {
    width: 50px;
    height: 100%;
    img {
      width:50px;
      margin-top:20px;
    }
  }
  .search {
    width: 60%;
    height: 60px;
    background: #eee;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    .el-icon-search {
      padding-right: 20px;
    }
    span {
      color: #999;
    }
  }
}
</style>