<template>
  <div>
    <Head :title="title"></Head>
    <transition name="fade">
      <div id="main" v-show="show">
        <Upload @get="get" :uploadImg="uploadImg" :imgList="ruleForm.imgSrc"></Upload>
        <div class="form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="full-rent">
            <el-form-item label="小区" prop="name" class="item">
              <el-input v-model="ruleForm.name" placeholder="3-30个字符"></el-input>
            </el-form-item>
            <!-- 小区名称 -->
            <el-form-item label="区域" prop="area" class="item">
              <p v-if="areaData != ''" @click="showAreaList">{{areaData}}</p>
              <p v-else class="txt" @click="showAreaList">请选择所在区域</p>
            </el-form-item>
            <!-- 小区所在区域 -->
            <el-form-item label="地址" prop="address" class="item com1 com">
              <el-input v-model.number="ruleForm.address" placeholder="请输入房屋所在详细地址"></el-input>
            </el-form-item>
            <!-- 详细地址 -->
            <div>
              <el-form-item label="户型" class="item com1" prop="type">
                <p @click="showType=true" v-show="typeTxt!=''">{{typeTxt}}</p>
                <p @click="showType=true" class="txt" v-show="typeTxt==''">请选择户型</p>
              </el-form-item>
            </div>
            <!-- 房间的户型 -->
            <el-form-item label="面积" prop="acreage" class="item com1 com">
              <el-input v-model.number="ruleForm.acreage" placeholder="请输入房屋的实际面积"></el-input>
              <span>平方</span>
            </el-form-item>
            <!-- 房屋面积 -->
            <el-form-item label="售价" prop="sale" class="item com1 com">
              <el-input v-model.number="ruleForm.sale" placeholder="请输入房屋价格"></el-input>
              <span>万元</span>
            </el-form-item>
            <!-- 房屋售价 -->
            <el-form-item label="首付" prop="down" class="item com1 com">
              <el-input v-model.number="ruleForm.down" placeholder="请输入首付金额"></el-input>
              <span>万元</span>
            </el-form-item>
            <!-- 房屋首付 -->
            <el-form-item label="产权" prop="year" class="item com1 com">
              <el-input v-model.number="ruleForm.year" placeholder="请输入房屋产权"></el-input>
              <span>年</span>
            </el-form-item>
            <!-- 房屋产权 -->
            <el-form-item label="标题" prop="title" class="item">
              <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <!-- 发布文名称 -->
            <el-form-item label="描述" prop="desc" class="item">
              <el-input type="textarea" placeholder="请输入详情描述" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <!-- 房源描述 -->
            <el-form-item label="朝向" prop="direction" class="item">
              <p v-if="direction != ''" @click="showDirection = true">{{direction}}</p>
              <p v-else class="txt" @click="showDirection = true">请选择朝向</p>
            </el-form-item>
            <!-- 朝向 -->
            <el-form-item label="所在楼层" prop="floor" class="item com">
              <el-input v-model.number="ruleForm.floor" placeholder="请输入所在楼层"></el-input>
              <span>楼</span>
            </el-form-item>
            <!-- 楼层 -->
            <el-form-item label="总楼层" prop="floorAll" class="item com">
              <el-input v-model.number="ruleForm.floorAll" placeholder="请输入所有楼层"></el-input>
              <span>楼</span>
            </el-form-item>
            <!-- 楼层 -->
            <div @click="showCate=true">
              <el-form-item label="房屋性质" prop="cateTxt" class="item">
                <p v-if="cateTxt!=''">{{cateTxt}}</p>
                <p class="txt" v-else>请选择房屋性质</p>
              </el-form-item>
            </div>
            <!-- 房屋性质 -->
            <div @click="showDecoration=true">
              <el-form-item label="装修情况" prop="decoration" class="item">
                <p v-if="decoration!=''">{{decoration}}</p>
                <p class="txt" v-else>请选择装修情况</p>
              </el-form-item>
            </div>
            <!-- 装修情况 -->
            <el-form-item label="联系人" prop="contact" class="item">
              <el-input v-model="ruleForm.contact" placeholder="至少两个字"></el-input>
            </el-form-item>
            <!-- 联系人名称 -->
            <el-form-item label="联系方式" prop="phone" class="item">
              <el-input v-model.number="ruleForm.phone" placeholder="请输入联系人的手机号码"></el-input>
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item label="房屋类型" prop="cate_type" class="item">
              <van-radio-group v-model="ruleForm.cate_type">
                <van-radio name="1">新房</van-radio>
                <van-radio name="2">二手房</van-radio>
              </van-radio-group>
            </el-form-item>
            <!-- 房屋类别 -->
            <el-form-item class="btn">
              <el-button type="warning" @click="submitForm('ruleForm')">发布</el-button>
            </el-form-item>
            <!-- 提交按钮 -->
          </el-form>
        </div>
        <!-- 地区选择 -->
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
              <ul class="list" v-for="(item,index) in area_p" :key="index">
                <li @click="showCity(index)">{{item.name}}</li>
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
              </div>
              <ul class="list" v-for="(item,index) in area_c" :key="index">
                <li @click="complete(index)">{{item.name}}</li>
              </ul>
            </div>
          </div>
        </van-popup>
        <!-- 市级 -->
        <!-- 地区选择 -->
      </div>
    </transition>
    <!-- 弹出层 -->
    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        title="请选择户型"
        :columns="typeList"
        @cancel="onCancel"
        @confirm="type"
      />
    </van-popup>
    <!-- 户型 -->
    <van-popup v-model="showCate" position="bottom">
      <van-picker
        show-toolbar
        title="请选择类别"
        :columns="cateList"
        @cancel="onCancel"
        @confirm="cate"
      />
    </van-popup>
    <!-- 分类 -->
    <van-popup v-model="showDirection" position="bottom">
      <van-picker
        show-toolbar
        title="请选择朝向"
        :columns="directionList"
        @cancel="onCancel"
        @confirm="getDirection"
      />
    </van-popup>
    <!-- 户型 -->
    <van-popup v-model="showDecoration" position="bottom">
      <van-picker
        show-toolbar
        title="请选择户型"
        :columns="decorationList"
        @cancel="onCancel"
        @confirm="getDecoration"
      />
    </van-popup>
    <!-- 装修 -->
    <!-- 弹出层 -->
  </div>
