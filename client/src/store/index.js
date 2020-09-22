import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    userEmail: ''
  },
  mutations: {
    setProduct (state, data) {
      state.products = data
    },
    setCart (state, data) {
      state.cart = data
    },
    userEmail (state, data) {
      state.userEmail = data
    }
  },
  actions: {
    login (state, user) {
      axios({
        method: 'post',
        url: 'https://e-commerce-cms-gacor.herokuapp.com/login',
        data: user
      }).then(function ({ data }) {
        localStorage.access_token = data.access_token
        state.commit('userEmail', data.email)
        router.push({ name: 'Home' })
      })
        .catch(err => console.log(err))
    },
    register (state, user) {
      axios({
        method: 'post',
        url: 'https://e-commerce-cms-gacor.herokuapp.com/register',
        data: user
      }).then(function ({ data }) {
        router.push({ name: 'Login' })
      })
        .catch(err => console.log(err))
    },
    fetchData (state) {
      axios({
        method: 'get',
        url: 'https://e-commerce-cms-gacor.herokuapp.com/products'
      })
        .then(response => {
          state.commit('setProduct', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCart (state) {
      axios({
        method: 'get',
        url: 'https://e-commerce-cms-gacor.herokuapp.com/cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          state.commit('setCart', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart (state, data) {
      axios({
        method: 'post',
        url: 'https://e-commerce-cms-gacor.herokuapp.com/cart',
        data: data,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateItem (state, data) {
      axios({
        method: 'put',
        url: `https://e-commerce-cms-gacor.herokuapp.com/cart/${data.id}`,
        data: data,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log(response)
          state.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteItem (state, id) {
      axios({
        method: 'delete',
        url: `https://e-commerce-cms-gacor.herokuapp.com/cart/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          state.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
