import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router.js'

let _api = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Clair/bugs'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bugs: [],
    activeBug: {},
    comments: []
  },
  mutations: {
    setBugs(state, data) {
      state.bugs = data
    },
    setActiveBug(state, data) {
      state.activeBug = data
    },
    setComments(state, data) {
      state.comments = data
    }
  },
  actions: {
    getBugs({ commit, dispatch }) {
      _api.get('')
        .then(res => {
          commit('setBugs', res.data.results)
        })
    },
    getBug({ commit, dispatch }, payload) {
      _api.get(payload)
        .then(res => {
          dispatch('setActiveBug', res.data.results)
        })
    },
    setActiveBug({ commit, dispatch }, payload) {
      commit('setActiveBug', payload)
      router.push({ name: 'specs', params: { id: payload._id } })
    },
    newBug({ commit, dispatch }, payload) {
      _api.post('', payload)
        .then(res => {
          dispatch('getBugs')
        })
    },
    goBack({ commit, dispatch }) {
      router.push({ name: 'home' })
    },
    getComments({ commit, dispatch }, payload) {
      _api.get(payload + '/notes')
        .then(res => {
          commit('setComments', res.data.results)
        })
    },
    createComment({ commit, dispatch }, payload) {
      _api.post(payload.bug + '/notes', payload)
        .then(res => {
          dispatch('getComments', payload.bug)
        })
    },
    deleteComment({ commit, dispatch }, payload) {
      _api.delete(payload.bugId + '/notes/' + payload.commentId)
        .then(res => {
          dispatch('getComments', payload.bugId)
        })
    },
    changeStats({ commit, dispatch }, payload) {
      _api.put()
    }
  }
})
