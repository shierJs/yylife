<template>
  <div style="display:inline-block;" v-if="show">
    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
      <img :src="item">
      <div class="demo-upload-list-cover">
        <Icon type="ios-eye-outline" @click.native="view(item)"></Icon>
        <Icon type="ios-trash-outline" @click.native="remove(item)"></Icon>
      </div>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :headers="headers"
      :max-size="5120"
      :data="data"
      :on-exceeded-size="maxSize"
      :before-upload="beforeUpload"
      name="files"
      type="drag"
      :action="url"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="imgLarge" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import setInfoApi from "@/api/setInfo";
export default {
  props: {
    upload: {
      type: Function
    },
    imgArr: {
      type: Array
    }
  },
  data() {
    return {
      imgLarge: "",
      visible: false,
      uploadList: [],
      headers: {},
      data: {
        file: ""
      },
      url:"/api/thumbUpload",
      show: false
    };
  },
  methods: {
    view(file) {
      //查看大图
      this.imgLarge = file;
      this.visible = true;
      this.sendSrc();
    },
    remove(file) {
      //删除已经上传的图片
      const fileList = this.uploadList;
      this.uploadList.splice(fileList.indexOf(file), 1);
      this.sendSrc();
    },
    maxSize(file) {
      //大小超限
      this.$Notice.warning({
        title: "文件大小超过限制",
        desc: "文件  " + file.name + "太大,限制不超过2M"
      });
    },
    beforeUpload(file) {
      //文件上传之前
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多可上传5张图片"
        });
      } else {
        if (localStorage.getItem("webToken")) {
          this.upload(file, this.data, this.uploadList, this.sendSrc());
        } else {
          this.$Message.info("请先去登录");
          this.defined.removeToken();
          this.$router.push("/log/0");
        }
      }
      return false;
    },
    sendSrc() {
      this.$emit("send", this.uploadList);
    }
  },
  mounted() {
    this.show = true;
  },
  watch: {
    imgArr: {
      handler(val) {
        if (val) {
          val.forEach(el => {
            if(typeof(el) == 'string'){
              return;
            }else{
              this.uploadList.push(el.img);
              this.sendSrc();
            }
          });
        } else {
          this.uploadList = [];
        }
      },
      immediate: true,
    }
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
