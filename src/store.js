import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let _api = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Clair/bugs'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bugs: [],
    activeBug: {}
  },
  mutations: {
    setBugs(state, data) {
      state.bugs = data
    },
    setActiveBug(state, data) {
      state.activeBug = data
    }
  },
  actions: {
    getBugs({ commit, dispatch }) {
      _api.get('')
        .then(res => {
          commit('setBugs', res.data.data)
        })
    },
    getBug({ commit, dispatch }, payload) {
      _api.get(payload)
        .then(res => {
          dispatch('setActiveBug', res.data.data)
        })
    },
    setActiveBug({ commit, dispatch }, payload) {
      commit('setActiveBug', payload)
    },
    newBug({ commit, dispatch }, payload) {
      _api.post('', payload)
        .then(res => {
          dispatch('getBugs')
        })
    }
  }
})
