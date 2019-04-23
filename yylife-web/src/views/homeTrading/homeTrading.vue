<template>
  <div>
    <Head :i="7"></Head>
    <div id="main">
      <div class="wrap">
        <div class="top">
          <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <span class="index" @click="jump">首页</span>
            <i class="iconfont icon-arrow-r-copy"></i>
            <span class="current">房屋买卖</span>
          </div>
          <!-- 面包屑导航 -->
          <!-- 轮播 -->
          <Swiper :h="400" :position_id="18"></Swiper>
          <!-- 轮播 -->
        </div>
        <div class="main">
          <!-- 筛选 -->
          <div class="filter">
            <div class="wrapper">
              <p class="fl">地区：&emsp;&emsp;</p>
              <ul class="area-list clear">
                <li
                  class="item fl"
                  v-for="(item,index) in areaList"
                  :key="index"
                  :class="{active:areaId==item.id}"
                  @click="changeArea(item.id)"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="wrapper">
              <p class="fl">房屋类型：</p>
              <ul class="clear">
                <li
                  class="item fl"
                  v-for="(item,index) in buildingTypeList"
                  :key="index"
                  :class="{active:bdTypeId==item.id}"
                  @click="changeBd(item.id)"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="wrapper">
              <p class="fl">卖房类型：</p>
              <ul class="clear">
                <li
                  class="item fl"
                  v-for="(item,index) in typeList"
                  :key="index"
                  :class="{active:typeId==item.id}"
                  @click="changeType(item.id)"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 筛选 -->
          <!-- 列表 -->
          <div class="list-wrap">
            <Row>
              <!-- 当前页列表 -->
              <i-col span="20">
                <ul class="list" v-show="show">
                  <li
                    class="item clear"
                    v-for="(item,index) in list"
                    :key="index"
                    @click="enterDetail(item.house_id)"
                  >
                    <div class="left fl">
                      <img v-lazy="item.thumb" :key="item.thumb" alt :title="item.house_title">
                    </div>
                    <div class="center fl">
                      <p class="title">{{item.house_title}}</p>
                      <p class="address">{{item.area_name}}-{{item.house_area}}</p>
                      <p class="desc-wrap">
                        <span class="desc">{{item.desc}}</span>
                        <span class="time">{{item.create_time}}</span>
                      </p>
                    </div>
                    <div class="right fr">
                      <h3 class="salary">{{item.price}}万元</h3>
                    </div>
                    <svg class="icon top" aria-hidden="true" v-if="item.location == 1">
                      <use xlink:href="#icon-tuijian"></use>
                    </svg>
                  </li>
                </ul>
                <div class="none" v-show="!show">
                  <i class="iconfont icon-meiyoushuju"></i>
                  <p class="none-content">暂无数据</p>
                </div>
              </i-col>
              <!-- 当前页列表 -->
              <!-- 24小时热榜 -->
              <i-col span="4">
                <div class="rank">
                  <div class="title clear">
                    <h3 class="fl">24小时热榜</h3>
                  </div>
                  <ul class="rank-list">
                    <li
                      class="item clear"
                      v-for="(item,index) in hotList"
                      :key="index"
                      @click="enterDetail(item.house_id)"
                    >
                      <p class="tag" v-show="index <=3 ">{{index+1}}</p>
                      <img v-lazy="item.thumb" :key="item.thumb" alt class="fl">
                      <div class="content fl">
                        <p class="title">{{item.house_title}}</p>
                        <p class="area">售价：{{item.price}}万元</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </i-col>
              <!-- 24小时热榜 -->
            </Row>
            <Page
              :total="total"
              @on-change="change"
              :page-size="num"
              :current="homeCurrent"
              v-show="show"
            />
            <!-- 分页 -->
          </div>
          <!-- 列表 -->
        </div>
      </div>
      <p class="release">
        <span @click="$router.push('/release')">马上去发布</span>
      </p>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import getInfoApi from "@/api/getInfo";
