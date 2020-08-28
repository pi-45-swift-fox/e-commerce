import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios.js'
import swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
// import { $ } from 'jquery'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false
  },
  mutations: {
    NEW_PRODUCTS (state, newData) {
      state.products = newData
    },
    NEW_LOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    addProducts ({
      commit,
      dispatch
    }, data) {
      axios({
        method: 'post',
        url: 'products',
        data: {
          name: data.name,
          image_url: data.image_url,
          price: data.price,
          stock: data.stock
        },
        headers: {
          access_token: localStorage.token
        }
      })
        .then(({
          data
        }) => {
          commit('NEW_PRODUCTS', data.newData)
          // $(`#modal1`).modal('hide')
          dispatch('fetchProducts')
        }).catch(({
          response
        }) => {
          console.log(response)
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.Message}`
          })
        })
    },
    fetchProducts ({
      commit
    }) {
      console.log('masuk')
      axios({
        method: 'get',
        url: 'products'
      }).then(({
        data
      }) => {
        commit('NEW_PRODUCTS', data)
      }).catch(({
        response
      }) => {
        console.log(response)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${response.data.Message}`
        })
      })
    },
    deleteProducts ({
      dispatch,
      state
    }, id) {
      console.log(id)
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
            url: `products/${id}`,
            headers: {
              access_token: localStorage.token
            }
          })
            .then(({
              data
            }) => {
              dispatch('fetchProducts')
            }).catch(({
              response
            }) => {
              console.log(response)
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${response.data.Message}`
              })
            })
        }
      })
    },
    updateProducts ({
      dispatch
    }, data) {
      axios({
        method: 'put',
        url: `products/${data.id}`,
        data: {
          name: data.name,
          image_url: data.image_url,
          price: data.price,
          stock: data.stock
        },
        headers: {
          access_token: localStorage.token
        }
      })
        .then(({
          data
        }) => {
          dispatch('fetchProducts')
        }).catch(({
          response
        }) => {
          console.log(response)
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.Message}`
          })
        })
    }
  },
  modules: {}
})
