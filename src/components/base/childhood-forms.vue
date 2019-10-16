
<template>
  <el-form :model="model" :rules="rules" ref="model" class="demo-form-inline demo-ruleForm">
    <el-form-item
      :label="item.label"
      :label-width="item.labelWidth ? item.labelWidth : '120px'"
      v-for="(item) in showForms"
      :key="item.key"
      :prop="item.key"
      :class="item.className"
    >
      <div class="searchBtn" v-if="item.type === 'search'">
        <el-button type="text" icon="el-icon-arrow-down" @click="flod" v-if="!item.showFold">更多搜索条件</el-button>
        <el-button type="primary" plain @click="search">查询</el-button>
      </div>
      <el-select
        @change="change"
        :disabled="item.disabled"
        v-model="item.val"
        v-else-if="item.type === 'select'"
      >
        <el-option
          :label="opt.label"
          :value="opt.value"
          v-for="opt in item.options"
          :key="opt.value"
        ></el-option>
      </el-select>

      <el-date-picker
        @change="change"
        v-else-if="item.type === 'datetime' || item.type === 'date'"
        v-model="item.val"
        :type="item.type"
        :disabled="item.disabled"
        :value-format="item.type === 'datetime' ? 'yyyy-MM-dd hh:MM:ss':'yyyy-MM-dd'"
        :placeholder="item.type === 'date' ? '选择日期':'选择时间'"
      ></el-date-picker>

      <el-input
        v-else
        :disabled="item.disabled"
        v-model="model[item.key]"
        @input="change"
        auto-complete="off"
        :type="item.type ? item.type : 'text'"
        rows="3"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
// 备注：
// 1、entity模型参数：
// 2、model实体参数：
// 3、showSearch 是否显示“展开和查询按钮”
// 4、rules表单验证逻辑

export default {
  props: {
    entity: { type: Array },
    rules: { type: Object },
    model: { type: Object },
    showSearch: { type: Boolean },
    disabled: { type: Boolean }
  },
  data: () => ({
    showForms: [],
    showMore: false
  }),
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      if (!this.model) {
        this.model = {};
      }
      this.showForms = this.entity.map(item => {
        if (item.key === "search") {
          console.error("search为内置关键字，key值不能为search");
          return;
        }
        // this.model[item.key] = this.model[item.key] ? this.model[item.key] : "";
        return { ...item, val: this.model[item.key] };
      });

      // 过滤查询按钮
      if (!this.showSearch) {
        this.setHeight(this.getMaxHeight());
        return;
      }

      const btn = { type: "search" };

      if (this.showForms.length <= 2) {
        this.showForms.push({ ...btn, showFold: true });
      } else {
        this.showForms.splice(2, 0, btn);
      }
    },
    // 变化触发方法
    change() {
      this.$emit("change", this.getResult());
    },

    // 获取表单结果
    getResult() {
      let forms = {};
      this.showForms.forEach(item => {
        if (item.type != "search") {
          forms[item.key] = item.val;
        }
      });
      return forms;
    },
    // 查询触发事件
    search() {
      this.$emit("search", this.getResult());
    },
    // 展开效果
    flod() {
      if (!this.showMore) {
        this.setHeight(this.getMaxHeight());
      } else {
        this.setHeight(62);
      }
      this.showMore = !this.showMore;
    },
    // 获取最大高度
    getMaxHeight() {
      return (parseInt(this.showForms.length / 3) + 1) * 62;
    },
    // 设置搜索高度
    setHeight(num) {
      document
        .querySelector(".demo-form-inline")
        .setAttribute("style", `height:${num}px`);
    }
  }
};
</script>
<style scoped>
.searchBtn {
  display: flex;
  justify-content: space-between;
}
.demo-form-inline {
  height: 62px;
  transition: all 0.3s ease-in-out;
}

.is-2 {
  width: 66% !important;
}
.is-3 {
  width: 100% !important;
}
</style>
