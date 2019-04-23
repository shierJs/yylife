<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <div class="breadcrumb">
          <router-link to="/" class="link">首页</router-link>
          <i class="iconfont icon-arrow-r-copy"></i>
          <span>友情链接</span>
        </div>
        <div class="wrapper">
          <div class="links" v-show="show">
            <h2 class="title">友情链接</h2>
            <ul class="list">
              <li v-for="(item,index) in list" :key="index">
                <a :href="item.url" target="_blank">{{item.name}}</a>
              </li>
            </ul>
          </div>
          <div class="application">
            <h2 class="title">申请友情链接</h2>
            <div class="section clear">
              <div class="note fl">
                <p class="title">友情链接申请说明：</p>
                <ol>
                  <li>1.欢迎生活类网站、电商导购类网站或其他类型相关网站与本站交换友链</li>
                  <li>2.交换首页要求PR（网站等级排名）≥4</li>
                  <li>3.请先在贵站做好网易严选的友情链接
                    <br>&emsp;链接文字：沂源生活
                    <br>&emsp;链接地址：you.163.com/?from=web_in_yl
                  </li>
                  <li>4.做好链接后，请在右侧填写申请信息，目前严选只支持文字链接</li>
                  <li>5.已开通本站友链且内容健康，符合本站友链要求的网站，经严选管理员审核后将显示在此友链页面</li>
                </ol>
              </div>
              <div class="form fl">
                <p class="title">申请信息：</p>
                <div class="formlist">
                  <div class="item">
                    <span class="label">网站名称</span>
                    <input type="text" v-model="form.name" placeholder="不超过20个字">
                  </div>
                  <div class="item">
                    <span class="label">网址&emsp;&emsp;</span>
                    <input type="text" v-model="form.url" placeholder="https://">
                  </div>
                  <div class="item">
                    <span class="label">联系邮箱</span>
                    <input type="email" v-model="form.email" placeholder="建议填写企业邮箱">
                  </div>
                  <div class="item">
                    <span class="label txtarea">网站介绍</span>
                    <textarea v-model="form.details" cols="30" rows="6"></textarea>
                  </div>
                  <p class="submit" @click="submit">提交</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      show: false,
      list: [
        {
          name: "百度一下",
          url: "http://www.baidu.com"
        },
        {
          name: "新浪微博",
          url: "https://weibo.com"
        },
        {
          name: "网易严选",
          url: "http://you.163.com"
        },
        {
          name: "lol官网",
          url: "https://lol.qq.com"
        }
      ],
      form: {
        name: "",
        url: "",
        email: "",
        details: "",
      }
    };
  },
  methods:{
    submit(){
      let urlReg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      let emailReg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if(this.form.name==""||this.form.url==""||this.form.email==""||this.form.details==""){
        this.$Message.error("请填写完整信息");
      }else if(this.form.name.length>20){
        this.$Message.error("网站名称不超过20字");
      }else if(!urlReg.test(this.form.url)){
        this.$Message.error("网址格式错误");
        this.form.url="";
      }else if(!emailReg.test(this.form.email)){
        this.$Message.error("邮箱格式错误");
        this.form.email="";
      }else{
        setInfoApi.setLink(this.form).then(res=>{
          ;
          if(res.data.code===200){
            this.$Message.success(res.data.msg);
          }else{
            this.$Message.info(res.data.msg);
          }
        }).catch(err=>cosole.log(err));
      }
    },
    getList(){
      getInfoApi.getLinkList().then(res=>{
        if(res.data.code===200){
          if(!res.data.data.length){
            this.show=false;
          }else{
            this.list=res.data.data;
            this.show=true;
          }
        }else{
          this.$Message.info(res.data.msg);
        }
      }).catch(err=>this.$router.push('/notFound'))
    }
  },
  created(){
    this.getList();
  },
  components: {
    Head,
    Foot
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f4f0ea;
  .wrap {
    .breadcrumb {
      line-height: 80px;
      font-size: 14px;
      color: #999;
      .link {
        color: #333;
        font-size: 14px;
      }
      .link:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .wrapper {
      background: #fff;
      padding: 20px;
      h2.title {
        font-size: 24px;
        color: #333;
        text-align: center;
        line-height: 54px;
        border-bottom: 1px solid #eaeaea;
      }
      .list {
        margin-top: 20px;
        li {
          display: inline-block;
          line-height: 30px;
          width: 25%;
          text-align: center;
          a {
            color: #666;
            font-size: 16px;
          }
          a:hover {
            color: #b4a078;
          }
        }
      }
      .application {
        margin-top: 20px;
        .section {
          .note {
            .title {
              font-size: 16px;
              line-height: 40px;
            }
            ol {
              li {
                font-size: 14px;
                margin-top: 10px;
                color: #999;
              }
            }
          }
          .form {
            margin-left: 40px;
            .title {
              font-size: 16px;
              line-height: 40px;
            }
            .item {
              margin-top: 15px;
              .label {
                font-size: 14px;
              }
              input,
              textarea {
                font-size: 14px;
                display: inline-block;
                width: 303px;
                margin-left: 10px;
                padding-left: 14px;
                line-height: 30px;
              }
              textarea {
                vertical-align: top;
              }
              img {
                height: 30px;
              }
            }
            .submit {
              display: inline-block;
              color: #fff;
              text-align: center;
              width: 120px;
              height: 40px;
              line-height: 40px;
              background: #b4a078;
              font-size: 16px;
              border-radius: 6px;
              margin-top: 20px;
              margin-left: 163px;
            }
            .submit:hover {
              cursor: pointer;
              background: #ac9872;
            }
          }
        }
      }
    }
  }
}
</style>