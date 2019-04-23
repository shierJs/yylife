<template>
    <div>
        <Head :title="title">
            <van-icon name="delete" />
        </Head>
        <transition name="fade2">
            <div id="main" v-show="show">
                 <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="浏览记录" name="first">
                        <div class="watch-record">
                            <div class="record-day">
                                <p class="date">6月29日</p>
                                <div class="item">
                                    <div class="card rent">
                                    <img src="../../../static/img/floorImg03.jpg" alt="">
                                    <div class="content">
                                        <h3 class="title">广益陪读房 抢租嘉盛华庭3期3室看过之后让你流连忘返</h3>
                                        <p class="character">经纪人</p>
                                        <p class="rent-price">3400元/月</p>
                                    </div>
                                    <span class="time">11:44</span>
                                </div>
                                <div class="card job">
                                    <p class="title">诚聘家装设计师10名</p>
                                    <span>长沙/今天</span>
                                    <p class="wages">8000-12000元</p>
                                    <span class="time">11:44</span>
                                </div>
                                </div>
                            </div>
                            <div class="record-day">
                                <p class="date">6月28日</p>
                                <div class="item">
                                    <div class="card job">
                                    <p class="title">平安银行贷款专员</p>
                                    <span>长沙/今天</span>
                                    <p class="wages">面议</p>
                                    <span class="time">14:41</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="拨打记录" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="筛选记录" name="third">角色管理</el-tab-pane>
                </el-tabs>
            </div>
        </transition>
    </div>
</template>

<script>
import Head from "@/components/Head";
import { Icon } from "vant";
export default {
  data() {
    return {
      title: "全部分类",
      show: false,
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {}
  },
  mounted() {
    this.show = true;
  },
  components: {
    Head,
    [Icon.name]:Icon
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  .watch-record {
    background: #d9d9d9;
    .record-day {
      background: #fff;
      margin-bottom: 22px;
      .date {
        padding: 0 30px;
        font-size: 20px;
        color: #515151;
        line-height: 66px;
        border-bottom: 2px solid #e3e3e3;
      }
      .item{
            padding:0 30px;
            .card{
                position: relative;
                .time{
                    position: absolute;
                    right:30px;
                    bottom:36px;
                }
            }
            .rent{
                display: flex;
                align-items: center;
                height:212px;
                border-bottom:1px solid #515151;
                img{
                    width:160px;
                    height:160px;
                    margin-right:50px;
                }
                .content{
                    color:#515151;
                    align-self: flex-start;
                    margin-top:28px;  
                    .title{
                        font-size:30px;
                        font-weight:100;
                    }
                    .character{
                        font-size:22px;
                        line-height:40px;
                    }
                    .rent-price{
                        font-size:30px;
                    }
                }
            }
            .job{
                padding:32px 0;
                color:#515151;
                .title{
                        font-size:30px;
                        font-weight:100;
                }
                span{
                    font-size:22px;
                    margin-bottom:52px;
                    display: block;
                }
                .wages{
                    font-size:30px;
                }
                .time{
                    margin:0;
                }
            }
        }
    }
  }
}
</style>