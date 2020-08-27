import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: '',
    available_products: [],
    customer_cart: []
  },
  mutations: {
    LOGIN (state, info) {
      localStorage.setItem('token', info.access_token)
      state.access_token = info.access_token
    },
    FETCH_DATA (state, data) {
      state.available_products = data
    },
    LOGOUT (state, info) {
      state.userData = []
      localStorage.removeItem('token')
      router.push('/')
    }
  },
  actions: {
    fetchData (context, info) {
      axios({
        url: 'http://localhost:3000/products',
        method: 'GET'
      })
        .then(data => {
          context.commit('FETCH_DATA', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showLoginForm (context, info) {
      router.push('/login')
    },
    login (context, payload) {
      axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(data => {
          console.log(data.data)
          context.commit('LOGIN', data.data)
          router.push('/main')
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout (context, info) {
      context.commit('LOGOUT', {})
    }
  },
  modules: {
  }
})
