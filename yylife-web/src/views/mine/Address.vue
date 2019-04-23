<template>
  <div>
    <div class="wrapper">
      <div class="address-list" v-if="cmdTf">
        <div class="head-wrap clearfix">
          <p class="info fl">已保存的收货地址(地址最多5条，已使用{{addressList.length}}条)</p>
          <span class="add fr" @click="add">+新增地址</span>
        </div>
        <Table :columns1="col" :data="addressList" @del="del" @detail="detail" :loading="loading"></Table>
        <Modal v-model="modal1" title="您确认删除这条地址吗" @on-ok="ok">
          <p>请您慎重考虑一下哦</p>
        </Modal>
      </div>
      <div class="none" v-else>
        <div class="none-icon"></div>
        <p>还没没有添加地址呢</p>
      </div>
      <div class="modal" v-show="modal2" @click="modal2=false">
        <div class="edit" @click.stop>
          <div class="head">
            <p class="title">{{title}}</p>
            <i class="iconfont icon-guanbi" @click="reset"></i>
          </div>
          <div class="forms">
            <div class="item">
              <span class="label">所在地区</span>
              <div class="sel-box">
                <Select
                  v-model="province"
                  style="width:150px"
                  @on-change="changeProvince"
                  label-in-value
                  :placeholder="province"
                >
                  <Option
                    v-for="(item,index) in provinceList"
                    :value="item.id"
                    :key="index"
                  >{{ item.areaName }}</Option>
                </Select>
                <!-- 省 -->
                <Select
                  v-model="city"
                  style="width:150px"
                  not-found-text="请先选择省份"
                  @on-change="changeCity"
                  label-in-value
                  :placeholder="city"
                >
                  <Option
                    v-for="(item,index) in cityList"
                    :value="item.id"
                    :key="index"
                  >{{ item.areaName }}</Option>
                </Select>
                <!-- 市 -->
                <Select
                  v-model="district"
                  style="width:150px"
                  not-found-text="请先选择城市"
                  @on-change="changeDistrict"
                  label-in-value
                  :placeholder="district"
                >
                  <Option
                    v-for="(item,index) in districtList"
                    :value="item.id"
                    :key="index"
                  >{{ item.areaName }}</Option>
                </Select>
                <!-- 区 -->
              </div>
            </div>
            <div class="item">
              <span class="label">详细地址</span>
              <i-input
                v-model="addressData.address"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入您的详细地址"
                style="width:456px"
              ></i-input>
            </div>
            <div class="item clearfix">
              <i-input v-model="addressData.consignee" style="width:200px;float:left;height:32px;">
                <span slot="prepend">收货人&emsp;</span>
              </i-input>
              <i-input
                v-model="addressData.mobile"
                style="width:200px;float:left;margin-left:200px;height:32px;"
              >
                <span slot="prepend">手机号码</span>
              </i-input>
            </div>
            <div class="item">
              <Checkbox v-model="defaultBool" style="font-size:16px;display;inline-block">设为默认</Checkbox>
              <div class="btn">
                <p class="submit" @click="comfirm">确认</p>
                <p class="reset" @click="reset">取消</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
