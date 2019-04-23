<template>
  <div>
    <Loading :show="show"></Loading>
    <HeadCate :placeholder="props.v1" :release="props.v2" push="/search/6"></HeadCate>
    <transition name="fade2">
      <div id="main">
        <!-- 轮播 -->
        <Swiper :position_id="6"></Swiper>
        <!-- 轮播 -->
        <!-- 下拉菜单 -->
        <div class="nav-menu">
          <el-cascader
            :options="areaList"
            :props="props"
            v-model="selectedOptions"
            @change="handleChange"
            placeholder="请选择区域"
          ></el-cascader>
          <el-select v-model="type" placeholder="请选择类型" @change="changeType">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="dec" placeholder="装修情况" @change="changeDec">
            <el-option v-for="item in decList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <!-- 下拉菜单 -->
        <!-- 列表 -->
        <div class="list-wtap" v-show="none">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              :immediate-check="false"
            >
              <van-cell v-for="(item,index) in list" :key="index">
                <slot>
                  <div class="card" @click="enterDetail(item.house_id)">
                    <img v-lazy="item.thumb" :key="item.thumb" alt class="show">
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
                    <svg class="icon top" aria-hidden="true" v-show="item.location == 1">
                      <use xlink:href="#icon-zhiding"></use>
                    </svg>
                  </div>
                </slot>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </div>
        <!-- 列表 -->
        <div class="none" v-show="!none" @click="$router.go(0);">
          <i class="iconfont icon-meiyoushuju"></i>
          <p class="label">暂无数据</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import HeadCate from "@/components/HeadCate";
import Swiper from "@/components/Swiper";
import Loading from "@/components/Loading";
import { mapMutations, mapActions, mapState } from "vuex";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast,Icon } from "vant";
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
      props: {
        v1: "请搜索地址/小区/地铁",
        v2: "/releaseHomeTrading"
      },
      show: false,
      selectedOptions: [],
      areaId: "",
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      props: {
        value: "id",
        label: "name",
        children: "children"
      },
      type: undefined,
      typeId: "",
      keyword:"",
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
      dec: undefined,
      decId: "",
      decList: [
        {
          id: "",
          name: "不限"
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
      page: 1,
      none:false,
    };
  },
  methods: {
    getMenu() {
      this.http.get("/api/menuData").then(res => {
        this.menuData = res.data.data;
      });
    },
    handleChange(value) {
      console.log(value);
      this.areaId = value[value.length - 1];
      this.getList();
    },
    changeType(v) {
      this.typeId = v;
      this.getList();
    },
    changeDec(v) {
      this.decId = v;
      this.getList();
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      let params = {
        type: this.typeId,
        decoration_type: this.decId,
        page: this.page,
        area_id:this.areaId,
        keyword:this.keyword,
      };
      getInfoApi
        .getHomeTradeList(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = this.list.concat(res.data.data);  
              this.list.forEach(el => {
                el.houseType = this.houseTypeList[el.house_type-1].name;
                el.hits = parseInt(el.hits) + el.virtual_hits;
              });
              this.loading = false;
              this.show = true;
            } else {
              this.loading=false;
              this.finished = true;
              Toast("没有更多啦");
            }
          } else {
            this.loading=false;
            this.finished = true;
          }
        })
        .catch(err => this.show=false);
    },
    onRefresh() {
      this.page = 1;
      this.keyword="";
      this.getList();
    },
    enterDetail(index) {
      this.$router.push({
        path: `/homeDetail/${index}`
      });
    },
    getList() {
      let params = {
        type: this.typeId,
        decoration_type: this.decId,
        page: this.page,
        area_id:this.areaId,
      };
      getInfoApi
        .getHomeTradeList(params)
        .then(res => {
          if (res.data.code === 200) {
            this.show=true;
            if (res.data.data.length) {
              this.list = res.data.data;
              this.isLoading = false;
              this.list.forEach(el => {
                el.houseType = this.houseTypeList[el.house_type-1].name;
                el.hits = parseInt(el.hits) + el.virtual_hits;
              });
              this.none=true;
            } else {
              this.none=false;
            }
          } else {
            this.none=false;
            this.show=true;
          }
        })
        .catch(err => this.show=false);
    },
    ...mapMutations(["setRentlist", "clearKeyList"]),
    ...mapActions(["getAreaList"])
  },
  created() {
    this.getAreaList();
    if (this.searchList.key == 6) {
      this.list = this.searchList.list;
      this.keyword = this.searchList.keyword;
      this.list.forEach(el => {
        el.houseType = this.houseTypeList[el.house_type-1].name;
        el.hits = parseInt(el.hits) + el.virtual_hits;
      });
      this.show = true;
      this.none = true;
      this.isLoading = false;
    } else {
      this.getList();
    }
  },
  beforeDestroy() {
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
    HeadCate,
    Swiper,
    Loading,
    [Icon.name]:Icon
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  width: 100%;
  overflow: hidden;
  .nav-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120px;
    padding: 0 20px;
  }
  .list-wtap {
    background: #eee;
    .card {
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
        min-height: 154px;
        font-size: 28px;
        width: 71%;
        .title {
          font-weight: normal;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 30px;
        }
        .desc {
          color: #929292;
          padding-left: 8px;
          width: 78%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 30px;
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
      .top {
        position: absolute;
        right: 0;
        top: 0;
        width: 70px;
        height: 70px;
      }
    }
  }
  .none {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #b4a078;
    margin-top:150px;
    .iconfont {
      font-size: 240px;
    }
    .label {
      text-align: center;
      font-size: 50px;
    }
  }
}
</style>