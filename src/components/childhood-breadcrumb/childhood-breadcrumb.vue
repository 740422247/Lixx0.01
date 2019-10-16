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
  </div>
</template>
<script>
import ChildBtns from "@/components/base/childhood-btns";
export default {
  name: "childBreadcrumb",
  props: {
    menu: { type: Array }
  }
};
</script>
<style scoped>
.childhood-breadcrumb {
  padding: 20px;
}
</style>
