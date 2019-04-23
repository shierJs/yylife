<template>
  <div>
    <Head2 :title="title"></Head2>
    <transition name="fade">
      <div id="main" v-show="show">
        <div class="wrap">
          <!-- 职位名称 -->
          <div class="item">
            <span class="label">店铺名称</span>
            <input type="text" placeholder="请输入名称" v-model="allList.name">
          </div>
          <!-- 职位名称 -->
          <!-- 店铺描述 -->
          <div class="item">
            <span class="label">店铺描述</span>
            <input type="text" placeholder="请输入店铺描述" v-model="allList.intro">
          </div>
          <!-- 店铺描述 -->
          <!-- 服务类别 -->
          <div class="item" @touchend.prevent="show4">
            <span class="label">店铺类别</span>
            <p class="txt" v-if="allList.cate==''">选择店铺类别</p>
            <p v-else>{{allList.cate}}</p>
          </div>
          <!-- 服务类别 -->
          <!-- 优惠信息 -->
          <div class="item">
            <span class="label">优惠信息</span>
            <input type="text" placeholder="请输入优惠信息" v-model="allList.prefer">
          </div>
          <!-- 优惠信息 -->
          <!-- 人均消费 -->
          <div class="item">
            <span class="label">人均消费</span>
            <input type="number" placeholder="请输入店铺人均消费" v-model.number="allList.consump">
            <span>元/位</span>
          </div>
          <!-- 人均消费 -->
          <!-- 所在区域 -->
          <div class="item" @touchend.prevent="showAreaList">
            <span class="label">所在区域</span>
            <p class="txt" v-if="areaData==''">请选择店铺所在区域</p>
            <p v-else>{{areaData}}</p>
          </div>
          <!-- 所在区域 -->
          <!-- 详细地址 -->
          <div class="item">
            <span class="label">详细地址</span>
            <input type="text" placeholder="请输入店铺详细地址" v-model="allList.address">
          </div>
          <!-- 详细地址 -->
          <!-- 详情描述 -->
          <div class="item" @click="edit">
            <span class="label">店铺详情</span>
            <p v-if="text!=''">{{text}}</p>
            <p class="txt" v-else>输入该类型广告的详细情况等</p>
          </div>
          <!-- 详情描述 -->
          <!-- 联系人 -->
          <div class="item">
            <span class="label">&emsp;联系人</span>
            <input type="text" placeholder="请输入店铺联系人" v-model="allList.contact">
          </div>
          <!-- 联系人 -->
          <!-- 联系电话 -->
          <div class="item">
            <span class="label">联系电话</span>
            <input type="number" placeholder="请输入手机号码" v-model.number="allList.phone">
          </div>
          <!-- 联系电话 -->
          <!-- 图片上传 -->
          <div class="upload">
            <p class="label">图片上传</p>
            <div class="imgList">
              <div class="wrap" v-for="(v,i) in imgSrc" :key="i">
                <van-icon name="close" @touchend.prevent="close(i)"/>
                <img :src="v" alt @click="preview(i)">
              </div>
              <van-uploader :after-read="onRead">
                <van-icon name="add-o"/>
              </van-uploader>
            </div>
          </div>
          <!-- 图片上传 -->
        </div>
        <!-- 发布按钮 -->
        <div class="release" @click="release">
          <p class="btn">发布</p>
        </div>
        <!-- 发布按钮 -->
        <!-- 弹出层 -->
        <van-popup v-model="showCate" position="bottom" :lock-scroll="false">
          <van-picker
            show-toolbar
            title="广告类别"
            :columns="cateList"
            @cancel="onCancel"
            @confirm="setCate"
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
        <!-- 弹出层 -->
      </div>
    </transition>
  </div>
</template>

