<template>
  <Table :height="h" :columns="columns" :data="data" :loading="loading">
    <template slot-scope="{ row, index }" slot="release">
      <Button type="primary" size="small" style="margin-right: 5px" v-show="row.publish == 0" @click="show(row,index)">查看详情</Button>
      <Button type="error" v-show="row.status== '已失效'" size="small" @click="release(row,index)">重新发布</Button>
      <Button type="error" v-show="row.publish == 1" size="small" @click="release(row,index)">发布</Button>
    </template>
  </Table>
</template>
<script>
export default {
  props: {
    columns1: {
      type: Array,
      default: function() {
        return [
          {
            title: "商品标题",
            key: "title"
          },
          {
            title: "商品描述",
            key: "desc"
          }
        ]
      }
    },
    data: {
      type: Array
    },
    control: {
      type: String,
      default: "编辑"
    },
    showColumns: {
      type: Number,
      default: 1
    },
    loading: {
      type: Boolean,
      default: true
    },
    h:{
      type:String,
      default:"400"
    }
  },
  data() {
    return {
      columns: [
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", {
                domProps: {
                  innerHTML: this.control
                },
                style: {
                  fontSize: "14px",
                  color: "#6699CC",
                  cursor: "pointer"
                },
                on: {
                  click: e => {
                    this.edits(params);
                  }
                }
              }),
              h("span", {
                domProps: {
                  innerHTML: "删除"
                },
                style: {
                  marginLeft: "20px",
                  fontSize: "14px",
                  color: "#6699CC",
                  cursor: "pointer",
                  display:(params.row.publish == 0 && params.row.status !='已失效')?'none':'inline',
                },
                on: {
                  click: e => {
                    this.remove(params.index);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "发布详情",
          slot: "release",
          width: 200,
          align: "center"
        }
      ]
    };
  },
  created() {
    if (this.showColumns == 1) {
      this.columns = this.columns1.concat(this.columns);
    } else {
      this.columns = this.columns1;
    }
  },
  methods: {
    show(params) {
      this.$emit("detail", params);
    },
    release(params){
      this.$emit("release",params);
    },
    edits(params){
      this.$emit('edit',params.row);
    },
    remove(index) {
      this.$emit("del", index);
    },
  }
};
</script>
