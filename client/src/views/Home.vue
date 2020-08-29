<template>
  <div class="container">
    <Navbar/>
    <div class="row mt-5">
      <Product v-for="product in $store.state.products" :key="product.id" :product="product"/>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar'
import Product from '../components/product'

export default {
  name: 'Home',
  components: {
    Navbar,
    Product
  },
  created () {
    this.$store.dispatch('fetchData')
  }
}
</script>
