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
              <FormItem label="店铺名称" prop="name">
                <i-input v-model="formValidate.name" placeholder="请输入店铺名称"></i-input>
              </FormItem>
              <FormItem label="店铺描述" prop="intro">
                <i-input v-model="formValidate.intro" placeholder="请输入店铺描述"></i-input>
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
              <FormItem label="广告类型" prop="cate">
                <Select v-model="formValidate.cate" placeholder="请选择广告类型" style="width:auto">
                  <Option
                    v-for="(item,index) in cateList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="人均消费" prop="price">
                <i-input v-model="formValidate.price">
                  <span slot="append">元</span>
                </i-input>
              </FormItem>
              <FormItem label="优惠信息" prop="discount">
                <i-input v-model="formValidate.discount" placeholder="请输入优惠信息"></i-input>
              </FormItem>
              <FormItem label="广告详情" prop="desc">
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
        cate: "", //广告类型
        name: "", //广告名称
        price: "", //广告价格
        contact: "", //联系人
        phoneNumber: "", //联系人号码
        imgList:[],
        desc:'',
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "店铺名称不能为空",
            trigger: "blur"
          }
        ],
        intro: [
          {
            required: true,
            message: "店铺名称不能为空",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "价格不能为空",
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
      cateList: [],
      shopId:0,
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let datas = this.formValidate;
          let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (myreg.test(datas.phoneNumber)) {
            let data = {
              shop_name: datas.name,
              intro: datas.intro,
              cate_id: datas.cate,
              area: datas.areaId,
              discounts: datas.discount,
              address: datas.address,
              consumption: datas.price,
              details: datas.desc,
              username: datas.contact,
              mobile: datas.phoneNumber,
              img: datas.imgList,
              area:datas.areaId,
            };
            if(this.shopId == 0){
              setInfoApi
              .addShop(data)
              .then(res => {
                if (res.data.code === 200) {
                  this.$Message.success(res.data.msg);
                  this.$router.push(`/release/releasePay/6/${res.data.data.shop_id}`);
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
              data=Object.assign(data,{shop_id:this.shopId});
              setInfoApi
              .editShop(data)
              .then(res => {
                if (res.data.code === 200) {
                  this.$Message.success(res.data.msg);
                  this.$router.push(`/release/releasePay/6/${this.shopId}`);
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
    getCate() {
      getInfoApi
        .getShopCate()
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
          .uploadShopImg(data)
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
        shop_id:i
      };
      getInfoApi.getMyFindShop(params).then(res=>{
        if(res.data.code === 200){
          let data=res.data.data;
          this.formValidate={
            name:data.shop_name,
            intro:data.intro,
            discount:data.discounts,
            cate:data.cate_id,
            price:data.consumption,
            address:data.address,
            desc:data.details,
            contact:data.username,
            phoneNumber:data.mobile,
            imgList:data.shop_img,
            areaId:data.area,
          };
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
          this.$Message.info(res.data.msg);
        }
      })
    }
  },
  created() {
    this.Breadcrumb = JSON.parse(sessionStorage.getItem("releasebread"));
    this.getArea(0);
    this.getCate();
    let index= this.$route.params.id;
    if(index != 0){
      this.getData(index);
      this.shopId=index;
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