import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { vm } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    products: [],
    isLogin: false,
    carts: [],
    cartSelected: {},
    total: 0,
    banners: []
  },
  mutations: {
    FETCH_PRODUCTS (state, newProducts) {
      state.products = newProducts
    },
    SET_ISLOGIN (state, status) {
      state.isLogin = status
    },
    SET_CARTS (state, newCarts) {
      state.carts = newCarts
    },
    SET_TOTAL (state, subTotal) {
      state.total += subTotal
    },
    SET_CART (state, newCart) {
      state.cartSelected = newCart
    },
    SET_BANNERS (state, newBanners) {
      state.banners = newBanners
    }
  },
  actions: {
    getProducts ({ state, commit }) {
      axios({
        method: 'GET',
        url: state.baseUrl + '/products'
      })
        .then(({ data }) => {
          commit('FETCH_PRODUCTS', data)
          console.log(data)
        }).catch((err) => {
          console.log(err)
        })
    },
    login ({ state, commit }, form) {
      axios({
        method: 'POST',
        url: state.baseUrl + '/login',
        data: form
      })
        .then((result) => {
          localStorage.setItem('access_token', result.data.access_token)
          commit('SET_ISLOGIN', true)
          vm.$router.push({ path: '/' })
          console.log('berhasil', result.data)
        }).catch((err) => {
          console.log('error', err)
        })
    },
    register ({ state }, form) {
      axios({
        method: 'POST',
        url: state.baseUrl + '/register',
        data: form
      })
        .then((result) => {
          vm.$router.push({ path: '/login' })
          console.log('berhasil', result.data)
        }).catch((err) => {
          console.log('error', err)
        })
    },
    addProductToCart ({ state, dispatch }, ProductId) {
      axios({
        method: 'POST',
        url: state.baseUrl + '/carts',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          ProductId,
          quantity: 1
        }
      })
        .then(({ data }) => {
          console.log(data)
          dispatch('getCart', data.id)
        }).catch((err) => {
          console.log(err)
        })
    },
    getCarts ({ state, commit }) {
      axios({
        method: 'GET',
        url: state.baseUrl + '/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('SET_CARTS', data)
          console.log('berhasil get carts', data)
        }).catch((err) => {
          console.log(err)
        })
    },
    getCart ({ state, commit }, id) {
      axios({
        method: 'GET',
        url: state.baseUrl + `/carts/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log('get data one', data)
          commit('SET_CART', data)
        }).catch((err) => {
          console.log(err)
        })
    },
    deleteCart ({ state, dispatch }, id) {
      axios({
        method: 'DELETE',
        url: state.baseUrl + `/carts/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log('delete', data)
          vm.$router.push({ path: '/carts' })
          dispatch('getCarts')
        }).catch((err) => {
          console.log(err)
        })
    },
    updateQuantity ({ state, dispatch }, data) {
      axios({
        method: 'PUT',
        url: state.baseUrl + `/carts/${data.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          quantity: data.quantity
        }
      })
        .then(({ data }) => {
          console.log('berhasil update', data)
          vm.$router.push({ path: '/carts' })
          dispatch('getCarts')
        }).catch((err) => {
          console.log(err)
        })
    },
    updateStatus ({ state, commit, dispatch }, id) {
      axios({
        method: 'PUT',
        url: state.baseUrl + `/carts/${id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          status: 'paid'
        }
      })
        .then(({ data }) => {
          console.log('berhasil pay', data)
          commit('SET_CART', {})
          vm.$router.push({ path: '/carts' })
          dispatch('getCarts')
        }).catch((err) => {
          console.log(err)
        })
    },
    getBanners ({ state, commit }) {
      axios({
        method: 'GET',
        url: state.baseUrl + '/banners'
      })
        .then(({ data }) => {
          commit('SET_BANNERS', data)
          console.log('berhasil get carts', data)
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
