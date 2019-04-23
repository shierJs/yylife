<template>
  <div>
    <Loading :show="show"></Loading>
    <HeadCate :placeholder="props.v1" push="/search/4"></HeadCate>
    <transition name="fade2">
      <div id="main">
        <!-- 轮播 -->
        <Swiper :position_id="10"></Swiper>
        <!-- 轮播 -->
        <!-- 下拉菜单 -->
        <div class="nav-menu">
          <el-cascader
            :options="areaList"
            v-model="selectedOptions"
            :props="props"
            @change="handleChange"
          ></el-cascader>
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
                  <div class="card" @click="enterDetail(item.service_id)">
                    <img v-lazy="item.thumb" :key="item.thumb" alt class="show">
                    <div class="txt">
                      <h4 class="title">{{item.service_title}}</h4>
                      <span class="desc">地址：{{item.address}} 分类：{{item.cate_name}}</span>
                      <div class="name">
                        <span>{{item.area_name}}</span>
                        <div class="tags">
                          <p
                            class="tag"
                            v-for="(v,i) in item.service_label"
                            :key="i"
                          >{{v.label_name}}</p>
                        </div>
                      </div>
                    </div>
                    <i class="iconfont icon-dianhua"></i>
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
import { Toast } from "vant";
import { mapActions, mapState } from "vuex";
import getInfoApi from "@/api/getInfo";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源生活服务, 沂源商家大全, 沂源本地服务,搬家,家政"
      },
      {
        name: "description",
        content: "沂源生活服务频道,是沂源地区综合的本地生活服务平台,是本地综合的商家展示平台。为您提供沂源搬家公司, 沂源家政服务, 沂源月嫂, 沂源装修建材, 沂源餐饮娱乐, 沂源教育培训, 沂源婚庆等本地服务的精准商家务信息查询和发布。"
      }
    ]
  },
  data() {
    return {
      props: {
        v1: "请输入您想找的生活服务",
        v2: "/search/4"
      },
      show: false,
      keyword:"",
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
      props: {
        value: "id",
        label: "name",
        children: "children"
      },
      areaId: "",
      cateList: [],
      cate: "",
      cateId: "",
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
      none: false
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
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
      // 异步更新数据
      this.page++;
      let params = {
        page: this.page,
        cate_id: this.cateId,
        sort: this.sortId,
        area_id:this.areaId,
        keyword:this.keyword,
      };
      getInfoApi
        .getLifeList(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = this.list.concat(res.data.data);
              this.loading = false;
            } else {
              Toast("没有更多啦");
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
      this.keyword="";
      let params = {
        page: this.page,
        cate_id: this.cateId,
        sort: this.sortId,
        area_id:this.areaId,
      };
      getInfoApi
        .getLifeList(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              this.isLoading = false;
            } else {
              this.isLoading = false;
            }
          } else {
            this.isLoading = false;
          }
        })
        .catch(err => this.show=false);
    },
    enterDetail(index) {
      this.$router.push({
        path: `/LifeDetail/${index}`
      });
    },
    getCate() {
      getInfoApi.getLifeCate().then(res => {
        if (res.data.code === 200) {
          this.cateList = res.data.data;
        } else {
          ;
        }
      });
    },
    getList() {
      let params = {
        page: this.page,
        cate_id: this.cateId,
        sort: this.sortId,
        area_id:this.areaId
      };
      getInfoApi
        .getLifeList(params)
        .then(res => {
          if (res.data.code === 200) {
            this.show = true;
            if (res.data.data.length) {
              this.list = res.data.data;
              this.none = true;
            } else {
              this.none = false;
            }
          } else {
            this.show = false;
          }
        })
        .catch(err => this.show=false);
    },
    ...mapActions(["getAreaList", "clearKeyList"])
  },
  mounted() {
    this.getAreaList();
    this.getCate();
    if (this.searchList.key == 4) {
      this.list = this.searchList.list;
      this.keyword = this.searchList.keyword;
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
      height: 200px;
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
        color: #929292;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width:71%;
        height:90%;
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
          line-height: 30px;
          font-size: 28px;
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
           line-height: 40px;
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