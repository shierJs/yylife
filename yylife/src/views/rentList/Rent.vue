<template>
  <div>
    <Loading :show="show"></Loading>
    <HeadCate :placeholder="prop.v1" :release="prop.v2" push="/search/5"></HeadCate>
    <div id="main">
      <!-- 轮播 -->
      <Swiper :position_id="7"></Swiper>
      <!-- 轮播 -->
      <!-- 下拉菜单 -->
      <div class="nav-menu">
        <el-cascader
          :options="areaList"
          v-model="selectedOptions"
          @change="handleChange"
          :props="props"
        ></el-cascader>
        <el-select v-model="rental" placeholder="租金筛选" @change="changeRental">
          <el-option
            v-for="item in rentPayList"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="rentType" placeholder="租房类型" @change="changeType">
          <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <!-- 下拉菜单 -->
      <!-- 列表 -->
      <div class="list-wtap" v-show="none">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
            <van-cell v-for="(item,index) in list" :key="index">
              <slot>
                <div class="card" @click="enterDetail(item.house_id)">
                  <img v-lazy="item.thumb" :key="item.thumb" alt class="show" :title="item.house_title">
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
  </div>
</template>

<script>
import HeadCate from "@/components/HeadCate";
import Swiper from "@/components/Swiper";
import Loading from "@/components/Loading";
import { mapMutations, mapActions, mapState } from "vuex";
import getInfoApi from "@/api/getInfo";
import { Toast,Icon } from "vant";
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
      prop: {
        v1: "请搜索地址/小区/地铁",
        v2: "/rental"
      },
      rentPayList: [
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
      show: false,
      selectedOptions: [],
      rental: "",
      rentType: undefined,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      page: 1,
      price_small: "",
      price_big: "",
      typeId: "",
      areaId: "",
      props: {},
      none: false,
      keyword:"",
    };
  },
  methods: {
    getOptions() {
      this.props = {
        value: "id",
        label: "name",
        children: "children"
      };
      this.getAreaList();
    },
    handleChange(value) {
      console.log(value);
      this.areaId = value[value.length - 1];
      this.getList();
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      let params = {
        type: this.typeId,
        price_small: this.price_small,
        price_big: this.price_big,
        page: this.page,
        area_id: this.areaId,
        keyword:this.keyword,
      };
      getInfoApi
        .getRentList(params)
        .then(res => {
          if (res.data.code === 200) {
            this.list = this.list.concat(res.data.data);
            this.loading = false;
            if (!res.data.data.length) {
              this.loading = false;
              this.finished = true;
              Toast("没有更多啦");
            }
          } else {
            this.finished = true;
          }
        })
        .catch(err => this.show=false);
    },
    onRefresh() {
      this.page = 1;
      this.keyword="";
      let params = {
        type: this.typeId,
        price_small: this.price_small,
        price_big: this.price_big,
        page: this.page,
        area_id: this.areaId
      };
      getInfoApi
        .getRentList(params)
        .then(res => {
          if (res.data.code === 200) {
            this.list = res.data.data;
            this.isLoading = false;
            if (!res.data.data.length) {
              Toast("没有更多啦");
            }
          } else {
            this.isLoading = false;
          }
        })
        .catch(err => this.show=false);
    },
    enterDetail(index) {
      this.$router.push({
        path: `/rentDetail/${index}`
      });
    },
    changeRental(v) {
      this.price_small = this.rentPayList[v].price_small;
      this.price_big = this.rentPayList[v].price_big;
      this.getList();
    },
    changeType(v) {
      this.typeId = v;
      this.getList();
    },
    getList() {
      let params = {
        area_id: this.areaId,
        type: this.typeId,
        price_small: this.price_small,
        price_big: this.price_big,
        page: this.page,
        area_id: this.areaId
      };
      getInfoApi
        .getRentList(params)
        .then(res => {
          if (res.data.code === 200) {
            this.show = true;
            this.list = res.data.data;
            this.list.forEach(el => {
              return (el.hits = parseInt(el.hits) + parseInt(el.virtual_hits));
            });
            this.none = true;
            if (!res.data.data.length) {
              Toast("没有更多啦");
              this.none = false;
            }
          } else {
            this.none = false;
          }
        })
        .catch(err => this.show=false);
    },
    ...mapMutations(["setRentlist", "clearKeyList"]),
    ...mapActions(["getAreaList"])
  },
  created() {
    this.getOptions();
    if (this.searchList.key == 5) {
      this.list = this.searchList.list;
      this.keyword = this.keyword;
      this.list.forEach(el => {
        return (el.hits = parseInt(el.hits) + parseInt(el.virtual_hits));
      });
      this.show = true;
      this.none = true;
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
    [Icon.name]:Icon,
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
          line-height:30px;
        }
        .desc {
          color: #929292;
          padding-left: 8px;
          width: 78%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height:30px;
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