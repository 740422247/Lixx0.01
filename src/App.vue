<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/reset-el.css";
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
html,
body,
#app {
  height: 100%;
}
/* 滚动条修改 */
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
::-webkit-scrollbar-track {
  width: 6px;
  background-color: #fff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/* 切换效果： */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* card修改 */
.box-card {
  margin: 20px;
}
.top-btns,
.top-filter {
  text-align: left;
}
.top-btns {
  padding-bottom: 15px;
  margin-bottom: 15px;
  position: relative;
}
.top-btns::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: -10px;
  right: -10px;
  border-bottom: 1px solid #ddd;
}
</style>
