<template>
  <div class="home">
    <b-container class="bv-example-row mt-5">
      <Carousel></Carousel>
      <b-row class="mt-5">
        <ProductCard v-for="product in products" :key="product.id" :product="product"></ProductCard>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '@/components/ProductCard.vue'
import Carousel from '../components/Carousel'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ProductCard,
    Carousel
  },
  computed: {
    ...mapState([
      'products'
    ])
  }
}
</script>
