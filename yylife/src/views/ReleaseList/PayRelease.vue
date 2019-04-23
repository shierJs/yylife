<template>
  <div>
    <Head :title="title"></Head>
    <div id="main">
      <div class="posite">
        <p class="pick">选择广告位：</p>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="普通发布" clickable @click="radio = '1'">
              <van-radio name="3"/>
            </van-cell>
            <van-cell title="行业置顶" clickable @click="radio = '2'">
              <van-radio name="1"/>
            </van-cell>
            <van-cell title="首页推荐位" clickable @click="radio = '3'">
              <van-radio name="2"/>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="days">
        <p class="pick">选择发布时长：</p>
        <div class="steps">
          <span class="day">发布天数,最低一天</span>
          <input type="number" v-model="num">
          <span>天</span>
        </div>
      </div>
      <div class="orders">
        <van-radio-group v-model="type">
          <van-radio name="1">
            <i class="iconfont icon-zhifubaozhifu"></i>
            <span>支付宝支付</span>
          </van-radio>
          <van-radio name="2">
            <i class="iconfont icon-weixinzhifu"></i>
            <span>微信支付</span>
          </van-radio>
          <van-radio name="3" :disabled="gold">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jinbi"></use>
            </svg>
            <span class="account">
              金币支付(余额：
              <span class="price">{{user.gold_account}}</span>)
            </span>
          </van-radio>
        </van-radio-group>
        <div class="cell" v-if="type != '3'">
          <p class="title">应付总额：</p>
          <p class="num">￥{{price}}.00</p>
        </div>
        <div class="cell" v-else>
          <p class="title">应付总额：</p>
          <p class="num">{{golds}}</p>
        </div>
      </div>
      <div class="pay">
        <p class="btn" @click="pay">支付</p>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head";
import setInfoApi from "@/api/setInfo";
import logApi from "@/api/log";
import { Toast, RadioGroup, Radio } from "vant";
export default {
  data() {
    return {
      title: "发布广告位",
      radio: "1",
      type: "1",
      value: 1,
      num: 1,
      user: {},
      id: 0,
      cate: 0
    };
  },
  mounted() {
    this.getInfo();
    this.id = this.$route.params.id2;
    this.cate = this.$route.params.id;
  },
  methods: {
    pay() {
      let data = {
        type: this.type,
        web_type: "wap",
        location: this.radio,
        days: this.num,
        common_id: this.id,
        mold:this.cate
      };
      setInfoApi.paymentsPublish(data).then(res => {
        if (res.data.code === 200) {
          Toast(res.data.msg);
          this.$router.push(`/myRelease`);
        } else if (res.data.code === 202) {
          location.href = res.data.data.url;
        } else if (res.data.code === 204) {
          let routerData = this.$router.resolve({
            path: "/aliPay",
            query: { htmls: res.data.data }
          });
          this.htmls = res.data.data;
          window.open(routerData.href, "_self");
        } else if (res.data.code === 10003) {
          this.defined.removeToken();
          Toast("身份验证已过期，请重新登录");
          this.$router.push("/");
        } else {
          Toast(res.data.msg);
        }
      });
    },
    getInfo() {
      logApi
        .getInfo()
        .then(res => {
          if (res.data.code === 10003) {
            Toast("身份已失效，请重新登录");
            this.defined.removeToken();
            this.$router.push("/login");
          } else if (res.data.code === 200) {
            this.user = res.data.data;
          } else {
            Toast(res.data.msg);
            this.$router.push("/");
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    }
  },
  computed: {
    price() {
      switch (this.radio) {
        case "1":
          return 10 * this.num;
          break;
        case "2":
          return 50 * this.num;
          break;
        case "3":
          return 1 * this.num;
          break;
      }
    },
    golds() {
      if (this.type == "3") {
        switch (this.radio) {
          case "1":
            return 100 * this.num;
            break;
          case "2":
            return 500 * this.num;
            break;
          case "3":
            return 10 * this.num;
            break;
        }
      } else {
        return 0;
      }
    },
    gold() {
      if (this.price > this.user.gold_account) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    Head,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  }
};
</script>

<style scoped lang="less">
#main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f4f4f4;
  padding-top: 90px;
  .pick {
    font-size: 28px;
    color: #333;
    padding-left: 20px;
    height: 60px;
    line-height: 60px;
    font-weight: 700;
  }
  .posite {
    background: #fff;
    border-top: 1px solid #f4f4f4;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .days {
    background: #fff;
    .steps {
      display: flex;
      align-items: center;
      height: 60px;
      padding: 0 20px;
      justify-content: flex-end;
      .day {
        margin-right: 30px;
      }
      input {
        text-align: right;
        margin-right: 20px;
        font-size: 30px;
      }
    }
  }
  .orders {
    background: #fff;
    .iconfont {
      font-size: 30px;
    }
    .icon-weixinzhifu {
      color: #24af41;
    }
    .icon-zhifubaozhifu {
      color: #108ee9;
    }
    .account {
      font-size: 26px;
      .price {
        font-size: 30px;
        color: rgb(255, 123, 0);
      }
    }
    .icon {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
    .cell {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      .title {
        font-size: 30px;
      }
      .num {
        font-size: 30px;
        color: #f33;
      }
    }
  }
  .pay {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .btn {
      font-size: 30px;
      color: #fff;
      background: #f44;
      padding: 20px 200px;
      border-radius: 40px;
    }
  }
}
</style>