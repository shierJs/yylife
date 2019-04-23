<template>
  <div>
    <Loading :show="show"></Loading>
    <div>
      <HeadCate :placeholder="tlt.v2" :push="tlt.push" :release="tlt.v3"></HeadCate>
      <div id="main">
        <!-- 轮播 -->
        <Swiper :position_id="8"></Swiper>
        <!-- 轮播 -->
        <!-- 下拉菜单 -->
        <div class="nav-menu">
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
            :props="props"
          ></el-cascader>
          <el-select v-model="salary" placeholder="请选择薪资" @change="changeSalary">
            <el-option v-for="item in salarys" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="types" placeholder="请选择类型" @change="changeType">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                  <div class="card" @click="enterDetail(index)">
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
        <div class="bottom-list" v-show="none">
          <p v-for="(item,i) in moreList" :key="i" @click="changeCate(item.id)">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import HeadCate from "@/components/HeadCate";
import Swiper from "@/components/Swiper";
import { Toast } from "vant";
import { mapMutations, mapState } from "vuex";
import flow from "@/filters/flow";
import getInfoApi from "@/api/getInfo";
export default {
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "沂源找工作,沂源招聘求职,沂源人才,沂源招聘"
      },
      {
        name: "description",
        content: "沂源招聘求职频道为您提供大量的沂源招聘信息,求职简历信息，是沂源地区综合招聘求职平台，您也可以免费发布招聘职位，求职简历信息。"
      }
    ]
  },
  data() {
    return {
      tlt: {
        v2: "找工作，就找我",
        push: "/search/2",
        v3: "/recruitment"
      },
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
      moreList: [
        "销售",
        "促销导购",
        "营业员",
        "餐饮管理",
        "保安",
        "服务员",
        "司机/交通",
        "技工/普工",
        "服务员",
        "司机/交通",
        "技工/普工",
        "营业员"
      ],
      salarys: [
        {
          name: "不限",
          monthly_pay_small: "",
          monthly_pay_big: "",
          id: 0
        },
        {
          name: "3000元以下",
          monthly_pay_small: "",
          monthly_pay_big: 3000,
          id: 1
        },
        {
          name: "3000-5000元",
          monthly_pay_small: 3000,
          monthly_pay_big: 5000,
          id: 2
        },
        {
          name: "5000-8000元",
          monthly_pay_small: 5000,
          monthly_pay_big: 8000,
          id: 3
        },
        {
          name: "8000-10000元",
          monthly_pay_small: 8000,
          monthly_pay_big: 10000,
          id: 4
        },
        {
          name: "10000-12000元",
          monthly_pay_small: 10000,
          monthly_pay_big: 12000,
          id: 5
        },
        {
          name: "12000元",
          monthly_pay_small: 12000,
          monthly_pay_big: "",
          id: 6
        }
      ],
      typeList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "全职"
        },
        {
          id: 2,
          name: "兼职"
        }
      ],
      salary: "",
      types: "",
      cateId: "",
      typeId: "",
      small_salary: "",
      big_salary: "",
      areaId: "",
      none: false,
      timer:null,
      keyword:'',
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
          this.show=false;
        });
    },
    getCate() {
      getInfoApi
        .getJobCate()
        .then(res => {
          if (res.data.code === 200) {
            this.moreList = res.data.data;
          } else {
            ;
          }
        })
        .catch(err => {
          this.show=false;
        });
    },
    handleChange(value) {
      this.areaId = value[value.length - 1];
      this.getList();
    },
    changeSalary(v) {
      this.small_salary = this.salarys[v].monthly_pay_small;
      this.big_salary = this.salarys[v].monthly_pay_big;
      this.getList();
    },
    changeType(v) {
      this.typeId = v;
      this.getList();
    },
    changeCate(i) {
      this.cateId = i;
      this.getList();
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      let params = {
        page: this.page,
        type: this.typeId,
        cate_id: this.cateId,
        area_id: this.areaId,
        monthly_pay_small: this.small_salary,
        monthly_pay_big: this.big_salary,
        keyword:this.keyword,
      };
      getInfoApi
        .getJobList(params)
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            if(res.data.data.length){
              this.list = this.list.concat(res.data.data);
              this.list.forEach(el => {
                return (el.recruitment_label = el.recruitment_label.slice(0, 5));
              });
            }else{
              Toast("没有更多啦");
              this.finished=true;
            }
          } else {
            console.log(res.data.msg);
            this.finished=true;
          }
        })
        .catch(err => {
          clearTimeout(this.timer);
          this.timer=setTimeout(() => {
            Toast("服务器出小差了,稍后再试吧");
            this.finished = true;
          }, 2000);
        });
    },
    onRefresh() {
      this.page = 1;
      this.keyword="";
      this.getList();
    },
    getList() {
      let params = {
        page: this.page,
        type: this.typeId,
        cate_id: this.cateId,
        area_id: this.areaId,
        monthly_pay_small: this.small_salary,
        monthly_pay_big: this.big_salary
      };
      getInfoApi
        .getJobList(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              this.list.forEach(el => {
                return (el.recruitment_label = el.recruitment_label.slice(
                  0,
                  5
                ));
              });
              this.isLoading = false;
              this.none=true;
            } else {
              this.none=false;
            }
          } else {
            this.isLoading = false;
          }
        })
        .catch(err => {
          this.show=false;
          clearTimeout(this.timer);
          this.timer=setTimeout(() => {
            Toast("服务器出小差了,稍后再试吧");
            this.isLoading = false;
          }, 2000);
        });
    },
    getData() {
      let params = {
        page: this.page,
        type: this.typeId,
        cate_id: this.cateId,
        area_id: this.areaId,
        monthly_pay_small: this.small_salary,
        monthly_pay_big: this.big_salary
      };
      getInfoApi
        .getJobList(params)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.list = res.data.data;
              ;
              this.list.forEach(el => {
                return (el.recruitment_label = el.recruitment_label.slice(
                  0,
                  5
                ));
              });
              this.show = true;
              this.none=true;
              this.isLoading = false;
            } else {
              this.list = [];
              this.show = true;
              this.none = false;
              this.isLoading = false;
            }
          } else {
            this.isLoading = false;
            this.show = false;
          }
        })
        .catch(err => {
          this.show=false;
          clearTimeout(this.timer);
          this.timer=setTimeout(() => {
            Toast("服务器出小差了,稍后再试吧");
            this.isLoading = false;
          }, 2000);
        });
    },
    enterDetail(index) {
      this.$router.push({
        path: `/JobDetail/${this.list[index].id}`
      });
    },
    ...mapMutations(["setJobData", "clearKeyList"])
  },
  mounted() {
    //获取菜单列表
    this.getOption();
    this.getCate();
    if (this.searchList.key == 2) {
      this.list = this.searchList.list;
      this.keyword = this.searchList.keyword;
      this.list.forEach(el => {
        return (el.recruitment_label = el.recruitment_label.slice(0, 5));
      });
      this.show = true;
      this.none = true;
      this.isLoading = false;
    } else {
      this.getData();
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
  padding-top: 90px;
  width: 100%;
  overflow: hidden;
  .nav-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: #fff;
  }
  .list {
    .card {
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
  .bottom-list {
    margin-top: 24px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 0 88px;
    width:100%;
    justify-content: space-around;
    p {
      font-size: 22px;
      color: #666;
      text-align: center;
      line-height: 72px;
    }
  }
}
</style>