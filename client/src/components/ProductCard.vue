<template>
  <div class="col mb-4">
    <div class="card h-100">
      <img
        :src="product.image_url"
        class="card-img-top align-self-center square mt-4"
        alt="*"
      />
      <div class="card-body">
        <h5 class="card-title"> {{product.name}} </h5>
        <p class="card-text text-warning my-1">Price: Rp{{product.price.toLocaleString()}} </p>
        <p class="card-text text-muted">Stock: {{product.stock}} </p>
      </div>
      <div class="card-footer">
        <button class="btn btn-success" @click="add_to_cart">+ Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        product: Object
    },
    methods: {
        async add_to_cart() {
            await this.$store.dispatch('add_to_cart', this.product.id)
        }
    }
};
</script>

<style>
</style>