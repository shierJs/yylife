<template>
  <div>
    <Head :title="title"></Head>
    <div id="main" class="lottery">
      <img src="/static/img/title.png" alt class="title">
      <div class="bg">
        <p class="num">每次抽奖需要{{number}}积分</p>
        <ul class="wrap">
          <li class="row">
            <div
              :class="['item' , {active : activeClass[index]}]"
              v-for="(prize,index) in lis1"
              :key="index"
            >
              <img class="img" :src="prize" alt>
              <img class="img1" :src="itemActive[index]" alt>
            </div>
          </li>
          <li class="row">
            <div :class="['item' , {active : activeClass[7]}]">
              <img class="img" :src="item[7]" alt>
              <img class="img1" :src="itemActive[7]" alt>
            </div>
            <div class="item action" @click="startLottery">
              <img src="../../static/img/lottery-btn.png" alt>
            </div>
            <div :class="['item' , {active : activeClass[3]}]">
              <img class="img" :src="item[3]" alt>
              <img class="img1" :src="itemActive[3]" alt>
            </div>
          </li>
          <li class="row">
            <div
              :class="['item' , {active : activeClass[6-index]}]"
              v-for="(prize,index) in lis2"
              :key="index"
            >
              <img class="img" :src="prize" alt>
              <img class="img1" :src="itemActive[6-index]" alt>
            </div>
          </li>
        </ul>
        <!-- 中奖滚动 -->
        <div class="winning" v-if="luckList.length != 0">
          <van-swipe :autoplay="1000" vertical :width="468" :show-indicators="false">
            <van-swipe-item v-for="(item,index) in luckList" :key="index">
              <span>用户：{{item.mobile}}抽中了{{item.draw_name}}“{{item.prize}}”</span>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="rules">
        <h4 class="title">积分抽奖细则</h4>
        <div class="txt">
          <p class="content">1、每日签到可获得积分；</p>
          <p class="content">2、发布广告可获得积分；</p>
          <p class="content">3、商城下单确定收货即可获得积分；</p>
          <p class="content">4、中实物奖的用户，请在个人中心的收货地址中填写相关的地址联系方式等资料，奖品按默认收货地址邮寄或联系用户到指定地点领取；</p>
        </div>
        <p class="right">活动最终解释权归主办方所有</p>
      </div>
      <van-popup v-model="show">
        <div class="pop">
          <img src="/static/img/icon/guanbi.png" alt class="close" @click="show=false">
          <div class="win" v-if="prizeList[prize].reward_type != 0">
            <img src="/static/img/popup.png" alt>
            <div class="win-news">
              <span>恭喜您</span>
              <p>
                抽中了
                <span>{{prizeList[prize].prize}}</span>
              </p>
            </div>
            <p class="news" v-if="prizeList[prize].reward_type != 3">赶快去我的-个人中心查看下吧</p>
            <p class="news" v-else>我们将尽快联系您的注册手机号，为您发放奖品</p>
            <p class="btn" @click="again">再抽一次</p>
          </div>
          <div class="lose" v-else>
            <img src="/static/img/notWinning.png" alt>
            <div class="lose-content">
              <p class="tlt">很遗憾~</p>
              <p class="content">哎呀，刚刚大奖与你擦肩而过，不要伤心，邀请好友将会获得积分哦!</p>
            </div>
            <div class="share" @click="$router.push('/')">
              <p>快去邀请吧!</p>
              <img src="/static/img/icon/icon_recommend.png" alt>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: "每日抽奖",
      item: [0, 1, 2, 3, 4, 5, 6, 7],
      activeClass: [false, false, false, false, false, false, false, false],
      index: -1,
      count: 8,
      timer: null,
      times: 0,
      speedData: 100,
      lock: false,
      prize: 0,
      cycle: 20,
      afterLotteryHandler: null,
      show: false,
      item: [],
      itemActive: [],
      prizeList: [
        {
          reward_type: 0
        }
      ],
      luckList: [],
      number: 10
    };
  },
  created() {
    this.afterLotteryHandler = this.afterLottery;
    this.getImg();
    this.getList();
  },
  beforeDestroy() {
    this.afterLotteryHandler = () => {};
  },
  methods: {
    beforeLottery(resolve, reject) {
      //send ajax to get result and pass to child component
      setInfoApi
        .setLottery()
        .then(res => {
          if (res.data.code === 200) {
            let id = res.data.data.id;
            let i = 0;
            this.prizeList.forEach((el, index) => {
              if (el.id == id) {
                i = index;
              }
            });
            this.prize = i;
            resolve();
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/log/1");
          } else {
            Toast(res.data.msg);
            reject();
          }
        })
        .catch(err => console.log(err));
    },
    afterLottery() {
      this.show = true;
    },
    startLottery() {
      if (this.defined.access_token != "") {
        if (!this.lock) {
          let promise = () => {
            return new Promise((resolve, reject) => {
              this.lock = true;
              this.num--;
              this.beforeLottery(resolve, reject);
            });
          };

          let start = async () => {
            try {
              await promise();

              this.roll();
            } catch (e) {
              e();
            }
          };

          start();
        }
      } else {
        Toast("请先去登录");
        this.$router.push("/log/1");
      }
    },
    _rollHandler() {
      var index = this.index;
      var count = this.count;

      for (let i = 0, len = this.activeClass.length; i < len; i++) {
        this.activeClass[i] = false;
      }
      index += 1;
      if (index > count - 1) {
        index = 0;
      }
      this.activeClass[index] = true;
      this.index = index;
      return false;
    },
    roll() {
      // eslint-disable-next-line
      this.activeClass = this.activeClass.map(item => (item = false));
      this.times += 1;
      this._rollHandler();
      if (this.times > this.cycle + 10 && this.prize == this.index) {
        clearTimeout(this.timer);

        setTimeout(() => {
          this._showResult();
        }, 1000);

        this.lock = false;
        this.index = -1;
        this.count = 8;
        this.timer = null;
        this.speedData = 100;
        this.times = 0;
      } else {
        if (this.times < this.cycle) {
          this.speedData -= 2;
        } else {
          if (
            this.times > this.cycle + 10 &&
            ((this.prize == 0 && this.index == 7) ||
              this.prize == this.index + 1)
          ) {
            this.speedData += 110;
          } else {
            this.speedData += 20;
          }
        }
        if (this.speedData < 40) {
          this.speedData = 40;
        }
        this.timer = setTimeout(() => {
          this.roll();
        }, this.speedData);
      }
      return false;
    },
    _showResult() {
      //抽奖后的执行函数
      this.afterLotteryHandler();
    },
    getImg() {
      getInfoApi
        .getActivityDraw()
        .then(res => {
          if (res.data.code === 200) {
            let list = res.data.data;
            this.number = res.data.number;
            list.forEach(el => {
              this.item.push(el.img_2);
              this.itemActive.push(el.img_1);
            });
            this.prizeList = list;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    getList() {
      getInfoApi
        .getActivityDrawRecord()
        .then(res => {
          if (res.data.code === 200) {
            this.luckList = res.data.data;
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    again() {
      this.show = false;
      this.startLottery();
    }
  },
  computed: {
    lis1() {
      return this.item.slice(0, 3);
    },
    lis2() {
      return this.item.slice(4, 7).reverse();
    }
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  background: #ffe431;
  .title {
    margin: 0 auto;
    margin-top: 96px;
    width: 500px;
  }
  div.bg {
    background: url("/static/img/miyagi.png") no-repeat;
    background-size: 100% 100%;
    width: 95%;
    height: 770px;
    margin-left: 9px;
    position: relative;
    .winning {
      height: 76px;
      box-sizing: border-box;
      position: absolute;
      width: 100%;
      top: 140px;
      span {
        height: 76px;
        line-height: 76px;
        display: block;
        width: 100%;
        font-size: 24px;
        text-align: center;
      }
    }
    .num {
      position: absolute;
      font-size: 24px;
      color: #333333;
      top: 65px;
      right: 180px;
    }
    .wrap {
      width: 500px;
      height: 420px;
      background: #fff;
      margin: 0 auto;
      position: absolute;
      top: 225px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px;
      padding-bottom: 0;
      .row {
        display: flex;
        width: 100%;
        height: 129px;
        margin-bottom: 10px;
        justify-content: space-between;
        .item {
          width: 129px;
          height: 129px;
          border-radius: 10px;
          background: #f4f4f4;
          img {
            width: 100%;
            height: 100%;
          }
          .img1 {
            display: none;
          }
        }
        .active {
          .img1 {
            display: block;
          }
          .img {
            display: none;
          }
        }

        .action {
          width: 129px;
          height: 129px;
          border-radius: 65px;
        }
      }
    }
  }
  .rules {
    h4.title {
      background: url("/static/img/title-bg.png") no-repeat;
      width: 408px;
      height: 88px;
      background-size: 100% 100%;
      line-height: 120px;
      font-size: 30px;
      text-align: center;
    }
    .txt {
      width: 80%;
      margin: 0 auto;
      margin-top: 40px;
      .content {
        font-size: 24px;
        line-height: 40px;
        color: #000;
      }
    }
    .right {
      margin-top: 60px;
      text-align: center;
      font-size: 20px;
      color: #000;
    }
  }
  .pop {
    width: 100%;
    height: 650px;
    div {
      img {
        height: 642px;
        margin: 0 auto;
      }
    }
    .win {
      position: relative;
      img {
        height: 482px;
      }
      .win-news {
        font-size: 32px;
        color: #ee5c46;
        position: absolute;
        top: 150px;
        left: 50%;
        width: 248px;
        transform: translateX(-118px);
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          text-align: center;
          span {
            font-size: 36px;
            color: #fac216;
          }
        }
      }
      .news {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 28px;
        color: #d97c00;
        font-size: 24px;
      }
      .btn {
        position: absolute;
        height: 64px;
        background: #f15d35;
        width: 226px;
        font-size: 24px;
        border-radius: 64px;
        border: 10px solid #ffd864;
        color: #f8a86a;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: -100px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .lose {
      .lose-content {
        position: absolute;
        top: 80px;
        left: 180px;
        width: 270px;
        .tlt {
          font-size: 36px;
        }
        .content {
          font-size: 26px;
        }
      }
      .share {
        font-size: 60px;
        color: #fc0;
        position: absolute;
        bottom: 100px;
        left: 180px;
        display: flex;
        align-items: center;
        img {
          height: 60px;
          margin-left: 40px;
        }
      }
    }
    .close {
      width: 32px;
      height: 32px;
      position: absolute;
      top: 20px;
      right: 60px;
      z-index: 120;
    }
  }
}
</style>