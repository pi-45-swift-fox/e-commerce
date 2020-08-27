<template>
    <div>
      <div class="container">
          <h1>List Products :</h1>
        <div class="row no-gutters">
            <ProductCard v-for="product in $store.state.products" :key="product.id" :product="product" ></ProductCard>
        </div>
      </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
export default {
  name: 'Home',
  components: {
    ProductCard
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style scoped>
h1 {
  color:#ffce00;
  font-family: 'Oswald', sans-serif;
  font-size: 80px;
  cursor: pointer;
  text-shadow: 2px 2px 4px darkgoldenrod;
  margin-bottom: 35px;
}

h1:hover {
  text-shadow: 2px 2px 4px #000000;
}
</style>
