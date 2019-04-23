<template>
  <div>
    <!--侧边栏-->
    <div id="aside">
      <ul class="aside-wrap">
        <li class="gif" v-if="img !=''">
          <a :href="img.ad_link">
            <img :src="img.ad_code" alt>
          </a>
        </li>
        <li class="first" @click="toRelease">
          <a href="javascript:;">
            <i class="iconfont icon-fabu2"></i>
            立即发布
          </a>
        </li>
        <li class="line"></li>
        <li class="second rl">
          <a href="javascript:;">
            <i></i>
            下载app
          </a>
          <div class="download">
            <div class="sweep-code">
              <a href="javascript:;" class="rl">
                <div class="download-box rl">
                  <img src="../../static/img/material/angle.png" alt class="angle">
                  <div class="top">
                    <span class="yuan">尽享</span>
                    <span class="digital">沂源</span>
                    <span class="ceremony">更多福利</span>
                  </div>
                  <div class="bottom clear">
                    <img src="../../static/img/material/sweep-code.png" alt class="fl">
                    <div class="soon fl">
                      <p class="now">立即扫码</p>
                      <p class="recevice">下载app领取</p>
                    </div>
                  </div>
                  <div class="new">新人</div>
                </div>
              </a>
            </div>
          </div>
        </li>
        <li class="line"></li>
        <li class="third" @click="showS">
          <a href="javascript:;">
            <i class="iconfont icon-qiandao"></i>
            每日签到
          </a>
        </li>
        <li class="line"></li>
        <li class="last">
          <a href="javascript:;">
            <i></i>
            回到顶部
          </a>
        </li>
      </ul>
    </div>
    <div class="signModal" v-show="sign">
      <div class="sign">
        <i class="iconfont icon-guanbi1" @click="signDay"></i>
        <div class="head">
          <h3 class="title">签到有礼</h3>
          <p>签到越多，积分越丰富</p>
        </div>
        <div class="content">
          <div class="item" v-for="(item,index) in signList" :key="index">
            <svg class="icon data" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <p>+{{item.reward}}{{item.name}}</p>
            <div class="badge">
              <svg class="icon" aria-hidden="true" v-if="!item.is_sign">
                <use xlink:href="#icon-daiqian"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-else>
                <use xlink:href="#icon-yiling"></use>
              </svg>
            </div>
          </div>
          <div class="bg"></div>
          <p class="sign-wrap">
            <span class="signning" v-if="signed" @click="signning">马上签到</span>
            <span class="signed" v-else>今日已签</span>
          </p>
        </div>
        <div class="foot">
          <p class="mall">
            <i class="iconfont icon-jifen"></i>
            <span @click="pop">积分商城</span>
          </p>
          <p class="balance">
            <span>积分余额</span>
            <i class="iconfont icon-yue"></i>
            <span>{{points}}</span>
          </p>
        </div>
      </div>
      <div class="sign-modal" v-show="showSign">
        <i class="iconfont icon-guanbi1" @click="showSign=false"></i>
        <div class="wrapper">
          <i class="iconfont icon-xiaolian"></i>
          <p>{{msg}}</p>
        </div>
      </div>
    </div>
    <!-- 登录注册弹出层 -->
    <Log></Log>
    <!-- 登录注册弹出层 -->
  </div>
</template>

