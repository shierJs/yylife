<template>
  <div>
    <Head :i="3"></Head>
    <div id="main">
      <div class="wrap">
        <div class="top">
          <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <span class="index" @click="jump">首页</span>
            <i class="iconfont icon-arrow-r-copy"></i>
            <span class="current">二手市场</span>
          </div>
          <!-- 面包屑导航 -->
          <!-- 轮播 -->
          <Swiper :h="400" :position_id="9"></Swiper>
          <!-- 轮播 -->
        </div>
        <div class="main">
          <!-- 筛选 -->
          <div class="filter">
            <div class="wrapper">
              <p class="fl">二手：&emsp;&emsp;</p>
              <ul class="job-list clear">
                <li class="item fl" :class="{active:cateId==''}" @click="changeCate(-1)">
                  <span>全部</span>
                </li>
                <li
                  class="item fl"
                  v-for="(item,index) in cateList"
                  :key="index"
                  :class="{active:cateId==item.id}"
                  @click="changeCate(index)"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="wrapper">
              <p class="fl">新旧：&emsp;&emsp;</p>
              <ul class="job-list clear">
                <li
                  class="item fl"
                  v-for="(item,index) in oldList"
                  :key="index"
                  :class="{active:oldId==item.id}"
                  @click="changeOld(index)"
                >
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="wrapper">
              <p class="fl">地区：&emsp;&emsp;</p>
              <ul class="area-list clear">
                <li
                  class="item fl"
                  @click="changeArea(item.id)"
                  :class="{active:areaId==item.id}"
                  v-for="item in areaList"
                  :key="item.id"
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
              <i-col span="20">
                <ul class="list" v-show="show">
                  <li class="item clear" v-for="(item,index) in list" :key="index">
                    <div class="left fl">
                      <img v-lazy="item.thumb" :key="item.thumb" alt :title="item.used_title">
                    </div>
                    <div class="center fl">
                      <p class="title" @click="enterDetail(item.used_id)">{{item.used_title}}</p>
                      <p class="address">{{item.area_name}}-{{item.address}}</p>
                      <p class="desc-wrap">
                        <span class="desc">分类：{{item.cate_name}}</span>
                        <span class="time">时间：{{item.publish_time}}</span>
                      </p>
                    </div>
                    <div class="right fr">
                      <h3 class="salary" v-if="item.discuss">{{item.selling_price}}元</h3>
                      <h3 class="salary" v-else>面议</h3>
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
                      @click="enterDetail(item.used_id)"
                    >
                      <p class="tag" v-show="index <=3 ">{{index+1}}</p>
                      <img v-lazy="item.thumb" :key="item.thumb" alt class="fl">
                      <div class="content fl">
                        <p class="title">{{item.used_title}}</p>
                        <p class="area">分类：{{item.cate_name}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </i-col>
            </Row>
            <Page :total="total" @on-change="change" :current="secondhandCurrent" v-show="show"/>
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
import { mapState, mapActions, mapMutations } from "vuex";
import Foot from "@/components/Foot";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源二手市场,电子产品,二手车,转让闲置物品"
      },
      {
        name: "description",
        content: "沂源在线二手交易频道是沂源综合的网上二手交易市场，这里有各种二手物品转让信息，二手闲置物品交易平台，您也可以在免费发布各种二手转让信息。"
      }
    ]
  },
  data() {
    return {
      cateList: [],
      hotList: [],
      oldList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "全新"
        },
        {
          id: 2,
          name: "95新"
        },
        {
          id: 3,
          name: "9成新"
        },
        {
          id: 4,
          name: "85新"
        },
        {
          id: 5,
          name: "8成新"
        }
      ],
      list: [],
      total: 0,
      rate: 5,
      secondhandCurrent: 1, //页码
      areaId: "",
      district: [],
      cateId: "",
      oldId: "",
      show: false,
      keyword:""
    };
  },
  mounted() {
    this.getAreaList();
    this.getCate();
    this.getHotList();
    if (this.searchList.key == 3) {
      this.list = this.searchList.list;
      this.keyword=this.searchList.keyword;
      this.list.forEach(el => {
        el.hits = parseInt(el.hits) + parseInt(el.virtual_hits);
        el.publish_time = new Date(parseInt(el.publish_time) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ");
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
    getList() {
      this.$Spin.show();
      let params = {
        page: this.secondhandCurrent,
        old: this.oldId,
        cate_id: this.cateId,
        area_id: this.areaId,
        keyword:this.keyword
      };
      getInfoApi
        .getListUsed(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              this.list.forEach(el => {
                el.hits = parseInt(el.hits) + parseInt(el.virtual_hits);
                el.publish_time = new Date(parseInt(el.publish_time) * 1000)
                  .toLocaleString()
                  .replace(/:\d{1,2}$/, " ");
              });
              this.total = res.data.count;
              this.show = true;
              this.$Spin.hide();
            } else {
              this.show = false;
              this.$Spin.hide();
            }
          } else {
            this.show = false;
            this.$Message.info(res.data.msg);
            this.$Spin.hide();
          }
        })
        .catch(err => {
          console.log('err');
        });
    },
    getCate() {
      getInfoApi
        .getSecondCate()
        .then(res => {
          if (res.data.code === 200) {
            this.cateList = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          console.log('err');
        });
    },
    change(i) {
      //分页获取数据
      this.page = i;
      this.getList();
      sessionStorage.setItem("secondhandCurrent", i); //存页码缓存
      window.scrollTo(0, 600);
    },
    enterDetail(i) {
      let id = i;
      let data = {
        name: "二手市场",
        path: `/secondhand`,
        now: "二手市场详情页"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("second", data);
      this.blank(id);
    },
    blank(id) {
      const { href } = this.$router.resolve({
        path: `/secondhand/secondhandDetail/${id}`, //通过id渲染详情页数据
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    changeArea(i) {
      this.areaId = i;
      this.getList();
    },
    changeCate(i) {
      if (i == -1) {
        this.cateId = "";
        this.getList();
      } else {
        this.cateId = this.cateList[i].id;
        this.getList();
      }
    },
    changeOld(i) {
      this.oldId = this.oldList[i].id;
      this.getList();
    },
    getHotList() {
      let params = {
        type: "hits"
      };
      getInfoApi.getPublishUsed(params).then(res => {
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
    sessionStorage.removeItem("secondhandCurrent"); //组件销毁删除页码缓存
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
              widows:76%;
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