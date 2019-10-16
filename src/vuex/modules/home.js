import * as types from "../mutation-types";
import api from "../../api/api.js";
import commonStore from "./common";

const state = {
  topPlayList: [],
  catList: [],
  detailInfo: {},
  family: []
};

const getters = {
  getCatList: state => state.catList,
  getTopPlayList: state => state.topPlayList,
  getDetailInfo: state => state.detailInfo,
  getFamily: state => state.family
};

const actions = {
  actCatList: function ({ commit, dispatch, state }, params) {
    let _p = { ...params };
    api.getCatList(_p).subscribe(res => {
      commit(types.getCatList, res.sub);
    });
  },
  actTopPlayList: function ({ commit, dispatch, state }, params) {
    let _p = { ...params };
    api.getTopPlayList(_p).subscribe(res => {
      commit(types.getTopPlayList, res.playlists);
    });
  },
  actDetailInfo: function ({ commit }, params) {
    api
      .action({ ...commonStore.state.baseParams, ...params })
      .then(({ data }) => commit(types.detailInfo, data));
  },
  actFamily: function ({ commit, dispatch, state }, params) {
    api.action({ ...commonStore.state.baseParams, ...params })
      .then(({ data }) => commit(types.family, data))
  },
  actDelete: function ({ commit, state }, params) {
    api.action({ ...commonStore.state.baseParams, ...params })
      .then(({ data }) => {
        if (data.Code === 1) {
          for (var i = 0; i < state.family.length; i++) {
            if (params.PERSONID === state.family[i].PERSONID) {
              let f = [...state.family];
              f = f.slice(i, 1);
              state.family = f;
            }
          }
        }
      })
  }
};

const mutations = {
  [types.getTopPlayList](state, data) {
    state.topPlayList = [...state.topPlayList, ...data];
  },
  [types.getCatList](state, data) {
    let list = data.filter((res, index) => index < 20);
    state.catList = [...state.catList, ...list];
  },
  [types.detailInfo](state, data) {
    state.detailInfo = { ...data.Data }
  },
  [types.family](state, data) {
    state.family = data.Data;
  },
  [types.deletePerson](state, data, id) {
    if (data.Code === 1) {

    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
