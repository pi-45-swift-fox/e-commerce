import Vue from "vue";
import Vuex from "vuex";
import axios from '../../api/axios';
import swal from 'sweetalert2';
const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false
})

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    products: []
  },
  mutations: {
    set_login(state, val) {
      state.login = val;
    },
    fill_products(state, products) {
      state.products = products;
    }
  },
  actions: {
    async fetch_data({ commit }) {
      try {
        const { data } = await axios({
          url: '/products',
          method: 'GET'
        })

        commit('fill_products', data);
      } catch (error) {
        toast.fire('Oops,', 'Something went wrong!', 'error');
      }
    },
    async login({ commit, dispatch }, { email, password }) {
      try {
        const { data } = await axios({
          url: '/login',
          method: 'POST',
          data: {
            email, password
          }
        });

        localStorage.access_token = data.token;
        commit('set_login', true);
      } catch (error) {
        toast.fire('Incorrect Email/Password', '', 'error');
      }
    },
    async register({ commit, dispatch }, { email, password }) {
      try {
        const response = await axios({
          url: '/register',
          method: 'POST',
          data: {
            email, password
          }
        })

        console.log(response);
      } catch (error) {
        console.log(error)
      }
    },
    async logout({ commit, dispatch }) {
      localStorage.removeItem('access_token');
      commit('set_login', false);
    }
  },
  modules: {}
});
