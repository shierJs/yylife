<template>
  <div>
    <!-- 头部 -->
    <header id="head">
      <div class="arrow" @click="$router.go(-1)">
        <img src="/static/img/icon/arrowLeft.png" alt>
      </div>
      <h2>详情</h2>
      <div class="icon">
        <img src="/static/img/icon/up.png" alt>
        <img src="/static/img/icon/collection.png" alt>
        <img src="/static/img/icon/warn.png" alt @click="$router.push('/report')">
      </div>
    </header>
    <!-- 头部 -->
    <!-- 主体 -->
    <transition name="fade">
      <div id="main" v-show="show">
        <!-- 宠物信息 -->
        <div class="item">
          <div class="title">
            <img src="/static/img/floorImg03.jpg" alt @click="preview">
          </div>
          <div class="info-wrap">
            <div class="info">
              <h3>我是标题</h3>
            </div>
            <div class="browse">
              <img src="/static/img/icon/eye.png" alt>
              <span>1213</span>
            </div>
          </div>
        </div>
        <!-- 宠物信息 -->
        <!-- 宠物基本情况 -->
        <div class="situation">
          <div class="left">
            <p class="entry">
              服务类型：
              <span class="field">网络维修</span>
            </p>
            <p class="entry">
              服务地址：
              <span class="field">合肥市蜀山区五里墩地铁口</span>
            </p>
            <p class="entry">
              服务关键词：
              <span class="field">手机维修</span>
              <span class="field">修好收费</span>
              <span class="field">免费换屏</span>
            </p>
          </div>
        </div>
        <!-- 宠物基本情况 -->
        <!-- 宠物详情 -->
        <div class="position-desc">
          <h4 class="title">服务详情</h4>
          <div class="desc">
            <p class="content">
              我是详情巴拉巴拉巴拉吧啦吧啦吧吧巴拉巴拉巴拉巴巴拉巴拉巴拉吧啦吧啦吧吧巴拉巴拉巴
              拉巴巴拉巴拉巴拉吧啦吧啦吧吧巴拉巴拉巴拉巴巴拉巴拉巴拉吧啦吧啦吧吧巴拉巴拉巴拉巴
              巴拉巴拉巴拉吧啦吧啦吧吧巴拉巴拉巴拉巴巴拉巴拉巴拉吧啦吧啦吧吧巴拉巴拉巴拉巴巴拉
              巴拉巴拉吧啦吧啦吧吧巴拉巴拉巴拉巴巴拉巴拉巴拉吧啦吧啦吧吧巴拉巴拉巴拉巴巴拉巴拉
              巴拉吧啦吧啦吧吧巴拉巴拉巴拉巴巴拉巴拉巴拉吧啦吧啦吧吧巴拉巴拉巴拉巴巴拉巴拉巴拉
              吧啦吧啦吧吧巴拉巴拉巴拉巴巴拉巴拉巴拉吧啦吧啦吧吧巴拉巴拉巴拉巴
            </p>
          </div>
        </div>
        <!-- 宠物详情 -->
        <!-- 举报 -->
        <div class="report" @click="$router.push('/report')">
          <h5>如遇无效、虚假、诈骗信息、请立即举报</h5>
          <p>求职过程中请勿缴纳费用、谨防诈骗！若信息不实请举报</p>
          <div class="icon">
            <img src="/static/img/icon/jingdeng.png" alt>
            <span>举报</span>
          </div>
        </div>
        <!-- 举报 -->
      </div>
    </transition>
    <!-- 主体 -->
    <footer id="btn">
      <div class="chat">
        <el-button>嘟先生</el-button>
      </div>
      <div class="call">
        <el-button type="danger">
          <img src="/static/img/icon/call.png" alt>
          <span>电话</span>
        </el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import {ImagePreview} from "vant"
export default {
  data() {
    return {
      show: false,
      imgSrc:[
        "../../../static/img/floorImg03.jpg",
        "/static/img/raw_1473406264.png",
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png",
        "/static/img/raw_1472383377.jpeg",
        "/static/img/raw_1473406264.png"
      ]
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    preview() {
      ImagePreview({
        images: this.imgSrc,
        startPosition: 0,
        onClose() {
          // do something
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
#head {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #d4d2d4;
  position: fixed;
  padding: 0 20px;
  justify-content: space-between;
  top: 0;
  left: 0;
  z-index: 10;
  .arrow {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
    }
  }
  h2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 400;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 160px;
    height: auto;
    img {
      width: 40px;
    }
  }
}
#main {
  padding-top: 90px;
  padding-bottom: 100px;
  background: #d9d9d9;
  .title {
    height: 124px;
    line-height: 124px;
    font-size: 32px;
    color: #636363;
    padding: 0 40px;
  }
  .item {
    border-bottom: 1px solid #dadada;
    background: #fff;
    margin-bottom: 22px;
    .title {
      width: 100%;
      height: 312px;
      position: relative;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
    .info-wrap {
      padding: 20px 40px;
      position: relative;
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h3 {
          font-size: 40px;
          color: #6b6b6b;
        }
        .price {
          font-size: 40px;
          color: #ff5834;
          margin-top: 34px;
          span {
            font-size: 24px;
            margin-left: 30px;
            color: #515151;
          }
        }
      }
      .browse {
        position: absolute;
        bottom: 20px;
        right: 40px;
        display: flex;
        align-items: center;
        color: #898989;
        img {
          width: 32px;
          margin-right: 10px;
        }
      }
    }
  }
  .situation {
    background: #fff;
    padding: 68px 44px 46px;
    display: flex;
    margin-bottom: 22px;
    div {
      .entry {
        width: 100%;
        color: #a1a1a1;
        height: 52px;
        line-height: 52px;
        font-size: 24px;
        .field {
          color: #636363;
        }
      }
    }
  }
  .position-desc {
    background: #fff;
    margin-bottom: 24px;
    .desc {
      .content {
        padding: 26px 30px;
        font-size: 26px;
        color: #707070;
        border-top: 1px solid #707070;
        border-bottom: 1px solid #707070;
      }
    }
  }
  .report {
    background: #fff;
    margin-bottom: 24px;
    padding: 20px 40px;
    color: #6d6d6d;
    position: relative;
    h5 {
      font-size: 26px;
      margin-bottom: 8px;
    }
    p {
      font-size: 20px;
    }
    .icon {
      position: absolute;
      right: 40px;
      top: 50%;
      height: auto;
      width: auto;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
#btn {
  display: flex;
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  .call {
    width: 100%;
  }
}
</style>