<template>
  <div>
    <Head :title="title"></Head>
    <div id="main">
      <div class="search">
        <el-input placeholder="请输入快递单号" v-model="number" class="input-with-select" type="Number">
          <el-select v-model="courier" slot="prepend" placeholder="请选择...">
            <el-option
              v-for="item in expressData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div class="wraps" v-if="show">
        <div class="top">
          <p class="way-bill">运单编号:{{data.LogisticCode}}</p>
          <span class="num">快递名称:{{data.name}}</span>
        </div>
        <div class="steps">
          <van-steps direction="vertical" :active="0" active-color="#2EBAB9">
            <van-step v-for="(item,index) in data.Traces" :key="index">
              <h3>{{item.AcceptStation}}</h3>
              <p>{{item.AcceptTime}}</p>
            </van-step>
          </van-steps>
        </div>
      </div>
      <div class="none" v-else>
        <i class="iconfont icon-jidiwuliuchaxun"></i>
        <p class="text">请选择物流公司并输入快递单号查询物流状态</p>
      </div>
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
      title: "快递查询",
      number: "",
      courier: "",
      expressData: [
        {
          value: "申通快递",
          label: "申通快递"
        },
        {
          value: "百世快递",
          label: "百世快递"
        },
        {
          value: "天天快递",
          label: "天天快递"
        },
        {
          value: "圆通快递",
          label: "圆通快递"
        },
        {
          value: "韵达快递",
          label: "韵达快递"
        }
      ],
      data: [],
      show: false
    };
  },
  methods: {
    search() {
      if (this.courier == "") {
        Toast("请先选择物流公司");
      } else if (this.number == "") {
        Toast("请输入快递单号");
      } else {
        let data = {
          id: this.courier,
          shipping_code: this.number
        };
        setInfoApi
          .getExpress(data)
          .then(res => {
            if (res.data.Traces.length) {
              this.data = res.data;
              this.data.Traces.reverse();
              this.show = true;
            } else {
              Toast(res.data.Reason);
              this.show = false;
            }
          })
          .catch(err => console.log(err));
      }
    },
    getCom() {
      getInfoApi
        .getExpressCompany()
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.expressData = res.data.data;
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/log/1");
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getCom();
  },
  components: {
    Head
  }
};
</script> 

<style lang="less" scoped>
#main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f4f4f4;
  padding: 120px 20px 40px;
  .wraps {
    background: #fff;
    margin-top: 40px;
    .top {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      padding: 0 30px;
      height: 116px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .way-bill {
        color: #666;
        font-size: 26px;
      }
      .num {
        font-size: 22px;
        color: #999;
      }
    }
    .steps {
      margin: 0 auto;
      margin-top: 20px;
      width: 90%;
      background: #fff;
    }
  }
  .none {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
    margin-top: 300px;
    .iconfont {
      font-size: 200px;
      color: #aaa;
    }
    p {
      text-align: center;
      font-size: 32px;
      color: #aaa;
    }
  }
}
</style>