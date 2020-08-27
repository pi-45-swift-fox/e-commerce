import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    available_products: []
  },
  mutations: {
    FETCH_DATA (state, data) {
      state.available_products = data
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
    }
  },
  modules: {
  }
})
