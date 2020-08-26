<template>
  <div class="home">
    <div class="row row-cols-1 row-cols-md-3 mx-5">
      <ProductCard v-for="product in $store.state.products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard';

export default {
  name: "Home",
  components: {
    ProductCard
  },
  async created() {
    await this.$store.dispatch('fetch_data');
  }
};
</script>

<style>
.square {
  width: 180px;
  height: 180px;
}
</style>
