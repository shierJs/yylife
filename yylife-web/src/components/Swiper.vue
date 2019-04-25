<template>
    <div>
        <div class="swiper-container" v-if="show">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(v,i) in banner" :key="i" @click="jump(v)">
                    <img :src="v.ad_code" alt="" v-bind:style="{height:h+'px'}">
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
import getInfoApi from "@/api/getInfo"
export default {
  props:{
    h:{
      type:Number,
      default:520
    },
    position_id:{
      type:Number,
      default:12
    }
  },
  data() {
    return {
      banner: [],
      show:false,
    };
  },
  methods: {
    jump(item) {
      if(item.ad_link == "" || item.ad_link == "javascript:;"){
        return;
      }else{
        window.open(item.ad_link, '_blank');
      }
    },
    getBanner(){
      let params={
        position_id:this.position_id
      }
      getInfoApi.getBanner(params).then(res=>{
        //;
        if(res.data.code===200&&res.data.data.length){
           this.banner=res.data.data;
           this.show=true;
        }else{
          this.show=false;
        }
      }).catch(err=>{
        this.$router.push('/notFound');
      })
    }
  },
  created(){
    this.getBanner();
  },
  updated(){
    this.$nextTick(function () {
      new Swiper(".swiper-container", {
        autoplay : 3000, //可选选项，自动滑动
        effect: "fade", //淡入淡出的切换效果
        pagination : '.swiper-pagination',
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        loop: true,
        observer:true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents:true, //修改swiper的父元素时，自动初始化swiper
      })
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
  left: 150px;
}
.swiper-container .swiper-button-next {
  display: none;
  background-image: url("../../static/img/icon/next.svg");
  width: 50px;
  height: 50px;
  background-size: 100% 100%;
  right: 150px;
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