<template>
  <div id="login-component">
    <h3 class="title">用户登陆</h3>
    <!-- <el-button-group class="login-select">
      <el-button>登陆</el-button>
      <el-button>注册</el-button>
    </el-button-group>-->
    <div>
      <label for="userName">用户名</label>
      <el-input id="userName" placeholder="请输入用户名" v-model="input" clearable></el-input>
    </div>
    <div>
      <label for="userPwd">密码</label>
      <el-input id="userPwd" type="password" placeholder="请输入密码" v-model="pwd" clearable></el-input>
    </div>
    <div style="justify-content:space-between">
      <el-checkbox v-model="isForget" label="记住密码" style="float:left"></el-checkbox>
      <!-- <el-button type="primary" style="width:120px;">登陆</el-button> -->
      <p>
        <span>忘记密码</span>？
        <span>注册</span>
      </p>
    </div>
    <div>
      <el-button @click="login()" type="primary" style="width:100%;">登陆</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    input: "",
    pwd: "",
    isForget: false
  }),
  methods: {
    login() {
      this.$router.push("/test");
    }
  }
};
</script>

<style scoped>
#login-component {
  z-index: 500;
  color: #fff;
  position: fixed;
  top: 50%;
  right: 20%;
  transform: translateY(-50%);
  width: 320px;
  height: 336px;
  border-radius: 4px;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
  padding: 16px 30px;
  background-color: rgba(255, 255, 255, 0.15);
}
/* 标题 */
.title {
  margin: 0;
  font-weight: 300;
}
/* 行信息 */
#login-component div {
  display: flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
}
#login-component div label {
  flex: 0 0 80px;
  text-align: left;
  padding-right: 12px;
  color: #fff;
}
#login-component div .el-input {
  flex: 1;
  margin-top: 0;
}
#login-component div span {
  cursor: pointer;
}
#login-component div span:hover {
  color: #409eff;
}
/* 顶部登陆、注册按钮 */
/* .login-select {
  width: 90%;
  margin: 0 auto;
}
.el-button-group.login-select .el-button--default {
  width: 50%;
} */
</style>
