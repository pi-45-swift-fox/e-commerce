import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { vm } from '@/main'
import SweetAlert from '@/helpers/sweetAlert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://ecommerce-cms-izzul.herokuapp.com',
    products: [],
    isLogin: false,
    carts: [],
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
    SET_TOTAL (state, newTotal) {
      state.total = newTotal
    },
    PLUS_TOTAL (state, value) {
      state.total += +value
    },
    MINUS_TOTAL (state, value) {
      state.total -= +value
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
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          commit('SET_ISLOGIN', true)
          vm.$router.push({ path: '/' })
          SweetAlert.showAlertSuccess(`${data.email} succesfully logged in`)
          console.log('berhasil', data.email)
        }).catch((err) => {
          console.log('error', err)
          SweetAlert.showAlertFail(err.response.data.message)
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
          SweetAlert.showAlertSuccess(result.data)
        }).catch((err) => {
          console.log('error', err)
          SweetAlert.showAlertFail(err.response.data.message)
        })
    },
    addProductToCart ({ state, dispatch }, object) {
      let check = false
      state.carts.forEach(cart => {
        if (cart.ProductId === object.id) {
          dispatch('updateQuantity', { id: cart.id, quantity: cart.quantity + 1 })
          check = true
        }
      })
      if (check === true) {
        SweetAlert.showAlertSuccess('Product sudah ada dicart berhasil ditambahkan jumlah pesanan')
      } else {
        axios({
          method: 'POST',
          url: state.baseUrl + '/carts',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            ProductId: object.id,
            quantity: 1
          }
        })
          .then(({ data }) => {
            console.log(data)
            SweetAlert.showAlertSuccess('Berhasil ditambahkan ke Cart')
          }).catch((err) => {
            console.log(err)
            if (err.response.data.message === 'Not Authorized') {
              SweetAlert.showAlertFail('Please Login First')
            } else {
              SweetAlert.showAlertFail(err.response.data.message)
            }
          })
      }
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
          let total = 0
          data.forEach(cart => {
            if (cart.status === 'unpaid') {
              total += cart.Product.price * cart.quantity
            }
          })
          commit('SET_TOTAL', total)
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
    deleteCart ({ state, commit, dispatch }, object) {
      axios({
        method: 'DELETE',
        url: state.baseUrl + `/carts/${object.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log('delete', data)
          vm.$router.push({ path: '/carts' })
          SweetAlert.showAlertSuccess(data)
          dispatch('getCarts')
          commit('MINUS_TOTAL', +object.price)
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
    updateStatus ({ state, commit, dispatch }) {
      state.carts.forEach(cart => {
        if (cart.status === 'unpaid') {
          axios({
            method: 'PUT',
            url: state.baseUrl + `/carts/${cart.id}`,
            headers: {
              access_token: localStorage.access_token
            },
            data: {
              status: 'paid'
            }
          })
            .then(({ data }) => {
              console.log('berhasil pay', data)
              vm.$router.push({ path: '/' })
              dispatch('getCarts')
              commit('REFRESH_TOTAL')
              SweetAlert.showAlertSuccess('Termakasih sudah berbelanja')
            }).catch((err) => {
              console.log(err)
            })
        }
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
