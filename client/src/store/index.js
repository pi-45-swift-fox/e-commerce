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
    products: [],
    cart: [],
    history: []
  },
  mutations: {
    set_login(state, val) {
      state.login = val;
    },
    fill_products(state, products) {
      state.products = products;
    },
    set_cart(state, products) {
      state.cart = products;
    },
    set_history(state, products) {
      state.history = products;
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
        await axios({
          url: '/register',
          method: 'POST',
          data: {
            email, password
          }
        })

        toast.fire('Success,', 'You can try loggin in now!', 'success');
      } catch (error) {
        if (error.response.status === 409) {
          toast.fire('Hold on!', 'This email has been registered, try loggin in first!', 'info');
        } else {
          toast.fire('Whoops,', 'Did you put your email or password correctly?', 'error');
        }
      }
    },
    async logout({ commit, dispatch }) {
      localStorage.removeItem('access_token');
      commit('set_login', false);
    },
    async fetch_my_cart({ commit }) {
      try {
        const { data } = await axios({
          url: '/cart',
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        });

        commit('set_cart', data);
      } catch (error) {
        swal.fire('Account required', 'Login to access this feature', 'info');
      }
    },
    async fetch_my_history({ commit }) {
      try {
        const { data } = await axios({
          url: '/cart/history',
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        });

        commit('set_history', data);
      } catch (error) {
        swal.fire('Account required', 'Login to access this feature', 'info');
      }
    },
    async add_to_cart({ commit }, id) {
      try {
        await axios({
          url: `/cart/${id}`,
          method: 'POST',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            quantity: 1
          }
        });

        toast.fire('Added to cart!', '', 'success');
      } catch (error) {
        if (error.response.status === 403) {
          swal.fire('Account required', 'You need to login first to access this feature', 'info');
        } else {
          toast.fire('Ammount Exceeded', 'Check your cart, please!', 'warning');
        }
      }
    },
    async remove_cart({ dispatch }, id) {
      try {
        await axios({
          url: `/cart/${id}`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        });

        dispatch('fetch_my_cart');
      } catch (error) {
        toast.fire('Oops!', 'Something went wrong!', 'error');
      }
    },
    async update_cart({ dispatch }, { id, prev_val, max }) {
      const response = await swal.fire({
        title: 'Enter ammount',
        icon: 'question',
        input: 'range',
        inputAttributes: {
          min: 1,
          max: max,
          step: 1
        },
        inputValue: prev_val
      });

      if (!response.isDismissed) {
        try {
          await axios({
            url: `/cart/${id}`,
            method: 'PATCH',
            headers: {
              access_token: localStorage.access_token
            },
            data: {
              quantity: response.value
            }
          });

          dispatch('fetch_my_cart');
        } catch (error) {
          toast.fire('Oops!', 'Something went wrong!', 'error');
        }
      }
    },
    async buy_cart({ dispatch }) {
      try {
        await axios({
          url: '/cart/buy',
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        });

        dispatch('fetch_my_cart');
        swal.fire('Success', 'Bought everything in your cart!', 'success');
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {}
});
