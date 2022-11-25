<template>
  <div class="row">
    <div class="col-8 mx-auto">
  <table class="table table-sm table-bordered table-hover">
      <caption>
          <button class="btn btn-success" v-if="$store.state.cart[0]" @click="buy">
              Buy
          </button>
      </caption>
  <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Available</th>
      <th scope="col">Quantity</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <ProductRow v-for="cart in $store.state.cart" :key="cart.id" :cart="cart" />
  </tbody>
</table>
    </div>
</div>
</template>

<script>
import ProductRow from '../components/ProductRow.vue';

export default {
    components: {
        ProductRow
    },
    async created() {
        await this.$store.dispatch('fetch_my_cart');
    },
    methods: {
        async buy() {
            await this.$store.dispatch('buy_cart');
        }
    }
}
</script>

<style>

</style>