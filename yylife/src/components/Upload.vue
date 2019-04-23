<template>
    <div>
        <div class="upload">
            <div class="photo">
                <van-uploader :after-read="onRead" v-show="!imgSrc.length" :before-read="before">
                    <van-icon name="photograph" />
                </van-uploader>
                <p>拍个照吧</p>
            </div> 
            <img :src="imgSrc[0]" alt="">
            <span class="first" v-show="imgSrc.length!=0">首图</span>
        </div>
        <div class="imgList" v-show="imgSrc.length">
            <div class="wrap" v-for="(v,i) in imgSrc" :key="i">
                <van-icon name="close" @touchend.prevent="close(i)"/>
                <img :src="v" alt="" @click="preview(i)">
            </div>
            <van-uploader :after-read="onRead">
                <van-icon name="add-o" />
            </van-uploader>
        </div> 
    </div>
</template>

<script>
import { ImagePreview, Toast } from 'vant';
import { Icon } from "vant";
export default {
    props:{
        uploadImg:{
            type:Function,
        },
        imgList:{
            type:Array,
            default:[],
        },
    },
    data(){
        return {
            imgSrc:[],
            i:0,
            img:"",
        }
    },
    methods:{
        onRead(file){
            let data={
                file:file.content
            };
            this.uploadImg(data,this.imgSrc,this.send());
        },
        close(i){
            this.imgSrc.splice(i,1);
            this.send();
            //注意：操作数据后，html中imgsrc不能是v-lazy，否则页面不会重新渲染
        },
        preview(i){
            ImagePreview({
            images:this.imgSrc,
            startPosition: i,
            onClose() {
                // do something
            }
            });
        },
        send(){
            this.$emit('get',this.imgSrc);
        },
        before(){
            Toast("图片上传中");
            return true;
        }
    },
    watch:{
        imgList:{
            immediate:true,
            handler(val){
                if(val.length){
                    this.imgSrc=val;
                }
            }
        }
    },
    components:{
        [Icon.name]:Icon
    }
};
</script>

<style scoped lang="less">
.upload {
  width: 100%;
  height: 528px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  position: relative;
  img{
      height:100%;
      margin:0 auto;
      position: absolute;
      top:0;
      left:50%;
      transform: translateX(-50%);
  }
  .first{
      position: absolute;
      bottom:0;
      left:0;
      height:60px;
      width:100%;
      color:#fff;
      background: rgba(0, 0, 0,.6);
      font-size:26px;
      line-height: 60px;
      text-align: center;
  }
  .photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 206px;
    height: 206px;
    border-radius: 103px;
    background: #b5b5b5;
    p {
      font-size: 30px;
      color: #fff;
    }
  }
}
.imgList{
    padding-left:55px;
    padding-top:20px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    .wrap{
        position: relative;
        width:200px;
        height:150px;
        margin-right:20px;
        margin-bottom:20px;
        overflow: hidden;
        img{
        width:100%;
        }
    }
  }
</style>