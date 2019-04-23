<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main">
      <div class="wrap" v-if="showi">
        <h2 class="title">邀请好友注册，您将获得免费发布广告</h2>
        <p class="desc">当好友通过您分享的链接注册沂源生活，当他成功注册登录后，您将获得{{prize}}</p>
        <div class="link">
          <p class="label">邀请链接：</p>
          <p class="links">{{copyUrl}}</p>
          <p
            class="btn"
            v-clipboard:copy="copyUrl"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >复制链接</p>
        </div>
        <div class="btns">
          <p class="myReward" @click="show(1)">我的奖励</p>
          <p class="rules" @click="show(2)">活动规则</p>
        </div>
        <div class="process">
          <Row>
            <i-col span="8">
              <div class="first">
                <i class="iconfont icon-ren1"></i>
                <p>
                  发送邀请链接给未注册过沂源生活的同事/朋友，
                  <br>解救深受广告需求烦恼中的他（她）
                </p>
              </div>
            </i-col>
            <i-col span="8">
              <div class="second">
                <i class="iconfont icon-ren"></i>
                <p>
                  对方在您的链接中点击“免费注册”，
                  <br>并注册成功，您将获10金币，可免费发布广告一次
                </p>
              </div>
            </i-col>
            <i-col span="8">
              <div class="third">
                <i class="iconfont icon-chenggong"></i>
                <p>
                  邀请成功后您可以在“我的奖励”中，查看到所获得的奖励。
                  <br>
                </p>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="none" v-else>
        <h2 style="font-size:50px;">此活动已经关闭</h2>
      </div>
      <div class="modal" v-show="modal">
        <div class="wrapper">
          <i class="iconfont icon-guanbi1" @click="modal=false"></i>
          <div class="content" v-show="reward">
            <p class="title">我的奖励</p>
            <Table :columns1="col" :data="list" :showColumns="0" :loading="loading"></Table>
          </div>
          <div class="content" v-show="!reward">
            <p class="title">活动规则</p>
            <p class="rules">
              &emsp;&emsp;1、每一个沂源生活登录用户均可参加此活动，分享邀请链接给好友，可获得 10金币，使用金币可以免费发布广告信息;
              <br>&emsp;&emsp;2、仅邀请新注册用户才可获得金币。新用户指没有沂源生活ID，且绑定的手机号未注册过沂源生活的用户;
            </p>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Table from "@/components/Table";
import getInfoAPi from "@/api/getInfo";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      copyUrl: "沂源生活金币限时放送，现在注册登录可免费发布广告：",
      modal: false,
      reward: true,
      showi: false,
      loading: false,
      col: [
        {
          title: "好友昵称",
          key: "nickname"
        },
        {
          title: "获取奖励",
          key: "reward"
        },
        {
          title: "日期",
          key: "date"
        }
      ],
      list: [
        {
          nickname: "四十米的大刀",
          reward: "10金币",
          date: "2018-12-19 19：28：54"
        },
        {
          nickname: "抽了39米",
          reward: "10金币",
          date: "2018-12-20 11：44：32"
        },
        {
          nickname: "差点没收住",
          reward: "10金币",
          date: "2018-12-22 17：05：11"
        }
      ],
      prize: "奖品"
    };
  },
  methods: {
    onCopy(e) {
      this.$Message.success("复制成功");
    },
    onError() {
      this.$Message.error("复制失败");
    },
    show(i) {
      this.modal = true;
      if (i === 1) {
        this.reward = true;
      } else {
        this.reward = false;
      }
    },
    getUrl() {
      getInfoAPi
        .getShareUrl()
        .then(res => {
          ;
          if (res.data.code === 200) {
            if (parseInt(res.data.data.invite_switch) != 0) {
              let url = location.origin;
              this.copyUrl =
                this.copyUrl + url + `/log/${res.data.data.user_id}`;
              if (res.data.data.invite_switch == 2) {
                this.prize = res.data.data.invite_rewards_integral + "金币";
              } else {
                this.prize = res.data.data.invite_rewards_good + "积分";
              }
              this.showi = true;
            } else {
              this.showi = false;
            }
          } else if (res.data.code === 10003) {
            localStorage.removeItem("webToken");
            this.defined.removeToken();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => this.$router.push("/notFound"));
    }
  },
  mounted() {
    this.getUrl();
  },
  components: {
    Head,
    Table,
    Foot,
  }
};
</script>

<style scoped lang="less">
#main {
  padding: 50px 0;
  text-align: center;
  .wrap {
    .title {
      font-size: 26px;
      color: #999;
    }
    .desc {
      font-size: 16px;
      color: #7c7c7c;
      line-height: 86px;
    }
    .link {
      p {
        display: inline-block;
      }
      .label {
        font-size: 18px;
        color: #333;
        line-height: 40px;
      }
      .links {
        font-size: 16px;
        color: #999;
        text-decoration: underline;
        margin: 0 20px;
      }
      .btn {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        background: #b4a078;
        border-radius: 20px;
      }
      .btn:hover {
        cursor: pointer;
        background: #92815f;
      }
    }
    .btns {
      margin: 30px 0;
      p {
        display: inline-block;
        margin-left: 20px;
        font-size: 16px;
        line-height: 36px;
        color: #b4a078;
      }
      p:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .process {
      .iconfont {
        font-size: 28px;
        color: #333;
      }
      p {
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 202;
    .wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background: #fff;
      width: 540px;
      border-radius: 10px;
      .icon-guanbi1 {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 24px;
        color: #999;
      }
      .icon-guanbi1:hover {
        cursor: pointer;
        color: #666;
      }
      .content {
        margin-top: 20px;
        .title {
          font-size: 20px;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }
        p.rules {
          font-size: 16px;
          color: #333;
          line-height: 36px;
          text-align: left;
        }
      }
    }
  }
}
</style>