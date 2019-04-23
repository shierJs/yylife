<template>
  <div>
    <!-- 推荐 -->
    <div class="recommend">
      <div class="title">
        <img src="../../static/img/recommend.png" alt>
        <h4>本周推荐</h4>
      </div>
      <!-- 导航栏 -->
      <div class="tabs swiper-container">
        <div class="swiper-wrapper">
          <div
            class="tab swiper-slide"
            v-for="(item,i) in tabs"
            :key="i"
            @click="tab(item.id)"
            :class="{active:item.id==id}"
          >
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <!-- 导航栏 -->
      <div class="list-recommend">
        <div class="none" v-show="!show" @click="$router.go(0);">
          <i class="iconfont icon-meiyoushuju"></i>
          <p class="label">暂无数据</p>
        </div>
        <!-- 列表 -->
        <div class="list" v-if="tabi == 1 && show">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
            <van-cell v-for="(item,index) in shoplist" :key="index">
              <slot>
                <ul class="list-shop">
                  <li @click="enterDetail(item.shop_id)">
                    <img v-lazy="item.thumb" :key="item.thumb" alt>
                    <div class="item">
                      <h3 class="title">{{item.shop_name}}</h3>
                      <span class="desc">{{item.intro}}</span>
                      <span class="prefer">{{item.discounts}}</span>
                    </div>
                    <div class="browse">
                      <img src="/static/img/icon/eye.png" alt>
                      <span>{{item.hits}}</span>
                    </div>
                  </li>
                </ul>
              </slot>
            </van-cell>
          </van-list>
        </div>
        <!-- 美食店铺 -->

        <div class="list" v-if="tabi == 2 && show">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
            <van-cell v-for="(item,index) in jobList" :key="index">
              <slot>
                <div class="list-job" @click="enterDetail(item.id)">
                  <div class="txt">
                    <h3 class="title">{{item.title}}</h3>
                    <div class="content">
                      <p
                        class="wages"
                        v-if="item.discuss"
                      >{{item.monthly_pay_small}}-{{item.monthly_pay_big}}元/月</p>
                      <p class="wages" v-else>面议</p>
                    </div>
                    <div class="tag">
                      <div v-for="(v,i) in item.recruitment_label" :key="i">{{v.label_name}}</div>
                    </div>
                  </div>
                  <div class="application">
                    <span>申请</span>
                  </div>
                  <div class="company">
                    <p class="name">{{item.company | flow}}</p>
                    <p class="address">{{item.address}}</p>
                  </div>
                </div>
              </slot>
            </van-cell>
          </van-list>
        </div>
        <!-- 求职招聘 -->

        <div class="list" v-if="tabi == 3 && show">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
            <van-cell v-for="(item,index) in usedList" :key="index">
              <slot>
                <div class="list-used" @click="enterDetail(item.used_id)">
                  <img v-lazy="item.thumb"  :key="item.thumb" alt class="show" :title="item.used_title">
                  <div class="txt">
                    <h4 class="title">{{item.used_title}}</h4>
                    <span class="desc">分类：{{item.cate_name}}</span>
                  </div>
                  <p class="price">{{item.selling_price}} 元</p>
                  <div class="release">
                    <p class="date">发布:{{item.publish_time}}</p>
                  </div>
                  <div class="browse">
                    <img src="/static/img/icon/eye.png" alt>
                    <span>{{item.hits}}</span>
                  </div>
                </div>
              </slot>
            </van-cell>
          </van-list>
        </div>
        <!-- 二手市场 -->

        <div class="list" v-if="tabi == 4 && show">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
            <van-cell v-for="(item,index) in lifeList" :key="index">
              <slot>
                <div class="list-life" @click="enterDetail(item.service_id)">
                  <img v-lazy="item.thumb"  :key="item.thumb" alt class="show" :title="item.service_title">
                  <div class="txt">
                    <h4 class="title">{{item.service_title}}</h4>
                    <span class="desc">地址：{{item.address}} 分类：{{item.cate_name}}</span>
                    <div class="name">
                      <span>{{item.area_name}}</span>
                      <div class="tags">
                        <p class="tag" v-for="(v,i) in item.service_label" :key="i">{{v.label_name}}</p>
                      </div>
                    </div>
                  </div>
                  <i class="iconfont icon-dianhua"></i>
                </div>
              </slot>
            </van-cell>
          </van-list>
        </div>
        <!-- 生活服务 -->

        <div class="list" v-if="tabi == 5 && show">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
            <van-cell v-for="(item,index) in rentList" :key="index">
              <slot>
                <div class="list-rent" @click="enterDetail(item.house_id)">
                  <img v-lazy="item.thumb"  :key="item.thumb" alt class="show" :title="item.house_title">
                  <div class="txt">
                    <h4 class="title">{{item.house_title}}</h4>
                    <span class="desc">{{item.acreage}}㎡ ·{{item.house_area}}</span>
                    <div class="address">
                      <van-icon name="location"/>
                      <span>{{item.area_name}}</span>
                    </div>
                    <p class="price">{{item.price}} 元</p>
                  </div>
                  <i class="iconfont icon-dianhua"></i>
                  <div class="browse">
                    <img src="/static/img/icon/eye.png" alt>
                    <span>{{item.hits}}</span>
                  </div>
                </div>
              </slot>
            </van-cell>
          </van-list>
        </div>
        <!-- 房屋租赁 -->

        <div class="list" v-if="tabi == 6 && show">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
            <van-cell v-for="(item,index) in tradeList" :key="index">
              <slot>
                <div class="list-home" @click="enterDetail(item.house_id)">
                  <img v-lazy="item.thumb"  :key="item.thumb" alt class="show">
                  <div class="txt">
                    <h4 class="title">{{item.house_title}}</h4>
                    <span class="desc">{{item.houseType}}{{item.acreage}}m2-{{item.area_name}}</span>
                    <div class="address">
                      <van-icon name="location"/>
                      <span>{{item.address}}</span>
                    </div>
                    <p class="price">{{item.price}}万元</p>
                  </div>
                  <i class="iconfont icon-dianhua"></i>
                  <div class="browse">
                    <img src="/static/img/icon/eye.png" alt>
                    <span>{{item.hits}}</span>
                  </div>
                </div>
              </slot>
            </van-cell>
          </van-list>
        </div>
        <!-- 房屋买卖 -->
        <!-- 列表 -->
      </div>
    </div>
    <!-- 推荐 -->
  </div>
