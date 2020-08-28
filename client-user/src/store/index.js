import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios.js'
// import router from '../router'
import swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    carts: [],
    carousel: true
  },
  mutations: {
    NEW_PRODUCTS (state, payload) {
      state.products = payload
    },
    NEW_CART (state, payload) {
      state.carts = payload
    },
    NEW_LOGIN (state, payload) {
      state.isLogin = payload
    },
    NEW_CAROUSEL (state, payload) {
      state.carousel = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        method: 'get',
        url: 'products'
      }).then(({ data }) => {
        commit('NEW_PRODUCTS', data)
      }).catch(({ response }) => {
        console.log(response)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${response.data.Message}`
        })
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
      }).catch(({ response }) => {
        console.log(response)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${response.data.Message}`
        })
      })
    },
    fetchCarts ({ commit }) {
      console.log('INI FETCH CARTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
      axios({
        method: 'get',
        url: 'cart',
        headers: {
          access_token: localStorage.token
        }
      }).then(({ data }) => {
        commit('NEW_CART', data)
      }).catch(({ response }) => {
        console.log(response)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${response.data.Message}`
        })
      })
    },
    addToCart ({ commit }, payload) {
      console.log(payload)
      if (!localStorage.token) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You need to login first :)'
        })
      } else {
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
        }).catch(({ response }) => {
          console.log(response)
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.Message}`
          })
        })
      }
    },
    editCart (context, payload) {
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
      }).catch(({ response }) => {
        console.log(response)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${response.data.Message}`
        })
      })
    },
    deleteCart (context, cart) {
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          axios({
            method: 'delete',
            url: `cart/${cart.id}`,
            headers: {
              access_token: localStorage.token
            }
          }).then(({ data }) => {
            context.dispatch('fetchCarts')
          }).catch(({ response }) => {
            console.log(response)
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${response.data.Message}`
            })
          })
        }
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
