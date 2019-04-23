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
              <FormItem label="招聘类型" prop="type">
                <RadioGroup v-model="formValidate.type">
                  <Radio :label="1">全职招聘</Radio>
                  <Radio :label="2">兼职招聘</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="发布标题" prop="title">
                <i-input v-model="formValidate.title"></i-input>
              </FormItem>
              <FormItem label="公司名称" prop="name">
                <i-input v-model="formValidate.name"></i-input>
              </FormItem>
              <FormItem label="职位类型" prop="cate">
                <Select v-model="formValidate.cate" placeholder="请选择职位类型" style="width:auto">
                  <Option
                    v-for="(item,index) in cateList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="学历要求" prop="degree">
                <Select v-model="formValidate.degree" placeholder="请选择教育经历" style="width:auto">
                  <Option :value="1">不限</Option>
                  <Option :value="2">职高</Option>
                  <Option :value="3">普高</Option>
                  <Option :value="4">大专</Option>
                  <Option :value="5">本科</Option>
                  <Option :value="6">硕士</Option>
                  <Option :value="7">博士</Option>
                </Select>
              </FormItem>
              <FormItem label="工作经历" prop="exp">
                <Select v-model="formValidate.exp" placeholder="请选择工作经历" style="width:auto">
                  <Option :value="1">不限</Option>
                  <Option :value="2">1年以下</Option>
                  <Option :value="3">1-2年</Option>
                  <Option :value="4">2-3年</Option>
                  <Option :value="5">3-4年</Option>
                  <Option :value="6">4-5年</Option>
                  <Option :value="7">5-10年</Option>
                  <Option :value="8">10年以上</Option>
                </Select>
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
              <FormItem label="公司规模" prop="scale">
                <Select v-model="formValidate.scale" placeholder="请选择公司规模" style="width:auto">
                  <Option :value="1">20人以下</Option>
                  <Option :value="2">20-50人</Option>
                  <Option :value="3">50-100人</Option>
                  <Option :value="4">100-200人</Option>
                  <Option :value="5">200人以上</Option>
                </Select>
              </FormItem>
              <FormItem label="薪资" prop="wages">
                <i-input
                  v-model="formValidate.Wmin"
                  placeholder="最低月薪"
                  :disabled="formValidate.negotiable"
                >
                  <span slot="append">元/每月</span>
                </i-input>
                <i-input
                  v-model="formValidate.Wmax"
                  placeholder="最高月薪"
                  :disabled="formValidate.negotiable"
                >
                  <span slot="append">元/每月</span>
                </i-input>
                <i-switch v-model="formValidate.negotiable" @on-change="change"/>
                <span class="negotiable">面议</span>
              </FormItem>
              <FormItem label="福利待遇" prop="welfare">
                <CheckboxGroup v-model="formValidate.welfare">
                  <Checkbox
                    v-for="(item,index) in labelList"
                    :key="index"
                    :label="item.id"
                  >{{item.label_name}}</Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="公司详情" prop="desc">
                <Editor @get="get" :data="formValidate.desc"></Editor>
              </FormItem>
              <FormItem label="联系人" prop="contact">
                <i-input v-model="formValidate.contact" placeholder="请输入联系人姓名"></i-input>
              </FormItem>
              <FormItem label="招聘电话" prop="phoneNumber">
                <i-input v-model="formValidate.phoneNumber" placeholder="请输入招聘电话"></i-input>
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
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import Foot from "@/components/Foot";
export default {
  data() {
    return {
      Breadcrumb: {},
      formValidate: {
        type: "", //招聘类型
        name: "", //公司名称
        desc: "", //公司详情
        Wmin: "", //最低工资
        Wmax: "", //最高工资
        degree: "", //学历要求
        exp: "", //工作经历
        welfare: [],
        scale: "", //公司规模
        contact: "", //联系人
        phoneNumber: "", //联系人号码
        negotiable: false, //工资是否面议
        address: "", //公司详细地址
        regional: "", //公司所在区域
        discuss: 1,//面议
        areaId:'',
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "发布标题不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "公司地址不能为空",
            trigger: "blur"
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
        welfare: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "请选择福利待遇",
            trigger: "change"
          },
        ]
      },
      area: "",
      p_area: "",
      areaList: [],
      p_areaList: [],
      showArea: true,
      Pid: "",
      labelList: [],
      cateList: [],
      jobId:0,
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
              title: datas.title,
              intro: datas.desc,
              type: datas.type,
              cate_id: datas.cate,
              education: datas.degree,
              working_limit: datas.exp,
              company: datas.name,
              area: datas.areaId,
              address: datas.address,
              company_scale: datas.scale,
              mobile: datas.phoneNumber,
              discuss: datas.discuss,
              username: datas.contact,
              label: datas.welfare,
              monthly_pay_big: datas.Wmax,
              monthly_pay_small: datas.Wmin
            };
            if(this.jobId == 0){
              setInfoApi
              .addRecruitment(data)
              .then(res => {
                ;
                if (res.data.code === 200) {
                  this.$Message.success(res.data.msg);
                  this.$router.push(`/release/releasePay/5/${res.data.data.id}`);
                } else if (res.data.code === 10003) {
                  this.defined.removeToken();
                  this.$Message.error("身份验证已过期，请重新登录");
                  this.$router.push("/");
                } else {
                  this.$Message.info(res.data.msg);
                }
              })
              .catch(err => console.log(err));
            }else{
              data=Object.assign(data,{id:this.jobId});
              setInfoApi.editRecruitment(data).then(res=>{
                if (res.data.code === 200) {
                  this.$Message.success(res.data.msg);
                  this.$router.push(`/release/releasePay/5/${this.jobId}`);
                } else if (res.data.code === 10003) {
                  this.defined.removeToken();
                  this.$Message.error("身份验证已过期，请重新登录");
                  this.$router.push("/");
                } else {
                  this.$Message.info(res.data.msg);
                }
              }).catch(err=>console.log(err));
            }
          } else {
            this.$Message.error("请输入正确的手机号");
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
    getLabel() {
      getInfoApi
        .getRecruitmentLabel()
        .then(res => {
          if (res.data.code === 200) {
            this.labelList = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    getCate() {
      getInfoApi
        .getJobCate()
        .then(res => {
          if (res.data.code === 200) {
            this.cateList = res.data.data;
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    get(data) {
      this.formValidate.desc = data;
    },
    change() {
      if (this.formValidate.negotiable) {
        this.formValidate.Wmin = "";
        this.formValidate.Wmax = "";
        this.formValidate.discuss = 0;
      } else {
        this.formValidate.discuss = 1;
      }
    },
    getData(i){
      let params={
        id:i
      };
      getInfoApi.getMyFindRecruitment(params).then(res=>{
        ;
        if(res.data.code === 200){
          let data=res.data.data;
          this.formValidate={
              title:data.title,
              desc:data.intro,
              type:data.type,
              cate:data.cate_id,
              degree:data.education,
              exp:data.working_limit,
              name:data.company,
              address:data.address,
              scale:data.company_scale,
              phoneNumber:data.mobile,
              discuss:data.discuss,
              Wmax:data.monthly_pay_big,
              Wmin:data.monthly_pay_small,
              contact:data.username,
              areaId:data.area,
              welfare:[],
          };
          let arr=data.recruitment_label;
          for(let i=0;i<arr.length;i++){
            this.formValidate.welfare.push(arr[i].id);
          };
          if(this.formValidate.discuss == 0){
            this.formValidate.negotiable=true;
            this.formValidate.Wmin='';
            this.formValidate.Wmax='';
          }else{
            this.formValidate.negotiable=false;
          }
          if(data.area_id == '23'){
            this.area=23;
            this.showArea=false;
          }else if(typeof(data.area_id) == 'string'){
            let arr=data.area_id.split(',');
            this.showArea=true;
            this.p_area=parseInt(arr[0]);
            this.getArea(this.p_area);
            this.area=parseInt(arr[1]);
          }else{
            this.p_area=1;
            this.getArea(this.p_area);
            this.area=data.area_id;
          }
        }
      }).catch(err=>console.log(err));
    }
  },
  created() {
    this.Breadcrumb = JSON.parse(sessionStorage.getItem("releasebread"));
    let index=this.$route.params.id;
    this.getLabel();
    this.getCate();
    this.getArea(0);
    if(index !=0 ){
      this.getData(index);
      this.jobId=index;
    }
  },
  mounted() {},
  components: {
    Head,
    Breadcrumb,
    Editor,
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
      .form {
        .negotiable {
          font-size: 16px;
          line-height: 33px;
        }
      }
    }
  }
}
</style>