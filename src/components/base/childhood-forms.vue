
<template>
  <el-form :model="showModel" :rules="rules" ref="showModel" class="demo-form-inline demo-ruleForm">
    <el-form-item
      :label="item.label"
      :label-width="item.labelWidth ? item.labelWidth : '120px'"
      v-for="(item) in entity"
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
        v-model="showModel[item.key]"
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
        v-model="showModel[item.key]"
        :type="item.type"
        :disabled="item.disabled"
        :value-format="item.type === 'datetime' ? 'yyyy-MM-dd hh:MM:ss':'yyyy-MM-dd'"
        :placeholder="item.type === 'date' ? '选择日期':'选择时间'"
      ></el-date-picker>

      <el-input
        v-else
        :disabled="item.disabled"
        v-model="showModel[item.key]"
        @input="change(item)"
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
    model: { type: Object },
    showSearch: { type: Boolean },
    disabled: { type: Boolean }
  },
  data: () => ({
    showModel: {},
    rules: {},
    // 展开查询按钮
    showMore: false,
    // 验证是否通过
    isValid: true
  }),
  created() {
    this.initRules();
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      if (!this.model) {
        this.model = {};
      }

      this.showModel = { ...this.model };

      // 过滤查询按钮
      if (!this.showSearch) {
        this.setHeight(this.getMaxHeight());
        return;
      }

      const btn = { type: "search" };

      if (this.entity.length <= 2) {
        this.entity.push({ ...btn, showFold: true });
      } else {
        this.entity.splice(2, 0, btn);
      }
    },

    // 处理验证规则
    initRules() {
      this.entity.forEach(item => {
        if (item.rules) {
          this.rules[item.key] = item.rules;
        }
      });
      console.log("rules1", this.rules);
    },

    // 变化触发方法
    change(item) {
      if (item.expression) {
        item.expression(this.showModel);
      }
      this.$emit("change", this.showModel);
    },

    // 获取表单结果
    getResult() {
      if (!this.rules) {
        return this.showModel;
      }

      this.$refs["showModel"].validate(valid => {
        if (valid) {
          this.isValid = true;
        } else {
          console.warn("error submit!!");
          this.isValid = false;
          return false;
        }
      });

      if (this.isValid) {
        return this.showModel;
      } else {
        console.warn("数据验证失败，数据无法返回，请检查");
        return "数据验证失败，如果想取消验证，无需传入rules属性";
      }
    },
    // 查询触发事件
    search() {
      this.$emit("search", this.showModel);
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
      return !(this.entity.length % 3)
        ? parseInt(this.entity.length / 3) * 70
        : (parseInt(this.entity.length / 3) + 1) * 70;
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
