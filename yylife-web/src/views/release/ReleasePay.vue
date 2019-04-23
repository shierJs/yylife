<template>
  <div>
    <Head :showRelease="false" :i="-1"></Head>
    <div id="main" v-if="show">
      <div class="wrap">
        <Breadcrumb :data="Breadcrumb"></Breadcrumb>
        <!-- 面包屑 -->
        <!-- 主体 -->
        <div class="wrapper">
          <div class="head">
            <p class="class" @click="$router.push('/release')">1.重新选择发布类别</p>
            <p class="info" @click="$router.go(-1)">2.填写信息</p>
            <p class="comfirm">3.完成发布</p>
          </div>
          <!-- 表单 -->
          <div class="form">
            <Form :label-width="80">
              <FormItem label="发布位置">
                <RadioGroup v-model="position" @on-change="changePos">
                  <Radio :label="item.id" v-for="item in positionList" :key="item.id">{{item.name}}</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="发布天数" prop="days">
                <i-input v-model="days" type="number" @on-change="changeDay">
                  <span slot="append">天</span>
                </i-input>
              </FormItem>
              <FormItem label="价格">
                <p class="money">￥{{price}}.00</p>
              </FormItem>
              <FormItem label="应付金额">
                <p class="money">￥{{money}}.00</p>
              </FormItem>
              <p class="release" @click="handleSubmit">发布</p>
            </Form>
          </div>
          <!-- 表单 -->
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Breadcrumb from "@/components/Breadcrumb";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      Breadcrumb: {
        path: "/release",
        name: "发布信息",
        now: "完成发布"
      },
      money: 0,
      price: 10,
      position: 1,
      positionId: 1,
      dayId: 1,
      positionList: [
        {
          id: 1,
          name: "行业置顶"
        },
        {
          id: 2,
          name: "首页推荐"
        },
        {
          id: 3,
          name: "普通发布"
        },
      ],
      days: 1,
      userInfo: null,
      show: false,
      id: 0,
      releaseId:0,
    };
  },
  methods: {
    handleSubmit() {
      if (this.days <= 0 || this.days == "") {
        this.$Message.info("请填写天数");
      } else {
        let data = {
          gold_account: this.userInfo.gold_account,
          order_amount: this.money,
          order_sn: "发布支付",
          days: this.days,
          id: this.id,
          location: this.positionId,
          releaseId:this.releaseId,
        };
        data=JSON.stringify(data);
        sessionStorage.setItem("payData", data);
        this.$router.push("/pay");
      }
    },
    changePos(v) {
      this.positionId = v;
      this.calc();
    },
    calc() {
      if (this.positionId == 1) {
        this.price = 10;
        this.money = this.price * parseInt(this.dayId);
      } else if (this.positionId == 2) {
        this.price = 50;
        this.money = this.price * parseInt(this.dayId);
      } else {
        this.price = 1;
        this.money = this.price * parseInt(this.dayId);
      }
    },
    changeDay(event) {
      if (this.days == "" || this.days <= 0) {
        this.days = 1;
        this.$Message.info("最少选择一天");
      } else {
        this.dayId = parseInt(this.days);
      }
      this.calc();
    }
  },
  mounted() {
    if (sessionStorage.getItem("user")) {
      this.userInfo = JSON.parse(sessionStorage.getItem("user"));
      this.id = parseInt(this.$route.params.id2);
      this.releaseId= parseInt(this.$route.params.id);
      this.changePos(1);
      this.show = true;
    } else {
      this.$router.push("/log/2");
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
    .head {
      margin: 30px 0;
      font-size: 16px;
      p {
        display: inline-block;
        width: 350px;
        margin-left: 50px;
        border-bottom: 2px solid #ccc;
      }
      p:first-child {
        margin-left: 0;
      }
      p:first-child:hover {
        cursor: pointer;
        border-color: #b4a078;
        color: #b4a078;
      }
      p:nth-child(2):hover {
        border-color: #b4a078;
        color: #b4a078;
      }
      p:last-child {
        border-color: #b4a078;
        color: #b4a078;
      }
    }
    .wrapper {
      background: #fff;
      padding: 20px 20px;
      .form {
        .negotiable {
          font-size: 16px;
          line-height: 33px;
        }
      }
    }
    .form {
      .gold {
        color: #ff7b00;
        font-size: 16px;
      }
      .money {
        font-size: 18px;
        color: #f33;
      }
      .release {
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        background: #b4a078;
        border-radius: 5px;
        margin-left: 15px;
      }
      .release:hover {
        background: #a08e6a;
        cursor: pointer;
      }
    }
  }
}
</style>