</template>

<script>
import Head from "@/components/Head2";
import Upload from "@/components/Upload";
import { mapMutations } from "vuex";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast,Icon,RadioGroup, Radio } from 'vant';
export default {
  data() {
    return {
      houseId: 0,
      title: "房屋售卖",
      show: false,
      showType: false,
      showCate: false,
      showArea: false,
      showDirection: false,
      showDecoration: false,
      city: false,
      ruleForm: {
        name: "",
        area: "",
        region: "",
        acreage: "",
        typeId: "",
        sale: "",
        cate: "",
        desc: "",
        imgSrc: [],
        direction: "",
        floor: "",
        areaId: "",
        down: "",
        year: "",
        address: "",
        cate_type: 1,
        decoration: ""
      },
      typeList: [
        {
          text: "1室",
          id: 1
        },
        {
          text: "2室",
          id: 2
        },
        {
          text: "3室",
          id: 3
        },
        {
          text: "4室",
          id: 4
        },
        {
          text: "4室及以上",
          id: 5
        }
      ],
      directionList: [
        {
          text: "东",
          id: "东"
        },
        {
          text: "南",
          id: "南"
        },
        {
          text: "西",
          id: "西"
        },
        {
          text: "北",
          id: "北"
        }
      ],
      cateList: [
        {
          text: "普通住宅楼",
          id: 1
        },
        {
          text: "公寓楼",
          id: 2
        },
        {
          text: "写字楼",
          id: 3
        },
        {
          text: "商铺",
          id: 4
        },
        {
          text: "回迁房",
          id: 5
        }
      ],
      decorationList: [
        {
          text: "精装",
          id: 1
        },
        {
          text: "简装",
          id: 2
        },
        {
          text: "豪华",
          id: 3
        },
        {
          text: "毛坯",
          id: 4
        }
      ],
      rules: {
        name: [{ required: true, message: "请输入小区名称", trigger: "blur" }],
        title: [{ required: true, message: "请输入发布名称", trigger: "blur" }],
        acreage: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        sale: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        down: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        year: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        desc: [{ required: true, message: "请填写房源描述", trigger: "blur" }],
        contact: [
          { required: true, message: "请输入联系人名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        floor: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        floorAll: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" }
        ]
      },
      area_p: [],
      area_c: [],
      areaData: "",
      typeTxt: "",
      direction: "",
      decoration: "",
      cateTxt: ""
    };
  },
  methods: {
    onCancel() {
      this.showType = false;
      this.showCate = false;
      this.showDirection = false;
      this.showDecoration = false;
    },
    type(v, i) {
      this.typeTxt = v.text;
      this.ruleForm.typeId = v.id;
      this.showType = false;
    },
    cate(v, i) {
      this.ruleForm.cate = v.id;
      this.cateTxt = v.text;
      this.showCate = false;
    },
    getDirection(v) {
      (this.ruleForm.direction = v.id),
        (this.direction = v.text),
        (this.showDirection = false);
    },
    getDecoration(v) {
      (this.ruleForm.decoration = v.id),
        (this.decoration = v.text),
        (this.showDecoration = false);
    },
    get(value) {
      this.ruleForm.imgSrc = value;
    },
    showpop() {
      this.pop = true;
    },
    cancel() {
      this.pop = false;
      this.checkList = [];
    },
    confirm() {
      this.ruleForm.checkList = this.checkList;
      this.pop = false;
    },
    uploadImg(data, list, send) {
      setInfoApi
        .uploadTradeImg(data)
        .then(res => {
          if (res.data.code === 200) {
            Toast("上传成功");
            list.push(res.data.src);
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    showAreaList() {
      let params = {
        pid: 0
      };
      getInfoApi
        .getAllArea(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.area_p = res.data.data;
            this.showArea = true;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    showCity(i) {
      let list = this.area_p[i].children;
      this.ruleForm.areaId = this.area_p[i].id;
      this.areaData = this.area_p[i].name;
      if (list) {
        this.area_c = list;
        this.city = true;
      } else {
        this.showArea = false;
      }
    },
    complete(i) {
      this.areaData = this.areaData + "-" + this.area_c[i].name;
      this.ruleForm.areaId = this.ruleForm.areaId + "," + this.area_c[i].id;
      this.showArea = false;
      this.city = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (myreg.test(this.ruleForm.phone)) {
            let datas = this.ruleForm;
            let data = {
              house_title: datas.title,
              intro: datas.desc,
              type: datas.cate_type,
              house_type: datas.typeId,
              floor_type: datas.cate,
              decoration_type: datas.decoration,
              down_payment: datas.down,
              orientation: datas.direction,
              acreage: datas.acreage,
              property_right: datas.year,
              address: datas.address,
              area: datas.areaId,
              house_area: datas.name,
              price: datas.sale,
              mobile: datas.phone,
              floor_in: datas.floor,
              floor_sum: datas.floorAll,
              username: datas.contact,
              img: datas.imgSrc
            };
            if (this.houseId == 0) {
              setInfoApi
                .addHouseTrade(data)
                .then(res => {
                  ;
                  if (res.data.code === 200) {
                    Toast(res.data.msg);
                    this.$router.push(`/payRelease/2/${res.data.data.house_id}`);
                  } else if (res.data.code === 10003) {
                    Toast("身份验证已过期，请重新登录");
                    this.defined.removeToken();
                    this.$router.push("/log/1");
                  } else {
                    Toast(res.data.msg);
                  }
                })
                .catch(err => console.log(err));
            } else {
              data = Object.assign(data, { house_id: this.houseId });
              setInfoApi
                .editHouseTrade(data)
                .then(res => {
                  if (res.data.code === 200) {
                    Toast(res.data.msg);
                    this.$router.push(`/payRelease/2/${this.houseId}`)
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
          } else {
            Toast("请输入正确的手机号");
          }
        } else {
          Toast("请填写信息");
          console.log("error submit!!");
          return false;
        }
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
            ;
            let reg = RegExp("<.+?>", "g");
            let data = res.data.data;
            this.ruleForm = {
              title: data.house_title,
              cate_type: data.type.toString(),
              typeId: data.house_type,
              cate: data.floor_type,
              decoration: data.decoration_type,
              down: parseInt(data.down_payment),
              direction: data.orientation,
              acreage: data.acreage,
              year: data.property_right,
              address: data.address,
              areaId: data.area,
              name: data.house_area,
              sale: parseInt(data.price),
              phone: parseInt(data.mobile),
              floor: data.floor_in,
              floorAll: data.floor_sum,
              contact: data.username,
              imgSrc: [],
              house_id: data.house_id
            };
            data.house_trade_img.forEach(el => {
              this.ruleForm.imgSrc.push(el.img);
            });
            this.typeList.forEach(el => {
              if (el.id == this.ruleForm.typeId) {
                this.typeTxt = el.text;
              }
            });
            this.directionList.forEach(el => {
              if (el.id == data.orientation) {
                this.direction = el.text;
              }
            });
            this.decorationList.forEach(el => {
              if (el.id == data.decoration_type) {
                this.decoration = el.text;
              }
            });
            this.cateList.forEach(el => {
              if (el.id == data.floor_type) {
                this.cateTxt = el.text;
              }
            });
            let text = data.intro.replace(reg, "");
            this.ruleForm.desc = text;
            if (data.area_id == 23) {
              this.areaData = "沂源周边乡镇";
            } else {
              this.areaData = "沂源县城区-" + data.area_name;
            }
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
    this.show = true;
    let index = this.$route.params.id;
    if (index != 0) {
      this.getData(index);
      this.houseId = index;
    }
  },
  components: {
    Head,
    Upload,
    [Icon.name]:Icon,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  .news {
    width: 100%;
    background: #ccc;
    color: #505050;
    line-height: 66px;
    height: 66px;
    font-size: 26px;
    padding: 0 60px;
    margin-top: 36px;
  }
  .form {
    margin-top: 20px;
    padding: 0 20px;
    .txt {
      font-size: 24px;
      color: #c0c4cc;
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