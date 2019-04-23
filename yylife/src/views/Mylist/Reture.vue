<template>
    <div>
        <Head :title="title"></Head>
        <div id="main">
            <div class="view">
                <div class="cards">
                    <div v-if="list.length">
                        <div class="item"  v-for="(v,i) in list" :key="i">
                             <div class="head">
                                <p class="orderNum">订单编号：{{v.orderNum}}</p>
                                <span class="state">{{v.state}}</span>
                            </div>
                            <div class="session">
                               <div class="left">
                                    <img v-lazy="v.imgSrc" :key="v.imgSrc" alt="">
                                    <p class="title">{{v.title}}</p>
                                    <p class="desc">{{v.desc}}</p>
                               </div>
                                <div class="right">
                                    <p class="num">x{{v.num}}</p>
                                    <p class="price">{{v.price}}</p>
                                </div>
                            </div>
                            <div class="act" v-show="v.act!=''" @click="act(i)">
                                <span>{{v.act}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="null" v-else>
                        <img src="/static/img/bg3.png" alt="">
                        <p class="content">还没有任何订单呢</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Head from "@/components/Head";
export default {
  data() {
    return {
      title: "退换货详情",
      i: 0,
      show: true,
      list: [
        {
          imgSrc: "/static/img/img821620fc9bc70.png",
          orderNum: 463456764,
          title: "大衣",
          desc: "白色 XL",
          price: "398.00",
          num: 2,
          state: "退货中",
          act: "查看物流"
        },
        {
          imgSrc: "/static/img/img811620fc9bc70.png",
          orderNum: 232341434,
          title: "冲锋衣",
          desc: "黑色 L",
          price: "199.00",
          num: 1,
          state: "已退货",
          act:'',
        }
      ]
    };
  },
  methods: {
    act() {
      
    }
  },
  mounted() {
    console.log(this.list.length)
  },
  components: {
    Head
  }
};
</script>

<style scoped lang="less">
#main {
  background: #f4f4f4;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 90px;
  .view {

    .null {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    p.content {
      font-size: 32px;
      color: #999;
      text-align: center;
    }
    .cards div div.item {
      background: #fff;
      margin-top: 20px;
      width: 100%;
      .head {
        padding: 0 26px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #f4f4f4;
        height: 60px;
        color: #8a8a8a;
      }
      .session {
        padding: 56px 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #666;
        font-size: 24px;
        .left {
          display: flex;
          align-items: center;
          img {
            width: 80px;
            height: 80px;
          }
          .title {
            margin: 0 20px;
          }
        }
        .right {
          display: flex;
          align-items: center;
          .num {
            margin-right: 48px;
          }
        }
      }
      .act {
        height: 110px;
        border-top: 2px solid #f4f4f4;
        padding: 0 26px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
          padding: 16px 32px;
          font-size: 24px;
          color: #ff4444;
          border: 1px solid #ff4444;
        }
      }
    }
  }
}
</style>