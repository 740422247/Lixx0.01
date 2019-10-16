<template>
  <div class="nav-row">
    <div class="container">
      <span class="logo">Logo</span>
      <span class="switch" @click="switchMenu" title="风格切换">
        <i class="el-icon-menu"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    switchFlag: { type: Number }
  },
  data: () => ({}),
  mounted() {
    console.log(this.switchFlag);
  },
  methods: {
    switchMenu() {
      this.$emit("switchMenu");
    }
  }
};
</script>

<style scoped>
.nav-row {
  height: 60px;
  padding: 0;
  margin: 0;
  background: linear-gradient(90deg, #4574f1 0, #00abf3);
}
.container {
  min-width: 1280px;
  height: 100%;
  margin: 0 auto;
  font: 0;
  color: #fff;
  text-align: left;
  padding: 0 20px;
}
.nav-row .container span {
  display: inline-block;
  height: 60px;
  width: 80px;
  line-height: 60px;
}
.nav-row .container .logo {
  width: 120px;
}
</style>