</template>

<script>
import getInfoApi from "@/api/getInfo";
import Swiper from "swiper";
import flow from "@/filters/flow.js";
import { Toast, Icon } from "vant";
export default {
  data() {
    return {
      shoplist: [],
      jobList: [],
      usedList: [],
      lifeList: [],
      rentList: [],
      tradeList: [],
      houseTypeList: [
        {
          id: 1,
          name: "一室"
        },
        {
          id: 2,
          name: "二室"
        },
        {
          id: 3,
          name: "三室"
        },
        {
          id: 4,
          name: "四室"
        },
        {
          id: 5,
          name: "五室及以上"
        }
      ],
      id: 1,
      loading: false,
      finished: false,
      isLoading: false,
      show: false,
      page: 1,
      tabi: 0,
      tabs: [
        {
          id: 1,
          name: "美食店铺"
        },
        {
          id: 2,
          name: "求职招聘"
        },
        {
          id: 3,
          name: "二手交易"
        },
        {
          id: 4,
          name: "生活服务"
        },
        {
          id: 5,
          name: "房屋租赁"
        },
        {
          id: 6,
          name: "房屋买卖"
        }
      ]
    };
  },
  methods: {
    tab(i) {
      this.id = i;
      this.page = 1;
      this.finished=true;
      this.getList();
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      this.getList();
    },
    getList() {
      let params = {
        page: this.page,
        location: 2
      };
      switch (this.id) {
        case 1:
          this.getShop(params);
          break;
        case 2:
          this.getJob(params);
          break;
        case 3:
          this.getUseds(params);
          break;
        case 4:
          this.getService(params);
          break;
        case 5:
          this.getRent(params);
          break;
        case 6:
          this.getTrade(params);
          break;
        default:
          this.show = false;
          console.log(this.tabi);
          Toast("服务器出小差了，等会儿再试吧");
          break;
      }
    },
    getShop(params) {
      this.tabi = 1;
      getInfoApi
        .getShopList(params)
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            if (this.page == 1) {
              if (res.data.data.length == 0) {
                this.finished = true;
                this.show = false;
              } else {
                this.shoplist = res.data.data;
                this.shoplist.forEach(el => {
                  return (el.hits =
                    parseInt(el.hits) + parseInt(el.virtual_hits));
                });
                this.show = true;
                this.finished = false;
              }
            } else {
              if (this.shoplist.length == 0) {
                this.show = false;
              } else {
                if (res.data.data.length == 0) {
                  Toast("没有更多了");
                  this.finished = true;
                } else {
                  this.shoplist = this.shoplist.concat(res.data.data);
                  this.shoplist.forEach(el => {
                    return (el.hits =
                      parseInt(el.hits) + parseInt(el.virtual_hits));
                  });
                  this.show = true;
                }
              }
            }
          } else {
            this.finished = true;
            this.show = false;
          }
        })
        .catch(err =>
          {
            this.show=false;
            this.loading=false;
            this.finished=true;
            Toast("服务器出小差了");
          }
        );
    },
    getJob(params) {
      this.tabi = 2;
      getInfoApi
        .getJobList(params)
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            if (this.page == 1) {
              this.jobList = [];
              if (res.data.data.length == 0) {
                this.finished = true;
                this.show = false;
              } else {
                this.jobList = res.data.data;
                this.jobList.forEach(el => {
                  if (el.recruitment_label.length) {
                    return (el.recruitment_label = el.recruitment_label.slice(
                      0,
                      5
                    ));
                  }
                });
                this.show = true;
                this.finished = false;
              }
            } else {
              console.log(this.jobList.length);
              if (this.jobList.length == 0) {
                this.show = false;
              } else {
                if (res.data.data.length == 0) {
                  Toast("没有更多了");
                  this.finished = true;
                } else {
                  this.jobList = this.jobList.concat(res.data.data);
                  this.jobList.forEach(el => {
                    if (el.recruitment_label.length) {
                      return (el.recruitment_label = el.recruitment_label.slice(
                        0,
                        5
                      ));
                    }
                  });
                  this.show = true;
                }
              }
            }
          } else {
            this.finished = true;
            this.show = false;
          }
        })
        .catch(err =>
          {
            this.show=false;
            this.loading=false;
            this.finished=true;
            Toast("服务器出小差了");
          }
        );
    },
    getUseds(params) {
      this.tabi = 3;
      getInfoApi
        .getListUsed(params)
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            if (this.page == 1) {
              if (res.data.data.length == 0) {
                this.finished = true;
                this.show = false;
              } else {
                this.usedList = res.data.data;
                this.usedList.forEach(el => {
                  el.hits = parseInt(el.hits) + parseInt(el.virtual_hits);
                  el.publish_time = new Date(parseInt(el.publish_time) * 1000)
                    .toLocaleString()
                    .replace(/:\d{1,2}$/, " ");
                });
                this.show = true;
                this.finished = false;
              }
            } else {
              if (this.usedList.length == 0) {
                this.show = false;
              } else {
                if (res.data.data.length == 0) {
                  Toast("没有更多了");
                  this.finished = true;
                } else {
                  this.usedList = this.usedList.concat(res.data.data);
                  this.usedList.forEach(el => {
                    el.hits = parseInt(el.hits) + parseInt(el.virtual_hits);
                    el.publish_time = new Date(parseInt(el.publish_time) * 1000)
                      .toLocaleString()
                      .replace(/:\d{1,2}$/, " ");
                  });
                  this.show = true;
                }
              }
            }
          } else {
            this.finished = true;
            this.show = false;
          }
        })
        .catch(err => 
          {
            this.show=false;
            this.loading=false;
            this.finished=true;
            Toast("服务器出小差了");
          }
        );
    },
    getService(params) {
      this.tabi = 4;
      getInfoApi
        .getLifeList(params)
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            if (this.page == 1) {
              if (res.data.data.length == 0) {
                this.finished = true;
                this.show = false;
              } else {
                this.lifeList = res.data.data;
                this.show = true;
                this.finished = false;
              }
            } else {
              if (this.lifeList.length == 0) {
                this.show = false;
              } else {
                if (res.data.data.length == 0) {
                  Toast("没有更多了");
                  this.finished = true;
                } else {
                  this.lifeList = this.lifeList.concat(res.data.data);
                  this.show = true;
                }
              }
            }
          } else {
            this.finished = true;
            this.show = false;
          }
        })
        .catch(err =>
          {
            this.show=false;
            this.loading=false;
            this.finished=true;
            Toast("服务器出小差了");
          }
        );
    },
    getRent(params) {
      this.tabi = 5;
      getInfoApi
        .getRentList(params)
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            if (this.page == 1) {
              if (res.data.data.length == 0) {
                this.finished = true;
                this.show = false;
              } else {
                this.rentList = res.data.data;
                this.rentList.forEach(el => {
                  return (el.hits =
                    parseInt(el.hits) + parseInt(el.virtual_hits));
                });
                this.show = true;
                this.finished = false;
              }
            } else {
              if (this.rentList.length == 0) {
                this.show = false;
              } else {
                if (res.data.data.length == 0) {
                  Toast("没有更多了");
                  this.finished = true;
                } else {
                  this.rentList = this.rentList.concat(res.data.data);
                  this.rentList.forEach(el => {
                    return (el.hits =
                      parseInt(el.hits) + parseInt(el.virtual_hits));
                  });
                  this.show = true;
                }
              }
            }
          } else {
            this.finished = true;
            this.show = false;
          }
        })
        .catch(err => 
          {
            this.show=false;
            this.loading=false;
            this.finished=true;
            Toast("服务器出小差了");
          }
        );
    },
    getTrade(params) {
      this.tabi = 6;
      getInfoApi
        .getHomeTradeList(params)
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            if (this.page == 1) {
              if (res.data.data.length == 0) {
                this.finished = true;
                this.show = false;
              } else {
                this.tradeList = res.data.data;
                this.tradeList.forEach(el => {
                  el.hits = parseInt(el.hits) + parseInt(el.virtual_hits);
                  this.houseTypeList.forEach(e=>{
                    if(e.id == el.house_type){
                      el.houseType=e.name
                    }
                  });
                });
                this.show = true;
                this.finished = false;
              }
            } else {
              if (this.tradeList.length == 0) {
                this.show = false;
              } else {
                if (res.data.data.length == 0) {
                  Toast("没有更多了");
                  this.finished = true;
                } else {
                  this.tradeList = this.tradeList.concat(res.data.data);
                  this.tradeList.forEach(el => {
                    el.hits = parseInt(el.hits) + parseInt(el.virtual_hits);
                    this.houseTypeList.forEach(e=>{
                      if(e.id == el.house_type){
                        el.houseType=e.name
                      }
                    });
                  });
                  this.show = true;
                }
              }
            }
          } else {
            this.finished = true;
            this.show = false;
          }
        })
        .catch(err => 
          {
            console.log(err);
            this.show=false;
            this.loading=false;
            this.finished=true;
            Toast("服务器出小差了");
          }
        );
    },
    enterDetail(i) {
      switch (this.tabi) {
        case 1:
          this.$router.push(`/foodDetail/${i}`);
          break;
        case 2:
          this.$router.push(`/JobDetail/${i}`);
          break;
        case 3:
          this.$router.push(`/marketDetail/${i}`);
          break;
        case 4:
          this.$router.push(`/LifeDetail/${i}`);
          break;
        case 5:
          this.$router.push(`/rentDetail/${i}`);
          break;
        case 6:
          this.$router.push(`/homeDetail/${i}`);
          break;
        default:
          console.log("js");
          break;
      }
    }
  },
  mounted() {
    new Swiper(".swiper-container", {
      slidesPerView: 3,
      slidesPerGroup: 3,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      pagination: {
        el: ".swiper-pagination"
      }
    });
    this.getList();
  },
  components: {
    [Icon.name]: Icon
  }
};
</script>

