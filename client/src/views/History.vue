<template>
  <div class="row">
    <div class="col-8 mx-auto">
  <table class="table table-sm table-bordered table-hover">
      <caption>
          Your History Table
      </caption>
  <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <ProductRow v-for="cart in $store.state.history" :key="cart.id" :cart="cart" />
  </tbody>
</table>
    </div>
</div>
</template>

<script>
import ProductRow from '../components/HistoryProductRow.vue';

export default {
    components: {
        ProductRow
    },
    async created() {
        await this.$store.dispatch('fetch_my_history');
    }
}
</script>

<style>

</style>