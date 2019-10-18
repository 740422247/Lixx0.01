<template>
  <div class="childhood-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in menu"
        :key="item.label"
        :to="{path:item.path}"
      >{{item.label}}</el-breadcrumb-item>
    </el-breadcrumb>
    <child-btns :entity="actions" @action="action"></child-btns>
  </div>
</template>
<script>
import ChildBtns from "@/components/base/childhood-btns";
export default {
  name: "childBreadcrumb",
  components: { ChildBtns },
  props: {
    menu: { type: Array },
    actions: { type: Array }
  },
  methods: {
    action(key, item) {
      this.$emit("actionMethod", key, item);
    }
  }
};
</script>
<style scoped>
.childhood-breadcrumb {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.top-btns {
  padding: 0;
  margin: 0;
  position: inherit;
}
</style>
