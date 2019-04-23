<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <Swiper :h="400" :position_id="20"></Swiper>
        <ul class="loans-list">
          <li class="loans-item clear" v-for="(item,index) in loansList" :key="index">
            <div class="left fl">
              <img v-lazy="item.logo" :key="item.logo" alt :title="item.cut_name">
              <div class="txt">
                <p class="title">{{item.cut_name}}</p>
                <div class="tags">
                  <span v-for="(v,i) in item.cut_label" :key="i">{{v.label_name}}</span>
                </div>
              </div>
            </div>
            <div class="fr right">
              <div class="info">
                <p class="interest">
                  <span class="label">利率：</span>
                  <span>{{item.rate}}</span>
                </p>
                <p class="term">
                  <span class="label">期限：</span>
                  <span>{{item.deadline}}</span>
                </p>
                <p class="lines">
                  <span class="label">额度：</span>
                  <span>{{item.max_limit}}</span>
                </p>
              </div>
              <div class="application">
                <p class="applied">
                  <span class="label">申请数：</span>
                  <span>{{item.count}}位</span>
                </p>
                <a :href="url" target="_blank" @click="link(index)" class="detail">立即申请</a>
              </div>
            </div>
          </li>
        </ul>
        <div class="page">
            <Page :total="total" @on-change="change" :page-size="num" :current="current"/>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import getInfoApi from '@/api/getInfo';
import setInfoApi from '@/api/setInfo';
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      loansList:[],
      total:10,
      num:10,
      current:1,
      url:"javascript:;",
    };
  },
  methods:{
    change(i){
      this.current=i;
      this.getList();
    },
    getList(){
      let params={
        page:this.current
      };
      getInfoApi.getListCut(params).then(res=>{
        ;
        if(res.data.code===200){
          if(res.data.data.length){
            this.loansList=res.data.data;
            this.total=res.data.count;
          }
        }
      }).catch(err=>{
        this.$router.push('/notFound');
      });
    },
    link(i){
      let data={
        id:this.loansList[i].id
      };
      setInfoApi.setCount(data).then(res=>{
        if(res.data.code===200){
          this.url=this.loansList[i].url;
        }else{
          this.$Message.error(res.data.msg);
        }
      }).catch(err=>this.$router.push('/notFound'))
    }
  },
  mounted(){
    this.getList();
  },
  components: {
    Head,
    Swiper,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 20px;
  padding-bottom: 50px;
  background: #f4f0ea;
  .loans-list{
      background: #fff;
      padding:20px;
      margin-top:40px;
      li.loans-item{
          border-top:1px solid #ddd;
          padding:10px;
          .left{
              img{
                  width:120px;
                  height:120px;
              }
              .txt{
                  margin-left:20px;
                  display: inline-block;
                  vertical-align: top;
                  .title{
                      font-size:16px;
                  }
                  .tags{
                      margin-top:65px;
                      span{
                          display: inline-block;
                          width:100px;
                          height:30px;
                          line-height:30px;
                          text-align: center;
                          background: #b4a078;
                          color:#fff;
                          margin-right:10px;
                      }
                  }
              }
          }
          .right{
              .info{
                  display: inline-block;
                  margin-right:20px;
                  width: 150px;
                  p{
                      font-size:14px;
                      line-height: 40px;
                  }
                  span{
                      color:#FF0000;
                  }
                  .label{
                      color:#999;
                      margin-right:20px;
                  }
              }
              .application{
                  display: inline-block;
                  margin-top:20px;
                  vertical-align: top;
                  .applied{
                      font-size:16px;
                      color:#999;
                      margin-bottom: 10px;
                      text-align: center;
                  }
                  .detail{
                    display: block;
                      width:200px;
                      height:50px;
                      text-align: center;
                      line-height: 50px;
                      border:1px solid #b4a078;
                      border-radius: 6px;
                      font-size:18px;
                      color:#b4a078;
                  }
                  .detail:hover{
                      background: #b4a078;
                      color:#fff;
                      cursor: pointer;
                  }
              }
          }
      }
      .loans-item:first-child{
          border-top:none;
      }
  }
  .page{
      margin-top:40px;
      display: inline-block;
      margin-left:50%;
      transform: translateX(-50%);
  }
}
</style>