<template>
  <div>
    <div class="wrapper">
      <div class="pick">
        <RadioGroup v-model="publish" type="button" @on-change="changeState">
          <Radio :label="-1">全部</Radio>
          <Radio :label="0">已发布</Radio>
          <Radio :label="1">未发布</Radio>
        </RadioGroup>
      </div>
      <Tabs @on-click="tab">
        <TabPane :label="commondity" class="tab1">
          <div class="col-list" v-if="cmdTf">
            <Table
              :columns1="recruitmentCol"
              :data="recruitmentList"
              @del="del"
              @detail="detail"
              @edit="edit"
              @release="release"
              :loading="loading"
              :control="control"
            ></Table>
            <Modal v-model="modal1" title="您确认删除这条发布消息吗" @on-ok="ok">
              <p>请您慎重考虑一下哦</p>
            </Modal>
          </div>
          <div class="none" v-else>
            <div class="none-icon"></div>
            <p>还没有任何发布呢</p>
          </div>
        </TabPane>
        <!-- 招聘发布数据 -->
        <TabPane :label="rent">
          <div class="col-list" v-if="cmdTf">
            <Table
              :columns1="rentCol"
              :data="rentList"
              @del="del"
              @detail="detail"
              @edit="edit"
              @release="release"
              :loading="loading"
            ></Table>
            <Modal v-model="modal1" title="您确认删除这条发布消息吗" @on-ok="ok">
              <p>请您慎重考虑一下哦</p>
            </Modal>
          </div>
          <div class="none">
            <div class="none-icon"></div>
            <p>还没有任何发布呢</p>
          </div>
        </TabPane>
        <!-- 租房发布 -->
        <TabPane :label="shop">
          <div class="col-list" v-if="cmdTf">
            <Table
              :columns1="shopCol"
              :data="shopList"
              @del="del"
              @detail="detail"
              @edit="edit"
              @release="release"
              :loading="loading"
            ></Table>
            <Modal v-model="modal1" title="您确认删除这条发布消息吗" @on-ok="ok">
              <p>请您慎重考虑一下哦</p>
            </Modal>
          </div>
          <div class="none">
            <div class="none-icon"></div>
            <p>还没有任何发布呢</p>
          </div>
        </TabPane>
        <!-- 发布店铺 -->
        <TabPane :label="used">
          <div class="col-list" v-if="cmdTf">
            <Table
              :columns1="usedCol"
              :data="usedList"
              @del="del"
              @detail="detail"
              @edit="edit"
              @release="release"
              :loading="loading"
            ></Table>
            <Modal v-model="modal1" title="您确认删除这条发布消息吗" @on-ok="ok">
              <p>请您慎重考虑一下哦</p>
            </Modal>
          </div>
          <div class="none">
            <div class="none-icon"></div>
            <p>还没有任何发布呢</p>
          </div>
        </TabPane>
        <!-- 发布二手物品 -->
        <TabPane :label="trade">
          <div class="col-list" v-if="cmdTf">
            <Table
              :columns1="tradeCol"
              :data="tradeList"
              @del="del"
              @detail="detail"
              @edit="edit"
              @release="release"
              :loading="loading"
            ></Table>
            <Modal v-model="modal1" title="您确认删除这条发布消息吗" @on-ok="ok">
              <p>请您慎重考虑一下哦</p>
            </Modal>
          </div>
          <div class="none">
            <div class="none-icon"></div>
            <p>还没有任何发布呢</p>
          </div>
        </TabPane>
        <!-- 发布房屋买卖 -->
        <TabPane :label="life">
          <div class="col-list" v-if="cmdTf">
            <Table
              :columns1="lifeCol"
              :data="lifeList"
              @del="del"
              @detail="detail"
              @edit="edit"
              @release="release"
              :loading="loading"
            ></Table>
            <Modal v-model="modal1" title="您确认删除这条发布消息吗" @on-ok="ok">
              <p>请您慎重考虑一下哦</p>
            </Modal>
          </div>
          <div class="none">
            <div class="none-icon"></div>
            <p>还没有任何发布呢</p>
          </div>
        </TabPane>
        <!-- 发布生活服务 -->
      </Tabs>
      <div class="clearfix" style="margin-top:10px;">
        <Page style="float:right;" :total="total" :current="current" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
