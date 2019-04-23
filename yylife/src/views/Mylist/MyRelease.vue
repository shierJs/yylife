<template>
  <div>
    <Head title="我的发布"></Head>
    <div id="main">
      <div class="wrap">
        <!-- 导航栏 -->
        <div class="tabs swiper-container">
          <div class="swiper-wrapper">
            <div
              class="tab swiper-slide"
              v-for="(item,i) in tabs"
              :key="i"
              @click="tab(item.id)"
              :class="{active:tabId==item.id}"
            >
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
        <!-- 导航栏 -->
        <!-- 分类导航 -->
        <div class="cate" @click="catePop=true">
          <span class="name">{{cateName}}</span>
        </div>
        <!-- 分类导航 -->
        <!-- 列表 -->
        <div class="list" v-if="show">
          <div class="cards" v-for="(v,i) in tabs" :key="i" v-show="v.id==tabId">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <van-cell v-for="(item,index) in list" :key="index" style="margin-top:20px;">
                <slot>
                  <div
                    class="card"
                    @touchend="checkIndex(item.shop_id,item.status)"
                    v-show="cateId == 1"
                  >
                    <p class="title">{{item.shop_name}}</p>
                    <p class="time" v-if="item.publish == 1">发布时间：{{item.update_time}}</p>
                    <p class="time" v-else>发布时间：{{item.publish_time}}</p>
                    <p class="status" v-show="item.status == '未发布'">{{item.status}}</p>
                    <p class="status red" v-show="item.status == '已失效'">{{item.status}}</p>
                    <p class="status green" v-show="item.status == '已发布'">{{item.status}}</p>
                    <i
                      class="iconfont icon-lajitong"
                      @touchend.stop="del(item.shop_id,index)"
                      v-if="item.status != '已发布'"
                    ></i>
                  </div>
                  <!-- 美食店铺 -->
                  <div
                    class="card"
                    @touchend.prevent="checkIndex(item.id,item.status)"
                    v-show="cateId == 2"
                  >
                    <p class="title">{{item.title}}</p>
                    <p class="time" v-if="item.publish == 1">发布时间：{{item.update_time}}</p>
                    <p class="time" v-else>发布时间：{{item.publish_time}}</p>
                    <p class="status" v-show="item.status == '未发布'">{{item.status}}</p>
                    <p class="status red" v-show="item.status == '已失效'">{{item.status}}</p>
                    <p class="status green" v-show="item.status == '已发布'">{{item.status}}</p>
                    <i
                      class="iconfont icon-lajitong"
                      @touchend.stop="del(item.id,index)"
                      v-if="item.status != '已发布'"
                    ></i>
                  </div>
                  <!-- 招聘职位 -->
                  <div
                    class="card"
                    @touchend.prevent="checkIndex(item.used_id,item.status)"
                    v-show="cateId == 3"
                  >
                    <p class="title">{{item.used_title}}</p>
                    <p class="time" v-if="item.publish == 1">发布时间：{{item.update_time}}</p>
                    <p class="time" v-else>发布时间：{{item.publish_time}}</p>
                    <p class="status" v-show="item.status == '未发布'">{{item.status}}</p>
                    <p class="status red" v-show="item.status == '已失效'">{{item.status}}</p>
                    <p class="status green" v-show="item.status == '已发布'">{{item.status}}</p>
                    <i
                      class="iconfont icon-lajitong"
                      @touchend.stop="del(item.used_id,index)"
                      v-if="item.status != '已发布'"
                    ></i>
                  </div>
                  <!-- 二手市场 -->
                  <div
                    class="card"
                    @touchend.prevent="checkIndex(item.service_id,item.status)"
                    v-show="cateId == 4"
                  >
                    <p class="title">{{item.service_title}}</p>
                    <p class="time" v-if="item.publish == 1">发布时间：{{item.update_time}}</p>
                    <p class="time" v-else>发布时间：{{item.publish_time}}</p>
                    <p class="status" v-show="item.status == '未发布'">{{item.status}}</p>
                    <p class="status red" v-show="item.status == '已失效'">{{item.status}}</p>
                    <p class="status green" v-show="item.status == '已发布'">{{item.status}}</p>
                    <i
                      class="iconfont icon-lajitong"
                      @touchend.stop="del(item.service_id,index)"
                      v-if="item.status != '已发布'"
                    ></i>
                  </div>
                  <!-- 生活服务 -->
                  <div
                    class="card"
                    @touchend.prevent="checkIndex(item.house_id,item.status)"
                    v-show="cateId == 5"
                  >
                    <p class="title">{{item.house_title}}</p>
                    <p class="time" v-if="item.publish == 1">发布时间：{{item.update_time}}</p>
                    <p class="time" v-else>发布时间：{{item.publish_time}}</p>
                    <p class="status" v-show="item.status == '未发布'">{{item.status}}</p>
                    <p class="status red" v-show="item.status == '已失效'">{{item.status}}</p>
                    <p class="status green" v-show="item.status == '已发布'">{{item.status}}</p>
                    <i
                      class="iconfont icon-lajitong"
                      @touchend.stop="del(item.house_id,index)"
                      v-if="item.status != '已发布'"
                    ></i>
                  </div>
                  <!-- 房屋租赁 -->
                  <div
                    class="card"
                    @touchend.prevent="checkIndex(item.house_id,item.status)"
                    v-show="cateId == 6"
                  >
                    <p class="title">{{item.house_title}}</p>
                    <p class="time" v-if="item.publish == 1">发布时间：{{item.update_time}}</p>
                    <p class="time" v-else>发布时间：{{item.publish_time}}</p>
                    <p class="status" v-show="item.status == '未发布'">{{item.status}}</p>
                    <p class="status red" v-show="item.status == '已失效'">{{item.status}}</p>
                    <p class="status green" v-show="item.status == '已发布'">{{item.status}}</p>
                    <i
                      class="iconfont icon-lajitong"
                      @touchend.stop="del(item.house_id,index)"
                      v-if="item.status != '已发布'"
                    ></i>
                  </div>
                  <!-- 房屋买卖 -->
                </slot>
              </van-cell>
            </van-list>
          </div>
        </div>
        <div class="none" v-else>
          <img src="static/img/no-release.png" alt>
          <span>请选择发布信息分类或者去发布</span>
          <p class="release" @click="toRelease">马上发布</p>
        </div>
        <!-- 列表 -->
      </div>
    </div>
    <van-popup v-model="catePop" position="bottom">
      <van-picker
        show-toolbar
        title="请选择类别"
        :columns="cateList"
        @cancel="onCancel"
        @confirm="cate"
        value-key="name"
      />
    </van-popup>
  </div>
