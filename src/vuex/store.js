import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

import Test from "./modules/test";

Vue.use(Vuex);

export const store = new Vuex.Store({
  //  mutations 函数
  mutations,
  // 触发事件函数
  actions,
  // 取值函数
  getters,
  modules: {
    Test
  },
  // 开发使用严格模式
  strict: process.env.NODE_ENV !== "production"
});
