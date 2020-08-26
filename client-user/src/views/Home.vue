<template>
  <div>
    <!-- navbar -->
    <Navbar />
    <!-- navbar -->
    <!-- banner -->

    <!-- banner -->
    <div class="container-fluid">
      <div class="row d-flex justify-content-around ">
        <Cards v-for="product in $store.state.products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '../router'
import Cards from '../components/Cards'
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    Cards,
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
