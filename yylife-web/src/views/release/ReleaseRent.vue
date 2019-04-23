<template>
  <div>
    <Head :showRelease="false" :i="-1"></Head>
    <div id="main">
      <div class="wrap">
        <Breadcrumb :data="Breadcrumb"></Breadcrumb>
        <!-- 面包屑 -->
        <!-- 主体 -->
        <div class="wrapper">
          <div class="head">
            <p class="class" @click="$router.push('/release')">1.重新选择发布类别</p>
            <p class="info">2.填写信息</p>
            <p class="comfirm">3.完成发布</p>
          </div>
          <!-- 表单 -->
          <div class="form">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="房屋类型" prop="type">
                <RadioGroup v-model="formValidate.type">
                  <Radio :label="1">整租房</Radio>
                  <Radio :label="2">合租房</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="小区名称" prop="name">
                <i-input v-model="formValidate.name" placeholder="请输入小区名称"></i-input>
                <Select
                  v-model="p_area"
                  placeholder="请选择区域"
                  style="width:auto"
                  @on-change="changeParea"
                >
                  <Option :value="item.id" v-for="item in p_areaList" :key="item.id">{{item.name}}</Option>
                </Select>
                <Select
                  v-model="area"
                  placeholder="请选择子区域"
                  style="width:auto"
                  @on-change="changeArea"
                  not-found-text="请先选择区域"
                  v-show="showArea"
                >
                  <Option :value="item.id" v-for="item in areaList" :key="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="详细地址" prop="address">
                <i-input v-model="formValidate.address" placeholder="请输入详细地址"></i-input>
              </FormItem>
              <FormItem label="房屋类型" prop="huoseClass">
                <i-input v-model="formValidate.area">
                  <span slot="prepend">共</span>
                  <span slot="append">平米</span>
                </i-input>
              </FormItem>
              <FormItem label="楼层" prop="floor">
                <Select v-model="formValidate.floor" placeholder="请选择楼层" style="width:auto">
                  <Option :value="1">低层</Option>
                  <Option :value="2">中层</Option>
                  <Option :value="3">高层</Option>
                </Select>
                <i-input v-model="formValidate.allFloor">
                  <span slot="prepend">共</span>
                  <span slot="append">几层</span>
                </i-input>
              </FormItem>
              <FormItem label="付款方式">
                <Select v-model="formValidate.payType" placeholder="请输入付款类型" style="width:auto">
                  <Option :value="1">押一付一</Option>
                  <Option :value="2">押一付二</Option>
                  <Option :value="3">押一付三</Option>
                  <Option :value="4">半年付</Option>
                  <Option :value="5">一年付</Option>
                </Select>
              </FormItem>
              <FormItem label="租金" prop="rental">
                <i-input v-model="formValidate.rental">
                  <span slot="append">元/每月</span>
                </i-input>
              </FormItem>
              <FormItem label="房屋配置" prop="config">
                <CheckboxGroup v-model="formValidate.config">
                  <Checkbox :label="item.id" v-for="item in configList" :key="item.id">{{item.name}}</Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="标题" prop="title">
                <i-input v-model="formValidate.title"></i-input>
              </FormItem>
              <FormItem label="房屋详情" prop="desc">
                <Editor @get="get" :data="formValidate.desc"></Editor>
              </FormItem>
              <FormItem label="上传图片">
                <Upload @send="send" :upload="upload" :imgArr="formValidate.imgList"></Upload>
              </FormItem>
              <FormItem label="联系人" prop="contact">
                <i-input v-model="formValidate.contact" placeholder="请输入联系人姓名"></i-input>
              </FormItem>
              <FormItem label="联系方式" prop="phoneNumber">
                <i-input v-model="formValidate.phoneNumber" placeholder="请输入联系人号码"></i-input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
              </FormItem>
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
import Editor from "@/components/Editor";
import Upload from "@/components/Upload";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { mapActions, mapState } from "vuex";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      Breadcrumb: {},
      formValidate: {
        type: "", //房屋类型
        name: "", //小区名称
        desc: "", //房屋详情
        area: "", //面积
        floor: "", //楼层
        allFloor: "", //共几楼
        rental: "", //租金 单位元/每月
        payType: "", //支付方式
        config: [],
        contact: "", //联系人
        phoneNumber: "", //联系人号码
        identity: "", //发布者身份
        imgList: [], //图片
        areaId: "", //区域
        title: "", //标题
        address: "" //详细地址
      },
      ruleValidate: {
        identity: [
          { required: true, message: "请选择发布身份", trigger: "change" }
        ],
        name: [
          {
            required: true,
            message: "小区名称不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "详细地址不能为空",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "房屋详情不能为空",
            trigger: "blur"
          }
        ],
        houseClass: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        area: [
          {
            required: true,
            message: "面积不能为空",
            trigger: "blur"
          }
        ],
        rentCate: [
          {
            required: true,
            message: "请选择租房分类",
            trigger: "change"
          }
        ],
        towards: [
          {
            required: true,
            message: "请选择朝向",
            trigger: "change"
          }
        ],
        contact: [
          {
            required: true,
            message: "联系人不能为空",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: "联系人号码不能为空",
            trigger: "blur"
          }
        ],
        rental: [
          {
            required: true,
            message: "租金不能为空",
            trigger: "blur"
          }
        ],
        payType: [
          {
            required: true,
            message: "请选择付款方式",
            trigger: "change"
          }
        ],
        config: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "请选择房屋配置",
            trigger: "change"
          },
          {
            type: "array",
            max: 10,
            message: "请选择最好的房屋配置",
            trigger: "change"
          }
        ]
      },
      configList: [],
      area: "",
      p_area: "",
      areaList: [],
      p_areaList: [],
      showArea: true,
      Pid: "",
      rentId: 0
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
          if (!this.formValidate.areaId) {
            this.$Message.error("请选择区域");
          } else if (!this.formValidate.desc) {
            this.$Message.error("请输入详情");
          } else if (!this.formValidate.imgList.length) {
            this.$Message.error("请添加图片");
          } else {
            let data = {
              house_title: this.formValidate.title,
              type: this.formValidate.type,
              payment_type: this.formValidate.payType,
              house_area: this.formValidate.name,
              acreage: this.formValidate.area,
              price: this.formValidate.rental,
              mobile: this.formValidate.phoneNumber,
              floor_in: this.formValidate.floor,
              floor_sum: this.formValidate.allFloor,
              intro: this.formValidate.desc,
              username: this.formValidate.contact,
              img: this.formValidate.imgList,
              config: this.formValidate.config,
              area: this.formValidate.areaId,
              address: this.formValidate.address
            };
            if (this.rentId == 0) {
              setInfoApi
                .addRent(data)
                .then(res => {
                  ;
                  if (res.data.code === 200) {
                    this.$Message.success(res.data.msg);
                    this.$router.push(`/release/releasePay/1/${res.data.data.house_id}`);
                  } else if (res.data.code === 10003) {
                    this.defined.removeToken();
                    this.$Message.error("身份验证已过期，请重新登录");
                    this.$router.push("/");
                  } else {
                    this.$Message.info(res.data.msg);
                  }
                })
                .catch(err => {
                  this.$router.push("/notFound");
                });
            } else {
              data = Object.assign(data, { house_id: this.rentId });
              setInfoApi
                .editHouseRent(data)
                .then(res => {
                  if (res.data.code === 200) {
                    this.$Message.success(res.data.msg);
                    this.$router.push(`/release/releasePay/1/${this.rentId}`);
                  } else if (res.data.code === 10003) {
                    this.defined.removeToken();
                    this.$Message.error("身份验证已过期，请重新登录");
                    this.$router.push("/");
                  } else {
                    this.$Message.info(res.data.msg);
                  }
                })
                .catch(err => console.log(err));
            }
          }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    get(data) {
      this.formValidate.desc = data;
    },
    send(v) {
      this.formValidate.imgList = v;
    },
    changeParea(v) {
      this.Pid = v;
      this.getArea(v);
    },
    changeArea(v) {
      this.formValidate.areaId = this.Pid + "," + v;
    },
    upload(file, data, list) {
      let reader = new FileReader(); //html5读文件
      reader.readAsDataURL(file);
      reader.onload = e => {
        data.file = e.currentTarget.result;
        setInfoApi
          .uploadRentImg(data)
          .then(res => {
            if (res.data.code == 200) {
              list.push(res.data.src);
              this.$Message.success(res.data.msg);
              this.sendSrc();
            } else if (res.data.code === 10003) {
              this.$Message.info("身份验证已过期,请重新登录");
              this.defined.removeToken();
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => {
            return false;
          });
      };
    },
    getConfig() {
      getInfoApi
        .getRentConfig()
        .then(res => {
          if (res.data.code === 200) {
            this.configList = res.data.data;
          }
        })
        .catch(err => this.$router.push("/notFound"));
    },
    getArea(i) {
      let params = {
        pid: i
      };
      getInfoApi
        .getAreaT(params)
        .then(res => {
          if (res.data.code === 200) {
            if (i == 0) {
              this.p_areaList = res.data.data;
            } else {
              this.areaList = res.data.data;
              if (!this.areaList.length) {
                this.showArea = false;
                this.formValidate.areaId = i;
              } else {
                this.showArea = true;
              }
            }
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    getData(i) {
      let params = {
        house_id: parseInt(i)
      };
      getInfoApi
        .getMyFindRent(params)
        .then(res => {
          if (res.data.code === 200) {
            let data = res.data.data;
            this.formValidate = {
              type: data.type,
              name: data.house_area,
              title: data.house_title,
              payType: data.payment_type,
              area: data.acreage,
              rental: data.price,
              phoneNumber: data.mobile,
              floor: data.floor_in,
              allFloor: data.floor_sum,
              desc: data.intro,
              contact: data.username,
              address: data.address,
              imgList: data.house_rent_img,
              towards: data.orientation,
              house_id: data.house_id,
              areaId: data.area,
              config: []
            };
            let arr = data.house_config;
            for (let i = 0; i < arr.length; i++) {
              this.formValidate.config.push(arr[i].id);
            }
            if (data.area == "23") {
              this.area = 23;
              this.showArea = false;
            } else {
              let arr = data.area.split(",");
              this.showArea = true;
              this.p_area = parseInt(arr[0]);
              this.getArea(this.p_area);
              this.area = parseInt(arr[1]);
            }
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.Breadcrumb = JSON.parse(sessionStorage.getItem("releasebread"));
    this.getConfig();
    this.getArea(0);
    let index = this.$route.params.id;
    if (index != 0) {
      this.getData(index);
      this.rentId = index;
    }
  },
  components: {
    Head,
    Breadcrumb,
    Editor,
    Upload,
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
      p:nth-child(2) {
        border-color: #b4a078;
        color: #b4a078;
      }
    }
    .wrapper {
      background: #fff;
      padding: 20px 20px;
    }
  }
}
</style>