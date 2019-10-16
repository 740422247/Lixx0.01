<template>
  <div class="main">
    <StarSky :n="[12,8]" :starNum="50"></StarSky>
    <nav-row class="nav-top" @switchMenu="switchMenu" :switchFlag="switchFlag"></nav-row>

    <div class="content-container" :class="{tradition:switchFlag !==1,small:switchFlag === 3}">
      <div class="nav-left">
        <nav-slider :switchFlag="switchFlag"></nav-slider>
      </div>
      <div class="container">
        <transition name="fade" class="content" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NavRow from "@/components/nav/nav-row";
import NavSlider from "@/components/nav/nav-slider";
import StarSky from "@/components/starSky";

export default {
  data: () => ({
    switchFlag: 1
  }),
  components: {
    NavRow,
    NavSlider,
    StarSky
  },
  methods: {
    switchMenu() {
      this.switchFlag = this.switchFlag === 2 ? 1 : this.switchFlag + 1;
    }
  }
};
</script>

<style scoped>
.main {
  height: 100vh;
}
.nav-top {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.content-container {
  padding: 20px;
  display: flex;
  flex-direction: row;
  transition: all 0.5s ease;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
}
.content-container.tradition {
  padding: 0;
  transition: all 0.5s ease;
}
.content-container .container {
  height: auto;
  margin: 0 auto;
  flex: 1;
  overflow: hidden;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  border-radius: 4px;
  overflow: auto;
  /* transition: all 0.5s ease; */
}
.content-container.tradition .container {
  border-radius: 0;
  /* transition: all 0.5s ease; */
}
.content-container .nav-left {
  flex: 0 0 280px;
  padding-right: 20px;
  display: flex;
}
.content-container.tradition .nav-left {
  padding-right: 0;
  /* background: linear-gradient(180deg, #4574f1 0, #00abf3); */
  background-color: #00abf3;
}
.content-container.tradition.small .nav-left {
  flex: 0 0 64px;
}
</style>
