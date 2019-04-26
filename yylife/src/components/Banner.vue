<template>
  <div class="swiper-container" v-if="show">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(v,i) in banner" :key="i">
        <img v-lazy="v.ad_code" :key="v.ad_code" @click="link(v)" alt>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import getInfoApi from "@/api/getInfo";
export default {
  data() {
    return {
      banner: [
        {
          ad_code: "../../static/img/raw_1472383377.jpeg",
          ad_link: "javascript:;"
        },
        {
          ad_code: "../../static/img/raw_1473406264.png",
          ad_link: "javascript:;"
        }
      ],
      show: false
    };
  },
  methods: {
    getBanner() {
      let params = {
        position_id: 1
      };
      getInfoApi
        .getBanner(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.banner = res.data.data;
              this.show = true;
            }
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    link(item) {
      location.href = item.ad_link;
    }
  },
  mounted() {
    this.getBanner();
  },
  updated() {
    this.$nextTick(function() {
      new Swiper(".swiper-container", {
        autoplay: {
			delay: 3000,//1秒切换一次
		}, //可选选项，自动滑动
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    });
  }
};
</script>

<style lang="less" scoped>
.swiper-container .swiper-slide img {
  width: 100%;
  height: 290px;
}
</style>