import { mapActions, mapState, mapMutations } from "vuex";
import Foot from "@/components/Foot";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源二手房,沂源新房,店面,商铺,写字楼,公寓,别墅"
      },
      {
        name: "description",
        content: "沂源在线房产频道为您提供大量免费的二手房，租房，店面商铺，办公写字楼，公寓，别墅等房屋信息，您还可以免费发布房屋信息。"
      }
    ]
  },
  data() {
    return {
      list: [],
      total: 0,
      num: 10,
      rate: 5,
      areaId: "",
      keyword:"",
      buildingTypeList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "普通住宅"
        },
        {
          id: 2,
          name: "公寓楼"
        },
        {
          id: 3,
          name: "写字楼"
        },
        {
          id: 4,
          name: "商铺"
        },
        {
          id: 5,
          name: "回迁房"
        }
      ],
      bdTypeId: "",
      typeList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "新房"
        },
        {
          id: 2,
          name: "二手房"
        }
      ],
      decorationsList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "精装"
        },
        {
          id: 2,
          name: "简装"
        },
        {
          id: 3,
          name: "豪华"
        },
        {
          id: 4,
          name: "毛坯"
        }
      ],
      typeId: "",
      homeCurrent: 1, //页码
      hotList: [],
      show: false
    };
  },
  mounted() {
    this.getHotList();
    this.getAreaList();
    if (this.searchList.key == 6) {
      this.list = this.searchList.list;
      this.total = this.searchList.count;
      this.keyword=this.searchList.keyword;
      this.list.forEach(el => {
        return (el.desc = this.decorationsList[el.decoration_type].name);
      });
      this.total = this.searchList.count;
      this.show=true;
    } else {
      this.getList();
    }
  },
  methods: {
    jump() {
      this.$router.push("/");
    },
    change(i) {
      //分页
      this.homeCurrent++;
      this.getList();
      window.scrollTo(0, 600);
    },
    changeArea(id) {
      this.areaId = id;
      this.getList();
    },
    changeBd(id) {
      this.bdTypeId = id;
      this.getList();
    },
    changeType(id) {
      this.typeId = id;
      this.getList();
    },
    enterDetail(i) {
      let data = {
        path: "/homeTrading",
        name: "房屋买卖",
        now: "房屋买卖详情页"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("homeBread", data);
      this.blank(i);
    },
    blank(i) {
      const { href } = this.$router.resolve({
        path: `/homeTrading/homeTradingDetail/${i}`,
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    getList() {
      this.$Spin.show();
      let params = {
        type: this.typeId,
        page: this.homeCurrent,
        floor_type: this.bdTypeId,
        area_id: this.areaId,
        keyword:this.keyword
      };
      getInfoApi
        .getHomeTradeList(params)
        .then(res => {
          ;
          if (res.data.code == 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              this.list.forEach(el => {
                return (el.desc = this.decorationsList[
                  el.decoration_type
                ].name);
              });
              this.total = res.data.count;
              this.$Spin.hide();
              this.show = true;
            } else {
              this.show = false;
              this.$Spin.hide();
            }
          } else {
            this.$Message.info(res.data.msg);
            this.show = false;
            this.$Spin.hide();
          }
        })
        .catch(err => console.log('err'));
    },
    getHotList() {
      let params = {
        type: "hits"
      };
      getInfoApi.getPublishHouseTrade(params).then(res => {
        if (res.data.code === 200) {
          ;
          this.hotList = res.data.data;
        } else {
          this.$Message.info(res.data.msg);
        }
      }).catch(err=>console.log('err'));
    },
    ...mapActions(["getAreaList"]),
    ...mapMutations(["clearKeyList"])
  },
  beforeDestroy() {
    sessionStorage.removeItem("homeCurrent"); //删除页码
    this.clearKeyList();
  },
  computed: {
    areaList() {
      return this.$store.state.areaList;
    },
    searchList() {
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
      .filter {
        padding: 20px 40px 40px;
        .wrapper {
          margin-top: 10px;
          border-bottom: 1px dashed #ddd;
          p {
            font-size: 14px;
            color: #999;
          }
          ul {
            .item {
              height: 26px;
              color: #333;
              margin-left: 14px;
            }
            .active {
              color: #b4a078;
              font-size: 14px;
            }
            .item:hover {
              color: #b4a078;
              cursor: pointer;
            }
          }
          .sel {
            margin-bottom: 10px;
            .item {
              height: 33px;
            }
          }
        }
      }
      .list-wrap {
        padding: 0 20px;
        padding-bottom: 40px;
        position: relative;
        .list {
          .item {
            padding: 10px 20px;
            border-top: 1px dashed #ccc;
            position: relative;
            .left {
              width: 100px;
              height: 100px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .center {
              margin-left: 20px;
              font-size: 14px;
              width:75%;
              .title {
                font-size: 18px;
                width:100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .title:hover {
                color: #b4a078;
                text-decoration: underline;
                cursor: pointer;
              }
              .address {
                line-height: 40px;
                color: #999;
              }
              .desc-wrap {
                color: #999;
                line-height: 30px;
              }
            }
            .right {
              font-size: 18px;
              color: #f44;
            }
            .top {
              position: absolute;
              top: 10px;
              left: 20px;
              width: 50px;
              height: 50px;
            }
          }
        }
        .none {
          text-align: center;
          .iconfont {
            font-size: 240px;
            color: #b4a078;
          }
          .none-content {
            font-size: 18px;
            color: #b4a078;
          }
        }
        .ivu-page {
          position: absolute;
          margin-left: 50%;
          transform: translateX(-50%);
          bottom: 10px;
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
              margin-bottom: 15px;
              cursor: pointer;
              img {
                width: 80px;
                height: 50px;
              }
              .content {
                margin-left: 10px;
                width: 100px;
                .title {
                  margin-bottom: 10px;
                  max-width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 14px;
                  font-weight: 600;
                  color: #b4a078;
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
</style>