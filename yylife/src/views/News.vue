<template>
  <div>
    <transition name="fade2">
      <div class="news" v-show="show">
        <van-nav-bar title="消息" left-arrow @click-left="onClickLeft"/>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="card" v-for="(v,index) in data" :key="index">
            <img :src="v.imgSrc" alt>
            <div class="info">
              <p class="title">{{v.title}}</p>
              <p class="content">{{v.content}}</p>
            </div>
            <p class="date">{{v.time}}</p>
          </div>
        </van-pull-refresh>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      count: 0,
      show: false,
      data: [
        {
          imgSrc: "../../static/img/icon/icon35.png",
          title: "第一条标题",
          content:
            "我是第一条消息的desc内容我收到你发ns示范点副书记士大夫士大夫速度...",
          time: "今天：16：45"
        },
        {
          imgSrc: "../../static/img/icon/pet.png",
          title: "第二条标题",
          content: "我是第二条消息的desc内容我收到你发ns示范点副书记",
          time: "17-10-26"
        },
        {
          imgSrc: "../../static/img/icon/icon35.png",
          title: "第一条标题",
          content:
            "我是第一条消息的desc内容我收到你发ns示范点副书记士大夫士大夫速度...",
          time: "今天：16：45"
        },
        {
          imgSrc: "../../static/img/icon/pet.png",
          title: "第二条标题",
          content: "我是第二条消息的desc内容我收到你发ns示范点副书记",
          time: "17-10-26"
        }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onRefresh() {
      this.$toast("刷新成功");
      this.isLoading = false;
      this.data = this.data.slice(0, 3);
    }
  },
  mounted() {
    this.show = true;
  }
};
</script>

<style scoped lang="less">
.card {
  height: 154px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  position: relative;
  background: #fff;
  img {
    width: 80px;
    border-radius: 40px;
  }
  div.info {
    padding-left: 40px;
    width: 496px;
    .title {
      margin-bottom: 20px;
    }
    .content {
      color: #676767;
      font-size: 20px;
    }
  }
  .date {
    position: absolute;
    right: 40px;
    top: 30px;
    color: #676767;
    font-size: 20px;
  }
}
</style>