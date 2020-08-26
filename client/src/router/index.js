import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Fashion from '../views/Fashion'
import Books from '../views/Books'
import Electronics from '../views/Electronics'
import Otomotif from '../views/Otomotif'
import Foods from '../views/Foods'
import Drinks from '../views/Drinks'
import Furniture from '../views/Furniture'
import Others from '../views/Others'
import Carts from '../views/Carts'
import History from '../views/History'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
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
    path: '/fashion',
    name: 'Fashion',
    component: Fashion
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/electronics',
    name: 'Electronics',
    component: Electronics
  },
  {
    path: '/otomotif',
    name: 'Otomotif',
    component: Otomotif
  },
  {
    path: '/foods',
    name: 'Foods',
    component: Foods
  },
  {
    path: '/drinks',
    name: 'Drinks',
    component: Drinks
  },
  {
    path: '/furniture',
    name: 'Furniture',
    component: Furniture
  },
  {
    path: '/others',
    name: 'Others',
    component: Others
  },
  {
    path: '/carts',
    name: 'Carts',
    component: Carts
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  next()
})

export default router
