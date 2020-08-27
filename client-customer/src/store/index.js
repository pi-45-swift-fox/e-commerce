import Vue from 'vue'
import Vuex from 'vuex'
const baseUrl = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    user: '',
    banners: [],
    isLogin: false,
    carts:[]
  },
  mutations: {
    set_items(state, data) {
      state.items = data.product
    },
    set_banners(state, data) {
      state.banners = data
    },
    set_login(state, data) {
      state.user = localStorage.getItem('user')
      state.isLogin = true
    },
    set_logout(state, data) {
      state.isLogin = false
      localStorage.clear()
      state.user = ''
    }
  },
  actions: {
    fetchItems({ commit }, data) {
      fetch(`${baseUrl}/products`, {
        method: 'GET'
      })
        .then((res) => { return res.json() })
        .then((data) => {
          console.log(data)
          commit('set_items', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchBanner({ commit }, data) {
      fetch(`${baseUrl}/products/banners`, {
        method: 'GET'
      })
        .then((res) => { return res.json() })
        .then((data) => {
          console.log(data)
          commit('set_banners', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    login({ commit }, payload) {
      fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          console.log(data)
          localStorage.setItem('access_token',data.access_token)
          localStorage.setItem('user',data.email)
          commit('set_login')
        })
        .catch((error) => { console.error('Error:', error); })
    },
    register({ commit }, payload) {
      fetch(`${baseUrl}/register`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          console.log(data)
        })
        .catch((error) => { console.error('Error:', error); })
    }
  },
  modules: {
  }
})
