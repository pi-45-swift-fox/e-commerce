import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert';
import router from '../router';

Vue.use(Vuex);
const baseURL = 'http://localhost:3000';
// const baseURL = 'https://desolate-tundra-18530.herokuapp.com';

export default new Vuex.Store({
  state: {
    statusLogin: '',
    products: [],
    banners: [],
    product: {},
    filteredProducts: [],
    carts: [],
  },
  getters: {
    filteredProducts: (state) => state.products.slice(0, 11),
    mangaProducts: (state) => state.products.filter((item) => item.category === 'Manga'),
    gameProducts: (state) => state.products.filter((item) => item.category === 'Game'),
    electronicProducts: (state) => state.products.filter((item) => item.category === 'Electronic&Gadget'),
  },
  mutations: {
    SET_STATUS_LOGIN(state) {
      if (localStorage.access_token) {
        state.statusLogin = true;
      } else {
        state.statusLogin = false;
      }
    },
    SET_STATUS_LOGOUT(state, status) {
      state.statusLogin = status;
    },
    SET_PRODUCTS(state, products) {
      state.products = products.filter((item) => item.stock > 0);
    },
    SET_BANNERS(state, banners) {
      state.banners = banners;
    },
    FIND_PRODUCT(state, product) {
      state.product = product;
    },
    FILTER_PRODUCT(state, params) {
      state.filteredProducts = state.products.filter((item) => item.BannerId === +params);
      router.push({ name: 'AllProducts', params: { name: +params } });
    },
    SET_CARTS(state, carts) {
      state.carts = carts;
    },
    DELETE_CART(state, id) {
      state.carts = state.carts.filter((cart) => cart.id !== id);
    },
    RESET_CART(state) {
      state.carts = [];
    },
  },
  actions: {
    processLogin(context, data) {
      axios({
        method: 'POST',
        url: `${baseURL}/login`,
        data: {
          email: data.email,
          password: data.password,
        },
      })
        .then((result) => {
          localStorage.setItem('access_token', result.data.access_token);
          localStorage.setItem('name', result.data.name);
          context.commit('SET_STATUS_LOGIN');
          router.push({ name: 'Home' });
        })
        .catch((err) => {
          const error = err.response.data.message;
          swal('Error', `${error}`, 'error');
        });
    },
    registerProcess(context, user) {
      axios({
        method: 'POST',
        url: `${baseURL}/register`,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      })
        .then(() => {
          swal('Success!', 'We\'ll direct you to our login page.', 'success');
          router.push({ name: 'Login' });
        })
        .catch((err) => {
          const errors = err.response.data;
          console.log('ini kmpre>>>', errors);
          let message;
          if (Array.isArray(errors)) {
            message = errors.join(', ');
          } else {
            message = errors;
          }
          swal('Error!', `${message}`, 'error');
        });
    },
    showProducts(context) {
      axios({
        method: 'GET',
        url: `${baseURL}/products`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('SET_PRODUCTS', result.data);
        })
        .catch(() => {
          swal('Error!', 'Something went wrong.', 'error');
        });
    },
    showBanners(context) {
      axios({
        method: 'GET',
        url: `${baseURL}/banners`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('SET_BANNERS', result.data);
        })
        .catch(() => {
          swal('Error!', 'Something went wrong.', 'error');
        });
    },
    findProduct(context, id) {
      axios({
        method: 'GET',
        url: `${baseURL}/products/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('FIND_PRODUCT', result.data);
          router.push({ name: 'DetailProduct', params: { id } });
        })
        .catch(() => {
          swal('Error!', 'Something went wrong.', 'error');
        });
    },
    addCart(context, data) {
      console.log('idnya>>>', data.ProductId);
      axios({
        method: 'POST',
        url: `${baseURL}/carts/${data.ProductId}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          quantity: data.quantity,
        },
      })
        .then(() => {
          swal('Success!', 'Success adding product to cart!', 'success');
        })
        .catch((err) => {
          swal('Error!', `${err.response.message}`, 'error');
        });
    },
    showCarts(context) {
      axios({
        method: 'GET',
        url: `${baseURL}/carts`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('SET_CARTS', result.data);
        })
        .catch(() => {
          swal('Error!', 'Something went wrong.', 'error');
        });
    },
    deleteCart(context, id) {
      axios({
        method: 'DELETE',
        url: `${baseURL}/carts/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          swal('Success!', `${result.data.message}`, 'success');
          context.commit('DELETE_CART', id);
        })
        .catch(() => {
          swal('Error!', 'Something went wrong.', 'error');
        });
    },
    deleteAllCarts(context) {
      axios({
        method: 'DELETE',
        url: `${baseURL}/carts`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          context.commit('RESET_CART');
          swal('Success!', 'Thank you for purchasing at our store!', 'success');
        })
        .catch(() => {
          swal('Error!', 'Something went wrong.', 'error');
        });
    },
    editProductStock(context, data) {
      axios({
        method: 'PUT',
        url: `${baseURL}/carts`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          ProductId: data.ProductId,
          quantity: data.quantity,
        },
      })
        .then(() => {})
        .catch(() => {
          swal('Error!', 'Something went wrong.', 'error');
        });
    },
  },
  modules: {
  },
});
