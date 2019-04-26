<template>
  <div>
    <Head title="头条正文">
      <div class="icon">
        <i class="iconfont icon-shoucang-copy" @click="collect" v-if="col"></i>
        <i class="iconfont icon-shoucang1" v-else @click="cancelCollect"></i>
        <i
          class="iconfont icon-fenxiang"
          v-clipboard:copy="copyUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        ></i>
      </div>
    </Head>
    <div id="main">
      <h3 class="title">{{data.title}}</h3>
      <p class="date" v-show="data.create_time">{{data.create_time}}</p>
      <div class="content" v-html="data.content" v-show="data.content"></div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { mapActions, mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      id: 0,
      data: "",
      copyUrl: data.title+window.location.href+'更多精彩资讯内容尽在沂源生活'
    };
  },
  mounted() {
    this.id = parseInt(this.$route.params.id);
    this.hasCollect();
    this.getData();
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
          if (res.data.code === 200) {
            if(res.data.data){
              this.data = res.data.data;
              this.copyUrl = this.data.title+window.location.href+'更多精彩资讯内容尽在沂源生活';
            }
          }else{
            Toast(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    collect() {
      if (this.defined.access_token == "") {
        Toast("请先去登录");
      } else {
        let data = {
          commentable_id: this.id,
          commentable_type: "article",
          title: this.data.title
        };
        setInfoApi
          .collect(data)
          .then(res => {
            if (res.data.code === 200) {
              Toast(res.data.msg);
              this.hasCollect();
            } else if (res.data.code === 10003) {
              Toast("身份已过期，请重新登录");
              this.defined.removeToken();
            } else {
              Toast(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push("/notFound");
          });
      }
    },
    hasCollect() {
      if (this.defined.access_token == "") {
        return;
      } else {
        let params = {
          commentable_id: this.id,
          commentable_type: "article"
        };
        this.getCollect(params);
      }
    },
    cancelCollect() {
      let data = {
        type: "cancel",
        commentable_id: this.id,
        commentable_type: "article"
      };
      setInfoApi.cancelCollect(data).then(res => {
        if (res.data.code === 200) {
          Toast(res.data.msg);
          this.hasCollect();
        } else if (res.data.code === 10003) {
          Toast("身份已过期，请重新登录");
          this.defined.removeToken();
        } else {
          Toast(res.data.msg);
        }
      });
    },
    onCopy(e) {
      Toast("复制成功");
    },
    onError() {
      Toast("复制失败");
    },
    ...mapActions(["getCollect"])
  },
  computed: {
    col() {
      return this.$store.state.collect;
    }
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
#head {
  .icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 160px;
    height: auto;
    .iconfont {
      font-size: 28px;
    }
    .icon-shoucang1 {
      color: #ff9500;
    }
  }
}
#main {
  padding: 0 24px;
  padding-top: 90px;
  h3.title {
    color: #505050;
    font-size: 44px;
    margin-top: 33px;
    line-height: 66px;
  }
  .date {
    font-size: 24px;
    color: #505050;
    margin-bottom: 32px;
  }
  .content {
    margin-top: 20px;
    margin-bottom: 48px;
    padding:0 20px;
    overflow: hidden;
  }
  .content /deep/ img{
    max-width:100%;
  }
}
</style>