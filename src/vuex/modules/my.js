import * as types from '../mutation-types'
import api from '../../api/api'

const state = {
  sms: 0 // 登录验证码
};

const getters = {
  getSms: state => state.sms
};

const actions = {
  actSms: function ({ commit, dispatch, state }, params) {
    let _p = {
      mobile: params.phone
    };
    // api.getNewsList(_p).then(({ data }) => {
    //   commit(types.sms, data)
    // })
  }
};

const mutations = {
  [types.sms] (state, data) {
    state.sms = data
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
