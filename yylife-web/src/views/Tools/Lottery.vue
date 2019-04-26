<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main" class="lottery">
      <div class="bg wrap">
        <h2 class="title">
          <img src="../../../static/img/material/lottery-title.png" alt>
        </h2>
        <div class="lottery-wrap">
          <p class="list-lottery">消耗{{count}}积分抽一次奖</p>
          <div class="left">
            <div class="light l1" v-show="light"></div>
            <div class="light l2" v-show="!light"></div>
          </div>
          <ul class="wrapper">
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
                <img src="../../../static/img/material/lottery-btn.png" alt>
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
          <div class="right">
            <div class="light l1" v-show="light"></div>
            <div class="light l2" v-show="!light"></div>
          </div>
        </div>
        <div class="right-list">
          <div class="lucky-list">
            <h4 class="title">
              <img src="../../../static/img/material/lucky-list.png" alt>
            </h4>
            <div class="list-wrap">
              <div class="swiper-lucky">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide swiper-no-swiping"
                    v-for="(item,index) in luckyList"
                    :key="index"
                  >
                    <span>用户：{{item.mobile}}在幸运大转盘中获得{{item.draw_name}}“{{item.prize}}”</span>
                  </div>
                </div>
              </div>
              <div class="view">
                <p class="records">
                  <span @click="viewList">查看中奖纪录</span>
                </p>
              </div>
            </div>
          </div>
          <!--中奖列表 -->
          <div class="info">
            <p class="view" v-if="showInfo" @click="$router.push('/log/0')">
              <span>登录查看我的积分</span>
            </p>
            <div class="my-info" v-else>
              <p class="name" v-if="info.username">用户：{{info.username}}</p>
              <p class="name" v-else>用户：{{info.mobile}}</p>
              <p class="jifen">积分：{{info.points_account}}</p>
            </div>
          </div>
          <!-- 我的信息 -->
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
      </div>
      <div class="modal" v-show="endi">
        <div class="pop">
          <i class="iconfont icon-guanbi1" @click="endi=false"></i>
          <div class="content">
            <i class="iconfont icon-duihao"></i>
            <h5
              v-if="prizeList[prize].reward_type != 0"
            >恭喜您获得{{prizeList[prize].name}}{{prizeList[prize].prize}}</h5>
            <h5 v-else>{{prizeList[prize].name}}</h5>
            <p
              class="aa"
              v-show="prizeList[prize].reward_type != 0&&prizeList[prize].reward_type != 3"
            >
              可在
              <span @click.stop="$router.push('/mine/0/mineIndex')">[个人中心]</span>查看
            </p>
            <p class="aa" v-show="prizeList[prize].reward_type == 0">很遗憾，没有中奖哦，请再抽一次吧</p>
            <p class="aa" v-show="prizeList[prize].reward_type == 3">我们将会在一小时内联系您的注册手机号，与您确定发放奖品</p>
            <div class="btns">
              <span class="view" @click.stop="viewList">查看中奖纪录</span>
              <span class="again" @click="again">再抽一次</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-list" v-show="showMyList" @click.prevent="showMyList=false">
        <ul class="list">
          <p class="title">我的中奖纪录</p>
          <li class="item" v-for="(item,index) in myList" :key="index">
            <p>您在{{item.create_time}}抽中了“{{item.draw_name}}-{{item.prize}}”</p>
          </li>
        </ul>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Swiper from "swiper";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      title: "每日抽奖",
      light: true,
      endi: false,
      timer1: null,
      item: [],
      itemActive: [],
      luckyList: [
        // {
        //   draw_name: "五等奖",
        //   prize: "金币",
        //   create_time: "2019-03-26 11:04:44",
        //   prize_num: 1,
        //   mobile: "150****2824"
        // },
        // {
        //   draw_name: "鼓励奖",
        //   prize: "2积分",
        //   create_time: "2019-03-26 11:04:07",
        //   prize_num: 1,
        //   mobile: "159****8056"
        // },
        // {
        //   draw_name: "鼓励奖",
        //   prize: "2积分",
        //   create_time: "2019-03-26 11:04:01",
        //   prize_num: 1,
        //   mobile: "183****0783"
        // },
        // {
        //   draw_name: "鼓励奖",
        //   prize: "2积分",
        //   create_time: "2019-03-26 11:03:40",
        //   prize_num: 1,
        //   mobile: "188****3040"
        // },
        // {
        //   draw_name: "五等奖",
        //   prize: "金币",
        //   create_time: "2019-03-26 11:03:32",
        //   prize_num: 1,
        //   mobile: "159****8056"
        // },
        // {
        //   draw_name: "鼓励奖",
        //   prize: "2积分",
        //   create_time: "2019-03-26 11:03:24",
        //   prize_num: 1,
        //   mobile: "183****0783"
        // },
        // {
        //   draw_name: "二等奖",
        //   prize: "电动牙刷",
        //   create_time: "2019-03-26 11:03:03",
        //   prize_num: 1,
        //   mobile: "147****2344"
        // },
        // {
        //   draw_name: "四等奖",
        //   prize: "牙刷",
        //   create_time: "2019-03-26 11:02:47",
        //   prize_num: 1,
        //   mobile: "138****6590"
        // }
      ],
      prizeList: [
        "iphoneX",
        "网易智造太空舱按摩椅",
        "养生壶",
        "日式声波式电动牙刷",
        "2积分",
        "35元券",
        "2元直减红包",
        "超级会员(60天)"
      ],
      myList: [],
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
      showInfo: false,
      info: {},
      showMyList: false,
      prizeData: {},
      count: 10
    };
  },
  created() {
    this.afterLotteryHandler = this.afterLottery;
    this.getImg();
    this.getAllList();
    this.getInfo();
  },
  mounted() {
    clearInterval(this.timer1);
    this.shine();
      var swiperLuck=new Swiper(".swiper-lucky", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: 2000,
        direction: "vertical",
        height: 40, //你的slide高度
        loop: true,
        loopAdditionalSlides: 5,
        speed: 1000
    });
  },
  beforeDestroy() {
    this.afterLotteryHandler = () => {};
    clearInterval(this.timer1);
    clearTimeout(this.timer);
  },
  methods: {
    shine() {
      this.timer1 = setInterval(() => {
        if (this.light) {
          this.light = false;
          clearInterval(this.timer1);
          this.shine();
        } else {
          this.light = true;
          clearInterval(this.timer1);
          this.shine();
        }
      }, 1000);
    },
    beforeLottery(resolve, reject) {
      //send ajax to get result and pass to child component
      if (this.info.points_account >= 10) {
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
              this.prizeData = res.data.data;
              this.info.points_account = this.info.points_account - 10;
              this.prize = i;
              resolve();
            } else if (res.data.code === 10003) {
              this.defined.removeToken();
              this.$router.push("/log/0");
            } else {
              this.$Message.info(res.data.msg);
              reject();
            }
          })
          .catch(err => console.log(err));
      } else {
        this.$Message.info("积分不够了，做任务可以获得积分哦");
        reject();
      }
    },
    afterLottery() {
      if (this.prizeData.reward_type == 1) {
        this.info.points_account += this.prizeData.amount;
      }
      this.endi = true;
    },
    again() {
      this.endi = false;
      this.startLottery();
    },
    startLottery() {
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
            console.log(e);
          }
        };

        start();
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
            this.count = res.data.number;
            list.forEach(el => {
              this.item.push(el.img_1);
              this.itemActive.push(el.img_2);
            });
            this.prizeList = list;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    getAllList() {
      getInfoApi
        .getActivityDrawRecord()
        .then(res => {
          if (res.data.code === 200) {
            this.luckyList = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    getInfo() {
      let info = sessionStorage.getItem("user");
      console.log(info);
      if (info) {
        this.info = JSON.parse(info);
        this.showInfo = false;
      } else {
        this.showInfo = true;
      }
    },
    viewList() {
      getInfoApi
        .getMyActivityDrawRecord()
        .then(res => {
          if (res.data.code === 200) {
            this.myList = res.data.data;
            this.showMyList = true;
          } else if (res.data.code === 10003) {
            this.defined.removeToken();
            this.$router.push("/log/0");
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
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
    Head,
    Foot
  }
};
</script>

<style scoped lang="less">
#main {
  padding: 50px 0;
  background: #f4f0ea;
  .title {
    text-align: center;
    margin-bottom: 50px;
  }
  div.bg {
    .lottery-wrap {
      padding: 100px 150px;
      background: #fff;
      width: 800px;
      border: 1px solid #e2cea3;
      border-radius: 50px;
      position: relative;
      display: inline-block;
      .list-lottery {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50px;
        transform: translateX(-50%);
        font-size: 18px;
        color: #b4a078;
      }
      .left,
      .right {
        position: absolute;
        top: 59px;
      }
      .light {
        background: url("../../../static/img/material/light.png") no-repeat 0 0;
        width: 41px;
        height: 584px;
      }
      .l1 {
        transition: light1 2s;
      }
      .l2 {
        background-position: -41px 0;
      }
      .left {
        left: 54px;
      }
      .right {
        right: 54px;
      }
      .wrapper {
        width: 500px;
        height: 500px;
        background: #fff;
        position: relative;
        padding: 10px;
        padding-bottom: 0;
        .row {
          display: flex;
          width: 100%;
          height: 150px;
          margin-bottom: 10px;
          justify-content: space-between;
          .item {
            width: 150px;
            height: 150px;
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
            width: 150px;
            height: 150px;
            font-weight: 100;
            border-radius: 50%;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .right-list {
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      .lucky-list {
        background: #fff;
        margin-left: 15px;
        padding: 10px;
        padding-bottom: 100px;
        border-radius: 50px;
        border: 1px solid #e2cea3;
        position: relative;
        .list-wrap {
          overflow: hidden;
          .swiper-lucky {
            height: 280px;
          }
        }
        .swiper-slide {
          line-height: 40px;
          color: #b4a078;
          border-bottom: 1px solid #ccc;
          text-align: center;
          width: 350px;
          span {
            font-size: 14px;
          }
        }
        .swiper-slide:last-child {
          border-bottom: none;
        }
        .view {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          p {
            width: 160px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 20px;
            color: #fff;
            background: #b4a078;
            border-radius: 20px;
          }
          p:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
      .info {
        margin-top: 20px;
        .view {
          font-size: 24px;
          text-align: center;
          color: #b4a078;
          font-weight: 600;
          line-height: 194px;
        }
      }
      .view span:hover {
        cursor: pointer;
        color: rgb(241, 195, 66);
      }
      .my-info {
        height: 192px;
        background: #fff;
        border: 1px solid #e2cea3;
        border-radius: 40px;
        margin-left: 15px;
        padding: 35px 20px;
        p {
          font-size: 16px;
          color: #b4a078;
          line-height: 46px;
        }
      }
    }
  }
  .rules {
    h4.title {
      height: 88px;
      line-height: 88px;
      font-size: 30px;
      text-align: center;
      margin: 0;
    }
    .txt {
      margin-left: 50%;
      transform: translateX(-50%);
      .content {
        font-size: 24px;
        line-height: 40px;
        color: #000;
      }
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .pop {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      background: #fff;
      padding: 20px;
      padding-top: 100px;
      .icon-guanbi1 {
        position: absolute;
        right: 20px;
        top: 20px;
        color: #999;
        font-size: 20px;
        cursor: pointer;
      }
      .content {
        text-align: center;
        .iconfont {
          font-size: 50px;
          color: #b4a078;
        }
        h5 {
          font-size: 20px;
          line-height: 36px;
        }
        .aa {
          font-size: 16px;
          color: #999;
          line-height: 40px;
          span:hover {
            cursor: pointer;
            color: #b4a078;
            text-decoration: underline;
          }
        }
        .btns {
          margin-bottom: 40px;
          span {
            display: inline-block;
            width: 120px;
            height: 40px;
            background: #b4a078;
            color: #fff;
            text-align: center;
            line-height: 40px;
            margin-right: 20px;
            border-radius: 4px;
            border: 1px solid transparent;
            font-size: 16px;
          }
          .again {
            margin-right: 0;
            background: #fff;
            border-color: #b4a078;
            color: #b4a078;
          }
          span:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  .modal-list {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    ul.list {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 340px;
      background: #fff;
      padding: 20px;
      border: 1px solid #e2cea3;
      border-radius: 40px;
      min-height: 500px;
      color: #b4a078;
      .title {
        margin-bottom: 20px;
        font-size: 18px;
      }
      .item {
        font-size: 14px;
        line-height: 30px;
        border-bottom: 1px dashed #e2cea3;
      }
    }
  }
}
</style>