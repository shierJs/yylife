<template>
  <div>
    <Head :i="-1"></Head>
    <div id="main">
      <div class="content clear">
        <div class="integral">
            <p class="title">可用积分</p>
            <h3 class="num">{{user.points_account}}</h3>
            <div class="operation">
                <p class="item">积分细则</p>
                <p class="guide">积分指南</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        user:{},
    };
  },
  created() {
      this.user=JSON.parse(sessionStorage.getItem("user"));
  },
  methods: {}
};
</script>

<style scoped lang="less">
#main {
  .content {
    background: url("../../../static/img/material/integral.png") no-repeat;
    background-size: 100% 100%;
    border: 1px solid #ddd;
    height: 307px;
    padding: 40px 120px;
    position: relative;
    .integral {
        position: absolute;
        width:360px;
        height:200px;
        top:51px;
        left:79px;
        text-align: center;
        padding:40px 30px;
        color:#b4a078;
        .title{
            font-size:20px;
        }
        .num{
            font-size:30px;
        }
        .operation{
            p{
                display: inline-block;
                border:1px solid #b4a078;
                padding:2px 4px;
                font-size:14px;
            }
            p:first-child{
                margin-right:20px;
            }
            p:hover{
                background: #b4a078;
                color:#fff;
                cursor: pointer;
            }
        }
    }
  }
}
</style>