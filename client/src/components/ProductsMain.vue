<template>
  <div class="container">
    <div class="card col-8 mx-auto my-4">
        <ProductCard v-for="(product, i) in $store.state.available_products" :key="i" :product="product"></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCardMain.vue'
export default {
  components: {
    ProductCard
  }
}
</script>

<style>

</style>
