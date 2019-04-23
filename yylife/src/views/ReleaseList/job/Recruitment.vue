<template>
  <div>
    <Head2 :title="title"></Head2>
    <transition name="fade">
      <div id="main" v-show="show">
        <div class="wrap">
          <!-- 招聘标题 -->
          <div class="item">
            <span class="label">招聘标题</span>
            <input type="text" placeholder="请输入标题" v-model="allList.title">
          </div>
          <!-- 招聘标题-->
          <!-- 职位名称 -->
          <!-- <div class="item">
            <span class="label">招聘岗位</span>
            <input type="text" placeholder="请输入招聘的职位" v-model="allList.name">
          </div>-->
          <!-- 职位名称 -->
          <!-- 公司名称 -->
          <div class="item">
            <span class="label">公司名称</span>
            <input type="text" placeholder="请输入贵公司的名称" v-model="allList.company">
          </div>
          <!-- 公司名称 -->
          <!-- 月薪 -->
          <div class="item">
            <span class="label">月&emsp;&emsp;薪</span>
            <p v-if="checked">面议</p>
            <div class="salary" v-else>
              <input type="text" placeholder="5000" v-model="allList.min">
              <span>至</span>
              <input type="text" placeholder="8000" v-model="allList.max">
              <span>元</span>
            </div>
            <div class="chk">
              <van-checkbox v-model="checked">面议</van-checkbox>
            </div>
          </div>
          <!-- 月薪 -->
          <!-- 地区选择-->
          <div class="item" @touchend.prevent="showAreaList">
            <span class="label">所在地区</span>
            <p class="txt" v-if="areaData==''">选择公司所在地区</p>
            <p v-else>{{areaData}}</p>
          </div>
          <!-- 地区选择 -->
          <!-- 详细地址 -->
          <div class="item">
            <span class="label">详细地址</span>
            <input type="text" placeholder="请输入详细地址" v-model="allList.address">
          </div>
          <!-- 详细地址 -->
          <!-- 福利待遇 -->
          <div class="item" @touchend.prevent="show1">
            <span class="label">福利待遇</span>
            <p v-if="!allList. welfareList.length" class="txt">选择提供的福利待遇，如包吃包住</p>
            <p
              v-for="(v,i) in allList. welfareList.slice(0,5)"
              :key="i"
              v-else
              @click="showpop"
            >{{v}},</p>
          </div>
          <van-popup v-model="showpop" position="bottom">
            <div class="welfare popup">
              <div class="head-pop">
                <p class="title">福利待遇（可多选）</p>
                <p class="comfirm" @click="showpop=false">完成</p>
              </div>
              <ul class="list">
                <li
                  v-for="(item,index) in welfareList"
                  :key="index"
                  @touchend.stop="gets(index)"
                  class="ali"
                >
                  <span>{{item.label_name}}</span>
                </li>
              </ul>
            </div>
          </van-popup>
          <!-- 福利待遇 -->
          <!-- 职位类别 -->
          <div class="item" @touchend.prevent="show4">
            <span class="label">职位类别</span>
            <p class="txt" v-if="allList.cate==''">选择职位类别</p>
            <p v-else>{{allList.cate}}</p>
          </div>
          <van-popup v-model="showCate" position="bottom" :lock-scroll="false">
            <van-picker
              show-toolbar
              title="职位类别"
              :columns="cateList"
              @cancel="onCancel"
              @confirm="setCate"
            />
          </van-popup>
          <!-- 职位类别 -->
          <!-- 公司规模 -->
          <div class="item" @touchend.prevent="show5">
            <span class="label">公司规模</span>
            <p class="txt" v-if="allList.scale==''">选择公司规模</p>
            <p v-else>{{allList.scale}}</p>
          </div>
          <van-popup v-model="showScale" position="bottom" :lock-scroll="false">
            <van-picker
              show-toolbar
              title="公司规模"
              :columns="scaleList"
              @cancel="onCancel"
              @confirm="setScale"
            />
          </van-popup>
          <!-- 公司规模 -->
          <!-- 职位描述 -->
          <div class="item" @click="edit">
            <span class="label">职位描述</span>
            <p v-if="text!=''">{{text}}</p>
            <p class="txt" v-else>输入岗位职责和要求、工作内容等</p>
          </div>
          <!-- 职位描述 -->
          <!-- 学历要求 -->
          <div class="item" @touchend.prevent="show2">
            <span class="label">学历要求</span>
            <p class="txt" v-if="allList.degree==''">请选择学历要求</p>
            <p v-else>{{allList.degree}}</p>
          </div>
          <van-popup v-model="showDegree" position="bottom">
            <van-picker
              show-toolbar
              title="学历要求"
              :columns="degreeList"
              @cancel="onCancel"
              @confirm="deg"
            />
          </van-popup>
          <!-- 学历要求 -->
          <!-- 工作年限 -->
          <div class="item" @touchend.prevent="show3">
            <span class="label">工作年限</span>
            <p class="txt" v-if="allList.work==''">请选择工作年限</p>
            <p v-else>{{allList.work}}</p>
          </div>
          <van-popup v-model="showWork" position="bottom">
            <van-picker
              show-toolbar
              title="工作年限"
              :columns="workList"
              @cancel="onCancel"
              @confirm="works"
            />
          </van-popup>
          <!-- 工作年限 -->
          <!-- 联系电话 -->
          <div class="item">
            <span class="label">招聘人员</span>
            <input type="text" placeholder="请输入联系人姓名" v-model="allList.contact">
          </div>
          <!-- 联系电话 -->
          <!-- 联系电话 -->
          <div class="item">
            <span class="label">联系电话</span>
            <input type="number" placeholder="请输入手机号码" v-model.number="allList.phone">
          </div>
          <!-- 联系电话 -->
          <!-- 选择全职或兼职 -->
          <div class="item">
            <van-radio-group v-model="allList.radio">
              <van-radio name="1" style="overflow-y:auto;">全职招聘</van-radio>
              <van-radio name="2" style="overflow-y:auto;">兼职招聘</van-radio>
            </van-radio-group>
          </div>
          <!-- 选择全职或兼职 -->
        </div>
        <!-- 发布按钮 -->
        <div class="release" @click="release">
          <p class="btn">发布</p>
        </div>
        <!-- 发布按钮 -->
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
  </div>
