<template>
  <div>
    <Head2 :title="title"></Head2>
    <transition name="fade">
      <div id="main" v-show="show">
        <div class="wrap">
          <!-- 职位名称 -->
          <div class="item">
            <span class="label">服务标题</span>
            <input type="text" placeholder="请输入标题" v-model="allList.name">
          </div>
          <!-- 职位名称 -->
          <!-- 服务类别 -->
          <div class="item" @touchend.prevent="show4">
            <span class="label">服务类别</span>
            <p class="txt" v-if="allList.cate==''">选择服务类别</p>
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
          <!-- 服务类别 -->
          <!-- 标签 -->
          <div class="item" @touchend.prevent="show1">
            <span class="label">服务标签</span>
            <p v-if="!allList.welfareList.length" class="txt">生活服务的标签</p>
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
                <p class="title">标签（可多选）</p>
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
          <!-- 标签 -->
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
          <!-- 详情描述 -->
          <div class="item" @click="edit">
            <span class="label">服务详情</span>
            <p v-if="text!=''">{{text}}</p>
            <p class="txt" v-else>输入该服务类型详细情况等</p>
          </div>
          <!-- 详情描述 -->
          <!-- 联系人 -->
          <div class="item">
            <span class="label">联系人&emsp;</span>
            <input type="text" placeholder="请输入联系人姓名" v-model="allList.contact">
          </div>
          <!-- 联系人 -->
          <!-- 联系电话 -->
          <div class="item">
            <span class="label">联系电话</span>
            <input type="text" placeholder="请输入手机号码" v-model="allList.phone">
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
import { Toast,Icon } from "vant";
export default {
  data() {
    return {
      lifeId:0,
      title: "发布生活服务",
      show: false,
      showCate: false,
      showpop: false,
      showArea: false,
      city: false,
      areaData: "",
      area_c: [],
      area_p: [],
      imgSrc: [],
      id: -1,
      cateList: [],
      allList: {
        name: "",
        phone: "",
        cate: "",
        text: "",
        areaId: "",
        cateId: "",
        contact: "",
        address: "",
        welfareList: [],
        configList: []
      },
      welfareList: []
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
    show1() {
      if (this.welfareList.length) {
        if (this.showpop) {
          this.showpop = false;
        } else {
          this.showpop = true;
        }
      } else {
        if(this.allList.cate == ""){
          Toast("请先选择服务类别");
        }else{
          Toast("当前类别无标签");
        }
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
    getCate() {
      getInfoApi
        .getLifeCate()
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
    getConfig(id) {
      let params = {
        cate_id: id
      };
      getInfoApi
        .getServiceLabel(params)
        .then(res => {
          ;
          if (res.data.code === 200) {
            this.welfareList = res.data.data;
            this.allList.welfareList=[];
            this.allList.configList=[];
          }
        })
        .catch(err => console.log(err));
    },
    onRead(file) {
      let data = {
        file: file.content
      };
      this.uploadImg(data, this.imgSrc);
    },
    uploadImg(data, list) {
      setInfoApi
        .uploadLifeImg(data)
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
    edit() {
      this.$router.push("/edit");
    },
    setCate(v, i) {
      this.allList.cate = v.text;
      this.allList.cateId = v.id;
      this.getConfig(v.id);
      this.showCate = false;
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
      if (this.allList.name == "") {
        Toast("标题不能为空");
      } else if (this.allList.cateId == "") {
        Toast("请选择服务类别");
      } else if (this.allList.areaId == "") {
        Toast("请选择地区");
      } else if (this.allList.configList.length == 0 && this.welfareList.length != 0) {
        Toast("请选择服务标签");
      } else if (this.allList.address == "") {
        Toast("详细地址不能为空");
      } else if (this.text == "") {
        Toast("详细信息不能为空");
      } else if (this.allList.contact == "") {
        Toast("联系人不能为空");
      } else if (this.allList.phone == "") {
        Toast("手机号码不能为空");
      } else if (!myreg.test(this.allList.phone)) {
        Toast("请输入正确的手机号码");
      } else {
        let data1 = this.allList;
        let data = {
          service_title: data1.name,
          cate_id: data1.cateId,
          username: data1.contact,
          mobile: data1.phone,
          area: data1.areaId,
          address: data1.address,
          intro: this.text,
          img: this.imgSrc,
          label: data1.configList,
        };
        if(this.lifeId == 0){
          setInfoApi
          .addService(data)
          .then(res => {
            ;
            if (res.data.code === 200) {
              Toast(res.data.msg);
              this.resetTxt();
              this.$router.push(`/payRelease/4/${res.data.data.service_id}`);
            } else if (res.data.code === 10003) {
              Toast("身份验证已过期，请重新登录");
              this.defined.removeToken();
              this.$router.push("/log/1");
            } else {
              Toast(res.data.msg);
            }
          })
          .catch(err => console.log(err));
        }else{
          data=Object.assign(data,{service_id:this.lifeId});
          setInfoApi.editService(data).then(res=>{
            if (res.data.code === 200) {
              Toast(res.data.msg);
              this.resetTxt();
              this.$router.push(`/payRelease/4/${this.lifeId}`);
            } else if (res.data.code === 10003) {
              Toast("身份验证已过期，请重新登录");
              this.defined.removeToken();
              this.$router.push("/log/1");
            } else {
              Toast(res.data.msg);
            }
          }).catch(err=>console.log(err));
        }
      }
    },
    getData(i) {
      let params = {
        service_id: i
      };
      getInfoApi
        .getMyFindService(params)
        .then(res => {
          if (res.data.code === 200) {
            let reg = RegExp("<.+?>", "g");
            let data = res.data.data;
            this.allList={
              name:data.service_title,
              cateId:data.cate_id,
              contact:data.username,
              phone:data.mobile,
              areaId:data.area,
              address:data.address,
              configList:[],
              welfareList:[],
              service_id:data.service_id,
            };
            let text = data.intro.replace(reg, "");
            this.setTxt(text);  
            this.cateList.forEach(el=>{
              if(el.id == this.allList.cateId){
                this.allList.cate=el.text;
              }
            });
            data.service_label.forEach(el=>{
              this.allList.welfareList.push(el.label_name);
              this.allList.configList.push(el.id);
            });
            data.service_img.forEach(el=>{
              this.imgSrc.push(el.img);
            });
            if (data.area_id == 23) {
              this.areaData = "沂源周边乡镇";
            } else {
              this.areaData = "沂源县城区-" + data.area_name;
            };
          } else if (res.data.code === 10003) {
            Toast("身份验证已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/log/1");
          } else {
            Toast(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    ...mapMutations(["resetTxt",'setTxt'])
  },
  mounted() {
    this.getCate();
    let index = this.$route.params.id;
    if(index != 0){
      this.getData(index);
      this.lifeId=index;
    };
    this.show = true;
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
      height: 144px;
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
      }
      p {
        color: #33383e;
        width: 73%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .txt {
        color: #a3a3a3;
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