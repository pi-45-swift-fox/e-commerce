<template>
  <div>
    <!-- navbar -->
    <Navbar />
    <!-- navbar -->
    <div class="container-fluid">
      <div class="col">
        <CartsCards v-for="product in $store.state.cart" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '../router'
import CartsCards from '../components/CartsCards'
import Navbar from '../components/Navbar'
export default {
  name: 'Cart',
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    CartsCards,
    Navbar
  },
  methods: {
    ...mapActions([
      'fetchProducts'
    ]),
    registerForm () {
      router.push('register')
    },
    loginForm () {
      router.push('/Login')
    },
    logout () {
      localStorage.clear()
      router.push('/Login')
    }
  },
  created () {
    this.fetchProducts()
  },
  mounted () {
    if (localStorage.token) {
      this.isLogin = true
    }
  }
}

</script>

<style>

</style>