export default {
  data() {
    return {
      cmdTf: true,
      index: "",
      modal1: false,
      loading: true,
      publish: -1,
      control: "编辑",
      timer:null,
      i: 0,
      recruitmentCol: [
        {
          title: "职业招聘标题",
          key: "title",
          align: "center",
          tooltip: true
        },
        {
          title: "发布时间",
          key: "publish_time",
          align: "center"
        },
        {
          title: "发布状态",
          key: "status",
          align: "center"
        }
      ],
      recruitmentList: [],
      rentCol: [
        {
          title: "房屋租赁标题",
          key: "house_title",
          tooltip: true,
          align: "center"
        },
        {
          title: "发布时间",
          key: "publish_time",
          align: "center"
        },
        {
          title: "发布状态",
          key: "status",
          align: "center"
        }
      ],
      rentList: [],
      shopCol: [
        {
          title: "美食店铺标题",
          key: "shop_name",
          tooltip: true,
          align: "center"
        },
        {
          title: "发布时间",
          key: "publish_time",
          align: "center"
        },
        {
          title: "发布状态",
          key: "status",
          align: "center"
        }
      ],
      shopList: [],
      usedCol: [
        {
          title: "二手物品标题",
          key: "used_title",
          tooltip: true,
          align: "center"
        },
        {
          title: "发布时间",
          key: "publish_time",
          align: "center"
        },
        {
          title: "发布状态",
          key: "status",
          align: "center"
        }
      ],
      usedList: [],
      tradeCol: [
        {
          title: "房屋买卖标题",
          key: "house_title",
          tooltip: true
        },
        {
          title: "发布时间",
          key: "publish_time",
          align: "center"
        },
        {
          title: "发布状态",
          key: "status",
          align: "center"
        }
      ],
      tradeList: [],
      lifeCol: [
        {
          title: "生活服务标题",
          key: "service_title",
          tooltip: true,
          align: "center"
        },
        {
          title: "发布时间",
          key: "publish_time",
          align: "center"
        },
        {
          title: "发布状态",
          key: "status",
          align: "center"
        }
      ],
      lifeList: [],
      commondity: h => {
        return h("div", [h("span", "招聘发布")]);
      },
      rent: h => {
        return h("div", [
          h("span", {
            domProps: {
              innerHTML: "租房发布"
            }
          })
        ]);
      },
      shop: h => {
        return h("div", [h("span", "店铺发布")]);
      },
      used: h => {
        return h("div", [h("span", "二手发布")]);
      },
      trade: h => {
        return h("div", [h("span", "房屋发布")]);
      },
      life: h => {
        return h("div", [h("span", "服务发布")]);
      },
      total: 1,
      current: 1
    };
  },
  methods: {
    del(index) {
      this.modal1 = true;
      this.index = index;
    },
    detail(params) {
      switch (this.i) {
        case 0:
          //进入详情页
          let data = {
            name: "我的发布",
            path: "/mine/5/myRelease",
            now: "招聘详情页"
          };
          data = JSON.stringify(data);
          sessionStorage.setItem("jobBread", data);
          this.$router.push(`/recruitment/jobDetail/${params.id}`);
          break;
        case 1:
          let data2 = {
            name: "我的发布",
            path: "/mine/5/myRelease",
            now: "房屋出租详情页"
          };
          data2 = JSON.stringify(data2);
          sessionStorage.setItem("rentBread", data2);
          this.$router.push(`/rent/rentDetail/${params.house_id}`);
          break;
        case 2:
          let data3 = {
            name: "我的发布",
            path: "/mine/5/myRelease",
            now: "美食详情页"
          };
          data3 = JSON.stringify(data3);
          sessionStorage.setItem("foodBread", data3);
          this.$router.push(`/food/foodDetail/${params.shop_id}`);
          break;
        case 3:
          let data4 = {
            name: "我的发布",
            path: "/mine/5/myRelease",
            now: "二手市场详情页"
          };
          data4 = JSON.stringify(data4);
          sessionStorage.setItem("second", data4);
          this.$router.push(`/secondhand/secondhandDetail/${params.used_id}`);
          break;
        case 4:
          let data5 = {
            name: "我的发布",
            path: "/mine/5/myRelease",
            now: "房屋买卖详情页"
          };
          data5 = JSON.stringify(data5);
          sessionStorage.setItem("homeBread", data5);
          this.$router.push(
            `/homeTrading/homeTradingDetail/${params.house_id}`
          );
          break;
        case 5:
          let data6 = {
            name: "我的收藏",
            path: "/mine/3/collection",
            now: "生活服务详情页"
          };
          data6 = JSON.stringify(data6);
          sessionStorage.setItem("lifeBread", data6);
          this.$router.push(`/life/lifeDetail/${params.service_id}`);
          break;
        default:
          let data7 = {
            name: "我的发布",
            path: "/mine/5/myRelease",
            now: "招聘详情页"
          };
          data7 = JSON.stringify(data7);
          sessionStorage.setItem("jobBread", data7);
          this.$router.push(`/recruitment/jobDetail/${params.id}`);
          break;
      }
    },
    release(params){
      switch(this.i){
        case 0:
        this.$router.push(`/release/releasePay/5/${params.id}`);
        break;
        case 1:
        this.$router.push(`/release/releasePay/1/${params.house_id}`);
        break;
        case 2:
        this.$router.push(`/release/releasePay/6/${params.shop_id}`);
        break;
        case 3:
        this.$router.push(`/release/releasePay/3/${params.used_id}`);
        break;
        case 4:
        this.$router.push(`/release/releasePay/2/${params.house_id}`);
        break;
        case 5:
        this.$router.push(`/release/releasePay/4/${params.service_id}`);
        break;
      }
    },
    edit(row) {
      let data = {
        path: "/mine/5/myRelease",
        name: "我的发布",
        now: "编辑发布"
      };
      data = JSON.stringify(data);
      sessionStorage.setItem("releasebread", data);
      switch (this.i) {
        case 0:
          this.$router.push(`/release/releaseJob/${row.id}`);
          break;
        case 1:
          this.$router.push(`/release/releaseRent/${row.house_id}`);
          break;
        case 2:
          this.$router.push(`/release/releaseCatering/${row.shop_id}`);
          break;
        case 3:
          this.$router.push(`/release/releaseUsed/${row.used_id}`);
          break;
        case 4:
          this.$router.push(`/release/releaseTrade/${row.house_id}`);
          break;
        case 5:
          this.$router.push(`/release/releaseLife/${row.service_id}`);
          break;
        default:
          this.$router.push(`/release/releaseJob/${row.id}`);
          break;
      }
    },
    tab(i) {
      this.i = i;
      this.current = 1;
      this.getList();
    },
    getList() {
      let params = {};
      this.loading = true;
      if (this.publish == -1) {
        params = {
          page: this.current
        };
      } else {
        params = {
          page: this.current,
          publish: this.publish
        };
      }
      switch (this.i) {
        case 0:
          getInfoApi
            .getMyRecruitment(params)
            .then(res => {
              if (res.data.code === 200) {
                this.recruitmentList = res.data.data;
                if (res.data.data.length == 0) {
                  this.loading = true;
                  clearTimeout(this.timer);
                  this.timer=setTimeout(() => {
                    this.loading = false;
                  }, 1000);
                } else {
                  this.recruitmentList.forEach(el => {
                    if (el.publish == 1) {
                      this.recruitmentCol[1].key = "create_time";
                    } else {
                      this.recruitmentCol[1].key = "publish_time";
                    }
                  });
                  this.loading = false;
                  this.total = res.data.count;
                }
              } else if (res.data.code === 10003) {
                
                this.defined.removeToken();
                this.$router.push("/log/0");
              } else {
                this.$Message.info(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        case 1:
          getInfoApi
            .getMyHouseRent(params)
            .then(res => {
              if (res.data.code === 200) {
                if (res.data.data.length == 0) {
                  this.loading = true;
                  clearTimeout(this.timer);
                  this.timer=setTimeout(() => {
                    this.loading = false;
                  }, 1000);
                } else {
                  this.rentList = res.data.data;
                  this.rentList.forEach(el => {
                    if (el.publish == 1) {
                      this.rentCol[1].key = "create_time";
                    } else {
                      this.rentCol[1].key = "publish_time";
                    }
                  });
                  this.total = res.data.count;
                  this.loading = false;
                }
              } else if (res.data.code === 10003) {
                
                this.defined.removeToken();
                this.$router.push("/log/0");
              } else {
                this.$Message.info(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        case 2:
          getInfoApi
            .getMyShop(params)
            .then(res => {
              if (res.data.code === 200) {
                if (res.data.data.length == 0) {
                  this.loading = true;
                  clearTimeout(this.timer);
                  this.timer=setTimeout(() => {
                    this.loading = false;
                  }, 1000);
                } else {
                  this.shopList = res.data.data;
                  this.shopList.forEach(el => {
                    if (el.publish == 1) {
                      this.shopCol[1].key = "create_time";
                    } else {
                      this.shopCol[1].key = "publish_time";
                    }
                  });
                  this.total = res.data.count;
                  this.loading = false;
                }
              } else if (res.data.code === 10003) {
                
                this.defined.removeToken();
                this.$router.push("/log/0");
              } else {
                this.$Message.info(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        case 3:
          getInfoApi
            .getMyUsed(params)
            .then(res => {
              if (res.data.code === 200) {
                if (res.data.data.length == 0) {
                  this.loading = true;
                  clearTimeout(this.timer);
                  this.timer=setTimeout(() => {
                    this.loading = false;
                  }, 1000);
                } else {
                  this.usedList = res.data.data;
                  this.usedList.forEach(el => {
                    if (el.publish == 1) {
                      this.usedCol[1].key = "create_time";
                    } else {
                      this.usedCol[1].key = "publish_time";
                    }
                  });
                  this.total = res.data.count;
                  this.loading = false;
                }
              } else if (res.data.code === 10003) {
                
                this.defined.removeToken();
                this.$router.push("/log/0");
              } else {
                this.$Message.info(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        case 4:
          getInfoApi
            .getMyHouseTrade(params)
            .then(res => {
              if (res.data.code === 200) {
                if (res.data.data.length == 0) {
                  this.loading = true;
                  clearTimeout(this.timer);
                  this.timer=setTimeout(() => {
                    this.loading = false;
                  }, 1000);
                } else {
                  this.tradeList = res.data.data;
                  this.tradeList.forEach(el => {
                    if (el.publish == 1) {
                      this.tradeCol[1].key = "create_time";
                    } else {
                      this.tradeCol[1].key = "publish_time";
                    }
                  });
                  this.total = res.data.count;
                  this.loading = false;
                }
              } else if (res.data.code === 10003) {
                
                this.defined.removeToken();
                this.$router.push("/log/0");
              } else {
                this.$Message.info(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        case 5:
          getInfoApi
            .getMyService(params)
            .then(res => {
              if (res.data.code === 200) {
                if (res.data.data.length == 0) {
                  this.loading = true;
                  clearTimeout(this.timer);
                  this.timer=setTimeout(() => {
                    this.loading = false;
                  }, 1000);
                } else {
                  this.lifeList = res.data.data;
                  this.lifeList.forEach(el => {
                    if (el.publish == 1) {
                      this.lifeCol[1].key = "create_time";
                    } else {
                      this.lifeCol[1].key = "publish_time";
                    }
                  });
                  this.total = res.data.count;
                  this.loading = false;
                }
              } else if (res.data.code === 10003) {
                
                this.defined.removeToken();
                this.$router.push("/log/0");
              } else {
                this.$Message.info(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
        default:
          getInfoApi
            .getMyRecruitment(params)
            .then(res => {
              if (res.data.code === 200) {
                this.recruitmentList = res.data.data;
                if (res.data.data.length == 0) {
                  this.loading = true;
                  clearTimeout(this.timer);
                  this.timer=setTimeout(() => {
                    this.loading = false;
                  }, 1000);
                } else {
                  this.recruitmentList.forEach(el => {
                    if (el.publish == 1) {
                      this.recruitmentCol[1].key = "create_time";
                    } else {
                      this.recruitmentCol[1].key = "publish_time";
                    }
                  });
                  this.total = res.data.count;
                  this.loading = false;
                }
              } else if (res.data.code === 10003) {
                
                this.defined.removeToken();
                this.$router.push("/log/0");
              } else {
                this.$Message.info(res.data.msg);
              }
            })
            .catch(err => console.log(err));
          break;
      }
    },
    ok() {
      let i = this.index;
      switch (this.i) {
        case 0:
          let data = {
            id: this.recruitmentList[i].id
          };
          setInfoApi.delMyRecruitment(data).then(res => {
            if (res.data.code === 200) {
              this.recruitmentList.splice(i, 1);
              this.$Message.success(res.data.msg);
            } else if (res.data.code === 10003) {
              
              this.defined.removeToken();
              this.$router.push("/log/0");
            } else {
              this.$Message.info(res.data.msg);
            }
          });
          break;
        case 1:
          let data1 = {
            house_id: this.rentList[i].house_id
          };
          setInfoApi.delMyHouseRent(data1).then(res => {
            if (res.data.code === 200) {
              this.rentList.splice(i, 1);
              this.$Message.success(res.data.msg);
            } else if (res.data.code === 10003) {
              
              this.defined.removeToken();
              this.$router.push("/log/0");
            } else {
              this.$Message.info(res.data.msg);
            }
          });
          break;
        case 2:
          let data2 = {
            shop_id: this.shopList[i].shop_id
          };
          setInfoApi.delMyShop(data2).then(res => {
            if (res.data.code === 200) {
              this.shopList.splice(i, 1);
              this.$Message.success(res.data.msg);
            } else if (res.data.code === 10003) {
              
              this.defined.removeToken();
              this.$router.push("/log/0");
            } else {
              this.$Message.info(res.data.msg);
            }
          });
          break;
        case 3:
          let data3 = {
            used_id: this.usedList[i].used_id
          };
          setInfoApi.delMyUsed(data3).then(res => {
            if (res.data.code === 200) {
              this.usedList.splice(i, 1);
              this.$Message.success(res.data.msg);
            } else if (res.data.code === 10003) {
              
              this.defined.removeToken();
              this.$router.push("/log/0");
            } else {
              this.$Message.info(res.data.msg);
            }
          });
          break;
        case 4:
          let data4 = {
            house_id: this.tradeList[i].house_id
          };
          setInfoApi.delMyHouseTrade(data4).then(res => {
            if (res.data.code === 200) {
              this.tradeList.splice(i, 1);
              this.$Message.success(res.data.msg);
            } else if (res.data.code === 10003) {
              
              this.defined.removeToken();
              this.$router.push("/log/0");
            } else {
              this.$Message.info(res.data.msg);
            }
          });
          break;
        case 5:
          let data5 = {
            service_id: this.lifeList[i].service_id
          };
          setInfoApi.delMyService(data5).then(res => {
            if (res.data.code === 200) {
              this.lifeList.splice(i, 1);
              this.$Message.success(res.data.msg);
            } else if (res.data.code === 10003) {
              
              this.defined.removeToken();
              this.$router.push("/log/0");
            } else {
              this.$Message.info(res.data.msg);
            }
          });
          break;
        default:
          let data6 = {
            id: this.recruitmentList[i].id
          };
          setInfoApi.delMyRecruitment(data6).then(res => {
            if (res.data.code === 200) {
              this.recruitmentList.splice(i, 1);
              this.$Message.success(res.data.msg);
            } else if (res.data.code === 10003) {
              
              this.defined.removeToken();
              this.$router.push("/log/0");
            } else {
              this.$Message.info(res.data.msg);
            }
          });
          break;
      }
    },
    changePage(i) {
      this.current = i;
      this.getList();
    },
    changeState(i) {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  beforeDestroy(){
    clearTimeout(this.timer);
  },
  components: {
    Table
  }
};
</script>

<style scoped lang="less">
.wrapper {
  background: #fff;
  height: 460px;
  position: relative;
  .ivu-tabs {
    height: 100%;
    .ivu-tabs-content {
      .none {
        .none-icon {
          width: 368px;
          height: 368px;
          background: url("../../../static/img/material/sprite.png") no-repeat 0 -5220px;
          margin: 0 auto;
          transform: scale(0.5);
          margin-top: -18px;
        }
        p {
          font-size: 16px;
          text-align: center;
          margin-top: -70px;
          color: #999;
        }
      }
    }
  }
  .pick {
    position: absolute;
    right: 0;
    top: 3px;
    z-index: 1;
  }
}
</style>