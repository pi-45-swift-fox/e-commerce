import Vue from 'vue';
import VueRouter from 'vue-router';
import Swal from 'sweetalert2';
import Home from '../views/Home.vue';
import Homepage from '../views/Homepage.vue';
import AllProducts from '../views/AllProducts.vue';
import DetailProduct from '../views/DetailProduct.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Cart from '../views/Cart.vue';
import Transaction from '../views/Transaction.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Home',
        component: Homepage,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path: 'history',
        name: 'Transaction',
        component: Transaction,
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
      },
      {
        path: 'p/detail/:id',
        name: 'DetailProduct',
        component: DetailProduct,
        props: true,
      },
      {
        path: 'p/:name',
        name: 'AllProducts',
        component: AllProducts,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Transaction' && !localStorage.access_token) {
    Swal.fire(
      'Please login first.',
      'We will direct you to our login page.',
      'warning',
    );
    next({ name: 'Login' });
  } else next();
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Cart' && !localStorage.access_token) {
    Swal.fire(
      'Please login first.',
      'We will direct you to our login page.',
      'warning',
    );
    next({ name: 'Login' });
  } else next();
});

export default router;
