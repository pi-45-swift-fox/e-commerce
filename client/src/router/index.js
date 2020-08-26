import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Logout from '../views/Logout.vue';
import Cart from '../views/Cart.vue';
import History from '../views/History.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/history',
    name: 'History',
    component: History
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
