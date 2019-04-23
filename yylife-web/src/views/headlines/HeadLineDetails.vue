<template>
  <div>
    <Head :i="8"></Head>
    <div id="main">
      <div class="wrap">
        <!-- 面包屑 -->
        <Breadcrumb :data="headBread"></Breadcrumb>
        <!-- 面包屑 -->
        <div class="body">
          <div class="head clear">
            <div class="fl head-left">
              <p class="txt-box">
                <span class="label">发布于:</span>
                <span class="data">{{data.create_time}}</span>
              </p>
              <p class="txt-box">
                <span class="label">浏览:</span>
                <span class="data">{{data.hits}}</span>
              </p>
            </div>
            <div class="fr head-right">
              <p class="function" v-if="col" @click="collect">
                <i class="iconfont icon-shoucang"></i>
                <span class="collection">收藏</span>
              </p>
              <p class="function" v-else @click="delCollect">
                <i class="iconfont icon-shoucang" style="color:#b4a078;"></i>
                <span class="collection" style="color:#b4a078;">已收藏</span>
              </p>
              <p
                class="function"
                v-clipboard:copy="copyUrl"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                <i class="iconfont icon-icon_share"></i>
                <span class="collection">分享</span>
              </p>
            </div>
          </div>
          <div class="main">
            <h3 class="title">{{data.title}}</h3>
            <div class="content" v-html="data.content"></div>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Breadcrumb from "@/components/Breadcrumb";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { mapActions, mapState } from "vuex";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      id: 0,
      headBread: {
        name: "文章资讯",
        path: "/headLine",
        now: "文章详情"
      },
      data: {},
      webToken: JSON.parse(localStorage.getItem("webToken")),
      copyUrl: window.location.href
    };
  },
  methods: {
    getData() {
      let params = {
        id: this.id
      };
      getInfoApi
        .getArtDetails(params)
        .then(res => {
          ;
          if (res.data.code == 200) {
            this.data = res.data.data;
            this.$Spin.hide();
          }
        })
        .catch(err => this.$router.push('/notFound'))
    },
    collect() {
      //收藏
      if (!this.webToken) {
        this.$Message.info("请先去登录");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "recruitment",
          title:this.data.shorttitle,
        };
        setInfoApi
          .collect(data)
          .then(res => {
            if (res.data.code == 200) {
              this.hasCollect();
              this.$Message.success(res.data.msg);
            } else if (res.data.code === 10003) {
              this.$Message.info("登录已失效,请重新登录");
              this.defined.removeToken();
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push('/notFound');
          });
      }
    },
    delCollect() {
      //取消收藏
      let data = {
        type: "cancel",
        commentable_id: this.id,
        commentable_type: "recruitment"
      };
      setInfoApi
        .delCollect(data)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.hasCollect();
            this.$Message.info(res.data.msg);
          } else if (res.data.code === 10003) {
            this.$Message.info("登录已失效,请重新登录");
            this.defined.removeToken();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    hasCollect() {
      //判断是否已经收藏
      let params = {
        commentable_id: this.id,
        commentable_type: "recruitment"
      };
      this.getCollect(params);
    },
    onCopy(e) {
      this.$Modal.success({
        title: "链接复制成功",
        content: "请将该链接粘贴到输入框分享给您的好友 "
      });
    },
    onError() {
      this.$Modal.error({
        title: "链接复制失败",
        content: "链接复制失败，请稍后重试 "
      });
    },
    ...mapActions(["getCollect"])
  },
  mounted() {
    this.$Spin.show();
    let headBread = JSON.parse(sessionStorage.getItem("headBread")); //面包屑
    if(headBread){
      this.headBread=headBread;
    }else{
      this.headBread={
        name: "首页",
        path: "/",
        now: "文章详情"
      }
    }
    this.id = parseInt(this.$route.params.id);
    this.hasCollect();
    this.getData();
  },
  computed: {
    col() {
      return this.$store.state.collect;
    }
  },
  components: {
    Head,
    Breadcrumb,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f4f0ea;
  .wrap {
    padding-bottom: 50px;
    .body {
      background: #fff;
      padding: 0 20px;
      .head {
        height: 90px;
        line-height: 90px;
        p {
          display: inline-block;
          color: #999;
        }
        .txt-box {
          margin-right: 28px;
        }
        .function {
          margin-left: 28px;
        }
        .function:hover {
          color: #b4a078;
          cursor: pointer;
          .icon-jubao,
          .report {
            color: #f44;
          }
        }
      }
      .main {
        .title {
          font-size: 28px;
          color: #333;
          padding-bottom: 20px;
        }
        .content {
          padding: 20px;
          font-size: 16px;
        }
        .content /deep/ img{
          max-width:100%;
        }
      }
    }
  }
}
</style>