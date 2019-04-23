<template>
    <div>
        <HeadCate :placeholder="props.v1"></HeadCate>
        <transition name="fade2">
            <div id="main" v-show="show">
                <!-- 轮播 -->
                <Swiper :position_id="11"></Swiper>
                <!-- 轮播 -->
                <!-- 下拉菜单 -->
               <div class="nav-menu">
                    <el-cascader
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                    <el-select v-model="v.title" placeholder="请选择" v-for="(v,index) in menuData" :key="index">
                        <el-option
                        v-for="item in v.item"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
               </div>
               <!-- 下拉菜单 -->
               <!-- 列表 -->
               <div class="list-wtap">
                   <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                        >
                            <van-cell
                                v-for="(item,index) in list"
                                :key="index"
                            >
                            <slot>
                                <div class="card" @click="enterDetail(index)">
                                    <img v-lazy="item.imgSrc" :key="item.imgSrc" alt="" class="show">
                                    <div class="txt">
                                        <h4 class="title">{{item.title}}</h4>
                                        <span class="desc">{{item.desc}}</span>
                                        <div class="address">
                                            <van-icon name="location" />
                                            <span>{{item.address}}</span>
                                        </div>
                                        <p class="price">{{item.rent}} 元</p>
                                    </div>
                                    <i class="iconfont icon-dianhua"></i>
                                </div>
                            </slot>
                            </van-cell>
                        </van-list>
                    </van-pull-refresh>
               </div>
               <!-- 列表 -->
            </div>
        </transition>
                
    </div>
</template>

<script>
import HeadCate from "@/components/HeadCate";
import Swiper from "@/components/Swiper";
import {mapMutations} from 'vuex'
import { Toast,Icon } from "vant";
export default {
  data() {
    return {
      props: {
        v1: "请搜索宠物种类",
      },
      menuData: [],
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
    };
  },
  methods: {
    getMenu() {
      this.http.get("/api/menuData").then(res => {
        this.menuData = res.data.data;
      });
    },
    getOptions() {
      this.http.get("/api/options").then(res => {
        this.options = res.data.data;
      });
    },
    handleChange(value) {
      console.log(value);
    },
    onLoad() {
      // 异步更新数据
      this.http.get("/api/Rentlist").then(res => {
        this.count++;
        this.endi = this.num * this.count;
        this.starti = this.endi - this.num;
        let listData = res.data.data;
        this.setRentlist(listData);
        if (this.endi > listData.length) {
            //判断加载条数是否大于总数据的长度
          this.list = this.list.concat(listData.slice(this.starti, listData.length));
          //数据加载完成
          this.loading = false;
        } else {
          this.list = this.list.concat(listData.slice(this.starti, this.endi));
          //数据加载完成
          this.loading = false;
        }
        if (this.starti + 1 >= listData.length) {
            Toast('已经是最后了');
            this.finished = true;
            //数据全部加载完成
        }
      });
    },
     onRefresh() {
      this.http.get("/api/Rentlist").then((res)=>{
          let data=res.data.data.slice(0,10);
          this.list.splice(0,10);
          for(let i=0;i<10;i++){
              this.list.unshift(data[i]);
          }
          this.isLoading=false;
      })
    },
    enterDetail(index){
        this.$router.push({
            path:`/petDetail/${index}`
        })
    },
    ...mapMutations(['setRentlist'])
  },
  mounted() {
    this.show = true;
    //获取菜单列表
    this.getMenu();
    this.getOptions();
  },
  components: {
    HeadCate,
    Swiper,
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
  .list-wtap{
    background: #eee;
    .card{
        height:244px;
        border-radius: 10px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding:0 20px;
        position: relative;
        .show{
            width:164px;
            height:154px;
            margin-right:24px;
        }
        .txt{
            display: flex;
            flex-direction:column;
            justify-content: space-between;
            height:154px;
            font-size:24px;
            .title{               
                font-weight: normal;
            }
            .desc{
                color:#929292;
                padding-left:8px;
            }
            .address{
                color:#929292;
                padding-left:8px;
            }
            .price{
                font-size:28px;
                color:#FF5D3B;
                padding-left:8px;
            }
        }
        .icon-dianhua{
            font-size:78px;
            color:#D81E06;
            position: absolute;
            right:40px;
        }
    }
  }
}
</style>