<template>
  <div class="common-breadcrumb">
    <breadcrumb :menu="menu"></breadcrumb>
  </div>
</template>
<script>
import Breadcrumb from "@/components/childhood-breadcrumb/childhood-breadcrumb";
export default {
  components: { Breadcrumb },
  props: {
    subMenus: { type: Array }
  },
  data: () => ({
    menu: [{ label: "权限管理", path: "" }]
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.menu = this.menu.concat(this.subMenus);
    }
  }
};
</script>
