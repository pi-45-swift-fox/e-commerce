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
    },
    SET_CART (state, data) {
      state.customer_cart = data
    },
    BACK_TO_MAIN_1 (state, info) {
      router.go(router.currentRoute)
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
    showCart (context, info) {
      axios({
        url: 'http://localhost:3000/cart',
        method: 'GET',
        headers: { access_token: localStorage.getItem('token') }
      })
        .then(data => {
          context.commit('SET_CART', data.data)
        })
        .catch(err => {
          console.log(err)
        })
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
    },
    goToCart (context, info) {
      router.push('/myCart')
    },
    goToMain (context, info) {
      router.push('main')
    },
    addProductToCart (context, info) {
      const index = this.state.customer_cart.findIndex(x => x.productId === info.id)
      console.log('ini index>>>>', index)
      if (index === -1) {
        axios({
          url: `http://localhost:3000/cart/${info.id}`,
          method: 'POST',
          headers: { access_token: localStorage.getItem('token') },
          data: {
            quantity: info.quantity
          }
        })
          .then(data => {
            console.log('ini>>>>>>>', this.state.customer_cart[index].quantity)
            context.commit('BACK_TO_MAIN_1', {})
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios({
          url: `http://localhost:3000/cart/${info.id}`,
          method: 'PUT',
          headers: { access_token: localStorage.getItem('token') },
          data: {
            quantity: Number(info.quantity) + Number(this.state.customer_cart[index].quantity)
          }
        })
          .then(data => {
            context.commit('BACK_TO_MAIN_1', {})
            console.log('ini>>>>>>>', this.state.customer_cart[index].quantity)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  modules: {
  }
})
