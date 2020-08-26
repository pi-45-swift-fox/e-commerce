import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    CHANGE_DATA (state, newData) {
      state.data = newData
    }
  },
  actions: {
    addProducts ({ commit }, data) {
      axios({
        method: 'post',
        url: 'products',
        data: { name: data.name, image_url: data.image_url, price: data.price, stock: data.stock },
        headers: { access_token: localStorage.token }
      })
        .then(({ data }) => {
          commit('CHANGE_DATA', data.newData)
        }).catch(err => {
          console.log(err)
        })
    },
    fetchProducts ({ commit, state }) {
      axios({
        method: 'get',
        url: 'products',
        headers: { access_token: localStorage.token }
      })
        .then(({ data }) => {
          commit('CHANGE_DATA', data.data)
        }).catch(err => {
          console.log(err)
        })
    },
    deleteProducts ({ dispatch, state }, id) {
      axios({
        method: 'delete',
        url: `products/${id}`,
        headers: { access_token: localStorage.token }
      })
        .then(({ data }) => {
          dispatch('fetchProducts')
        }).catch(err => {
          console.log(err)
        })
    },
    updateProducts ({ dispatch }, data) {
      axios({
        method: 'put',
        url: `products/${data.id}`,
        data: { name: data.name, image_url: data.image_url, price: data.price, stock: data.stock },
        headers: { access_token: localStorage.token }
      })
        .then(({ data }) => {
          dispatch('fetchProducts')
        }).catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
