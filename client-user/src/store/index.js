import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    cart: []
  },
  mutations: {
    NEW_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        method: 'get',
        url: 'products'
      }).then(({ data }) => {
        commit('NEW_PRODUCTS', data)
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    },
    registerUser ({ commit }, data) {
      axios({
        method: 'post',
        url: 'register',
        data: {
          email: data.email, password: data.password
        }
      }).then(({ data }) => {
        console.log('Register Successful')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
