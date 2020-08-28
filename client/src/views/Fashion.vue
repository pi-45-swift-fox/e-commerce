<template>
  <div class="home">
    <b-container class="bv-example-row mt-5">
      <b-row>
        <ProductCard v-for="product in Fashion" :key="product.id" :product="product"></ProductCard>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '@/components/ProductCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  computed: {
    ...mapState([
      'products'
    ]),
    Fashion () {
      return this.products.filter(product => {
        return product.category === 'Fashion'
      })
    }
  }
}
</script>
