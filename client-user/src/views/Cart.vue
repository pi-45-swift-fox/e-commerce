<template>
  <div>
    <div class="container-fluid">
      <div class="col">
        <CartsCards v-for="(cart, index) in $store.state.carts" :key="cart.id" :index="index" :cart="cart" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '../router'
import CartsCards from '../components/CartsCards'
export default {
  name: 'Carts',
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    CartsCards
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
