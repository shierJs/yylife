<template>
  <div>
    <Head title="购物车"></Head>
    <transition name="fade">
      <div class="main" v-if="show">
        <div class="card" v-for="(item,index) in list" :key="index">
          <div class="chk" @click="checkState(index)">
            <van-checkbox v-model="item.checked"></van-checkbox>
          </div>
          <van-card
            :title="item.goods_name"
            :desc="item.spec_key_name"
            :num="item.goods_num"
            :price="item.goods_price"
            :thumb="item.goods_img"
          >
            <div slot="footer">
              <div class="action">
                <van-stepper
                  v-model="item.goods_num"
                  @change="changeNum(item.id,item.goods_num,index)"
                />
                <van-icon name="delete" @click="del(index)"/>
              </div>
            </div>
          </van-card>
        </div>
        <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
          <div @click="allCheckedState">
            <van-checkbox v-model="allChecked">全选</van-checkbox>
          </div>
          <span style="font-size:14px; margin-left:10px;">批量删除</span>
        </van-submit-bar>
      </div>
      <div class="main" v-else>
        <div class="bg">
          <img src="/static/img/bgcart.png" alt>
          <p>去添加点什么吧</p>
          <p class="btn" @click="login">去购物</p>
        </div>
      </div>
    </transition>
    <Foot :idx="1"></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head";
import currency from "@/filters/currency";
import { mapState, mapMutations } from "vuex";
import Foot from "@/components/Foot";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast, Icon, Checkbox, CheckboxGroup } from "vant";
export default {
  data() {
    return {
      show: false,
      total: 0,
      list: [],
      allChecked: true,
      total1: 0,
      selIds: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getInfoApi.getCartList().then(res => {
        if (res.data.code === 200) {
          if (res.data.data.length) {
            this.list = res.data.data;
            this.list.forEach(el => {
              if (el.selected == 1) {
                el.checked = true;
              } else {
                el.checked = false;
              }
            });
            this.show = true;
            this.calcItem();
          }
        } else if (res.data.code === 10003) {
          Toast("身份验证已过期,请重新登录");
          this.defined.removeToken();
          this.$router.push("/login");
        } else {
          Toast(res.data.msg);
        }
      });
    },
    changeNum(id, n, i) {
      let data = {
        id: id,
        number: n
      };
      setInfoApi
        .updateCartNum(data)
        .then(res => {
          if (res.data.code === 200) {
            this.calcItem();
          } else if (res.data.code === 10007) {
            this.list[i].goods_num = res.data.store_count;
            this.calcItem();
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/log/1");
          } else {
            this.list[i].goods_num = 1;
            this.calcItem();
          }
        })
        .catch(err => console.log(err));
    },
    login() {
      if (this.defined.access_token) {
        this.$router.push("/mallIndex");
      } else {
        this.$router.push("/login");
      }
    },
    onSubmit() {
      this.$router.push("mallPayOrder/0");
    },
    del(index) {
      let data = {
        id: this.list[index].id
      };
      setInfoApi.deleteCart(data).then(res => {
        if (res.data.code === 200) {
          this.list.splice(index, 1);
          this.calcItem();
          Toast(res.data.msg);
          if (this.list.length == 0) {
            this.show = false;
          }
        } else if (res.data.code === 10003) {
          this.defined.removeToken();
          this.$router.push("/login");
        } else {
          Toast(res.data.msg);
        }
      });
    },
    checkState(index) {
      let id = this.list[index].id;
      let i = 1;
      if (this.list[index].checked) {
        this.list[index].selected = 1;
        i = 1;
        this.updateChk(id, i);
      } else {
        this.list[index].selected = 0;
        i = 0;
        this.updateChk(id, i);
      }
      this.calcItem();
      this.isAllchecked();
    },
    updateChk(id, i) {
      if (this.selIds.length) {
        let data = {
          ids: this.selIds,
          selected: i
        };
        setInfoApi
          .updateSelectCart(data)
          .then(res => {})
          .catch(err => console.log(err));
      } else {
        let data = {
          id: id,
          selected: i
        };
        setInfoApi
          .updateSelectCart(data)
          .then(res => {})
          .catch(err => console.log(err));
      }
    },
    allCheckedState() {
      let i = 1;
      this.selIds = [];
      if (this.allChecked) {
        this.list.forEach(item => {
          item.checked = true;
          this.selIds.push(item.id);
        });
        i = 1;
        this.updateChk(0, i);
      } else {
        this.list.forEach(item => {
          item.checked = false;
          this.selIds.push(item.id);
        });
        i = 0;
        this.updateChk(0, i);
      }
      this.calcItem();
    },
    calcItem() {
      //每一次计算时候，过滤掉 属性为false
      /*
				 filter
				 * */
      this.total = 0;
      let subArr = this.list.filter((item, index) => {
        return item.checked == true;
      });
      subArr.forEach(item => {
        this.total += parseInt(item.goods_price) * parseInt(item.goods_num);
      });
      this.total = this.total * 100;
    },
    isAllchecked() {
      this.allChecked = this.list.every(item => {
        return item.checked == true;
      });
    }
  },
  components: {
    Head,
    Foot,
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  }
};
</script>

<style scoped lang="less">
.main {
  padding-top: 90px;
  background: #f6f6f6;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding-bottom: 100px;
  .bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    .btn {
      width: 480px;
      height: 92px;
      background: #f44;
      color: #fff;
      text-align: center;
      line-height: 92px;
      font-size: 32px;
      border-radius: 10px;
      margin-top: 40px;
    }
    img {
      height: 248px;
      width: 248px;
      margin: 0 auto;
    }
    p {
      font-size: 30px;
      color: #7f7f7f;
      text-align: center;
    }
  }
  div.card {
    background: #fff;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    padding: 0 40px;
    position: relative;
    margin-top: 20px;
    .action {
      display: flex;
      align-items: center;
      .van-stepper {
        margin-right: 40px;
      }
    }
    .chk {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 500;
    }
  }
}
</style>