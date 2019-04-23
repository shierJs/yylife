<template>
  <div>
    <header id="head">
      <img src="../../static/img/icon/arrowLeft.png" alt class="left" @click="$router.go(-1)">
      <div class="search">
        <input type="text" placeholder="请输入您想要找的内容" v-model="keys" @keydown.13="search">
      </div>
      <img src="../../static/img/sousuo.png" alt class="camera" @click="search">
    </header>
    <transition name="fade2">
      <div id="main" v-show="show">
        <div class="wrap history">
          <h4 class="title">最近搜索</h4>
          <div class="list">
            <div class="item" v-for="(item ,index) in history" :key="index"  @click="searchHis(item)">
              <span>{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Toast } from "vant";
import getInfoApi from "@/api/getInfo";
export default {
  data() {
    return {
      show: false,
      history: [],
      id: "",
      keys: ""
    };
  },
  methods: {
    shows() {
      alert(12);
    },
    search() {
      //搜索
      if (this.keys == "") {
        Toast("请输入搜索关键词");
      } else {
        if (this.id == 0) {
          this.$router.push("/");
        } else {
          let params = {
            page: 1,
            keyword: this.keys
          };
          switch (this.id) {
            case 1:
              getInfoApi
                .getShopList(params)
                .then(res => {
                  if (res.data.code === 200) {
                    if (!res.data.data.length) {
                      Toast("搜索暂无结果，查看下其他内容吧");
                      this.keys = "";
                    } else {
                      let data = {
                        key: this.id,
                        list: res.data.data,
                        count: res.data.count,
                        keyword:this.keys,
                      };
                      this.setHistory(this.keys);
                      this.getKeyList(data);
                      this.$router.push("/food");
                    }
                  } else {
                    this.keys = "";
                    Toast(res.data.msg);
                  }
                })
                .catch(err => this.$router.push('/notFound'));
              break;
            case 2:
              getInfoApi
                .getJobList(params)
                .then(res => {
                  if (res.data.code === 200) {
                    if (!res.data.data.length) {
                      Toast("搜索暂无结果，查看下其他内容吧");
                      this.keys = "";
                    } else {
                      let data = {
                        key: this.id,
                        list: res.data.data,
                        count: res.data.count,
                        keyword:this.keys,
                      };
                      this.setHistory(this.keys);
                      this.getKeyList(data);
                      this.$router.push("/job");
                    }
                  } else {
                    this.keys = "";
                    Toast(res.data.msg);
                  }
                })
                .catch(err => this.$router.push('/notFound'));
              break;
            case 3:
              getInfoApi
                .getListUsed(params)
                .then(res => {
                  if (res.data.code === 200) {
                    if (!res.data.data.length) {
                      Toast("搜索暂无结果，查看下其他内容吧");
                      this.keys = "";
                    } else {
                      let data = {
                        key: this.id,
                        list: res.data.data,
                        count: res.data.count,
                        keyword:this.keys,
                      };
                      this.setHistory(this.keys);
                      this.getKeyList(data);
                      this.$router.push("/market");
                    }
                  } else {
                    this.keys = "";
                    Toast(res.data.msg);
                  }
                })
                .catch(err => this.$router.push('/notFound'));
              break;
            case 4:
              getInfoApi
                .getLifeList(params)
                .then(res => {
                  if (res.data.code === 200) {
                    if (!res.data.data.length) {
                      Toast("搜索暂无结果，查看下其他内容吧");
                      this.keys = "";
                    } else {
                      let data = {
                        key: this.id,
                        list: res.data.data,
                        count: res.data.count,
                        keyword:this.keys,
                      };
                      this.setHistory(this.keys);
                      this.getKeyList(data);
                      this.$router.push("/life");
                    }
                  } else {
                    this.keys = "";
                    Toast(res.data.msg);
                  }
                })
                .catch(err => this.$router.push('/notFound'));
              break;
            case 5:
              getInfoApi
                .getRentList(params)
                .then(res => {
                  if (res.data.code === 200) {
                    if (!res.data.data.length) {
                      Toast("搜索暂无结果，查看下其他内容吧");
                      this.keys = "";
                    } else {
                      let data = {
                        key: this.id,
                        list: res.data.data,
                        count: res.data.count,
                        keyword:this.keys,
                      };
                      this.setHistory(this.keys);
                      this.getKeyList(data);
                      this.$router.push("/rent");
                    }
                  } else {
                    this.keys = "";
                    Toast(res.data.msg);
                  }
                })
                .catch(err => this.$router.push('/notFound'));
              break;
            case 6:
              getInfoApi
                .getHomeTradeList(params)
                .then(res => {
                  if (res.data.code === 200) {
                    if (!res.data.data.length) {
                      Toast("搜索暂无结果，查看下其他内容吧");
                      this.keys = "";
                    } else {
                      let data = {
                        key: this.id,
                        list: res.data.data,
                        count: res.data.count,
                        keyword:this.keys,
                      };
                      this.setHistory(this.keys);
                      this.getKeyList(data);
                      this.$router.push("/homeTradingList");
                    }
                  } else {
                    this.keys = "";
                    Toast(res.data.msg);
                  }
                })
                .catch(err => this.$router.push('/notFound'));
              break;
          }
        }
      }
    },
    searchHis(v){
        this.keys=v;
        this.search();
    },
    setHistory(v){
        let his=localStorage.getItem("searchHistory");
        if(v==0){
            if(his){
                this.history=JSON.parse(his);
            }else{
                let history=JSON.stringify(this.history);
                localStorage.setItem("searchHistory",history);
            }
        }else{
            if(!his){
            this.history.push(v);
            let history=JSON.stringify(this.history);
            localStorage.setItem("searchHistory",history);
        }else{
            this.history=JSON.parse(his);
            let i=this.history.indexOf(v);
            if(i==-1){
                this.history.push(v);
            }else{
                return;
            }
            if(this.history.length>=10){
                this.history.shift();
                let history=JSON.stringify(this.history);
                localStorage.setItem("searchHistory",history);
            }else{
                let history=JSON.stringify(this.history);
                localStorage.setItem("searchHistory",history);
            }
        }
        }
    },
    ...mapMutations(["getKeyList"])
  },
  mounted() {
    this.show = true;
    this.id = parseInt(this.$route.params.id);
    this.setHistory(0);
  }
};
</script>

<style scoped lang="less">
#head {
  width: 100%;
  height: 100px;
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  border-bottom: 3px solid #aaa;
  display: flex;
  align-items: center;
  padding: 0 40px;
  justify-content: space-between;
  img {
    width: 44px;
    height: 44px;
  }
  .search {
    width: 522px;
    height: 68px;
    border-radius: 28px;
    background: #dadada;
    display: flex;
    align-items: center;
    padding: 20px;
    padding-left: 40px;
    input {
      background: #dadada;
      border: 0;
      outline: none;
    }
  }
}
#main {
  padding-top: 100px;
  .wrap {
    padding: 0 24px;
    .title {
      height: 60px;
      line-height: 60px;
      font-size: 26px;
      color: #808080;
      font-weight: normal;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      .item {
        padding: 21px;
        background: #ccc;
        font-size: 24px;
        color: #6e6e6e;
        text-align: center;
        margin-right: 20px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>