</template>

<script>
import Head2 from "@/components/Head2";
import { mapState, mapMutations } from "vuex";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast,Icon,RadioGroup, Radio,Checkbox, CheckboxGroup } from 'vant';
export default {
  data() {
    return {
      jobId: 0,
      title: "发布全职职位",
      show: false,
      checked: false,
      showpop: false,
      showDegree: false,
      showWork: false,
      showCate: false,
      showScale: false,
      showArea: false,
      city: false,
      areaData: "",
      area_c: [],
      area_p: [],
      id: -1,
      welfareList: [],
      degreeList: [
        {
          id: 1,
          text: "不限"
        },
        {
          id: 2,
          text: "职高"
        },
        {
          id: 3,
          text: "普高"
        },
        {
          id: 4,
          text: "大专"
        },
        {
          id: 5,
          text: "本科"
        },
        {
          id: 6,
          text: "硕士"
        },
        {
          id: 7,
          text: "博士"
        }
      ],
      workList: [
        {
          id: 1,
          text: "不限"
        },
        {
          id: 2,
          text: "1年以下"
        },
        {
          id: 3,
          text: "1-2年"
        },
        {
          id: 4,
          text: "3-4年"
        },
        {
          id: 5,
          text: "4-5年"
        },
        {
          id: 6,
          text: "5-10年"
        },
        {
          id: 7,
          text: "10年以上"
        }
      ],
      cateList: [],
      scaleList: [
        {
          id: 1,
          text: "20人以下"
        },
        {
          id: 2,
          text: "20-50人"
        },
        {
          id: 3,
          text: "50-100人"
        },
        {
          id: 4,
          text: "100-200人"
        },
        {
          id: 5,
          text: "200人以上"
        }
      ],
      allList: {
        name: "",
        min: "",
        max: "",
        phone: "",
        welfareList: [],
        configList: [],
        degree: "",
        degreeId: "",
        work: "",
        workId: "",
        cate: "",
        cateId: "",
        text: "",
        negotiable: 0,
        radio: "1",
        title: "",
        company: "",
        areaId: "",
        contact: "",
        scale: "",
        scaleId: "",
        address: ""
      }
    };
  },
  methods: {
    onCancel() {
      this.showpop = false;
      this.showDegree = false;
      this.showWork = false;
      this.showCate = false;
      this.showScale = false;
    },
    show1() {
      if (this.showpop) {
        this.showpop = false;
      } else {
        this.showpop = true;
      }
    },
    gets(i) {
      let ali = document.querySelectorAll(".ali");
      let index = this.allList.welfareList.indexOf(
        this.welfareList[i].label_name
      );
      if (index == -1) {
        this.allList.welfareList.push(this.welfareList[i].label_name);
        this.allList.configList.push(this.welfareList[i].id);
        ali[i].classList.add("active");
      } else {
        this.allList.welfareList.splice(index, 1);
        this.allList.configList.splice(index, 1);
        ali[i].classList.remove("active");
      }
    },
    show2() {
      if (this.showDegree) {
        this.showDegree = false;
      } else {
        this.showDegree = true;
      }
    },
    show3() {
      if (this.showWork) {
        this.showWork = false;
      } else {
        this.showWork = true;
      }
    },
    show4() {
      if (this.showCate) {
        this.showCate = false;
      } else {
        this.showCate = true;
      }
    },
    show5() {
      if (this.showScale) {
        this.showScale = false;
      } else {
        this.showScale = true;
      }
    },
    edit() {
      this.$router.push("/edit");
    },
    deg(value, index) {
      this.allList.degree = this.degreeList[index].text;
      this.allList.degreeId = this.degreeList[index].id;
      this.showDegree = false;
    },
    getConfig() {
      getInfoApi
        .getRecruitmentLabel()
        .then(res => {
          if (res.data.code === 200) {
            this.welfareList = res.data.data;
          }
        })
        .catch(err => console.log(err));
    },
    getCate() {
      getInfoApi
        .getJobCate()
        .then(res => {
          if (res.data.code === 200) {
            this.cateList = [];
            res.data.data.forEach(el => {
              this.cateList.push({
                text: el.name,
                id: el.id
              });
            });
            if (this.cateId != "") {
              this.cateList.forEach(el => {
                if (el.id == this.allList.cateId) {
                  this.allList.cate = el.text;
                }
              });
            }
          }
        })
        .catch(err => console.log(err));
    },
    setCate(value, index) {
      this.allList.cate = this.cateList[index].text;
      this.allList.cateId = this.cateList[index].id;
      this.showCate = false;
    },
    setScale(v, i) {
      this.allList.scale = this.scaleList[i].text;
      this.allList.scaleId = this.scaleList[i].id;
      this.showScale = false;
    },
    works(v, i) {
      this.allList.work = this.workList[i].text;
      this.allList.workId = this.workList[i].id;
      this.showWork = false;
    },
    showAreaList() {
      let params = {
        pid: 0
      };
      getInfoApi
        .getAllArea(params)
        .then(res => {
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
      this.allList.areaId = this.area_p[i].id;
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
      this.allList.areaId = this.allList.areaId + "," + this.area_c[i].id;
      this.showArea = false;
      this.city = false;
    },
    release() {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.checked) {
        this.allList.negotiable = 0;
      } else {
        this.allList.negotiable = 1;
      }
      if (this.allList.cate == "") {
        Toast("请选择职位类别");
      } else if (this.text == "") {
        Toast("请输入职位描述");
      } else if (
        this.allList.min == "" &&
        this.allList.max == "" &&
        !this.checked
      ) {
        Toast("请输入月薪");
      } else {
        if (this.allList.cate == "") {
          Toast("请选择职位类别");
        } else {
          if (this.allList.phone == "") {
            Toast("请输入联系方式");
          } else {
            if (!myreg.test(this.allList.phone)) {
              Toast("请输入正确的手机号码");
            } else {
              console.log(this.allList);
              let datas = this.allList;
              let data = {
                title: datas.title,
                intro: this.text,
                type: datas.radio,
                cate_id: datas.cateId,
                education: datas.degreeId,
                working_limit: datas.workId,
                company: datas.company,
                area: datas.areaId,
                address: datas.address,
                company_scale: datas.scale,
                mobile: datas.phone,
                discuss: datas.negotiable,
                username: datas.contact,
                label: datas.configList,
                monthly_pay_big: datas.max,
                monthly_pay_small: datas.min
              };
              if (this.jobId == 0) {
                setInfoApi
                  .addRecruitment(data)
                  .then(res => {
                    ;
                    if (res.data.code === 200) {
                      Toast(res.data.msg);
                      this.resetTxt();
                      this.$router.push(`/payRelease/5/${res.data.data.id}`);
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
                data = Object.assign(data, { id: this.jobId });
                setInfoApi.editRecruitment(data).then(res => {
                  if (res.data.code === 200) {
                    Toast(res.data.msg);
                    this.resetTxt();
                    this.$router.push(`/payRelease/5/${this.jobId}`);
                  } else if (res.data.code === 10003) {
                    Toast("身份验证已过期，请重新登录");
                    this.defined.removeToken();
                    this.$router.push("/log/1");
                  } else {
                    Toast(res.data.msg);
                  }
                });
              }
            }
          }
        }
      }
    },
    getData(i) {
      let params = {
        id: i
      };
      getInfoApi.getMyFindRecruitment(params).then(res => {
        if (res.data.code === 200) {
          ;
          let reg = RegExp("<.+?>", "g");
          let data = res.data.data;
          this.allList = {
            title: data.title,
            radio: data.type.toString(),
            cateId: data.cate_id,
            degreeId: data.education,
            workId: data.working_limit,
            company: data.company,
            areaId: data.area,
            address: data.address,
            scale: data.company_scale,
            phone: data.mobile,
            negotiable: data.discuss,
            contact: data.username,
            configList: [],
            welfareList: [],
            max: data.monthly_pay_big,
            min: data.monthly_pay_small,
          };
          let text = data.intro.replace(reg, "");
          this.setTxt(text);
          if (this.allList.negotiable == 0) {
            this.checked = true;
            this.allList.max = "";
            this.allList.min = "";
          } else {
            this.checked = false;
          }
          data.recruitment_label.forEach((el, index) => {
            this.allList.welfareList.push(el.label_name);
            this.allList.configList.push(el.id);
          });
          this.degreeList.forEach(el => {
            if (el.id == this.allList.degreeId) {
              this.allList.degree = el.text;
            }
          });
          this.workList.forEach(el => {
            if (el.id == this.allList.workId) {
              this.allList.work = el.text;
            }
          });
          this.scaleList.forEach(el => {
            if (el.id == this.allList.scaleId) {
              this.allList.scale = el.text;
            }
          });
          this.getCate();
          this.cateList.forEach(el => {
            if (el.id == this.allList.cateId) {
              this.allList.cate = el.text;
            }
          });
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
      });
    },
    ...mapMutations(["resetTxt", "setTxt"])
  },
  mounted() {
    this.show = true;
    this.getConfig();

    let index = this.$route.params.id;
    if (index != 0) {
      this.getData(index);
      this.jobId = index;
    } else {
      this.getCate();
    }
  },
  beforeDestroy() {
    this.resetTxt();
  },
  computed: {
    text() {
      return this.$store.state.text;
    }
  },
  components: {
    Head2,
    [Icon.name]:Icon,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio,
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup,
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  .wrap {
    padding: 0 40px;
    .item {
      padding: 40px 0;
      display: flex;
      align-items: center;
      font-size: 30px;
      border-bottom: 2px solid #e7e7e7;
      position: relative;
      .chk {
        position: absolute;
        right: 0;
      }
      .label {
        color: #666666;
        font-size: 30px;
        margin-right: 60px;
      }
      input {
        font-size: 30px;
        color: #323232;
      }
      p {
        color: #33383e;
      }
      .txt {
        color: #a3a3a3;
      }
    }
    .salary {
      input {
        width: 136px;
        height: 100%;
        background: #f8f9fb;
        padding-left: 20px;
      }
      span {
        font-size: 30px;
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
  }
  .release {
    padding: 28px 40px 28px;
    background: #f9f9f9;
    .btn {
      width: 100%;
      height: 80px;
      background: #ff704e;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 30px;
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