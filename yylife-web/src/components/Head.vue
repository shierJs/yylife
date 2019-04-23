<template>
  <div>
    <header id="head">
      <AD></AD>
      <div class="top">
        <div class="wrap clear">
          <ul class="list clear fr">
            <li v-show="showUser">
              <span>{{user.username}}</span>
            </li>
            <li @click="showLog" v-show="!showUser">
              <span class="login">登录</span>
            </li>
            <li @click="$router.push('/log/0')" v-show="!showUser">
              <span class="register">注册</span>
            </li>
            <li v-show="showUser">
              <Dropdown @on-click="enterMine">
                <router-link to="/mine/0" target="_self">个人中心
                  <Icon type="ios-arrow-down"></Icon>
                </router-link>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="(item,index) in personList" :name="index" :key="index">
                    <span  style="color:#333;">{{item}}</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            <li>
              <span class="mobile">移动端</span>
            </li>
            <li>
              <span class="help" @click="$router.push('/help')">帮助中心</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap content">
        <Row>
          <i-col span="8">
            <h1 class="logo">
              <img src="../../static/img/logo512.png"  @click="refresh" alt title="沂源生活">
            </h1>
          </i-col>
          <i-col span="8">
            <div class="search">
              <Row>
                <i-col span="6">
                  <Select v-model="model1" @on-change="changeKey">
                    <Option
                      v-for="item in menuList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </i-col>
                <i-col span="18">
                  <i-input
                    search
                    enter-button="搜索"
                    placeholder="请输入关键字"
                    @on-search="search"
                    v-model="searchKey"
                  />
                </i-col>
              </Row>
            </div>
          </i-col>
          <i-col span="8">
            <div class="release" v-show="showRelease">
              <Tooltip content="去发布" placement="right">
                <div @click="enterRelease">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fabu"></use>
                  </svg>
                  <span>发布信息</span>
                </div>
              </Tooltip>
            </div>
          </i-col>
        </Row>
      </div>
      <div class="nav">
        <div class="wrap">
          <ul class="nav-list clear">
            <li
              :class="{active:i==index}"
              v-for="(item,index) in navList"
              :key="index"
              @click="change(index)"
            >
              <span>{{item}}</span>
            </li>
            <li class="mine">
              <!-- <div class="mines" @click="$router.push('/mine/1')" v-show="showUser">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xinfeng"></use>
                </svg>
              </div> -->
              <div class="mines" @click="$router.push('/mine/0')" v-show="showUser">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-gerenzhongxin-copy-copy"></use>
                </svg>
              </div>
              <div @click="enterCart">
                <Badge :count="cart" :offset="[24,-5]">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gouwuche1"></use>
                  </svg>
                </Badge>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 登录注册弹出层 -->
      <Log></Log>
      <!-- 登录注册弹出层 -->
      <Modal v-model="modal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>退出登录</span>
        </p>
        <div style="text-align:center">
          <p>确认退出登录?</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long :loading="loading" @click="del">确认</Button>
        </div>
      </Modal>
    </header>
  </div>
</template>

