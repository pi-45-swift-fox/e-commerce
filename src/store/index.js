import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    products: [],
    product: '',
    carts: []
  },
  mutations: {
    SET_DATA (state, data) {
      state.products = data
    },
    SET_PRODUCT (state, product) {
      state.product = product
    }, 
    SET_CART(state, payload) {
      state.carts = payload;
    },
  },
  actions: {
    fetchData ({ commit }) {
      console.log('masuk fetch')
      axios({
        method: 'get',
        url: this.state.baseUrl + '/products/',
        headers: { accesstoken: localStorage.token }
      })
        .then(data => {
          commit('SET_DATA', data.data)
          console.log(data.data)
        })
    },    
    fetchCart({ commit }) {
      let id = localStorage.userId
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/${id}`,
        headers: {
          accesstoken: localStorage.token,
        },
      })
        .then((result) => {
          console.log(result.data, '<<< fetch cart');
          // this.items = result.data;
          commit('SET_CART', result.data);
        })
        .catch((err) => {
          console.log(err, '<< err fecthTask');
        });
    },
    deleteProduct (context, id) {
      axios({
        method: 'delete',
        url: this.state.baseUrl + '/products/' + id,
        headers: { accesstoken: localStorage.token }
      })
        .then(() => {
          swal('Manntappp', 'Product success delete', 'success', { buttons: false })
          context.dispatch('fetchData')
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
