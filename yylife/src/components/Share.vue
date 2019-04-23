<template>
  <div>
    <div class="invite">
      <div class="invite-wrap">
        <p class="copy">
          复制链接:
          <span>{{url}}</span>
        </p>
        <p
          class="btn"
          v-clipboard:copy="url"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >点我复制</p>
      </div>
      <p class="tips">温馨提示：</p>
      <p class="instruction">邀请一位好友成功注册后可获得10金币和10积分哦。赶快去邀请你的小伙伴吧！</p>
    </div>
  </div>
</template>

<script>
import {Toast} from "vant";
import getInfoAPi from "@/api/getInfo";
export default {
  data() {
    return {
      url: "沂源生活金币限时放送，现在注册登录可免费发布广告："
    };
  },
  methods: {
    onCopy(e) {
      Toast("复制成功");
    },
    onError() {
      Toast("复制失败");
    },
    getUrl() {
      getInfoAPi
        .getShareUrl()
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (parseInt(res.data.data.invite_switch)) {
              let url = location.origin;
              this.url = "沂源生活金币限时放送，现在注册登录可免费发布广告：";
              this.url =
                this.url + url + `/register/${res.data.data.user_id}`;
              this.show = true;
            } else {
              Toast("该活动已关闭");
              this.show = false;
            }
          } else if (res.data.code === 10003) {
            Toast("身份已失效，请重新登录");
            this.defined.removeToken();
            this.$router.push("/login");
          } else {
            this.show = false;
          }
        })
        .catch(err => this.$router.push("/notFound"));
    }
  },
  mounted(){
    this.getUrl();
  }
};
</script>

<style scoped lang="less">
.invite {
  width: 95%;
  margin: 0 auto;
  padding: 20px 40px;
  background: #fff;
  .invite-wrap {
    .copy {
      font-size: 26px;
      color: #666;
      span {
        color: #b4a078;
        text-decoration: underline;
      }
    }
    .btn {
      text-align: right;
      color: #b4a078;
      line-height: 60px;
    }
  }
  p {
    font-size: 26px;
    color: #333;
  }
  .tips {
    margin-top: 60px;
  }
  .instruction {
    text-indent: 2em;
    margin-top: 20px;
  }
}
</style>