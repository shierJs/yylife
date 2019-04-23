<template>
  <div>
    <van-popup v-model="show.showSign" :close-on-click-overlay="false">
      <div class="sign-pop">
        <div class="top">
          <div>
            <p class="login" v-if="!tokens">点击登录</p>
            <p class="login" v-else>点击下方领取按钮签到！</p>
            <span>签到送好礼，连续签到七天可获得金币</span>
          </div>
        </div>
        <div class="content">
          <div class="day" v-for="(item,index) in signData" :key="index">
            <p class="title">{{item.des}}</p>
            <div class="item" v-if="!item.is_sign">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.icon"></use>
              </svg>
              <p class="prize">{{item.num}}</p>
            </div>
            <div class="item" v-else>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yiqiandao"></use>
              </svg>
              <p class="prize">已签到</p>
            </div>
          </div>
          <p class="btn" @click="receive">领取</p>
        </div>
        <img src="../../static/img/guanbi.png" alt class="close" @touchend.stop="close">
      </div>
    </van-popup>
  </div>
</template>

<script>
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { mapMutations } from "vuex";
import { Toast } from 'vant';
export default {
  data() {
    return {
      tokens: this.defined.access_token,
      signData: [],
      count:0,
    };
  },
  methods: {
    sign() {
      getInfoApi
        .getSign()
        .then(res => {
          if (res.data.code === 200) {
            this.signData = res.data.data;
            for (let i = 0; i < this.signData.length; i++) {
              this.signData[i].num =
                this.signData[i].reward + this.signData[i].name;
              this.signData[i].icon = "#" + this.signData[i].icon;
            }
          } else if(res.data.code===10003){
            let bool=false;
            this.setShowSign(bool);
            this.defined.removeToken();
          }else{
            ;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    close(){
        let bool=false;
        this.setShowSign(bool);
    },
    receive(){
        setInfoApi.sign().then(res=>{
            if(res.data.code===10003){
                Toast("身份验证已过期,请重新登录");
                this.defined.removeToken();
                this.close();
                this.$router.push("/");
            }else if(res.data.code===200){
                this.sign();
                Toast(res.data.msg);
            }else{
              Toast(res.data.msg);
            }
        }).catch(err=>this.$router.push('/notFound'));
    },
    ...mapMutations(['setShowSign']),
  },
  mounted(){
    this.sign();
  },
  computed: {
    show() {
      return this.$store.state;
    }
  }
};
</script>

<style scoped lang="less">
.sign-pop {
  width: 600px;
  margin: 0 auto;
  position: relative;
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 45px;
  }
  .top {
    height: 150px;
    background: linear-gradient(to right, #fe3d2c, #e68b30, #fe3d2c);
    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      padding-top: 20px;
      p {
        font-size: 36px;
        font-weight: 500;
        color: #fff;
        text-align: center;
        line-height: 80px;
      }
      span {
        font-size: 28px;
        color: #ffc0a3;
      }
    }
  }
  .content {
    margin: 0 20px;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .day {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #cb4e30;
      margin-left: 20px;
      margin-bottom: 20px;
      width: 120px;
      border-radius: 10px;
      .title {
        font-size: 26px;
        color: #fff;
        line-height: 54px;
      }
      .item {
        width: 100%;
        border: 3px solid #cb4e30;
        border-radius: 10px;
        background: #fff4f2;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 80px;
          height: 60px;
          margin: 10px 0;
        }
        .prize {
          font-size: 24px;
          color: #f56a4b;
          text-align: center;
          margin-bottom: 10px;
        }
      }
    }
    .day:first-child {
      margin: 0;
      margin-bottom: 20px;
    }
    .day:nth-child(5) {
      margin: 0;
      margin-bottom: 20px;
    }
    .btn {
      width: 240px;
      height: 60px;
      background: #fe552e;
      border-radius: 6px;
      text-align: center;
      line-height: 60px;
      font-size: 26px;
      color: #fff;
      margin-bottom: 40px;
      margin-top: 20px;
    }
  }
}
</style>