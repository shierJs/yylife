<template>
  <div>
    <Head :title="title"></Head>
    <transition name="fade">
      <div id="main" v-show="show">
        <Upload @get="get" :uploadImg="uploadImg" :imgList="ruleForm.imgSrc"></Upload>
        <p class="news">您今天还可免费发帖2条，本月还可免费发帖3条。</p>
        <div class="form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="full-rent">
            <el-form-item label="小区" prop="name" class="item">
              <el-input v-model="ruleForm.name" placeholder="请输入小区名称"></el-input>
            </el-form-item>
            <!-- 小区名称 -->
            <el-form-item label="区域" class="item" prop="area">
              <el-cascader
                :options="areaList"
                v-model="ruleForm.area"
                :props="props"
                @change="changeArea"
                placeholder="请选择区域"
                style="font-size:12px;"
              ></el-cascader>
            </el-form-item>
            <!-- 小区所在区域 -->
            <el-form-item label="详细地址" class="item" prop="address">
              <el-input v-model="ruleForm.address" placeholder="房屋所在详细地址"></el-input>
            </el-form-item>
            <!-- 小区详细地址 -->
            <div @click="showType=true">
              <el-form-item label="户型" required class="item com1" prop="type">
                <p v-show="ruleForm.type!=''">{{ruleForm.type}}</p>
                <p class="txt" v-show="ruleForm.type==''">请选择户型</p>
              </el-form-item>
            </div>
            <!-- 房间的户型 -->
            <el-form-item label="所处楼层" class="item">
              <el-select v-model="ruleForm.floorIn" placeholder="请选择房屋所在楼层">
                <el-option label="低层" :value="1"></el-option>
                <el-option label="中层" :value="2"></el-option>
                <el-option label="高层" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <!-- 付款方式 -->
            <el-form-item label="总楼层" prop="floorAll" class="item com1 com">
              <el-input v-model.number="ruleForm.floorAll"></el-input>
              <span>楼</span>
            </el-form-item>
            <!-- 房屋总楼层 -->
            <el-form-item label="面积" prop="acreage" class="item com1 com">
              <el-input v-model.number="ruleForm.acreage"></el-input>
              <span>平/方</span>
            </el-form-item>
            <!-- 房屋面积 -->
            <el-form-item label="租金" prop="rent" class="item com1 com">
              <el-input v-model.number="ruleForm.rent"></el-input>
              <span>元/月</span>
            </el-form-item>
            <!-- 房屋租金 -->
            <el-form-item label="付款方式" prop="region" class="item">
              <el-select v-model="ruleForm.region" placeholder="押一付一" @change="changePay">
                <el-option label="押一付一" :value="1"></el-option>
                <el-option label="押一付二" :value="2"></el-option>
                <el-option label="押一付三" :value="3"></el-option>
                <el-option label="半年付(押一)" :value="4"></el-option>
                <el-option label="一年付(押一)" :value="5"></el-option>
              </el-select>
            </el-form-item>
            <!-- 付款方式 -->
            <div @click="showCate=true">
              <el-form-item label="出租类别" prop="cate" class="item">
                <p v-show="ruleForm.cate!=''">{{ruleForm.cate}}</p>
                <p class="txt" v-show="ruleForm.cate==''">请选择出租方式</p>
              </el-form-item>
            </div>
            <!-- 出租类别 -->
            <el-form-item label="标题" prop="title" class="item">
              <el-input v-model="ruleForm.title" placeholder="请输入发布标题"></el-input>
            </el-form-item>
            <!-- 发布文名称 -->
            <el-form-item label="描述" prop="desc" class="item">
              <p v-if="ruleForm.desc!=''" @click="showedit">{{ruleForm.desc | flow}}</p>
              <p class="txt" v-else @click="showedit">请对房屋进一步描述</p>
            </el-form-item>
            <!-- 房源描述 -->
            <el-form-item label="租房标签" prop="name" class="item">
              <span @click="showpop" class="showpop" v-if="!ruleForm.configList.length">请选择至少三个标签</span>
              <span
                class="show-tag"
                v-for="(v,i) in ruleForm.configList.slice(0,5)"
                :key="i"
                v-show="ruleForm.configList.length"
                @click="showpop"
              >{{v.name}},</span>
            </el-form-item>
            <!-- 租房标签 -->
            <el-form-item label="联系人" prop="contact" class="item">
              <el-input v-model="ruleForm.contact" placeholder="至少两个字"></el-input>
            </el-form-item>
            <!-- 联系人名称 -->
            <el-form-item label="手机号" prop="phone" class="item">
              <el-input v-model.number="ruleForm.phone" placeholder="1xx xxxx xxxx"></el-input>
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item class="btn">
              <el-button type="warning" @click="submitForm('ruleForm')">发布</el-button>
            </el-form-item>
            <!-- 提交按钮 -->
          </el-form>
        </div>
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
        value-key="name"
      />
    </van-popup>

    <van-popup v-model="showCate" position="bottom">
      <van-picker
        show-toolbar
        title="请选择类别"
        :columns="cateList"
        @cancel="onCancel"
        @confirm="cate"
        value-key="name"
      />
    </van-popup>

    <van-popup v-model="pop" position="bottom">
      <div class="welfare popup">
        <div class="head-pop">
          <p class="title">租房标签（可多选）</p>
          <p class="comfirm" @click="pop=false">完成</p>
        </div>
        <ul class="list">
          <li
            v-for="(item,index) in configList"
            :key="index"
            @touchend.stop="gets(index)"
            class="ali"
          >
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </van-popup>

    <van-popup v-model="showEdit" position="right" style="width:100%;">
      <Edit @edit="edit"></Edit>
    </van-popup>
    <!-- 弹出层 -->
  </div>
