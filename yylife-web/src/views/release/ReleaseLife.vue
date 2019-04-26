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
              <FormItem label="服务名称" prop="name">
                <i-input v-model="formValidate.name" placeholder="请输入服务名称"></i-input>
              </FormItem>
              <FormItem label="上传图片" prop="img">
                <Upload @send="send" :upload="upload" :imgArr="formValidate.imgList"></Upload>
              </FormItem>
              <FormItem label="广告详情" prop="desc">
                <Editor @get="get" :data="formValidate.desc"></Editor>
              </FormItem>
              <FormItem label="地址详情" prop="address">
                <i-input v-model="formValidate.address" placeholder="请输入详细地址"></i-input>
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
              <FormItem label="服务类型" prop="cate">
                <Select
                  v-model="formValidate.cate"
                  @on-change="changeCate"
                  placeholder="请选择服务类型"
                  style="width:auto"
                >
                  <Option
                    v-for="(item,index) in cateList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="服务标签" prop="label" v-show="labelList.length">
                <CheckboxGroup v-model="formValidate.label">
                  <Checkbox
                    v-for="(item,index) in labelList"
                    :key="index"
                    :label="item.id"
                  >{{item.label_name}}</Checkbox>
                </CheckboxGroup>
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
        cate: "", //服务类型
        name: "", //服务名称
        label: [], //服务标签
        contact: "", //联系人
        phoneNumber: "", //联系人号码
        areaId: "", //地区id
        desc: "", //详情
        address: "", //地址
        imgList: [] //图片
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ],
        contact: [
          {
            required: true,
            message: "请填写联系人名称",
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
        label: [
          {
            type: "array",
            max: 10,
            message: "最多只能选择10个标签",
            trigger: "change"
          }
        ]
      },
      cateList: [],
      area: "",
      p_area: "",
      areaList: [],
      p_areaList: [],
      showArea: true,
      Pid: "",
      labelList: [],
      lifeId: 0
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          let datas = this.formValidate;
          if (myreg.test(datas.phoneNumber)) {
            let data = {
              service_title: datas.name,
              cate_id: datas.cate,
              username: datas.contact,
              mobile: datas.phoneNumber,
              area: datas.areaId,
              address: datas.address,
              intro: datas.desc,
              img: datas.imgList,
              label: datas.label
            };
            if (this.lifeId == 0) {
              setInfoApi
                .addService(data)
                .then(res => {
                  if (res.data.code === 200) {
                    this.$Message.success(res.data.msg);
                    this.$router.push(
                      `/release/releasePay/4/${res.data.data.service_id}`
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
              data = Object.assign(data, { service_id: this.lifeId });
              setInfoApi
                .editService(data)
                .then(res => {
                  if (res.data.code === 200) {
                    this.$Message.success(res.data.msg);
                    this.$router.push(`/release/releasePay/4/${this.lifeId}`);
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
        } else {
          this.$Message.error("请填写正确的发布数据");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    send(v) {
      this.formValidate.imgList = v;
    },
    upload(file, data, list) {
      let reader = new FileReader(); //html5读文件
      reader.readAsDataURL(file);
      reader.onload = e => {
        data.file = e.currentTarget.result;
        setInfoApi
          .uploadLifeImg(data)
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
    changeCate(v) {
      this.getLabel(v);
    },
    changeParea(v) {
      this.Pid = v;
      this.getArea(v);
    },
    changeArea(v) {
      this.formValidate.areaId = this.Pid + "," + v;
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
    getCate() {
      getInfoApi
        .getLifeCate()
        .then(res => {
          if (res.data.code === 200) {
            this.cateList = res.data.data;
          }
        })
        .catch(err => console.log(err));
    },
    getLabel(id) {
      let params = {
        cate_id: id
      };
      getInfoApi
        .getServiceLabel(params)
        .then(res => {
          if (res.data.code == 200) {
            this.labelList = res.data.data;
          }
        })
        .catch(err => console.log(err));
    },
    get(data) {
      this.formValidate.desc = data;
    },
    getData(i) {
      let params = {
        service_id: i
      };
      getInfoApi
        .getMyFindService(params)
        .then(res => {
          if (res.data.code === 200) {
            let data = res.data.data;
            this.formValidate = {
              name: data.service_title,
              cate: data.cate_id,
              contact: data.username,
              phoneNumber: data.mobile,
              areaId: data.area,
              address: data.address,
              desc: data.intro,
              imgList: data.service_img
            };
            let arr = data.service_label;
            let arr2 = [];
            for (let i = 0; i < arr.length; i++) {
              arr2.push(arr[i].id);
            }
            this.formValidate.label = arr2;
            this.getLabel(this.formValidate.cate);
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
          }
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.Breadcrumb = JSON.parse(sessionStorage.getItem("releasebread"));
    this.getCate();
    this.getArea(0);
    let index = this.$route.params.id;
    if (index != 0) {
      this.getData(index);
      this.lifeId = index;
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