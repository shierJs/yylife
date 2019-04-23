<template>
  <div>
    <div class="ad wrap" v-show="show">
      <img :src="img.ad_code" @click="link" alt>
      <i class="iconfont icon-guanbi" @click="close"></i>
    </div>
  </div>
</template>

<script>
import getInfoApi from "@/api/getInfo";
export default {
  data() {
    return {
      show: false,
      img:'',
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    getAd() {
      let params = {
        position_id: 14
      };
      getInfoApi
        .getBanner(params)
        .then(res => {
          //;
          if (res.data.code === 200 && res.data.data.length) {
              this.img=res.data.data[0];
            this.show = true;
          } else {
            this.show = false;
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    link(){
        location.href=img.ad_link;
    }
  },
  created(){
      this.getAd();
  }
};
</script>

<style scoped lang="less">
.ad {
  position: relative;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  .iconfont {
    position: absolute;
    top: -11px;
    right: 47px;
    cursor: pointer;
  }
}
</style>