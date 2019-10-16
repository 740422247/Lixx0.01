import * as types from "../mutation-types";
import api from "../../api/api";

const state = {
  token: "guest", // 登录验证码
  APPID: "Q1",
  baseParams: {},
  userInfo: null
};

const getters = {
  getToken: state => state.token,
  getUserInfo: state => state.userInfo
};

const actions = {
  actToken: function ({ commit, dispatch, state }, params) {
    if (!state.token || state.token === "guest") {
      api
        .action({ ...params, TOKEN: state.token, APPID: state.APPID })
        .then(({ data }) => {
          commit(types.token, data);
        });
    }
  },
  initApp: function ({ commit, dispatch, state }, params) {
    commit(types.initToken);
  },
  actLogin: function ({ commit, state }, params) {
    api
      .action({ ...params, ...state.baseParams })
      .then(({ data }) => commit(types.login, data.Data));
  },
  actResetPwd: ({ commit, dispatch, state }, params) => {
    api.action({ ...state.baseParams, ...params })
      .then(({ data }) => commit(types.resetPwd, data))
  }
};

const mutations = {
  [types.token](state, data) {
    state.token = data.Data.TOKEN;
    state.baseParams = { TOKEN: state.token, APPID: state.APPID };
  },
  [types.initToken](state) {
    state.token = "guest";
    state.baseParams = { TOKEN: state.token, APPID: state.APPID };
    state.userInfo = {};
  },
  [types.login](state, data) {
    if (!state.userInfo) {
      state.userInfo = data;
    }
    state.baseParams = { ...state.baseParams, TOKEN: data.TOKEN };
    state.TOKEN = data.TOKEN;
  },
  [types.resetPwd](data) {
    console.log(data)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
