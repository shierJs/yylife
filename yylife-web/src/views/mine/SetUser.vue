<template>
  <div>
    <div>
      <div class="wrapper">
        <p class="head">修改资料</p>
        <div class="form-user">
          <div class="item">
            <span class="label">用户头像：</span>
            <Upload
              :on-success="handleSuccess"
              :show-upload-list="false"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :with-credentials="true"
              :headers="headers"
              type="drag"
              action="/api/thumbUpload"
              style="display: inline-block;width:58px;vertical-align: top;"
            >
              <div style="width: 58px;height:58px;line-height: 58px;" v-show="showUpload">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
              <div class="img" v-show="!showUpload">
                <img :src="user.head_portrait" alt>
              </div>
            </Upload>
          </div>
          <!-- 上传头像 -->
          <div class="item">
            <span class="label">手机号码：</span>
            <i-input v-model.number="user.mobile" placeholder="请输入手机号码" style="width: 200px"/>
          </div>
          <!-- 手机号码 -->
          <div class="item">
            <span class="label">用户名：&emsp;</span>
            <i-input v-model="user.username" placeholder="请输入您的用户名" style="width: 200px"/>
          </div>
          <!-- 用户名 -->
          <div class="item">
            <span class="label">邮箱：&emsp;&emsp;</span>
            <i-input
              v-model="user.email"
              placeholder="请输入您的常用邮箱"
              type="email"
              style="width: 200px"
            />
          </div>
          <!-- 邮箱 -->
          <div class="item">
            <span class="label">性别：&emsp;&emsp;</span>
            <RadioGroup v-model="user.sex">
              <Radio :label="1">男</Radio>
              <Radio :label="2">女</Radio>
            </RadioGroup>
          </div>
          <!-- 性别 -->
          <div class="item">
            <p class="btn" @click="submit">保存</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
export default {
  data() {
    return {
      user: {
        mobile: "",
        head_portrait: "",
        sex: 0,
        username: "",
        email: ""
      },
      headers: {
        accessToken: JSON.parse(localStorage.getItem("webToken")).access_token,
        refreshToken: JSON.parse(localStorage.getItem("webToken")).refresh_token
      },
      showUpload: true
    };
  },
  methods: {
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.$Message.success("头像上传成功");
        this.user.head_portrait = res.src;
        this.showUpload = false;
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: file.name + " 格式不正确，请选择jpg或png。"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超过限制",
        desc: "文件" + file.name + "太大，应不超过2M"
      });
    },
    getUser() {
      getInfoApi
        .getUser()
        .then(res => {
          if (res.data.code === 200) {
            this.user = res.data.data;
            if (this.user.head_portrait != "") {
              this.showUpload = false;
            } else {
              this.showUpload = true;
            }
          } else if (res.data.code === 10003) {
            this.$Message.info(res.data.msg);
            localStorage.removeItem("webToken");
            this.defined.removeToken();
          } else {
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => this.$router.push('/notFound'))
    },
    submit() {
      setInfoApi
        .setUser(this.user)
        .then(res => {
          ;
          if(res.data.code==200){
            this.$Message.success(res.data.msg);
            var timer=null;
            clearTimeout(timer);
            timer=setTimeout(()=>{
              this.$router.go(0);
            },500);
          }else{
            this.$Message.info(res.data.msg);
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style scoped lang="less">
.wrapper {
  background: #fff;
  border: 1px solid #ddd;
  min-height: 500px;
  .head {
    font-size: 20px;
    color: #b4a078;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #999;
  }
  .form-user {
    padding: 20px;
    .item {
      margin-bottom: 20px;
      .label {
        font-size: 14px;
      }
      .img {
        display: inline-block;
        border-radius: 6px;
        img {
          width: 57px;
          height: 57px;
        }
      }
      .btn {
        width: 120px;
        height: 40px;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        background: #b4a078;
        margin-top: 40px;
      }
      .btn:hover {
        cursor: pointer;
        background: #c2ad83;
      }
    }
  }
}
</style>