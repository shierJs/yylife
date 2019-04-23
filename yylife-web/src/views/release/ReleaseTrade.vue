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
                  <Radio label="1">新房</Radio>
                  <Radio label="2">二手房</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="发布标题" prop="title">
                <i-input v-model="formValidate.title" placeholder="请输入发布标题"></i-input>
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
              <FormItem label="房屋面积" prop="area">
                <i-input v-model="formValidate.area">
                  <span slot="prepend">共</span>
                  <span slot="append">平米</span>
                </i-input>
              </FormItem>
              <FormItem label="房屋户型" prop="houseType">
                <Select v-model="formValidate.houseType" placeholder="请选择户型" style="width:auto">
                  <Option :value="1">1室</Option>
                  <Option :value="2">2室</Option>
                  <Option :value="3">3室</Option>
                  <Option :value="4">4室</Option>
                  <Option :value="5">5室及以上</Option>
                </Select>
              </FormItem>
              <FormItem label="朝向" prop="towards">
                <Select v-model="formValidate.towards" placeholder="请选择朝向" style="width:auto">
                  <Option value="东">东</Option>
                  <Option value="南">南</Option>
                  <Option value="西">西</Option>
                  <Option value="北">北</Option>
                </Select>
              </FormItem>
              <FormItem label="房屋性质" prop="floorType">
                <Select v-model="formValidate.floorType" placeholder="请选择房屋性质" style="width:auto">
                  <Option :value="1">普通住宅楼</Option>
                  <Option :value="2">公寓楼</Option>
                  <Option :value="3">写字楼楼</Option>
                  <Option :value="4">商铺</Option>
                  <Option :value="5">回迁房</Option>
                </Select>
              </FormItem>
              <FormItem label="装修情况" prop="decorationType">
                <Select
                  v-model="formValidate.decorationType"
                  placeholder="请选择装修类型"
                  style="width:auto"
                >
                  <Option :value="1">精装</Option>
                  <Option :value="2">简装</Option>
                  <Option :value="3">豪华</Option>
                  <Option :value="4">毛坯房</Option>
                </Select>
              </FormItem>
              <FormItem label="楼层" prop="floor">
                <i-input v-model="formValidate.floor">
                  <span slot="append">层</span>
                </i-input>
                <i-input v-model="formValidate.allFloor">
                  <span slot="prepend">共</span>
                  <span slot="append">几层</span>
                </i-input>
              </FormItem>
              <FormItem label="价格" prop="price">
                <i-input v-model="formValidate.price">
                  <span slot="append">万元</span>
                </i-input>
              </FormItem>
              <FormItem label="首付" prop="down">
                <i-input v-model="formValidate.down">
                  <span slot="append">万元</span>
                </i-input>
              </FormItem>
              <FormItem label="产权" prop="property_right">
                <i-input v-model="formValidate.property_right">
                  <span slot="append">年</span>
                </i-input>
              </FormItem>
              <FormItem label="房屋详情" prop="desc">
                <Editor @get="get" :data="formValidate.desc"></Editor>
              </FormItem>
              <FormItem label="上传图片" prop="img">
                <Upload
                  @send="send"
                  :upload="upload"
                  :imgArr="formValidate.imgList"
                ></Upload>
              </FormItem>
              <FormItem label="联系人" prop="contact">
                <i-input v-model="formValidate.contact" placeholder="请输入联系人姓名"></i-input>
              </FormItem>
              <FormItem label="联系方式" prop="phoneNumber">
                <i-input v-model="formValidate.phoneNumber" placeholder="请输入联系人号码"></i-input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">发布</Button>
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
        regional: "", //房屋所在区域
        towards: "", //朝向
        floor: "", //楼层
        allFloor: "", //共几楼
        price: "", //房价
        decorationType: "", //装修
        contact: "", //联系人
        phoneNumber: "", //联系人号码
        floorType: "", //楼型
        imgList: []
      },
      ruleValidate: {
        type: [
          { required: true, message: "请选择房屋类型", trigger: "change" }
        ],
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
        floor: [
          {
            required: true,
            message: "楼层不能为空",
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
      area: "",
      p_area: "",
      areaList: [],
      p_areaList: [],
      showArea: true,
      Pid: "",
      houseId: 0
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        let datas = this.formValidate;
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (myreg.test(datas.phoneNumber)) {
          let data = {
            house_title: datas.title,
            intro: datas.desc,
            type: datas.type,
            house_type: datas.houseType,
            floor_type: datas.floorType,
            decoration_type: datas.decorationType,
            down_payment: datas.down,
            orientation: datas.towards,
            acreage: datas.area,
            property_right: datas.property_right,
            address: datas.address,
            area: datas.areaId,
            house_area: datas.name,
            price: datas.price,
            mobile: datas.phoneNumber,
            floor_in: datas.floor,
            floor_sum: datas.allFloor,
            username: datas.contact,
            img: datas.imgList
          };
          if (this.houseId == 0) {
            setInfoApi
              .addHouseTrade(data)
              .then(res => {
                if (res.data.code === 200) {
                  this.$Message.success(res.data.msg);
                  this.$router.push(
                    `/release/releasePay/2/${res.data.data.house_id}`
                  );
                } else if (res.data.code === 10003) {
                  this.defined.removeToken();
                  this.$Message.error("身份验证已过期，请重新登录");
                  this.$router.push("/");
                } else {
                  this.$Message.info(res.data.msg);
                }
              })
              .catch(err => console.log(err));
          } else {
            data = Object.assign(data, { house_id: this.houseId });
            setInfoApi
              .editHouseTrade(data)
              .then(res => {
                if (res.data.code === 200) {
                  this.$Message.success(res.data.msg);
                  this.$router.push(`/release/releasePay/2/${this.houseId}`);
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
        } else {
          this.$Message.error("请输入正确的手机号");
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
    changePay(v) {
      this.formValidate.payType = v;
    },
    upload(file, data, list) {
      let reader = new FileReader(); //html5读文件
      reader.readAsDataURL(file);
      reader.onload = e => {
        data.file = e.currentTarget.result;
        setInfoApi
          .uploadTradeImg(data)
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
        house_id: i
      };
      getInfoApi
        .getMyFindHouseTrade(params)
        .then(res => {
          if (res.data.code === 200) {
            let data = res.data.data;
            this.formValidate = {
              title: data.house_title,
              desc: data.intro,
              type: data.type.toString(),
              houseType: data.house_type,
              floorType: data.floor_type,
              decorationType: data.decoration_type,
              down: parseInt(data.down_payment),
              towards: data.orientation,
              area: data.acreage,
              property_right: data.property_right,
              address: data.address,
              areaId: data.area,
              name: data.house_area,
              price: parseInt(data.price),
              phoneNumber: data.mobile,
              floor: data.floor_in,
              allFloor: data.floor_sum,
              contact: data.username,
              imgList: data.house_trade_img,
              house_id: data.house_id
            };
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
            console.log(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.Breadcrumb = JSON.parse(sessionStorage.getItem("releasebread"));
    this.getArea(0);
    let index = this.$route.params.id;
    if (index != 0) {
      this.getData(index);
      this.houseId = index;
    }
  },
  mounted() {},
  components: {
    Head,
    Breadcrumb,
    Editor,
    Upload,
    Foot
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