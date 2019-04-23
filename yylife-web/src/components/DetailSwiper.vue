<template>
    <div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(v,i) in banners" :key="i">
                    <img :src="v.img" alt="">
                </div>
            </div>
            <div class="swiper-button-prev"></div><!--左箭头-->
            <div class="swiper-button-next"></div><!--右箭头-->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
  props:{
    h:{
      type:Number,
      default:520
    },
    banners:{
      type:Array
    }
  },
  mounted(){
   var that=this;
    new Swiper(".swiper-container", {
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      autoplay: 3000, //可选选项，自动滑动
      pagination : '.swiper-pagination',
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
    });
    $('.swiper-container .swiper-slide img').css({
      height:that.h
    })
  }
};
</script>

<style scoped lang="less">
.swiper-container .swiper-slide img {
  width: 100%;
}
.swiper-container .swiper-button-prev {
  display: none;
  background-image: url("../../static/img/icon/prev.svg");
  width: 50px;
  height: 50px;
  background-size: 100% 100%;
  left:20px;
}
.swiper-container .swiper-button-next {
  display: none;
  background-image: url("../../static/img/icon/next.svg");
  width: 50px;
  height: 50px;
  background-size: 100% 100%;
  right: 20px;
}
.swiper-container .swiper-button-prev:hover {
  background-image: url("../../static/img/icon/prev-in-copy.svg");
}
.swiper-container .swiper-button-next:hover {
  background-image: url("../../static/img/icon/next-in-copy.svg");
}
.swiper-container:hover .swiper-button-prev{
  display: block;
}
.swiper-container:hover .swiper-button-next{
  display: block;
}
</style>