</template>

<script>
import Head from "@/components/Head2";
import Upload from "@/components/Upload";
import Edit from "@/components/Edit";
import { Toast } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
import flow from "@/filters/flow.js";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
export default {
  data() {
    return {
      houseId: 0,
      title: "房屋出租",
      show: false,
      pop: false,
      showType: false,
      showCate: false,
      showEdit: false,
      props: {
        value: "id",
        label: "name",
        children: "children"
      },
      typeList: [
        {
          id: 1,
          name: "一室"
        },
        {
          id: 2,
          name: "二室"
        },
        {
          id: 3,
          name: "三室"
        },
        {
          id: 4,
          name: "四室"
        },
        {
          id: 5,
          name: "五室及以上"
        }
      ],
      cateList: [
        {
          id: 1,
          name: "整租"
        },
        {
          id: 2,
          name: "合租"
        }
      ],
      ruleForm: {
        name: "",
        region: "",
        cate: "",
        contact: "",
        acreage: "",
        rent: "",
        type: "",
        desc: "",
        imgSrc: [],
        configList: [],
        address: "",
        floorAll: "",
        floorIn: "",
        phone: "",
        title: "",
        area: [1, 3]
      },
      params: {
        area: "",
        type: "",
        payment_type: "",
        house_type: "",
        img: [],
        config: []
      },
      rules: {
        name: [{ required: true, message: "请输入小区名称", trigger: "blur" }],
        area: [{ required: true, message: "请输入所在区域", trigger: "blur" }],
        floorAll: [
          { required: true, message: "请输入总楼层", trigger: "blur" },
          { type: "number", message: "必须为数字值" }
        ],
        cate: [
          { required: true, message: "请选择出租类别", trigger: "change" }
        ],
        floor: [{ required: true, message: "请选择楼层", trigger: "change" }],
        type: [{ required: true, message: "请选择户型", trigger: "change" }],
        title: [{ required: true, message: "请输入发布名称", trigger: "blur" }],
        acreage: [
          { required: true, message: "面积不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        address: [{ required: true, message: "地址不能为空" }],
        desc: [{ required: true, message: "详情不能为空" }],
        rent: [
          { required: true, message: "租金不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        contact: [
          { required: true, message: "请输入联系人名称", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空" },
          { type: "number", message: "必须为数字值" }
        ]
      },
      areaList: [],
      configList: []
    };
  },
  methods: {
    getOption() {
      getInfoApi
        .getAllArea()
        .then(res => {
          if (res.data.code === 200) {
            this.areaList = res.data.data;
            this.show = true;
            this.props = {
              value: "id",
              label: "name",
              children: "children"
            };
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
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
    onCancel() {
      this.showType = false;
      this.showCate = false;
      this.pop = false;
    },
    type(v) {
      console.log(v);
      this.params.house_type = v.id;
      this.ruleForm.type = v.name;
      this.showType = false;
    },
    cate(v) {
      this.ruleForm.cate = v.name;
      this.params.type = v.id;
      this.showCate = false;
    },
    changePay(v) {
      this.params.payment_type = v;
    },
    changeArea(value) {
      if (value.length > 1) {
        this.params.area = value[0] + "," + value[value.length - 1];
      } else {
        this.params.area = value[0];
      }
      console.log(this.params.area);
    },
    get(value) {
      this.params.img = value;
    },
    edit(v) {
      this.ruleForm.desc = v;
      this.showEdit = false;
    },
    uploadImg(data, list, send) {
      setInfoApi
        .uploadRentImg(data)
        .then(res => {
          if (res.data.code === 200) {
            Toast("上传成功");
            list.push(res.data.src);
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push("/notFound");
        });
    },
    showpop() {
      this.pop = true;
    },
    showedit() {
      this.showEdit = true;
    },
    cancel() {
      this.pop = false;
      this.checkList = [];
    },
    gets(i) {
      let ali = document.querySelectorAll(".ali");
      let index = this.ruleForm.configList.indexOf(this.configList[i]);
      if (index == -1) {
        this.ruleForm.configList.push(this.configList[i]);
        this.params.config.push(this.configList[i].id);
        ali[i].classList.add("active");
      } else {
        let id = this.params.config.indexOf(this.configList[i].id);
        this.ruleForm.configList.splice(index, 1);
        this.params.config.splice(id, 1);
        ali[i].classList.remove("active");
      }
    },
    confirm() {
      this.ruleForm.configList = this.configList;
      this.pop = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.configList.length < 3) {
            Toast("请选择标签,最少三个");
          } else if (this.params.img.length == 0) {
            Toast("请上传租房图片");
          } else {
            let data = Object.assign(this.params, {
              house_title: this.ruleForm.title,
              house_area: this.ruleForm.name,
              acreage: this.ruleForm.acreage,
              price: this.ruleForm.rent,
              mobile: this.ruleForm.phone,
              floor_in: this.ruleForm.floorIn,
              floor_sum: this.ruleForm.floorAll,
              intro: this.ruleForm.desc,
              username: this.ruleForm.contact,
              address: this.ruleForm.address
            });
            if (this.houseId == 0) {
              setInfoApi
                .addRent(data)
                .then(res => {
                  ;
                  if (res.data.code == 200) {
                    Toast(res.data.msg);
                    this.$router.push(`/payRelease/1/${res.data.data.house_id}`);
                  } else if (res.data.code === 10003) {
                    Toast("身份验证已过期，请重新登录");
                    this.defined.removeToken();
                    this.$router.push("/login");
                  } else {
                    Toast(res.data.msg);
                  }
                })
                .catch(err => {
                  this.$router.push("/notFound");
                });
            } else {
              data = Object.assign(data, { house_id: parseInt(this.houseId) });
              setInfoApi
                .editHouseRent(data)
                .then(res => {
                  if (res.data.code == 200) {
                    Toast(res.data.msg);
                    this.$router.push(`/payRelease/1/${this.houseId}`);
                  } else if (res.data.code === 10003) {
                    Toast("身份验证已过期，请重新登录");
                    this.defined.removeToken();
                    this.$router.push("/login");
                  } else {
                    Toast(res.data.msg);
                  }
                })
                .catch(err => console.log(err));
            }
          }
        } else {
          Toast("请将信息填写完整");
          return false;
        }
      });
    },
    getData(i) {
      let params = {
        house_id: i
      };
      getInfoApi
        .getMyFindRent(params)
        .then(res => {
          if (res.data.code === 200) {
            ;
            let reg = RegExp("<.+?>", "g");
            let data = res.data.data;
            console.log(this.ruleForm);
            this.ruleForm.title = data.house_title;
            this.ruleForm.name = data.house_area;
            this.ruleForm.house_id = data.house_id;
            this.ruleForm.acreage = data.acreage;
            this.ruleForm.rent = data.price;
            this.ruleForm.phone = parseInt(data.mobile);
            this.ruleForm.floorIn = data.floor_in;
            this.ruleForm.floorAll = parseInt(data.floor_sum);
            this.ruleForm.contact = data.username;
            this.ruleForm.address = data.address;
            this.ruleForm.configList = [];
            this.ruleForm.imgSrc = [];
            this.params = {
              area: data.area,
              type: data.type,
              payment_type: data.payment_type,
              house_type: data.house_type,
              img: [],
              config: []
            };
            data.house_rent_img.forEach(el => {
              this.params.img.push(el.img);
            });
            let text = data.intro.replace(reg, "");
            this.setTxt(text);
            this.cateList.forEach(el => {
              if (el.id == this.params.type) {
                this.ruleForm.cate = el.name;
              }
            });
            this.typeList.forEach(el => {
              if (el.id == this.params.house_type) {
                this.ruleForm.type = el.name;
              }
            });
            data.house_config.forEach(el => {
              this.ruleForm.configList.push(el.name);
              this.params.config.push(el.id);
            });
            console.log(this.ruleForm.configList);
            if (data.area_id == 23) {
              this.ruleForm.area.push(1, data.area_id);
            } else {
              this.ruleForm.area.push(23);
            }
            data.house_config.forEach((el, index) => {
              this.ruleForm.configList.push(el.name);
              this.params.config.push(el.id);
            });
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/login");
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    ...mapMutations(["resetTxt", "setTxt"])
  },
  created() {
    this.getConfig();
    this.getOption();
  },
  mounted() {
    this.ruleForm.desc = this.text;
    let index = this.$route.params.id;
    if (index != 0) {
      this.getData(index);
      this.houseId = index;
    }
  },
  computed: {
    text() {
      return this.$store.state.text;
    }
  },
  components: {
    Head,
    Upload,
    Edit
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
    .showpop {
      font-size: 24px;
      color: #c0c4cc;
    }
    .txt {
      font-size: 24px;
      color: #c0c4cc;
    }
    .pop {
      padding: 0 32px;
      .head-pop {
        display: flex;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 88px;
        font-size: 24px;
        color: #1989fa;
      }
    }
  }
}
.popup {
  .head-pop {
    padding: 0 40px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;

    width: 100%;
    .title {
      color: #a3a3a3;
    }
    .comfirm {
      color: rgb(255, 38, 0);
      position: absolute;
      right: 40px;
    }
  }
}
.welfare {
  .list {
    padding: 40px 0 0 40px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 196px;
      height: 60px;
      margin-right: 40px;
      margin-bottom: 40px;
      border: 2px solid #a3a3a3;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      color: #33383e;
      span {
        font-size: 28px;
      }
    }
    .active {
      border-color: rgb(255, 38, 0);
      color: rgb(255, 38, 0);
    }
  }
}
</style>