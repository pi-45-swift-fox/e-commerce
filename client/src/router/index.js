import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/LoginForm.vue'
import Main from '../views/Main'
import Cart from '../views/MyCart.vue'
import Register from '../views/RegisterForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/myCart',
    name: 'Cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && from.name === 'Home' && !localStorage.getItem('token')) {
    next()
  } else if (to.name === 'Register' && from.name === 'Home' && !localStorage.getItem('token')) {
    next()
  } else if (to.name === 'Home' && from.name === 'Home' && !localStorage.getItem('token')) {
    next()
  } else {
    next()
  }
})

export default router
