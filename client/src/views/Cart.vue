<template>
<div>
  <div class="row">
    <CartCard v-for="cart in $store.state.carts" :key="cart.id" :cart="cart" />
  </div>
  <!-- <div class="container">
    <table class="table container">
      <thead>
        <tr>
          <th scope="col">TOTAL</th>
          <th scope="col">{{$store.state.cartTotalPrice.toLocaleString()}}</th>
        </tr>
      </thead>
    </table>
  </div> -->
</div>
</template>

<script>
import CartCard from '../components/CartCard.vue'

export default {
  name: 'Cart',
  components: {
    CartCard
  },
  mounted () {
    this.$store.dispatch('fetchCarts')
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}

</script>

<style>

</style>
