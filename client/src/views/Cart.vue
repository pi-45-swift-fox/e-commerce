<template>
  <div class="row">
    <div class="col-8 mx-auto">
  <table class="table table-sm table-bordered table-hover">
    <caption>
      <button @click="remove" class="btn btn-success">Remove</button>
    </caption>
  <thead>
    <tr>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <!-- <ProductRow v-for="product in $store.state.cart" :key="product.id" :product="product" /> -->
  </tbody>
</table>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>