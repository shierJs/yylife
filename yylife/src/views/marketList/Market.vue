<template>
  <div>
    <Loading :show="show"></Loading>
    <div>
      <HeadCate :placeholder="tlt.v1" :release="tlt.v2" push="/search/3"></HeadCate>
      <div id="main">
        <!-- 轮播 -->
        <Swiper :position_id="9"></Swiper>
        <!-- 轮播 -->
        <!-- 下拉菜单 -->
        <div class="nav-menu">
          <el-cascader
            :options="options"
            :props="props"
            v-model="selectedOptions"
            @change="handleChange"
          ></el-cascader>
          <el-select v-model="cate" placeholder="请选择" @change="changeCate">
            <el-option v-for="item in menuData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="old" placeholder="请选择" @change="changeOld">
            <el-option v-for="item in oldList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                  <div class="card" @click="enterDetail(index)">
                    <img v-lazy="item.thumb" :key="item.thumb" alt class="show" :title="item.used_title">
                    <div class="txt">
                      <h4 class="title">{{item.used_title}}</h4>
                      <span class="desc">分类{{item.cate_name}}</span>
                    </div>
                    <p class="price">{{item.selling_price}} 元</p>
                    <div class="release">
                      <p class="date">发布:{{item.publish_time}}</p>
                    </div>
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
  </div>
</template>

<script>
import HeadCate from "@/components/HeadCate";
import Swiper from "@/components/Swiper";
import { Toast } from "vant";
import { mapMutations, mapState } from "vuex";
import getInfoApi from "@/api/getInfo";
import Loading from "@/components/Loading";
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
      tlt: {
        v1: "请输入想要的物品",
        v2: "/used"
      },
      menuData: [],
      old: "",
      oldId: "",
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
      show: false,
      options: [],
      selectedOptions: [],
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      starti: 0,
      count: 0,
      num: 10,
      endi: 0,
      page: 1,
      props: {},
      cate: "",
      cateId: "",
      area_id: "",
      none: false,
      keyword:"",
    };
  },
  methods: {
    getMenu() {
      getInfoApi
        .getUsedCate()
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.menuData = res.data.data;
              this.menuData.unshift({
                id: "",
                name: "全部"
              });
            }
          }
        })
        .catch(err => {
          this.show=false;
        });
    },
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
          this.show=false;
        });
    },
    handleChange(value) {
      this.area_id = value[value.length - 1];
      this.getList();
    },
    changeCate(v) {
      this.cateId = v;
      this.getList();
    },
    changeOld(v) {
      this.oldId = v;
      console.log(this.oldId);
      this.getList();
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      let params = {
        page: this.page,
        old: this.oldId,
        cate_id: this.cateId,
        area_id: this.area_id,
        keyword:this.keyword,
      };
      getInfoApi
        .getListUsed(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = this.list.concat(res.data.data);
              this.list.forEach(el => {
                el.hits = parseInt(el.hits) + parseInt(el.virtual_hits);
                el.publish_time = new Date(parseInt(el.publish_time) * 1000)
                  .toLocaleString()
                  .replace(/:\d{1,2}$/, " ");
              });
              this.loading=false;
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
        .catch(err => {
          this.show=false;
          this.finished = true;
        });
    },
    onRefresh() {
      this.getList();
      this.keyword="";
    },
    enterDetail(index) {
      let id = this.list[index].used_id;
      this.$router.push({
        path: `/marketDetail/${id}`
      });
    },
    getList(i) {
      let params = {
        page: 1,
        old: this.oldId,
        cate_id: this.cateId,
        area_id: this.area_id
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
              this.show = true;
              this.isLoading = false;
              this.none = true;
            } else {
              this.list = [];
              this.show = true;
              this.isLoading = false;
              this.none = false;
            }
          }
        })
        .catch(err => {
          this.show=false;
        });
    },
    ...mapMutations(["setMarketData"])
  },
  mounted() {
    //获取菜单列表
    this.getMenu();
    this.getOption();
    if (this.searchList.key == 3) {
      this.list = this.searchList.list;
      this.keyword = this.searchList.keyword;
      this.list.forEach(el => {
        el.hits = parseInt(el.hits) + parseInt(el.virtual_hits);
        el.publish_time = new Date(parseInt(el.publish_time) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ");
      });
      this.show = true;
      this.none = true;
      this.isLoading = false;
    } else {
      this.getList();
    }
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
        height: 154px;
        font-size: 24px;
        width:72%;
        overflow: hidden;
        .title {
          font-weight: normal;
          width: 66%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height:40px;
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