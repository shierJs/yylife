<template>
  <div>
    <div id="desc" style="text-align:left;width:600px;"></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  props: {
    data: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editor: ""
    };
  },
  mounted() {
    this.editor = new E("#desc");
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "list", // 列表
      "justify", // 对齐方式
      "undo", // 撤销
      "redo", // 重复
      'image'
    ];
    this.editor.customConfig.onchange = html => {
      this.send(html);
    };
    this.editor.create();
  },
  methods: {
    send(data) {
      this.$emit("get", data);
    },
  },
  watch: {
    data(val){
      this.editor.txt.html(val);
    }
  }
};
</script>

<style scoped lang="less">
#desc {
  z-index: 4;
  .w-e-menu {
    z-index: 4 !important;
  }
}
</style>