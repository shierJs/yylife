<template>
  <div>
    <Loading :show="show"></Loading>
    <Head :title="title"></Head>
    <transition name="fade">
      <div id="main" class="mall">
        <!-- 轮播 -->
        <Swiper :banner="banner"></Swiper>
        <!-- 轮播 -->
        <!-- 下拉菜单 -->
        <div class="nav-menu">
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            :props="props"	
            @active-item-change="handleItemChange"
            @change="handleChange"
          ></el-cascader>
          <el-select v-model="type" placeholder="请选择类型" @change="changeType">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
          <el-select v-model="sort" placeholder="智能筛选" @change="changeSort">
            <el-option
              v-for="(item,index) in sortList"
              :key="index"
              :label="item.name"
              :value="item.sort"
            ></el-option>
          </el-select>
        </div>
        <!-- 下拉菜单 -->
        <!-- 列表 -->
        <div class="list-wtap" v-show="none">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <van-cell v-for="(item,index) in list" :key="index">
                <slot>
                  <div class="card" @click="enterDetail(item.goods_id)">
                    <div class="wrap">
                      <img v-lazy="item.original_img" :key="item.original_img" alt class="show">
                      <p class="selling">{{item.goods_remark}}</p>
                    </div>
                    <h4 class="title">{{item.goods_name}}</h4>
                    <p class="price">{{item.shop_price | currency}} 元</p>
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
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import Loading from "@/components/Loading";
import { Toast } from "vant";
import { mapMutations } from "vuex";
import currency from "@/filters/currency.js";
import flow from "@/filters/flow";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源商城,来疯购商城,家电,手机,服装,母婴,美食"
      },
      {
        name: "description",
        content: "沂源在线商城，在线销售进口商品、家电、手机、电脑、服装服饰、母婴、图书、食品等数万个品牌千万种优质商品。便捷、诚信的服务，为您提供愉悦的网上商城购物体验! "
      }
    ]
  },
  data() {
    return {
      title: "来疯购",
      show: false,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      starti: 0,
      count: 0,
      num: 10,
      endi: 0,
      page: 1,
      options: [],
      cate_pid: 0,
      cate_id: "",
      selectedOptions: [],
      optionIndex: 0,
      pid: 0,
      props: {},
      type: undefined,
      typeId: "",
      typeList: [
        {
          type: "",
          name: "全部"
        },
        {
          type: "is_hot",
          name: "热卖"
        },
        {
          type: "is_new",
          name: "新品"
        },
        {
          type: "is_recommend",
          name: "推荐"
        }
      ],
      sort: undefined,
      sortId: "",
      sortList: [
        {
          sort: "default",
          name: "默认"
        },
        {
          sort: "price_desc",
          name: "价格(升序)"
        },
        {
          sort: "price_asc",
          name: "价格(降序)"
        },
        {
          sort: "time",
          name: "上架时间"
        }
      ],
      banner: [
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png",
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png",
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png"
      ],
      none:false,
    };
  },
  methods: {
    getOptions() {
      let params = {
        pid: this.pid
      };
      getInfoApi
        .getMallCate(params)
        .then(res => {
          if (res.data.code === 200) {
            if (this.pid == 0) {
              this.options = res.data.data;
              this.options.forEach(el => {
                return (el.children = []);
              });
              this.props = {
                value: "id",
                label: "name",
                children: "children"
              };
            } else {
              let arr=[];
              arr.push({
                id: '',
                name: "全部",
              })
              res.data.data.forEach(el=>{
                arr.push(el);
              });
              this.options[this.optionIndex].children=arr;
            }
          } else {
            ;
          }
        })
        .catch(err => this.show=false);
    },
    handleChange(val) {
      this.cate_pid = val[0];
      this.cate_id = val[1];
      this.page = 1;
      this.getList();
    },
    changeType(v) {
      this.typeId = v;
      this.page = 1;
      this.getList();
    },
    changeSort(v) {
      this.sortId = v;
      this.page = 1;
      this.getList();
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      let params = {
        page: this.page,
        type: this.typeId,
        sort: this.sortId,
        cate_id: this.cate_id,
        cate_pid: this.cate_pid,
      };
      getInfoApi
        .getMallList(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = this.list.concat(res.data.data);
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
        })
        .catch(err => this.show=false);
    },
    onRefresh() {
      this.page = 1;
      this.getList();
    },
    enterDetail(index) {
      this.$router.push({
        path: `/mallDetail/${index}`
      });
    },
    handleItemChange(val) {
      this.pid = val[0];
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].id == this.pid) {
          this.optionIndex = i;
          this.getOptions();
        }
      };
    },
    getList() {
      let params = {
        page: this.page,
        type: this.typeId,
        sort: this.sortId,
        cate_id: this.cate_id,
        cate_pid: this.cate_pid
      };
      getInfoApi
        .getMallList(params)
        .then(res => {
          if (res.data.code === 200) {
            this.show=true;
            if (res.data.data.length) {
              this.list=[];
              this.list = res.data.data;
              this.isLoading = false;
              this.none=true;
            } else {
              this.isLoading = false;
              this.none=false;
            }
          } else {
            this.isLoading = false;
            this.none=false;
          }
        })
        .catch(err => this.show=false);
    },
    ...mapMutations(["setMallData"])
  },
  mounted() {
    this.getOptions();
    this.getList();
  },
  components: {
    Head,
    Swiper,
    Loading
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  .nav-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120px;
    padding: 0 20px;
    border-bottom: 1px solid #a3a3a3;
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
  .card {
    width: 100%;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom:20px;
    .wrap {
      background: #f4f4f4;
      position: relative;
      padding-bottom: 46px;
      width:100%;
      img {
        margin: 0 auto;
        width: 430px;
        height: 430px;
      }
      .selling {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 46px;
        line-height: 46px;
        background: #ffebd7;
        color: #c4926d;
        font-size: 24px;
        padding:0 20px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .title {
      width: 100%;
      font-size: 24px;
      height: 40px;
      line-height: 40px;
      color: #333;
      font-weight: 400;
      padding-left: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price {
      padding-left: 28px;
      color: #ff9020;
      font-weight: 600;
      font-size: 26px;
      line-height: 50px;
      align-self: flex-start;
    }
  }
}
</style>