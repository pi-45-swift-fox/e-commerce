<template>
  <div>
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
import { mapActions, mapState } from 'vuex'
import Cards from '../components/Cards'
export default {
  name: 'Home',
  components: {
    Cards
  },
  methods: {
    ...mapActions([
      'fetchProducts'
    ])
  },
  created () {
    this.fetchProducts()
  },
  computed: mapState([
    'isLogin'
  ])

}

</script>

<style>

</style>