</template>

<script>
import Head from "@/components/Head";
import { Toast } from "vant";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
export default {
  data() {
    return {
      editTxt: "编辑",
      tabs: [
        {
          id: -1,
          name: "全部"
        },
        {
          id: 0,
          name: "已发布"
        },
        {
          id: 1,
          name: "未发布"
        }
      ],
      tabId: -1,
      value: "",
      show: false,
      loading: false,
      finished: false,
      page: 1,
      count: 0,
      list: [
        {
          title: "我是标题防止对方蒂芬阿斯蒂反对法",
          time: "2019-3-22-14:38:09",
          status: "未发布"
        },
        {
          title: "我是标题防止对方蒂芬阿斯蒂反对法",
          time: "2019-3-22-14:38:09",
          status: "已发布"
        },
        {
          title: "我是标题防止对方蒂芬阿斯蒂反对法",
          time: "2019-3-22-14:38:09",
          status: "未发布"
        },
        {
          title: "我是标题防止对方蒂芬阿斯蒂反对法",
          time: "2019-3-22-14:38:09",
          status: "未发布"
        },
        {
          title: "我是标题防止对方蒂芬阿斯蒂反对法",
          time: "2019-3-22-14:38:09",
          status: "已失效"
        },
        {
          title: "我是标题防止对方蒂芬阿斯蒂反对法",
          time: "2019-3-22-14:38:09",
          status: "未发布"
        },
        {
          title: "我是标题防止对方蒂芬阿斯蒂反对法",
          time: "2019-3-22-14:38:09",
          status: "未发布"
        },
        {
          title: "我是标题防止对方蒂芬阿斯蒂反对法",
          time: "2019-3-22-14:38:09",
          status: "未发布"
        }
      ],
      catePop: false,
      cateName: "美食店铺",
      cateId: 1,
      cateList: [
        {
          id: 1,
          name: "美食店铺"
        },
        {
          id: 2,
          name: "求职招聘"
        },
        {
          id: 3,
          name: "二手市场"
        },
        {
          id: 4,
          name: "生活服务"
        },
        {
          id: 5,
          name: "房屋租赁"
        },
        {
          id: 6,
          name: "房屋买卖"
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    toRelease() {
      let token = JSON.parse(localStorage.getItem("tokens"));
      if (!token) {
        Toast("请先登录");
        this.$router.push("/login");
      } else {
        this.$router.push("/release");
      }
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      this.getData();
    },
    checkIndex(id, status) {
      switch (this.cateId) {
        case 1:
          if (status == "已发布") {
            this.$router.push(`/foodDetail/${id}`);
          } else {
            this.$router.push(`/catering/${id}`);
          }
          break;
        case 2:
          if (status == "已发布") {
            this.$router.push(`/jobDetail/${id}`);
          } else {
            this.$router.push(`/recruitment/${id}`);
          }
          break;
        case 3:
          if (status == "已发布") {
            this.$router.push(`/marketDetail/${id}`);
          } else {
            this.$router.push(`/releaseUsed/${id}`);
          }
          break;
        case 4:
          if (status == "已发布") {
            this.$router.push(`/lifeDetail/${id}`);
          } else {
            this.$router.push(`/service/${id}`);
          }
          break;
        case 5:
          if (status == "已发布") {
            this.$router.push(`/rentDetail/${id}`);
          } else {
            this.$router.push(`/rental/${id}`);
          }
          break;
        case 6:
          if (status == "已发布") {
            this.$router.push(`/homeDetail/${id}`);
          } else {
            this.$router.push(`/releaseHomeTrading/${id}`);
          }
          break;
        default:
          if (status == "已发布") {
            this.$router.push(`/foodDetail/${id}`);
          } else {
            this.$router.push(`/catering/${id}`);
          }
          break;
      }
    },
    del(id, index) {
      this.$dialog
        .confirm({
          title: "删除",
          message: "确认发布这条发布吗？"
        })
        .then(() => {
          // on confirm
          switch (this.cateId) {
            case 1:
              let data = {
                shop_id: id
              };
              setInfoApi.delMyShop(data).then(res => {
                if (res.data.code === 200) {
                  this.list.splice(index, 1);
                  Toast(res.data.msg);
                } else if (res.data.code === 10003) {
                  Toast("身份验证已过期，请重新登录");
                  this.defined.removeToken();
                  this.$router.push("/login");
                } else {
                  this.show = false;
                  Toast(res.data.msg);
                }
              }).catch(err=>console.log(err));
              break;
            case 2:
              let data2 = {
                id: id
              };
              setInfoApi.delMyRecruitment(data2).then(res => {
                if (res.data.code === 200) {
                  this.list.splice(index, 1);
                  Toast(res.data.msg);
                } else if (res.data.code === 10003) {
                  Toast("身份验证已过期，请重新登录");
                  this.defined.removeToken();
                  this.$router.push("/login");
                } else {
                  this.show = false;
                  Toast(res.data.msg);
                }
              }).catch(err=>console.log(err));
              break;
            case 3:
              let data3 = {
                used_id: id
              };
              setInfoApi.delMyUsed(data3).then(res => {
                if (res.data.code === 200) {
                  this.list.splice(index, 1);
                  Toast(res.data.msg);
                } else if (res.data.code === 10003) {
                  Toast("身份验证已过期，请重新登录");
                  this.defined.removeToken();
                  this.$router.push("/login");
                } else {
                  this.show = false;
                  Toast(res.data.msg);
                }
              }).catch(err=>console.log(err));
              break;
            case 4:
              let data4 = {
                service_id: id
              };
              setInfoApi.delMyService(data4).then(res => {
                if (res.data.code === 200) {
                  this.list.splice(index, 1);
                  Toast(res.data.msg);
                } else if (res.data.code === 10003) {
                  Toast("身份验证已过期，请重新登录");
                  this.defined.removeToken();
                  this.$router.push("/login");
                } else {
                  this.show = false;
                  Toast(res.data.msg);
                }
              }).catch(err=>console.log(err));
              break;
            case 5:
              let data5 = {
                house_id: id
              };
              setInfoApi.delMyHouseRent(data5).then(res => {
                if (res.data.code === 200) {
                  this.list.splice(index, 1);
                  Toast(res.data.msg);
                } else if (res.data.code === 10003) {
                  Toast("身份验证已过期，请重新登录");
                  this.defined.removeToken();
                  this.$router.push("/login");
                } else {
                  this.show = false;
                  Toast(res.data.msg);
                }
              }).catch(err=>console.log(err));
              break;
            case 6:
              let data6 = {
                house_id: id
              };
              setInfoApi.delMyHouseTrade(data6).then(res => {
                if (res.data.code === 200) {
                  this.list.splice(index, 1);
                  Toast(res.data.msg);
                } else if (res.data.code === 10003) {
                  Toast("身份验证已过期，请重新登录");
                  this.defined.removeToken();
                  this.$router.push("/login");
                } else {
                  this.show = false;
                  Toast(res.data.msg);
                }
              }).catch(err=>console.log(err));
              break;
            default:
              let data7 = {
                shop_id: id
              };
              setInfoApi.delMyShop(data7).then(res => {
                if (res.data.code === 200) {
                  this.list.splice(index, 1);
                  Toast(res.data.msg);
                } else if (res.data.code === 10003) {
                  Toast("身份验证已过期，请重新登录");
                  this.defined.removeToken();
                  this.$router.push("/login");
                } else {
                  this.show = false;
                  Toast(res.data.msg);
                }
              }).catch(err=>console.log(err));
              break;
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    cate(v) {
      this.cateName = v.name;
      this.cateId = v.id;
      this.catePop = false;
      this.page = 1;
      this.getData();
    },
    onCancel() {
      this.catePop = false;
    },
    tab(i) {
      this.tabId = i;
      this.page = 1;
      this.getData();
    },
    getData() {
      this.loading = true;
      this.finished = false;
      let params = {};
      if (this.tabId != -1) {
        params = {
          publish: this.tabId,
          page: this.page
        };
      } else {
        params = {
          page: this.page
        };
      }
      switch (this.cateId) {
        case 1:
          getInfoApi
            .getMyShop(params)
            .then(res => {
              if (res.data.code === 200) {
                if (this.page == 1) {
                  if (res.data.data.length) {
                    this.list = res.data.data;
                    this.show = true;
                    if (this.list.length < 10) {
                      this.loading = false;
                      this.finished = true;
                    } else {
                      this.loading = false;
                    }
                  } else {
                    this.show = false;
                  }
                } else {
                  this.list = this.list.concat(res.data.data);
                  if (this.list.length < 10) {
                    this.loading = false;
                    this.finished = true;
                  } else {
                    this.loading = false;
                  }
                  this.show = true;
                }
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                this.show = false;
                Toast(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        case 2:
          getInfoApi
            .getMyRecruitment(params)
            .then(res => {
              if (res.data.code === 200) {
                if (this.page == 1) {
                  if (res.data.data.length) {
                    this.list = res.data.data;
                    this.show = true;
                    if (this.list.length < 10) {
                      this.loading = false;
                      this.finished = true;
                    } else {
                      this.loading = false;
                    }
                  } else {
                    this.show = false;
                  }
                } else {
                  this.list = this.list.concat(res.data.data);
                  if (res.data.data.length < 10) {
                    this.loading = false;
                    this.finished = true;
                  } else {
                    this.loading = false;
                  }
                  this.show = true;
                }
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                this.show = false;
                Toast(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        case 3:
          getInfoApi
            .getMyUsed(params)
            .then(res => {
              if (res.data.code === 200) {
                if (this.page == 1) {
                  if (res.data.data.length) {
                    this.list = res.data.data;
                    this.show = true;
                    if (this.list.length < 10) {
                      this.loading = false;
                      this.finished = true;
                    } else {
                      this.loading = false;
                    }
                  } else {
                    this.show = false;
                  }
                } else {
                  this.list = this.list.concat(res.data.data);
                  if (res.data.data.length < 10) {
                    this.loading = false;
                    this.finished = true;
                  } else {
                    this.loading = false;
                  }
                  this.show = true;
                }
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                this.show = false;
                Toast(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        case 4:
          getInfoApi
            .getMyService(params)
            .then(res => {
              if (res.data.code === 200) {
                if (this.page == 1) {
                  if (res.data.data.length) {
                    this.list = res.data.data;
                    this.show = true;
                    if (this.list.length < 10) {
                      this.loading = false;
                      this.finished = true;
                    } else {
                      this.loading = false;
                    }
                  } else {
                    this.show = false;
                  }
                } else {
                  this.list = this.list.concat(res.data.data);
                  if (res.data.data.length < 10) {
                    this.loading = false;
                    this.finished = true;
                  } else {
                    this.loading = false;
                  }
                  this.show = true;
                }
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                this.show = false;
                Toast(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        case 5:
          getInfoApi
            .getMyHouseRent(params)
            .then(res => {
              if (res.data.code === 200) {
                if (this.page == 1) {
                  if (res.data.data.length) {
                    this.list = res.data.data;
                    this.show = true;
                    if (this.list.length < 10) {
                      this.loading = false;
                      this.finished = true;
                    } else {
                      this.loading = false;
                    }
                  } else {
                    this.show = false;
                  }
                } else {
                  this.list = this.list.concat(res.data.data);
                  if (res.data.data.length < 10) {
                    this.loading = false;
                    this.finished = true;
                  } else {
                    this.loading = false;
                  }
                  this.show = true;
                }
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                this.show = false;
                Toast(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        case 6:
          getInfoApi
            .getMyHouseTrade(params)
            .then(res => {
              if (res.data.code === 200) {
                if (this.page == 1) {
                  if (res.data.data.length) {
                    this.list = res.data.data;
                    this.show = true;
                    if (this.list.length < 10) {
                      this.loading = false;
                      this.finished = true;
                    } else {
                      this.loading = false;
                    }
                  } else {
                    this.show = false;
                  }
                } else {
                  this.list = this.list.concat(res.data.data);
                  if (res.data.data.length < 10) {
                    this.loading = false;
                    this.finished = true;
                  } else {
                    this.loading = false;
                  }
                  this.show = true;
                }
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                this.show = false;
                Toast(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        default:
          getInfoApi
            .getMyShop(params)
            .then(res => {
              if (res.data.code === 200) {
                if (this.page == 1) {
                  if (res.data.data.length) {
                    this.list = res.data.data;
                    this.show = true;
                    if (this.list.length < 10) {
                      this.loading = false;
                      this.finished = true;
                    } else {
                      this.loading = false;
                    }
                  } else {
                    this.show = false;
                  }
                } else {
                  this.list = this.list.concat(res.data.data);
                  if (res.data.data.length < 10) {
                    this.loading = false;
                    this.finished = true;
                  } else {
                    this.loading = false;
                  }
                  this.show = true;
                }
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                this.show = false;
                Toast(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
      }
    }
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
.edit {
  color: #808080;
}
.del {
  padding-bottom: 100px;
}
#main {
  position: absolute;
  padding-top: 90px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f4f4f4;
  .none {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translate(-50%, -50%);
    width: 500px;
    img {
      width: 400px;
      margin-top: 20px;
    }
    span {
      font-size: 32px;
      color: #666;
    }
    p {
      margin-top: 50px;
      border: 1px solid #f44;
      color: #f44;
      font-size: 32px;
      padding: 10px 40px;
    }
  }
  .wrap {
    .tabs {
      height: 62px;
      .tab {
        width: 34%;
        height: 62px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-size: 26px;
          color: #808080;
        }
      }
      .active {
        background: #808080;
        span {
          color: #fff;
        }
      }
    }
    .cate {
      width: 100%;
      margin-bottom: 20px;
      height: 80px;
      background: #fff;
      text-align: center;
      line-height: 80px;
      .name {
        font-size: 30px;
      }
    }
    .list {
      background: #eee;
      .card {
        background: #fff;
        padding: 20px;
        position: relative;
        p {
          font-size: 26px;
        }
        .title {
          font-weight: 700;
          color: #333;
          width: 100%;
          line-height: 30px;
        }
        .time {
          line-height: 40px;
        }
        .status {
          text-align: right;
        }
        .green {
          color: rgb(26, 131, 26);
        }
        .red {
          color: #f44;
        }
        .iconfont {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 26px;
        }
      }
    }
  }
}
</style>