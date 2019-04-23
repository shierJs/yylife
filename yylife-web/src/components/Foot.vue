<template>
  <div>
    <footer id="foot">
      <div class="top">
        <div class="wrap">
          <Row class="clearfix">
            <i-col span="8">
              <div class="customer box">
                <p class="title">客户服务</p>
                <div class="card">
                  <div class="left" @click="$router.push('/contact')">
                    <i class="iconfont icon-kefu"></i>
                    <p>客服合作</p>
                  </div>
                  <div class="right" @click="feedBack">
                    <i class="iconfont icon-xinxi"></i>
                    <p>反馈建议</p>
                  </div>
                </div>
              </div>
            </i-col>
            <i-col span="8">
              <div class="we box">
                <p class="title">何为沂源</p>
                <p class="content">沂源生活致力于打造以分类信息业务为平台、多条垂直业务线的生态圈，为用户提供涵盖生活服务、招聘求职、房屋租售、二手车买卖、二手交易、教育培训、同城交友、等本地生活解决方案。</p>
                <div class="concern">
                  <span>关注我们:</span>
                  <Poptip padding="16px 16px" trigger="hover" placement="bottom">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-weixingongzhonghao"></use>
                    </svg>
                    <div class="api" slot="content">
                      <img src="../../static/img/material/erweima-index.jpg" alt>
                    </div>
                  </Poptip>
                </div>
              </div>
            </i-col>
            <i-col span="8">
              <div class="down box">
                <p class="title">扫码下载沂源APP</p>
                <img src="../../static/img/material/erweima.png" alt>
                <p class="gift">下载更多惊喜等你发现</p>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="bottom">
        <div class="wrap">
          <div class="top">
            <Row>
              <i-col span="8">
                <div class="box">
                  <i class="iconfont icon-pinzhi"></i>
                  <span>沂源本地生活</span>
                </div>
              </i-col>
              <i-col span="8">
                <div class="box">
                  <i class="iconfont icon-kuaidikongxin"></i>
                  <span>满88元免邮费</span>
                </div>
              </i-col>
              <i-col span="8">
                <div class="box">
                  <i class="iconfont icon-zhengpinbaozheng1"></i>
                  <span>品质保证</span>
                </div>
              </i-col>
            </Row>
          </div>
          <div class="bottom">
            <ul class="foot-list clear">
              <li @click="about">
                <span>关于我们</span>
              </li>
              <li @click="$router.push('/help')">
                <span>帮助中心</span>
              </li>
              <li @click="$router.push('/help')">
                <span>配送与验收</span>
              </li>
              <li @click="$router.push('/contact')">
                <span>商务合作</span>
              </li>
              <li @click="$router.push('/frendship')">
                <span>友情链接</span>
              </li>
            </ul>
            <p
              class="desc"
            >沂源生活版权所有&nbsp;&copy;&nbsp;鲁ICP备16021506号&emsp;</p>
            <img src="../../static/img/material/gongshang.gif" alt class="gongshang" @click="open">
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [
        {
          value: "yyMall",
          label: "来疯购商城"
        },
        {
          value: "food",
          label: "美食"
        },
        {
          value: "recruitment",
          label: "招聘"
        },
        {
          value: "secondhand",
          label: "二手市场"
        },
        {
          value: "life",
          label: "生活服务"
        },
        {
          value: "rent",
          label: "租房"
        },
        {
          value: "hometrading",
          label: "房产买卖"
        }
      ]
    };
  },
  methods: {
    about() {
      const { href } = this.$router.resolve({
        path: "/about",
        query: {
          pdf: JSON.stringify(this.pdf)
        }
      });
      window.open(href, "_blank");
    },
    feedBack() {
      this.$Message.info("留言系统正在筹备中，敬请期待，如有急事，致电客服");
    },
    code() {},
    open(){
      const href="http://home.sdaic.gov.cn/";
      window.open(href, '_blank');
    }
  },
};
</script>

<style scoped lang="less">
#foot {
  border-top: 1px solid #e8e8e8;
  margin-top:20px;
  .top {
    padding-top: 60px;
    padding-bottom: 46px;
    .box {
      .title {
        text-align: center;
        font-size: 16px;
        margin-bottom: 28px;
      }
    }
    .customer {
      .card {
        width: 189px;
        margin: 0 auto;
        .left {
          margin-right: 29px;
        }
        div {
          float: left;
          width: 80px;
          height: 100px;
          border: 1px solid #e8e8e8;
          text-align: center;
          padding-top: 20px;
          .iconfont {
            font-size: 26px;
          }
        }
        div:hover {
          cursor: pointer;
          .iconfont {
            color: #b4a078;
          }
          p {
            color: #b4a078;
          }
        }
      }
    }
    .we {
      border-left: 1px solid #e9e9e9;
      border-right: 1px solid #e9e9e9;
      padding: 0 40px;
      height: 204px;
      p.content {
        line-height: 23px;
        font-size: 14px;
      }
      .concern {
        position: relative;
        padding-left: 60px;
        margin-top: 25px;
        span {
          font-size: 14px;
          position: absolute;
          top: 7px;
          left: 0;
        }
        .ivu-poptip-body-content .api img {
          margin: 0 auto;
          display: block;
          width:120px;
        }
        .icon {
          width: 32px;
          height: 32px;
          margin-left: 25px;
        }
        .icon:hover {
          cursor: pointer;
        }
      }
    }
    .down {
      img {
        display: block;
        margin: 0 auto;
      }
      p.gift {
        text-align: center;
        font-size: 12px;
        color: #b4a078;
        line-height: 32px;
      }
    }
  }
  .bottom {
    background: #414141;
    .top {
      padding-top: 37px;
      padding-bottom: 30px;
      border-bottom: 1px solid #4f4f4f;
      .box {
        color: #fff;
        font-size: 16px;
        position: relative;
        padding: 0 110px;
        span {
          position: absolute;
          top: 50%;
          margin-top: -8px;
          margin-left: 16px;
        }
        .iconfont {
          font-size: 51px;
        }
      }
    }
    .bottom {
      position: relative;
      padding-top: 30px;
      padding-bottom: 24px;
      .foot-list {
        width: 466px;
        margin: 0 auto;
        li {
          float: left;
          color: #999999;
          padding: 0 13px;
          border-left: 2px solid #999;
        }
        li:hover {
          cursor: pointer;
          color: #ccc;
        }
        li:first-child {
          border: none;
        }
      }
      p.desc {
        text-align: center;
        color: #999;
      }
      .gongshang {
        position: absolute;
        height: 36px;
        right: 95px;
        top: 50%;
        margin-top: -18px;
      }
    }
  }
}
</style>