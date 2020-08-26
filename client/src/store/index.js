import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axiosInstance.js'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    editCart: {}
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_EDIT_CHART (state, payload) {
      state.editCart = payload
    }
  },
  actions: {
    login (context, payload) {
      axios.post('/login', { email: payload.email, password: payload.password })
        .then((res) => {
          console.log(res)
          localStorage.setItem('access_token', res.data.access_token)
          router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('invalid email or password')
        })
    },
    fetchProducts ({ commit }) {
      axios.get('/products')
        .then(({ data }) => {
          commit('SET_PRODUCTS', data)
          console.log(data)
        })
        .catch(console.log)
    },
    addCart ({ commit }, ProductId) {
      axios.post('/carts', { ProductId }, { headers: { access_token: localStorage.getItem('access_token') } })
        .then((res) => {
          // Swal.fire(data)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
