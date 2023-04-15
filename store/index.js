import Vuex from 'vuex'
import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

// eslint-disable-next-line import/no-named-as-default-member
export default () => new Vuex.Store({
  state: {
    users: [],
    pagination: {
      totalItensServer: 0,
      itemsPerPage: 10,
      page: 0,
      pageCount: 0,
      pageStart: 0,
      pageStop: 0
    },
    options: {}
  },

  getters: {
    getField
  },

  mutations: {
    updateField
  },

  actions: {},
  modules: {}
})
