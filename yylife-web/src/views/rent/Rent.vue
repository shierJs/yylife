<template>
  <div>
    <Head :i="6"></Head>
    <div id="main">
      <div class="wrap">
        <div class="top">
          <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <span class="index" @click="jump">首页</span>
            <i class="iconfont icon-arrow-r-copy"></i>
            <span class="current">租房</span>
          </div>
          <!-- 面包屑导航 -->
          <!-- 轮播 -->
          <Swiper :h="400" :position_id="16"></Swiper>
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
              <p class="fl">租金：&emsp;&emsp;</p>
              <ul class="job-list clear">
                <li
                  class="item fl"
                  v-for="(item,index) in rental"
                  :key="index"
                  :class="{active:rentalId==index}"
                  @click="changeRental(index)"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="wrapper">
              <p class="fl">筛选：&emsp;&emsp;</p>
              <ul class="clear sel">
                <li class="item fl">
                  <Select
                    v-model="payType"
                    style="width:100px"
                    placeholder="付款类型"
                    @on-change="changePay"
                  >
                    <Option
                      v-for="(item,index) in payList"
                      :value="item.id"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="item fl">
                  <Select
                    v-model="decoration"
                    style="width:100px"
                    placeholder="装修类型"
                    @on-change="changeDec"
                  >
                    <Option
                      v-for="(item,index) in decorationList"
                      :value="item.id"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </li>
                <li class="item fl">
                  <Select
                    v-model="types"
                    style="width:100px"
                    placeholder="租房类型"
                    @on-change="changeType"
                  >
                    <Option
                      v-for="(item,index) in typeList"
                      :value="item.id"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </li>
              </ul>
            </div>
          </div>
          <!-- 筛选 -->
          <!-- 列表 -->
          <div class="list-wrap">
            <Row>
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
                      <p class="address">{{item.area_name}}-{{item.house_area}}-{{item.address}}</p>
                      <p class="desc-wrap">
                        <span class="desc">装修：{{item.decoration.name}}</span>
                        <span class="time">发布时间：{{item.update_time}}</span>
                      </p>
                    </div>
                    <div class="right fr">
                      <h3 class="salary">{{item.price}}元</h3>
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
                        <p class="area">{{item.price}}元/月</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </i-col>
            </Row>
            <Page :total="total" @on-change="change" :current="rentCurrent" v-show="show"/>
          </div>
          <!-- 列表 -->
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
import getInfoApi from "@/api/getInfo";
import { mapState, mapActions, mapMutations } from "vuex";
import Foot from "@/components/Foot";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源租房,店面,商铺,写字楼,公寓"
      },
      {
        name: "description",
        content: "沂源在线房产频道为您提供大量免费的租房，店面商铺，办公写字楼，公寓，别墅等房屋信息，您还可以免费发布房屋信息。"
      }
    ]
  },
  data() {
    return {
      list: [],
      total: 0,
      rate: 5,
      payType: "",
      payList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "押一付一"
        },
        {
          id: 2,
          name: "押一付二"
        },
        {
          id: 3,
          name: "押一付三"
        },
        {
          id: 4,
          name: "半年付（押一月）"
        },
        {
          id: 5,
          name: "一年付（押一月）"
        }
      ],
      payTypeId: "",
      decoration: "",
      decorationList: [
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
          name: "毛坯房"
        }
      ],
      decorateId: "",
      rentCurrent: 1, //页码
      areaId: "",
      rental: [
        {
          id: 0,
          name: "不限",
          price_small: "",
          price_big: ""
        },
        {
          id: 1,
          name: "500-1000元",
          price_small: "500",
          price_big: "1000"
        },
        {
          id: 2,
          name: "1000-1500元",
          price_small: "1000",
          price_big: "1500"
        },
        {
          id: 3,
          name: "1500-2000元",
          price_small: "1500",
          price_big: "2000"
        },
        {
          id: 4,
          name: "2500-3000元",
          price_small: "2500",
          price_big: "3000"
        },
        {
          id: 5,
          name: "3000-4000元",
          price_small: "3000",
          price_big: "4000"
        },
        {
          id: 6,
          name: "4000元以上",
          price_small: "4000",
          price_big: ""
        }
      ],
      price_small: "",
      price_big: "",
      rentalId: "",
      typeList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "整租房"
        },
        {
          id: 2,
          name: "合租房"
        }
      ],
      typeId: "",
      types: "",
      hotList: [],
      show: false,
      keyword:""
    };
  },
  mounted() {
    this.getAreaList();
    this.getHotList();
    if (this.searchList.key == 5) {
      this.list = this.searchList.list;
      this.total = this.searchList.count;
      this.keyword=this.searchList.keyword;
      this.list.forEach(el => {
        return (el.decoration = this.decorationList[el.decoration_type]);
      });
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
      this.rentCurrent = i;
      this.getList();
      sessionStorage.setItem("rentCurrent", i);
      window.scrollTo(0, 600);
    },
    changeArea(i) {
      this.areaId = i;
      this.getList();
    },
    changeRental(i) {
      this.rentalId = i;
      this.price_small = this.rental[i].price_small;
      this.price_big = this.rental[i].price_big;
      this.getList();
    },
    changePay(i) {
      this.payTypeId = i;
      this.getList();
    },
    changeDec(i) {
      this.decorateId = i;
      this.getList();
    },
    changeType(i) {
      this.typeId = i;
      this.getList();
    },
    enterDetail(i) {
      let data = {
        path: "/rent",
        name: "房屋出租",
        now: "房屋出租详情页"
      };
      data = JSON.stringify(data);
      this.blank(i);
    },
    blank(i) {
      const { href } = this.$router.resolve({
        path: `/rent/rentDetail/${i}`,
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    getList() {
      let params = {
        type: this.typeId,
        payment_type: this.payTypeId,
        decoration_type: this.decorateId,
        price_small: this.price_small,
        price_big: this.price_big,
        page: this.rentCurrent,
        area_id: this.areaId,
        keyword:this.keyword
      };
      getInfoApi
        .getRentList(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              this.total = res.data.count;
              this.list.forEach(el => {
                return (el.decoration = this.decorationList[
                  el.decoration_type
                ]);
              });
              this.show = true;
            } else {
              this.show = false;
            }
          } else {
            this.show = false;
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          console.log('err');
        });
    },
    getHotList() {
      let params = {
        type: "hits"
      };
      getInfoApi.getPublishHouseRent(params).then(res => {
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
    sessionStorage.removeItem("rentCurrent");
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
              widows:75%;
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