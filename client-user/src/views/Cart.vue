<template>
  <div>
    <!-- navbar -->
    <Navbar />
    <!-- navbar -->
    <div class="container-fluid">
      <div class="col">
        <CartsCards v-for="cart in $store.state.carts" :key="cart.id" :cart="cart" />
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
  name: 'Carts',
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
      'fetchCarts'
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
    if (localStorage.token) {
      this.isLogin = true
    }
  },
  mounted () {
    this.fetchCarts()
  }
}

</script>

<style>

</style>