export default {
  data() {
    return {
      cmdTf: true,
      index: "",
      modal1: false,
      modal2: false,
      defaultBool: false,
      addEdit: false,
      loading: true,
      editi: -1,
      pi: 0,
      ci: 0,
      di: 0,
      title: "添加地址",
      col: [
        {
          title: " ",
          key: "default",
          align: "center"
        },
        {
          title: "收货人",
          key: "receipt",
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          align: "center"
        },
        {
          title: "联系方式",
          key: "phone",
          align: "center"
        }
      ],
      addressList: [],
      addressInfo: [],
      addressData: {
        details: "",
        consignee: "",
        mobile: "",
        province: "",
        city: "",
        district: "",
        address: "",
        is_default: 1
      },
      province: "请选择",
      provinceList: [],
      city: "请选择",
      cityList: [],
      district: "请选择",
      districtList: []
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
    del(index) {
      this.modal1 = true;
      this.index = index;
    },
    detail(index) {
      let params = {
        address_id: this.addressInfo[index].address_id
      };
      this.$Spin.show();
      getInfoApi
        .getAddressDetail(params)
        .then(res => {
          if (res.data.code === 200) {
            let list = res.data.data.details.split("-");
            this.province = list[0];
            this.city = list[1];
            this.district = list[2];
            this.addressData = res.data.data;
            if (this.addressData.is_default === 1) {
              this.defaultBool = true;
            } else {
              this.defaultBool = false;
            }
            this.$Spin.hide();
            this.getArea();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    add() {
      this.getArea();
    },
    getArea() {
      let params = {
        parentId: 0
      };
      getInfoApi
        .getArea(params)
        .then(res => {
          if (res.data.code === 200) {
            this.provinceList = res.data.data;
            this.modal2 = true;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    ok() {
      let i = this.index;
      let data = {
        address_id: this.addressInfo[i].address_id
      };
      setInfoApi
        .delAddress(data)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.$Message.success(res.data.data);
            this.getAddress();
          } else if (res.data.code === 10003) {
            this.defined.removeToken();
            this.$Message.error("身份验证已过期，请重新登录");
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    comfirm() {
      if (this.province == "" || this.city == "" || this.district == "") {
        this.$Message.error("请选择收货地址");
      } else if (this.addressData.address == "") {
        this.$Message.error("请输入详细的收货地址");
      } else if (
        this.addressData.consignee == "" ||
        this.addressData.mobile == ""
      ) {
        this.$Message.error("请填写收货人信息");
      } else if (this.addressData.address_id) {
        if (this.defaultBool) {
          this.addressData.is_default = 1;
        } else {
          this.addressData.is_default = 0;
        }
        setInfoApi
          .editAddress(this.addressData)
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.data);
              this.reset();
              this.getAddress();
            } else if (res.data.code === 10003) {
              this.defined.removeToken();
              this.$Message.error("身份验证已过期，请重新登录");
              this.$router.push("/");
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push('/notFound');
          });
      } else {
        if (this.defaultBool) {
          this.addressData.is_default = 1;
        } else {
          this.addressData.is_default = 0;
        }
        setInfoApi
          .addAddress(this.addressData)
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.data);
              this.getAddress();
            } else if (res.data.code === 10003) {
              this.defined.removeToken();
              this.$Message.error("身份验证已过期，请重新登录");
              this.$router.push("/");
            } else {
              this.$Message.info(res.data.msg);
            }
            this.reset();
          })
          .catch(err => {
            this.$router.push('/notFound');
          });
      }
    },
    reset() {
      this.addressData = {
        details: "",
        consignee: "",
        mobile: "",
        province: "",
        city: "",
        district: "",
        address: "",
        is_default: 1
      };
      this.province = "";
      this.city = "";
      this.district = "";
      this.modal2 = false;
    },
    getAddress() {
      this.$Spin.show();
      getInfoApi
        .getAddress()
        .then(res => {
          if (res.data.code === 200) {
            let data = res.data.data;
            this.addressInfo = data;
            if (data.length) {
              let addressList = [];
              for (let i = 0; i < data.length; i++) {
                addressList[i] = {
                  default: "",
                  receipt: data[i].consignee,
                  address: data[i].details + data[i].address,
                  phone: data[i].mobile
                };
                if (data[i].is_default) {
                  addressList[i].default = "默认地址";
                }
              }
              this.addressList = addressList;
              this.loading = false;
            } else {
              this.cmdTf = false;
            }
            this.$Spin.hide();
          } else if (res.data.code === 10003) {
            this.$Spin.hide();
            this.defined.removeToken();
            this.$Message.error("身份验证已过期，请重新登录");
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    changeProvince(v) {
      if (!v) {
        return;
      } else {
        this.addressData.details = v.label;
        this.addressData.province = v.value;
        let params = {
          parentId: v.value
        };
        getInfoApi
          .getArea(params)
          .then(res => {
            if (res.data.code === 200) {
              this.cityList = res.data.data;
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push('/notFound');
          });
      }
    },
    changeCity(v) {
      if (!v) {
        return;
      } else {
        this.addressData.details = this.addressData.details + "-" + v.label;
        this.addressData.city = v.value;
        let params = {
          parentId: v.value
        };
        getInfoApi
          .getArea(params)
          .then(res => {
            if (res.data.code === 200) {
              this.districtList = res.data.data;
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => {
            this.$router.push('/notFound');
          });
      }
    },
    changeDistrict(v) {
      if (!v) {
        return;
      } else {
        this.addressData.details = this.addressData.details + "-" + v.label;
        this.addressData.district = v.value;
      }
    },
  },
  components: {
    Table
  }
};
</script>

<style scoped lang="less">
.wrapper {
  background: #fff;
  border: 1px solid #ddd;
  height: 100%;
  .head-wrap {
    padding: 10px;
    font-size: 14px;
    line-height: 24px;
  }
  .add {
    color: rgb(102, 153, 204);
  }
  .add:hover {
    cursor: pointer;
    color: #b4a078;
  }
  .none {
    .none-icon {
      width: 368px;
      height: 368px;
      background: url("../../../static/img/material/sprite.png") no-repeat 0 -1472px;
      margin: 0 auto;
      transform: scale(0.5);
      margin-top: -18px;
    }
    p {
      font-size: 16px;
      text-align: center;
      margin-top: -70px;
      color: #999;
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 130;
    .edit {
      background: #fff;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 30px 20px;
      .head {
        .title {
          font-size: 16px;
          line-height: 30px;
        }
        .iconfont {
          position: absolute;
          font-size: 30px;
          top: 0;
          right: 10px;
          cursor: pointer;
        }
      }
      .item {
        margin-top: 20px;
        .label {
          font-size: 14px;
          margin-right: 10px;
        }
        .sel-box {
          display: inline-block;
        }
        .btn {
          display: inline-block;
          p {
            display: inline-block;
            width: 120px;
            height: 40px;
            background: #b4a078;
            font-size: 16px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            border-radius: 4px;
          }
          p:hover {
            cursor: pointer;
          }
          p:last-child {
            background: rgba(255, 255, 255, 0.6);
            color: #b4a078;
            border: 1px solid #b4a078;
            margin-left: 25px;
          }
        }
      }
      .item:last-child {
        padding: 0 120px;
        .btn {
          margin-left: 81px;
        }
      }
    }
  }
}
</style>