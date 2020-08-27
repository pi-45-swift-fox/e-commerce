import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    products: [],
    isLogin: false,
    carts: [],
    totalPrice: 0,
    histories: [],
    userLogin: ''
  },
  mutations: {
    SET_PRODUCTS (state, newProducts) {
      state.products = newProducts
    },
    SET_ISLOGIN (state, status) {
      state.isLogin = status
    },
    SET_CARTS (state, carts) {
      let price = 0
      const cartsList = []
      const historyList = []
      carts.forEach(el => {
        if (el.status === true) {
          historyList.push(el)
        } else {
          price += el.quantity * el.Product.price
          cartsList.push(el)
        }
      })
      state.carts = cartsList
      state.totalPrice = price
      state.histories = historyList
    },
    SET_TOTALPRICE (state, price) {
      state.totalPrice += price
    },
    SET_USER (state, email) {
      state.userLogin = email
    }
  },
  actions: {
    fetchProducts ({ commit, state }) {
      axios({
        method: 'GET',
        url: state.baseUrl + '/products'
      })
        .then(res => {
          console.log(res.data.products)
          commit('SET_PRODUCTS', res.data.products)
        })
        .catch(err => {
          console.log(err)
        })
    },
    AddToCart ({ dispatch, state }, id) {
      console.log(id)
      if (!localStorage.access_token) {
        return swal('Error!', 'Please login first', 'error')
      }
      axios({
        method: 'POST',
        url: state.baseUrl + `/carts/product/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          dispatch('fetchCarts')
          swal('Added', 'Successfully added to cart!', 'success')
        })
        .catch(({ response }) => {
          swal('Error!', response.data.message, 'error')
        })
    },
    fetchCarts ({ commit, state }) {
      axios({
        method: 'GET',
        url: state.baseUrl + '/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          commit('SET_CARTS', res.data.carts)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateStatusCart ({ dispatch, state }) {
      axios({
        url: `${state.baseUrl}/carts`,
        headers: {
          access_token: localStorage.access_token
        },
        method: 'PUT'
      })
        .then(data => {
          dispatch('fetchCarts')
          swal('Payment Completed', 'Payment completed, transaction will be moved ', 'success')
        })
        .catch(async ({ response }) => {
          await swal('Oh No!', response.data.message.join(), 'error')
        })
    }
  },
  modules: {
  }
})
