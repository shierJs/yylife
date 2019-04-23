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
              <FormItem label="发布标题" prop="name">
                <i-input v-model="formValidate.name" placeholder="请输入标题"></i-input>
              </FormItem>
              <FormItem label="物品类型" prop="cate">
                <Select v-model="formValidate.cate" placeholder="请选择物品类型" style="width:auto">
                  <Option
                    v-for="(item,index) in cateList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</Option>
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
              <FormItem label="新旧程度" prop="old">
                <Select v-model="formValidate.old" placeholder="请选择物品新旧程度" style="width:auto">
                  <Option value="1">全新</Option>
                  <Option value="2">95新</Option>
                  <Option value="3">9成新</Option>
                  <Option value="4">85新</Option>
                  <Option value="5">8成新</Option>
                </Select>
              </FormItem>
              <FormItem label="物品价格" prop="price">
                <i-input
                  v-model="formValidate.price"
                  placeholder="物品卖价"
                  :disabled="formValidate.negotiable"
                >
                  <span slot="append">元</span>
                </i-input>
                <i-switch v-model="formValidate.negotiable" @on-change="change"/>
                <span class="negotiable" style="font-size:16px;line-height:33px;">面议</span>
              </FormItem>
              <FormItem label="提货方式" prop="deal">
                <RadioGroup v-model="formValidate.deal">
                  <Radio label="1">快递</Radio>
                  <Radio label="2">自提</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="房屋详情" prop="desc">
                <Editor @get="get" :data="formValidate.desc"></Editor>
              </FormItem>
              <FormItem label="上传图片" prop="img">
                <Upload @send="send" :upload="upload" :imgArr="formValidate.imgList"></Upload>
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
        name: "", //物品名称
        desc: "", //物品详情
        price: "", //物品卖价
        negotiable: false, //价格是否面议
        discuss: 1, //是否面议
        old: "", //物品新旧程度
        address: "", //地址
        area: "", //区域
        deal: "", //提货方式
        contact: "", //联系人
        phoneNumber: "", //联系人号码
        identity: "", //发布者身份
        cate: "" //物品分类
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "物品名称不能为空",
            trigger: "blur"
          }
        ],
        old: [
          {
            required: true,
            message: "物品新旧程度不能为空",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ],
        deal: [
          {
            required: true,
            message: "请选择提货方式",
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
        ]
      },
      area: "",
      p_area: "",
      areaList: [],
      p_areaList: [],
      showArea: true,
      Pid: "",
      cateList: [],
      usedId:0,
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
              used_title: datas.name,
              intro: datas.desc,
              cate_id: datas.cate,
              selling_price: datas.price,
              old: datas.old,
              address: datas.address,
              area: datas.areaId,
              deal_type: datas.deal,
              discuss: datas.discuss,
              img: datas.imgList,
              username: datas.contact,
              mobile: datas.phoneNumber
            };
            if(this.usedId == 0){
              setInfoApi
              .addUsed(data)
              .then(res => {
                ;
                if (res.data.code === 200) {
                  this.$Message.success(res.data.msg);
                  this.$router.push(`/release/releasePay/3/${res.data.data.used_id}`);
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
              data=Object.assign(data,{used_id:this.usedId});
              setInfoApi
              .editUsed(data)
              .then(res => {
                ;
                if (res.data.code === 200) {
                  this.$Message.success(res.data.msg);
                  this.$router.push(`/release/releasePay/3/${this.usedId}`);
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
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    change() {
      if (this.formValidate.negotiable) {
        this.formValidate.price = "";
        this.formValidate.discuss = 0;
      } else {
        this.formValidate.discuss = 1;
      }
    },
    getCate() {
      getInfoApi
        .getSecondCate()
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.cateList = res.data.data;
          }
        })
        .catch(err => console.log(err));
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
    get(data) {
      this.formValidate.desc = data;
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
          .uploadUsedImg(data)
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
    getData(i){
      let params={
        used_id:i
      };
      getInfoApi.getMyFindUsed(params).then(res=>{
        ;
        if(res.data.code ===200){
          let data=res.data.data;
          this.formValidate={
            name:data.used_title,
            desc:data.intro,
            cate:data.cate_id,
            price:parseInt(data.selling_price),
            old:data.old.toString(),
            address:data.address,
            areaId:data.area,
            deal:data.deal_type.toString(),
            discuss:data.discuss,
            contact:data.username,
            phoneNumber:data.mobile,
            used_id:data.used_id,
            imgList:data.used_img,
          };
          if(this.formValidate.discuss == 0){
            this.formValidate.negotiable=true;
            this.formValidate.price='';
          }else{
            this.formValidate.negotiable=false;
          }
          if(data.area == '23'){
            this.area=23;
            this.showArea=false;
          }else{
            let arr=data.area.split(',');
            this.showArea=true;
            this.p_area=parseInt(arr[0]);
            this.getArea(this.p_area);
            this.area=parseInt(arr[1]);
          }
        }else{
          ;
        }
      }).catch(err=>console.log(err));
    }
  },
  created() {
    this.Breadcrumb = JSON.parse(sessionStorage.getItem("releasebread"));
  },
  mounted() {
    this.getCate();
    this.getArea(0);
    let index=this.$route.params.id;
    if(index !=0){
      this.getData(index);
      this.usedId=index;
    };
  },
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