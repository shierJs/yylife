<template>
  <div>
    <!-- 用户反馈 -->
    <div class="modal" v-show="feed">
      <div class="feedback">
        <i class="iconfont icon-guanbi1" @click="showFeed(false)"></i>
        <p class="title">关于沂源，我们还有很多希望与您交流</p>
        <div class="form">
          <div class="item">
            <span class="label">姓名：</span>
            <i-input v-model="username" placeholder="请输入您的姓名"/>
          </div>
          <div class="item">
            <span class="label">邮箱：</span>
            <i-input v-model="email" placeholder="请输入您的邮箱">
              <span slot="append">email</span>
            </i-input>
          </div>
          <div class="item">
            <span class="label">举报内容：</span>
            <i-input
              v-model="desc"
              type="textarea"
              placeholder="请描述您的举报原因"
              style="display:inline-block;"
            ></i-input>
          </div>
          <div class="item">
            <span class="label">相关图片：</span>
            <Upload @send="send" :upload="upload"></Upload>
          </div>
          <p class="submit" @click="submit">提交</p>
        </div>
      </div>
    </div>
    <!-- 用户反馈 -->
  </div>
</template>

<script>
import Upload from "./Upload";
import { mapState, mapMutations } from "vuex";
import setInfoApi from "@/api/setInfo";
export default {
  props: {
    type: {
      type: Number,
      default: 0
    },
    feed_id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      username: "",
      email: "",
      desc: "",
      imgList: []
    };
  },
  methods: {
    send(value) {
      //获取图片列表
      this.imgList = value;
    },
    submit() {
      let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (this.username == "") {
        this.$Message.info("请输入您的姓名");
      } else if (this.desc == "") {
        this.$Message.info("请输入举报原因说明");
      } else if (!re.test(this.email) && this.email != "") {
        this.$Message.info("请输入正确的邮箱格式");
      } else {
        let data = {
          type: this.type,
          feed_id: this.feed_id,
          username: this.username,
          content: this.desc,
          email: this.email,
          img: this.imgList
        };
        setInfoApi
          .report(data)
          .then(res => {
            ;
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg);
              this.clear();
            } else if (res.data.code === 10003) {
              this.$Message.info("请重新登录");
              this.defined.removeToken();
              this.clear();
            } else {
              this.$Message.info(res.data.msg);
            }
          })
          .catch(err => this.$router.push('/notFound'))
      }
    },
    clear() {
      this.showFeed(false);
      this.username = "";
      this.email = "";
      this.desc = "";
      this.imgList = [];
    },
    upload(file, data, list) {
      if (localStorage.getItem("webToken")) {
        let reader = new FileReader(); //html5读文件
        reader.readAsDataURL(file);
        reader.onload = e => {
          data.file = e.currentTarget.result;
          setInfoApi
            .uploadImg(data)
            .then(res => {
              if (res.data.code == 200) {
                list.push(res.data.src);
                this.$Message.success("上传成功");
              } else if (res.data.code === 10003) {
                this.$Message.info("身份验证已过期,请重新登录");
                this.defined.removeToken();
              } else {
                this.$Message.info(res.data.msg);
              }
            })
            .catch(err => this.$router.push('/notFound'))
        };
      } else {
        return;
      }
    },
    ...mapMutations(["showFeed"])
  },
  computed: {
    feed() {
      return this.$store.state.feed;
    }
  },
  components: {
    Upload
  }
};
</script>

<style scoped lang="less">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 112;
  .feedback {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 40px;
    background: #fff;
    .iconfont {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #999;
    }
    .iconfont:hover {
      cursor: pointer;
      color: #333;
    }
    .title {
      line-height: 70px;
      font-size: 18px;
      color: #333;
    }
    .form {
      .item {
        margin-bottom: 10px;
        .yanzhen {
          display: inline-block;
          img {
            height: 20px;
          }
        }
      }
      .label {
        display: inline-block;
        vertical-align: top;
      }
      .submit {
        display: inline-block;
        width: 120px;
        height: 40px;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        background: #b4a078;
        line-height: 40px;
        margin: 20px 93px;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
}
</style>