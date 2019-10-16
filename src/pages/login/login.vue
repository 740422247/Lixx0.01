<template>
  <div id="login">
    <StarSky :n="[12,8]" :starNum="50"></StarSky>
    <login-component></login-component>
  </div>
</template>
<script>
import StarSky from "@/components/starSky";
import LoginComponent from "@/components/login/login-component";

export default {
  data: () => ({}),
  components: { StarSky,LoginComponent }
};
</script>
<style scoped>
#login {
}
.starSky{
  z-index: 2 !important;
}
</style>
