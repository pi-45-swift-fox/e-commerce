<template>
  <div>
      <div class="card-body d-flex flex-row">
      </div>
      <img :src="cartProduct.product.image_url" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{cartProduct.product.name}}</h5>
        <p class="card-text">{{cartProduct.product.price}}</p>
        <p class="card-text">Quantity: {{cartProduct.quantity}}</p>
      </div>
      <button type="submit" class="btn btn-primary mb-2" @click.prevent="updateCart">Update </button>
      <button type="submit" class="btn btn-primary mb-2" @click.prevent="deleteCart">Delete </button>

  </div>
</template>

<script>
export default {
  props: ['cartProduct'],
  methods: {
    deleteCart () {
      this.$store.dispatch('deleteCart', this.cartProduct.productId)
    },
    updateCart () {
      this.$store.dispatch('showUpdateCart', this.cartProduct.productId)
    }
  }
}
</script>

<style>

</style>
