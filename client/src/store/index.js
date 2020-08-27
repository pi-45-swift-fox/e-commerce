import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axiosInstance.js'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [
      {
        id: 0,
        ProductId: 0,
        UserId: 0,
        quantity: 0,
        status: false,
        User: {
          id: 0,
          email: '',
          password: '',
          role: ''
        },
        Product: {
          id: 0,
          name: '',
          image_url: '',
          price: 0,
          stock: 0
        }
      }
    ],
    cartTotalPrice: 0,
    loggedIn: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_LOGGED (state, payload) {
      state.loggedIn = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      axios.post('/login', { email: payload.email, password: payload.password })
        .then((res) => {
          commit('SET_LOGGED', true)
          localStorage.setItem('access_token', res.data.access_token)
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('invalid email or password')
        })
    },
    logout ({ commit }) {
      commit('SET_LOGGED', false)
      localStorage.removeItem('access_token')
      router.push({ name: 'Login' })
    },
    loggedIn ({ commit }, payload) {
      commit('SET_LOGGED', payload)
    },
    fetchProducts ({ commit }) {
      axios.get('/products')
        .then(({ data }) => {
          commit('SET_PRODUCTS', data)
        })
        .catch(console.log)
    },
    fetchCarts ({ commit }) {
      axios.get('/carts', { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          commit('SET_CARTS', data)
        })
    },
    addCart ({ commit }, ProductId) {
      axios.post('/carts', { ProductId }, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(() => {
          Swal.fire({
            text: 'Successfully added the item to your chart!',
            showCancelButton: true,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Go To MyCart',
            cancelButtonText: 'Continue Shopping'
          }).then(() => {
            router.push({ name: 'Cart' })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    cartQuantityIncrement ({ commit, dispatch }, payload) {
      axios.patch(`/carts/${payload.cartId}/qtyInc`, { ProductId: payload.ProductId }, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(() => {
        })
        .catch(console.log)
    },
    cartQuantityDecrement ({ commit, dispatch }, payload) {
      axios.patch(`/carts/${payload.cartId}/qtyDec`, { ProductId: payload.ProductId }, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(() => {
        })
        .catch(console.log)
    },
    cartDelete ({ commit }, payload) {
      axios.delete(`/carts/${payload.cartId}/${payload.ProductId}`, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(() => {
          Swal.fire(
            'Removed!',
            'Your item has been removed.',
            'success'
          )
        })
        .catch(console.log)
    }
  },
  modules: {
  }
})
