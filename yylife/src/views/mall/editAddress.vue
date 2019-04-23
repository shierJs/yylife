<template>
  <div>
    <Head :title="title"></Head>
    <div id="main">
      <div class="wrap">
        <div class="arealist van-address-edit">
          <div class="van-cell-group van-hairline--top-bottom">
            <div class="van-cell van-field">
              <div class="van-cell__title">
                <span>姓名</span>
              </div>
              <div class="van-cell__value">
                <div class="van-field__body">
                  <input
                    type="text"
                    placeholder="收货人姓名"
                    class="van-field__control"
                    v-model="address.consignee"
                  >
                </div>
              </div>
            </div>
            <!-- 姓名 -->
            <div class="van-cell van-field">
              <div class="van-cell__title">
                <span>电话</span>
              </div>
              <div class="van-cell__value">
                <div class="van-field__body">
                  <input
                    type="text"
                    placeholder="收货人手机号"
                    class="van-field__control"
                    v-model="address.mobile"
                  >
                </div>
              </div>
            </div>
            <!-- 电话号码 -->
            <div class="van-cell van-field" @touchend.prevent="showAreaList">
              <div class="van-cell__title">
                <span>地区</span>
              </div>
              <div class="van-cell__value">
                <input
                  type="text"
                  readonly="readonly"
                  placeholder="选择省 / 市 / 区"
                  class="van-field__control"
                  v-model="areaData"
                >
              </div>
            </div>
            <!-- 地区 -->
            <div class="van-cell van-field">
              <div class="van-cell__title">
                <span>详细地址</span>
              </div>
              <div class="van-cell__value">
                <div class="van-field__body">
                  <textarea
                    rows="1"
                    maxlength="200"
                    placeholder="街道门牌、楼层房间号等信息"
                    class="van-field__control"
                    v-model="address.address"
                  ></textarea>
                </div>
              </div>
            </div>
            <!-- 详细地址 -->
            <div class="van-cell van-field">
              <div class="van-cell__title">
                <span>邮政编码</span>
              </div>
              <div class="van-cell__value">
                <div class="van-field__body">
                  <input
                    type="tel"
                    maxlength="6"
                    placeholder="邮政编码"
                    class="van-field__control"
                    v-model="address.zipcode"
                  >
                </div>
              </div>
            </div>
            <!-- 邮政编码 -->
            <div class="van-cell van-cell--center van-cell--borderless van-switch-cell">
              <!---->
              <div class="van-cell__title">
                <span>设为默认收货地址</span>
                <!---->
              </div>
              <div class="van-cell__value">
                <van-switch v-model="checkedDft" size="24px"/>
              </div>
              <!---->
            </div>
            <!-- 默认地址 -->
          </div>
          <div class="van-address-edit__buttons">
            <button
              class="van-button van-button--danger van-button--normal van-button--block"
              @click="save"
            >
              <span class="van-button__text">保存</span>
            </button>
            <button
              class="van-button van-button--default van-button--normal van-button--block"
              @click="del"
            >
              <span class="van-button__text">删除</span>
            </button>
          </div>
        </div>
      </div>
      <van-popup v-model="showArea" position="right" style="width:100%;">
        <div class="arealist">
          <header class="head">
            <van-icon name="arrow-left" @click="showArea=false" style="font-size:16px;"/>
            <p class="title">请选择配送区域</p>
          </header>
          <div class="content">
            <div class="header">
              <p class="select">请选择</p>
            </div>
            <ul class="list" v-for="(item,index) in province" :key="index">
              <li @click="showCity(index)">{{item.areaName}}</li>
            </ul>
          </div>
        </div>
      </van-popup>
      <!-- 省级 -->
      <van-popup v-model="city" position="right" style="width:100%;" :overlay="false">
        <div class="arealist">
          <header class="head">
            <van-icon name="arrow-left" @click="city=false" style="font-size:16px;"/>
            <p class="title">请选择配送区域</p>
          </header>
          <div class="content">
            <div class="header">
              <p class="data">{{areaData}}</p>
              <p class="select">请选择</p>
            </div>
            <ul class="list" v-for="(item,index) in citys" :key="index">
              <li @click="showDistrict(index)">{{item.areaName}}</li>
            </ul>
          </div>
        </div>
      </van-popup>
      <!-- 市级 -->
      <van-popup v-model="district" position="right" style="width:100%;" :overlay="false">
        <div class="arealist">
          <header class="head">
            <van-icon name="arrow-left" @click="district=false" style="font-size:16px;"/>
            <p class="title">请选择配送区域</p>
          </header>
          <div class="content">
            <div class="header">
              <p class="data">{{areaData}}</p>
              <p class="select">请选择</p>
            </div>
            <ul class="list" v-for="(item,index) in districts" :key="index">
              <li @click="complete(index)">{{item.areaName}}</li>
            </ul>
          </div>
        </div>
      </van-popup>
      <!-- 区级 -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Icon,Toast,Button } from "vant";
