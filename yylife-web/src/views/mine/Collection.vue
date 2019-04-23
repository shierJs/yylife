<template>
  <div>
    <div class="wrapper">
      <div class="col-list" v-if="cmdTf">
        <i-table height="460" :columns="col" :data="cmdList" :loading="loading"></i-table>
        <Modal v-model="modal1" title="您确认删除这条收藏吗" @on-ok="ok">
          <p>请您慎重考虑一下哦</p>
        </Modal>
        <div class="clearfix" style="margin-top:10px;">
          <Page style="float:right;" :total="total" :current="current" @on-change="changePage"></Page>
        </div>
      </div>
      <div class="none" v-else>
        <div class="none-icon"></div>
        <p>还没有任何收藏呢</p>
      </div>
    </div>
  </div>
</template>

<script>
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
export default {
  data() {
    return {
      cmdTf: true,
      index: "",
      modal1: false,
      loading: false,
      total: 0,
      current: 1,
      col: [
        {
          title: "收藏标题",
          key: "title",
          align: "center"
        },
        {
          title: "收藏时间",
          key: "create_time",
          align: "center"
        },
        {
          title: "收藏分类",
          key: "cate",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", {
                domProps: {
                  innerHTML: "查看"
                },
                style: {
                  fontSize: "14px",
                  color: "#6699CC",
                  cursor: "pointer"
                },
                on: {
                  click: e => {
                    this.edits(params);
                  }
                }
              }),
              h("span", {
                domProps: {
                  innerHTML: "删除"
                },
                style: {
                  marginLeft: "20px",
                  fontSize: "14px",
                  color: "#6699CC",
                  cursor: "pointer",
                  display:
                    params.row.publish == 0 && params.row.status != "已失效"
                      ? "none"
                      : "inline"
                },
                on: {
                  click: e => {
                    this.remove(params);
                  }
                }
              })
            ]);
          }
        }
      ],
      cmdList: [
        {
          title: "我是收藏的标题1",
          desc: "我是收藏的详情描述...",
          time: "2018-12-12 12:12:12"
        },
        {
          title: "我是收藏的标题2",
          desc: "我是收藏的详情描述...",
          time: "2018-12-12 12:12:12"
        },
        {
          title: "我是收藏的标题3",
          desc: "我是收藏的详情描述...",
          time: "2018-12-12 12:12:12"
        },
        {
          title: "我是收藏的标题4",
          desc: "我是收藏的详情描述...",
          time: "2018-12-12 12:12:12"
        },
        {
          title: "我是收藏的标题5",
          desc: "我是收藏的详情描述...",
          time: "2018-12-12 12:12:12"
        },
        {
          title: "我是收藏的标题6",
          desc: "我是收藏的详情描述...",
          time: "2018-12-12 12:12:12"
        },
        {
          title: "我是收藏的标题7",
          desc: "我是收藏的详情描述...",
          time: "2018-12-12 12:12:12"
        },
        {
          title: "我是收藏的标题8",
          desc: "我是收藏的详情描述...",
          time: "2018-12-12 12:12:12"
        },
        {
          title: "我是收藏的标题9",
          desc: "我是收藏的详情描述...",
          time: "2018-12-12 12:12:12"
        }
      ],
      params: {}
    };
  },
  methods: {
    edits(params) {
      this.params = params;
      console.log(this.params);
      switch (this.params.row.commentable_type) {
        case "recruitment":
          //进入详情页
          let data = {
            name: "我的收藏",
            path: "/mine/2/collection",
            now: "招聘详情页"
          };
          data = JSON.stringify(data);
          sessionStorage.setItem("jobBread", data);
          this.$router.push(`/recruitment/jobDetail/${this.params.row.commentable_id}`);
          break;
        case "houseRent":
          let data2 = {
            name: "我的收藏",
            path: "/mine/2/collection",
            now: "房屋出租详情页"
          };
          data2 = JSON.stringify(data2);
          sessionStorage.setItem("rentBread", data2);
          this.$router.push(`/rent/rentDetail/${this.params.row.commentable_id}`);
          break;
        case "shop":
          let data3 = {
            name: "我的收藏",
            path: "/mine/2/collection",
            now: "美食详情页"
          };
          data3 = JSON.stringify(data3);
          sessionStorage.setItem("foodBread", data3);
          this.$router.push(`/food/foodDetail/${this.params.row.commentable_id}`);
          break;
        case "used":
          let data4 = {
            name: "我的收藏",
            path: "/mine/2/collection",
            now: "二手市场详情页"
          };
          data4 = JSON.stringify(data4);
          sessionStorage.setItem("second", data4);
          this.$router.push(
            `/secondhand/secondhandDetail/${this.params.row.commentable_id}`
          );
          break;
        case "houseTrade":
          let data5 = {
            name: "我的收藏",
            path: "/mine/2/collection",
            now: "房屋买卖详情页"
          };
          data5 = JSON.stringify(data5);
          sessionStorage.setItem("homeBread", data5);
          this.$router.push(
            `/homeTrading/homeTradingDetail/${this.params.row.commentable_id}`
          );
          break;
        case "service":
          let data6 = {
            name: "我的收藏",
            path: "/mine/2/collection",
            now: "生活服务详情页"
          };
          data6 = JSON.stringify(data6);
          sessionStorage.setItem("lifeBread", data6);
          this.$router.push(`/life/lifeDetail/${this.params.row.commentable_id}`);
          break;
        case "goods":
          let data7 = {
            name: "我的收藏",
            path: "/mine/2/collection",
            now: "商城详情页"
          };
          data7 = JSON.stringify(data7);
          sessionStorage.setItem("mallBread", data7);
          this.$router.push(`/mall/mallDetail/${this.params.row.commentable_id}`);
          break;
        case "article":
          let data8 = {
            name: "我的收藏",
            path: "/mine/2/collection",
            now: "文章详情"
          };
          data8 = JSON.stringify(data8);
          sessionStorage.setItem("headBread", data8);
          this.$router.push(`/headLine/headLineDetails/${this.params.row.commentable_id}`);
          break;
        default:
          this.$router.push("/");
          break;
      }
    },
    remove(params) {
      this.params = params;
      this.modal1 = true;
    },
    getData() {
      let params = {
        page: 1
      };
      getInfoApi
        .getUserCollect(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.total = res.data.data.total;
            this.cmdList = res.data.data.data;
            this.cmdList.forEach(el => {
              switch (el.commentable_type) {
                case "goods":
                  el.cate = "来疯购商城";
                  break;
                case "used":
                  el.cate = "二手市场";
                  break;
                case "shop":
                  el.cate = "美食店铺";
                  break;
                case "recruitment":
                  el.cate = "职位招聘";
                  break;
                case "article":
                  el.cate = "文章资讯";
                  break;
                case "service":
                  el.cate = "生活服务";
                  break;
                case "houseRent":
                  el.cate = "房屋租赁";
                  break;
                case "houseTrade":
                  el.cate = "房屋买卖";
                  break;
              }
            });
          } else if (res.data.code === 10003) {
            
            this.defined.removeToken();
            this.$router.push("/log/0");
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    changePage(i) {
      this.current = i;
      this.getData();
    },
    ok() {
      //取消收藏
      let data = {
        type: "del",
        id: this.params.row.id,
        commentable_type: this.params.row.commentable_type,
        commentable_id: this.params.row.id
      };
      setInfoApi
        .delCollect(data)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.cmdList.splice(this.params.index, 1);
            this.$Message.success(res.data.msg);
          } else if (res.data.code === 10003) {
            this.$Message.info("登录已失效,请重新登录");
            this.defined.removeToken();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="less">
.wrapper {
  background: #fff;
  .none {
    .none-icon {
      width: 368px;
      height: 368px;
      background: url("../../../static/img/material/sprite.png") no-repeat 0 -1472px;
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
</style>