<style scoped lang="less">
.recommend {
  margin: 0 14px;
  background: #fff;
  .title {
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -8px;
      margin-left: -50%;
      width: 100%;
    }
    h4 {
      line-height: 78px;
      text-align: center;
      font-size: 30px;
      color: #4d4d4d;
    }
  }
  .tabs {
    height: 62px;
    background: #ecf0f1;
    .tab {
      width: 250px;
      height: 62px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ecf0f1;
      border-top: 5px solid transparent;
      span {
        font-size: 26px;
        color: #808080;
      }
    }
    .active {
      border-top-color: #ecf0f1;
      background: #fff;
      span {
        color: #333;
      }
    }
  }
  .list-recommend {
    overflow: hidden;
    background: #fff;
    position: relative;
    min-height: 300px;
    .none {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #b4a078;
      .iconfont {
        font-size: 200px;
      }
      .label {
        text-align: center;
        font-size: 40px;
      }
    }
    .list {
      .list-shop {
        background: #eee;
        li {
          position: relative;
          background: #fff;
          border-radius: 14px;
          width: 100%;
          height: 200px;
          padding: 0 10px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          font-size: 24px;
          margin-top: 10px;
          .browse {
            position: absolute;
            bottom: 15px;
            right: 20px;
            display: flex;
            align-items: center;
            img {
              width: 46px;
              height: 40px;
            }
            span {
              color: #808080;
            }
          }
          img {
            height: 80%;
            width: 160px;
            border-radius: 10px;
            margin-right: 10px;
          }
          .item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width:66%;
            height:159px;
            .title{
              max-width:100%;
            }
            .desc {
              color: #999;
              max-width:100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 28px;
              line-height:30px;
            }
            .prefer {
              color: #f00;
              max-width:92%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .list-job {
        padding: 0 30px;
        position: relative;
        background: #fff;
        .txt {
          font-size: 26px;
          .title {
            color: #575757;
            height: 56px;
            line-height: 56px;
          }
          .content {
            color: #818181;
            display: flex;
            align-items: center;
            height: 42px;
            .wages {
              margin-right: 44px;
              color: #f44;
            }
          }
          .tag {
            display: flex;
            align-items: center;
            height: 60px;
            div {
              padding: 8px;
              font-size: 20px;
              color: rgb(185, 101, 45);
              border: 1px solid rgb(185, 101, 45);
              margin-right: 8px;
            }
          }
        }
        .good {
          position: absolute;
          right: 30px;
          top: 15px;
          font-size: 20px;
          color: #575757;
        }
        .application {
          padding: 16px 26px;
          color: #fdfdfd;
          background: #f44;
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 24px;
        }
        .company {
          height: 60px;
          display: flex;
          align-items: center;
          border-top: 2px solid #cbcbcb;
          position: relative;
          .vip {
            font-size: 20px;
            color: #fff;
            background: #999;
            margin-right: 18px;
          }
          .name {
            font-size: 20px;
            color: #979797;
          }
          .address {
            font-size: 22px;
            position: absolute;
            right: 0;
          }
        }
      }
      .list-used {
        height: 244px;
        border-radius: 10px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 20px;
        position: relative;
        .show {
          width: 164px;
          height: 154px;
          margin-right: 24px;
        }
        .txt {
          display: flex;
          flex-direction: column;
          height: 154px;
          font-size: 24px;
          width: 71%;
          .title {
            font-weight: normal;
            width: 66%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .desc {
            color: #929292;
            padding-left: 8px;
            line-height: 88px;
            width: 66%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .price {
          font-size: 28px;
          color: #ff5d3b;
          position: absolute;
          right: 56px;
          top: 34px;
        }
        .release {
          height: 50px;
          line-height: 50px;
          width: 494px;
          border-top: 2px solid #eaeaea;
          position: absolute;
          bottom: 0;
          left: 208px;
          .date {
            font-size: 26px;
            color: #8f8f8f;
          }
        }
        .browse {
          position: absolute;
          left: 592px;
          bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: 20px;
          color: #999;
          img {
            width: 32px;
            margin-right: 10px;
          }
        }
      }
      .list-life {
        height: 244px;
        border-radius: 10px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 20px;
        position: relative;
        .show {
          width: 164px;
          height: 164px;
          margin-right: 24px;
        }
        .txt {
          color: #929292;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width:71%;
          height:85%;
          .title {
            font-weight: normal;
            color: #333;
            font-size: 32px;
            line-height: 40px;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .desc {
            padding-left: 8px;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size:28px;
            line-height:30px;
          }
          .name {
            padding-left: 8px;
            display: flex;
            align-items: center;
            height: 66px;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              margin-right: 20px;
              display: inline-block;
            }
            .tags {
              display: flex;
              align-items: center;

              .tag {
                color: #ff5834;
                border: 1px solid #ff5834;
                padding: 2px 4px;
                margin-left: 10px;
              }
            }
          }
        }
        .icon-dianhua {
          font-size: 78px;
          color: #d81e06;
          position: absolute;
          right: 40px;
          top: 58px;
        }
      }
      .list-rent {
        height: 244px;
        border-radius: 10px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 20px;
        position: relative;
        .show {
          width: 164px;
          height: 154px;
          margin-right: 24px;
        }
        .txt {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 154px;
          font-size: 24px;
          width: 71%;
          .title {
            font-weight: normal;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .desc {
            color: #929292;
            padding-left: 8px;
            width: 78%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .address {
            color: #929292;
            padding-left: 8px;
            width: 78%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            font-size: 28px;
            color: #ff5d3b;
            padding-left: 8px;
          }
        }
        .icon-dianhua {
          font-size: 78px;
          color: #d81e06;
          position: absolute;
          right: 40px;
        }
        .browse {
          position: absolute;
          right: 20px;
          bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: 20px;
          color: #999;
          img {
            width: 32px;
            margin-right: 10px;
          }
        }
      }
      .list-home {
        height: 244px;
        border-radius: 10px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 20px;
        position: relative;
        .show {
          width: 164px;
          height: 154px;
          margin-right: 24px;
        }
        .txt {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 154px;
          font-size: 24px;
          width: 71%;
          .title {
            font-weight: normal;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .desc{
            color: #929292;
            padding-left: 8px;
            width: 78%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .address {
            color: #929292;
            padding-left: 8px;
            width: 78%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            font-size: 28px;
            color: #ff5d3b;
            padding-left: 8px;
          }
        }
        .icon-dianhua {
          font-size: 78px;
          color: #d81e06;
          position: absolute;
          right: 40px;
        }
        .browse {
          position: absolute;
          right: 20px;
          bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: 20px;
          color: #999;
          img {
            width: 32px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>