<script>
import Log from "./Log";
import { mapMutations } from "vuex";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
export default {
  data() {
    return {
      sign: false,
      signed: true,
      pend: true,
      showSign: false,
      show: false,
      msg: "",
      img:"",
      bgList: [
        "../../static/img/material/axis-one.png",
        "../../static/img/material/axis-two.png",
        "../../static/img/material/axis-three.png",
        "../../static/img/material/axis-four.png",
        "../../static/img/material/axis-five.png",
        "../../static/img/material/axis-six.png",
        "../../static/img/material/axis-seven.png"
      ],
      signList: [],
      len: -1,
      user: "",
      points: 0
    };
  },
  mounted() {
    $(window).scroll(function() {
      var os = $(document).scrollTop();
      if (os > 100) {
        $("#aside").fadeIn(600);
      } else {
        $("#aside").fadeOut(600);
      }
    });
    $("#aside .last").click(function() {
      $("html,body").animate(
        {
          scrollTop: 0
        },
        400
      );
    });
    this.getAd();
  },
  methods: {
    toRelease() {
      const { href } = this.$router.resolve({
        path: "/release",
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    signning() {
      setInfoApi.signing().then(res => {
        if (res.data.code == 200) {
          this.showSign = true;
          this.signed = false;
          sessionStorage.setItem("signed", this.signed);
          this.msg = res.data.msg;
          this.showS();
        } else if (res.data.code === 10003) {
          
          this.defined.removeToken();
        } else {
          this.signed = false;
          sessionStorage.setItem("signed", this.signed);
          this.$Message.info(res.data.msg);
        }
      });
    },
    pop() {
      this.$Message.info("正在快马加鞭上线中，敬请期待...");
    },
    showS() {
      getInfoApi
        .getSign()
        .then(res => {
          if (res.data.code === 200) {
            this.signList = res.data.data;
            this.signList.forEach(el => {
              return (el.icon = `#${el.icon}1`);
            });
            let lastList = this.signList.slice(4, 6);
            this.signList.concat(lastList);
            let lenList = this.signList.filter(el => {
              return el.is_sign == 1;
            });
            this.len = lenList.length - 1;
            if (this.len == -1) {
              this.signed = true;
            } else {
              let bg = this.bgList[this.len];
                $(".sign .content .bg").css({
                  background: `url(${bg})`
                });
            }
            let bg = this.bgList[this.len];
            if (bg) {
              $(".sign .content .bg").css({
                background: `url(${bg})`
              });
            }
            this.signed = sessionStorage.getItem("signed")
              ? JSON.parse(sessionStorage.getItem("signed"))
              : true;
            this.getInfo();
            this.sign = true;
          } else if (res.data.code === 10003) {
            this.$Message.info("请登录");
            this.$router.push("/log/0");
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => this.$router.push('/notFound'))
    },
    signDay() {
      this.sign = false;
      this.showSign = false;
    },
    getInfo() {
      //获取用户信息
      getInfoApi.getInfo().then(res => {
        if (res.data.code === 10003) {
          this.defined.removeToken();
          this.$Message.info("请登录");
          this.$router.push("/log/0");
        } else if (res.data.code === 200) {
          let user = res.data.data;
          this.points = user.points_account;
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    getAd() {
      let params = {
        position_id: 15
      };
      getInfoApi
        .getBanner(params)
        .then(res => {
          //;
          if (res.data.code === 200 && res.data.data.length) {
              this.img=res.data.data[0];
          } else {
            this.img="";
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    ...mapMutations(["setShowLog"])
  },
  components: {
    Log
  }
};
</script>

<style scoped lang="less">
#aside {
  display: none;
  background: #fff;
  width: 72px;
  height: 459px;
  position: fixed;
  right: 0;
  top: 90px;
  z-index: 100;
}
#aside .aside-wrap {
  width: 100%;
  text-align: center;
}
#aside .aside-wrap a .gif img{
  width:100%;
}
#aside .aside-wrap .first {
  width: 100%;
  height: 54px;
}
#aside .aside-wrap .second {
  width: 100%;
  height: 54px;
}
#aside .aside-wrap .third {
  width: 100%;
  height: 54px;
}
#aside .aside-wrap .last {
  width: 100%;
  height: 54px;
}
#aside .aside-wrap li.line {
  height: 1px;
  width: 60px;
  background: #eaeaea;
  margin-top: 13px;
}
#aside .aside-wrap .first i {
  display: block;
  width: 28px;
  height: 29px;
  font-size: 30px;
  margin: 17px auto 12px;
}
#aside .aside-wrap .second i {
  display: block;
  width: 20px;
  height: 30px;
  background: url("../../static/img/material/icon-yxfixedtool-sc3414db566-a72e983968.png")
    no-repeat 0 -168px;
  margin: 15px auto 13px;
}
#aside .aside-wrap .second:hover i {
  background-position: 0 -128px;
}
#aside .aside-wrap .third i {
  display: block;
  width: 32px;
  height: 30px;
  font-size: 30px;
  margin: 14px auto 12px;
}
#aside .aside-wrap .third:hover i {
  background-position: 0 -46px;
}
#aside .aside-wrap .last i {
  display: block;
  width: 24px;
  height: 16px;
  background: url("../../static/img/material/icon-yxfixedtool-sc3414db566-a72e983968.png")
    no-repeat 0 -234px;
  margin: 13px auto 12px;
}
#aside .aside-wrap .last:hover i {
  background-position: 0 -208px;
}
#aside .aside-wrap li a {
  font-size: 13px;
  color: #666666;
}
#aside .aside-wrap li:hover a {
  color: #b4a078;
}
#aside .download {
  display: none;
  width: 252px;
  height: 221px;
  background: #fff;
  position: absolute;
  left: -252px;
  top: -68px;
}
#aside .aside-wrap .second:hover .download {
  display: block;
}
#aside .download .download-box {
  width: 219px;
  height: 191px;
  box-shadow: 0 0 3px #000;
  padding-top: 8px;
  padding-left: 9px;
}
#aside .download .download-box .angle {
  position: absolute;
  width: 40px;
  height: 30px;
  right: -28px;
  top: 50%;
  margin-top: -15px;
}
#aside .download .download-box .top .yuan {
  font-size: 15px;
  color: #be4141;
}
#aside .download .download-box .top .digital {
  font-size: 44px;
  color: #be4141;
}
#aside .download .download-box .top .ceremony {
  font-size: 18px;
  color: #be4141;
}
#aside .download .download-box .bottom img {
  margin-right: 6px;
}
#aside .download .download-box .bottom .soon {
  margin-top: 27px;
}
#aside .download .download-box .bottom .now {
  font-size: 18px;
  color: #333333;
  margin-bottom: 9px;
}
#aside .download .download-box .bottom .rececive {
  font-size: 12px;
  color: #333333;
}
#aside .download .download-box .new {
  position: absolute;
  width: 40px;
  height: 18px;
  background: #f8bc59;
  font-size: 12px;
  color: #333333;
  right: 33px;
  top: 20px;
}
.signModal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 120;
  .sign {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 656px;
    .icon-guanbi1 {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 20px;
      color: #999;
      cursor: pointer;
    }
    .icon-guanbi1:hover {
      color: #333;
    }
    .head {
      width: 100%;
      background: url("../../static/img/material/sign-title.png") no-repeat;
      height: 80px;
      text-align: center;
      color: #fff;
      padding-top: 14px;
      .title {
        font-size: 25px;
        font-weight: 400;
      }
    }
    .content {
      background: #fff;
      position: relative;
      padding: 30px 0;
      .item {
        width: 116px;
        height: 90px;
        background: url("../../static/img/material/sign-item-bg.png") no-repeat;
        display: inline-block;
        text-align: center;
        padding: 5px 0;
        margin-left: 35px;
        margin-bottom: 30px;
        position: relative;
        .data {
          width: 50px;
          height: 50px;
        }
        .badge {
          position: absolute;
          top: 0;
          right: 0;
          .icon {
            width: 30px;
            height: 30px;
          }
        }
      }
      .item:nth-child(5) {
        width: 268px;
        margin-left: 33px;
        margin-right: 1px;
        background: url("../../static/img/material/sign-big-bg.png") no-repeat;
      }
      .item:nth-child(4) {
        margin-left: 37px;
      }
      .item:nth-child(7) {
        margin-left: 37px;
      }
      .bg {
        background: url("../../static/img/material/axis.png") no-repeat;
        width: 592px;
        height: 138px;
        position: absolute;
        left: 36px;
        top: 125px;
      }
      .sign-wrap {
        text-align: center;
        margin-top: 20px;
        span {
          display: inline-block;
          width: 120px;
          height: 30px;
          text-align: center;
          font-size: 16px;
          border-radius: 20px;
          line-height: 30px;
          background: #b4a078;
          color: #fff;
          cursor: pointer;
        }
        .signed {
          background: #999;
        }
      }
    }
    .foot {
      background: #fff;
      padding: 10px 20px;
      p {
        display: inline-block;
        .iconfont {
          color: #b4a078;
        }
        font-size: 16px;
      }
      .mall {
        margin-right: 20px;
        span {
          cursor: pointer;
        }
        span:hover {
          color: #b4a078;
        }
      }
      .record {
        margin-left: 274px;
        color: #b4a078;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  .sign-modal {
    position: absolute;
    width: 300px;
    height: 300px;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
    padding: 20px;
    .icon-guanbi1 {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
    .icon-guanbi1:hover {
      color: #999;
    }
    .wrapper {
      text-align: center;
      margin-top: 50px;
      .iconfont {
        font-size: 60px;
        color: #b4a078;
      }
      p {
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
}
</style>