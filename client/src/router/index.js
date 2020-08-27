import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import loginform from '../components/loginform.vue';
import ProductList from '../components/ProductList.vue';
import ShowCart from '../views/ShowCart.vue';
import registerform from '../components/registerform.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'loginform',
    component: loginform,
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/register',
    name: 'registerform',
    component: registerform,
  },
  {
    path: '/carts',
    name: 'ShowCart',
    component: ShowCart,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name === 'ShowCart' && !localStorage.access_token) next({ name: 'loginform' });
  else if (to.name === 'loginform' && localStorage.access_token) next({ name: 'Home' });
  else next();
});

export default router;
