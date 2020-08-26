<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <ProductCard v-for="product in $store.state.products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '@/components/ProductCard.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  methods: {
    ...mapActions([
      'fetchProducts'
    ])
  },
  created () {
    this.fetchProducts()
  }
}
</script>
