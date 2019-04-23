<template>
  <div>
    <Loading :show="show"></Loading>
    <HeadCate :placeholder="tlt.v2" push="/search/1"></HeadCate>
    <transition name="fade2">
      <div id="main">
        <!-- 轮播 -->
        <Swiper :position_id="5"></Swiper>
        <!-- 轮播 -->
        <!-- 下拉菜单 -->
        <div class="nav-menu">
          <el-cascader :options="options" v-model="area" :props="props" @change="changeArea"></el-cascader>
          <el-select v-model="cate" placeholder="请选择" @change="changeCate">
            <el-option v-for="item in cateList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="sort" placeholder="智能排序" @change="changeSort">
            <el-option
              v-for="(item,index) in sortList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- 下拉菜单 -->
        <!-- 列表 -->
        <div class="list" v-show="none">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              :immediate-check="false"
            >
              <van-cell v-for="(item,index) in list" :key="index">
                <slot>
                  <ul class="list-wrap">
                    <li @click="enterDetail(item.shop_id)">
                      <img v-lazy="item.thumb" :key="item.thumb" alt>
                      <div class="item">
                        <h3 class="title">{{item.shop_name | flow}}</h3>
                        <span class="desc">{{item.intro}}</span>
                        <span class="prefer">{{item.discounts}}</span>
                      </div>
                      <div class="browse">
                        <img src="/static/img/icon/eye.png" alt>
                        <span>{{item.hits}}</span>
                      </div>
                      <svg class="icon top" aria-hidden="true" v-show="item.location == 1">
                        <use xlink:href="#icon-zhiding"></use>
                      </svg>
                    </li>
                  </ul>
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
import flow from "@/filters/flowTitle.js";
import { mapState, mapActions, mapMutations } from "vuex";
import { Toast } from "vant";
import getInfoApi from "@/api/getInfo";
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
      tlt: {
        v2: "海底捞火锅"
      },
      show: false,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      page: 1,
      options: [],
      props: {},
      area: [],
      areaId: "",
      cateList: [],
      cateId: "",
      cate: "",
      keyword:'',
      sortList: [
        {
          value: "hits",
          label: "按浏览量排序"
        },
        {
          value: "collection",
          label: "按收藏排序"
        }
      ],
      sortId: "",
      sort: "",
      none: false,
      timer:null,
    };
  },
  methods: {
    getOption() {
      getInfoApi
        .getAllArea()
        .then(res => {
          if (res.data.code === 200) {
            this.options = res.data.data;
            this.options.unshift({
              id: "",
              name: "全部"
            });
            this.props = {
              value: "id",
              label: "name",
              children: "children"
            };
          }
        })
        .catch(err => {
          clearTimeout(this.timer);
          this.timer=setTimeout(() => {
            Toast("服务器出小差了,稍后再试吧");
            this.finished = true;
            this.show=false;
          }, 2000);
        });
    },
    getCate() {
      getInfoApi
        .getShopCate()
        .then(res => {
          if (res.data.code === 200) {
            this.cateList = res.data.data;
            this.cateList.unshift({
              id: undefined,
              name: "不限"
            });
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(err => this.show=false);
    },
    getList() {
      let params = {
        page: this.page,
        cate_id: this.cateId,
        area_id: this.areaId
      };
      getInfoApi.getShopList(params).then(res => {
        ;
        if (res.data.code === 200) {
          this.show=true;
          if (res.data.data.length) {
            this.list = res.data.data;
            this.list.forEach(el => {
              return (el.hits = parseInt(el.hits) + parseInt(el.virtual_hits));
            });
            this.show = true;
            this.none = true;
          } else {
            this.none=false;
            Toast("没有更多了");
          }
        } else {
          this.none=false;
          this.show=true;
        }
      }).catch(err=>this.show=false);
    },
    changeArea(value) {
      this.areaId = value[value.length - 1];
      this.getList();
    },
    changeCate(v) {
      this.cateId = v;
      this.getList();
    },
    changeSort() {
      this.sortId = v;
      this.getList();
    },
    onLoad() {
      this.page++;
      // 异步更新数据
      let params = {
        page: this.page,
        cate_id: this.cateId,
        area_id: this.areaId,
        keyword:this.keyword,
      };
      getInfoApi.getShopList(params).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.length) {
            this.list = this.list.concat(res.data.data);
            this.list.forEach(el => {
              return (el.hits = parseInt(el.hits) + parseInt(el.virtual_hits));
            });
            this.loading = false;
          } else {
            Toast("没有更多了");
            this.loading = false;
            this.finished = true;
          }
        } else {
          this.loading = false;
          this.finished = true;
        }
      }).catch(err => {
          clearTimeout(this.timer);
          this.timer=setTimeout(() => {
            Toast("服务器出小差了,稍后再试吧");
            this.finished = true;
            this.show=false;
          }, 2000);
        });
    },
    onRefresh() {
      this.page = 1;
      this.keyword="";
      let params = {
        page: this.page,
        cate_id: this.cateId,
        area_id: this.areaId
      };
      getInfoApi.getShopList(params).then(res => {
        ;
        if (res.data.code === 200) {
          if (res.data.data.length) {
            this.list = res.data.data;
            this.list.forEach(el => {
              return (el.hits = parseInt(el.hits) + parseInt(el.virtual_hits));
            });
            this.show = true;
            this.isLoading = false;
          } else {
            this.isLoading = false;
            Toast("没有更多了");
          }
        } else {
          this.isLoading = false;
        }
      });
    },
    enterDetail(i) {
      this.$router.push({
        path: `/foodDetail/${i}`
      });
    },
    ...mapMutations(["clearKeyList"])
  },
  mounted() {
    this.getOption();
    this.getCate();
    if (this.searchList.key == 1) {
      this.list = this.searchList.list;
      this.keyword = this.searchList.keyword;
      this.list.forEach(el => {
        return (el.hits = parseInt(el.hits) + parseInt(el.virtual_hits));
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
    searchList() {
      return this.$store.state.searchList;
    }
  },
  components: {
    HeadCate,
    Swiper,
    Loading
  }
};
</script>

<style scoped lang="less">
#main {
  margin-top: 90px;
  width: 100%;
  overflow: hidden;
  .nav-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120px;
    padding: 0 20px;
  }
  .list-wrap li {
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
      }
      .prefer {
        color: #f00;
        max-width:92%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
  .none {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color:#b4a078;
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