<script>
import Head2 from "@/components/Head2";
import { mapState, mapMutations } from "vuex";
import { ImagePreview } from "vant";
import setInfoApi from "@/api/setInfo";
import getInfoApi from "@/api/getInfo";
import { Toast,Icon } from "vant";
export default {
  data() {
    return {
      shopId: 0,
      title: "店铺广告",
      show: false,
      showCate: false,
      showArea: false,
      city: false,
      areaData: "",
      imgSrc: [],
      area_p: [],
      area_c: [],
      id: -1,
      cateList: [
        "销售",
        "客服",
        "行政/人事/后勤",
        "餐饮",
        "旅游",
        "酒店",
        "美容/美发",
        "保健按摩",
        "运动健身",
        "普工/技工",
        "生产管理",
        "建筑"
      ],
      allList: {
        name: "",
        phone: "",
        cate: "",
        cateId: "",
        prefer: "",
        intro: "",
        consump: "",
        areaId: "",
        address: "",
        contact: ""
      }
    };
  },
  methods: {
    onCancel() {
      this.showCate = false;
    },
    show4() {
      if (this.showCate) {
        this.showCate = false;
      } else {
        this.showCate = true;
      }
    },
    onRead(file) {
      let data = {
        file: file.content
      };
      this.uploadImg(data, this.imgSrc);
    },
    uploadImg(data, list) {
      setInfoApi
        .uploadShopImg(data)
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
    close(i) {
      this.imgSrc.splice(i, 1);
      //注意：操作数据后，html中imgsrc不能是v-lazy，否则页面不会重新渲染
    },
    preview(i) {
      ImagePreview({
        images: this.imgSrc,
        startPosition: i,
        onClose() {
          // do something
        }
      });
    },
    getCate() {
      getInfoApi
        .getShopCate()
        .then(res => {
          if (res.data.code === 200) {
            this.cateList = [];
            res.data.data.forEach(el => {
              this.cateList.push({
                text: el.name,
                id: el.id
              });
            });
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
    edit() {
      this.$router.push("/edit");
    },
    setCate(v, i) {
      this.allList.cate = v.text;
      this.allList.cateId = v.id;
      this.showCate = false;
    },
    release() {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.allList.name == "") {
        Toast("店铺名称不能为空");
      } else if (this.allList.cateId == "") {
        Toast("请选择店铺类别");
      } else if (this.allList.areaId == "") {
        Toast("请选择店铺所在区域");
      } else if (this.allList.address == "") {
        Toast("店铺地址不能为空");
      } else if (this.text == "") {
        Toast("店铺详情不能为空");
      } else if (this.allList.contact == "") {
        Toast("联系人不能为空");
      } else if (this.allList.phone == "") {
        Toa("请填写联系方式");
      } else if (!myreg.test(this.allList.phone)) {
        Toast("请填写正确的手机号");
      } else {
        let data = {
          shop_name: this.allList.name,
          intro: this.allList.intro,
          cate_id: this.allList.cateId,
          area: this.allList.areaId,
          discounts: this.allList.prefer,
          address: this.allList.address,
          consumption: this.allList.consump,
          details: this.text,
          username: this.allList.contact,
          mobile: this.allList.phone,
          img: this.imgSrc
        };
        if (this.shopId == 0) {
          //添加数据
          setInfoApi
            .addShop(data)
            .then(res => {
              ;
              if (res.data.code === 200) {
                this.resetTxt();
                Toast(res.data.msg);
                this.$router.push(`/payRelease/6/${res.data.data.shop_id}`)
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
          data = Object.assign(data, { shop_id: this.shopId });
          setInfoApi.editShop(data).then(res => {
            ;
            if (res.data.code === 200) {
              this.resetTxt();
              Toast(res.data.msg);
              this.$router.push(`/payRelease/6/${this.shopId}`)
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
    },
    getData(i) {
      let params = {
        shop_id: i
      };
      getInfoApi.getMyFindShop(params).then(res => {
        if (res.data.code === 200) {
          let reg = RegExp("<.+?>", "g");
          let data = res.data.data;
          this.allList = {
            name: data.shop_name,
            intro: data.intro,
            cateId: data.cate_id,
            prefer: data.discounts,
            address: data.address,
            consump: data.consumption,
            contact: data.username,
            phone: parseInt(data.mobile),
            areaId: data.area
          };
          let text = data.details.replace(reg, "");
          this.setTxt(text);
          data.shop_img.forEach(el => {
            this.imgSrc.push(el.img);
          });
          this.cateList.forEach(el => {
            if (el.id == data.cate_id) {
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
    this.getCate();
    let index = this.$route.params.id;
    if (index != 0) {
      this.shopId = parseInt(index);
      this.getData(index);
    }
  },
  computed: {
    text() {
      return this.$store.state.text;
    }
  },
  components: {
    Head2,
    [Icon.name]:Icon
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  .wrap {
    padding: 0 40px;
    .item {
      height: 100px;
      display: flex;
      align-items: center;
      font-size: 30px;
      border-bottom: 2px solid #e7e7e7;
      .label {
        color: #666666;
        font-size: 30px;
        margin-right: 60px;
      }
      input {
        font-size: 30px;
        color: #323232;
        width: 62%;
      }
      p {
        color: #33383e;
        width: 73%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .txt {
        color: #757575;
      }
      .salary {
        input {
          width: 136px;
          height: 70px;
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
          position: absolute;
          top: 0;
          left: 0;
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
          padding: 120px 0 0 40px;
          display: flex;
          flex-wrap: wrap;
          li {
            width: 196px;
            height: 60px;
            margin-right: 40px;
            margin-bottom: 40px;
            border: 1px solid #a3a3a3;
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
      .cate {
        .list {
          padding-left: 20px;
          padding-top: 80px;
          height: 480px;
          li {
            height: 60px;
            line-height: 60px;
            font-size: 28px;
            color: #33383e;
            border-bottom: 1px solid #a3a3a3;
          }
        }
      }
    }
    .upload {
      border-bottom: 1px solid #aaa;
      .label {
        height: 120px;
        line-height: 120px;
        font-size: 30px;
        color: #515151;
      }
      .imgList {
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        .wrap {
          position: relative;
          width: 168px;
          height: 136px;
          margin-right: 20px;
          margin-bottom: 20px;
          overflow: hidden;
          img {
            width: 100%;
          }
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