export default {
  data() {
    return {
      title: "编辑地址",
      showArea: false,
      city: false,
      district: false,
      areaData: "",
      checkedDft: true,
      address: {
        consignee: "", //收货人
        mobile: "", //收货人手机号
        province: "", //省id
        city: "", //市id
        district: "", //区id
        address: "", //详细地址
        is_default: 1, //是否设为默认地址
        zipcode: ""
      },
      province: [],
      citys: [],
      districts: [],
      checked: true,
      i: -1
    };
  },
  mounted() {
    this.i = parseInt(this.$route.params.id);
    if (this.i == -1) {
      this.title = "添加收货地址";
    } else {
      let params = {
        address_id: this.i
      };
      getInfoApi
        .getAddressDetail(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.address = res.data.data;
            if(!this.address.is_default){
              this.checkedDft=false;
            }
            this.areaData = res.data.data.details;
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/login");
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    }
  },
  methods: {
    save() {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.address.consignee === "") {
        Toast("请输入收货人姓名");
      } else if (
        this.address.mobile === "" ||
        !myreg.test(this.address.mobile)
      ) {
        Toast("请输入正确的手机号");
      } else if (this.address.province_name === "") {
        Toast("请选择地区");
      } else if (this.address.address === "") {
        Toast("请输入详细地址");
      } else {
        if (this.checkedDft) {
          this.address.is_default = 1;
        } else {
          this.address.is_default = 0;
        }
        if (this.i === -1) {
          this.address.details = this.areaData;
          setInfoApi
            .addAddress(this.address)
            .then(res => {
              if (res.data.code === 200) {
                Toast(res.data.data);
                this.$router.go(-1);
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                Toast(res.data.msg);
              }
            })
            .catch(err => {
              this.$router.push('/notFound');
            });
        } else {
          console.log(this.i);
          setInfoApi
            .editAddress(this.address)
            .then(res => {
              if (res.data.code === 200) {
                Toast(res.data.data);
                this.$router.go(-1);
              } else if (res.data.code === 10003) {
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              } else {
                Toast(res.data.msg);
              }
            })
            .catch(err => {
              this.$router.push('/notFound');
            });
        }
      }
    },
    del() {
      this.$dialog
        .confirm({
          title: "删除地址",
          message: "确认删除这条地址吗？"
        })
        .then(() => {
          // on confirm
          if(this.address.address_id){
            console.log(this.address.address_id);
            let data={
              address_id:this.address.address_id
            }
            setInfoApi.delAddress(data).then(res=>{
              if(res.data.code===200){
                Toast("删除成功");
                this.$router.go(-1);
              }else if(res.data.code===10003){
                Toast("身份验证已过期，请重新登录");
                this.defined.removeToken();
                this.$router.push("/login");
              }else{
                Toast(res.data.msg);
              }
            }).catch(err=>{
              this.$router.push('/notFound');
            })
          }else{
            this.$router.go(-1);
          }
          
        })
        .catch(() => {
          // on cancel
        });
    },
    showAreaList() {
      let params = {
        parentId: 0
      };
      getInfoApi
        .getArea(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.province = res.data.data;
            this.showArea = true;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    showCity(i) {
      let params = {
        parentId: this.province[i].id
      };
      this.areaData = this.province[i].areaName;
      this.address.province = this.province[i].id;
      getInfoApi
        .getArea(params)
        .then(res => {
          if (res.data.code === 200) {
            this.citys = res.data.data;
            this.city = true;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    showDistrict(i) {
      let params = {
        parentId: this.citys[i].id
      };
      this.areaData = this.areaData + "-" + this.citys[i].areaName;
      this.address.city = this.citys[i].id;
      getInfoApi
        .getArea(params)
        .then(res => {
          if (res.data.code === 200) {
            this.districts = res.data.data;
            this.district = true;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    complete(i) {
      this.areaData = this.areaData + "-" + this.districts[i].areaName;
      this.address.district = this.districts[i].id;
      this.showArea = false;
      this.city = false;
      this.district = false;
    }
  },
  computed: {},
  components: {
    Head,
    [Button.name]:Button,
    [Icon.name]:Icon
  }
};
</script>

<style scoped lang="less">
#main {
  position: absolute;
  background: #f4f4f4;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding-top: 90px;
  .wrap {
    background: #fff;
    .arealist .newArea {
      position: absolute;
      top: 180px;
      left: 0;
    }
  }
  .arealist {
    height: 2000px;
    .head {
      height: 90px;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      padding: 0 40px;
      justify-content: space-between;
      font-size: 30px;
      background: #fff;
      z-index: 200;
      border-bottom: 1px solid #999;
      .title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 32px;
      }
    }
    .content {
      padding-top: 90px;
      .header {
        height: 80px;
        padding-left: 40px;
        border-bottom: 1px solid #ccc;
        .select {
          display: inline-block;
          color: #fd0033;
          line-height: 75px;
          font-size: 32px;
          border-bottom: 6px solid #fd0033;
        }
        .data {
          display: inline-block;
          line-height: 75px;
          font-size: 32px;
          margin-right: 10px;
        }
      }
      .list {
        li {
          height: 80px;
          padding-left: 40px;
          line-height: 80px;
          border-bottom: 1px solid #ccc;
          font-size: 32px;
          color: #666;
        }
      }
    }
  }
}
</style>