<template>
  <div v-if="user">
    <Head :i="-1"></Head>
    <div id="main">
      <div class="content clear">
        <div class="left fl">
          <div class="top">
            <span>
              <img v-if="!showHead" src="../../../static/img/material/user.png" alt title="请添加您的头像">
              <img v-else :src="user.head_portrait" alt :title="user.username">
            </span>
          </div>
          <p class="date">{{user.username}}</p>
        </div>
        <div class="right fl">
          <ul class="list">
            <li class="item">
              <span class="label">我的金币</span>
              <Tooltip content="点击去充值" placement="right">
                <span class="gold" @click="$router.push(`/recharge/${user.gold_account}`)">{{user.gold_account}}</span>
            </Tooltip>
            </li>
            <li class="item">
              <span class="label">我的积分</span>
              <span class="intergral">{{user.points_account}}</span>
            </li>
            <!-- <li class="item">
              <span class="label">优惠券&emsp;</span>
              <span class="intergral">暂无</span>
            </li>
            <li class="item">
              <span class="label">待领礼包</span>
              <span class="intergral">暂无</span>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      loading: false,
      i: 0,
      user:"",
      src:"",
      showHead:false,
      timer:null,
    };
  },
  mounted() {
    this.user=JSON.parse(sessionStorage.getItem("user"));
    console.log(this.user);
      if(this.user == null){
        this.$router.push('/');
      }else{
        if(this.user.head_portrait != ""){
          this.showHead=true;
        }
      }
  },
  beforeDestroy(){
    clearTimeout(this.timer);
  },
  methods: {
    cancel(i) {
      this.modal = true;
      this.i = i;
    },
    del() {
      this.loading = true;
      clearTimeout(this.timer);
      this.timer=setTimeout(() => {
        this.loading = false;
        this.modal = false;
        this.pendOrderList.splice(this.i, 1);
        this.$Message.success("删除成功");
      }, 500);
    },
    
  }
};
</script>

<style scoped lang="less">
#main {
  .content {
    background: url("../../../static/img/material/mine-bg.png") no-repeat;
    background-size: 100% 100%;
    border: 1px solid #ddd;
    height: 370px;
    padding: 40px 120px;
    color: #fff;
    .left {
      padding-right: 100px;
      padding-top: 40px;
      padding-left: 50px;
      height: 100%;
      border-right: 1px dashed #b4a078;
      .top {
        span {
          display: inline-block;
          font-size: 16px;
          vertical-align: top;
        }
        span:first-child {
          margin-right: 40px;
          background: #fff;
          border: 1px solid #b4a078;
          padding: 5px;
          border-radius: 50%;
          img {
            border: 1px solid #999;
            border-radius: 50%;
            width:120px;
            height:120px;
          }
        }
      }
      .date {
        margin-top: 40px;
        font-size: 16px;
        width:132px;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
    .right {
      padding-left: 100px;
      padding-top: 40px;
      padding-left: 50px;
      height: 100%;
      .item {
        font-size: 16px;
        line-height: 36px;
        color: #b4a078;
        .label {
          color: #fff;
          margin-right: 20px;
        }
        .gold:hover{
          text-decoration:underline;
          cursor: pointer;
        }
      }
    }
  }
  .order-pend {
    margin-top: 40px;
    border: 1px solid #ddd;
    .head {
      background: #f4f4f4;
      font-size: 14px;
      line-height: 40px;
      padding: 0 20px;
      .more:hover {
        cursor: pointer;
        color: #b4a078;
      }
    }
    .order-wrap {
      background: #fff;
      .list {
        .item {
          padding: 24px;
          border-top: 1px solid #ddd;
          position: relative;
          div,
          p {
            display: inline-block;
            vertical-align: middle;
          }
          .img {
            width: 120px;
            height: 120px;
            background: #f4f4f4;
            margin-right: 400px;
            img {
              width: 100%;
            }
          }
          p {
            line-height: 120px;
            font-size: 16px;
            margin-left: 50px;
          }
          .name {
            color: #999;
            margin: 0;
          }
          .state {
            color: #f44;
          }
          .operation {
            position: absolute;
            top:50%;
            right:50px;
            margin-top:-46px;
            p {
              display: block;
              line-height: 30px;
              margin: 0;
              color: #6699cc;
              font-size: 14px;
              text-align: center;
            }
            p:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
        .item:first-child {
          border: none;
        }
      }
    }
  }
}
</style>