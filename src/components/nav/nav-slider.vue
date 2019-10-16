<template>
  <div class="nav-slider">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="switchFlag === 3"
      v-for="(item) in menu"
      :key="item.label"
      :background-color="(switchFlag === 1) ? '' :'#00abf3'"
      :text-color="(switchFlag === 1) ? '' :'#fff'"
      :active-text-color="(switchFlag === 1) ? '' :'#4574f1'"
    >
      <el-submenu :index="item.fullPathId">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="(menuItem) in item.children" :key="menuItem.label">
          <el-menu-item
            :index="menuItem.fullPathId"
            @click="linkTo(menuItem.fullPathId)"
          >{{menuItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
    switchFlag: { type: Number }
  },
  data: () => ({
    uniqueOpen: true,
    openIndex: 1,
    menu: [
      {
        label: "基础管理",
        icon: "el-icon-upload",
        fullPathId: "1",
        children: [
          { label: "系统参数管理", fullPathId: "1-1" },
          { label: "字典信息", fullPathId: "1-2" },
          { label: "字典维护", fullPathId: "1-3" },
          { label: "字典关系管理", fullPathId: "1-4" }
        ]
      },
      {
        label: "权限管理",
        icon: "el-icon-date",
        fullPathId: "2",
        children: [
          { label: "专家库", fullPathId: "/experts" },
          { label: "用户管理", fullPathId: "2-1" },
          { label: "组织架构管理", fullPathId: "2-2" },
          {
            label: "菜单功能管理",
            fullPathId: "/menuManage"
          },
          { label: "功能角色管理", fullPathId: "2-4" }
        ]
      },
      {
        label: "流程中心",
        icon: "el-icon-menu",
        fullPathId: "3",
        children: [
          { label: "模板分类管理", fullPathId: "3-1" },
          { label: "流程模板管理", fullPathId: "3-2" },
          { label: "模板分类管理1", fullPathId: "3-11" },
          { label: "流程模板管理2", fullPathId: "3-22" },
          { label: "模板分类管理3", fullPathId: "3-13" },
          { label: "流程模板管理5", fullPathId: "3-25" },
          { label: "流程管理", fullPathId: "3-3" }
        ]
      }
    ]
  }),
  watch: {
    s() {
      console.log("----:", this.switchFlag);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log("init:", this.switchFlag);
    },
    linkTo(str) {
      this.$router.push(str);
    }
  }
};
</script>
<style scoped>
.nav-slider {
  background-color: #fff;
  flex: 1;
  border-radius: 4px;
  overflow: auto;
}
.el-submenu {
  text-align: left;
}
.el-submenu .el-menu-item {
  text-indent: 1em;
}
.content-container.tradition .nav-left .nav-slider,
.content-container.tradition .nav-left .nav-slider .el-menu {
  background-color: rgba(0, 0, 0, 0);
}
.content-container.tradition .nav-left .nav-slider .el-menu .el-submenu__title {
  color: #fff;
}
</style>
