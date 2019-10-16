import * as types from "../mutation-types";
import api from "../../api/api.js";

const state = {
  testList: []
}

const getters = {
  getTestList: state => state.testList
}

const actions = {
  actTestList: function ({ commit }) {
    api.action('school_admintest.php', {}).then(({ data }) => {
      commit(types.Test, data)
    })
  }
}

const mutations = {
  [types.Test](state, data) {
    state.testList = data.data
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
