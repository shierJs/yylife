<template>
  <div>
    <div class="wrapper">
      <Tabs>
        <TabPane :label="info" class="tab1">
          <div class="none">
            <div class="none-icon"></div>
            <p>当前无可用优惠券</p>
          </div>
        </TabPane>
        <TabPane :label="express">
          <div class="none">
            <div class="none-icon"></div>
            <p>当前无可用优惠券</p>
          </div>
        </TabPane>
        <TabPane :label="interaction">
          <div class="none">
            <div class="none-icon"></div>
            <p>当前无可用优惠券</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: h => {
        return h("div", [
          h("span", "未使用"),
          h("Badge", {
            props: {
              dot: false,
              offset: [-11, -4]
            }
          })
        ]);
      },
      express: h => {
        return h("div", [
          h("span", {
            domProps: {
              innerHTML: "已使用"
            }
          }),
          h("Badge", {
            props: {
              dot: false,
              offset: [-11, -4]
            }
          })
        ]);
      },
      interaction: h => {
        return h("div", [
          h("span", "已失效"),
          h("Badge", {
            props: {
              dot: false,
              offset: [-11, -4]
            }
          })
        ]);
      }
    };
  }
};
</script>

<style scoped lang="less">
.wrapper {
  background: #fff;
  height: 460px;
  border: 1px solid #ddd;
  .ivu-tabs {
    height: 100%;
    .ivu-tabs-content {
      .none {
        .none-icon {
          width: 368px;
          height: 368px;
          background: url("../../../static/img/material/sprite.png") no-repeat 0 -1840px;
          margin: 0 auto;
          transform: scale(0.5);
          margin-top: -18px;
        }
        p {
          font-size: 16px;
          text-align: center;
          margin-top: -70px;
          color: #999;
        }
      }
    }
  }
}
</style>