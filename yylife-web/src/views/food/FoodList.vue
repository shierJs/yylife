<template>
  <div>
    <Head :i="1"></Head>
    <div id="main">
      <div class="wrap">
        <div class="top">
          <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <span class="index" @click="jump">首页</span>
            <i class="iconfont icon-arrow-r-copy"></i>
            <span class="current">美食</span>
          </div>
          <!-- 面包屑导航 -->
          <!-- 轮播 -->
          <Swiper :h="400" :position_id="5"></Swiper>
          <!-- 轮播 -->
        </div>
        <div class="main">
          <!-- 分类导航 -->
          <div class="nav-list">
            <ul class="class-list clear">
              <li class="title">分类:</li>
              <li class="item" v-for="item in cateList" :key="item.id" :class="{active:cateId==item.id}" @click="changeCate(item.id)">
                <span>{{item.name}}</span>
              </li>
            </ul>
            <ul class="class-list clearfix">
              <li class="title">区域:</li>
              <li class="item" v-for="item in areaList" :key="item.id" :class="{active:areaId==item.id}" @click="changeArea(item.id)">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
          <!-- 分类导航 -->
          <Row>
            <!-- 美食列表 -->
            <i-col span="20">
              <div class="list" v-show="show">
                <ul class="gif-list">
                  <li class="item clear" v-for="(item,index) in list" :key="index">
                    <div class="img fl">
                      <img v-lazy="item.thumb" :key="item.thumb" alt :title="item.shop_name">
                    </div>
                    <div class="fl content">
                      <h4 class="title" @click="toDetail(item.shop_id)">{{item.shop_name}}</h4>
                      <p class="desc">{{item.intro}}</p>
                      <p class="name">{{item.address}}</p>
                      <div class="tags">
                        <p class="tag">{{item.discounts}}</p>
                      </div>
                    </div>
                    <p class="contact" @click="toDetail(item.shop_id)">
                      <i class="iconfont icon-dianhua"></i>
                      <span>联系商家</span>
                    </p>
                    <svg class="icon top" aria-hidden="true" v-if="item.location == 1">
                        <use xlink:href="#icon-tuijian"></use>
                    </svg>
                  </li>
                </ul>
              </div>
              <div class="none" v-show="!show">
                <i class="iconfont icon-meiyoushuju"></i>
                <p class="none-content">暂无数据</p>
              </div>
            </i-col>
            <!-- 美食列表 -->
            <!-- 24小时热榜 -->
            <i-col span="4">
              <div class="rank">
                <div class="title clear">
                  <h3 class="fl">24小时热榜</h3>
                </div>
                <ul class="rank-list">
                  <li class="item clear" v-for="(item,index) in hotList" :key="index" @click="toDetail(item.shop_id)">
                    <p class="tag" v-show="index <=3 ">{{index+1}}</p>
                    <img v-lazy="item.thumb" :key="item.thumb" alt class="fl">
                    <div class="content fl">
                      <p class="title">{{item.shop_name}}</p>
                      <p class="area">分类：{{item.cate_name}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </i-col>
            <!-- 24小时热榜 -->
            <Page :total="total" @on-change="change"  :current="foodCurrent" v-show="show"/>
            <!-- 页码 -->
          </Row>
        </div>
        <p class="release">
            <span @click="$router.push('/release')">马上去发布</span>
        </p>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import formateTime from "@/common/formateTime.js";
import getInfoApi from "@/api/getInfo";
import {mapActions,mapState, mapMutations} from 'vuex';
import Foot from "@/components/Foot";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源美食,沂源小吃,沂源土特产,优惠商家"
      },
      {
        name: "description",
        content: "沂源县美食攻略,沂源县有什么好吃的,好吃的特色小吃,沂源县美食街吃货指南,网罗最新最全的沂源县美食排行榜攻略信息"
      }
    ]
  },
  data() {
    return {
      foodRate: 5,
      list: [],
      total: 0,
      foodCurrent: 1,
      areaId:"",
      cateList:[],
      cateId:"",
      hotList:[],
      show:false,
      keyword:"",
    };
  },
  mounted() {
    this.$Spin.show();
    this.getCate();
    this.getAreaList();
    this.getHotList();
    if(this.searchList.key==1){
      this.list=this.searchList.list;
      this.total=this.searchList.count;
      this.keyword=this.searchList.keyword;
      this.$Spin.hide();
      this.show=true;
    }else{
      this.getList();
    }
  },
  methods: {
    jump() {
      this.$router.push("/");
    },
    change(i) {
      //分页
      this.foodCurrent=i;
      this.getList();
      window.scrollTo(0, 600);
    },
    changeCate(i){
      this.cateId=i;
      this.getList();
    },
    changeArea(i){
      this.areaId=i;
      this.getList();
    },
    toDetail(i){
      //进入详情页
      let data={
        path:'/food',
        name:"美食",
        now:"美食详情页"
      };
      data=JSON.stringify(data);
      sessionStorage.setItem("foodBread",data);
      this.blank(i);
    },
    blank(i) {
      const {href} = this.$router.resolve({
        path:`/food/foodDetail/${i}`,//通过id渲染详情页数据
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      })
      window.open(href, '_blank')
    },
    getCate(){
      getInfoApi.getShopCate().then(res=>{
        if(res.data.code===200){
          this.cateList=res.data.data;
          this.cateList.unshift({
            id:"",
            name:"全部"
          })
        }else{
          this.$Message.info(res.data.msg);
        }
      }).catch(err=>console.log('err'));
    },
    getList(){
      let params={
        page:this.foodCurrent,
        cate_id:this.cateId,
        area_id:this.areaId,
        keyword:this.keyword
      };
      getInfoApi.getShopList(params).then(res=>{
        if(res.data.code===200){
          if(res.data.data.length){
            this.list=res.data.data;
            this.total=res.data.count;
            this.$Spin.hide();
            this.show=true;
          }else{
            this.$Spin.hide();
            this.show=false;
          }
        }else{
          this.$Message.info(res.data.msg);
          this.$Spin.hide();
          this.show=false;
        }
      }).catch(err=>console.log('err'))
    },
    getHotList(){
      let params={
        type:"hits",
      };
      getInfoApi.getPublishShop(params).then(res=>{
        if(res.data.code === 200){
          ;
          this.hotList=res.data.data;
        }else{
          this.$Message.info(res.data.msg);
        }
      })
    },
    ...mapActions(['getAreaList']),
    ...mapMutations(['clearKeyList'])
  },
  beforeDestroy() {
    sessionStorage.removeItem("foodCurrent"); //组件销毁之前删除session
    this.clearKeyList();
  },
  computed:{
    areaList(){
      return this.$store.state.areaList
    },
    searchList(){
      return this.$store.state.searchList;
    }
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
  background: #f4f0ea;
  .wrap {
    div.top {
      margin-bottom: 30px;
      .breadcrumb {
        height: 50px;
        line-height: 50px;
        font-size: 0;
        color: #999;
        span,
        .iconfont {
          font-size: 12px;
        }
        .index {
          color: #333;
        }
        .index:hover {
          text-decoration: underline;
          cursor: pointer;
        }
        .iconfont {
          display: inline-block;
          margin: 0 8px;
        }
      }
    }
    .main {
      background: #fff;
      .nav-list {
        padding: 10px 40px 40px;
        .class-list {
          line-height: 44px;
          border-bottom: 1px dashed #ddd;
          li {
            float: left;
            font-size: 14px;
          }
          .title {
            color: #999;
          }
          .item {
            cursor: pointer;
            margin-left: 30px;
            color: #333;
          }
          .active {
            color: #b4a078;
          }
          .item:hover {
            color: #b4a078;
          }
        }
      }
      .list {
        .gif-list {
          padding: 0 20px;
          li.item {
            padding: 20px 0;
            border-bottom: 1px solid #ccc;
            position: relative;
            .img {
              img {
                width: 150px;
                height: 150px;
              }
            }
            .content {
              padding-left: 20px;
              font-size: 14px;
              width:70%;
              .title {
                font-size: 18px;
                width:100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .desc {
                line-height: 40px;
                width:100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .name {
                font-size: 16px;
                color: #b4a078;
              }
              .tags {
                margin-top: 38px;
                .tag {
                  float: left;
                  background: #f44;
                  color: #fff;
                  margin-right: 10px;
                  padding: 0 10px;
                }
              }
            }
            .contact {
              position: absolute;
              right: 0;
              top: 50%;
              width: 130px;
              height: 40px;
              color: #fff;
              text-align: center;
              line-height: 40px;
              font-size: 14px;
              background: #f44;
              margin-top: -20px;
              border-radius: 5px;
              cursor: pointer;
            }
            .top{
              position: absolute;
              top:20px;
              left:0;
              width:50px;
              height: 50px;
            }
          }
          .item .title:hover {
            cursor: pointer;
            color: #b4a078;
            text-decoration: underline;
          }
        }
      }
      .none{
        text-align: center;
        .iconfont{
          font-size:240px;
          color:#b4a078;
        }
        .none-content{
          font-size:18px;
          color:#b4a078;
        }
      }
      .ivu-row {
        padding-bottom: 60px;
        .ivu-page {
          position: absolute;
          margin-left: 50%;
          transform: translateX(-50%);
          bottom: 10px;
        }
      }
      .rank {
        .title {
          margin-bottom: 20px;
          h3 {
            font-size: 16px;
            border-bottom: 2px solid #f44;
          }
          .more {
            font-size: 12px;
            padding-top: 8px;
          }
        }
        .rank-list {
          .item {
            position: relative;
            margin-bottom:15px;
            cursor: pointer;
            img {
              width: 80px;
              height: 50px;
            }
            .content {
              margin-left: 10px;
              width:100px;
              .title {
                margin-bottom: 10px;
                max-width:100%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                font-size:14px;
                font-weight:600;
                color:#b4a078;
              }
            }
            .tag {
              position: absolute;
              top: 0;
              left: 0;
              background: #f44;
              color: #fff;
              font-size: 14px;
              text-align: center;
              height: 20px;
              width: 30px;
              line-height: 20px;
            }
          }
          .item:nth-child(2) .tag {
            background: #f85b30;
          }
          .item:nth-child(3) .tag {
            background: #f7ab26;
          }
        }
      }
    }
    .release {
      text-align: center;
      font-size: 14px;
      height: 50px;
      line-height: 50px;
      color: #0cf;
    }
    .release span:hover {
      color: #f44;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>