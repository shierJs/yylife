<template>
  <div>
    <Head :title="title"></Head>
    <transition name="fade">
      <div id="main" v-show="show">
        <div class="bottom">
          <div class="form">
            <div class="card">
              <span class="label">举报人姓名</span>
              <input type="text" placeholder="请输入举报人姓名" v-model="username">
            </div>
            <div class="card">
              <span class="label">反馈邮箱&emsp;</span>
              <input type="email" placeholder="请输入您的邮箱" v-model="email">
            </div>
            <div class="area">
              <p class="label">说明或描述</p>
              <textarea cols="50" rows="4" placeholder="请输入说明文字" v-model="desc"></textarea>
            </div>
            <div class="upload">
              <p class="label">图片上传</p>
              <div class="imgList">
                <div class="wrap" v-for="(v,i) in imgSrc" :key="i">
                  <van-icon name="close" @touchend.prevent="close(i)"/>
                  <img :src="v" alt @click="preview(i)">
                </div>
                <van-uploader :after-read="onRead">
                  <van-icon name="add-o"/>
                </van-uploader>
              </div>
            </div>
            <div class="submit">
              <p class="btn" @click="submit">提交</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head";
import setInfoApi from "@/api/setInfo";
import { Toast,Icon } from "vant";
export default {
  data() {
    return {
      title: "用户举报",
      show: false,
      imgSrc: [],
      username:"",
      email:"",
      desc:"",
      type:"",
      feed_id:"",
    };
  },
  methods: {
    onRead(file) {
      let data={
        file:file.content
      };
      Toast("正在上传中...");
      setInfoApi.reportImg(data).then(res=>{
        ;
        if(res.data.code===200){
          Toast("图片上传成功");
          this.imgSrc.push(res.data.src);
        }
      }).catch(err=>this.$router.push('/notFound'));
    },
    close(i) {
      this.imgSrc.splice(i, 1);
      //注意：操作数据后，html中imgsrc不能是v-lazy，否则页面不会重新渲染
    },
    preview(i) {
      ImagePreview({
        images: this.imgSrc,
        startPosition: i,
        onClose() {
          // do something
        }
      });
    },
    submit(){
      if(this.username==""){
        Toast("请输入举报人的姓名");
      }else if (this.desc==""){
        Toast("请填写举报的原因");
      }else {
        let data={
          type:this.type,
          feed_id:this.feed_id,
          username:this.username,
          content:this.desc,
          email:this.email,
          img:this.imgSrc,
        };
        setInfoApi.report(data).then(res=>{
          ;
          if(res.data.code===200){
            Toast(res.data.msg);
          }else if(res.data.code===10003){
            Toast(res.data.msg);
            this.defined.removeToken();
          }else{
            Toast(res.data.msg);
          }
        }).catch(err=>this.$router.push('/notFound'));
      }
    },
  },
  mounted() {
    this.show = true;
    this.type=parseInt(this.$route.params.id1);
    this.feed_id=parseInt(this.$route.params.id2);
  },
  components: {
    Head,
    [Icon.name]:Icon
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;

  .top {
    padding: 30px 40px;
    border-top: 1px solid #e0e0e0;
    border-bottom: 24px solid #d9d9d9;
    span.title {
      font-size: 24px;
      color: #515151;
      margin-bottom: 25px;
      display: inline-block;
    }
    div.wrap {
      p.title {
        font-size: 30px;
        color: #5c5c5c;
      }
      .tags {
        margin-top: 12px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .tag {
          padding: 8px 15px;
          background: #e5e5e5;
          color: #393939;
          margin-right: 15px;
          margin-bottom: 20px;
        }
        .active {
          background: #eec5c5;
          color: #ff5734;
        }
      }
    }
  }
  .bottom {
    padding-top: 20px;
    .title {
      padding-left: 40px;
      color: #a6a6a6;
      font-size: 24px;
      margin-bottom: 52px;
    }
    .form {
      .card {
        padding: 0 30px;
        border-bottom: 1px solid #aaa;
        height: 92px;
        display: flex;
        align-items: center;
        input {
          font-size: 28px;
        }
        .label {
          font-size: 28px;
          color: #515151;
          margin-right: 44px;
        }
      }
      .area {
        padding: 0 26px;
        border-bottom: 1px solid #aaa;
        .label {
          height: 120px;
          line-height: 120px;
          font-size: 28px;
          color: #515151;
        }
        textarea {
          font-size: 28px;
        }
      }
      .upload {
        padding: 10px 26px;
        border-bottom: 1px solid #aaa;
        .label {
          height: 120px;
          line-height: 120px;
          font-size: 28px;
          color: #515151;
        }
        .imgList {
          background: #fff;
          display: flex;
          flex-wrap: wrap;
          .wrap {
            position: relative;
            width: 168px;
            height: 136px;
            margin-right: 20px;
            margin-bottom: 20px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }
      }
      .submit {
        padding: 0 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 156px;
        .btn {
          width: 670px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          color: #fff;
          background: #ff5733;
        }
      }
    }
  }
}
</style>