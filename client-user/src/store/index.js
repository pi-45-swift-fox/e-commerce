import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios.js'
import router from '../router'
import swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    carts: []
  },
  mutations: {
    NEW_PRODUCTS (state, payload) {
      state.products = payload
    },
    NEW_CART (state, payload) {
      state.carts = payload
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
    },
    fetchCarts ({ commit }) {
      axios({
        method: 'get',
        url: 'cart',
        headers: {
          access_token: localStorage.token
        }
      }).then(({ data }) => {
        commit('NEW_CART', data)
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    },
    addToCart (context, payload) {
      axios({
        method: 'post',
        url: 'cart',
        data: {
          ProductId: payload.id
        },
        headers: {
          access_token: localStorage.token
        }
      }).then(({ data }) => {
        swal.fire({
          title: 'Success',
          text: `Add ${payload.name} to cart`,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          icon: 'success'
        })
        router.push('/cart')
      }).catch(err => {
        console.log(err)
      })
    },
    editCart (context, payload) {
      console.log(payload)
      axios({
        method: 'put',
        url: `cart/${payload.cart.id}`,
        data: {
          quantity: payload.quantity
        },
        headers: {
          access_token: localStorage.token
        }
      }).then(({ data }) => {
        swal.fire({
          title: 'Success',
          text: `Success edit quantity to ${payload.quantity} in your product`,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          icon: 'success'
        })
        context.dispatch('fetchCarts')
      }).catch(err => {
        console.log(err)
      })
    },
    deleteCart (context, cart) {
      console.log(cart)
      axios({
        method: 'delete',
        url: `cart/${cart.id}`,
        headers: {
          access_token: localStorage.token
        }
      }).then(({ data }) => {
        swal.fire({
          title: 'Success',
          text: `delete ${cart.Product.name} in cart`,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          icon: 'success'
        })
        context.dispatch('fetchCarts')
      }).catch(err => {
        console.log(err)
      })
    }
  },

  modules: {
  }
})
// route.use('/cart', CartRouter)
// route.get('/', Authorize.AuthorizeUser, CartController.show)
// route.post('/', Authorize.AuthorizeUser, CartController.add)
// route.put('/:id', Authorize.AuthorizeUser, CartController.update)
// route.delete('/:id', Authorize.AuthorizeUser, CartController.delete)
