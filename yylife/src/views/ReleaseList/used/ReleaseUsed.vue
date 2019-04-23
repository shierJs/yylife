<template>
  <div>
    <Head :title="title"></Head>
    <transition name="fade">
      <div id="main" v-show="show">
        <!-- 分类弹出层 -->
        <van-popup v-model="showCate" position="bottom">
          <van-picker
            show-toolbar
            title="物品分类"
            :columns="cateList"
            @cancel="onCancel"
            @confirm="selCate"
          />
        </van-popup>
        <!-- 分类弹出层 -->
        <!-- 新旧程度弹出层 -->
        <van-popup v-model="showOld" position="bottom">
          <van-picker
            show-toolbar
            title="新旧程度"
            :columns="oldList"
            @cancel="onCancel"
            @confirm="selOld"
          />
        </van-popup>
        <!-- 新旧程度弹出层 -->
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
        <!-- 上传图片 -->
        <Upload @get="get" :uploadImg="uploadImg" :imgList="form.imgSrc"></Upload>
        <!-- 上传图片 -->
        <div class="form">
          <div class="info">
            <div class="name">
              <span class="label">宝贝标题</span>
              <input type="text" placeholder="填写品牌型号更容易被买家搜到" v-model="form.name">
            </div>
            <div class="desc">
              <p class="title">输入宝贝描述</p>
              <textarea
                cols="30"
                rows="5"
                v-model="form.desc"
                placeholder="描述一下宝贝来源，新旧程度，型号/尺码等，可以让宝贝更快卖出~"
              ></textarea>
            </div>
          </div>
          <div class="list">
            <div class="cate" @click="showCate=true">
              <span class="label">分&emsp;&emsp;类</span>
              <span class="label">{{form.cate}}</span>
            </div>
            <div class="wraps">
              <span class="label">卖&emsp;&emsp;价</span>
              <input type="text" v-model="form.ask" :disabled="discuss" placeholder="请输入宝贝卖价">
              <span>元</span>
              <van-switch inactive-color="#f44" v-model="discuss"/>
              <span>面议</span>
            </div>
            <div class="cate" @click="showOld=true">
              <span class="label">新旧程度</span>
              <span class="label">{{form.old}}</span>
            </div>
            <div class="wraps">
              <span class="label">提货方式</span>
              <van-radio-group v-model="form.deal">
                <van-radio name="1">快递</van-radio>
                <van-radio name="2">自提</van-radio>
              </van-radio-group>
            </div>
            <div class="cate" @click="showAreaList">
              <span class="label">选择地区</span>
              <span class="label">{{areaData}}</span>
            </div>
            <div class="wraps">
              <span class="label">详细地址</span>
              <input class="input" type="text" v-model="form.address" placeholder="请输入您的详细地址">
            </div>
            <div class="wraps">
              <span class="label">姓&emsp;&emsp;名</span>
              <input class="input" type="text" v-model="form.contact" placeholder="请输入您本人的姓名">
            </div>
            <div class="wraps">
              <span class="label">联系电话</span>
              <input class="input" type="number" v-model="form.phone" placeholder="请输入您的联系电话">
            </div>
          </div>
          <div class="btn">
            <el-button type="danger" @click="submit">发布</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head2";
