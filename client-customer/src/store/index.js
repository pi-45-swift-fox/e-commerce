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
    },
    set_cart(state,data){
      state.carts = data
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
    login({ commit,dispatch }, payload) {
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
          dispatch('fetchCart')
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
    },
    fetchCart({commit},data){
      const access_token = localStorage.getItem('access_token')
      fetch(`${baseUrl}/carts`,{
        method:"GET",
        headers:{
          'Content-Type': 'application/json',
          'access_token': access_token
        }
      })
      .then(function (res) { return res.json(); })
        .then(function (data) {
          console.log(data)
          commit('set_cart',data)
        })
        .catch((error) => { console.error('Error:', error); })
    },
    deleteCart({commit,dispatch},data){
      console.log(data)
      const access_token = localStorage.getItem('access_token')
      fetch(`${baseUrl}/carts/${data}`,{
        method:"DELETE",
        headers:{
          'Content-Type': 'application/json',
          'access_token': access_token
        }
      })
      .then(function (res) { return res.json(); })
        .then(function (data) {
          console.log(data)
          dispatch('fetchCart')
        })
        .catch((error) => { console.error('Error:', error); })
    },
    createCart({commit,dispatch},payload){
      const access_token = localStorage.getItem('access_token')
      fetch(`${baseUrl}/carts`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'access_token': access_token
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          console.log(data)
          dispatch('fetchCart')
        })
        .catch((error) => { console.error('Error:', error); })
    },
    editCart({commit,dispatch},payload){
      const access_token = localStorage.getItem('access_token')
      fetch(`${baseUrl}/carts/${payload.id}`, {
        method: "PUT",
        headers:{
          'Content-Type': 'application/json',
          'access_token': access_token
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          console.log(data)
          dispatch('fetchCart')
        })
        .catch((error) => { console.error('Error:', error); })
    }

  },
  modules: {
  }
})
