<template>
  <div>
    <Head :title="title"></Head>
    <transition name="fade2">
      <div id="main" v-show="show">
        <div class="form">
          <div class="card">
            <p class="title">用户头像：</p>
            <el-upload
              class="avatar-uploader"
              action="/api/thumbUpload"
              :on-success="avatarSuccess"
              :on-error="err"
              :show-file-list="false"
              :headers="headers"
            >
              <img v-if="user.head_portrait" :src="user.head_portrait" class="avatar">
              <van-icon name="photograph" v-else/>
            </el-upload>
          </div>
          <div class="card">
            <p class="title">手机号码：</p>
            <p>{{user.mobile}}</p>
          </div>
          <div class="card">
            <p class="title">用户名：</p>
            <input type="text" placeholder="请输入您的用户名" class="phone" v-model="user.username">
          </div>
          <div class="card">
            <p class="title">邮箱：</p>
            <input type="email" placeholder="请输入您的常用邮箱" class="phone" v-model="user.email">
          </div>
          <div class="card">
            <p class="title">性别：</p>
            <div>
              <el-radio v-model="user.sex" :label="1">男</el-radio>
              <el-radio v-model="user.sex" :label="2">女</el-radio>
            </div>
          </div>
          <div class="info-btn">
            <el-button type="warning" round @click="submit">确认保存</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Head from "@/components/Head";
import getInfoApi from "@/api/getInfo";
import setInfoApi from "@/api/setInfo";
import { Toast,Icon } from "vant";
export default {
  data() {
    return {
      title: "个人信息",
      show: false,
      fade: true,
      calendar: false,
      user: {
        head_portrait: "",
        sex: 0,
        username: "",
        email: ""
      },
      headers: null
    };
  },
  methods: {
    submit() {
      setInfoApi
        .setUser(this.user)
        .then(res => {
          ;
          Toast(res.data.msg);
          this.$router.go(-1);
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    },
    onRead(file) {
      this.src = file.content;
    },
    err(err,file){
      alert(JSON.stringify(file));
    },
    avatarSuccess(res, file) {
      if (res.code === 200) {
        this.user.head_portrait = res.src;
        Toast("头像设置成功");
      } else if (res.code === 10003) {
        Toast("身份已过期，请重新登录");
        this.defined.removeToken();
        this.$router.push("/");
      }
    },
    getUser() {
      getInfoApi
        .getUser()
        .then(res => {
          if (res.data.code === 200) {
            this.user = res.data.data;
            this.show = true;
            const tokens = JSON.parse(localStorage.getItem("tokens"));
            this.headers = {
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token
            };
          } else if (res.data.code === 10003) {
            Toast("身份已过期，请重新登录");
            this.defined.removeToken();
            this.$router.push("/");
          }
        })
        .catch(err => {
          this.$router.push('/notFound');
        });
    }
  },
  mounted() {
    this.getUser();
  },
  components: {
    Head,
    [Icon.name]:Icon
  }
};
</script>

<style scoped lang="less">
#main {
  padding-top: 90px;
  background: #f1f1f1;
  width: 100%;
  .form {
    margin-top: 20px;
    width: 100%;
    background: #fff;
    .card {
      height: 106px;
      display: flex;
      align-items: center;
      padding: 0 40px;
      color: #505050;
      border-bottom: 1px solid #e9e9e9;
      position: relative;
      justify-content: space-between;
      .title {
        font-size: 24px;
        margin-right: 30px;
      }
      .info {
        font-size: 22px;
      }
      .bind {
        position: absolute;
        right: 40px;
        display: flex;
        align-items: center;
      }
      .phone {
        text-align: right;
        position: absolute;
        right: 40px;
      }
      .operation {
        position: absolute;
        right: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          font-size: 22px;
          padding: 12px 20px;
          border: 1px solid #bbb;
          border-radius: 20px;
          color: #bbb;
        }
        .get {
          border-color: #ff8d1b;
          color: #ff8d1b;
        }
      }
      img {
        width: 60px;
        height: 60px;
      }
    }
    .info-btn {
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
</style>