import Upload from "@/components/Upload";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast,Icon,RadioGroup, Radio } from 'vant';
export default {
  data() {
    return {
      usedId: 0,
      title: "二手物品发布",
      show: false,
      showCate: false,
      showOld: false,
      showArea: false,
      city: false,
      discuss: false,
      areaData: "请选择所在地区",
      form: {
        imgSrc: [],
        name: "",
        desc: "",
        cate: "请选择物品分类",
        cateId: 0,
        ask: "",
        old: "请选择物品新旧程度",
        oldId: 0,
        areaId: "",
        address: "",
        deal: 1,
        contact: "",
        phone: "",
        discuss: 1
      },
      cateList: [],
      oldList: [
        {
          text: "全新",
          id: 1
        },
        {
          text: "95新",
          id: 2
        },
        {
          text: "9成新",
          id: 3
        },
        {
          text: "85新新",
          id: 4
        },
        {
          text: "8成新",
          id: 5
        }
      ],
      area_p: [],
      area_c: []
    };
  },
  methods: {
    submit() {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.discuss) {
        this.form.discuss = 0;
      } else {
        this.form.discuss = 1;
      }
      if (this.form.imgSrc.length <= 0) {
        Toast("请上传图片");
      } else {
        if (myreg.test(this.form.phone)) {
          let data = {
            used_title: this.form.name,
            intro: this.form.desc,
            cate_id: this.form.cateId,
            selling_price: this.form.ask,
            old: this.form.oldId,
            address: this.form.address,
            area: this.form.areaId,
            deal_type: this.form.deal,
            discuss: this.form.discuss,
            img: this.form.imgSrc,
            username: this.form.contact,
            mobile: this.form.phone
          };
          if (this.usedId == 0) {
            setInfoApi
              .addUsed(data)
              .then(res => {
                ;
                if (res.data.code === 200) {
                  Toast(res.data.msg);
                  this.$router.push(`/payRelease/3/${res.data.data.used_id}`);
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
            data = Object.assign(data, { used_id: this.usedId });
            setInfoApi
              .editUsed(data)
              .then(res => {
                if (res.data.code === 200) {
                  Toast(res.data.msg);
                  this.$router.push(`/payRelease/3/${this.usedId}`);
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
      }
    },
    onCancel() {
      this.showCate = false;
      this.showOld = false;
    },
    selCate(v, i) {
      this.form.cate = v.text;
      this.form.cateId = v.id;
      this.showCate = false;
    },
    selOld(v) {
      this.form.old = v.text;
      this.form.oldId = v.id;
      this.showOld = false;
    },
    getCate() {
      getInfoApi
        .getUsedCate()
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.cateList = [];
            res.data.data.forEach(el => {
              this.cateList.push({
                text: el.name,
                id: el.id
              });
            });
            if (this.form.cateId != 0) {
              this.cateList.forEach(el => {
                if (el.id == this.form.cateId) {
                  this.form.cate = el.text;
                }
              });
            }
          }
        })
        .catch(err => console.log(err));
    },
    get(value) {
      this.form.imgSrc = value;
    },
    uploadImg(data, list, send) {
      setInfoApi
        .uploadUsedImg(data)
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
      this.form.areaId = this.area_p[i].id;
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
      this.form.areaId = this.form.areaId + "," + this.area_c[i].id;
      this.showArea = false;
      this.city = false;
    },
    getData(i) {
      let params = {
        used_id: i
      };
      getInfoApi.getMyFindUsed(params).then(res => {
        if (res.data.code === 200) {
          ;
          let reg = RegExp("<.+?>", "g");
          let data = res.data.data;
          this.form = {
            name: data.used_title,
            cateId: data.cate_id,
            ask: data.selling_price,
            oldId: data.old,
            address: data.address,
            areaId: data.area,
            deal: data.deal_type.toString(),
            discuss: data.discuss,
            imgSrc: [],
            contact: data.username,
            phone: data.mobile,
            cate: ""
          };
          let text = data.intro.replace(reg, "");
          this.form.desc = text;
          data.used_img.forEach(el => {
            this.form.imgSrc.push(el.img);
          });
          this.getCate();
          if (this.form.discuss == 0) {
            this.discuss = true;
          } else {
            this.discuss = false;
          }
          if (data.area_id == 23) {
            this.areaData = "沂源周边乡镇";
          } else {
            this.areaData = "沂源县城区-" + data.area_name;
          }
          data.used_img.forEach(el => {
            this.form.imgSrc.push(el.img);
          });
        } else if (res.data.code === 10003) {
          Toast("身份验证已过期，请重新登录");
          this.defined.removeToken();
          this.$router.push("/log/1");
        } else {
          Toast(res.data.msg);
        }
      });
    }
  },
  mounted() {
    let index = this.$route.params.id;
    if (index != 0) {
      this.getData(index);
      this.usedId = index;
    }else{
      this.getCate();
    }
    this.show = true;
  },
  components: {
    Head,
    Upload,
    [Icon.name]:Icon,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio,
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  background: #f4f4f4;
  .upload {
    width: 100%;
    height: 528px;
    display: flex;
    align-items: center;
    justify-content: center;
    .photo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 206px;
      height: 206px;
      border-radius: 103px;
      background: #b5b5b5;
      p {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .form {
    width: 100%;
    color: #505050;
    font-size: 28px;
    .info {
      padding: 0 26px;
      background: #fff;
      padding-bottom: 48px;
      .name {
        height: 96px;
        border-bottom: 1px solid #a8a8a8;
        display: flex;
        align-items: center;
        input {
          margin-left: 20px;
          width: 80%;
          height: 80%;
        }
      }
      .desc {
        .title {
          height: 96px;
          line-height: 96px;
        }
        textarea {
          width: 100%;
        }
      }
    }
    .list {
      margin: 40px 0;
      background: #fff;
      .wraps {
        height: 108px;
        line-height: 108px;
        padding: 0 40px;
        border-top: 1px solid #e3e3e3;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          width: 44%;
          height: 106px;
          padding-left: 40px;
          margin-left: 4px;
        }
      }
      .input {
        width: 82%;
      }
      .cate {
        height: 108px;
        line-height: 108px;
        padding: 0 40px;
        border-top: 1px solid #e3e3e3;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .btn {
      width: 100%;
      background: #fff;
      height: 112px;
      display: flex;
      align-items: center;
      justify-content: center;
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