<script>
import AD from "./AD";
import Log from "./Log";
import { mapMutations } from "vuex";
import getInfoApi from "@/api/getInfo";
export default {
  props: {
    i: {
      type: Number,
      default: 0
    },
    showRelease: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      cart: 0,
      modal: false,
      loading: false,
      keys: "",
      searchKey: "",
      timer:null,
      user: {
        username: ""
      },
      menuList: [
        {
          value: 1,
          label: "美食"
        },
        {
          value: 2,
          label: "求职招聘"
        },
        {
          value: 3,
          label: "二手市场"
        },
        {
          value: 4,
          label: "生活服务"
        },
        {
          value: 5,
          label: "房屋租赁"
        },
        {
          value: 6,
          label: "房屋买卖"
        }
      ],
      personList: ["我的收藏", "我的订单", "我的发布", "退出登录"],
      navList: [
        "首页",
        "美食",
        "招聘",
        "二手市场",
        "商城",
        "生活服务",
        "租房",
        "房屋买卖",
        "头条"
      ],
      model1: "",
      showModel: false,
      showUser: false
    };
  },
  methods: {
    change(i) {
      //列表跳转
      switch (i) {
        case 0:
          this.$router.push("/");
          break;
        case 1:
          this.$router.push("/food");
          break;
        case 2:
          this.$router.push("/recruitment");
          break;
        case 3:
          this.$router.push("/secondhand");
          break;
        case 4:
          this.$router.push("/mall");
          break;
        case 5:
          this.$router.push("/life");
          break;
        case 6:
          this.$router.push("/rent");
          break;
        case 7:
          this.$router.push("/homeTrading");
          break;
        case 8:
          this.$router.push("/headLine");
          break;
        default:
          this.$router.push("/");
          break;
      }
    },
    getCartNum() {
      getInfoApi
        .getCartList()
        .then(res => {
          if (res.data.code === 200) {
            this.cart=res.data.data.length;
          } else if (res.data.code === 10003) {
            this.defined.removeToken();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    changeKey(v) {
      this.keys = v;
    },
    search() {
      //搜索
      if (this.keys == "") {
        this.$Message.warning("请选择搜索类别");
      } else {
        let params = {
          page: 1,
          keyword: this.searchKey
        };
        this.$router.push("/");
        switch (this.keys) {
          case 1:
            getInfoApi
              .getShopList(params)
              .then(res => {
                if (res.data.code === 200) {
                  if (!res.data.data.length) {
                    this.$Message.info("搜索暂无结果，查看下其他内容吧");
                    this.searchKey = "";
                  } else {
                    let data = {
                      key: this.keys,
                      list: res.data.data,
                      count: res.data.count,
                      keyword:this.searchKey
                    };
                    this.getKeyList(data);
                    this.$router.push("/food");
                  }
                } else {
                  this.searchKey = "";
                  this.$Message.warning(res.data.msg);
                }
              })
              .catch(err => this.$router.push("/notFound"));
            break;
          case 2:
            getInfoApi
              .getJobList(params)
              .then(res => {
                if (res.data.code === 200) {
                  if (!res.data.data.length) {
                    this.$Message.info("搜索暂无结果，查看下其他内容吧");
                    this.searchKey = "";
                  } else {
                    let data = {
                      key: this.keys,
                      list: res.data.data,
                      count: res.data.count,
                      keyword:this.searchKey
                    };
                    this.getKeyList(data);
                    this.$router.push("/recruitment");
                  }
                } else {
                  this.searchKey = "";
                  this.$Message.warning(res.data.msg);
                }
              })
              .catch(err => this.$router.push("/notFound"));
            break;
          case 3:
            getInfoApi
              .getListUsed(params)
              .then(res => {
                if (res.data.code === 200) {
                  if (!res.data.data.length) {
                    this.$Message.info("搜索暂无结果，查看下其他内容吧");
                    this.searchKey = "";
                  } else {
                    let data = {
                      key: this.keys,
                      list: res.data.data,
                      count: res.data.count,
                      keyword:this.searchKey
                    };
                    this.getKeyList(data);
                    this.$router.push("/secondhand");
                  }
                } else {
                  this.searchKey = "";
                  this.$Message.warning(res.data.msg);
                }
              })
              .catch(err => this.$router.push("/notFound"));
            break;
          case 4:
            getInfoApi
              .getLifeList(params)
              .then(res => {
                if (res.data.code === 200) {
                  if (!res.data.data.length) {
                    this.$Message.info("搜索暂无结果，查看下其他内容吧");
                    this.searchKey = "";
                  } else {
                    let data = {
                      key: this.keys,
                      list: res.data.data,
                      count: res.data.count,
                      keyword:this.searchKey
                    };
                    this.getKeyList(data);
                    this.$router.push("/life");
                  }
                } else {
                  this.searchKey = "";
                  this.$Message.warning(res.data.msg);
                }
              })
              .catch(err => this.$router.push("/notFound"));
            break;
          case 5:
            getInfoApi
              .getRentList(params)
              .then(res => {
                if (res.data.code === 200) {
                  if (!res.data.data.length) {
                    this.$Message.info("搜索暂无结果，查看下其他内容吧");
                    this.searchKey = "";
                  } else {
                    let data = {
                      key: this.keys,
                      list: res.data.data,
                      count: res.data.count,
                      keyword:this.searchKey
                    };
                    this.getKeyList(data);
                    this.$router.push("/rent");
                  }
                } else {
                  this.searchKey = "";
                  this.$Message.warning(res.data.msg);
                }
              })
              .catch(err => this.$router.push("/notFound"));
            break;
          case 6:
            getInfoApi
              .getHomeTradeList(params)
              .then(res => {
                if (res.data.code === 200) {
                  if (!res.data.data.length) {
                    this.$Message.info("搜索暂无结果，查看下其他内容吧");
                    this.searchKey = "";
                  } else {
                    let data = {
                      key: this.keys,
                      list: res.data.data,
                      count: res.data.count,
                      keyword:this.searchKey
                    };
                    this.getKeyList(data);
                    this.$router.push("/homeTrading");
                  }
                } else {
                  this.searchKey = "";
                  this.$Message.warning(res.data.msg);
                }
              })
              .catch(err => this.$router.push("/notFound"));
            break;
        }
      }
    },
    enterRelease() {
      //发布
      this.blank("/release");
    },
    refresh() {
      //新标签页打开
      const { href } = this.$router.resolve({
        path: "/",
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    blank(path) {
      const { href } = this.$router.resolve({
        path: path,
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    enterMine(name) {
      //进入我的页面
      if (name === 3) {
        this.modal = true;
      } else {
        name+=2;
        this.$router.push(`/mine/${name}`);
      }
    },
    del() {
      //退出登录
      this.loading = true;
      clearTimeout(this.timer);
      this.timer=setTimeout(() => {
        this.loading = false;
        this.showUser = false;
        this.modal = false;
        this.defined.removeToken();
        this.$Message.success("已经退出登录");
        sessionStorage.removeItem('user');
        this.$router.go(0);      
      }, 500);
    },
    enterCart() {
      //进入购物车
      this.$router.push({
        path: "/mall/mallCart"
      });
    },
    showLog() {
      //登录
      let bool = true;
      this.setShowLog(bool);
    },
    showReg() {
      //注册
      let bool = false;
      this.setShowLog(bool);
    },
    getInfo() {
      //获取登录用户信息
      getInfoApi.getInfo().then(res => {
        if (res.data.code === 10003) {
          this.defined.removeToken();
          this.showUser = false;
        } else if (res.data.code === 200) {
          let user = res.data.data;
          this.user = user;
          if (user.username === "") {
            this.user.username = user.mobile;
          } else {
            this.user.username = user.username;
          }
          sessionStorage.setItem("user", JSON.stringify(this.user));
          this.showUser = true;
        } else {
          this.showUser = false;
        }
      });
    },
    positionSet(){
      let len = $(".nav").offset().top;
    this.getCartNum()
    let that = this;
    $(window).scroll(function() {
      let iTop = $(document).scrollTop();
      if (iTop > len) {
        $(".nav").css({
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 10,
          background: "#fff",
          width: "100%",
          boxShadow: "0px 1px 1px #999"
        });
        if (that.showUser) {
          $(".nav .nav-list .mine .mines").css({
            display: "inline-block"
          });
        } else {
          $(".nav .nav-list .mine .mines").css({
            display: "none"
          });
        }
        $("#main").css({
          marginTop: 76
        });
      } else {
        $(".nav").css({
          position: "relative",
          boxShadow: "none"
        });
        $(".nav .nav-list .mine .mines").css({
          display: "none"
        });
        $("#main").css({
          marginTop: 0
        });
      }
    });
    },
    ...mapMutations(["setShowLog", "getKeyList"])
  },
  mounted() {
    this.getInfo();
    this.positionSet();
  },
  beforeDestroy(){
    clearTimeout(this.timer);
  },
  components: {
    AD,
    Log
  }
};
</script>

<style scoped lang="less">
#head {
  width: 100%;
  .top {
    background: #333;
    height: 36px;
    .list {
      height: 100%;
      line-height: 36px;
      li {
        float: left;
        margin-left: 30px;
        span {
          font-size: 12px;
          color: #cccccc;
        }
        span:hover {
          cursor: pointer;
        }
        a {
          color: #ccc;
        }
        .ivu-dropdown-item {
          float: none;
          margin: 0;
        }
      }
    }
  }
  .content {
    h1 {
      img {
        width: 150px;
        height:150px;
      }
    }
    .search {
      line-height: 150px;
      .ivu-i-input-wrapper {
        margin-top: 59px;
        margin-left: 10px;
      }
    }
    .release {
      height: 150px;
      text-align: center;
      position: relative;
      .ivu-tooltip {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -24px;
        cursor: pointer;
        background: #f0f0f0;
        padding: 5px 10px;
        border-radius: 10px;
        .icon {
          width: 32px;
          height: 32px;
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
  .nav {
    height: 76px;
    .nav-list {
      li {
        float: left;
        width: 8%;
        line-height: 76px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin-right: 24px;
      }
      .mine {
        div {
          display: inline-block;
          width: 30%;
          .icon {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
        }
        .mines {
          display: none;
        }
      }
      .active {
        span {
          color: #b4a078;
          border-bottom: 3px solid #b4a078;
          cursor: pointer;
          padding-bottom: 10px;
        }
      }
      li:hover {
        span {
          color: #b4a078;
          border-bottom: 3px solid #b4a078;
          cursor: pointer;
          padding-bottom: 10px;
        }
      }
      li:last-child:hover {
        span {
          padding: 0;
          border: none;
        }
      }
    }
  }
  .model {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    .card {
      width: 380px;
      height: 400px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .log,
      .reg {
        padding: 0 50px;
        .title {
          font-size: 20px;
          height: 50px;
          line-height: 50px;
          text-align: center;
        }
        .form {
          .btn {
            height: 38px;
            line-height: 38px;
            font-size: 16px;
            text-align: center;
            color: #fff;
            background: #b4a078;
            border-radius: 4px;
            cursor: pointer;
            margin: 0;
          }
          .btn:hover {
            background: #d3c19e;
          }
          .yanzhen {
            display: inline-block;
            img {
              height: 27px;
            }
          }
        }
        .weixin {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 45px;
          background: #f4f4f4;
          font-size: 16px;
          text-align: center;
          color: #ccc;
          .iconfont {
            margin-right: 120px;
            font-size: 30px;
            vertical-align: middle;
          }
          .iconfont:hover {
            color: #25be03;
            cursor: pointer;
          }
          span:hover {
            color: #999;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>