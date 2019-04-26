<template>
  <div>
    <van-swipe :autoplay="3000" v-if="show">
      <van-swipe-item v-for="(item,index) in banner" :key="index" @click="link(item)">
        <img v-lazy="item.ad_code" :key="item.ad_code" alt>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import getInfoApi from "@/api/getInfo";
export default {
  props: {
    position_id: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      banner: [
        {
          ad_code:'../../static/img/raw_1472383377.jpeg',
          ad_link:'javascript:;'
        },
        {
          ad_code:'../../static/img/raw_1473406264.png',
          ad_link:'javascript:;'
        }
      ],
      show:false,
    };
  },
  methods: {
    getBanner() {
      let params = {
        position_id: this.position_id
      };
      getInfoApi
        .getBanner(params)
        .then(res => {
          if(res.data.code===200){
            if(res.data.data.length){
              this.banner=res.data.data;
              this.show=true;
            }
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    link(item){
      location.href=item.ad_link;
    },
  },
  mounted() {
    this.getBanner();
  }
};
</script>

<style scoped lang="less">
img {
  height: 290px;
  width:100%;
}
</style>