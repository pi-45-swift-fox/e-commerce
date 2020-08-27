<template>
  <div>
      <h2>My Cart</h2>
  <NavBar></NavBar>
  <div class="container">
    <div class="card col-8 mx-auto my-4">
        <Card v-for="(product,i) in $store.state.customer_cart" :key="i" :cartProduct="product"></Card>
    </div>
  </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBarMain'
import Card from '../components/CartCard'
export default {
  components: {
    NavBar,
    Card
  },
  methods: {
    getCart () {
      this.$store.dispatch('fetchData', {})
      this.$store.dispatch('showCart', {})
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style>

</style>
